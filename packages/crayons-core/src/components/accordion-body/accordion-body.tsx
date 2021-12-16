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
  @Prop() type: 'default' | 'no_bounding_box' = 'default';

  render() {
    return (
      <div
        class={{
          'accordion-body': true,
          'collapsed': !this.expanded,
          'no-bounding-box': this.type === 'no_bounding_box',
        }}
      >
        <slot></slot>
      </div>
    );
  }
}
