# Button
Button is a clickable input control that enables specific actions based on the type of button. A button can be labeled using text, icon, or both. 

## Usage

### Button Types

```html live
<fw-button color="primary"> Primary </fw-button>
<fw-button color="secondary"> Secondary </fw-button>
<fw-button color="danger"> Danger </fw-button>
<fw-button color="link"> Link </fw-button>
<fw-button color="text"> Text </fw-button>
```

### Block Buttons

```html live
<fw-button expand>Default</fw-button>
<fw-button color="primary" expand>Primary</fw-button>
<fw-button color="secondary" expand>Secondary</fw-button>
<fw-button color="danger" expand>Danger</fw-button>
```

### Small Buttons
```html live
<fw-button size="small">Default</fw-button>
<fw-button color="primary" size="small">Primary</fw-button>
<fw-button color="secondary" size="small">Secondary</fw-button>
<fw-button color="danger" size="small">Danger</fw-button>
```

### Mini Buttons
```html live
<fw-button size="mini">Default</fw-button>
<fw-button color="primary" size="mini">Primary</fw-button>
<fw-button color="secondary" size="mini">Secondary</fw-button>
<fw-button color="danger" size="mini">Danger</fw-button>
```

### Icon Buttons
```html live
<fw-button size="icon"><fw-icon name="phone" color="white"></fw-icon></fw-button>
<fw-button color="primary" size="icon"><fw-icon color="#fefefe" name="agent"></fw-icon></fw-button>
<fw-button color="secondary" size="icon"><fw-icon name="check"></fw-icon></fw-button>
<fw-button color="danger" size="icon"><fw-icon color="#fefefe" name="code"></fw-icon></fw-button>
```

### Icon with text Buttons
```html live
<fw-button><fw-icon name="phone" color="white"></fw-icon> Call</fw-button>
<fw-button color="primary"><fw-icon color="#fefefe" name="agent"></fw-icon> Support</fw-button>
<fw-button color="secondary"><fw-icon name="delete"></fw-icon> Delete</fw-button>
<fw-button color="danger"><fw-icon color="#fefefe" name="code"></fw-icon> See Code</fw-button>
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                                | Type                                                       | Default     |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `color`    | `color`    | Identifier of  the theme based on which the button is styled.                                                              | `"danger" \| "link" \| "primary" \| "secondary" \| "text"` | `'primary'` |
| `disabled` | `disabled` | Specifies whether to disable the button on the interface. If the attribute’s value is undefined, the value is set to true. | `boolean`                                                  | `false`     |
| `expand`   | `expand`   | Sets the button to a full-width block. If the attribute’s value is undefined, the value is set to true.                    | `boolean`                                                  | `false`     |
| `size`     | `size`     | Size of the button.                                                                                                        | `"mini" \| "normal" \| "small"`                            | `'normal'`  |
| `type`     | `type`     | Button type based on which actions are performed when the button is clicked.                                               | `"button" \| "reset" \| "submit"`                          | `'button'`  |


## Events

| Event     | Description                            | Type                |
| --------- | -------------------------------------- | ------------------- |
| `fwBlur`  | Triggered when the button loses focus. | `CustomEvent<void>` |
| `fwClick` | Triggered when the button is clicked.  | `CustomEvent<void>` |
| `fwFocus` | Triggered when the button loses focus. | `CustomEvent<void>` |


----------------------------------------------

Built with ❤ at Freshworks
