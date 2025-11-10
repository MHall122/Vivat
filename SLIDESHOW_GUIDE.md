# Hero Slideshow Feature Guide

## Overview

The hero slideshow allows you to display up to 5 rotating background images on your homepage's main section. Images automatically transition every 5 seconds and can be controlled with navigation arrows and dots.

## Features

✅ **5 Image Slots** - Display up to 5 high-quality images  
✅ **Auto-Rotation** - Images change every 5 seconds automatically  
✅ **Manual Navigation** - Previous/Next arrows and dot indicators  
✅ **Admin Management** - Easy upload and removal of images  
✅ **Responsive Design** - Looks great on all devices  
✅ **Dark Overlay** - Text remains readable over any image  

## How to Use

### For Administrators

#### 1. Access the Slideshow Editor

1. Log in as admin (click the 🔒 button bottom-left)
2. Look for the **"✏️ Edit Slideshow"** button in the top-right of the hero section
3. Click to open the slideshow editor

#### 2. Add Images

1. Click **"Choose Files"** or drag images to the upload area
2. Select up to 5 images (you can select multiple at once)
3. See instant previews of your selected images
4. Click **"Save Slideshow"** to upload and activate

#### 3. Remove Images

1. Hover over any current image in the editor
2. Click the **"✕"** button that appears in the top-right corner
3. The image will be removed (but not saved until you click "Save Slideshow")

#### 4. Reorder Images

Currently, images are displayed in the order they were added. To reorder:
1. Remove all images
2. Re-upload them in your desired order

### Image Requirements

**Recommended Specifications:**
- **Resolution:** 1920×1080 pixels or larger
- **Orientation:** Landscape (horizontal)
- **Format:** JPG, PNG, WebP, or GIF
- **File Size:** Under 5MB per image
- **Aspect Ratio:** 16:9 works best

**Content Guidelines:**
- Use high-quality, professional photos
- Ensure good contrast (text needs to be readable)
- Choose images that represent your winery
- Avoid images with important details in the center (text appears there)
- Dark or evenly-lit images work best

## Technical Details

### File Structure

**Backend:**
- `server/routes/hero.routes.js` - API endpoints for hero data
- `server/middleware/upload.js` - Image upload configuration
- `server/config/constants.js` - Contains `HERO_FILE` and `HERO_UPLOAD_DIR`
- `hero.json` - Stores image URLs

**Frontend:**
- `public/js/components/HeroSection.js` - Slideshow display
- `public/js/components/HeroModal.js` - Admin editor
- `public/images/hero/` - Uploaded images directory

### API Endpoints

**GET /api/hero**
```json
Response: { "images": ["url1", "url2", ...] }
```

**PUT /api/hero**
```json
Request: { "images": ["url1", "url2", ...] }
Response: { "images": ["url1", "url2", ...] }
```

**POST /api/upload/hero-images**
```
Body: FormData with multiple "images" files
Response: { "imageUrls": ["url1", "url2", ...] }
```

### Slideshow Behavior

**Transition:**
- **Duration:** 1 second fade
- **Interval:** 5 seconds per slide
- **Effect:** Smooth opacity transition

**Navigation:**
- **Arrow Keys:** Previous (‹) and Next (›) buttons
- **Indicators:** Clickable dots at bottom
- **Auto-advance:** Pauses on manual navigation, resumes after

**Responsive:**
- Full viewport height on all devices
- Text scales appropriately
- Touch-friendly navigation on mobile

## Customization

### Change Transition Speed

Edit `HeroSection.js`:

```javascript
// Change from 5000 (5 seconds) to your desired milliseconds
const interval = setInterval(() => {
  setCurrentSlide((prev) => (prev + 1) % heroImages.length);
}, 5000); // Change this value
```

### Change Transition Duration

Edit `HeroSection.js`:

```javascript
// Find this line and change duration-1000 to your desired milliseconds
className="absolute inset-0 transition-opacity duration-1000"
```

### Modify Overlay Darkness

Edit `HeroSection.js`:

