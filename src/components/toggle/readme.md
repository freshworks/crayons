# Toggle

Toggle is an input control that enables modifying an element’s state between two settings. 

## Usage

```html live
<fw-toggle size="small">Small not selected</fw-toggle><br><br>
<fw-toggle size="medium" state>Mid-sized and selected</fw-toggle>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                     | Type                             | Default    |
| ---------- | ---------- | --------------------------------------------------------------- | -------------------------------- | ---------- |
| `checked`  | `checked`  |                                                                 | `boolean`                        | `false`    |
| `disabled` | `disabled` | Is it disabled                                                  | `boolean`                        | `false`    |
| `name`     | `name`     | The name of the control, which is submitted with the form data. | `string`                         | `''`       |
| `size`     | `size`     | The type of control to display. The default type is text.       | `"large" or "medium" or "small"` | `'medium'` |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `fwChange` |             | `CustomEvent<any>` |


----------------------------------------------

Built with ❤ at Freshworks
