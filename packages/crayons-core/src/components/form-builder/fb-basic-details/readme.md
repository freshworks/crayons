# fw-fb-basic-details



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                | Type  | Default     |
| ------------ | ------------- | ------------------------------------------ | ----- | ----------- |
| `jsonPreset` | `json-preset` | json data input to render the form builder | `any` | `undefined` |


## Events

| Event      | Description                      | Type                |
| ---------- | -------------------------------- | ------------------- |
| `fwCancel` | Triggered on cancel button click | `CustomEvent<void>` |
| `fwCreate` | Triggered on create button click | `CustomEvent<any>`  |


## Dependencies

### Used by

 - [fw-form-builder](..)

### Depends on

- [fw-toggle-group-button](../../toggle-group-button)
- [fw-input](../../input)
- [fw-textarea](../../textarea)
- [fw-toggle-group](../../toggle-group)
- [fw-button](../../button)

### Graph
```mermaid
graph TD;
  fw-fb-basic-details --> fw-toggle-group-button
  fw-fb-basic-details --> fw-input
  fw-fb-basic-details --> fw-textarea
  fw-fb-basic-details --> fw-toggle-group
  fw-fb-basic-details --> fw-button
  fw-toggle-group-button --> fw-icon
  fw-icon --> fw-toast-message
  fw-toast-message --> fw-spinner
  fw-toast-message --> fw-icon
  fw-input --> fw-icon
  fw-button --> fw-spinner
  fw-button --> fw-icon
  fw-form-builder --> fw-fb-basic-details
  style fw-fb-basic-details fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
