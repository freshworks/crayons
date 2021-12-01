# Relative Time (fw-relative-time)
Outputs a localized time phrase relative to the current date and time.

The `date` attribute determines, the date from which, time is calculated from. It must be a string that [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) can interpret or a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object set via JavaScript.

When using strings, avoid ambiguous dates such as `04/05/2021` which can be interpreted as April 5 or May 4 depending on the user's browser and locale. Instead, always use a valid [ISO 8601 date time string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format) to ensure the date will be parsed properly.

## Demo

```html live
<fw-relative-time></fw-relative-time><br/>
<fw-relative-time date="2021-05-18"></fw-relative-time><br/>
<p>Keep the displayed value up to date as time passes by setting `sync` to true </p>
<fw-relative-time sync></fw-relative-time>
```

## Usage

<code-group>
<code-block title="HTML">
```html 
<fw-relative-time></fw-relative-time><br/>
<fw-relative-time date="2021-05-18"></fw-relative-time><br/>
<p>Keep the displayed value up to date as time passes by setting `sync` to true </p>
<fw-relative-time sync></fw-relative-time>
```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwRelativeTime } from "@freshworks/crayons/react";
function App() {
  return (<div>
           <FwRelativeTime date="2021-05-18"></FwRelativeTime><br/>
           <FwRelativeTime sync></FwRelativeTime>
    </div>);
}
```
</code-block>
</code-group>




<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description                                                                                                      | Type             | Default      |
| -------- | --------- | ---------------------------------------------------------------------------------------------------------------- | ---------------- | ------------ |
| `date`   | `date`    | The date from which, time is calculated from. Should either be a date object / valid `ISO 8601` date time string | `Date \| string` | `new Date()` |
| `sync`   | `sync`    | Keep the displayed value up to date as time passes.                                                              | `boolean`        | `false`      |


----------------------------------------------

Built with ❤ at Freshworks
