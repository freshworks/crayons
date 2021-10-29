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

import { handleKeyDown, renderHiddenField } from '../../utils';
@Component({
  tag: 'fw-select',
  styleUrl: 'select.scss',
  shadow: true,
})
export class Select {
  @Element() host: HTMLElement;
  private selectInput?: HTMLInputElement;
  private popover?: HTMLFwPopoverElement;
  private preventDropdownClose?: boolean = false;

  /**
   * If the dropdown is shown or not
   */
  @State() isExpanded = false;
  @State() filteredOptions = [];
  @State() hasFocus = false;
  @State() didInit = false;
  @State() searchValue;
  /**
   * Label displayed on the interface, for the component.
   */
  @Prop() label = '';
  /**
   * Value of the option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
   */
  @Prop({ mutable: true }) value: any;
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
   * Enables the input with in the popup for filtering the options.
   */
  @Prop() variant: 'standard' | 'checked' = 'standard';
  /**
   * Allow to search for value. Default is true.
   */
  @Prop() searchable = true;
  /**
   * Allow to search for value. Default is true.
   */
  @Prop() options;
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
      this.filteredOptions = this.options;
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

  @Watch('value')
  keyChanged(newValue, oldValue) {
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      this.options = this.options.map((option) => {
        option.selected = Array.isArray(this.value)
          ? this.value.includes(option.value)
          : this.value === option.value;
        return option;
      });
      if (this.didInit) {
        this.fwChange.emit({ value: this.value });
      }
    }
  }

  @Listen('fwSelected')
  fwSelectedHandler(selectedItem) {
    this.selectInput.value = '';
    this.renderInput();
    if (!this.multiple) {
      this.resetFocus();
      this.closeDropdown();
    }
    selectedItem.stopPropagation();
  }

  @Watch('options')
  optionsChangedHandler() {
    this.renderInput();
  }

  @Listen('fwClosed')
  fwCloseHandler(ev) {
    this.options = this.options.map((option) => {
      if (option.value === ev.detail.value) {
        option.selected = false;
      }
      return option;
    });
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

  onInput() {
    this.searchValue = this.selectInput.value.toLowerCase();
    this.renderInput();
  }

  renderTags() {
    if (this.multiple) {
      return this.options
        .filter((option) => option.selected)
        .map((option) => (
          <fw-tag
            text={option.text}
            disabled={option.disabled}
            value={option.value}
          />
        ));
    }
  }

  renderInput() {
    const selectedOptions = this.options.filter((option) => option.selected);
    if (selectedOptions.length > 0) {
      this.value = this.multiple
        ? selectedOptions.map((option) => option.value)
        : selectedOptions[0].value || '';
      if (this.selectInput) {
        this.selectInput.value = this.multiple
          ? this.selectInput.value
          : selectedOptions[0].text || '';
      }
    } else if (selectedOptions.length === 0) {
      this.value = undefined;
    }
  }

  renderDropdown() {
    return this.filteredOptions.map((option) => (
      <fw-select-option
        value={option.value}
        selected={option.selected}
        disabled={option.disabled || this.value?.length >= this.max}
        html={option.html}
        htmlContent={option.htmlContent}
      >
        {option.text}
      </fw-select-option>
    ));
  }

  resetFocus() {
    this.preventDropdownClose = false;
  }

  componentWillLoad() {
    const selectOptions = Array.from(
      this.host.querySelectorAll('fw-select-option')
    );

    const options = selectOptions.map((option) => {
      return {
        html: option.html,
        text: option.html ? option.optionText : option.textContent,
        value: option.value,
        selected: option.value === this.value || option.selected,
        disabled: option.disabled || this.disabled, // Check if option is disabled or select is disabled
        htmlContent: option.html ? option.innerHTML : '',
      };
    });

    this.options = options.length === 0 ? this.options : options;
    this.filteredOptions = this.options;
    this.host.innerHTML = '';
  }

  componentDidLoad() {
    this.renderInput();
    this.didInit = true;
  }

  @Method()
  async getSelectedItem(): Promise<any> {
    return this.options.filter((option) => option.selected);
  }

  @Method()
  async setSelectedValues(values: string[]): Promise<any> {
    if (this.multiple) {
      this.options.forEach((option) => {
        option.selected = values.includes(option.value);
      });
      this.renderInput();
    }
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
                {this.renderTags()}
                <input
                  ref={(selectInput) => (this.selectInput = selectInput)}
                  class={{
                    'multiple-select': this.multiple,
                  }}
                  autoComplete='off'
                  disabled={this.disabled}
                  name={this.name}
                  placeholder={this.value ? '' : this.placeholder || ''}
                  readOnly={this.readonly}
                  required={this.required}
                  type={this.type}
                  value=''
                  onInput={() => this.onInput()}
                  onFocus={(e) => this.innerOnFocus(e)}
                  onBlur={(e) => this.innerOnBlur(e)}
                />
                <span
                  class={{
                    'dropdown-status-icon': true,
                    'expanded': this.isExpanded,
                  }}
                ></span>
              </div>
            </div>
            <fw-list-options
              variant={this.variant}
              filter-text={this.searchValue}
              options={this.options}
              value={this.value}
              multiple={this.multiple}
              max={this.max}
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
