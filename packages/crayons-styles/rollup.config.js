import json from '@rollup/plugin-json';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';
import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';

import * as path from 'path';

export default [
  {
    input: './src/index.js',
    output: [
      {
        dir: './dist',
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      json(),
      dynamicImportVars({}),
      resolve({
        browser: false,
      }),
      babel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, 'babel.config.json'),
      }),
    ],
  },
];
