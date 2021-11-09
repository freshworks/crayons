const path = require("path");
const components = require('../custom-elements.json');


const getComponents = () => components.tags.map(({ tag }) => {
  return `/components/${tag.substr(3)}/`;
});

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
  title: 'Crayons Icons',
  base: '/',
  description: 'A SVG Icon library for the Freshworks Developers.',
  dest: 'docs-dist',
  docsDir: 'src',
  head: [
    ['script', { type: 'module', src: '/www/build/crayons-icons.esm.js' }],
    ['script', {  nomodule:'', src: '/www/build/crayons-icons.js' }],
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  themeConfig: {
    lastUpdated: 'Last Updated',
    smoothScroll: true,
    sidebar: [
      {
        title: 'Introduction',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/components/',
        ]
      },
      {
        title: 'Components',
        collapsable: false,
        sidebarDepth: 1, 
        children: getComponents()
      }
    ],
  },
  plugins: [
    [
      "live",
      {
        layout: path.resolve(__dirname, "./previewLayout.vue")
      }
    ],
    ['@vuepress/active-header-links'],
    ['vuepress-plugin-google-tag-manager', {
      gtm: 'GTM-WQKBJ88'
    }],
    [
      'vuepress-plugin-seo', {
        siteTitle: () => 'Crayons Icons',
        title: () => 'Crayons Icons',
        description: () => 'A SVG Icon library for the Freshworks Developers.',
        author: () => 'Freshworks',
        tags: getTags,
        twitterCard: _ => 'summary_large_image',
        type: () => 'website',
        url: (_, $site, path) => websiteUrl + path,
        image: ($page, $site) => 'https://s3.amazonaws.com/static.freshcloud.io/crayons/assets/crayons.png',
        publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
        modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
      }
    ]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, '../components')
      }
    }
  }
}
