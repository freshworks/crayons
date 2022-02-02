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
   * Header for the tab to be displayed.
   */
  @Prop() tabHeader: string;

  /**
   * Disables this tab
   */
  @Prop({ reflect: true }) disabled: boolean;

  /**
   * Determines whether the tab is active.
   */
  @Prop({ reflect: true }) active: boolean;

  /**
   * The name of the tab panel which this tab controls.
   */
  @Prop({ reflect: true }) panel: string;

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
      >
        <div
          class={
            'tab ' +
            (this.disabled ? 'disabled' : '') +
            (this.active ? 'active' : '')
          }
        >
          {this.tabHeader ? this.tabHeader : <slot />}
        </div>
      </Host>
    );
  }
}
