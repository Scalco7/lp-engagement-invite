import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { betsService } from '../api/bets.service';
import { rsvpStorage, type LocalRsvp } from '../services/rsvpStorage';
import type { QuestionWithOdds, Rsvp } from '../types';
import RsvpLookupForm from '../components/organisms/RsvpLookupForm';
import AccessDeniedMessage from '../components/molecules/AccessDeniedMessage';
import BetQuestionsList from '../components/organisms/BetQuestionsList';

export default function BetPage() {
  const navigate = useNavigate();
  const [localRsvp, setLocalRsvp] = useState<LocalRsvp | null>(() => rsvpStorage.get());
  const [questions, setQuestions] = useState<QuestionWithOdds[]>([]);
  const [placedBets, setPlacedBets] = useState<Record<string, string>>({});
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isLoadingBets, setIsLoadingBets] = useState(false);

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load pool questions and guest's bets only if authorized
  useEffect(() => {
    if (localRsvp && localRsvp.willGo) {
      setIsLoadingQuestions(true);
      setIsLoadingBets(true);

      // Load questions
      betsService.listQuestions()
        .then((response) => {
          if (response.status === 'success') {
            setQuestions(response.data);
          }
        })
        .catch((error) => {
          console.error('Failed to load questions:', error);
        })
        .finally(() => {
          setIsLoadingQuestions(false);
        });

      // Load bets placed by this guest (API)
      betsService.listBetsForGuest(localRsvp.id)
        .then((response) => {
          if (response.status === 'success') {
            const betsMap: Record<string, string> = {};
            response.data.forEach((bet) => {
              betsMap[bet.questionId] = bet.value;
            });
            setPlacedBets(betsMap);
          }
        })
        .catch((error) => {
          console.error('Falha ao recuperar palpites anteriores:', error);
          setPlacedBets({});
        })
        .finally(() => {
          setIsLoadingBets(false);
        });
    }
  }, [localRsvp]);

  const handleLookupSuccess = (rsvp: Rsvp) => {
    rsvpStorage.save(rsvp.id, rsvp.will_go, rsvp.name);
    setLocalRsvp({ id: rsvp.id, willGo: rsvp.will_go, name: rsvp.name });
  };


  const handleGoHome = () => {
    navigate('/engagement-invite');
  };

  const handleBetPlaced = (questionId: string, value: string) => {
    setPlacedBets((prev) => {
      const updated = { ...prev, [questionId]: value };
      return updated;
    });

    // Refresh questions to show updated odds and vote percentages
    betsService.listQuestions()
      .then((response) => {
        if (response.status === 'success') {
          setQuestions(response.data);
        }
      })
      .catch((error) => {
        console.error('Failed to refresh questions after placement:', error);
      });
  };

  // Determine central content based on Gating
  const renderContent = () => {
    if (!localRsvp) {
      return <RsvpLookupForm onSuccess={handleLookupSuccess} onGoHome={handleGoHome} />;
    }

    if (!localRsvp.willGo) {
      return <AccessDeniedMessage onGoHome={handleGoHome} />;
    }

    return (
      <BetQuestionsList
        questions={questions}
        placedBets={placedBets}
        isLoading={isLoadingQuestions || isLoadingBets}
        localRsvp={localRsvp}
        onBetPlaced={handleBetPlaced}
      />
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark selection:bg-brand-blush/40 relative flex flex-col justify-between">

      {/* Delicate floating background ornaments (matching LandingPage) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
        <div className="absolute top-1/4 left-10 animate-float-slow text-brand-blush">
          <Heart className="w-8 h-8 fill-current" />
        </div>
        <div className="absolute top-2/3 right-10 animate-float-slower text-brand-accent">
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <svg className="absolute -top-20 -right-20 w-80 h-80 text-brand-blush/30" viewBox="0 0 100 100" fill="currentColor">
          <path d="M10,90 Q30,60 50,80 T90,60 Q80,40 50,50 T10,90 Z" />
        </svg>
        <svg className="absolute -bottom-20 -left-20 w-80 h-80 text-brand-sage/40" viewBox="0 0 100 100" fill="currentColor">
          <path d="M90,10 Q70,40 50,20 T10,40 Q20,60 50,50 T90,10 Z" />
        </svg>
      </div>

      {/* Navigation Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl z-50">
        <div className="bg-brand-bg/90 backdrop-blur-md border border-brand-accent/20 rounded-full shadow-[0_8px_30px_rgba(61,44,37,0.08)] px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer" onClick={handleGoHome}>
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-brand-dark">J & F</span>
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-accent fill-brand-accent animate-pulse" />
          </div>
          <button
            onClick={handleGoHome}
            className="px-4 sm:px-5 py-2 bg-brand-dark text-white rounded-full hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-widest flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3 sm:hidden" />
            <span className="hidden sm:inline">Voltar ao Convite</span>
            <span className="sm:hidden">Voltar</span>
          </button>
        </div>
      </header>

      {/* Main Content Gated Area */}
      <main className="relative z-10 grow pt-24 flex flex-col justify-center">
        {renderContent()}
      </main>

    </div>
  );
}
