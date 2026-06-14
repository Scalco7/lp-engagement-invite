import React from 'react';
import Reveal from '../atoms/Reveal';

export const QuoteBanner: React.FC = () => {
  return (
    <section className="relative h-screen p-5 overflow-hidden">
      <div className="relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-brand-dark/40 z-10" />
        <img
          src="/imgs/IMG_6500.jpg"
          alt="Casal"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-4000"
        />
        <div className="relative z-20 text-center px-4 max-w-2xl mx-auto space-y-4">
          <Reveal>
            <p className="font-serif text-2xl sm:text-6xl sm:font-normal italic text-white font-light leading-relaxed">
              "O amor é a chave que abre os portões da felicidade."
            </p>
            <span className="font-sans text-xs uppercase tracking-widest text-brand-blush font-semibold mt-2 block">
              — Oliver Wendell Holmes
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default QuoteBanner;
