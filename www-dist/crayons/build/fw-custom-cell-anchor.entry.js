import { r as registerInstance, i as h } from './index-44c267ce.js';

const customCellAnchorCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.anchor{color:#2c5cc5;text-decoration:none;font-weight:600;display:inline-block;width:250px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}";

let CustomCellAnchor = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.href = '';
    this.text = '';
  }
  render() {
    return (h("a", { class: 'anchor', href: this.href }, this.text));
  }
};
CustomCellAnchor.style = customCellAnchorCss;

export { CustomCellAnchor as fw_custom_cell_anchor };
