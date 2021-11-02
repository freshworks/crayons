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
   * Triggered when a value is selected or deselected from the list box options.
   */
  @Event() fwListOptionsChange: EventEmitter;

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
  async getSelectedItem(): Promise<any> {
    return this.selectOptions.filter((option) => option.selected);
  }

  @Method()
  async setSelectedValues(values: string[]): Promise<any> {
    if (this.multiple) {
      this.value = values;
    }
  }

  @Watch('value')
  onValueChange(newValue, oldValue) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this.selectOptions = this.selectOptions.map((option) => {
        option.selected = newValue.includes(option.value);
        return option;
      });
      this.fwListOptionsChange.emit(newValue);
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
      <fw-select-option key={option.value} {...option}></fw-select-option>
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
    this.selectOptions = this.options.map((option) => {
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

  render() {
    return (
      <ul>
        {this.searchable && this.renderSearchInput()}
        {this.renderSelectOption(this.filteredOptions)}
      </ul>
    );
  }
}
