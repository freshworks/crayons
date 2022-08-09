import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Method,
  Prop,
  State,
  h,
  Watch,
  Fragment,
} from '@stencil/core';
import { handleKeyDown, renderHiddenField, validateEmail } from '../../utils';

@Component({
  tag: 'fw-email-select',
  styleUrl: 'email-select.scss',
  shadow: true
})
export class EmailHeaderCustomComponentsSelectField {
  @Element() host: HTMLElement;
  private selectInput?: HTMLInputElement;
  private fwListOptions?: HTMLFwListOptionsElement;
  private popover?: HTMLFwPopoverElement;
  private tagContainer: HTMLElement;
  private tagRefs = [];
  private tagArrowKeyCounter = 0;
  private hostId;

  private changeEmittable = () => !this.disabled;

  private innerOnFocus = (e: Event) => {
    if (this.changeEmittable()) {
      this.hasFocus = true;
      this.fwFocus.emit(e);
    }
  };

  private innerOnClick = () => {
    this.setFocus();
    // Select the whole text in case of single select
    this.multiple || this.selectInput?.select?.();
    if (!this.multiple) {
      this.openDropdown();
    }
  };

  private innerOnBlur = () => {
    if (this.changeEmittable()) {
      this.hasFocus = false;
    }
  };

  private openDropdown = () => {
    if (!this.isExpanded && this.changeEmittable()) {
      this.popover.show();
    }
  };

  private closeDropdown = () => {
    if (this.isExpanded && this.changeEmittable()) {
      this.popover.hide();
    }
  };

  /**
   * If the dropdown is shown or not
   */
  @State() isExpanded = false;
  @State() hasFocus = false;
  @State() searchValue;
  @State() dataSource;
  @State() selectedOptionsState = [];
  @State() isLoading = false;
  @State() focusedOptionId = '';

  /**
   * Value of the option that is displayed as the default selection, in the list box. Must be a valid value corresponding to the fw-select-option components used in Select.
   */
  @Prop({ mutable: true }) value: any;

  /**
   * Name of the component, saved as part of form data.
   */
  @Prop() name = '';

  /**
   * Text displayed in the list box before an option is selected.
   */
  @Prop() placeholder?: string | null;

  /**
   * If true, the user cannot modify the default value selected. If the attribute's value is undefined, the value is set to true.
   */
  @Prop() readonly = false;

  /**
  * Enables selection of multiple options. If the attribute’s value is undefined, the value is set to false.
  */
  @Prop() multiple = false;

  /**
   * Works with `multiple` enabled. Configures the maximum number of options that can be selected with a multi-select component.
   */
  @Prop() max = Number.MAX_VALUE;

  /**
   * The data for the select component, the options will be of type array of fw-select-options.
   */
  @Prop() options: any;

  /**
   * Filter function which takes in filterText and dataSource and return a Promise.
   * Where filter text is the text to filter the value in dataSource array.
   * The returned promise should contain the array of options to be displayed.
   */
  @Prop() search;

  /**
   * Array of the options that is displayed as the default selection, in the list box. Must be a valid option corresponding to the fw-select-option components used in Select.
   */
  @Prop({ reflect: true, mutable: true }) selectedOptions = [];

  /**
  * Whether clicking on the already selected option disables it.
  */
  @Prop() allowDeselect = false;

  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() disabled = false;

  /**
   * Debounce timer for the search promise function.
   */
  @Prop() debounceTimer = 300;

  // Events
  /**
   * Triggered when a value is selected or deselected from the list box options.
   */
  @Event() fwChange: EventEmitter;
  /**
   * Triggered when the list box comes into focus.
   */
  @Event() fwFocus: EventEmitter;

  @Listen('fwHide')
  onDropdownClose(e) {
    if (e.composedPath()[0].id === 'list-items-popover') {
      this.clearInput();
      this.isExpanded = false;
      this.multiple && this.selectInput.focus();
    }
  }

  @Listen('fwShow')
  onDropdownOpen(e) {
    if (e.composedPath()[0].id === 'list-items-popover') {
      this.isExpanded = true;
    }
  }

  @Listen('fwLoading')
  onLoading(event) {
    this.isLoading = event.detail.isLoading;
    if (this.multiple && !this.isLoading && !this.readonly) {
      this.selectInput.value.trim() && this.openDropdown();
    }
  }

