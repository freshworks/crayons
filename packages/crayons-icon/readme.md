[![](https://data.jsdelivr.com/v1/package/npm/@freshworks/crayons-icon/badge)](https://www.jsdelivr.com/package/npm/@freshworks/crayons-icon)
# Icon Library (@freshworks/crayons-icon)

Crayons publishes `@freshworks/crayons-icon` as an Icon Library. Following features are made available to users via the Lib utils.

1. `Crayons` SVG Icons are also available as JS exports. Supports Tree-Shaking. This is a useful feature especially for customization purposes.
2. Enables `@freshworks/crayons-icon` CLI Interface via which you can leverage the SVGO Tooling to optimize your project svg-icons.
3. Optimized set of Crayons Icons in `dist` folder. You are free to use them for project related purposes.
4. Crayons Iconlib default `svgo` (svg compression util) config is available as part of dist folder. Refer usage docs on how to use it in your project.

[<img alt="Crayons Icon Assets" width="100%" src="docs/crayons-icon-cli/crayons-icon-assets.jpg" />]()

## Importing Icons from '@freshworks/crayons-icon' as Inline-SVGs. [ Supports Tree-Shaking ].

You can also import Crayons Icons as a JS Module.

1. HTML USAGE

```html
<html>
<head>
   <script type="module" src="https://unpkg.com/@freshworks/crayons@canary/dist/crayons/crayons.esm.js" ></script>
   <script type="module">
          import { header, add_contact, alert, add_note, check} from '@freshworks/crayons-icon';
   </script>
</head>   
<body>
      
      <fw-icon data-svg = { header } label = "Header" />
      <fw-icon data-svg = { add_contact } label = "Add-Contact" />
      <fw-icon data-svg = { alert } label = "Alert" />
      <fw-icon data-svg = { add_note } label = "Add-Note" />
      <fw-icon data-svg = { check } label = "Check" />

</body>
</html>
```

2. REACTJS USAGE

```js
import { FwIcon } from '@freshworks/crayons/react'; 
import { header, add_contact, alert, add_note, check} from '@freshworks/crayons-icon';

< FwIcon dataSvg = { header } label = "Header"/>
< FwIcon dataSvg = { add_contact } label = "Add-Contact"/>
< FwIcon dataSvg = { alert } label = "Alert"/>
< FwIcon dataSvg = { add_note } label = "Add-Note"/>
< FwIcon dataSvg = { check } label = "Check"/>

```

## CLI Tool for processing SVGs

`@freshworks/crayons-icon` is also available as a CLI Tool for processing SVGs with a friendlier interface, options and easily customizaable config to optimize your SVGs. See the usage below. 
It comes packed with a ultra tuned svgo-config. We support YML Config convention as its better in readability and easy to modify than a JSON. You may use the in-built CLI command to get the default YML File at your command root/ desired location, which you can further customize and use to optimze your SVGs via this CLI Tool. With `@freshworks/crayons-icon`, one also gets access to optimized `Crayons` Icons, available as part of `/dist` folder.You are free to use them for your project purposes.

Below is the list of Sample commands with Output.

[<img alt="Crayons Icon Assets" width="100%" src="docs/crayons-icon-cli/crayons-icon-cli-usage.jpg" />]()

----------------------------------------------

Built with ❤ at Freshworks
