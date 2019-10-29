import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-label',
  styleUrl: 'label.scss',
  shadow: true,
})
export class Label {
  /**
   * The type of the label
   */
  @Prop() type = 'default';
  /**
   * The text in the label
   */
  @Prop() value = '';

  render() {
    return <span class={'label ' + this.type.toLowerCase()}>{this.value}</span>;
  }
}
