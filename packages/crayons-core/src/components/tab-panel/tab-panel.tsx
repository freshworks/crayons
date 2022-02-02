import { Component, Host, Prop, h, Element } from '@stencil/core';

let counter = 0;

@Component({
  tag: 'fw-tab-panel',
  styleUrl: 'tab-panel.scss',
  shadow: true,
})
export class Panel {
  @Element() el: HTMLElement;
  /**
   * The panel name.
   */
  @Prop({ reflect: true }) name = '';

  /**
   * If true sets the panel display to block, none otherwise.
   */
  @Prop({ reflect: true }) active = false;

  connectedCallback() {
    if (!this.el.id) {
      this.el.id = `fw-tab-panel-${counter++}`;
    }
  }

  render() {
    this.el.style.display = this.active ? 'block' : 'none';
    return (
      <Host role='tabpanel' aria-hidden={this.active ? 'false' : 'true'}>
        <slot />
      </Host>
    );
  }
}
