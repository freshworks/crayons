import { Component, Prop, Listen, h, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'fw-nested-select',
  styleUrl: 'nested-select.scss',
  shadow: true,
})
export class NestedSelect {
  private selections = [];
  private selectedItems = {};
  /**
   * Options to display
   */
  @Prop() options = [];
  /**
   * Name of first level field
   */
  @Prop() name = '';
  /**
   * Initial value from first level choices
   */
  @Prop() value = '';
  /**
   * OptionValuePath referred from field
   */
  @Prop() optionValuePath = 'id';
  /**
   * OptionLabelPath referred from field
   */
  @Prop() optionLabelPath = 'label';
  /**
   * Function to return initialValues
   */
  @Prop() selectProps?: any;
  /**
   * Triggered when nested selection doesn't have choices
   */
  @Event() fwChange: EventEmitter;

  @Listen('fwChange')
  changed(event) {
    if (!event.detail.meta) {
      return;
    }

    this.selections[event.detail.level] = event.detail.meta.selectedOptions[0];
    const itemsToRemove = this.selections.length - (event.detail.level + 1);
    if (itemsToRemove > 0) {
      this.selections = this.selections.slice(0, event.detail.level + 1);
    }
    this.getSelectedId(this.selections[event.detail.level], event.detail.name);

    if (!this.selections[event.detail.level].choices) {
      this.fwChange.emit({ ...this.selectedItems });
    }
  }

  private getSelectedId(selectedValues, name) {
    const id = selectedValues[this.optionValuePath];
    if (id) {
      this.selectedItems = {
        ...this.selectedItems,
        [name]: selectedValues[this.optionValuePath],
      };
    } else {
      delete this.selectedItems[name];
    }
  }
  render() {
    return (
      <fw-nested-node
        options={this.options}
        name={this.name}
        value={this.value}
        optionValuePath={this.optionValuePath}
        selectProps={this.selectProps}
      ></fw-nested-node>
    );
  }
}
