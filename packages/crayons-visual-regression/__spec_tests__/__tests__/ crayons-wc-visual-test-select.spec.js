const screenshotTest = require('../../screenshotTest');
const setup = {
  select: [
    'default',
    'with-select-options',
    'with-select-options-opened',
    'disabled',
    'readonly',
    'multi-select',
    'with-options-and-selected-key',
  ],
};

const DELAY = 1000;
screenshotTest(setup, DELAY);
