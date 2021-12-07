import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-accordion-body',
  styleUrl: 'accordion-body.scss',
  shadow: true,
})
export class AccordionBody {
  /**
   * @internal
   */
  @Prop() expanded: boolean;

  /**
   * @internal
   */
  @Prop() type: 'default' | 'borderless' = 'default';

  render() {
    return (
      <div
        class={{
          'accordion-body': true,
          'collapsed': !this.expanded,
          'borderless': this.type === 'borderless',
        }}
      >
        <slot></slot>
      </div>
    );
  }
}
