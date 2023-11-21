# fw-nested-select



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type    | Default |
| --------- | --------- | ----------- | ------- | ------- |
| `options` | --        |             | `any[]` | `[]`    |


## Dependencies

### Depends on

- [fw-nested-node](.)

### Graph
```mermaid
graph TD;
  fw-nested-select --> fw-nested-node
  fw-nested-node --> fw-nested-node
  fw-nested-node --> fw-select
  fw-select --> fw-tag
  fw-select --> fw-popover
  fw-select --> fw-button
  fw-select --> fw-spinner
  fw-select --> fw-icon
  fw-select --> fw-list-options
  fw-tag --> fw-tooltip
  fw-tag --> fw-avatar
  fw-tag --> fw-icon
  fw-tooltip --> fw-popover
  fw-button --> fw-spinner
  fw-button --> fw-icon
  fw-list-options --> fw-select-option
  fw-list-options --> fw-input
  fw-select-option --> fw-icon
  fw-select-option --> fw-checkbox
  fw-select-option --> fw-avatar
  fw-checkbox --> fw-icon
  fw-input --> fw-icon
  style fw-nested-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
