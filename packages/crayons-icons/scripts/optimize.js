const path = require('path');
const build = require('./build');

// start build
build(path.join(__dirname, '..'), 'src/icons', 'dist/icons');
