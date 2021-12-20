# Icon (fw-icon)

"fw-icon/FwIcon" is a renderer of SVG file that displays an icon-sized image that imparts meaning to the HTML component it is associated with.
Following features are available as part of the implementation of the fw-icon.

1. Enable fw-icon as an optimized renderer for SVG with built-in functions such as Intersection-Observer and Fetch-API Memoization.
   Go through the docs to understand the various props it supports.
2. Providing icon-support for crayons-system components and also exposing crayons-icon set for public use with inbuilt support for external icon-libraries also.
3. Icons can convey all sorts of semantic meaningful information rather than just being decorational. In order to keep icons on the accessibility tree, just 
   pass the 'label' props and fw-icon handles the assistive sr-compliance.

## Examples Live

```html live
<fw-icon name="twitter" size=18 color="blue" ></fw-icon>
<fw-icon name="feather" src = "https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/icons" size=18 color="blue" ></fw-icon>
```

## Usage in Code

<code-group>
<code-block title="HTML">
```html 
<fw-icon name="add-contact" size=18 color="green" ></fw-icon>
```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwIcon } from "@freshworks/crayons/react";
function App() {
  return (<div>
  <FwIcon name="add-contact" size={18} color="green" ></FwIcon>
 </div>);
}
```
</code-block>

<code-block title="Using Intersection Observer">
```html 
HTML
<fw-icon name="add-contact" size=18  color="green" x-root-margin = "80px" lazy ></fw-icon>
<fw-icon name="add-contact" size=18  color="green" lazy ></fw-icon>
React
<FwIcon  name="add-contact" size={18}  color="green" xRootMargin = "80px" lazy></FwIcon>
```
</code-block>
</code-group>

### Intersection Observer

Use prop 'lazy' to enable Intersection-Observer. By default it is disabled. You may choose to give the intersection root-margin for icons i.e via prop 'x-root-margin' as preloading threshold.Default value is '50px'.

## Crayons Icon Assets 

The following icons are presently part of the Crayons-Icon library. These are optimized using SVGO.
Use the name of an icon as listed below it.For JS Imports, you may also click to copy the imports.

<IconGallery/>

# Icon Library (@freshworks/crayons-icon)

Crayons Icon is now available as '@freshworks/crayons-icon' Library. This encapsulates all Icon Tooling icon exports. Following is implemented via the Lib.

1. JS Exports of SVG Icon to enable Tree-Shaking for inline-svg. This is a useful feature where you can choose to do something offline with SVGs.
2. Enable Crayons-Icon lib to support external icon libraries. You can register/unregister external icon libraries and also apply mutation to all/selected icons. 
   See usage docs.

Some implementations via Icon Lib are as below:-

## Importing Icons from '@freshworks/crayons-icon' as Inline-SVGs. Supports Tree-Shaking.

We may also import Crayons Icons from '@freshworks/crayons-icon'. These are in form of JS Exports. This helps you to use inline SVG with Tree-Shakeable Imports
This way, you may choose to alter the SVG data and push it for re-render as per your project needs.

<code-group>
<code-block title="HTML">
```html 
<html>
<head>
<script type="module" src="https://unpkg.com/@freshworks/crayons@canary/dist/crayons/crayons.esm.js" ></script>
<script type="module" >
import { header } from '@freshworks/crayons-icon';
</script>
</head>
<body>
    <fw-icon data-svg={ header } size=20 ></fw-icon>
</body>
</html>

```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwIcon } from "@freshworks/crayons/react";
import { header } from '@freshworks/crayons-icon';

function App() {
  return (<div>
  <FwIcon dataSvg={ header } size=20 ></FwIcon>
 </div>);
}
```
</code-block>
</code-group>


### Example: Rendered in Sample Page as Component 

<IconTSExportsShowcase/>


## FwIcon as a Renderer for external icons.

fw-icon can also render external icons. You can use any external libraries from cdn after registering them. If you don't pass 'library' props,
it will default to 'crayons'. You can even pass the CDN URL of SVG to 'src' prop. See the example below on how to use in React App.

The library registration happens via a 'resolver' function. If you wish to apply some mutation to the icons , you may choose to pass the mutator function.

### Usage in HTML/React Page
<code-group>
<code-block title="HTML">
``` html
<html>
<head>
<script type="module" src="https://unpkg.com/@freshworks/crayons@canary/dist/crayons/crayons.esm.js" ></script>
<script type="module" >
import { registerIconLibrary } from 'https://unpkg.com/@freshworks/crayons@canary/dist/crayons/index.esm.js';
registerIconLibrary('feather', {
        resolver: (name) => `https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/icons/${name}.svg`,
        mutator: (svg,name) => (name==='feather') ? svg.setAttribute('fill', 'currentColor') : false
});
</script>
</head>
<body>
    <fw-icon name="alert" color="red" size=30 ></fw-icon>
    <fw-icon name="feather" library="feather" color="red" size=30 ></fw-icon>
</body>
</html>
```
</code-block>

