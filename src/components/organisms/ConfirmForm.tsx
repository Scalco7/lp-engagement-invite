import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, CheckCircle } from 'lucide-react';
import Reveal from '../atoms/Reveal';
import { formatFullDate, getConfirmDeadline } from '../../utils/date';

interface ConfirmFormProps {
  engagementDate: Date;
}

export const ConfirmForm: React.FC<ConfirmFormProps> = ({ engagementDate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: 'yes', // 'yes' | 'no'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectAttending = (value: 'yes' | 'no') => {
    setFormData((prev) => ({ ...prev, attending: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      if (formData.attending === 'yes') {
        // Trigger elegant confetti with brand colors
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E2C2B9', '#D4E2D4', '#C79C93', '#FDFBF7', '#3D2C25']
        });
      }
    }, 1500);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-2 min-[360px]:px-4">
      <Reveal>
        <div className="bg-white border border-brand-blush/30 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">

          {/* Subtle design element */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blush via-brand-sage to-brand-accent" />

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="text-center mb-8">
                <span className="font-serif text-3xl italic text-brand-accent block mb-1">
                  Confirmação de Presença
                </span>
                <p className="font-sans text-xs text-brand-dark/60 mt-2">
                  Por favor, confirme sua presença até o dia {formatFullDate(getConfirmDeadline(engagementDate))}.
                </p>
              </div>

              {/* Nome Completo */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="font-sans text-xs font-semibold text-brand-dark/80 uppercase tracking-wider block">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Como está no convite"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-accent transition-colors duration-300 bg-brand-bg/20 text-brand-dark"
                />
              </div>

              {/* Email & Telefone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="font-sans text-xs font-semibold text-brand-dark/80 uppercase tracking-wider block">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="exemplo@email.com"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-accent transition-colors duration-300 bg-brand-bg/20 text-brand-dark"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="font-sans text-xs font-semibold text-brand-dark/80 uppercase tracking-wider block">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-accent transition-colors duration-300 bg-brand-bg/20 text-brand-dark"
                  />
                </div>
              </div>

              {/* Você irá? */}
              <div className="space-y-2.5">
                <label className="font-sans text-xs font-semibold text-brand-dark/80 uppercase tracking-wider block">
                  Você irá ao evento? *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleSelectAttending('yes')}
                    className={`py-3.5 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${formData.attending === 'yes'
                      ? 'border-brand-accent bg-brand-blush/20 text-brand-dark font-semibold'
                      : 'border-neutral-200 hover:border-brand-blush/50 text-brand-dark/70'
                      }`}
                  >
                    <Heart className={`w-4 h-4 ${formData.attending === 'yes' ? 'fill-brand-accent text-brand-accent' : 'text-neutral-400'}`} />
                    Sim, irei!
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectAttending('no')}
                    className={`py-3.5 px-2 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${formData.attending === 'no'
                      ? 'border-brand-accent bg-brand-blush/20 text-brand-dark font-semibold'
                      : 'border-neutral-200 hover:border-brand-blush/50 text-brand-dark/70'
                      }`}
                  >
                    Infelizmente não posso
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-dark text-brand-bg font-sans font-medium text-sm py-4 rounded-xl shadow-md hover:bg-brand-accent hover:text-brand-dark active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Confirmação
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-6 animate-fade-in">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-sage/40 flex items-center justify-center text-brand-dark">
                  <CheckCircle className="w-8 h-8 text-brand-dark" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-3xl text-brand-dark mb-2">Confirmado!</h3>
                <p className="font-sans text-base text-brand-dark/85 max-w-sm mx-auto leading-relaxed">
                  {formData.attending === 'yes'
                    ? 'Sua presença foi confirmada! Mal podemos esperar para celebrar esse noivado com você. ❤️'
                    : 'Obrigado por nos avisar. Sentiremos muito a sua falta nessa comemoração tão especial! ❤️'}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ name: '', email: '', phone: '', attending: 'yes' });
                }}
                className="text-xs font-semibold text-brand-accent uppercase tracking-widest hover:underline hover:text-brand-dark transition-colors duration-300"
              >
                Confirmar outro convidado
              </button>
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
};

export default ConfirmForm;
