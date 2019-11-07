# fw-input



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                                                                                                                                                                      | Type                               | Default     |
| -------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------- |
| `autocomplete` | `autocomplete` | Indicates whether the value of the control can be automatically completed by the browser.                                                                                        | `"off" \| "on"`                    | `'off'`     |
| `clearInput`   | `clear-input`  | If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input.                                                                            | `boolean`                          | `false`     |
| `disabled`     | `disabled`     | Disabled                                                                                                                                                                         | `boolean`                          | `false`     |
| `label`        | `label`        | The type of control to display. The default type is text.                                                                                                                        | `string`                           | `''`        |
| `maxlength`    | `maxlength`    | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter. | `number`                           | `undefined` |
| `minlength`    | `minlength`    | If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter. | `number`                           | `undefined` |
| `name`         | `name`         | The name of the control, which is submitted with the form data.                                                                                                                  | `string`                           | `""`        |
| `pattern`      | `pattern`      | If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input.                                                                            | `string`                           | `''`        |
| `placeholder`  | `placeholder`  | Instructional text that shows before the input has a value.                                                                                                                      | `string`                           | `undefined` |
| `readonly`     | `readonly`     | If `true`, the user cannot modify the value.                                                                                                                                     | `boolean`                          | `false`     |
| `required`     | `required`     | If `true`, the user must fill in a value before submitting a form.                                                                                                               | `boolean`                          | `false`     |
| `state`        | `state`        | The type of control to display. The default type is text.                                                                                                                        | `"error" \| "normal" \| "warning"` | `'normal'`  |
| `stateText`    | `state-text`   | Hint                                                                                                                                                                             | `string`                           | `''`        |
| `type`         | `type`         | The type of control to display. The default type is text.                                                                                                                        | `string`                           | `'text'`    |
| `value`        | `value`        | The value of the input.                                                                                                                                                          | `string`                           | `''`        |


## Events

| Event      | Description | Type                         |
| ---------- | ----------- | ---------------------------- |
| `fwBlur`   |             | `CustomEvent<void>`          |
| `fwChange` |             | `CustomEvent<any>`           |
| `fwFocus`  |             | `CustomEvent<void>`          |
| `fwInput`  |             | `CustomEvent<KeyboardEvent>` |


## Methods

### `getInputElement() => Promise<HTMLInputElement>`

Returns the native `<input>` element used under the hood.

#### Returns

Type: `Promise<HTMLInputElement>`



### `setFocus() => Promise<void>`

Sets focus on the specified `ion-input`. Use this method instead of the global
`input.focus()`.

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
