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

  componentWillLoad(): void {
    this.handleSlotChange();
  }

  getPillClass(color: string): string {
    return color ? `pill pill--${color.toLowerCase()}` : 'pill';
  }

  handleSlotChange(): void {
    this.hasIcon = !!this.el.querySelector('[slot="icon"');
  }

  render(): JSX.Element {
    return (
      <span class={this.getPillClass(this.color)}>
        {this.hasIcon && (
          <div class='pill-icon'>
            <slot name='icon' />
          </div>
        )}
        <slot onSlotchange={() => this.handleSlotChange()}></slot>
      </span>
    );
  }
}
