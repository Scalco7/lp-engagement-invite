import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Heart, Lock } from 'lucide-react';
import type { LocalRsvp } from '../../services/rsvpStorage';

interface HeaderProps {
  scrollToSection: (id: string) => void;
  rsvp: LocalRsvp | null;
}

export const Header: React.FC<HeaderProps> = ({ scrollToSection, rsvp }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Animation states for the Palpites button
  const [isLocked, setIsLocked] = useState(() => !rsvp || !rsvp.willGo);
  const [showButton, setShowButton] = useState(() => !rsvp || rsvp.willGo);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isDisappearing, setIsDisappearing] = useState(false);

  useEffect(() => {
    if (rsvp) {
      if (rsvp.willGo) {
        // If RSVP is yes, show button and handle unlocking transition
        if (isLocked && !isUnlocking) {
          setIsUnlocking(true);
          const timer = setTimeout(() => {
            setIsLocked(false);
            setIsUnlocking(false);
          }, 800);
          return () => clearTimeout(timer);
        }
        setShowButton(true);
      } else {
        // If RSVP is no, hide button with a shrink/fade animation transition
        if (showButton && !isDisappearing) {
          setIsDisappearing(true);
          const timer = setTimeout(() => {
            setShowButton(false);
            setIsDisappearing(false);
          }, 800);
          return () => clearTimeout(timer);
        }
      }
    } else {
      // Reset state if RSVP is deleted
      setIsLocked(true);
      setShowButton(true);
      setIsUnlocking(false);
      setIsDisappearing(false);
    }
  }, [rsvp]);

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  const handleBetsClick = () => {
    if (isLocked) return;
    setMobileMenuOpen(false);
    navigate('/engagement-invite/bet');
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
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-[11px] font-medium uppercase tracking-widest text-brand-dark/80">
          {/* Palpites Button */}
          {showButton && (
            <button
              onClick={handleBetsClick}
              disabled={isLocked}
              className={`flex items-center gap-1.5 transition-colors duration-300 font-sans text-[11px] font-medium tracking-widest ${isLocked
                ? 'text-brand-dark/40 cursor-not-allowed'
                : 'text-brand-dark/80 hover:text-brand-accent cursor-pointer'
                } ${isDisappearing ? 'animate-shrink-fade' : ''}`}
            >
              {isLocked && (
                <Lock className={`w-3 h-3 text-brand-dark/40 ${isUnlocking ? 'animate-unlock' : ''}`} />
              )}
              Palpites
            </button>
          )}

          <button onClick={() => handleScroll('story')} className="hover:text-brand-accent transition-colors duration-300 cursor-pointer">Nossa História</button>
          <button onClick={() => handleScroll('event')} className="hover:text-brand-accent transition-colors duration-300 cursor-pointer">A Celebração</button>

          <button
            onClick={() => handleScroll('confirm')}
            className="px-5 py-2 bg-brand-dark text-white rounded-full hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
          >
            Confirmar
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
            {/* Mobile Palpites Button */}
            {showButton && (
              <button
                onClick={handleBetsClick}
                disabled={isLocked}
                className={`text-left py-2 border-b border-brand-accent/10 flex items-center gap-1.5 cursor-pointer w-full font-sans text-xs font-semibold tracking-widest ${isLocked
                  ? 'text-brand-dark/40 cursor-not-allowed'
                  : 'text-brand-dark/95 hover:text-brand-accent'
                  } ${isDisappearing ? 'animate-shrink-fade' : ''}`}
              >
                {isLocked && (
                  <Lock className={`w-3.5 h-3.5 text-brand-dark/40 ${isUnlocking ? 'animate-unlock' : ''}`} />
                )}
                Palpites
              </button>
            )}

            <button onClick={() => handleScroll('story')} className="text-left py-2 border-b border-brand-accent/10 cursor-pointer">Nossa História</button>
            <button onClick={() => handleScroll('event')} className="text-left py-2 border-b border-brand-accent/10 cursor-pointer">A Celebração</button>

            <button
              onClick={() => handleScroll('confirm')}
              className="w-full text-center py-3 bg-brand-dark text-white rounded-full hover:bg-brand-accent hover:text-brand-dark transition-colors duration-300 cursor-pointer"
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
