const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const logActivity = require('../utils/activityLogger');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email already registered.' });
    }

    const user = await User.create({ name, email, password });

    await logActivity({
      user,
      action: 'register',
      description: 'New user registered',
      req,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful.',
      token,
      user: user.toPublicJSON(),
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      await logActivity({
        action: 'failed_login',
        description: `Failed login attempt for ${email}`,
        req,
        status: 'blocked',
        metadata: { email },
      });
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (!user.isActive) {
      return res.status(403).json({ success: false, message: 'Account has been deactivated.' });
    }

    user.lastLoginAt = new Date();
    await user.save({ validateBeforeSave: false });

    await logActivity({
      user,
      action: 'login',
      description: 'User logged in',
      req,
    });

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: user.toPublicJSON(),
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res) => {
  res.json({ success: true, user: req.user.toPublicJSON() });
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: true,
        message: 'If that email exists, a reset link has been sent.',
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 60 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    // In production, send email with resetToken. For dev, return token in response.
    const response = {
      success: true,
      message: 'If that email exists, a reset link has been sent.',
    };

    if (process.env.NODE_ENV === 'development') {
      response.resetToken = resetToken;
    }

    res.json(response);
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    }).select('+password');

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token.' });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    await logActivity({
      user,
      action: 'password_reset',
      description: 'Password reset via token',
      req,
    });

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Password reset successful.',
      token,
      user: user.toPublicJSON(),
    });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!(await user.comparePassword(currentPassword))) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    user.password = newPassword;
    await user.save();

    await logActivity({
      user,
      action: 'password_change',
      description: 'Password changed',
      req,
    });

    res.json({ success: true, message: 'Password updated successfully.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
};
