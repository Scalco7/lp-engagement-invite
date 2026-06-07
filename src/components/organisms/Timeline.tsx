import React from 'react';
import Reveal from '../atoms/Reveal';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image: string;
  rotation: string;
}

const timelineData: TimelineItem[] = [
  {
    year: '2021',
    title: 'O Primeiro Olhar',
    description: 'Tudo começou com uma conversa despretensiosa que parecia não ter fim. Em poucos minutos, percebemos que havia uma conexão especial ali, algo raro que mal podíamos esperar para descobrir mais.',
    image: '/imgs/IMG_6420.jpg',
    rotation: '-rotate-2 hover:rotate-0',
  },
  {
    year: '2022',
    title: 'O Pedido de Namoro',
    description: 'Sob um céu nublado que logo virou uma chuva refrescante, o pedido aconteceu. Rimos, nos molhamos e ali dissemos o primeiro "sim" de muitos que viriam pela frente.',
    image: '/imgs/IMG_6436.jpg',
    rotation: 'rotate-3 hover:rotate-0',
  },
  {
    year: '2025',
    title: 'O "Sim" Mais Importante',
    description: 'O pedido de casamento. Um momento íntimo, cheio de lágrimas de alegria e a certeza absoluta de que queremos caminhar de mãos dadas pelo resto de nossas vidas.',
    image: '/imgs/IMG_6449.jpg',
    rotation: '-rotate-1 hover:rotate-0',
  },
];

export const Timeline: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-16">
      {/* Central Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-brand-blush/60 -translate-x-1/2 hidden md:block" />

      <div className="space-y-16 md:space-y-24 relative">
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={item.year}
              className={`flex flex-col md:flex-row items-center justify-between w-full ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Spacer / Empty side on desktop */}
              <div className="w-full md:w-[45%] hidden md:block" />

              {/* Central Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-brand-accent bg-brand-bg z-10 hidden md:block" />

              {/* Content Side */}
              <div className="w-full md:w-[45%] flex flex-col items-center">
                <Reveal className="w-full">
                  {/* Polaroid Frame */}
                  <div
                    className={`bg-white p-4 pb-6 shadow-md hover:shadow-xl transition-all duration-500 transform ${item.rotation} cursor-pointer border border-neutral-100 rounded-sm`}
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-neutral-100 rounded-sm relative group">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-brand-dark/5 group-hover:opacity-0 transition-opacity duration-500" />
                    </div>
                    <div className="mt-4 text-center">
                      <span className="font-serif text-3xl italic text-brand-accent block mb-1">
                        {item.year}
                      </span>
                      <h3 className="font-serif text-2xl font-light text-brand-dark mb-2">
                        {item.title}
                      </h3>
                      <p className="font-sans text-sm leading-relaxed text-brand-dark/75 max-w-xs mx-auto">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
