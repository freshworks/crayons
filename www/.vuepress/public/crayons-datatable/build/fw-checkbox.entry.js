import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-4996832f.js';
import { r as renderHiddenField } from './index-268121b7.js';

const checkboxCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.checkbox-container){display:inline-block;position:relative;padding-left:22px;margin-bottom:8px}:host(:focus) input[type=checkbox]+label::before{border:1px solid transparent;-webkit-box-shadow:0 0 0 2px #2c5cc5;box-shadow:0 0 0 2px #2c5cc5}:host(:focus) input[type=checkbox][disabled]+label::before{-webkit-box-shadow:none;box-shadow:none;border:1px solid #dadfe3}#description{font-size:12px;color:#475867;letter-spacing:0;line-height:20px;position:relative;font-weight:400;word-wrap:break-word}:host(:hover) input[type=checkbox]+label::before{border-color:#12344d;-webkit-box-shadow:0 0 0 5px #ebeff3;box-shadow:0 0 0 5px #ebeff3}:host(:hover) input[type=checkbox][disabled]+label{cursor:not-allowed}:host(:hover) input[type=checkbox][disabled]+label::before{-webkit-box-shadow:none;box-shadow:none;border:1px solid #dadfe3}input[type=checkbox]{display:none}input[type=checkbox]+label{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin-bottom:4px;vertical-align:middle;font-size:14px;color:#12344d;font-weight:600;line-height:20px}@media screen and (prefers-reduced-motion: reduce){input[type=checkbox]+label::before{-webkit-transition:none;transition:none}}input[type=checkbox]+label::before{position:absolute;left:0;top:3px;display:block;content:\"\";border:1px solid #cfd7df;height:14px;width:14px;background-color:#fff;-webkit-transition:all 0.2s ease;transition:all 0.2s ease;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px}@media screen and (prefers-reduced-motion: reduce){input[type=checkbox]+label::after{-webkit-transition:none;transition:none}}input[type=checkbox]+label::after{position:absolute;display:block;content:\"\";left:4px;top:5px;width:5px;height:7px;-webkit-transform:rotate(45deg);transform:rotate(45deg);opacity:0;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out;-webkit-box-sizing:border-box;box-sizing:border-box}input[type=checkbox]:checked+label::before{background:#2c5cc5;border-color:#2c5cc5;-webkit-box-shadow:none;box-shadow:none}input[type=checkbox]:checked+label::after{border-right:2px solid #fff;border-bottom:2px solid #fff;opacity:1;top:5px}input[type=checkbox]:checked:hover+label::before{-webkit-box-shadow:0 0 0 5px #ebeff3;box-shadow:0 0 0 5px #ebeff3}input[type=checkbox]:checked:hover+label::after{border-right:2px solid #fff;border-bottom:2px solid #fff;opacity:1;top:5px}input[type=checkbox]:checked:focus+label::before{background:#2c5cc5;border-color:#fff;-webkit-box-shadow:0 0 0 1px #2c5cc5;box-shadow:0 0 0 1px #2c5cc5}input[type=checkbox]:checked:focus+label::after{border-right:2px solid #fff;border-bottom:2px solid #fff;opacity:1;top:5px}input[type=checkbox][disabled]+label{color:#92a2b1}input[type=checkbox][disabled]+label .label-field{color:#92a2b1}input[type=checkbox][disabled]+label::before{border-color:#dadfe3;background-color:#ebeff3}input[type=checkbox][disabled]:checked+label{color:#92a2b1}input[type=checkbox][disabled]:checked+label::before{background:#dadfe3}";

let Checkbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    /**
     * Sets the state of the check box to selected. If the attribute’s value is undefined, the value is set to false.
     */
    this.checked = false;
    /**
     * Disables the check box on the interface. If the attribute’s value is undefined, the value is set to false.
     */
    this.disabled = false;
    /**
     * Label displayed on the interface, for the check box.
     */
    this.label = '';
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    /**
     * Identifier corresponding to the component, that is saved when the form data is saved.
     */
    this.value = '';
  }
  componentDidLoad() {
    this.checkbox.checked = this.checked;
    this.checkbox.disabled = this.disabled;
  }
  checkChanged(isChecked) {
    if (!this.disabled) {
      this.fwChange.emit({
        value: this.value,
        checked: isChecked,
      });
    }
    this.checkbox.checked = isChecked;
  }
  disabledChanged(isDisabled) {
    this.checkbox.disabled = isDisabled;
  }
  handleKeydown(ev) {
    if (ev.code === 'Space') {
      ev.preventDefault();
    }
  }
  handleKeyup(ev) {
    if (ev.code === 'Space') {
      this.toggle();
    }
  }
  onFocus() {
    this.fwFocus.emit();
  }
  onBlur() {
    this.fwBlur.emit();
  }
  toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }
  render() {
    const { host, name, value } = this;
    if (this.checked) {
      renderHiddenField(host, name, value);
    }
    return (h(Host, { class: 'checkbox-container', onClick: () => this.toggle(), role: 'checkbox', tabIndex: '0', "aria-disabled": this.disabled ? 'true' : 'false', "aria-checked": this.checked ? 'true' : 'false', "aria-label": this.label, "aria-describedby": 'description', onFocus: () => this.onFocus(), onBlur: () => this.onBlur() }, h("input", { type: 'checkbox', ref: (el) => (this.checkbox = el) }), h("label", null, this.label), h("div", { id: 'description' }, h("slot", null))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "checked": ["checkChanged"],
    "disabled": ["disabledChanged"]
  }; }
};
Checkbox.style = checkboxCss;

export { Checkbox as fw_checkbox };
