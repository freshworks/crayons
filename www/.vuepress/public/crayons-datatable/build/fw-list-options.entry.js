import { r as registerInstance, f as createEvent, h } from './index-4996832f.js';

const listOptionsCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.container{margin:0px;padding:12px 8px 8px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}";

let ListOptions = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.filteredOptions = [];
    this.selectOptions = [];
    /**
     * Value corresponding to the option, that is saved  when the form data is saved.
     */
    this.options = [];
    /**
     * Value of the option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
     */
    this.value = [];
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
     * Standard is the default option without any graphics other options are icon and avatar which places either the icon or avatar at the beginning of the row.
     * The props for the icon or avatar are passed as an object via the graphicsProps.
     */
    this.variant = 'standard';
    /**
     * Place a checkbox.
     */
    this.isCheckbox = false;
    /**
     * Default option to be shown if the option doesn't match the filterText.
     */
    this.notFoundText = 'No items Found';
    /**
     * Placeholder to placed on the search text box.
     */
    this.searchText = 'Search...';
  }
  fwSelectedHandler(selectedItem) {
    const { value, selected } = selectedItem.detail;
    if (selected) {
      this.value = this.multiple ? [...this.value, value] : [value];
    }
    else {
      this.value = this.multiple ? this.value.filter((x) => x !== value) : [];
    }
  }
  async getSelectedOptions() {
    return this.selectOptions.filter((option) => option.selected);
  }
  async setSelectedValues(values) {
    if (this.multiple) {
      this.value = values;
    }
  }
  onValueChange(newValue, oldValue) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this.selectOptions = this.selectOptions.map((option) => {
        option.selected = newValue.includes(option.value);
        return option;
      });
      this.fwChange.emit({ value: newValue });
    }
  }
  filterOptions(filterText) {
    const value = filterText.toLowerCase();
    this.filteredOptions =
      value !== ''
        ? this.selectOptions.filter((option) => option.text.toLowerCase().includes(value))
        : this.selectOptions;
    if (this.filteredOptions.length === 0) {
      this.filteredOptions = [{ text: this.notFoundText }];
    }
  }
  renderSelectOptions(options) {
    return options.map((option) => (h("fw-select-option", Object.assign({ key: option.value }, option))));
  }
  renderSearchInput() {
    return (h("fw-input", { ref: (searchInput) => (this.searchInput = searchInput), placeholder: this.searchText, onInput: () => this.onInput() }));
  }
  onInput() {
    this.filterOptions(this.searchInput.value);
  }
  componentWillLoad() {
    this.selectOptions = this.options.map((option) => {
      var _a;
      return Object.assign(Object.assign({}, option), {
        isCheckbox: option.isCheckbox || this.isCheckbox,
        variant: option.variant || this.variant,
        selected: option.selected || this.value.includes(option.value),
        disabled: option.disabled || ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) >= this.max,
      });
    });
    this.filteredOptions = this.selectOptions;
  }
  render() {
    return (h("div", { class: 'container' }, this.searchable && this.renderSearchInput(), this.renderSelectOptions(this.filteredOptions)));
  }
  static get watchers() { return {
    "value": ["onValueChange"],
    "filterText": ["filterOptions"]
  }; }
};
ListOptions.style = listOptionsCss;

export { ListOptions as fw_list_options };
