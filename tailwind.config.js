/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['"Raleway"', '"Raleway Placeholder"', 'sans-serif'],
        sans: ['"Raleway"', '"Raleway Placeholder"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
