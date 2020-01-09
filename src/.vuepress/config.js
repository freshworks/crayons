const path = require("path");
const components = require('../custom-elements.json');


const getComponents = () => components.tags.map(({ tag }) => {
  return `/components/${tag.substr(3)}/`;
});

module.exports = {
  title: 'Freshworks UI Kit',
  description: 'Use freshworks components to build apps',
  dest: 'docs-dist',
  docsDir: 'src',
  head: [
    ['script', { type: 'module', src: '/www/build/freshworks-ui-kit.esm.js' }],
    ['script', {  nomodule:'', src: '/www/build/freshworks-ui-kit.js' }],
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
    ['@vuepress/active-header-links']
  ]
}