import { apiClient } from "./api.client";
import type {
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

  /**
   * Retrieves the list of all bets placed by a specific guest.
   */
  async listBetsForGuest(
    rsvpId: string,
  ): Promise<SuccessListResponse<GuestBet>> {
    return apiClient.get<SuccessListResponse<GuestBet>>(
      `/api/bets/rsvp/${rsvpId}`,
    );
  },
};
