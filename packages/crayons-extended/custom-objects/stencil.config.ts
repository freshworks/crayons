import { Config } from '@stencil/core';
import { reactOutputTarget } from 'react-output-target';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import postcssRTLCSS from 'postcss-rtlcss';
const packageName = 'crayons-custom-objects';
export const config: Config = {
  autoprefixCss: true,
  namespace: 'crayons-custom-objects',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      autoDefineCustomElements: true,
    },
    {
      type: 'docs-readme',
      dir: '../../../www/crayons-custom-objects',
      footer: 'Built with ❤ at Freshworks',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'www',
      dir: `../../../www/.vuepress/public/scripts/${packageName}/`,
    },
    {
      type: 'dist-hydrate-script',
    },
    reactOutputTarget({
      componentCorePackage: `@freshworks/${packageName}`, // name in the package.json should be used
      proxiesFile: './crayons-custom-objects-react/components.ts',

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
  globalScript: 'src/global.ts',
  buildEs5: 'prod',
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
};
