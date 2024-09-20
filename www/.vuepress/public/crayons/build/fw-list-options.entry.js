import { r as registerInstance, h as createEvent, i as h, j as getElement } from './index-44c267ce.js';
import { d as debounce, e as cyclicDecrement, i as cyclicIncrement, j as isEqual } from './index-9b8d850f.js';
import { i as i18n } from './Translation-ce9b2559.js';

const listOptionsCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.container{margin:0px;-webkit-padding-after:8px;padding-block-end:8px;padding-inline:8px;-webkit-padding-before:12px;padding-block-start:12px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.input-search{-webkit-margin-after:4px;margin-block-end:4px}";

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
let ListOptions = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.fwLoading = createEvent(this, "fwLoading", 7);
    this.isInternalValueChange = false;
    this.arrowKeyCounter = 0;
    this.optionRefs = [];
    this.defaultSearchFunction = (text, dataSource) => {
      return new Promise((resolve) => {
        const value = text.toLowerCase();
        const filteredValue = value !== ''
          ? dataSource.filter((option) => option.text.toLowerCase().includes(value.toLowerCase()))
          : dataSource;
        resolve(filteredValue);
      });
    };
    this.filteredOptions = [];
    this.selectOptions = [];
    this.selectedOptionsState = [];
    this.isLoading = false;
    /**
     * Value corresponding to the option, that is saved  when the form data is saved.
     */
    this.options = [];
    /**
     * Value of the option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
     */
    this.value = '';
    /**
     * Works with `multiple` enabled. Configures the maximum number of options that can be selected with a multi-select component.
     */
    this.max = Number.MAX_VALUE;
    /**
     * Enables selection of multiple options. If the attribute’s value is undefined, the value is set to false.
     */
    this.multiple = false;
    /**
     * Enables the input with in the popup for filtering the options.
     */
    this.searchable = false;
    /**
     * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
     */
    this.disabled = false;
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
     * Default option to be shown if the option doesn't match the filterText.
     */
    this.notFoundText = '';
    /**
     * Filter function which takes in filterText and dataSource and return a Promise.
     * Where filter text is the text to filter the value in dataSource array.
     * The returned promise should contain the array of options to be displayed.
     */
    this.search = this.defaultSearchFunction;
    /**
     * Placeholder to placed on the search text box.
     */
    this.searchText = '';
    /**
     * Text to be displayed when there is no data available in the select.
     */
    this.noDataText = '';
    /**
     * Debounce timer for the search promise function.
     */
    this.debounceTimer = 300;
    /**
     * The option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
     */
    this.selectedOptions = [];
    /**
     * Whether clicking on the already selected option disables it.
     */
    this.allowDeselect = true;
    /**
     * Allows user to create the option if the provided input doesn't match with any of the options.
     */
    this.isCreatable = false;
    /**
     * Whether clicking on option selects it.
     */
    this.allowSelect = true;
    this.handleSearchWithDebounce = debounce((filterText) => {
      var _a;
      this.isLoading = true;
      this.fwLoading.emit({ isLoading: this.isLoading });
      const sanitisedText = filterText.trim();
      if (sanitisedText) {
        this.search(sanitisedText, this.selectOptions).then((options) => {
          var _a;
          this.filteredOptions =
            (options === null || options === void 0 ? void 0 : options.length) > 0
              ? this.serializeData(options)
              : !this.isCreatable
                ? [{ text: this.notFoundText, disabled: true }]
                : [];
          if (this.isCreatable &&
            !this.filteredOptions.some((option) => option.value === sanitisedText)) {
            this.filteredOptions = [
              {
                text: typeof this.formatCreateLabel === 'function'
                  ? this.formatCreateLabel(sanitisedText)
                  : sanitisedText,
                value: sanitisedText,
                isNew: true,
                graphicsProps: {
                  name: 'plus-filled',
                  color: '#2C5CC5',
                  width: 16,
                  height: 16,
                },
                variant: 'icon',
                disabled: ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) >= this.max,
              },
              ...this.filteredOptions,
            ];
          }
          this.isLoading = false;
          this.fwLoading.emit({ isLoading: this.isLoading });
        });
      }
      else {
        this.filteredOptions =
          ((_a = this.selectOptions) === null || _a === void 0 ? void 0 : _a.length) > 0
            ? this.selectOptions
            : [{ text: this.noDataText, disabled: true }];
        this.isLoading = false;
        this.fwLoading.emit({ isLoading: this.isLoading });
      }
    }, this, this.debounceTimer);
  }
  fwSelectedHandler(selectedItem) {
    const { value, selected } = selectedItem.detail;
    if (selected) {
      const selectedObj = this.filteredOptions.filter((option) => option.value === value)[0];
      if (this.isCreatable && selectedObj.isNew) {
        selectedObj.text = selectedObj.value;
        if (typeof this.validateNewOption === 'function') {
          selectedObj.error = !this.validateNewOption(selectedObj.value);
        }
        selectedObj.graphicsProps = {};
        selectedObj.variant = 'standard';
      }
      this.selectedOptionsState = this.multiple
        ? [...this.selectedOptionsState, selectedObj]
        : [selectedObj];
    }
    else {
      this.selectedOptionsState = this.multiple
        ? this.selectedOptionsState.filter((option) => option.value !== value)
        : [];
    }
    this.isInternalValueChange = true;
    this.setValue(this.selectedOptionsState);
  }
  onKeyDown(ev) {
    switch (ev.key) {
      case 'ArrowDown':
        // If focus is on the last option, moves focus to the first option.
        // Ref - https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
        this.arrowKeyCounter = cyclicIncrement(this.arrowKeyCounter, this.optionRefs.length - 1);
        this.optionRefs[this.arrowKeyCounter].setFocus();
        ev.preventDefault();
        ev.stopPropagation();
        break;
      case 'ArrowUp':
        // If focus is on the first option, moves focus to the last option.
        // Ref - https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
        this.arrowKeyCounter = cyclicDecrement(this.arrowKeyCounter, this.optionRefs.length - 1);
        this.optionRefs[this.arrowKeyCounter].setFocus();
        ev.preventDefault();
        ev.stopPropagation();
        break;
    }
  }
  async clearFilter() {
    this.filteredOptions = this.selectOptions;
    if (this.searchable) {
      this.searchInput.value = '';
    }
  }
  async scrollToLastSelected() {
    var _a;
    if (this.filteredOptions.length > 0 && this.valueExists()) {
      (_a = this.container
        .querySelector(`fw-select-option[id='${this.host.id}-option-${this.getLastSelectedValue()}']`)) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ block: 'nearest' });
    }
  }
  async getSelectedOptions() {
    return this.selectedOptionsState;
  }
  /**
   * Pass an array of string in case of multi-select or string for single-select.
   */
  async setSelectedValues(values) {
    if (this.options) {
      this.selectedOptionsState = this.options.filter((option) => this.isValueEqual(values, option));
      this.isInternalValueChange = true;
      this.setValue(this.selectedOptionsState);
    }
  }
  async setSelectedOptions(options) {
    this.selectedOptionsState = options;
    this.isInternalValueChange = true;
    this.setValue(options);
  }
  async setFocus() {
    this.optionRefs = [
      ...this.container.getElementsByTagName('fw-select-option'),
    ];
    const lastValue = this.getLastSelectedValue();
    if (lastValue && this.optionRefs.length > 0) {
      const lastValueIndex = this.optionRefs.findIndex((option) => option.value === lastValue);
      this.arrowKeyCounter = lastValueIndex === -1 ? 0 : lastValueIndex;
    }
    this.optionRefs[this.arrowKeyCounter].setFocus();
  }
  onOptionsChange(newValue) {
    this.setDataSource(newValue);
  }
  disabledWatcher() {
    const options = this.options;
    // updating the object to retrigger
    this.options = [...options];
  }
  onValueChange(newValue, oldValue) {
    if (!isEqual(newValue, oldValue)) {
      if (newValue) {
        this.validateValue(newValue);
      }
      else {
        newValue = this.multiple ? [] : '';
      }
      this.selectOptions = this.selectOptions.map((option) => {
        option.selected = this.isValueEqual(newValue, option);
        return option;
      });
      // Warning: Before mutating this.value inside this file set the  isInternalValueChange to true.
      // This is to prevent triggering the below code which is executed whenever there is a change in the prop this.value
      if (!this.isInternalValueChange) {
        // source might change during dynamic select
        const source = this.options.length > 0 ? this.options : this.selectedOptionsState;
        this.selectedOptionsState = source.filter((option) => this.isValueEqual(newValue, option));
      }
      this.fwChange.emit({
        value: newValue,
        meta: { selectedOptions: this.selectedOptionsState },
      });
      this.isInternalValueChange = false;
    }
  }
  onFilterTextChange(newValue) {
    this.handleSearchWithDebounce(newValue);
  }
  valueExists() {
    return this.multiple ? this.value.length > 0 : !!this.value;
  }
  validateValue(value) {
    if (this.multiple && !Array.isArray(value)) {
      throw new Error('Value must be a array for multi-select');
    }
    if (!this.multiple &&
      typeof value !== 'string' &&
      typeof value !== 'number' &&
      typeof value !== 'bigint') {
      throw new Error('Value must be a string or number or bigint for single-select');
    }
  }
  getLastSelectedValue() {
    if (this.valueExists()) {
      return this.multiple ? this.value.slice(-1)[0] : this.value;
    }
  }
  setSelectedOptionsByValue(values) {
    if (this.options) {
      this.selectedOptionsState = this.options.filter((option) => this.isValueEqual(values, option));
    }
    else {
      throw new Error('Options must be passed if value is set');
    }
  }
  serializeData(dataSource) {
    return dataSource.map((option) => {
      var _a, _b;
      const isSelected = this.isValueEqual(this.value, option) || option.selected;
      const isDisabled = ((_a = this.selectedOptionsState.find((selected) => selected.value === option.value)) === null || _a === void 0 ? void 0 : _a.disabled) ||
        option.disabled ||
        this.disabled ||
        (this.multiple && ((_b = this.value) === null || _b === void 0 ? void 0 : _b.length) >= this.max);
      return Object.assign(Object.assign({}, option), {
        checkbox: option.checkbox || this.checkbox,
        variant: option.variant || this.variant,
        selected: isSelected,
        disabled: isDisabled,
        allowDeselect: this.allowDeselect,
      });
    });
  }
  isValueEqual(value, option) {
    return this.multiple
      ? value.includes(option.value)
      : value === option.value;
  }
  setValue(options) {
    if ((options === null || options === void 0 ? void 0 : options.length) > 0) {
      this.value = this.multiple
        ? options.map((option) => option.value)
        : options[0].value;
    }
    else {
      this.value = this.multiple ? [] : '';
    }
  }
  setDataSource(dataSource) {
    if (dataSource.length > 0) {
      this.selectOptions = this.serializeData(dataSource);
    }
    else {
      this.selectOptions = [{ text: this.noDataText, disabled: true }];
    }
    this.filteredOptions = this.selectOptions;
  }
  renderSelectOptions(options) {
    return options.map((option) => {
      var _a;
      const isDisabled = ((_a = this.selectedOptionsState.find((selected) => selected.value === option.value)) === null || _a === void 0 ? void 0 : _a.disabled) ||
        option.disabled ||
        (!this.allowDeselect && option.selected);
      return (h("fw-select-option", Object.assign({ id: `${this.host.id}-option-${option.value}`, key: option.value, allowSelect: this.allowSelect }, option, { disabled: isDisabled })));
    });
  }
  renderSearchInput() {
    return (h("fw-input", { class: 'input-search', ref: (searchInput) => (this.searchInput = searchInput), placeholder: this.searchText, onInput: () => this.handleSearchWithDebounce(this.searchInput.value) }));
  }
  componentWillLoad() {
    this.validateValue(this.value);
    if (this.selectedOptions.length > 0) {
      this.selectedOptionsState = this.selectedOptions;
      this.value = this.multiple
        ? this.selectedOptionsState.map((option) => option.value)
        : this.selectedOptionsState[0].value;
    }
    else if (this.valueExists()) {
      this.setSelectedOptionsByValue(this.value);
    }
    else {
      this.setValue([]);
    }
    if (this.multiple && typeof this.value === 'string') {
      throw Error('value must be a array of string when multiple is true');
    }
    this.setDataSource(this.options);
  }
  render() {
    return (h("div", { class: 'container', ref: (container) => {
        this.container = container;
      } }, this.searchable && this.renderSearchInput(), this.renderSelectOptions(this.filteredOptions)));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "options": ["onOptionsChange"],
    "disabled": ["disabledWatcher"],
    "value": ["onValueChange"],
    "filterText": ["onFilterTextChange"]
  }; }
};
__decorate([
  i18n({ keyName: 'search.noItemsFound' })
], ListOptions.prototype, "notFoundText", void 0);
__decorate([
  i18n({ keyName: 'search.search' })
], ListOptions.prototype, "searchText", void 0);
__decorate([
  i18n({ keyName: 'search.noDataAvailable' })
], ListOptions.prototype, "noDataText", void 0);
ListOptions.style = listOptionsCss;

export { ListOptions as fw_list_options };
