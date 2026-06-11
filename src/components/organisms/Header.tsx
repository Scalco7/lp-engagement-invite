import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

interface HeaderProps {
  scrollToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50 transition-all duration-300">
      <div className="bg-brand-bg/90 backdrop-blur-md border border-brand-accent/20 rounded-full shadow-[0_8px_30px_rgba(61,44,37,0.08)] hover:shadow-[0_8px_30px_rgba(61,44,37,0.12)] transition-all duration-300 px-6 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScroll('hero')}>
          <span className="font-serif text-2xl font-semibold tracking-wider text-brand-dark">J & F</span>
          <Heart className="w-4 h-4 text-brand-accent fill-brand-accent animate-pulse" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-[11px] font-medium uppercase tracking-widest text-brand-dark/80">
          <button onClick={() => handleScroll('story')} className="hover:text-brand-accent transition-colors duration-300 cursor-pointer">Nossa História</button>
          <button onClick={() => handleScroll('event')} className="hover:text-brand-accent transition-colors duration-300 cursor-pointer">A Celebração</button>
          <button 
            onClick={() => handleScroll('rsvp')} 
            className="px-5 py-2 bg-brand-dark text-white rounded-full hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            Confirmar RSVP
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden p-2 text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-brand-bg/95 backdrop-blur-md border border-brand-accent/20 py-6 px-8 flex flex-col gap-5 font-sans text-xs font-semibold uppercase tracking-widest text-brand-dark/95 shadow-xl rounded-2xl animate-fade-in">
            <button onClick={() => handleScroll('story')} className="text-left py-2 border-b border-brand-accent/10 cursor-pointer">Nossa História</button>
            <button onClick={() => handleScroll('event')} className="text-left py-2 border-b border-brand-accent/10 cursor-pointer">A Celebração</button>
            <button 
              onClick={() => handleScroll('rsvp')} 
              className="w-full text-center py-3 bg-brand-dark text-white rounded-full hover:bg-brand-accent hover:text-brand-dark transition-colors duration-300 cursor-pointer"
            >
              Confirmar RSVP
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
