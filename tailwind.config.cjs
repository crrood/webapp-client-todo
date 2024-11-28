module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0f172a', // slate-900
        'secondary': '#15803d', // green-800
        'secondary-dark': '#166534', // green-900
        'accent': '#6B21A8', // purple-800
        'accent-dark': '#581C87',  // purple-900
      }
    },
  },
  plugins: [],
}
