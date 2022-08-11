import { r as registerInstance, h as createEvent, i as h, j as getElement } from './index-44c267ce.js';

const accordionCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.accordion{-webkit-box-shadow:var(--fw-accordion-box-shadow, 0px 1px 4px rgba(18, 52, 77, 0.08));box-shadow:var(--fw-accordion-box-shadow, 0px 1px 4px rgba(18, 52, 77, 0.08));border:var(--fw-accordion-border, 1px solid #cfd7df);border-radius:var(--fw-accordion-border-radius, 8px)}.accordion.no-bounding-box{-webkit-border-start:0;border-inline-start:0;-webkit-border-end:0;border-inline-end:0;border-radius:0}";

let Accordion = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwAccordionToggle = createEvent(this, "fwAccordionToggle", 7);
    /**
     * The type of accordion to be displayed.
     * default => Accordion with all borders
     * no_bounding_box => Accordion with top and bottom borders only
     */
    this.type = 'default';
    /**
     * To manage accordion expanded or collapsed state
     */
    this.expanded = false;
    this.toggleState = () => {
      this.expanded = !this.expanded;
      this.updateState();
      this.fwAccordionToggle.emit({ expanded: this.expanded });
    };
  }
  /**
   * Method available from the component to toggle expanded or collapsed state of accordion
   * @returns promise that resolves to true
   */
  async toggle() {
    this.toggleState();
    return true;
  }
  watchExpanded(newValue) {
    this.expanded = newValue;
    this.updateState();
  }
  updateState() {
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
    return (h("div", { class: {
        'accordion': true,
        'no-bounding-box': this.type === 'no_bounding_box',
      } }, h("slot", null)));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "expanded": ["watchExpanded"]
  }; }
};
Accordion.style = accordionCss;

export { Accordion as fw_accordion };
