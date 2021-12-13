# fw-toggle-group



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                            | Type      | Default |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `label`    | `label`    | Label for the component, that can be used by screen readers.                                                                           | `string`  | `''`    |
| `multiple` | `multiple` | Boolean value to allow multiple selection or single child selection                                                                    | `boolean` | `false` |
| `name`     | `name`     | Name of the component, saved as part of form data.                                                                                     | `string`  | `''`    |
| `value`    | `value`    | Selected items to be shown - stored in array format - if property "multiple" is set to false, this will always be a single value array | `any`     | `null`  |


## Events

| Event      | Description                                                             | Type               |
| ---------- | ----------------------------------------------------------------------- | ------------------ |
| `fwChange` | Triggered when an option in the Toggle Group is selected or deselected. | `CustomEvent<any>` |


## Methods

### `setSelectedValues(values: string | string[]) => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

Built with ❤ at Freshworks
