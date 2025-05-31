/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './App.tsx',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#F0F1F1', // White
        primary: '#85DADA', // Light green
        accent: {
          DEFAULT: '#8586DA',
          1: '#8586DA', // Light purple
          2: '#85B1DA' // Light blue
        },
        text: {
          DEFAULT: '#1E3231', // Dark green-black
          2: '#85878B' // Medium grey
        }
      }
    },
  },
  plugins: [],
};
