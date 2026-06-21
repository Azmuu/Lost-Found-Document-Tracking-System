const mongoose = require('mongoose');

const ACTIVITY_ACTIONS = [
  'login',
  'logout',
  'register',
  'password_change',
  'password_reset',
  'profile_update',
  'document_upload',
  'document_update',
  'document_delete',
  'document_verify',
  'document_reject',
  'claim_create',
  'claim_update',
  'claim_approve',
  'claim_reject',
  'user_update',
  'user_deactivate',
  'failed_login',
];

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: {
      type: String,
      enum: ACTIVITY_ACTIONS,
      required: true,
    },
    description: { type: String, trim: true, default: '' },
    ipAddress: { type: String, default: '' },
    userAgent: { type: String, default: '' },
    device: { type: String, default: '' },
    location: { type: String, default: '' },
    status: {
      type: String,
      enum: ['success', 'failed', 'blocked', 'completed'],
      default: 'success',
    },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

activityLogSchema.index({ user: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, createdAt: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
module.exports.ACTIVITY_ACTIONS = ACTIVITY_ACTIONS;
