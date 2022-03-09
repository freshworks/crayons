import pluginTypescript from '@rollup/plugin-typescript';
import pluginCommonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import pluginNodeResolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import dynamicImportVars from '@rollup/plugin-dynamic-import-vars';

import * as path from 'path';
import pkg from './package.json';

const inputFileName = 'src/index.ts';

export default [
  {
    input: inputFileName,
    output: [
      {
        dir: 'dist',
        format: 'es',
        exports: 'named',
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      json(),
      dynamicImportVars({}),
      pluginTypescript(),
      pluginCommonjs({
        extensions: ['.js', '.ts'],
      }),
      babel({
        babelHelpers: 'bundled',
        configFile: path.resolve(__dirname, '.babelrc.js'),
      }),
      pluginNodeResolve({
        browser: false,
      }),
    ],
  },
];
