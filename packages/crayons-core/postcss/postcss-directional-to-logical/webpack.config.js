const path = require('path');

module.exports = {
  entry: './postcss-directional-to-logical.js',
  output: {
    library: {
      type: 'umd',
    },
    path: path.resolve(__dirname, 'dist'),
    filename: 'postcss-directional-to-logical.js',
    globalObject: 'this',
  },
};
