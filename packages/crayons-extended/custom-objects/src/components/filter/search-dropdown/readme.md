# fw-search-dropdown



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description       | Type  | Default     |
| --------- | --------- | ----------------- | ----- | ----------- |
| `options` | `options` | The filter schema | `any` | `undefined` |


## Events

| Event      | Description     | Type               |
| ---------- | --------------- | ------------------ |
| `fwChange` | On Change event | `CustomEvent<any>` |


## Dependencies

### Used by

 - [fw-filter](../filter)

### Depends on

- fw-popover
- fw-input
- fw-list-options

### Graph
```mermaid
graph TD;
  fw-search-dropdown --> fw-popover
  fw-search-dropdown --> fw-input
  fw-search-dropdown --> fw-list-options
  fw-input --> fw-icon
  fw-list-options --> fw-select-option
  fw-list-options --> fw-input
  fw-select-option --> fw-icon
  fw-select-option --> fw-checkbox
  fw-select-option --> fw-avatar
  fw-checkbox --> fw-icon
  fw-filter --> fw-search-dropdown
  style fw-search-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
