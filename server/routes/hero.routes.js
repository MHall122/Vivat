const express = require('express');
const router = express.Router();
const { readJsonFile, writeJsonFile } = require('../utils/fileHandler');
const config = require('../config/constants');

/**
 * GET /api/hero
 * Get hero slideshow images
 */
router.get('/', async (req, res) => {
  try {
    const hero = await readJsonFile(config.HERO_FILE);
    res.json(hero);
  } catch (error) {
    console.error('Error fetching hero images:', error);
    // Return empty array if file doesn't exist yet
    res.json({ images: [] });
  }
});

/**
 * PUT /api/hero
 * Update hero slideshow images
 */
router.put('/', async (req, res) => {
  try {
    const { images } = req.body;
    await writeJsonFile(config.HERO_FILE, { images: images || [] });
    res.json({ images: images || [] });
  } catch (error) {
    console.error('Error updating hero images:', error);
    res.status(500).json({ error: 'Failed to update hero images' });
  }
});

module.exports = router;
