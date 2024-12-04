import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CountersState {
  counters: Record<string, number>;
  setCounter: (cardId: string, value: number) => void;
  resetCounters: () => void;
}

export const useCountersStore = create<CountersState>()(
  persist(
    (set) => ({
      counters: {},
      setCounter: (cardId, value) => set((state) => ({
        counters: { ...state.counters, [cardId]: Math.max(0, value) }
      })),
      resetCounters: () => set({ counters: {} })
    }),
    {
      name: 'mtg-counters-storage'
    }
  )
);