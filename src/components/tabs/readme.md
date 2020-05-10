# Tabs (fw-tabs)

fw-tabs displays a series of tabs on the user interface and enables tab-style navigation. The component doesn’t have any attributes that impart styling; it merely functions as a container for the tabs.

## Usage

```html live
<fw-tabs>
  <fw-tab tab-header="Personal">
    <fw-input
  label="Name"
  icon-left="add-contact"
  state-text="Do not enter your user ID"
  state="warning"
  placeholder="Enter your official name"
  required
  clear-input>
</fw-input>
<fw-button color="secondary">Submit</fw-button>
<fw-button color="secondary">Save</fw-button>
  </fw-tab>
  <fw-tab tab-header="Official">
    <fw-select multiple label="Select location of preference" required="true">
        <fw-select-option value="1">Chennai</fw-select-option>
        <fw-select-option value="2">Bangalore</fw-select-option>
        <fw-select-option value="3">Hyderabad</fw-select-option>
    </fw-select>
    <fw-button color="secondary">Submit</fw-button>
    <fw-button color="secondary">Save</fw-button>
  </fw-tab>
</fw-tabs>
```


<!-- Auto Generated Below -->


----------------------------------------------

Built with ❤ at Freshworks
