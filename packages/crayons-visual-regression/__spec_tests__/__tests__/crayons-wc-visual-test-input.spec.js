const screenshotTest = require('../../screenshotTest');
const setup = {
  input: [
    'default',
    'required',
    'disabled',
    'hint-text',
    'clear-input',
    'error-state',
    'warning-state',
    'max-length',
    'multiple-inputs',
    'with-icons',
  ],
};
const DELAY = 0;
screenshotTest(setup, DELAY);
