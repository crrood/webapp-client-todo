module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0f172a', // slate-900
        'primary-light': '#1e293b', // slate-800
        'secondary': '#475569', // slate-600
        'secondary-dark': '#334155', // slate-700
        'accent': '#6B21A8', // purple-800
        'accent-dark': '#581C87',  // purple-900
      }
    },
  },
  safelist: [
    '.bg-yellow-sl',
    '.bg-red-sl',
    '.bg-green-sl',
    '.bg-purple-sl',
    '.bg-light-gray-sl',
    '.bg-dark-gray-sl',
    '.bg-blue-sl',
    '.bg-light-blue-sl',
    '.bg-dark-blue-sl',
    '.col-span-sm',
    '.col-span-md',
    '.col-span-lg',
  ],
  plugins: [],
}
