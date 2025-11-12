/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src//*.{vue,js,ts,jsx,tsx}',
    // Quasar specific folders if generated later:
    './src//!(node_modules)//*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1976D2',
          light: '#63A4FF',
          dark: '#004BA0',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
