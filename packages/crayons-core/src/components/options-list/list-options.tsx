/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  Component,
  Element,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
  EventEmitter,
  Event,
} from '@stencil/core';
import { cyclicDecrement, cyclicIncrement, debounce } from '../../utils';
import { DropdownVariant } from '../../utils/types';
import { i18n } from '../../global/Translation';
@Component({
  tag: 'fw-list-options',
  styleUrl: 'list-options.scss',
  shadow: true,
})
export class ListOptions {
  @Element() host: HTMLElement;
  private searchInput?: HTMLFwInputElement;
  private isInternalValueChange = false;
  private arrowKeyCounter = 0;
  private container: HTMLElement;
  private optionRefs = [];
  private defaultSearchFunction = (
    text: string,
    dataSource: any[]
  ): Promise<any[]> => {
    return new Promise((resolve) => {
      const value = text.toLowerCase();
      const filteredValue =
        value !== ''
          ? dataSource.filter((option) =>
              option.text.toLowerCase().includes(value)
            )
          : dataSource;
      resolve(filteredValue);
    });
  };

  @State() filteredOptions = [];
  @State() selectOptions = [];
  @State() selectedOptionsState = [];
  @State() isLoading = false;

  /**
   * Value corresponding to the option, that is saved  when the form data is saved.
   */
  @Prop() options = [];
  /**
   * Value of the option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
   */
  @Prop({ mutable: true }) value: any = '';
  /**
   * Works with `multiple` enabled. Configures the maximum number of options that can be selected with a multi-select component.
   */
  @Prop() max = Number.MAX_VALUE;
  /**
   * Enables selection of multiple options. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() multiple = false;
  /**
   * Enables the input with in the popup for filtering the options.
   */
  @Prop() searchable = false;
  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() disabled = false;

  /**
   * Standard is the default option without any graphics other options are icon and avatar which places either the icon or avatar at the beginning of the row.
   * The props for the icon or avatar are passed as an object via the graphicsProps.
   */
  @Prop() variant: DropdownVariant = 'standard';
  /**
   * The text to filter the options.
   */
  @Prop() filterText;
  /**
   * Place a checkbox.
   */
  @Prop() checkbox = false;
  /**
   * Default option to be shown if the option doesn't match the filterText.
   */
  @i18n({ keyName: 'search.noItemsFound' })
  @Prop({ mutable: true })
  notFoundText = '';
  /**
   * Filter function which takes in filterText and dataSource and return a Promise.
   * Where filter text is the text to filter the value in dataSource array.
   * The returned promise should contain the array of options to be displayed.
   */
  @Prop() search = this.defaultSearchFunction;
  /**
   * Placeholder to placed on the search text box.
   */
  @i18n({ keyName: 'search.search' })
  @Prop({ mutable: true })
  searchText = '';

  /**
   * Text to be displayed when there is no data available in the select.
   */
  @i18n({ keyName: 'search.noDataAvailable' })
  @Prop({ mutable: true })
  noDataText = '';
  /**
   * Debounce timer for the search promise function.
   */
  @Prop() debounceTimer = 300;
  /**
   * The option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
   */
  @Prop() selectedOptions = [];
  /**
   * Whether clicking on the already selected option disables it.
   */
  @Prop() allowDeselect = true;
  /**
   * Triggered when a value is selected or deselected from the list box options.
   */
  @Event({ cancelable: true }) fwChange: EventEmitter;
  /**
   * Triggered when the options list is in loading state processing the search function.
   */
  @Event({ cancelable: true }) fwLoading: EventEmitter;

  @Listen('fwSelected')
  fwSelectedHandler(selectedItem) {
    const { value, selected } = selectedItem.detail;
    if (selected) {
      const selectedObj = this.filteredOptions.filter(
        (option) => option.value === value
      )[0];
      this.selectedOptionsState = this.multiple
        ? [...this.selectedOptionsState, selectedObj]
        : [selectedObj];
    } else {
      this.selectedOptionsState = this.multiple
        ? this.selectedOptionsState.filter((option) => option.value !== value)
        : [];
    }
    this.isInternalValueChange = true;
    this.setValue(this.selectedOptionsState);
  }

  @Listen('keydown')
  onKeyDown(ev) {
    switch (ev.key) {
      case 'ArrowDown':
        // If focus is on the last option, moves focus to the first option.
        // Ref - https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
        this.arrowKeyCounter = cyclicIncrement(
          this.arrowKeyCounter,
          this.optionRefs.length - 1
        );
        this.optionRefs[this.arrowKeyCounter].setFocus();
        ev.preventDefault();
        ev.stopPropagation();
        break;
      case 'ArrowUp':
        // If focus is on the first option, moves focus to the last option.
        // Ref - https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
        this.arrowKeyCounter = cyclicDecrement(
          this.arrowKeyCounter,
          this.optionRefs.length - 1
        );
        this.optionRefs[this.arrowKeyCounter].setFocus();
        ev.preventDefault();
        ev.stopPropagation();
        break;
    }
  }

  @Method()
  async clearFilter() {
    this.filteredOptions = this.selectOptions;
    if (this.searchable) {
      this.searchInput.value = '';
    }
  }

  @Method()
  async scrollToLastSelected() {
    if (this.filteredOptions.length > 0 && this.valueExists()) {
      this.container
        .querySelector(
          `fw-select-option[id='${
            this.host.id
          }-option-${this.getLastSelectedValue()}']`
        )
        ?.scrollIntoView({ block: 'nearest' });
    }
  }

