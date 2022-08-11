import { r as registerInstance, h as createEvent, i as h, F as Fragment, j as getElement } from './index-44c267ce.js';

const selectOptionCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.select-center{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.select-option{cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;color:#12344d;font-size:14px;border-radius:4px;list-style:none;line-height:1.45;word-break:break-word;word-wrap:break-word;position:relative;-webkit-margin-after:4px;margin-block-end:4px;-webkit-padding-end:8px;padding-inline-end:8px}.select-option.single-line{padding-block:6px}.select-option.multi-line{padding-block:8px}.select-option.standard{-webkit-padding-start:0px;padding-inline-start:0px}.select-option.icon{-webkit-padding-start:10px;padding-inline-start:10px}.select-option.avatar{-webkit-padding-start:4px;padding-inline-start:4px}.select-option.selected{font-weight:600;background-color:#e5f2fd}.select-option.selected:hover,.select-option.selected:focus{background-color:#e5f2fd}.select-option:hover{background-color:#ebeff3}.select-option:focus{background-color:#ebeff3;outline:#2c5cc5 auto 1px}.select-option.disabled{color:#92a2b1;position:relative;cursor:not-allowed;background-color:#f5f7f9}.select-option .description{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.select-option .description-text{font-weight:600}.select-option .description-subText{font-weight:400;font-size:12px;color:#475867}.select-option .description.icon-margin{-webkit-margin-start:18px;margin-inline-start:18px}.select-option .description.standard-margin{-webkit-margin-start:12px;margin-inline-start:12px}.select-option .selected-icon{min-width:24px;min-height:24px;-webkit-margin-start:auto;margin-inline-start:auto;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.select-option fw-icon{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex}";

let SelectOption = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwSelected = createEvent(this, "fwSelected", 7);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    /**
     * Sets the state of the option to selected. The selected option is highlighted and a check mark is displayed next to it. If the attribute’s value is undefined, the value is set to false.
     */
    this.selected = false;
    /**
     * Sets the state of the option to disabled. The selected option is disabled and greyed out. If the attribute’s value is undefined, the value is set to false.
     */
    this.disabled = false;
    /**
     * States that the option is an HTML value. If the attribute's value is undefined, the value is set to true.
     */
    this.html = false;
    /**
     * Standard is the default option without any graphics other options are icon and avatar which places either the icon or avatar at the beginning of the row.
     * The props for the icon or avatar are passed as an object via the graphicsProps.
     */
    this.variant = 'standard';
    /**
     * Place a checkbox.
     */
    this.checkbox = false;
    /**
     * Whether clicking on the already selected option disables it.
     */
    this.allowDeselect = true;
  }
  async setFocus() {
    this.rowContainer.focus();
  }
  onKeyDown(ev) {
    switch (ev.key) {
      case 'Enter':
        this.onOptionSelected();
        break;
    }
  }
  onOptionSelected() {
    if (this.disabled) {
      return;
    }
    if (this.selected && !this.allowDeselect) {
      return;
    }
    this.selected = !this.selected;
    const { value, selected } = this;
    this.fwSelected.emit({ value, selected });
  }
  renderInnerHtml() {
    const description = this.createDescription();
    const checkbox = this.checkbox ? this.createCheckbox() : '';
    const selectedIconContainer = (h("span", { class: 'selected-icon' }, this.selected && (h("fw-icon", { name: 'check', size: 12, color: '#2C5CC5', library: 'system' }))));
    switch (this.variant) {
      case 'standard':
        return (h(Fragment, null, checkbox, description, selectedIconContainer));
      case 'icon':
        return (h(Fragment, null, checkbox, this.createIcon(), description, selectedIconContainer));
      case 'avatar':
        return (h(Fragment, null, checkbox, this.createAvatar(), description, selectedIconContainer));
      default:
        break;
    }
  }
  createDescription() {
    return this.subText ? (h("div", { class: 'description ' +
        (this.variant === 'icon' ? 'icon-margin ' : 'standard-margin ') }, h("span", { class: 'description-text' }, this.text), h("span", { class: 'description-subText' }, this.subText))) : (h("span", { class: 'description ' +
        (this.variant === 'icon' ? 'icon-margin ' : 'standard-margin ') }, this.text));
  }
  createIcon() {
    return h("fw-icon", Object.assign({}, this.graphicsProps));
  }
  createCheckbox() {
    return h("fw-checkbox", { checked: this.selected });
  }
  createAvatar() {
    return h("fw-avatar", Object.assign({ size: 'small' }, this.graphicsProps));
  }
  render() {
    return (h("div", { role: 'option', tabindex: '-1', "aria-selected": this.selected, ref: (el) => (this.rowContainer = el), class: 'select-option ' +
        (this.selected && !this.checkbox ? 'selected ' : '') +
        (this.disabled ? 'disabled ' : '') +
        (this.html
          ? ''
          : (this.subText ? 'multi-line ' : 'single-line ') +
            (this.variant + ' ' + 'select-center')), onMouseDown: () => this.onOptionSelected(), onFocus: () => this.fwFocus.emit({ id: this.host.id }), onBlur: (e) => this.fwBlur.emit(e) }, this.html ? '' : this.text ? this.renderInnerHtml() : h("slot", null)));
  }
  componentDidLoad() {
    if (this.html) {
      this.rowContainer.innerHTML = this.htmlContent;
    }
  }
  get host() { return getElement(this); }
};
SelectOption.style = selectOptionCss;

export { SelectOption as fw_select_option };
