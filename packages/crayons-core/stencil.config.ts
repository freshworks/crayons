import { Config } from '@stencil/core';
import { reactOutputTarget } from 'react-output-target';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import postcssRTLCSS from 'postcss-rtlcss';

import { generateJsonDocs } from './customElementDocGenerator';

const packageName = 'crayons';
export const config: Config = {
  autoprefixCss: true,
  namespace: packageName,
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
      autoDefineCustomElements: true,
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
      dir: `../../www/.vuepress/public/scripts/${packageName}/`,
    },
    {
      type: 'docs-json',
      file: 'dist/docs.json',
    },
    {
      type: 'dist-hydrate-script',
    },
    reactOutputTarget({
      componentCorePackage: `@freshworks/${packageName}`, // name in the package.json should be used
      proxiesFile: './crayons-react/components.ts',

      // lazy load -> code splitting
      // includeDefineCustomElements: true,
      // includePolyfills: true,

      // tree shakable, need to use setassetpath
      customElementsDir: 'dist/components',
      includeImportCustomElements: true,
    }),
    {
      /*
        Generate the readme.md files within the site directory
        at the root of the repo for Docsify to generate the
        the website.
      */
      type: 'docs-readme',
      dir: '../../site/core',
      footer: 'Built with ❤ at Freshworks',
    },
    // Use this to generate docs to show properties,events etc for each component
    {
      type: 'docs-json',
      file: `../../site/components-core.json`,
    },
    {
      type: 'www',
      dir: `../../site/${packageName}/`,
    },
  ],
  plugins: [
    sass({
      injectGlobalPaths: ['src/styles/index.scss'],
    }),
    postcss({
      plugins: [
        postcssRTLCSS({
          ltrPrefix: [':host(:not([dir="rtl"]))', ':host([dir="ltr"])'],
          rtlPrefix: ':host([dir="rtl"])',
          processKeyFrames: true,
        }),
      ],
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
    experimentalImportInjection: true,
  },
  enableCache: true,

  //globalScript: 'src/global/crayons.ts',
};
