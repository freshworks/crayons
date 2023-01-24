# fw-kebab-menu



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description                                                                                                                                                                                       | Type                   | Default      |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------ |
| `options` | --        | The data for the kebab menu component, the options will be of type array of fw-select-options.                                                                                                    | `any[]`                | `[]`         |
| `variant` | `variant` | Standard is the default option without any graphics other option is icon which places the icon at the beginning of the row. The props for the icon are passed as an object via the graphicsProps. | `"icon" \| "standard"` | `'standard'` |


## Events

| Event      | Description                                                        | Type               |
| ---------- | ------------------------------------------------------------------ | ------------------ |
| `fwSelect` | fwSelect event is emitted when an option is clicked from the list. | `CustomEvent<any>` |


## Dependencies

### Used by

 - [fw-data-table](../data-table)

### Depends on

- [fw-popover](../popover)
- [fw-button](../button)
- [fw-icon](../icon)
- [fw-list-options](../options-list)

### Graph
```mermaid
graph TD;
  fw-kebab-menu --> fw-popover
  fw-kebab-menu --> fw-button
  fw-kebab-menu --> fw-icon
  fw-kebab-menu --> fw-list-options
  fw-button --> fw-spinner
  fw-button --> fw-icon
  fw-list-options --> fw-select-option
  fw-list-options --> fw-input
  fw-select-option --> fw-icon
  fw-select-option --> fw-checkbox
  fw-select-option --> fw-avatar
  fw-checkbox --> fw-icon
  fw-input --> fw-icon
  fw-data-table --> fw-kebab-menu
  style fw-kebab-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
