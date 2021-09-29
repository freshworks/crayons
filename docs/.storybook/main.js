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
};
