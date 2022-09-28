const fs = require('fs');
const path = require('path');

const version = require('../../package.json').version;

// Retrieve list of components for the sidebar config
const components = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../components.json'))
);

const coreComponents = components.filter((comp) =>
  comp.startsWith('components/core/')
);
const customObjectsComponents = components.filter((comp) =>
  comp.startsWith('components/crayons-custom-objects/')
);

// Generate array of head-scripts based on the www builds of the
// packages that have landed in the public directory
const headScripts = [];
const wwwBuilds = fs.readdirSync(path.resolve(__dirname, 'public/scripts'));
for (const wwwBuild of wwwBuilds) {
  headScripts.push([
    'script',
    { type: 'module', src: `/scripts/${wwwBuild}/build/${wwwBuild}.esm.js` },
  ]);
  headScripts.push([
    'script',
    { nomodule: '', src: `/scripts/${wwwBuild}/build/${wwwBuild}.js` },
  ]);
}
headScripts.push(['link', { rel: 'stylesheet', href: `/css/crayons-min.css` }]);

const getUtils = () =>
  [
    'installation',
    'typography',
    'spacing',
    'border',
    'layout',
    'card',
    'color',
    'examples',
  ].map((util) => `/css-utils/${util}/`);

const getTags = () => [
  'Web Components',
  'Ui Kit',
  'Marketplace',
  'Freshworks Marketplace',
  'Component Library',
  'FDK',
  'Freshworks developers',
  'Freshworks development',
  'Freshworks',
  'Freshworks Development Kit',
];

const websiteUrl = 'https://crayons.freshworks.com';

module.exports = {
  title: 'Crayons',
  base: '/',
  description: 'A refreshed design library for the Freshworks Developers.',
  dest: 'www-dist',
  head: [...headScripts, ['link', { rel: 'icon', href: '/favicon.png' }]],
  themeConfig: {
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    sidebar: [
      {
        title: 'Introduction',
        collapsable: false,
        sidebarDepth: 1,
        children: ['/introduction/', '/introduction/migrating-to-v4/'],
      },
      {
        title: 'Core Components',
        collapsable: false,
        sidebarDepth: 1,
        children: coreComponents,
      },
      {
        title: 'Custom Objects',
        collapsable: false,
        sidebarDepth: 1,
        children: [...customObjectsComponents],
      },
      {
        title: 'CSS Utils',
        collapsable: false,
        sidebarDepth: 1,
        children: getUtils(),
      },
      {
        title: 'Utilities',
        collapsable: false,
        sidebarDepth: 1,
        children: ['utilities/i18n/'],
      },
      {
        title: 'Frameworks',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/frameworks/react/',
          '/frameworks/vue/',
          '/frameworks/angular/',
        ],
      },
    ],
    nav: [
      {
        text: 'Migrating to v4',
        link: '/introduction/migrating-to-v4/',
      },
      {
        text: `v${version?.split('.')[0]}.x`,
        items: ['v4.x', 'v3.x', 'v2.x'].map((v) => ({
          text: v,
          link: `https://crayons.freshworks.com/${
            v !== `v${version?.split('.')[0]}.x` ? `${v?.split('.')[0]}/` : ''
          }`,
        })),
      },
    ],
  },
  plugins: [
    [
      'live',
      {
        layout: path.resolve(__dirname, './previewLayout.vue'),
        squiggles: false,
      },
    ],
    ['@vuepress/active-header-links'],
    [
      'vuepress-plugin-google-tag-manager',
      {
        gtm: 'GTM-WQKBJ88',
      },
    ],
    [
      'vuepress-plugin-seo',
      {
        siteTitle: () => 'Crayons',
        title: () => 'Crayons',
        description: () =>
          'A refreshed design library for the Freshworks Developers.',
        author: () => 'Freshworks',
        tags: getTags,
        twitterCard: (_) => 'summary_large_image',
        type: () => 'website',
        url: (_, $site, path) => websiteUrl + path,
        image: ($page, $site) =>
          'https://s3.amazonaws.com/static.freshcloud.io/crayons/assets/crayons.png',
        publishedAt: ($page) =>
          $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: ($page) => $page.lastUpdated && new Date($page.lastUpdated),
      },
    ],
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@icon-assets': path.resolve(__dirname, '../../packages/crayons-icon'),
      },
    },
  },
};
