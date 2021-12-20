import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  Watch,
  Listen,
  h,
  State,
} from '@stencil/core';

import {
  updateSelectedValues,
  doKeyDownOperations,
  updateChildSelectionState,
  validateAndParseInputSelectedValues,
} from '../../utils/list-utils';

@Component({
  tag: 'fw-toggle-group',
  styleUrl: 'toggle-group.scss',
  shadow: true,
})
export class ToggleGroup {
  @Element() host!: HTMLElement;

  private arrChildElements;
  private selectedIndex = -1;
  private isInputFormatArray = false;

  /**
   * Boolean value to allow multiple selection or single child selection
   */
  @Prop() multiple = false;
  /**
   * Selected items to be shown - stored in array format - if property "multiple" is set to false, this will always be a single value array
   */
  @Prop({ mutable: true }) value = null;
  /**
   * Internal state of array items store the selected items
   */
  @State() arrSelectedItems: string[] = null;
  /**
   * Label for the component, that can be used by screen readers.
   */
  @Prop() label = '';
  /**
   * Name of the component, saved as part of form data.
   */
  @Prop() name = '';

  /**
   * Triggered when an option in the Toggle Group is selected or deselected.
   */
  @Event() fwChange!: EventEmitter;

  // public method to set selected values
  @Method()
  async setSelectedValues(values: string | string[]): Promise<void> {
    this.value = values;
  }

  @Watch('value')
  watchSelectedValuesChangeHandler(): void {
    this.parseSelectedItems();
    this.updateSelection();
  }

  @Listen('keyup')
  keyupHandler(event: KeyboardEvent): void {
    const arrChildren = this.arrChildElements;
    if (!arrChildren || arrChildren.length === 0) {
      return;
    }

    const objResponse = doKeyDownOperations(
      event.code,
      this.arrChildElements,
      this.selectedIndex,
      this.multiple
    );
    this.selectedIndex = objResponse.index;

    if (objResponse.changeSelection) {
      const arrUpdatedSelectionItems = updateSelectedValues(
        arrChildren,
        this.selectedIndex,
        objResponse.selected,
        this.multiple,
        this.arrSelectedItems
      );

      this.arrSelectedItems = [...arrUpdatedSelectionItems];
      this.dispatchSelectionChangeEvent();
    }
  }

  @Listen('fwToggled')
  toggleChangeHandler(event: CustomEvent): void {
    const objDetail = event.detail;
    this.selectedIndex = objDetail.index;

    const arrUpdatedSelectionItems = updateSelectedValues(
      this.arrChildElements,
      this.selectedIndex,
      objDetail.selected,
      this.multiple,
      this.arrSelectedItems
    );
    this.arrSelectedItems = arrUpdatedSelectionItems;
    this.dispatchSelectionChangeEvent();
  }

  componentWillLoad(): void {
    this.parseSelectedItems();
  }

  componentDidLoad(): void {
    const elHost = this.host;
    this.arrChildElements = elHost.children;
    this.updateSelection(true);
  }

  private dispatchSelectionChangeEvent() {
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

  private parseSelectedItems() {
    const objResponse = validateAndParseInputSelectedValues(this.value);
    if (this.value !== objResponse.strSelectedValues) {
      this.value = objResponse.strSelectedValues;
    }
    this.isInputFormatArray = objResponse.isArray;
    this.arrSelectedItems = objResponse.arrSelectedValues;
  }

  private updateSelection(boolSetRadioCheckboxType = false) {
    const intUpdatedIndex = updateChildSelectionState(
      this.arrChildElements,
      this.multiple,
      this.arrSelectedItems,
      boolSetRadioCheckboxType
    );

    // for the first time when the component is loaded and the selectedIndex is not set
    if (intUpdatedIndex !== -1 && this.selectedIndex === -1) {
      this.selectedIndex = intUpdatedIndex;
    }
  }

  render() {
    return (
      <Host aria-label={this.label}>
        <slot></slot>
      </Host>
    );
  }
}
