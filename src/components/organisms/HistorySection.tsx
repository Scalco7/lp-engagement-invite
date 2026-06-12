import React, { useRef, useEffect, useState } from 'react';
import Reveal from '../atoms/Reveal';

interface HistoryItem {
  year: string;
  title: string;
  description: string;
  image: string;
}

const historyData: HistoryItem[] = [
  {
    year: '2015',
    title: 'O Primeiro Olhar',
    description: 'Tudo começou com uma conversa despretensiosa em um dia comum, mas que parecia não ter fim. Em poucos minutos, percebemos que havia uma conexão especial ali, algo raro que mal podíamos esperar para descobrir mais.',
    image: '/imgs/IMG_6420.jpg',
  },
  {
    year: '2016',
    title: 'O Primeiro Encontro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. O riso foi fácil e a certeza de querer estar perto um do outro só aumentou.',
    image: '/imgs/IMG_6436.jpg',
  },
  {
    year: '2017',
    title: 'Nossa Primeira Viagem',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Descobrimos o prazer de viajar juntos.',
    image: '/imgs/IMG_6449.jpg',
  },
  {
    year: '2018',
    title: 'Criando Laços',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Cada dia mais unidos na rotina e nos sonhos.',
    image: '/imgs/IMG_6500.jpg',
  },
  {
    year: '2019',
    title: 'Conquistando Espaços',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Comemoramos juntos cada vitória.',
    image: '/imgs/IMG_6506.jpg',
  },
  {
    year: '2020',
    title: 'Novos Desafios',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mollis nunc sed id semper risus in hendrerit gravida rutrum. Diante de qualquer adversidade, descobrimos que nossa maior força era estarmos de mãos dadas.',
    image: '/imgs/IMG_6507.jpg',
  },
  {
    year: '2021',
    title: 'Nosso Cantinho',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Demos vida a um espaço que tem a nossa cara e reflete o aconchego do nosso amor.',
    image: '/imgs/IMG_6374.jpg',
  },
  {
    year: '2022',
    title: 'O Pedido de Namoro',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium vulputate sapien nec sagittis aliquam malesuada. Sob um céu inesquecível, dissemos o primeiro sim oficial para a nossa história.',
    image: '/imgs/test.jpg',
  },
  {
    year: '2023',
    title: 'Amadurecendo Juntos',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Compartilhamos planos de vida a longo prazo e a vontade inabalável de construir uma família.',
    image: '/imgs/IMG_6420.jpg',
  },
  {
    year: '2024',
    title: 'O Planejamento',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat pretium nibh ipsum consequat nisl vel pretium. Cada passo dado foi com o coração cheio de expectativa pelo futuro incrível que nos aguarda.',
    image: '/imgs/IMG_6436.jpg',
  },
  {
    year: '2025',
    title: 'O Pedido de Casamento',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam sollicitudin tempor id eu nisl nunc mi ipsum faucibus. Um momento íntimo, repleto de lágrimas de pura alegria e a certeza absoluta de que queremos o "para sempre".',
    image: '/imgs/IMG_6449.jpg',
  },
];

export const HistorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewHeight = window.innerHeight;

      const start = rect.top;
      const totalScrollable = sectionHeight - viewHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.min(Math.max(-start / totalScrollable, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const getCardStyle = (index: number) => {
    const totalCards = historyData.length;
    // We want the last card to stay fully active at progress = 1
    // Scale cardProgress from 0 to totalCards - 0.5
    const cardProgress = scrollProgress * (totalCards - 0.5);
    const diff = cardProgress - index;
    const rotation = index % 2 === 0 ? 0.7 : -0.7;

    if (diff < -1) {
      return {
        transform: `translateY(100vh) scale(1) rotate(${rotation}deg)`,
        opacity: 0,
        filter: 'brightness(1)',
        zIndex: index,
        visibility: 'hidden' as const,
      };
    } else if (diff < 0) {
      const progress = diff + 1; // 0 to 1
      const slideY = (1 - progress) * 80; // slides up from 80vh
      const finalY = index * 22; // Cards stack statically with a larger 22px gap
      return {
        transform: `translateY(calc(${finalY}px + ${slideY}vh)) scale(1) rotate(${rotation}deg)`,
        opacity: 1, // Fully opaque during entry to prevent overlaps
        filter: 'brightness(1)',
        zIndex: index,
        visibility: 'visible' as const,
      };
    } else {
      const translateY = index * 15; // Perfectly static positions relative to stack
      const brightness = Math.max(0.7, 1 - diff * 0.15); // Active card is 1.0, stacked cards dim to 0.7

      return {
        transform: `translateY(${translateY}px) scale(1) rotate(${rotation}deg)`,
        opacity: 1, // Keep fully opaque to block content underneath
        filter: `brightness(${brightness})`,
        zIndex: index,
        visibility: 'visible' as const,
      };
    }
  };

  return (
    <section id="story" ref={containerRef} className="relative h-[800vh] bg-brand-bg">
      <div className="sticky top-0 h-[101vh] w-full flex flex-col pt-20 items-center justify-start px-4 overflow-hidden">

        {/* Title Area */}
        <div className="text-center mb-8 shrink-0 z-20">
          <Reveal>
            <span className="font-serif text-lg italic text-brand-accent block mb-1">Nossa História</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-brand-dark">Como tudo começou...</h2>
            <div className="w-12 h-[1px] bg-brand-blush/60 mx-auto mt-2" />
          </Reveal>
        </div>

        {/* Cards Stack Container */}
        <div className="relative w-full max-w-4xl h-120 flex items-center justify-center">
          {historyData.map((item, index) => (
            <div
              key={index}
              className="absolute w-[95%] max-w-[800px] h-[450px] sm:h-[430px] md:h-[390px] flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden border border-brand-blush/20 transition-all duration-75 ease-out"
              style={getCardStyle(index)}
            >
              {/* Left Column: Image */}
              <div className="w-full md:w-1/2 h-[180px] sm:h-[200px] md:h-full overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-dark/5" />
              </div>

              {/* Right Column: Text */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center space-y-2.5 sm:space-y-3 text-left">
                <span className="font-serif text-2xl sm:text-3xl italic text-brand-accent block">
                  {item.year}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-light text-brand-dark">
                  {item.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-brand-dark/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HistorySection;
