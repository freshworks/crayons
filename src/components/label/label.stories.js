import readme from "./readme.md";


export default { 
  title: 'Label',
  parameters: {
    notes: readme,
  }
};

export const Normal = () => '<fw-label value="Meta"></fw-label>';
export const Blue = () => '<fw-label value="Customer Responded" color="blue"></fw-label>';
export const Red = () => '<fw-label value="Overdue" color="red"></fw-label>';
export const Green = () => '<fw-label value="New" color="green"></fw-label>';
export const Yellow = () => '<fw-label value="Pending" color="yellow"></fw-label>';
export const Grey = () => '<fw-label value="Archived" color="grey"></fw-label>';

