import React, { useState } from 'react';
import { Check, Circle, CheckCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { betsService } from '../../api/bets.service';
import type { QuestionWithOdds } from '../../types';

interface BetQuestionCardProps {
  question: QuestionWithOdds;
  currentBet: string | undefined;
  guestRsvpId: string;
  onBetPlaced: (value: string) => void;
}

export const BetQuestionCard: React.FC<BetQuestionCardProps> = ({
  question,
  currentBet,
  guestRsvpId,
  onBetPlaced,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAllOptions, setShowAllOptions] = useState(false);

  const hasMatchingOption = question.options.some((opt) => opt.value === currentBet);

  // Build the list of options to render
  const optionsToRender = [...question.options];
  if (currentBet && !hasMatchingOption) {
    // If user bet on a custom value not in the list, virtually append it
    optionsToRender.push({
      value: currentBet,
      label: currentBet,
      votes: 1,
      odd: 1,
    });
  }

  // Sort by odd ascending (lowest odds first = favorites)
  const sortedOptions = [...optionsToRender].sort((a, b) => a.odd - b.odd);

  // Determine pagination/collapsing
  const totalOptionsCount = sortedOptions.length;
  const isCollapsible = totalOptionsCount > 8;

  // Slices:
  const lowestOdds = isCollapsible ? sortedOptions.slice(0, 4) : sortedOptions;
  const highestOdds = isCollapsible ? sortedOptions.slice(-4) : [];

  // Make sure currentBet and selectedOption are always visible if set
  const visibleValues = new Set<string>();
  lowestOdds.forEach((o) => visibleValues.add(o.value));
  highestOdds.forEach((o) => visibleValues.add(o.value));
  if (currentBet) visibleValues.add(currentBet);
  if (selectedOption) visibleValues.add(selectedOption);

  // Hidden options count
  const hiddenCount = totalOptionsCount - visibleValues.size;

  // Options that are selected/bet on but are NOT in lowest/highest odds slices
  const activeUserChoices = sortedOptions.filter(
    (o) =>
      (o.value === currentBet || o.value === selectedOption) &&
      !lowestOdds.some((l) => l.value === o.value) &&
      !highestOdds.some((h) => h.value === o.value)
  );

  // Find matching option label to display instead of raw value/id
  const matchedOption = optionsToRender.find((opt) => opt.value === currentBet);
  const displayBetLabel = matchedOption ? matchedOption.label : currentBet;

  // Calculate percentages
  const totalVotes = question.totalVotes || 0;

  const handleSelectOption = (value: string) => {
    if (currentBet) return; // Read-only if already bet
    setSelectedOption(value);
    setIsCustomSelected(false);
    setErrorMessage(null);
  };

  const handleSelectCustom = () => {
    if (currentBet) return;
    setSelectedOption(null);
    setIsCustomSelected(true);
    setErrorMessage(null);
  };

  const handlePlaceBet = async () => {
    if (currentBet) return;

    let finalValue = '';
    if (isCustomSelected) {
      if (!customText.trim()) {
        setErrorMessage('Por favor, digite o seu palpite.');
        return;
      }
      finalValue = customText.trim();
    } else {
      if (!selectedOption) {
        setErrorMessage('Por favor, selecione uma opção.');
        return;
      }
      finalValue = selectedOption;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await betsService.placeBet({
        rsvpId: guestRsvpId,
        questionId: question.id,
        value: finalValue,
      });

      if (response.status === 'success') {
        // Confetti explosion with wedding/brand colors
        confetti({
          particleCount: 80,
          spread: 50,
          origin: { y: 0.8 },
          colors: ['#E2C2B9', '#D4E2D4', '#C79C93', '#3D2C25'],
        });

        // Trigger callback to refresh questions list and state
        onBetPlaced(finalValue);
      }
    } catch (err: unknown) {
      console.error('Error placing bet:', err);
      const msg = err instanceof Error ? err.message : 'Falha ao registrar seu palpite. Tente novamente.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Humanize question type
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'GUEST_SELECT':
        return 'Escolha Única';
      case 'NUMBER':
        return 'Número';
      case 'TEXT':
        return 'Texto Livre';
      default:
        return 'Palpite';
    }
  };

  const renderOptionRow = (option: typeof question.options[0]) => {
    const votesCount = option.votes || 0;
    const percentage = totalVotes > 0 ? (votesCount / totalVotes) * 100 : 0;
    const isVotedChoice = currentBet === option.value;
    const isSelectedChoice = selectedOption === option.value;

    return (
      <div
        key={option.value}
        onClick={() => handleSelectOption(option.value)}
        className={`relative overflow-hidden border rounded-xl p-3.5 flex justify-between items-center transition-all duration-300 group select-none ${
          currentBet
            ? isVotedChoice
              ? 'border-brand-sage bg-brand-sage/5 shadow-sm'
              : 'border-neutral-100 opacity-60'
            : isSelectedChoice
            ? 'border-brand-accent bg-brand-blush/10 scale-[1.01] shadow-sm'
            : 'border-neutral-200/70 hover:border-brand-blush hover:bg-brand-bg/30 cursor-pointer'
        }`}
      >
        {/* Visual Progress Bar */}
        {totalVotes > 0 && (
          <div
            className="absolute inset-y-0 left-0 bg-brand-sage/10 transition-all duration-1000 ease-out z-0"
            style={{ width: `${percentage}%` }}
          />
        )}

        {/* Left Side: Radio / Check and Option Label */}
        <div className="flex items-center gap-2.5 relative z-10 max-w-[70%]">
          {currentBet ? (
            isVotedChoice ? (
              <div className="w-5 h-5 rounded-full bg-brand-sage flex items-center justify-center text-brand-dark/95 flex-shrink-0">
                <Check className="w-3 h-3 stroke-[3px]" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border border-neutral-300 flex-shrink-0" />
            )
          ) : isSelectedChoice ? (
            <div className="w-5 h-5 rounded-full border-2 border-brand-accent bg-brand-accent flex items-center justify-center text-white flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          ) : (
            <Circle className="w-5 h-5 text-neutral-300 group-hover:text-brand-accent/60 transition-colors flex-shrink-0" />
          )}
          <span className="font-sans text-xs font-semibold text-brand-dark/95 truncate">
            {option.label}
          </span>
        </div>

        {/* Right Side: Odds and votes */}
        <div className="flex flex-col items-end relative z-10 font-sans">
          <span className="text-[10px] font-bold text-brand-dark/80 bg-brand-bg border border-brand-accent/15 px-2 py-0.5 rounded-md">
            {option.odd.toFixed(2)}x
          </span>
          {totalVotes > 0 && (
            <span className="text-[9px] text-brand-dark/50 mt-1 font-medium">
              {percentage.toFixed(0)}% ({votesCount} {votesCount === 1 ? 'voto' : 'votos'})
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white border border-brand-accent/20 rounded-3xl p-6 shadow-sm hover:shadow-[0_12px_40px_rgba(61,44,37,0.06)] hover:border-brand-accent/30 transition-all duration-300 flex flex-col justify-between min-h-[340px]">
      
      {/* Top Meta Info */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="font-sans text-[9px] uppercase tracking-widest text-brand-dark/50 bg-brand-bg px-2.5 py-1 rounded-full border border-brand-accent/10">
            {getTypeLabel(question.type)}
          </span>
          {currentBet ? (
            <span className="font-sans text-[9px] font-semibold uppercase tracking-wider text-brand-sage bg-brand-sage/20 border border-brand-sage/55 px-2.5 py-1 rounded-full flex items-center gap-1 animate-fade-in">
              <Check className="w-2.5 h-2.5 stroke-[3px]" />
              Palpitado
            </span>
          ) : (
            <span className="font-sans text-[9px] font-medium uppercase tracking-wider text-brand-accent bg-brand-blush/10 border border-brand-blush/35 px-2.5 py-1 rounded-full animate-pulse">
              Aberto
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg md:text-xl font-medium text-brand-dark mb-5 leading-snug">
          {question.title}
        </h3>

        {/* Options List */}
        <div className="space-y-3">
          {(!isCollapsible || showAllOptions) ? (
            // Expanded List: Scrollable container to maintain height
            <div className={isCollapsible ? "max-h-[260px] overflow-y-auto pr-1.5 space-y-3 scrollbar-thin scrollbar-thumb-brand-accent/25 scrollbar-track-transparent" : "space-y-3"}>
              {sortedOptions.map(renderOptionRow)}
            </div>
          ) : (
            // Collapsed List: 4 lowest odds, button, 4 highest odds
            <div className="space-y-3.5">
              {/* Render active user choices first if any */}
              {activeUserChoices.length > 0 && (
                <div className="space-y-2 animate-fade-in">
                  <div className="text-[8px] font-bold uppercase tracking-widest text-brand-dark/40 mb-1">
                    Seu Palpite / Selecionado
                  </div>
                  {activeUserChoices.map(renderOptionRow)}
                </div>
              )}

              {/* Render favorites (lowest odds) */}
              <div className="space-y-2">
                <div className="text-[8px] font-bold uppercase tracking-widest text-brand-dark/40 mb-1">
                  Favoritos (Menores Odds)
                </div>
                <div className="space-y-2.5">
                  {lowestOdds.map(renderOptionRow)}
                </div>
              </div>

              {/* Expand Button Separator */}
              {hiddenCount > 0 && (
                <div className="py-1 flex justify-center animate-fade-in">
                  <button
                    type="button"
                    onClick={() => setShowAllOptions(true)}
                    className="px-4 py-2 border border-brand-accent/20 rounded-xl bg-brand-bg/50 hover:bg-brand-blush/20 hover:border-brand-accent text-brand-dark/80 transition-all duration-300 font-sans text-[9px] font-bold uppercase tracking-wider cursor-pointer shadow-sm hover:shadow"
                  >
                    + Ver outros {hiddenCount} palpites
                  </button>
                </div>
              )}

              {/* Render zebras (highest odds) */}
              <div className="space-y-2">
                <div className="text-[8px] font-bold uppercase tracking-widest text-brand-dark/40 mb-1">
                  Zebras (Maiores Odds)
                </div>
                <div className="space-y-2.5">
                  {highestOdds.map(renderOptionRow)}
                </div>
              </div>
            </div>
          )}

          {/* Show "Collapse options" link at the bottom of expanded list */}
          {isCollapsible && showAllOptions && (
            <button
              type="button"
              onClick={() => setShowAllOptions(false)}
              className="w-full text-center text-[9px] font-bold text-brand-accent hover:text-brand-dark uppercase tracking-widest py-1.5 transition-colors cursor-pointer"
            >
              Recolher palpites
            </button>
          )}

          {/* Custom Input Option for TEXT / NUMBER */}
          {!currentBet && (question.type === 'TEXT' || question.type === 'NUMBER') && (
            <div>
              <div
                onClick={handleSelectCustom}
                className={`border rounded-xl p-3.5 flex justify-between items-center transition-all duration-300 select-none ${
                  isCustomSelected
                    ? 'border-brand-accent bg-brand-blush/10 scale-[1.01] shadow-sm'
                    : 'border-dashed border-neutral-300 hover:border-brand-blush hover:bg-brand-bg/30 cursor-pointer text-brand-dark/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isCustomSelected ? (
                    <div className="w-5 h-5 rounded-full border-2 border-brand-accent bg-brand-accent flex items-center justify-center text-white flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-neutral-300 flex-shrink-0" />
                  )}
                  <span className="font-sans text-xs font-semibold">
                    Digitar outro palpite...
                  </span>
                </div>
              </div>

              {/* Collapsible custom input field */}
              {isCustomSelected && (
                <div className="mt-2.5 animate-fade-in">
                  <input
                    type={question.type === 'NUMBER' ? 'number' : 'text'}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder={
                      question.type === 'NUMBER'
                        ? 'Digite o seu número palpite...'
                        : 'Digite a sua resposta...'
                    }
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-sans text-xs focus:outline-none focus:border-brand-accent transition-colors duration-300 bg-brand-bg/25 text-brand-dark"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Error and Confirm Action Button */}
      <div className="mt-6">
        {errorMessage && (
          <div className="mb-3.5 p-3 bg-red-50 border border-red-100 text-red-700 text-[11px] font-sans rounded-xl animate-fade-in text-center">
            {errorMessage}
          </div>
        )}

        {!currentBet && (selectedOption || isCustomSelected) ? (
          <button
            onClick={handlePlaceBet}
            disabled={isSubmitting}
            className="w-full bg-brand-dark text-brand-bg font-sans font-semibold text-xs py-3.5 rounded-xl hover:bg-brand-accent hover:text-brand-dark active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer shadow-md hover:shadow-lg animate-scale-up"
          >
            {isSubmitting ? (
              <Loader2 className="w-4.5 h-4.5 animate-spin" />
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Confirmar Meu Palpite
              </>
            )}
          </button>
        ) : !currentBet ? (
          <p className="text-[10px] text-center text-brand-dark/45 font-sans tracking-wide mt-2">
            Selecione uma opção acima para palpitar
          </p>
        ) : (
          <div className="bg-brand-sage/10 border border-brand-sage/30 rounded-xl p-3 flex items-center justify-center gap-2">
            <span className="font-sans text-[11px] text-brand-dark/70">
              Seu palpite: <strong className="text-brand-dark font-bold">{displayBetLabel}</strong>
            </span>
          </div>
        )}
      </div>

    </div>
  );
};

export default BetQuestionCard;
