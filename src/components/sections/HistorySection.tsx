import React, { useRef, useEffect, useState } from 'react';
import Reveal from '../atoms/Reveal';

interface HistoryItem {
  year?: string;
  title?: string;
  description?: string;
  image: string;
}

const historyData: HistoryItem[] = [
  {
    year: 'Maio de 2025',
    description: 'Tudo começou por causa de um vídeo de programação que, curiosamente, nem sabemos mais qual é. Foram três meses de mensagens, ligações intermináveis e muitas horas compartilhando sonhos, planos e histórias. Até que chegou a hora de transformar tudo aquilo em realidade.',
    image: '/imgs/history/may_2025.jpeg',
  },
  {
    year: 'Agosto de 2025',
    title: 'Primeiro Encontro',
    description: 'No dia 15 de agosto de 2025, Felipe saiu de Curitiba/PR rumo a Presidente Prudente/SP. Foram mais de 600 quilômetros de estrada, alguns imprevistos pelo caminho e horas de atraso. Mas bastou um final de semana para percebermos que tudo aquilo valia a pena. O que antes existia apenas através das telas finalmente se tornou real.',
    image: '/imgs/history/august_2025.jpeg',
  },
  {
    year: 'Setembro de 2025',
    description: 'Depois vieram mais encontros, cada um confirmando aquilo que já sentíamos.',
    image: '/imgs/history/september_2025.jpeg',
  },
  {
    year: 'Outubro de 2025',
    description: 'Até que, no fim de semana de 11 de outubro de 2025 em Cornélio Procópio/PR, o pedido de namoro. Foi simples, surpreendente e perfeito.',
    image: '/imgs/history/request.jpeg',
  },
  {
    title: 'Familia',
    description: 'A partir dali, colecionamos memórias incríveis: passeios por Curitiba, o primeiro encontro com a família do Felipe.',
    image: '/imgs/history/scalco_family.jpeg',
  },
  {
    title: 'Passeios',
    image: '/imgs/history/barigui_kiss.jpeg',
  },
  {
    year: 'Novembro de 2025',
    description: 'Férias, aniversários, casamentos de amigos, a formatura e tantas outras datas que passaram a ter um significado ainda mais especial porque estávamos juntos.',
    image: '/imgs/history/basket_day.jpeg',
  },
  {
    title: 'Casamento',
    image: '/imgs/history/friend_wedding.jpeg',
  },
  {
    title: 'Formatura',
    image: '/imgs/history/gabi_graduation.jpeg',
  },
  {
    year: 'Dezembro de 2025',
    description: 'Nossas famílias também se conheceram, compartilhamos nosso primeiro Natal e Ano Novo.',
    image: '/imgs/history/families_together.jpeg',
  },
  {
    title: 'Ano novo',
    image: '/imgs/history/new_year.jpeg',
  },
  {
    title: 'Passeio no Zoo',
    image: '/imgs/history/zoo.jpeg',
  },
  {
    year: 'Janeiro de 2026',
    description: 'E vivemos aventuras que jamais esqueceremos, como a trilha do Itupava ao lado dos amigos do Felipe.',
    image: '/imgs/history/itupava_hikking.jpeg',
  },
  {
    year: 'Fevereiro de 2026',
    title: 'Acampamento de carnaval',
    image: '/imgs/history/carnival_acamp.jpeg',
  },
  {
    title: 'Acampamento de carnaval',
    image: '/imgs/history/carnival_acamp_party.jpeg',
  },
  {
    year: 'Março de 2026',
    description: 'Nesse período, Felipe se mudou para Piraju/SP, uma cidade encantadora às margens do rio Paranapanema, um lugar onde eu facilmente imaginava construindo nossa futura família.',
    image: '/imgs/history/piraju.jpeg',
  },
  {
    year: 'Abril de 2026',
    description: 'Mas a vida ainda nos reservava mais surpresas. Felipe foi aprovado para um mestrado em Portugal. Com a alegria da conquista, também vieram os desafios: a distância, a saudade e a incerteza do tempo que passaríamos separados.',
    image: '/imgs/history/pt_edital_result.jpeg',
  },
  {
    description: 'E foi justamente em meio a tudo isso que tivemos mais uma confirmação de que o amor sempre encontra seu caminho.',
    image: '/imgs/history/in_the_car.jpeg',
  },
  {
    year: 'Maio de 2026',
    title: 'Pedido de Casamento',
    description: 'No dia 3 de maio de 2026, ao pôr do sol às margens do Rio Paranapanema, veio o  pedido de casamento. Um novo capítulo começava, e o sonho que nasceu em uma conversa despretensiosa agora se transformava em uma promessa para a vida toda.',
    image: '/imgs/history/wedding_request.jpeg',
  },
  {
    description: 'Nossa história ainda está sendo escrita. Muitos capítulos, aventuras e sonhos nos aguardam. E ficamos felizes por ter vocês conosco, celebrando e fazendo parte deste momento tão especial das nossas vidas.',
    image: '/imgs/history/hugging.jpeg',
  }
];

