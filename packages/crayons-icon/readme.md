# Icon Library (@freshworks/crayons-icon)

Crayons Icon is now available as '@freshworks/crayons-icon' Library. Following features are made available to users.

1. JS Exports of SVG Icon to enable Tree-Shaking for inline-svg. This is a useful feature where you can choose to do something offline with SVGs.
2. Enables @frehworks/crayons-icon CLI Interface via which you can leverage the SVGO Tooling to optimize your project svg-icons.
3. Optimized set of Crayons-Icon in dist folder. You are free to use them for project related purposes.
4. Crayons-Icon also makes it svgo.yml file available as part of dist folder. Refer usage docs on how to us it for project purposes.


## Importing Icons from '@freshworks/crayons-icon' as Inline-SVGs. Supports Tree-Shaking.

We may also import Crayons Icons from '@freshworks/crayons-icon'. These are in form of JS Exports. This helps you to use inline SVG with Tree-Shakeable Imports
This way, you may choose to alter the SVG data and push it for re-render as per your project needs.

[ For Implementation Examples , refer to readMe of icon in Crayons Doc Page. ]

## CLI Tool for processing SVGs

@frehsworks/crayons-icon is also available as a CLI Tool for processing SVGs with friendlier interface, options and easy customizaable config to optimize your SVGs. See the usage below. 
It comes with a ultra tuned config. We support YML Config convention as its better in readability and easy to modify than a JSON. You may use the in-built CLI command to get the fw-icon default YML File at your command root/ desired location, which you can further customize and use with the CLI Tool. With @frehsworks/crayons-icon, one also gets access to optimized Crayons-Icons, available as part of /dist folder.You are free to use them for your project purposes.

[ For Implementation Examples , refer to readMe of icon in Crayons Doc Page. ]

----------------------------------------------

Built with ❤ at Freshworks
