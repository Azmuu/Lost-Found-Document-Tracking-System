const mongoose = require('mongoose');

const NOTIFICATION_TYPES = [
  'match_alert',
  'document_verified',
  'document_rejected',
  'claim_update',
  'claim_approved',
  'claim_rejected',
  'system',
  'security',
];

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: NOTIFICATION_TYPES,
      required: true,
    },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    relatedDocument: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
    relatedClaim: { type: mongoose.Schema.Types.ObjectId, ref: 'Claim' },
    isRead: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['unread', 'read'],
      default: 'unread',
    },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

notificationSchema.pre('save', function syncStatus(next) {
  if (this.isModified('isRead')) {
    this.status = this.isRead ? 'read' : 'unread';
  } else if (this.isModified('status')) {
    this.isRead = this.status === 'read';
  }
  next();
});

notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, status: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
module.exports.NOTIFICATION_TYPES = NOTIFICATION_TYPES;
