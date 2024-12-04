import { create } from 'zustand';

interface EmblemsState {
  activeEmblems: string[];
  toggleEmblem: (id: string) => void;
}

export const useEmblemsStore = create<EmblemsState>((set) => ({
  activeEmblems: [],
  toggleEmblem: (id) => set((state) => ({
    activeEmblems: state.activeEmblems.includes(id)
      ? state.activeEmblems.filter(emblemId => emblemId !== id)
      : [...state.activeEmblems, id]
  })),
}));