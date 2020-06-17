import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-tab',
  styleUrl: 'tab.scss',
  shadow: true,
})

export class Tab {
  /**
   * Name of the tab displayed on the UI.
   */
  @Prop() tabHeader: string;

  /**
   * HTML that can be rendered in tab header.
   */
  @Prop() tabHeaderHtml: string;

  /**
   * Disables this tab
   */
  @Prop() disabled: boolean;

  render() {
    return (
      <Host class="tab">
        <slot/>
      </Host>
    );
  }
}
