const screenshotTest = require('../../screenshotTest-async.js');
const setup = {
  'accordion': ['default'],
  'accordionbody': ['default'],
  'accordiontitle': ['default'],
  'avatar': ['default'],
  'buttongroup': ['default'],
  'button': [
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
  'checkbox': [
    'default',
    'checked',
    'disabled',
    'checked-disabled',
    'with-label',
    'disabled-with-label',
    'with-description-and-label',
    'with-description-and-label-disabled',
  ],
  'datepicker': ['default', 'datepicker-open'],
  'datatable': ['default', 'selectable', 'sticky-header'],
  /*   'formatdate': ['date-formats', 'hour-formats', 'locale-formats'], */
  'formatnumber': ['default', 'currency'],
  'icons': ['default'],
  'inline-message': ['default', 'info', 'success', 'error', 'warning'],
};
const DELAY = 0;
screenshotTest(setup, DELAY);
