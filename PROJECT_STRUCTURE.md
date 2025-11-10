# Vivat Alfa Winery - Refactored Project Structure

## Overview
This project has been refactored from monolithic files into a modular, maintainable structure.

## Directory Structure

```
vivat-alfa-winery/
├── server/
│   ├── server.js                 # Main server entry point
│   ├── config/
│   │   └── constants.js          # Configuration and constants
│   ├── middleware/
│   │   └── upload.js             # Multer configuration for file uploads
│   ├── routes/
│   │   ├── auth.routes.js        # Authentication endpoints
│   │   ├── wines.routes.js       # Wine CRUD endpoints
│   │   ├── events.routes.js      # Event CRUD endpoints
│   │   ├── gallery.routes.js     # Gallery CRUD endpoints
│   │   └── upload.routes.js      # Image upload endpoints
│   └── utils/
│       └── fileHandler.js        # JSON file read/write utilities
├── public/
│   ├── index.html                # Main HTML shell
│   ├── css/
│   │   └── styles.css            # Global styles
│   ├── js/
│   │   ├── app.js                # Main React app component
│   │   ├── components/
│   │   │   ├── Header.js         # Header navigation
│   │   │   ├── HeroSection.js    # Hero/landing section
│   │   │   ├── WineCard.js       # Individual wine card
│   │   │   ├── EventCard.js      # Individual event card
│   │   │   ├── EventPage.js      # Full event page view
│   │   │   ├── ContactItem.js    # Contact info item
│   │   │   ├── Footer.js         # Footer component
│   │   │   ├── LoginModal.js     # Admin login modal
│   │   │   └── Modal.js          # Content add/edit modal
│   │   └── utils/
│   │       └── api.js            # API utility functions
│   └── images/
│       ├── wines/
│       ├── events/
│       └── gallery/
├── wines.json
├── events.json
├── gallery.json
└── package.json
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node server/server.js
   ```

3. Visit: http://localhost:3000

## Key Improvements

- **Modular Backend**: Routes separated by resource type
- **Reusable Components**: React components in separate files
- **Better Maintainability**: Easy to find and update specific functionality
- **Cleaner Code**: Single responsibility principle applied throughout
- **Easier Testing**: Individual modules can be tested independently
