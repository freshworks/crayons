import { configure, addDecorator } from '@storybook/html';
import { withNotes } from '@storybook/addon-notes';

const req = require.context('../components', true, /\.stories\.js$/);

function loadStories() {
  // You can require as many stories as you need.
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

addDecorator(withNotes);