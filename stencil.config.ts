import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';
import autoprefixer from 'autoprefixer';

import { generateJsonDocs } from './customElementDocGenerator';

export const config: Config = {
  namespace: 'crayons-icons',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
      footer: 'Built with ❤ at Freshworks',
    },
    {
      type: 'custom',
      generator: generateJsonDocs,
      name: 'custom-element-docs',
    },
    {
      type: 'www',
      dir: 'src/.vuepress/public/www/',
      serviceWorker: undefined, // disable service workers
    },
  ],
  plugins: [
    sass(),
    postcss({
      plugins: [autoprefixer()],
    }),
  ],
  testing: {
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    collectCoverageFrom: [
      '**/*.{ts,tsx}',
      '!**/node_modules/**',
      '!**/dist/**',
      '!**/www/**',
      '!**/loader/**',
      '!**/stencil.config.ts',
      '!**/*.d.ts',
      '!**/src/index.ts',
      '!**/customElementDocGenerator.ts',
    ],
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'text-summary'],
  },
};
