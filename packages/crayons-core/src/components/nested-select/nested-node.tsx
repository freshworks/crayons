import { Component, h, Listen, Prop, State } from '@stencil/core';

@Component({
  tag: 'fw-nested-node',
  styleUrl: 'nested-select.scss',
  shadow: true,
})
export class NestedNode {
  @Prop() options = [];

  @State() selectedOption = null;

  @Listen('fwChange')
  changed(event) {
    console.log('IN CHANGE', event);
    if (event.detail.meta.selectedOptions[0]?.choices) {
      this.selectedOption = event.detail.meta.selectedOptions[0];
      console.log('HERE 1', this.selectedOption);
    }
  }

  render() {
    console.log('RENDERING', this.options);
    return (
      <div>
        <fw-select options={this.options}></fw-select>
        {this.selectedOption ? (
          <fw-nested-node
            options={this.selectedOption.choices}
          ></fw-nested-node>
        ) : null}
      </div>
    );
  }
}
