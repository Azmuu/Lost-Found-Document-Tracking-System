const mongoose = require('mongoose');

const DOCUMENT_TYPES = [
  'Passport',
  'National ID',
  "Driver's License",
  'Birth Certificate',
  'Certificate',
  'Work Permit',
  'Student ID',
  'Other',
];

const DOCUMENT_STATUSES = ['pending', 'in_review', 'verified', 'rejected', 'claimed', 'returned'];

const documentSchema = new mongoose.Schema(
  {
    documentName: {
      type: String,
      required: [true, 'Document name is required'],
      trim: true,
    },
    documentType: {
      type: String,
      required: [true, 'Document type is required'],
      enum: DOCUMENT_TYPES,
    },
    ownerName: {
      type: String,
      trim: true,
      default: '',
    },
    idNumber: {
      type: String,
      trim: true,
      default: '',
    },
    idNumberLast4: {
      type: String,
      trim: true,
      default: '',
    },
    locationFound: {
      type: String,
      required: [true, 'Location found is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    keywords: [{ type: String, trim: true }],
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, default: '' },
        filename: { type: String, default: '' },
      },
    ],
    status: {
      type: String,
      enum: DOCUMENT_STATUSES,
      default: 'pending',
    },
    rejectionReason: { type: String, default: '' },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: Date,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dateFound: {
      type: Date,
      default: Date.now,
    },
    isPublic: { type: Boolean, default: true },
    privacyMasked: { type: Boolean, default: true },
    referenceId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

documentSchema.index({ documentName: 'text', ownerName: 'text', description: 'text', keywords: 'text' });
documentSchema.index({ documentType: 1, status: 1, dateFound: -1 });
documentSchema.index({ idNumberLast4: 1 });
documentSchema.index({ uploadedBy: 1 });

documentSchema.pre('save', function generateReference(next) {
  if (!this.referenceId) {
    const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.referenceId = `FL-${Date.now().toString().slice(-6)}${suffix}`;
  }
  next();
});

module.exports = mongoose.model('Document', documentSchema);
module.exports.DOCUMENT_TYPES = DOCUMENT_TYPES;
module.exports.DOCUMENT_STATUSES = DOCUMENT_STATUSES;
