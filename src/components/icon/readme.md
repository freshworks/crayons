# Icon (fw-icon)
fw-icon displays an icon-sized image that imparts meaning to the component it is associated with.
## Usage
1. Example of Multi-color SVG Logo
```html live
<fw-icon name="crayons-logo" size="" color="" ></fw-icon>
```
2. Below is an example of Animated SVG Icon
```html live
<fw-icon name="printing-threeD" size="88" color="" ></fw-icon>
```
3. Below is an example of Monochrome SVG Icon
```html live
<fw-icon name="add-note" size="78" color="grey" ></fw-icon>
```
### Icons

The following are the font-icons supported:
<IconGallery/>

<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                           | Type     | Default     |
| -------- | --------- | --------------------------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `color`  | `color`   | Color in which the icon is displayed, specified as a standard CSS color or as a HEX code.                             | `string` | `''`        |
| `name`   | `name`    | Identifier of the icon. The attribute’s value must be a valid svg file in the repo of icons (icon-assets/icons).      | `string` | `undefined` |
| `path`   | `path`    | Identifier of the icon. The attribute’s value must be a valid svg file path in the repo of icons (icon-assets/icons). | `string` | `''`        |
| `size`   | `size`    | Size of the icon, specified in number of  pixels.                                                                     | `number` | `12`        |


## CSS Custom Properties

| Name           | Description       |
| -------------- | ----------------- |
| `--icon-color` | Color of the icon |


----------------------------------------------

Built with ❤ at Freshworks
