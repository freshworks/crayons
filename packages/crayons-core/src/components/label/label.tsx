import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-label',
  styleUrl: 'label.scss',
  shadow: true,
})
export class Label {
  /**
   * Theme based on which the label is styled.
   */
  @Prop() color: 'blue' | 'red' | 'green' | 'yellow' | 'grey' | 'normal' =
    'normal';
  /**
   * Display text in the label.
   */
  @Prop() value = '';

  render() {
    return (
      <span class={'label label--' + this.color.toLowerCase()}>
        {this.value}
      </span>
    );
  }
}
