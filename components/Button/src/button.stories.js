import { storiesOf } from '@storybook/html';
import { withActions } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';

import Button from '../dist/'

storiesOf('Button', module)
  .addDecorator(withActions('click fw-button'))
  .addDecorator(withKnobs)
  .add('Primary Button', () => 
    `
    <fw-button value="Primary" class="primary" >
      Primary
    </fw-button>
    `
  )
  .add('Secondary Button', () => 
    `
    <fw-button class="secondary" value="Secondary">
      Secondary
    </fw-button>
    `
  )
  .add('Destructive Button', () => 
    `
    <fw-button value="Destructive" class="destructive">
      Destructive
    </fw-button>
    `
  )
  .add('Active primary button',()=>
    `
    <fw-button value="Active" class="primary active">
      Active
    </fw-button>
    `
  )