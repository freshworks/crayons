import { Component, h } from '@stencil/core';

@Component({
  tag: 'fw-modal-content',
  styleUrl: 'modal-content.scss',
  shadow: true,
})
export class ModalContent {
  render(): JSX.Element {
    return <slot></slot>;
  }
}
