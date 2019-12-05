import readme from "./readme.md";

export default { 
  title: 'TextArea',
  parameters: {
    notes: readme,
  }
};

  export const Default = () => 
  `<fw-textarea>
  </fw-textarea>`
  ;

  export const WithPlaceholder = () => 
  `<fw-textarea placeholder="Enter your address">
  </fw-textarea>`
  ;

  export const WithRowsAndCols = () => 
  `<fw-textarea placeholder="Enter your address" cols="50" rows="10">
  </fw-textarea>`
  ;

  export const WithLabelAndRequired = () => 
  `<fw-textarea placeholder="Enter your address" cols="50" rows="5" label="Address" required="true">
  </fw-textarea>`
  ;

  export const WithLabelAndRequiredAndErrorState = () => 
  `<fw-textarea placeholder="Enter your address" cols="50" rows="5" label="Address" required="true" state="error" state-text="Please enter the complete address!" >
  </fw-textarea>`
  ;


  