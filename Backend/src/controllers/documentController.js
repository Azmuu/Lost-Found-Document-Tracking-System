const Document = require('../models/Document');
const { DOCUMENT_TYPES } = require('../models/Document');
const { extractLast4, buildKeywords } = require('../utils/maskIdNumber');
const { serializeDocument } = require('../utils/documentSerializer');
const { processUploadedFiles, deleteFromCloudinary } = require('../middleware/upload');
const logActivity = require('../utils/activityLogger');
const { sendNotification } = require('../utils/notificationService');
const { findMatchingDocuments, notifySearchMatches } = require('../utils/matchService');

const createDocument = async (req, res, next) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ success: false, message: 'At least one document image is required.' });
    }

    const images = await processUploadedFiles(req.files);
    const {
      documentName,
      documentType,
      ownerName,
      idNumber,
      documentNumber,
      locationFound,
      description,
      dateFound,
    } = req.body;

    const docNumber = documentNumber || idNumber || '';

    const doc = await Document.create({
      documentName,
      documentType,
      ownerName: ownerName || '',
      idNumber: docNumber,
      idNumberLast4: extractLast4(docNumber),
      locationFound,
      description: description || '',
      keywords: buildKeywords(documentName, ownerName, description, locationFound, documentType),
      images,
      uploadedBy: req.user._id,
      dateFound: dateFound || new Date(),
      status: 'pending',
    });
    await logActivity({
      user: req.user,
      action: 'document_upload',
      description: `Uploaded document: ${documentName}`,
      req,
      metadata: { documentId: doc._id },
    });

    await sendNotification({
      recipientId: req.user._id,
      type: 'system',
      title: 'Document Uploaded',
      message: `Your upload "${documentName}" has been submitted and is pending admin verification.`,
      relatedDocument: doc._id,
    });

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully. Pending admin verification.',
      data: serializeDocument(doc, { includeSensitive: true }),
    });
  } catch (err) {
    next(err);
  }
};

const getMyDocuments = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter = { uploadedBy: req.user._id };
    if (status) filter.status = status;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [documents, total] = await Promise.all([
      Document.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit, 10)),
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

const getDocumentById = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id).populate('uploadedBy', 'name email');

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    const isOwner = doc.uploadedBy?._id?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    const isVerified = ['verified', 'claimed', 'returned'].includes(doc.status);

    if (!isOwner && !isAdmin && !isVerified) {
      return res.status(403).json({ success: false, message: 'Document not available.' });
    }

    res.json({
      success: true,
      data: serializeDocument(doc, { includeSensitive: isOwner || isAdmin }),
    });
  } catch (err) {
    next(err);
  }
};

const updateDocument = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    if (doc.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this document.' });
    }

    if (['claimed', 'returned'].includes(doc.status)) {
      return res.status(400).json({ success: false, message: 'Cannot update a claimed or returned document.' });
    }

    const fields = ['documentName', 'documentType', 'ownerName', 'locationFound', 'description', 'dateFound'];
    fields.forEach((field) => {
      if (req.body[field] !== undefined) doc[field] = req.body[field];
    });

    if (req.body.idNumber !== undefined) {
      doc.idNumber = req.body.idNumber;
      doc.idNumberLast4 = extractLast4(req.body.idNumber);
    }

    if (req.files?.length) {
      const newImages = await processUploadedFiles(req.files);
      doc.images = [...doc.images, ...newImages];
    }

    doc.keywords = buildKeywords(doc.documentName, doc.ownerName, doc.description, doc.locationFound);

    if (doc.status === 'verified' && req.user.role !== 'admin') {
      doc.status = 'in_review';
    }

    await doc.save();

    await logActivity({
      user: req.user,
      action: 'document_update',
      description: `Updated document: ${doc.documentName}`,
      req,
      metadata: { documentId: doc._id },
    });

    res.json({
      success: true,
      message: 'Document updated.',
      data: serializeDocument(doc, { includeSensitive: true }),
    });
  } catch (err) {
    next(err);
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id);

    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    if (doc.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this document.' });
    }

    for (const img of doc.images) {
      await deleteFromCloudinary(img.publicId);
    }

    await doc.deleteOne();

    await logActivity({
      user: req.user,
      action: 'document_delete',
      description: `Deleted document: ${doc.documentName}`,
      req,
      metadata: { documentId: doc._id },
    });

    res.json({ success: true, message: 'Document deleted.' });
  } catch (err) {
    next(err);
  }
};

const searchDocuments = async (req, res, next) => {
  try {
    const {
      q,
      documentName,
      ownerName,
      documentType,
      idLast4,
      foundAfter,
      status = 'verified',
      sort = 'recent',
      page = 1,
      limit = 12,
    } = req.query;

    const criteria = { q, documentName, ownerName, documentType, idLast4, foundAfter };
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const { documents, total } = await findMatchingDocuments(criteria, {
      limit: parseInt(limit, 10),
      skip,
      sort,
    });

    if (req.user && documents.length > 0) {
      await notifySearchMatches(req.user._id, documents, criteria);
    }

    res.json({
      success: true,
      message: documents.length
        ? `Found ${total} matching document(s).`
        : 'No matching documents found.',
      data: documents.map((d) => serializeDocument(d)),
      matchCount: total,
      documentTypes: DOCUMENT_TYPES,
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
const getDocumentTypes = (_req, res) => {
  res.json({ success: true, data: DOCUMENT_TYPES });
};

module.exports = {
  createDocument,
  getMyDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  searchDocuments,
  getDocumentTypes,
};
