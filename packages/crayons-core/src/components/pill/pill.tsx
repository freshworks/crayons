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

  componentWillLoad(): void {
    this.hasIcon = !!this.el.querySelector('[slot="icon"');
    this.pillClass = this.getPillClass(this.color);
  }

  getPillClass(color: string): string {
    return color ? `pill pill--${color.toLowerCase()}` : 'pill';
  }

  render(): JSX.Element {
    return (
      <span class={this.getPillClass(this.color)}>
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
