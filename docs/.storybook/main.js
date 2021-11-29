const webpack = require("webpack")

module.exports = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
  ],
  stories: ['../../packages/**/src/**/*.stories.@(js|mdx)'],
  features: {
    postcss: false,
  },
  webpackFinal: async (config) => {
    console.log(config);
  
    config.plugins = [
      ...config.plugins || [], 
      new webpack.IgnorePlugin({
        resourceRegExp: /\.js\.flow|\.md/,
        contextRegExp:/date\-fns[\/\\]/
      }

      )
    ]
    return config;
  }
};