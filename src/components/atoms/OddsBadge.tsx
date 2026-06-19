import React from 'react';
import { Flame } from 'lucide-react';

interface OddsBadgeProps {
  odd: number;
  isFavorite?: boolean;
  isZebra?: boolean;
}

export const OddsBadge: React.FC<OddsBadgeProps> = ({ odd, isFavorite, isZebra }) => {
  if (isFavorite) {
    return (
      <span className="text-[10px] font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
        <Flame className="w-3.5 h-3.5 fill-white stroke-[2px]" />
        {odd.toFixed(2)}x
      </span>
    );
  }

  if (isZebra) {
    return (
      <span className="text-[10px] font-bold text-brand-dark/80 bg-brand-bg border border-brand-accent/15 px-2 py-0.5 rounded-md flex items-center gap-1">
        <span className="text-xs">🦓</span>
        {odd.toFixed(2)}x
      </span>
    );
  }

  return (
    <span className="text-[10px] font-bold text-brand-dark/80 bg-brand-bg border border-brand-accent/15 px-2 py-0.5 rounded-md">
      {odd.toFixed(2)}x
    </span>
  );
};

export default OddsBadge;
