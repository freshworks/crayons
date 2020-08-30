import { Component, Element, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
@Component({
  tag: 'fw-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {
  @Element() host: HTMLElement;
  private dropdownInput?: HTMLFwInputElement;

  /**
   *  Button type based on which actions are performed when the button is clicked.
   */
  @Prop() type: 'button' | 'reset' | 'submit' = 'button';

  /**
   * Identifier of  the theme based on which the button is styled.
   */
  @Prop() color: 'primary' | 'secondary' | 'danger' | 'link' | 'text' = 'primary';

  /**
   * Disables the button on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Sets the button to a full-width block. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() expand = false;

  /**
   * Size of the button.
   */
  @Prop() size: 'normal' | 'mini' | 'small' = 'normal';

  /**
   *  Accepts the id of the fw-modal component to open it on click
   */
  @Prop() modalTriggerId = '';

  /*
   * Displays a dropdown button
   */
  @Prop() dropdown = false;

  /**
   * Displays a split dropdown button
   */
  @Prop() split = false;

  /**
   * Displays a searchable dropdown button
   */
  @Prop() searchable = false;

  /**
   * Value of the dropdown button
   */
  @Prop() value: any = undefined;

  /**
   * Placeholder text for search input. Validated only if dropdown and searchable is true
   */
  @Prop() placeholder = '';

  /**
   * Options to show in the dropdown button
   */
  @State() options = [];

  /**
   * Option input for searching through options
   */
  @State() optionInput = '';

  /**
   * Filtered options if the dropdown is searchable
   */
  @State() filteredOptions = [];

  /**
   * State variable to check if its valid dropdown
   */
  @State() isValidDropdown = this.dropdown
   && this.size === 'normal'
   && this.hasOptions();

  /**
   * Dropdown is open or not
   */
  @State() isDropdownOpen = false;

  /**
   * Triggered when the button is clicked.
   */
  @Event() fwClick!: EventEmitter<void>;

  /**
   * Triggered when the button comes into focus.
   */
  @Event() fwFocus!: EventEmitter<void>;

  /**
   * Triggered when the button loses focus.
   */
  @Event() fwBlur!: EventEmitter<void>;

  /**
   * Triggered when an option is clicked
   */
  @Event() fwOptionClick: EventEmitter<void>;

  /**
   * Triggered when an option is clicked
   */
  @Event() fwOptionsAdd: EventEmitter<void>;

  private onFocus() {
    this.fwFocus.emit();
  }

  private onBlur() {
    this.fwBlur.emit();
  }

  private handleClick(ev) {
    /**
     * Handle dropdown option click
     */
    if (ev.path[0].nodeName === 'LI') {
      const option = this.options.find(opt => opt.label === ev.path[0].innerText);
      return this.handleOptionClick(option);
    }

    if (this.modalTriggerId !== '') {
      const modal: any = document.getElementById(this.modalTriggerId);
      modal.visible = true;
    }

    /**
     * Do not emit event if the button is
     * a non-split dropdown button
     */

    if (this.isValidDropdown && !this.split) {
      return this.handleDropdownToggle();
    }

    this.fwClick.emit();
  }

  private hasOptions() {
    const spanOptions = this.host.querySelectorAll('span');
    return spanOptions && Array.from(spanOptions).length > 0;
  }

  private setDropdownOptions() {
    this.options = Array.from(
      this.host.querySelectorAll('span')
    ).map(option => ({
      id: option.id,
      value: option.getAttribute('value'),
      label: option.textContent,
    }));

    if (this.searchable) {
      this.filteredOptions = this.options;
    }
  }

  private handleDropdownToggle() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  private handleOptionClick(option) {
    if (this.searchable) {
      return;
    }

    this.value = option.value;
    this.fwOptionClick.emit(this.value);
    this.handleDropdownToggle();
  }

  private handleAddClick() {
    this.fwOptionsAdd.emit(this.value);
    this.handleDropdownToggle();
  }

  private setSearchInput() {
    this.optionInput = this.dropdownInput.value;

    this.filteredOptions = this.optionInput !== ''
      ? this.options.filter(option => option.label.toLowerCase()
        .includes(this.optionInput.toLowerCase()))
      : this.options;
  }

  private handleCheckboxChange(ev) {
    if (ev.target.checked) {
      this.value = [
        ...(this.value || []),
        this.options.find(({ value }) => value === ev.target.id).value,
      ];
    } else {
      this.value = this.value.filter(val => val !== ev.target.id);
    }
  }

  iconComponent = () => {
    const iconColor = this.color === 'secondary' ? '#12344d' : '#fff';
    const direction = this.isDropdownOpen ? 'up' : 'down';
    return <fw-icon name={`chevron-${direction}`} color={iconColor} size="8"> </fw-icon>;
  }

  render() {
    const renderDropdownState = () => {
      const dropdownStateClasses = `
        dropdown-state
        ${'dropdown-state--' + this.size.toLowerCase()}
        ${'dropdown-state--' + this.color.toLowerCase()}
        `;

      return this.isValidDropdown ?
          (
            this.split ? <div onClick={() => this.handleDropdownToggle()} class={dropdownStateClasses}>
              <div class="state-icon">{ this.iconComponent() }</div>
            </div> : ''
          )
          : '';
    };

    const renderDropdownOptions = () => {
      const validOptions = this.searchable ? this.filteredOptions : this.options;
      return (
        <ul class={`dropdown-menu ${this.isDropdownOpen ? 'dropdown-menu--open' : ''}`}>
          { this.searchable ? renderSearchInput() : '' }
          {
            validOptions.map(option => {
              const liEl = <li key={option.id || option.value}
              class="dropdown-item"> {option.label} </li>;

              const checkboxEl = <fw-checkbox id={option.value}
                checked={this.value ? this.value.includes(option.value) : false}
                onFwChange={e => this.handleCheckboxChange(e)}></fw-checkbox>;

              return this.searchable
                ? <div class="searchable-item"> {checkboxEl} {liEl} </div>
                : liEl;
            })
          }
          { this.searchable ? renderBtnGroup() : '' }
        </ul>
      );
    };

    const renderSearchInput = () => {
      return (
        <fw-input placeholder={this.placeholder}
          icon-left="search"
          ref={dropdownInput => this.dropdownInput = dropdownInput}
          onInput={() => this.setSearchInput()} />
      );
    };

    const renderBtnGroup = () => {
      return (
        <div class="search-btn-grp">
          <fw-button size="small" color="primary"
          onClick = {() => this.handleAddClick()}> Add </fw-button>
          <fw-button size="small" color="secondary"
           onClick = {() => this.handleDropdownToggle()}> Cancel </fw-button>
        </div>
      );
    };

    return (
    <Host
      onClick={ev => this.handleClick(ev)}
      onFocus={() => this.onFocus()}
      onBlur={() => this.onBlur()}>
        <div class="btn-container">
          <button
            type = {this.type}
            class={`
              fw-btn fw-btn--${this.color.toLowerCase()}
              fw-btn--${this.size.toLowerCase()}
              ${this.isValidDropdown && this.split ? 'dropdown-btn' : ''}
            `}
            disabled = {this.disabled}>
            { this.isValidDropdown ? this.host.childNodes[0].textContent : <slot /> }
            { this.isValidDropdown && !this.split ? <span> { this.iconComponent()} </span> : '' }
          </button>
          { renderDropdownState() }
          { this.isValidDropdown ? renderDropdownOptions() : '' }
        </div>
    </Host>);
  }

  componentWillLoad() {
    if (this.isValidDropdown) {
      document.addEventListener('click', e => {
        const { target } = e;
        const canClose = this.isDropdownOpen
         && this.host !== target
         && !this.host.contains(target as Element);

        if (canClose) {
          this.isDropdownOpen = false;
        }

      });

      this.setDropdownOptions();
    }
  }
}
