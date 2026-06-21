const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const logActivity = require('../utils/activityLogger');
const { processUploadedFiles } = require('../middleware/upload');

const updateProfile = async (req, res, next) => {
  try {
    const allowed = ['name', 'phone', 'location', 'twoFactorEnabled'];
    const updates = {};

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    if (req.files?.length) {
      const images = await processUploadedFiles(req.files);
      if (images[0]) updates.avatar = images[0].url;
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    await logActivity({
      user,
      action: 'profile_update',
      description: 'Profile updated',
      req,
    });

    res.json({ success: true, message: 'Profile updated.', user: user.toPublicJSON() });
  } catch (err) {
    next(err);
  }
};

const getMyActivityLogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      ActivityLog.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ActivityLog.countDocuments({ user: req.user._id }),
    ]);

    res.json({
      success: true,
      data: logs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { updateProfile, getMyActivityLogs };
