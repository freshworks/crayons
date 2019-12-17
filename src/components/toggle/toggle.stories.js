import readme from "./readme.md";

export default { 
  title: 'Toggle',
  component: 'fw-toggle',
  parameters: {
    notes: readme,
  }
};

export const Small = () => '<fw-toggle size="small"></fw-toggle>';

export const Medium = () => '<fw-toggle size="medium"></fw-toggle>';

export const Large = () => '<fw-toggle size="large"></fw-toggle>';