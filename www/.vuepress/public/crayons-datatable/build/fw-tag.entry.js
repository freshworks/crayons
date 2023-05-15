import { r as registerInstance, f as createEvent, h, g as getElement } from './index-4996832f.js';
import { h as handleKeyDown } from './index-268121b7.js';

const tagCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.tag{line-height:1.4;border-radius:4px;background-color:#ebeff3;border:none;font-size:12px;color:#12344d;margin:2px;display:inline-block;width:auto;font-weight:500;word-break:break-all;padding:3px 0 4px 8px}.tag .remove-btn{opacity:1;color:#264966;padding:3px 8px 5px;font-size:16px;border-radius:4px;line-height:normal;position:relative;right:0;margin-left:4px;height:100%}.tag .remove-btn:hover,.tag .remove-btn:focus{background-color:#cfd7df;cursor:pointer}.tag .remove-btn.disabled{color:#447093;background-color:#ebeff3;cursor:not-allowed}";

let Tag = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwClosed = createEvent(this, "fwClosed", 7);
    this.removeTag = () => {
      if (this.disabled) {
        return;
      }
      const { value, text } = this;
      this.fwClosed.emit({ value, text });
    };
  }
  render() {
    return (h("div", { class: 'tag' }, this.text, h("span", { role: 'button', tabindex: '0', class: { 'remove-btn': true, 'disabled': this.disabled }, onClick: () => this.removeTag(), onKeyDown: handleKeyDown(this.removeTag) }, "\u00D7")));
  }
  get host() { return getElement(this); }
};
Tag.style = tagCss;

export { Tag as fw_tag };
