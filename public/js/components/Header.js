function Header({ isAuthenticated, onLogout, onLoginClick }) {
  return (
    <header className="fixed top-0 w-full bg-wine shadow-lg" style={{ zIndex: 50 }}>
      <nav className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
        <a href="#" className="text-white text-2xl font-bold tracking-wider">
          🍇 Vivat Alfa Winery
        </a>
        <ul className="flex space-x-8 text-white">
          <li><a href="#home" className="hover:text-gold transition">Home</a></li>
          <li className="hidden md:block">
            <a href="#wines" className="hover:text-gold transition">Our Wines</a>
          </li>
          <li className="hidden md:block">
            <a href="#events" className="hover:text-gold transition">Events & News</a>
          </li>
          <li className="hidden md:block">
            <a href="#about" className="hover:text-gold transition">About</a>
          </li>
          <li className="hidden md:block">
            <a href="#contact" className="hover:text-gold transition">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
