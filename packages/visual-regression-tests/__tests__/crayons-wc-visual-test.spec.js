const screenshotTest = require("../screenshotTest.js");
const setup = {
  datepicker: ["default","datepicker-open"],
  datatable: ["default","selectable","sticky-header"],
  'dropdownbutton':["default-dropdownbutton","split-dropdownbutton","search-dropdownbutton","splitn-searchable-dropdownbutton"]
};

screenshotTest(setup);
