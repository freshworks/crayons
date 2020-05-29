const path = require("path");
const components = require('../custom-elements.json');


const getComponents = () => components.tags.map(({ tag }) => {
  return `/components/${tag.substr(3)}/`;
});

module.exports = {
  title: 'Crayons',
  base: '/',
  description: 'Use freshworks components to build apps',
  dest: 'docs-dist',
  docsDir: 'src',
  head: [
    ['script', { type: 'module', src: '/www/build/crayons.esm.js' }],
    ['script', {  nomodule:'', src: '/www/build/crayons.js' }],
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
    [
      '@vuepress/google-analytics',
      {
        'ga': '',
      }
    ],
    [
      'vuepress-plugin-seo', {
        siteTitle: () => 'Crayons',
        title: () => 'Crayons',
        description: () => 'A refreshed design library for the Freshworks Developers.',
        author: () => 'Freshworks',
        tags: () => ['web components', 'Ui Kit', 'marketplace', 'freshworks marketplace'],
        twitterCard: _ => 'summary_large_image',
        type: $page => ['articles', 'posts', 'blog'].some(folder => $page.regularPath.startsWith('/' + folder)) ? 'article' : 'website',
        url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
        image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
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
