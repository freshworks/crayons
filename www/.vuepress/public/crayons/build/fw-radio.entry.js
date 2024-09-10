import { r as registerInstance, h as createEvent, i as h, k as Host, j as getElement } from './index-44c267ce.js';

const radioCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.radio-container{display:inline-block;position:relative;-webkit-padding-start:22px;padding-inline-start:22px;-webkit-margin-end:10px;margin-inline-end:10px;max-width:80ch;word-wrap:break-word}:host(:focus) input[type=radio]+label::before{border:1px solid transparent;-webkit-box-shadow:0 0 0 2px #2c5cc5;box-shadow:0 0 0 2px #2c5cc5;border-color:#081824}:host(:focus) input[type=radio][disabled]+label::before{-webkit-box-shadow:none;box-shadow:none;border:1px solid #dadfe3}:host(:hover) input[type=radio]+label::before{-webkit-box-shadow:0 0 0 5px #ebeff3;box-shadow:0 0 0 5px #ebeff3;border-color:#081824}:host(:hover) input[type=radio][disabled]+label{cursor:not-allowed}:host(:hover) input[type=radio][disabled]+label::before{-webkit-box-shadow:none;box-shadow:none;border:1px solid #dadfe3}#description{font-size:12px;color:#475867;letter-spacing:0;line-height:20px;position:relative;font-weight:400}input[type=radio]{display:none}input[type=radio]+label{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;-webkit-margin-after:4px;margin-block-end:4px;vertical-align:middle;font-size:14px;line-height:20px;font-weight:400;color:#12344d}input[type=radio]+label .with-description{font-weight:600}input[type=radio]+label::before,input[type=radio]+label::after{content:\"\";display:block;position:absolute;inset-block-start:0;-webkit-box-sizing:border-box;box-sizing:border-box}@media screen and (prefers-reduced-motion: reduce){input[type=radio]+label::before{-webkit-transition:none;transition:none}}input[type=radio]+label::before{inset-inline-start:0;border:1px solid #cfd7df;border-radius:50px;inset-block-start:4px;width:14px;height:14px;background:#fff;-webkit-transition:all 0.3s ease;transition:all 0.3s ease}@media screen and (prefers-reduced-motion: reduce){input[type=radio]+label.error::before{-webkit-transition:none;transition:none}}input[type=radio]+label.error::before{inset-inline-start:0;border:1px solid #d72d30;border-radius:50px;inset-block-start:4px;width:14px;height:14px;background:#fff;-webkit-transition:all 0.3s ease;transition:all 0.3s ease}@media screen and (prefers-reduced-motion: reduce){input[type=radio]+label::after{-webkit-transition:none;transition:none}}input[type=radio]+label::after{inset-inline-start:3px;border-radius:100%;width:8px;height:8px;opacity:0;-webkit-transition:opacity 0.2s ease-in-out;transition:opacity 0.2s ease-in-out;-webkit-box-sizing:border-box;box-sizing:border-box}input[type=radio]:checked+label::before{background:#fff;border-color:#2c5cc5;-webkit-box-shadow:none;box-shadow:none}input[type=radio]:checked+label::after{border-radius:50%;background-color:#2c5cc5;opacity:1;inset-block-start:7px}input[type=radio]:checked:focus+label::before{border-color:#3868d3;-webkit-box-shadow:0 0 4px 1px rgba(44, 92, 197, 0.6);box-shadow:0 0 4px 1px rgba(44, 92, 197, 0.6)}input[type=radio]:checked:focus+label::after{background-color:#3868d3}input[type=radio][disabled]+label{color:#92a2b1}input[type=radio][disabled]+label .label-field{color:#92a2b1}input[type=radio][disabled]+label::before{border-color:#dadfe3;background-color:#ebeff3}input[type=radio][disabled]+label::after{border-color:#ebeff3;background-color:#dadfe3}input[type=radio][disabled]:checked+label{color:#92a2b1}:host(.fw-radio-group__radio){-webkit-margin-after:8px;margin-block-end:8px}:host(.fw-radio-group__radio--last){-webkit-margin-after:0px;margin-block-end:0px}";

let Radio = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwSelect = createEvent(this, "fwSelect", 7);
    this.fwDeselect = createEvent(this, "fwDeselect", 7);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    this.fwChange = createEvent(this, "fwChange", 7);
    /**
     * Sets the state to selected. If the attribute’s value is undefined, the value is set to false.
     */
    this.checked = false;
    /**
     * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
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
     * Identifier corresponding to the component, that is saved when the form data is saved.
     */
    this.value = '';
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    /**
     * Theme based on which the radio button is styled.
     */
    this.state = 'normal';
  }
  componentDidLoad() {
    this.radio.checked = this.checked;
    this.radio.disabled = this.disabled;
  }
  checkChanged(isChecked) {
    if (!this.disabled) {
      if (isChecked) {
        this.fwSelect.emit({
          value: this.value,
          checked: true,
        });
      }
      else {
        this.fwDeselect.emit({
          value: this.value,
          checked: false,
        });
      }
    }
    this.radio.checked = isChecked;
  }
  disabledChanged(isDisabled) {
    this.radio.disabled = isDisabled;
  }
  onFocus() {
    this.fwFocus.emit();
  }
  onBlur(e) {
    this.fwBlur.emit({
      event: e,
      name: this.name,
    });
  }
  toggle(e) {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
    this.fwChange.emit({
      event: e,
      name: this.name,
      value: this.checked ? this.value : undefined,
    });
  }
  /**
   * Sets focus on a specific `fw-radio`.
   */
  async setFocus() {
    var _a;
    (_a = this.host) === null || _a === void 0 ? void 0 : _a.focus();
  }
  render() {
    return (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    h(Host, { onClick: (e) => this.toggle(e), role: 'radio', tabIndex: '-1', "aria-labelledby": 'label', "aria-describedby": `description`, "aria-disabled": this.disabled ? 'true' : 'false', "aria-checked": this.checked ? 'true' : 'false', onFocus: () => this.onFocus(), onBlur: (e) => this.onBlur(e), "aria-invalid": this.state === 'error' }, h("div", { class: 'radio-container' }, h("input", { type: 'radio', ref: (el) => (this.radio = el), name: this.name }), h("label", { class: { error: this.state === 'error' } }, h("span", { id: 'label', class: {
        'with-description': this.description !== '',
      } }, h("slot", null)), this.description !== '' || this.label !== '' ? (h("div", { id: 'description' }, this.description ? this.description : this.label)) : ('')))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "checked": ["checkChanged"],
    "disabled": ["disabledChanged"]
  }; }
};
Radio.style = radioCss;

export { Radio as fw_radio };
