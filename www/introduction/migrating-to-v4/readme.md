# Migrating to v4

## What's new in v4

- Date Time Picker Component.

<br>

## Migration Guide

The below covers some of the major breaking changes introduced in Crayons v4.

To view the comprehensive list, check the breaking changes [guide](https://github.com/freshworks/crayons/blob/master/BREAKING.md).

---

- [Datepicker](#datepicker)
- [Tabs](#tabs)

#### Datepicker

`fw-datepicker`: changed the default value of format from `hh:mm a` to `locale based format`. min and max time will be based on locale time format

#### Tabs

- CSS Variables

  Below are the changes w.r.t CSS variables

  | Old Variable            | Status  | New Variable                                                                                                                                   |
  | ----------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
  | --fw-tabs-margin-l      | renamed | --fw-tabs-margin-inline-start (Left margin if direction is left-to-right, and Right margin if direction is right-to-left for the tab items)    |
  | --fw-tabs-margin-r      | renamed | --fw-tabs-margin-inline-end (Right margin if direction is left-to-right, and Left margin if direction is right-to-left for the tab items)      |
  | --fw-tabs-padding-left  | renamed | --fw-tabs-padding-inline-start (Left padding if direction is left-to-right, and Right padding if direction is right-to-left for the tab items) |
  | --fw-tabs-padding-right | renamed | --fw-tabs-padding-inline-end (Right padding if direction is left-to-right, and Left padding if direction is right-to-left for the tab items)   |

#### Usage via CDN

From your app’s root `html` file add the following scripts:

```html
<script
  type="module"
  src="https://unpkg.com/@freshworks/crayons@v4/dist/crayons/crayons.esm.js"
></script>
<script
  nomodule
  src="https://unpkg.com/@freshworks/crayons@v4/dist/crayons/crayons.js"
></script>
```

You can now use the Crayons components just like how you would use any other html element.

```html live
<fw-button color="secondary" onclick="alert('Button Clicked')"
  >Get Started</fw-button
>
```

You can use [UNPKG](https://unpkg.com/) to query specific versions in your app.

#### Usage via Node Modules

- Install the package

```bash
  npm install @freshworks/crayons@v4 --save
```

- Put a script tag similar to this

```html
<script src="node_modules/@freshworks/crayons/dist/crayons/crayons.js"></script>
<script
  type="module"
  src="node_modules/@freshworks/crayons/dist/crayons/crayons.esm.js"
></script>
```

in the head of your index.html

- Now you can use the element anywhere in your template, JSX, html etc.
