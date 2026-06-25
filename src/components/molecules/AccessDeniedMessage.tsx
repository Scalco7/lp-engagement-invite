import React from 'react';
import { HeartOff, ArrowLeft } from 'lucide-react';
import Reveal from '../atoms/Reveal';

interface AccessDeniedMessageProps {
  onGoHome: () => void;
}

export const AccessDeniedMessage: React.FC<AccessDeniedMessageProps> = ({ onGoHome }) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-16">
      <Reveal>
        <div className="bg-white border border-brand-blush/30 rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgba(61,44,37,0.04)] relative overflow-hidden text-center">

          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blush via-brand-sage to-brand-accent" />

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 rounded-full bg-brand-blush/10 flex items-center justify-center text-brand-accent animate-pulse">
              <HeartOff className="w-6 h-6" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl italic text-brand-dark mb-4">
            Acesso Restrito
          </h2>

          {/* Message */}
          <p className="font-sans text-sm text-brand-dark/70 leading-relaxed mb-8">
            Você informou na confirmação de presença que infelizmente não poderá comparecer ao evento.
            Os palpites são exclusivos para os convidados confirmados. Sentiremos muito sua falta! ❤️
          </p>

          {/* Button */}
          <button
            onClick={onGoHome}
            className="w-full bg-brand-dark text-brand-bg font-sans font-medium text-sm py-4 rounded-xl shadow-md hover:bg-brand-accent hover:text-brand-dark active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a Página Inicial
          </button>

        </div>
      </Reveal>
    </div>
  );
};

export default AccessDeniedMessage;
