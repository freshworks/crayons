# fw-form-wrapper



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Default                         |
| ------------------ | ------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `formSchema`       | --                  |             | `{ title: string; name: string; fields: ({ id: string; type: string; label: string; name: string; position: number; editable: boolean; custom: boolean; inputType: string; placeholder: string; required: boolean; fieldOptions: {}; fields: any[]; parent?: undefined; } \| { id: string; parent: any; type: string; label: string; name: string; position: number; editable: boolean; custom: boolean; required: boolean; inputType: string; placeholder: string; fieldOptions: {}; fields: any[]; })[]; }` | `formSchema`                    |
| `initialErrors`    | `initial-errors`    |             | `any`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `initialErrors as any`          |
| `initialValues`    | --                  |             | `{ age: string; is_indian_citizen: boolean; }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `initialValues`                 |
| `validationSchema` | `validation-schema` |             | `any`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `staticValidationSchema as any` |


## Dependencies

### Depends on

- [fw-form](../form)
- [fw-input](../input)
- [fw-textarea](../textarea)
- [fw-datepicker](../datepicker)
- [fw-timepicker](../timepicker)
- [fw-checkbox](../checkbox)

### Graph
```mermaid
graph TD;
  fw-form-wrapper --> fw-form
  fw-form-wrapper --> fw-input
  fw-form-wrapper --> fw-textarea
  fw-form-wrapper --> fw-datepicker
  fw-form-wrapper --> fw-timepicker
  fw-form-wrapper --> fw-checkbox
  fw-input --> fw-icon
  fw-datepicker --> fw-popover
  fw-datepicker --> fw-input
  fw-datepicker --> fw-select
  fw-datepicker --> fw-select-option
  fw-datepicker --> fw-button
  fw-select --> fw-tag
  fw-select --> fw-popover
  fw-select --> fw-button
  fw-select --> fw-spinner
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
