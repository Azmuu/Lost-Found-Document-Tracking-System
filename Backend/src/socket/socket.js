const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { setSocketIO } = require('../utils/notificationService');

const initSocket = (io) => {
  setSocketIO(io);

  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers?.authorization?.replace('Bearer ', '');

      if (!token) {
        return next(new Error('Authentication required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
      const user = await User.findById(decoded.id);

      if (!user || !user.isActive) {
        return next(new Error('Unauthorized'));
      }

      socket.userId = user._id.toString();
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    socket.join(`user:${socket.userId}`);

    socket.emit('connected', {
      message: 'Connected to FoundLink real-time notifications',
      userId: socket.userId,
    });

    socket.on('disconnect', () => {
      socket.leave(`user:${socket.userId}`);
    });
  });
};

module.exports = initSocket;
