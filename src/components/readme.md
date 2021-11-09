# Overview

Freshworks Crayons Icons is a library of SVG Icons to help create an uniform icon usage and tooling for all your apps.Icon library helps you to use standard icons as web-components and provides an awesome tooling to manage your svg icons in any app in an effective manner.Concepts like Tree Shaking, Code Splitting are well supported by the library. The SVGs are optmized and every icon supports Icon-Cache and Intersection Observer which makes loading of icons perfromant and putting minimal load on your app

# Getting Started
#### Usage via CDN
From your app’s root directory navigate to the **app > template.html** file and add the following scripts:

```html
<script
  type="module"
  src="https://unpkg.com/@freshworks/crayons/dist/crayons-icons/crayons-icons.esm.js">
</script>
<script
  nomodule
  src="https://unpkg.com/@freshworks/crayons/dist/crayons-icons/crayons-icons.js">
</script>
```

You can now use the Crayons Icons just like how you would use any other html element.

```html live
<fw-icon name="crayons-logo" size="268" color="blue" ></fw-icon>
```

You can use [UNPKG](https://unpkg.com/) to query specific versions in your app.

#### Usage via Node Modules
 - Install the package 
```bash
  npm install @freshworks/fw-crayons-icons --save
```
 - Put a script tag similar to this 
```html
<script src='node_modules/@freshworks/crayons-icons/dist/crayons-icons.js'></script>
``` 
in the head of your index.html
 - Now you can use the element anywhere in your template, JSX, html etc.
