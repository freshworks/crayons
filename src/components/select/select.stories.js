import readme from "./readme.md";


export default { 
  title: 'Select',
  parameters: {
    notes: readme,
  }
};


export const Default = () =>
    `
    <fw-select>
    </fw-select>
    `;

export const WithSelectOptions = () =>
    `
    <fw-select label="Select the house" required="true">
        <fw-select-option value="1">Starks</fw-select-option>
        <fw-select-option value="2">Lannisters</fw-select-option>
    </fw-select>
    `;

export const MultiSelect = () =>
    `
    <fw-select multi label="Select the GOT house" state-text="Choose the house where you belong" required="true">
        <fw-select-option value="1">Starks</fw-select-option>
        <fw-select-option value="2">Lannisters</fw-select-option>
        <fw-select-option value="3">Sand</fw-select-option>
        <fw-select-option value="4">Greyjoys</fw-select-option>
        <fw-select-option value="5">Tyrell</fw-select-option>
    </fw-select>
    `;

export const WithOptionsAndSelectedKey = () =>
    `
    <fw-select label="Select the GOT house" state-text="Choose the house where you belong" required="true">
        <fw-select-option value="1">Starks</fw-select-option>
        <fw-select-option value="2">Lannisters</fw-select-option>
        <fw-select-option value="3">Sand</fw-select-option>
        <fw-select-option value="4">Greyjoys</fw-select-option>
        <fw-select-option value="5">Tyrell</fw-select-option>
    </fw-select>

    <fw-select label="Select the GOT house" selected-value="2" required="true">
      <fw-select-option value="1">Starks</fw-select-option>
      <fw-select-option value="2">Lannisters</fw-select-option>
      <fw-select-option value="3">Sand</fw-select-option>
      <fw-select-option value="4">Greyjoys</fw-select-option>
      <fw-select-option value="5">Tyrell</fw-select-option>
    </fw-select>

    <fw-select label="Select the GOT house" force-select="false" required="true">
      <fw-select-option value="02:00">02:00</fw-select-option>
      <fw-select-option value="12:15">12:15</fw-select-option>
      <fw-select-option value="12:30">12:30</fw-select-option>
      <fw-select-option value="12:45">12:45</fw-select-option>
      <fw-select-option value="22:55">22:55</fw-select-option>
    </fw-select>
    
    `;
