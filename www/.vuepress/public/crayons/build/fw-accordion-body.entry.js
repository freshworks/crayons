import { r as registerInstance, i as h } from './index-44c267ce.js';

const accordionBodyCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.accordion-body{font-size:var(--fw-accordion-body-font-size, 14px);line-height:var(--fw-accordion-body-line-height, 18px);background-color:var(--fw-accordion-body-background-color, #f5f7f9);padding:var(--fw-accordion-body-padding, 20px);border-radius:0 0 var(--fw-accordion-border-radius, 8px) var(--fw-accordion-border-radius, 8px)}.accordion-body.collapsed{display:none}.accordion-body.no-bounding-box{border-radius:0}";

let AccordionBody = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * @internal
     */
    this.type = 'default';
  }
  render() {
    return (h("div", { class: {
        'accordion-body': true,
        'collapsed': !this.expanded,
        'no-bounding-box': this.type === 'no_bounding_box',
      } }, h("slot", null)));
  }
};
AccordionBody.style = accordionBodyCss;

export { AccordionBody as fw_accordion_body };
