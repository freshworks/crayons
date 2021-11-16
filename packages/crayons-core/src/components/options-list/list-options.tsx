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
import { DropdownVariant } from '../select-option/select-option';
import { i18n } from '../../global/Translation';

@Component({
  tag: 'fw-list-options',
  styleUrl: 'list-options.scss',
  shadow: true,
})
export class ListOptions {
  private searchInput?: HTMLFwInputElement;

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
      resolve(
        filteredValue.length === 0
          ? [{ text: this.notFoundText, disabled: true }]
          : filteredValue
      );
    });
  };

  @State() filteredOptions = [];
  @State() selectOptions = [];
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
  @i18n({ defaultValue: 'No items Found' })
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
  @i18n({ defaultValue: 'Search' })
  @Prop({ mutable: true })
  searchText = '';

  /**
   * Triggered when a value is selected or deselected from the list box options.
   */
  @Event() fwChange: EventEmitter;

  @Listen('fwSelected')
  fwSelectedHandler(selectedItem) {
    const { value, selected } = selectedItem.detail;
    if (selected) {
      this.value = this.multiple ? [...this.value, value] : [value];
    } else {
      this.value = this.multiple ? this.value.filter((x) => x !== value) : [];
    }
  }

  @Method()
  async clearFilter() {
    if (this.searchable) {
      this.filteredOptions = this.selectOptions;
      this.searchInput.value = '';
    }
  }

  @Method()
  async getSelectedOptions(): Promise<any> {
    return this.selectOptions.filter((option) => option.selected);
  }

  @Method()
  async setSelectedValues(values: string[]): Promise<any> {
    if (this.multiple) {
      this.value = values;
    }
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
      this.fwChange.emit({ value: newValue });
    }
  }

  @Watch('filterText')
  filterOptions(filterText) {
    this.search(filterText, this.selectOptions).then((options) => {
      this.filteredOptions = options;
    });
  }

  setDataSource(dataSource) {
    this.selectOptions = dataSource.map((option) => {
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
        onInput={() => this.onInput()}
      ></fw-input>
    );
  }

  onInput() {
    this.filterOptions(this.searchInput.value);
  }

  componentWillLoad() {
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
