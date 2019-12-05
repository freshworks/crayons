import readme from "./readme.md";


export default { 
  title: 'Input',
  parameters: {
    notes: readme,
  }
};


export const Default = () => '<fw-input label="Name" placeholder="Enter your first name"></fw-input>';

export const Required = () => '<fw-input label="Name" required="true" placeholder="Enter your first name"></fw-input>';

export const Disabled = () => '<fw-input label="Name" required="true" disabled="disabled" placeholder="Enter your first name"></fw-input>';

export const StateText = () => '<fw-input label="Name" state-text="It has to be your name" required="true"  placeholder="Enter your first name"></fw-input>';

export const ClearInput = () => '<fw-input label="Name" clear-input="true" state-text="It has to be your name" required="true"  placeholder="Enter your first name"></fw-input>';

export const ErrorState = () => '<fw-input label="Name" state="error" state-text="It has to be your name" required="true"  placeholder="Enter your first name"></fw-input>';

export const WarningState = () => '<fw-input label="Name" state="warning" state-text="It has to be your name" required="true"  placeholder="Enter your first name"></fw-input>';

export const MaxLength = () => '<fw-input label="Name" maxlength="10" state-text="It has to be your name" required="true"  placeholder="Enter your first name"></fw-input>';

export const MultipleInputs = () =>
  `<fw-input label="First Name" maxlength="10" state-text="It has to be your first name" required="true"  placeholder="Enter your first name">
</fw-input>
<fw-input label="Last Name" maxlength="10" state-text="It has to be your last name" required="true"  placeholder="Enter your last name">
</fw-input>`;



