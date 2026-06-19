import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import Reveal from '../atoms/Reveal';

export const HeroSection: React.FC = () => {
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
      <section id="hero" className="flex flex-col items-center justify-center pb-12 pt-26 px-4 relative overflow-hidden bg-brand-bg">
        <div className="mx-auto w-full space-y-8 text-center flex flex-col items-center">

          {/* Main Photo Card */}
          <Reveal className="w-full relative shadow-lg rounded-2xl overflow-hidden border border-white/60">
            <div className="aspect-3/4 bg-neutral-100">
              <img
                src="/imgs/test.jpg"
                alt="Julia e Felipe"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  // --- INTERACTIVE DESKTOP SCROLL-LINKED COLLAGE ---
  const mainCardWidth = 98 - scrollProgress * 60;
  const mainCardRadius = 16 + scrollProgress * 24; // from 16px to 40px

  // Opacity parameters
  const overlayOpacity = 0.3 - scrollProgress * 0.2;
  const helperTextOpacity = Math.max(0, 1 - scrollProgress * 3);

  return (
    <div className="relative h-[220vh] bg-brand-bg" ref={wrapperRef}>
      {/* Sticky container uses vertical flexbox to stack items cleanly */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-24 pb-6 overflow-hidden">

        {/* Collage Area Container */}
        <div
          className="relative flex items-center justify-center transition-all duration-300 ease-out shrink-0"
          style={{
            width: `${mainCardWidth}%`,
            maxWidth: `${98 - (98 - 50) * scrollProgress}vw`,
            height: `80vh`,
            maxHeight: `700px`,
          }}
        >
          {/* 1. MAIN CARD (test.jpg) */}
          <div
            className="w-full h-full shadow-lg relative overflow-hidden transition-all duration-100 ease-out border border-white/60"
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
            <div className="@container absolute bottom-10 left-0 right-0 text-center text-white select-none z-10 px-4">
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-[10cqi] font-normal tracking-wide drop-shadow-md">
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
            className="absolute w-[180px] sm:w-[240px] aspect-[4/3] shadow-2xl rounded-2xl overflow-hidden pointer-events-none transition-all duration-100 ease-out border border-white/60"
            style={{
              right: '104%',
              top: '4%',
              transform: `translate(calc(-${120 * (1 - scrollProgress)}px), calc(-${50 * (1 - scrollProgress)}px)) rotate(${-2 - 4 * (1 - scrollProgress)}deg)`,
            }}
          >
            <img src="/imgs/hero-help-1.jpg" alt="Aux 1" className="w-full h-full object-cover" />
          </div>

          {/* Card 2: Lower-Left (also at top) */}
          <div
            className="absolute w-[160px] sm:w-[220px] aspect-square shadow-2xl rounded-2xl overflow-hidden pointer-events-none transition-all duration-100 ease-out border border-white/60"
            style={{
              right: '108%',
              top: '42%',
              transform: `translate(calc(-${140 * (1 - scrollProgress)}px), calc(${20 * (1 - scrollProgress)}px)) rotate(${2 + 4 * (1 - scrollProgress)}deg)`,
            }}
          >
            <img src="/imgs/hero-help-2.jpg" alt="Aux 2" className="w-full h-full object-cover" />
          </div>

          {/* Card 3: Upper-Right (at bottom) */}
          <div
            className="absolute w-[180px] sm:w-[240px] aspect-4/3 shadow-2xl rounded-2xl overflow-hidden pointer-events-none transition-all duration-100 ease-out border border-white/60"
            style={{
              left: '108%',
              bottom: '54%',
              transform: `translate(calc(${140 * (1 - scrollProgress)}px), calc(-${20 * (1 - scrollProgress)}px)) rotate(${2 + 4 * (1 - scrollProgress)}deg)`,
            }}
          >
            <img src="/imgs/hero-help-4.jpg" alt="Aux 3" className="w-full h-full object-cover" />
          </div>

          {/* Card 4: Bottom-Right */}
          <div
            className="absolute w-[160px] sm:w-[220px] aspect-6/7 shadow-2xl rounded-2xl overflow-hidden pointer-events-none transition-all duration-100 ease-out border border-white/60"
            style={{
              left: '104%',
              bottom: '4%',
              transform: `translate(calc(${100 * (1 - scrollProgress)}px), calc(${40 * (1 - scrollProgress)}px)) rotate(${-2 - 4 * (1 - scrollProgress)}deg)`,
            }}
          >
            <img src="/imgs/hero-help-3.jpg" alt="Aux 4" className="w-full h-full object-cover" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default HeroSection;
