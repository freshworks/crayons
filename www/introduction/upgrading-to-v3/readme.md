# Upgrading to v3

Follow this guide to upgrade your apps from Crayons v2 to Crayons v3.

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
