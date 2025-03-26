/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'sarovar-blue': {
            50: '#e6f2ff',
            100: '#b3dcff',
            200: '#80c6ff',
            300: '#4db0ff',
            400: '#1a9aff',
            500: '#0080ff', // Primary blue
            600: '#0066cc',
            700: '#004c99',
            800: '#003366',
            900: '#001a33'
          },
          'sarovar-water': {
            100: '#e6f3ff',
            200: '#b3defb',
            300: '#80c9f3',
            400: '#4db4eb',
            500: '#1a9fe3'
          }
        },
        backgroundImage: {
          'water-gradient': 'linear-gradient(to right, #e6f2ff, #b3dcff)',
        }
      },
    },
    plugins: [],
  }