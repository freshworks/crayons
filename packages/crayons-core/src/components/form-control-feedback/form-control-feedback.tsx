import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-form-control-feedback',
  styleUrl: 'form-control-feedback.scss',
  shadow: true,
})
export class FormControlFeedback {
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
