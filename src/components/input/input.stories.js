import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('Input', module)
  .add('Default', () => '<fw-input label="Name" placeholder="Enter your first name"></fw-input>', {
    notes: {
      markdown: readme
    }
  })
  .add('Required', () => '<fw-input label="Name" required="true" placeholder="Enter your first name"></fw-input>', {
    notes: {
      markdown: readme
    }
  })
  .add('Disabled', () => '<fw-input label="Name" required="true" disabled="disabled" placeholder="Enter your first name"></fw-input>', {
    notes: {
      markdown: readme
    }
  })
  .add('State Text', () => '<fw-input label="Name" state-text="It has to be your name" required="true"  placeholder="Enter your first name"></fw-input>', {
    notes: {
      markdown: readme
    }
  })
  .add('Clear Input', () => '<fw-input label="Name" clear-input="true" state-text="It has to be your name" required="true"  placeholder="Enter your first name"></fw-input>', {
    notes: {
      markdown: readme
    }
  })
  .add('Error State', () => '<fw-input label="Name" state="error" state-text="It has to be your name" required="true"  placeholder="Enter your first name"></fw-input>', {
    notes: {
      markdown: readme
    }
  })
  .add('Warning State', () => '<fw-input label="Name" state="warning" state-text="It has to be your name" required="true"  placeholder="Enter your first name"></fw-input>', {
    notes: {
      markdown: readme
    }
  })
  .add('Max length', () => '<fw-input label="Name" maxlength="10" state-text="It has to be your name" required="true"  placeholder="Enter your first name"></fw-input>', {
    notes: {
      markdown: readme
    }
  })
  .add('Multiple Inputs', () =>
    `<fw-input label="First Name" maxlength="10" state-text="It has to be your first name" required="true"  placeholder="Enter your first name">
  </fw-input>
  <fw-input label="Last Name" maxlength="10" state-text="It has to be your last name" required="true"  placeholder="Enter your last name">
  </fw-input>`, {
    notes: {
      markdown: readme
    }
  });

