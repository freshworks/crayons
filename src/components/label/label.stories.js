import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('Label', module)
  .add('Default', () => '<fw-label value="Default"></fw-label>', {
    notes: {
      markdown: readme
    }
  })
  .add('Primary', () => {
    const label = document.createElement('fw-label');
    label.type = 'primary';
    label.value = 'Primary';
    return label;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Secondary', () => {
    const label = document.createElement('fw-label');
    label.type = 'secondary';
    label.value = 'Secondary';
    return label;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Success', () => {
    const label = document.createElement('fw-label');
    label.type = 'success';
    label.value = 'Success';
    return label;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Warning', () => {
    const label = document.createElement('fw-label');
    label.type = 'warning';
    label.value = 'Warning';
    return label;
  }, {
    notes: {
      markdown: readme
    }
  })
  .add('Danger', () => {
    const label = document.createElement('fw-label');
    label.type = 'danger';
    label.value = 'Danger';
    return label;
  }, {
    notes: {
      markdown: readme
    }
  });