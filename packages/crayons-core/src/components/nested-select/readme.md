# fw-nested-select



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute           | Description                            | Type     | Default     |
| ----------------- | ------------------- | -------------------------------------- | -------- | ----------- |
| `label`           | `label`             | label                                  | `string` | `''`        |
| `name`            | `name`              | Name of first level field              | `string` | `''`        |
| `optionLabelPath` | `option-label-path` | OptionLabelPath referred from field    | `string` | `'value'`   |
| `optionValuePath` | `option-value-path` | OptionValuePath referred from field    | `string` | `'id'`      |
| `options`         | --                  | Options to display                     | `any[]`  | `[]`        |
| `selectProps`     | `select-props`      | Function to return initialValues       | `any`    | `undefined` |
| `value`           | `value`             | Initial value from first level choices | `string` | `''`        |


## Events

| Event      | Description                                          | Type               |
| ---------- | ---------------------------------------------------- | ------------------ |
| `fwChange` | Triggered when nested selection doesn't have choices | `CustomEvent<any>` |


## Dependencies

### Used by

 - [fw-form-control](../form-control)

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
  fw-form-control --> fw-nested-select
  style fw-nested-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
