import React from 'react';
import { Circle } from 'lucide-react';

interface CustomBetInputProps {
  questionType: string;
  currentBet: string | undefined;
  isCustomSelected: boolean;
  customText: string;
  onSelectCustom: () => void;
  onCustomTextChange: (text: string) => void;
}

export const CustomBetInput: React.FC<CustomBetInputProps> = ({
  questionType,
  currentBet,
  isCustomSelected,
  customText,
  onSelectCustom,
  onCustomTextChange,
}) => {
  if (currentBet || (questionType !== 'TEXT' && questionType !== 'NUMBER')) {
    return null;
  }

  return (
    <div>
      <div
        onClick={onSelectCustom}
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
            type={questionType === 'NUMBER' ? 'number' : 'text'}
            value={customText}
            onChange={(e) => onCustomTextChange(e.target.value)}
            placeholder={
              questionType === 'NUMBER'
                ? 'Digite o seu número palpite...'
                : 'Digite a sua resposta...'
            }
            className="w-full px-4 py-3 border border-neutral-200 rounded-xl font-sans text-xs focus:outline-none focus:border-brand-accent transition-colors duration-300 bg-brand-bg/25 text-brand-dark"
          />
        </div>
      )}
    </div>
  );
};

export default CustomBetInput;
