const path = require('path');
const { versions, currentVersion } = require('./constants');

const crayonsPublicDir = path.resolve(__dirname, 'public/crayons');

const scriptMap = {
  v2: 'https://unpkg.com/@freshworks/crayons/dist/crayons/crayons.js',
  // v3: 'https://unpkg.com/@freshworks/crayons@canary/dist/crayons/crayons.js',
  [currentVersion]: `/${currentVersion}/crayons/build/crayons.js`,
};

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  router.beforeEach((to, from, next) => {
    const pathFragments = to.path.split('/');
    const version = pathFragments[1];
    const rest = pathFragments.splice(2).join('/');

    if (!versions.includes(version)) {
      return next({ path: `/${currentVersion}/${rest}` });
    } else return next();
  });
};
