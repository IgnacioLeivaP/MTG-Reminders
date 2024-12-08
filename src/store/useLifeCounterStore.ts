import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Player {
  id: number;
  name: string;
  life: number;
  radiation: number;
  poison: number;
  isMonarch: boolean;
}

interface LifeCounterState {
  players: Player[];
  updateLife: (playerId: number, amount: number) => void;
  updateRadiation: (playerId: number, amount: number) => void;
  updatePoison: (playerId: number, amount: number) => void;
  toggleMonarch: (playerId: number) => void;
  setPlayerCount: (count: number) => void;
  resetPlayers: () => void;
}

const createDefaultPlayer = (id: number): Player => ({
  id,
  name: `Player ${id}`,
  life: 20,
  radiation: 0,
  poison: 0,
  isMonarch: false,
});

export const useLifeCounterStore = create<LifeCounterState>((set) => ({
  players: [createDefaultPlayer(1), createDefaultPlayer(2)],
  
  updateLife: (playerId, amount) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, life: p.life + amount } : p
      ),
    })),

  updateRadiation: (playerId, amount) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, radiation: Math.max(0, p.radiation + amount) } : p
      ),
    })),

  updatePoison: (playerId, amount) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, poison: Math.max(0, p.poison + amount) } : p
      ),
    })),

  toggleMonarch: (playerId) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, isMonarch: true } : { ...p, isMonarch: false }
      ),
    })),

  setPlayerCount: (count) =>
    set((state) => {
      const newPlayers: Player[] = [];
      for (let i = 1; i <= count; i++) {
        const existingPlayer = state.players.find(p => p.id === i);
        if (existingPlayer) {
          newPlayers.push(existingPlayer);
        } else {
          newPlayers.push(createDefaultPlayer(i));
        }
      }
      return { players: newPlayers };
    }),

  resetPlayers: () =>
    set((state) => ({
      players: state.players.map((p) => ({
        ...p,
        life: 20,
        radiation: 0,
        poison: 0,
        isMonarch: false,
      })),
    })),
}));