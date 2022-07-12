const screenshotTest = require('../../screenshotTest');
const setup = {
  datatable: [
    'default',
    'selectable',
    'sticky-header',
    'user-column-variant',
    'icon-column-variant',
    'paragraph-column-variant',
    'column-text-alignment',
    'row-actions',
    'hide-column',
  ],
};
const DELAY = 0;
screenshotTest(setup, DELAY);
