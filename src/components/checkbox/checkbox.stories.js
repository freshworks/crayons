import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('Checkbox', module)
  .add('Default', () => '<fw-checkbox></fw-checkbox>', {
    notes: {
      markdown: readme
    }
  })
  .add('Checked', () => '<fw-checkbox checked></fw-checkbox>', {
    notes: {
      markdown: readme
    }
  })
  .add('Disabled', () => '<fw-checkbox disabled></fw-checkbox>', {
    notes: {
      markdown: readme
    }
  })
  .add('Disabled with checked', () => '<fw-checkbox disabled checked></fw-checkbox>', {
    notes: {
      markdown: readme
    }
  })
  .add('with Text', () => '<fw-checkbox> Checkbox Text Here </fw-checkbox>', {
    notes: {
      markdown: readme
    }
  })
  .add('Disabled with Text', () => '<fw-checkbox disabled> Checkbox Text Here </fw-checkbox>', {
    notes: {
      markdown: readme
    }
  })
  .add('with Text and Label', () => '<fw-checkbox label="This is a subheading"> Checkbox Text Here </fw-checkbox>', {
    notes: {
      markdown: readme
    }
  })
  .add('with Text and Label disabled', () => '<fw-checkbox disabled label="This is a subheading"> Checkbox Text Here </fw-checkbox>', {
    notes: {
      markdown: readme
    }
  });