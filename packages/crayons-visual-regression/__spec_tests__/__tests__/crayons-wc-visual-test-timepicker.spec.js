const screenshotTest = require('../../screenshotTest');
const setup = {
  timepicker: [
    'default',
    'default-with-value',
    'interval-specified',
    'format-specified',
    'time-range-and-relatively-small-interval',
    'disabled-timepicker',
  ],
};
screenshotTest(setup);
