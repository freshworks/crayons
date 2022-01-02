const fs = require('fs');
const prependFile = require('prepend-file');
prependFile.sync('crayons-react/components.ts', '// @ts-nocheck\n');
/** Copy FormUtil.ts from src to react wrapper */
fs.copyFileSync(
  'src/components/form/form-util.ts',
  'crayons-react/form-util.ts'
);
/** Copy FormDeclaration.ts from src to react wrapper */
fs.copyFileSync(
  'src/components/form/form-declaration.ts',
  'crayons-react/form-declaration.ts'
);
