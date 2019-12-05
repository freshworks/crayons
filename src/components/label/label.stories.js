import readme from "./readme.md";


export default { 
  title: 'Label',
  parameters: {
    notes: readme,
  }
};

export const Default = () => '<fw-label value="Default"></fw-label>';
export const Primary = () => '<fw-label value="Primary" type="primary"></fw-label>';
export const Secondary = () => '<fw-label value="Secondary" type="secondary"></fw-label>';
export const Success = () => '<fw-label value="Success" type="success"></fw-label>';
export const Warning = () => '<fw-label value="Warning" type="warning"></fw-label>';
export const Danger = () => '<fw-label value="Danger" type="danger"></fw-label>';
