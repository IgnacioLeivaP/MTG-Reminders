import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteTool {
  id: string;
  name: string;
  icon: string;
}

interface FavoritesState {
  favorites: FavoriteTool[];
  addFavorite: (tool: FavoriteTool) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (tool) => set((state) => ({
        favorites: [...state.favorites, tool]
      })),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter(tool => tool.id !== id)
      })),
      isFavorite: (id) => get().favorites.some(tool => tool.id === id),
      clearFavorites: () => set({ favorites: [] })
    }),
    {
      name: 'favorites-storage'
    }
  )
); 