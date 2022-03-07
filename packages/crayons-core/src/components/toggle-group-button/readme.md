# Toggle Group Button (fw-toggle-group-button)

fw-toggle-group-button displays a button on the user interface and enables performing specific actions based on the button type. This button can be used as a card or an icon button

## Demo

```html live
<section>
  <fw-label value="Icon button"></fw-label>
  <fw-toggle-group-button value="aa" type="icon">
    <fw-icon slot="toggle-icon" size="16" name="phone" />
  </fw-toggle-group-button>
  <fw-toggle-group-button value="dd" type="icon">
    <fw-icon slot="toggle-icon" size="16" name="delete" />
  </fw-toggle-group-button>
</section>

<br />

<section>
  <fw-label value="Card button"></fw-label>
  <fw-toggle-group-button
    header="Header A"
    description="This is a sample description of the card component."
    value="aa"
    is-checkbox
  ></fw-toggle-group-button>
</section>
```

## Usage

<code-group>
<code-block title="HTML">
```html 
        <fw-toggle-group-button
          header="Header A"
          description="This is a sample description of the card component."
          value="aa">
        </fw-toggle-group-button>
        <fw-toggle-group-button value="bb" type="icon">
          <fw-icon slot="toggle-icon" size="16" name="agent" />
        </fw-toggle-group-button>
````
</code-block>

<code-block title="React">
```jsx
    import React from "react";
    import ReactDOM from "react-dom";
    import { FWToggleGroupButton } from '@Freshworks/crayons/react'
    function App() {
    return (<div>
            <FWToggleGroupButton key="aa" value="aa" header="Header 1" description="This is a sample description 1" isCheckbox={true}/>
            <FWToggleGroupButton key="cc" value="cc" type="icon"><FwIcon slot="toggle-icon" size={16} name="agent" /></FWToggleGroupButton>
        </div>);
    }
````
</code-block>
</code-group>

<!-- Auto Generated Below -->


## Properties

| Property        | Attribute         | Description                                                                                                              | Type                           | Default           |
| --------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ----------------- |
| `baseClassName` | `base-class-name` | sets the default base class name and the rest of the class names for the other states are automatically appended to this | `string`                       | `'fw-card-radio'` |
| `description`   | `description`     | Label displayed as description in the card.                                                                              | `string`                       | `''`              |
| `disabled`      | `disabled`        | Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.               | `boolean`                      | `false`           |
| `header`        | `header`          | Label displayed as header in the card.                                                                                   | `string`                       | `''`              |
| `index`         | `index`           | index attached inside the parent group component                                                                         | `number`                       | `-1`              |
| `isCheckbox`    | `is-checkbox`     | Enables the component to be used as a part of multi selection group                                                      | `boolean`                      | `false`           |
| `name`          | `name`            | Name of the component, saved as part of the form data.                                                                   | `string`                       | `''`              |
| `selectable`    | `selectable`      | Enables the component to be used as a toggle button or just to be used as a normal button                                | `boolean`                      | `true`            |
| `selected`      | `selected`        | Sets the state to selected. If the attribute’s value is undefined, the value is set to false.                            | `boolean`                      | `false`           |
| `type`          | `type`            | sets the type of the button                                                                                              | `"card" \| "custom" \| "icon"` | `'card'`          |
| `value`         | `value`           | Identifier corresponding to the component, that is saved when the form data is saved.                                    | `string`                       | `''`              |


## Events

| Event       | Description                                   | Type               |
| ----------- | --------------------------------------------- | ------------------ |
| `fwToggled` | Triggered when the card in focus is selected. | `CustomEvent<any>` |


## Methods

### `setFocus() => Promise<void>`

Public method exposed to set the focus for the button component - to be used for accessibility

#### Returns

Type: `Promise<void>`




## CSS Custom Properties

| Name                                                   | Description                                                    |
| ------------------------------------------------------ | -------------------------------------------------------------- |
| `--fw-toggle-group-button-card-description-max-height` | maximum height for the description text.                       |
| `--fw-toggle-group-button-card-description-max-lines`  | maximum lines that can be displayed for description text.      |
| `--fw-toggle-group-button-card-height`                 | height of the content.                                         |
| `--fw-toggle-group-button-card-width`                  | width of the card.                                             |
| `--fw-toggle-group-button-icon-button-height`          | defines the height of the icon toggle button - default is 36px |
| `--fw-toggle-group-button-icon-button-width`           | defines the width of the icon toggle button - default is 42px  |


## Dependencies

### Depends on

- [fw-icon](../icon)

### Graph
```mermaid
graph TD;
  fw-toggle-group-button --> fw-icon
  fw-icon --> fw-toast-message
  fw-toast-message --> fw-spinner
  fw-toast-message --> fw-icon
  style fw-toggle-group-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
