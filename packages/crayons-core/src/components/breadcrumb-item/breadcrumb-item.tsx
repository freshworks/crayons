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
   * Optional URL to direct the user to when the breadcrumb item is activated. When set, a link will be rendered
   * internally. When unset, a button will be rendered instead.
   */
  @Prop() href: string;

  /** Tells the browser where to open the link. Only used when `href` is set. */
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
          'breadcrumb-item': true,
          'breadcrumb-item--has-prefix': this.hasPrefix,
          'breadcrumb-item--has-suffix': this.hasSuffix,
        }}
      >
        <span part='prefix' class='breadcrumb-item__prefix'>
          <slot
            name='prefix'
            onSlotchange={() => this.handleSlotChange()}
          ></slot>
        </span>

        {isLink ? (
          <a
            part='label'
            class='breadcrumb-item__label'
            href='${this.href}'
            target='${this.target}'
            rel={this.target ? this.rel : undefined}
          >
            <slot></slot>
          </a>
        ) : (
          <button part='label' type='button' class='breadcrumb-item__label'>
            <slot></slot>
          </button>
        )}

        <span part='suffix' class='breadcrumb-item__suffix'>
          <slot
            name='suffix'
            onSlotchange={() => this.handleSlotChange()}
          ></slot>
        </span>

        <span
          part='separator'
          class='breadcrumb-item__separator'
          aria-hidden='true'
        >
          <slot name='separator'></slot>
        </span>
      </div>
    );
  }
}
