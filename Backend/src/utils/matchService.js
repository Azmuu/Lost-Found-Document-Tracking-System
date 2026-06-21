const User = require('../models/User');
const Document = require('../models/Document');
const { sendNotification } = require('./notificationService');

const buildSearchFilter = (criteria = {}) => {
  const filter = { isPublic: true, status: 'verified' };

  if (criteria.documentType && criteria.documentType !== 'All Types') {
    filter.documentType = criteria.documentType;
  }
  if (criteria.documentName) {
    filter.documentName = { $regex: criteria.documentName, $options: 'i' };
  }
  if (criteria.ownerName) {
    filter.ownerName = { $regex: criteria.ownerName, $options: 'i' };
  }
  if (criteria.idLast4) {
    filter.idNumberLast4 = { $regex: criteria.idLast4, $options: 'i' };
  }
  if (criteria.foundAfter) {
    filter.dateFound = { $gte: new Date(criteria.foundAfter) };
  }
  if (criteria.q) {
    filter.$text = { $search: criteria.q };
  }

  return filter;
};

const findMatchingDocuments = async (criteria, { limit = 12, skip = 0, sort = 'recent' } = {}) => {
  const filter = buildSearchFilter(criteria);
  const sortOption =
    sort === 'oldest' ? { dateFound: 1 } : sort === 'name' ? { documentName: 1 } : { dateFound: -1 };

  const [documents, total] = await Promise.all([
    Document.find(filter).sort(sortOption).skip(skip).limit(limit).select('-idNumber'),
    Document.countDocuments(filter),
  ]);

  return { documents, total, filter };
};

const notifySearchMatches = async (userId, documents, criteria) => {
  if (!userId || !documents.length) return;

  const summary = [
    criteria.ownerName && `owner "${criteria.ownerName}"`,
    criteria.documentType && `type ${criteria.documentType}`,
    criteria.documentName && `name "${criteria.documentName}"`,
    criteria.q && `keywords "${criteria.q}"`,
  ]
    .filter(Boolean)
    .join(', ');

  await sendNotification({
    recipientId: userId,
    type: 'match_alert',
    title: 'Potential Match Found',
    message: `${documents.length} document(s) match your search${summary ? ` (${summary})` : ''}. Review results and submit a claim if yours.`,
    relatedDocument: documents[0]._id,
    metadata: { matchCount: documents.length, criteria },
    status: 'unread',
  });
};

const notifyPotentialOwners = async (doc) => {
  if (!doc.ownerName?.trim()) return;

  const nameParts = doc.ownerName.trim().split(/\s+/).filter((p) => p.length > 2);
  if (!nameParts.length) return;

  const orConditions = nameParts.map((part) => ({
    name: { $regex: part, $options: 'i' },
  }));

  const users = await User.find({
    role: 'user',
    isActive: true,
    _id: { $ne: doc.uploadedBy },
    $or: orConditions,
  }).limit(20);

  for (const user of users) {
    await sendNotification({
      recipientId: user._id,
      type: 'match_alert',
      title: 'New Verified Document May Be Yours',
      message: `A verified ${doc.documentType} for "${doc.ownerName}" is now available. Search and claim if it belongs to you.`,
      relatedDocument: doc._id,
      status: 'unread',
    });
  }
};

module.exports = {
  buildSearchFilter,
  findMatchingDocuments,
  notifySearchMatches,
  notifyPotentialOwners,
};
