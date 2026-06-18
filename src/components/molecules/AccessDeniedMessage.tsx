import React from 'react';

interface AccessDeniedMessageProps {
  onGoHome: () => void;
}

export const AccessDeniedMessage: React.FC<AccessDeniedMessageProps> = ({ onGoHome }) => {
  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '4rem auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2>Acesso Restrito</h2>
      <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.5' }}>
        Você informou na confirmação de presença que infelizmente não poderá comparecer ao evento. 
        O bolão é exclusivo para os convidados confirmados. Sentiremos sua falta! ❤️
      </p>
      <button
        onClick={onGoHome}
        style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3D2C25',
          color: '#FFF',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Voltar para a Página Inicial
      </button>
    </div>
  );
};

export default AccessDeniedMessage;
