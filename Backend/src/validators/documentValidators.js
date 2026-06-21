const { body } = require('express-validator');
const { DOCUMENT_TYPES } = require('../models/Document');

const createDocumentRules = [
  body('documentName').trim().notEmpty().withMessage('Document name is required'),
  body('documentType')
    .isIn(DOCUMENT_TYPES)
    .withMessage(`Document type must be one of: ${DOCUMENT_TYPES.join(', ')}`),
  body('locationFound').trim().notEmpty().withMessage('Location found is required'),
  body('ownerName').optional().trim(),
  body('idNumber').optional().trim(),
  body('documentNumber').optional().trim(),
  body('description').optional().trim(),
  body('dateFound').optional().isISO8601().withMessage('Invalid date format'),
];

const updateDocumentRules = [
  body('documentName').optional().trim().notEmpty(),
  body('documentType').optional().isIn(DOCUMENT_TYPES),
  body('locationFound').optional().trim().notEmpty(),
  body('ownerName').optional().trim(),
  body('idNumber').optional().trim(),
  body('documentNumber').optional().trim(),
  body('description').optional().trim(),
  body('dateFound').optional().isISO8601(),
];

module.exports = { createDocumentRules, updateDocumentRules };
