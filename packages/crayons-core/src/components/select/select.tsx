/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

import { handleKeyDown, renderHiddenField, debounce } from '../../utils';
import { DropdownVariant } from '../select-option/select-option';
import { fetchTranslations } from '../../global/Translation';
@Component({
  tag: 'fw-select',
  styleUrl: 'select.scss',
  shadow: true,
})
export class Select {
  @Element() host: HTMLElement;
  private selectInput?: HTMLInputElement;
  private fwListOptions?: HTMLFwListOptionsElement;
  private popover?: HTMLFwPopoverElement;
  private preventDropdownClose?: boolean = false;
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

  /**
   * If the dropdown is shown or not
   */
  @State() isExpanded = false;
  @State() hasFocus = false;
  @State() didInit = false;
  @State() dataSource;
  @State() filteredOptions;
  @State() isLoading = false;
  /**
   * Label displayed on the interface, for the component.
   */
  @Prop() label = '';
  /**
   * Value of the option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
   */
  @Prop({ reflect: true, mutable: true }) value: any;
  /**
   * Name of the component, saved as part of form data.
   */
  @Prop() name = '';
  /**
   * Type of option accepted as the input value. If a user tries to enter an option other than the specified type, the list is not populated.
   */
  @Prop() type: 'text' | 'number' = 'text';
  /**
   * Text displayed in the list box before an option is selected.
   */
  @Prop() placeholder?: string | null;
  /**
   * Theme based on which the list box is styled.
   */
  @Prop() state: 'normal' | 'warning' | 'error' = 'normal';
  /**
   * Descriptive or instructional text displayed below the list box.
   */
  @Prop() stateText = '';
  /**
   * If true, the user cannot modify the default value selected. If the attribute's value is undefined, the value is set to true.
   */
  @Prop() readonly = false;
  /**
   * Specifies the select field as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() required = false;
  /**
   * If true, the user must select a value. The default value is not displayed.
   */
  @Prop() forceSelect = true;
  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() disabled = false;
  /**
   * Enables selection of multiple options. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() multiple = false;
  /**
   * Works with `multiple` enabled. Configures the maximum number of options that can be selected with a multi-select component.
   */
  @Prop() max = Number.MAX_VALUE;
  /**
   * Standard is the default option without any graphics other options are icon and avatar which places either the icon or avatar at the beginning of the row.
   * The props for the icon or avatar are passed as an object via the graphicsProps.
   */
  @Prop() variant: DropdownVariant = 'standard';
  /**
   * Allow to search for value. Default is true.
   */
  @Prop() searchable = true;
  /**
   * Allow to search for value. Default is true.
   */
  @Prop({ reflect: true }) options: any;
  /**
   * Place a checkbox.
   */
  @Prop() isCheckbox = false;
  /**
   * Default option to be shown if the option doesn't match the filterText.
   */
  @Prop({ mutable: true }) notFoundText = '';
  /**
   * Filter function which takes in filterText and dataSource and return a Promise.
   * Where filter text is the text to filter the value in dataSource array.
   * The returned promise should contain the array of options to be displayed.
   */
  @Prop() search = this.defaultSearchFunction;
  /**
   * Text to be displayed when there is no data available in the select.
   */
  @Prop({ mutable: true }) noDataText = '';
  /**
   * Debounce timer for the search promise function.
   */
  @Prop() debounceTimer = 300;
  /**
   * Array of the options that is displayed as the default selection, in the list box. Must be a valid option corresponding to the fw-select-option components used in Select.
   */
  @Prop({ reflect: true, mutable: true }) selectedOptions = [];

  /**
   * private
   * store i18n strings
   */
  strings: any;

  // Events
  /**
   * Triggered when a value is selected or deselected from the list box options.
   */
  @Event() fwChange: EventEmitter;
  /**
   * Triggered when the list box comes into focus.
   */
  @Event() fwFocus: EventEmitter;
  /**
   * Triggered when the list box loses focus.
   */
  @Event() fwBlur: EventEmitter;

  private changeEmittable = () => !this.disabled;

