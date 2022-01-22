# Modal Title (fw-modal-title)

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                 | Type     | Default     |
| ------------- | ------------- | ------------------------------------------- | -------- | ----------- |
| `description` | `description` | The title text to be displayed on the modal | `string` | `undefined` |
| `icon`        | `icon`        | The icon to be displayed with the title     | `string` | `''`        |
| `titleText`   | `title-text`  | The title text to be displayed on the modal | `string` | `undefined` |


## Dependencies

### Used by

 - [fw-modal](../modal)

### Depends on

- [fw-icon](../icon)

### Graph
```mermaid
graph TD;
  fw-modal-title --> fw-icon
  fw-icon --> fw-toast-message
  fw-toast-message --> fw-spinner
  fw-toast-message --> fw-icon
  fw-modal --> fw-modal-title
  style fw-modal-title fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
