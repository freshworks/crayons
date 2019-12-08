import readme from "./readme.md";

export default { 
  title: 'Tab',
  parameters: {
    notes: readme,
  }
};

export const Default = () => 
`<fw-tab title="TAB 1" message="this is a sample message"></fw-tab>
<fw-tab title="TAB 2" message="this is a sample message 2"></fw-tab>
`;