const screenshotTest = require('../../screenshotTest');
const setup = {
  tabs: [
    'default',
    'with-box-variant',
    'with-html-headers',
    'with-child-components',
  ],
};
const DELAY = 0;
screenshotTest(setup, DELAY);
