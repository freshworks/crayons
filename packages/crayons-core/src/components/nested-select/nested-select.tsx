import { Component, Prop, State, Listen, h, Watch } from '@stencil/core';

@Component({
  tag: 'fw-nested-select',
  styleUrl: 'nested-select.scss',
  shadow: true,
})
export class NestedSelect {
  @Prop() options = [];
  private selections = [];
  @Listen('fwChange')
  changed(event) {
    this.selections[event.detail.level] = event.detail.meta.selectedOptions[0];

    const itemsToRemove = this.selections.length - (event.detail.level + 1);
    console.log(
      'SPLICE VALS ARE ' +
        this.selections.length +
        ':::' +
        event.detail.level +
        ':::' +
        itemsToRemove
    );
    if (itemsToRemove > 0) {
      this.selections = this.selections.slice(0, event.detail.level + 1);
    }
    console.log(this.selections, this.selections.length + 1);
  }
  render() {
    return <fw-nested-node options={this.options}></fw-nested-node>;
  }
}