<code-block title="React">
``` jsx
import React from 'react';
import './App.css';
import { add_contact } from '@freshworks/crayons-icon';
import { FwIcon, registerIconLibrary, unregisterIconLibrary } from '@freshworks/crayons/react';

registerIconLibrary('feather', {
        resolver: (name) => `https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/icons/${name}.svg`,
        mutator: (svg,name) => (name==='feather') ? svg.setAttribute('fill', 'currentColor') : false
        
});
registerIconLibrary('heroicons', {
        resolver: (name) => `https://cdn.jsdelivr.net/npm/heroicons@0.4.2/outline/${name}.svg`,
        mutator: (svg,name) => svg.setAttribute('fill', 'currentColor')
});

unregisterIconLibrary('heroicons');

function App() {

    return ( 
        <div >
            <div >
                <FwIcon name = "feather"
                        library="feather"
                        color = 'red' 
                />
                <FwIcon name = "alert"
                        color = 'blue'
                        width = {20}
                        height = {20} 
                />
                <FwIcon dataSvg = { add_contact }
                        color = 'blue'
                        size = {30}
                />
                <FwIcon name = "feather"
                        src = "https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/icons"
                        color = 'blue'
                        size = {30} 
                />
            </div> 
        </div>
    );
}
export default App;
```
</code-block>
</code-group>


<!-- Auto Generated Below -->


## Properties

| Property      | Attribute       | Description                                                                                                                                                           | Type      | Default     |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| `color`       | `color`         | Color in which the icon is displayed, specified as a standard CSS color or as a HEX code.                                                                             | `string`  | `''`        |
| `dataSvg`     | `data-svg`      | Identifier of the icon. The attribute’s value must be a valid JS Import Name of the svg in the named export from @freshworks/crayons-icon.                            | `string`  | `''`        |
| `height`      | `height`        | Height of the icon, specified in number of  pixels.                                                                                                                   | `number`  | `undefined` |
| `label`       | `label`         | An alternate description to use for accessibility. If omitted, the icon will be ignored by assistive devices.                                                         | `string`  | `undefined` |
| `lazy`        | `lazy`          | Enable Intersection Observer. Default is false.                                                                                                                       | `boolean` | `false`     |
| `library`     | `library`       | Name of External Library to be used                                                                                                                                   | `string`  | `'crayons'` |
| `name`        | `name`          | Identifier of the icon. The attribute’s value must be a valid svg Name in the Crayons-Icon set.                                                                       | `string`  | `undefined` |
| `size`        | `size`          | Size of the icon, specified in number of  pixels. This will be square coordinates of (w X h) = size X size                                                            | `number`  | `undefined` |
| `src`         | `src`           | Identifier of the icon. The attribute’s value must be a valid path to svg file.                                                                                       | `string`  | `undefined` |
| `width`       | `width`         | Width of the icon, specified in number of  pixels.                                                                                                                    | `number`  | `undefined` |
| `xRootMargin` | `x-root-margin` | Root Margin in px or percentage for Intersection-Observer. This means from ref to bottom of loaded view , the item loads when it crosses above the negative y margin. | `string`  | `'50px'`    |


## CSS Custom Properties

| Name           | Description       |
| -------------- | ----------------- |
| `--icon-color` | Color of the icon |
| `--icon-size`  | Size of the icon  |


## Dependencies

### Used by

 - [fw-accordion-title](../accordion-title)
 - [fw-button](../button)
 - [fw-dropdown-button](../dropdown-button)
 - [fw-inline-message](../inline-message)
 - [fw-input](../input)
 - [fw-modal](../modal)
 - [fw-modal-title](../modal-title)
 - [fw-pagination](../pagination)
 - [fw-select](../select)
 - [fw-select-option](../select-option)
 - [fw-tag](../tag)
 - [fw-toast-message](../toast-message)
 - [fw-toggle](../toggle)
 - [fw-toggle-group-button](../toggle-group-button)

### Depends on

- [fw-toast-message](../toast-message)

### Graph
```mermaid
graph TD;
  fw-icon --> fw-toast-message
  fw-toast-message --> fw-icon
  fw-accordion-title --> fw-icon
  fw-button --> fw-icon
  fw-dropdown-button --> fw-icon
  fw-inline-message --> fw-icon
  fw-input --> fw-icon
  fw-modal --> fw-icon
  fw-modal-title --> fw-icon
  fw-pagination --> fw-icon
  fw-select --> fw-icon
  fw-select-option --> fw-icon
  fw-tag --> fw-icon
  fw-toggle --> fw-icon
  fw-toggle-group-button --> fw-icon
  style fw-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
