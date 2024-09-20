import { r as registerInstance, h as createEvent, i as h, F as Fragment, j as getElement } from './index-44c267ce.js';
import { u as uniq, r as range } from './lodash-333a7537.js';
import { T as TranslationController } from './Translation-ce9b2559.js';
import { v as validateEmail, r as renderHiddenField, h as handleKeyDown } from './index-9437a2c2.js';

const emailSelectCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block;min-width:0}.email-select-container{min-width:0;margin:1px}.input-container{min-width:0;width:calc(100% - 10px);border-radius:var(--fw-select-border-radius, 4px);-webkit-padding-start:10px;padding-inline-start:10px;background-color:#fff;-webkit-box-shadow:none;box-shadow:none;min-height:22px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin:1px;}.input-container .input-container-inner{min-width:0;display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-wrap:wrap;flex-wrap:wrap}.input-container .input-container-inner .tag-container{min-width:0;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;}.input-container .input-container-inner .tag-container:focus,.input-container .input-container-inner .tag-container:focus-visible{outline:none}.input-container .input-container-inner .tag-container fw-tag{display:-ms-flexbox;display:flex;min-width:0;margin:4px;-webkit-touch-callout:none;font-weight:600;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.input-container .input-container-inner input{-ms-flex-positive:1;flex-grow:1;border:none;font-family:inherit;font-size:14px;font-weight:500;letter-spacing:0;line-height:1.4;background-color:#fff;min-width:20px;min-height:22px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;margin-inline:0px;margin-block:4px}.input-container .input-container-inner input:focus{border:none;outline:none}.input-container .input-container-inner input.multi-select{width:auto}.input-container .input-container-inner input:disabled{background-color:#f5f7f9 !important;border-color:transparent;cursor:not-allowed}.input-container fw-spinner{-webkit-margin-end:8px;margin-inline-end:8px}@media (prefers-reduced-motion){.input-container:hover,.input-container:focus{-webkit-transition:none;transition:none}}.input-container:hover,.input-container:focus{-webkit-transition:0.2s linear;transition:0.2s linear}.input-container.select-disabled{color:#ebeff3;background-color:#f5f7f9 !important;border-style:solid;cursor:not-allowed}.input-container.select-disabled:hover{border:1px solid #cfd7df}.has-focus .input-container{outline:none;background:#fff;-webkit-box-shadow:0 0 0 2px #2c5cc5;box-shadow:0 0 0 2px #2c5cc5}.select-container{-webkit-margin-after:var(--fw-select-margin-bottom, 0px);margin-block-end:var(--fw-select-margin-bottom, 0px);width:inherit;height:inherit;position:relative}.select-container .to-container{-webkit-padding-end:20px;padding-inline-end:20px}.select-container .dropdown{z-index:99}.select-container .dropdown-status-icon{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-margin-end:8px;margin-inline-end:8px;min-width:20px;min-height:20px;-webkit-transition:all 0.15s;transition:all 0.15s;--icon-color:$color-elephant-800}:host(:not([dir=\"rtl\"])) .select-container .dropdown-status-icon.expanded,:host([dir=\"ltr\"]) .select-container .dropdown-status-icon.expanded{-webkit-transform:rotate(180deg);transform:rotate(180deg)}:host([dir=\"rtl\"]) .select-container .dropdown-status-icon.expanded{-webkit-transform:rotate(-180deg);transform:rotate(-180deg)}::-webkit-input-placeholder{color:#92a2b1;opacity:1}::-moz-placeholder{color:#92a2b1;opacity:1}:-ms-input-placeholder{color:#92a2b1;opacity:1}::-ms-input-placeholder{color:#92a2b1;opacity:1}::placeholder{color:#92a2b1;opacity:1}:-ms-input-placeholder{color:#92a2b1}::-ms-input-placeholder{color:#92a2b1}.tag-container .tag-default{cursor:pointer}.tag-container .tag-disabled{cursor:not-allowed}.single-select-value{font-size:14px;font-weight:400;-webkit-padding-start:8px;padding-inline-start:8px;color:#12344d}.ellipsis{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.single-value-tag{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;min-width:0}:host(:not([dir=\"rtl\"])) .single-value-tag,:host([dir=\"ltr\"]) .single-value-tag{margin:4px 4px 4px 6px}:host([dir=\"rtl\"]) .single-value-tag{margin:4px 6px 4px 4px}.readonly{-webkit-margin-start:20px !important;margin-inline-start:20px !important}.single-value-button{display:-ms-flexbox;display:flex}";

let EmailHeaderCustomComponentsSelectField = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    this.tagArrowKeyCounter = 0;
    this.changeEmittable = () => !this.disabled;
    this.innerOnFocus = (e) => {
      if (this.changeEmittable()) {
        this.hasFocus = true;
        this.fwFocus.emit(e);
        this.focusedValues = [];
      }
    };
    this.innerOnClick = () => {
      var _a, _b;
      this.setFocus();
      // Select the whole text in case of single select
      this.multiple || ((_b = (_a = this.selectInput) === null || _a === void 0 ? void 0 : _a.select) === null || _b === void 0 ? void 0 : _b.call(_a));
      if (!this.multiple) {
        this.openDropdown();
      }
      this.focusedValues = [];
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
    this.selectedOptionsState = [];
    this.isLoading = false;
    this.focusedOptionId = '';
    this.focusedValues = [];
    this.addTooltip = false;
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    /**
     * If true, the user cannot modify the default value selected. If the attribute's value is undefined, the value is set to true.
     */
    this.readonly = false;
    /**
     * Enables selection of multiple options. If the attribute’s value is undefined, the value is set to false.
     */
    this.multiple = false;
    /**
     * Works with `multiple` enabled. Configures the maximum number of options that can be selected with a multi-select component.
     */
    this.max = Number.MAX_VALUE;
    /**
     * Array of the options that is displayed as the default selection, in the list box. Must be a valid option corresponding to the fw-select-option components used in Select.
     */
    this.selectedOptions = [];
    /**
     * Whether clicking on the already selected option disables it.
     */
    this.allowDeselect = false;
    /**
     * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
     */
    this.disabled = false;
    /**
     * Debounce timer for the search promise function.
     */
    this.debounceTimer = 300;
    /**
     * Maximum number of emails allowed.
     */
    this.maxEmailsAllowed = 50;
    this.tagContainerKeyDown = (ev) => {
      var _a;
      switch (ev.key) {
        case 'Escape':
          this.innerOnBlur(ev);
          this.closeDropdown();
          break;
        case 'Delete':
        case 'Backspace':
          if (this.focusedValues.length > 0) {
            // delete focused values
            this.setSelectedOptions(this.selectedOptionsState.filter((_, index) => !this.focusedValues.includes(index)));
            // reset focused values
            this.focusedValues = [];
          }
          break;
        case 'ArrowLeft':
          if (this.tagArrowKeyCounter - 1 >= 0) {
            // should not focus disabled tag
            if (!this.selectedOptionsState[this.tagArrowKeyCounter - 1].disabled) {
              this.tagArrowKeyCounter--;
              this.focusOnTag(this.tagArrowKeyCounter);
            }
          }
          else {
            this.tagArrowKeyCounter = 0;
          }
          ev.stopImmediatePropagation();
          break;
        case 'ArrowRight':
          this.tagArrowKeyCounter++;
          if (this.tagArrowKeyCounter >= this.value.length) {
            (_a = this.selectInput) === null || _a === void 0 ? void 0 : _a.focus();
          }
          else {
            this.focusOnTag(this.tagArrowKeyCounter);
          }
          ev.stopImmediatePropagation();
          break;
      }
    };
    this.componentDidRender = () => {
      const elLabel = this.singleValueLabel;
      if (elLabel && !this.resizeObserver) {
        this.resizeObserver = new ResizeObserver(() => {
          if (elLabel.offsetWidth > 0) {
            this.addTooltip =
              elLabel.offsetWidth < elLabel.scrollWidth ? true : false;
          }
        });
        this.resizeObserver.observe(elLabel);
      }
    };
    this.removeResizeObserver = () => {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
    };
  }
  onDropdownClose(e) {
    var _a;
    if (e.composedPath()[0].id === 'list-items-popover') {
      this.clearInput();
      this.isExpanded = false;
      this.multiple && ((_a = this.selectInput) === null || _a === void 0 ? void 0 : _a.focus());
    }
  }
  onDropdownOpen(e) {
    if (e.composedPath()[0].id === 'list-items-popover') {
      this.isExpanded = true;
    }
  }
  onLoading(event) {
    this.isLoading = event.detail.isLoading;
    if (this.multiple && !this.isLoading && !this.readonly) {
      this.selectInput.value.trim() && this.openDropdown();
    }
  }
  fwSelectedHandler(selectedItem) {
    var _a, _b, _c;
    if (selectedItem.composedPath()[0].tagName === 'FW-LIST-OPTIONS') {
      this.selectedOptionsState = (_b = (_a = selectedItem.detail) === null || _a === void 0 ? void 0 : _a.meta) === null || _b === void 0 ? void 0 : _b.selectedOptions;
      this.value = selectedItem.detail.value;
      this.renderInput();
      this.closeDropdown();
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
      if (this.multiple) {
        (_c = this.selectInput) === null || _c === void 0 ? void 0 : _c.focus();
      }
    }
  }
  // Listen to Tag close in case of multi-select
  fwCloseHandler(ev) {
    this.setSelectedOptions(this.selectedOptionsState.filter((_, index) => index !== ev.detail.index));
    this.focusOnTagContainer();
  }
  onKeyDown(ev) {
    var _a;
    switch (ev.key) {
      case 'ArrowDown':
        this.innerOnClick();
        this.fwListOptions.setFocus();
        ev.preventDefault();
        ev.stopPropagation();
        break;
      case 'Delete':
      case 'Backspace':
        if (this.focusedValues.length > 0) {
          // delete focused values
          this.setSelectedOptions(this.selectedOptionsState.filter((_, index) => !this.focusedValues.includes(index)));
          this.focusedValues = [];
        }
        break;
      case 'ArrowLeft':
        if (this.multiple && this.selectInput.value === '') {
          this.focusOnTagContainer();
        }
        break;
      case 'Escape':
        this.innerOnBlur(ev);
        this.closeDropdown();
        break;
      case 'Tab':
        this.focusedValues = [];
        this.closeDropdown();
        break;
      case 'a':
      case 'A':
        if (((ev.ctrlKey || ev.metaKey) && !this.searchValue) ||
          this.focusedValues.length > 0) {
          (_a = this.tagContainer) === null || _a === void 0 ? void 0 : _a.focus();
          this.focusedValues = this.selectedOptionsState.reduce((arr, option, i) => (!option.disabled && arr.push(i), arr), []);
        }
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
  onSelectedOptionsChange(newValue) {
    this.setSelectedOptions(newValue);
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
    if (this.tagContainer) {
      if (!this.selectedOptionsState[this.value.length - 1].disabled) {
        this.tagArrowKeyCounter = this.value.length - 1;
        this.focusOnTag(this.tagArrowKeyCounter);
      }
    }
  }
  focusOnTag(index) {
    if (!this.selectedOptionsState[index].disabled) {
      this.focusedValues = [index];
      this.tagContainer.focus();
    }
  }
  clearInput() {
    if (!this.multiple && this.value) {
      this.renderInput();
      return;
    }
    this.searchValue = '';
    if (this.selectInput) {
      this.selectInput.value = '';
    }
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
    if (this.selectInput.value.trim()) {
      !this.multiple && this.openDropdown();
    }
    else {
      // Clear selected value in case of single select.
      this.multiple || this.setSelectedValues('');
      this.closeDropdown();
    }
    this.focusedValues = [];
  }
  onClickTag(e, index) {
    e.stopPropagation();
    this.tagContainer.focus();
    if (!this.selectedOptionsState[index].disabled) {
      const focusedIndex = this.focusedValues.indexOf(index);
      if (focusedIndex === -1) {
        if (e.ctrlKey || e.metaKey) {
          // Add indices to focusedValues if ctrl or cmd key is held down
          this.focusedValues = [...this.focusedValues, index];
        }
        else if (e.shiftKey && this.focusedValues.length > 0) {
          // Select range of indices to be focused if shift key is held down
          const startIndex = this.focusedValues[this.focusedValues.length - 1];
          const endIndex = index > startIndex ? index + 1 : index - 1;
          this.focusedValues = uniq([
            ...this.focusedValues,
            ...range(startIndex, endIndex < 0 ? 0 : endIndex),
          ]);
        }
        else {
          // Clicking on a tag without ctrl/cmd/shift key held down should focus a single index
          this.focusedValues = [index];
        }
      }
      else if (e.ctrlKey || e.metaKey) {
        // Remove index from focusedValues if already present and ctrl or cmd key is held down
        this.focusedValues = this.focusedValues.filter((_, index) => index !== focusedIndex);
      }
      else if (!e.shiftKey) {
        // Highlight current index alone if ctrl/cmd/shift key is not held down
        this.focusedValues = [index];
      }
    }
  }
  renderTags() {
    if (this.multiple && Array.isArray(this.value)) {
      return this.selectedOptionsState.map((option, index) => {
        if (this.isValueEqual(this.value, option)) {
          const optionState = option.error || index >= this.maxEmailsAllowed ? 'error' : 'normal';
          return (h("fw-tag", { index: index, isFocused: this.focusedValues.includes(index), class: option.disabled ? 'tag-disabled' : 'tag-default', state: optionState, variant: 'avatar', graphicsProps: option.graphicsProps, text: option.value, disabled: option.disabled, value: option.value, focusable: false, closable: !option.disabled, onClick: (e) => this.onClickTag(e, index), showEllipsisOnOverflow: true }));
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
  renderLabel(value) {
    return (h("span", { class: 'single-select-value' }, value === null || value === void 0 ? void 0 :
      value.text, " <", value === null || value === void 0 ? void 0 :
      value.subText, ">"));
  }
  renderSingleValue(value) {
    var _a;
    if (value) {
      return (h("span", { class: `single-value-tag ${this.readonly ? 'readonly' : ''}` }, h("fw-avatar", { size: 'xsmall', image: (_a = value === null || value === void 0 ? void 0 : value.graphicsProps) === null || _a === void 0 ? void 0 : _a.image }), h("div", { class: 'ellipsis', ref: (el) => (this.singleValueLabel = el) }, this.addTooltip ? (h("fw-tooltip", { trigger: 'hover', content: `${value === null || value === void 0 ? void 0 : value.text} <${value === null || value === void 0 ? void 0 : value.subText}>` }, this.renderLabel(value))) : (this.renderLabel(value)))));
    }
  }
  onClickOutside(e) {
    if (!e.composedPath().includes(this.host) &&
      this.focusedValues.length > 0) {
      this.focusedValues = [];
    }
  }
  componentWillLoad() {
    var _a, _b;
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
    //Get id
    this.hostId = this.host.id || '';
    // Add event listener to track clicks outside the element to blur selected tags
    document.addEventListener('mouseup', this.onClickOutside.bind(this));
  }
  componentDidLoad() {
    this.renderInput();
  }
  disconnectedCallback() {
    this.host.removeEventListener('focus', this.setFocus);
    document.removeEventListener('mouseup', this.onClickOutside.bind(this));
    this.removeResizeObserver();
  }
  expandWatcher(expanded) {
    var _a, _b, _c, _d;
    if (!this.multiple) {
      const icon = (_d = (_c = (_b = (_a = this.host.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.select-container')) === null || _b === void 0 ? void 0 : _b.querySelector('fw-button')) === null || _c === void 0 ? void 0 : _c.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('fw-icon');
      icon && (icon.name = expanded ? 'chevron-up' : 'chevron-down');
    }
  }
  onPaste(e) {
    // Get pasted data via clipboard API
    const clipboardData = (e === null || e === void 0 ? void 0 : e.clipboardData) || window['clipboardData'];
    const pastedData = clipboardData === null || clipboardData === void 0 ? void 0 : clipboardData.getData('Text');
    if (pastedData.includes('\n') || pastedData.includes(',')) {
      // Stop data actually being pasted into input
      e.stopPropagation();
      e.preventDefault();
      // Split strings either by new line or comma
      const emails = pastedData.split(/[\n,]/);
      const emailsToBeInput = [];
      emails.forEach((email) => {
        const sanitisedEmail = email.trim();
        // Check email presence
        if (sanitisedEmail) {
          emailsToBeInput.push({
            text: sanitisedEmail,
            value: sanitisedEmail,
            error: !validateEmail(sanitisedEmail),
          });
        }
      });
      if (emailsToBeInput.length > 0) {
        this.setSelectedOptions([
          ...this.selectedOptionsState,
          ...emailsToBeInput,
        ]);
      }
    }
  }
  render() {
    const { host, name, value } = this;
    renderHiddenField(host, name, value);
    return (h("div", { "aria-disabled": this.disabled, class: {
        'email-select-container': true,
        'has-focus': this.hasFocus,
      } }, h("div", { class: { 'select-container': true }, role: 'combobox', "aria-controls": `${this.hostId}-listbox`, "aria-haspopup": 'listbox', "aria-expanded": this.isExpanded, "aria-owns": `${this.hostId}-listbox` }, h("fw-popover", { id: 'list-items-popover', distance: '8', trigger: 'manual', ref: (popover) => (this.popover = popover), placement: 'bottom', boundary: this.host.parentElement, hoist: true }, h("div", { slot: 'popover-trigger', class: {
        'input-container': this.multiple && !this.readonly,
        'select-disabled': this.disabled,
      }, onClick: () => !this.readonly && this.innerOnClick(), onKeyDown: handleKeyDown(this.innerOnClick, true), role: 'button', tabIndex: -1 }, this.readonly ? (this.renderSingleValue(this.selectedOptionsState[0])) : !this.multiple ? (h("fw-button", { class: 'single-value-button', color: 'text', disabled: this.disabled, "show-caret-icon": true }, this.renderSingleValue(this.selectedOptionsState[0]))) : (h(Fragment, null, h("div", { class: 'input-container-inner' }, this.multiple && (h("div", { class: 'tag-container', onFocus: this.focusOnTagContainer, ref: (tagContainer) => (this.tagContainer = tagContainer), onKeyDown: this.tagContainerKeyDown, role: 'listbox', "aria-multiselectable": 'true', tabIndex: -1 }, this.renderTags())), h("input", { ref: (selectInput) => (this.selectInput = selectInput), class: {
        'multiple-select': this.multiple,
      }, autoComplete: 'off', disabled: this.disabled, name: this.name, id: this.name, placeholder: this.valueExists() ? '' : this.placeholder || '', readOnly: this.readonly, value: '', "aria-autocomplete": 'list', "aria-activedescendant": this.focusedOptionId, onInput: () => this.onInput(), onFocus: (e) => this.innerOnFocus(e), onBlur: (e) => this.innerOnBlur(e), "aria-describedby": `hint-${this.name} error-${this.name}`, onPaste: (e) => this.onPaste(e) })), this.isLoading && h("fw-spinner", { size: 'small' })))), h("fw-list-options", { ref: (fwListOptions) => (this.fwListOptions = fwListOptions), id: `${this.hostId}-listbox`, role: 'listbox', "aria-labelledby": `${this.hostId}-label`, debounceTimer: this.debounceTimer, search: this.search, selectedOptions: this.selectedOptions, variant: 'avatar', "filter-text": this.searchValue, options: this.dataSource, value: this.value, multiple: this.multiple, max: this.max, disabled: this.disabled, allowDeselect: this.allowDeselect, slot: 'popover-content', validateNewOption: (value) => !validateEmail(value), formatCreateLabel: (label) => TranslationController.t('emailSelect.createLabel', {
        label,
      }), isCreatable: true })))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "dataSource": ["optionsChangedHandler"],
    "options": ["onOptionsChange"],
    "selectedOptions": ["onSelectedOptionsChange"],
    "isExpanded": ["expandWatcher"]
  }; }
};
EmailHeaderCustomComponentsSelectField.style = emailSelectCss;

export { EmailHeaderCustomComponentsSelectField as fw_email_select };
