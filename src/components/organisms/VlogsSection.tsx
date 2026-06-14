import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import Reveal from '../atoms/Reveal';

interface Vlog {
  id: string;
  title: string;
  episode: string;
  description: string;
  thumbnail: string;
}

const vlogsData: Vlog[] = [
  {
    id: 'imDS02iQGVA',
    title: 'Redressa Scalco Vlog',
    episode: 'Episódio 1',
    description: 'Nossa primeira aventura gravada em vídeo, compartilhando momentos especiais e divertidos.',
    thumbnail: 'https://img.youtube.com/vi/imDS02iQGVA/maxresdefault.jpg',
  },
  {
    id: '7ouiLlS6XF0',
    title: 'Redressa Scalco Vlog',
    episode: 'Episódio 2',
    description: 'Dando continuidade à nossa jornada, registrando sorrisos, passeios e descobertas juntos.',
    thumbnail: 'https://img.youtube.com/vi/7ouiLlS6XF0/maxresdefault.jpg',
  },
  {
    id: 'gp6e4IhfEyE',
    title: 'Redressa Scalco Vlog',
    episode: 'Episódio 3',
    description: 'Mais um capítulo da nossa história registrado em vídeo para guardar com muito carinho.',
    thumbnail: 'https://img.youtube.com/vi/gp6e4IhfEyE/maxresdefault.jpg',
  },
];

export const VlogsSection: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const openVideo = (id: string) => {
    setActiveVideoId(id);
  };

  const closeVideo = () => {
    setActiveVideoId(null);
  };

  return (
    <section id="vlogs" className="py-14 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5 z-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-brand-blush blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-brand-sage blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <Reveal>
            <span className="font-serif text-lg italic text-brand-accent block mb-2">Nossos Vídeos</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-brand-dark">Diários de Bordo</h2>
            <div className="w-16 h-px bg-brand-blush/60 mx-auto mt-4" />
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vlogsData.map((vlog, index) => (
            <Reveal key={vlog.id} delay={(index + 1) as 1 | 2 | 3}>
              <div
                onClick={() => openVideo(vlog.id)}
                className="group cursor-pointer bg-brand-bg/25 rounded-3xl overflow-hidden border border-brand-blush/20 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
              >
                {/* Thumbnail container */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 shrink-0">
                  <img
                    src={vlog.thumbnail}
                    alt={`${vlog.title} - ${vlog.episode}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay on hover / action indicator */}
                  <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-white/95 text-brand-accent flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                  {/* YouTube badge */}
                  <div className="absolute top-3 right-3 bg-brand-dark/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase flex items-center gap-1.5 z-10">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-red-500">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span>YouTube</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-widest text-brand-accent">
                      {vlog.episode}
                    </span>
                    <h3 className="font-serif text-xl text-brand-dark group-hover:text-brand-accent transition-colors duration-300">
                      {vlog.title}
                    </h3>
                    <p className="font-sans text-xs text-brand-dark/75 leading-relaxed">
                      {vlog.description}
                    </p>
                  </div>
                  <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-brand-accent uppercase tracking-widest group-hover:underline">
                    <span>Assistir vídeo</span>
                    <Play className="w-3 h-3 fill-current animate-pulse" />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Video Modal (Lightbox) */}
      {activeVideoId && (
        <div className="fixed inset-0 bg-brand-dark/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop close area */}
          <div className="absolute inset-0" onClick={closeVideo} />

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl z-10 aspect-video animate-scale-up border border-white/10">
            <button
              onClick={closeVideo}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-brand-accent hover:text-brand-dark flex items-center justify-center transition-colors duration-300 z-20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default VlogsSection;
