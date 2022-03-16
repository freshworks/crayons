const screenshotTest = require('../../screenshotTest');
const setup = {
  input: [
    'default',
    'required',
    'disabled',
    'state-text',
    'clear-input',
    'error-state',
    'warning-state',
    'max-length',
    'multiple-inputs',
    'with-icons',
  ],
};
screenshotTest(setup);
