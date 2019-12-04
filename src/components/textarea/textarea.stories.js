import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('Textarea', module)
  .add('Default', () => 
  `<fw-textarea>
  </fw-textarea>`
  , {
    notes: {
      markdown: readme
    }
  })
  .add('With Placeholder', () => 
  `<fw-textarea placeholder="Enter your address">
  </fw-textarea>`
  , {
    notes: {
      markdown: readme
    }
  })
  .add('With rows and cols', () => 
  `<fw-textarea placeholder="Enter your address" cols="50" rows="10">
  </fw-textarea>`
  , {
    notes: {
      markdown: readme
    }
  })
  .add('With label and required', () => 
  `<fw-textarea placeholder="Enter your address" cols="50" rows="5" label="Address" required="true">
  </fw-textarea>`
  , {
    notes: {
      markdown: readme
    }
  })
  .add('With label and required', () => 
  `<fw-textarea placeholder="Enter your address" cols="50" rows="5" label="Address" required="true" state="error" state-text="Please enter the complete address!" >
  </fw-textarea>`
  , {
    notes: {
      markdown: readme
    }
  });



  