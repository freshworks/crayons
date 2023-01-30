export function fwChangeHandler(selectedItem, shouldCloseDropdown) {
  if (selectedItem.composedPath()[0].tagName === 'FW-LIST-OPTIONS') {
    this.selectedOptionsState = selectedItem.detail?.meta?.selectedOptions;
    this.value = selectedItem.detail.value;
    this.renderInput();
    if (shouldCloseDropdown) {
      this.closeDropdown();
    }
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

export function expandHandler(expanded) {
  const icon = this.host.shadowRoot
    ?.querySelector('.select-container')
    ?.querySelector('fw-button')
    ?.shadowRoot?.querySelector('fw-icon');
  icon && (icon.name = expanded ? 'chevron-up' : 'chevron-down');
}

export function initializeComponent() {
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
  const options = selectOptions.map((option: any) => {
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

export function renderInput() {
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

export function clearInput() {
  if (!this.multiple && this.value) {
    this.renderInput();
    return;
  }
  this.searchValue = '';
  if (this.selectInput) {
    this.selectInput.value = '';
  }
}

export function isValueEqual(value, option) {
  return this.multiple ? value.includes(option.value) : value === option.value;
}

export function valueExists() {
  return this.value && (this.multiple ? this.value.length > 0 : !!this.value);
}

export function optionsWatcher(newValue) {
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

export function focusHandler(event) {
  if (event.composedPath()[0].tagName === 'FW-SELECT-OPTION') {
    this.focusedOptionId = event.detail.id;
  }
}

export function blurHandler(event) {
  if (event.composedPath()[0].tagName === 'FW-SELECT-OPTION') {
    this.focusedOptionId = '';
  }
}

export function hideListHandler() {
  this.clearInput();
  this.isExpanded = false;
  this.multiple && this.selectInput?.focus();
}

export function changeEmittable() {
  return !this.disabled;
}

export function closeDropdown() {
  if (this.isExpanded && this.changeEmittable()) {
    this.popover.hide();
  }
}

export function openDropdown() {
  if (!this.isExpanded && this.changeEmittable()) {
    this.popover.show();
  }
}

export function innerOnBlur(e: Event) {
  if (this.changeEmittable()) {
    this.hasFocus = false;
    this.fwBlur.emit({
      event: e,
      name: this.name,
    });
  }
}

export function innerFocusHandler(e: Event) {
  this.hasFocus = true;
  this.fwFocus.emit(e);
}

export function innerClickHandler(shoudlOpenDropdown: boolean) {
  this.setFocus();
  // Select the whole text in case of single select
  this.multiple || this.selectInput?.select?.();
  if (shoudlOpenDropdown) {
    this.openDropdown();
  }
}
