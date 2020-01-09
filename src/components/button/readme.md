# Button


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

| Property   | Attribute  | Description                                                            | Type                                                       | Default     |
| ---------- | ---------- | ---------------------------------------------------------------------- | ---------------------------------------------------------- | ----------- |
| `color`    | `color`    | The theme of the button, Values are : `primary`, `secondary`, `danger` | `"danger" \| "link" \| "primary" \| "secondary" \| "text"` | `'primary'` |
| `disabled` | `disabled` | Sets the button as disabled when set to true.                          | `boolean`                                                  | `false`     |
| `expand`   | `expand`   | Sets the button size to block when set to true.                        | `boolean`                                                  | `false`     |
| `size`     | `size`     | The size of the button, Values are : `normal`, `mini`                  | `"mini" \| "normal" \| "small"`                            | `'normal'`  |
| `type`     | `type`     | The native button type: values: `button`, `reset`, `submit`            | `"button" \| "reset" \| "submit"`                          | `'button'`  |


## Events

| Event     | Description                           | Type                |
| --------- | ------------------------------------- | ------------------- |
| `fwBlur`  | Emitted when the checbox loses focus. | `CustomEvent<void>` |
| `fwClick` | Emitted when the button is clicked.   | `CustomEvent<void>` |
| `fwFocus` | Emitted when the checkbox has focus.  | `CustomEvent<void>` |


----------------------------------------------

Built with ❤ at Freshworks
