# fw-form-builder



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                            | Type     | Default     |
| ------------ | ------------- | ------------------------------------------------------ | -------- | ----------- |
| `jsonPreset` | `json-preset` | json data input to render the form builder             | `any`    | `undefined` |
| `name`       | `name`        | Name of the component, saved as part of the form data. | `string` | `''`        |


## Events

| Event      | Description                                      | Type               |
| ---------- | ------------------------------------------------ | ------------------ |
| `fwUpdate` | Triggered when any change in the form is updated | `CustomEvent<any>` |


## Methods

### `setFormCreated(value: boolean) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [fw-tabs](../tabs)
- [fw-tab](../tab)
- [fw-tab-panel](../tab-panel)
- [fw-fb-basic-details](fb-basic-details)
- [fw-fb-field-details](fb-field)

### Graph
```mermaid
graph TD;
  fw-form-builder --> fw-tabs
  fw-form-builder --> fw-tab
  fw-form-builder --> fw-tab-panel
  fw-form-builder --> fw-fb-basic-details
  fw-form-builder --> fw-fb-field-details
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
  fw-fb-field-details --> fw-field-type-menu-item
  fw-fb-field-details --> fw-field-editor
  fw-fb-field-details --> fw-drag-container
  fw-field-type-menu-item --> fw-icon
  fw-field-type-menu-item --> fw-button
  fw-field-editor --> fw-checkbox
  fw-field-editor --> fw-input
  fw-field-editor --> fw-icon
  fw-field-editor --> fw-button
  style fw-form-builder fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
