import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('RadioGroup', module)
  .add('Default', () => `
  <h3> Is this useful? </h3>
  <fw-radio-group>
    <fw-radio value="yes">Yes</fw-radio>
    <fw-radio value="no">No</fw-radio>
    <fw-radio value="maybe">Maybe</fw-radio>
  </fw-radio-group>`, {
    notes: {
      markdown: readme
    }
  })
  .add('allow Empty', () => `
  <h3> Is this useful? </h3>
  <fw-radio-group allow-empty>
    <fw-radio value="yes">Yes</fw-radio>
    <fw-radio value="no">No</fw-radio>
    <fw-radio value="maybe">Maybe</fw-radio>
  </fw-radio-group>`, {
    notes: {
      markdown: readme
    }
  });