# Pill (fw-pill)

fw-pill displays an informational text component with icon.
<br>
Icon inside the pill must be set with attribute `slot="icon"` and it could either be `fw-icon` or customised with images or SVG icons as required.

## Demo

```html live
<fw-pill color="blue">
  <fw-icon name="info" slot="icon"></fw-icon>
  Response Received
</fw-pill>
<fw-pill color="red">
  <fw-icon name="alert" slot="icon"></fw-icon>
  Overdue
</fw-pill>
<fw-pill color="green">
  <fw-icon name="add-contact" slot="icon"></fw-icon>
  New
</fw-pill>
<fw-pill color="yellow">
  <fw-icon name="help" slot="icon"></fw-icon>
  Pending
</fw-pill>
<fw-pill color="grey">
  <fw-icon name="add-note" slot="icon"></fw-icon>
  Archived
</fw-pill>
```

### Styling Pills with custom icons or images

```html live
<fw-pill color="grey">
  <img src="/favicon.png" slot="icon" />
  Crayons custom icon
</fw-pill>
```

### Styling Pills with custom CSS

Pill can be customized with custom colors by using custom CSS properties listed further below in the page.

```html live
<fw-pill
  style="--fw-pill-background-color: #fff;--fw-pill-border: 1px solid gray;--fw-pill-padding: 4px 12px 4px 8px;"
>
  <fw-icon name="info" slot="icon"></fw-icon>
  Custom Styled Pill
</fw-pill>
```

## Usage

<code-group>
<code-block title="HTML">
```html
<fw-pill>
  <fw-icon name="internet" slot="icon"></fw-icon>
  Meta Information
</fw-pill>
<fw-pill color="blue">
  <fw-icon name="info" slot="icon"></fw-icon>
  Response Received
</fw-pill>
<fw-pill color="red">
  <fw-icon name="alert" slot="icon" ></fw-icon>
  Overdue
</fw-pill>
<fw-pill color="green">
  <fw-icon name="add-contact" slot="icon" ></fw-icon>
  New
</fw-pill>
<fw-pill color="yellow">
  <fw-icon name="help" slot="icon" ></fw-icon>
  Pending
</fw-pill>
<fw-pill color="grey">
  <fw-icon name="add-note" slot="icon" ></fw-icon>
  Archived
</fw-pill>
````
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwPill } from "@freshworks/crayons/react";
function App() {
  return (<div>
    <FwPill color="green">
      <FwIcon name="internet" slot="icon"></FwIcon>
      Meta Information
    </FwPill>
 </div>);
}
````

</code-block>
</code-group>

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                              | Type                                               | Default     |
| -------- | --------- | ---------------------------------------- | -------------------------------------------------- | ----------- |
| `color`  | `color`   | Theme based on which the pill is styled. | `"blue" \| "green" \| "grey" \| "red" \| "yellow"` | `undefined` |


## CSS Custom Properties

| Name                         | Description           |
| ---------------------------- | --------------------- |
| `--fw-pill-background-color` | Pill background color |
| `--fw-pill-border`           | Pill border           |
| `--fw-pill-border-radius`    | Pill border radius    |
| `--fw-pill-color`            | Pill color            |
| `--fw-pill-padding`          | Pill padding          |


----------------------------------------------

Built with ❤ at Freshworks
