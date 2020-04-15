# Overview

Freshworks Crayons is a library of UI components that are the building blocks to help create an intuitive and uniform user interface for all your apps. Crayons leverages the custom CSS properties to provide a default theme and style for the components. The default theme is to provide uniformity across all apps built for the Freshworks Marketplace. You can customize the CSS properties to build apps that are aligned with your design needs.

# Getting Started

#### Usage via CDN
From your app’s root directory navigate to the **app > template.html** file and add the following scripts:

```html
<script
  type="module"
  src="https://unpkg.com/@freshworks/crayons/dist/crayons/crayons.esm.js">
</script>
<script
  nomodule
  src="https://unpkg.com/@freshworks/crayons/dist/crayons/crayons.js">
</script>
```

You can now use the Crayons components just like how you would use any other html element.

```html live
<fw-button color="secondary" onClick="alert('Button Clicked')">Get Started</fw-button>
```

You can use [UNPKG](https://unpkg.com/) to query specific versions in your app.

#### Usage via Node Modules
 - Install the package 
```bash
  npm install @freshworks/crayons --save
```
 - Put a script tag similar to this 
```html
<script src='node_modules/@freshworks/crayons/dist/crayons.js'></script>
``` 
in the head of your index.html
 - Now you can use the element anywhere in your template, JSX, html etc.