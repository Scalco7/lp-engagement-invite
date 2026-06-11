import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  onEnter: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeProps> = ({ onEnter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Disable scrolling when envelope is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    // Wait for fade out animation to finish before destroying component and re-enabling scroll
    setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = '';
      onEnter();
    }, 1000);
  };

  if (isDone) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#F5EBE6] transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${
        isOpen ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      <div className="max-w-md w-full px-6 text-center space-y-8">
        {/* Elegant top ornament */}
        <div className="flex justify-center items-center gap-3 animate-pulse">
          <div className="w-12 h-[1px] bg-brand-accent/40" />
          <Heart className="w-4 h-4 text-brand-accent fill-brand-accent/20" />
          <div className="w-12 h-[1px] bg-brand-accent/40" />
        </div>

        <div className="space-y-4">
          <span className="font-serif text-sm tracking-[0.2em] text-brand-accent uppercase block">
            Julia & Felipe
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-brand-dark font-light leading-relaxed">
            Nosso convite de casamento <br />
            espera por você.
          </h2>
          <p className="font-sans text-[10px] text-brand-dark/50 tracking-[0.15em] uppercase">
            Clique abaixo para abrir o envelope
          </p>
        </div>

        {/* Trigger Button */}
        <div className="pt-4">
          <button
            onClick={handleOpen}
            className="px-8 py-3.5 bg-brand-dark text-[#FDFBF7] rounded-full font-sans text-xs font-semibold uppercase tracking-widest hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
          >
            Abrir Convite
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeIntro;
