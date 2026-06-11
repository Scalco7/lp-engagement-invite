import React from 'react';
import { MapPin, Info, Map } from 'lucide-react';
import Reveal from '../atoms/Reveal';

export const EventDetailsSection: React.FC = () => {
  return (
    <section id="event" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <Reveal>
          <span className="font-serif text-lg italic text-brand-accent block mb-2">A Festa de Noivado</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-brand-dark">A Celebração</h2>
          <div className="w-16 h-[1px] bg-brand-blush/60 mx-auto mt-4" />
        </Reveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Elegant event blocks */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Cerimônia */}
          <Reveal delay={1}>
            <div className="bg-white border border-brand-blush/30 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row gap-6 items-start">
              <div className="p-4 bg-brand-blush/10 rounded-xl text-brand-accent flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-grow">
                <h3 className="font-serif text-2xl text-brand-dark">A Recepção & Comemoração</h3>
                <p className="font-sans text-sm text-brand-dark/75 leading-relaxed">
                  Nossa festa de noivado será comemorada em uma linda chácara rodeada de natureza para compartilharmos este momento especial.
                </p>
                <div className="space-y-1.5 text-xs text-brand-dark/80 font-sans">
                  <p><strong>Horário:</strong> Sábado, 17 de Outubro de 2026, às 17:00h</p>
                  <p><strong>Local:</strong> Espaço Cantinho das Flores</p>
                  <p><strong>Endereço:</strong> Av. das Hortênsias, 1200 - Bairro das Fontes, São Paulo - SP</p>
                </div>
                <div className="pt-2">
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-brand-blush text-brand-accent hover:bg-brand-blush/20 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300"
                  >
                    <Map className="w-3.5 h-3.5" />
                    Ver no Google Maps
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Festa / Dress Code */}
          <Reveal delay={2}>
            <div className="bg-white border border-brand-blush/30 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row gap-6 items-start">
              <div className="p-4 bg-brand-sage/30 rounded-xl text-brand-dark/70 flex-shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <div className="space-y-3 flex-grow">
                <h3 className="font-serif text-2xl text-brand-dark">Traje (Dress Code)</h3>
                <p className="font-sans text-sm text-brand-dark/75 leading-relaxed">
                  Para celebrar esse dia com conforto e elegância, o estilo escolhido é o <strong>Esporte Fino / Passeio</strong>.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs text-brand-dark/80 bg-brand-bg px-4 py-2 rounded-full border border-brand-blush/20">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
                    <span>Vestidos fluídos</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-brand-dark/80 bg-brand-bg px-4 py-2 rounded-full border border-brand-blush/20">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-sage" />
                    <span>Blazer e camisa</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-brand-dark/80 bg-brand-bg px-4 py-2 rounded-full border border-brand-blush/20">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-blush" />
                    <span>Evitar branco puro</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>

        {/* Right Side: Collage Photo */}
        <div className="lg:col-span-5 flex justify-center">
          <Reveal className="relative p-3 bg-white border border-brand-blush/20 shadow-xl rounded-2xl max-w-sm overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100">
              <img 
                src="/imgs/IMG_6506.jpg" 
                alt="O Casal" 
                className="w-full h-full object-cover object-center hover:scale-[1.03] transition-transform duration-700" 
              />
            </div>
            <div className="pt-4 pb-2 text-center">
              <p className="font-serif text-lg italic text-brand-accent">
                Celebrando o nosso amor com vocês
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsSection;
