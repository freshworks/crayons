import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-4996832f.js';
import { r as renderHiddenField, h as handleKeyDown } from './index-268121b7.js';

const inputCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}*,::after,::before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.input-container{margin-bottom:16px;width:inherit;height:inherit}label{font-size:12px;color:#475867;font-weight:500;margin-bottom:0;padding-bottom:4px;padding-left:2px;display:block}label.required::after{content:\"*\";position:relative;display:inline-block;top:2px;font-size:14px;color:#d72d30;padding-left:2px;font-weight:700}.input-container-inner{display:block;width:100%;position:relative}.input-container-inner input{width:100%;border:0;border:1px solid #cfd7df;margin:5px 0 0;border-radius:4px;padding:4px 12px 5px;resize:none;background-color:#fff;-webkit-box-shadow:none;box-shadow:none;min-height:24px;font-size:12px;font-weight:500;letter-spacing:0;line-height:20px;color:#183247;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:text;display:inline-block;font-family:inherit}@media (prefers-reduced-motion){.input-container-inner input{}.input-container-inner input:hover{-webkit-transition:none;transition:none}}.input-container-inner input:hover{border:1px #475867 solid;-webkit-transition:0.2s linear;transition:0.2s linear}.input-container-inner input:focus{outline:none;background:#fff;background-color:#fff;border:1px solid transparent;-webkit-box-shadow:0 0 0 2px #2c5cc5;box-shadow:0 0 0 2px #2c5cc5}.input-container-inner input[disabled]{color:#92a2b1;background-color:#f5f7f9;border-style:solid;pointer-events:none}.input-container-inner input[disabled]:hover,.input-container-inner input[disabled]:focus{border:1px solid #cfd7df}.input-container-inner .clear-button{top:13px;position:absolute;right:10px;display:inline-block}.input-container-inner .clear-button:hover,.input-container-inner .clear-button:focus{cursor:pointer;pointer-events:initial}.input-container-inner .clear-button .clear-button-img{width:15px;height:15px}.input-container-inner+.help-block{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:11px;margin-top:3px;color:#acb6be;position:inherit;margin-bottom:0;display:block;padding-left:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.input-container-inner.error>input{border-color:#d72d30}.input-container-inner.error>input:focus{-webkit-box-shadow:none;box-shadow:none;border-color:#d72d30}.input-container-inner.error>input:hover{border-color:#d72d30}.input-container-inner.error+.help-block{color:#d72d30}.input-container-inner.warning>input{border-color:#f8ab59}.input-container-inner.warning>input:focus{-webkit-box-shadow:none;box-shadow:none;border-color:#f8ab59}.input-container-inner.warning>input:hover{border-color:#f8ab59}.input-container-inner.warning+.help-block{color:#f8ab59}::-webkit-input-placeholder{color:#acb6be}::-moz-placeholder{color:#acb6be}:-ms-input-placeholder{color:#acb6be}:-moz-placeholder{color:#acb6be}.icon{position:absolute;top:8px;left:3px;width:25px;height:25px;border-radius:3px;padding:3px 0 0 6px;display:block;-ms-flex-pack:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#ebeff3}.icon.left{left:3px}.icon.left::after{left:28px;content:\"\";width:1px;display:block;height:20px;background-color:#ebeff3;position:absolute;top:3px}.icon.right{left:auto;right:3px}.icon.right::before{right:28px;content:\"\";width:1px;display:block;height:20px;background-color:#ebeff3;position:absolute;top:3px}.left-icon input{padding-left:38px}.right-icon input{padding-right:38px}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield}";

let Input = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    this.fwInput = createEvent(this, "fwInput", 7);
    this.fwInputClear = createEvent(this, "fwInputClear", 7);
    this.hasFocus = false;
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
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    /**
     * Theme based on which the text box is styled.
     */
    this.state = 'normal';
    /**
     * Descriptive or instructional text displayed below the text box.
     */
    this.stateText = '';
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
    this.onInput = (ev) => {
      const input = ev.target;
      if (input) {
        this.value = input.value || '';
      }
      this.fwInput.emit(ev);
    };
    this.onFocus = () => {
      this.hasFocus = true;
      this.fwFocus.emit();
    };
    this.onBlur = () => {
      this.hasFocus = false;
      this.fwBlur.emit();
    };
    this.clearTextInput = (ev) => {
      if (!this.readonly && !this.disabled && ev) {
        this.value = '';
        if (this.nativeInput) {
          this.nativeInput.value = '';
        }
        this.fwInputClear.emit();
      }
    };
  }
  watchHandler(newValue) {
    this.fwChange.emit({ value: newValue });
  }
  showClearButton() {
    return (this.clearInput &&
      !this.readonly &&
      !this.disabled &&
      this.value.length > 0);
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
  render() {
    const { host, name, value } = this;
    renderHiddenField(host, name, value);
    return (h(Host, { "aria-disabled": this.disabled, class: {
        'has-value': this.hasValue(),
        'has-focus': this.hasFocus,
      } }, h("div", { class: 'input-container' }, this.label !== '' ? (h("label", { class: {
        required: this.required,
      } }, this.label)) : (''), h("div", { class: {
        'input-container-inner': true,
        [this.state]: true,
        'left-icon': this.iconLeft !== undefined,
        'right-icon': this.iconRight !== undefined,
      } }, h("input", { ref: (input) => (this.nativeInput = input), autoComplete: this.autocomplete, disabled: this.disabled, name: this.name, placeholder: this.placeholder || '', minLength: this.minlength, maxLength: this.maxlength, readOnly: this.readonly, required: this.required, type: this.type, value: this.value, onInput: (e) => this.onInput(e), onBlur: this.onBlur, onFocus: this.onFocus }), this.iconLeft !== undefined ? (h("fw-icon", { class: 'icon left', name: this.iconLeft })) : (''), this.iconRight !== undefined ? (h("fw-icon", { class: 'icon right', name: this.iconRight })) : (''), this.showClearButton() ? (h("div", { class: 'clear-button', role: 'button', tabindex: '0', onClick: (e) => this.clearTextInput(e), onKeyDown: handleKeyDown(this.clearTextInput) }, h("svg", { xmlns: 'http://www.w3.org/2000/svg', width: '32', height: '32', viewBox: '0 0 32 32', class: 'clear-button-img' }, h("path", { d: 'M17.992 16l8.796-8.796a1.409 1.409 0 0 0-1.992-1.992L16 14.008 7.204 5.212a1.409 1.409 0 0 0-1.992 1.992L14.008 16l-8.796 8.796a1.409 1.409 0 0 0 1.992 1.992L16 17.992l8.796 8.796a1.409 1.409 0 0 0 1.992-1.992L17.992 16z' })))) : ('')), this.stateText !== '' ? (h("span", { class: 'help-block' }, this.stateText)) : (''))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "value": ["watchHandler"]
  }; }
};
Input.style = inputCss;

export { Input as fw_input };
