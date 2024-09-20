import { r as registerInstance, h as createEvent, i as h, j as getElement } from './index-44c267ce.js';
import { h as handleKeyDown } from './index-9b8d850f.js';

const tagCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.tag{min-width:inherit;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;color:#12344d;font-size:12px;word-break:break-all}.tag:hover{outline:1px solid #b1bdc8}.tag:focus{outline:2px solid #2c5cc5}.tag.disabled{outline:0px !important}.tag.focused{outline:2px solid #2c5cc5 !important}.tag.transparent{outline:none !important;background:transparent !important}.tag.error{outline:1px solid #c82124;background:#ffecf0 !important}.tag.error:hover{background:#ffd0d6 !important}.tag.error:focus{outline:2px solid #2c5cc5}.tag .content{line-height:20px;vertical-align:middle}.tag .ellipsis{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.tag .truncated-content{min-width:inherit}.tag .end-padding{-webkit-padding-end:8px;padding-inline-end:8px}.tag .primary{font-weight:600}.tag .secondary{-webkit-padding-start:8px;padding-inline-start:8px;font-weight:400 !important}.tag-standard{-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-after:2px;padding-block-end:2px;-webkit-padding-end:2px;padding-inline-end:2px;-webkit-padding-before:2px;padding-block-start:2px;border-radius:4px;font-weight:600;background-color:#ebeff3}.tag-avatar{padding:4px;border-radius:24px}:host(:not([dir=\"rtl\"])) .tag-avatar,:host([dir=\"ltr\"]) .tag-avatar{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #f5f7f9), color-stop(95.75%, #f3f5f7));background:linear-gradient(180deg, #f5f7f9 2.56%, #f3f5f7 95.75%)}:host([dir=\"rtl\"]) .tag-avatar{background:-webkit-gradient(linear, left top, left bottom, color-stop(2.56%, #f5f7f9), color-stop(95.75%, #f3f5f7));background:linear-gradient(-180deg, #f5f7f9 2.56%, #f3f5f7 95.75%)}.tag-avatar fw-avatar{-webkit-margin-end:8px;margin-inline-end:8px}.tag .remove-btn{-webkit-margin-start:8px;margin-inline-start:8px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:#264966;font-size:16px}.tag .remove-btn.standard{min-height:20px;min-width:20px;border-radius:4px}.tag .remove-btn.avatar{min-height:24px;min-width:24px;border-radius:16px}.tag .remove-btn.avatar:hover,.tag .remove-btn.avatar:focus{background-color:#fff;cursor:pointer}.tag .remove-btn:hover,.tag .remove-btn:focus{background-color:#cfd7df;cursor:pointer}.tag .remove-btn.disabled{color:#447093;background-color:#ebeff3;cursor:not-allowed}";

let Tag = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwClosed = createEvent(this, "fwClosed", 7);
    /**
     * Sets the state of the tag to disabled. The close button is disabled. If the attribute’s value is undefined, the value is set to false.
     */
    this.disabled = false;
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
    /**
     * Theme based on which the tag is styled.
     */
    this.state = 'normal';
    /**
     * If true, tag will be focused
     */
    this.isFocused = false;
    /**
     * Index of tag in a group of tags
     */
    this.index = '-1';
    /**
     * Truncate text with ellipsis when text overflows
     */
    this.showEllipsisOnOverflow = false;
    this.addTooltip = false;
    this.removeTag = (e) => {
      if (this.disabled || !this.closable) {
        return;
      }
      const { value, text, index } = this;
      this.fwClosed.emit({ value, text, index });
      e.stopPropagation();
    };
    this.componentDidRender = () => {
      const elLabel = this.divLabel;
      if (elLabel && !this.resizeObserver) {
        this.resizeObserver = new ResizeObserver(() => {
          if (elLabel.offsetWidth > 0) {
            this.addTooltip =
              elLabel.offsetWidth < elLabel.scrollWidth ? true : false;
          }
        });
        this.resizeObserver.observe(elLabel);
      }
    };
    this.removeResizeObserver = () => {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
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
  renderText() {
    return [
      h("span", { class: {
          'primary': !!this.subText,
          'content': true,
          'end-padding': !this.subText && !this.closable,
        } }, this.text),
      this.subText && (h("span", { class: `secondary content ${!this.closable ? 'end-padding' : ''}` }, this.subText)),
    ];
  }
  renderLabel() {
    return (h("div", { class: 'ellipsis', ref: (el) => (this.divLabel = el) }, this.renderText()));
  }
  renderTruncatedContent() {
    return (h("div", { class: 'truncated-content' }, this.addTooltip ? (h("fw-tooltip", { trigger: 'hover', content: `${this.text}${this.subText ? ` ${this.subText}` : ''}`, hoist: true }, this.renderLabel())) : (this.renderLabel())));
  }
  renderContent() {
    switch (this.variant) {
      case 'standard':
        return this.showEllipsisOnOverflow
          ? this.renderTruncatedContent()
          : this.renderText();
      case 'avatar': {
        return [
          h("fw-avatar", Object.assign({ mode: this.state === 'error' ? this.state : 'dark', size: 'xsmall' }, this.graphicsProps)),
          this.showEllipsisOnOverflow
            ? this.renderTruncatedContent()
            : this.renderText(),
        ];
      }
      default:
        break;
    }
  }
  disconnectedCallback() {
    this.removeResizeObserver();
  }
  render() {
    return (h("div", { role: 'button', tabindex: '-1', class: `tag ${this.isFocused ? 'focused' : ''} ${this.state} tag-${this.variant} ${this.disabled ? 'disabled' : ''}`, ref: (tagContainer) => (this.tagContainer = tagContainer) }, this.renderContent(), this.closable && (h("span", { role: 'button', tabIndex: this.focusable ? 0 : -1, class: `remove-btn ${this.variant} ${this.disabled ? 'disabled' : ''}`, onClick: (e) => this.removeTag(e), onKeyDown: handleKeyDown(this.removeTag) }, h("fw-icon", { name: 'cross', size: 8, library: 'system' })))));
  }
  get host() { return getElement(this); }
};
Tag.style = tagCss;

export { Tag as fw_tag };
