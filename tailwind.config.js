/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      mobile: { max: "425px" },
      tablet: { max: "640px" },

      laptop: { max: "1024px" },

      desktop: { max: "1280px" },
    },
    extend: {},
  },
  plugins: [],
};
