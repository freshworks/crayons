# fw-button



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                            | Type                                   | Default       |
| ---------- | ---------- | ---------------------------------------------------------------------- | -------------------------------------- | ------------- |
| `color`    | `color`    | The theme of the button, Values are : `primary`, `secondary`, `danger` | `"danger" \| "primary" \| "secondary"` | `'secondary'` |
| `disabled` | `disabled` | Sets the button as disabled when set to true.                          | `boolean`                              | `false`       |
| `expand`   | `expand`   | Sets the button size to block when set to true.                        | `boolean`                              | `false`       |
| `size`     | `size`     | The size of the button, Values are : `normal`, `mini`                  | `"icon" \| "mini" \| "normal"`         | `'normal'`    |
| `type`     | `type`     | The native button type: values: `button`, `reset`, `submit`            | `"button" \| "reset" \| "submit"`      | `'button'`    |


## Events

| Event     | Description                           | Type                |
| --------- | ------------------------------------- | ------------------- |
| `fwBlur`  | Emitted when the checbox loses focus. | `CustomEvent<void>` |
| `fwClick` | Emitted when the button is clicked.   | `CustomEvent<void>` |
| `fwFocus` | Emitted when the checkbox has focus.  | `CustomEvent<void>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
