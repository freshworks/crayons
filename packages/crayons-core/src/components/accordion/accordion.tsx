import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  h,
} from '@stencil/core';

export interface AccordionToogleEvent {
  expanded: boolean;
}

@Component({
  tag: 'fw-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class Accordion {
  @Element() el: HTMLFwAccordionElement;

  private accordionTitle: HTMLFwAccordionTitleElement;

  private accordionBody: HTMLFwAccordionBodyElement;

  /**
   * To manage accordion expanded or collapsed state
   */
  @Prop({ mutable: true }) expanded = true;

  /**
   * Triggered when the accordion is expanded or collpased
   */
  @Event() fwAccordionToggle!: EventEmitter<AccordionToogleEvent>;

  toggleState = (): void => {
    this.expanded = !this.expanded;

    this.passStateToChildren();
    this.fwAccordionToggle.emit({ expanded: this.expanded });
  };

  passStateToChildren(): void {
    this.accordionTitle.expanded = this.expanded;
    this.accordionBody.expanded = this.expanded;
  }

  componentWillLoad() {
    this.accordionTitle = this.el.querySelector('fw-accordion-title');
    this.accordionBody = this.el.querySelector('fw-accordion-body');
    this.accordionTitle.toggleState = this.toggleState.bind(this);
    this.passStateToChildren();
  }

  render() {
    return (
      <div class='accordion'>
        <slot />
      </div>
    );
  }
}
