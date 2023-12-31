/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
         // ...
         animation: {
          'progress-bar': 'progressBar 2s ease-in-out forwards',
        },
        keyframes: {
          progressBar: {
            '0%': { width: '0%' },
            '100%': { width: '100%' },
          },
        },
      },
    },
  
  plugins: [],
}