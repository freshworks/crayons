  import { storiesOf } from '@storybook/html';
  import { withKnobs } from '@storybook/addon-knobs';

  import Checkbox from '../dist/'
// <script src = "index.js"></script>

  storiesOf('Check box', module)
    .addDecorator(withKnobs)
    .add('Normal checkbox', () => 
    `
    <fw-checkbox label="Click Me!" checked>
      `
    )
  