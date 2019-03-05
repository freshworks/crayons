  import { storiesOf } from '@storybook/html';
  import { withActions } from '@storybook/addon-actions';

  import { withKnobs } from '@storybook/addon-knobs';

  import index from '../dist/'

  storiesOf('Select Dropdown', module)
    .addDecorator(withKnobs)
    //.addDecorator(withActions('click fw-button'))
    .add('Select Dropdown', () => 
    `
    <fw-select value = "Freshworks Product">
    <p>FreshDesk</p>
    <p> Freshsales</p>
    <p> Freshmarketer</p>
    <p> FreshChat</p>
    </fw-select>
      `
    )
  