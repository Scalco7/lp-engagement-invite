import React from 'react';
import type { QuestionWithOdds } from '../../types';

interface BetQuestionCardProps {
  question: QuestionWithOdds;
}

export const BetQuestionCard: React.FC<BetQuestionCardProps> = ({ question }) => {
  return (
    <div style={{ padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '8px' }}>
      <h3>{question.title}</h3>
      <p style={{ color: '#888', fontSize: '0.875rem' }}>
        Tipo: {question.type} | Total de palpites: {question.totalVotes}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
        {question.options.map((option) => (
          <div key={option.value} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px solid #f9f9f9' }}>
            <span>{option.label}</span>
            <span style={{ fontWeight: 'bold' }}>Odd: {option.odd.toFixed(2)}x ({option.votes} votos)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetQuestionCard;
