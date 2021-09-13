module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'light-purple': '#6137E2',
        'light-white': '#F3F3F3',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
