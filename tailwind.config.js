/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      mobileS: { max: "320px" },
      mobileM: { max: "375px" },
      mobile: { max: "425px" },
      tablet: { max: "768px" },

      laptop: { max: "1024px" },

      desktop: { max: "1280px" },
    },
    extend: {},
  },
  plugins: [],
};
