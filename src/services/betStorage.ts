const BETS_STORAGE_KEY = 'lp_engagement_placed_bets';

export const betStorage = {
  /**
   * Saves a bet locally.
   */
  save(questionId: string, value: string): void {
    try {
      const existing = this.getAll();
      existing[questionId] = value;
      localStorage.setItem(BETS_STORAGE_KEY, JSON.stringify(existing));
    } catch (error) {
      console.error('Failed to save bet to localStorage:', error);
    }
  },

  /**
   * Retrieves all saved bets from local storage.
   */
  getAll(): Record<string, string> {
    try {
      const stored = localStorage.getItem(BETS_STORAGE_KEY);
      return stored ? JSON.parse(stored) as Record<string, string> : {};
    } catch (error) {
      console.error('Failed to retrieve bets from localStorage:', error);
      return {};
    }
  },

  /**
   * Gets the saved bet for a single question.
   */
  get(questionId: string): string | undefined {
    return this.getAll()[questionId];
  },

  /**
   * Clears all saved bets from local storage.
   */
  clear(): void {
    try {
      localStorage.removeItem(BETS_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear bets from localStorage:', error);
    }
  }
};
