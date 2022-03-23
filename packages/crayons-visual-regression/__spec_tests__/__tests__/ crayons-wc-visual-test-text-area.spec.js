const screenshotTest = require('../../screenshotTest');
const setup = {
  textarea: [
    'default',
    'with-placeholder-and-value',
    'with-rows-and-cols',
    'with-label-and-required',
    'with-label-and-required-and-error-state',
    'disabled',
  ],
};
const DELAY = 0;
screenshotTest(setup, DELAY);
