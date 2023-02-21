# Pagination (fw-pagination)

fw-pagination displays pagination. The component displays starting and ending record numbers against total number of records.

## Demo

```html live
<fw-pagination per-page="20" total="50"></fw-pagination><br />
<fw-pagination total="50"></fw-pagination><br />
<fw-pagination page="2" per-page="10" total="50"></fw-pagination>
```

## Usage

<code-group>
<code-block title="HTML">
```html
<fw-pagination per-page="20" total="50"></fw-pagination><br>
<fw-pagination total="50"></fw-pagination><br />
<fw-pagination
  page="2"
  per-page="10"
  total="50"
></fw-pagination>
```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwPagination } from "@freshworks/crayons/react";
function App() {
  return (<div>
    <FwPagination per-page="20" total="50"></FwPagination><br/>
    <FwPagination total="50"></FwPagination>
    <FwPagination page="2"
  per-page="10"
  total="50"></FwPagination>
  </div>)
}
```
</code-block>
</code-group>

<!-- Auto Generated Below -->


## Properties

| Property              | Attribute               | Description                                                                                                                                                                                                                                                      | Type                   | Default                |
| --------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ---------------------- |
| `buttonGroupLabel`    | `button-group-label`    | Aria Label to be used for the button group.                                                                                                                                                                                                                      | `string`               | `''`                   |
| `hidePageNumbers`     | `hide-page-numbers`     | hides page numbers in standard pagination variant. Defaults to false.                                                                                                                                                                                            | `boolean`              | `false`                |
| `isLoading`           | `is-loading`            | Indicates if the records in current page are being fetched.                                                                                                                                                                                                      | `boolean`              | `false`                |
| `nextButtonLabel`     | `next-button-label`     | Aria Label to be used for next button.                                                                                                                                                                                                                           | `string`               | `''`                   |
| `page`                | `page`                  | The current page number.                                                                                                                                                                                                                                         | `number`               | `1`                    |
| `perPage`             | `per-page`              | The number of records to be shown per page. Defaults to 10.                                                                                                                                                                                                      | `number`               | `10`                   |
| `perPageOptions`      | --                      | Specify the perPage options to be shown.                                                                                                                                                                                                                         | `number[]`             | `[10, 20, 30, 40, 50]` |
| `previousButtonLabel` | `previous-button-label` | Aria Label to be used for previous button.                                                                                                                                                                                                                       | `string`               | `''`                   |
| `siblingCount`        | `sibling-count`         | represents the min number of page buttons to be shown on each side of the current page button. Defaults to 1.                                                                                                                                                    | `number`               | `1`                    |
| `total`               | `total`                 | The total number of records. This is a mandatory parameter.                                                                                                                                                                                                      | `number`               | `undefined`            |
| `variant`             | `variant`               | The variant of pagination to be displayed. Mini variant displays only previous and next buttons along with pagination information. Standard variant displays list of page numbers which can be selected along with previous and next buttons Defaults to 'mini'. | `"mini" \| "standard"` | `'mini'`               |


## Events

| Event      | Description                                               | Type               |
| ---------- | --------------------------------------------------------- | ------------------ |
| `fwChange` | Triggered when either previous or next button is clicked. | `CustomEvent<any>` |


## Methods

### `nextPage() => Promise<void>`

Navigates to next set of records if available.

#### Returns

Type: `Promise<void>`



### `previousPage() => Promise<void>`

Navigates to previous set of records if available.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [fw-button](../button)
- [fw-icon](../icon)
- [fw-popover](../popover)
- [fw-list-options](../options-list)
- [fw-button-group](../button-group)

### Graph
```mermaid
graph TD;
  fw-pagination --> fw-button
  fw-pagination --> fw-icon
  fw-pagination --> fw-popover
  fw-pagination --> fw-list-options
  fw-pagination --> fw-button-group
  fw-button --> fw-spinner
  fw-button --> fw-icon
  fw-list-options --> fw-select-option
  fw-list-options --> fw-input
  fw-select-option --> fw-icon
  fw-select-option --> fw-checkbox
  fw-select-option --> fw-avatar
  fw-checkbox --> fw-icon
  fw-input --> fw-icon
  style fw-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
