export type BetQuestionType = 'TEXT' | 'NUMBER' | 'GUEST_SELECT';

export interface BetQuestionInput {
  title: string;
  type: BetQuestionType;
  options?: string[];
}

export interface BetQuestion {
  id: string;
  title: string;
  type: BetQuestionType;
  options?: string[];
}

export interface PlaceBetInput {
  rsvpId: string;
  questionId: string;
  value: string;
}

export interface GuestBet {
  id: string;
  rsvpId: string;
  questionId: string;
  value: string;
}

export interface OptionWithOdd {
  value: string;
  label: string;
  votes: number;
  odd: number;
}

export interface QuestionWithOdds {
  id: string;
  title: string;
  type: BetQuestionType;
  totalVotes: number;
  options: OptionWithOdd[];
}
