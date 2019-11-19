# fw-select-option



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                        | Type      | Default     |
| ---------- | ---------- | ------------------------------------------------------------------ | --------- | ----------- |
| `key`      | `key`      | The Key associated with this select option                         | `string`  | `undefined` |
| `selected` | `selected` | Flag to indicate if the option is selected or not. A tick is shown | `boolean` | `false`     |
| `value`    | `value`    | Text that will be shown in the select option                       | `string`  | `undefined` |


## Events

| Event                  | Description | Type               |
| ---------------------- | ----------- | ------------------ |
| `fwSelectOptionChosen` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [fw-select](../select)

### Graph
```mermaid
graph TD;
  fw-select --> fw-select-option
  style fw-select-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
