import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-form-group',
  styleUrl: 'form-group.scss',
  shadow: true,
})
export class FormGroup {
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
    return (
      <div>
        Hello, World! I'm form group
        <br />
        <slot></slot>
      </div>
    );
  }
}
