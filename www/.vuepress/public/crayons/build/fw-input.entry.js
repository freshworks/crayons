import { r as registerInstance, h as createEvent, i as h, j as getElement } from './index-44c267ce.js';
import { h as handleKeyDown, a as hasSlot, r as renderHiddenField } from './index-9d2a65d7.js';
import { F as FieldControl } from './field-control-33f3464c.js';

const inputCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.field-control{position:relative}.field-control-label{display:block;font-size:12px;color:var(--fw-label-color, #475867);font-weight:600;margin-bottom:4px;-webkit-padding-start:2px;padding-inline-start:2px;line-height:20px}.field-control-label.required::after{content:\"*\";position:relative;display:inline-block;top:2px;font-size:14px;color:#d72d30;-webkit-padding-start:2px;padding-inline-start:2px;font-weight:700}.field-control-hint-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;margin-top:4px;margin-bottom:0;color:var(--fw-hint-color, #acb6be);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-error-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;margin-top:4px;margin-bottom:0;color:var(--fw-error-color, #d72d30);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-warning-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;margin-top:4px;margin-bottom:0;color:var(--fw-warning-color, #f8ab59);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}*,::after,::before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}:host{display:block}.input-container{width:inherit;height:inherit}.input-container-inner{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;width:100%;border:1px solid #cfd7df;background-color:#fff;position:relative;border-radius:4px;-webkit-box-shadow:inset 0px 1px 2px rgba(24, 50, 71, 0.05);box-shadow:inset 0px 1px 2px rgba(24, 50, 71, 0.05)}.input-container-inner.error{border-color:#d72d30}.input-container-inner.error.has-focus{-webkit-box-shadow:none;box-shadow:none;border-color:#d72d30}.input-container-inner.error:hover,.input-container-inner.error:focus{border-color:#d72d30}.input-container-inner.error+.help-block{color:#d72d30}.input-container-inner.warning{border-color:#f8ab59}.input-container-inner.warning.has-focus{-webkit-box-shadow:none;box-shadow:none;border-color:#f8ab59}.input-container-inner.warning:hover,.input-container-inner.warning:focus{border-color:#f8ab59}.input-container-inner.warning+.help-block{color:#f8ab59}.input-container-inner .inner__content{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-wrap:wrap;flex-wrap:wrap}.input-container-inner .inner__content .input__label{-ms-flex:1 1 40%;flex:1 1 40%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-margin-start:8px;margin-inline-start:8px}.input-container-inner .inner__content .input__label input{width:100%;padding:5px 0px;resize:none;border:none;outline:none;-webkit-box-shadow:none;box-shadow:none;min-height:24px;font-size:14px;font-weight:500;letter-spacing:0;line-height:20px;color:#183247;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:text;display:inline-block;font-family:inherit}.input-container-inner .inner__content .input__label input[disabled]{font-weight:400;color:#92a2b1;background-color:#f7f9fa;pointer-events:none}.input-container-inner .inner__content .input__prefix{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex:0 1 auto;flex:0 1 auto;-webkit-margin-start:4px;margin-inline-start:4px}.input-container-inner .inner__content .input__prefix.hasContent{-webkit-margin-start:8px;margin-inline-start:8px}.input-container-inner .inner__suffix{-ms-flex:0 1 auto;flex:0 1 auto;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-margin-end:8px;margin-inline-end:8px}@media (prefers-reduced-motion){.input-container-inner{}.input-container-inner:hover{-webkit-transition:none;transition:none}}.input-container-inner:hover{border:1px #475867 solid}.input-container-inner.has-focus{outline:none;background:#fff;background-color:#fff;border:1px solid #2c5cc5;-webkit-box-shadow:0 0 0 1px #2c5cc5;box-shadow:0 0 0 1px #2c5cc5}.input-container-inner.disabled{font-weight:400;color:#92a2b1;border:1px solid #ebeff3;background-color:#f7f9fa;border-style:solid;pointer-events:none}.input-container-inner .clear-button{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;height:16px;width:16px}.input-container-inner .clear-button:hover,.input-container-inner .clear-button:focus{cursor:pointer;pointer-events:initial}.input-container-inner .clear-button .clear-img{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:12px;height:12px}.input-container-inner+.help-block{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;margin-top:4px;margin-bottom:0;color:var(--fw-hint-color, #acb6be);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}::-webkit-input-placeholder{color:#acb6be}::-moz-placeholder{color:#acb6be}:-ms-input-placeholder{color:#acb6be}:-moz-placeholder{color:#acb6be}";

let Input = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    this.fwInput = createEvent(this, "fwInput", 7);
    this.fwInputClear = createEvent(this, "fwInputClear", 7);
    this.hasFocus = false;
    this.hasPrefix = false;
    this.hasHintTextSlot = false;
    this.hasWarningTextSlot = false;
    this.hasErrorTextSlot = false;
    /**
     * Label displayed on the interface, for the component.
     */
    this.label = '';
    /**
     * Default value displayed in the input box.
     */
    this.value = '';
    /**
     * Type of value accepted as the input value. If a user enters a value other than the specified type, the input box is not populated.
     */
    this.type = 'text';
    /**
     * Specifies whether the browser can display suggestions to autocomplete the text value.
     */
    this.autocomplete = 'off';
    /**
     * Displays a right-justified clear icon in the text box. Clicking the icon clears the input text. If the attribute’s value is undefined, the value is set to false. For a read-only input box, the clear icon is not displayed unless a default value is specified for the input box.
     */
    this.clearInput = false;
    /**
     * The step attribute is used when the type is `number`. It specifies the interval between legal numbers in a number/decimal input element.
     * Works with the min and max attributes to limit the increments at which a value can be set.
     * Possible values are `any` or a positive floating point number.
     * Default value is `any`
     */
    this.step = 'any';
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    /**
     * Theme based on which the text box is styled.
     */
    this.state = 'normal';
    /**
     * If true, the user cannot enter a value in the input box. If the attribute’s value is undefined, the value is set to false.
     */
    this.readonly = false;
    /**
     * Specifies the input box as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
     */
    this.required = false;
    /**
     * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
     */
    this.disabled = false;
    /**
     * Identifier of the icon that is displayed in the left side of the text box. The attribute’s value must be a valid svg file in the repo of icons (assets/icons).
     */
    this.iconLeft = undefined;
    /**
     * Identifier of the icon that is displayed in the right side of the text box. The attribute’s value must be a valid svg file in the repo of icons (assets/icons).
     */
    this.iconRight = undefined;
    /**
     * Hint text displayed below the text box.
     */
    this.hintText = '';
    /**
     * Warning text displayed below the text box.
     */
    this.warningText = '';
    /**
     * Error text displayed below the text box.
     */
    this.errorText = '';
    this.onInput = (ev) => {
      const input = ev.target;
      this.value = input.value || '';
      this.fwInput.emit({
        event: ev,
        name: this.name,
        value: this.getValue(),
      });
    };
    this.onFocus = () => {
      this.hasFocus = true;
      this.fwFocus.emit();
    };
    this.onBlur = (ev) => {
      this.hasFocus = false;
      this.fwBlur.emit({
        event: ev,
        name: this.name,
      });
    };
    this.clearTextInput = (ev) => {
      if (!this.disabled) {
        this.value = '';
        if (this.nativeInput) {
          this.nativeInput.value = '';
        }
        this.fwInputClear.emit({
          event: ev,
          name: this.name,
          value: this.value,
        });
      }
    };
  }
  showClearButton() {
    var _a;
    return this.clearInput && !this.disabled && ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) > 0;
  }
  getValue() {
    return this.value || '';
  }
  hasValue() {
    return this.getValue().length > 0;
  }
  /**
   * Sets focus on a specific `fw-input`. Use this method instead of the global `input.focus()`.
   */
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }
  renderClearButton() {
    return (h("div", { class: 'clear-button', role: 'button', tabindex: '0', onClick: (e) => this.clearTextInput(e), onKeyDown: handleKeyDown(this.clearTextInput) }, h("fw-icon", { class: 'clear-img', name: 'cross', size: 8, library: 'system' })));
  }
  renderIcon(iconName) {
    return h("fw-icon", { name: iconName });
  }
  componentWillLoad() {
    this.hasPrefix =
      !!this.host.querySelector('[slot="input-prefix"]') || !!this.iconLeft;
    this.handleSlotChange();
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
  handleSlotChange() {
    this.hasHintTextSlot = hasSlot(this.host, 'hint-text');
    this.hasWarningTextSlot = hasSlot(this.host, 'warning-text');
    this.hasErrorTextSlot = hasSlot(this.host, 'error-text');
  }
  disconnectedCallback() {
    this.host.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }
  render() {
    const { host, name, value } = this;
    renderHiddenField(host, name, value);
    return (h(FieldControl, { inputId: this.name, label: this.label, labelId: `${this.label}-${this.name}`, state: this.state, hintTextId: `hint-${this.name}`, hintText: this.hintText, hasHintTextSlot: this.hasHintTextSlot, errorTextId: `error-${this.name}`, errorText: this.errorText, hasErrorTextSlot: this.hasErrorTextSlot, warningTextId: `warning-${this.name}`, warningText: this.warningText, hasWarningTextSlot: this.hasWarningTextSlot, required: this.required }, h("div", { "aria-disabled": this.disabled, class: {
        'has-value': this.hasValue(),
        'has-focus': this.hasFocus,
      } }, h("div", { class: {
        'input-container': true,
      } }, h("div", { class: {
        'input-container-inner': true,
        'has-focus': this.hasFocus,
        'disabled': this.disabled,
        [this.state]: true,
      } }, h("div", { class: 'inner__content' }, h("div", { class: { input__prefix: true, hasContent: this.hasPrefix } }, this.iconLeft && this.renderIcon(this.iconLeft), h("slot", { name: 'input-prefix' })), h("div", { class: 'input__label' }, h("input", { ref: (input) => {
        this.nativeInput = input;
      }, id: this.name, autoComplete: this.autocomplete, disabled: this.disabled, name: this.name, placeholder: this.placeholder || '', minLength: this.minlength, maxLength: this.maxlength, min: this.min, max: this.max, readOnly: this.readonly, required: this.required, step: this.step, type: this.type, value: this.value, onInput: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, "aria-invalid": this.state === 'error', "aria-describedby": this.getAriaDescribedBy() }), this.showClearButton() && this.renderClearButton())), h("div", { class: 'inner__suffix' }, this.iconRight && this.renderIcon(this.iconRight), h("slot", { name: 'input-suffix' })))))));
  }
  get host() { return getElement(this); }
};
Input.style = inputCss;

export { Input as fw_input };
