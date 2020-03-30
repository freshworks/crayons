# Toggle (fw-toggle)

fw-toggle displays an input control that enables modifying an element’s state between two settings. 

## Usage

```html live
<fw-toggle size="small">Small not selected</fw-toggle><br><br>
<fw-toggle size="medium" state>Mid-sized and selected</fw-toggle>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                            | Type                             | Default    |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------- |
| `disabled` | `disabled` | Specifies whether to disable the control on the interface. If the attribute’s value is undefined, the value is set to true.            | `boolean`                        | `false`    |
| `name`     | `name`     | Name of the component, saved as part of the form data.                                                                                 | `string`                         | `''`       |
| `size`     | `size`     | Size of the input control.                                                                                                             | `"large" \| "medium" \| "small"` | `'medium'` |
| `state`    | `state`    | Specifies whether the input control is turned on in the default state. If the attribute’s value is undefined, the value is set to true | `boolean`                        | `false`    |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `fwChange` |             | `CustomEvent<any>` |


----------------------------------------------

Built with ❤ at Freshworks
