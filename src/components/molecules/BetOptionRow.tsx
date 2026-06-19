import React from 'react';
import { Check, Circle } from 'lucide-react';
import OddsBadge from '../atoms/OddsBadge';

interface BetOptionRowProps {
  label: string;
  odd: number;
  votes?: number;
  totalVotes: number;
  percentage: number;
  isVotedChoice: boolean;
  isSelectedChoice: boolean;
  isFavorite: boolean;
  isZebra: boolean;
  currentBet: string | undefined;
  onClick: () => void;
}

export const BetOptionRow: React.FC<BetOptionRowProps> = ({
  label,
  odd,
  votes = 0,
  totalVotes,
  percentage,
  isVotedChoice,
  isSelectedChoice,
  isFavorite,
  isZebra,
  currentBet,
  onClick,
}) => {
  let borderBgClass = '';
  if (currentBet) {
    if (isVotedChoice) {
      borderBgClass = isFavorite
        ? 'border-orange-400 bg-red-50/10 shadow-sm'
        : 'border-brand-sage bg-brand-sage/5 shadow-sm';
    } else {
      borderBgClass = 'border-neutral-100 opacity-60';
    }
  } else if (isSelectedChoice) {
    borderBgClass = isFavorite
      ? 'border-orange-400 bg-red-50/10 scale-[1.01] shadow-sm'
      : 'border-brand-accent bg-brand-blush/10 scale-[1.01] shadow-sm';
  } else {
    if (isFavorite) {
      borderBgClass = 'border-orange-200 bg-orange-50/20 hover:border-orange-400 hover:bg-orange-50/40 hover:shadow-[0_0_15px_rgba(249,115,22,0.12)] cursor-pointer';
    } else if (isZebra) {
      borderBgClass = 'border-neutral-200/80 hover:border-neutral-400 cursor-pointer';
    } else {
      borderBgClass = 'border-neutral-200/70 hover:border-brand-blush hover:bg-brand-bg/30 cursor-pointer';
    }
  }

  const zebraStripesClass = isZebra ? 'bg-zebra-stripes' : '';

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden border rounded-xl p-3.5 flex justify-between items-center transition-all duration-300 group select-none ${borderBgClass} ${zebraStripesClass}`}
    >
      {/* Visual Progress Bar */}
      {totalVotes > 0 && (
        <div
          className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out z-0 ${isFavorite ? 'bg-orange-500/10' : 'bg-brand-sage/10'
            }`}
          style={{ width: `${percentage}%` }}
        />
      )}

      {/* Left Side: Radio / Check and Option Label */}
      <div className="flex items-center gap-2.5 relative z-10 max-w-[70%]">
        {currentBet ? (
          isVotedChoice ? (
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${isFavorite ? 'bg-orange-500 text-white' : 'bg-brand-sage text-brand-dark/95'
              }`}>
              <Check className="w-3 h-3 stroke-[3px]" />
            </div>
          ) : (
            <div className="w-5 h-5 rounded-full border border-neutral-300 flex-shrink-0" />
          )
        ) : isSelectedChoice ? (
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-white flex-shrink-0 ${isFavorite ? 'border-orange-500 bg-orange-500' : 'border-brand-accent bg-brand-accent'
            }`}>
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        ) : (
          <Circle className="w-5 h-5 text-neutral-300 group-hover:text-brand-accent/60 transition-colors flex-shrink-0" />
        )}
        <span className="font-sans text-xs font-semibold text-brand-dark/95 truncate">
          {label}
        </span>
      </div>

      {/* Right Side: Odds and votes */}
      <div className="flex flex-col items-end relative z-10 font-sans">
        <OddsBadge odd={odd} isFavorite={isFavorite} isZebra={isZebra} />
        {totalVotes > 0 && (
          <span className="text-[9px] text-brand-dark/50 mt-1 font-medium">
            {percentage.toFixed(0)}% ({votes} {votes === 1 ? 'voto' : 'votos'})
          </span>
        )}
      </div>
    </div>
  );
};

export default BetOptionRow;
