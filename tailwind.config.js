// tailwind.config.js – centralised design tokens for DreamPath
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // enable manual dark mode toggling
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Core brand colours extracted from the Figma prototype
        brand: {
          dark: '#0f1224',      // deep background
          bg: '#171a33',        // primary panel background
          bgMid: '#1b1c43',     // secondary panel background / gradients start
          bgLight: '#251b47',   // gradient end / accent background
          border: '#1e233d',   // subtle border colour
        },
        // Accent palette – common UI accent hues used in the design
        accent: {
          indigo: '#6366f1',   // primary interactive colour
          amber: '#f59e0b',    // secondary/highlight colour
          emerald: '#10b981',  // success / positive actions
          teal: '#14b8a6',     // info / neutral accent
        },
        // Additional greys for text and UI elements
        // Additional custom UI colors
        custom: {
          body: '#080a14',
          card: '#0f1224',
          cardAlt: '#141830',
          panel: '#0e1224',
          alt: '#1b1f3b',
          console: '#0b0e22',
          code: '#060814',
          subtlePanel: '#12162c',
        },
        ui: {
          muted: '#9ca3af',
          subtle: '#6b7280',
          contrast: '#ffffff',
        },
      },
      // Example custom gradient using brand colours
      gradientColorStops: theme => ({
        ...theme('colors'),
        'brand-start': '#171a33',
        'brand-mid': '#1b1c43',
        'brand-end': '#251b47',
      }),
    },
  },
  plugins: [],
};
