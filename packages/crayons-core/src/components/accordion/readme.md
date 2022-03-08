# Accordion (fw-accordion)

fw-accordion displays a collapsible accordion component, which expands/collapses on clicking the accordion header.

## Demo

### Default Accordion

```html live
<fw-accordion expanded>
  <fw-accordion-title>Header Text</fw-accordion-title>
  <fw-accordion-body>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the
    1500s, when an unknown printer took a galley of type and scrambled it to
    make a type specimen book. It has survived not only five centuries, but also
    the leap into electronic typesetting, remaining essentially unchanged. It
    was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software
    like Aldus PageMaker including versions of Lorem Ipsum
  </fw-accordion-body>
</fw-accordion>
```

### Accordion with custom toggle icons

```html live
<fw-accordion>
  <fw-accordion-title>
    <fw-icon name="minus" size="14" slot="expanded-icon"></fw-icon>
    <fw-icon name="plus" size="14" slot="collapsed-icon"></fw-icon>
    Header Text
  </fw-accordion-title>
  <fw-accordion-body>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the
    1500s, when an unknown printer took a galley of type and scrambled it to
    make a type specimen book. It has survived not only five centuries, but also
    the leap into electronic typesetting, remaining essentially unchanged. It
    was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software
    like Aldus PageMaker including versions of Lorem Ipsum
  </fw-accordion-body>
</fw-accordion>
```

Toggle icons can be customized using named slots.

| Icon           | Slot Name      |
| -------------- | -------------- |
| Expanded Icon  | expanded-icon  |
| Collapsed Icon | collapsed-icon |

### No Bounding Box Accordion (Borders at top and bottom only)

```html live
<fw-accordion type="no_bounding_box">
  <fw-accordion-title>Header Text</fw-accordion-title>
  <fw-accordion-body>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the
    1500s, when an unknown printer took a galley of type and scrambled it to
    make a type specimen book. It has survived not only five centuries, but also
    the leap into electronic typesetting, remaining essentially unchanged. It
    was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software
    like Aldus PageMaker including versions of Lorem Ipsum
  </fw-accordion-body>
</fw-accordion>
```

### Accordion with custom CSS properties

```html live
<fw-accordion
  style="--fw-accordion-border: 1px solid #F5F7F9; --fw-accordion-box-shadow: 0px 1px 8px rgba(152, 152, 152, 0.13); --fw-accordion-border-radius: 4px;"
  expanded
>
  <fw-accordion-title
    truncate-on-overflow="true"
    style="--fw-accordion-title-background-color: #F5F7F9; --fw-accordion-title-expanded-icon-color: #2C5CC5; --fw-accordion-title-collapsed-icon-color: #264966;"
  >
    <fw-icon name="rewards"></fw-icon>
    <span style="padding-left: 5px;">Header Text</span>
  </fw-accordion-title>
  <fw-accordion-body style="--fw-accordion-body-background-color: #FFFFFF">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the
    1500s, when an unknown printer took a galley of type and scrambled it to
    make a type specimen book. It has survived not only five centuries, but also
    the leap into electronic typesetting, remaining essentially unchanged. It
    was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software
    like Aldus PageMaker including versions of Lorem Ipsum
  </fw-accordion-body>
</fw-accordion>
```

## Usage

<code-group>
<code-block title="HTML">
```html
<fw-accordion>
  <fw-accordion-title>Header Text</fw-accordion-title>
  <fw-accordion-body>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
  </fw-accordion-body>
</fw-accordion>
<br>
<fw-accordion type="no_bounding_box">
  <fw-accordion-title>Header Text</fw-accordion-title>
  <fw-accordion-body>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
  </fw-accordion-body>
</fw-accordion>
```
</code-block>

<code-block title="React">
```jsx
import React from "react";
import ReactDOM from "react-dom";
import { FwCheckbox } from "@freshworks/crayons/react";
function App() {
  return (<div>
    <FwAccordion>
      <FwAccordionTitle>Header Text</FwAccordionTitle>
      <FwAccordionBody>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
      </FwAccordionBody>
    </FwAccordion>
  </div>)
}
```
</code-block>
</code-group>

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                                | Type                             | Default     |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- | ----------- |
| `expanded` | `expanded` | To manage accordion expanded or collapsed state                                                                                            | `boolean`                        | `false`     |
| `type`     | `type`     | The type of accordion to be displayed. default => Accordion with all borders no_bounding_box => Accordion with top and bottom borders only | `"default" \| "no_bounding_box"` | `'default'` |


## Events

| Event               | Description                                           | Type                                |
| ------------------- | ----------------------------------------------------- | ----------------------------------- |
| `fwAccordionToggle` | Triggered when the accordion is expanded or collapsed | `CustomEvent<AccordionToggleEvent>` |


## Methods

### `toggle() => Promise<boolean>`

Method available from the component to toggle expanded or collapsed state of accordion

#### Returns

Type: `Promise<boolean>`

promise that resolves to true


## CSS Custom Properties

| Name                           | Description             |
| ------------------------------ | ----------------------- |
| `--fw-accordion-border`        | Accordion border        |
| `--fw-accordion-border-radius` | Accordion border radius |
| `--fw-accordion-box-shadow`    | Accordion box shadow    |


----------------------------------------------

Built with ❤ at Freshworks
