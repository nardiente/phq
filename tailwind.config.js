/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        textarea: '#e5e7eb',
        purple: {
          50: '#f5f3ff', // Light purple
        },
      }
    },
  },
  plugins: [],
};
