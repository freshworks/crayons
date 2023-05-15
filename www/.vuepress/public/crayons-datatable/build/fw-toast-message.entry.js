import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-4996832f.js';
import { h as handleKeyDown } from './index-268121b7.js';

const toastMessageCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:none}@media screen and (prefers-reduced-motion: reduce){:host(.is-open){-webkit-animation:none;animation:none}}:host(.is-open){display:block;-webkit-animation-duration:0.5s;animation-duration:0.5s;-webkit-animation-name:fadeIn;animation-name:fadeIn;z-index:999}:host(.toast){position:relative;top:10px;width:400px;padding:0px 0px 16px 0px;border:1px solid #ebeff3;border-radius:4px;background-color:#fff;margin-bottom:16px;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.toast.success){border-top:5px solid #00a886}:host(.toast.error){border-top:5px solid #d72d30}:host(.toast.warning){border-top:5px solid #f8ab59}:host(.toast.inprogress){border-top:5px solid #2c5cc5}.toast-container{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;place-content:center}.toast-container .content{color:#12344d;line-height:20px;-ms-flex:auto;flex:auto;margin:16px 0px 0px 16px;font-size:14px;font-weight:500}.toast-container .icon{margin:20px 0px 0px 16px}.toast-container .remove{float:right;cursor:pointer;margin:16px 12px 0px 12px}.action-link{color:#2c5cc5;line-height:14px;cursor:pointer;font-size:12px;font-weight:600;padding:8px 0px}@-webkit-keyframes fadeOut{100%{top:-600px}}@keyframes fadeOut{100%{top:-600px}}@-webkit-keyframes fadeIn{0%{top:-600px}100%{top:10px}}@keyframes fadeIn{0%{top:-600px}100%{top:10px}}@media screen and (prefers-reduced-motion: reduce){:host(.fade-out){-webkit-animation:none;animation:none}}:host(.fade-out){-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-name:fadeOut;animation-name:fadeOut}";

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
    if (this.timerId)
      clearTimeout(this.timerId);
  }
  render() {
    return (h(Host, { class: `toast ${this.type} ${this.open ? 'is-open' : ''} ${this.fadeOut ? 'fade-out' : ''}`, onmouseover: () => this.mouseHover(true), onmouseout: () => this.mouseHover(false), "aria-hidden": this.open ? 'false' : 'true' }, h("div", { class: 'toast-container' }, this.type === 'inprogress' ? (h("fw-spinner", { class: 'icon' })) : (h("fw-icon", { class: 'icon', size: this.iconSize, name: this.type })), h("div", { class: 'content' }, h("slot", null), this.content, this.actionLinkText.length > 0 ? (h("div", { class: 'action-link', role: 'button', tabindex: '0', onClick: () => this.fwLinkClick.emit(), onKeyDown: handleKeyDown(() => this.fwLinkClick.emit()) }, this.actionLinkText)) : ('')), h("fw-icon", { size: 10, color: '#000', name: 'cross', class: 'remove', onClick: () => this.closeToast() }))));
  }
  get controllerEl() { return getElement(this); }
  static get watchers() { return {
    "open": ["openChanged"]
  }; }
};
ToastMessage.style = toastMessageCss;

export { ToastMessage as fw_toast_message };
