/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#e879f9',
          400: '#d946ef',
          500: '#c026d3', // Soft Purple primary
          600: '#a21caf',
          700: '#86198f',
          800: '#701a75',
          900: '#581c87',
        },
        secondary: {
          500: '#ec4899', // Pink secondary
        }
      }
    },
  },
  plugins: [],
}
