import { r as registerInstance, i as h, k as Host, j as getElement } from './index-44c267ce.js';

const tabPanelCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block;padding:0;width:var(--fw-tab-panel-width, \"inherit\");height:var(--fw-tab-panel-height, \"inherit\")}";

let counter = 0;
let Panel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * The panel name.
     */
    this.name = '';
    /**
     * If true sets the panel display to block, none otherwise.
     */
    this.active = false;
  }
  connectedCallback() {
    if (!this.el.id) {
      this.el.id = `fw-tab-panel-${counter++}`;
    }
  }
  render() {
    this.el.style.display = this.active ? 'block' : 'none';
    return (h(Host, { role: 'tabpanel', "aria-hidden": this.active ? 'false' : 'true' }, h("slot", null)));
  }
  get el() { return getElement(this); }
};
Panel.style = tabPanelCss;

export { Panel as fw_tab_panel };
