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


## CSS Custom Properties

| Name                           | Description                                            |
| ------------------------------ | ------------------------------------------------------ |
| `--fw-tab-background`          | background color of the tab item.                      |
| `--fw-tab-background-active`   | background of the tab item when tab is active.         |
| `--fw-tab-border-color`        | border color of the tab item.                          |
| `--fw-tab-border-color-active` | border color of the tab item when tab is active.       |
| `--fw-tab-border-color-hover`  | border color of the tab item on hover.                 |
| `--fw-tab-border-size`         | size of the border bottom.                             |
| `--fw-tab-color`               | color of the text inside tab.                          |
| `--fw-tab-color-active`        | color of the text inside tab when tab is active.       |
| `--fw-tab-margin-lr`           | margin left-right of the tab item.                     |
| `--fw-tab-margin-tb`           | margin top/bottom of the tab item.                     |
| `--fw-tab-padding-lr`          | padding left/right for the tab item.                   |
| `--fw-tab-padding-tb`          | padding top/bottom for tab item.                       |
| `--fw-tab-top-radius`          | top left/right radius of the tab item.                 |
| `--fw-tab-weight`              | font weight of the text inside tab.                    |
| `--fw-tab-weight-active`       | font weight of the text inside tab when tab is active. |


----------------------------------------------

Built with ❤ at Freshworks
