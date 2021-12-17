# Icon Library (@freshworks/crayons-icon)

Crayons Icon is now available as '@freshworks/crayons-icon' Library. This encapsulates all Icon Tooling icon exports. Following is implemented via the Lib.

1. JS Exports of SVG Icon to enable Tree-Shaking for inline-svg. This is a useful feature where you can choose to do something offline with SVGs.
2. Enable Crayons-Icon lib to support external icon libraries. You can register/unregister external icon libraries and also apply mutation to all/selected icons. 
   See usage docs.
3. Icons can convey all sorts of semantic meaningful information rather than just being decorational. In order to keep icons on the accessibility tree, just 
   pass the 'label' props and fw-icon handles the assistive sr-compliance.

## Importing Icons from '@freshworks/crayons-icon' as Inline-SVGs. Supports Tree-Shaking.

We may also import Crayons Icons from '@freshworks/crayons-icon'. These are in form of JS Exports. This helps you to use inline SVG with Tree-Shakeable Imports
This way, you may choose to alter the SVG data and push it for re-render as per your project needs.

[ For Implementation Examples , refer to readMe of icon in Crayons Doc Page. ]

## FwIcon as a Renderer for external icons.

fw-icon can also render external icons. You can use any external libraries from cdn after registering them. If you don't pass 'library' props,
it will default to 'crayons'. You can even pass the CDN URL of SVG to 'src' prop. See the example below on how to use in React App.

The library registration happens via a 'resolver' function. If you wish to apply some mutation to the icons , you may choose to pass the mutator function.

[ For Implementation Examples , refer to readMe of icon in Crayons Doc Page. ]

## CLI Tool for processing SVGs

@frehsworks/crayons-icon is also available as a CLI Tool for processing SVGs with friendlier interface, options and easy customizaable config to optimize your SVGs. See the usage below. 
It comes with a ultra tuned config. We support YML Config convention as its better in readability and easy to modify than a JSON. You may use the in-built CLI command to get the fw-icon default YML File at your command root/ desired location, which you can further customize and use with the CLI Tool. With @frehsworks/crayons-icon, one also gets access to optimized Crayons-Icons, available as part of /dist folder.You are free to use them for your project purposes.

[ For Implementation Examples , refer to readMe of icon in Crayons Doc Page. ]

----------------------------------------------

Built with ❤ at Freshworks