```javascript
// Change rgba(0,0,0,0.5) - the last number (0.5) controls darkness
// 0 = transparent, 1 = completely black
backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`
```

### Change Maximum Images

1. **Backend** - Edit `server/routes/upload.routes.js`:
```javascript
heroUpload.array('images', 5) // Change 5 to your desired max
```

2. **Frontend** - Edit `HeroModal.js`:
```javascript
const remainingSlots = 5 - images.length; // Change 5
```

## Troubleshooting

### Images Not Displaying

**Check:**
1. Images uploaded successfully (check `/public/images/hero/` directory)
2. `hero.json` contains image URLs
3. Browser console for errors
4. Image file formats are supported

**Solution:**
```bash
# Check hero.json
cat hero.json

# Check images directory
ls -la public/images/hero/

# Restart server
npm restart
```

### Slideshow Not Auto-Advancing

**Possible Causes:**
- Only one image uploaded (no rotation needed)
- JavaScript error in console
- Browser tab not active (some browsers pause intervals)

**Solution:**
- Upload at least 2 images
- Check browser console for errors
- Ensure page is active

### Images Too Large / Slow Loading

**Problem:** Large images slow down page load

**Solution:**
1. Optimize images before uploading
2. Use tools like TinyPNG or ImageOptim
3. Target file size: 200-500KB per image
4. Consider using WebP format

### Upload Fails

**Error:** "Failed to upload images"

**Check:**
1. File size under 5MB per image
2. Correct image format (JPG, PNG, WebP, GIF)
3. Server has write permissions to `/public/images/hero/`
4. Disk space available

**Solution:**
```bash
# Check directory permissions
chmod 755 public/images/hero

# Check disk space
df -h
```

## Best Practices

### Content Strategy

1. **Variety:** Mix vineyard, wine, and event photos
2. **Seasons:** Update images seasonally
3. **Quality:** Only use professional or high-quality photos
4. **Branding:** Maintain consistent visual style
5. **Testing:** Preview on different devices

### Performance

1. **Optimize Images:** Compress before uploading
2. **Lazy Loading:** Images load efficiently
3. **Cache:** Browsers cache images for repeat visits
4. **Limit:** Stick to 5 images maximum

### Accessibility

1. **Contrast:** Ensure text is readable
2. **Alt Text:** Images have descriptive filenames
3. **Navigation:** Keyboard accessible (arrow buttons)
4. **Motion:** Consider users with motion sensitivity

## Examples

### Example 1: Seasonal Rotation

**Spring:**
- Vineyard with spring blossoms
- Fresh green vines
- Spring tasting event

**Summer:**
- Lush green vineyards
- Outdoor wine tasting
- Sunset over vines

**Fall:**
- Harvest scenes
- Fall foliage in vineyard
- Grape clusters ready for picking

**Winter:**
- Snow-covered vineyard
- Cozy indoor tasting room
- Winter barrel room

### Example 2: Event Focus

- Annual wine release party
- Harvest festival highlights
- Live music events
- Food pairing dinners
- Behind-the-scenes winemaking

### Example 3: Product Showcase

- Different wine varieties
- Barrel aging process
- Bottle closeups
- Wine pouring shots
- Vineyard landscapes

## FAQ

**Q: Can I use vertical images?**
A: It's not recommended. Horizontal images work best for the hero section.

**Q: Will images automatically resize?**
A: Yes, images use `background-size: cover` to fill the space.

**Q: Can visitors control the slideshow?**
A: Yes, they can use arrow buttons and dot indicators.

**Q: Do images loop?**
A: Yes, the slideshow loops infinitely.

**Q: Can I disable auto-advance?**
A: Yes, comment out the `setInterval` in `HeroSection.js`.

**Q: Are images stored in the database?**
A: No, they're stored as files. Only URLs are in `hero.json`.

**Q: What happens if I delete hero.json?**
A: The slideshow will show the default gradient background.

**Q: Can I add captions to images?**
A: Not currently, but you can modify `HeroSection.js` to add this feature.

## Support

For additional help:
1. Check browser console for errors
2. Review server logs
3. Verify file permissions
4. Check `hero.json` content

---

**Enjoy your new hero slideshow!** 🍷✨
