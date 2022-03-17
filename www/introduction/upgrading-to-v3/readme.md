# Upgrading to v3


### What's new in v3

  * 18+ new components. 
  * Existing components have been modified to ensure they are more flexible and customisable by modifying `props` , `events` , `methods` and `css variables`.
  * Tree shakable bundle for components
  * Style customisation through CSS Variables
  * Framework Wrappers for [React](https://crayons-v3.netlify.app/frameworks/react)
  * Code samples in React for all the components
  * Set of CSS [utilities](https://crayons-v3.netlify.app/introduction/#adding-css-utils) to speed up development 
  * [i18n](https://crayons-v3.netlify.app/utilities/i18n) support
  * icon [library](https://crayons-v3.netlify.app/components/icon) with support for using external icons
  * a11y support
---  
<br>


Follow this guide to upgrade your apps to Crayons v3.
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

## Breaking Changes Guide

To know more about the breaking changes, check the breaking changes [guide](https://github.com/freshworks/crayons/BREAKING.md).There were several changes to property, events and CSS Variable values that developers may need to be aware of.
