import { Component, Element, Host, h } from '@stencil/core';
import { Sort } from '../../utils/sort';

@Component({
  tag: 'fw-sortable',
  styleUrl: 'sortable.scss',
})
export class Sortable {
  private sortInstance;

  @Element() host: HTMLElement;

  componentWillLoad() {
    this.sortInstance = new Sort(this.host);
  }

  disconnectedCallback() {
    this.sortInstance?.destroy();
  }

  render() {
    return <Host class='sortable-container'></Host>;
  }
}
