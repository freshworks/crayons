import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('Select', module)
  .add('Default', () =>
    `
    <fw-select>
    </fw-select>
    `, 
  {
    notes: {
      markdown: readme
    }
  })
  .add('With select options', () =>
    `
    <fw-select label="Select the house" required="true">
        <fw-select-option key="1" value="Starks"></fw-select-option>
        <fw-select-option key="2" value="Lannister"></fw-select-option>
    </fw-select>
    `, 
  {
    notes: {
      markdown: readme
    }
  })
  .add('With options and selected key', () =>
    `
    <fw-select label="Select the GOT house" state-text="Choose the house where you belong" selected-key="2" required="true">
        <fw-select-option key="1" value="Starks"></fw-select-option>
        <fw-select-option key="2" value="Lannisters"></fw-select-option>
        <fw-select-option key="3" value="Sand"></fw-select-option>
        <fw-select-option key="4" value="Greyjoys"></fw-select-option>
        <fw-select-option key="5" value="Tyrell"></fw-select-option>
    </fw-select>

    <fw-select label="Select the GOT house" selected-key="2" required="true">
        <fw-select-option key="1" value="Starks"></fw-select-option>
        <fw-select-option key="2" value="Lannisters"></fw-select-option>
        <fw-select-option key="3" value="Sand"></fw-select-option>
        <fw-select-option key="4" value="Greyjoys"></fw-select-option>
        <fw-select-option key="5" value="Tyrell"></fw-select-option>
    </fw-select>
    `, 
  {
    notes: {
      markdown: readme
    }
  });