# First Cookbook
<code-group>
<code-block title="HTML">

::: demo First CookBook

```html
<fw-icon name="add-contact"></fw-icon>
```

```js
document.querySelector("fw-icon").addEventListener("click", () => {
  alert("icon clicked");
});
```

```css
span {
  color: red;
}
```

```json
{
  "jsLib": [
    "https://unpkg.com/@freshworks/crayons@canary/dist/crayons/crayons.js"
  ],
  "cssLib":[
   "https://unpkg.com/@freshworks/crayons@canary/css/crayons-min.css"
  ]
}
```
:::
</code-block>


<code-block title="React">
::: demo [react] First React CookBook

```js
export default () => {
  const message = "very handsome";

  const handler = () => {
    alert(message);
  };

  return (
   <FwIcon name="agent" onClick={handler}></FwIcon>
  );
};
```

```css
span {
  color: red;
}
```

```json
{
  "jsLib": [
    "https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js",
    "https://unpkg.com/@freshworks/crayons@3.0.0-beta.1/react/FwIcon.js"
  ],
  "cssLib":[
   "https://unpkg.com/@freshworks/crayons@canary/css/crayons-min.css"
  ]
}
```

:::
</code-block>

</code-group>