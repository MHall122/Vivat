function HeroModal({ heroImages, onClose, onSave, uploadingImage }) {
  const { useState } = React;
  const [images, setImages] = useState(heroImages || []);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  
  const handleFilesSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    // Limit to 5 images total
    const remainingSlots = 5 - images.length;
    const filesToAdd = files.slice(0, remainingSlots);
    
    setSelectedFiles(filesToAdd);
    
    // Generate previews
    const newPreviews = [];
    let loadedCount = 0;
    
    filesToAdd.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        loadedCount++;
        if (loadedCount === filesToAdd.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  
  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const handleSubmit = async () => {
    await onSave(images, selectedFiles);
  };
  
  return (
    <div 
      className="fixed inset-0 modal-overlay flex items-center justify-center p-4" 
      style={{ zIndex: 50 }} 
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl p-8 max-w-3xl w-full overflow-y-auto" 
        style={{ maxHeight: '90vh' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-3xl font-bold text-wine mb-6">
          Edit Hero Slideshow
        </h3>
        
        <p className="text-gray-600 mb-6">
          Upload up to 5 images for the homepage hero slideshow. Images will automatically rotate every 5 seconds.
        </p>
        
        {/* Current Images */}
        {images.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-bold text-wine mb-3">Current Images ({images.length}/5)</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image} 
                    alt={`Slide ${index + 1}`} 
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full text-sm hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                    Slide {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* New Images Preview */}
        {previews.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-bold text-wine mb-3">New Images to Add</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img 
                    src={preview} 
                    alt={`New slide ${index + 1}`} 
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs">
                    New
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Upload Section */}
        {images.length + previews.length < 5 && (
          <div className="mb-6">
            <label className="block text-wine font-bold mb-2">
              Add Images ({5 - images.length - previews.length} slots remaining):
            </label>
            <input 
              type="file" 
              accept="image/*" 
              multiple
              onChange={handleFilesSelect} 
              className="w-full p-3 border border-gray-300 rounded-lg"
              disabled={uploadingImage}
            />
            <p className="text-sm text-gray-500 mt-2">
              Recommended: High-quality landscape images (1920x1080 or larger)
            </p>
          </div>
        )}
        
        {images.length + previews.length >= 5 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded mb-6">
            Maximum of 5 images reached. Remove existing images to add new ones.
          </div>
        )}
        
        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-6">
          <p className="font-bold mb-1">💡 Tips for best results:</p>
          <ul className="text-sm space-y-1 ml-4">
            <li>• Use high-resolution images (at least 1920x1080)</li>
            <li>• Choose landscape-oriented photos</li>
            <li>• Images should have good contrast with white text</li>
            <li>• Slides will auto-rotate every 5 seconds</li>
          </ul>
        </div>
        
        {/* Actions */}
        <div className="flex justify-end space-x-3">
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
            onClick={handleSubmit} 
            className="px-6 py-3 bg-wine hover:bg-wine-light text-white rounded-lg transition" 
            style={{ backgroundColor: '#722f37' }} 
            disabled={uploadingImage || (images.length === 0 && selectedFiles.length === 0)}
          >
            {uploadingImage ? 'Uploading...' : 'Save Slideshow'}
          </button>
        </div>
      </div>
    </div>
  );
}
