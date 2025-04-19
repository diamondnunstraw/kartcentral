/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        'scroll': 'scroll 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

