import type {
  SuccessListResponse,
  Rsvp,
  RsvpInput,
  SuccessSingleResponse,
} from "../types";
import { apiClient } from "./api.client";

export const rsvpService = {
  /**
   * Retrieves the full list of all registered RSVPs.
   */
  async listRsvps(): Promise<SuccessListResponse<Rsvp>> {
    return apiClient.get<SuccessListResponse<Rsvp>>("/api/rsvp");
  },

  /**
   * Saves a guest's RSVP response (confirming presence or not).
   */
  async createRsvp(data: RsvpInput): Promise<SuccessSingleResponse<Rsvp>> {
    return apiClient.post<SuccessSingleResponse<Rsvp>>("/api/rsvp", data);
  },

  /**
   * Looks up a guest's RSVP response using their email and phone number.
   */
  async lookupRsvp(
    email: string,
    phone_number: string,
  ): Promise<SuccessSingleResponse<Rsvp>> {
    return apiClient.post<SuccessSingleResponse<Rsvp>>("/api/rsvp/lookup", {
      email,
      phone_number,
    });
  },
};
