const express = require('express');
const router = express.Router();
const { readJsonFile, writeJsonFile } = require('../utils/fileHandler');
const config = require('../config/constants');

/**
 * GET /api/events
 * Get all events
 */
router.get('/', async (req, res) => {
  try {
    const events = await readJsonFile(config.EVENTS_FILE);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to read events data' });
  }
});

/**
 * GET /api/events/:id
 * Get single event by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const events = await readJsonFile(config.EVENTS_FILE);
    const eventId = parseInt(req.params.id);
    const event = events.find(e => e.id === eventId);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to read event data' });
  }
});

/**
 * POST /api/events
 * Create a new event
 */
router.post('/', async (req, res) => {
  try {
    const events = await readJsonFile(config.EVENTS_FILE);
    const newEvent = {
      id: Date.now(),
      ...req.body,
      hasPage: req.body.hasPage || false,
      pageImages: req.body.pageImages || []
    };
    events.unshift(newEvent);
    await writeJsonFile(config.EVENTS_FILE, events);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

/**
 * PUT /api/events/:id
 * Update an existing event
 */
router.put('/:id', async (req, res) => {
  try {
    const events = await readJsonFile(config.EVENTS_FILE);
    const eventId = parseInt(req.params.id);
    const eventIndex = events.findIndex(e => e.id === eventId);
    
    if (eventIndex === -1) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    events[eventIndex] = {
      ...events[eventIndex],
      ...req.body,
      id: eventId
    };
    
    await writeJsonFile(config.EVENTS_FILE, events);
    res.json(events[eventIndex]);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

/**
 * DELETE /api/events/:id
 * Delete an event
 */
router.delete('/:id', async (req, res) => {
  try {
    const events = await readJsonFile(config.EVENTS_FILE);
    const eventId = parseInt(req.params.id);
    const filteredEvents = events.filter(e => e.id !== eventId);
    
    if (events.length === filteredEvents.length) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    await writeJsonFile(config.EVENTS_FILE, filteredEvents);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;
