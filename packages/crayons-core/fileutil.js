const prependFile = require('prepend-file');
prependFile.sync('crayons-react/src/components.ts', '// @ts-nocheck\n');
