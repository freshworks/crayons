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
        <fw-select-option value="1">Starks</fw-select-option>
        <fw-select-option value="2">Lannisters</fw-select-option>
    </fw-select>
    `,
    {
      notes: {
        markdown: readme
      }
    })
  .add('With options and selected key', () =>
    `
    <fw-select label="Select the GOT house" state-text="Choose the house where you belong" selected-value="5" required="true">
        <fw-select-option value="1">Starks</fw-select-option>
        <fw-select-option value="2">Lannisters</fw-select-option>
        <fw-select-option value="3">Sand</fw-select-option>
        <fw-select-option value="4">Greyjoys</fw-select-option>
        <fw-select-option value="5">Tyrell</fw-select-option>
    </fw-select>

    <fw-select label="Select the GOT house" selected-value="2" required="true">
      <fw-select-option value="1">Starks</fw-select-option>
      <fw-select-option value="2">Lannisters</fw-select-option>
      <fw-select-option value="3">Sand</fw-select-option>
      <fw-select-option value="4">Greyjoys</fw-select-option>
      <fw-select-option value="5">Tyrell</fw-select-option>
    </fw-select>
    
    `,
    {
      notes: {
        markdown: readme
      }
    });