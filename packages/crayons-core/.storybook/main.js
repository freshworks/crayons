module.exports = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions', //👈 The addon registered here
  ],
  stories: ['../src/**/*.stories.@(js|mdx)'],
  features: {
    postcss: false,
  },
};
