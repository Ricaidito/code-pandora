/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "rose-gold": "#B76E79",
        "rose-gold-light": "#E2C1C0",
        "soft-pink": "#FFB7C5",
      },
      fontFamily: {
        romantic: ['"Dancing Script"', "cursive"],
        sans: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
