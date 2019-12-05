import readme from "./readme.md";

export default { 
  title: 'Select Option',
  parameters: {
    notes: readme,
  }
};

export const Default = () => '<fw-select-option> am an ordinary Option</fw-select-option>';

export const Selected = () => '<fw-select-option selected="true">Sample Option</fw-select-option>';

export const MultipleOptions = () =>
    `
    <fw-select-option selected="true">I am the chosen one</fw-select-option>
    <fw-select-option>Me,nein</fw-select-option>
    <fw-select-option>I am another option</fw-select-option>
    `;
