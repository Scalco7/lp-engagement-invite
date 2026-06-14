import React from 'react';
import { Map } from 'lucide-react';
import Reveal from '../atoms/Reveal';
import { getDayOfWeek, formatFullDate, formatTime } from '../../utils/date';

interface EventDetailsSectionProps {
  engagementDate: Date;
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({ engagementDate }) => {
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
              <div className="w-16 h-16 bg-white border border-brand-blush/20 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center p-1 shadow-sm">
                <img
                  src="/imgs/nostra_casa_logo.webp"
                  alt="Nostra Casa Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-3 flex-grow">
                <h3 className="font-serif text-2xl text-brand-dark">A Recepção & Comemoração</h3>
                <p className="font-sans text-sm text-brand-dark/75 leading-relaxed text-left">
                  Nossa comemoração será realizada na <strong>Nostra Casa Pizzaria</strong>. Venha celebrar conosco saboreando um delicioso rodízio de pizzas! O valor de participação no rodízio é de <strong>R$ 75,00 por pessoa</strong> (bebidas inclusas).
                </p>
                <div className="space-y-1.5 text-xs text-brand-dark/80 font-sans text-left">
                  <p><strong>Horário:</strong> {getDayOfWeek(engagementDate)}, {formatFullDate(engagementDate)}, às {formatTime(engagementDate)}</p>
                  <p><strong>Local:</strong> Nostra Casa Pizzaria (Pilarzinho)</p>
                  <p><strong>Endereço:</strong> R. Raposo Tavares, 1032 - Pilarzinho, Curitiba - PR</p>
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <a
                     href="https://maps.google.com/?q=Nostra+Casa+Pizzaria+Pilarzinho+Curitiba"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center gap-2 px-5 py-2.5 border border-brand-blush text-brand-accent hover:bg-brand-blush/20 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer"
                  >
                    <Map className="w-3.5 h-3.5" />
                    Ver no Google Maps
                  </a>
                  <a
                    href="https://nostracasapizzaria.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-white hover:bg-brand-accent hover:text-brand-dark text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer"
                  >
                    Visitar Site
                  </a>
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
