import { r as registerInstance, f as createEvent, h, g as getElement } from './index-4996832f.js';
import { h as handleKeyDown } from './index-268121b7.js';

const dropdownButtonCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{--dropdown-min-height:100px;--dropdown-min-width:200px;--dropdown-max-height:200px;--dropdown-max-width:480px;--dropdown-font-size:$font-size-14}@-webkit-keyframes dropdown-fade{0%{opacity:0;-webkit-transform:translateY(-10%);transform:translateY(-10%)}50%{opacity:0.7;-webkit-transform:translateY(-5%);transform:translateY(-5%)}100%{opacity:1;-webkit-transform:translateY(0%);transform:translateY(0%)}}@keyframes dropdown-fade{0%{opacity:0;-webkit-transform:translateY(-10%);transform:translateY(-10%)}50%{opacity:0.7;-webkit-transform:translateY(-5%);transform:translateY(-5%)}100%{opacity:1;-webkit-transform:translateY(0%);transform:translateY(0%)}}.dropdown-container{position:relative;display:inline-block}.dropdown-container .btn-container{display:-ms-flexbox;display:flex}.dropdown-container .btn-container .dropdown-state{cursor:pointer;border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:4px;border-bottom-right-radius:4px;width:30px;height:30px;margin-left:-10px}.dropdown-container .btn-container .dropdown-state .state-icon{padding:5px 10px}.dropdown-container .btn-container .dropdown-state--primary{background-color:#264966;color:#fff;border:1px solid #12344d;background-image:-webkit-gradient(linear, left top, left bottom, from(#264966), to(#12344d));background-image:linear-gradient(to bottom, #264966, #12344d)}.dropdown-container .btn-container .dropdown-state--primary:active{border:1px solid #264966}.dropdown-container .btn-container .dropdown-state--primary:hover:not([disabled]),.dropdown-container .btn-container .dropdown-state--primary:focus:not([disabled]){background-color:#12344d;background-image:none}.dropdown-container .btn-container .dropdown-state--secondary{background-color:#f3f5f7;color:#12344d;border:1px solid #cfd7df;background-image:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#f3f5f7));background-image:linear-gradient(to bottom, #fff, #f3f5f7)}.dropdown-container .btn-container .dropdown-state--secondary:active{border:1px solid #ebeff3}.dropdown-container .btn-container .dropdown-state--secondary:hover:not([disabled]),.dropdown-container .btn-container .dropdown-state--secondary:focus:not([disabled]){background-color:#f3f5f7;background-image:none}.dropdown-container .btn-container .dropdown-state--danger{color:#fff;background-color:#d72d30;border:1px solid #c82124;background-image:-webkit-gradient(linear, left top, left bottom, from(#d72d30), to(#c82124));background-image:linear-gradient(to bottom, #d72d30, #c82124)}.dropdown-container .btn-container .dropdown-state--danger:hover:not([disabled]),.dropdown-container .btn-container .dropdown-state--danger:focus:not([disabled]){background-color:#c82124;background-image:none}.dropdown-container .btn-container .dropdown-state.disabled{cursor:not-allowed;opacity:0.4}.dropdown-container .btn-container .dropdown-state:focus{border:1px solid #2c5cc5;-webkit-box-shadow:0 0 0 1px #2c5cc5;box-shadow:0 0 0 1px #2c5cc5;outline:none}.dropdown-container .btn-container .dropdown-state:active{-webkit-box-shadow:inset 0 0 4px 0 rgba(0, 0, 0, 0.25);box-shadow:inset 0 0 4px 0 rgba(0, 0, 0, 0.25)}.dropdown-container .btn-container .down-arrow{padding-left:10px}@media screen and (prefers-reduced-motion: reduce){.dropdown-container .dropdown-menu{-webkit-animation:none;animation:none}}.dropdown-container .dropdown-menu{background-color:#fff;min-width:var(--dropdown-min-width);max-width:var(--dropdown-max-width);min-height:var(--dropdown-min-height);max-height:var(--dropdown-max-height);padding:10px;border-radius:5px;position:absolute;top:17px;-webkit-box-shadow:rgba(0, 0, 0, 0.176) 0 6px 12px 0;box-shadow:rgba(0, 0, 0, 0.176) 0 6px 12px 0;-webkit-box-sizing:border-box;box-sizing:border-box;overflow-y:scroll;list-style:none;border:1px solid rgba(0, 0, 0, 0.15);-webkit-animation:dropdown-fade 0.15s;animation:dropdown-fade 0.15s;display:none;z-index:999}.dropdown-container .dropdown-menu--open{display:block}.dropdown-container .dropdown-menu--search{border-bottom-left-radius:0;border-bottom-right-radius:0}.dropdown-container .dropdown-menu .search-list{overflow-y:scroll;max-height:calc(var(--dropdown-max-height) - 105px)}.dropdown-container .dropdown-menu .dropdown-item-wrapper{width:100%}.dropdown-container .dropdown-menu .dropdown-item-wrapper .dropdown-item{padding:5px 25px 8px 10px;color:var(--btn-secondary-color);font-size:var(--dropdown-font-size);font-weight:500;cursor:pointer;background:transparent;border-radius:5px;text-decoration:none;border:0;text-align:left;width:inherit}.dropdown-container .dropdown-menu .dropdown-item-wrapper .dropdown-item:hover,.dropdown-container .dropdown-menu .dropdown-item-wrapper .dropdown-item:focus{background:var(--bg-color-hover)}.dropdown-container .dropdown-menu .searchable-item{margin-left:5px;display:-ms-flexbox;display:flex}.dropdown-container .dropdown-menu .searchable-item .dropdown-item{cursor:default;padding-top:0;padding-bottom:10px;padding-left:0}.dropdown-container .dropdown-menu .searchable-item .dropdown-item:hover,.dropdown-container .dropdown-menu .searchable-item .dropdown-item:focus{background-color:transparent}.dropdown-container .dropdown-menu .search-btn-grp{margin-top:5px;display:-ms-flexbox;display:flex}.dropdown-container .dropdown-menu .search-btn-grp fw-button{margin-right:5px;cursor:pointer}";

let DropdownButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwOptionClick = createEvent(this, "fwOptionClick", 7);
    this.fwOptionsAdd = createEvent(this, "fwOptionsAdd", 7);
    /**
     * Dropdown Button color
     */
    this.color = 'primary';
    /**
     * Displays a split dropdown button
     */
    this.split = false;
    /**
     * Disables the dropdown button if its true
     */
    this.disabled = false;
    /**
     * Displays a searchable dropdown button
     */
    this.searchable = false;
    /**
     * Value of the dropdown button
     */
    this.value = undefined;
    /**
     * Placeholder text for search input. Validated only if dropdown and searchable is true
     */
    this.placeholder = '';
    /**
     * Options to show in the dropdown button
     */
    this.options = [];
    /**
     * Option input for searching through options
     */
    this.optionInput = '';
    /**
     * Filtered options if the dropdown is searchable
     */
    this.filteredOptions = [];
    /**
     * State representing dropdown is open or not
     */
    this.isDropdownOpen = false;
    /**
     * Toggles dropdown b/w open and close
     */
    this.handleDropdownToggle = () => {
      if (!this.disabled) {
        this.isDropdownOpen = !this.isDropdownOpen;
      }
    };
  }
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
   * Sets dropdown options from slot
   */
  setDropdownOptions() {
    // Set options if the prop is not supplied by user
    if (this.options.length === 0) {
      this.options = Array.from(this.host.querySelectorAll('[slot=dropdown-options] option')).map((option) => ({
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
  setSearchInput() {
    this.optionInput = this.dropdownInput.value;
    this.filteredOptions =
      this.optionInput !== ''
        ? this.options.filter((option) => option.label.toLowerCase().includes(this.optionInput.toLowerCase()))
        : this.options;
  }
  /**
   * Listens to checkbox change for search dropdown
   */
  handleCheckboxChange(ev) {
    if (ev.target.checked) {
      this.value = [
        ...(this.value || []),
        this.options.find(({ value }) => value === ev.target.id).value,
      ];
    }
    else {
      this.value = this.value.filter((val) => val !== ev.target.id);
    }
  }
  /**
   * Handles `Add` button click in search dropdown
   */
  handleAddClick() {
    this.fwOptionsAdd.emit({ value: this.value });
    this.handleDropdownToggle();
  }
  /**
   * Handles option select from the dropdown
   */
  handleOptionClick(option) {
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
      return (h("fw-icon", { name: `chevron-${direction}`, color: iconColor, size: iconSize }, ' '));
    };
    const DropdownMenu = () => {
      const SearchInput = () => {
        return (h("fw-input", { placeholder: this.placeholder, "icon-left": 'search', ref: (dropdownInput) => (this.dropdownInput = dropdownInput), onInput: () => this.setSearchInput() }));
      };
      const renderBtnGroup = () => {
        return (h("div", { class: 'search-btn-grp' }, h("fw-button", { id: 'addBtn', size: 'small', color: 'primary', onClick: () => this.handleAddClick() }, ' ', "Add", ' '), h("fw-button", { id: 'cancelBtn', size: 'small', color: 'secondary', onClick: () => this.handleDropdownToggle() }, ' ', "Cancel", ' ')));
      };
      const validOptions = this.searchable
        ? this.filteredOptions
        : this.options;
      return (h("ul", { class: `dropdown-menu ${this.isDropdownOpen ? 'dropdown-menu--open' : ''}` }, this.searchable ? h(SearchInput, null) : '', h("div", { class: this.searchable ? `search-list` : '' }, validOptions.map((option) => {
        const liEl = (h("li", { class: 'dropdown-item-wrapper' }, h("button", { key: option.id || option.value, onClick: () => this.handleOptionClick(option), class: 'dropdown-item', onKeyDown: handleKeyDown(() => this.handleOptionClick(option)) }, ' ', option.label, ' ')));
        const checkboxEl = (h("fw-checkbox", { id: option.value, checked: (this.value || []).includes(option.value), onFwChange: (e) => this.handleCheckboxChange(e) }));
        return this.searchable ? (h("div", { class: 'searchable-item' }, ' ', checkboxEl, " ", liEl, ' ')) : (liEl);
      })), this.searchable ? renderBtnGroup() : ''));
    };
    const DropdownState = () => !this.split ? (h("span", { class: 'down-arrow' }, h(ChevronArrow, null))) : ('');
    const SplitDropdownState = () => {
      const dropdownStateClasses = `
        dropdown-state
        ${'dropdown-state--' + this.color.toLowerCase()}
        ${this.disabled ? 'disabled' : ''}
      `;
      return this.split ? (h("div", { role: 'button', tabindex: '0', onClick: () => this.handleDropdownToggle(), class: dropdownStateClasses, onKeyDown: handleKeyDown(this.handleDropdownToggle) }, h("div", { class: 'state-icon' }, h(ChevronArrow, null)))) : ('');
    };
    return (h("div", { class: 'dropdown-container' }, h("div", { class: 'btn-container' }, h("fw-button", { color: this.color, disabled: this.disabled, onClick: () => this.handleDropdownToggle() }, this.label, h(DropdownState, null)), h(SplitDropdownState, null)), h(DropdownMenu, null)));
  }
  componentWillLoad() {
    document.addEventListener('click', (e) => {
      const { target } = e;
      const canClose = this.isDropdownOpen &&
        this.host !== target &&
        !this.host.contains(target);
      if (canClose) {
        this.isDropdownOpen = false;
      }
    });
    this.setDropdownOptions();
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "isDropdownOpen": ["setInitialState"]
  }; }
};
DropdownButton.style = dropdownButtonCss;

export { DropdownButton as fw_dropdown_button };
