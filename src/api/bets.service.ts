import { apiClient } from "./api.client";
import type {
  BetQuestion,
  BetQuestionInput,
  GuestBet,
  PlaceBetInput,
  QuestionWithOdds,
  SuccessListResponse,
  SuccessSingleResponse,
} from "../types";

export const betsService = {
  /**
   * Retrieves the list of all bet questions along with real-time calculated odds.
   */
  async listQuestions(): Promise<SuccessListResponse<QuestionWithOdds>> {
    return apiClient.get<SuccessListResponse<QuestionWithOdds>>(
      "/api/bets/questions",
    );
  },

  /**
   * Creates a new prediction/bet question for the pool.
   */
  async createQuestion(
    data: BetQuestionInput,
  ): Promise<SuccessSingleResponse<BetQuestion>> {
    return apiClient.post<SuccessSingleResponse<BetQuestion>>(
      "/api/bets/questions",
      data,
    );
  },

  /**
   * Submits a guest's bet/prediction for a specific pool question.
   */
  async placeBet(
    data: PlaceBetInput,
  ): Promise<SuccessSingleResponse<GuestBet>> {
    return apiClient.post<SuccessSingleResponse<GuestBet>>(
      "/api/bets/place",
      data,
    );
  },
};
