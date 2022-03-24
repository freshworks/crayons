import { SelectOption } from '../components/select-option/select-option';

export class SelectUtil {
  multiple: boolean;
  disabled: boolean;
  value: any;
  options = [];
  selectedOptions = [];
  constructor(
    data: SelectOption[],
    selectedOptions: SelectOption[],
    value: any,
    options: any
  ) {
    this.options = data;
    this.multiple = options.multiple;
    this.disabled = options.disabled;
    this.value = value || this.getEmptyValue();
    this.selectedOptions = selectedOptions;
    if (selectedOptions.length > 0) {
      this.setValueBySelectedOptions();
    } else {
      this.setSelectedOptionByValue();
    }
  }

  onOptionsChange(selectOptions, value, selected) {
    if (selected) {
      const selectedObj = selectOptions.filter(
        (option) => option.value === value
      )[0];
      this.selectedOptions = this.multiple
        ? [...this.selectedOptions, selectedObj]
        : [selectedObj];
    } else {
      this.selectedOptions = this.multiple
        ? this.selectedOptions.filter((option) => option.value !== value)
        : [];
    }
    this.setValueBySelectedOptions();
    return { value: this.value, selectedOptions: this.selectedOptions };
  }

  getEmptyValue() {
    this.multiple ? [] : '';
  }

  setOptions(selectOptions) {
    this.options = selectOptions.map((option) => {
      return {
        html: option.html,
        text: option.html ? option.optionText : option.textContent,
        value: option.value,
        selected: this.isValueEqual(this.value, option) || option.selected,
        disabled: option.disabled || this.disabled, // Check if option is disabled or select is disabled
        htmlContent: option.html ? option.innerHTML : '',
      };
    });
    this.selectedOptions = this.options.filter((option) => option.selected);
  }

  setSelectedOptions(selectedOptions) {
    this.selectedOptions = selectedOptions;
  }

  setSelectedOptionByValue(value?, selectOptions?) {
    value ||= this.value;
    selectOptions ||= this.options;
    this.selectedOptions =
      selectOptions.length > 0
        ? selectOptions.filter((option) => this.isValueEqual(value, option))
        : [];
    return this.selectedOptions;
  }

  setValueBySelectedOptions() {
    this.value = this.multiple
      ? this.selectedOptions.map((option) => option.value)
      : this.selectedOptions[0]?.value;
    return this.value;
  }

  isValueEqual(value, option) {
    return this.multiple
      ? value.includes(option.value)
      : value === option.value;
  }

  getLastSelectedValue() {
    if (this.isValidValue(this.value)) {
      return this.multiple ? this.value.slice(-1)[0] : this.value;
    }
  }

  isValidValue(value): boolean {
    if (typeof value !== 'number') {
      return value && (this.multiple ? this.value.length > 0 : !!this.value);
    } else {
      return true;
    }
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
}
