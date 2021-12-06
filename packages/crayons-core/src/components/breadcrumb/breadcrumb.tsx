import { Component, Prop, h, Element, Host } from '@stencil/core';
import { hasSlot } from '../../utils';

@Component({
  tag: 'fw-breadcrumb',
  styleUrl: 'breadcrumb.scss',
  shadow: true,
})
export class Breadcrumb {
  @Element() host;

  /**
   * Label to be used for screen readers and other assistive devices.
   */
  @Prop() label = 'Breadcrumb';

  // Clone the separator to be used for each breadcrumb item
  private getSeparator() {
    const isCustomSeparator = hasSlot(this.host, 'separator');
    if (isCustomSeparator) {
      const separator = this.host.shadowRoot
        .querySelector("slot[name='separator']")
        .assignedElements({
          flatten: true,
        })[0] as HTMLElement;

      const clone = separator.cloneNode(true) as HTMLElement;
      clone.slot = 'separator';

      return clone;
    } else {
      // by default use the below icon as separator
      const node = document.createElement('fw-icon');
      node.name = 'chevron-right';
      node.slot = 'separator';
      return node;
    }
  }

  handleSlotChange(): void {
    const items = [
      ...this.host.shadowRoot
        .querySelector('slot')
        .assignedElements({ flatten: true }),
    ].filter((item) => item.tagName.toLowerCase() === 'fw-breadcrumb-item');

    items.map((item: HTMLElement, index) => {
      // Attach a separator to each item if the item doesn't have its own separator
      const separator = item.querySelector('[slot="separator"]') as HTMLElement;
      const textContent = item.textContent;
      if (!separator) {
        item.title = textContent;
        item.setAttribute('aria-label', textContent);
        item.append(this.getSeparator());
      }
      // The last breadcrumb item is the "current page"
      if (index === items.length - 1) {
        item.setAttribute('aria-current', 'page');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  render(): JSX.Element {
    return (
      <Host>
        <nav part='base' class='breadcrumb' aria-label={this.label}>
          <slot onSlotchange={() => this.handleSlotChange()}></slot>
        </nav>
        <slot name='separator' aria-hidden='true'></slot>
      </Host>
    );
  }
}
