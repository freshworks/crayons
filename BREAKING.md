# Breaking Changes

This is a comprehensive list of the breaking changes introduced in the major version releases of Crayons.

## Versions

1.  [Version 3.x](#version-3x)

## Version 3.x

---

- [Components](#components)
  - [button](#button)
  - [checkbox](#checkbox)
  - [datepicker](#datepicker)
  - [dropdown-button](#dropdown-button)
  - [icon](#icon)
  - [input](#input)
  - [label](#label)
  - [modal](#modal)
  - [radio](#radio)
  - [radio-group](#radio-group)
  - [select](#select)
  - [select-option](#select-option)
  - [spinner](#spinner)
  - [tab](#tab)
  - [tabs](#tabs)
  - [tag](#tag)
  - [textarea](#textarea)
  - [timepicker](#timepicker)
  - [toast](#toast)
  - [toggle](#toggle)

### Global Styles

### Global Events

### Components

#### Button

- Properties

  `expand` property has been removed. To create a block level button, use the below:

  ```html
  <fw-button style="display: block;">Span full-width</fw-button>
  ```

- CSS variables

  Below are the changes w.r.t CSS variables

  | Old Variable                  | Status  | New Variable                       |
  | ----------------------------- | ------- | ---------------------------------- |
  | --btn-primary-color           | removed |                                    |
  | --btn-primary-bg              | removed |                                    |
  | --btn-primary-bg-dark         | removed |                                    |
  | --btn-primary-border          | removed |                                    |
  | --btn-primary-border-active   | removed |                                    |
  | --btn-secondary-color         | removed |                                    |
  | --btn-secondary-bg            | removed |                                    |
  | --btn-secondary-bg-dark       | removed |                                    |
  | --btn-secondary-border        | removed |                                    |
  | --btn-secondary-border-active | removed |                                    |
  | --btn-danger-color            | removed |                                    |
  | --btn-danger-bg               | removed |                                    |
  | --btn-danger-bg-dark          | removed |                                    |
  | --btn-danger-border           | removed |                                    |
  | --btn-link-color              | removed |                                    |
  | --btn-link-bg                 | removed |                                    |
  | --active-box-shadow           | removed |                                    |
  | --btn-link-bg                 | removed |                                    |
  |                               | added   | --fw-button-min-width              |
  |                               | added   | --fw-button-label-vertical-padding |

#### Checkbox

- Events

  `fwChange`: `checked` field will be a part of `meta` field in the event detail for `fwChange`. Now it can be accessed using `event.detail.meta.checked` instead of `event.detail.checked`:

  **Old**

  ```html
  <fw-checkbox id="checkbox">
    <script>
      document
        .querySelector('#checkbox')
        .addEventListener('fwChange', (event) => {
          console.log(event.detail.checked);
        });
    </script></fw-checkbox
  >
  ```

  **New**

  ```html
  <fw-checkbox id="checkbox">
    <script>
      document
        .querySelector('#checkbox')
        .addEventListener('fwChange', (event) => {
          console.log(event.detail.meta.checked);
        });
    </script></fw-checkbox
  >
  ```

#### Datepicker

Datepicker has been refactored to remove `moment-mini` dependency and now is replaced with `date-fns`

- Properties

  `dateFormat` property has been removed. Instead use `displayFormat` property (Format in which the date values selected in the calendar are populated in the input box. Defaults to the locale specific display format). Check [here](https://date-fns.org/v2.28.0/docs/format) for `date-fns` valid formats.

- Events

  `fwChange`: `value` will be a part of event detail for `fwChange`. Now it can be accessed using `event.detail.value` instead of `event.detail`:

  **Old**

  ```html
  <fw-datepicker id="datepicker">
    <script>
      document
        .querySelector('#datepicker')
        .addEventListener('fwChange', (event) => {
          console.log(event.detail);
        });
    </script></fw-datepicker
  >
  ```

  **New**

  ```html
  <fw-datepicker id="datepicker">
    <script>
      document
        .querySelector('#datepicker')
        .addEventListener('fwChange', (event) => {
          console.log(event.detail.value);
        });
    </script></fw-datepicker
  >
  ```

#### Dropdown button

- CSS variables

  Below are the changes w.r.t CSS variables

  | Old Variable                  | Status  | New Variable |
  | ----------------------------- | ------- | ------------ |
  | --btn-primary-color           | removed |              |
  | --btn-primary-bg              | removed |              |
  | --btn-primary-bg-dark         | removed |              |
  | --btn-primary-border          | removed |              |
  | --btn-primary-border-active   | removed |              |
  | --btn-secondary-color         | removed |              |
  | --btn-secondary-bg            | removed |              |
  | --btn-secondary-bg-dark       | removed |              |
  | --btn-secondary-border        | removed |              |
  | --btn-secondary-border-active | removed |              |
  | --btn-danger-color            | removed |              |
  | --btn-danger-bg               | removed |              |
  | --btn-danger-bg-dark          | removed |              |
  | --btn-danger-border           | removed |              |
  | --btn-link-color              | removed |              |
  | --btn-link-bg                 | removed |              |
  | --active-box-shadow           | removed |              |
  | --btn-link-bg                 | removed |              |

#### Icon

#### Input

- Properties

  `stateText` property has been removed. Instead use `hintText`, `errorText`, `warningText` property. The corresponding `text` will be shown based on the value of `state` property.

  **Old**

  ```html
  <fw-input state-text="This is required!" state="error"></fw-input>
  <fw-input state-text="This is a hint text" state="normal"></fw-input>
  ```

  **New**

  ```html
  <fw-input error-text="This is required!" state="error"></fw-input>
  <fw-input hint-text="This is a hint text" state="normal"></fw-input>
  ```

  `autoFocus` property has been removed. You can use `setFocus()` method to set focus on the input

- Events

  `fwChange` event has been removed. Instead use `fwInput` and `fwBlur`

  `fwInput` and `fwBlur` emits the values in the following format

  | Component | Before              | After                                |
  | --------- | ------------------- | ------------------------------------ |
  | fw-input  | fwBlur.emit()       | fwBlur.emit({ event, name })         |
  | fw-input  | fwInput.emit(event) | fwInput.emit({ event, name, value }) |

  **_Old_**

  ```html
  <fw-input id="input"></fw-input>
  <script>
    document.querySelector('#input').addEventListener('fwInput', (event) => {
      console.log('value', event.detail.event.target.value);
    });
    document.querySelector('#input').addEventListener('fwBlur', (event) => {
      console.log('blurred');
    });
  </script>
  ```

  **_New_**

  ```html
  <fw-input id="input"></fw-input>
  <script>
    document.querySelector('#input').addEventListener('fwInput', (event) => {
      console.log(event.detail.event, event.detail.name, event.detail.value);
    });
    document.querySelector('#input').addEventListener('fwBlur', (event) => {
      console.log('blurred', event.detail.name, event.detail.name);
    });
  </script>
  ```

#### Textarea

- Properties

  `stateText` property has been removed. Instead use `hintText`, `errorText`, `warningText` property. The corresponding `text` will be shown based on the value of `state` property.

  **Old**

  ```html
  <fw-textarea state-text="This is required!" state="error"></fw-textarea>
  <fw-textarea state-text="This is a hint text" state="normal"></fw-textarea>
  ```

  **New**

  ```html
  <fw-textarea error-text="This is required!" state="error"></fw-textarea>
  <fw-textarea hint-text="This is a hint text" state="normal"></fw-textarea>
  ```

  `autoFocus` property has been removed. You can use `setFocus()` method to set focus on the input

- Events

  `fwChange` event has been removed. Instead use `fwInput` and `fwBlur`

  `fwInput` and `fwBlur` emits the values in the following format

  | Component   | Before              | After                                |
  | ----------- | ------------------- | ------------------------------------ |
  | fw-textarea | fwBlur.emit()       | fwBlur.emit({ event, name })         |
  | fw-textarea | fwInput.emit(event) | fwInput.emit({ event, name, value }) |

  **_Old_**

  ```html
  <fw-textarea id="textarea"></fw-input>
  <script>
    document.querySelector('#textarea').addEventListener('fwInput', (event) => {
      console.log('value', event.detail.event.target.value);
    });
    document.querySelector('#textarea').addEventListener('fwBlur', (event) => {
      console.log('blurred');
    });
  </script>
  ```

  **_New_**

  ```html
  <fw-textarea id="textarea"></fw-input>
  <script>
    document.querySelector('#textarea').addEventListener('fwInput', (event) => {
      console.log(event.detail.event, event.detail.name, event.detail.value);
    });
    document.querySelector('#textarea').addEventListener('fwBlur', (event) => {
      console.log('blurred', event.detail.name, event.detail.name);
    });
  </script>
  ```

- CSS variables

  Below are the changes w.r.t CSS variables

  | Old Variable        | Status  | New Variable                |
  | ------------------- | ------- | --------------------------- |
  | --label-font        | removed |                             |
  | --input-bg          | removed |                             |
  | --help-color        | removed |                             |
  | --error-color       | removed |                             |
  | --input-disabled-bg | removed |                             |
  | --input-hover-color | removed |                             |
  | --input-focus-color | removed |                             |
  | --input-border      | removed |                             |
  | --warning-color     | removed |                             |
  | --input-color       | renamed | --fw-textarea-input-color   |
  |                     | added   | --fw-textarea-margin-bottom |
