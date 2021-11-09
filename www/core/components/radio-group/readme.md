# Radio Group (fw-radio-group)
fw-radio-group displays a group of options with radio buttons and enables selection of one option from the list. 

## Usage

```html live
<fw-radio-group name="Profile" value="au" allow-empty>
  <fw-radio label="Auditory" value="au"></fw-radio>
  <fw-radio label="Visual" value="vi"></fw-radio>
  <fw-radio label="Restless" value="re"></fw-radio>
</fw-radio-group>
```


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                                                                                 | Type                | Default     |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `allowEmpty`  | `allow-empty` | If true, a radio group can be saved without selecting any option. If an option is selected, the selection can be cleared. If the attribute’s value is undefined, the value is set to false. | `boolean`           | `false`     |
| `label`       | `label`       | Label for the component, that can be used by screen readers.                                                                                                                                | `string`            | `''`        |
| `name`        | `name`        | Name of the component, saved as part of form data.                                                                                                                                          | `string`            | `''`        |
| `orientation` | `orientation` | Indicates the direction of the radio buttons alignment, defaults to vertical alignment.                                                                                                     | `"column" \| "row"` | `'column'`  |
| `value`       | `value`       | Default option that is selected when the radio group is displayed on the interface. Must be a valid value corresponding to the fw-radio components used in the Radio Group.                 | `any`               | `undefined` |


## Events

| Event      | Description                                                            | Type               |
| ---------- | ---------------------------------------------------------------------- | ------------------ |
| `fwChange` | Triggered when an option in the Radio Group is selected or deselected. | `CustomEvent<any>` |


----------------------------------------------

Built with ❤ at Freshworks
