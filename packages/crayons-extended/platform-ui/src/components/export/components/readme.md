# fw-co-export-field



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                             | Type  | Default |
| -------- | --------- | ------------------------------------------------------- | ----- | ------- |
| `value`  | `value`   | The value to populate the details of the checkbox field | `any` | `null`  |


## Events

| Event      | Description                                      | Type               |
| ---------- | ------------------------------------------------ | ------------------ |
| `fwChange` | Triggered whenever the export button is selected | `CustomEvent<any>` |


## Dependencies

### Used by

 - [fw-co-export](..)

### Depends on

- fw-checkbox
- fw-tooltip
- fw-icon

### Graph
```mermaid
graph TD;
  fw-co-export-field --> fw-checkbox
  fw-co-export-field --> fw-tooltip
  fw-co-export-field --> fw-icon
  fw-checkbox --> fw-icon
  fw-tooltip --> fw-popover
  fw-co-export --> fw-co-export-field
  style fw-co-export-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
