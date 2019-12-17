import readme from "./readme.md";


export default { 
  title: 'Radio Group',
  component: 'fw-radio-group',
  parameters: {
    notes: readme,
  }
};

export const Default = () => `
  <h3> Is this useful? </h3>
  <fw-radio-group>
    <fw-radio value="yes">Yes</fw-radio>
    <fw-radio value="no">No</fw-radio>
    <fw-radio value="maybe">Maybe</fw-radio>
  </fw-radio-group>`;

export const AllowEmpty = () => `
  <h3> Is this useful? </h3>
  <fw-radio-group allow-empty>
    <fw-radio value="yes">Yes</fw-radio>
    <fw-radio value="no">No</fw-radio>
    <fw-radio value="maybe">Maybe</fw-radio>
  </fw-radio-group>`;