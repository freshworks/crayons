import { r as registerInstance, h as createEvent, i as h, F as Fragment, j as getElement } from './index-44c267ce.js';
import { b as hasSlot, r as renderHiddenField, h as handleKeyDown } from './index-a4741a9c.js';
import { F as FieldControl } from './field-control-33f3464c.js';
import { i as i18n } from './Translation-c1d22902.js';

const selectCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.field-control{position:relative}.field-control-label{display:block;font-size:12px;color:var(--fw-label-color, #475867);font-weight:600;-webkit-margin-after:4px;margin-block-end:4px;-webkit-padding-start:2px;padding-inline-start:2px;line-height:20px}.field-control-label.required::after{content:\"*\";position:relative;display:inline-block;inset-block-start:2px;font-size:14px;color:#d72d30;-webkit-padding-start:2px;padding-inline-start:2px;font-weight:700}.field-control-hint-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-hint-color, #acb6be);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-error-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-error-color, #d72d30);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.field-control-warning-text{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", arial, sans-serif;font-size:12px;line-height:20px;-webkit-margin-before:4px;margin-block-start:4px;-webkit-margin-after:0;margin-block-end:0;color:var(--fw-warning-color, #f8ab59);position:inherit;display:block;-webkit-padding-start:2px;padding-inline-start:2px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}:host{display:block}.input-container{width:calc(100% - 10px);border:var(--fw-select-border, 1px solid #cfd7df);border-radius:var(--fw-select-border-radius, 4px);-webkit-padding-start:10px;padding-inline-start:10px;background-color:#fff;-webkit-box-shadow:none;box-shadow:none;min-height:22px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;}.input-container .input-container-inner{display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-wrap:wrap;flex-wrap:wrap}.input-container .input-container-inner .tag-container{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.input-container .input-container-inner .tag-container fw-tag{-webkit-margin-start:0px;margin-inline-start:0px;-webkit-margin-after:4px;margin-block-end:4px;-webkit-margin-end:4px;margin-inline-end:4px;-webkit-margin-before:4px;margin-block-start:4px}.input-container .input-container-inner input{-ms-flex-positive:1;flex-grow:1;width:100%;border:none;font-family:inherit;font-size:14px;font-weight:500;letter-spacing:0;line-height:1.4;background-color:#fff;min-width:20px;min-height:22px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;margin-inline:0px;margin-block:4px}.input-container .input-container-inner input:focus{border:none;outline:none}.input-container .input-container-inner input.multi-select{width:auto}.input-container .input-container-inner input:disabled{background-color:#f5f7f9 !important;border-color:transparent;cursor:not-allowed}.input-container fw-spinner{-webkit-margin-end:8px;margin-inline-end:8px}@media (prefers-reduced-motion){.input-container:hover,.input-container:focus{-webkit-transition:none;transition:none}}.input-container:hover,.input-container:focus{border:1px #475867 solid;-webkit-transition:0.2s linear;transition:0.2s linear}.input-container.error{border-color:#d72d30}.input-container.error>span.help-block{color:#d72d30}.input-container.warning{border-color:#f8ab59}.input-container.warning>span.help-block{color:#f8ab59}.input-container.select-disabled{color:#ebeff3;background-color:#f5f7f9 !important;border-style:solid;cursor:not-allowed}.input-container.select-disabled:hover{border:1px solid #cfd7df}.has-focus .input-container{outline:none;background:#fff;border:1px solid transparent;-webkit-box-shadow:0 0 0 2px #2c5cc5;box-shadow:0 0 0 2px #2c5cc5}.has-focus .input-container.error{border-color:#d72d30;-webkit-box-shadow:none;box-shadow:none}.has-focus .input-container.error>span.help-block{color:#d72d30}.has-focus .input-container.warning{border-color:#f8ab59;-webkit-box-shadow:0 0 0 1px #f8ab59;box-shadow:0 0 0 1px #f8ab59}.has-focus .input-container.warning>span.help-block{color:#f8ab59}.select-container{-webkit-margin-after:var(--fw-select-margin-bottom, 0px);margin-block-end:var(--fw-select-margin-bottom, 0px);width:inherit;height:inherit;position:relative}.select-container .dropdown{z-index:99}.select-container .dropdown-status-icon{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-margin-end:8px;margin-inline-end:8px;min-width:20px;min-height:20px;-webkit-transition:all 0.15s;transition:all 0.15s;--icon-color:$color-elephant-800}.select-container .help-block{font-size:12px;-webkit-margin-before:4px;margin-block-start:4px;line-height:20px;color:#acb6be;position:inherit;-webkit-margin-after:0;margin-block-end:0;display:block;-webkit-padding-start:2px;padding-inline-start:2px}:host(:not([dir=\"rtl\"])) .select-container .dropdown-status-icon.expanded,:host([dir=\"ltr\"]) .select-container .dropdown-status-icon.expanded{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host([dir=\"rtl\"]) .select-container .dropdown-status-icon.expanded{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}.select-container.error{border-color:#d72d30}.select-container.error>span.help-block{color:#d72d30}.select-container.warning{border-color:#f8ab59}.select-container.warning>span.help-block{color:#f8ab59}::-webkit-input-placeholder{color:#92a2b1;opacity:1}::-moz-placeholder{color:#92a2b1;opacity:1}:-ms-input-placeholder{color:#92a2b1;opacity:1}::-ms-input-placeholder{color:#92a2b1;opacity:1}::placeholder{color:#92a2b1;opacity:1}:-ms-input-placeholder{color:#92a2b1}::-ms-input-placeholder{color:#92a2b1}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let Select = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    this.tagRefs = [];
    this.tagArrowKeyCounter = 0;
    this.changeEmittable = () => !this.disabled;
    this.innerOnFocus = (e) => {
      if (this.changeEmittable()) {
        this.hasFocus = true;
        this.fwFocus.emit(e);
      }
    };
    this.innerOnClick = () => {
      var _a, _b;
      this.setFocus();
      // Select the whole text in case of single select
      this.multiple || ((_b = (_a = this.selectInput) === null || _a === void 0 ? void 0 : _a.select) === null || _b === void 0 ? void 0 : _b.call(_a));
      if (this.variant !== 'mail') {
        this.openDropdown();
      }
    };
    this.innerOnBlur = (e) => {
      if (this.changeEmittable()) {
        this.hasFocus = false;
        this.fwBlur.emit({
          event: e,
          name: this.name,
        });
      }
    };
    this.openDropdown = () => {
      if (!this.isExpanded && this.changeEmittable()) {
        this.popover.show();
      }
    };
    this.closeDropdown = () => {
      if (this.isExpanded && this.changeEmittable()) {
        this.popover.hide();
      }
    };
    /**
     * If the dropdown is shown or not
     */
    this.isExpanded = false;
    this.hasFocus = false;
    this.didInit = false;
    this.selectedOptionsState = [];
    this.isLoading = false;
    this.focusedOptionId = '';
    this.hasHintTextSlot = false;
    this.hasWarningTextSlot = false;
    this.hasErrorTextSlot = false;
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
     * The UI variant of the select to be used.
     */
    this.variant = 'standard';
    /**
     * Standard is the default option without any graphics other options are icon and avatar which places either the icon or avatar at the beginning of the row.
     * The props for the icon or avatar are passed as an object via the graphicsProps.
     */
    this.optionsVariant = 'standard';
    /**
     * Allow to search for value. Default is true.
     */
    this.searchable = true;
    /**
     * Place a checkbox.
     */
    this.checkbox = false;
    /**
     * Default option to be shown if the option doesn't match the filterText.
     */
    this.notFoundText = '';
    /**
     * Text to be displayed when there is no data available in the select.
     */
    this.noDataText = '';
    /**
     * Debounce timer for the search promise function.
     */
    this.debounceTimer = 300;
    /**
     * Array of the options that is displayed as the default selection, in the list box. Must be a valid option corresponding to the fw-select-option components used in Select.
     */
    this.selectedOptions = [];
    /**
     * Whether the select width to be same as that of the options.
     */
    this.sameWidth = true;
    /**
     * Placement of the options list with respect to select.
     */
    this.optionsPlacement = 'bottom';
    /**
     * The variant of tag to be used.
     */
    this.tagVariant = 'standard';
    /**
     * Whether the arrow/caret should be shown in the select.
     */
    this.caret = true;
    /**
     * If the default label prop is not used, then use this prop to pass the id of the label.
     */
    this.labelledBy = '';
    /**
     * Whether clicking on the already selected option disables it.
     */
    this.allowDeselect = true;
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
    this.tagContainerKeyDown = (ev) => {
      switch (ev.key) {
        case 'Escape':
          this.innerOnBlur(ev);
          this.closeDropdown();
          break;
        case 'ArrowLeft':
          this.tagArrowKeyCounter--;
          if (this.tagArrowKeyCounter >= 0) {
            this.focusOnTag(this.tagArrowKeyCounter);
          }
          else {
            this.tagArrowKeyCounter = 0;
          }
          ev.stopImmediatePropagation();
          break;
        case 'ArrowRight':
          this.tagArrowKeyCounter++;
          if (this.tagArrowKeyCounter >= this.value.length) {
            this.selectInput.focus();
          }
          else {
            this.focusOnTag(this.tagArrowKeyCounter);
          }
          ev.stopImmediatePropagation();
          break;
      }
    };
  }
  onDropdownClose() {
    this.clearInput();
    this.isExpanded = false;
    this.multiple && this.selectInput.focus();
  }
  onDropdownOpen() {
    this.isExpanded = true;
  }
  onLoading(event) {
    this.isLoading = event.detail.isLoading;
    if (this.variant === 'mail' && !this.isLoading) {
      this.selectInput.value && this.openDropdown();
    }
  }
  fwSelectedHandler(selectedItem) {
    var _a, _b;
    if (selectedItem.composedPath()[0].tagName === 'FW-LIST-OPTIONS') {
      this.selectedOptionsState = (_b = (_a = selectedItem.detail) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.selectedOptions;
      this.value = selectedItem.detail.value;
      this.renderInput();
      if (!this.multiple || this.variant === 'mail') {
        this.closeDropdown();
      }
      selectedItem.stopImmediatePropagation();
      selectedItem.stopPropagation();
      selectedItem.preventDefault();
      if (this.selectedOptionsState.length > 0) {
        this.fwChange.emit({
          name: this.name,
          value: this.value,
          meta: { selectedOptions: this.selectedOptionsState },
        });
      }
      else {
        this.fwChange.emit({
          name: this.name,
          value: this.value,
          meta: {
            shouldValidate: false,
            selectedOptions: this.selectedOptionsState,
          },
        });
      }
    }
  }
  // Listen to Tag close in case of multi-select
  fwCloseHandler(ev) {
    this.value = this.value.filter((value) => value !== ev.detail.value);
  }
  onKeyDown(ev) {
    switch (ev.key) {
      case 'ArrowDown':
        this.innerOnClick();
        this.fwListOptions.setFocus();
        ev.preventDefault();
        ev.stopPropagation();
        break;
      case 'ArrowLeft':
      case 'Backspace':
        if (this.multiple && this.selectInput.value === '') {
          this.focusOnTagContainer();
        }
        break;
      case 'Escape':
        this.innerOnBlur(ev);
        this.closeDropdown();
        break;
      case 'Tab':
        this.closeDropdown();
        break;
    }
  }
  onOptionFocus(event) {
    if (event.composedPath()[0].tagName === 'FW-SELECT-OPTION') {
      this.focusedOptionId = event.detail.id;
    }
  }
  onOptionBlur(event) {
    if (event.composedPath()[0].tagName === 'FW-SELECT-OPTION') {
      this.focusedOptionId = '';
    }
  }
  optionsChangedHandler() {
    this.renderInput();
  }
  onOptionsChange(newValue) {
    var _a;
    const selectedValues = newValue === null || newValue === void 0 ? void 0 : newValue.filter((option) => option.selected);
    // If selected key is available in options schema use it
    // Or check for the value
    if (selectedValues.length > 0) {
      this.dataSource = newValue;
      this.selectedOptionsState = selectedValues;
      this.value = this.multiple
        ? this.selectedOptionsState.map((x) => x.value)
        : (_a = this.selectedOptionsState[0]) === null || _a === void 0 ? void 0 : _a.value;
    }
    else if (this.valueExists()) {
      this.dataSource = newValue.map((option) => {
        return Object.assign(Object.assign({}, option), { selected: this.isValueEqual(this.value, option) });
      });
    }
    else {
      this.dataSource = newValue;
      this.value = this.multiple ? [] : '';
      this.selectedOptionsState = [];
    }
  }
  async getSelectedItem() {
    return this.fwListOptions.getSelectedOptions();
  }
  async setSelectedValues(values) {
    this.fwListOptions.setSelectedValues(values);
    this.renderInput();
  }
  async setSelectedOptions(options) {
    this.fwListOptions.setSelectedOptions(options);
    this.renderInput();
  }
  async setFocus() {
    var _a;
    this.hasFocus = true;
    (_a = this.selectInput) === null || _a === void 0 ? void 0 : _a.focus();
  }
  focusOnTagContainer() {
    this.tagRefs = [...this.tagContainer.getElementsByTagName('fw-tag')];
    this.tagArrowKeyCounter = this.value.length - 1;
    this.focusOnTag(this.tagArrowKeyCounter);
  }
  focusOnTag(index) {
    var _a;
    (_a = this.tagRefs[index]) === null || _a === void 0 ? void 0 : _a.setFocus();
  }
  clearInput() {
    if (!this.multiple && this.value) {
      this.renderInput();
      return;
    }
    this.selectInput.value = '';
  }
  isValueEqual(value, option) {
    return this.multiple
      ? value.includes(option.value)
      : value === option.value;
  }
  valueExists() {
    return this.value && (this.multiple ? this.value.length > 0 : !!this.value);
  }
  onInput() {
    this.searchValue = this.selectInput.value;
    if (this.selectInput.value) {
      this.variant !== 'mail' && this.openDropdown();
    }
    else {
      // Clear selected value in case of single select.
      this.multiple || this.setSelectedValues('');
      this.variant === 'mail' && this.closeDropdown();
    }
  }
  renderTags() {
    if (this.multiple && Array.isArray(this.value)) {
      return this.selectedOptionsState.map((option) => {
        if (this.isValueEqual(this.value, option)) {
          return (h("fw-tag", { variant: this.tagVariant, graphicsProps: option.graphicsProps, text: option.text, disabled: option.disabled, value: option.value, focusable: false }));
        }
      });
    }
  }
  renderInput() {
    if (this.selectedOptionsState.length > 0) {
      if (this.selectInput) {
        this.selectInput.value = '';
        this.selectInput.value = this.multiple
          ? this.selectInput.value
          : this.selectedOptionsState[0].text || '';
      }
    }
    else {
      if (this.selectInput) {
        this.selectInput.value = '';
      }
    }
  }
  componentWillLoad() {
    var _a, _b;
    this.boundary || (this.boundary = this.host.parentElement);
    this.checkSlotContent();
    if (this.variant === 'mail') {
      this.caret = false;
      this.multiple = true;
    }
    //TODO: The below is a rough draft and needs to be optimized for better performance.
    const selectOptions = Array.from(this.host.querySelectorAll('fw-select-option'));
    // Set value if the selectedOptions is provided
    if (this.selectedOptions.length > 0) {
      this.selectedOptionsState = this.selectedOptions;
      this.value = this.multiple
        ? this.selectedOptions.map((option) => option.value)
        : this.selectedOptions[0].value;
    }
    if (this.multiple) {
      if (this.multiple && typeof this.value === 'string') {
        throw Error('value must be a array of string when multiple is true');
      }
      this.value = ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) > 0 ? this.value : [];
    }
    else {
      this.value = this.value ? this.value : '';
    }
    const options = selectOptions.map((option) => {
      return {
        html: option.html,
        text: option.html ? option.optionText : option.textContent,
        value: option.value,
        selected: this.isValueEqual(this.value, option) || option.selected,
        disabled: option.disabled,
        htmlContent: option.html ? option.innerHTML : '',
      };
    });
    this.dataSource = options.length === 0 ? this.options : options;
    // Set selectedOptions if the value is provided
    if (!this.multiple && this.value && this.selectedOptions.length === 0) {
      this.selectedOptionsState = this.dataSource.filter((option) => this.value === option.value);
    }
    else if (this.multiple &&
      this.value.length !== this.selectedOptions.length) {
      this.selectedOptionsState = this.dataSource.filter((option) => this.isValueEqual(this.value, option));
    }
    if (((_b = this.dataSource) === null || _b === void 0 ? void 0 : _b.length) > 0) {
      // Check whether the selected data in the this.dataSource  matches the value
      const selectedDataSource = this.dataSource.filter((option) => option.selected);
      const selectedDataSourceValues = selectedDataSource.map((option) => option.value);
      const selected = this.multiple
        ? selectedDataSourceValues
        : selectedDataSourceValues[0];
      if (selectedDataSourceValues.length > 0 &&
        JSON.stringify(this.value) !== JSON.stringify(selected)) {
        this.value = selected;
        this.selectedOptionsState = selectedDataSource;
      }
    }
    this.host.addEventListener('focus', this.setFocus);
    //this.host.innerHTML = '';
    //Get id
    this.hostId = this.host.id || '';
  }
  componentDidLoad() {
    this.renderInput();
    this.didInit = true;
  }
  disconnectedCallback() {
    this.host.removeEventListener('focus', this.setFocus);
  }
  expandWatcher(expanded) {
    var _a, _b, _c, _d;
    if (this.variant === 'button') {
      const icon = (_d = (_c = (_b = (_a = this.host.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.select-container')) === null || _b === void 0 ? void 0 : _b.querySelector('fw-button')) === null || _c === void 0 ? void 0 : _c.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('fw-icon');
      icon && (icon.name = expanded ? 'chevron-up' : 'chevron-down');
    }
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
    renderHiddenField(host, name, value);
    return (h(FieldControl, { inputId: this.name, label: this.label, labelId: `${this.label}-${this.name}`, state: this.state, hintTextId: `hint-${this.name}`, hintText: this.hintText, hasHintTextSlot: this.hasHintTextSlot, errorTextId: `error-${this.name}`, errorText: this.errorText, hasErrorTextSlot: this.hasErrorTextSlot, warningTextId: `warning-${this.name}`, warningText: this.warningText, hasWarningTextSlot: this.hasWarningTextSlot, required: this.required }, h("div", { "aria-disabled": this.disabled, class: {
        'has-focus': this.hasFocus,
      } }, h("div", { class: { 'select-container': true, [this.state]: true }, role: 'combobox', "aria-controls": `${this.hostId}-listbox`, "aria-haspopup": 'listbox', "aria-expanded": this.isExpanded, "aria-owns": `${this.hostId}-listbox` }, h("fw-popover", { distance: '8', trigger: 'manual', ref: (popover) => (this.popover = popover), "same-width": this.sameWidth, placement: this.optionsPlacement, boundary: this.boundary }, h("div", { slot: 'popover-trigger', class: {
        'input-container': this.variant !== 'button',
        [this.state]: true,
        'select-disabled': this.disabled,
      }, onClick: () => this.innerOnClick(), onKeyDown: handleKeyDown(this.innerOnClick, true) }, this.variant === 'button' ? (h("fw-button", { style: { '--fw-button-label-vertical-padding': '7px' }, "show-caret-icon": true, id: `${this.hostId}-btn`, color: 'secondary', class: this.host.classList.value.includes('first')
        ? 'fw-button-group__button--first'
        : 'fw-button-group__button--last' }, this.value)) : (h(Fragment, null, h("div", { class: 'input-container-inner' }, this.multiple && (h("div", { class: 'tag-container', onFocus: this.focusOnTagContainer, ref: (tagContainer) => (this.tagContainer = tagContainer), onKeyDown: this.tagContainerKeyDown }, this.renderTags())), h("input", { ref: (selectInput) => (this.selectInput = selectInput), class: {
        'multiple-select': this.multiple,
      }, autoComplete: 'off', disabled: this.disabled, name: this.name, id: this.name, placeholder: this.valueExists() ? '' : this.placeholder || '', readOnly: this.readonly, required: this.required, type: this.type, value: '', "aria-autocomplete": 'list', "aria-activedescendant": this.focusedOptionId, onInput: () => this.onInput(), onFocus: (e) => this.innerOnFocus(e), onBlur: (e) => this.innerOnBlur(e), "aria-invalid": this.state === 'error', "aria-describedby": `hint-${this.name} error-${this.name}` })), this.isLoading ? (h("fw-spinner", { size: 'small' })) : (this.caret && (h("span", { class: {
        'dropdown-status-icon': true,
        'expanded': this.isExpanded,
      } }, h("fw-icon", { name: 'chevron-down', size: 8, library: 'system' }))))))), h("fw-list-options", { ref: (fwListOptions) => (this.fwListOptions = fwListOptions), id: `${this.hostId}-listbox`, role: 'listbox', "aria-labelledby": this.labelledBy || `${this.hostId}-label`, notFoundText: this.notFoundText, debounceTimer: this.debounceTimer, noDataText: this.noDataText, search: this.search, selectedOptions: this.selectedOptions, variant: this.optionsVariant, "filter-text": this.searchValue, options: this.dataSource, value: this.value, multiple: this.multiple, max: this.max, disabled: this.disabled, checkbox: this.checkbox, allowDeselect: this.allowDeselect, slot: 'popover-content' }))))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "dataSource": ["optionsChangedHandler"],
    "options": ["onOptionsChange"],
    "isExpanded": ["expandWatcher"]
  }; }
};
__decorate([
  i18n({ keyName: 'search.noItemsFound' })
], Select.prototype, "notFoundText", void 0);
__decorate([
  i18n({ keyName: 'search.noDataAvailable' })
], Select.prototype, "noDataText", void 0);
Select.style = selectCss;

export { Select as fw_select };
