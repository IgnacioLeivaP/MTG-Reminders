import { create } from 'zustand';

interface RingState {
  activeSteps: number[];
  toggleStep: (step: number) => void;
}

export const useRingStore = create<RingState>((set) => ({
  activeSteps: [],
  toggleStep: (step) => set((state) => ({
    activeSteps: state.activeSteps.includes(step)
      ? state.activeSteps.filter(s => s !== step)
      : [...state.activeSteps, step].sort((a, b) => a - b)
  })),
}));