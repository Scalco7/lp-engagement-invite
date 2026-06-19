import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Heart, Send, CheckCircle } from 'lucide-react';
import Reveal from '../atoms/Reveal';
import { formatFullDate, getConfirmDeadline } from '../../utils/date';
import { rsvpStorage, type LocalRsvp } from '../../services/rsvpStorage';
import { rsvpService } from '../../api/rsvp.service';

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const cleanDigits = digits.slice(0, 11);

  if (cleanDigits.length <= 2) {
    return cleanDigits.length > 0 ? `(${cleanDigits}` : '';
  }
  if (cleanDigits.length <= 3) {
    return `(${cleanDigits.slice(0, 2)}) ${cleanDigits.slice(2)}`;
  }
  if (cleanDigits.length <= 7) {
    return `(${cleanDigits.slice(0, 2)}) ${cleanDigits.slice(2, 3)} ${cleanDigits.slice(3)}`;
  }
  return `(${cleanDigits.slice(0, 2)}) ${cleanDigits.slice(2, 3)} ${cleanDigits.slice(3, 7)}-${cleanDigits.slice(7)}`;
};

interface ConfirmFormProps {
  engagementDate: Date;
  onRsvpUpdated?: () => void;
}

export const ConfirmForm: React.FC<ConfirmFormProps> = ({ engagementDate, onRsvpUpdated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: 'yes', // 'yes' | 'no'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(() => rsvpStorage.hasSaved());
  const [localRsvp, setLocalRsvp] = useState<LocalRsvp | null>(() => rsvpStorage.get());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData((prev) => ({ ...prev, phone: formatPhone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectAttending = (value: 'yes' | 'no') => {
    setFormData((prev) => ({ ...prev, attending: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await rsvpService.createRsvp({
        name: formData.name,
        email: formData.email,
        phone_number: formData.phone,
        will_go: formData.attending === 'yes',
      });

      if (response.status === 'success') {
        const savedRsvp = response.data;
        rsvpStorage.save(savedRsvp.id, savedRsvp.will_go, savedRsvp.name);
        setLocalRsvp({ id: savedRsvp.id, willGo: savedRsvp.will_go, name: savedRsvp.name });
        setIsSuccess(true);

        if (savedRsvp.will_go) {
          // Trigger elegant confetti with brand colors
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#E2C2B9', '#D4E2D4', '#C79C93', '#FDFBF7', '#3D2C25']
          });
        }

        if (onRsvpUpdated) onRsvpUpdated();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro ao enviar sua confirmação. Por favor, tente novamente.';
      console.error('Failed to submit RSVP:', error);
      setErrorMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
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
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
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
                    placeholder="(00) 9 0000-0000"
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

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-sans rounded-xl animate-fade-in text-center">
                  {errorMessage}
                </div>
              )}

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
                <h3 className="font-serif text-3xl text-brand-dark mb-2">
                  {localRsvp ? 'Resposta Salva!' : 'Confirmado!'}
                </h3>
                <p className="font-sans text-base text-brand-dark/85 max-w-sm mx-auto leading-relaxed">
                  {(localRsvp ? localRsvp.willGo : formData.attending === 'yes')
                    ? 'Sua presença foi confirmada! Mal podemos esperar para celebrar esse noivado com você. ❤️'
                    : 'Obrigado por nos avisar. Sentiremos muito a sua falta nessa comemoração tão especial! ❤️'}
                </p>
              </div>

              {(localRsvp ? localRsvp.willGo : formData.attending === 'yes') && (
                <div className="pt-2 animate-scale-up">
                  <button
                    onClick={() => navigate('/engagement-invite/bet')}
                    className="w-full bg-brand-dark text-brand-bg font-sans font-medium text-sm py-4 rounded-xl shadow-md hover:bg-brand-accent hover:text-brand-dark active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
                  >
                    Dar Meus Palpites
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  rsvpStorage.clear();
                  setIsSuccess(false);
                  setLocalRsvp(null);
                  setErrorMessage(null);
                  setFormData({ name: '', email: '', phone: '', attending: 'yes' });
                  if (onRsvpUpdated) onRsvpUpdated();
                }}
                className="cursor-pointer text-xs font-semibold text-brand-accent uppercase tracking-widest hover:underline hover:text-brand-dark transition-colors duration-300"
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
