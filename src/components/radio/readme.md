# Radio

fw-radio displays a radio button on the UI and enables assigning a state (selected or deselected) to it. In the selected state, the button displayed on the UI is highlighted. fw-radio provides child elements for fw-radio-group, to populate the Radio Group component’s list. 

## Usage

```html live
<fw-radio checked label="Select to agree">Agree or Disagree</fw-radio><br><br>
<fw-radio checked disabled value="dr">Disable radio</fw-radio>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                 | Type      | Default |
| ---------- | ---------- | ------------------------------------------- | --------- | ------- |
| `checked`  | `checked`  | Property to maintain checked state          | `boolean` | `false` |
| `disabled` | `disabled` | Disables the radio button                   | `boolean` | `false` |
| `label`    | `label`    | Label for radio button                      | `string`  | `''`    |
| `name`     | `name`     | Value of the name for within a form         | `string`  | `''`    |
| `value`    | `value`    | Value of the radio button for within a form | `string`  | `''`    |


## Events

| Event        | Description                                      | Type                |
| ------------ | ------------------------------------------------ | ------------------- |
| `fwBlur`     | Emitted when the checbox loses focus.            | `CustomEvent<void>` |
| `fwDeselect` | Emitted when the radio button value has changed. | `CustomEvent<any>`  |
| `fwFocus`    | Emitted when the radio button has focus.         | `CustomEvent<void>` |
| `fwSelect`   | Emitted when the radio button value has changed. | `CustomEvent<any>`  |


----------------------------------------------

Built with ❤ at Freshworks
