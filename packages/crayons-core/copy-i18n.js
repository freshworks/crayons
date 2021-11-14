/* eslint-disable no-undef */
const fs = require('fs-extra');
const path = require('path');

// Get a reference to the source locales folders
const buildRoot = path.join(__dirname, 'www');
const srci18n = path.join(buildRoot, 'i18n');

// Get a reference to the output locales folders in the dist build
const destLazyLoadRoot = path.join(__dirname, 'dist', 'i18n');
const destComponentsRoot = path.join(__dirname, 'dist', 'components', 'i18n');

// Copy from the source to the destination
fs.copySync(srci18n, destLazyLoadRoot);
fs.copySync(srci18n, destComponentsRoot);
