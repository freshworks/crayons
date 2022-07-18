# fw-platform-table

## Sorting

`fwSort` event will be triggered whenever the user selects the sort by or the order by option in the dropdown.
The event detail will be of format `{orderBy : <unique ID of the Column to be sorted>, order: <asc or desc>}`.
The sortable columns are set via the prop sortableColumns of format `{ COLUMN_1_KEY : { text : COLUMN_1_NAME }}, ...`

## Pagination

`fwPagination` event will be triggered whenever the user click on the page navigation button.
The event detail will provide the page number `{page : <page number user wants to navigate>}`.

## Deleting Rows

`fwDelete` event will be triggered whenever the user click on the delete button.
The event detail will provide an array of selected rows unique id's `{selectedRows : <Array of string>}`.

<!-- Auto Generated Below -->

## Properties

| Property          | Attribute       | Description                                       | Type      | Default     |
| ----------------- | --------------- | ------------------------------------------------- | --------- | ----------- |
| `isSelectable`    | `is-selectable` | Whether the checkbox should be visible.           | `boolean` | `true`      |
| `loading`         | `loading`       | The sort order.                                   | `boolean` | `false`     |
| `order`           | `order`         | The sort order.                                   | `any`     | `undefined` |
| `orderBy`         | `order-by`      | The sort by column key.                           | `any`     | `undefined` |
| `paginationProps` | --              | Props for the fw-pagination component             | `{}`      | `{}`        |
| `showError`       | `show-error`    | When set true the error state slot will be shown. | `boolean` | `false`     |
| `sortableColumns` | --              | The sortable columns object.                      | `{}`      | `{}`        |
| `tableProps`      | --              | Props for the fw-pagination component             | `{}`      | `{}`        |

## Events

| Event          | Description                                | Type               |
| -------------- | ------------------------------------------ | ------------------ |
| `fwDelete`     | Triggered on selecting the sort option.    | `CustomEvent<any>` |
| `fwPagination` | Triggered on page navigation button click. | `CustomEvent<any>` |

## Methods

### `clearTableSelection() => Promise<void>`

clears the selected rows in the table.

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- fw-button
- fw-icon
- [fw-sort-select](sort-select)
- fw-checkbox
- fw-pagination
- fw-data-table

### Graph

```mermaid
graph TD;
  fw-platform-table --> fw-button
  fw-platform-table --> fw-icon
  fw-platform-table --> fw-sort-select
  fw-platform-table --> fw-checkbox
  fw-platform-table --> fw-pagination
  fw-platform-table --> fw-data-table
  fw-button --> fw-spinner
  fw-button --> fw-icon
  fw-sort-select --> fw-popover
  fw-sort-select --> fw-icon
  fw-sort-select --> fw-list-options
  fw-list-options --> fw-select-option
  fw-list-options --> fw-input
  fw-select-option --> fw-icon
  fw-select-option --> fw-checkbox
  fw-select-option --> fw-avatar
  fw-checkbox --> fw-icon
  fw-input --> fw-icon
  fw-pagination --> fw-button-group
  fw-pagination --> fw-button
  fw-pagination --> fw-icon
  fw-data-table --> fw-custom-cell-anchor
  fw-data-table --> fw-custom-cell-user
  fw-data-table --> fw-custom-cell-icon
  fw-data-table --> fw-custom-cell-paragraph
  fw-data-table --> fw-checkbox
  fw-data-table --> fw-tooltip
  fw-data-table --> fw-button
  fw-data-table --> fw-icon
  fw-data-table --> fw-input
  fw-data-table --> fw-drag-container
  fw-data-table --> fw-skeleton
  fw-custom-cell-user --> fw-avatar
  fw-custom-cell-icon --> fw-icon
  fw-custom-cell-paragraph --> fw-tooltip
  fw-tooltip --> fw-popover
  style fw-platform-table fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
