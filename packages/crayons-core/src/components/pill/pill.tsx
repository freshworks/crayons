import { Component, Element, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-pill',
  styleUrl: 'pill.scss',
  shadow: true,
})
export class Pill {
  @Element() el: HTMLFwPillElement;

  /**
   * Theme based on which the pill is styled.
   */
  @Prop() color: 'blue' | 'red' | 'green' | 'yellow' | 'grey' | 'custom' =
    'grey';

  hasIcon: boolean;

  componentWillLoad() {
    this.hasIcon = !!this.el.querySelector('[slot="icon"');
  }

  render() {
    return (
      <span class={`pill pill--${this.color.toLowerCase()}`}>
        {this.hasIcon && (
          <div class='pill-icon'>
            <slot name='icon' />
          </div>
        )}

        <slot></slot>
      </span>
    );
  }
}
