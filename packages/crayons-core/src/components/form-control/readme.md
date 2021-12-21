# fw-form-control



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type     | Default     |
| ------------- | ------------- | ----------- | -------- | ----------- |
| `error`       | `error`       |             | `any`    | `undefined` |
| `inputType`   | `input-type`  |             | `any`    | `undefined` |
| `label`       | `label`       |             | `any`    | `undefined` |
| `name`        | `name`        |             | `string` | `''`        |
| `placeholder` | `placeholder` |             | `any`    | `undefined` |
| `required`    | `required`    |             | `any`    | `undefined` |
| `touched`     | `touched`     |             | `any`    | `undefined` |
| `type`        | `type`        |             | `any`    | `undefined` |


## Dependencies

### Used by

 - [fw-form-wrapper](../form-wrapper)

### Depends on

- [fw-input](../input)

### Graph
```mermaid
graph TD;
  fw-form-control --> fw-input
  fw-input --> fw-icon
  fw-icon --> fw-toast-message
  fw-toast-message --> fw-spinner
  fw-toast-message --> fw-icon
  fw-form-wrapper --> fw-form-control
  style fw-form-control fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
