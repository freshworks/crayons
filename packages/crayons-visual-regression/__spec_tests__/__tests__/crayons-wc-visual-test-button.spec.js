const screenshotTest = require('../../screenshotTest');
const setup = {
  button: [
    'primary',
    'secondary',
    'danger',
    'link',
    'text',
    'block',
    'small',
    'mini',
    'icon',
    'icon-text',
  ],
};
const DELAY = 0;
screenshotTest(setup, DELAY);
