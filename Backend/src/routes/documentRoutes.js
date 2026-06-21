const express = require('express');
const {
  createDocument,
  getMyDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  searchDocuments,
  getDocumentTypes,
} = require('../controllers/documentController');
const { createDocumentRules, updateDocumentRules } = require('../validators/documentValidators');
const validate = require('../middleware/validate');
const { protect, optionalAuth } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

router.get('/search', optionalAuth, searchDocuments);
router.get('/types', getDocumentTypes);

router.use(protect);

router.post('/', upload.array('images', 5), createDocumentRules, validate, createDocument);
router.get('/my', getMyDocuments);
router.get('/:id', getDocumentById);
router.put('/:id', upload.array('images', 5), updateDocumentRules, validate, updateDocument);
router.delete('/:id', deleteDocument);

module.exports = router;
