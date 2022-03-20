const fs = require('fs');
const path = require('path');
const components = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './components.json'))
);
const getUtils = () =>
  [
    'typography',
    'spacing',
    'border',
    'layout',
    'card',
    'color',
    'examples',
  ].map((util) => `css-utils/${util}/`);

module.exports = [
  {
    title: 'Introduction',
    collapsable: false,
    sidebarDepth: 1,
    children: ['introduction/', 'introduction/migrating-to-v3/'],
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
    title: 'Utilities',
    collapsable: false,
    sidebarDepth: 1,
    children: ['utilities/i18n/'],
  },
  {
    title: 'Frameworks',
    collapsable: false,
    sidebarDepth: 1,
    children: ['frameworks/react/', 'frameworks/vue/', 'frameworks/angular/'],
  },
];
