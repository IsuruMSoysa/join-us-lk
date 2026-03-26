/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FDFCF8",
        olive: "#556B2F",
        coffee: "#6F4E37",
        maroon: "#800000",
        gold: "#D4AF37",
        charcoal: "#1A1A1A",
      },
      fontFamily: {
        round: ["Outfit", "sans-serif"],
        handwritten: ["'Dancing Script'", "cursive"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
