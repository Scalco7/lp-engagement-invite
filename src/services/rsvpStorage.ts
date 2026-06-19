export interface LocalRsvp {
  id: string;
  willGo: boolean;
  name?: string;
}

const RSVP_STORAGE_KEY = 'lp_engagement_rsvp_data';

export const rsvpStorage = {
  /**
   * Saves the registered RSVP details to LocalStorage.
   */
  save(id: string, willGo: boolean, name?: string): void {
    try {
      const data: LocalRsvp = { id, willGo, name };
      localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save RSVP to localStorage:', error);
    }
  },

  /**
   * Retrieves the saved RSVP details from LocalStorage.
   */
  get(): LocalRsvp | null {
    try {
      const stored = localStorage.getItem(RSVP_STORAGE_KEY);
      if (!stored) return null;
      return JSON.parse(stored) as LocalRsvp;
    } catch (error) {
      console.error('Failed to retrieve RSVP from localStorage:', error);
      return null;
    }
  },

  /**
   * Removes the RSVP details from LocalStorage.
   */
  clear(): void {
    try {
      localStorage.removeItem(RSVP_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear RSVP from localStorage:', error);
    }
  },

  /**
   * Checks if an RSVP has already been saved to LocalStorage.
   */
  hasSaved(): boolean {
    return this.get() !== null;
  }
};
