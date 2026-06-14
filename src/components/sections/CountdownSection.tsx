import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import Reveal from '../atoms/Reveal';
import Countdown from '../molecules/Countdown';
import { formatFullDate, formatTime, getDayOfWeek } from '../../utils/date';

interface CountdownSectionProps {
  engagementDate: Date;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ engagementDate }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let triggered = false;

    const playConfetti = () => {
      // Left side burst
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.8 },
        colors: ['#E2C2B9', '#D4E2D4', '#C79C93', '#FDFBF7', '#3D2C25']
      });

      // Right side burst
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.8 },
        colors: ['#E2C2B9', '#D4E2D4', '#C79C93', '#FDFBF7', '#3D2C25']
      });
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Trigger when the bottom of the section reaches the bottom of the viewport
      if (rect.bottom <= viewportHeight + 50 && rect.top < viewportHeight) {
        if (!triggered) {
          triggered = true;

          // Smooth scroll to align the bottom of the section to the bottom of the screen
          sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });

          // Wait for smooth scroll to finish, then lock and play confetti
          setTimeout(() => {
            playConfetti();
          }, 400);
        }
      } else if (rect.top > viewportHeight || rect.bottom < 0) {
        // Reset triggered state if they scroll completely away
        triggered = false;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="countdown"
      ref={sectionRef}
      className="min-h-[90vh] flex items-center justify-center bg-brand-bg relative overflow-hidden"
    >

      {/* Decorative background elements to keep the section premium */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-blush/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand-accent/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-16 flex flex-col items-center justify-center space-y-10">

        {/* Title Area */}
        <div className="space-y-3">
          <Reveal>
            <span className="font-serif text-xl italic text-brand-accent block">Falta Pouco!</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-brand-dark tracking-wide mt-2">
              Contagem Regressiva
            </h2>
            <div className="w-16 h-px bg-brand-blush/40 mx-auto mt-4" />
          </Reveal>
        </div>

        {/* Date Display */}
        <Reveal delay={1}>
          <div className="space-y-2">
            <p className="font-serif text-2xl sm:text-3xl text-brand-dark font-light tracking-wide">
              {formatFullDate(engagementDate)}
            </p>
            <p className="font-sans text-xs sm:text-sm tracking-widest text-brand-dark/70 uppercase">
              {getDayOfWeek(engagementDate)} • às {formatTime(engagementDate)}
            </p>
          </div>
        </Reveal>

        <div>
          {/* Countdown Timer */}
          <Reveal delay={2} className="w-full">
            <div className="scale-105 sm:scale-120 py-4 origin-center">
              <Countdown targetDate={engagementDate} />
            </div>
          </Reveal>

          {/* Message */}
          <Reveal delay={3}>
            <p className="font-serif text-3xl sm:text-4xl italic text-brand-accent font-light mt-4">
              Venha comemorar conosco!
            </p>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default CountdownSection;
