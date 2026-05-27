import { create } from 'zustand';

interface SpeedState {
  speed: number;
  increaseSpeed: () => void;
  decreaseSpeed: () => void;
  resetSpeed: () => void;
}

export const useSpeedStore = create<SpeedState>((set) => ({
  speed: 0,
  increaseSpeed: () => set((state) => ({ speed: Math.min(4, state.speed + 1) })),
  decreaseSpeed: () => set((state) => ({ speed: Math.max(0, state.speed - 1) })),
  resetSpeed: () => set({ speed: 0 }),
}));
