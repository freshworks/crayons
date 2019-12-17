import readme from "./readme.md";

export default { 
  title: 'Timepicker',
  component: 'fw-timepicker',
  parameters: {
    notes: readme,
  }
};

export const Default = () => '<fw-timepicker></fw-timepicker>';

export const interval = () => '<fw-timepicker interval=45></fw-timepicker>';

export const startEnd = () => '<fw-timepicker min-time="04:30 AM" max-time="08:30 AM"></fw-timepicker>';
