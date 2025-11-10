const path = require('path');

module.exports = {
  PORT: 3000,
  
  // Directory paths
  UPLOAD_DIR: path.join(__dirname, '..', '..', 'public', 'images', 'wines'),
  GALLERY_UPLOAD_DIR: path.join(__dirname, '..', '..', 'public', 'images', 'gallery'),
  EVENT_UPLOAD_DIR: path.join(__dirname, '..', '..', 'public', 'images', 'events'),
  HERO_UPLOAD_DIR: path.join(__dirname, '..', '..', 'public', 'images', 'hero'),
  PUBLIC_DIR: path.join(__dirname, '..', '..', 'public'),
  
  // Data file paths
  WINES_FILE: path.join(__dirname, '..', '..', 'wines.json'),
  EVENTS_FILE: path.join(__dirname, '..', '..', 'events.json'),
  GALLERY_FILE: path.join(__dirname, '..', '..', 'gallery.json'),
  HERO_FILE: path.join(__dirname, '..', '..', 'hero.json'),
  
  // Admin credentials (TODO: Use environment variables in production!)
  ADMIN_CREDENTIALS: {
    username: 'admin',
    password: 'winery123'
  },
  
  // File upload limits
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_EVENT_IMAGES: 20,
  
  // Allowed image file types
  ALLOWED_IMAGE_TYPES: /jpeg|jpg|png|gif|webp/
};
