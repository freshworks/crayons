import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

import { handleKeyDown } from '../../utils';
import { i18n } from '../../global/Translation';

@Component({
  tag: 'fw-dropdown-button',
  styleUrl: 'dropdown-button.scss',
  shadow: true,
})
export class DropdownButton {
  @Element() host: HTMLElement;
  private dropdownInput?: HTMLFwInputElement;
  /**
   * Label for the dropdown button
   */

  @Prop() label: string;
  /**
   * Dropdown Button color
   */

  @Prop() color: 'primary' | 'secondary' | 'danger' | 'link' | 'text' =
    'primary';
  /**
   * Displays a split dropdown button
   */
  @Prop() split = false;

  /**
   * Disables the dropdown button if its true
   */
  @Prop() disabled = false;

  /**
   * Displays a searchable dropdown button
   */
  @Prop() searchable = false;

  /**
   * Value of the dropdown button
   */
  @Prop({ mutable: true }) value: any = undefined;

  /**
   * Placeholder text for search input. Validated only if dropdown and searchable is true
   */
  @Prop() placeholder = '';

  /**
   * Options to show in the dropdown button
   */
  @Prop({ mutable: true }) options = [];

  /**
   * Option input for searching through options
   */
  @State() optionInput = '';

  /**
   * Filtered options if the dropdown is searchable
   */
  @State() filteredOptions = [];

  /**
   * State representing dropdown is open or not
   */
  @State() isDropdownOpen = false;

  /**
   * Triggered when an option is clicked
   */
  @Event() fwOptionClick: EventEmitter<any>;

  /**
   * Triggered when Add button for searchable dropdown is clicked
   */
  @Event() fwOptionsAdd: EventEmitter<any>;

  @i18n({ keyName: 'dropdown.add' })
  @Prop({ mutable: true })
  addText = '';
  @Prop({ mutable: true })
  @i18n({ keyName: 'dropdown.cancel' })
  cancelText = '';

  @Watch('isDropdownOpen')
  setInitialState(newVal) {
    // Do not open dropdown if options is absent
    if (newVal) {
      if (this.options.length === 0) {
        this.isDropdownOpen = false;
      }
    }
    // Reset searchable dropdown to initial state on close
    if (!newVal) {
      if (this.searchable) {
        this.filteredOptions = this.options;
        this.dropdownInput.value = '';
      }
    }
  }

  /**
   * Toggles dropdown b/w open and close
   */
  private handleDropdownToggle = () => {
    if (!this.disabled) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  };

  /**
   * Sets dropdown options from slot
   */
  private setDropdownOptions() {
    // Set options if the prop is not supplied by user
    if (this.options.length === 0) {
      this.options = Array.from(
        this.host.querySelectorAll('[slot=dropdown-options] option')
      ).map((option) => ({
        id: option.id,
        value: option.getAttribute('value'),
        label: option.textContent,
      }));
    }

    // Set filtered options to inital options for search dropdown
    if (this.searchable) {
      this.filteredOptions = this.options;
    }
  }

  /**
   * Sets search dropdown input
   */
  private setSearchInput() {
    this.optionInput = this.dropdownInput.value;
    this.filteredOptions =
      this.optionInput !== ''
        ? this.options.filter((option) =>
            option.label.toLowerCase().includes(this.optionInput.toLowerCase())
          )
        : this.options;
  }

  /**
   * Listens to checkbox change for search dropdown
   */
  private handleCheckboxChange(ev) {
    if (ev.target.checked) {
      this.value = [
        ...(this.value || []),
        this.options.find(({ value }) => value === ev.target.id).value,
      ];
    } else {
      this.value = this.value.filter((val) => val !== ev.target.id);
    }
  }

  /**
   * Handles `Add` button click in search dropdown
   */
  private handleAddClick() {
    this.fwOptionsAdd.emit({ value: this.value });
    this.handleDropdownToggle();
  }

  /**
   * Handles option select from the dropdown
   */
  private handleOptionClick(option) {
    if (!this.searchable) {
      this.value = option.value;
      this.fwOptionClick.emit({ value: this.value, label: option.label });
      this.handleDropdownToggle();
    }
  }

