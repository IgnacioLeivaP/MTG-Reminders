/** @type {import('tailwindcss').Config} */

// Helper: produces a Tailwind color that supports opacity modifiers (/50 etc.)
// CSS var must hold space-separated RGB channels e.g. "147 51 234"
const v = (name) => ({ opacityValue }) =>
  opacityValue !== undefined
    ? `rgb(var(${name}) / ${opacityValue})`
    : `rgb(var(${name}))`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg:           v('--dark-bg'),
          card:         v('--dark-card'),
          accent:       v('--dark-accent'),
          text:         v('--dark-text'),
          highlight:    v('--dark-highlight'),
          'header-to':  v('--dark-header-to'),
        },
        theme: {
          primary:        v('--theme-primary'),
          'primary-hover': v('--theme-primary-hover'),
          surface:        v('--theme-surface'),
          'surface-hover': v('--theme-surface-hover'),
          'header-from':  v('--theme-header-from'),
          'header-to':    v('--theme-header-to'),
        },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            a: {
              color: 'rgb(var(--theme-primary))',
              '&:hover': { color: 'rgb(var(--theme-primary-hover))' },
            },
          },
        },
        invert: {
          css: {
            a: {
              color: 'rgb(var(--dark-accent))',
              '&:hover': { color: 'rgb(var(--dark-highlight))' },
            },
          },
        },
      }),
    },
  },
  plugins: [],
};
