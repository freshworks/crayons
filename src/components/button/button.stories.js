import readme from "./readme.md";

export default { 
  title: 'Button',
  parameters: {
    notes: readme,
  }
};

export const Default= () => `
      <fw-button>Default</fw-button>
      <fw-button disabled>Disabled</fw-button>`;

export const Primary= () => `
      <fw-button color="primary">Primary</fw-button>
      <fw-button color="primary" disabled>Disabled</fw-button>`;

export const Secondary= () => `
      <fw-button color="secondary">Secondary</fw-button>
      <fw-button color="secondary" disabled>Disabled</fw-button>`;

export const Danger= () => `
      <fw-button color="danger">Danger</fw-button>
      <fw-button color="danger" disabled>Disabled</fw-button>`;
export const Expanded= () => `
    <fw-button expand>Default</fw-button>
    <fw-button color="primary" expand>Primary</fw-button>
    <fw-button color="secondary" expand>Secondary</fw-button>
    <fw-button color="danger" expand>Danger</fw-button>`;
export const Mini = () => `
    <fw-button size="mini">Default</fw-button>
    <fw-button color="primary" size="mini">Primary</fw-button>
    <fw-button color="secondary" size="mini">Secondary</fw-button>
    <fw-button color="danger" size="mini">Danger</fw-button>`;
export const Icon= () => `
    <fw-button size="icon"><fw-icon name="phone"></fw-icon></fw-button>
    <fw-button color="primary" size="icon"><fw-icon color="#fefefe" name="agent"></fw-icon></fw-button>
    <fw-button color="secondary" size="icon"><fw-icon name="check"></fw-icon></fw-button>
    <fw-button color="danger" size="icon"><fw-icon color="#fefefe" name="code"></fw-icon></fw-button>`;

export const IconText= () => `
    <fw-button><fw-icon name="phone"></fw-icon> Call</fw-button>
    <fw-button color="primary"><fw-icon color="#fefefe" name="agent"></fw-icon> Support</fw-button>
    <fw-button color="secondary"><fw-icon name="delete"></fw-icon> Delete</fw-button>
    <fw-button color="danger"><fw-icon color="#fefefe" name="code"></fw-icon> See Code</fw-button>`;
