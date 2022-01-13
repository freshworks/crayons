import { Component, h } from '@stencil/core';

@Component({
  tag: 'fw-menu',
  styleUrl: 'menu.scss',
  shadow: true,
})
export class Menu {
  render() {
    return (
      <div class='menu' role='menu'>
        <slot></slot>
      </div>
    );
  }
}
