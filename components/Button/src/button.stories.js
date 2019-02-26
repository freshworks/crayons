import { storiesOf } from '@storybook/html';
import { withActions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import Button from '../dist/'

storiesOf('Button', module)
  .addDecorator(withActions('click fw-button'))
  .addDecorator(withKnobs)
  .add('Primary Button', () => 
    `
    <fw-button class="primary">
      Primary
    </fw-button>
    `
  )
  .add('Secondary Button', () => 
    `
    <fw-button class="secondary">
      Secondary
    </fw-button>
    `
  )
  // .add('disabled state', () => `
  //   <style>
  //     html{
  //       --theme-color: #ffa801;
  //     }
  //   </style>
  //   <fw-button disabled type="submit" name="hello" onclick="console.log('asdasdasd')">
  //       Disabled
  //   </fw-button>
  //   `
  // )
  // .add('large button', () => 
  //   `
  //   <style>
  //     html{
  //       --theme-color: #ffa801;
  //     }
  //   </style>
  //   <fw-button size="large">
  //     Hello World
  //   </fw-button>
  //   `
  // )
  // .add('icon button', () => 
  //   `
  //   <style>
  //     html{
  //       --theme-color: #ffa801;
  //     }
  //   </style>
  //   <fw-button size="icon">
  //     H
  //   </fw-button>
  //   `
  // )