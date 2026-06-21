const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');

const uploadsDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (ALLOWED_MIME.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, WEBP, and PDF files are allowed.'), false);
  }
};

const upload = multer({
  storage: diskStorage,
  limits: { fileSize: MAX_FILE_SIZE, files: 5 },
  fileFilter,
});

const uploadToCloudinary = async (filePath, filename) => {
  if (!isCloudinaryConfigured()) {
    return {
      url: `/uploads/${path.basename(filePath)}`,
      publicId: '',
      filename: filename || path.basename(filePath),
    };
  }

  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'foundlink/documents',
    resource_type: 'auto',
  });

  fs.unlink(filePath, () => {});

  return {
    url: result.secure_url,
    publicId: result.public_id,
    filename: filename || path.basename(filePath),
  };
};

const processUploadedFiles = async (files = []) => {
  const results = [];
  for (const file of files) {
    const uploaded = await uploadToCloudinary(file.path, file.originalname);
    results.push(uploaded);
  }
  return results;
};

const deleteFromCloudinary = async (publicId) => {
  if (publicId && isCloudinaryConfigured()) {
    await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
  }
};

module.exports = {
  upload,
  processUploadedFiles,
  deleteFromCloudinary,
  uploadsDir,
};