  private closeDropdown = () => {
    this.filteredOptions = this.dataSource;
    this.popover.hide();
    this.isExpanded = false;
  };

  private innerOnFocus = (e: Event) => {
    if (this.changeEmittable()) {
      this.hasFocus = true;
      this.fwFocus.emit(e);
    }
  };

  private innerOnClick = () => {
    if (this.changeEmittable()) {
      this.searchable && this.selectInput && this.selectInput.select();
      this.popover.show();
      this.isExpanded = true;
    }
  };

  private innerOnBlur = (e: Event) => {
    if (this.changeEmittable()) {
      // Remove the user typed value after user focus-out of input component
      if (this.multiple) {
        this.selectInput.value = '';
      } else {
        this.renderInput();
      }
      !this.preventDropdownClose && this.closeDropdown();
      this.hasFocus = false;
      this.fwBlur.emit(e);
    }
  };

  // @Watch('value')
  // keyChanged(newValue, oldValue) {
  //   if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
  //     if (this.didInit) {
  //       this.fwChange.emit({
  //         value: this.value,
  //       });
  //     }
  //   }
  // }

  @Listen('fwChange')
  fwSelectedHandler(selectedItem) {
    if (selectedItem.composedPath()[0].tagName === 'FW-LIST-OPTIONS') {
      // Before setting the selectedOptions check whether the already selected value
      // is there in filtered value. If it's not there then that value could't be deselected.
      // So retain that value in selectedOptions.
      let nonFilteredSelectedOptions = [];
      if (this.multiple) {
        const filteredValues = this.filteredOptions.map(
          (option) => option.value
        );
        const nonFilteredSelectedValues = this.value.filter((value) => {
          return !filteredValues.includes(value);
        });
        nonFilteredSelectedOptions = this.selectedOptions.filter((option) => {
          return nonFilteredSelectedValues.includes(option.value);
        });
      }
      this.value = selectedItem.detail.value;
      this.getSelectedItem().then((selectedOptions) => {
        this.selectedOptions =
          nonFilteredSelectedOptions.length > 0
            ? [...nonFilteredSelectedOptions, ...selectedOptions]
            : selectedOptions;
        this.fwChange.emit({
          value: this.value,
          selectedOptions: this.selectedOptions,
        });
        this.renderInput();
        if (!this.multiple) {
          this.resetFocus();
          this.closeDropdown();
        }
      });
      selectedItem.stopPropagation();
    }
  }

  @Watch('dataSource')
  optionsChangedHandler() {
    this.didInit && this.renderInput();
  }

  // Listen to Tag close in case of multi-select
  @Listen('fwClosed')
  fwCloseHandler(ev) {
    this.value = this.value.filter((value) => value !== ev.detail.value);
    this.setSelectedOptions();
  }
  @Listen('keydown')
  onKeyDonw(ev) {
    switch (ev.key) {
      case 'ArrowDown':
        this.innerOnClick();
        break;
      case 'Escape':
        this.innerOnBlur(ev);
        break;
    }
  }

  getDatasource() {
    return this.options
      ? this.options
      : [{ text: this.noDataText, disabled: true }];
  }

  handleSearchWithDebounce = debounce(
    () => {
      const searchValue = this.selectInput.value.toLowerCase();
      this.isLoading = true;
      this.search(searchValue, this.dataSource).then((filteredValues) => {
        this.filteredOptions =
          filteredValues.length === 0
            ? [{ text: this.notFoundText, disabled: true }]
            : filteredValues;
        this.isLoading = false;
      });
    },
    this,
    this.debounceTimer
  );

  renderTags(selectedOptions) {
    if (this.multiple) {
      return selectedOptions?.map((option) => {
        return (
          <fw-tag
            text={option.text}
            disabled={option.disabled}
            value={option.value}
          />
        );
      });
    }
  }

  renderInput() {
    if (this.selectedOptions.length > 0) {
      if (this.selectInput) {
        this.selectInput.value = this.multiple
          ? this.selectInput.value
          : this.selectedOptions[0].text || '';
      }
    }
    // If no value is selected clear the input
    else if (this.selectInput) {
      this.selectInput.value = '';
    }
  }

