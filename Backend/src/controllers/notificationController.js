const Notification = require('../models/Notification');
const { serializeNotification } = require('../utils/entitySerializer');

const getNotifications = async (req, res, next) => {
  try {
    const { unreadOnly, page = 1, limit = 20 } = req.query;
    const filter = { recipient: req.user._id };
    if (unreadOnly === 'true') filter.isRead = false;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const [notifications, total, unreadCount] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit, 10))
        .populate('relatedDocument', 'documentName documentType referenceId')
        .populate('relatedClaim', 'referenceId status'),
      Notification.countDocuments(filter),
      Notification.countDocuments({ recipient: req.user._id, isRead: false }),
    ]);

    res.json({
      success: true,
      data: notifications.map((n) => serializeNotification(n)),
      unreadCount,
      pagination: {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        total,
        pages: Math.ceil(total / parseInt(limit, 10)),
      },
    });
  } catch (err) {
    next(err);
  }
};

const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({ success: false, message: 'Notification not found.' });
    }

    notification.isRead = true;
    notification.status = 'read';
    await notification.save();

    res.json({ success: true, message: 'Marked as read.', data: serializeNotification(notification) });
  } catch (err) {
    next(err);
  }
};

const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, isRead: false },
      { isRead: true, status: 'read' }
    );
    res.json({ success: true, message: 'All notifications marked as read.' });
  } catch (err) {
    next(err);
  }
};

const deleteNotification = async (req, res, next) => {
  try {
    const result = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id,
    });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Notification not found.' });
    }

    res.json({ success: true, message: 'Notification deleted.' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
};
