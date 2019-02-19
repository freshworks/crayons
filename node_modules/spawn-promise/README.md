# spawn-promise

Spawns a process and makes it simple to pipe data in and get data out.

[![npm version](https://img.shields.io/npm/v/spawn-promise.svg)](https://www.npmjs.com/package/spawn-promise)
[![npm license](https://img.shields.io/npm/l/spawn-promise.svg)](https://www.npmjs.com/package/spawn-promise)
[![Travis](https://img.shields.io/travis/panosoft/spawn-promise.svg)](https://travis-ci.org/panosoft/spawn-promise)
[![David](https://img.shields.io/david/panosoft/spawn-promise.svg)](https://david-dm.org/panosoft/spawn-promise)
[![npm downloads](https://img.shields.io/npm/dm/spawn-promise.svg)](https://www.npmjs.com/package/spawn-promise)

## Installation

```sh
npm install spawn-promise
```

## Usage

```js
var spawn = require(spawn-promise);

spawn('grep', ['H'], 'Hello').then(function (buffer) {
  console.log(buffer.toString()); // Hello
});
```

## API

- [`spawn`](#spawn)

---

<a name="spawn"></a>
#### spawn ( command [, args] [, input] )

Spawns a child process with the given `command`, writes the `input` value to `stdin`, and returns a `Promise` that is fulfilled with the concatenated `stdout` buffer.

__Arguments__

- `command` - The command to run.
- `args` - An array of arguments to run the `command` with.
- `input` - The value to write to `stdin`.
