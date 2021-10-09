import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';

import { generateJsonDocs } from './customElementDocGenerator';

export const config: Config = {
  autoprefixCss: true,
  namespace: 'crayons',
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
      /*
        Generate the readme.md files within the www directory
        at the root of the repo for Vuepress to generate the
        the website.
      */
      type: 'docs-readme',
      dir: '../../www/core',
      footer: 'Built with ❤ at Freshworks',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'custom',
      generator: generateJsonDocs,
      name: 'custom-element-docs',
    },
    {
      type: 'www',
    },
    {
      type: 'www',
      dir: '../../www/.vuepress/public/crayons/',
    },
    {
      type: 'docs-json',
      file: 'dist/docs.json',
    },
    reactOutputTarget({
      componentCorePackage: '@freshworks/crayons', // name in the package.json should be used
      proxiesFile: './crayons-react/src/components.ts',

      // lazy load -> code splitting
      // includeDefineCustomElements: true,
      // includePolyfills: true,

      // tree shakable, need to use setassetpath
      customElementsDir: 'dist/components',
      includeImportCustomElements: true,
    }),
  ],
  plugins: [
    sass({
      injectGlobalPaths: ['src/styles/index.scss'],
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
  buildEs5: true,
  extras: {
    appendChildSlotFix: true,
    cssVarsShim: true,
    dynamicImportShim: true,
    initializeNextTick: true,
    safari10: true,
    scriptDataOpts: true,
    shadowDomShim: true,
    cloneNodeFix: true,
    slotChildNodesFix: true,
  },
  enableCache: true,
};
