  import { storiesOf } from '@storybook/html';
  import { withKnobs } from '@storybook/addon-knobs';

  import RadioButton from '../dist/'
// <script src = "index.js"></script>

  storiesOf('Radio Button', module)
    .addDecorator(withKnobs)
    .add('Radio Button', () => 
    `
    <fw-radio name = "select" >

    <a autofocus value="num1">Please Select me </a>
    <a checked value="num2"invalid>Please Select me </a>
    <a>  Please Select me </a>
    <a required>Please Select me </a>
    
    </fw-radio>
      `
    )
  