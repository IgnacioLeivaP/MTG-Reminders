import { create } from 'zustand';

interface Player {
  id: number;
  name: string;
  life: number;
  radiation: number;
  poison: number;
  isMonarch: boolean;
  commanderDamage: Record<number, number>; // sourcePlayerId -> damage dealt
}

interface LifeCounterState {
  players: Player[];
  updateLife: (playerId: number, amount: number) => void;
  updateRadiation: (playerId: number, amount: number) => void;
  updatePoison: (playerId: number, amount: number) => void;
  toggleMonarch: (playerId: number) => void;
  setPlayerCount: (count: number) => void;
  resetPlayers: () => void;
  renamePlayer: (playerId: number, name: string) => void;
  updateCommanderDamage: (targetPlayerId: number, sourcePlayerId: number, amount: number) => void;
}

const createDefaultPlayer = (id: number): Player => ({
  id,
  name: `Player ${id}`,
  life: 20,
  radiation: 0,
  poison: 0,
  isMonarch: false,
  commanderDamage: {},
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
        const existing = state.players.find((p) => p.id === i);
        newPlayers.push(existing ?? createDefaultPlayer(i));
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
        commanderDamage: {},
      })),
    })),

  renamePlayer: (playerId, name) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, name } : p
      ),
    })),

  updateCommanderDamage: (targetPlayerId, sourcePlayerId, amount) =>
    set((state) => ({
      players: state.players.map((p) => {
        if (p.id !== targetPlayerId) return p;
        const current = p.commanderDamage[sourcePlayerId] ?? 0;
        const next = Math.max(0, current + amount);
        return { ...p, commanderDamage: { ...p.commanderDamage, [sourcePlayerId]: next } };
      }),
    })),
}));
