/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Component,
  Element,
  Event,
  EventEmitter,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
  Fragment,
} from '@stencil/core';

import { handleKeyDown, renderHiddenField, hasSlot } from '../../utils';
import FieldControl from '../../function-components/field-control';

import {
  DropdownVariant,
  TagVariant,
  PopoverPlacementType,
} from '../../utils/types';

import { i18n } from '../../global/Translation';
import {
  changeEmittable,
  clearInput,
  closeDropdown,
  expandHandler,
  focusHandler,
  fwChangeHandler,
  hideListHandler,
  initializeComponent,
  innerClickHandler,
  innerFocusHandler,
  innerOnBlur,
  isValueEqual,
  openDropdown,
  optionsWatcher,
  renderInput,
  valueExists,
} from '../../utils/select-utils';
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
  private tagContainer: HTMLElement;
  private tagRefs = [];
  private tagArrowKeyCounter = 0;
  private hostId;

  // Functions shared from utils **Do not remove any variables here as they are being accessed from utils**
  private fwChangeHandler;
  private expandHandler;
  private initializeComponent;
  private renderInput;
  private clearInput;
  private isValueEqual;
  private valueExists;
  private optionsWatcher;
  private focusHandler;
  private blurHandler;
  private hideListHandler;
  private changeEmittable;
  private closeDropdown;
  private openDropdown;
  private innerOnBlur;
  private innerFocusHandler;
  private innerClickHandler;

  private innerOnFocus = (e: Event) => {
    if (this.changeEmittable()) {
      this.innerFocusHandler();
    }
  };

  private innerOnClick = () => {
    this.innerClickHandler(this.variant !== 'mail');
  };

  /**
   * If the dropdown is shown or not
   */
  @State() isExpanded = false;
  @State() hasFocus = false;
  @State() didInit = false;
  @State() searchValue;
  @State() dataSource;
  @State() selectedOptionsState = [];
  @State() isLoading = false;
  @State() focusedOptionId = '';
  @State() hasHintTextSlot = false;
  @State() hasWarningTextSlot = false;
  @State() hasErrorTextSlot = false;

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
   * The UI variant of the select to be used.
   */
  @Prop() variant: 'button' | 'standard' | 'mail' = 'standard';
  /**
   * Standard is the default option without any graphics other options are icon and avatar which places either the icon or avatar at the beginning of the row.
   * The props for the icon or avatar are passed as an object via the graphicsProps.
   */
  @Prop() optionsVariant: DropdownVariant = 'standard';
  /**
   * Allow to search for value. Default is true.
   */
  @Prop() searchable = true;
  /**
   * The data for the select component, the options will be of type array of fw-select-options.
   */
  @Prop() options: any;
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
  @Prop() search;
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
   * Array of the options that is displayed as the default selection, in the list box. Must be a valid option corresponding to the fw-select-option components used in Select.
   */
  @Prop({ reflect: true, mutable: true }) selectedOptions = [];
  /**
   * Whether the select width to be same as that of the options.
   */
  @Prop() sameWidth = true;
  /**
   * Placement of the options list with respect to select.
   */
  @Prop() optionsPlacement: PopoverPlacementType = 'bottom';
  /**
   * The variant of tag to be used.
   */
  @Prop() tagVariant: TagVariant = 'standard';
  /**
   * Whether the arrow/caret should be shown in the select.
   */
  @Prop() caret = true;
  /**
   * If the default label prop is not used, then use this prop to pass the id of the label.
   */
  @Prop() labelledBy = '';
  /**
   * Whether clicking on the already selected option disables it.
   */
  @Prop() allowDeselect = true;
  /**
   * Hint text displayed below the text box.
   */
  @Prop() hintText = '';
  /**
   * Warning text displayed below the text box.
   */
  @Prop() warningText = '';
  /**
   * Error text displayed below the text box.
   */
  @Prop() errorText = '';
  /**
   * Describes the select's boundary HTMLElement
   */
  @Prop() boundary: HTMLElement;

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

  @Listen('fwHide')
  onDropdownClose() {
    this.hideListHandler();
  }

  @Listen('fwShow')
  onDropdownOpen() {
    this.isExpanded = true;
  }

  @Listen('fwLoading')
  onLoading(event) {
    this.isLoading = event.detail.isLoading;
    if (this.variant === 'mail' && !this.isLoading) {
      this.selectInput.value && this.openDropdown();
    }
  }

  @Listen('fwChange')
  fwSelectedHandler(selectedItem) {
    this.fwChangeHandler(
      selectedItem,
      !this.multiple || this.variant === 'mail'
    );
  }

  // Listen to Tag close in case of multi-select
  @Listen('fwClosed')
  fwCloseHandler(ev) {
    this.value = this.value.filter((value) => value !== ev.detail.value);
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
        this.innerOnBlur(ev);
        this.closeDropdown();
        break;
      case 'Tab':
        this.closeDropdown();
        break;
    }
  }

  @Listen('fwFocus')
  onOptionFocus(event) {
    this.focusHandler(event);
  }

  @Listen('fwBlur')
  onOptionBlur(event) {
    this.blurHandler(event);
  }

  @Watch('dataSource')
  optionsChangedHandler() {
    this.renderInput();
  }

  @Watch('options')
  onOptionsChange(newValue) {
    this.optionsWatcher(newValue);
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
  async setSelectedOptions(options: any[]): Promise<any> {
    this.fwListOptions.setSelectedOptions(options);
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
        this.innerOnBlur(ev);
        this.closeDropdown();
        break;
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

  onInput() {
    this.searchValue = this.selectInput.value;
    if (this.selectInput.value) {
      this.variant !== 'mail' && this.openDropdown();
    } else {
      // Clear selected value in case of single select.
      this.multiple || this.setSelectedValues('');
      this.variant === 'mail' && this.closeDropdown();
    }
  }

  renderTags() {
    if (this.multiple && Array.isArray(this.value)) {
      return this.selectedOptionsState.map((option) => {
        if (this.isValueEqual(this.value, option)) {
          return (
            <fw-tag
              variant={this.tagVariant}
              graphicsProps={option.graphicsProps}
              text={option.text}
              disabled={option.disabled}
              value={option.value}
              focusable={false}
            />
          );
        }
      });
    }
  }

  connectedCallback() {
    // Bind util methods with component instance to access state, props and methods
    this.fwChangeHandler = fwChangeHandler.bind(this);
    this.expandHandler = expandHandler.bind(this);
    this.initializeComponent = initializeComponent.bind(this);
    this.renderInput = renderInput.bind(this);
    this.clearInput = clearInput.bind(this);
    this.isValueEqual = isValueEqual.bind(this);
    this.valueExists = valueExists.bind(this);
    this.optionsWatcher = optionsWatcher.bind(this);
    this.focusHandler = focusHandler.bind(this);
    this.hideListHandler = hideListHandler.bind(this);
    this.changeEmittable = changeEmittable.bind(this);
    this.closeDropdown = closeDropdown.bind(this);
    this.openDropdown = openDropdown.bind(this);
    this.innerOnBlur = innerOnBlur.bind(this);
    this.innerFocusHandler = innerFocusHandler.bind(this);
    this.innerClickHandler = innerClickHandler.bind(this);
  }

  componentWillLoad() {
    this.boundary ||= this.host.parentElement;
    this.checkSlotContent();
    if (this.variant === 'mail') {
      this.caret = false;
      this.multiple = true;
    }
    // Initialize options, selectedOptions, value from slot/props.
    this.initializeComponent();
  }

  componentDidLoad() {
    this.renderInput();
    this.didInit = true;
  }

  disconnectedCallback() {
    this.host.removeEventListener('focus', this.setFocus);
  }

  @Watch('isExpanded')
  expandWatcher(expanded: boolean): void {
    if (this.variant === 'button') {
      this.expandHandler(expanded);
    }
  }

  checkSlotContent() {
    this.hasHintTextSlot = hasSlot(this.host, 'hint-text');
    this.hasWarningTextSlot = hasSlot(this.host, 'warning-text');
    this.hasErrorTextSlot = hasSlot(this.host, 'error-text');
  }

  getAriaDescribedBy(): string {
    if (this.state === 'normal') return `hint-${this.name}`;
    else if (this.state === 'error') return `error-${this.name}`;
    else if (this.state === 'warning') return `warning-${this.name}`;
    return null;
  }
  render() {
    const { host, name, value } = this;

    renderHiddenField(host, name, value);

    return (
      <FieldControl
        inputId={this.name}
        label={this.label}
        labelId={`${this.label}-${this.name}`}
        state={this.state}
        hintTextId={`hint-${this.name}`}
        hintText={this.hintText}
        hasHintTextSlot={this.hasHintTextSlot}
        errorTextId={`error-${this.name}`}
        errorText={this.errorText}
        hasErrorTextSlot={this.hasErrorTextSlot}
        warningTextId={`warning-${this.name}`}
        warningText={this.warningText}
        hasWarningTextSlot={this.hasWarningTextSlot}
        required={this.required}
      >
        <div
          aria-disabled={this.disabled}
          class={{
            'has-focus': this.hasFocus,
          }}
        >
          {/* NOTE:: aria-controls is added to div based on ARIA 1.0 but from ARIA 1.1 version this should be
        moved to the input REF- https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html */}
          <div
            class={{ 'select-container': true, [this.state]: true }}
            role='combobox'
            aria-controls={`${this.hostId}-listbox`}
            aria-haspopup='listbox'
            aria-expanded={this.isExpanded}
            aria-owns={`${this.hostId}-listbox`}
          >
            <fw-popover
              distance='8'
              trigger='manual'
              ref={(popover) => (this.popover = popover)}
              same-width={this.sameWidth}
              placement={this.optionsPlacement}
              boundary={this.boundary}
            >
              <div
                slot='popover-trigger'
                class={{
                  'input-container': this.variant !== 'button',
                  [this.state]: true,
                  'select-disabled': this.disabled,
                }}
                onClick={() => this.innerOnClick()}
                onKeyDown={handleKeyDown(this.innerOnClick, true)}
              >
                {this.variant === 'button' ? (
                  <fw-button
                    style={{ '--fw-button-label-vertical-padding': '7px' }}
                    show-caret-icon
                    id={`${this.hostId}-btn`}
                    color='secondary'
                    class={
                      this.host.classList.value.includes('first')
                        ? 'fw-button-group__button--first'
                        : 'fw-button-group__button--last'
                    }
                  >
                    {this.value}
                  </fw-button>
                ) : (
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
                        required={this.required}
                        type={this.type}
                        value=''
                        aria-autocomplete='list'
                        aria-activedescendant={this.focusedOptionId}
                        onInput={() => this.onInput()}
                        onFocus={(e) => this.innerOnFocus(e)}
                        onBlur={(e) => this.innerOnBlur(e)}
                        aria-invalid={this.state === 'error'}
                        aria-describedby={`hint-${this.name} error-${this.name}`}
                      />
                    </div>
                    {this.isLoading ? (
                      <fw-spinner size='small'></fw-spinner>
                    ) : (
                      this.caret && (
                        <span
                          class={{
                            'dropdown-status-icon': true,
                            'expanded': this.isExpanded,
                          }}
                        >
                          <fw-icon
                            name='chevron-down'
                            size={8}
                            library='system'
                          ></fw-icon>
                        </span>
                      )
                    )}
                  </Fragment>
                )}
              </div>
              <fw-list-options
                ref={(fwListOptions) => (this.fwListOptions = fwListOptions)}
                id={`${this.hostId}-listbox`}
                role='listbox'
                aria-labelledby={this.labelledBy || `${this.hostId}-label`}
                notFoundText={this.notFoundText}
                debounceTimer={this.debounceTimer}
                noDataText={this.noDataText}
                search={this.search}
                selectedOptions={this.selectedOptions}
                variant={this.optionsVariant}
                filter-text={this.searchValue}
                options={this.dataSource}
                value={this.value}
                multiple={this.multiple}
                max={this.max}
                disabled={this.disabled}
                checkbox={this.checkbox}
                allowDeselect={this.allowDeselect}
                slot='popover-content'
              ></fw-list-options>
            </fw-popover>
          </div>
        </div>
      </FieldControl>
    );
  }
}
