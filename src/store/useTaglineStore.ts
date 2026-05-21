import { create } from 'zustand';
import { taglines } from '../data/taglines';

interface TaglineState {
  taglineIndex: number;
  setRandomTagline: () => void;
}

export const useTaglineStore = create<TaglineState>((set) => ({
  taglineIndex: Math.floor(Math.random() * taglines.length),
  setRandomTagline: () => set({
    taglineIndex: Math.floor(Math.random() * taglines.length),
  }),
}));