  @Listen('fwChange')
  fwSelectedHandler(selectedItem) {
    if (selectedItem.composedPath()[0].tagName === 'FW-LIST-OPTIONS') {
      this.selectedOptionsState = selectedItem.detail?.meta?.selectedOptions;
      this.value = selectedItem.detail.value;
      this.renderInput();
      this.closeDropdown();
      selectedItem.stopImmediatePropagation();
      selectedItem.stopPropagation();
      selectedItem.preventDefault();
      if (this.selectedOptionsState.length > 0) {
        this.fwChange.emit({
          name: this.name,
          value: this.value,
          meta: { selectedOptions: this.selectedOptionsState },
        });
      } else {
        this.fwChange.emit({
          name: this.name,
          value: this.value,
          meta: {
            shouldValidate: false, // for handling validation with form during reset. watcher in list-options is firing.
            selectedOptions: this.selectedOptionsState,
          },
        });
      }
    }
  }

  // Listen to Tag close in case of multi-select
  @Listen('fwClosed')
  fwCloseHandler(ev) {
    this.value = this.value.filter((value) => value !== ev.detail.value);
    this.focusOnTagContainer();
  }

  @Listen('keydown')
  onKeyDown(ev) {
    switch (ev.key) {
      case 'ArrowDown':
        this.innerOnClick();
        this.fwListOptions.setFocus();
        ev.preventDefault();
        ev.stopPropagation();
        break;
      case 'ArrowLeft':
      case 'Backspace':
        if (this.multiple && this.selectInput.value === '') {
          this.focusOnTagContainer();
        }
        break;
      case 'Escape':
        this.innerOnBlur();
        this.closeDropdown();
        break;
      case 'Tab':
        this.closeDropdown();
        break;
    }
  }

  @Listen('fwFocus')
  onOptionFocus(event) {
    if (event.composedPath()[0].tagName === 'FW-SELECT-OPTION') {
      this.focusedOptionId = event.detail.id;
    }
  }

  @Listen('fwBlur')
  onOptionBlur(event) {
    if (event.composedPath()[0].tagName === 'FW-SELECT-OPTION') {
      this.focusedOptionId = '';
    }
  }

  @Watch('dataSource')
  optionsChangedHandler() {
    this.renderInput();
  }

  @Watch('options')
  onOptionsChange(newValue) {
    const selectedValues = newValue?.filter((option) => option.selected);
    // If selected key is available in options schema use it
    // Or check for the value
    if (selectedValues.length > 0) {
      this.dataSource = newValue;
      this.selectedOptionsState = selectedValues;
      this.value = this.multiple
        ? this.selectedOptionsState.map((x) => x.value)
        : this.selectedOptionsState[0]?.value;
    } else if (this.valueExists()) {
      this.dataSource = newValue.map((option) => {
        return { ...option, selected: this.isValueEqual(this.value, option) };
      });
    } else {
      this.dataSource = newValue;
      this.value = this.multiple ? [] : '';
      this.selectedOptionsState = [];
    }
  }

  @Method()
  async getSelectedItem(): Promise<any> {
    return this.fwListOptions.getSelectedOptions();
  }

  @Method()
  async setSelectedValues(values: string | string[]): Promise<any> {
    this.fwListOptions.setSelectedValues(values);
    this.renderInput();
  }

  @Method()
  async setFocus(): Promise<any> {
    this.hasFocus = true;
    this.selectInput?.focus();
  }

  tagContainerKeyDown = (ev) => {
    switch (ev.key) {
      case 'Escape':
        this.innerOnBlur();
        this.closeDropdown();
        break;
      case 'Backspace':
      case 'ArrowLeft':
        this.tagArrowKeyCounter--;
        if (this.tagArrowKeyCounter >= 0) {
          this.focusOnTag(this.tagArrowKeyCounter);
        } else {
          this.tagArrowKeyCounter = 0;
        }
        ev.stopImmediatePropagation();
        break;
      case 'ArrowRight':
        this.tagArrowKeyCounter++;
        if (this.tagArrowKeyCounter >= this.value.length) {
          this.selectInput.focus();
        } else {
          this.focusOnTag(this.tagArrowKeyCounter);
        }
        ev.stopImmediatePropagation();
        break;
    }
  };

