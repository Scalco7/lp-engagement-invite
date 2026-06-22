import React from 'react';
import { Map, Utensils } from 'lucide-react';
import Reveal from '../atoms/Reveal';
import { getDayOfWeek, formatFullDate, formatTime } from '../../utils/date';

interface EventDetailsSectionProps {
  engagementDate: Date;
}

export const EventDetailsSection: React.FC<EventDetailsSectionProps> = ({ engagementDate }) => {
  return (
    <section id="event" className="py-14 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-8 sm:mb-16">
        <Reveal>
          <span className="font-serif text-lg italic text-brand-accent block mb-2">A Festa de Noivado</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-brand-dark">O Local</h2>
          <div className="w-16 h-px bg-brand-blush/60 mx-auto mt-4" />
        </Reveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        {/* Left Side: Elegant event blocks */}
        <div className="lg:col-span-7 space-y-8 h-full">
          {/* Cerimônia */}
          <Reveal delay={1} className="h-full">
            <div className="bg-white border h-full border-brand-blush/30 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row gap-6 items-stretch">
              <div className="w-16 h-16 bg-white border border-brand-blush/20 rounded-xl shrink-0 overflow-hidden flex items-center justify-center p-1 shadow-sm sm:self-start">
                <img
                  src="/imgs/nostra_casa_logo.webp"
                  alt="Nostra Casa Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-4 grow flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-brand-dark">O Local</h3>
                  <p className="font-sans text-sm text-brand-dark/75 leading-relaxed text-left">
                    Nossa festa de noivado será realizada na <strong>Nostra Casa Pizzaria</strong>. Venha celebrar conosco saboreando um delicioso rodízio de pizzas salgadas e doces em um ambiente super aconchegante!
                  </p>
                  <div className="space-y-2 text-xs text-brand-dark/80 font-sans text-left bg-brand-bg/40 p-4 rounded-xl border border-brand-blush/10">
                    <p><strong>Horário:</strong> {getDayOfWeek(engagementDate)}, {formatFullDate(engagementDate)}, às {formatTime(engagementDate)}</p>
                    <p><strong>Local:</strong> Nostra Casa Pizzaria (Pilarzinho)</p>
                    <p><strong>Endereço:</strong> R. Raposo Tavares, 1032 - Pilarzinho, Curitiba - PR</p>
                    <p><strong>Valor: R$ 75,00 por pessoa</strong> (rodízio com bebidas inclusas, pago diretamente no local)</p>
                    <p><strong>Estacionamento:</strong> Estacionamento no local disponível para convidados</p>
                  </div>
                  <p className="font-sans text-[11px] text-brand-dark/65 leading-relaxed text-left italic">
                    * A confirmação de presença é muito importante para organizarmos a reserva junto ao local. Por favor, confirme até o dia 05 de julho.
                  </p>
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
                    href="https://nostracasapizzaria.com.br/cardapio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-white hover:bg-brand-accent hover:text-brand-dark text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer"
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    Ver Cardápio
                  </a>
                  <a
                    href="https://nostracasapizzaria.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-brand-blush text-brand-accent hover:bg-brand-blush/20 text-xs font-semibold uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer"
                  >
                    Visitar Site
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Collage Photo */}
        <div className="lg:col-span-5 justify-center hidden lg:flex">
          <Reveal className="relative p-3 bg-white border border-brand-blush/20 shadow-xl rounded-2xl max-w-sm overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="aspect-3/3 rounded-xl overflow-hidden bg-neutral-100">
              <img
                src="/imgs/hot_seeing.jpeg"
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
