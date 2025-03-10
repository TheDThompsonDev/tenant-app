import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#10B981',
        primaryBlack: '#171717',
        primaryDarkGray: '#44403C',
        secondaryButtonBlue: '#164e63',
        secondaryContrastGray: '#A8A29E',
        accentGreen: '#D1FAE5',
        accentLightGray: '#E7E5E4',
      },
    },
  },
};

export default config;
