import React from 'react';
import BetQuestionCard from '../molecules/BetQuestionCard';
import type { QuestionWithOdds } from '../../types';

interface BetQuestionsListProps {
  questions: QuestionWithOdds[];
  isLoading: boolean;
  onResetSession: () => void;
}

export const BetQuestionsList: React.FC<BetQuestionsListProps> = ({ questions, isLoading, onResetSession }) => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Bolão do Noivado 🎲</h1>
      <p>Bem-vindo ao nosso bolão! Deixe seus palpites para as perguntas abaixo.</p>

      {isLoading ? (
        <p>Carregando as perguntas do bolão...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
          {questions.map((question) => (
            <BetQuestionCard key={question.id} question={question} />
          ))}
          {questions.length === 0 && <p>Nenhuma pergunta cadastrada no bolão no momento.</p>}
        </div>
      )}

      <button
        onClick={onResetSession}
        style={{
          marginTop: '3rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#d9534f',
          color: '#FFF',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Limpar Confirmação do Dispositivo
      </button>
    </div>
  );
};

export default BetQuestionsList;
