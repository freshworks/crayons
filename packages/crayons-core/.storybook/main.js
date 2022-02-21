module.exports = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-viewport',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-backgrounds',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-toolbars',
  ],
  features: {
    storyStoreV7: true,
  },
  stories: ['../src/**/*.stories.@(js|mdx)'],
  core: {
    builder: 'webpack4',
  },
  features: {
    postcss: false,
    interactionsDebugger: true,
  },
};