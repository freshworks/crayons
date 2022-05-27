import { Component, Element, h } from '@stencil/core';
import { observeRTL } from '../../utils';

@Component({
  tag: 'fw-modal-content',
  styleUrl: 'modal-content.scss',
  shadow: true,
})
export class ModalContent {
  @Element() host: HTMLElement;
  private rtlObserver: any = null;

  connectedCallback() {
    this.rtlObserver = observeRTL(this.host.shadowRoot);
  }
  disconnectedCallback() {
    this.rtlObserver?.destroy();
  }
  /**
   * render the slot content directly
   * @returns {JSX.Element}
   */
  render(): JSX.Element {
    return (
      <div class='content'>
        <slot></slot>
      </div>
    );
  }
}
