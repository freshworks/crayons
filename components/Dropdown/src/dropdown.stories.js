  import { storiesOf } from '@storybook/html';
  import { withActions } from '@storybook/addon-actions';

  import { withKnobs } from '@storybook/addon-knobs';

  import index from '../dist/'

  storiesOf('Select Dropdown', module)
    .addDecorator(withKnobs)
    //.addDecorator(withActions('click fw-button'))
    .add('Select Dropdown', () => 
    `<fw-select value = "Open" >
    <p>Open</p>
    <p>Pending</p>
    <p>Resolved</p>
    <p>Closed</p>
    <p>Waiting on customer</p>
    <p>Waiting on third party</p>
    </fw-select>
      `
      )
    
  
