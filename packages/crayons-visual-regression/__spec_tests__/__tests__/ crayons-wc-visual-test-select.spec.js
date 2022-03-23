const screenshotTest = require('../../screenshotTest');
const setup = {
  select: [
    'default',
    'with-select-options',
    'disabled',
    'readonly',
    'multi-select',
    'with-options-and-selected-key',
  ],
};

const DELAY = 0;
screenshotTest(setup, DELAY);
