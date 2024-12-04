import { create } from 'zustand';

interface MonarchState {
  isMonarch: boolean;
  setIsMonarch: (isMonarch: boolean) => void;
}

export const useMonarchStore = create<MonarchState>((set) => ({
  isMonarch: false,
  setIsMonarch: (isMonarch) => set({ isMonarch }),
}));