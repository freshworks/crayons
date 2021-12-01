import { Component, Element, Prop, h, State } from '@stencil/core';
import { hasSlot } from '../../utils';

@Component({
  tag: 'fw-breadcrumb-item',
  styleUrl: 'breadcrumb-item.scss',
  shadow: true,
})
export class BreadcrumbItem {
  @Element() host: HTMLElement;
  @State() hasPrefix = false;
  @State() hasSuffix = false;

  /**
   * Optional URL to direct the user to when the breadcrumb item is clicked. When set, a link will be rendered.
   * If it is not set, a button will be rendered instead.
   */
  @Prop() href: string;

  /** Link target options. Only used when `href` is set. */
  @Prop() target: '_blank' | '_parent' | '_self' | '_top';

  /** The `rel` attribute to use on the link. Only used when `href` is set. */
  @Prop() rel = 'noreferrer noopener';

  handleSlotChange(): void {
    this.hasPrefix = hasSlot(this.host, 'prefix');
    this.hasSuffix = hasSlot(this.host, 'suffix');
  }

  render(): JSX.Element {
    const isLink = this.href ? true : false;
    return (
      <div
        part='base'
        class={{
          'item': true,
          'item--has-prefix': this.hasPrefix,
          'item--has-suffix': this.hasSuffix,
        }}
      >
        <span part='prefix' class='item__prefix'>
          <slot
            name='prefix'
            onSlotchange={() => this.handleSlotChange()}
          ></slot>
        </span>

        {isLink ? (
          <a
            part='label'
            class='item__label'
            href={this.href}
            target={this.target}
            rel={this.target ? this.rel : undefined}
          >
            <slot></slot>
          </a>
        ) : (
          <button part='label' type='button' class='item__label'>
            <slot></slot>
          </button>
        )}

        <span part='suffix' class='item__suffix'>
          <slot
            name='suffix'
            onSlotchange={() => this.handleSlotChange()}
          ></slot>
        </span>

        <span part='separator' class='item__separator' aria-hidden='true'>
          <slot name='separator'></slot>
        </span>
      </div>
    );
  }
}
