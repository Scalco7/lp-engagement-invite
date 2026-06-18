import React, { useState } from 'react';
import { rsvpService } from '../../api/rsvp.service';
import type { Rsvp } from '../../types';

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
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Acesso ao Bolão</h2>
      <p>Para participar do bolão, precisamos validar sua confirmação de presença.</p>
      
      {errorMessage && (
        <div style={{ color: '#d9534f', padding: '0.5rem 0', marginBottom: '1rem', fontWeight: 'bold' }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="lookup-email">E-mail *</label>
          <input
            id="lookup-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu.email@exemplo.com"
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label htmlFor="lookup-phone">Telefone *</label>
          <input
            id="lookup-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder="(00) 9 0000-0000"
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: '0.75rem',
            backgroundColor: '#3D2C25',
            color: '#FFF',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isSubmitting ? 'Buscando...' : 'Verificar Confirmação'}
        </button>
      </form>

      <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #eee' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button
          onClick={onGoHome}
          style={{
            padding: '0.75rem',
            backgroundColor: 'transparent',
            color: '#3D2C25',
            border: '1px solid #3D2C25',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Ainda não confirmei presença (Ir para a Página Inicial)
        </button>
      </div>
    </div>
  );
};

export default RsvpLookupForm;
