import { r as registerInstance, h as createEvent, i as h, k as Host, j as getElement } from './index-44c267ce.js';
import { f as findCheckedOption, w as watchForOptions, b as hasSlot, r as renderHiddenField } from './index-9b8d850f.js';

const radioGroupCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.field-control{position:relative}.field-control-label{display:block;font-size:12px;color:var(--fw-label-color, #475867);font-weight:600;-webkit-margin-after:4px;margin-block-end:4px;-webkit-padding-start:2px;padding-inline-start:2px;line-height:20px}.field-control-label.required::after{content:\"*\";position:relative;display:inline-block;inset-block-start:2px;font-size:14px;color:#d72d30;-webkit-padding-start:2px;padding-inline-start:2px;font-weight:700}.field-control-hint-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-hint-color, #acb6be);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-error-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-error-color, #d72d30);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-warning-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-warning-color, #f8ab59);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}";

let RadioGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.selectedIndex = 0;
    /**
     * If true, a radio group can be saved without selecting any option. If an option is selected, the selection can be cleared. If the attribute’s value is undefined, the value is set to false.
     */
    this.allowEmpty = false;
    /**
     * Label for the component
     */
    this.label = '';
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    /**
     * Indicates the direction of the radio buttons alignment, defaults to vertical alignment.
     */
    this.orientation = 'column';
    /**
     * Specifies the input radio group as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
     */
    this.required = false;
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
    /**
     * Theme based on which the radio group is styled.
     */
    this.state = 'normal';
    this.hasHintTextSlot = false;
    this.hasWarningTextSlot = false;
    this.hasErrorTextSlot = false;
    this.onSelect = (ev) => {
      const selectedRadio = ev.target;
      if (selectedRadio) {
        this.value = selectedRadio.value;
      }
    };
    this.onDeselect = async (ev) => {
      const selectedRadio = ev.target;
      if (this.allowEmpty && selectedRadio.value === this.value) {
        this.value = undefined;
      }
      await this.updateRadios();
    };
  }
  async valueChanged() {
    await this.updateRadios();
  }
  handleKeydown(ev) {
    if (ev.code === 'ArrowDown' ||
      ev.code === 'ArrowRight' ||
      ev.code === 'ArrowLeft' ||
      ev.code === 'ArrowUp' ||
      ev.code === 'Space') {
      ev.preventDefault();
    }
  }
  handleKeyup(event) {
    const radios = this.radios;
    const supportedKeyStrokes = [
      'ArrowDown',
      'ArrowRight',
      'ArrowUp',
      'ArrowLeft',
      'Space',
    ];
    const previousSelected = this.selectedIndex;
    switch (event.code) {
      case 'ArrowDown':
      case 'ArrowRight':
        radios[previousSelected].setAttribute('tabindex', '-1');
        radios[previousSelected].checked = false;
        // set currently selectedIndex using roving tabindex technique
        this.selectedIndex = ++this.selectedIndex % radios.length;
        radios[this.selectedIndex].setAttribute('tabindex', '0');
        radios[this.selectedIndex].checked = true;
        radios[this.selectedIndex].focus();
        this.value = radios[this.selectedIndex].value;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        radios[previousSelected].setAttribute('tabindex', '-1');
        radios[previousSelected].checked = false;
        // set currently selectedIndex using roving tabindex technique
        this.selectedIndex =
          this.selectedIndex === 0 ? radios.length - 1 : --this.selectedIndex;
        radios[this.selectedIndex].setAttribute('tabindex', '0');
        radios[this.selectedIndex].checked = true;
        radios[this.selectedIndex].focus();
        this.value = radios[this.selectedIndex].value;
        break;
      case 'Space':
        /**
         * This case is executed only when none of the radios are checked
         * and we first tab into the radio group.
         */
        radios[0].checked = true;
        radios[0].focus();
        this.value = radios[0].value;
        break;
      default:
        break;
    }
    if (supportedKeyStrokes.includes(event.code)) {
      this.fwChange.emit({
        event,
        name: this.name,
        value: this.value,
      });
    }
  }
  async connectedCallback() {
    const el = this.host;
    this.radios = Array.from(this.host.querySelectorAll('fw-radio')).filter((radio) => !radio.disabled);
    if (this.value === undefined) {
      const radio = findCheckedOption(el, 'fw-radio');
      if (radio !== undefined) {
        await radio.componentOnReady();
        if (this.value === undefined) {
          this.value = radio.value;
        }
      }
    }
    this.mutationO = watchForOptions(el, 'fw-radio', async (newOption) => {
      if (newOption !== undefined) {
        newOption
          .componentOnReady()
          .then(() => {
          this.value = newOption.value;
        })
          .catch();
      }
      else {
        await this.updateRadios();
      }
    });
  }
  componentDidLoad() {
    const fieldControl = this.host.querySelector('.field-input');
    if (fieldControl) {
      fieldControl.style.display = 'flex';
      fieldControl.style.flexDirection = this.orientation;
    }
    const slottedElements = this.host.querySelectorAll('fw-radio');
    slottedElements.forEach((radio, index) => {
      if (this.orientation === 'column') {
        radio.classList.add('fw-radio-group__radio');
        radio.classList.toggle('fw-radio-group__radio--last', index === slottedElements.length - 1);
      }
    });
  }
  componentWillLoad() {
    this.checkSlotContent();
  }
  checkSlotContent() {
    this.hasHintTextSlot = hasSlot(this.host, 'hint-text');
    this.hasWarningTextSlot = hasSlot(this.host, 'warning-text');
    this.hasErrorTextSlot = hasSlot(this.host, 'error-text');
  }
  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect();
      this.mutationO = undefined;
    }
  }
  async updateRadios() {
    /**
     * Make sure we get all radios first
     * so values are up to date prior
     * to caching the radio group value
     */
    const radios = await this.radios;
    const { value } = this;
    let hasChecked = false;
    for (const [index, radio] of radios.entries()) {
      if (!hasChecked && radio.value === value) {
        // correct value for this radio
        // but this radio isn't checked yet
        // and we haven't found a checked yet
        hasChecked = true;
        radio.checked = true;
        radio.setAttribute('tabindex', '0');
        this.selectedIndex = index;
      }
      else {
        // this radio doesn't have the correct value
        // or the radio group has been already checked
        radio.setAttribute('tabindex', '-1');
        radio.checked = false;
      }
    }
    // Reset value if
    if (!hasChecked) {
      radios.length !== 0 && radios[0].setAttribute('tabindex', '0');
      this.selectedIndex = 0;
      this.value = undefined;
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
  /**
   * Sets focus on a specific `fw-radio`.
   */
  async setFocus() {
    var _a, _b;
    const radios = this.radios;
    (_b = (_a = radios[0]) === null || _a === void 0 ? void 0 : _a.setFocus) === null || _b === void 0 ? void 0 : _b.call(_a);
  }
  render() {
    const { host, name, value } = this;
    const hasLabel = !!this.label;
    const hasHintText = this.hintText ? true : this.hasHintTextSlot;
    const hasErrorText = this.errorText ? true : this.hasErrorTextSlot;
    const hasWarningText = this.warningText ? true : this.hasWarningTextSlot;
    const showHintText = this.state === 'normal' ? true : false;
    const showErrorText = this.state === 'error' ? true : false;
    const showWarningText = this.state === 'warning' ? true : false;
    const labelId = this.label && this.name
      ? `${this.label}-${this.name}`
      : this.label
        ? this.label
        : this.name && this.name;
    const hintTextId = `hint-${this.name}`;
    const warningTextId = `warning-${this.name}`;
    const errorTextId = `error-${this.name}`;
    renderHiddenField(host, name, value);
    return (h(Host, { role: 'radiogroup', "aria-labelledby": labelId, onFwSelect: this.onSelect, onFwDeselect: this.onDeselect, "aria-describedby": this.getAriaDescribedBy() }, h("div", { class: {
        'field-control': true,
      } }, hasLabel && (h("label", { id: labelId, class: {
        'field-control-label': true,
        'required': this.required,
      }, "aria-hidden": hasLabel ? 'false' : 'true' }, this.label)), h("div", { class: 'field-input' }, h("slot", null)), showHintText && hasHintText && (h("div", { id: hintTextId, class: 'field-control-hint-text', "aria-hidden": hasHintText ? 'false' : 'true' }, h("slot", { name: 'hint-text' }, this.hintText))), showErrorText && hasErrorText && (h("div", { id: errorTextId, class: 'field-control-error-text', "aria-hidden": hasErrorText ? 'false' : 'true' }, h("slot", { name: 'error-text' }, this.errorText))), showWarningText && hasWarningText && (h("div", { id: warningTextId, class: 'field-control-warning-text', "aria-hidden": hasWarningText ? 'false' : 'true' }, h("slot", { name: 'warning-text' }, this.warningText))))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "value": ["valueChanged"]
  }; }
};
RadioGroup.style = radioGroupCss;

export { RadioGroup as fw_radio_group };
