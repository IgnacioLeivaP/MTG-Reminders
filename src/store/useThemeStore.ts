import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ColorTheme = 'default' | 'mtg-white' | 'mtg-blue' | 'mtg-black' | 'mtg-red' | 'mtg-green';

interface ThemeState {
  isDarkMode: boolean;
  colorTheme: ColorTheme;
  toggleTheme: () => void;
  setColorTheme: (theme: ColorTheme) => void;
}

function applyThemeToDom(isDarkMode: boolean, colorTheme: ColorTheme) {
  document.documentElement.classList.toggle('dark', isDarkMode);
  if (colorTheme === 'default') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', colorTheme);
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: true,
      colorTheme: 'default' as ColorTheme,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setColorTheme: (colorTheme) => set({ colorTheme }),
    }),
    {
      name: 'mtg-theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state) applyThemeToDom(state.isDarkMode, state.colorTheme);
      },
    }
  )
);

// Apply immediately on module load (catches the initial default state)
applyThemeToDom(
  useThemeStore.getState().isDarkMode,
  useThemeStore.getState().colorTheme
);

// Keep DOM in sync on every subsequent change
useThemeStore.subscribe((state) => {
  applyThemeToDom(state.isDarkMode, state.colorTheme);
});
