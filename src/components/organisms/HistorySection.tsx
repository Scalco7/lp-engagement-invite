import React from 'react';
import Reveal from '../atoms/Reveal';
import Timeline from './Timeline';

export const HistorySection: React.FC = () => {
  return (
    <section id="story" className="py-24 bg-white/40 border-y border-brand-blush/10">
      <div className="max-w-4xl mx-auto text-center px-4 mb-16">
        <Reveal>
          <span className="font-serif text-lg italic text-brand-accent block mb-2">Nossa História</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-brand-dark">Como tudo começou...</h2>
          <div className="w-16 h-[1px] bg-brand-blush/60 mx-auto mt-4" />
        </Reveal>
      </div>

      <Timeline />
    </section>
  );
};

export default HistorySection;
