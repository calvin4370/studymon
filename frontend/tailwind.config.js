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
        background: {
          DEFAULT: '#F0F1F1', // White
          1: '#F0F1F1', // White
          2: '#D9D9D9' // Light Grey
        },
        primary: {
          DEFAULT: '#85DADA', // Light green
          1: '#85DADA', // Light green
          2: '#6BB0B0' // green
        },
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
