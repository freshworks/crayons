import { r as registerInstance, h as createEvent, i as h, k as Host, j as getElement } from './index-44c267ce.js';

/* tslint:enable */
// function to parse string or array as input and return the array state value
function validateAndParseInputSelectedValues(inputValue) {
  let arrParsedValues = [];
  let boolArrayInput = false;
  const strParsedValues = inputValue ? inputValue.toString() : '';
  if (inputValue) {
    boolArrayInput = Array.isArray(inputValue) ? true : false;
    if (boolArrayInput) {
      arrParsedValues = [...inputValue];
    }
    else {
      arrParsedValues =
        strParsedValues !== '' ? strParsedValues.split(',') : [];
    }
  }
  return {
    isArray: boolArrayInput,
    strSelectedValues: strParsedValues,
    arrSelectedValues: arrParsedValues,
  };
}
// function to return the selected values
function updateSelectedValues(arrChildElements = null, intSelectedIndex = -1, boolSelected = true, boolMultipleSelection = false, arrSelectedValues = null) {
  // Check if the values passed for setting the selected index and child elements array are valid
  if (intSelectedIndex < 0 ||
    !arrChildElements ||
    arrChildElements.length <= 0 ||
    intSelectedIndex > arrChildElements.length - 1) {
    return arrSelectedValues;
  }
  if (!arrSelectedValues) {
    arrSelectedValues = [];
  }
  const strValue = arrChildElements[intSelectedIndex].value;
  const isValueStored = arrSelectedValues.length > 0 ? arrSelectedValues.includes(strValue) : false;
  // if loop to deselect the child item provided multiple selection is allowed
  if (!boolSelected && boolMultipleSelection && isValueStored) {
    let intSelectedChildIndex = -1;
    const intLength = arrSelectedValues.length;
    for (let i1 = 0; i1 < intLength; i1++) {
      if (arrSelectedValues[i1] === strValue) {
        intSelectedChildIndex = i1;
        break;
      }
    }
    // remove the selected item from the selected items array
    arrSelectedValues = [
      ...arrSelectedValues.slice(0, intSelectedChildIndex),
      ...arrSelectedValues.slice(intSelectedChildIndex + 1),
    ];
  }
  else if (boolSelected && !isValueStored) {
    if (boolMultipleSelection) {
      arrSelectedValues = [...arrSelectedValues, strValue];
    }
    else {
      arrSelectedValues = [strValue];
    }
  }
  return arrSelectedValues;
}
// function to update the selected state of the child - for both multiple selection and radio group support - based on the passed values argument
function updateChildSelectionState(arrChildElements = null, boolMultipleSelection = false, arrSelectedValues = null, boolSetCheckboxType = false) {
  if (!arrChildElements || arrChildElements.length === 0) {
    return -1;
  }
  let numSelectedIndex = -1;
  let boolFirstItemSetSelected = false;
  const intLength = arrChildElements.length;
  for (let i1 = 0; i1 < intLength; i1++) {
    const elChild = arrChildElements[i1];
    const strChildValue = elChild.value;
    elChild.index = i1;
    if (boolSetCheckboxType) {
      elChild.isCheckbox = boolMultipleSelection;
    }
    const boolItemSelected = arrSelectedValues && arrSelectedValues.includes(strChildValue)
      ? true
      : false;
    let boolApplySelection = boolItemSelected;
    if (!boolMultipleSelection) {
      if (!boolFirstItemSetSelected && boolItemSelected) {
        boolFirstItemSetSelected = true;
        boolApplySelection = true;
      }
      else {
        boolApplySelection = false;
      }
    }
    elChild.selected = boolApplySelection;
    if (boolApplySelection && numSelectedIndex === -1) {
      numSelectedIndex = i1;
      elChild.setAttribute('tabindex', '0');
    }
    else {
      elChild.setAttribute('tabindex', '-1');
    }
  }
  return numSelectedIndex;
}
// function to validate the arrow and select the susequent children based on key press
function doKeyDownOperations(keyCode, arrChildElements = null, intCurrentIndex = 0, boolMultipleSelection = false) {
  // check for the valid children
  if (!arrChildElements || arrChildElements.length === 0) {
    return { index: intCurrentIndex, changeSelection: false, selected: false };
  }
  if (intCurrentIndex < 0) {
    intCurrentIndex = 0;
  }
  switch (keyCode) {
    case 'ArrowDown':
    case 'ArrowRight':
      arrChildElements[intCurrentIndex].setAttribute('tabindex', '-1');
      // set currently selectedIndex using roving tabindex technique
      intCurrentIndex = ++intCurrentIndex % arrChildElements.length;
      arrChildElements[intCurrentIndex].setAttribute('tabindex', '0');
      arrChildElements[intCurrentIndex].setFocus();
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      arrChildElements[intCurrentIndex].setAttribute('tabindex', '-1');
      intCurrentIndex =
        intCurrentIndex === 0 ? arrChildElements.length - 1 : --intCurrentIndex;
      arrChildElements[intCurrentIndex].setAttribute('tabindex', '0');
      arrChildElements[intCurrentIndex].setFocus();
      break;
    case 'Enter':
    case 'Space': {
      arrChildElements[intCurrentIndex].setFocus();
      const boolCurrentItemSelection = arrChildElements[intCurrentIndex].selected;
      // return if multiple selection in the group is not allowed and the item is already selected
      if (!boolMultipleSelection && boolCurrentItemSelection) {
        return;
      }
      const boolApplySelectState = boolMultipleSelection
        ? !boolCurrentItemSelection
        : true;
      return {
        index: intCurrentIndex,
        changeSelection: true,
        selected: boolApplySelectState,
      };
    }
  }
  return {
    index: intCurrentIndex,
    changeSelection: false,
    selected: false,
  };
}

const toggleGroupCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:0;gap:12px}";

let ToggleGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.selectedIndex = -1;
    this.isInputFormatArray = false;
    /**
     * Boolean value to allow multiple selection or single child selection
     */
    this.multiple = false;
    /**
     * Selected items to be shown - stored in array format - if property "multiple" is set to false, this will always be a single value array
     */
    this.value = null;
    /**
     * Internal state of array items store the selected items
     */
    this.arrSelectedItems = null;
    /**
     * Label for the component, that can be used by screen readers.
     */
    this.label = '';
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
  }
  // public method to set selected values
  async setSelectedValues(values) {
    this.value = values;
  }
  watchSelectedValuesChangeHandler() {
    this.parseSelectedItems();
    this.updateSelection();
  }
  keyupHandler(event) {
    const arrChildren = this.arrChildElements;
    if (!arrChildren || arrChildren.length === 0) {
      return;
    }
    const objResponse = doKeyDownOperations(event.code, this.arrChildElements, this.selectedIndex, this.multiple);
    this.selectedIndex = objResponse.index;
    if (objResponse.changeSelection) {
      const arrUpdatedSelectionItems = updateSelectedValues(arrChildren, this.selectedIndex, objResponse.selected, this.multiple, this.arrSelectedItems);
      this.arrSelectedItems = [...arrUpdatedSelectionItems];
      this.dispatchSelectionChangeEvent();
    }
  }
  toggleChangeHandler(event) {
    const objDetail = event.detail;
    this.selectedIndex = objDetail.index;
    const arrUpdatedSelectionItems = updateSelectedValues(this.arrChildElements, this.selectedIndex, objDetail.selected, this.multiple, this.arrSelectedItems);
    this.arrSelectedItems = arrUpdatedSelectionItems;
    this.dispatchSelectionChangeEvent();
  }
  componentWillLoad() {
    this.parseSelectedItems();
  }
  componentDidLoad() {
    const elHost = this.host;
    this.arrChildElements = elHost.children;
    this.updateSelection(true);
  }
  dispatchSelectionChangeEvent() {
    const strDispatchSelectedValues = this.arrSelectedItems.toString();
    if (strDispatchSelectedValues !== this.value) {
      this.value = strDispatchSelectedValues;
      this.fwChange.emit({
        value: !this.isInputFormatArray
          ? strDispatchSelectedValues
          : [...this.arrSelectedItems],
      });
    }
  }
  parseSelectedItems() {
    const objResponse = validateAndParseInputSelectedValues(this.value);
    if (this.value !== objResponse.strSelectedValues) {
      this.value = objResponse.strSelectedValues;
    }
    this.isInputFormatArray = objResponse.isArray;
    this.arrSelectedItems = objResponse.arrSelectedValues;
  }
  updateSelection(boolSetRadioCheckboxType = false) {
    const intUpdatedIndex = updateChildSelectionState(this.arrChildElements, this.multiple, this.arrSelectedItems, boolSetRadioCheckboxType);
    // for the first time when the component is loaded and the selectedIndex is not set
    if (intUpdatedIndex !== -1 && this.selectedIndex === -1) {
      this.selectedIndex = intUpdatedIndex;
    }
  }
  render() {
    return (h(Host, { "aria-label": this.label }, h("slot", null)));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "value": ["watchSelectedValuesChangeHandler"]
  }; }
};
ToggleGroup.style = toggleGroupCss;

export { ToggleGroup as fw_toggle_group };
