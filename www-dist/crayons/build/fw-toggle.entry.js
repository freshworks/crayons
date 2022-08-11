import { r as registerInstance, h as createEvent, i as h, k as Host, j as getElement } from './index-44c267ce.js';
import { a as addRTL } from './index-a4741a9c.js';

const toggleCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}*,::after,::before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.toggle-switch{position:relative;display:inline-block}.toggle-switch.small{width:28px;height:12px}.toggle-switch.medium{width:36px;height:16px}.toggle-switch.large{width:44px;height:20px}@media screen and (prefers-reduced-motion: reduce){.toggle-switch .slider{-webkit-transition:none;transition:none}}.toggle-switch .slider{position:absolute;cursor:pointer;inset-block-start:0;inset-inline-start:0;inset-inline-end:0;inset-block-end:0;border-radius:34px;background:#647a8e}@media screen and (prefers-reduced-motion: reduce){.toggle-switch .before{-webkit-transition:none;transition:none}}.toggle-switch .before{position:absolute;content:\"\";inset-inline-start:0;inset-block-end:-2px;border:solid 1px #647a8e;border-radius:50%;-webkit-box-shadow:0 1px 1px 0 rgba(0, 0, 0, 0.23);box-shadow:0 1px 1px 0 rgba(0, 0, 0, 0.23);background-color:#fff;-webkit-transition-property:transform;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform, -webkit-transform;-webkit-transition-timing-function:ease;transition-timing-function:ease;-webkit-transition-duration:0.2s;transition-duration:0.2s;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.toggle-switch .before:hover,.toggle-switch .before:focus{-webkit-box-shadow:0 0 4px 4px rgba(87, 108, 125, 0.3);box-shadow:0 0 4px 4px rgba(87, 108, 125, 0.3)}.toggle-switch .slider.small{width:28px;height:12px}.toggle-switch .slider.small .before{width:16px;height:16px}.toggle-switch .slider.small .before fw-icon{-webkit-transform:scale(0.375);transform:scale(0.375)}.toggle-switch .slider.small .before fw-icon.checked{-webkit-transform:scale(0.5);transform:scale(0.5)}.toggle-switch .slider.medium{width:36px;height:16px}.toggle-switch .slider.medium .before{width:20px;height:20px}.toggle-switch .slider.medium .before fw-icon{-webkit-transform:scale(0.5);transform:scale(0.5)}.toggle-switch .slider.medium .before fw-icon.checked{-webkit-transform:scale(0.66);transform:scale(0.66)}.toggle-switch .slider.large{width:44px;height:20px}.toggle-switch .slider.large .before{width:24px;height:24px}.toggle-switch .slider.large .before fw-icon{-webkit-transform:scale(0.66);transform:scale(0.66)}.toggle-switch .slider.large .before fw-icon.checked{-webkit-transform:scale(0.83);transform:scale(0.83)}.toggle-switch input{display:none}.toggle-switch input:checked+.slider{background-color:#2c5cc5}.toggle-switch input:checked+.slider .before{border:solid 1px #2c5cc5}.toggle-switch input:checked+.slider .before:hover,.toggle-switch input:checked+.slider .before:focus{-webkit-box-shadow:0 0 4px 4px rgba(40, 61, 165, 0.3);box-shadow:0 0 4px 4px rgba(40, 61, 165, 0.3)}:host(:not([dir=\"rtl\"])) .toggle-switch input:checked+.slider.small .before,:host([dir=\"ltr\"]) .toggle-switch input:checked+.slider.small .before{-webkit-transform:translateX(12px);-ms-transform:translateX(12px);transform:translateX(12px)}:host([dir=\"rtl\"]) .toggle-switch input:checked+.slider.small .before{-webkit-transform:translateX(-12px);-ms-transform:translateX(-12px);transform:translateX(-12px)}:host(:not([dir=\"rtl\"])) .toggle-switch input:checked+.slider.medium .before,:host([dir=\"ltr\"]) .toggle-switch input:checked+.slider.medium .before{-webkit-transform:translateX(16px);-ms-transform:translateX(16px);transform:translateX(16px)}:host([dir=\"rtl\"]) .toggle-switch input:checked+.slider.medium .before{-webkit-transform:translateX(-16px);-ms-transform:translateX(-16px);transform:translateX(-16px)}:host(:not([dir=\"rtl\"])) .toggle-switch input:checked+.slider.large .before,:host([dir=\"ltr\"]) .toggle-switch input:checked+.slider.large .before{-webkit-transform:translateX(20px);-ms-transform:translateX(20px);transform:translateX(20px)}:host([dir=\"rtl\"]) .toggle-switch input:checked+.slider.large .before{-webkit-transform:translateX(-20px);-ms-transform:translateX(-20px);transform:translateX(-20px)}.toggle-switch input:disabled+.slider{opacity:0.4;cursor:not-allowed}";

let Toggle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    /**
     * Sets the selected state as the default state. If the attribute’s value is undefined, the value is set to false.
     */
    this.checked = false;
    /**
     * Size of the input control.
     */
    this.size = 'medium';
    /**
     * Name of the component, saved as part of the form data.
     */
    this.name = '';
    /**
     * Specifies whether to disable the control on the interface. If the attribute’s value is undefined, the value is set to false.
     */
    this.disabled = false;
    /**
     * Specifies whether to show the check and cancel icons on toggle button. If the attribute’s value is undefined, the value is set to true.
     */
    this.showIcon = true;
    /**
     * Label for the component, that can be used by screen readers.
     */
    this.label = '';
    this.toggle = () => {
      if (!this.disabled) {
        this.checked = !this.checked;
      }
    };
  }
  handleKeyUp(ev) {
    if (ev.code === 'Space' || ev.code === 'Enter') {
      this.toggle();
    }
  }
  handleKeyDown(ev) {
    if (ev.code === 'Space' || ev.code === 'Enter') {
      ev.preventDefault();
    }
  }
  watchHandler(newValue) {
    this.fwChange.emit({ checked: newValue });
  }
  connectedCallback() {
    addRTL(this.host);
  }
  render() {
    const toggleSize = ['small', 'medium', 'large'].includes(this.size)
      ? this.size
      : 'medium';
    return (h(Host, { onClick: () => this.toggle(), tabindex: '0', role: 'switch', "aria-disabled": this.disabled ? 'true' : 'false', "aria-checked": this.checked ? 'true' : 'false', "aria-label": this.label }, h("div", { class: {
        'toggle-switch': true,
        [toggleSize]: true,
      } }, h("input", { name: this.name, type: 'checkbox', disabled: this.disabled, checked: this.checked, class: 'checkboxClass' }), h("span", { class: {
        slider: true,
        [toggleSize]: true,
      } }, h("span", { class: 'before' }, this.showIcon && (h("fw-icon", { color: this.checked ? '#2c5cc5' : '#647a8e', name: this.checked ? 'check' : 'cross', class: { checked: this.checked }, library: 'system' })))))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "checked": ["watchHandler"]
  }; }
};
Toggle.style = toggleCss;

export { Toggle as fw_toggle };
