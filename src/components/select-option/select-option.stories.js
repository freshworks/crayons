import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('SelectOption', module)
  .add('Default', () => '<fw-select-option> am an ordinary Option</fw-select-option>', {
    notes: {
      markdown: readme
    }
  })
  .add('Selected', () => '<fw-select-option selected="true">Sample Option</fw-select-option>', {
    notes: {
      markdown: readme
    }
  })
  .add('Multiple options', () =>
    `
  <fw-select-option selected="true">I am the chosen one</fw-select-option>
  <fw-select-option>Me,nein</fw-select-option>
  <fw-select-option>I am another option</fw-select-option>
  `, {
    notes: {
      markdown: readme
    }
  });