import React, { useState } from 'react';
import { Search, ArrowLeft, Heart } from 'lucide-react';
import { rsvpService } from '../../api/rsvp.service';
import type { Rsvp } from '../../types';
import Reveal from '../atoms/Reveal';

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

interface RsvpLookupFormProps {
  onSuccess: (rsvp: Rsvp) => void;
  onGoHome: () => void;
}

export const RsvpLookupForm: React.FC<RsvpLookupFormProps> = ({ onSuccess, onGoHome }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await rsvpService.lookupRsvp(email, phone);
      if (response.status === 'success') {
        onSuccess(response.data);
      }
    } catch (error: unknown) {
      console.error('Failed to lookup RSVP:', error);
      const msg = error instanceof Error ? error.message : 'Não encontramos sua confirmação. Verifique os dados inseridos.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 md:py-16">
      <Reveal>
        <div className="bg-white border border-brand-blush/30 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgba(61,44,37,0.04)] relative overflow-hidden">
          
          {/* Decorative Top Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-blush via-brand-sage to-brand-accent" />

          {/* Heading */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-brand-blush/20 flex items-center justify-center text-brand-accent">
                <Heart className="w-5 h-5 fill-current" />
              </div>
            </div>
            <h2 className="font-serif text-3xl italic text-brand-dark mb-2">
              Acesso ao Bolão
            </h2>
            <p className="font-sans text-xs text-brand-dark/60 leading-relaxed max-w-xs mx-auto">
              Para palpitar e ver os votos dos convidados, precisamos validar sua confirmação de presença.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50/80 border border-red-100 text-red-700 text-xs font-sans rounded-xl animate-fade-in text-center leading-relaxed">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="lookup-email" className="font-sans text-xs font-semibold text-brand-dark/80 uppercase tracking-wider block">
                E-mail *
              </label>
              <input
                id="lookup-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-accent transition-colors duration-300 bg-brand-bg/20 text-brand-dark"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="lookup-phone" className="font-sans text-xs font-semibold text-brand-dark/80 uppercase tracking-wider block">
                Telefone *
              </label>
              <input
                id="lookup-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="(00) 9 0000-0000"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-sans text-sm focus:outline-none focus:border-brand-accent transition-colors duration-300 bg-brand-bg/20 text-brand-dark"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-brand-dark text-brand-bg font-sans font-medium text-sm py-4 rounded-xl shadow-md hover:bg-brand-accent hover:text-brand-dark active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-brand-bg border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Verificar Confirmação
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-blush/20"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-brand-dark/40 font-sans">
              <span className="bg-white px-3">ou</span>
            </div>
          </div>

          {/* Go Back button */}
          <button
            onClick={onGoHome}
            className="w-full py-3.5 border border-brand-dark/35 rounded-xl font-sans font-medium text-xs text-brand-dark/80 hover:bg-brand-dark/5 hover:border-brand-dark transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Ainda não confirmei presença
          </button>

        </div>
      </Reveal>
    </div>
  );
};

export default RsvpLookupForm;
