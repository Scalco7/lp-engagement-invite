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
    <header className="sticky top-0 w-full bg-brand-bg/80 backdrop-blur-md border-b border-brand-blush/10 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScroll('hero')}>
          <span className="font-serif text-2xl font-semibold tracking-wider text-brand-dark">J & F</span>
          <Heart className="w-4 h-4 text-brand-accent fill-brand-accent animate-pulse" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs font-medium uppercase tracking-widest text-brand-dark/80">
          <button onClick={() => handleScroll('story')} className="hover:text-brand-accent transition-colors duration-300 cursor-pointer">Nossa História</button>
          <button onClick={() => handleScroll('event')} className="hover:text-brand-accent transition-colors duration-300 cursor-pointer">O Grande Dia</button>
          <button onClick={() => handleScroll('gifts')} className="hover:text-brand-accent transition-colors duration-300 cursor-pointer">Lista de Presentes</button>
          <button 
            onClick={() => handleScroll('rsvp')} 
            className="px-6 py-2.5 bg-brand-dark text-white rounded-full hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            Confirmar RSVP
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden p-2 text-brand-dark hover:text-brand-accent transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-brand-bg border-b border-brand-blush/20 py-6 px-8 flex flex-col gap-5 font-sans text-xs font-semibold uppercase tracking-widest text-brand-dark/95 shadow-lg animate-fade-in">
          <button onClick={() => handleScroll('story')} className="text-left py-2 border-b border-neutral-100 cursor-pointer">Nossa História</button>
          <button onClick={() => handleScroll('event')} className="text-left py-2 border-b border-neutral-100 cursor-pointer">O Grande Dia</button>
          <button onClick={() => handleScroll('gifts')} className="text-left py-2 border-b border-neutral-100 cursor-pointer">Lista de Presentes</button>
          <button 
            onClick={() => handleScroll('rsvp')} 
            className="w-full text-center py-3.5 bg-brand-dark text-white rounded-xl hover:bg-brand-accent hover:text-brand-dark transition-colors duration-300 cursor-pointer"
          >
            Confirmar RSVP
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
