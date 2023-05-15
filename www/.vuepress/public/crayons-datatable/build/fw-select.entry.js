import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-4996832f.js';
import { r as renderHiddenField, h as handleKeyDown } from './index-268121b7.js';

const selectCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{--min-height:10px;--max-height:200px}label{font-size:12px;font-weight:500;color:#12344d;margin-bottom:0;padding-bottom:4px;padding-left:2px;display:block}label.required::after{content:\"*\";position:relative;display:inline-block;top:2px;font-size:14px;color:#d72d30;padding-left:2px}.input-container-inner{display:-ms-flexbox;display:flex;width:100%;-ms-flex-wrap:wrap;flex-wrap:wrap;position:relative}.input-container-inner input{-ms-flex-positive:1;flex-grow:1;border:none;margin-top:3px;font-size:12px;font-weight:500;letter-spacing:0;line-height:1.4;background-color:#fff;min-width:20px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.input-container-inner input:focus{border:none;outline:none}.input-container-inner input.multi-select{width:auto}.input-container-inner input:disabled{background-color:#f3f5f7 !important;border-color:transparent;cursor:not-allowed}.input-container{width:calc(100% - 10px);border:0;border:1px solid #cfd7df;margin:5px 0 0;border-radius:4px;padding:4px 0 4px 10px;background-color:#fff;-webkit-box-shadow:none;box-shadow:none;min-height:24px;display:inline-block;}@media (prefers-reduced-motion){.input-container:hover,.input-container:focus{-webkit-transition:none;transition:none}}.input-container:hover,.input-container:focus{border:1px #475867 solid;-webkit-transition:0.2s linear;transition:0.2s linear}.input-container.error{border-color:#d72d30}.input-container.error span.dropdown-status-icon{border-color:#d72d30}.input-container.error~span.help-block{color:#d72d30}.input-container.warning{border-color:#f8ab59}.input-container.warning span.dropdown-status-icon{border-color:#f8ab59}.input-container.warning~span.help-block{color:#f8ab59}.input-container.select-disabled{color:#ebeff3;background-color:#f3f5f7 !important;border-style:solid;cursor:not-allowed}.input-container.select-disabled:hover{border:1px solid #cfd7df}:host(.has-focus) .input-container{outline:none;background:#fff;border:1px solid transparent;-webkit-box-shadow:0 0 0 2px #2c5cc5;box-shadow:0 0 0 2px #2c5cc5}:host(.has-focus) .input-container.error{border-color:#d72d30;-webkit-box-shadow:0 0 0 1px #d72d30;box-shadow:0 0 0 1px #d72d30}:host(.has-focus) .input-container.error span.dropdown-status-icon{border-color:#d72d30}:host(.has-focus) .input-container.error~span.help-block{color:#d72d30}:host(.has-focus) .input-container.warning{border-color:#f8ab59;-webkit-box-shadow:0 0 0 1px #f8ab59;box-shadow:0 0 0 1px #f8ab59}:host(.has-focus) .input-container.warning span.dropdown-status-icon{border-color:#f8ab59}:host(.has-focus) .input-container.warning~span.help-block{color:#f8ab59}.select-container{margin-bottom:16px;width:inherit;height:inherit;position:relative}.select-container .dropdown{z-index:99}.select-container .dropdown-status-icon{position:absolute;display:inline-block;right:12px;content:\"\";top:45%;width:5px;height:5px;background-color:transparent;border-style:inherit;border-top:1px solid #12344d;border-right:1px solid #12344d;border-left:transparent;-webkit-transform:rotate(135deg);transform:rotate(135deg);-webkit-transition:all 0.15s;transition:all 0.15s}.select-container .help-block{font-size:12px;margin-top:3px;color:#92a2b1;position:inherit;margin-bottom:0;display:block;padding-left:2px}.select-container .dropdown-status-icon.expanded{-webkit-transform:rotate(315deg);transform:rotate(315deg)}::-webkit-input-placeholder{color:#92a2b1;opacity:1}::-moz-placeholder{color:#92a2b1;opacity:1}:-ms-input-placeholder{color:#92a2b1;opacity:1}::-ms-input-placeholder{color:#92a2b1;opacity:1}::placeholder{color:#92a2b1;opacity:1}:-ms-input-placeholder{color:#92a2b1}::-ms-input-placeholder{color:#92a2b1}";

let Select = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    this.preventDropdownClose = false;
    /**
     * If the dropdown is shown or not
     */
    this.isExpanded = false;
    this.hasFocus = false;
    this.didInit = false;
    /**
     * Label displayed on the interface, for the component.
     */
    this.label = '';
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    /**
     * Type of option accepted as the input value. If a user tries to enter an option other than the specified type, the list is not populated.
     */
    this.type = 'text';
    /**
     * Theme based on which the list box is styled.
     */
    this.state = 'normal';
    /**
     * Descriptive or instructional text displayed below the list box.
     */
    this.stateText = '';
    /**
     * If true, the user cannot modify the default value selected. If the attribute's value is undefined, the value is set to true.
     */
    this.readonly = false;
    /**
     * Specifies the select field as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
     */
    this.required = false;
    /**
     * If true, the user must select a value. The default value is not displayed.
     */
    this.forceSelect = true;
    /**
     * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
     */
    this.disabled = false;
    /**
     * Enables selection of multiple options. If the attribute’s value is undefined, the value is set to false.
     */
    this.multiple = false;
    /**
     * Works with `multiple` enabled. Configures the maximum number of options that can be selected with a multi-select component.
     */
    this.max = Number.MAX_VALUE;
    /**
     * Standard is the default option without any graphics other options are icon and avatar which places either the icon or avatar at the beginning of the row.
     * The props for the icon or avatar are passed as an object via the graphicsProps.
     */
    this.variant = 'standard';
    /**
     * Allow to search for value. Default is true.
     */
    this.searchable = true;
    /**
     * Place a checkbox.
     */
    this.isCheckbox = false;
    this.changeEmittable = () => !this.disabled;
    this.closeDropdown = () => {
      this.popover.hide();
      this.isExpanded = false;
    };
    this.innerOnFocus = (e) => {
      if (this.changeEmittable()) {
        this.hasFocus = true;
        this.fwFocus.emit(e);
      }
    };
    this.innerOnClick = () => {
      if (this.changeEmittable()) {
        this.searchable && this.selectInput && this.selectInput.select();
        this.popover.show();
        this.isExpanded = true;
      }
    };
    this.innerOnBlur = (e) => {
      if (this.changeEmittable()) {
        // Remove the user typed value after user focus-out of input component
        if (this.multiple) {
          this.selectInput.value = '';
        }
        else {
          this.renderInput();
        }
        !this.preventDropdownClose && this.closeDropdown();
        this.hasFocus = false;
        this.fwBlur.emit(e);
      }
    };
  }
  keyChanged(newValue, oldValue) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      if (this.didInit) {
        this.fwChange.emit({ value: this.value });
      }
    }
  }
  fwSelectedHandler(selectedItem) {
    if (selectedItem.composedPath()[0].tagName === 'FW-LIST-OPTIONS') {
      this.value = selectedItem.detail.value;
      this.selectInput.value = '';
      this.renderInput();
      if (!this.multiple) {
        this.resetFocus();
        this.closeDropdown();
      }
      selectedItem.stopPropagation();
    }
  }
  optionsChangedHandler() {
    this.renderInput();
  }
  // Listen to Tag close in case of multi-select
  fwCloseHandler(ev) {
    this.value = this.value.filter((value) => value !== ev.detail.value);
  }
  onKeyDonw(ev) {
    switch (ev.key) {
      case 'ArrowDown':
        this.innerOnClick();
        break;
      case 'Escape':
        this.innerOnBlur(ev);
        break;
    }
  }
  onInput() {
    this.searchValue = this.selectInput.value.toLowerCase();
    this.renderInput();
  }
  renderTags() {
    if (this.multiple) {
      return this.listOptions.map((option) => {
        if (this.value.includes(option.value)) {
          return (h("fw-tag", { text: option.text, disabled: option.disabled, value: option.value }));
        }
      });
    }
  }
  renderInput() {
    var _a;
    (_a = this.fwListOptions) === null || _a === void 0 ? void 0 : _a.getSelectedOptions().then((selectedOptions) => {
      if (selectedOptions.length > 0) {
        if (this.selectInput) {
          this.selectInput.value = this.multiple
            ? this.selectInput.value
            : selectedOptions[0].text || '';
        }
      }
    });
  }
  resetFocus() {
    this.preventDropdownClose = false;
  }
  componentWillLoad() {
    const selectOptions = Array.from(this.host.querySelectorAll('fw-select-option'));
    this.value = this.value ? this.value : [];
    if (this.value) {
      this.value = this.value === 'string' ? [this.value] : this.value;
    }
    else {
      this.value = [];
    }
    const options = selectOptions.map((option) => {
      return {
        html: option.html,
        text: option.html ? option.optionText : option.textContent,
        value: option.value,
        selected: this.value.includes(option.value) || option.selected,
        disabled: option.disabled || this.disabled,
        htmlContent: option.html ? option.innerHTML : '',
      };
    });
    this.listOptions = options.length === 0 ? this.options : options;
    this.host.innerHTML = '';
  }
  componentDidLoad() {
    this.renderInput();
    this.didInit = true;
  }
  async getSelectedItem() {
    return this.fwListOptions.getSelectedOptions();
  }
  async setSelectedValues(values) {
    if (this.multiple) {
      this.fwListOptions.setSelectedValues(values);
      this.renderInput();
    }
  }
  render() {
    const { host, name, value } = this;
    renderHiddenField(host, name, value);
    return (h(Host, { "aria-disabled": this.disabled, class: {
        'has-focus': this.hasFocus,
      } }, this.label !== '' ? (h("label", { class: { required: this.required } }, " ", this.label, " ")) : (''), h("div", { class: 'select-container' }, h("fw-popover", { distance: '8', ref: (popover) => (this.popover = popover) }, h("div", { slot: 'popover-trigger', class: {
        'input-container': true,
        [this.state]: true,
        'select-disabled': this.disabled,
      }, onClick: () => this.innerOnClick(), onKeyDown: handleKeyDown(this.innerOnClick) }, h("div", { class: 'input-container-inner' }, this.renderTags(), h("input", { ref: (selectInput) => (this.selectInput = selectInput), class: {
        'multiple-select': this.multiple,
      }, autoComplete: 'off', disabled: this.disabled, name: this.name, placeholder: this.value.length > 0 ? '' : this.placeholder || '', readOnly: this.readonly, required: this.required, type: this.type, value: '', onInput: () => this.onInput(), onFocus: (e) => this.innerOnFocus(e), onBlur: (e) => this.innerOnBlur(e) }), h("span", { class: {
        'dropdown-status-icon': true,
        'expanded': this.isExpanded,
      } }))), h("fw-list-options", { ref: (fwListOptions) => (this.fwListOptions = fwListOptions), variant: this.variant, "filter-text": this.searchValue, options: this.listOptions, value: this.value, multiple: this.multiple, max: this.max, isCheckbox: this.isCheckbox, slot: 'popover-content' })), this.stateText !== '' ? (h("span", { class: 'help-block' }, this.stateText)) : (''))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "value": ["keyChanged"],
    "listOptions": ["optionsChangedHandler"]
  }; }
};
Select.style = selectCss;

export { Select as fw_select };
