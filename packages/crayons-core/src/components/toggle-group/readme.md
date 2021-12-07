# Toggle Group (fw-toggle-group)

fw-toggle-group displays a group of components like card button/icon button and enables to select either one option or select/deselect multiple options.

## Demo

```html live
<fw-toggle-group
  name="Test toggle group"
  selected-values="bb,cc"
  multiple="true"
>
  <fw-toggle-group-button
    header="Header A"
    description="This is a sample description of the card component."
    value="aa"
  ></fw-toggle-group-button>
  <fw-toggle-group-button
    header="Header B"
    description="This is a sample description of the card component."
    value="bb"
  ></fw-toggle-group-button>
  <fw-toggle-group-button
    header="Header c"
    description="This is a sample description of the card component."
    value="cc"
  ></fw-toggle-group-button>
  <fw-toggle-group-button header="Header D" value="dd"></fw-toggle-group-button>
  <fw-toggle-group-button header="Header E" value="ee"></fw-toggle-group-button>
  <fw-toggle-group-button header="Header F" value="ff"></fw-toggle-group-button>
</fw-toggle-group>
```

## Usage

<code-group>
<code-block title="HTML">
```html 
    <fw-toggle-group
        name="Test toggle group"
        selected-values="bb,cc"
        multiple="true"
      >
        <fw-toggle-group-button
          header="Header A"
          description="This is a sample description of the card component."
          value="aa"
        ></fw-toggle-group-button>
        <fw-toggle-group-button
          header="Header B"
          description="This is a sample description of the card component."
          value="bb"
        ></fw-toggle-group-button>
        <fw-toggle-group-button
          header="Header c"
          description="This is a sample description of the card component."
          value="cc"
        ></fw-toggle-group-button>
        <fw-toggle-group-button
          header="Header D"
          value="dd"
        ></fw-toggle-group-button>
        <fw-toggle-group-button
          header="Header E"
          value="ee"
        ></fw-toggle-group-button>
    </fw-toggle-group>
    <fw-toggle-group
          name="Test icon toggle group"
          selected-values="gg"
        >
          <fw-toggle-group-button
            icon-name="phone"
            value="aa"
            type="icon"
          ></fw-toggle-group-button>
          <fw-toggle-group-button
            icon-name="agent"
            value="bb"
            type="icon"
          ></fw-toggle-group-button>
          <fw-toggle-group-button
            icon-name="delete"
            value="cc"
            type="icon"
          ></fw-toggle-group-button>
          <fw-toggle-group-button
            icon-name="check"
            value="dd"
            type="icon"
          ></fw-toggle-group-button>
    </fw-toggle-group>
````
</code-block>

<code-block title="React">
```jsx
    import React from "react";
    import ReactDOM from "react-dom";
    import { FwCardButton, FwToggleGroup } from '@Freshworks/crayons/react'
    function App() {
    return (<div>
            <FwToggleGroup selectedValues="bb" multiple={true} onFwChange={toggleChangeHandler}>
            <FWToggleGroupButton key="aa" value="aa" header="Header 1" description="This is a sample description 1"/>
            <FWToggleGroupButton key="bb" value="bb" header="Header 2" description="This is a sample description 2"/>
            <FWToggleGroupButton key="cc" value="cc" header="Header 2" description="This is a sample description 2"/>
            </FwToggleGroup>
        </div>);
    }
````

</code-block>
</code-group>
