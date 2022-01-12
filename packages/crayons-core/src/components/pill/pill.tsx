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
  @Prop() color: 'blue' | 'red' | 'green' | 'yellow' | 'grey';

  hasIcon: boolean;
  pillClass: string;

  componentWillLoad() {
    this.hasIcon = !!this.el.querySelector('[slot="icon"');
    this.pillClass = this.color
      ? `pill pill--${this.color.toLowerCase()}`
      : 'pill';
  }

  render() {
    return (
      <span class={this.pillClass}>
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
