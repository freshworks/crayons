const fs = require('fs');
const path = require('path');

const versions = ['v2', 'v3'];

// Retrieve list of components for the sidebar config
// const components = JSON.parse(
//   fs.readFileSync(path.resolve(__dirname, '../components.json'))
// );

const headScripts = [];
headScripts.push(['link', { rel: 'stylesheet', href: `/css/crayons-min.css` }]);

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

const websiteUrl = 'https://crayons-v3.netlify.app';

// Load sidebar based on the route
const sidebarVersions = versions.reduce(
  (sidebars, version) => ({
    ...sidebars,
    [`/${version}/`]: require(`../${version}/sidebar.js`),
  }),
  {}
);

module.exports = {
  title: 'Crayons',
  description: 'A refreshed design library for the Freshworks Developers.',
  dest: 'www-dist',
  head: [...headScripts, ['link', { rel: 'icon', href: '/favicon.png' }]],
  themeConfig: {
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    sidebar: sidebarVersions,
    nav: [
      {
        text: 'Migrating to v3',
        link: '/v3/introduction/migrating-to-v3/',
      },
      {
        text: `Docs`,
        items: ['v3.x', 'v2.x'].map((v) => ({
          text: v,
          link: `/${v?.split('.')[0]}/`,
          target: '_blank',
          activeMatch: `^/${v?.split('.')[0]}`,
        })),
      },
    ],
  },
  globalUIComponents: ['ScriptLoader'],
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
        '@components': path.resolve(__dirname, '../v2/components'),
      },
    },
  },
};
