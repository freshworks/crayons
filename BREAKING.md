# Breaking Changes

This is a comprehensive list of the breaking changes introduced in the major version releases of Crayons.

---

- [Versions](#versions)
- [Version 3.x](#version-3x)
  - [Global Styles](#global-styles)
  - [Input Control Events](#input-control-events)
  - [Components](#components)
    - [Button](#button)
    - [Checkbox](#checkbox)
    - [Datepicker](#datepicker)
    - [Dropdown button](#dropdown-button)
    - [Icon](#icon)
    - [Input](#input)
    - [Label](#label)
    - [Radio Group](#radio-group)
    - [Radio](#radio)
    - [Select](#select)
    - [Spinner](#spinner)
    - [Tabs](#tabs)
    - [Tab](#tab)
    - [Textarea](#textarea)
    - [Timepicker](#timepicker)
    - [Modal](#modal)

## Versions

---

1.  [Version 3.x](#version-3x)

## Version 3.x

- [Documentation](https://crayons.freshworks.com/)

---

### Global Styles

Below are the changes w.r.t global css variables in v3

| Old Variable           | Status  | New Variable |
| ---------------------- | ------- | ------------ |
| --color-milk           | removed |              |
| --color-elephant-900   | removed |              |
| --color-elephant-800   | removed |              |
| --color-elephant-700   | removed |              |
| --color-elephant-600   | removed |              |
| --color-smoke-700      | removed |              |
| --color-smoke-300      | removed |              |
| --color-smoke-100      | removed |              |
| --color-smoke-50       | removed |              |
| --color-smoke-25       | removed |              |
| --color-jungle-800     | removed |              |
| --color-jungle-500     | removed |              |
| --color-jungle-100     | removed |              |
| --color-jungle-50      | removed |              |
| --color-azure-800      | removed |              |
| ---color-azure-100     | removed |              |
| --color-azure-50       | removed |              |
| --color-persimmon-900  | removed |              |
| --color-persimmon-800  | removed |              |
| --color-persimmon-100  | removed |              |
| --color-persimmon-50   | removed |              |
| --color-casablanca-700 | removed |              |
| --color-casablanca-300 | removed |              |
| --color-casablanca-100 | removed |              |
| --color-casablanca-50  | removed |              |
| --border-color         | removed |              |
| --border-success-color | removed |              |
| --border-info-color    | removed |              |
| --border-danger-color  | removed |              |
| --border-warning-color | removed |              |
| --bg-dark              | removed |              |
| --bg-success           | removed |              |
| --bg-info              | removed |              |
| --bg-danger            | removed |              |
| --bg-warning           | removed |              |
| --radius               | removed |              |
| --radius-small         | removed |              |
| --font-stack           | removed |              |
| --font-weight-300      | removed |              |
| --font-weight-400      | removed |              |
| --font-weight-500      | removed |              |
| --font-weight-600      | removed |              |
| --font-weight-700      | removed |              |
| --font-size-10         | removed |              |
| --font-size-12         | removed |              |
| --font-size-14         | removed |              |
| --font-size-16         | removed |              |
| --font-size-18         | removed |              |
| --font-size-20         | removed |              |
| --font-size-24         | removed |              |
| --text-default         | removed |              |
| --text-secondary       | removed |              |
| --text-success         | removed |              |
| --text-info            | removed |              |
| --text-danger          | removed |              |
| --text-warning         | removed |              |
| --text-link            | removed |              |
| --icon-primary         | removed |              |
| --icon-primary-hover   | removed |              |
| --font-size-20         | removed |              |
| --font-size-20         | removed |              |
| --font-size-20         | removed |              |
| --font-size-20         | removed |              |
| --font-size-20         | removed |              |
| --font-size-20         | removed |              |

To check about the css variables used in each components please check the official documentation page for the components [here](https://crayons.freshworks.com/components)

### Input Control Events

---

Below are the breaking changes in Input Control Events

- **fw-input**: `fwChange` event will no longer be emitted.
- **fw-textarea**: `fwChange` event will no longer be emitted.
- **fw-radio-group**: `fwChange` event will no longer be emitted on changing value programatically.
- **fw-checkbox**: `checked` field will be a part of meta field in the event detail for fwChange. Now it can be accessed using `event.detail.meta.checked` instead of `event.detail.checked`.
- **fw-select**: `selectedOptions` field will be a part of meta field in the event detail for `fwChange`. Now it can be accessed using `event.detail.meta.selectedOptions` instead of `event.detail.selectedOptions`.
- **fw-list-options**: `selectedOptions` field will now be part of meta field in the event detail for `fwChange`. Now it can be accessed using `event.detail.meta.selectedOptions` instead of `event.detail.selectedOptions`.

### Components

#### Button

- Properties

  `expand` property has been removed. To create a block level button, use the below:

  ```html
  <fw-button style="display: block;">Span full-width</fw-button>
  ```

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

#### Checkbox

- Events

  `fwChange`: This event will longer be emitted on changing value programatically. Instead it will be emitted only on changing value by mouse click/ Keyboard event.
  The `checked` field will be a part of `meta` field in the event detail for `fwChange`. Now it can be accessed using `event.detail.meta.checked` instead of `event.detail.checked`.

  `fwBlur` and `fwChange` events are emitted in the below format:

  | Component   | Before                           | After                                                  |
  | ----------- | -------------------------------- | ------------------------------------------------------ |
  | fw-checkbox | fwBlur.emit()                    | fwBlur.emit({ event, name })                           |
  | fw-checkbox | fwChange.emit({ value, checked } | fwChange.emit({ event, name, value, meta: {checked} }) |

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

  `fwChange`: `value` will be a part of event detail for `fwChange`. Now it can be accessed using `event.detail.value` instead of `event.detail`

  | Component     | Before               | After                                 |
  | ------------- | -------------------- | ------------------------------------- |
  | fw-datepicker | fwChange.emit(value) | fwChange.emit({ event, name, value }) |

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

Icons architecture has been redesigned and a new package `@freshworks/crayons-icon` has been created. To know more refer [here](https://crayons.freshworks.com/components/core/icon)

- Properties

  `name` property's value must be a valid svg Name in the Crayons-Icon set. For the exhaustive list of icons and usage refer [here](https://crayons.freshworks.com/components/core/icon/#crayons-icon-assets)

- CSS Variables

  Below are the changes w.r.t CSS variables

  | Old Variable | Status  | New Variable    |
  | ------------ | ------- | --------------- |
  | --icon-color | renamed | --fw-icon-color |

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

  `fwInput` and `fwBlur` events are emitted in the below format:

  | Component | Before                   | After                                |
  | --------- | ------------------------ | ------------------------------------ |
  | fw-input  | fwBlur.emit()            | fwBlur.emit({ event, name })         |
  | fw-input  | fwInput.emit(event)      | fwInput.emit({ event, name, value }) |
  | fw-input  | fwChange.emit({ value }) | -                                    |

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
      console.log('blurred', event.detail.event, event.detail.name);
    });
  </script>
  ```

  #### Label

  - CSS variables

  Below are the changes w.r.t CSS variables

  | Old Variable               | Status  | New Variable                  |
  | -------------------------- | ------- | ----------------------------- |
  | --label-padding-vertical   | renamed | --fw-label-padding-vertical   |
  | --label-padding-horizontal | renamed | --fw-label-padding-horizontal |

  #### Radio Group

  - Events

  `fwChange` event will longer be emitted on changing value programatically. Instead it will be emitted only on changing value by mouse click / keyboard event.

  | Component      | Before                   | After                                                                                                                                                           |
  | -------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | fw-radio-group | fwChange.emit({ value }) | fwChange.emit({ event, name, value } - This event will be emitted only for certain keyup events such as 'ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Space'. |

  #### Radio

  `fwBlur` event is emitted in the below format:

  - Events

  | Component | Before        | After                        |
  | --------- | ------------- | ---------------------------- |
  | fw-radio  | fwBlur.emit() | fwBlur.emit({ event, name }) |

  #### Select

  - Properties

  `stateText` property has been removed. Instead use `hintText`, `errorText`, `warningText` property. The corresponding `text` will be shown based on the value of `state` property.

  **Old**

  ```html
  <fw-select state-text="This is required!" state="error"></fw-select>
  <fw-select state-text="This is a hint text" state="normal"></fw-select>
  ```

  **New**

  ```html
  <fw-select error-text="This is required!" state="error"></fw-select>
  <fw-select hint-text="This is a hint text" state="normal"></fw-select>
  ```

  `value` property has been modified for multi-select. The value property represents the selected value. In case of single select the type of value should be string, but in case of multi-select the type of value should be an **array of strings**.

  **Old**

  ```html
  <fw-select id="multi-select" label="House Name" value="1" multiple>
    <fw-select-option value="1">Starks</fw-select-option>
    <fw-select-option value="2">Lannisters</fw-select-option>
  </fw-select>
  ```

  **New**

  ```javascript
  var multiSelect = document.getElementById('multi-select');
  multiSelect.value = ['1'];
  ```

  `autoFocus` property has been removed. You can use `setFocus()` method to set focus on the select

  - Accessibility
    Removed activating the fw-select component via space button, use can use Enter key instead.

  - CSS variables

  Below are the changes w.r.t CSS variables

  | Old Variable | Status   | New Variable            |
  | ------------ | -------- | ----------------------- |
  | --max-height | replaced | --fw-popover-max-height |
  | --min-height | replaced | --fw-popover-min-height |

  #### Spinner

  - CSS variables

  Below are the changes w.r.t CSS variables

  | Old Variable    | Status  | New Variable       |
  | --------------- | ------- | ------------------ |
  | --spinner-color | renamed | --fw-spinner-color |

#### Tabs

- CSS variables
  Below are the changes w.r.t CSS variables

  | Old Variable           | Status  | New Variable |
  | ---------------------- | ------- | ------------ |
  | --tab-header-font-size | removed |              |
  | --tabs-color-primary   | removed |              |

#### Tab

- Properties

  `tabHeaderHtml` property has been removed. Instead use, `fw-tab's` slotted content for html content for tab header and use `fw-tab-panel` for panel content

  **Old**

  ```html
  <fw-tab tab-header-html="<a href='#'>Google</a>">Content</fw-tab>
  ```

  **New**

  ```html
  <fw-tab pane="one"><a href="#">Google</a></fw-tab>
  <fw-tab-panel name="one"></fw-tab-panel>
  ```

- Events

  `propChanged` event has been removed.

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

  `fwInput` and `fwBlur` events are emitted in the below format:

  | Component   | Before                   | After                                |
  | ----------- | ------------------------ | ------------------------------------ |
  | fw-textarea | fwBlur.emit()            | fwBlur.emit({ event, name })         |
  | fw-textarea | fwInput.emit(event)      | fwInput.emit({ event, name, value }) |
  | fw-textarea | fwChange.emit({ value }) | -                                    |

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
      console.log('blurred', event.detail.event, event.detail.name);
    });
  </script>
  ```

- CSS variables

  Below are the changes w.r.t CSS variables

  | Old Variable        | Status  | New Variable              |
  | ------------------- | ------- | ------------------------- |
  | --label-font        | removed |                           |
  | --input-bg          | removed |                           |
  | --help-color        | removed |                           |
  | --error-color       | removed |                           |
  | --input-disabled-bg | removed |                           |
  | --input-hover-color | removed |                           |
  | --input-focus-color | removed |                           |
  | --input-border      | removed |                           |
  | --warning-color     | removed |                           |
  | --input-color       | renamed | --fw-textarea-input-color |

#### Timepicker

Timepicker has been refactored to use `date-fns` instead of `moment-mini`

- Properties

  The values for `format` property has been changed from `'hh:mm A' | 'HH:mm'` to `'hh:mm a' | 'HH:mm'`. Default to `'hh:mm a'`

#### Modal

- Properties

  `visibility` property renamed to `is-open`.

  **old**

  ```html
  <fw-modal visibility="true" title-text="Greeting">Hello world!</fw-modal>
  ```

  **new**

  ```html
  <fw-modal is-open="true" title-text="Greeting">Hello world!</fw-modal>
  ```

  `custom-footer` property has been removed. Use composition technique instead.

  **old**

  ```html
  <fw-modal title-text="Greeting" custom-footer>
    Hello world!
    <span slot="footer">
      <fw-button color="danger">Close</fw-button>
    </span>
  </fw-modal>
  ```

  **new**

  ```html
  <fw-modal title-text="Greeting">
    <fw-modal-content>Hello World!</fw-modal-content>
    <fw-modal-footer>
      <fw-button color="danger">Close</fw-button>
    </fw-modal-footer>
  </fw-modal>
  ```

  `success-text` property changed to `submit-text`.

  **old**

  ```html
  <fw-modal title-text="Greeting" success-text="Close"> Hello world! </fw-modal>
  ```

  **new**

  ```html
  <fw-modal title-text="Greeting" submit-text="Close"> Hello world! </fw-modal>
  ```

- Events

  `onFwAction` name changed to `onFwSubmit`.

  **old**

  ```html
  <fw-modal title-text="Greeting"> Hello world! </fw-modal>
  <script>
    document.querySelector('fw-modal').addEventListener('fwAction', (event) => {
      console.log('value', event.detail);
    });
  </script>
  ```

  **new**

  ```html
  <fw-modal title-text="Greeting"> Hello world! </fw-modal>
  <script>
    document.querySelector('fw-modal').addEventListener('fwSubmit', (event) => {
      console.log('value', event.detail);
    });
  </script>
  ```

  `onFwClosed` name changed to `onFwClose`.

  **old**

  ```html
  <fw-modal title-text="Greeting"> Hello world! </fw-modal>
  <script>
    document.querySelector('fw-modal').addEventListener('fwClosed', (event) => {
      console.log('value', event.detail);
    });
  </script>
  ```

  **new**

  ```html
  <fw-modal title-text="Greeting"> Hello world! </fw-modal>
  <script>
    document.querySelector('fw-modal').addEventListener('fwClose', (event) => {
      console.log('value', event.detail);
    });
  </script>
  ```
