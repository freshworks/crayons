# fw-input-condition



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute    | Description                                      | Type      | Default     |
| -------------- | ------------ | ------------------------------------------------ | --------- | ----------- |
| `controlProps` | --           | The props to be passed to the crayons component. | `{}`      | `{}`        |
| `error`        | `error`      | Whether the component have any error.            | `boolean` | `false`     |
| `showError`    | `show-error` | Whether to show the error.                       | `boolean` | `true`      |
| `value`        | `value`      | The value of the input                           | `any`     | `undefined` |


## Methods

### `isValid() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `refresh() => Promise<any>`



#### Returns

Type: `Promise<any>`



### `setError(error: any, errorText?: any) => Promise<any>`



#### Returns

Type: `Promise<any>`




## Dependencies

### Used by

 - [fw-filter-condition](../filter-condition)

### Depends on

- fw-select

### Graph
```mermaid
graph TD;
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
  fw-input --> fw-icon
  fw-filter-condition --> fw-select-condition
  style fw-select-condition fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
