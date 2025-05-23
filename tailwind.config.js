/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        blue: '#3674B5',
        'blue-dark': '#2e6394',
        'blue-light': '#b7e1fa',
      },
    },
  },
  plugins: [],
}
