# Vivat Alfa Winery - Modular Website

A fully refactored, modular winery website with admin CMS capabilities. Built with Express.js backend and React frontend.

## 🎯 Project Overview

This project has been completely refactored from two monolithic files into a clean, maintainable, modular architecture. The codebase is now organized into logical components that follow best practices for separation of concerns.

## 📁 Project Structure

```
vivat-alfa-winery/
├── server/                          # Backend code
│   ├── server.js                    # Main server entry point
│   ├── config/
│   │   └── constants.js             # Configuration constants
│   ├── middleware/
│   │   └── upload.js                # Multer file upload configuration
│   ├── routes/
│   │   ├── auth.routes.js           # Authentication endpoints
│   │   ├── wines.routes.js          # Wine CRUD operations
│   │   ├── events.routes.js         # Event CRUD operations
│   │   ├── gallery.routes.js        # Gallery CRUD operations
│   │   └── upload.routes.js         # Image upload endpoints
│   └── utils/
│       └── fileHandler.js           # JSON file utilities
├── public/                          # Frontend code
│   ├── index.html                   # Main HTML file
│   ├── css/
│   │   └── styles.css               # Global styles
│   ├── js/
│   │   ├── app.js                   # Main React app
│   │   ├── components/              # React components
│   │   │   ├── Header.js
│   │   │   ├── HeroSection.js
│   │   │   ├── WineCard.js
│   │   │   ├── EventCard.js
│   │   │   ├── EventPage.js
│   │   │   ├── ContactItem.js
│   │   │   ├── Footer.js
│   │   │   ├── LoginModal.js
│   │   │   ├── FormFields.js
│   │   │   ├── Modal.js
│   │   │   └── HomePage.js
│   │   └── utils/
│   │       └── api.js               # API utility functions
│   └── images/                      # Image uploads
│       ├── wines/
│       ├── events/
│       └── gallery/
├── wines.json                       # Wine data
├── events.json                      # Event data
├── gallery.json                     # Gallery data
├── package.json                     # Dependencies
├── PROJECT_STRUCTURE.md             # Architecture overview
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

Or use nodemon for auto-restart on file changes:
```bash
npm run dev
```

3. Visit the website:
```
http://localhost:3000
```

## 🔐 Admin Access

- **Username:** admin
- **Password:** winery123

**⚠️ Important:** Change these credentials in `server/config/constants.js` before deploying to production!

## 📦 Backend Architecture

### Routes

- **`/api/auth`** - Authentication
  - `POST /login` - Admin login

- **`/api/wines`** - Wine management
  - `GET /` - Get all wines
  - `POST /` - Create wine
  - `PUT /:id` - Update wine
  - `DELETE /:id` - Delete wine

- **`/api/events`** - Event management
  - `GET /` - Get all events
  - `GET /:id` - Get single event
  - `POST /` - Create event
  - `PUT /:id` - Update event
  - `DELETE /:id` - Delete event

- **`/api/gallery`** - Gallery management
  - `GET /` - Get all posts
  - `POST /` - Create post
  - `PUT /:id` - Update post
  - `DELETE /:id` - Delete post

- **`/api/upload`** - Image uploads
  - `POST /wine-image` - Upload wine image
  - `POST /gallery-image` - Upload gallery image
  - `POST /event-images` - Upload multiple event images

### Middleware

- **CORS** - Enabled for all origins
- **JSON Body Parser** - Parses JSON request bodies
- **Static Files** - Serves public directory
- **Multer** - Handles file uploads with validation

### Configuration

All configuration is centralized in `server/config/constants.js`:
- Port settings
- File paths
- Upload limits
- Admin credentials
- Allowed file types

## 🎨 Frontend Architecture

### Component Hierarchy

```
App (app.js)
├── HomePage
│   ├── Header
│   ├── HeroSection
│   ├── WineCard (multiple)
│   ├── EventCard (multiple)
│   ├── ContactItem (multiple)
│   ├── Footer
│   ├── LoginModal
│   └── Modal
│       ├── WineForm
│       │   └── FormFields
│       └── EventForm
│           ├── FormFields
│           └── EventPageFields
└── EventPage
```

### State Management

State is managed in the main `WineryWebsite` component in `app.js`:

- **Authentication State** - Login status and credentials
- **View State** - Current page view and navigation
- **Data State** - Wines and events data
- **Modal State** - Form data and UI state
- **UI State** - Loading, errors, and upload status

### API Integration

The `api.js` utility provides clean interfaces for all API calls:

```javascript
import { winesAPI, eventsAPI, uploadAPI } from './utils/api.js';