  @Method()
  async getSelectedOptions(): Promise<any> {
    return this.selectedOptionsState;
  }
  /**
   * Pass an array of string in case of multi-select or string for single-select.
   */
  @Method()
  async setSelectedValues(values: any): Promise<any> {
    if (this.options) {
      this.selectedOptionsState = this.options.filter((option) =>
        this.isValueEqual(values, option)
      );
      this.isInternalValueChange = true;
      this.setValue(this.selectedOptionsState);
    }
  }

  @Method()
  async setSelectedOptions(options: any[]): Promise<any> {
    this.selectedOptionsState = options;
    this.isInternalValueChange = true;
    this.setValue(options);
  }

  @Method()
  async setFocus(): Promise<any> {
    this.optionRefs = [
      ...this.container.getElementsByTagName('fw-select-option'),
    ];
    const lastValue = this.getLastSelectedValue();
    if (lastValue && this.optionRefs.length > 0) {
      const lastValueIndex = this.optionRefs.findIndex(
        (option) => option.value === lastValue
      );
      this.arrowKeyCounter = lastValueIndex === -1 ? 0 : lastValueIndex;
    }
    this.optionRefs[this.arrowKeyCounter].setFocus();
  }

  @Watch('options')
  onOptionsChange(newValue) {
    this.setDataSource(newValue);
  }

  @Watch('disabled')
  disabledWatcher(): void {
    const options = this.options;
    // updating the object to retrigger
    this.options = [...options];
  }

  @Watch('value')
  onValueChange(newValue, oldValue) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      if (newValue) {
        this.validateValue(newValue);
      } else {
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
        const source =
          this.options.length > 0 ? this.options : this.selectedOptionsState;
        this.selectedOptionsState = source.filter((option) =>
          this.isValueEqual(newValue, option)
        );
      }
      this.fwChange.emit({
        value: newValue,
        meta: { selectedOptions: this.selectedOptionsState },
      });
      this.isInternalValueChange = false;
    }
  }

  @Watch('filterText')
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
    if (
      !this.multiple &&
      typeof value !== 'string' &&
      typeof value !== 'number'
    ) {
      throw new Error('Value must be a string for single-select');
    }
  }

  handleSearchWithDebounce = debounce(
    (filterText) => {
      this.isLoading = true;
      this.fwLoading.emit({ isLoading: this.isLoading });
      this.search(filterText, this.selectOptions).then((options) => {
        this.filteredOptions =
          options?.length > 0
            ? this.serializeData(options)
            : [{ text: this.notFoundText, disabled: true }];

        this.isLoading = false;
        this.fwLoading.emit({ isLoading: this.isLoading });
      });
    },
    this,
    this.debounceTimer
  );

  getLastSelectedValue() {
    if (this.valueExists()) {
      return this.multiple ? this.value.slice(-1)[0] : this.value;
    }
  }

  setSelectedOptionsByValue(values) {
    if (this.options) {
      this.selectedOptionsState = this.options.filter((option) =>
        this.isValueEqual(values, option)
      );
    } else {
      throw new Error('Options must be passed if value is set');
    }
  }

  serializeData(dataSource) {
    return dataSource.map((option) => {
      return {
        ...option,
        ...{
          checkbox: option.checkbox || this.checkbox,
          variant: option.variant || this.variant,
          selected: this.isValueEqual(this.value, option) || option.selected,
          disabled:
            option.disabled ||
            this.disabled ||
            (this.multiple && this.value?.length >= this.max),
          allowDeselect: this.allowDeselect,
        },
      };
    });
  }

  isValueEqual(value, option) {
    return this.multiple
      ? value.includes(option.value)
      : value === option.value;
  }

  setValue(options) {
    if (options?.length > 0) {
      this.value = this.multiple
        ? options.map((option) => option.value)
        : options[0].value;
    } else {
      this.value = this.multiple ? [] : '';
    }
  }

  setDataSource(dataSource) {
    if (dataSource.length > 0) {
      this.selectOptions = this.serializeData(dataSource);
    } else {
      this.selectOptions = [{ text: this.noDataText, disabled: true }];
    }
    this.filteredOptions = this.selectOptions;
  }

  renderSelectOptions(options: Array<any>) {
    return options.map((option) => (
      <fw-select-option
        id={`${this.host.id}-option-${option.value}`}
        key={option.value}
        {...option}
      ></fw-select-option>
    ));
  }

  renderSearchInput() {
    return (
      <fw-input
        ref={(searchInput) => (this.searchInput = searchInput)}
        placeholder={this.searchText}
        onInput={() => this.handleSearchWithDebounce(this.searchInput.value)}
      ></fw-input>
    );
  }

  componentWillLoad() {
    this.validateValue(this.value);
    if (this.selectedOptions.length > 0) {
      this.selectedOptionsState = this.selectedOptions;
      this.value = this.multiple
        ? this.selectedOptionsState.map((option) => option.value)
        : this.selectedOptionsState[0].value;
    } else if (this.valueExists()) {
      this.setSelectedOptionsByValue(this.value);
    } else {
      this.setValue([]);
    }
    if (this.multiple && typeof this.value === 'string') {
      throw Error('value must be a array of string when multiple is true');
    }
    this.setDataSource(this.options);
  }

  render() {
    return (
      <div
        class='container'
        ref={(container) => {
          this.container = container;
        }}
      >
        {this.searchable && this.renderSearchInput()}
        {this.renderSelectOptions(this.filteredOptions)}
      </div>
    );
  }
}
