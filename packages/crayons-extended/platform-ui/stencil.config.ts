import { Config } from '@stencil/core';
import { reactOutputTarget } from 'react-output-target';
import { sass } from '@stencil/sass';
const packageName = 'platform-ui';
export const config: Config = {
  namespace: 'platform-ui',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      componentCorePackage: `@freshworks/${packageName}`, // name in the package.json should be used
      proxiesFile: './platform-ui-react/components.ts',

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
  globalScript: 'src/global.ts',
};
