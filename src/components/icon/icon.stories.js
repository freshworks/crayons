import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('Icon', module)
  .add('Default', () => '<fw-icon name="agent" color="#ddd" size="18"></fw-icon>', {
    notes: {
      markdown: readme
    }
  });