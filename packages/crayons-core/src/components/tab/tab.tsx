import { Component, Host, Prop, h, Element } from '@stencil/core';

let counter = 0;
@Component({
  tag: 'fw-tab',
  styleUrl: 'tab.scss',
  shadow: true,
})
export class Tab {
  @Element() el: HTMLElement;

  /**
   * Unique name of the tab.
   */
  @Prop() tabName: string;

  /**
   * Disables this tab
   */
  @Prop() disabled: boolean;

  /**
   * Determines whether the tab is active.
   */
  @Prop() active: boolean;

  connectedCallback() {
    if (!this.tabName) {
      this.el.id = `fw-tab-${counter++}`;
    } else {
      this.el.id = this.tabName;
      this.el.removeAttribute('tab-name');
    }
  }

  render() {
    return (
      <Host
        aria-disabled={this.disabled ? 'true' : 'false'}
        aria-selected={this.active ? 'true' : 'false'}
        tabindex={this.disabled || !this.active ? '-1' : '0'}
        role='tab'
        class={
          'tab ' +
          (this.disabled ? 'disabled' : '') +
          (this.active ? 'active' : '')
        }
      >
        <slot />
      </Host>
    );
  }
}
