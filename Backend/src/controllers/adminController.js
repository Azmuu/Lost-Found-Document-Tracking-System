const User = require('../models/User');
const Document = require('../models/Document');
const Claim = require('../models/Claim');
const Verification = require('../models/Verification');
const ActivityLog = require('../models/ActivityLog');
const logActivity = require('../utils/activityLogger');
const { sendNotification } = require('../utils/notificationService');
const { serializeDocument, serializeVerification } = require('../utils/entitySerializer');
const { notifyPotentialOwners } = require('../utils/matchService');

const getDashboardStats = async (_req, res, next) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      totalUsers,
      newUsersThisMonth,
      pendingDocuments,
      verifiedDocuments,
      totalClaims,
      completedClaims,
      recentActivity,
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      User.countDocuments({ role: 'user', createdAt: { $gte: thirtyDaysAgo } }),
      Document.countDocuments({ status: { $in: ['pending', 'in_review'] } }),
      Document.countDocuments({ status: 'verified' }),
      Claim.countDocuments(),
      Claim.countDocuments({ status: { $in: ['completed', 'ready_for_collection'] } }),
      ActivityLog.find().sort({ createdAt: -1 }).limit(10).populate('user', 'name email'),
    ]);

    const matchRate = totalClaims > 0 ? ((completedClaims / totalClaims) * 100).toFixed(1) : 0;

    const documentsByType = await Document.aggregate([
      { $match: { status: 'verified' } },
      { $group: { _id: '$documentType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const documentsByLocation = await Document.aggregate([
      { $match: { status: { $in: ['verified', 'pending', 'in_review'] } } },
      { $group: { _id: '$locationFound', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const monthlyMatches = await Claim.aggregate([
      {
        $match: {
          status: { $in: ['completed', 'ready_for_collection', 'approved'] },
          createdAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        newUsersThisMonth,
        pendingDocuments,
        verifiedDocuments,
        totalClaims,
        completedClaims,
        matchRate: parseFloat(matchRate),
        documentsByType,
        documentsByLocation,
        monthlyMatches,
        recentActivity,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getVerificationQueue = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : { status: { $in: ['pending', 'in_review'] } };

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [documents, total] = await Promise.all([
      Document.find(filter)
        .populate('uploadedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit, 10)),
      Document.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: documents.map((d) => serializeDocument(d, { includeSensitive: true })),
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total,
        pages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (err) {
    next(err);
  }
};

const verifyDocument = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    doc.status = 'verified';
    doc.verifiedBy = req.user._id;
    doc.verifiedAt = new Date();
    doc.rejectionReason = '';
    await doc.save();

    await Verification.create({
      document: doc._id,
      admin: req.user._id,
      verificationStatus: 'approved',
      reviewNotes: req.body.notes || 'Document approved by administrator.',
      reviewDate: new Date(),
    });

    await logActivity({
      user: req.user,
      action: 'document_verify',
      description: `Verified document ${doc.referenceId}`,
      req,
      metadata: { documentId: doc._id },
    });

    await sendNotification({
      recipientId: doc.uploadedBy,
      type: 'document_verified',
      title: 'Document Verified',
      message: `Your upload "${doc.documentName}" has been verified and is now available for recovery.`,
      relatedDocument: doc._id,
      status: 'unread',
    });

    await notifyPotentialOwners(doc);

    res.json({
      success: true,
      message: 'Document verified.',
      data: serializeDocument(doc, { includeSensitive: true }),
    });
  } catch (err) {
    next(err);
  }
};

const rejectDocument = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    doc.status = 'rejected';
    doc.rejectionReason = req.body.reason || 'Did not meet verification requirements.';
    doc.verifiedBy = req.user._id;
    doc.verifiedAt = new Date();
    await doc.save();

    await Verification.create({
      document: doc._id,
      admin: req.user._id,
      verificationStatus: 'rejected',
      reviewNotes: doc.rejectionReason,
      reviewDate: new Date(),
    });

    await logActivity({
      user: req.user,
      action: 'document_reject',
      description: `Rejected document ${doc.referenceId}`,
      req,
      metadata: { documentId: doc._id, reason: doc.rejectionReason },
    });

    await sendNotification({
      recipientId: doc.uploadedBy,
      type: 'document_rejected',
      title: 'Document Rejected',
      message: `Your upload "${doc.documentName}" was rejected. Reason: ${doc.rejectionReason}`,
      relatedDocument: doc._id,
    });

    res.json({
      success: true,
      message: 'Document rejected.',
      data: serializeDocument(doc, { includeSensitive: true }),
    });
  } catch (err) {
    next(err);
  }
};

const getAllDocuments = async (req, res, next) => {
  try {
    const { status, documentType, search, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (documentType) filter.documentType = documentType;
    if (search) {
      filter.$or = [
        { documentName: { $regex: search, $options: 'i' } },
        { ownerName: { $regex: search, $options: 'i' } },
        { referenceId: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [documents, total] = await Promise.all([
      Document.find(filter)
        .populate('uploadedBy', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit, 10)),
      Document.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: documents.map((d) => serializeDocument(d, { includeSensitive: true })),
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total,
        pages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const { search, role, isActive, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit, 10)),
      User.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: users.map((u) => u.toPublicJSON()),
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total,
        pages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { role, isActive, isVerified } = req.body;
    const updates = {};

    if (role !== undefined) updates.role = role;
    if (isActive !== undefined) updates.isActive = isActive;
    if (isVerified !== undefined) updates.isVerified = isVerified;

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    await logActivity({
      user: req.user,
      action: isActive === false ? 'user_deactivate' : 'user_update',
      description: `Admin updated user ${user.email}`,
      req,
      metadata: { targetUserId: user._id, updates },
    });

    res.json({ success: true, message: 'User updated.', data: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
};

const getAllClaims = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [claims, total] = await Promise.all([
      Claim.find(filter)
        .populate('document', 'documentName documentType referenceId locationFound')
        .populate('claimant', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit, 10)),
      Claim.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: claims,
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total,
        pages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (err) {
    next(err);
  }
};

const updateClaimStatus = async (req, res, next) => {
  try {
    const { status, verificationNotes } = req.body;
    const claim = await Claim.findById(req.params.id).populate('document');

    if (!claim) {
      return res.status(404).json({ success: false, message: 'Claim not found.' });
    }

    claim.status = status;
    claim.verificationNotes = verificationNotes || claim.verificationNotes;
    claim.reviewedBy = req.user._id;
    claim.reviewedAt = new Date();
    await claim.save();

    if (status === 'approved' || status === 'ready_for_collection') {
      await Document.findByIdAndUpdate(claim.document._id, { status: 'claimed' });
    }

    if (status === 'completed') {
      await Document.findByIdAndUpdate(claim.document._id, { status: 'returned' });
    }

    const actionMap = {
      approved: 'claim_approve',
      rejected: 'claim_reject',
      ready_for_collection: 'claim_approve',
    };

    await logActivity({
      user: req.user,
      action: actionMap[status] || 'claim_update',
      description: `Admin updated claim ${claim.referenceId} to ${status}`,
      req,
      metadata: { claimId: claim._id },
    });

    const notifType = status === 'rejected' ? 'claim_rejected' : 'claim_approved';
    await sendNotification({
      recipientId: claim.claimant,
      type: notifType,
      title: 'Claim Status Updated',
      message: `Your claim #${claim.referenceId} status is now: ${status.replace(/_/g, ' ')}.`,
      relatedClaim: claim._id,
      relatedDocument: claim.document._id,
    });

    res.json({ success: true, message: 'Claim updated.', data: claim });
  } catch (err) {
    next(err);
  }
};

const getActivityLogs = async (req, res, next) => {
  try {
    const { action, userId, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (action) filter.action = action;
    if (userId) filter.user = userId;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [logs, total] = await Promise.all([
      ActivityLog.find(filter)
        .populate('user', 'name email role')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit, 10)),
      ActivityLog.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: logs,
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total,
        pages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (err) {
    next(err);
  }
};

const getVerifications = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.verificationStatus = status;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [verifications, total] = await Promise.all([
      Verification.find(filter)
        .populate('document', 'documentName documentType ownerName referenceId status')
        .populate('admin', 'name email')
        .sort({ reviewDate: -1 })
        .skip(skip)
        .limit(parseInt(limit, 10)),
      Verification.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: verifications.map((v) => serializeVerification(v)),
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total,
        pages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (err) {
    next(err);
  }
};

const updatePrivacySettings = async (req, res, next) => {
  try {
    const { documentId, isPublic, privacyMasked } = req.body;
    const doc = await Document.findById(documentId);

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    if (isPublic !== undefined) doc.isPublic = isPublic;
    if (privacyMasked !== undefined) doc.privacyMasked = privacyMasked;
    await doc.save();

    res.json({
      success: true,
      message: 'Privacy settings updated.',
      data: serializeDocument(doc, { includeSensitive: true }),
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboardStats,
  getVerificationQueue,
  verifyDocument,
  rejectDocument,
  getAllDocuments,
  getAllUsers,
  updateUser,
  getAllClaims,
  updateClaimStatus,
  getActivityLogs,
  getVerifications,
  updatePrivacySettings,
};
