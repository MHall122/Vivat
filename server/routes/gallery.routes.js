const express = require('express');
const router = express.Router();
const { readJsonFile, writeJsonFile } = require('../utils/fileHandler');
const config = require('../config/constants');

/**
 * GET /api/gallery
 * Get all gallery posts
 */
router.get('/', async (req, res) => {
  try {
    const gallery = await readJsonFile(config.GALLERY_FILE);
    res.json(gallery);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: 'Failed to read gallery data' });
  }
});

/**
 * POST /api/gallery
 * Create a new gallery post
 */
router.post('/', async (req, res) => {
  try {
    const gallery = await readJsonFile(config.GALLERY_FILE);
    const newPost = {
      id: Date.now(),
      ...req.body,
      date: new Date().toISOString().split('T')[0]
    };
    gallery.unshift(newPost);
    await writeJsonFile(config.GALLERY_FILE, gallery);
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating gallery post:', error);
    res.status(500).json({ error: 'Failed to create gallery post' });
  }
});

/**
 * PUT /api/gallery/:id
 * Update an existing gallery post
 */
router.put('/:id', async (req, res) => {
  try {
    const gallery = await readJsonFile(config.GALLERY_FILE);
    const postId = parseInt(req.params.id);
    const postIndex = gallery.findIndex(p => p.id === postId);
    
    if (postIndex === -1) {
      return res.status(404).json({ error: 'Gallery post not found' });
    }
    
    gallery[postIndex] = {
      ...gallery[postIndex],
      ...req.body,
      id: postId
    };
    
    await writeJsonFile(config.GALLERY_FILE, gallery);
    res.json(gallery[postIndex]);
  } catch (error) {
    console.error('Error updating gallery post:', error);
    res.status(500).json({ error: 'Failed to update gallery post' });
  }
});

/**
 * DELETE /api/gallery/:id
 * Delete a gallery post
 */
router.delete('/:id', async (req, res) => {
  try {
    const gallery = await readJsonFile(config.GALLERY_FILE);
    const postId = parseInt(req.params.id);
    const filteredGallery = gallery.filter(p => p.id !== postId);
    
    if (gallery.length === filteredGallery.length) {
      return res.status(404).json({ error: 'Gallery post not found' });
    }
    
    await writeJsonFile(config.GALLERY_FILE, filteredGallery);
    res.json({ message: 'Gallery post deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery post:', error);
    res.status(500).json({ error: 'Failed to delete gallery post' });
  }
});

module.exports = router;
