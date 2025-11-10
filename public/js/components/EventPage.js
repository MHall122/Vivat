function EventPage({ event, onBack, isAuthenticated, onEdit, onDelete }) {
  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap');
        body { font-family: 'Lato', sans-serif; }
        h1, h2, h3 { font-family: 'Playfair Display', serif; }
        .text-wine { color: #722f37; }
        .text-gold { color: #d4af37; }
        .bg-wine { background-color: #722f37; }
        .bg-beige { background-color: #f9f5f0; }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-10px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
      `}</style>

      <header className="bg-wine shadow-lg">
        <nav className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
          <button 
            onClick={onBack} 
            className="text-white text-2xl font-bold tracking-wider flex items-center gap-2 hover:text-gold transition"
          >
            ← Back to Home
          </button>
          {isAuthenticated && (
            <div className="flex gap-3">
              <button 
                onClick={() => onEdit(event)} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition"
              >
                ✏️ Edit
              </button>
              <button 
                onClick={() => onDelete(event.id)} 
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition"
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </nav>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <div className="text-gold font-bold text-xl mb-2">{event.date}</div>
          <h1 className="text-5xl md:text-6xl font-bold text-wine mb-6">
            {event.pageTitle || event.title}
          </h1>
          <div className="text-xl text-gray-600 max-w-4xl mx-auto whitespace-pre-line leading-relaxed">
            {event.pageDescription || event.description}
          </div>
        </div>

        {event.pageImages && event.pageImages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-4xl font-bold text-center text-wine mb-12">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {event.pageImages.map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-lg hover-lift">
                  <img 
                    src={image} 
                    alt={`Event photo ${index + 1}`} 
                    className="w-full h-64 object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-900 text-white text-center py-8 mt-20">
        <p className="mb-4">&copy; 2025 Vivat Alfa Winery. All rights reserved.</p>
        <button 
          onClick={onBack} 
          className="text-gold hover:text-white transition font-bold"
        >
          ← Back to Home
        </button>
      </footer>
    </div>
  );
}
