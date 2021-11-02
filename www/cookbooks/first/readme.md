# First Cookbook
<code-group>
<code-block title="HTML">

::: demo First CookBook

card template with input controls
```html
<fw-icon name="add-contact"></fw-icon>
 <fw-input value="kjhgfdrftgyjhkujlnhbgvhfcty kjghfcftgh"></fw-input>
   <fw-select
      label="Select App type"
      placeholder="Choose app type"
      value="2"
      
      >
          <fw-select-option value="1" html option-text="LLL">
                <div style="color: red; padding: 10px;">Lannister </div class="cls">
                <div style="color: green; padding: 5px;">Lannisters are gods</div>
          </fw-select-option>
          <fw-select-option value="2">
            Shenigans
          </fw-select-option>
  </fw-select>
  <fw-textarea cols=75 rows=5 value="qwertyuiop asdfghjk zxcvbnm" ></fw-textarea>
  
  <fw-timepicker min-time="11:25 AM" max-time="03:45 PM" value="11:25" interval=45> </fw-timepicker>
  <fw-timepicker min-time="01:39 AM" interval=55> </fw-timepicker>
  <div style="display:flex;justify-content:flex-start;">
    <fw-datepicker></fw-datepicker>
    <fw-datepicker mode="range"></fw-datepicker>
  </div>
  
  <fw-toast content="Successfully triggered"></fw-toast>
  <fw-button onClick="document.querySelector('fw-toast').trigger({type:'success'})">Trigger Toast</fw-button>
  
  <br><br>
  <fw-dropdown-button label="Click me" split color="danger" placeholder="efwewe">
    <div slot="dropdown-options">
      <option id="1" value="Ullu">Ullu</option>
      <option id="2" value="Hotstar">Hotstar</option>
      <option id="3" value="Amazon">Amazon</option>
      <option id="4" value="Netflix">Netflix</option>
      <option id="5" value="Mx player">Mx Player</option>
      <option id="6" value="Share it">Share it</option>
      <option id="7" value="Prime">Amazon Prime</option>
      <option id="8" value="Watch32">Watch32</option>
      <option id="9" value="YTS Movies">YTS Movies</option>
      <option id="10" value="Telegram">Telegram</option>
      <option id="11" value="Solar Movies">Solar Movies</option>
      <option id="12" value="Yifi torrents">Yifi torrents</option>
    </div>
  </fw-dropdown-button>
  
  <fw-label color="red" value="wfwefwe" style="--label-padding-vertical: 10px; --label-padding-horizontal:20px" />
 
```

```js
document.querySelector("fw-icon").addEventListener("click", () => {
  alert("icon clicked");
});
 window.addEventListener('fwLinkClick', eventHandler);
    function eventHandler(e) {
      console.log('action link clicked', e);
    }
    window.addEventListener('fwChange', function(e) {
      console.log('datepicker fwChange triggered', e);
    });
    document.querySelector('fw-dropdown-button')
      .addEventListener('fwOptionsAdd', (e) => console.log('Selected values are ', e.detail.value))
  
    document.querySelector('fw-dropdown-button')
      .addEventListener('fwOptionClick', (e) => console.log('Selected values are ', e.detail.value))
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
  const message = "hello workd";

  const handler = () => {
    alert(message);
  };
  return <h1>hello</h1>

  // return (
  //  <FwIcon name="agent" onClick={handler}></FwIcon>
  // );
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
      "https://unpkg.com/@freshworks/crayons@canary/dist/crayons/crayons.js",
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