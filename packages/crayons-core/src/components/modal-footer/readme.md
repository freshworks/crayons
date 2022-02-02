# Modal Footer (fw-modal-footer)


<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                         | Type                                                       | Default     |
| ---------------- | ----------------- | ----------------------------------- | ---------------------------------------------------------- | ----------- |
| `cancelText`     | `cancel-text`     | The text for the cancel button      | `string`                                                   | `''`        |
| `close`          | `close`           | Function to call on close of modal  | `any`                                                      | `() => {}`  |
| `submit`         | `submit`          | Function to call on submit of modal | `any`                                                      | `() => {}`  |
| `submitColor`    | `submit-color`    | The color of submit button          | `"danger" \| "link" \| "primary" \| "secondary" \| "text"` | `'primary'` |
| `submitDisabled` | `submit-disabled` | Default state of submit button      | `boolean`                                                  | `false`     |
| `submitText`     | `submit-text`     | The text for the submit button      | `string`                                                   | `''`        |


## Dependencies

### Used by

 - [fw-modal](../modal)

### Depends on

- [fw-button](../button)

### Graph
```mermaid
graph TD;
  fw-modal-footer --> fw-button
  fw-button --> fw-spinner
  fw-button --> fw-icon
  fw-icon --> fw-toast-message
  fw-toast-message --> fw-spinner
  fw-toast-message --> fw-icon
  fw-modal --> fw-modal-footer
  style fw-modal-footer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
