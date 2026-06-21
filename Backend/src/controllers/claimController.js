const Claim = require('../models/Claim');
const Document = require('../models/Document');
const logActivity = require('../utils/activityLogger');
const { sendNotification } = require('../utils/notificationService');
const { serializeDocument } = require('../utils/documentSerializer');

const createClaim = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.documentId);

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    if (doc.status !== 'verified') {
      return res.status(400).json({ success: false, message: 'Only verified documents can be claimed.' });
    }

    const existing = await Claim.findOne({
      document: doc._id,
      claimant: req.user._id,
      status: { $nin: ['rejected', 'cancelled', 'completed'] },
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'You already have an active claim for this document.' });
    }

    const claim = await Claim.create({
      document: doc._id,
      claimant: req.user._id,
      claimMessage: req.body.claimMessage || '',
      status: 'pending',
    });

    await logActivity({
      user: req.user,
      action: 'claim_create',
      description: `Claim submitted for document ${doc.referenceId}`,
      req,
      metadata: { claimId: claim._id, documentId: doc._id },
    });

    await sendNotification({
      recipientId: req.user._id,
      type: 'claim_update',
      title: 'Claim Submitted',
      message: `Your claim for "${doc.documentName}" is under review.`,
      relatedDocument: doc._id,
      relatedClaim: claim._id,
    });

    if (doc.uploadedBy) {
      await sendNotification({
        recipientId: doc.uploadedBy,
        type: 'claim_update',
        title: 'New Claim on Your Upload',
        message: `Someone has claimed the document "${doc.documentName}" you reported.`,
        relatedDocument: doc._id,
        relatedClaim: claim._id,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Claim submitted successfully.',
      data: claim,
    });
  } catch (err) {
    next(err);
  }
};

const getMyClaims = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { claimant: req.user._id };
    if (status) filter.status = status;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [claims, total] = await Promise.all([
      Claim.find(filter)
        .populate('document', 'documentName documentType locationFound referenceId status')
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

const getClaimById = async (req, res, next) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate('document')
      .populate('claimant', 'name email')
      .populate('reviewedBy', 'name');

    if (!claim) {
      return res.status(404).json({ success: false, message: 'Claim not found.' });
    }

    const isOwner = claim.claimant._id.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    const response = claim.toObject();
    if (response.document) {
      response.document = serializeDocument(response.document, {
        includeSensitive: isOwner || req.user.role === 'admin',
      });
    }

    res.json({ success: true, data: response });
  } catch (err) {
    next(err);
  }
};

const cancelClaim = async (req, res, next) => {
  try {
    const claim = await Claim.findById(req.params.id);

    if (!claim) {
      return res.status(404).json({ success: false, message: 'Claim not found.' });
    }

    if (claim.claimant.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    if (['completed', 'cancelled'].includes(claim.status)) {
      return res.status(400).json({ success: false, message: 'Claim cannot be cancelled.' });
    }

    claim.status = 'cancelled';
    await claim.save();

    await logActivity({
      user: req.user,
      action: 'claim_update',
      description: `Cancelled claim ${claim.referenceId}`,
      req,
    });

    res.json({ success: true, message: 'Claim cancelled.', data: claim });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createClaim,
  getMyClaims,
  getClaimById,
  cancelClaim,
};
