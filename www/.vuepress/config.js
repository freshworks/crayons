const fs = require('fs');
const path = require('path');

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

const getCookBooks = () => ['first','second'].map((util) => `/cookbooks/${util}/`);

module.exports = {
  title: 'Crayons',
  base: '/',
  description: 'A refreshed design library for the Freshworks Developers.',
  dest: 'www-dist',
  head: [...headScripts, ['link', { rel: 'icon', href: '/favicon.png' }],
  ],
  themeConfig: {
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    sidebar: [
      {
        title: 'Introduction',
        collapsable: false,
        sidebarDepth: 1,
        children: ['/introduction/'],
      },
      {
        title: 'Components',
        collapsable: false,
        sidebarDepth: 1,
        children: components,
      },
      {
        title: 'Cook Books',
        collapsable: false,
        sidebarDepth: 1,
        children: ['/cookbooks/', ...getCookBooks()],
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
    [
      'md-enhance',
      {
        demo: true,
      },
    ],
    ['@mr-hope/copy-code'],
    //require('../../vuepress-plugin-demo-code/src/')
    ['demo-code', 
      {
        jsLibs: [
            // umd
           // 'https://unpkg.com/cr-mnr-core@canary',
        ],
        cssLibs: [
    //        'https://unpkg.com/animate.css@3.7.0/animate.min.css',
        ],
        showText: 'show code',
        hideText: 'hide',
        styleStr: 'text-decoration: underline;',
        minHeight: 500,
        onlineBtns: {
            codepen: true,
            jsfiddle: true,
            codesandbox: true,
        },
        jsfiddle: {
            framework: 'library/pure', // default
            // framework: 'vue/2.6.11',
        },
        codesandbox: {
            deps: { 'lodash': 'latest', 'cr-mnr-core': 'canary', 'react':'latest', 'react-dom': 'latest' },
            json: '',
            query: '',
            embed: '',
        },
        demoCodeMark: 'demo-code1',
    }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@icon-assets': path.resolve(
          __dirname,
          'public/crayons/build/icon-assets'
        ),
      },
    },
  },
};
