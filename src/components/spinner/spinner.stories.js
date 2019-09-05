import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('Spinner', module)
  .add('Default', () => '<fw-spinner></fw-spinner>', {
    notes: {
      markdown: readme
    }
  })
  .add('Small', () => '<fw-spinner size="small"></fw-spinner>', {
    notes: {
      markdown: readme
    }
  })
  .add('Medium', () => '<fw-spinner size="medium"></fw-spinner>', {
    notes: {
      markdown: readme
    }
  })
  .add('large', () => '<fw-spinner size="large"></fw-spinner>', {
    notes: {
      markdown: readme
    }
  });