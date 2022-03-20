# React

Crayons offers a React version for webcomponents. You can view both `html` and `react` samples in the documentation.

## Installation

To add crayons to your React app, install the package from npm.

```npm install @freshworks/crayons@3```

## Usage

### Importing components

Every Crayons component is available to import as a React component. For using button, please note we will be using `<FwButton>` instead of `<fw-button>`

```js
import { FwButton } from '@freshworks/crayons/react';

const App = () => (
  <FwButton color="primary">
    Click me
  </FwButton>
);

export default App;
```

### Event Handling

Crayons components emit custom events. For example, the button component emits the `fwClick` event when it is getting clicked. In React, you can listen for the event using `onFwClick`.

You can find the list of `properties`, `events` and `methods` for the webcomponent under each component's documentation.

```js
import { FwButton } from '@freshworks/crayons/react';

const App = () => (
  <FwButton color="primary" onFwClick={() => console.log("fwClick event emitted from button")}>
    Click me
  </FwButton>
);

export default App;
```