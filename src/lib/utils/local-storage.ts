/**
 * Service for interacting with browser localStorage in a type-safe manner.
 */
export type StorageKey = 'promptHistory' | 'userSettings' | 'customTemplates';

export const localStorageService = {
  setItem: <T>(key: StorageKey, value: T): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  },

  getItem: <T>(key: StorageKey, defaultValue: T): T => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    }
    return defaultValue;
  },

  removeItem: (key: StorageKey): void => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  }
};