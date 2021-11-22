# Skeleton (fw-skeleton)
fw-skeleton provides a way to render placeholder content until the original content is available. Provides a good UX when dealing with progessive loading of contents.


## Demo Variants

```html live

 <label>Default text variant</label>
 <fw-skeleton></fw-skeleton> <br/>
 <label>Circle variant</label>
 <fw-skeleton variant="circle"></fw-skeleton> <br/>
 <label>Rectangle variant with custom height</label>
 <fw-skeleton variant="rect" height="200px"></fw-skeleton> <br/>

 <label>Pass Custom styles as props</label>
 <fw-skeleton id="custom-skeleton"></fw-skeleton>

<script type="application/javascript">
  const el = document.querySelector('#custom-skeleton');
     el.customStyles = {
       display: 'inline-block',
       'box-shadow': '0 2px 4px #ccc',
       'background-color': '#1b2b34de',
       'width':"33%"
     };
     el.count = 2;
</script>
```
Skeleton with different effects
```html live

 <label>Default Pulse Effect</label>
 <fw-skeleton></fw-skeleton> <br/>
 <label>Sheen Effect</label>
 <fw-skeleton effect="sheen"></fw-skeleton> <br/>
 <label>Progress Effect</label>
 <fw-skeleton effect="progress"></fw-skeleton> <br/>
 <label>Progress Dark Effect</label>
 <fw-skeleton effect="progress-dark"></fw-skeleton> <br/>
 <label>No Effect</label>
 <fw-skeleton effect="none"></fw-skeleton> <br/>

```


## Usage

<code-group>
<code-block title="HTML">
```html 

 <label>Default text variant</label>
 <fw-skeleton></fw-skeleton> <br/>
 <label>Circle variant</label>
 <fw-skeleton variant="circle"></fw-skeleton> <br/>
 <label>Rectangle variant</label>
 <fw-skeleton variant="rect"></fw-skeleton> <br/>

 <label>Pass Custom styles as props</label>
 <fw-skeleton id="custom-skeleton"></fw-skeleton>

<script type="application/javascript">
  const el = document.querySelector('#custom-skeleton');
     el.customStyles = {
       display: 'inline-block',
       'box-shadow': '0 2px 4px #ccc',
       'background-color': '#1b2b34de',
       'width':"33%"
     };
     el.count = 2;
</script>
```
</code-block>

<code-block title="React">
```jsx
import React, {useRef, useEffect} from "react";
import ReactDOM from "react-dom";
import { FwSkeleton } from "@freshworks/crayons/react";
function App() {

    const skeletonCustomRef = useRef(null);
    useEffect(() => {
        skeletonCustomRef.current.customStyles = {
        margin: 0,
        "box-shadow": "0px 1px 2px rgba(0,0,0,0.5)"
        };
    }, []);


  return (<div>
            <label>Default text variant</label>
            <FwSkeleton></FwSkeleton> <br/>
            <label>Circle variant</label>
            <FwSkeleton variant="circle"></FwSkeleton> <br/>
            <label>Rectangle variant</label>
            <FwSkeleton variant="rect"></FwSkeleton> <br/>

            <label>Pass Custom styles as props</label>
            <FwSkeleton id="custom-skeleton" ref={skeletonCustomRef}></FwSkeleton>
    </div>);
}
```
</code-block>
</code-group>


<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                              | Type                                                            | Default   |
| -------------- | --------------- | -------------------------------------------------------- | --------------------------------------------------------------- | --------- |
| `count`        | `count`         | Number of rows of current skeleton type                  | `number`                                                        | `1`       |
| `customStyles` | `custom-styles` | Custom css styles (background/margins/width/height etc.) | `string \| { [key: string]: string; }`                          | `{}`      |
| `effect`       | `effect`        | Effect the skeleton will use.                            | `"none" \| "progress" \| "progress-dark" \| "pulse" \| "sheen"` | `'pulse'` |
| `height`       | `height`        | Height of the skeleton ex. 100px, 100%, auto etc.        | `string`                                                        | `null`    |
| `marginBottom` | `margin-bottom` | MarginBottom of the skeleton ex. 10px, 0 etc.            | `string`                                                        | `null`    |
| `variant`      | `variant`       | Variant of the skeleton - circle or rect or text          | `"circle" \| "rect" \| "text"`                                  | `'text'`  |
| `width`        | `width`         | Width of the skeleton ex. 100px, 100%, auto etc.         | `string`                                                        | `null`    |


## Shadow Parts

| Part     | Description |
| -------- | ----------- |
| `"base"` |             |


----------------------------------------------

Built with ❤ at Freshworks
