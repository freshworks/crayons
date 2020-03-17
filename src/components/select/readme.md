# Select
Select is an input control (list or drops-down box) that enables selection of an option or multiple options from an available list of values. 

## Usage

```html live
<fw-select label="Select the house" required="true" value="1">
  <fw-select-option value="1">Starks</fw-select-option>
  <fw-select-option value="2">Lannisters</fw-select-option>
</fw-select>
```


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                                                                                                                      | Type                               | Default     |
| ------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------- |
| `disabled`    | `disabled`     | Specifies whether the component is disabled on the interface. If the attribute’s value is undefined, the value is set to true.                                   | `boolean`                          | `false`     |
| `forceSelect` | `force-select` | If true, the user must select some value. The default wont be shown                                                                                              | `boolean`                          | `true`      |
| `label`       | `label`        | Label displayed on the interface, for the component.                                                                                                             | `string`                           | `''`        |
| `multiple`    | `multiple`     | Enables selection of multiple options. If the attribute’s value is undefined, the value is set to true.                                                          | `boolean`                          | `false`     |
| `name`        | `name`         | Name of the component, saved as part of form data.                                                                                                               | `string`                           | `''`        |
| `placeholder` | `placeholder`  | Text displayed in the control before an option is selected.                                                                                                      | `string`                           | `undefined` |
| `readonly`    | `readonly`     | If true, the user cannot modify the value.                                                                                                                       | `boolean`                          | `false`     |
| `required`    | `required`     | Specifies the input control as a mandatory field. If the attribute’s value is undefined, the value is set to true.                                               | `boolean`                          | `false`     |
| `state`       | `state`        | The state of the control. Color changes accordingly                                                                                                              | `"error" \| "normal" \| "warning"` | `'normal'`  |
| `stateText`   | `state-text`   | Descriptive or instructional text displayed below the input control.                                                                                             | `string`                           | `''`        |
| `type`        | `type`         | Type of option accepted as the input value. If an option other than the specified type is selected, the input control is not populated with the selected option. | `"number" \| "text"`               | `'text'`    |
| `value`       | `value`        | Value of the option that is displayed as the default selection, in the input control.                                                                            | `any`                              | `undefined` |


## Events

| Event      | Description                                           | Type               |
| ---------- | ----------------------------------------------------- | ------------------ |
| `fwBlur`   | Triggered when the input control comes into focus.    | `CustomEvent<any>` |
| `fwChange` | Triggered when the input control’s value is modified. | `CustomEvent<any>` |
| `fwFocus`  | Triggered when the input control comes into focus.    | `CustomEvent<any>` |


## Methods

### `getSelectedItem() => Promise<any>`



#### Returns

Type: `Promise<any>`




## Dependencies

### Used by

 - [fw-timepicker](../timepicker)

### Depends on

- [fw-tag](../tag)
- [fw-select-option](../select-option)

### Graph
```mermaid
graph TD;
  fw-select --> fw-tag
  fw-select --> fw-select-option
  fw-timepicker --> fw-select
  style fw-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
