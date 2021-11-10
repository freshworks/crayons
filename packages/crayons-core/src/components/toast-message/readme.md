# Toast Message (fw-toast-message)

Toast Message used internally by Toast component to render toast message.

## Demo

```html live
 <fw-toast-message id="type_toast" sticky=true type="success" content="success"></fw-toast-message>
 <fw-toast-message id="type_toast" sticky=true type="error" content="error"></fw-toast-message>
 <fw-toast-message id="type_toast" type="warning" content="warning"></fw-toast-message>
 <fw-toast-message id="type_toast" type="inprogress" content="inprogress"></fw-toast-message>
```

## Usage

<code-group>
<code-block title="HTML">
```html
 <fw-toast-message id="type_toast" sticky=true type="success" content="success"></fw-toast-message>
 <fw-toast-message id="type_toast" sticky=true type="error" content="error"></fw-toast-message>
 <fw-toast-message id="type_toast" type="warning" content="warning"></fw-toast-message>
 <fw-toast-message id="type_toast" type="inprogress" content="inprogress"></fw-toast-message>
```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwToastMessage } from "@freshworks/crayons/react";
function App() {
  return (<div>
        <FwToastMessage id="type_toast" sticky type="success" content="success"></FwToastMessage>
        <FwToastMessage id="type_toast" sticky type="error" content="error"></FwToastMessage>
        <FwToastMessage id="type_toast" type="warning" content="warning"></FwToastMessage>
        <FwToastMessage id="type_toast" type="inprogress" content="inprogress"></FwToastMessage>
    </div>);
}
```
</code-block>
</code-group>


<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                              | Type                                                | Default     |
| ---------------- | ------------------ | -------------------------------------------------------- | --------------------------------------------------- | ----------- |
| `actionLinkText` | `action-link-text` | The Content of the action link                           | `string`                                            | `''`        |
| `content`        | `content`          | The content to be diaplyed in toast                      | `string`                                            | `undefined` |
| `pauseOnHover`   | `pause-on-hover`   | Pause the toast from hiding on mouse hover               | `boolean`                                           | `undefined` |
| `sticky`         | `sticky`           | won't close automatically                                | `boolean`                                           | `false`     |
| `timeout`        | `timeout`          | Time duration of the toast visibility                    | `number`                                            | `4000`      |
| `type`           | `type`             | Type of the toast - success,failure, warning, inprogress | `"error" \| "inprogress" \| "success" \| "warning"` | `'warning'` |


## Events

| Event           | Description                                                                                                                  | Type               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `fwLinkClick`   | Triggered when the action link clicked.                                                                                      | `CustomEvent<any>` |
| `fwRemoveToast` | Triggered on closing the toast message. This event gets used by the parent container to remove the toast message from itself | `CustomEvent<any>` |


## Dependencies

### Used by

 - [fw-toast](../toast)

### Depends on

- [fw-spinner](../spinner)
- [fw-icon](../icon)

### Graph
```mermaid
graph TD;
  fw-toast-message --> fw-spinner
  fw-toast-message --> fw-icon
  fw-toast --> fw-toast-message
  style fw-toast-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
