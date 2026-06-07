import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import Reveal from '../atoms/Reveal';
import Countdown from '../molecules/Countdown';

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection }) => {
  return (
    <section id="hero" className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Photo Frame */}
        <div className="lg:col-span-6 flex justify-center items-center order-2 lg:order-1">
          <Reveal className="relative p-3 bg-white border border-brand-blush/20 shadow-xl rounded-2xl max-w-sm sm:max-w-md overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100">
              <img 
                src="/imgs/IMG_6374.jpg" 
                alt="Julia e Felipe" 
                className="w-full h-full object-cover object-top hover:scale-[1.03] transition-transform duration-700" 
              />
            </div>
            {/* Vintage overlay text inside frame */}
            <div className="pt-4 pb-2 text-center">
              <p className="font-serif text-lg italic text-brand-accent">
                Amor que transborda a cada dia
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Text & Countdown */}
        <div className="lg:col-span-6 text-center lg:text-left order-1 lg:order-2 space-y-6 flex flex-col items-center lg:items-start">
          <Reveal>
            <span className="font-serif text-xl italic text-brand-accent block mb-2">
              Vamos nos casar!
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl font-light text-brand-dark tracking-wide leading-tight">
              Julia <br className="hidden lg:block"/>
              <span className="font-serif font-light text-brand-blush">&</span> Felipe
            </h1>
          </Reveal>

          <Reveal delay={1}>
            <div className="flex items-center gap-3 text-brand-dark/80 font-sans text-sm sm:text-base tracking-wide mt-2">
              <Calendar className="w-4 h-4 text-brand-accent" />
              <span>17 de Outubro de 2026</span>
              <span className="text-brand-blush/60">|</span>
              <Clock className="w-4 h-4 text-brand-accent" />
              <span>17:00h</span>
            </div>
          </Reveal>

          {/* Countdown Timer */}
          <Reveal delay={2} className="w-full flex justify-center lg:justify-start">
            <Countdown targetDate="2026-10-17T17:00:00" />
          </Reveal>

          {/* CTA Button */}
          <Reveal delay={3} className="pt-4">
            <button 
              onClick={() => scrollToSection('rsvp')}
              className="px-8 py-4 bg-brand-dark text-white rounded-full font-sans text-xs font-semibold uppercase tracking-widest hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Confirmar Presença (RSVP)
            </button>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
