/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      sm: "300px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",
    },

    extend: {
      backgroundImage: {
        cloudly: "url('./src/assets/images/clouds.jpg')",
        thunder_storm: "url('./src/assets/images/thunderstorm.webp')",
        rain: "url('./src/assets/images/rain.jpg')",
        snowly: "url('./src/assets/images/snow.jpg')",
        drizzle: "url('./src/assets/images/drizzle.jpg')",
        default: "url('./src/assets/images/default.jpg')",
      },
    },
  },
  plugins: [],
};
