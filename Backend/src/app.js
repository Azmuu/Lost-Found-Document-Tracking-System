const path = require('path');
const express = require('express');
const cors = require('cors');
const { corsOptions } = require('./config/cors');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { uploadsDir } = require('./middleware/upload');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const documentRoutes = require('./routes/documentRoutes');
const claimRoutes = require('./routes/claimRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'FoundLink API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ success: false, message: 'File too large. Maximum size is 10MB.' });
  }
  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({ success: false, message: 'Too many files. Maximum is 5 images.' });
  }
  if (err.message?.includes('Only JPG')) {
    return res.status(400).json({ success: false, message: err.message });
  }
  next(err);
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
