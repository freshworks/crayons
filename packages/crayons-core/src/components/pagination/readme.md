# fw-pagination



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute  | Description                                      | Type     | Default     |
| --------- | ---------- | ------------------------------------------------ | -------- | ----------- |
| `perPage` | `per-page` | The number of records to be shown per page.      | `number` | `undefined` |
| `start`   | `start`    | The starting record number for the current page. | `number` | `undefined` |
| `total`   | `total`    | The total number of records.                     | `number` | `undefined` |


## Dependencies

### Depends on

- [fw-button-group](../button-group)
- [fw-button](../button)
- [fw-icon](../icon)

### Graph
```mermaid
graph TD;
  fw-pagination --> fw-button-group
  fw-pagination --> fw-button
  fw-pagination --> fw-icon
  fw-button --> fw-spinner
  fw-button --> fw-icon
  style fw-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
