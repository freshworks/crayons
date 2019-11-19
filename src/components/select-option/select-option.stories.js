import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('SelectOption', module)
  .add('Default', () => '<fw-select-option value="I am an ordinary Option"></fw-select-option>', {
    notes: {
      markdown: readme
    }
  })
  .add('Selected', () => '<fw-select-option value="Sample Option" selected="true"></fw-select-option>', {
    notes: {
      markdown: readme
    }
  })
  .add('Multiple options', () => 
  `
  <fw-select-option value="I am the chosen one" selected="true"></fw-select-option>
  <fw-select-option value="Me,nein"></fw-select-option>
  <fw-select-option value="I am another option"></fw-select-option>
  `, {
    notes: {
      markdown: readme
    }
  });