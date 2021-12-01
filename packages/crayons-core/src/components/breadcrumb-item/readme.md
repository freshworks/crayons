# fw-breadcrumb-item

Breadcrumb Items can be used inside [breadcrumb](../breadcrumb) to represent different links.

## Demo

```html live
<fw-breadcrumb-item>Home</fw-breadcrumb-item>
<fw-breadcrumb-item>About
    <fw-icon name="alert" slot="separator"></fw-icon>
</fw-breadcrumb-item>
<fw-breadcrumb-item>Contact</fw-breadcrumb-item>
<fw-breadcrumb-item>
    <fw-icon slot="prefix" name="help"></fw-icon>
    Help</fw-breadcrumb-item>
```

## Usage

<code-group>
<code-block title="HTML">
```html
<fw-breadcrumb-item>Home</fw-breadcrumb-item>
<fw-breadcrumb-item>About
    <fw-icon name="alert" slot="separator"></fw-icon>
</fw-breadcrumb-item>
<fw-breadcrumb-item>Contact</fw-breadcrumb-item>
<fw-breadcrumb-item>Help</fw-breadcrumb-item>
```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwBreadcrumbItem, FwIcon } from "@freshworks/crayons/react";
function App() {
  return (<div>
    <FwBreadcrumbItem>Home</FwBreadcrumbItem>
    <FwBreadcrumbItem>About
        <FwIcon name="alert" slot="separator"></FwIcon>
    </FwBreadcrumbItem>
    <FwBreadcrumbItem>Contact</FwBreadcrumbItem>
    <FwBreadcrumbItem>Help</FwBreadcrumbItem>
  </div>)
}
```
</code-block>
</code-group>


<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                                                                     | Type                                         | Default                 |
| -------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------------------- |
| `href`   | `href`    | Optional URL to direct the user to when the breadcrumb item is clicked. When set, a link will be rendered. If it is not set, a button will be rendered instead. | `string`                                     | `undefined`             |
| `rel`    | `rel`     | The `rel` attribute to use on the link. Only used when `href` is set.                                                                                           | `string`                                     | `'noreferrer noopener'` |
| `target` | `target`  | Link target options. Only used when `href` is set.                                                                                                              | `"_blank" \| "_parent" \| "_self" \| "_top"` | `undefined`             |


## Shadow Parts

| Part          | Description |
| ------------- | ----------- |
| `"base"`      |             |
| `"label"`     |             |
| `"prefix"`    |             |
| `"separator"` |             |
| `"suffix"`    |             |


----------------------------------------------

Built with ❤ at Freshworks
