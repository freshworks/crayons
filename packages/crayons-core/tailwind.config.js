const colors = require('tailwindcss/colors');

module.exports = {
  purge: false,
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    textColor: {
      primary: '#3490dc',
      secondary: '#ffed4a',
      danger: 'yellow',
      skyblue: colors.green,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
