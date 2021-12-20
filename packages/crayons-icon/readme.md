[![](https://data.jsdelivr.com/v1/package/npm/@freshworks/crayons-icon/badge)](https://www.jsdelivr.com/package/npm/@freshworks/crayons-icon)
# Icon Library (@freshworks/crayons-icon)

**Freshworks Crayons** publishes `@freshworks/crayons-icon` as an `Icon Library`. Following features are made available to users via the Lib utils.

1. Optimized set of Crayons Icons in `dist/icons` path. You are free to use them for project related purposes.
2. `Crayons` SVG Icons are also available as an esm module. Supports Tree-Shaking. This is a useful feature especially for customization purposes.
3. Enables `@freshworks/crayons-icon` CLI Interface via which you can leverage the SVGO Tooling to optimize your project svg-icons.
4. Crayons Iconlib default `svgo config` (svg compression util) is available as part of `dist` folder. Refer usage docs on how to use it in your project.

<details> 
  <summary>Click to see the List of Icon Assets available as part of Repo.</summary>
   <img alt="Crayons Icon Assets" width="100%" src="docs/crayons-icon-cli/crayons-icon-assets.jpg" />
</details>

## Importing Icons from '@freshworks/crayons-icon'. [ Supports Tree-Shaking ].

You can also import Crayons Icons as an esm Module.

1. HTML USAGE

```html
<html>
<head>
   <script type="module" src="https://unpkg.com/@freshworks/crayons@canary/dist/crayons/crayons.esm.js" ></script>
   <script type="module">
        import { header, add_contact } from '@freshworks/crayons-icon';
   </script>
</head>   
<body>
      <div>
        <fw-icon data-svg={ header }  label="Header" />
        <fw-icon data-svg={ add_contact }  label="Add-Contact" />
      </div>
</body>
</html>
```

2. REACTJS USAGE

```js
import React from 'react';
import { FwIcon } from '@freshworks/crayons/react'; 
import { header, add_contact } from '@freshworks/crayons-icon';

function App() {
    return ( 
        <div>
            <FwIcon dataSvg={ header }  label="Header"/>
            <FwIcon dataSvg={ add_contact }  label="Add-Contact"/>
        </div>
    );
}
export default App;
```

## CLI Tool for processing SVGs

`@freshworks/crayons-icon` is also available as a CLI Tool for processing SVGs with a friendlier interface, options and easily customizable config to optimize your SVGs. See the usage below. 
It comes packed with a ultra tuned svgo-config. We support YML Config convention as its better in readability and easy to modify than a JSON. You may use the in-built CLI command to get the default YML File at your command root/ desired location, which you can further customize and use to optimze your SVGs via this CLI Tool.

<details> 
  <summary>Click to see the List of Sample CLI commands with Output.</summary>
    <img alt="Crayons Icon CLI Usage" width="100%" src="docs/crayons-icon-cli/crayons-icon-cli-usage.jpg" />
</details>

----------------------------------------------

Built with ❤ at Freshworks
