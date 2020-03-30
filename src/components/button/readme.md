# Button (fw-button)
fw-button displays a button that enables specific actions based on the button type. The button’s label can be a text, icon, or both.

## Usage

```html live
<section>
<fw-label value="Try themes"></fw-label>
<fw-button color="secondary"> OK </fw-button>
<fw-button color="danger"> Don't Click </fw-button>
<fw-button color="link"> Link Button </fw-button>
<fw-button color="text"> Plain Text Button </fw-button>
</section>
<br>
<section>
<fw-label value="Try sizes"></fw-label>
<fw-button size="small"> Small </fw-button>
<fw-button size="mini" color="secondary"> Mini </fw-button>
</section>
<br>
<section>
<fw-label value="Try icon buttons"></fw-label>
<fw-button size="icon"><fw-icon name="agent" color="white"></fw-icon> </fw-button>
<fw-button size="icon" color="secondary"><fw-icon name="phone"></fw-icon> </fw-button>
</section>
<br>
<section>
<fw-label value="Try icon + text buttons"></fw-label>
<fw-button color="secondary"><fw-icon name="delete"></fw-icon> Delete</fw-button>
<fw-button color="primary"> Copy <fw-icon name="code" color="white"></fw-icon></fw-button>
</section>
<br>
<section>
<fw-label value="Try expand attribute"></fw-label>
<fw-button size="small" color="secondary" expand>Span full-width</fw-button>
</section>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                            | Type                                                       | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `color`    | `color`    | The theme of the button, Values are : `primary`, `secondary`, `danger` | `"danger" or "link" or "primary" or "secondary" or "text"` | `'primary'` |
| `disabled` | `disabled` | Sets the button as disabled when set to true.                          | `boolean`                                                  | `false`     |
| `expand`   | `expand`   | Sets the button size to block when set to true.                        | `boolean`                                                  | `false`     |
| `size`     | `size`     | The size of the button, Values are : `normal`, `mini`                  | `"mini" or "normal" or "small"`                            | `'normal'`  |
| `type`     | `type`     | The native button type: values: `button`, `reset`, `submit`            | `"button" or "reset" or "submit"`                          | `'button'`  |


## Events

| Event     | Description                           | Type                |
| --------- | ------------------------------------- | ------------------- |
| `fwBlur`  | Emitted when the checbox loses focus. | `CustomEvent<void>` |
| `fwClick` | Emitted when the button is clicked.   | `CustomEvent<void>` |
| `fwFocus` | Emitted when the checkbox has focus.  | `CustomEvent<void>` |


----------------------------------------------

Built with ❤ at Freshworks
