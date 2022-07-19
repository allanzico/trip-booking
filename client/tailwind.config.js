
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  mode: "jit",

  // These paths are just examples, customize them to match your project structure

  theme: {
    extend: {
      display: ["group-hover"],
    },
    fontFamily: {
      Poppins: ["Poppins, sans-serif"],
    },
    container: {
      center: true,
      padding: "1rem",
      screens: {
        lg: "1124px",
        xl: "1124px",
        "2xl": "1124px",
      },
    },
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    require("tailwind-scrollbar-hide"),
  ],

  variants: {
    width: ["responsive", "hover", "focus"],
    margin: ["responsive", "hover", "first"],
    opacity: ['disabled']
  },
};
