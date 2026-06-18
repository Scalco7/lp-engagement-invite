import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  // Load pool questions only if the user has access
  useEffect(() => {
    if (localRsvp && localRsvp.willGo) {
      setIsLoadingQuestions(true);
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
    }
  }, [localRsvp]);

  const handleLookupSuccess = (rsvp: Rsvp) => {
    rsvpStorage.save(rsvp.id, rsvp.will_go);
    setLocalRsvp({ id: rsvp.id, willGo: rsvp.will_go });
  };

  const handleResetSession = () => {
    rsvpStorage.clear();
    setLocalRsvp(null);
    setQuestions([]);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  // GATE 1: User has not RSVP'd at all (no data in localStorage)
  if (!localRsvp) {
    return <RsvpLookupForm onSuccess={handleLookupSuccess} onGoHome={handleGoHome} />;
  }

  // GATE 2: User RSVP'd but is NOT attending (willGo === false)
  if (!localRsvp.willGo) {
    return <AccessDeniedMessage onGoHome={handleGoHome} />;
  }

  // GATE 3: User RSVP'd and IS attending (willGo === true) - Authorized access
  return (
    <BetQuestionsList
      questions={questions}
      isLoading={isLoadingQuestions}
      onResetSession={handleResetSession}
    />
  );
}