export const HistorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    // Scale cardProgress from 0 to totalCards - 0.5
    const cardProgress = scrollProgress * (totalCards - 0.5);
    const diff = cardProgress - index;
    const rotation = index % 2 === 0 ? 0.7 : -0.7;

    // Use a smaller spacing gap on mobile so cards stack tightly
    const gap = isMobile ? 6 : 10;

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
      const finalY = (index - cardProgress) * gap;
      return {
        transform: `translateY(calc(${finalY}px + ${slideY}vh)) scale(1) rotate(${rotation}deg)`,
        opacity: 1, // Fully opaque during entry to prevent overlaps
        filter: 'brightness(1)',
        zIndex: index,
        visibility: 'visible' as const,
      };
    } else {
      const translateY = (index - cardProgress) * gap;
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
    <section id="story" ref={containerRef} className="relative h-[1800vh] bg-brand-bg">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">

        {/* Title Area */}
        <div className="text-center mb-12 md:mb-20 shrink-0 z-20">
          <Reveal>
            <span className="font-serif text-base md:text-lg italic text-brand-accent block mb-1">Nossa História</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-brand-dark">Como tudo começou...</h2>
            <div className="w-12 h-px bg-brand-blush/60 mx-auto mt-2" />
          </Reveal>
        </div>

        {/* Cards Stack Container */}
        <div className="relative w-full max-w-4xl h-[510px] sm:h-[530px] md:h-[440px] flex items-center justify-center">
          {historyData.map((item, index) => {
            const hasDescription = !!item.description;

            return (
              <div
                key={index}
                className="absolute w-[95%] max-w-[800px] h-[480px] md:h-[390px] flex flex-col md:flex-row items-center md:items-stretch justify-start bg-white rounded-3xl shadow-md overflow-hidden border border-brand-blush/20 transition-all duration-75 ease-out"
                style={getCardStyle(index)}
              >
                {/* Image Container */}
                <div
                  className={
                    hasDescription
                      ? "relative w-full md:w-1/2 h-[250px] md:h-full overflow-hidden bg-brand-dark/5"
                      : "relative w-full md:w-1/2 h-[390px] md:h-full overflow-hidden bg-brand-dark/5"
                  }
                >
                  {/* Blurred background image for mobile */}
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-40 select-none pointer-events-none md:hidden"
                  />
                  {/* Main image */}
                  <img
                    src={item.image}
                    alt={item.title || "Foto da história"}
                    className="w-full h-full object-contain md:object-cover relative z-10"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-dark/5 z-20" />
                </div>

                {/* Text Container */}
                {hasDescription ? (
                  <div className="w-full md:w-1/2 h-[230px] md:h-full p-5 md:p-8 flex flex-col justify-center space-y-2 md:space-y-3 text-left bg-white">
                    {item.year && (
                      <span className="font-serif text-2xl sm:text-3xl italic text-brand-accent block">
                        {item.year}
                      </span>
                    )}
                    {item.title && (
                      <h3 className="font-serif text-xl sm:text-2xl font-light text-brand-dark">
                        {item.title}
                      </h3>
                    )}
                    <p className="font-sans text-xs sm:text-sm text-brand-dark/75 leading-relaxed overflow-y-auto">
                      {item.description}
                    </p>
                  </div>
                ) : (
                  <div className="w-full md:w-1/2 h-[90px] md:h-full p-4 md:p-8 flex flex-col justify-center space-y-1 md:space-y-3 text-center md:text-left bg-white">
                    {item.year && (
                      <span className="font-serif text-xs md:text-2xl md:italic text-brand-accent block leading-none md:leading-normal">
                        {item.year}
                      </span>
                    )}
                    {item.title && (
                      <h3 className="font-serif text-base md:text-xl lg:text-2xl  text-brand-dark leading-none md:leading-normal">
                        {item.title}
                      </h3>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HistorySection;