  focusOnTagContainer() {
    this.tagRefs = [...this.tagContainer.getElementsByTagName('fw-tag')];
    this.tagArrowKeyCounter = this.value.length - 1;
    this.focusOnTag(this.tagArrowKeyCounter);
  }

  focusOnTag(index) {
    this.tagRefs[index]?.setFocus();
  }

  clearInput() {
    if (!this.multiple && this.value) {
      this.renderInput();
      return;
    }
    this.searchValue = '';
    this.selectInput.value = '';
  }

  isValueEqual(value, option) {
    return this.multiple
      ? value.includes(option.value)
      : value === option.value;
  }

  valueExists() {
    return this.value && (this.multiple ? this.value.length > 0 : !!this.value);
  }

  onInput() {
    this.searchValue = this.selectInput.value;
    if (this.selectInput.value.trim()) {
      !this.multiple && this.openDropdown();
    } else {
      // Clear selected value in case of single select.
      this.multiple || this.setSelectedValues('');
      !this.multiple && this.closeDropdown();
    }
  }

  renderTags() {
    if (this.multiple && Array.isArray(this.value)) {
      return this.selectedOptionsState.map((option) => {
        if (this.isValueEqual(this.value, option)) {
          return (
            <fw-tag
              class={option.disabled ? 'tag-disabled' : 'tag-default'}
              state={option.error ? 'error' : 'normal'}
              variant="avatar"
              graphicsProps={option.graphicsProps}
              text={option.text}
              secondaryText={option.subText ? `<${option.subText}>` : ''}
              disabled={option.disabled}
              value={option.value}
              focusable={false}
              closable={!option.disabled}
              onClick={(e) => e.stopImmediatePropagation()}
            />
          );
        }
      });
    }
  }

  renderInput() {
    if (this.selectedOptionsState.length > 0) {
      if (this.selectInput) {
        this.selectInput.value = '';
        this.selectInput.value = this.multiple
          ? this.selectInput.value
          : this.selectedOptionsState[0].text || '';
      }
    } else {
      if (this.selectInput) {
        this.selectInput.value = '';
      }
    }
  }

  renderSingleValue(value) {
    if (value) {
      return (
        <span class='single-value-tag'>
          <fw-avatar
            size="xsmall"
            image={value?.graphicsProps?.image}
          ></fw-avatar>
          <span class='single-select-value'>
            {value?.text} &lt;{value?.subText}&gt;
          </span>
        </span>
      );
    }
  }

  componentWillLoad() {
    //TODO: The below is a rough draft and needs to be optimized for better performance.
    const selectOptions = Array.from(
      this.host.querySelectorAll('fw-select-option')
    );

    // Set value if the selectedOptions is provided
    if (this.selectedOptions.length > 0) {
      this.selectedOptionsState = this.selectedOptions;
      this.value = this.multiple
        ? this.selectedOptions.map((option) => option.value)
        : this.selectedOptions[0].value;
    }

    if (this.multiple) {
      if (this.multiple && typeof this.value === 'string') {
        throw Error('value must be a array of string when multiple is true');
      }
      this.value = this.value?.length > 0 ? this.value : [];
    } else {
      this.value = this.value ? this.value : '';
    }
    const options = selectOptions.map((option) => {
      return {
        html: option.html,
        text: option.html ? option.optionText : option.textContent,
        value: option.value,
        selected: this.isValueEqual(this.value, option) || option.selected,
        disabled: option.disabled,
        htmlContent: option.html ? option.innerHTML : '',
      };
    });
    this.dataSource = options.length === 0 ? this.options : options;
    // Set selectedOptions if the value is provided
    if (!this.multiple && this.value && this.selectedOptions.length === 0) {
      this.selectedOptionsState = this.dataSource.filter(
        (option) => this.value === option.value
      );
    } else if (
      this.multiple &&
      this.value.length !== this.selectedOptions.length
    ) {
      this.selectedOptionsState = this.dataSource.filter((option) =>
        this.isValueEqual(this.value, option)
      );
    }
    if (this.dataSource?.length > 0) {
      // Check whether the selected data in the this.dataSource  matches the value
      const selectedDataSource = this.dataSource.filter(
        (option) => option.selected
      );
      const selectedDataSourceValues = selectedDataSource.map(
        (option) => option.value
      );
      const selected = this.multiple
        ? selectedDataSourceValues
        : selectedDataSourceValues[0];
      if (
        selectedDataSourceValues.length > 0 &&
        JSON.stringify(this.value) !== JSON.stringify(selected)
      ) {
        this.value = selected;
        this.selectedOptionsState = selectedDataSource;
      }
    }
    this.host.addEventListener('focus', this.setFocus);

    //Get id
    this.hostId = this.host.id || '';
  }

