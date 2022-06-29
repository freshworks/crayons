const prependFile = require('prepend-file');
prependFile.sync('react/components.ts', '// @ts-nocheck\n');
