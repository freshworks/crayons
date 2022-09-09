# fw-sort-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute  | Description                                                                             | Type    | Default     |
| ------------- | ---------- | --------------------------------------------------------------------------------------- | ------- | ----------- |
| `order`       | `order`    | The sort order.                                                                         | `any`   | `undefined` |
| `orderBy`     | `order-by` | The sort by column key.                                                                 | `any`   | `undefined` |
| `sortOptions` | --         | Select options for the sortable. Array of objects of type {text: string, value: string} | `any[]` | `[]`        |


## Events

| Event    | Description                             | Type               |
| -------- | --------------------------------------- | ------------------ |
| `fwSort` | Triggered on selecting the sort option. | `CustomEvent<any>` |


## Dependencies

### Used by

 - [fw-platform-table](..)

### Depends on

- fw-popover
- fw-icon
- fw-list-options

### Graph
```mermaid
graph TD;
  fw-sort-select --> fw-popover
  fw-sort-select --> fw-icon
  fw-sort-select --> fw-list-options
  fw-list-options --> fw-select-option
  fw-list-options --> fw-input
  fw-select-option --> fw-icon
  fw-select-option --> fw-checkbox
  fw-select-option --> fw-avatar
  fw-checkbox --> fw-icon
  fw-input --> fw-icon
  fw-platform-table --> fw-sort-select
  style fw-sort-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
