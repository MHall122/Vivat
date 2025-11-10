function Modal({ 
  contentType, 
  setContentType, 
  formData, 
  onInputChange, 
  onImageSelect, 
  onEventImagesSelect, 
  uploadingImage, 
  onClose, 
  onSubmit, 
  editMode, 
  onRemoveEventImage 
}) {
  return (
    <div 
      className="fixed inset-0 modal-overlay flex items-center justify-center p-4" 
      style={{ zIndex: 50 }} 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl p-8 max-w-lg w-full overflow-y-auto" 
        style={{ maxHeight: '90vh' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-3xl font-bold text-wine mb-6">
          {editMode ? 'Edit Content' : 'Add New Content'}
        </h3>
        
        {!editMode && (
          <div className="mb-6">
            <label className="block text-wine font-bold mb-2">Content Type:</label>
            <select 
              value={contentType} 
              onChange={(e) => setContentType(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2" 
              style={{ borderColor: '#722f37' }}
            >
              <option value="wine">Wine</option>
              <option value="event">Event/Post</option>
            </select>
          </div>
        )}

        {contentType === 'wine' && (
          <WineForm 
            formData={formData} 
            onInputChange={onInputChange} 
            onImageSelect={onImageSelect} 
          />
        )}

        {contentType === 'event' && (
          <EventForm 
            formData={formData} 
            onInputChange={onInputChange} 
            onImageSelect={onImageSelect} 
            onEventImagesSelect={onEventImagesSelect}
            onRemoveEventImage={onRemoveEventImage}
          />
        )}

        <div className="flex justify-end space-x-3 mt-8">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition" 
            disabled={uploadingImage}
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={onSubmit} 
            className="px-6 py-3 bg-wine hover:bg-wine-light text-white rounded-lg transition" 
            style={{ backgroundColor: '#722f37' }} 
            disabled={uploadingImage}
          >
            {uploadingImage ? 'Uploading...' : (editMode ? 'Update' : 'Add Content')}
          </button>
        </div>
      </div>
    </div>
  );
}

// Wine Form Component
function WineForm({ formData, onInputChange, onImageSelect }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-wine font-bold mb-2">Wine Image:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={onImageSelect} 
          className="w-full p-3 border border-gray-300 rounded-lg" 
        />
        {formData.imagePreview && (
          <img 
            src={formData.imagePreview} 
            alt="Preview" 
            style={{ maxHeight: '200px', marginTop: '8px', borderRadius: '8px' }} 
          />
        )}
        {formData.wineImage && !formData.imagePreview && (
          <img 
            src={formData.wineImage} 
            alt="Current" 
            style={{ maxHeight: '200px', marginTop: '8px', borderRadius: '8px' }} 
          />
        )}
      </div>
      
      <InputField 
        label="Wine Name" 
        value={formData.wineName || ''} 
        onChange={(e) => onInputChange('wineName', e.target.value)} 
        placeholder="e.g., Merlot Reserve" 
      />
      
      <InputField 
        label="Wine Type" 
        value={formData.wineType || ''} 
        onChange={(e) => onInputChange('wineType', e.target.value)} 
        placeholder="e.g., Red Wine" 
      />
      
      <TextAreaField 
        label="Description" 
        value={formData.wineDescription || ''} 
        onChange={(e) => onInputChange('wineDescription', e.target.value)} 
        placeholder="Describe the wine..." 
      />
      
      <InputField 
        label="Price" 
        value={formData.winePrice || ''} 
        onChange={(e) => onInputChange('winePrice', e.target.value)} 
        placeholder="e.g., $50" 
      />
      
      <InputField 
        label="Emoji Icon (fallback)" 
        value={formData.wineEmoji || '🍷'} 
        onChange={(e) => onInputChange('wineEmoji', e.target.value)} 
        placeholder="e.g., 🍷" 
      />
    </div>
  );
}

// Event Form Component
function EventForm({ formData, onInputChange, onImageSelect, onEventImagesSelect, onRemoveEventImage }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-wine font-bold mb-2">Event Card Image:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={onImageSelect} 
          className="w-full p-3 border border-gray-300 rounded-lg" 
        />
        <p className="text-sm text-gray-500 mt-1">
          Optional: Image for the event card (falls back to emoji if not provided)
        </p>
        {formData.imagePreview && (
          <img 
            src={formData.imagePreview} 
            alt="Preview" 
            style={{ maxHeight: '200px', marginTop: '8px', borderRadius: '8px' }} 
          />
        )}
        {formData.eventImage && !formData.imagePreview && (
          <img 
            src={formData.eventImage} 
            alt="Current" 
            style={{ maxHeight: '200px', marginTop: '8px', borderRadius: '8px' }} 
          />
        )}
      </div>
      
      <InputField 
        label="Event Title" 
        value={formData.eventTitle || ''} 
        onChange={(e) => onInputChange('eventTitle', e.target.value)} 
        placeholder="e.g., Summer Wine Tasting" 
      />
      
      <InputField 
        label="Date" 
        value={formData.eventDate || ''} 
        onChange={(e) => onInputChange('eventDate', e.target.value)} 
        placeholder="e.g., December 15, 2025" 
      />
      
      <TextAreaField 
        label="Description (for home page)" 
        value={formData.eventDescription || ''} 
        onChange={(e) => onInputChange('eventDescription', e.target.value)} 
        placeholder="Brief description for the event card..." 
        rows={3} 
      />
      
      <InputField 
        label="Emoji Icon (fallback)" 
        value={formData.eventEmoji || '🎉'} 
        onChange={(e) => onInputChange('eventEmoji', e.target.value)} 
        placeholder="e.g., 🎉" 
      />
      
      <div className="border-t pt-4 mt-6">
        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            id="hasPage" 
            checked={formData.hasPage || false} 
            onChange={(e) => onInputChange('hasPage', e.target.checked)} 
            className="w-5 h-5 mr-3" 
          />
          <label htmlFor="hasPage" className="text-wine font-bold">
            Create a dedicated page for this event
          </label>
        </div>
        
        {formData.hasPage && (
          <EventPageFields 
            formData={formData} 
            onInputChange={onInputChange} 
            onEventImagesSelect={onEventImagesSelect}
            onRemoveEventImage={onRemoveEventImage}
          />
        )}
      </div>
    </div>
  );
}

// Event Page Fields Component
function EventPageFields({ formData, onInputChange, onEventImagesSelect, onRemoveEventImage }) {
  return (
    <div className="space-y-4 pl-8 border-l-4 border-gold">
      <InputField 
        label="Page Title" 
        value={formData.pageTitle || ''} 
        onChange={(e) => onInputChange('pageTitle', e.target.value)} 
        placeholder="Optional: Different title for the page" 
      />
      
      <TextAreaField 
        label="Page Description" 
        value={formData.pageDescription || ''} 
        onChange={(e) => onInputChange('pageDescription', e.target.value)} 
        placeholder="Full description for the event page..." 
        rows={6} 
      />
      
      <div>
        <label className="block text-wine font-bold mb-2">Event Gallery Images:</label>
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          onChange={onEventImagesSelect} 
          className="w-full p-3 border border-gray-300 rounded-lg" 
        />
        <p className="text-sm text-gray-500 mt-1">You can select multiple images (max 20)</p>
        
        {formData.eventImagePreviews && formData.eventImagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {formData.eventImagePreviews.map((preview, index) => (
              <img 
                key={index} 
                src={preview} 
                alt={`Preview ${index + 1}`} 
                style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
              />
            ))}
          </div>
        )}
        
        {formData.pageImages && formData.pageImages.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-bold text-wine mb-2">Current Images:</p>
            <div className="grid grid-cols-3 gap-2">
              {formData.pageImages.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image} 
                    alt={`Image ${index + 1}`} 
                    style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px' }} 
                  />
                  <button 
                    type="button" 
                    onClick={() => onRemoveEventImage(index)} 
                    className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs hover:bg-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
