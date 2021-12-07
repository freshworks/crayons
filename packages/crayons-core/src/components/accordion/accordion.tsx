import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  h,
} from '@stencil/core';

export interface AccordionToggleEvent {
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
   * The type of accordion to be displayed.
   */
  @Prop() type: 'default' | 'borderless' = 'default';

  /**
   * To manage accordion expanded or collapsed state
   */
  @Prop({ mutable: true }) expanded = false;

  /**
   * Triggered when the accordion is expanded or collpased
   */
  @Event() fwAccordionToggle!: EventEmitter<AccordionToggleEvent>;

  toggleState = (): void => {
    this.expanded = !this.expanded;

    this.updateState();
    this.fwAccordionToggle.emit({ expanded: this.expanded });
  };

  updateState(): void {
    this.accordionTitle.expanded = this.expanded;
    this.accordionBody.expanded = this.expanded;
  }

  componentWillLoad() {
    this.accordionTitle = this.el.querySelector('fw-accordion-title');
    this.accordionBody = this.el.querySelector('fw-accordion-body');
    this.accordionTitle.type = this.type;
    this.accordionBody.type = this.type;
    this.accordionTitle.toggleState = this.toggleState.bind(this);
    this.updateState();
  }

  render() {
    return (
      <div
        class={{
          accordion: true,
          borderless: this.type === 'borderless',
        }}
      >
        <slot />
      </div>
    );
  }
}
