# ToggleGroupButton (fw-toggle-group-button)

fw-toggle-group-button displays a button on the user interface and enables performing specific actions based on the button type. This button can be used as a card or an icon button

## Demo

```html live
<section>
  <fw-label value="Icon button"></fw-label>
  <fw-toggle-group-button
    icon-name="phone"
    value="aa"
    type="icon"
  ></fw-toggle-group-button>
  <fw-toggle-group-button
    icon-name="phone"
    value="aa"
    type="delete"
  ></fw-toggle-group-button>
</section>

<br />

<section>
  <fw-label value="Card button"></fw-label>
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
</section>
```
