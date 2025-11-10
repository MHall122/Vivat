function WineCard({ wine, isAuthenticated, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift relative">
      {isAuthenticated && (
        <div className="absolute top-4 right-4 flex gap-2" style={{ zIndex: 10 }}>
          <button 
            onClick={() => onEdit(wine)} 
            className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(wine.id)} 
            className="bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg"
          >
            ✕
          </button>
        </div>
      )}
      
      <div 
        className="wine-gradient flex items-center justify-center text-white text-7xl" 
        style={{ height: '18rem', overflow: 'hidden' }}
      >
        {wine.image ? (
          <img 
            src={wine.image} 
            alt={wine.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          wine.emoji
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-wine mb-2">{wine.name}</h3>
        <p className="text-gold italic mb-4">{wine.type}</p>
        <p className="text-gray-600 mb-4">{wine.description}</p>
        <div className="text-2xl font-bold text-wine">{wine.price}</div>
      </div>
    </div>
  );
}
