import readme from "./readme.md";

export default { 
  title: 'Spinner',
  component: 'fw-spinner',
  parameters: {
    notes: readme,
  }
};


export const Default = () => '<fw-spinner></fw-spinner>';

export const Small = () => '<fw-spinner size="small"></fw-spinner>';

export const Medium = () => '<fw-spinner size="medium"></fw-spinner>';

export const Large = () => '<fw-spinner size="large"></fw-spinner>';

export const DifferentColor = () => '<fw-spinner size="large" color="magenta"></fw-spinner>';
