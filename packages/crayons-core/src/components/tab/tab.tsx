import { Component, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';

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

  /**
   * Triggered when either tabHeader or tabHeaderHtml changes.
   */
  @Event() propChanged: EventEmitter;

  @Watch('tabHeader')
  tabHeaderHandler() {
    this.propChanged.emit();
  }

  @Watch('tabHeaderHtml')
  tabHeaderHtmlHandler() {
    this.propChanged.emit();
  }

  render() {
    return (
      <Host class="tab">
        <slot />
      </Host>
    );
  }
}
