function HeroSection({ heroImages, isAuthenticated, onEditHero }) {
  const { useState, useEffect } = React;
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!heroImages || heroImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages]);
  
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };
  
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };
  
  return (
    <section 
      id="home" 
      className="relative flex items-center justify-center text-white text-center" 
      style={{ height: '100vh', marginTop: '5rem', overflow: 'hidden' }}
    >
      {/* Slideshow Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {heroImages && heroImages.length > 0 ? (
          heroImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: currentSlide === index ? 1 : 0,
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))
        ) : (
          <div 
            className="absolute inset-0 hero-gradient"
          />
        )}
      </div>
      
      {/* Content Overlay */}
      <div className="relative px-4" style={{ zIndex: 10 }}>
        <h1 
          className="text-6xl md:text-7xl font-bold mb-6" 
          style={{ textShadow: '0 4px 6px rgba(0,0,0,0.5)' }}
        >
          Welcome to Vivat Alfa Winery
        </h1>
        <p className="text-2xl md:text-3xl mb-8" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          European Style Estate Bottled Wines - Since 2013
        </p>
        <a 
          href="#wines" 
          className="inline-block px-10 py-4 bg-wine hover:bg-wine-light text-white text-lg rounded-lg transition-all" 
          style={{ backgroundColor: '#722f37', border: '2px solid #d4af37' }}
        >
          Explore Our Collection
        </a>
      </div>
      
      {/* Navigation Arrows */}
      {heroImages && heroImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all text-2xl"
            style={{ zIndex: 20 }}
          >
            ‹
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all text-2xl"
            style={{ zIndex: 20 }}
          >
            ›
          </button>
        </>
      )}
      
      {/* Slide Indicators */}
      {heroImages && heroImages.length > 1 && (
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3"
          style={{ zIndex: 20 }}
        >
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="w-3 h-3 rounded-full transition-all"
              style={{
                backgroundColor: currentSlide === index ? '#d4af37' : 'rgba(255,255,255,0.5)',
                transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)'
              }}
            />
          ))}
        </div>
      )}
      
      {/* Admin Edit Button */}
      {isAuthenticated && (
        <button
          onClick={onEditHero}
          className="absolute top-24 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition shadow-lg flex items-center gap-2"
          style={{ zIndex: 20 }}
        >
          ✏️ Edit Slideshow
        </button>
      )}
    </section>
  );
}
