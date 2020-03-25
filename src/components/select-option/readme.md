# Select Option



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                        | Type      | Default     |
| ------------- | -------------- | ------------------------------------------------------------------ | --------- | ----------- |
| `html`        | `html`         | Boolean saying if option is html                                   | `boolean` | `false`     |
| `htmlContent` | `html-content` | String containing html content for option                          | `string`  | `undefined` |
| `optionText`  | `option-text`  | If option is html and alternate text is needed for label           | `string`  | `undefined` |
| `selected`    | `selected`     | Flag to indicate if the option is selected or not. A tick is shown | `boolean` | `false`     |
| `value`       | `value`        | The Key associated with this select option                         | `string`  | `undefined` |


## Events

| Event        | Description | Type               |
| ------------ | ----------- | ------------------ |
| `fwSelected` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [fw-select](../select)
 - [fw-timepicker](../timepicker)

### Graph
```mermaid
graph TD;
  fw-select --> fw-select-option
  fw-timepicker --> fw-select-option
  style fw-select-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
