import React from 'react';
import Reveal from '../atoms/Reveal';
import ConfirmForm from '../organisms/ConfirmForm';

interface ConfirmSectionProps {
  onRsvpUpdated?: () => void;
}

export const ConfirmSection: React.FC<ConfirmSectionProps> = ({ onRsvpUpdated }) => {
  return (
    <section id="confirm" className="py-14 bg-brand-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-4 mb-8">
        <Reveal>
          <span className="font-serif text-lg italic text-brand-accent block mb-2">Confirme sua presença</span>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-brand-dark">Você vai celebrar conosco?</h2>
          <div className="w-16 h-px bg-brand-blush/60 mx-auto mt-4" />
        </Reveal>
      </div>

      <ConfirmForm onRsvpUpdated={onRsvpUpdated} />
    </section>
  );
};

export default ConfirmSection;
