import { r as registerInstance, h as createEvent, i as h, j as getElement } from './index-44c267ce.js';
import { b as hasSlot, r as renderHiddenField } from './index-9b8d850f.js';
import { F as FieldControl } from './field-control-33f3464c.js';

const textareaCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.field-control{position:relative}.field-control-label{display:block;font-size:12px;color:var(--fw-label-color, #475867);font-weight:600;-webkit-margin-after:4px;margin-block-end:4px;-webkit-padding-start:2px;padding-inline-start:2px;line-height:20px}.field-control-label.required::after{content:\"*\";position:relative;display:inline-block;inset-block-start:2px;font-size:14px;color:#d72d30;-webkit-padding-start:2px;padding-inline-start:2px;font-weight:700}.field-control-hint-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-hint-color, #acb6be);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-error-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-error-color, #d72d30);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-warning-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-warning-color, #f8ab59);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.textarea-container{-webkit-margin-after:var(--fw-textarea-margin-bottom, 0px);margin-block-end:var(--fw-textarea-margin-bottom, 0px);width:inherit}.textarea-container-inner{display:block;width:var(--fw-textarea-width, 100%);position:relative}.textarea-container-inner textarea{border:0;border:1px solid #cfd7df;border-radius:4px;-webkit-padding-after:5px;padding-block-end:5px;padding-inline:12px;-webkit-padding-before:4px;padding-block-start:4px;background-color:#fff;-webkit-box-shadow:none;box-shadow:none;min-height:var(--fw-textarea-min-height, 24px);font-size:14px;font-weight:500;letter-spacing:0;line-height:20px;font-family:inherit;cursor:text;display:inline-block;color:var(--fw-textarea-input-color, #12344d);}@media screen and (prefers-reduced-motion: reduce){.textarea-container-inner textarea:hover,.textarea-container-inner textarea:focus{-webkit-transition:none;transition:none}}.textarea-container-inner textarea:hover{border:1px #475867 solid;-webkit-transition:0.2s linear;transition:0.2s linear}.textarea-container-inner textarea:focus{outline:none;background:#fff;border:1px solid transparent;-webkit-box-shadow:0 0 0 2px #2c5cc5;box-shadow:0 0 0 2px #2c5cc5}.textarea-container-inner textarea[disabled]{color:#92a2b1;background-color:#f5f7f9;border-style:solid}.textarea-container-inner textarea[disabled]:hover,.textarea-container-inner textarea[disabled]:focus{border:1px solid #cfd7df;cursor:not-allowed}.textarea-container-inner+.help-block{font-size:12px;-webkit-margin-before:3px;margin-block-start:3px;color:#92a2b1;position:inherit;-webkit-margin-after:0;margin-block-end:0;display:block;-webkit-padding-start:2px;padding-inline-start:2px}.textarea-container-inner.error>textarea{border-color:#d72d30}.textarea-container-inner.error>textarea:focus{-webkit-box-shadow:none;box-shadow:none;border-color:#d72d30}.textarea-container-inner.error>textarea:hover{border-color:#d72d30}.textarea-container-inner.error+.help-block{color:#d72d30}.textarea-container-inner.warning>textarea{border-color:#f8ab59}.textarea-container-inner.warning>textarea:focus{-webkit-box-shadow:none;box-shadow:none;border-color:#f8ab59}.textarea-container-inner.warning>textarea:hover{border-color:#f8ab59}.textarea-container-inner.warning+.help-block{color:#f8ab59}::-webkit-input-placeholder{color:#92a2b1;opacity:1}::-moz-placeholder{color:#92a2b1;opacity:1}:-ms-input-placeholder{color:#92a2b1;opacity:1}::-ms-input-placeholder{color:#92a2b1;opacity:1}::placeholder{color:#92a2b1;opacity:1}::-webkit-input-placeholder{color:#92a2b1}::-moz-placeholder{color:#92a2b1}:-ms-input-placeholder{color:#92a2b1}:-moz-placeholder{color:#92a2b1}.responsive{width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}";

let Textarea = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    this.fwInput = createEvent(this, "fwInput", 7);
    this.hasFocus = false;
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
     * Specifies the way in which the text area can be resized
     */
    this.resize = 'both';
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
      if (input) {
        this.value = input.value || '';
      }
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
  componentWillLoad() {
    this.checkSlotContent();
  }
  checkSlotContent() {
    this.hasHintTextSlot = hasSlot(this.host, 'hint-text');
    this.hasWarningTextSlot = hasSlot(this.host, 'warning-text');
    this.hasErrorTextSlot = hasSlot(this.host, 'error-text');
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
    const styleResizeTextArea = { resize: this.resize };
    renderHiddenField(host, name, value);
    return (h(FieldControl, { inputId: this.name, label: this.label, labelId: `${this.label}-${this.name}`, state: this.state, hintTextId: `hint-${this.name}`, hintText: this.hintText, hasHintTextSlot: this.hasHintTextSlot, errorTextId: `error-${this.name}`, errorText: this.errorText, hasErrorTextSlot: this.hasErrorTextSlot, warningTextId: `warning-${this.name}`, warningText: this.warningText, hasWarningTextSlot: this.hasWarningTextSlot, required: this.required }, h("div", { "aria-disabled": this.disabled, class: {
        'has-value': this.hasValue(),
        'has-focus': this.hasFocus,
      } }, h("div", { class: 'textarea-container' }, h("div", { class: {
        'textarea-container-inner': true,
        [this.state]: true,
      } }, h("textarea", { class: {
        responsive: this.cols === undefined,
      }, style: styleResizeTextArea, ref: (input) => (this.nativeInput = input), disabled: this.disabled, name: this.name, placeholder: this.placeholder || '', minLength: this.minlength, maxLength: this.maxlength, readOnly: this.readonly, required: this.required, value: this.value, onInput: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, rows: this.rows, cols: this.cols, wrap: this.wrap, id: this.name, "aria-invalid": this.state === 'error', "aria-describedby": this.getAriaDescribedBy() }))))));
  }
  get host() { return getElement(this); }
};
Textarea.style = textareaCss;

export { Textarea as fw_textarea };
