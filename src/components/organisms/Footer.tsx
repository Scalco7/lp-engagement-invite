import React from 'react';
import { Heart } from 'lucide-react';
import { formatFullDate } from '../../utils/date';

interface FooterProps {
  engagementDate: Date;
}

export const Footer: React.FC<FooterProps> = ({ engagementDate }) => {
  return (
    <footer className="bg-brand-dark text-brand-bg py-16 px-4 border-t border-brand-blush/10 relative z-10 text-center space-y-6">
      <div className="flex justify-center items-center gap-2">
        <span className="font-serif text-3xl font-semibold tracking-widest">J & F</span>
        <Heart className="w-4 h-4 text-brand-blush fill-brand-blush animate-pulse" />
      </div>
      <p className="font-sans text-xs tracking-widest uppercase text-brand-blush/70">
        {formatFullDate(engagementDate)} • São Paulo, SP
      </p>
      <div className="w-12 h-[1px] bg-brand-blush/30 mx-auto" />
      <div>
        <p className="font-sans text-[10px] text-brand-bg/50 tracking-wider">
          Feito com carinho para a nossa festa de noivado.
        </p>
        <p className="font-sans text-[10px] text-brand-bg/50">
          Developed by Felipe Scalco & Julia (quase) Scalco
        </p>
      </div>
    </footer>
  );
};

export default Footer;
