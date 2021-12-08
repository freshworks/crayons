import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-form-label',
  styleUrl: 'form-label.scss',
  shadow: true,
})
export class FormLabel {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  render() {
    return <slot></slot>;
  }
}