// Get all wines
const wines = await winesAPI.getAll();

// Create new wine
await winesAPI.create(wineData);

// Upload image
const { imageUrl } = await uploadAPI.uploadWineImage(file);
```

## 🎯 Key Features

### Admin CMS
- Secure login system
- Add, edit, and delete wines
- Add, edit, and delete events
- Upload and manage images
- Create dedicated event pages with galleries

### Wine Catalog
- Automatic categorization by type
- Image support with emoji fallback
- Detailed wine information

### Event Management
- Event cards on homepage
- Optional dedicated event pages
- Multi-image gallery support
- Date and description management

### Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Smooth animations and transitions

## 🔧 Configuration

### Changing Admin Credentials

Edit `server/config/constants.js`:

```javascript
ADMIN_CREDENTIALS: {
  username: 'your-username',
  password: 'your-secure-password'  // Use environment variables in production!
}
```

### Upload Limits

Modify in `server/config/constants.js`:

```javascript
MAX_FILE_SIZE: 5 * 1024 * 1024,  // 5MB
MAX_EVENT_IMAGES: 20,
```

### Allowed Image Types

Update the regex pattern in `server/config/constants.js`:

```javascript
ALLOWED_IMAGE_TYPES: /jpeg|jpg|png|gif|webp/
```

## 🛠️ Development

### Adding New Features

1. **New Backend Route:**
   - Create route file in `server/routes/`
   - Import and mount in `server/server.js`

2. **New Frontend Component:**
   - Create component in `public/js/components/`
   - Import in `index.html`
   - Use in parent component

3. **New API Endpoint:**
   - Add function to `public/js/utils/api.js`
   - Use in components

### Code Organization Principles

- **Single Responsibility:** Each file has one clear purpose
- **Separation of Concerns:** Business logic separate from presentation
- **DRY:** Reusable components and utilities
- **Modularity:** Easy to add, remove, or modify features

## 📝 Data Files

Three JSON files store the data:

- **`wines.json`** - Wine catalog
- **`events.json`** - Events and news
- **`gallery.json`** - Gallery posts

These files are automatically created if they don't exist.

## 🚀 Deployment

### Production Checklist

- [ ] Change admin credentials
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Set up proper CORS restrictions
- [ ] Implement rate limiting
- [ ] Add authentication middleware
- [ ] Use a proper database instead of JSON files
- [ ] Implement proper error logging
- [ ] Set up automated backups

### Environment Variables (Recommended)

```bash
PORT=3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password_here
NODE_ENV=production
```

## 🤝 Contributing

1. Follow the existing code structure
2. Maintain separation of concerns
3. Comment complex logic
4. Test thoroughly before committing

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

For issues or questions:
1. Check the PROJECT_STRUCTURE.md file
2. Review this README
3. Examine the code comments

## ✨ Key Improvements from Original

1. **Modular Backend** - Routes separated by resource
2. **Reusable Components** - Each UI piece is independent
3. **Better Maintainability** - Easy to find and update code
4. **Cleaner Code** - Single responsibility principle
5. **Easier Testing** - Individual modules can be tested
6. **Better Organization** - Logical file structure
7. **Centralized Config** - All settings in one place
8. **API Utilities** - Clean separation of concerns
9. **Improved Styling** - Separate CSS file
10. **Better Documentation** - Clear comments and structure

---

Made with ❤️ for Vivat Alfa Winery
