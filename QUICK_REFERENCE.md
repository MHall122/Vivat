# Quick Reference Card

## 🚀 Getting Started (30 seconds)

```bash
npm install
npm start
# Visit: http://localhost:3000
# Login: admin / winery123
```

## 📂 Where to Find Things

| Need to... | Look in... |
|-----------|-----------|
| Change admin password | `server/config/constants.js` |
| Add a new API endpoint | `server/routes/*.routes.js` |
| Modify a UI component | `public/js/components/*.js` |
| Change upload settings | `server/middleware/upload.js` |
| Update styles | `public/css/styles.css` |
| Configure the server | `server/config/constants.js` |

## 🔧 Common Tasks

### Add a New Wine Type Category
Edit: `public/js/components/HomePage.js`
```javascript
const categories = [
  { label: 'Your New Category', types: ['Type Name'] },
  // ... existing categories
];
```

### Change Upload Limits
Edit: `server/config/constants.js`
```javascript
MAX_FILE_SIZE: 10 * 1024 * 1024,  // Change to 10MB
MAX_EVENT_IMAGES: 50,              // Allow 50 images
```

### Add a New API Endpoint
1. Create route in `server/routes/yourname.routes.js`
2. Import in `server/server.js`
3. Mount: `app.use('/api/yourname', yournameRoutes);`

### Create a New Component
1. Create `public/js/components/YourComponent.js`
2. Add to `public/index.html`: 
   ```html
   <script type="text/babel" src="/js/components/YourComponent.js"></script>
   ```
3. Use in parent component

## 📁 File Structure Cheat Sheet

```
server/
├── server.js              ← Main entry point
├── config/
│   └── constants.js       ← Configuration
├── middleware/
│   └── upload.js          ← File uploads
├── routes/
│   ├── auth.routes.js     ← Login
│   ├── wines.routes.js    ← Wine CRUD
│   ├── events.routes.js   ← Event CRUD
│   ├── gallery.routes.js  ← Gallery CRUD
│   └── upload.routes.js   ← Image uploads
└── utils/
    └── fileHandler.js     ← File operations

public/
├── index.html             ← HTML shell
├── css/
│   └── styles.css         ← Global styles
├── js/
│   ├── app.js             ← Main app
│   ├── components/        ← UI components (11 files)
│   └── utils/
│       └── api.js         ← API calls
└── images/                ← Uploaded images
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/login` - Login

### Wines
- `GET /api/wines` - Get all
- `POST /api/wines` - Create
- `PUT /api/wines/:id` - Update
- `DELETE /api/wines/:id` - Delete

### Events
- `GET /api/events` - Get all
- `GET /api/events/:id` - Get one
- `POST /api/events` - Create
- `PUT /api/events/:id` - Update
- `DELETE /api/events/:id` - Delete

### Images
- `POST /api/upload/wine-image` - Upload wine image
- `POST /api/upload/gallery-image` - Upload gallery image
- `POST /api/upload/event-images` - Upload event images

## 🧩 Component Map

```
App (app.js)
└── HomePage
    ├── Header              ← Navigation
    ├── HeroSection         ← Landing
    ├── WineCard (×N)       ← Wine display
    ├── EventCard (×N)      ← Event display
    ├── ContactItem (×4)    ← Contact info
    ├── Footer              ← Footer
    ├── LoginModal          ← Admin login
    └── Modal               ← Add/Edit content
        ├── WineForm
        └── EventForm
```

## 💡 Pro Tips

### Debugging
1. Check browser console for errors
2. Check terminal for server logs
3. Verify JSON files are valid
4. Check file permissions

### Development
```bash
# Auto-restart on changes
npm run dev

# Check for errors
node server/server.js
```

### Data Files
- `wines.json` - Wine data
- `events.json` - Event data
- `gallery.json` - Gallery data

### Environment
```bash
# Recommended for production
PORT=3000
NODE_ENV=production
ADMIN_USERNAME=your_username
ADMIN_PASSWORD=your_password
```

## 🔒 Security Checklist

Before production:
- [ ] Change admin credentials
- [ ] Use environment variables
- [ ] Enable HTTPS
- [ ] Set CORS restrictions
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Sanitize file uploads
- [ ] Add authentication middleware

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port already in use | Change PORT in `server/config/constants.js` |
| Images not uploading | Check directory permissions |
| Can't login | Verify credentials in `constants.js` |
| 404 errors | Check route paths match |
| Components not rendering | Check script order in `index.html` |

## 📊 Key Metrics

- **Total Files:** 29
- **Backend Files:** 8
- **Frontend Files:** 13
- **Documentation:** 4
- **Average File Size:** ~80 lines
- **Largest File:** ~300 lines

## 🎨 Styling

Colors:
- Wine: `#722f37`
- Gold: `#d4af37`
- Beige: `#f9f5f0`

Fonts:
- Headings: Playfair Display
- Body: Lato

## 📚 Documentation

1. **README.md** - Full guide
2. **PROJECT_STRUCTURE.md** - Architecture
3. **MIGRATION_GUIDE.md** - Migration help
4. **REFACTORING_SUMMARY.md** - Overview
5. **QUICK_REFERENCE.md** - This file

## 🔄 Git Workflow

```bash
# Recommended structure
git add server/routes/new-feature.routes.js
git commit -m "feat: add new feature endpoint"

git add public/js/components/NewComponent.js
git commit -m "feat: add NewComponent"

git add server/config/constants.js
git commit -m "chore: update configuration"
```

## 🎓 Learning Resources

- Express.js: https://expressjs.com/
- React: https://react.dev/
- Multer: https://github.com/expressjs/multer
- Tailwind: https://tailwindcss.com/

---

**Keep this card handy for quick reference!** 📌
