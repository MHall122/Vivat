const multer = require('multer');
const path = require('path');
const fsSync = require('fs');
const config = require('../config/constants');

// Ensure upload directories exist
[config.UPLOAD_DIR, config.GALLERY_UPLOAD_DIR, config.EVENT_UPLOAD_DIR, config.HERO_UPLOAD_DIR].forEach(dir => {
  if (!fsSync.existsSync(dir)) {
    fsSync.mkdirSync(dir, { recursive: true });
  }
});

// File filter for image validation
const fileFilter = function (req, file, cb) {
  const mimetype = config.ALLOWED_IMAGE_TYPES.test(file.mimetype);
  const extname = config.ALLOWED_IMAGE_TYPES.test(path.extname(file.originalname).toLowerCase());
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Only image files are allowed!'));
};

// Configure multer for wine image uploads
const wineStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'wine-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure multer for gallery image uploads
const galleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.GALLERY_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'gallery-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure multer for event image uploads
const eventStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.EVENT_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'event-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure multer for hero slideshow image uploads
const heroStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.HERO_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'hero-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const wineUpload = multer({ 
  storage: wineStorage,
  limits: { fileSize: config.MAX_FILE_SIZE },
  fileFilter: fileFilter
});

const galleryUpload = multer({ 
  storage: galleryStorage,
  limits: { fileSize: config.MAX_FILE_SIZE },
  fileFilter: fileFilter
});

const eventUpload = multer({ 
  storage: eventStorage,
  limits: { fileSize: config.MAX_FILE_SIZE },
  fileFilter: fileFilter
});

const heroUpload = multer({ 
  storage: heroStorage,
  limits: { fileSize: config.MAX_FILE_SIZE },
  fileFilter: fileFilter
});

module.exports = {
  wineUpload,
  galleryUpload,
  eventUpload,
  heroUpload
};
