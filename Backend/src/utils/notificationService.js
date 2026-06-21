const Notification = require('../models/Notification');

let io = null;

const setSocketIO = (socketIO) => {
  io = socketIO;
};

const sendNotification = async ({
  recipientId,
  type,
  title,
  message,
  relatedDocument,
  relatedClaim,
  metadata = {},
  status = 'unread',
}) => {
  const notification = await Notification.create({
    recipient: recipientId,
    type,
    title,
    message,
    relatedDocument,
    relatedClaim,
    metadata,
    status,
    isRead: status === 'read',
  });

  if (io) {
    io.to(`user:${recipientId}`).emit('notification', {
      notificationId: notification._id,
      _id: notification._id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      status: notification.status,
      relatedDocument: notification.relatedDocument,
      relatedClaim: notification.relatedClaim,
      isRead: notification.isRead,
      createdDate: notification.createdAt,
      createdAt: notification.createdAt,
    });
  }

  return notification;
};

module.exports = { setSocketIO, sendNotification };
