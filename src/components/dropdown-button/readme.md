# fw-dropdown-button



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                          | Type                                                       | Default     |
| ------------- | ------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ----------- |
| `color`       | `color`       | Dropdown Button color                                                                | `"danger" or "link" or "primary" or "secondary" or "text"` | `'primary'` |
| `label`       | `label`       | Label for the dropdown button                                                        | `string`                                                   | `undefined` |
| `options`     | --            | Options to show in the dropdown button                                               | `any[]`                                                    | `[]`        |
| `placeholder` | `placeholder` | Placeholder text for search input. Validated only if dropdown and searchable is true | `string`                                                   | `''`        |
| `searchable`  | `searchable`  | Displays a searchable dropdown button                                                | `boolean`                                                  | `false`     |
| `split`       | `split`       | Displays a split dropdown button                                                     | `boolean`                                                  | `false`     |
| `value`       | `value`       | Value of the dropdown button                                                         | `any`                                                      | `undefined` |


## Events

| Event           | Description                                                  | Type               |
| --------------- | ------------------------------------------------------------ | ------------------ |
| `fwOptionClick` | Triggered when an option is clicked                          | `CustomEvent<any>` |
| `fwOptionsAdd`  | Triggered when Add button for searchable dropdown is clicked | `CustomEvent<any>` |


## CSS Custom Properties

| Name                    | Description                       |
| ----------------------- | --------------------------------- |
| `--dropdown-font-size`  | Dropdown item font size in pixels |
| `--dropdown-max-height` | Dropdown maximum height in pixels |
| `--dropdown-max-width`  | Dropdown maximum width in pixels  |
| `--dropdown-min-height` | Dropdown minimum height in pixels |
| `--dropdown-min-width`  | Dropdown minimum width in pixels  |


## Dependencies

### Depends on

- [fw-icon](../icon)
- [fw-input](../input)
- [fw-button](../button)
- [fw-checkbox](../checkbox)

### Graph
```mermaid
graph TD;
  fw-dropdown-button --> fw-icon
  fw-dropdown-button --> fw-input
  fw-dropdown-button --> fw-button
  fw-dropdown-button --> fw-checkbox
  fw-input --> fw-icon
  style fw-dropdown-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
