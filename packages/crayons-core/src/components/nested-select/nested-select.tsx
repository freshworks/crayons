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
   * label
   */
  @Prop() label = '';
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
  @Prop() optionLabelPath = 'value';
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
    const { meta, level, name } = event.detail;

    if (!meta) {
      return;
    }

    this.selections[level] = meta.selectedOptions[0];
    const itemsToRemove = this.selections.length - (level + 1);
    if (itemsToRemove > 0) {
      this.selections = this.selections.slice(0, level + 1);
    }

    if (Array.isArray(this.selections) && this.selections[level]) {
      this.getSelectedId(this.selections[level], name);

      if (!this.selections[level]?.choices) {
        this.fwChange.emit({ ...this.selectedItems });
      }
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
        label={this.label}
        optionValuePath={this.optionValuePath}
        optionLabelPath={this.optionLabelPath}
        selectProps={this.selectProps}
      ></fw-nested-node>
    );
  }
}
