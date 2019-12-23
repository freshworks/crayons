import readme from "./readme.md";

export default { 
  title: 'Tag',
  parameters: {
    notes: readme,
  }
};

export const Default = () => '<fw-tag text="Tag"></fw-tag>';