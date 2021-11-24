/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  Component,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
  EventEmitter,
  Event,
} from '@stencil/core';
import { debounce } from '../../utils';
import { DropdownVariant } from '../../utils/types';

@Component({
  tag: 'fw-list-options',
  styleUrl: 'list-options.scss',
  shadow: true,
})
export class ListOptions {
  private searchInput?: HTMLFwInputElement;
  private isInternalValueChange = false;

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
  @Prop({ reflect: true, mutable: true }) value = [];
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
  @Prop() isCheckbox = false;
  /**
   * Default option to be shown if the option doesn't match the filterText.
   */
  @Prop() notFoundText = 'No items Found';
  /**
   * Filter function which takes in filterText and dataSource and return a Promise.
   * Where filter text is the text to filter the value in dataSource array.
   * The returned promise should contain the array of options to be displayed.
   */
  @Prop() search = this.defaultSearchFunction;
  /**
   * Placeholder to placed on the search text box.
   */
  @Prop() searchText = 'Search...';
  /**
   * Text to be displayed when there is no data available in the select.
   */
  @Prop() noDataText = 'No Data available';
  /**
   * Debounce timer for the search promise function.
   */
  @Prop() debounceTimer = 300;
  /**
   * The option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
   */
  @Prop() selectedOptions = [];
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
    this.value = this.selectedOptionsState.map((options) => options.value);
  }

  @Method()
  async clearFilter() {
    this.filteredOptions = this.selectOptions;
    if (this.searchable) {
      this.searchInput.value = '';
    }
  }

  @Method()
  async getSelectedOptions(): Promise<any> {
    return this.selectedOptionsState;
  }

  @Method()
  async setSelectedValues(values: string[]): Promise<any> {
    if (this.options) {
      this.selectedOptionsState = this.options.filter((option) =>
        values.includes(option.value)
      );
      this.isInternalValueChange = true;
      this.value = values;
    }
  }

  @Method()
  async setSelectedOptions(options: any[]): Promise<any> {
    this.selectedOptionsState = options;
    this.isInternalValueChange = true;
    this.value = options.map((option) => option.value);
  }

  @Watch('options')
  onOptionsChange(newValue) {
    this.setDataSource(newValue);
  }

  @Watch('value')
  onValueChange(newValue, oldValue) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this.selectOptions = this.selectOptions.map((option) => {
        option.selected = newValue.includes(option.value);
        return option;
      });
      // Warning: Before mutating this.value inside this file set the  isInternalValueChange to true.
      // This is to prevent triggering the below code which is executed whenever there is a change in the prop this.value
      if (!this.isInternalValueChange) {
        if (this.options.length > 0) {
          this.selectedOptionsState = this.options.filter((option) =>
            newValue.includes(option.value)
          );
        } else {
          // This usually occurs during dynamic select
          this.selectedOptionsState = this.selectedOptionsState.filter(
            (option) => newValue.includes(option.value)
          );
        }
      }
      this.fwChange.emit({
        value: newValue,
        selectedOptions: this.selectedOptionsState,
      });
      this.isInternalValueChange = false;
    }
  }

  @Watch('filterText')
  onFilterTextChange(newValue) {
    this.handleSearchWithDebounce(newValue);
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

  setSelectedOptionsByValue(values) {
    if (this.options) {
      this.selectedOptionsState = this.options.filter((option) =>
        values.includes(option.value)
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
          isCheckbox: option.isCheckbox || this.isCheckbox,
          variant: option.variant || this.variant,
          selected: option.selected || this.value.includes(option.value),
          disabled: option.disabled || this.value?.length >= this.max,
        },
      };
    });
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
      <fw-select-option key={option.value} {...option}></fw-select-option>
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
    if (this.selectedOptions.length > 0) {
      this.selectedOptionsState = this.selectedOptions;
      this.value = this.selectedOptionsState.map((option) => option.value);
    } else if (this.value.length > 0) {
      this.setSelectedOptionsByValue(this.value);
    }
    this.setDataSource(this.options);
  }

  render() {
    return (
      <div class='container'>
        {this.searchable && this.renderSearchInput()}
        {this.renderSelectOptions(this.filteredOptions)}
      </div>
    );
  }
}
