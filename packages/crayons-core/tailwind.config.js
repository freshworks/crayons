const colors = require('tailwindcss/colors');

module.exports = {
  // purge: {
  //   content: ['./src/**/*.html'],
  //   safelist: [
  //     'bg-blue-500',
  //     'text-center',
  //     'hover:opacity-100',
  //     // ...
  //     'lg:text-right',
  //   ],
  // },
  //  corePlugins: ['margin', 'padding'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    blue: colors.lightBlue,
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
