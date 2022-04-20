const fs = require('fs');
const path = require('path');

const version = require('../../package.json').version;

// Retrieve list of components for the sidebar config
const components = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../components.json'))
);

// Generate array of head-scripts based on the www builds of the
// packages that have landed in the public directory
const headScripts = [];
const wwwBuilds = fs
  .readdirSync(path.resolve(__dirname, 'public'))
  .filter((dir) => {
    return /^(\.\/)?crayons/.test(dir);
  });
for (const wwwBuild of wwwBuilds) {
  headScripts.push([
    'script',
    { type: 'module', src: `/${wwwBuild}/build/${wwwBuild}.esm.js` },
  ]);
  headScripts.push([
    'script',
    { nomodule: '', src: `/${wwwBuild}/build/${wwwBuild}.js` },
  ]);
}
headScripts.push(['link', { rel: 'stylesheet', href: `/css/crayons-min.css` }]);

const getUtils = () =>
  [
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
        children: ['/introduction/', '/introduction/migrating-to-v3/'],
      },
      {
        title: 'Components',
        collapsable: false,
        sidebarDepth: 1,
        children: components,
      },
      {
        title: 'CSS Utils',
        collapsable: false,
        sidebarDepth: 1,
        children: getUtils(),
      },
      {
        title: 'Theming',
        collapsable: false,
        sidebarDepth: 1,
        children: ['theme/colors/'],
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
        text: 'Migrating to v3',
        link: '/introduction/migrating-to-v3/',
      },
      {
        text: `v${version?.split('.')[0]}.x`,
        items: ['v3.x', 'v2.x'].map((v) => ({
          text: v,
          link: `https://crayons.freshworks.com/${v !== `v${version?.split('.')[0]}.x` ? `${v?.split('.')[0]}/` : ''
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