  resetFocus() {
    this.preventDropdownClose = false;
  }

  async componentWillLoad() {
    this.strings = await fetchTranslations();
    if (!this.notFoundText)
      this.notFoundText = this.strings.t('No items found');
    if (!this.noDataText) this.noDataText = this.strings.t('No data available');

    const selectOptions = Array.from(
      this.host.querySelectorAll('fw-select-option')
    );

    if (this.value) {
      this.value = typeof this.value === 'string' ? [this.value] : this.value;
    } else {
      this.value = [];
    }

    const options = selectOptions.map((option) => {
      return {
        html: option.html,
        text: option.html ? option.optionText : option.textContent,
        value: option.value,
        selected: this.value.includes(option.value) || option.selected,
        disabled: option.disabled || this.disabled, // Check if option is disabled or select is disabled
        htmlContent: option.html ? option.innerHTML : '',
      };
    });
    this.dataSource = options.length === 0 ? this.getDatasource() : options;
    if (this.selectedOptions.length > 0) {
      this.value = this.selectedOptions.map((option) => option.value);
    } else {
      this.selectedOptions = this.dataSource.filter((option) =>
        this.value.includes(option.value)
      );
    }
    this.filteredOptions = this.dataSource;
    this.host.innerHTML = '';
  }

  componentDidLoad() {
    this.renderInput();
    this.didInit = true;
  }

  @Method()
  async getSelectedItem(): Promise<any> {
    return this.fwListOptions.getSelectedOptions();
  }

  @Method()
  async setSelectedValues(values: string[]): Promise<any> {
    if (this.multiple) {
      this.fwListOptions.setSelectedValues(values);
      this.renderInput();
    }
  }

  setSelectedOptions() {
    this.getSelectedItem().then(
      (selectedOptions) => (this.selectedOptions = selectedOptions)
    );
  }

  render() {
    const { host, name, value } = this;

    renderHiddenField(host, name, value);

    return (
      <Host
        aria-disabled={this.disabled}
        class={{
          'has-focus': this.hasFocus,
        }}
      >
        {this.label !== '' ? (
          <label class={{ required: this.required }}> {this.label} </label>
        ) : (
          ''
        )}
        <div class='select-container'>
          <fw-popover distance='8' ref={(popover) => (this.popover = popover)}>
            <div
              slot='popover-trigger'
              class={{
                'input-container': true,
                [this.state]: true,
                'select-disabled': this.disabled,
              }}
              onClick={() => this.innerOnClick()}
              onKeyDown={handleKeyDown(this.innerOnClick)}
            >
              <div class='input-container-inner'>
                {this.renderTags(this.selectedOptions)}
                <input
                  ref={(selectInput) => (this.selectInput = selectInput)}
                  class={{
                    'multiple-select': this.multiple,
                  }}
                  autoComplete='off'
                  disabled={this.disabled}
                  name={this.name}
                  placeholder={
                    this.value.length > 0 ? '' : this.placeholder || ''
                  }
                  readOnly={this.readonly}
                  required={this.required}
                  type={this.type}
                  value=''
                  onInput={() => this.handleSearchWithDebounce()}
                  onFocus={(e) => this.innerOnFocus(e)}
                  onBlur={(e) => this.innerOnBlur(e)}
                />
                {this.isLoading ? (
                  <fw-spinner size='small'></fw-spinner>
                ) : (
                  <span
                    class={{
                      'dropdown-status-icon': true,
                      'expanded': this.isExpanded,
                    }}
                  ></span>
                )}
              </div>
            </div>
            <fw-list-options
              ref={(fwListOptions) => (this.fwListOptions = fwListOptions)}
              variant={this.variant}
              options={this.filteredOptions}
              value={this.value}
              multiple={this.multiple}
              max={this.max}
              isCheckbox={this.isCheckbox}
              slot='popover-content'
            ></fw-list-options>
          </fw-popover>
          {this.stateText !== '' ? (
            <span class='help-block'>{this.stateText}</span>
          ) : (
            ''
          )}
        </div>
      </Host>
    );
  }
}
