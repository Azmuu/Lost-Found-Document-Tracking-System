const express = require('express');
const {
  createClaim,
  getMyClaims,
  getClaimById,
  cancelClaim,
} = require('../controllers/claimController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/document/:documentId', createClaim);
router.get('/my', getMyClaims);
router.get('/:id', getClaimById);
router.put('/:id/cancel', cancelClaim);

module.exports = router;
