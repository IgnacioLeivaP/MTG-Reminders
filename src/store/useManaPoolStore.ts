import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ManaCount {
  white: number;
  blue: number;
  black: number;
  red: number;
  green: number;
  colorless: number;
}

interface ManaPoolStore {
  manaPool: ManaCount;
  setMana: (color: keyof ManaCount, amount: number) => void;
  resetManaPool: () => void;
}

export const useManaPoolStore = create<ManaPoolStore>()(
  persist(
    (set) => ({
      manaPool: {
        white: 0,
        blue: 0,
        black: 0,
        red: 0,
        green: 0,
        colorless: 0
      },
      setMana: (color, amount) => set((state) => ({
        manaPool: {
          ...state.manaPool,
          [color]: Math.max(0, amount)
        }
      })),
      resetManaPool: () => set({
        manaPool: {
          white: 0,
          blue: 0,
          black: 0,
          red: 0,
          green: 0,
          colorless: 0
        }
      })
    }),
    {
      name: 'mana-pool-storage'
    }
  )
); 