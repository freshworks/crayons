# fw-filter-dropdown



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description        | Type  | Default     |
| --------- | --------- | ------------------ | ----- | ----------- |
| `options` | `options` | The filter schema  | `any` | `undefined` |
| `value`   | `value`   | The selected value | `any` | `undefined` |


## Dependencies

### Used by

 - [fw-filter-condition](../filter-condition)

### Depends on

- fw-popover
- fw-icon
- fw-list-options

### Graph
```mermaid
graph TD;
  fw-filter-dropdown --> fw-popover
  fw-filter-dropdown --> fw-icon
  fw-filter-dropdown --> fw-list-options
  fw-list-options --> fw-select-option
  fw-list-options --> fw-input
  fw-select-option --> fw-icon
  fw-select-option --> fw-checkbox
  fw-select-option --> fw-avatar
  fw-checkbox --> fw-icon
  fw-input --> fw-icon
  fw-filter-condition --> fw-filter-dropdown
  style fw-filter-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
