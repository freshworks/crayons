# fw-form-wrapper



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute           | Description | Type  | Default     |
| ------------------ | ------------------- | ----------- | ----- | ----------- |
| `formSchema`       | `form-schema`       |             | `any` | `undefined` |
| `initialErrors`    | `initial-errors`    |             | `any` | `undefined` |
| `initialValues`    | `initial-values`    |             | `any` | `undefined` |
| `validationSchema` | `validation-schema` |             | `any` | `undefined` |


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
  fw-input --> fw-icon
  fw-icon --> fw-toast-message
  fw-toast-message --> fw-spinner
  fw-toast-message --> fw-icon
  style fw-form-wrapper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
