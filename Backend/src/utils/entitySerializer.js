const { maskIdNumber } = require('./maskIdNumber');

const serializeUser = (user) => {
  if (!user) return null;
  const base = typeof user.toPublicJSON === 'function' ? user.toPublicJSON() : user;
  return {
    ...base,
    userId: base._id,
    fullName: base.name,
    profileImage: base.avatar,
  };
};

const serializeDocument = (doc, { includeSensitive = false, includeImages = true } = {}) => {
  if (!doc) return null;

  const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };

  const serialized = {
    documentId: obj._id,
    _id: obj._id,
    userId: obj.uploadedBy?._id || obj.uploadedBy,
    documentName: obj.documentName,
    ownerName: obj.ownerName,
    documentType: obj.documentType,
    description: obj.description,
    status: obj.status,
    uploadDate: obj.createdAt,
    dateFound: obj.dateFound,
    locationFound: obj.locationFound,
    referenceId: obj.referenceId,
    isPublic: obj.isPublic,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
    verifiedAt: obj.verifiedAt,
    rejectionReason: obj.rejectionReason,
  };

  if (includeSensitive) {
    serialized.documentNumber = obj.idNumber;
    serialized.idNumber = obj.idNumber;
    serialized.documentNumberMasked = maskIdNumber(obj.idNumber);
    serialized.idNumberMasked = maskIdNumber(obj.idNumber);
  } else {
    serialized.documentNumberMasked = maskIdNumber(obj.idNumber);
    serialized.idNumberMasked = maskIdNumber(obj.idNumber);
    serialized.documentNumberLast4 = obj.idNumberLast4;
    serialized.idNumberLast4 = obj.idNumberLast4;
  }

  if (includeImages) {
    serialized.documentPhoto = (obj.images || []).map((img) => ({
      url: img.url,
      filename: img.filename,
    }));
    serialized.images = serialized.documentPhoto;
  }

  if (obj.uploadedBy) {
    serialized.uploadedBy =
      typeof obj.uploadedBy === 'object'
        ? serializeUser(obj.uploadedBy)
        : obj.uploadedBy;
  }

  if (obj.verifiedBy && typeof obj.verifiedBy === 'object') {
    serialized.verifiedBy = serializeUser(obj.verifiedBy);
  }

  return serialized;
};

const serializeNotification = (notification) => {
  if (!notification) return null;
  const obj = typeof notification.toObject === 'function' ? notification.toObject() : notification;
  return {
    notificationId: obj._id,
    _id: obj._id,
    userId: obj.recipient?._id || obj.recipient,
    recipient: obj.recipient,
    type: obj.type,
    title: obj.title,
    message: obj.message,
    status: obj.status || (obj.isRead ? 'read' : 'unread'),
    isRead: obj.isRead,
    relatedDocument: obj.relatedDocument,
    relatedClaim: obj.relatedClaim,
    createdDate: obj.createdAt,
    createdAt: obj.createdAt,
    metadata: obj.metadata,
  };
};

const serializeVerification = (verification) => {
  if (!verification) return null;
  const obj = typeof verification.toObject === 'function' ? verification.toObject() : verification;
  return {
    verificationId: obj._id,
    _id: obj._id,
    documentId: obj.document?._id || obj.document,
    adminId: obj.admin?._id || obj.admin,
    verificationStatus: obj.verificationStatus,
    reviewNotes: obj.reviewNotes,
    reviewDate: obj.reviewDate,
    document: obj.document,
    admin: obj.admin ? serializeUser(obj.admin) : obj.admin,
    createdAt: obj.createdAt,
  };
};

module.exports = {
  serializeUser,
  serializeDocument,
  serializeNotification,
  serializeVerification,
};
