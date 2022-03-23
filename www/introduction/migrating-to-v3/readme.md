# Migrating to v3


## What's new in v3

  * 18+ new components. 
  * Existing components have been modified to ensure they are more flexible and customisable by modifying `props` , `events` , `methods` and `css variables`.
  * Tree shakable bundle for components
  * Style customisation through CSS Variables
  * Framework Wrappers for [React](https://crayons.freshworks.com/frameworks/react)
  * Code samples in React for all the components
  * Set of CSS [utilities](https://crayons.freshworks.com/introduction/#adding-css-utils) to speed up development 
  * [i18n](https://crayons.freshworks.com/utilities/i18n) support
  * icon [library](https://crayons.freshworks.com/components/icon) with support for using external icons
  * a11y support
---  
<br>

## Migration Guide

The below covers some of the major breaking changes introduced in Crayons v3.  

To view the comprehensive list, check the breaking changes [guide](https://github.com/freshworks/crayons/BREAKING.md). There were several changes to property, events and CSS Variables that developers may need to be aware of.

---
  - [Global Styles](#global-styles)
  - [Input Control Events](#input-control-events)
  - [Usage via CDN](#usage-via-cdn)
  - [Usage via Node Modules](#usage-via-node-modules)


### Global Styles

Below are the changes w.r.t global css variables in v3

| Old Variable           | Status  | New Variable |
| ---------------------- | ------- | ------------ |
| --color-milk           | removed |              |
| --color-elephant-900   | removed |              |
| --color-elephant-800   | removed |              |
| --color-elephant-700   | removed |              |
| --color-elephant-600   | removed |              |
| --color-smoke-700      | removed |              |
| --color-smoke-300      | removed |              |
| --color-smoke-100      | removed |              |
| --color-smoke-50       | removed |              |
| --color-smoke-25       | removed |              |
| --color-jungle-800     | removed |              |
| --color-jungle-500     | removed |              |
| --color-jungle-100     | removed |              |
| --color-jungle-50      | removed |              |
| --color-azure-800      | removed |              |
| ---color-azure-100     | removed |              |
| --color-azure-50       | removed |              |
| --color-persimmon-900  | removed |              |
| --color-persimmon-800  | removed |              |
| --color-persimmon-100  | removed |              |
| --color-persimmon-50   | removed |              |
| --color-casablanca-700 | removed |              |
| --color-casablanca-300 | removed |              |
| --color-casablanca-100 | removed |              |
| --color-casablanca-50  | removed |              |
| --border-color         | removed |              |
| --border-success-color | removed |              |
| --border-info-color    | removed |              |
| --border-danger-color  | removed |              |
| --border-warning-color | removed |              |
| --bg-dark              | removed |              |
| --bg-success           | removed |              |
| --bg-info              | removed |              |
| --bg-danger            | removed |              |
| --bg-warning           | removed |              |
| --radius               | removed |              |
| --radius-small         | removed |              |
| --font-stack           | removed |              |
| --font-weight-300      | removed |              |
| --font-weight-400      | removed |              |
| --font-weight-500      | removed |              |
| --font-weight-600      | removed |              |
| --font-weight-700      | removed |              |
| --font-size-10         | removed |              |
| --font-size-12         | removed |              |
| --font-size-14         | removed |              |
| --font-size-16         | removed |              |
| --font-size-18         | removed |              |
| --font-size-20         | removed |              |
| --font-size-24         | removed |              |
| --text-default         | removed |              |
| --text-secondary       | removed |              |
| --text-success         | removed |              |
| --text-info            | removed |              |
| --text-danger          | removed |              |
| --text-warning         | removed |              |
| --text-link            | removed |              |
| --icon-primary         | removed |              |
| --icon-primary-hover   | removed |              |

To check about the css variables used in each components please check the official documentation page for the components [here](https://crayons.freshworks.com/components)

### Input Control Events

---

Below are the breaking changes in Input Control Events

- **fw-input**: `fwChange` event will no longer be emitted.
- **fw-textarea**: `fwChange` event will no longer be emitted.
- **fw-radio-group**: `fwChange` event will no longer be emitted on changing value programatically.
- **fw-checkbox**: `checked` field will be a part of meta field in the event detail for fwChange. Now it can be accessed using `event.detail.meta.checked` instead of `event.detail.checked`.
- **fw-select**: `selectedOptions` field will be a part of meta field in the event detail for `fwChange`. Now it can be accessed using `event.detail.meta.selectedOptions` instead of `event.detail.selectedOptions`.
- **fw-list-options**: `selectedOptions` field will now be part of meta field in the event detail for `fwChange`. Now it can be accessed using `event.detail.meta.selectedOptions` instead of `event.detail.selectedOptions`.

#### Usage via CDN
From your app’s root `html` file add the following scripts:

```html
<script
  type="module"
  src="https://unpkg.com/@freshworks/crayons@3/dist/crayons/crayons.esm.js">
</script>
<script
  nomodule
  src="https://unpkg.com/@freshworks/crayons@3/dist/crayons/crayons.js">
</script>
```

You can now use the Crayons components just like how you would use any other html element.

```html live
<fw-button color="secondary" onclick="alert('Button Clicked')">Get Started</fw-button>
```

You can use [UNPKG](https://unpkg.com/) to query specific versions in your app.

#### Usage via Node Modules
 - Install the package 
```bash
  npm install @freshworks/crayons@3 --save
```
 - Put a script tag similar to this 
```html
<script src='node_modules/@freshworks/crayons/dist/crayons.js'></script>
``` 
in the head of your index.html
 - Now you can use the element anywhere in your template, JSX, html etc.



