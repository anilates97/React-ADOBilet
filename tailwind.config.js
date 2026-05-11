/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "color-primary": "#1E1E1E",
        "color-secondary": "#292929",
        "color-rose-ebony": "#57393B",
        "color-night": "#0C0F12",
        "color-davys-gray": "#545155",
        "color-myrtle-green": "#3D726D",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
      },
    },
  },
  plugins: [],
};
