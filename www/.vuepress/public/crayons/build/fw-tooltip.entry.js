import { r as registerInstance, i as h, j as getElement } from './index-44c267ce.js';
import { a as hasSlot } from './index-9d2a65d7.js';

const tooltipCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{--fw-popover-border-radius:4px}.tooltip{color:#fff;background:#12344d;border-radius:4px;font-size:12px;font-weight:600;line-height:18px;padding:6px 8px;max-width:236px;overflow:visible}";

let Tooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * Placement of the popover content with respect to the popover trigger.
     */
    this.placement = 'top';
    /**
     * Alternative placement for popover if the default placement is not possible.
     */
    this.fallbackPlacements = ['top'];
    /**
     * Content of the tooltip.
     */
    this.content = '';
    /**
     * Distance defines the distance between the popover trigger and the popover content along y-axis.
     */
    this.distance = '10';
    /**
     * The trigger event on which the popover-content is displayed. The available options are
     * 'click' | 'manual' | 'hover', in case of 'manual' no trigger event will be set.
     */
    this.trigger = 'hover';
    /**
     * Option to prevent the tooltip from being clipped when the component is placed inside a container with
     * `overflow: auto|hidden|scroll`.
     */
    this.hoist = false;
    /**
     * Private
     * Set to true if we want to render slot instead of default footer.
     */
    this.custom = null;
  }
  /**
   * lifecycle event, called once just after the component is first connected to the DOM.
   */
  componentWillLoad() {
    if (this.custom === null) {
      this.custom = hasSlot(this.host, 'tooltip-content');
    }
  }
  /**
   * Shows the tooltip.
   * @returns promise that resolves to true
   */
  async show() {
    this.popoverRef.show();
    return true;
  }
  /**
   * Hides the tooltip.
   * @returns promise that resolves to true
   */
  async hide() {
    this.popoverRef.hide();
    return true;
  }
  /**
   * Renders trigger and content elements through fw-popper element.
   * @returns {JSX.Element}
   */
  render() {
    return (h("fw-popover", { trigger: this.trigger, placement: this.placement, fallbackPlacements: this.fallbackPlacements, sameWidth: false, distance: this.distance, "disable-transition": 'true', "has-border": 'false', hoist: this.hoist, ref: (popoverRef) => (this.popoverRef = popoverRef) }, h("slot", { slot: 'popover-trigger' }), this.custom ? (h("div", { class: 'tooltip', slot: 'popover-content', role: 'tooltip' }, h("slot", { name: 'tooltip-content' }))) : (this.content.trim().length && (h("div", { class: 'tooltip', slot: 'popover-content', role: 'tooltip' }, this.content.trim())))));
  }
  get host() { return getElement(this); }
};
Tooltip.style = tooltipCss;

export { Tooltip as fw_tooltip };
