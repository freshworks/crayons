# Radio (fw-radio)

fw-radio displays a radio button on the user interface and enables assigning a state (selected or deselected) to it. In the selected state, the button displayed is highlighted. fw-radio provides child elements for fw-radio-group, to populate the Radio Group component’s list. 

## Usage

```html live
<fw-radio checked label="Select to agree">Agree or Disagree</fw-radio><br><br>
<fw-radio checked disabled value="dr">Disable radio</fw-radio>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                | Type      | Default |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `checked`  | `checked`  | Sets the state to selected. If the attribute’s value is undefined, the value is set to false.              | `boolean` | `false` |
| `disabled` | `disabled` | Disables the component on the interface. If the attribute’s value is undefined, the value is set to false. | `boolean` | `false` |
| `label`    | `label`    | Label displayed on the interface for the component.                                                        | `string`  | `''`    |
| `name`     | `name`     | Name of the component, saved as part of form data.                                                         | `string`  | `''`    |
| `value`    | `value`    | Identifier corresponding to the component, that is saved when the form data is saved.                      | `string`  | `''`    |


## Events

| Event        | Description                                           | Type                |
| ------------ | ----------------------------------------------------- | ------------------- |
| `fwBlur`     | Triggered when the radio button loses focus.          | `CustomEvent<void>` |
| `fwDeselect` | Triggered when the radio button in focus is cleared.  | `CustomEvent<any>`  |
| `fwFocus`    | Triggered when the radio button comes into focus.     | `CustomEvent<void>` |
| `fwSelect`   | Triggered when the radio button in focus is selected. | `CustomEvent<any>`  |


----------------------------------------------

Built with ❤ at Freshworks
