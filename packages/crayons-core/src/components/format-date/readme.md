# Format Date (fw-format-date)

Formats a date/time using the specified locale and options.

The `date` attribute determines the date/time to use when formatting. It must be a string that [`Date.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) can interpret or a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object set via JavaScript. By default current date/time is used.

When using strings, avoid ambiguous dates such as `05/04/2021` which can be interpreted as May 4 or April 5 depending on the user's browser and locale. Instead, always use a valid [ISO 8601 date time string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#Date_Time_String_Format) to ensure the date will be parsed correctly.

`Localization` is handled by the browser's [`Intl.DateTimeFormat` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).

## Demo

```html live
<fw-format-date date="2021-11-30T09:17:00-04:00"></fw-format-date><br />

<fw-format-date month="long" day="numeric" year="numeric"></fw-format-date>
```

<strong>Formatting options</strong>

```html live
<!-- Format Time -->
<fw-format-date hour="numeric" minute="numeric"></fw-format-date><br />

<!-- Format weekday -->
<fw-format-date weekday="long"></fw-format-date><br />

<!-- Format month -->
<fw-format-date month="long"></fw-format-date><br />

<!-- Format year -->
<fw-format-date year="numeric"></fw-format-date><br />

<!-- No formatting options -->
<fw-format-date></fw-format-date>
```

<strong>Hour Format</strong>

```html live
<div>
  <strong>12 hour format</strong><br />
  <fw-format-date
    hour="numeric"
    minute="numeric"
    hour-format="12"
  ></fw-format-date>
</div>
<div>
  <strong>24 hour format</strong><br />
  <fw-format-date
    hour="numeric"
    minute="numeric"
    hour-format="24"
  ></fw-format-date>
</div>
```

<strong>Locale</strong>

```html live
<div>
  <strong>English</strong><br /><fw-format-date locale="en-US"></fw-format-date>
</div>
<div>
  <strong>Great Britain</strong><br /><fw-format-date
    locale="en-GB"
  ></fw-format-date>
</div>
```

## Usage

<code-group>
<code-block title="HTML">
```html
<fw-format-date date="2021-11-30T09:17:00-04:00"></fw-format-date><br/>
 
<fw-format-date month="long" day="numeric" year="numeric"></fw-format-date><br/>

<label>Formatting options</label><br/>

<!-- Format Time -->

<fw-format-date hour="numeric" minute="numeric"></fw-format-date><br/>

<!-- Format weekday -->

<fw-format-date weekday="long"></fw-format-date><br/>

<!-- Format month -->

<fw-format-date month="long"></fw-format-date><br/>

<!-- Format year -->

<fw-format-date year="numeric"></fw-format-date><br/>

<!-- No formatting options -->

<fw-format-date></fw-format-date><br/>

<label>12 Hour Format</label><br/>
<fw-format-date hour="numeric" minute="numeric" hour-format="12"></fw-format-date><br/>
<label> 24 Hour Format</label><br/>
<fw-format-date hour="numeric" minute="numeric" hour-format="24"></fw-format-date><br/>

<label>Locale</label><br/>
English: <fw-format-date locale="en-US"></fw-format-date><br/>
Great Britain: <fw-format-date locale="en-GB"></fw-format-date>

````
</code-block>

<code-block title="React">
```jsx
import React from "react";
import { FwFormatDate } from "@freshworks/crayons/react";

function App() {

  return (<div>
    <FwFormatDate date="2021-11-30T09:17:00-04:00"></FwFormatDate><br/>

    <FwFormatDate month="long" day="numeric" year="numeric"></FwFormatDate><br/>

    <label>Formatting Options</label><br/>

    {/* Format time */}
    <FwFormatDate hour="numeric" minute="numeric"></FwFormatDate><br/>

    {/* Format weekday */}
    <FwFormatDate weekday="long"></FwFormatDate><br/>

    {/* Format month */}
    <FwFormatDate month="long"></FwFormatDate><br/>

    {/* Format year */}
    <FwFormatDate year="numeric"></FwFormatDate><br/>

    {/* No formatting options */}
    <FwFormatDate></FwFormatDate><br/>

    <label>12 Hour Format</label><br/>
    <FwFormatDate hour="numeric" minute="numeric" hour-format="12"></FwFormatDate><br/>
    <label>24 Hour Format</label><br/>
    <FwFormatDate hour="numeric" minute="numeric" hour-format="24"></FwFormatDate><br/>

    <label>Locale</label><br/>
    English: <FwFormatDate locale="en-US"></FwFormatDate><br/>
    Great Britain: <FwFormatDate locale="en-GB"></FwFormatDate><br/>

  </div >);
}

export default App;

````

</code-block>
</code-group>

### DateFormatController

You can use `DateFormatController` to format date by passing the below set of [DateFormatOptions](#dateformatoptions).

```js
Javascript - import { DateFormatController } from "@freshworks/crayons"
React - import { DateFormatController } from "@freshworks/crayons/react"

 const formattedDate= DateFormatController({
     date: // defaults to current date
     locale: // defaults to browser's default locale
    //...Date Format Options
 });
```

#### DateFormatOptions

```js
interface dateOptions {
  weekday?: 'narrow' | 'short' | 'long';

  /** The format for displaying the year. */
  year?: 'numeric' | '2-digit';

  /** The format for displaying the month. */
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';

  /** The format for displaying the day. */
  day?: 'numeric' | '2-digit';

  /** The format for displaying the hour. */
  hour?: 'numeric' | '2-digit';

  /** The format for displaying the minute. */
  minute?: 'numeric' | '2-digit';

  /** The format for displaying the second. */
  second?: 'numeric' | '2-digit';

  /** When set, 12 hour time will be used. */
  hour12?: boolean;

  /** The format for displaying the time. */
  timeZoneName?: 'short' | 'long';

  /** The time zone to express the time in. */
  timeZone?: string;
}
```

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute        | Description                                                                  | Type                                                      | Default      |
| -------------- | ---------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------- | ------------ |
| `date`         | `date`           | The date/time to format. If not set, the current date and time will be used. | `Date \| number \| string`                                | `new Date()` |
| `day`          | `day`            | The format for displaying the day.                                           | `"2-digit" \| "numeric"`                                  | `undefined`  |
| `hour`         | `hour`           | The format for displaying the hour.                                          | `"2-digit" \| "numeric"`                                  | `undefined`  |
| `hourFormat`   | `hour-format`    | When set, 24 hour time will always be used.                                  | `"12" \| "24" \| "auto"`                                  | `'auto'`     |
| `locale`       | `locale`         | The locale to use when formatting the date/time.                             | `string`                                                  | `undefined`  |
| `minute`       | `minute`         | The format for displaying the minute.                                        | `"2-digit" \| "numeric"`                                  | `undefined`  |
| `month`        | `month`          | The format for displaying the month.                                         | `"2-digit" \| "long" \| "narrow" \| "numeric" \| "short"` | `undefined`  |
| `second`       | `second`         | The format for displaying the second.                                        | `"2-digit" \| "numeric"`                                  | `undefined`  |
| `timeZone`     | `time-zone`      | The time zone to express the time in.                                        | `string`                                                  | `undefined`  |
| `timeZoneName` | `time-zone-name` | The format for displaying the time.                                          | `"long" \| "short"`                                       | `undefined`  |
| `weekday`      | `weekday`        | The format for displaying the weekday.                                       | `"long" \| "narrow" \| "short"`                           | `undefined`  |
| `year`         | `year`           | The format for displaying the year.                                          | `"2-digit" \| "numeric"`                                  | `undefined`  |


----------------------------------------------

Built with ❤ at Freshworks
