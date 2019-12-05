import readme from "./readme.md";

export default { 
  title: 'Checkbox',
  parameters: {
    notes: readme,
  }
};

export const Default= () => '<fw-checkbox></fw-checkbox>';

export const Checked= () => '<fw-checkbox checked></fw-checkbox>';

export const Disabled= () => '<fw-checkbox disabled></fw-checkbox>';

export const CheckedDisabled= () => '<fw-checkbox disabled checked></fw-checkbox>';

export const withText= () => '<fw-checkbox> Checkbox Text Here </fw-checkbox>';

export const DisabledWithText = () => '<fw-checkbox disabled> Checkbox Text Here </fw-checkbox>';

export const WithTextAndLabel= () => '<fw-checkbox label="This is a subheading"> Checkbox Text Here </fw-checkbox>';

export const WithTextAndLabelDisabled= () => '<fw-checkbox disabled label="This is a subheading"> Checkbox Text Here </fw-checkbox>';
