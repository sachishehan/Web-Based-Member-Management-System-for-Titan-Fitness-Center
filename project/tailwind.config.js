/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#007BFF',
        secondary: '#0056b3',
        lightGray: '#6C757D',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #007BFF, #0056b3)',
      },
    },
  },
  plugins: [],
}