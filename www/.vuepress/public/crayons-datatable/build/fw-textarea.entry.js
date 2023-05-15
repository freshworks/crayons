import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-4996832f.js';
import { r as renderHiddenField } from './index-268121b7.js';

const textareaCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{--input-color:#12344d}.textarea-container{margin-bottom:16px}label{font-size:12px;font-weight:500;color:#12344d;margin-bottom:0;padding-bottom:4px;padding-left:2px;display:block}label.required::after{content:\"*\";position:relative;display:inline-block;top:2px;font-size:14px;color:#d72d30;padding-left:2px}.textarea-container-inner{display:block;width:100%;position:relative}.textarea-container-inner textarea{border:0;border:1px solid #cfd7df;margin:5px 0 0;border-radius:4px;padding:4px 12px 5px;background-color:#fff;-webkit-box-shadow:none;box-shadow:none;min-height:24px;font-size:12px;font-weight:500;letter-spacing:0;line-height:20px;font-family:inherit;cursor:text;display:inline-block;color:var(--input-color);}@media screen and (prefers-reduced-motion: reduce){.textarea-container-inner textarea:hover,.textarea-container-inner textarea:focus{-webkit-transition:none;transition:none}}.textarea-container-inner textarea:hover{border:1px #475867 solid;-webkit-transition:0.2s linear;transition:0.2s linear}.textarea-container-inner textarea:focus{outline:none;background:#fff;border:1px solid transparent;-webkit-box-shadow:0 0 0 2px #2c5cc5;box-shadow:0 0 0 2px #2c5cc5}.textarea-container-inner textarea[disabled]{color:#92a2b1;background-color:#f3f5f7;border-style:solid}.textarea-container-inner textarea[disabled]:hover,.textarea-container-inner textarea[disabled]:focus{border:1px solid #cfd7df;cursor:not-allowed}.textarea-container-inner+.help-block{font-size:12px;margin-top:3px;color:#92a2b1;position:inherit;margin-bottom:0;display:block;padding-left:2px}.textarea-container-inner.error>textarea{border-color:#d72d30}.textarea-container-inner.error>textarea:focus{-webkit-box-shadow:none;box-shadow:none;border-color:#d72d30}.textarea-container-inner.error>textarea:hover{border-color:#d72d30}.textarea-container-inner.error+.help-block{color:#d72d30}.textarea-container-inner.warning>textarea{border-color:#f8ab59}.textarea-container-inner.warning>textarea:focus{-webkit-box-shadow:none;box-shadow:none;border-color:#f8ab59}.textarea-container-inner.warning>textarea:hover{border-color:#f8ab59}.textarea-container-inner.warning+.help-block{color:#f8ab59}::-webkit-input-placeholder{color:#92a2b1;opacity:1}::-moz-placeholder{color:#92a2b1;opacity:1}:-ms-input-placeholder{color:#92a2b1;opacity:1}::-ms-input-placeholder{color:#92a2b1;opacity:1}::placeholder{color:#92a2b1;opacity:1}:-ms-input-placeholder{color:#92a2b1}::-ms-input-placeholder{color:#92a2b1}.responsive{width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}";

let Textarea = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    this.fwInput = createEvent(this, "fwInput", 7);
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
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    /**
     * Theme based on which the input box is styled.
     */
    this.state = 'normal';
    /**
     * Type of text wrapping used by the input box. If the value is hard, the text in the textarea is wrapped (contains line breaks) when the form data is saved. If the value is soft, the text in the textarea is saved as a single line, when the form data is saved.
     */
    this.wrap = 'soft';
    /**
     * Descriptive or instructional text displayed below the input box.
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
     * Disables the text area on the interface. If the attribute’s value is undefined, the value is set to false.
     */
    this.disabled = false;
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
  }
  watchHandler(newValue) {
    this.fwChange.emit({ value: newValue });
  }
  getValue() {
    return this.value || '';
  }
  hasValue() {
    return this.getValue().length > 0;
  }
  /**
   * Sets focus on a specific `fw-textarea`. Use this method instead of the global `input.focus()`.
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
      } }, h("div", { class: 'textarea-container' }, this.label !== '' ? (h("label", { class: {
        required: this.required,
      } }, this.label)) : (''), h("div", { class: {
        'textarea-container-inner': true,
        [this.state]: true,
      } }, h("textarea", { class: {
        responsive: this.cols === undefined,
      }, ref: (input) => (this.nativeInput = input), disabled: this.disabled, name: this.name, placeholder: this.placeholder || '', minLength: this.minlength, maxLength: this.maxlength, readOnly: this.readonly, required: this.required, value: this.value, onInput: (e) => this.onInput(e), onBlur: this.onBlur, onFocus: this.onFocus, rows: this.rows, cols: this.cols, wrap: this.wrap })), this.stateText !== '' ? (h("span", { class: 'help-block' }, this.stateText)) : (''))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "value": ["watchHandler"]
  }; }
};
Textarea.style = textareaCss;

export { Textarea as fw_textarea };
