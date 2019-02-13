import { storiesOf } from '@storybook/html';
import { withActions } from '@storybook/addon-actions';

import { withKnobs } from '@storybook/addon-knobs';

import Input from '../dist/'

storiesOf('Input text box', module)
  .addDecorator(withKnobs)
  //.addDecorator(withActions('click fw-button'))
  .add('Normal input', () => 
   `
   <fw-input placeholder="Placeholder" type="text">
    `
  )
 .add('input ', () => 
    `
    <fw-input type="text" placeholder="la" disabled/>
   
    
     `
 )
  // .add('Plain card with no title', () => 
  //  `
  //  <fw-alert>
  //  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.
  //  </fw-alert>
  //   `
  // )
  