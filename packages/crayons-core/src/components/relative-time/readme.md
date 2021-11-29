# Relative Time (fw-relative-time)
Outputs a localized time phrase relative to the current date and time.

The `date` attribute determines when the date/time is calculated from. It must be a string that [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) can interpret or a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object set via JavaScript.

When using strings, avoid ambiguous dates such as `03/04/2020` which can be interpreted as March 4 or April 3 depending on the user's browser and locale. Instead, always use a valid [ISO 8601 date time string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format) to ensure the date will be parsed properly by all clients.

## Demo

```html live
<fw-relative-time></fw-relative-time>
<fw-relative-time date="2021-05-18"></fw-relative-time>
<p>Keep the displayed value up to date as time passes by setting `sync` to true </p>
<fw-relative-time sync></fw-relative-time>

<p>Format the date based on a locale by setting the localeModule(date-fns/locale) </p>
<fw-relative-time sync id="localeElem"></fw-relative-time>
<script type="module">
    import de from "https://cdn.jsdelivr.net/npm/date-fns/esm/locale/de/index.js"
    document.getElementById("localeElem").setLocaleModule(de);
</script>
```

## Usage

<code-group>
<code-block title="HTML">
```html 
<fw-relative-time></fw-relative-time>
<fw-relative-time date="2021-05-18"></fw-relative-time>
<p>Keep the displayed value up to date as time passes by setting `sync` to true </p>
<fw-relative-time sync></fw-relative-time>

<p>Format the date based on a locale by setting the localeModule(date-fns/locale) </p>
<fw-relative-time sync id="localeElem"></fw-relative-time>
<script type="module">
    import de from "https://cdn.jsdelivr.net/npm/date-fns/esm/locale/de/index.js"
    document.getElementById("localeElem").setLocaleModule(de);
</script>
```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwRelativeTime } from "@freshworks/crayons/react";
import de from "date-fns/locale/de"
function App() {
  return (<div>
           <FwRelativeTime date="2021-05-18"></FwRelativeTime>
           <FwRelativeTime sync></FwRelativeTime>
           <FwRelativeTime sync localeModule={de}></FwRelativeTime>
    </div>);
}
```
</code-block>
</code-group>




<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                                                                        | Type             | Default      |
| -------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------------ |
| `date`         | `date`          | The date from which, time is calculated from. Should either be a date object / valid `ISO 8601` date time string                                                                   | `Date \| string` | `new Date()` |
| `localeModule` | `locale-module` | The date-fns locale module to use when formatting the number. You can import locale modules like below. `import enLocaleObj from date-fns/locale/en-US`. Default module is `en-US` | `any`            | `undefined`  |
| `sync`         | `sync`          | Keep the displayed value up to date as time passes.                                                                                                                                | `boolean`        | `false`      |


## Methods

### `setLocaleModule(localeModule: any) => Promise<void>`

set Locale Module to use when formatting the number.
You can import the locale modules like below.
`import deLocaleObj from date-fns/locale/de`.
`setLocale(deLocaleObj)`

#### Returns

Type: `Promise<void>`




----------------------------------------------

Built with ❤ at Freshworks
