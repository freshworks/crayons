# fw-filter-condition



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute    | Description                                     | Type  | Default     |
| ----------------- | ------------ | ----------------------------------------------- | ----- | ----------- |
| `condition`       | `condition`  | The selected condition                          | `any` | `undefined` |
| `conditionSchema` | --           | The condition schema                            | `{}`  | `{}`        |
| `controlProps`    | --           | The props to be passed to the crayons component | `{}`  | `{}`        |
| `filterOn`        | `filter-on`  | The column key for the filter.                  | `any` | `undefined` |
| `filterText`      | --           | The column display name of the filter           | `{}`  | `{}`        |
| `identifier`      | `identifier` | An unique identifier for the element.           | `any` | `undefined` |
| `value`           | `value`      | The value for the condition                     | `any` | `undefined` |


## Events

| Event      | Description                                     | Type               |
| ---------- | ----------------------------------------------- | ------------------ |
| `fwDelete` | Event Triggered on deleting an filter condition | `CustomEvent<any>` |


## Methods

### `isValid() => Promise<any>`



#### Returns

Type: `Promise<any>`




## Dependencies

### Used by

 - [fw-filter](..)

### Depends on

- [fw-input-condition](../conditions)
- [fw-input-range-condition](../conditions)
- [fw-select-condition](../conditions)
- [fw-date-condition](../conditions)
- [fw-filter-dropdown](../filter-dropdown)
- fw-icon

### Graph
```mermaid
graph TD;
  fw-filter-condition --> fw-input-condition
  fw-filter-condition --> fw-input-range-condition
  fw-filter-condition --> fw-select-condition
  fw-filter-condition --> fw-date-condition
  fw-filter-condition --> fw-filter-dropdown
  fw-filter-condition --> fw-icon
  fw-input-condition --> fw-input
  fw-input --> fw-icon
  fw-input-range-condition --> fw-input-condition
  fw-select-condition --> fw-select
  fw-select --> fw-tag
  fw-select --> fw-popover
  fw-select --> fw-button
  fw-select --> fw-spinner
  fw-select --> fw-icon
  fw-select --> fw-list-options
  fw-tag --> fw-avatar
  fw-tag --> fw-icon
  fw-button --> fw-spinner
  fw-button --> fw-icon
  fw-list-options --> fw-select-option
  fw-list-options --> fw-input
  fw-select-option --> fw-icon
  fw-select-option --> fw-checkbox
  fw-select-option --> fw-avatar
  fw-checkbox --> fw-icon
  fw-date-condition --> fw-datepicker
  fw-datepicker --> fw-select-option
  fw-datepicker --> fw-button
  fw-datepicker --> fw-popover
  fw-datepicker --> fw-input
  fw-datepicker --> fw-icon
  fw-datepicker --> fw-select
  fw-filter-dropdown --> fw-popover
  fw-filter-dropdown --> fw-icon
  fw-filter-dropdown --> fw-list-options
  fw-filter --> fw-filter-condition
  style fw-filter-condition fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
