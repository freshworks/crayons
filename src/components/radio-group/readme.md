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

| Property     | Attribute     | Description                                                     | Type      | Default     |
| ------------ | ------------- | --------------------------------------------------------------- | --------- | ----------- |
| `allowEmpty` | `allow-empty` | If `true`, the radios can be deselected.                        | `boolean` | `false`     |
| `name`       | `name`        | The name of the control, which is submitted with the form data. | `string`  | `''`        |
| `value`      | `value`       | the value of the radio group.                                   | `any`     | `undefined` |


## Events

| Event      | Description                         | Type               |
| ---------- | ----------------------------------- | ------------------ |
| `fwChange` | Emitted when the value has changed. | `CustomEvent<any>` |


----------------------------------------------

Built with ❤ at Freshworks
