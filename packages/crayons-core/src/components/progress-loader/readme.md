# Progress Loader (fw-progress-loader)

Progress Loader Component can be used to indicate loading of a Page / Section of a page.

## Demo

```html live
<fw-progress-loader id="root" show></fw-progress-loader>

<br/><br/><br/>
<fw-progress-loader parent="#container2" id="progress-container"></fw-progress-loader>


<div id="container2"> <p> You can have multiple progress loaders in the page. Pass a `selector` as a `parent` prop to the component. The progress loader will be displayed in the provided selector</p></div>

<br>
<br/>
<br/>
<fw-button onclick="document.querySelector('#progress-container').start()">Start custom selector progress bar</fw-button> <br/><br/>
<fw-button onclick="document.querySelector('#progress-container').done()">Stop custom selector progress bar</fw-button>

<script type="application/javascript">
    document.querySelector('#progress-container').start();
    setTimeout(()=>{
        document.querySelector('#root').done();
    },10000)
</script>
```

## Usage

<code-group>
<code-block title="HTML">
```html 
<fw-progress-loader id="root" show></fw-progress-loader>

<br/><br/><br/>
<fw-progress-loader parent="#container2" id="progress-container"></fw-progress-loader>

<div id="container2"> <p> You can have multiple progress loaders in the page. Pass a `selector` as a `parent` prop to the component. The progress loader will be displayed in the provided selector</p></div>
<br>
<br/>
<br/>
<fw-button onclick="document.querySelector('#progress-container').start()">Start custom selector progress bar</fw-button> <br/><br/>
<fw-button onclick="document.querySelector('#progress-container').done()">Stop custom selector progress bar</fw-button>

<script type="application/javascript">
    document.querySelector('#progress-container').start();
    setTimeout(function() {
        document.querySelector('#root').done();
    },10000)
</script>
```
</code-block>

<code-block title="React">
```jsx
import React, {useRef} from "react";
import ReactDOM from "react-dom";
import {FwButton,FwProgressLoader,ProgressLoaderController } from "@freshworks/crayons/react"

function App() {
  const pl1 = useRef(null)
  const loaderCustom= ProgressLoaderController({
    parent:"#container1"
  });
  return (<div>
            <FwProgressLoader show ref={pl1}></FwProgressLoader>
            <br/>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <FwButton onClick={() => pl1.current.show=true}>Show root loader - component - via prop</FwButton>
                <FwButton onClick={() => pl1.current.show=false}>Hide root loader - component - via prop</FwButton>
                <FwButton onClick={() => pl1.current.start()}>Start root loader - component - via method</FwButton>
                <FwButton onClick={() => pl1.current.done()}>Hide root loader - component - via method</FwButton>
            </div>

          <div id="container1"><p> You can have multiple progress loaders in the page. Pass a `selector` as a `parent` prop to the component. The progress loader will be displayed in the provided selector</p></div>
          <br/>
          <br/>
          <br/>

          <div style={{display:'flex', justifyContent:'space-between'}}>
                <FwButton onClick={() => loaderCustom.start()}>Show custom loader - via prop</FwButton>
                <FwButton onClick={() => loaderCustom.done()}>Hide custom loader - via prop</FwButton>
        </div>

 </div>);
}
```
</code-block>
</code-group>

### Styling Loader 
You can style progress loader by targetting `class="bar"` selector. 
You can also use `--progress-loader-color` and `--progress-loader-height` **css variables** to use custom color and height for the progress loader.

### ProgressLoaderController

You can use `ProgressLoaderController` to create loaders by passing the below set of [ProgressLoaderOptions](#progressloaderoptions).

You can use the below mentioned [Methods](#methods) to manage loaders 

```js
Javascript - import { ProgressLoaderController } from "@freshworks/crayons"
React - import { ProgressLoaderController } from "@freshworks/crayons/react"

 const loaderCustom= ProgressLoaderController({
    //...Progress Loader Options
 });
```
#### ProgressLoaderOptions
```js
interface ProgressLoaderOptions {
  /**
   * Changes the minimum percentage used upon starting. Default is `0.08`
   */
  minimum?: number;
  /**
   * Adjust animation settings using easing (a CSS easing string). Default is `ease`
   */
  easing?: string;
  /**
   * Add speed (in ms). Default is `200`
   */
  speed?: number;
  /**
   * Turn on/off the automatic incrementing behavior by setting this to false. Default is `true`
   */
  trickle?: boolean;
  /**
   * Adjust how often to trickle/increment, in ms. Default is `200`
   */
  trickleSpeed?: number;
  /**
   * Specify a selector to change the parent container. Default is `body`
   * Selector is accessed internally via document.querySelector method
   */
  parent?: string;
  /**
   * Use Custom markup. To keep the progress bar working, keep an element with class='bar' in there
   */
  template?: string;
}
```


<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                                                                                                            | Type      | Default                                                                            |
| -------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------- |
| `easing`       | `easing`        | Adjust animation settings using easing (a CSS easing string). Default is `ease`                                                        | `string`  | `'ease'`                                                                           |
| `minimum`      | `minimum`       | Changes the minimum percentage used upon starting. Default is `0.08`                                                                   | `number`  | `0.08`                                                                             |
| `parent`       | `parent`        | Specify a selector to change the parent container. Default is `body` Selector is accessed internally via document.querySelector method | `string`  | `'body'`                                                                           |
| `show`         | `show`          | Show progress loader. Default `false`                                                                                                  | `boolean` | `false`                                                                            |
| `speed`        | `speed`         | Add speed (in ms). Default is `200`                                                                                                    | `number`  | `200`                                                                              |
| `template`     | `template`      | Use Custom markup. To keep the progress bar working, keep an element with class='bar' in there                                         | `string`  | `'<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="1"></div>'` |
| `trickle`      | `trickle`       | Turn on/off the automatic incrementing behavior by setting this to false. Default is `true`                                            | `boolean` | `true`                                                                             |
| `trickleSpeed` | `trickle-speed` | Adjust how often to trickle/increment, in ms. Default is `200`                                                                         | `number`  | `200`                                                                              |


## Methods

### `done() => Promise<void>`

Method to end the progress. This hides the progress loader

#### Returns

Type: `Promise<void>`



### `inc() => Promise<void>`

Increments the progress status by a random amount.

#### Returns

Type: `Promise<void>`



### `set(n: number) => Promise<void>`

Sets the progress loader status, where `n` is a number from `0.0` to `1.0`.

#### Returns

Type: `Promise<void>`



### `start() => Promise<void>`

Method to start showing the progress loader

#### Returns

Type: `Promise<void>`




----------------------------------------------

Built with ❤ at Freshworks
