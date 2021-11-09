# Popover (fw-popover)

## Usage

Popover need two slots `popover-trigger` and `popover-content`. By default on clicking the trigger the content will be displayed. The props can be used to change the position of the content, width of the component and the distance between the trigger and the content.

```html live
<fw-popover>
  <fw-button slot="popover-trigger">Click Me!</fw-button>
  <fw-list-options slot="popover-content"></fw-list-options>
</fw-popover>

<br /><br /><br /><br />

<fw-popover placement="top">
  <fw-button slot="popover-trigger">Click Me!</fw-button>
  <fw-list-options
    id="placementComponent"
    slot="popover-content"
  ></fw-list-options>
</fw-popover>

<script type="application/javascript">
  var dataSource = [
    { value: '1', text: 'Luffy' },
    { value: '2', text: 'Zorro' },
    { value: '3', text: 'Sanji' },
  ];
  var listOptions = document.querySelector('fw-list-options');
  var placementOptions = document.getElementById('placementComponent');
  listOptions.options = dataSource;
  placementOptions.options = dataSource;
</script>
```

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute    | Description                                                                                     | Type                                                                                                                                                                 | Default     |
| -------------------- | ------------ | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `boundary`           | --           | The area that the popup will be checked for overflow relative to.                               | `HTMLElement`                                                                                                                                                        | `undefined` |
| `distance`           | `distance`   | Distance defines the distance between the popover trigger and the popover content along y-axis. | `string`                                                                                                                                                             | `'0'`       |
| `fallbackPlacements` | --           | Alternative placement for popover if the default placement is not possible.                     | `[PopoverPlacementType]`                                                                                                                                             | `['top']`   |
| `placement`          | `placement`  | Placement of the popover content with respect to the popover trigger.                           | `"bottom" \| "bottom-end" \| "bottom-start" \| "left" \| "left-end" \| "left-start" \| "right" \| "right-end" \| "right-start" \| "top" \| "top-end" \| "top-start"` | `'bottom'`  |
| `sameWidth`          | `same-width` | Whether the popover-content width to be same as that of the popover-trigger.                    | `boolean`                                                                                                                                                            | `true`      |
| `skidding`           | `skidding`   | Skidding defines the distance between the popover trigger and the popover content along x-axis. | `string`                                                                                                                                                             | `'0'`       |
| `variant`            | `variant`    | Variant defines the style of the popover-content.                                               | `"date-picker" \| "select"`                                                                                                                                          | `'select'`  |


## Methods

### `hide() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [fw-datepicker](../datepicker)
 - [fw-select](../select)

### Graph
```mermaid
graph TD;
  fw-datepicker --> fw-popover
  fw-select --> fw-popover
  style fw-popover fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
