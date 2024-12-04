import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useMonarchStore } from './useMonarchStore';
import { useDayNightStore } from './useDayNightStore';
import { useRingStore } from './useRingStore';
import { useRemindersStore } from './useRemindersStore';
import { useEmblemsStore } from './useEmblemsStore';
import { useCitysBlessingStore } from './useCitysBlessingStore';
import { useCountersStore } from './useCountersStore';
import { usePhaseStore } from './usePhaseStore';
import { useLifeCounterStore } from './useLifeCounterStore';
import { useTaglineStore } from './useTaglineStore';

interface PersistentState {
  resetAllState: () => void;
}

export const usePersistentStore = create<PersistentState>((set) => ({
  resetAllState: () => {
    // Reset all individual stores
    useMonarchStore.setState({ isMonarch: false });
    useDayNightStore.setState({ isDay: true });
    useRingStore.setState({ activeSteps: [] });
    useRemindersStore.setState({ reminders: [] });
    useEmblemsStore.setState({ activeEmblems: [] });
    useCitysBlessingStore.setState({ hasBlessing: false });
    useCountersStore.setState({ counters: {} });
    usePhaseStore.setState({ activePhase: 'beginning' });
    useLifeCounterStore.setState({ 
      players: [
        { id: 1, name: 'Player 1', life: 20 },
        { id: 2, name: 'Player 2', life: 20 }
      ]
    });
    useTaglineStore.getState().setRandomTagline();
  },
}));