  componentDidLoad() {
    this.renderInput();
  }

  disconnectedCallback() {
    this.host.removeEventListener('focus', this.setFocus);
  }

  @Watch('isExpanded')
  expandWatcher(expanded: boolean): void {
    if (!this.multiple) {
      const icon = this.host.shadowRoot
        ?.querySelector('.select-container')
        ?.querySelector('fw-button')
        ?.shadowRoot?.querySelector('fw-icon');
      icon && (icon.name = expanded ? 'chevron-up' : 'chevron-down');
    }
  }

  render() {
    const { host, name, value } = this;

    renderHiddenField(host, name, value);
    return <div
      aria-disabled={this.disabled}
      class={{
        'email-select-container': true,
        'has-focus': this.hasFocus,
      }}
    >
      {/* NOTE:: aria-controls is added to div based on ARIA 1.0 but from ARIA 1.1 version this should be
        moved to the input REF- https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html */}
      <div
        class={{ 'select-container': true }}
        role='combobox'
        aria-controls={`${this.hostId}-listbox`}
        aria-haspopup='listbox'
        aria-expanded={this.isExpanded}
        aria-owns={`${this.hostId}-listbox`}
      >
        <fw-popover
          id='list-items-popover'
          distance='8'
          trigger='manual'
          ref={(popover) => (this.popover = popover)}
          placement="bottom"
          boundary={this.host.parentElement}
        >
          <div
            slot='popover-trigger'
            class={{
              'input-container': this.multiple && !this.readonly,
              'select-disabled': this.disabled,
            }}
            onClick={() => !this.readonly && this.innerOnClick()}
            onKeyDown={handleKeyDown(this.innerOnClick, true)}
          >
            {this.readonly ?
              this.renderSingleValue(this.selectedOptionsState[0])
              : !this.multiple ? (
                <fw-button class='single-value-button' color='text' show-caret-icon>
                  {this.renderSingleValue(this.selectedOptionsState[0])}
                </fw-button>)
                : (
                  <Fragment>
                    <div class='input-container-inner'>
                      {this.multiple && (
                        <div
                          class='tag-container'
                          onFocus={this.focusOnTagContainer}
                          ref={(tagContainer) =>
                            (this.tagContainer = tagContainer)
                          }
                          onKeyDown={this.tagContainerKeyDown}
                        >
                          {this.renderTags()}
                        </div>
                      )}
                      <input
                        ref={(selectInput) => (this.selectInput = selectInput)}
                        class={{
                          'multiple-select': this.multiple,
                        }}
                        autoComplete='off'
                        disabled={this.disabled}
                        name={this.name}
                        id={this.name}
                        placeholder={
                          this.valueExists() ? '' : this.placeholder || ''
                        }
                        readOnly={this.readonly}
                        value=''
                        aria-autocomplete='list'
                        aria-activedescendant={this.focusedOptionId}
                        onInput={() => this.onInput()}
                        onFocus={(e) => this.innerOnFocus(e)}
                        onBlur={() => this.innerOnBlur()}
                        aria-describedby={`hint-${this.name} error-${this.name}`}
                      />
                    </div>
                    {this.isLoading && (
                      <fw-spinner size='small'></fw-spinner>
                    )}
                  </Fragment>
                )}
          </div>
          <fw-list-options
            ref={(fwListOptions) => (this.fwListOptions = fwListOptions)}
            id={`${this.hostId}-listbox`}
            role='listbox'
            aria-labelledby={`${this.hostId}-label`}
            debounceTimer={this.debounceTimer}
            search={this.search}
            selectedOptions={this.selectedOptions}
            variant='avatar'
            filter-text={this.searchValue}
            options={this.dataSource}
            value={this.value}
            multiple={this.multiple}
            max={this.max}
            disabled={this.disabled}
            allowDeselect={this.allowDeselect}
            slot='popover-content'
            validateCreatable={(value) => !validateEmail(value)}
            isCreatable
          ></fw-list-options>
        </fw-popover>
      </div>
    </div>;
  }
}
