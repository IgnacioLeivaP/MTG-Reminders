/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#100b22',
          card: '#2b1e56',
          accent: '#6e49e1',
          text: '#b8b2c9',
          highlight: '#ffffff'
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.purple.600'),
              '&:hover': {
                color: theme('colors.purple.700'),
              },
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.dark.text'),
            a: {
              color: theme('colors.dark.accent'),
              '&:hover': {
                color: theme('colors.dark.highlight'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [],
};