/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        'secondary-blue': '#164e63',
        'primary-green': '#10b981',
        'alternate-green': '#d1fae5',
        'primary-black': '#171717',
        'secondary-dark-gray': '#44403c',
        'alternate-gray': '#a8a29e',
        'alternate-light-gray': '#e7e5e4',
      },
    },
  },
  plugins: [],
};
