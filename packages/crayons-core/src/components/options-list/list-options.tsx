/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import {
  Component,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

@Component({
  tag: 'fw-list-options',
  styleUrl: 'list-options.scss',
  shadow: true,
})
export class ListOptions {
  private searchInput: HTMLFwInputElement;

  @State() filteredOptions = [];
  @State() selectOptions = [];
  /**
   * Value corresponding to the option, that is saved  when the form data is saved.
   */
  @Prop() options = [];
  /**
   * Value of the option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
   */
  @Prop({ mutable: true }) value: any;
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
   * Enables the input with in the popup for filtering the options.
   */
  @Prop() variant: 'standard' | 'checked' = 'standard';
  /**
   * The text to filter the options.
   */
  @Prop() filterText;

  @Listen('fwSelected')
  fwSelectedHandler(selectedItem) {
    const { value, selected } = selectedItem.detail;
    this.selectOptions = this.selectOptions.map((option) => {
      if (value === option.value) {
        option.selected = selected;
      } else if (!this.multiple) {
        option.selected = false;
      }
      return option;
    });
    if (selected) {
      this.value = this.multiple ? this.value.push(value) : value;
    } else {
      this.value = this.multiple ? this.value.pop(value) : '';
    }
  }

  @Method()
  async getSelectedItem(): Promise<any> {
    return this.selectOptions.filter((option) => option.selected);
  }

  @Method()
  async setSelectedValues(values: string[]): Promise<any> {
    if (this.multiple) {
      this.selectOptions.forEach((option) => {
        option.selected = values.includes(option.value);
      });
    }
  }

  @Watch('filterText')
  filterOptions(filterText) {
    const value = filterText.toLowerCase();
    this.filteredOptions =
      value !== ''
        ? this.selectOptions.filter((option) =>
            option.text.toLowerCase().includes(value)
          )
        : this.selectOptions;
    if (this.filteredOptions.length === 0) {
      this.filteredOptions = [{ text: 'No items Found' }];
    }
  }

  renderSelectOption(options: Array<any>) {
    return options.map((option) => (
      <fw-select-option
        key={option.value}
        {...{
          ...option,
          ...{
            selected: option.selected || this.value?.includes(option.value),
            disabled: option.disabled || this.value?.length >= this.max,
          },
        }}
      ></fw-select-option>
    ));
  }

  renderSearchInput() {
    return (
      <li>
        <fw-input
          ref={(searchInput) => (this.searchInput = searchInput)}
          placeholder='Search...'
          onInput={() => this.onInput()}
        ></fw-input>
      </li>
    );
  }

  onInput() {
    this.filterOptions(this.searchInput.value);
  }

  componentWillLoad() {
    this.selectOptions = this.options;
    this.filteredOptions = this.selectOptions;
    console.log(this.options);
  }

  render() {
    return (
      <ul>
        {this.searchable && this.renderSearchInput()}
        {this.renderSelectOption(this.filteredOptions)}
      </ul>
    );
  }
}
