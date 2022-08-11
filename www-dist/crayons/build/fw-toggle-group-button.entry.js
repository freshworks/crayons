import { r as registerInstance, h as createEvent, i as h, k as Host, j as getElement } from './index-44c267ce.js';

const toggleGroupButtonCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:inline-block}@media screen and (prefers-reduced-motion: reduce){.fw-toggle-card-button,.fw-toggle-card-button-tick,.fw-toggle-icon-button{-webkit-transition:none;transition:none}}.fw-toggle-card-button{width:var(--fw-toggle-group-button-card-width, 240px);height:var(--fw-toggle-group-button-card-height, 112px);-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;cursor:pointer;outline:0;padding:12px;border-radius:8px;background:#fff;border:1px solid #cfd7df;-webkit-box-shadow:inset 0px 1px 2px rgba(24, 50, 71, 0.05);box-shadow:inset 0px 1px 2px rgba(24, 50, 71, 0.05);-webkit-transition:background-color 0.3s;transition:background-color 0.3s;position:relative}.fw-toggle-card-button .fw-toggle-card-button-header{width:100%;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;line-height:20px;text-align:start;color:#12344d;font-size:16px;font-weight:600;-webkit-margin-after:8px;margin-block-end:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:inline-block}.fw-toggle-card-button .fw-toggle-card-button-description{width:100%;margin:0;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-align:start;color:#475867;font-size:14px;font-weight:400;word-break:break-word;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;line-height:16px;max-height:var(--fw-toggle-group-button-card-description-max-height, 48px);-webkit-line-clamp:var(--fw-toggle-group-button-card-description-max-lines, 3);-webkit-box-orient:vertical}.fw-toggle-card-button .fw-toggle-card-button-tick{width:20px;height:20px;position:absolute;inset-block-start:-8px;inset-inline-end:-8px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;border-radius:50%;outline:2px solid #fff;background-color:#2c5cc5;-webkit-transition:opacity 0.3s;transition:opacity 0.3s;opacity:1}.fw-toggle-card-button:hover{background:#ebeff3}.fw-toggle-card-button:focus{border:1px solid #e5f2fd;-webkit-box-shadow:0 0 0 1px #e5f2fd;box-shadow:0 0 0 1px #e5f2fd}.fw-toggle-card-button--disabled{cursor:not-allowed;opacity:0.6}.fw-toggle-card-button--selected{background:#e5f2fd;border:1px solid #bbdcfe;-webkit-box-shadow:0px 1px 4px #ebeff3;box-shadow:0px 1px 4px #ebeff3}.fw-toggle-card-button--selected .fw-toggle-card-button-tick{opacity:1}.fw-toggle-card-button--selected--checkbox{cursor:pointer}.fw-toggle-card-button--selected--checkbox:hover{background:#e5f2fd;border:1px solid #bbdcfe;-webkit-box-shadow:0px 1px 4px #ebeff3;box-shadow:0px 1px 4px #ebeff3}.fw-toggle-card-button--selected--checkbox:hover .fw-toggle-card-button-tick{opacity:0.5}.fw-toggle-card-button--selected--checkbox:active{background:#e5f2fd;border:1px solid #bbdcfe;-webkit-box-shadow:0px 1px 4px #ebeff3;box-shadow:0px 1px 4px #ebeff3}.fw-toggle-card-button--selected--checkbox:active .fw-toggle-card-button-tick{opacity:0.1}.fw-toggle-card-button--selected--checkbox:focus{background:#e5f2fd;border:1px solid #bbdcfe;-webkit-box-shadow:0px 1px 4px #ebeff3;box-shadow:0px 1px 4px #ebeff3}.fw-toggle-card-button--selected--checkbox:focus .fw-toggle-card-button-tick{opacity:1}.fw-toggle-card-button--selected--radio{cursor:unset;pointer-events:none}.fw-toggle-card-button--selected--radio:hover{background:#e5f2fd;border:1px solid #bbdcfe;-webkit-box-shadow:0px 1px 4px #ebeff3;box-shadow:0px 1px 4px #ebeff3}.fw-toggle-card-button--selected--radio:focus{background:#e5f2fd;border:1px solid #bbdcfe;-webkit-box-shadow:0px 1px 4px #ebeff3;box-shadow:0px 1px 4px #ebeff3}.fw-toggle-icon-button{width:var(--fw-toggle-group-button-icon-button-width, 42px);height:var(--fw-toggle-group-button-icon-button-height, 36px);-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;cursor:pointer;outline:0;padding:0;border:1px solid #cfd7df;border-radius:4px;-webkit-transition:background-color 0.3s;transition:background-color 0.3s}:host(:not([dir=\"rtl\"])) .fw-toggle-icon-button,:host([dir=\"ltr\"]) .fw-toggle-icon-button{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #ffffff), color-stop(95.75%, #f5f7f9));background:linear-gradient(180deg, #ffffff 2.56%, #f5f7f9 95.75%)}:host([dir=\"rtl\"]) .fw-toggle-icon-button{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #ffffff), color-stop(95.75%, #f5f7f9));background:linear-gradient(-180deg, #ffffff 2.56%, #f5f7f9 95.75%)}.fw-toggle-icon-button:hover{background:#f5f7f9}.fw-toggle-icon-button:focus{border:2px solid #2c5cc5;-webkit-box-shadow:0px 1px 4px #ebeff3;box-shadow:0px 1px 4px #ebeff3}:host(:not([dir=\"rtl\"])) .fw-toggle-icon-button:focus,:host([dir=\"ltr\"]) .fw-toggle-icon-button:focus{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #ffffff), color-stop(95.75%, #f5f7f9));background:linear-gradient(180deg, #ffffff 2.56%, #f5f7f9 95.75%)}:host([dir=\"rtl\"]) .fw-toggle-icon-button:focus{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #ffffff), color-stop(95.75%, #f5f7f9));background:linear-gradient(-180deg, #ffffff 2.56%, #f5f7f9 95.75%)}.fw-toggle-icon-button--disabled{cursor:not-allowed;opacity:0.6}.fw-toggle-icon-button--selected{border:2px solid #2c5cc5;-webkit-box-shadow:0px 1px 4px #ebeff3;box-shadow:0px 1px 4px #ebeff3}:host(:not([dir=\"rtl\"])) .fw-toggle-icon-button--selected,:host([dir=\"ltr\"]) .fw-toggle-icon-button--selected{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #ffffff), color-stop(95.75%, #f5f7f9));background:linear-gradient(180deg, #ffffff 2.56%, #f5f7f9 95.75%)}:host([dir=\"rtl\"]) .fw-toggle-icon-button--selected{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #ffffff), color-stop(95.75%, #f5f7f9));background:linear-gradient(-180deg, #ffffff 2.56%, #f5f7f9 95.75%)}.fw-toggle-icon-button--selected--checkbox{cursor:pointer}.fw-toggle-icon-button--selected--checkbox:hover{background:#f5f7f9}.fw-toggle-icon-button--selected--checkbox:focus{border:2px solid #2c5cc5;-webkit-box-shadow:0px 1px 4px #ebeff3;box-shadow:0px 1px 4px #ebeff3}:host(:not([dir=\"rtl\"])) .fw-toggle-icon-button--selected--checkbox:focus,:host([dir=\"ltr\"]) .fw-toggle-icon-button--selected--checkbox:focus{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #ffffff), color-stop(95.75%, #f5f7f9));background:linear-gradient(180deg, #ffffff 2.56%, #f5f7f9 95.75%)}:host([dir=\"rtl\"]) .fw-toggle-icon-button--selected--checkbox:focus{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #ffffff), color-stop(95.75%, #f5f7f9));background:linear-gradient(-180deg, #ffffff 2.56%, #f5f7f9 95.75%)}.fw-toggle-icon-button--selected--radio{cursor:unset;pointer-events:none}.fw-toggle-icon-button--selected--radio:hover{border:2px solid #2c5cc5;-webkit-box-shadow:0px 1px 4px #ebeff3;box-shadow:0px 1px 4px #ebeff3}:host(:not([dir=\"rtl\"])) .fw-toggle-icon-button--selected--radio:hover,:host([dir=\"ltr\"]) .fw-toggle-icon-button--selected--radio:hover{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #ffffff), color-stop(95.75%, #f5f7f9));background:linear-gradient(180deg, #ffffff 2.56%, #f5f7f9 95.75%)}:host([dir=\"rtl\"]) .fw-toggle-icon-button--selected--radio:hover{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #ffffff), color-stop(95.75%, #f5f7f9));background:linear-gradient(-180deg, #ffffff 2.56%, #f5f7f9 95.75%)}.fw-toggle-icon-button--selected--radio:focus{border:2px solid #2c5cc5;-webkit-box-shadow:0px 1px 4px #ebeff3;box-shadow:0px 1px 4px #ebeff3}:host(:not([dir=\"rtl\"])) .fw-toggle-icon-button--selected--radio:focus,:host([dir=\"ltr\"]) .fw-toggle-icon-button--selected--radio:focus{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #ffffff), color-stop(95.75%, #f5f7f9));background:linear-gradient(180deg, #ffffff 2.56%, #f5f7f9 95.75%)}:host([dir=\"rtl\"]) .fw-toggle-icon-button--selected--radio:focus{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #ffffff), color-stop(95.75%, #f5f7f9));background:linear-gradient(-180deg, #ffffff 2.56%, #f5f7f9 95.75%)}";

let ToggleGroupButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwToggled = createEvent(this, "fwToggled", 7);
    /**
     * Sets the state to selected. If the attribute’s value is undefined, the value is set to false.
     */
    this.selected = false;
    /**
     * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
     */
    this.disabled = false;
    /**
     * sets the default base class name and the rest of the class names for the other states are automatically appended to this
     */
    this.baseClassName = 'fw-card-radio';
    /**
     * sets the type of the button
     */
    this.type = 'card';
    /**
     * Enables the component to be used as a toggle button or just to be used as a normal button
     */
    this.selectable = true;
    /**
     * Enables the component to be used as a part of multi selection group
     */
    this.isCheckbox = false;
    /**
     * index attached inside the parent group component
     */
    this.index = -1;
    /**
     * Identifier corresponding to the component, that is saved when the form data is saved.
     */
    this.value = '';
    /**
     * Label displayed as header in the card.
     */
    this.header = '';
    /**
     * Label displayed as description in the card.
     */
    this.description = '';
    /**
     * Name of the component, saved as part of the form data.
     */
    this.name = '';
  }
  /**
   * Public method exposed to set the focus for the button component - to be used for accessibility
   */
  async setFocus() {
    this.button.focus();
  }
  listenClickHandler(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.detail && event.detail > 1) {
      return;
    }
    let boolEmitEvent = true;
    let boolSelected = false;
    if (this.selectable) {
      if (this.isCheckbox) {
        boolSelected = !this.selected;
      }
      else {
        boolSelected = true;
        if (this.selected) {
          boolEmitEvent = false;
        }
      }
    }
    this.selected = boolSelected;
    if (boolEmitEvent) {
      this.fwToggled.emit({
        index: this.index,
        value: this.value,
        selected: boolSelected,
      });
    }
  }
  componentWillLoad() {
    switch (this.type) {
      case 'card':
        this.baseClassName = 'fw-toggle-card-button';
        break;
      case 'icon':
        this.baseClassName = 'fw-toggle-icon-button';
        break;
    }
  }
  getClassName() {
    const strComponentClassName = this.baseClassName;
    let strClassName = strComponentClassName;
    if (this.selectable && this.selected) {
      strClassName += ' ' + strComponentClassName + '--selected';
      if (this.isCheckbox) {
        strClassName += ' ' + strComponentClassName + '--selected--checkbox';
      }
      else {
        strClassName += ' ' + strComponentClassName + '--selected--radio';
      }
    }
    if (this.disabled) {
      strClassName += ' ' + strComponentClassName + '--disabled';
    }
    return strClassName;
  }
  render() {
    const strComponentClassName = this.baseClassName;
    const strButtonClassName = this.getClassName();
    const strBtnType = this.type;
    return (h(Host, { tabIndex: '-1' }, strBtnType === 'card' && (h("button", { ref: (button) => (this.button = button), class: strButtonClassName, "aria-disabled": this.disabled }, h("label", { class: `${strComponentClassName}-header` }, this.header), this.description && this.description !== '' && (h("p", { class: `${strComponentClassName}-description` }, this.description)), this.selected ? (h("span", { class: `${strComponentClassName}-tick` }, h("fw-icon", { size: 10, name: 'check', color: '#FFFFFF', library: 'system' }))) : (''))), strBtnType === 'icon' && (h("button", { ref: (button) => (this.button = button), class: strButtonClassName, "aria-disabled": this.disabled }, h("slot", { name: 'toggle-icon' }))), strBtnType === 'custom' && h("slot", null)));
  }
  get host() { return getElement(this); }
};
ToggleGroupButton.style = toggleGroupButtonCss;

export { ToggleGroupButton as fw_toggle_group_button };
