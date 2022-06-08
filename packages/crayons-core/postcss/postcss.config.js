const plugin = require('postcss-directional-to-logical');

module.exports = () => {
  return {
    syntax: 'postcss-scss',
    plugins: [plugin.default({})],
  };
};
