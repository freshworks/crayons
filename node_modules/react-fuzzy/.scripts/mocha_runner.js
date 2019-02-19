// IMPORTANT
// ---------
// This is an auto generated file with React CDK.
// Do not modify this file.
// Use `.scripts/user/pretest.js instead`.

require('babel-core/register');
require('babel-polyfill');

// Add jsdom support, which is required for enzyme.
var JSDOM = require('jsdom').JSDOM;

var exposedProperties = ['window', 'navigator', 'document'];

const { window } = new JSDOM(`...`);
const { document } = window;

global.window = window;
global.document = document;

global.navigator = {
  userAgent: 'node.js'
};

process.on('unhandledRejection', function (error) {
  console.error('Unhandled Promise Rejection:');
  console.error(error && error.stack || error);
});

require('./user/pretest.js');
