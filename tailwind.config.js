module.exports = {
  content: [
    "./client/**/*.html", "./client/**/*.{js,jsx,ts,tsx}",
    //"./client/*.html", "./client/*.{js,jsx,ts,tsx}"
  ],
  darmMode: "media",
  theme: {
    extend: {
      colors: {
        primary: '#4e3d48'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};