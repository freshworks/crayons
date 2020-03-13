# Checkbox
fw-checkbox is an input control that enables assigning a state (selected or deselected) to a component (check box). In the selected state, the check box displayed on the UI is highlighted and contains a check mark.
## Usage

```html live
<fw-checkbox checked label="Select to agree">Agree or Disagree</fw-checkbox><br><br>
<fw-checkbox checked disabled value="dcb">Disable check box</fw-checkbox>

```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                             | Type      | Default |
| ---------- | ---------- | --------------------------------------- | --------- | ------- |
| `checked`  | `checked`  | Property to maintain checked state      | `boolean` | `false` |
| `disabled` | `disabled` | Disables the checkbox                   | `boolean` | `false` |
| `label`    | `label`    | Label for checkbox                      | `string`  | `''`    |
| `value`    | `value`    | Value of the checkbox for within a form | `string`  | `''`    |


## Events

| Event      | Description                                  | Type                |
| ---------- | -------------------------------------------- | ------------------- |
| `fwBlur`   | Emitted when the checbox loses focus.        | `CustomEvent<void>` |
| `fwChange` | Emitted when the checkbox value has changed. | `CustomEvent<any>`  |
| `fwFocus`  | Emitted when the checkbox has focus.         | `CustomEvent<void>` |


----------------------------------------------

Built with ❤ at Freshworks
