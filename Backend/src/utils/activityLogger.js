const ActivityLog = require('../models/ActivityLog');

const logActivity = async ({
  user,
  action,
  description = '',
  req,
  status = 'success',
  metadata = {},
}) => {
  try {
    await ActivityLog.create({
      user: user?._id || user,
      action,
      description,
      ipAddress: req?.ip || req?.headers?.['x-forwarded-for'] || '',
      userAgent: req?.headers?.['user-agent'] || '',
      device: req?.headers?.['x-device'] || '',
      location: req?.headers?.['x-location'] || '',
      status,
      metadata,
    });
  } catch (err) {
    console.error('Activity log error:', err.message);
  }
};

module.exports = logActivity;
