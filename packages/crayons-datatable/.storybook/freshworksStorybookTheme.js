import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  colorPrimary: '#12344d',
  colorSecondary: '#92a2b1',

  // UI
  appBg: '#f3f5f7',
  appContentBg: '#fff',
  appBorderColor: '#cfd7df',
  appBorderRadius: 4,

  // Typography
  fontBase: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;",
  fontCode: 'monospace',

  // Text colors
  textColor: '#12344d',
  textInverseColor: '#e5f2fd',

  // Toolbar default and active colors
  barTextColor: '#345c7c',
  barSelectedColor: '#12344d',
  barBg: '#fff',

  // Form colors
  inputBg: 'white',
  inputBorder: 'silver',
  inputTextColor: 'black',
  inputBorderRadius: 4,

  brandTitle: 'Crayons',
  brandUrl: 'https://freshworks.com',
  brandImage: 'https://www.freshworks.com/static-assets/images/common/company/logos/logo-fworks-black.svg',
});