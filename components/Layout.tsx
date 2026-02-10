import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Facebook, Instagram, Search, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Newsletter from './Newsletter';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  // Home page has a transparent header initially or blends with hero
  const isHome = location.pathname === '/';
  const isCart = location.pathname === '/cart';

  return (
    <div className="flex flex-col min-h-screen font-sans bg-zini-cream">
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-colors duration-300 ${isHome ? 'bg-zini-cream/90 backdrop-blur-md' : 'bg-zini-cream border-b border-zini-beige'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center w-1/4">
              <Link to="/" className="group flex items-center gap-2" onClick={closeMenu}>
                <div className="w-10 h-10 bg-zini-green flex items-center justify-center text-white font-serif font-bold text-xl rounded-sm">Z</div>
                <span className="font-serif font-bold text-2xl tracking-tight uppercase group-hover:text-zini-green transition-colors">Zini</span>
              </Link>
            </div>

            {/* Desktop Nav - Centered */}
            <nav className="hidden md:flex justify-center w-2/4 space-x-12">
              <Link to="/starter-kit" className="text-xs font-mono font-bold text-zini-charcoal hover:text-zini-green transition-colors uppercase tracking-[0.2em]">The Kits</Link>
              <Link to="/shop" className="text-xs font-mono font-bold text-zini-charcoal hover:text-zini-green transition-colors uppercase tracking-[0.2em]">Kombucha</Link>
              <Link to="/our-story" className="text-xs font-mono font-bold text-zini-charcoal hover:text-zini-green transition-colors uppercase tracking-[0.2em]">Our Scoby</Link>
            </nav>

            {/* Icons - Right */}
            <div className="flex items-center justify-end space-x-6 w-1/4">
              <button className="text-zini-charcoal hover:text-zini-green transition-colors">
                <Search className="w-5 h-5" />
              </button>
              
              <Link to="/cart" className="relative group flex items-center" onClick={closeMenu}>
                <ShoppingBag className="h-5 w-5 text-zini-charcoal group-hover:text-zini-green transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold leading-none text-white bg-zini-dark rounded-full font-mono">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button className="text-zini-charcoal hover:text-zini-green transition-colors hidden sm:block">
                 <Moon className="w-5 h-5" />
              </button>

              <button className="md:hidden p-2 text-zini-charcoal" onClick={toggleMenu}>
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-zini-cream border-t border-zini-beige absolute w-full left-0 h-screen z-50">
            <div className="px-6 pt-8 pb-3 space-y-6 flex flex-col items-center">
              <Link to="/starter-kit" className="text-lg font-serif italic text-zini-dark" onClick={closeMenu}>The Kits</Link>
              <Link to="/shop" className="text-lg font-serif italic text-zini-dark" onClick={closeMenu}>Kombucha</Link>
              <Link to="/our-story" className="text-lg font-serif italic text-zini-dark" onClick={closeMenu}>Our Scoby</Link>
              <Link to="/cart" className="text-lg font-serif italic text-zini-dark" onClick={closeMenu}>Cart ({cartCount})</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Newsletter Section - Added before footer, hidden on Cart */}
      {!isCart && <Newsletter />}

      {/* Footer */}
      <footer className="bg-zini-cream border-t border-zini-beige pt-16 pb-8 text-zini-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="space-y-6">
              <div className="w-12 h-16 bg-zini-green/10 border border-zini-green flex items-center justify-center">
                 <span className="font-serif font-bold text-zini-green text-2xl">Z</span>
              </div>
              <p className="font-mono text-xs tracking-widest uppercase text-zini-charcoal/70 max-w-[150px]">
                Hand-stamped in Mtunzini, South Africa
              </p>
            </div>

            {/* Nav */}
            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Nav</h4>
              <ul className="space-y-4 font-mono text-xs uppercase tracking-wider text-zini-charcoal/70">
                <li><Link to="/our-story" className="hover:text-zini-green transition-colors">Our Scoby</Link></li>
                <li><Link to="/shop" className="hover:text-zini-green transition-colors">Kombucha</Link></li>
                <li><Link to="/starter-kit" className="hover:text-zini-green transition-colors">Kits</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Social</h4>
              <div className="flex space-x-6 text-zini-charcoal/70">
                <a href="#" className="hover:text-zini-green transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-zini-green transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="hover:text-zini-green transition-colors">@</a>
              </div>
            </div>

            {/* Footer Newsletter - Simplified since we have the main one now */}
            <div>
              <h4 className="font-serif font-bold text-lg mb-6">Updates</h4>
              <form className="flex border-b border-zini-charcoal/30 pb-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-transparent border-none focus:ring-0 w-full font-mono text-xs placeholder:text-zini-charcoal/50"
                />
                <button type="button" className="text-zini-green hover:text-zini-dark">
                  <span className="sr-only">Subscribe</span>
                  ➤
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-zini-charcoal/10 pt-8 flex flex-col md:flex-row justify-between items-center font-mono text-[10px] uppercase tracking-widest text-zini-charcoal/50">
            <p>&copy; {new Date().getFullYear()} Zini Kombucha — All Natural Fermentation</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;