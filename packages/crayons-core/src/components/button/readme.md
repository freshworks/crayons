# Button (fw-button)
fw-button displays a button on the user interface and enables performing specific actions based on the button type. The button’s label can be a text, icon, or both.

## Usage

```html live
<section>
<fw-label value="Try themes"></fw-label>
<fw-button appearance="secondary"> OK </fw-button>
<fw-button appearance="danger"> Don't Click </fw-button>
<fw-button appearance="link"> Link Button </fw-button>
<fw-button appearance="text"> Plain Text Button </fw-button>
</section>
<br>
<section>
<fw-label value="Try sizes"></fw-label>
<fw-button size="small"> Small </fw-button>
<fw-button size="mini" appearance="secondary"> Mini </fw-button>
</section>
<br>
<section>
<fw-label value="Try icon buttons"></fw-label>
<fw-button size="icon"><fw-icon name="agent" color="white"></fw-icon> </fw-button>
<fw-button size="icon" appearance="secondary"><fw-icon name="phone"></fw-icon> </fw-button>
</section>
<br>
<section>
<fw-label value="Try icon + text buttons"></fw-label>
<fw-button appearance="secondary"><fw-icon name="delete"></fw-icon> Delete</fw-button>
<fw-button appearance="primary"> Copy <fw-icon name="code" color="white"></fw-icon></fw-button>
</section>
<br>
<section>
<fw-label value="Try block attribute"></fw-label>
<fw-button size="small" appearance="secondary" block>Span full-width</fw-button>
</section>
```



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                                                                                                                                          | Type                                                       | Default     |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ----------- |
| `appearance`     | `appearance`       | Identifier of  the theme based on which the button is styled.                                                                                                                        | `"danger" \| "link" \| "primary" \| "secondary" \| "text"` | `'primary'` |
| `block`          | `block`            | Sets the button to a full-width block. If the attribute’s value is undefined, the value is set to false.                                                                             | `boolean`                                                  | `false`     |
| `color`          | `color`            | <span style="color:red">**[DEPRECATED]**</span> use appearance instead Identifier of  the theme based on which the button is styled.<br/><br/>                                       | `"danger" \| "link" \| "primary" \| "secondary" \| "text"` | `'primary'` |
| `disabled`       | `disabled`         | Disables the button on the interface. If the attribute’s value is undefined, the value is set to false.                                                                              | `boolean`                                                  | `false`     |
| `expand`         | `expand`           | <span style="color:red">**[DEPRECATED]**</span> use block instead Sets the button to a full-width block. If the attribute’s value is undefined, the value is set to false.<br/><br/> | `boolean`                                                  | `false`     |
| `modalTriggerId` | `modal-trigger-id` | Accepts the id of the fw-modal component to open it on click                                                                                                                         | `string`                                                   | `''`        |
| `size`           | `size`             | Size of the button.                                                                                                                                                                  | `"mini" \| "normal" \| "small"`                            | `'normal'`  |
| `type`           | `type`             | Button type based on which actions are performed when the button is clicked.                                                                                                         | `"button" \| "reset" \| "submit"`                          | `'button'`  |


## Events

| Event     | Description                                 | Type                |
| --------- | ------------------------------------------- | ------------------- |
| `fwBlur`  | Triggered when the button loses focus.      | `CustomEvent<void>` |
| `fwClick` | Triggered when the button is clicked.       | `CustomEvent<void>` |
| `fwFocus` | Triggered when the button comes into focus. | `CustomEvent<void>` |


## Dependencies

### Used by

 - [fw-datepicker](../datepicker)
 - [fw-dropdown-button](../dropdown-button)
 - [fw-modal](../modal)

### Graph
```mermaid
graph TD;
  fw-datepicker --> fw-button
  fw-dropdown-button --> fw-button
  fw-modal --> fw-button
  style fw-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Built with ❤ at Freshworks
