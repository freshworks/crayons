import { Component, Element, h } from '@stencil/core';

import { observeRTL } from '../../utils';

@Component({
  tag: 'fw-menu',
  styleUrl: 'menu.scss',
  shadow: true,
})
export class Menu {
  @Element() host: HTMLElement;
  private rtlObserver: any = null;

  connectedCallback() {
    this.rtlObserver = observeRTL(this.host.shadowRoot);
  }

  disconnectedCallback() {
    this.rtlObserver?.destroy();
  }

  render() {
    return (
      <div class='menu' role='menu'>
        <slot></slot>
      </div>
    );
  }
}
