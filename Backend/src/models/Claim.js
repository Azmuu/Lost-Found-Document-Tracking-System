const mongoose = require('mongoose');

const CLAIM_STATUSES = ['pending', 'under_review', 'approved', 'rejected', 'ready_for_collection', 'completed', 'cancelled'];

const claimSchema = new mongoose.Schema(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
      required: true,
    },
    claimant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: CLAIM_STATUSES,
      default: 'pending',
    },
    claimMessage: {
      type: String,
      trim: true,
      default: '',
    },
    verificationNotes: { type: String, default: '' },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: Date,
    referenceId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

claimSchema.index({ claimant: 1, status: 1 });
claimSchema.index({ document: 1 });

claimSchema.pre('save', function generateReference(next) {
  if (!this.referenceId) {
    this.referenceId = `FL-${Math.floor(100000 + Math.random() * 900000)}`;
  }
  next();
});

module.exports = mongoose.model('Claim', claimSchema);
module.exports.CLAIM_STATUSES = CLAIM_STATUSES;
