const express = require('express');
const {
  getDashboardStats,
  getVerificationQueue,
  verifyDocument,
  rejectDocument,
  getAllDocuments,
  getAllUsers,
  updateUser,
  getAllClaims,
  updateClaimStatus,
  getActivityLogs,
  getVerifications,
  updatePrivacySettings,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/verification-queue', getVerificationQueue);
router.put('/documents/:id/verify', verifyDocument);
router.put('/documents/:id/reject', rejectDocument);
router.get('/documents', getAllDocuments);
router.put('/privacy', updatePrivacySettings);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.get('/claims', getAllClaims);
router.put('/claims/:id', updateClaimStatus);
router.get('/verifications', getVerifications);
router.get('/activity-logs', getActivityLogs);

module.exports = router;
