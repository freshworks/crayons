const urlMap = {
  docs: `introduction/`,
  sampleApps:
    'https://github.com/freshworks/marketplace-sample-apps/tree/master/Freshworks-Samples/App-Development-Features/crayons',
  crayons: 'https://github.com/freshworks/crayons',
  freshworks: 'https://www.freshworks.com',
};

export default {
  urlMap,
};

const packageVersion = require('../../package.json').version;
export const versions = ['v2', 'v3'];
export const currentVersion = `v${packageVersion?.split('.')[0]}`;
