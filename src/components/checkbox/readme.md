# Checkbox (fw-checkbox)

fw-checkbox displays a checkbox on the user interface and enables assigning a state (selected or deselected) to it. In the selected state, the checkbox displayed on the UI is highlighted and contains a check mark.

## Usage

```html live
<fw-checkbox checked label="Select to agree">Agree or Disagree</fw-checkbox
><br /><br />
<fw-checkbox checked disabled value="dcb">Disable checkbox</fw-checkbox>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                   | Type      | Default |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `checked`  | `checked`  | Sets the state of the checkbox to selected. If the attribute’s value is undefined, the value is set to false. | `boolean` | `false` |
| `disabled` | `disabled` | Disables the checkbox on the interface. If the attribute’s value is undefined, the value is set to false.     | `boolean` | `false` |
| `label`    | `label`    | Label displayed on the interface for the checkbox.                                                            | `string`  | `""`    |
| `value`    | `value`    | Identifier corresponding to the component, that is saved when the form data is saved.                         | `string`  | `""`    |


## Events

| Event      | Description                                      | Type                |
| ---------- | ------------------------------------------------ | ------------------- |
| `fwBlur`   | Triggered when the checkbox loses focus.         | `CustomEvent<void>` |
| `fwChange` | Triggered when the checkbox’s value is modified. | `CustomEvent<any>`  |
| `fwFocus`  | Triggered when the checkbox comes into focus.    | `CustomEvent<void>` |


----------------------------------------------

Built with ❤ at Freshworks
