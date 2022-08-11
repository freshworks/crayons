import { r as registerInstance, h as createEvent, i as h, k as Host, j as getElement } from './index-44c267ce.js';
import { h as handleKeyDown } from './index-a4741a9c.js';

const toastMessageCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}@media screen and (prefers-reduced-motion: reduce){.toast.is-open{-webkit-animation:none;animation:none}}.toast.is-open{display:block;-webkit-animation-duration:0.5s;animation-duration:0.5s;-webkit-animation-name:fadeIn;animation-name:fadeIn;z-index:999}.toast{display:none;position:relative;inset-block-start:10px;width:400px;-webkit-padding-start:0px;padding-inline-start:0px;-webkit-padding-after:16px;padding-block-end:16px;-webkit-padding-end:0px;padding-inline-end:0px;-webkit-padding-before:0px;padding-block-start:0px;border:1px solid #ebeff3;border-radius:4px;background-color:#fff;-webkit-margin-after:16px;margin-block-end:16px;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0px 2px 4px rgba(18, 52, 77, 0.06), 0px 2px 16px rgba(18, 52, 77, 0.16);box-shadow:0px 2px 4px rgba(18, 52, 77, 0.06), 0px 2px 16px rgba(18, 52, 77, 0.16);overflow-wrap:anywhere;word-break:break-word;white-space:normal}.toast.success{-webkit-border-before:5px solid #00a886;border-block-start:5px solid #00a886}.toast.error{-webkit-border-before:5px solid #d72d30;border-block-start:5px solid #d72d30}.toast.warning{-webkit-border-before:5px solid #f8ab59;border-block-start:5px solid #f8ab59}.toast.inprogress{-webkit-border-before:5px solid #2c5cc5;border-block-start:5px solid #2c5cc5}.toast-container{-webkit-margin-before:16px;margin-block-start:16px;display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;place-content:center}.toast-container .content{color:#12344d;line-height:20px;-ms-flex:1 1 auto;flex:1 1 auto;font-size:14px;font-weight:500;vertical-align:top}.toast-container .icon{-webkit-margin-start:16px;margin-inline-start:16px;-webkit-margin-after:0px;margin-block-end:0px;-webkit-margin-end:16px;margin-inline-end:16px;-webkit-margin-before:5px;margin-block-start:5px}.toast-container .remove{-webkit-margin-start:12px;margin-inline-start:12px;-webkit-margin-after:0px;margin-block-end:0px;-webkit-margin-end:12px;margin-inline-end:12px;-webkit-margin-before:5px;margin-block-start:5px}.action-link{color:#2c5cc5;line-height:14px;cursor:pointer;font-size:12px;font-weight:600;padding-inline:0px;padding-block:8px}@-webkit-keyframes fadeOut{100%{inset-block-start:-600px}}@keyframes fadeOut{100%{inset-block-start:-600px}}@-webkit-keyframes fadeIn{0%{inset-block-start:-600px}100%{inset-block-start:10px}}@keyframes fadeIn{0%{inset-block-start:-600px}100%{inset-block-start:10px}}@media screen and (prefers-reduced-motion: reduce){.toast.fade-out{-webkit-animation:none;animation:none}}.toast.fade-out{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-name:fadeOut;animation-name:fadeOut}";

const iconColorMap = {
  error: '#e43538',
  warning: '#c7502f',
  info: '#264966',
  success: '#00795b',
};
let ToastMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwLinkClick = createEvent(this, "fwLinkClick", 7);
    this.fwRemoveToast = createEvent(this, "fwRemoveToast", 7);
    /**
     * visibility prop of toast message
     */
    this.open = false;
    /**
     * To indicate toast close timeout
     */
    this.isTimedOut = false;
    /**
     * To add close animation class to toast
     */
    this.fadeOut = false;
    /**
     * State icon size
     */
    this.iconSize = 16;
    /**
     * Type of the toast - success,failure, warning, inprogress
     */
    this.type = 'warning';
    /**
     * Time duration of the toast visibility
     */
    this.timeout = 4000;
    /**
     *  The Content of the action link
     */
    this.actionLinkText = '';
    /**
     *  won't close automatically
     */
    this.sticky = false;
  }
  openChanged(open) {
    if (open)
      this.setUpToast();
  }
  async componentWillLoad() {
    if (this.open)
      this.setUpToast();
  }
  async setUpToast() {
    this.fadeOut = false;
    this.isTimedOut = false;
    this.timerId = setTimeout(async () => {
      if (!this.sticky) {
        if (!this.pauseOnHover || (this.pauseOnHover && !this.isMouseHovered)) {
          await this.closeToast();
        }
        this.isTimedOut = true;
      }
    }, this.timeout);
  }
  async mouseHover(value = false) {
    this.isMouseHovered = value;
    if (this.isTimedOut && !this.isMouseHovered) {
      await this.closeToast();
    }
  }
  closingAnimation() {
    this.fadeOut = true;
    return new Promise((resolve) => setTimeout(() => {
      this.open = false;
      this.fwRemoveToast.emit(this.controllerEl);
      resolve();
    }, 500));
  }
  async closeToast() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    await this.closingAnimation();
  }
  disconnectedCallback() {
    this.fwRemoveToast.emit(this.controllerEl);
    if (this.timerId)
      clearTimeout(this.timerId);
  }
  render() {
    return (h(Host, { onmouseover: () => this.mouseHover(true), onmouseout: () => this.mouseHover(false), "aria-hidden": this.open ? 'false' : 'true' }, h("div", { class: `toast ${this.type} ${this.open ? 'is-open' : ''} ${this.fadeOut ? 'fade-out' : ''}`, "aria-hidden": this.open ? 'false' : 'true' }, h("div", { class: 'toast-container' }, this.type === 'inprogress' ? (h("fw-spinner", { class: 'icon' })) : (h("fw-icon", { class: 'icon', size: this.iconSize, name: this.type, color: iconColorMap[this.type] })), h("div", { class: 'content' }, h("slot", null), this.content, this.actionLinkText.length > 0 ? (h("div", { class: 'action-link', role: 'button', tabindex: '0', onClick: () => this.fwLinkClick.emit(), onKeyDown: handleKeyDown(() => this.fwLinkClick.emit()) }, this.actionLinkText)) : ('')), h("fw-icon", { size: 10, name: 'cross', class: 'remove', color: '#183247', onClick: () => this.closeToast(), library: 'system' })))));
  }
  get controllerEl() { return getElement(this); }
  static get watchers() { return {
    "open": ["openChanged"]
  }; }
};
ToastMessage.style = toastMessageCss;

export { ToastMessage as fw_toast_message };
