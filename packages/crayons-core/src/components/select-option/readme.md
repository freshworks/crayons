# Select Option (fw-select-option)

fw-select-option provides child elements for fw-select, to populate the Select component’s list or drop-down box with values. If fw-select-option is used without the value attribute, when the form data is saved, the value of fw-select is the selected option’s text.

## Usage

```html live
<fw-select-option selected="true">I am the chosen one</fw-select-option>
<fw-select-option html html-content="<b>Me, nein</b>"></fw-select-option>
<fw-select-option>I am another option</fw-select-option>
```

#### Variants

```html live
<fw-select-option text="Standard Variant"></fw-select-option>
<fw-select-option
  text="Standard Variant"
  sub-text="This is multiline element"
></fw-select-option>
<fw-select-option
  variant="checkbox"
  text="Checkbox Variant"
  sub-text="This is multiline checkbox element"
></fw-select-option>
```

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description                                                                                                                                                                                                                               | Type                               | Default      |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------ |
| `disabled`      | `disabled`       | Sets the state of the option to disabled. The selected option is disabled and greyed out. If the attribute’s value is undefined, the value is set to false.                                                                               | `boolean`                          | `false`      |
| `graphicsProps` | `graphics-props` | The props for the graphics variant. ex., icon props in case of graphicsType = 'icon'                                                                                                                                                      | `any`                              | `undefined`  |
| `groupName`     | `group-name`     | Used in grouped list, provides the group in which the option belongs                                                                                                                                                                      | `string`                           | `undefined`  |
| `html`          | `html`           | States that the option is an HTML value. If the attribute's value is undefined, the value is set to true.                                                                                                                                 | `boolean`                          | `false`      |
| `htmlContent`   | `html-content`   | HTML content that is displayed as the option.                                                                                                                                                                                             | `string`                           | `undefined`  |
| `isCheckbox`    | `is-checkbox`    | Place a checkbox.                                                                                                                                                                                                                         | `boolean`                          | `false`      |
| `optionText`    | `option-text`    | Alternate text displayed on the interface, in place of the actual HTML content.                                                                                                                                                           | `string`                           | `undefined`  |
| `selected`      | `selected`       | Sets the state of the option to selected. The selected option is highlighted and a check mark is displayed next to it. If the attribute’s value is undefined, the value is set to false.                                                  | `boolean`                          | `false`      |
| `subText`       | `sub-text`       | Second line text can be description etc.                                                                                                                                                                                                  | `string`                           | `undefined`  |
| `text`          | `text`           | The text to be displayed in the option.                                                                                                                                                                                                   | `string`                           | `undefined`  |
| `value`         | `value`          | Value corresponding to the option, that is saved  when the form data is saved.                                                                                                                                                            | `string`                           | `undefined`  |
| `variant`       | `variant`        | Standard is the default option without any graphics other options are icon and avatar which places either the icon or avatar at the beginning of the row. The props for the icon or avatar are passed as an object via the graphicsProps. | `"avatar" \| "icon" \| "standard"` | `'standard'` |


## Events

| Event        | Description                           | Type               |
| ------------ | ------------------------------------- | ------------------ |
| `fwSelected` | Triggered when an option is selected. | `CustomEvent<any>` |


## Methods

### `setFocus() => Promise<any>`



#### Returns

Type: `Promise<any>`




## Dependencies

### Used by

 - [fw-datepicker](../datepicker)
 - [fw-list-options](../options-list)
 - [fw-timepicker](../timepicker)

### Depends on

- [fw-icon](../icon)
- [fw-checkbox](../checkbox)

### Graph
```mermaid
graph TD;
  fw-select-option --> fw-icon
  fw-select-option --> fw-checkbox
  fw-datepicker --> fw-select-option
  fw-list-options --> fw-select-option
  fw-timepicker --> fw-select-option
  style fw-select-option fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
