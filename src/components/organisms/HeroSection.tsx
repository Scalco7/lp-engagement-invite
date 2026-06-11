import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, ArrowDown } from 'lucide-react';
import Reveal from '../atoms/Reveal';
import Countdown from '../molecules/Countdown';

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      if (!wrapperRef.current || window.innerWidth < 1024) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // --- STATIC MOBILE LAYOUT ---
  if (isMobile) {
    return (
      <section id="hero" className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden bg-brand-bg">
        <div className="max-w-md mx-auto w-full space-y-8 text-center flex flex-col items-center">
          
          {/* Main Photo Card */}
          <Reveal className="w-full relative p-2.5 bg-white border border-brand-blush/20 shadow-xl rounded-2xl overflow-hidden">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100">
              <img 
                src="/imgs/test.jpg" 
                alt="Julia e Felipe" 
                className="w-full h-full object-cover" 
              />
            </div>
          </Reveal>

          {/* Texts */}
          <div className="space-y-4">
            <Reveal>
              <span className="font-serif text-lg italic text-brand-accent block">
                Vamos nos casar!
              </span>
              <h1 className="font-serif text-5xl font-light text-brand-dark tracking-wide mt-2">
                Julia & Felipe
              </h1>
            </Reveal>

            <Reveal delay={1}>
              <div className="flex items-center justify-center gap-3 text-brand-dark/80 font-sans text-xs tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                <span>17/10/2026</span>
                <span className="text-brand-blush/60">|</span>
                <Clock className="w-3.5 h-3.5 text-brand-accent" />
                <span>17:00h</span>
              </div>
            </Reveal>

            <Reveal delay={2} className="w-full">
              <Countdown targetDate="2026-10-17T17:00:00" />
            </Reveal>

            <Reveal delay={3} className="pt-2">
              <button 
                onClick={() => scrollToSection('rsvp')}
                className="w-full sm:w-auto px-8 py-4 bg-brand-dark text-white rounded-full font-sans text-xs font-semibold uppercase tracking-widest hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 shadow-md cursor-pointer"
              >
                Confirmar Presença (RSVP)
              </button>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  // --- INTERACTIVE DESKTOP SCROLL-LINKED COLLAGE ---
  // Layout values relative to scrollProgress
  const mainCardWidth = 92 - scrollProgress * 36; // from 92% to 56%
  const mainCardHeight = 80 - scrollProgress * 38; // from 80vh to 42vh
  const mainCardRadius = 16 + scrollProgress * 24; // from 16px to 40px

  // Opacity parameters
  const overlayOpacity = 0.3 - scrollProgress * 0.2;
  const helperTextOpacity = Math.max(0, 1 - scrollProgress * 3);
  const contentOpacity = scrollProgress > 0.4 ? (scrollProgress - 0.4) * 1.66 : 0;
  const contentTranslateY = (1 - scrollProgress) * 30;

  return (
    <div className="relative h-[220vh] bg-brand-bg" ref={wrapperRef}>
      {/* Sticky container uses vertical flexbox to stack items cleanly */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center py-6 overflow-hidden">
        
        {/* Collage Area Container */}
        <div 
          className="relative flex items-center justify-center transition-all duration-300 ease-out flex-shrink-0"
          style={{
            width: `${mainCardWidth}%`,
            maxWidth: `${1200 - (1200 - 640) * scrollProgress}px`,
            height: `${mainCardHeight}vh`,
            maxHeight: `${700 - (700 - 400) * scrollProgress}px`,
          }}
        >
          {/* 1. MAIN CARD (test.jpg) */}
          <div 
            className="w-full h-full shadow-2xl relative overflow-hidden transition-all duration-100 ease-out border border-white bg-white"
            style={{ borderRadius: `${mainCardRadius}px` }}
          >
            <img 
              src="/imgs/test.jpg" 
              alt="Julia e Felipe" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            
            <div 
              className="absolute inset-0 bg-brand-dark transition-opacity duration-100 ease-out" 
              style={{ opacity: overlayOpacity }}
            />

            {/* Couple Names Overlay */}
            <div className="absolute bottom-10 left-0 right-0 text-center text-white select-none z-10 px-4">
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-wide drop-shadow-md">
                Julia & Felipe
              </h1>
            </div>

            {/* Scroll indicator */}
            <div 
              className="absolute bottom-4 left-0 right-0 text-center text-white/80 z-10 flex flex-col items-center gap-1 transition-all duration-150"
              style={{ opacity: helperTextOpacity }}
            >
              <span className="font-sans text-[9px] tracking-[0.2em] uppercase">Role para explorar</span>
              <ArrowDown className="w-3 h-3 animate-bounce" />
            </div>
          </div>

          {/* 2. AUXILIARY COLLAGE CARDS */}
          {/* Card 1: Top-Left */}
          <div 
            className="absolute w-[170px] aspect-[3/4] bg-white p-2 pb-4 shadow-xl border border-neutral-100 rounded-sm pointer-events-none transition-all duration-100 ease-out"
            style={{
              left: 0,
              top: 0,
              transform: `translate(calc(-50% - ${400 * (1 - scrollProgress)}px), calc(-30% - ${180 * (1 - scrollProgress)}px)) rotate(${-6 - 15 * (1 - scrollProgress)}deg)`,
            }}
          >
            <div className="w-full h-full overflow-hidden bg-neutral-100 rounded-sm">
              <img src="/imgs/IMG_6420.jpg" alt="Aux 1" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Card 2: Bottom-Left */}
          <div 
            className="absolute w-[170px] aspect-square bg-white p-2 pb-4 shadow-xl border border-neutral-100 rounded-sm pointer-events-none transition-all duration-100 ease-out"
            style={{
              left: 0,
              bottom: 0,
              transform: `translate(calc(-40% - ${400 * (1 - scrollProgress)}px), calc(30% + ${180 * (1 - scrollProgress)}px)) rotate(${4 + 12 * (1 - scrollProgress)}deg)`,
            }}
          >
            <div className="w-full h-full overflow-hidden bg-neutral-100 rounded-sm">
              <img src="/imgs/IMG_6436.jpg" alt="Aux 2" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Card 3: Top-Right */}
          <div 
            className="absolute w-[170px] aspect-square bg-white p-2 pb-4 shadow-xl border border-neutral-100 rounded-sm pointer-events-none transition-all duration-100 ease-out"
            style={{
              right: 0,
              top: 0,
              transform: `translate(calc(50% + ${400 * (1 - scrollProgress)}px), calc(-20% - ${180 * (1 - scrollProgress)}px)) rotate(${6 + 15 * (1 - scrollProgress)}deg)`,
            }}
          >
            <div className="w-full h-full overflow-hidden bg-neutral-100 rounded-sm">
              <img src="/imgs/IMG_6506.jpg" alt="Aux 3" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Card 4: Bottom-Right */}
          <div 
            className="absolute w-[170px] aspect-[3/4] bg-white p-2 pb-4 shadow-xl border border-neutral-100 rounded-sm pointer-events-none transition-all duration-100 ease-out"
            style={{
              right: 0,
              bottom: 0,
              transform: `translate(calc(40% + ${400 * (1 - scrollProgress)}px), calc(30% + ${180 * (1 - scrollProgress)}px)) rotate(${-4 - 12 * (1 - scrollProgress)}deg)`,
            }}
          >
            <div className="w-full h-full overflow-hidden bg-neutral-100 rounded-sm">
              <img src="/imgs/IMG_6507.jpg" alt="Aux 4" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>

        {/* 3. DYNAMIC CONTENT BELOW (Fades in without overlapping) */}
        <div 
          className="mt-6 flex flex-col items-center space-y-3 px-4 transition-all duration-300 ease-out flex-shrink-0"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${contentTranslateY}px)`,
            visibility: scrollProgress > 0.4 ? 'visible' : 'hidden',
          }}
        >
          <span className="font-serif text-lg italic text-brand-accent">
            Vamos nos casar!
          </span>
          
          <div className="flex items-center gap-3 text-brand-dark font-sans text-xs sm:text-sm tracking-wider font-medium">
            <Calendar className="w-4 h-4 text-brand-accent" />
            <span>17 de Outubro de 2026</span>
            <span className="text-brand-blush">|</span>
            <Clock className="w-4 h-4 text-brand-accent" />
            <span>17:00h</span>
          </div>

          {/* Countdown timer */}
          <div className="w-full max-w-lg scale-90 sm:scale-100 origin-center">
            <Countdown targetDate="2026-10-17T17:00:00" />
          </div>

          {/* CTA RSVP Button */}
          <button 
            onClick={() => scrollToSection('rsvp')}
            className="px-8 py-3.5 bg-brand-dark text-[#FDFBF7] rounded-full font-sans text-xs font-semibold uppercase tracking-widest hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Confirmar Presença (RSVP)
          </button>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
