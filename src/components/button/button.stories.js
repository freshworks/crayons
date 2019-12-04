import { storiesOf } from '@storybook/html';

import readme from "./readme.md";

storiesOf('Button', module)
  .add('Default', () => `
        <fw-button>Default</fw-button>
        <fw-button disabled>Disabled</fw-button>`, {
    notes: {
      markdown: readme
    }
  }).add('Primary', () => `
        <fw-button color="primary">Primary</fw-button>
        <fw-button color="primary" disabled>Disabled</fw-button>`, {
    notes: {
      markdown: readme
    }
  }).add('Secondary', () => `
        <fw-button color="secondary">Secondary</fw-button>
        <fw-button color="secondary" disabled>Disabled</fw-button>`, {
    notes: {
      markdown: readme
    }
  }).add('Danger', () => `
        <fw-button color="danger">Danger</fw-button>
        <fw-button color="danger" disabled>Disabled</fw-button>`, {
    notes: {
      markdown: readme
    }
  }).add('Expanded button', () => `
      <fw-button expand>Default</fw-button>
      <fw-button color="primary" expand>Primary</fw-button>
      <fw-button color="secondary" expand>Secondary</fw-button>
      <fw-button color="danger" expand>Danger</fw-button>`, {
      notes: {
        markdown: readme
      }
    })
    .add('Mini buttons', () => `
      <fw-button size="mini">Default</fw-button>
      <fw-button color="primary" size="mini">Primary</fw-button>
      <fw-button color="secondary" size="mini">Secondary</fw-button>
      <fw-button color="danger" size="mini">Danger</fw-button>`, {
      notes: {
        markdown: readme
      }
    }).add('Icon buttons', () => `
      <fw-button size="icon"><fw-icon name="phone"></fw-icon></fw-button>
      <fw-button color="primary" size="icon"><fw-icon color="#fefefe" name="agent"></fw-icon></fw-button>
      <fw-button color="secondary" size="icon"><fw-icon name="check"></fw-icon></fw-button>
      <fw-button color="danger" size="icon"><fw-icon color="#fefefe" name="code"></fw-icon></fw-button>`, {
      notes: {
        markdown: readme
      }
    }).add('Buttons with Icon and Text', () => `
      <fw-button><fw-icon name="phone"></fw-icon> Call</fw-button>
      <fw-button color="primary"><fw-icon color="#fefefe" name="agent"></fw-icon> Support</fw-button>
      <fw-button color="secondary"><fw-icon name="delete"></fw-icon> Delete</fw-button>
      <fw-button color="danger"><fw-icon color="#fefefe" name="code"></fw-icon> See Code</fw-button>`, {
      notes: {
        markdown: readme
      }
    });