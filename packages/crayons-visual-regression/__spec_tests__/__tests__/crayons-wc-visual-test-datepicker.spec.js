const screenshotTest = require('../../screenshotTest');
const setup = {
  datepicker: [
    'default',
    'datepicker-open',
    'datepicker-month-open',
    'datepicker-year-open',
    'date-picker-range',
    'date-picker-range-open',
    'min-date-and-max-date-specified',
    'date-format-and-placeholder-specified',
  ],
};
const DELAY = 1500;
screenshotTest(setup, DELAY);
