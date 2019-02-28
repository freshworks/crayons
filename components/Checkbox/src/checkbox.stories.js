  import { storiesOf } from '@storybook/html';
  import { withActions } from '@storybook/addon-actions';

  import { withKnobs } from '@storybook/addon-knobs';

  import Checkbox from '../dist/index.js'

  storiesOf('Check box', module)
    .addDecorator(withKnobs)
    //.addDecorator(withActions('click fw-button'))
    .add('Normal checkbox', () => 
    `
    <fw-checkbox label= "Click Me!" >
      `
    )
  