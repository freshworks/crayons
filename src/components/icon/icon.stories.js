import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('Icon', module)
  .add('Default', () => '<fw-icon name="agent" color="#ddd" size="18"></fw-icon>', {
    notes: {
      markdown: readme
    }
  }).add('Chat', () => '<fw-icon name="freshchat" color="red" size="18"></fw-icon>', {
    notes: {
      markdown: readme
    }
  }).add('Add Note', () => '<fw-icon name="add-note" color="#3880ff" size="18"></fw-icon>', {
    notes: {
      markdown: readme
    }
  });