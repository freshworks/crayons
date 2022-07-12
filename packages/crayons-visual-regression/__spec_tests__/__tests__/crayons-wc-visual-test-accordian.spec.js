const screenshotTest = require('../../screenshotTest');
const setup = {
  accordion: [
    'default',
    'accordion-with-custom-icons',
    'no-bounding-box-accordion',
    'custom-css-properties',
    'title-with-different-icon-sizes',
  ],
};
const DELAY = 0;
screenshotTest(setup, DELAY);
