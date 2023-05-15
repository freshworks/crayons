import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-4996832f.js';
import { t as throttle, a as hasSlot } from './index-268121b7.js';

const buttonCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}@media screen and (prefers-reduced-motion: reduce){.fw-btn,.fw-btn--label,.fw-btn--loader{-webkit-transition:none;transition:none}}:host{display:inline-block;width:auto;cursor:pointer}.fw-btn{display:-ms-inline-flexbox;display:inline-flex;-ms-flex-line-pack:center;align-content:center;-ms-flex-align:stretch;align-items:stretch;-ms-flex-pack:center;justify-content:center;width:100%;border-style:solid;border-width:1px;font-weight:600;font-family:inherit;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap;vertical-align:middle;padding:0;cursor:inherit;letter-spacing:0;outline:0;border-radius:4px;--icon-color:currentColor}.fw-btn .fw-btn--label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fw-btn:active:not(.fw-btn--loading){-webkit-box-shadow:inset 0 0 4px 0 rgba(0, 0, 0, 0.25);box-shadow:inset 0 0 4px 0 rgba(0, 0, 0, 0.25)}.fw-btn:focus{border:1px solid #2c5cc5;-webkit-box-shadow:0 0 0 1px #2c5cc5;box-shadow:0 0 0 1px #2c5cc5}.fw-btn.disabled,.fw-btn[disabled]{cursor:not-allowed}.fw-btn--primary{background-color:#264966;color:#fff;border-color:#12344d;background-image:-webkit-gradient(linear, left top, left bottom, from(#264966), to(#12344d));background-image:linear-gradient(to bottom, #264966, #12344d)}.fw-btn--primary:active{border-color:#264966}.fw-btn--primary:focus:not([disabled]),.fw-btn--primary:hover:not([disabled]){background-color:#12344d;background-image:none}.fw-btn--primary.disabled,.fw-btn--primary[disabled]{background-image:-webkit-gradient(linear, left top, left bottom, from(#92a2b1), to(#7b8e9f));background-image:linear-gradient(to bottom, #92a2b1, #7b8e9f);border-color:#7b8e9f;color:rgba(255, 255, 255, 0.5)}.fw-btn--secondary{background-color:#f3f5f7;color:#12344d;border-color:#cfd7df;background-image:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#f3f5f7));background-image:linear-gradient(to bottom, #fff, #f3f5f7)}.fw-btn--secondary:active{border-color:#ebeff3}.fw-btn--secondary:focus:not([disabled]),.fw-btn--secondary:hover:not([disabled]){background-color:#f3f5f7;background-image:none}.fw-btn--secondary.disabled,.fw-btn--secondary[disabled]{background:#ebeff3;border-color:#ebeff3;color:#92a2b1}.fw-btn--danger{color:#fff;background-color:#d72d30;border-color:#c82124;background-image:-webkit-gradient(linear, left top, left bottom, from(#d72d30), to(#c82124));background-image:linear-gradient(to bottom, #d72d30, #c82124)}.fw-btn--danger:focus:not([disabled]),.fw-btn--danger:hover:not([disabled]){background-color:#c82124;background-image:none}.fw-btn--danger.disabled,.fw-btn--danger[disabled]{background-image:-webkit-gradient(linear, left top, left bottom, from(#f89fa1), to(#f2797b));background-image:linear-gradient(to bottom, #f89fa1, #f2797b);border-color:#f2797b;color:rgba(255, 255, 255, 0.5)}.fw-btn--link{background-color:transparent;background-image:none;border:1px solid transparent;color:#2c5cc5}.fw-btn--text{background-color:transparent;background-image:none;border:1px solid transparent;color:#264966}.fw-btn--text:focus:not([disabled]),.fw-btn--text:hover:not([disabled]){background-color:#ebeff3}.fw-btn--text:focus:not([disabled]),.fw-btn--text:hover:not([disabled]),.fw-btn--link:focus:not([disabled]),.fw-btn--link:hover:not([disabled]){border-color:#2c5cc5;-webkit-box-shadow:0 0 0 1px #2c5cc5;box-shadow:0 0 0 1px #2c5cc5}.fw-btn--text.disabled,.fw-btn--text[disabled],.fw-btn--link.disabled,.fw-btn--link[disabled]{opacity:0.5}.fw-btn--mini{height:16px;line-height:calc(16px - 1px * 2)}.fw-btn--mini .fw-btn--label{font-size:10px}.fw-btn--mini fw-spinner{-webkit-transform:scale(0.5);transform:scale(0.5)}.fw-btn--small{height:24px;line-height:calc(24px - 1px * 2)}.fw-btn--small .fw-btn--label{font-size:12px}.fw-btn--small fw-spinner{-webkit-transform:scale(0.75);transform:scale(0.75)}.fw-btn--normal{min-width:80px;height:32px;line-height:calc(32px - 1px * 2)}.fw-btn--icon{min-width:32px;width:32px;height:32px;padding:0;line-height:calc(32px - 1px * 2)}.fw-btn--before,.fw-btn--after,.fw-btn--caret{-ms-flex:0 0 auto;flex:0 0 auto;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.fw-btn--normal ::slotted(fw-icon){--icon-size:12px}.fw-btn--small ::slotted(fw-icon){--icon-size:10px}.fw-btn--mini ::slotted(fw-icon){--icon-size:8px}.fw-btn--has-label.fw-btn--normal .fw-btn--label{padding:0 12px}.fw-btn--has-before.fw-btn--normal{padding-left:8px}.fw-btn--has-before.fw-btn--normal .fw-btn--label{padding-left:8px}.fw-btn--has-after.fw-btn--normal,.fw-btn--caret.fw-btn--normal{padding-right:8px}.fw-btn--has-after.fw-btn--normal .fw-btn--label,.fw-btn--caret.fw-btn--normal .fw-btn--label{padding-right:8px}.fw-btn--has-label.fw-btn--small .fw-btn--label{padding:0 8px}.fw-btn--has-before.fw-btn--small{padding-left:6px}.fw-btn--has-before.fw-btn--small .fw-btn--label{padding-left:6px}.fw-btn--has-after.fw-btn--small,.fw-btn--caret.fw-btn--small{padding-right:6px}.fw-btn--has-after.fw-btn--small .fw-btn--label,.fw-btn--caret.fw-btn--small .fw-btn--label{padding-right:6px}.fw-btn--has-label.fw-btn--mini .fw-btn--label{padding:0 6px}.fw-btn--has-before.fw-btn--mini{padding-left:4px}.fw-btn--has-before.fw-btn--mini .fw-btn--label{padding-left:4px}.fw-btn--has-after.fw-btn--mini,.fw-btn--caret.fw-btn--mini{padding-right:4px}.fw-btn--has-after.fw-btn--mini .fw-btn--label,.fw-btn--caret.fw-btn--mini .fw-btn--label{padding-right:4px}.fw-btn--caret fw-icon{--icon-size:9px}.fw-btn--caret.fw-btn--mini fw-icon{--icon-size:6px}.fw-btn--loading{position:relative;cursor:wait}.fw-btn--loading .fw-btn--label,.fw-btn--loading .fw-btn--before,.fw-btn--loading .fw-btn--after,.fw-btn--loading .fw-btn--caret{opacity:0}.fw-btn--loading .fw-btn--loader{--spinner-color:currentColor;opacity:1;line-height:0}.fw-btn--label,.fw-btn--loader{-webkit-transition:opacity 0.3s ease-out;transition:opacity 0.3s ease-out}.fw-btn--loader{opacity:0;position:absolute;font-size:1em;height:1em;width:1em;top:calc(50% - 0.5em);left:calc(50% - 0.5em);margin-top:-1px;margin-left:-1px}:host(.fw-button-group__button--first:not(.fw-button-group__button--last)) .fw-btn{border-top-right-radius:0;border-bottom-right-radius:0}:host(.fw-button-group__button--inner) .fw-btn{border-radius:0;margin-left:-1;border-left:0}:host(.fw-button-group__button--last:not(.fw-button-group__button--first)) .fw-btn{border-top-left-radius:0;border-bottom-left-radius:0;margin-left:-1;border-left:0}";

let Button = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwClick = createEvent(this, "fwClick", 7);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    /**
     *  Button type based on which actions are performed when the button is clicked.
     */
    this.type = 'button';
    /**
     * Identifier of  the theme based on which the button is styled.
     */
    this.color = 'primary';
    /**
     * Size of the button.
     */
    this.size = 'normal';
    /**
     * Disables the button on the interface. Default value is false.
     */
    this.disabled = false;
    /**
     * Loading state for the button, Default value is false.
     */
    this.loading = false;
    /**
     * Caret indicator for the button, Default value is false.
     */
    this.showCaretIcon = false;
    /**
     *  Accepts the id of the fw-modal component to open it on click.
     */
    this.modalTriggerId = '';
    /**
     * Sets the delay for throttle in milliseconds. Defaults to 200 milliseconds.
     */
    this.throttleDelay = 200;
    this.hasLabel = false;
    this.hasBeforeLabel = false;
    this.hasAfterLabel = false;
  }
  onFocus() {
    this.fwFocus.emit();
  }
  onBlur() {
    this.fwBlur.emit();
  }
  connectedCallback() {
    this.handleClickWithThrottle = throttle(this.handleClick, this, this.throttleDelay);
  }
  handlePreventDefault(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  handleClick(event) {
    if (this.modalTriggerId !== '') {
      this.modalTrigger();
    }
    else if (this.type === 'submit') {
      this.fakeSubmit(event);
    }
    this.fwClick.emit();
  }
  async modalTrigger() {
    const modal = document.getElementById(this.modalTriggerId);
    modal.open();
  }
  async fakeSubmit(event) {
    const form = this.host.closest('form');
    if (form) {
      event.preventDefault();
      const fakeSubmit = document.createElement('button');
      fakeSubmit.type = 'submit';
      fakeSubmit.style.display = 'none';
      form.appendChild(fakeSubmit);
      fakeSubmit.click();
      fakeSubmit.remove();
    }
  }
  componentWillLoad() {
    this.handleSlotChange();
  }
  handleSlotChange() {
    this.hasLabel = hasSlot(this.host);
    this.hasBeforeLabel = hasSlot(this.host, 'before-label');
    this.hasAfterLabel = hasSlot(this.host, 'after-label');
  }
  render() {
    return (h(Host, null, h("button", { type: this.type, class: `
            fw-btn fw-btn--${this.color.toLowerCase()}
            fw-btn--${this.size.toLowerCase()}
            ${this.loading ? 'fw-btn--loading' : ''}
            ${this.hasLabel ? 'fw-btn--has-label' : ''}
            ${this.hasBeforeLabel ? 'fw-btn--has-before' : ''}
            ${this.hasAfterLabel ? 'fw-btn--has-after' : ''}
            ${this.showCaretIcon ? 'fw-btn--caret' : ''}
          `, onClick: this.disabled || this.loading
        ? this.handlePreventDefault
        : this.handleClickWithThrottle, onFocus: () => this.onFocus(), onBlur: () => this.onBlur(), "aria-disabled": this.disabled, disabled: this.disabled }, h("span", { class: 'fw-btn--before' }, h("slot", { onSlotchange: () => this.handleSlotChange(), name: 'before-label' })), h("span", { class: 'fw-btn--label' }, h("slot", { onSlotchange: () => this.handleSlotChange() })), h("span", { class: 'fw-btn--after' }, h("slot", { onSlotchange: () => this.handleSlotChange(), name: 'after-label' })), this.loading ? h("fw-spinner", { class: 'fw-btn--loader' }) : '', this.showCaretIcon ? h("fw-icon", { name: 'chevron-down' }) : '')));
  }
  get host() { return getElement(this); }
};
Button.style = buttonCss;

export { Button as fw_button };
