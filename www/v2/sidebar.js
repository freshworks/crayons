const components = require('./custom-elements.json');
const getComponents = () =>
  components.tags.map(({ tag }) => {
    return `components/${tag.substr(3)}/`;
  });

module.exports = [
  {
    title: 'Introduction',
    collapsable: false,
    sidebarDepth: 1,
    children: ['introduction/'],
  },
  {
    title: 'Components',
    collapsable: false,
    sidebarDepth: 1,
    children: getComponents(),
  },
];
