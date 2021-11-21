# Tab (fw-tab)

fw-tab provides child elements for fw-tabs, to enable tab style navigation.


## Demo

```html live
  <fw-tab>Personal</fw-tab>
  <fw-tab>Official</fw-tab>
```

## Usage

<code-group>
<code-block title="HTML">
```html 
  <fw-tab>Personal</fw-tab>
  <fw-tab>Official</fw-tab>
```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwTab } from "@freshworks/crayons/react";
function App() {
  return (<div>
          <FwTab>Personal</FwTab>
          <FwTab>Official</FwTab>
    </div>);
}
```
</code-block>
</code-group>
<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description                                        | Type      | Default     |
| ----------- | ------------ | -------------------------------------------------- | --------- | ----------- |
| `active`    | `active`     | Determines whether the tab is active.              | `boolean` | `undefined` |
| `disabled`  | `disabled`   | Disables this tab                                  | `boolean` | `undefined` |
| `panel`     | `panel`      | The name of the tab panel which this tab controls. | `string`  | `undefined` |
| `tabHeader` | `tab-header` | Header for the tab to be displayed.                | `string`  | `undefined` |
| `tabName`   | `tab-name`   | Unique name of the tab.                            | `string`  | `undefined` |


----------------------------------------------

Built with ❤ at Freshworks
