import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  Method,
  h,
  Watch,
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
   * default => Accordion with all borders
   * no_bounding_box => Accordion with top and bottom borders only
   */
  @Prop() type: 'default' | 'no_bounding_box' = 'default';

  /**
   * To manage accordion expanded or collapsed state
   */
  @Prop({ mutable: true, reflect: true }) expanded = false;

  /**
   * Triggered when the accordion is expanded or collapsed
   */
  @Event() fwAccordionToggle!: EventEmitter<AccordionToggleEvent>;

  /**
   * Method available from the component to toggle expanded or collapsed state of accordion
   * @returns promise that resolves to true
   */
  @Method()
  async toggle() {
    this.toggleState();
    return true;
  }

  @Watch('expanded')
  watchExpanded(newValue: boolean): void {
    this.expanded = newValue;
    this.updateState();
  }

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
          'accordion': true,
          'no-bounding-box': this.type === 'no_bounding_box',
        }}
      >
        <slot />
      </div>
    );
  }
}
