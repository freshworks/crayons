import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-accordion-body',
  styleUrl: 'accordion-body.scss',
})
export class AccordionBody {
  @Prop() expanded: boolean;

  render() {
    return (
      <div class={{ 'accordion-body': true, 'collapsed': !this.expanded }}>
        <slot></slot>
      </div>
    );
  }
}
