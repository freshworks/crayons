# Toggle (fw-toggle)

fw-toggle displays an input control that enables modifying an element’s state between two settings. 

## Usage

```html live
<fw-toggle size="small">Small not selected</fw-toggle><br><br>
<fw-toggle size="medium" checked>Mid-sized and selected</fw-toggle>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                 | Type                             | Default    |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------- |
| `checked`  | `checked`  | Sets the selected state as the default state. If the attribute’s value is undefined, the value is set to true.              | `boolean`                        | `false`    |
| `disabled` | `disabled` | Specifies whether to disable the control on the interface. If the attribute’s value is undefined, the value is set to true. | `boolean`                        | `false`    |
| `name`     | `name`     | Name of the component, saved as part of the form data.                                                                      | `string`                         | `''`       |
| `size`     | `size`     | Size of the input control.                                                                                                  | `"large" or "medium" or "small"` | `'medium'` |


## Events

| Event      | Description                                                 | Type               |
| ---------- | ----------------------------------------------------------- | ------------------ |
| `fwChange` | Triggered when the input control is selected or deselected. | `CustomEvent<any>` |


----------------------------------------------

Built with ❤ at Freshworks
