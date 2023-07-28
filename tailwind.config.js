/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: {
      'poppins': ["Poppins", "sans-serif"],
    },
    backgroundImage: {pic:"url('/src/images/pic.jpg')"},
  },
  plugins: [],
}

