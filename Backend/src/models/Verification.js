const mongoose = require('mongoose');

const VERIFICATION_STATUSES = ['pending', 'approved', 'rejected'];

const verificationSchema = new mongoose.Schema(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    verificationStatus: {
      type: String,
      enum: VERIFICATION_STATUSES,
      required: true,
    },
    reviewNotes: { type: String, default: '' },
    reviewDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

verificationSchema.index({ document: 1, reviewDate: -1 });
verificationSchema.index({ admin: 1 });

module.exports = mongoose.model('Verification', verificationSchema);
module.exports.VERIFICATION_STATUSES = VERIFICATION_STATUSES;
