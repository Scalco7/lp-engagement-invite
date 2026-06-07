import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-brand-bg py-16 px-4 border-t border-brand-blush/10 relative z-10 text-center space-y-6">
      <div className="flex justify-center items-center gap-2">
        <span className="font-serif text-3xl font-semibold tracking-widest">J & F</span>
        <Heart className="w-4 h-4 text-brand-blush fill-brand-blush animate-pulse" />
      </div>
      <p className="font-sans text-xs tracking-widest uppercase text-brand-blush/70">
        17 de Outubro de 2026 • São Paulo, SP
      </p>
      <div className="w-12 h-[1px] bg-brand-blush/30 mx-auto" />
      <p className="font-sans text-[10px] text-brand-bg/50 tracking-wider">
        Feito com carinho para o nosso grande dia.
      </p>
    </footer>
  );
};

export default Footer;
