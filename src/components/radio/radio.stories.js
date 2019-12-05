import readme from "./readme.md";

export default { 
  title: 'Radio',
  parameters: {
    notes: readme,
  }
};

  export const Default = () => '<fw-radio></fw-radio>';

  export const Checked = () => '<fw-radio checked></fw-radio>';

  export const Disabled = () => '<fw-radio disabled></fw-radio>';

  export const DisabledWithChecked = () => '<fw-radio disabled checked></fw-radio>';

  export const WithText = () => '<fw-radio> Radio Text Here </fw-radio>';

  export const DisabledWithText = () => '<fw-radio disabled> Radio Text Here </fw-radio>';

  export const withTextAndLabel = () => '<fw-radio label="This is a subheading"> Radio Text Here </fw-radio>';

  export const WithTextAndLabelDisabled = () => '<fw-radio disabled label="This is a subheading"> Radio Text Here </fw-radio>';
;