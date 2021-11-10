# Button1 (fw-button1)
Compound component using fw-label from core

## Demo

```html live
<section>
<fw-label value="Try Compound Components"></fw-label>
<fw-button1 color="secondary"> OK </fw-button1>
<fw-button1 color="danger"> Don't Click </fw-button1>
<fw-button1 color="link"> Link Button </fw-button1>
<fw-button1 color="text"> Plain Text Button </fw-button1>
</section>
```

## Usage

<code-group>
<code-block title="HTML">
```html 
<section>
<fw-label value="Try Compound Components"></fw-label>
<fw-button1 color="secondary"> OK </fw-button1>
<fw-button1 color="danger"> Don't Click </fw-button1>
<fw-button1 color="link"> Link Button </fw-button1>
<fw-button1 color="text"> Plain Text Button </fw-button1>
</section>
```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwButton1 } from "@freshworks/crayons-datatable/react";
function App() {
  return (<div>
  <section>
    <label>Try Compound Components</label>
    <FwButton1 color="secondary"> OK </FwButton1>
    <FwButton1 color="danger"> Don't Click </FwButton1>
    <FwButton1 color="link"> Link Button </FwButton1>
    <FwButton1 color="text"> Plain Text Button </FwButton1>
</section>
  </div>)
}
```
</code-block>
</code-group>

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                                                              | Type                                                       | Default     |
| ---------------- | ------------------ | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `color`          | `color`            | Identifier of  the theme based on which the button is styled.                                            | `"danger" \| "link" \| "primary" \| "secondary" \| "text"` | `'primary'` |
| `disabled`       | `disabled`         | Disables the button on the interface. If the attribute’s value is undefined, the value is set to false.  | `boolean`                                                  | `false`     |
| `expand`         | `expand`           | Sets the button to a full-width block. If the attribute’s value is undefined, the value is set to false. | `boolean`                                                  | `false`     |
| `modalTriggerId` | `modal-trigger-id` | Accepts the id of the fw-modal component to open it on click                                             | `string`                                                   | `''`        |
| `size`           | `size`             | Size of the button.                                                                                      | `"mini" \| "normal" \| "small"`                            | `'normal'`  |
| `type`           | `type`             | Button type based on which actions are performed when the button is clicked.                             | `"button" \| "reset" \| "submit"`                          | `'button'`  |


## Events

| Event     | Description                                 | Type                |
| --------- | ------------------------------------------- | ------------------- |
| `fwBlur`  | Triggered when the button loses focus.      | `CustomEvent<void>` |
| `fwClick` | Triggered when the button is clicked.       | `CustomEvent<void>` |
| `fwFocus` | Triggered when the button comes into focus. | `CustomEvent<void>` |


## Dependencies

### Depends on

- fw-label

### Graph
```mermaid
graph TD;
  fw-button1 --> fw-label
  style fw-button1 fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
