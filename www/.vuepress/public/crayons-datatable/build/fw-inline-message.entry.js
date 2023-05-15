import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-4996832f.js';

const inlineMessageCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{margin:0}.alert{position:relative;display:-ms-flexbox;display:flex;width:100%;border-radius:4px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:inherit;padding:8px 6px;background-color:transparent}.alert--success{background:#e0f5f1;border:1px solid #b4e5da}.alert--success .alert__message{border-left:1px solid #b4e5da}.alert--warning{background:#fef1e1;border:1px solid #fedcb3}.alert--warning .alert__message{border-left:1px solid #fedcb3}.alert--info{background:#e5f2fd;border:1px solid #bbdcfe}.alert--info .alert__message{border-left:1px solid #bbdcfe}.alert--error{border:1px solid #ffd0d6;background:#ffecf0}.alert--error .alert__message{border-left:1px solid #ffd0d6}.alert__icon{-ms-flex:0 0 auto;flex:0 0 auto;display:-ms-flexbox;display:flex;-ms-flex-item-align:start;align-self:flex-start;margin-right:8px}.alert__message{padding-left:12px;-ms-flex:1 1 auto;flex:1 1 auto;color:#12344d;font-size:14px;font-weight:400;line-height:20px}.alert__message ::slotted(a){font-weight:500;color:#365dbe;text-decoration:none}.alert__close{-ms-flex:0 0 auto;flex:0 0 auto;display:-ms-flexbox;display:flex;-ms-flex-item-align:start;align-self:flex-start;padding-right:6px;padding-left:12px;cursor:pointer}";

const iconMap = {
  error: 'alert',
  warning: 'info',
  info: 'info',
  success: 'success',
};
const iconColorMap = {
  error: '#e43538',
  warning: '#c7502f',
  info: '#264966',
  success: '#00795b',
};
let InlineMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwShow = createEvent(this, "fwShow", 7);
    this.fwHide = createEvent(this, "fwHide", 7);
    /**
     * Makes the inline message closable.
     */
    this.closable = true;
    /**
     * The type of inline message to be displayed. Defaults to info.
     */
    this.type = 'info';
    /**
     * The duration in milliseconds for which inline message will be shown.
     */
    this.duration = Infinity;
    /**
     * Indicates whether the inline message is open or not.
     */
    this.open = true;
  }
  startAutoHide() {
    clearTimeout(this.autoHideTimeout);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
    }
  }
  handleOpen() {
    if (this.open) {
      this.host.style.display = 'flex';
      this.fwShow.emit();
      if (this.duration < Infinity) {
        this.startAutoHide();
      }
    }
    else {
      clearTimeout(this.autoHideTimeout);
      this.host.style.display = 'none';
      this.fwHide.emit();
    }
  }
  handleDurationChange() {
    this.startAutoHide();
  }
  async show() {
    if (this.open) {
      return;
    }
    this.open = true;
  }
  async hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
  }
  connectedCallback() {
    this.host.style.display = this.open ? 'flex' : 'none';
  }
  disconnectedCallback() {
    clearTimeout(this.autoHideTimeout);
  }
  handleKeyUp(e) {
    if (e.code === 'Enter') {
      e.preventDefault();
      this.hide();
    }
  }
  handleClose() {
    this.hide();
  }
  render() {
    return (h(Host, { role: 'alert', "aria-hidden": this.open ? 'false' : 'true' }, h("div", { class: 'alert ' + 'alert--' + this.type }, h("span", { class: 'alert__icon' }, h("fw-icon", { name: iconMap[this.type], color: iconColorMap[this.type] })), h("span", { class: 'alert__message' }, h("slot", null)), this.closable && (h("span", { class: 'alert__close', role: 'button', tabindex: '0', onKeyUp: (e) => this.handleKeyUp(e), onClick: () => this.handleClose() }, h("fw-icon", { name: 'cross', color: '#12344d', size: 8 }))))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "open": ["handleOpen"],
    "duration": ["handleDurationChange"]
  }; }
};
InlineMessage.style = inlineMessageCss;

export { InlineMessage as fw_inline_message };
