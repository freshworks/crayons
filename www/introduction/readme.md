# Overview

Freshworks Crayons is a library of UI components that are the building blocks to help create an intuitive and uniform user interface for all your apps. Crayons helps developers build apps that adhere to the UX standards set by the Freshworks Design System.

## Features

* Tiny, highly optimized **30+** web components built with [Stencil](https://stenciljs.com/)
* No build or compiling required
* Simply add the static files to any project
* Tree shakable bundle for components
* Lazy-loaded components without configuration
* Style customisation through CSS Variables
* Framework Wrappers for [React](https://crayons.freshworks.com/frameworks/react)
* Set of CSS [utilities](https://crayons.freshworks.com/introduction/#adding-css-utils) to speed up development 
* [i18n](https://crayons.freshworks.com/utilities/i18n) support
* icon [library](https://crayons.freshworks.com/components/icon) with support for using external icons

## Installation
By default the `latest` major version of `Crayons` will be installed. If you want to install any specific version of `Crayons` please use `crayons@version`

## Getting Started

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

## Framework Bindings

The `@freshworks/crayons` package can be used in simple HTML, or by vanilla JavaScript without any framework at all. `Crayons v3` also provides framework bindings that make it easier to integrate Crayons into a framework such as **React**. (However, at the lowest-level framework bindings are still just using Crayons core and Web Components).

To use **React wrapper** use below:
```js
import { FwButton } from "@freshworks/crayons/react"
```
For more information please check [here](https://crayons.freshworks.com/frameworks/react)


## Adding CSS Utils

`Crayons v3` also provides a set of CSS utilities to help with application development. You can use these utils by adding 'crayons-min.css' file in your app. 

#### Usage via Node Modules
```html
<link rel="stylesheet" href="node_modules/@freshworks/crayons/css/crayons-min.css">
```
#### Usage via CDN
```html
<link rel="stylesheet" href="https://unpkg.com/@freshworks/crayons@3/css/crayons-min.css">
```

> Note: CSS utils are optional. Crayons can be used without including crayons-min.css.

## Why Web Components?

All the crayons components are built as web compponents.

Web components provides a way to create our own HTML elements and use them in any framework.

With every growing popularity of frameworks such as React, Vue, Angular component driven development has become a need. Components help us encapsulate styles and behaviors into reusable blocks. 

Drawbacks with Framework specific components:

  - The components can only be used in their specific framework.
  - Any new framework or version changes can lead to breaking changes and require substantial effort to update the components.
  - Web components solve these problems. 
    - They're supported by all modern browsers.
    - They're framework agnostic.
    - They're a part of the web standard. 
