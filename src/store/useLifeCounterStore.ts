import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Player {
  id: number;
  name: string;
  life: number;
}

interface LifeCounterState {
  players: Player[];
  updateLife: (playerId: number, amount: number) => void;
  resetLife: () => void;
  setGameMode: (mode: string, numPlayers: number, startingLife: number) => void;
}

const DEFAULT_PLAYERS: Player[] = [
  { id: 1, name: 'Player 1', life: 20 },
  { id: 2, name: 'Player 2', life: 20 }
];

export const useLifeCounterStore = create<LifeCounterState>()(
  persist(
    (set) => ({
      players: DEFAULT_PLAYERS,
      updateLife: (playerId, amount) => set((state) => ({
        players: state.players.map(player =>
          player.id === playerId
            ? { ...player, life: player.life + amount }
            : player
        )
      })),
      resetLife: () => set({ players: DEFAULT_PLAYERS }),
      setGameMode: (mode, numPlayers, startingLife) => set(() => ({
        players: Array.from({ length: numPlayers }, (_, i) => ({
          id: i + 1,
          name: `Player ${i + 1}`,
          life: startingLife
        }))
      }))
    }),
    {
      name: 'mtg-life-storage'
    }
  )
);