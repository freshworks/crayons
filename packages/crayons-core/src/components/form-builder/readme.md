# fw-form-builder



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                                            | Type     | Default     |
| ----------------- | ------------------- | ------------------------------------------------------ | -------- | ----------- |
| `jsonFormBuilder` | `json-form-builder` | json data input to render the form builder             | `any`    | `undefined` |
| `name`            | `name`              | Name of the component, saved as part of the form data. | `string` | `''`        |


## Events

| Event      | Description                                       | Type               |
| ---------- | ------------------------------------------------- | ------------------ |
| `fwExpand` | Triggered when the field is expanded or collapsed | `CustomEvent<any>` |


## Dependencies

### Depends on

- [fw-tabs](../tabs)
- [fw-tab](../tab)
- [fw-tab-panel](../tab-panel)
- [fw-fb-basic-details](fb-basic-details)

### Graph
```mermaid
graph TD;
  fw-form-builder --> fw-tabs
  fw-form-builder --> fw-tab
  fw-form-builder --> fw-tab-panel
  fw-form-builder --> fw-fb-basic-details
  fw-tabs --> fw-tab-panel
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
  style fw-form-builder fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
