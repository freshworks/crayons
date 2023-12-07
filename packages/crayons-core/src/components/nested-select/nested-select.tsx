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
    this.selectedItems[name] = level;

    const itemsToRemove = this.selections.length - (level + 1);
    if (itemsToRemove > 0) {
      this.selections = this.selections.slice(0, level + 1);
    }

    this.triggerValueChange(name);
  }

  // Adding nameToExclude to avoid multiple emit from select and nested select
  private triggerValueChange(nameToExclude) {
    const keys = Object.keys(this.selectedItems);

    keys.forEach((key) => {
      if (nameToExclude !== key) {
        const level = this.selectedItems[key];
        const value = this?.selections[level]?.[this.optionValuePath] || '';

        this.fwChange.emit({
          name: key,
          value,
        });
      }
    });
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
