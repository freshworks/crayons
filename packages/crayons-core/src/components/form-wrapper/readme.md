# fw-form-wrapper



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type  | Default                  |
| ------------------ | ------------------- | ----------- | ----- | ------------------------ |
| `formSchema`       | `form-schema`       |             | `any` | `formSchema`             |
| `initialErrors`    | `initial-errors`    |             | `any` | `initialErrors`          |
| `initialValues`    | `initial-values`    |             | `any` | `initialValues`          |
| `validationSchema` | `validation-schema` |             | `any` | `staticValidationSchema` |


## Dependencies

### Depends on

- [fw-form](../form)
- [fw-form-control](../form-control)

### Graph
```mermaid
graph TD;
  fw-form-wrapper --> fw-form
  fw-form-wrapper --> fw-form-control
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
  fw-timepicker --> fw-select
  fw-timepicker --> fw-select-option
  style fw-form-wrapper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
