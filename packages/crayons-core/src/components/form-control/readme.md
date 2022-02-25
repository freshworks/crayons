# Form Control (fw-form-control)

`Form Control` component used with `fw-form` component. Please refer [fw-form](../form/#demo-static-form) for usage 


<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                               | Type                                                                                                                                                                         | Default     |
| -------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `choices`      | `choices`       |                                                                                                                                                           | `any`                                                                                                                                                                        | `[]`        |
| `controlProps` | `control-props` | Contains values for crayons components. Useful when rendering crayons components implicitly via form-control. Not required when using controls via slots. | `any`                                                                                                                                                                        | `undefined` |
| `error`        | `error`         |                                                                                                                                                           | `string`                                                                                                                                                                     | `''`        |
| `fieldProps`   | `field-props`   | Additional props can be passed here for crayons components. Useful when rendering crayons components implicitly via form-control.                         | `any`                                                                                                                                                                        | `{}`        |
| `hint`         | `hint`          |                                                                                                                                                           | `string`                                                                                                                                                                     | `''`        |
| `label`        | `label`         |                                                                                                                                                           | `any`                                                                                                                                                                        | `undefined` |
| `name`         | `name`          |                                                                                                                                                           | `any`                                                                                                                                                                        | `undefined` |
| `placeholder`  | `placeholder`   |                                                                                                                                                           | `string`                                                                                                                                                                     | `''`        |
| `required`     | `required`      |                                                                                                                                                           | `boolean`                                                                                                                                                                    | `false`     |
| `touched`      | `touched`       |                                                                                                                                                           | `boolean`                                                                                                                                                                    | `false`     |
| `type`         | `type`          |                                                                                                                                                           | `"CHECKBOX" \| "DATE" \| "DECIMAL" \| "DROPDOWN" \| "EMAIL" \| "MULTI_SELECT" \| "NUMBER" \| "PARAGRAPH" \| "RADIO" \| "RELATIONSHIP" \| "TEL" \| "TEXT" \| "TIME" \| "URL"` | `'TEXT'`    |


## Methods

### `setFocus() => Promise<void>`

Set Focus on the child

#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [fw-form](../form)

### Depends on

- [fw-input](../input)
- [fw-textarea](../textarea)
- [fw-datepicker](../datepicker)
- [fw-checkbox](../checkbox)
- [fw-radio-group](../radio-group)
- [fw-radio](../radio)
- [fw-select](../select)
- [fw-timepicker](../timepicker)

### Graph
```mermaid
graph TD;
  fw-form-control --> fw-input
  fw-form-control --> fw-textarea
  fw-form-control --> fw-datepicker
  fw-form-control --> fw-checkbox
  fw-form-control --> fw-radio-group
  fw-form-control --> fw-radio
  fw-form-control --> fw-select
  fw-form-control --> fw-timepicker
  fw-input --> fw-icon
  fw-icon --> fw-toast-message
  fw-toast-message --> fw-spinner
  fw-toast-message --> fw-icon
  fw-datepicker --> fw-popover
  fw-datepicker --> fw-input
  fw-datepicker --> fw-icon
  fw-datepicker --> fw-select
  fw-datepicker --> fw-select-option
  fw-datepicker --> fw-button
  fw-select --> fw-tag
  fw-select --> fw-popover
  fw-select --> fw-button
  fw-select --> fw-spinner
  fw-select --> fw-icon
  fw-select --> fw-list-options
  fw-tag --> fw-avatar
  fw-tag --> fw-icon
  fw-button --> fw-spinner
  fw-button --> fw-icon
  fw-list-options --> fw-select-option
  fw-list-options --> fw-input
  fw-select-option --> fw-icon
  fw-select-option --> fw-checkbox
  fw-select-option --> fw-avatar
  fw-checkbox --> fw-icon
  fw-timepicker --> fw-select
  fw-timepicker --> fw-select-option
  fw-form --> fw-form-control
  style fw-form-control fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
