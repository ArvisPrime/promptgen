import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localStorageService } from '@/lib/utils/local-storage';

/**
 * Represents a saved prompt in history.
 */
export interface HistoryItem {
  id: string;
  timestamp: string;
  rawInput: string;
  refinedPrompt: string;
  templateId: string;
}

interface HistoryState {
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

/**
 * Zustand store for prompt history, persisted to localStorage.
 */
export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: localStorageService.getItem('promptHistory', []),
      addToHistory: ({ rawInput, refinedPrompt, templateId }) => {
        const newItem: HistoryItem = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          rawInput,
          refinedPrompt,
          templateId
        };
        const updated = [newItem, ...get().history];
        localStorageService.setItem('promptHistory', updated);
        set({ history: updated });
      },
      clearHistory: () => {
        localStorageService.removeItem('promptHistory');
        set({ history: [] });
      }
    }),
    { name: 'prompt-history' }
  )
);