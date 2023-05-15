import { r as registerInstance, h as createEvent, i as h, j as getElement } from './index-44c267ce.js';
import { h as handleKeyDown } from './index-9d2a65d7.js';

const tagCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.tag{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;color:#12344d;font-size:14px;word-break:break-all}.tag .content{line-height:20px;vertical-align:middle}.tag-standard{padding-top:2px;-webkit-padding-end:2px;padding-inline-end:2px;padding-bottom:2px;-webkit-padding-start:8px;padding-inline-start:8px;border-radius:4px;font-weight:600;background-color:#ebeff3}.tag-avatar{padding:4px;border-radius:24px;font-weight:400;background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #f5f7f9), color-stop(95.75%, #f3f5f7));background:linear-gradient(180deg, #f5f7f9 2.56%, #f3f5f7 95.75%)}.tag-avatar fw-avatar{-webkit-margin-end:8px;margin-inline-end:8px}.tag .remove-btn{-webkit-margin-start:8px;margin-inline-start:8px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:#264966;font-size:16px}.tag .remove-btn.standard{min-height:20px;min-width:20px;border-radius:4px}.tag .remove-btn.avatar{min-height:24px;min-width:24px;border-radius:16px}.tag .remove-btn.avatar:hover,.tag .remove-btn.avatar:focus{background-color:#fff;cursor:pointer}.tag .remove-btn:hover,.tag .remove-btn:focus{background-color:#cfd7df;cursor:pointer}.tag .remove-btn.disabled{color:#447093;background-color:#ebeff3;cursor:not-allowed}";

let Tag = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwClosed = createEvent(this, "fwClosed", 7);
    /**
     * The variant of tag to be displayed.
     */
    this.variant = 'standard';
    /**
     * The props need to be passed for the variant. If the variant is avatar then use this prop to send the props for the fw-avatar component.
     */
    this.graphicsProps = {};
    /**
     * Whether the Tag can be closed.
     */
    this.closable = true;
    /**
     * Whether the Tag is focusable.
     */
    this.focusable = true;
    this.removeTag = (e) => {
      if (this.disabled || !this.closable) {
        return;
      }
      const { value, text } = this;
      this.fwClosed.emit({ value, text });
      e.stopPropagation();
    };
  }
  onKeyDown(event) {
    switch (event.key) {
      case 'Backspace':
        this.removeTag(event);
        event.preventDefault();
        break;
    }
  }
  async setFocus() {
    this.tagContainer.focus();
  }
  renderContent() {
    switch (this.variant) {
      case 'standard':
        return h("span", { class: 'content' }, this.text);
      case 'avatar': {
        return [
          h("fw-avatar", Object.assign({ size: 'xsmall' }, this.graphicsProps)),
          h("span", { class: 'content' }, this.text),
        ];
      }
      default:
        break;
    }
  }
  render() {
    return (h("div", { role: 'button', tabindex: '-1', class: `tag tag-${this.variant}`, ref: (tagContainer) => (this.tagContainer = tagContainer) }, this.renderContent(), this.closable && (h("span", { role: 'button', tabIndex: this.focusable ? 0 : -1, class: `remove-btn ${this.variant} ${this.disabled ? 'disabled' : ''}`, onClick: (e) => this.removeTag(e), onKeyDown: handleKeyDown(this.removeTag) }, h("fw-icon", { name: 'cross', size: 8, library: 'system' })))));
  }
  get host() { return getElement(this); }
};
Tag.style = tagCss;

export { Tag as fw_tag };
