import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  onEnter: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeProps> = ({ onEnter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isCardOut, setIsCardOut] = useState(false);

  useEffect(() => {
    // Disable scrolling when envelope is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleOpenSequence = () => {
    if (isFlapOpen) return;

    // 1. Open the envelope top flap (takes ~800ms)
    setIsFlapOpen(true);

    // 2. Slide out the card (starts after flap is partially open)
    setTimeout(() => {
      setIsCardOut(true);
    }, 700);

    // 3. Fade out the entire overlay
    setTimeout(() => {
      setIsOpen(true);
    }, 2500);

    // 4. Call parent callback to load the site
    setTimeout(() => {
      setIsDone(true);
      document.body.style.overflow = '';
      onEnter();
    }, 3500);
  };

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F5EBE6] px-4 transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
        }`}
    >
      {/* Intro Header */}
      <div className={`text-center space-y-2 mb-8 sm:mb-12 transition-all duration-[800ms] ${isFlapOpen ? 'opacity-40 scale-95 blur-[1px]' : 'opacity-100'}`}>
        <div className="flex justify-center items-center gap-3 animate-pulse mb-2">
          <div className="w-12 h-[1px] bg-brand-accent/40" />
          <Heart className="w-4 h-4 text-brand-accent fill-brand-accent/20" />
          <div className="w-12 h-[1px] bg-brand-accent/40" />
        </div>
        <span className="font-serif text-sm tracking-[0.25em] text-brand-accent uppercase block">
          Julia & Felipe
        </span>
        <h2 className="font-serif text-xl sm:text-2xl text-brand-dark font-light">
          Você recebeu um convite especial
        </h2>
      </div>

      {/* Interactive Envelope Wrapper */}
      <div
        onClick={handleOpenSequence}
        className={`relative w-80 h-52 sm:w-[450px] sm:h-[300px] my-4 cursor-pointer select-none active:scale-98 transition-transform duration-300 ${!isFlapOpen ? 'animate-float-slow hover:scale-102' : ''
          }`}
        style={{ perspective: '1000px' }}
      >
        {/* Envelope Back Plate */}
        <div className="absolute inset-0 bg-[#E5D6CD] rounded-xl shadow-inner border border-brand-accent/20 z-0" />

        {/* The Invitation Card (Letter) */}
        <div
          className="absolute inset-x-4 top-3 bottom-3 bg-[#FAF6F0] rounded-lg shadow-md flex flex-col items-center justify-center p-1 text-center transition-all duration-[1000ms] cubic-bezier(0.25, 1, 0.5, 1)"
          style={{
            transform: isCardOut
              ? 'translateY(-60%) scale(1.05)'
              : 'translateY(0) scale(0.95)',
            zIndex: isCardOut ? 30 : 10,
            boxShadow: isCardOut ? '0 25px 50px -12px rgba(61, 44, 37, 0.25)' : '0 4px 6px -1px rgba(0,0,0,0.1)'
          }}
        >
          {/* Card Inner Border Decoration */}
          <div className="w-full h-full border border-brand-accent/30 rounded-md p-1.5">
            <div className="w-full h-full border border-brand-accent/10 rounded flex flex-col items-center justify-center px-4 py-6 space-y-2 sm:space-y-4">
              <Heart className="w-4 h-4 text-brand-accent fill-brand-accent/10" />

              <div className="space-y-1 sm:space-y-2">
                <span className="font-serif text-[10px] sm:text-xs tracking-[0.25em] text-brand-accent uppercase block">
                  Julia & Felipe
                </span>
                <div className="w-6 h-[1px] bg-brand-accent/30 mx-auto my-1" />
                <h3 className="font-serif text-lg sm:text-2xl text-brand-dark font-light leading-relaxed">
                  Jantar de <br />
                  Noivado
                </h3>
                <p className="font-serif italic text-xs text-brand-dark/60 mt-1">
                  espera por você
                </p>
              </div>

              <div className="w-12 h-[1px] bg-brand-accent/20" />
              <span className="font-sans text-[8px] sm:text-[9px] text-brand-dark/40 tracking-[0.2em] uppercase block">
                Com carinho
              </span>
            </div>
          </div>
        </div>

        {/* Envelope Front Flaps (Left, Right, Bottom) */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-xl">
          <svg viewBox="0 0 450 300" className="w-full h-full filter drop-shadow-[0_-2px_5px_rgba(61,44,37,0.05)]">
            {/* Left Flap */}
            <path d="M 0 0 L 225 150 L 0 300 Z" fill="#EADCD3" />
            {/* Right Flap */}
            <path d="M 450 0 L 225 150 L 450 300 Z" fill="#EADCD3" />
            {/* Bottom Flap */}
            <path d="M 0 300 L 225 150 L 450 300 Z" fill="#F2E6DF" />
          </svg>
        </div>

        {/* Envelope Top Flap (Lid) */}
        <div
          className="absolute top-0 left-0 w-full h-1/2 origin-top transition-transform duration-[800ms] ease-in-out overflow-visible"
          style={{
            transform: isFlapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
            zIndex: isFlapOpen ? 5 : 25,
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'visible'
          }}
        >
          <svg viewBox="0 0 450 150" className="w-full h-full drop-shadow-md" style={{ backfaceVisibility: 'visible' }}>
            <path d="M 0 0 L 225 150 L 450 0 Z" fill="#E2D4C9" />
          </svg>
        </div>

        {/* Wax Seal Seal / Button (click target in center) */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-700 ease-in-out ${isFlapOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100'
            }`}
        >
          <div className="w-14 h-14 bg-gradient-to-br from-[#D9A094] to-[#B0776D] rounded-full flex items-center justify-center shadow-lg border-2 border-[#FAF6F0]/20 active:scale-95 transition-all duration-300">
            <div className="w-10 h-10 rounded-full border border-[#FAF6F0]/20 flex items-center justify-center animate-pulse">
              <Heart className="w-4 h-4 text-[#FAF6F0] fill-[#FAF6F0]" />
            </div>
          </div>
        </div>
      </div>

      {/* Under Envelope Instructions/Button */}
      <div className="mt-8 sm:mt-12 text-center">
        <button
          onClick={handleOpenSequence}
          disabled={isFlapOpen}
          className={`px-8 py-3.5 bg-brand-dark text-[#FDFBF7] rounded-full font-sans text-xs font-semibold uppercase tracking-widest hover:bg-brand-accent hover:text-brand-dark transition-all duration-500 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-0 disabled:scale-95 disabled:pointer-events-none`}
        >
          Abrir Convite
        </button>
        <p className={`font-sans text-[10px] text-brand-dark/50 tracking-[0.15em] uppercase mt-4 transition-opacity duration-500 ${isFlapOpen ? 'opacity-0' : 'opacity-100'}`}>
          Clique no selo ou no botão para abrir
        </p>
      </div>
    </div>
  );
};

export default EnvelopeIntro;

