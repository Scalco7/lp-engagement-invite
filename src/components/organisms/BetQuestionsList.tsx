import React from 'react';
import { Loader2, Info } from 'lucide-react';
import BetQuestionCard from '../molecules/BetQuestionCard';
import Footer from './Footer';
import type { QuestionWithOdds } from '../../types';
import type { LocalRsvp } from '../../services/rsvpStorage';
import Reveal from '../atoms/Reveal';

interface BetQuestionsListProps {
  questions: QuestionWithOdds[];
  placedBets: Record<string, string>;
  isLoading: boolean;
  localRsvp: LocalRsvp;
  onBetPlaced: (questionId: string, value: string) => void;
}

export const BetQuestionsList: React.FC<BetQuestionsListProps> = ({
  questions,
  placedBets,
  isLoading,
  localRsvp,
  onBetPlaced
}) => {
  const engagementDate = new Date('2026-07-25T19:00:00');

  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="max-w-4xl w-full mx-auto px-4 py-8 md:py-12 grow">
        <Reveal>
          <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
            <h1 className="font-serif text-4xl md:text-5xl italic text-brand-dark mb-4">
              Palpites do casamento
            </h1>
            <p className="font-sans text-xs sm:text-sm text-brand-dark/70 leading-relaxed">
              Deixe suas previsões e divirta-se! As odds são recalculadas em tempo real conforme os convidados realizam seus palpites.
            </p>
          </div>
        </Reveal>

        {isLoading && questions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-brand-accent space-y-4">
            <Loader2 className="w-8 h-8 animate-spin" />
            <p className="font-sans text-xs tracking-wider uppercase text-brand-dark/60">
              Carregando as perguntas do bolão...
            </p>
          </div>
        ) : (
          <div>
            {/* Info notice about rules */}
            <Reveal delay={1}>
              <div className="bg-brand-sage/20 border border-brand-sage/40 rounded-2xl p-4 flex items-start gap-3 mb-8 max-w-2xl mx-auto">
                <Info className="w-5 h-5 text-brand-dark/65 shrink-0 mt-0.5" />
                <div className="font-sans text-xs text-brand-dark/80 leading-relaxed">
                  <span className="font-semibold block mb-0.5 text-brand-dark">Como funciona o bolão?</span>
                  Você só pode palpitar uma vez em cada pergunta. Após confirmar, seu palpite é registrado e as estatísticas do evento atualizam na hora!
                </div>
              </div>
            </Reveal>

            {/* Questions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {questions.map((question, index) => (
                <Reveal key={question.id} delay={(index % 3 + 1) as 1 | 2 | 3}>
                  <BetQuestionCard
                    question={question}
                    currentBet={placedBets[question.id]}
                    guestRsvpId={localRsvp.id}
                    onBetPlaced={(value) => onBetPlaced(question.id, value)}
                  />
                </Reveal>
              ))}
            </div>

            {questions.length === 0 && (
              <div className="text-center py-16 bg-white border border-brand-blush/20 rounded-3xl max-w-xl mx-auto shadow-sm">
                <p className="font-sans text-sm text-brand-dark/60">
                  Nenhuma pergunta cadastrada no bolão no momento. Volte mais tarde! 😊
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Styled Footer */}
      <Footer engagementDate={engagementDate} />
    </div>
  );
};

export default BetQuestionsList;
