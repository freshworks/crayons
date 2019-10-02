import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('Radio', module)
  .add('Default', () => '<fw-radio></fw-radio>', {
    notes: {
      markdown: readme
    }
  })
  .add('Checked', () => '<fw-radio checked></fw-radio>', {
    notes: {
      markdown: readme
    }
  })
  .add('Disabled', () => '<fw-radio disabled></fw-radio>', {
    notes: {
      markdown: readme
    }
  })
  .add('Disabled with checked', () => '<fw-radio disabled checked></fw-radio>', {
    notes: {
      markdown: readme
    }
  })
  .add('with Text', () => '<fw-radio> Radio Text Here </fw-radio>', {
    notes: {
      markdown: readme
    }
  })
  .add('Disabled with Text', () => '<fw-radio disabled> Radio Text Here </fw-radio>', {
    notes: {
      markdown: readme
    }
  })
  .add('with Text and Label', () => '<fw-radio label="This is a subheading"> Radio Text Here </fw-radio>', {
    notes: {
      markdown: readme
    }
  })
  .add('with Text and Label disabled', () => '<fw-radio disabled label="This is a subheading"> Radio Text Here </fw-radio>', {
    notes: {
      markdown: readme
    }
  });