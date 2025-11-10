import React from 'react';
import { FaInstagram } from 'react-icons/fa';

function HomePage({
  wines,
  events,
  heroImages,
  isAuthenticated,
  onLogout,
  onLoginClick,
  onAddContentClick,
  onEditWine,
  onEditEvent,
  onDeleteWine,
  onDeleteEvent,
  onViewEventPage,
  onEditHero,
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
}) {
  // Group wines by category
  const getWinesByCategory = () => {
    const categories = [
      { label: 'Dry Whites', types: ['Dry White'] },
      { label: 'Dry Reds', types: ['Dry Red', 'Dry Red - Barrique Method'] },
      { label: 'Semi-Sweets', types: ['Semi-Sweet'] },
      { label: 'Dessert', types: ['Dessert'] }
    ];
    
    const winesByCategory = {};
    
    categories.forEach(cat => {
      const categoryWines = wines.filter(wine => 
        cat.types.some(type => 
          wine.type && wine.type.toLowerCase() === type.toLowerCase()
        )
      );
      if (categoryWines.length > 0) {
        winesByCategory[cat.label] = categoryWines;
      }
    });
    
    // Add wines that don't match defined types to "Other"
    const definedTypes = categories.flatMap(c => c.types.map(t => t.toLowerCase()));
    const otherWines = wines.filter(wine => 
      !wine.type || !definedTypes.includes(wine.type.toLowerCase())
    );
    if (otherWines.length > 0) {
      winesByCategory['Other'] = otherWines;
    }
    
    return winesByCategory;
  };

  const winesByCategory = getWinesByCategory();

  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap');
        body { font-family: 'Lato', sans-serif; }
        h1, h2, h3 { font-family: 'Playfair Display', serif; }
        .hero-gradient { background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), linear-gradient(135deg, #722f37 0%, #5a2329 100%); }
        .wine-gradient { background: linear-gradient(135deg, #722f37, #a04055); }
        .event-gradient { background: linear-gradient(135deg, #722f37, #d4af37); }
        .text-wine { color: #722f37; }
        .text-gold { color: #d4af37; }
        .bg-wine { background-color: #722f37; }
        .bg-wine-light { background-color: #8b3a45; }
        .bg-beige { background-color: #f9f5f0; }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-10px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .modal-overlay { background: rgba(0,0,0,0.7); }
        .section-divider::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: #d4af37;
        }
      `}</style>

      <Header 
        isAuthenticated={isAuthenticated} 
        onLogout={onLogout} 
        onLoginClick={onLoginClick} 
      />
      
      <HeroSection 
        heroImages={heroImages}
        isAuthenticated={isAuthenticated}
        onEditHero={onEditHero}
      />

      {/* Wines Section */}
      <section id="wines" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-wine relative pb-6 section-divider">
            Our Premium Wines
          </h2>
          
          {Object.entries(winesByCategory).map(([categoryLabel, categoryWines]) => (
            <div key={categoryLabel} className="mb-16 mt-12">
              <h3 className="text-3xl font-bold text-wine mb-8 text-center">{categoryLabel}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {categoryWines.map(wine => (
                  <WineCard 
                    key={wine.id} 
                    wine={wine} 
                    isAuthenticated={isAuthenticated} 
                    onDelete={onDeleteWine} 
                    onEdit={onEditWine} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-4 bg-beige">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-wine relative pb-6 section-divider">
            Events & News
          </h2>
          <div className="space-y-10 mt-12">
            {events.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                isAuthenticated={isAuthenticated} 
                onDelete={onDeleteEvent} 
                onEdit={onEditEvent} 
                onViewPage={onViewEventPage} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-beige">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4 text-wine relative pb-6 section-divider">
            Our Story
          </h2>
          <div className="space-y-6 mt-12 text-lg text-gray-600">
            <p>
              Vivat Alfa Winery is a family-owned and operated boutique winery located in a historic 
              pre-Civil War barn in the heart of Bucks County, PA. Founded in 2013, we specialize in 
              handcrafting artisan wines that exhibit pure and true varietal character.
            </p>
            <p>
              Our European-style, estate bottled wines are an expression of our passion and commitment 
              to quality. We follow a simple philosophy: nothing added, nothing subtracted. This dedication 
              to authenticity allows the true character of each grape variety to shine through.
            </p>
            <p>
              Visit us on weekends to experience our wines in our rustic tasting room with an outdoor 
              patio overlooking rolling vineyards. Taste our European tradition and discover why we're 
              one of the few wineries in the region growing rare varieties like Blaufränkisch.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 text-wine relative pb-6 section-divider">
            Visit Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
            <ContactItem 
              icon="📍" 
              title="Location" 
              info={['3612 Stump Road', 'Doylestown, PA 18902']} 
            />
            <ContactItem 
              icon="📞" 
              title="Phone" 
              info={["(267) 614-5011"]} 
            />
            <ContactItem 
  icon="✉️" 
  title="Social Media" 
  info={[
    <a 
      key="ig" 
      href="https://instagram.com/vivatalfa_winery" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-wine underline"
    >
     <FaInstagram size={30} color="purple" /> 
      @vivatalfa_winery
    </a>,
    <a 
      key="fb" 
      href="https://facebook.com/vivatalfa_winery" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-wine underline"
    >
      <FaInstagram size={30} color="purple" /> 
      Viva Talfa on Facebook
    </a>
  ]}
/>
            <ContactItem 
              icon="🕐" 
              title="Hours" 
              info={['Sat-Sun: 12pm - 6pm', 'Mon-Fri: Closed']} 
            />
          </div>
        </div>
      </section>

      <Footer />

      {/* Admin Login/Logout Button */}
      {isAuthenticated ? (
        <button 
          onClick={onLogout} 
          className="fixed bottom-8 left-8 bg-wine hover:bg-wine-light text-white px-3 py-2 rounded-lg shadow-lg transition-all hover:scale-105 text-sm font-bold flex items-center gap-2" 
          style={{ zIndex: 50 }}
        >
          🔓 Logout
        </button>
      ) : (
        <button 
          onClick={onLoginClick} 
          className="fixed bottom-8 left-8 bg-wine hover:bg-wine-light text-white w-12 h-12 rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center text-xl" 
          style={{ zIndex: 50 }} 
          title="Admin Login"
        >
          🔒
        </button>
      )}

      {/* Add Content Button */}
      {isAuthenticated && (
        <button 
          onClick={onAddContentClick} 
          className="fixed bottom-8 right-8 w-16 h-16 bg-wine hover:bg-wine-light text-white rounded-full text-4xl flex items-center justify-center shadow-lg transition-all hover:scale-110" 
          style={{ zIndex: 50 }}
        >
          +
        </button>
      )}

      {/* Modals */}
      {showLoginModal && (
        <LoginModal 
          onLogin={handleLogin} 
          onClose={() => { 
            setShowLoginModal(false); 
            setLoginError(''); 
          }} 
          error={loginError} 
        />
      )}
      
      {showHeroModal && (
        <HeroModal
          heroImages={heroImages}
          onClose={() => setShowHeroModal(false)}
          onSave={handleSaveHeroSlideshow}
          uploadingImage={uploadingImage}
        />
      )}
      
      {showModal && (
        <Modal 
          contentType={contentType} 
          setContentType={setContentType} 
          formData={formData} 
          onInputChange={handleInputChange} 
          onImageSelect={handleImageSelect} 
          onEventImagesSelect={handleEventImagesSelect} 
          uploadingImage={uploadingImage} 
          onClose={() => { 
            setShowModal(false); 
            setFormData({}); 
            setEditMode(false); 
            setEditingId(null); 
            setSelectedImage(null); 
            setSelectedEventImages([]); 
          }} 
          onSubmit={handleAddContent} 
          editMode={editMode} 
          onRemoveEventImage={handleRemoveEventImage} 
        />
      )}
    </div>
  );
}
