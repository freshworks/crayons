import readme from "./readme.md";

export default { 
  title: 'Spinner',
  parameters: {
    notes: readme,
  }
};


export const Default = () => '<fw-spinner></fw-spinner>';

export const Small = () => '<fw-spinner size="small"></fw-spinner>';

export const Medium = () => '<fw-spinner size="medium"></fw-spinner>';

export const large = () => '<fw-spinner size="large"></fw-spinner>';
;