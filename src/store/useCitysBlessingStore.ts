import { create } from 'zustand';

interface CitysBlessingState {
  hasBlessing: boolean;
  setHasBlessing: (hasBlessing: boolean) => void;
}

export const useCitysBlessingStore = create<CitysBlessingState>((set) => ({
  hasBlessing: false,
  setHasBlessing: (hasBlessing) => set({ hasBlessing }),
}));