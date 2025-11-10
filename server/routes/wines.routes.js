const express = require('express');
const router = express.Router();
const { readJsonFile, writeJsonFile } = require('../utils/fileHandler');
const config = require('../config/constants');

/**
 * GET /api/wines
 * Get all wines
 */
router.get('/', async (req, res) => {
  try {
    const wines = await readJsonFile(config.WINES_FILE);
    res.json(wines);
  } catch (error) {
    console.error('Error fetching wines:', error);
    res.status(500).json({ error: 'Failed to read wines data' });
  }
});

/**
 * POST /api/wines
 * Create a new wine
 */
router.post('/', async (req, res) => {
  try {
    const wines = await readJsonFile(config.WINES_FILE);
    const newWine = {
      id: Date.now(),
      ...req.body
    };
    wines.push(newWine);
    await writeJsonFile(config.WINES_FILE, wines);
    res.status(201).json(newWine);
  } catch (error) {
    console.error('Error creating wine:', error);
    res.status(500).json({ error: 'Failed to create wine' });
  }
});

/**
 * PUT /api/wines/:id
 * Update an existing wine
 */
router.put('/:id', async (req, res) => {
  try {
    const wines = await readJsonFile(config.WINES_FILE);
    const wineId = parseInt(req.params.id);
    const wineIndex = wines.findIndex(w => w.id === wineId);
    
    if (wineIndex === -1) {
      return res.status(404).json({ error: 'Wine not found' });
    }
    
    wines[wineIndex] = {
      ...wines[wineIndex],
      ...req.body,
      id: wineId
    };
    
    await writeJsonFile(config.WINES_FILE, wines);
    res.json(wines[wineIndex]);
  } catch (error) {
    console.error('Error updating wine:', error);
    res.status(500).json({ error: 'Failed to update wine' });
  }
});

/**
 * DELETE /api/wines/:id
 * Delete a wine
 */
router.delete('/:id', async (req, res) => {
  try {
    const wines = await readJsonFile(config.WINES_FILE);
    const wineId = parseInt(req.params.id);
    const filteredWines = wines.filter(w => w.id !== wineId);
    
    if (wines.length === filteredWines.length) {
      return res.status(404).json({ error: 'Wine not found' });
    }
    
    await writeJsonFile(config.WINES_FILE, filteredWines);
    res.json({ message: 'Wine deleted successfully' });
  } catch (error) {
    console.error('Error deleting wine:', error);
    res.status(500).json({ error: 'Failed to delete wine' });
  }
});

module.exports = router;
