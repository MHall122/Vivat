const express = require('express');
const router = express.Router();
const multer = require('multer');
const { wineUpload, galleryUpload, eventUpload, heroUpload } = require('../middleware/upload');

/**
 * POST /api/upload/wine-image
 * Upload a wine image
 */
router.post('/wine-image', (req, res) => {
  wineUpload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const imageUrl = `/images/wines/${req.file.filename}`;
    console.log('Image uploaded successfully:', imageUrl);
    res.json({ imageUrl });
  });
});

/**
 * POST /api/upload/gallery-image
 * Upload a gallery image
 */
router.post('/gallery-image', (req, res) => {
  galleryUpload.single('image')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const imageUrl = `/images/gallery/${req.file.filename}`;
    console.log('Gallery image uploaded successfully:', imageUrl);
    res.json({ imageUrl });
  });
});

/**
 * POST /api/upload/event-images
 * Upload multiple event images
 */
router.post('/event-images', (req, res) => {
  eventUpload.array('images', 20)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const imageUrls = req.files.map(file => `/images/events/${file.filename}`);
    console.log('Event images uploaded successfully:', imageUrls);
    res.json({ imageUrls });
  });
});

/**
 * POST /api/upload/hero-images
 * Upload multiple hero slideshow images
 */
router.post('/hero-images', (req, res) => {
  heroUpload.array('images', 5)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error('Multer error:', err);
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    } else if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    
    const imageUrls = req.files.map(file => `/images/hero/${file.filename}`);
    console.log('Hero images uploaded successfully:', imageUrls);
    res.json({ imageUrls });
  });
});

module.exports = router;
