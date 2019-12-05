import readme from "./readme.md";

export default { 
  title: 'Icon',
  parameters: {
    notes: readme,
  }
};

export const Default= () => '<fw-icon name="agent" size="18"></fw-icon>';

export const Chat= () => '<fw-icon name="freshchat" color="red" size="18"></fw-icon>';

export const AddNote= () => '<fw-icon name="add-note" color="#3880ff" size="18"></fw-icon>';
