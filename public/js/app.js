const { useState, useEffect } = React;

function WineryWebsite() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // View state
  const [currentView, setCurrentView] = useState('home');
  const [selectedEventId, setSelectedEventId] = useState(null);

  // Data state
  const [wines, setWines] = useState([]);
  const [events, setEvents] = useState([]);
  const [heroImages, setHeroImages] = useState([]);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [contentType, setContentType] = useState('wine');
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedEventImages, setSelectedEventImages] = useState([]);

  // Load data on mount
  useEffect(() => { 
    loadData(); 
  }, []);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#event/')) {
        const eventId = parseInt(hash.replace('#event/', ''));
        setCurrentView('event-page');
        setSelectedEventId(eventId);
      } else {
        setCurrentView('home');
        setSelectedEventId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Data loading
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [winesRes, eventsRes, heroRes] = await Promise.all([
        fetch('/api/wines'),
        fetch('/api/events'),
        fetch('/api/hero')
      ]);
      
      if (!winesRes.ok || !eventsRes.ok) {
        throw new Error('Failed to load data');
      }
      
      setWines(await winesRes.json());
      setEvents(await eventsRes.json());
      
      // Hero images may not exist yet
      if (heroRes.ok) {
        const heroData = await heroRes.json();
        setHeroImages(heroData.images || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Authentication handlers
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsAuthenticated(true);
        setShowLoginModal(false);
        setLoginError('');
      } else {
        setLoginError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please try again.');
    }
  };

  const handleLogout = () => setIsAuthenticated(false);

  // Modal handlers
  const handleAddContentClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      setEditMode(false);
      setEditingId(null);
      setFormData({});
      setSelectedImage(null);
      setSelectedEventImages([]);
      setShowModal(true);
    }
  };

  // Navigation handlers
  const handleViewEventPage = (eventId) => {
    setCurrentView('event-page');
    setSelectedEventId(eventId);
    window.location.hash = `event/${eventId}`;
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedEventId(null);
    window.location.hash = '';
  };

  // Edit handlers
  const handleEditWine = (wine) => {
    setEditMode(true);
    setEditingId(wine.id);
    setContentType('wine');
    setFormData({
      wineName: wine.name,
      wineType: wine.type,
      wineDescription: wine.description,
      winePrice: wine.price,
      wineEmoji: wine.emoji,
      wineImage: wine.image || ''
    });
    setSelectedImage(null);
    setSelectedEventImages([]);
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setEditMode(true);
    setEditingId(event.id);
    setContentType('event');
    setFormData({
      eventTitle: event.title,
      eventDate: event.date,
      eventDescription: event.description,
      eventEmoji: event.emoji,
      eventImage: event.image || '',
      hasPage: event.hasPage || false,
      pageTitle: event.pageTitle || '',
      pageDescription: event.pageDescription || '',
      pageImages: event.pageImages || []
    });
    setSelectedImage(null);
    setSelectedEventImages([]);
    setShowModal(true);
  };

  // Delete handlers
  const handleDeleteWine = async (id) => {
    if (!window.confirm('Are you sure you want to delete this wine?')) return;
    try {
      const response = await fetch(`/api/wines/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete wine');
      setWines(wines.filter(wine => wine.id !== id));
    } catch (error) {
      console.error('Error deleting wine:', error);
      alert('Failed to delete wine. Please try again.');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete event');
      setEvents(events.filter(event => event.id !== id));
      if (selectedEventId === id) {
        handleBackToHome();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event. Please try again.');
    }
  };

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEventImagesSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setSelectedEventImages(files);
    
    const previews = [];
    let loadedCount = 0;
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        loadedCount++;
        if (loadedCount === files.length) {
          setFormData({ ...formData, eventImagePreviews: previews });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return null;
    setUploadingImage(true);
    try {
      const formDataImg = new FormData();
      formDataImg.append('image', selectedImage);
      const endpoint = contentType === 'gallery' ? 'gallery-image' : 'wine-image';
      const response = await fetch(`/api/upload/${endpoint}`, {
        method: 'POST',
        body: formDataImg,
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to upload image');
      }
      
      const data = await response.json();
      return data.imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error.message}`);
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEventImagesUpload = async () => {
    if (!selectedEventImages || selectedEventImages.length === 0) {
      return [];
    }
    
    setUploadingImage(true);
    try {
      const formDataImg = new FormData();
      selectedEventImages.forEach(file => {
        formDataImg.append('images', file);
      });
      
      const response = await fetch('/api/upload/event-images', {
        method: 'POST',
        body: formDataImg,
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to upload images');
      }
      
      const data = await response.json();
      return data.imageUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      alert(`Failed to upload images: ${error.message}`);
      return [];
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddContent = async () => {
    try {
      let imageUrl = '';
      
      if (contentType === 'wine') {
        imageUrl = formData.wineImage || '';
        if (selectedImage) {
          const uploadedUrl = await handleImageUpload();
          if (uploadedUrl) imageUrl = uploadedUrl;
        }
      }

      if (editMode) {
        if (contentType === 'wine') {
          const updatedWine = {
            name: formData.wineName || '',
            type: formData.wineType || '',
            description: formData.wineDescription || '',
            price: formData.winePrice || '',
            emoji: formData.wineEmoji || '🍷',
            image: imageUrl
          };
          const response = await fetch(`/api/wines/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedWine),
          });
          if (!response.ok) throw new Error('Failed to update wine');
          const savedWine = await response.json();
          setWines(wines.map(wine => wine.id === editingId ? savedWine : wine));
        } else if (contentType === 'event') {
          let eventImageUrl = formData.eventImage || '';
          if (selectedImage) {
            const uploadedUrl = await handleImageUpload();
            if (uploadedUrl) eventImageUrl = uploadedUrl;
          }

          let pageImages = formData.pageImages || [];
          
          if (selectedEventImages.length > 0) {
            const uploadedUrls = await handleEventImagesUpload();
            if (uploadedUrls.length > 0) {
              pageImages = [...pageImages, ...uploadedUrls];
            }
          }

          const updatedEvent = {
            title: formData.eventTitle || '',
            date: formData.eventDate || '',
            description: formData.eventDescription || '',
            emoji: formData.eventEmoji || '🎉',
            image: eventImageUrl,
            hasPage: formData.hasPage || false,
            pageTitle: formData.pageTitle || '',
            pageDescription: formData.pageDescription || '',
            pageImages: pageImages
          };
          const response = await fetch(`/api/events/${editingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedEvent),
          });
          if (!response.ok) throw new Error('Failed to update event');
          const savedEvent = await response.json();
          setEvents(events.map(event => event.id === editingId ? savedEvent : event));
        }
      } else {
        if (contentType === 'wine') {
          const newWine = {
            name: formData.wineName || '',
            type: formData.wineType || '',
            description: formData.wineDescription || '',
            price: formData.winePrice || '',
            emoji: formData.wineEmoji || '🍷',
            image: imageUrl
          };
          const response = await fetch('/api/wines', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newWine),
          });
          if (!response.ok) throw new Error('Failed to create wine');
          const savedWine = await response.json();
          setWines([...wines, savedWine]);
        } else if (contentType === 'event') {
          let eventImageUrl = '';
          if (selectedImage) {
            eventImageUrl = await handleImageUpload();
          }

          let pageImages = [];
          
          if (formData.hasPage && selectedEventImages.length > 0) {
            pageImages = await handleEventImagesUpload();
          }

          const newEvent = {
            title: formData.eventTitle || '',
            date: formData.eventDate || '',
            description: formData.eventDescription || '',
            emoji: formData.eventEmoji || '🎉',
            image: eventImageUrl,
            hasPage: formData.hasPage || false,
            pageTitle: formData.pageTitle || '',
            pageDescription: formData.pageDescription || '',
            pageImages: pageImages
          };
          const response = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent),
          });
          if (!response.ok) throw new Error('Failed to create event');
          const savedEvent = await response.json();
          setEvents([savedEvent, ...events]);
        }
      }

      setShowModal(false);
      setFormData({});
      setEditMode(false);
      setEditingId(null);
      setSelectedImage(null);
      setSelectedEventImages([]);
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  const handleRemoveEventImage = (index) => {
    const updatedImages = [...(formData.pageImages || [])];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, pageImages: updatedImages });
  };

  // Hero slideshow handlers
  const handleEditHero = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      setShowHeroModal(true);
    }
  };

  const handleHeroImagesUpload = async (files) => {
    if (!files || files.length === 0) {
      return [];
    }
    
    setUploadingImage(true);
    try {
      const formDataImg = new FormData();
      files.forEach(file => {
        formDataImg.append('images', file);
      });
      
      const response = await fetch('/api/upload/hero-images', {
        method: 'POST',
        body: formDataImg,
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to upload images');
      }
      
      const data = await response.json();
      return data.imageUrls;
    } catch (error) {
      console.error('Error uploading hero images:', error);
      alert(`Failed to upload images: ${error.message}`);
      return [];
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveHeroSlideshow = async (currentImages, newFiles) => {
    try {
      let allImages = [...currentImages];
      
      // Upload new files if any
      if (newFiles && newFiles.length > 0) {
        const uploadedUrls = await handleHeroImagesUpload(newFiles);
        allImages = [...allImages, ...uploadedUrls];
      }
      
      // Save to backend
      const response = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: allImages }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save hero slideshow');
      }
      
      const data = await response.json();
      setHeroImages(data.images || []);
      setShowHeroModal(false);
    } catch (error) {
      console.error('Error saving hero slideshow:', error);
      alert('Failed to save slideshow. Please try again.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#722f37' }}>
        <div style={{ color: 'white', fontSize: '1.5rem' }}>Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#722f37' }}>
        <div style={{ color: 'white', textAlign: 'center', maxWidth: '32rem', padding: '1rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>⚠️ Connection Error</h2>
          <p style={{ marginBottom: '1rem' }}>{error}</p>
          <button onClick={loadData} style={{ backgroundColor: '#d4af37', color: '#722f37', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Event page view
  if (currentView === 'event-page' && selectedEventId) {
    const event = events.find(e => e.id === selectedEventId);
    if (event && event.hasPage) {
      return React.createElement(EventPage, { 
        event, 
        onBack: handleBackToHome, 
        isAuthenticated, 
        onEdit: handleEditEvent, 
        onDelete: handleDeleteEvent 
      });
    } else {
      handleBackToHome();
      return null;
    }
  }

  // Main home view
  return React.createElement(HomePage, {
    wines,
    events,
    heroImages,
    isAuthenticated,
    onLogout: handleLogout,
    onLoginClick: () => setShowLoginModal(true),
    onAddContentClick: handleAddContentClick,
    onEditWine: handleEditWine,
    onEditEvent: handleEditEvent,
    onDeleteWine: handleDeleteWine,
    onDeleteEvent: handleDeleteEvent,
    onViewEventPage: handleViewEventPage,
    onEditHero: handleEditHero,
    showLoginModal,
    setShowLoginModal,
    loginError,
    setLoginError,
    handleLogin,
    showModal,
    setShowModal,
    showHeroModal,
    setShowHeroModal,
    contentType,
    setContentType,
    formData,
    setFormData,
    handleInputChange,
    handleImageSelect,
    handleEventImagesSelect,
    uploadingImage,
    handleAddContent,
    handleSaveHeroSlideshow,
    editMode,
    handleRemoveEventImage,
    setEditMode,
    setEditingId,
    setSelectedImage,
    setSelectedEventImages
  });
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(WineryWebsite));
