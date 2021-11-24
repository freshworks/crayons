# Format Number (fw-format-number)

Format Number formats a number using the given locale and options.
Localization is handled by the `Intl.NumberFormat` API

## Demo

Pass `locale` attritube to set the formatting locale for the number.

```html live
<div>
English: <fw-format-number value="2000" locale="en" minimum-fraction-digits="2"></fw-format-number><br/>
</div>
<div>
German: <fw-format-number value="2000" locale="de" minimum-fraction-digits="2"></fw-format-number><br/>
</div>
```

Pass type as `percent` to get the value as percentage.

```html live
<fw-format-number type="percent" value="0"></fw-format-number><br/>
<fw-format-number type="percent" value="0.25"></fw-format-number><br>
<fw-format-number type="percent" value="0.50"></fw-format-number><br>
<fw-format-number type="percent" value="0.75"></fw-format-number><br>
<fw-format-number type="percent" value="1"></fw-format-number> <br/>
```

To format a number as a monetary value, set the type attribute to `currency` and set the currency attribute to the desired `ISO 4217 currency code`.
You should also specify `locale` attribute to ensure the the number is formatted correctly for the target locale.

```html live

<div>USD: <fw-format-number type="currency" currency="USD" value="5000" locale="en-US"></fw-format-number><br></div>
<div>GBP: <fw-format-number type="currency" currency="GBP" value="5000" locale="en-GB"></fw-format-number><br></div>
<div>EUR: <fw-format-number type="currency" currency="EUR" value="5000" locale="de"></fw-format-number><br></div>
<div>CNY: <fw-format-number type="currency" currency="CNY" value="5000" locale="zh-cn"></fw-format-number></div>
  
```

## Usage

<code-group>
<code-block title="HTML">
```html 

<label>Pass `locale` attritube to set the formatting locale for the number</label>
English: <fw-format-number value="2000" locale="en" minimum-fraction-digits="2"></fw-format-number><br/>
German: <fw-format-number value="2000" locale="de" minimum-fraction-digits="2"></fw-format-number><br/>

<label> Pass type as `percent` to get the value as percentage.</label>
<fw-format-number type="percent" value="0"></fw-format-number><br/>
<fw-format-number type="percent" value="0.25"></fw-format-number><br/>
<fw-format-number type="percent" value="0.50"></fw-format-number><br/>
<fw-format-number type="percent" value="0.75"></fw-format-number><br/>
<fw-format-number type="percent" value="1"></fw-format-number> <br/>

<label>To format a number as a monetary value, set the type attribute to `currency` and set the currency attribute to the desired `ISO 4217 currency code`.</label>

<label>You should also specify `locale` attribute to ensure the the number is formatted correctly for the target locale.
  </label>
USD: <fw-format-number type="currency" currency="USD" value="5000" locale="en-US"></fw-format-number><br/>
GBP: <fw-format-number type="currency" currency="GBP" value="5000" locale="en-GB"></fw-format-number><br/>
EUR: <fw-format-number type="currency" currency="EUR" value="5000" locale="de"></fw-format-number><br/>
CNY: <fw-format-number type="currency" currency="CNY" value="5000" locale="zh-cn"></fw-format-number>
```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwFormatNumber } from "@freshworks/crayons/react";
function App() {
  return (<div>
                      
            <label>Pass `locale` attritube to set the formatting locale for the number</label>
            English: <FwFormatNumber value={2000} locale="en" minimum-fraction-digits={2}></FwFormatNumber><br/>
            German: <FwFormatNumber value={2000} locale="de" minimum-fraction-digits={2}></FwFormatNumber><br/>

            <label> Pass type as `percent` to get the value as percentage.</label>
            <FwFormatNumber type="percent" value={0}></FwFormatNumber><br/>
            <FwFormatNumber type="percent" value={0.25}></FwFormatNumber><br/>
            <FwFormatNumber type="percent" value={0.50}></FwFormatNumber><br/>
            <FwFormatNumber type="percent" value={0.75}></FwFormatNumber><br/>
            <FwFormatNumber type="percent" value={1}></FwFormatNumber> <br/>

            <label>To format a number as a monetary value, set the type attribute to `currency` and set the currency attribute to the desired `ISO 4217 currency code`.</label>

            <label>You should also specify `locale` attribute to ensure the the number is formatted correctly for the target locale.
              </label>
            <FwFormatNumber type="currency" currency="USD" value={5000} locale="en-US"></FwFormatNumber><br/>
            <FwFormatNumber type="currency" currency="GBP" value={5000} locale="en-GB"></FwFormatNumber><br/>
            <FwFormatNumber type="currency" currency="EUR" value={5000} locale="de"></FwFormatNumber><br/>
            <FwFormatNumber type="currency" currency="CNY" value={5000} locale="zh-cn"></FwFormatNumber>
    </div>);
}
```
</code-block>
</code-group>


<!-- Auto Generated Below -->


## Properties

| Property                   | Attribute                    | Description                                                                                                                                                                                                                  | Type                                             | Default      |
| -------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------ |
| `currency`                 | `currency`                   | The currency to use in currency formatting. Possible values are the `ISO 4217` currency codes, such as `USD` for the US dollar, `EUR` for the euro. If the style is "currency", the currency property must be provided.      | `string`                                         | `undefined`  |
| `currencyDisplay`          | `currency-display`           | Currency display formatting.                                                                                                                                                                                                 | `"code" \| "name" \| "narrowSymbol" \| "symbol"` | `'symbol'`   |
| `currencySign`             | `currency-sign`              | In many locales, accounting format means to wrap the number with parentheses instead of appending a minus sign. You can enable the above by setting the currencySign option to `accounting`. The default value is `standard` | `"accounting" \| "standard"`                     | `'standard'` |
| `locale`                   | `locale`                     | `Locale` used for formatting the number                                                                                                                                                                                      | `string`                                         | `undefined`  |
| `maximumFractionDigits`    | `maximum-fraction-digits`    | The maximum number of fraction digits to use. Possible values are 0 - 20.                                                                                                                                                    | `number`                                         | `undefined`  |
| `maximumSignificantDigits` | `maximum-significant-digits` | The maximum number of significant digits to use,. Possible values are 1 - 21. Default is 21                                                                                                                                  | `number`                                         | `21`         |
| `minimumFractionDigits`    | `minimum-fraction-digits`    | The minimum number of fraction digits to use. Possible values are 0 - 20.                                                                                                                                                    | `number`                                         | `undefined`  |
| `minimumIntegerDigits`     | `minimum-integer-digits`     | The minimum number of integer digits to use. Possible values are 1 - 21. Default is 1                                                                                                                                        | `number`                                         | `1`          |
| `minimumSignificantDigits` | `minimum-significant-digits` | The minimum number of significant digits to use. Possible values are 1 - 21. Default is 1                                                                                                                                    | `number`                                         | `1`          |
| `type`                     | `type`                       | Formatting style                                                                                                                                                                                                             | `"currency" \| "decimal" \| "percent"`           | `'decimal'`  |
| `useGrouping`              | `use-grouping`               | Turns on/off grouping separators.                                                                                                                                                                                            | `boolean`                                        | `true`       |
| `value`                    | `value`                      | Number to format.                                                                                                                                                                                                            | `number`                                         | `0`          |


----------------------------------------------

Built with ❤ at Freshworks
