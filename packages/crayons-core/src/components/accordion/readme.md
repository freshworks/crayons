# Accordion (fw-accordion)

fw-accordion displays a collapsible accordion component, which expands/collapses on clicking the accordion header.

## Demo

```html live
<fw-accordion expanded="true">
  <fw-accordion-title>Header Text</fw-accordion-title>
  <fw-accordion-body>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
  </fw-accordion-body>
</fw-accordion>
```

Accordion with custom icons

```html live
<fw-accordion type="borderless">
  <fw-accordion-title>
     <fw-icon
      name='plus'
      size="14"
      slot="expanded-icon"
    ></fw-icon>
    <fw-icon
      name='minus'
      size="14"
      slot="collapsed-icon"
    ></fw-icon>
    Header Text
  </fw-accordion-title>
  <fw-accordion-body>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
  </fw-accordion-body>
</fw-accordion>
```

Borderless Accordion

```html live
<fw-accordion type="borderless">
  <fw-accordion-title>Header Text</fw-accordion-title>
  <fw-accordion-body>
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
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
<fw-accordion type="borderless">
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

| Property   | Attribute  | Description                                     | Type                        | Default     |
| ---------- | ---------- | ----------------------------------------------- | --------------------------- | ----------- |
| `expanded` | `expanded` | To manage accordion expanded or collapsed state | `boolean`                   | `false`     |
| `type`     | `type`     | The type of accordion to be displayed.          | `"borderless" \| "default"` | `'default'` |


## Events

| Event               | Description                                           | Type                                |
| ------------------- | ----------------------------------------------------- | ----------------------------------- |
| `fwAccordionToggle` | Triggered when the accordion is expanded or collpased | `CustomEvent<AccordionToggleEvent>` |


## CSS Custom Properties

| Name                        | Description             |
| --------------------------- | ----------------------- |
| `--accordion-border`        | Accordion border        |
| `--accordion-border-radius` | Accordion border radius |
| `--accordion-box-shadow`    | Accordion box shadow    |


----------------------------------------------

Built with ❤ at Freshworks
