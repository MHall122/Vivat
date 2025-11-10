const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config/constants');

// Import routes
const authRoutes = require('./routes/auth.routes');
const winesRoutes = require('./routes/wines.routes');
const eventsRoutes = require('./routes/events.routes');
const galleryRoutes = require('./routes/gallery.routes');
const uploadRoutes = require('./routes/upload.routes');
const heroRoutes = require('./routes/hero.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(config.PUBLIC_DIR));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/wines', winesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/hero', heroRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Winery API is running' });
});

// Serve the React app for all non-API routes (must be last!)
app.get(/^\/(?!api|images).*/, (req, res) => {
  res.sendFile(path.join(config.PUBLIC_DIR, 'index.html'));
});

// Start server
app.listen(config.PORT, () => {
  console.log(`🍷 Winery API server running on http://localhost:${config.PORT}`);
  console.log(`📁 Wines data: ${config.WINES_FILE}`);
  console.log(`📁 Events data: ${config.EVENTS_FILE}`);
  console.log(`📁 Gallery data: ${config.GALLERY_FILE}`);
});
