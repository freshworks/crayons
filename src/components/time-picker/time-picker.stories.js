import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('TimePicker', module)
  .add('Default', () => '<fw-time-picker></fw-date-picker>', {
    notes: {
      markdown: readme
    }
  });
  