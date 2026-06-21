const express = require('express');
const { updateProfile, getMyActivityLogs } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

router.use(protect);

router.put('/profile', upload.single('avatar'), updateProfile);
router.get('/activity-logs', getMyActivityLogs);

module.exports = router;
