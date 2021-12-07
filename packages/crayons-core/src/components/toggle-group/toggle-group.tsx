import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  Watch,
  Listen,
  h,
  State,
} from '@stencil/core';

@Component({
  tag: 'fw-toggle-group',
  styleUrl: 'toggle-group.scss',
  shadow: true,
})
export class ToggleGroup {
  @Element() host!: HTMLElement;

  private arrChildElements;
  private selectedIndex = -1;

  /**
   * Boolean value to allow multiple selection or single child selection
   */
  @Prop() multiple = false;
  /**
   * Selected items to be shown - stored in array format - if property "multiple" is set to false, this will always be a single value array
   */
  @Prop({ mutable: true }) selectedValues = null;
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

  @Watch('selectedValues')
  watchSelectedValuesChangeHandler() {
    this.parseSelectedItems();
    this.updateSelection();
  }

  @Listen('keyup')
  keyupHandler(event: KeyboardEvent) {
    const arrChildren = this.arrChildElements;
    if (!arrChildren || arrChildren.length === 0) {
      return;
    }

    if (this.selectedIndex < 0) {
      this.selectedIndex = 0;
    }
    const intPrevSelectedIndex = this.selectedIndex;

    switch (event.code) {
      case 'ArrowDown':
      case 'ArrowRight':
        arrChildren[intPrevSelectedIndex].setAttribute('tabindex', '-1');

        // set currently selectedIndex using roving tabindex technique
        this.selectedIndex = ++this.selectedIndex % arrChildren.length;
        arrChildren[this.selectedIndex].setAttribute('tabindex', '0');
        arrChildren[this.selectedIndex].focus();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        arrChildren[intPrevSelectedIndex].setAttribute('tabindex', '-1');
        this.selectedIndex =
          this.selectedIndex === 0
            ? arrChildren.length - 1
            : --this.selectedIndex;
        arrChildren[this.selectedIndex].setAttribute('tabindex', '0');
        arrChildren[this.selectedIndex].focus();
        break;
      case 'Enter':
      case 'Space':
        arrChildren[this.selectedIndex].focus();
        if (!this.multiple && arrChildren[this.selectedIndex].selected) {
          return;
        }
        // eslint-disable-next-line no-case-declarations
        const boolApplySelectChild = this.multiple
          ? !arrChildren[this.selectedIndex].selected
          : true;

        this.selectItem(
          boolApplySelectChild,
          arrChildren[this.selectedIndex].value,
          this.selectedIndex
        );
        break;
    }
  }

  @Listen('fwToggled')
  toggleChangeHandler(event: CustomEvent) {
    const objDetail = event.detail;
    const strValue = objDetail.value;
    const intChildIndex = objDetail.index;
    const boolChildSelected = objDetail.selected;
    this.selectItem(boolChildSelected, strValue, intChildIndex);
  }

  private selectItem(
    boolChildSelected: boolean,
    strValue: string,
    intChildIndex: number
  ) {
    if (!this.arrSelectedItems) {
      this.arrSelectedItems = [];
    }

    const isValueStored = this.arrSelectedItems.includes(strValue);
    if (!boolChildSelected && this.multiple && isValueStored) {
      let intSelectedChildIndex = -1;
      const intLength = this.arrSelectedItems.length;
      for (let i1 = 0; i1 < intLength; i1++) {
        const strSelectedItemValue = this.arrSelectedItems[i1];
        if (strSelectedItemValue === strValue) {
          intSelectedChildIndex = i1;
          break;
        }
      }

      this.arrSelectedItems = [
        ...this.arrSelectedItems.slice(0, intSelectedChildIndex),
        ...this.arrSelectedItems.slice(intSelectedChildIndex + 1),
      ];
    } else if (boolChildSelected && !isValueStored) {
      if (this.multiple) {
        this.arrSelectedItems = [...this.arrSelectedItems, strValue];
      } else {
        this.arrSelectedItems = [strValue];
      }
    }

    this.selectedIndex = intChildIndex;
    const strDispatchSelectedValues = this.arrSelectedItems.toString();
    this.selectedValues = strDispatchSelectedValues;
    this.fwChange.emit({ selectedValues: strDispatchSelectedValues });
  }

  private parseSelectedItems() {
    this.arrSelectedItems =
      this.selectedValues && this.selectedValues !== ''
        ? this.selectedValues.split(',')
        : null;
  }

  componentWillLoad() {
    this.parseSelectedItems();
  }

  componentDidLoad() {
    const elHost = this.host;
    this.arrChildElements = elHost.children;
    this.updateSelection(true);
  }

  private updateSelection(boolSetRadioCheckboxType = false) {
    const arrChildrenNodes = this.arrChildElements;
    if (!arrChildrenNodes || arrChildrenNodes.length === 0) {
      return;
    }

    const intLength = arrChildrenNodes.length;
    for (let i1 = 0; i1 < intLength; i1++) {
      const elChild = arrChildrenNodes[i1];
      const strChildValue = elChild.value;
      elChild.index = i1;

      if (boolSetRadioCheckboxType) {
        elChild.isCheckbox = this.multiple;
      }

      const boolItemSelected =
        this.arrSelectedItems && this.arrSelectedItems.includes(strChildValue)
          ? true
          : false;
      elChild.selected = boolItemSelected;

      if (boolItemSelected && this.selectedIndex === -1) {
        this.selectedIndex = i1;
        elChild.setAttribute('tabindex', '0');
      } else {
        elChild.setAttribute('tabindex', '-1');
      }
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
