
![Release](https://github.com/freshworks/crayons/workflows/Release/badge.svg) ![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square) ![NPM](https://img.shields.io/npm/l/@freshworks/crayons) ![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) ![npm](https://img.shields.io/npm/dm/@freshworks/crayons.svg) [![](https://data.jsdelivr.com/v1/package/npm/@freshworks/crayons/badge)](https://www.jsdelivr.com/package/npm/@freshworks/crayons)

# @freshworks/crayons

[Crayons](https://crayons.freshworks.com/) is a library of UI components that help create an intuitive and uniform user interface for all your apps. This collection of [Web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) helps developers build apps that adhere to the UX standards set by the Freshworks Design System.

These components are designed to be used in traditional frontend view libraries/frameworks or on their own through traditional JavaScript in the browser.


## Features

* Tiny, highly optimized components built with [Stencil](https://stenciljs.com/)
* No build or compiling required
* Simply add the static files to any project
* Tree shakable bundle for components
* Lazy-loaded components without configuration
* Style customisation through CSS Variables
* Framework Wrappers for React

## Usage

### HTML

Easiest way to start using Crayons is by adding a script tag to the CDN.
More details [here](https://crayons.freshworks.com/introduction/)
```html
<script
  type="module"
  src="https://unpkg.com/@freshworks/crayons/dist/crayons/crayons.esm.js">
</script>
<script
  nomodule
  src="https://unpkg.com/@freshworks/crayons/dist/crayons/crayons.js">
</script>
<link rel="stylesheet" href="https://unpkg.com/@freshworks/crayons/css/crayons-min.css">
```

Any Crayons component added to the webpage will automatically load. This includes writing the component tag directly in HTML, or using JavaScript such as `document.createElement('fw-button')`.
## Framework Bindings

The `@freshworks/crayons` package can be used in simple HTML, or by vanilla JavaScript without any framework at all. Crayons also provides framework bindings that make it easier to integrate Crayons into a framework such as **React**. (However, at the lowest-level framework bindings are still just using Crayons core and Web Components).

To use **React wrapper** use below:
```js
import { FwButton } from "@freshworks/crayons/react"
```
For more information please check [here](https://crayons.freshworks.com/frameworks/react)

### Naming Components
When generating components, the custom element tags is prefixed with `fw-` while the rest of the name is modified to support web component standards. For example, if a component is generated with the name Label, the component name would be `<fw-label>`.

## How to contribute

[Check out the CONTRIBUTE guide](../../CONTRIBUTING.md)

----------------------------------------------

Built with ❤ at Freshworks