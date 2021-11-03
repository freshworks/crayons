import { Component, h } from '@stencil/core';

@Component({
  tag: 'fw-modal-content',
  styleUrl: 'modal-content.scss',
  shadow: true,
})
export class ModalContent {
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
