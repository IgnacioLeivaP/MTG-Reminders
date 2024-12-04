import { create } from 'zustand';
import { taglines } from '../data/taglines';

interface TaglineState {
  currentTagline: string;
  setRandomTagline: () => void;
}

export const useTaglineStore = create<TaglineState>((set) => ({
  currentTagline: taglines[Math.floor(Math.random() * taglines.length)],
  setRandomTagline: () => set({
    currentTagline: taglines[Math.floor(Math.random() * taglines.length)]
  })
}));