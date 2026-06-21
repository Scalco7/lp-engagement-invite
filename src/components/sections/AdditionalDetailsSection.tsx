import React from 'react';
import { Gift, Shirt } from 'lucide-react';
import Reveal from '../atoms/Reveal';

export const AdditionalDetailsSection: React.FC = () => {
  return (
    <section id="additional-details" className="py-14 px-4 bg-brand-bg relative border-t border-brand-blush/20">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.03]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-16">
          <Reveal>
            <span className="font-serif text-lg italic text-brand-accent block mb-2">Informações Úteis</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-brand-dark">Detalhes Adicionais</h2>
            <div className="w-16 h-[1px] bg-brand-blush/60 mx-auto mt-4" />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card: Traje (Dress Code) */}
          <Reveal delay={1}>
            <div className="bg-white py-4 px-8 sm:py-8 rounded-2xl border border-brand-blush/30 shadow-sm hover:shadow-md transition-shadow duration-300 text-center h-full flex flex-col items-center">
              <div className="w-14 h-14 bg-brand-bg/80 rounded-full flex items-center justify-center text-brand-accent mb-6">
                <Shirt className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-brand-dark mb-4">Traje</h3>
              <p className="font-sans text-sm text-brand-dark/75 leading-relaxed flex-grow">
                Para celebrar esse dia com conforto e elegância, o estilo de traje escolhido é o <strong>Esporte Fino / Passeio</strong>.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2 w-full">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-brand-dark bg-brand-bg px-3 py-1.5 rounded-full border border-brand-blush/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                  <span>Vestidos fluídos</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-brand-dark bg-brand-bg px-3 py-1.5 rounded-full border border-brand-blush/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-sage" />
                  <span>Blazer e camisa</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-brand-dark bg-brand-bg px-3 py-1.5 rounded-full border border-brand-blush/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blush" />
                  <span>Evitar branco puro</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card: Presentes */}
          <Reveal delay={2}>
            <div className="bg-white py-4 px-8 sm:py-8 rounded-2xl border border-brand-blush/30 shadow-sm hover:shadow-md transition-shadow duration-300 text-center h-full flex flex-col items-center">
              <div className="w-14 h-14 bg-brand-bg/80 rounded-full flex items-center justify-center text-brand-accent mb-6">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-brand-dark mb-4">Presentes</h3>
              <p className="font-sans text-sm text-brand-dark/75 leading-relaxed flex-grow">
                Sua presença é o nosso maior presente! Porém, caso deseje nos presentear, disponibilizamos uma chave PIX, ou você pode entregar na hora.
              </p>
              <div className="mt-8 flex flex-col gap-2 w-full">
                <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs font-semibold text-brand-dark uppercase tracking-widest bg-brand-bg px-5 py-3 rounded-full w-full border border-brand-blush/20">
                  <span className="text-brand-accent">PIX:</span>
                  <span className="select-all">(41) 99586-9381</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AdditionalDetailsSection;
