const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
} = require('../controllers/authController');
const {
  registerRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules,
  changePasswordRules,
} = require('../validators/authValidators');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPasswordRules, validate, forgotPassword);
router.put('/reset-password/:token', resetPasswordRules, validate, resetPassword);
router.put('/change-password', protect, changePasswordRules, validate, changePassword);

module.exports = router;
