# Radio Group
fw-radio-group displays a group of options with radio buttons and enables selection of one option from the list. 

## Usage

```html live
<fw-radio-group name="Profile" value="au" allow-empty>
  <fw-radio value="au">Auditory</fw-radio>
  <fw-radio value="vi">Visual</fw-radio>
  <fw-radio value="re">Restless</fw-radio>
</fw-radio-group>
```


<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                                                                                                                                                | Type      | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ----------- |
| `allowEmpty` | `allow-empty` | If true, a radio group can be saved without selecting any option. If an option is selected, the selection can be cleared. If the attribute’s value is undefined, the value is set to true. | `boolean` | `false`     |
| `name`       | `name`        | Name of the component, saved as part of form data.                                                                                                                                         | `string`  | `''`        |
| `value`      | `value`       | Default option that is selected when the radio group is displayed on the UI. Must be a valid value corresponding to the fw-radio components used in the Radio Group.                       | `any`     | `undefined` |


## Events

| Event      | Description                                                            | Type               |
| ---------- | ---------------------------------------------------------------------- | ------------------ |
| `fwChange` | Triggered when an option in the Radio Group is selected or deselected. | `CustomEvent<any>` |


----------------------------------------------

Built with ❤ at Freshworks
