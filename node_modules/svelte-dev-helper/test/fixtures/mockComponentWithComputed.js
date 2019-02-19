function create_main_fragment() {
  return {
    c: function create() { },
    h: function hydrate() { },
    m: function mount() { },
    p: function update() { },
    u: function unmount() { },
    d: function destroy() { }
  }
}

export default class {
  constructor() {
    this.refs = {};
    this._fragment = create_main_fragment();
    this._slotted = {};
    this.root = {};
    this.store = {};
    this._bind = function () { };
  }
  customMethod() { }
  anotherCustomMethod() { }
  get() { }
  fire() { }
  observe() { }
  on() { }
  set(a) {
    if (!this._updatingReadonlyProperty) throw new Error("Simulated error, would be thrown if trying to set computed props");
  }
  teardown() { }
  _recompute() { }
  _set() { }
  _mount() { }
  _unmount() { }
  destroy() { }
}