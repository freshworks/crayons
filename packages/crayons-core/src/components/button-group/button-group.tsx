import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'fw-button-group',
  styleUrl: 'button-group.scss',
  shadow: true,
})
export class ButtonGroup {
  @Prop({ mutable: true }) label = '';
  @Element() host: HTMLElement;
  private observer?: MutationObserver;

  connectedCallback() {
    this.observer = new MutationObserver(() => {
      this.handleSlotChange();
    });
    this.observer.observe(this.host, {
      childList: true,
    });
  }

  componentDidLoad() {
    this.handleSlotChange();
  }

  handleSlotChange() {
    if (!this.host) return;
    const slottedElements = this.host.querySelectorAll('fw-button');
    slottedElements.forEach((button, index) => {
      button.classList.add('fw-button-group__button');
      button.classList.toggle('fw-button-group__button--first', index === 0);
      button.classList.toggle(
        'fw-button-group__button--inner',
        index > 0 && index < slottedElements.length - 1
      );
      button.classList.toggle(
        'fw-button-group__button--last',
        index === slottedElements.length - 1
      );
    });
  }

  disconnectCallback() {
    this.observer?.disconnect();
  }

  render() {
    return (
      <Host aria-label={this.label}>
        <slot />
      </Host>
    );
  }
}
