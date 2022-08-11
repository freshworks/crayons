import { r as registerInstance, h as createEvent, i as h, k as Host, j as getElement } from './index-44c267ce.js';
import { b as hasSlot, r as renderHiddenField } from './index-a4741a9c.js';

const checkboxCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.field-control{position:relative}.field-control-label{display:block;font-size:12px;color:var(--fw-label-color, #475867);font-weight:600;-webkit-margin-after:4px;margin-block-end:4px;-webkit-padding-start:2px;padding-inline-start:2px;line-height:20px}.field-control-label.required::after{content:\"*\";position:relative;display:inline-block;inset-block-start:2px;font-size:14px;color:#d72d30;-webkit-padding-start:2px;padding-inline-start:2px;font-weight:700}.field-control-hint-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-hint-color, #acb6be);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-error-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-error-color, #d72d30);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-warning-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-warning-color, #f8ab59);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}:host{display:inline-block;position:relative}:host(:focus){outline:none}:host(:focus) input[type=checkbox]+label::before{border:1px solid transparent;-webkit-box-shadow:0 0 0 2px #2c5cc5;box-shadow:0 0 0 2px #2c5cc5}:host(:focus) input[type=checkbox]:checked+label::before{border:1px solid #ffffff}:host(:focus) input[type=checkbox][disabled]+label::before{-webkit-box-shadow:none;box-shadow:none;border:1px solid #dadfe3}:host(:hover) input[type=checkbox]+label::before{border-color:#cfd7df;-webkit-box-shadow:0 0 0 5px #ebeff3;box-shadow:0 0 0 5px #ebeff3}:host(:hover) input[type=checkbox]:checked+label::before{border-color:#2c5cc5}:host(:hover) input[type=checkbox][disabled]+label{cursor:not-allowed}:host(:hover) input[type=checkbox][disabled]+label::before{-webkit-box-shadow:none;box-shadow:none;border:1px solid #dadfe3}.checkbox-container{cursor:pointer}.checkbox-container.disabled{cursor:not-allowed}#description{font-size:12px;color:#475867;letter-spacing:0;line-height:20px;position:relative;font-weight:400;word-wrap:break-word;-webkit-padding-start:22px;padding-inline-start:22px}input[type=checkbox]{display:none}input[type=checkbox]+label{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-margin-after:0;margin-block-end:0;vertical-align:middle;font-size:14px;color:#12344d;line-height:20px;font-weight:400;cursor:inherit}input[type=checkbox]+label .with-description{font-weight:600}input[type=checkbox]+label #label{-webkit-padding-start:22px;padding-inline-start:22px;box-decoration-break:clone;-webkit-box-decoration-break:clone}input[type=checkbox]+label #label.required::after{content:\"*\";position:relative;display:inline-block;inset-block-start:2px;font-size:14px;color:#d72d30;-webkit-padding-start:2px;padding-inline-start:2px;font-weight:700}@media screen and (prefers-reduced-motion: reduce){input[type=checkbox]+label::before{-webkit-transition:none;transition:none}}input[type=checkbox]+label::before{position:absolute;inset-inline-start:0;inset-block-start:4px;display:block;content:\"\";border:1px solid #475867;height:14px;width:14px;background-color:#fff;-webkit-transition:all 0.2s ease;transition:all 0.2s ease;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px}@media screen and (prefers-reduced-motion: reduce){input[type=checkbox]+label.error::before{-webkit-transition:none;transition:none}}input[type=checkbox]+label.error::before{position:absolute;inset-inline-start:0;inset-block-start:4px;display:block;content:\"\";border:1px solid #d72d30;height:14px;width:14px;background-color:#fff;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:2px;-webkit-transition:all 0.2s ease;transition:all 0.2s ease}@media screen and (prefers-reduced-motion: reduce){input[type=checkbox]+label .after{-webkit-transition:none;transition:none}}input[type=checkbox]+label .after{position:absolute;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center;content:\"\";inset-inline-start:3px;inset-block-start:7px;width:8px;height:8px;opacity:0;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out;-webkit-box-sizing:border-box;box-sizing:border-box}input[type=checkbox]:checked+label::before{background:#2c5cc5;border-color:#2c5cc5;-webkit-box-shadow:none;box-shadow:none}input[type=checkbox]:checked+label .after{opacity:1}input[type=checkbox]:checked:hover+label::before{border-color:#2c5cc5;-webkit-box-shadow:0 0 0 5px #ebeff3;box-shadow:0 0 0 5px #ebeff3}input[type=checkbox]:checked:hover+label .after{opacity:1}input[type=checkbox]:checked:focus+label::before{background:#2c5cc5;border-color:#fff;-webkit-box-shadow:0 0 0 1px #2c5cc5;box-shadow:0 0 0 1px #2c5cc5}input[type=checkbox]:checked:focus+label .after{opacity:1}input[type=checkbox][disabled]+label{color:#92a2b1}input[type=checkbox][disabled]+label .label-field{color:#92a2b1}input[type=checkbox][disabled]+label::before{border-color:#dadfe3;background-color:#ebeff3}input[type=checkbox][disabled]:checked+label{color:#92a2b1}input[type=checkbox][disabled]:checked+label::before{background-color:#ebeff3;border-color:#dadfe3}";

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
     * Description to be displayed for the checkbox.
     */
    this.description = '';
    /**
     * @deprecated Use `description` instead.
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
    /**
     * Specifies the input box as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
     */
    this.required = false;
    /**
     * Theme based on which the checkbox is styled.
     */
    this.state = 'normal';
    /**
  
    /**
     * Hint text displayed below the radio group.
     */
    this.hintText = '';
    /**
     * Warning text displayed below the radio group.
     */
    this.warningText = '';
    /**
     * Error text displayed below the radio group.
     */
    this.errorText = '';
    this.hasHintTextSlot = false;
    this.hasWarningTextSlot = false;
    this.hasErrorTextSlot = false;
    this.onFocus = () => {
      this.fwFocus.emit();
    };
    this.onBlur = (e) => {
      this.fwBlur.emit({
        event: e,
        name: this.name,
      });
    };
    this.toggle = (e) => {
      if (!this.disabled) {
        this.checked = !this.checked;
        this.fwChange.emit({
          event: e,
          value: this.value,
          name: this.name,
          meta: { checked: this.checked },
        });
      }
    };
  }
  componentDidLoad() {
    this.checkbox.checked = this.checked;
    this.checkbox.disabled = this.disabled;
  }
  checkChanged(isChecked) {
    this.checkbox.checked = isChecked;
  }
  componentWillLoad() {
    this.checkSlotContent();
  }
  checkSlotContent() {
    this.hasHintTextSlot = hasSlot(this.host, 'hint-text');
    this.hasWarningTextSlot = hasSlot(this.host, 'warning-text');
    this.hasErrorTextSlot = hasSlot(this.host, 'error-text');
  }
  /**
   * Sets focus on a `fw-checkbox`.
   */
  async setFocus() {
    var _a;
    (_a = this.host) === null || _a === void 0 ? void 0 : _a.focus();
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
      this.toggle(ev);
    }
  }
  getAriaDescribedBy() {
    if (this.state === 'normal')
      return `hint-${this.name}`;
    else if (this.state === 'error')
      return `error-${this.name}`;
    else if (this.state === 'warning')
      return `warning-${this.name}`;
    return null;
  }
  render() {
    const { host, name, value } = this;
    if (this.checked) {
      renderHiddenField(host, name, value);
    }
    const hasHintText = this.hintText ? true : this.hasHintTextSlot;
    const hasErrorText = this.errorText ? true : this.hasErrorTextSlot;
    const hasWarningText = this.warningText ? true : this.hasWarningTextSlot;
    const showHintText = this.state === 'normal' ? true : false;
    const showErrorText = this.state === 'error' ? true : false;
    const showWarningText = this.state === 'warning' ? true : false;
    const hintTextId = `hint-${this.name}`;
    const warningTextId = `warning-${this.name}`;
    const errorTextId = `error-${this.name}`;
    return (h(Host, { role: 'checkbox', tabIndex: '0', "aria-disabled": this.disabled ? 'true' : 'false', "aria-checked": this.checked ? 'true' : 'false', "aria-labelledby": 'label', "aria-describedby": `description ${this.getAriaDescribedBy()}`, onClick: this.toggle, onFocus: this.onFocus, onBlur: this.onBlur, "aria-invalid": this.state === 'error' }, h("div", { class: { 'checkbox-container': true, 'disabled': this.disabled } }, h("input", { type: 'checkbox', ref: (el) => (this.checkbox = el), required: this.required, name: this.name, id: this.name }), h("label", { class: { error: this.state === 'error' } }, h("span", { id: 'label', class: {
        'with-description': this.description !== '',
        'required': this.required,
      } }, h("slot", null)), this.description !== '' || this.label !== '' ? (h("div", { id: 'description' }, this.description ? this.description : this.label)) : (''), this.checked && (h("span", { class: 'after' }, h("fw-icon", { name: 'check', color: this.disabled ? '#92A2B1' : '#ffffff', size: 8 }))))), showHintText && hasHintText && (h("div", { id: hintTextId, class: 'field-control-hint-text', "aria-hidden": hasHintText ? 'false' : 'true' }, h("slot", { name: 'hint-text' }, this.hintText))), showErrorText && hasErrorText && (h("div", { id: errorTextId, class: 'field-control-error-text', "aria-hidden": hasErrorText ? 'false' : 'true' }, h("slot", { name: 'error-text' }, this.errorText))), showWarningText && hasWarningText && (h("div", { id: warningTextId, class: 'field-control-warning-text', "aria-hidden": hasWarningText ? 'false' : 'true' }, h("slot", { name: 'warning-text' }, this.warningText)))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "checked": ["checkChanged"],
    "disabled": ["disabledChanged"]
  }; }
};
Checkbox.style = checkboxCss;

export { Checkbox as fw_checkbox };
