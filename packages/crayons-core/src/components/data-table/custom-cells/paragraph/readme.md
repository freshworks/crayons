# fw-custom-cell-paragraph



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                     | Type     | Default |
| -------- | --------- | ------------------------------- | -------- | ------- |
| `text`   | `text`    | text to display inside the cell | `string` | `''`    |


## Dependencies

### Used by

 - [fw-data-table](../..)

### Depends on

- [fw-tooltip](../../../tooltip)
- [fw-icon](../../../icon)

### Graph
```mermaid
graph TD;
  fw-custom-cell-paragraph --> fw-tooltip
  fw-custom-cell-paragraph --> fw-icon
  fw-tooltip --> fw-popover
  fw-icon --> fw-toast-message
  fw-toast-message --> fw-spinner
  fw-toast-message --> fw-icon
  fw-data-table --> fw-custom-cell-paragraph
  style fw-custom-cell-paragraph fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
