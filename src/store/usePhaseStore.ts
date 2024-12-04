import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PhaseState {
  activePhase: string;
  setActivePhase: (phase: string) => void;
}

export const usePhaseStore = create<PhaseState>()(
  persist(
    (set) => ({
      activePhase: 'beginning',
      setActivePhase: (phase) => set({ activePhase: phase })
    }),
    {
      name: 'mtg-phase-storage'
    }
  )
);