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
