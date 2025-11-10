const API_BASE_URL = '/api';

/**
 * Generic fetch wrapper with error handling
 */
async function apiFetch(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Authentication
export const authAPI = {
  login: (username, password) => 
    apiFetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
};

// Wines
export const winesAPI = {
  getAll: () => apiFetch(`${API_BASE_URL}/wines`),
  
  create: (wineData) => 
    apiFetch(`${API_BASE_URL}/wines`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wineData)
    }),
  
  update: (id, wineData) => 
    apiFetch(`${API_BASE_URL}/wines/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(wineData)
    }),
  
  delete: (id) => 
    apiFetch(`${API_BASE_URL}/wines/${id}`, {
      method: 'DELETE'
    })
};

// Events
export const eventsAPI = {
  getAll: () => apiFetch(`${API_BASE_URL}/events`),
  
  getById: (id) => apiFetch(`${API_BASE_URL}/events/${id}`),
  
  create: (eventData) => 
    apiFetch(`${API_BASE_URL}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    }),
  
  update: (id, eventData) => 
    apiFetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    }),
  
  delete: (id) => 
    apiFetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE'
    })
};

// Gallery
export const galleryAPI = {
  getAll: () => apiFetch(`${API_BASE_URL}/gallery`),
  
  create: (postData) => 
    apiFetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    }),
  
  update: (id, postData) => 
    apiFetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    }),
  
  delete: (id) => 
    apiFetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'DELETE'
    })
};

// Image Uploads
export const uploadAPI = {
  uploadWineImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/upload/wine-image`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to upload image');
    }
    
    return response.json();
  },
  
  uploadGalleryImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/upload/gallery-image`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to upload image');
    }
    
    return response.json();
  },
  
  uploadEventImages: async (files) => {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    
    const response = await fetch(`${API_BASE_URL}/upload/event-images`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to upload images');
    }
    
    return response.json();
  }
};
