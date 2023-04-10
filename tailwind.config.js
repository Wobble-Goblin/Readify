module.exports = {
  content: ["./client/**/*.html", "./client/**/*.{js,jsx,ts,tsx}",
    "./client/*.html", "./client/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "light-grey": "#E5EEE5",
        purple: "#7652C6",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};