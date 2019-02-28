  import { storiesOf } from '@storybook/html';
  import { withActions } from '@storybook/addon-actions';

  import { withKnobs } from '@storybook/addon-knobs';

  import Input from '../dist/'

  storiesOf('Input text box', module)
    .addDecorator(withKnobs)
    //.addDecorator(withActions('click fw-button'))
    .add('Normal input', () => 
    `
    <fw-input placeholder="Normal input"  value="mooodu" maxlength="6" label="Normal input(Takes not more than 6 characters)" >
      `
    )
  .add('Disabled input ', () => 
      `
      <fw-input type="text" placeholder="disabled input" disabled/>
    
      
      `
  )
  .add('Time input ', () => 
  `
  <fw-input type="time"  id="timeinput"/>

  
    `
  )
  .add('Date input ', () => 
  `
  <fw-input type="date"  />

  
    `
  )
  .add('Read only input ', () => 
  `
  <fw-input value="Read only" readonly   />


  `
  )
  .add('Check boxes',()=>
  `
  <fw-input type="checkbox" value="select1" label="Please select me" > <br>
  
  `
  )
  .add('Disabled check box',()=>
    `
    <fw-input type="checkbox" value="disabled" label="Disabled" checked disabled>
    `
  )
