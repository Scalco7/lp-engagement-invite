import React from 'react';
import Reveal from '../atoms/Reveal';
import GiftList from './GiftList';

export const GiftsSection: React.FC = () => {
  return (
    <section id="gifts" className="py-24 bg-white/40 border-y border-brand-blush/10">
      <div className="max-w-4xl mx-auto text-center px-4 mb-8">
        <Reveal>
          <span className="font-serif text-lg italic text-brand-accent block mb-2">Presentes</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-brand-dark">Lista de Presentes</h2>
          <div className="w-16 h-[1px] bg-brand-blush/60 mx-auto mt-4" />
        </Reveal>
      </div>

      <GiftList />
    </section>
  );
};

export default GiftsSection;
