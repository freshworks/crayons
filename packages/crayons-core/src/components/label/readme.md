# Label (fw-label)
fw-label displays an informational text component that identifies other components on the user interface. 

## Demo

```html live
<fw-label value="Meta Information"></fw-label>
<fw-label value="Response Received" color="blue"></fw-label>
<fw-label value="Overdue" color="red"></fw-label>
<fw-label value="New" color="green"></fw-label>
<fw-label value="Pending" color="yellow"></fw-label>
<fw-label value="Archived" color="grey"></fw-label>
```

## Usage

<code-group>
<code-block title="HTML">
```html 
<fw-label value="Meta Information"></fw-label>
<fw-label value="Response Received" color="blue"></fw-label>
<fw-label value="Overdue" color="red"></fw-label>
<fw-label value="New" color="green"></fw-label>
<fw-label value="Pending" color="yellow"></fw-label>
<fw-label value="Archived" color="grey"></fw-label>
```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwLabel } from "@freshworks/crayons/react";
function App() {
  return (<div>
    <FwLabel value="Meta Information"></FwLabel>
    <FwLabel value="Response Received" color="blue"></FwLabel>
    <FwLabel value="Overdue" color="red"></FwLabel>
    <FwLabel value="New" color="green"></FwLabel>
    <FwLabel value="Pending" color="yellow"></FwLabel>
    <FwLabel value="Archived" color="grey"></FwLabel>
 </div>);
}
```
</code-block>
</code-group>




<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                               | Type                                                           | Default    |
| -------- | --------- | ----------------------------------------- | -------------------------------------------------------------- | ---------- |
| `color`  | `color`   | Theme based on which the label is styled. | `"blue" \| "green" \| "grey" \| "normal" \| "red" \| "yellow"` | `'normal'` |
| `value`  | `value`   | Display text in the label.                | `string`                                                       | `''`       |


## CSS Custom Properties

| Name                            | Description                    |
| ------------------------------- | ------------------------------ |
| `--fw-label-padding-horizontal` | Left - right padding for label |
| `--fw-label-padding-vertical`   | Top - bottom padding for label |


----------------------------------------------

Built with ❤ at Freshworks
