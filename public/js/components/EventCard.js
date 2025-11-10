function EventCard({ event, isAuthenticated, onDelete, onEdit, onViewPage }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-3 hover-lift relative">
      {isAuthenticated && (
        <div className="absolute top-4 right-4 flex gap-2" style={{ zIndex: 10 }}>
          <button 
            onClick={() => onEdit(event)} 
            className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(event.id)} 
            className="bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg"
          >
            ✕
          </button>
        </div>
      )}
      
      <div 
        className="event-gradient flex items-center justify-center text-white text-6xl" 
        style={{ height: '12rem', overflow: 'hidden' }}
      >
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          event.emoji
        )}
      </div>
      
      <div className="col-span-2 p-8">
        <div className="text-gold font-bold mb-2">{event.date}</div>
        <h3 className="text-3xl font-bold text-wine mb-4">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        
        {event.hasPage ? (
          <button 
            onClick={() => onViewPage(event.id)} 
            className="text-wine font-bold hover:text-gold transition"
          >
            View Full Page →
          </button>
        ) : (
          <a href="#" className="text-wine font-bold hover:text-gold transition">
            Learn More →
          </a>
        )}
      </div>
    </div>
  );
}
