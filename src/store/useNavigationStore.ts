import { create } from 'zustand';

interface NavigationStore {
  activeSection: string;
  selectedHelperId?: string;
  setActiveSection: (section: string) => void;
  setSelectedHelperId: (id?: string) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  activeSection: 'home',
  selectedHelperId: undefined,
  setActiveSection: (section) => set({ activeSection: section }),
  setSelectedHelperId: (id) => set({ selectedHelperId: id })
}));