  render() {
    const ChevronArrow = () => {
      const iconColor = ['secondary', 'link', 'text'].includes(this.color)
        ? '#12344d'
        : '#fff';
      const iconSize = 8;
      const direction = this.isDropdownOpen ? 'up' : 'down';

      return (
        <fw-icon
          name={`chevron-${direction}`}
          color={iconColor}
          size={iconSize}
          library='system'
        >
          {' '}
        </fw-icon>
      );
    };

    const DropdownMenu = () => {
      const SearchInput = () => {
        return (
          <fw-input
            placeholder={this.placeholder}
            icon-left='search'
            ref={(dropdownInput) => (this.dropdownInput = dropdownInput)}
            onInput={() => this.setSearchInput()}
          />
        );
      };

      const renderBtnGroup = () => {
        return (
          <div class='search-btn-grp'>
            <fw-button
              id='addBtn'
              size='small'
              color='primary'
              onClick={() => this.handleAddClick()}
            >
              {' '}
              {this.addText}{' '}
            </fw-button>
            <fw-button
              id='cancelBtn'
              size='small'
              color='secondary'
              onClick={() => this.handleDropdownToggle()}
            >
              {' '}
              {this.cancelText}{' '}
            </fw-button>
          </div>
        );
      };

      const validOptions = this.searchable
        ? this.filteredOptions
        : this.options;
      return (
        <ul
          class={`dropdown-menu ${
            this.isDropdownOpen ? 'dropdown-menu--open' : ''
          }`}
        >
          {this.searchable ? <SearchInput /> : ''}
          <div class={this.searchable ? `search-list` : ''}>
            {validOptions.map((option) => {
              const liEl = (
                <li class='dropdown-item-wrapper'>
                  <button
                    key={option.id || option.value}
                    onClick={() => this.handleOptionClick(option)}
                    class='dropdown-item'
                    onKeyDown={handleKeyDown(() =>
                      this.handleOptionClick(option)
                    )}
                  >
                    {' '}
                    {option.label}{' '}
                  </button>
                </li>
              );

              const checkboxEl = (
                <fw-checkbox
                  id={option.value}
                  checked={(this.value || []).includes(option.value)}
                  onFwChange={(e) => this.handleCheckboxChange(e)}
                ></fw-checkbox>
              );

              return this.searchable ? (
                <div class='searchable-item'>
                  {' '}
                  {checkboxEl} {liEl}{' '}
                </div>
              ) : (
                liEl
              );
            })}
          </div>
          {this.searchable ? renderBtnGroup() : ''}
        </ul>
      );
    };

    const DropdownState = () =>
      !this.split ? (
        <span class='down-arrow'>
          <ChevronArrow />
        </span>
      ) : (
        ''
      );

    const SplitDropdownState = () => {
      const dropdownStateClasses = `
        dropdown-state
        ${'dropdown-state--' + this.color.toLowerCase()}
        ${this.disabled ? 'disabled' : ''}
      `;
      return this.split ? (
        <div
          role='button'
          tabindex='0'
          onClick={() => this.handleDropdownToggle()}
          class={dropdownStateClasses}
          onKeyDown={handleKeyDown(this.handleDropdownToggle)}
        >
          <div class='state-icon'>
            <ChevronArrow />
          </div>
        </div>
      ) : (
        ''
      );
    };

    return (
      <div class='dropdown-container'>
        <div class='btn-container'>
          <fw-button
            color={this.color}
            disabled={this.disabled}
            onClick={() => this.handleDropdownToggle()}
          >
            {this.label}
            <DropdownState />
          </fw-button>
          <SplitDropdownState />
        </div>
        <DropdownMenu />
      </div>
    );
  }

  componentWillLoad() {
    document.addEventListener('click', (e) => {
      const { target } = e;
      const canClose =
        this.isDropdownOpen &&
        this.host !== target &&
        !this.host.contains(target as Element);

      if (canClose) {
        this.isDropdownOpen = false;
      }
    });

    this.setDropdownOptions();
  }
}
