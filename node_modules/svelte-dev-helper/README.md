# svelte-dev-helper

[![Build Status](https://travis-ci.org/ekhaled/svelte-dev-helper.svg?branch=master)](https://travis-ci.org/ekhaled/svelte-dev-helper)

Helper for svelte components to ease development.
Used under the hood by [svelte-loader](https://github.com/sveltejs/svelte-loader).


## Usage

This is meant to be used under the hood for creating a build toolchain, or a dev helper based on [Svelte](https://svelte.technology/) components.

```js
import {Registry, configure, createProxy} from 'svelte-dev-helper';
import Component from './Component.html'; //some svelte component

configure(configOptions);

const id = someUniqueID();

Registry.set(id, {
  rollback: null,
  component: Component,
  instances:[]
});

export createProxy(id);

```

The component returned by `createProxy` now has the following features:
 1. Adds a `<!--<Component>-->` comment marker in the DOM just above where the component's DOM starts
 2. You can access the component instance using `$0.__component__` in devtools after higlighting the comment marker from above.
 3. You can access all **rendered** instances of a particular component using `Registry.get(id).instances`
 4. All instances have a `_rerender` method
 4. If you switch the `component` in the registry (using `Registry.set(id, Registry.get(id).component = newComponent)`) all **future renders** of the component will use the newly switched component.
 5. Following a switch as per above, you can switch all **rendered** components by first accessing the instances and then calling `_rerender` on them.
 6. The `rollback` property in any `Registry` item can be used to hold the last good version of a component. If there is an error instantiating a switched component, it will try to use the component version stored in `rollback`

 The `Registry` is also available at `window.__SVELTE_REGISTRY__`
