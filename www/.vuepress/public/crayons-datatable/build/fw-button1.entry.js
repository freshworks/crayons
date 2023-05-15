import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-4996832f.js';

const button1Css = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}@media screen and (prefers-reduced-motion: reduce){.fw-btn{-webkit-transition:none;transition:none}}.fw-btn{font-size:14px;line-height:20px;padding:6px 12px;border:1px solid transparent;border-radius:4px;outline:0;color:#264966;cursor:pointer;-webkit-transition:all 0.2s linear;transition:all 0.2s linear;letter-spacing:0.3px;font-weight:500;min-width:87px;height:32px}.fw-btn:focus{border:1px solid #264966;-webkit-box-shadow:0 0 0 1px #264966;box-shadow:0 0 0 1px #264966;outline:none}.fw-btn:active{-webkit-box-shadow:inset 0 0 4px 0 rgba(0, 0, 0, 0.25);box-shadow:inset 0 0 4px 0 rgba(0, 0, 0, 0.25)}.fw-btn.disabled,.fw-btn[disabled]{cursor:not-allowed;opacity:0.4}.fw-btn--primary{background-color:#264966;color:#fff;border:1px solid #12344d;background-image:-webkit-gradient(linear, left top, left bottom, from(#264966), to(#12344d));background-image:linear-gradient(to bottom, #264966, #12344d)}.fw-btn--primary:active{border:1px solid #264966}.fw-btn--primary:focus:not([disabled]),.fw-btn--primary:hover:not([disabled]){background-color:#12344d;background-image:none}.fw-btn--secondary{background-color:#f3f5f7;color:#12344d;border:1px solid #cfd7df;background-image:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#f3f5f7));background-image:linear-gradient(to bottom, #fff, #f3f5f7)}.fw-btn--secondary:active{border:1px solid #ebeff3}.fw-btn--secondary:focus:not([disabled]),.fw-btn--secondary:hover:not([disabled]){background-color:#f3f5f7;background-image:none}.fw-btn--danger{color:#fff;background-color:#d72d30;border:1px solid #c82124;background-image:-webkit-gradient(linear, left top, left bottom, from(#d72d30), to(#c82124));background-image:linear-gradient(to bottom, #d72d30, #c82124)}.fw-btn--danger:focus:not([disabled]),.fw-btn--danger:hover:not([disabled]){background-color:#c82124;background-image:none}.fw-btn--link{background-color:transparent;background-image:none;border:1px solid transparent;color:#2c5cc5}.fw-btn--link:focus:not([disabled]),.fw-btn--link:hover:not([disabled]){background-color:#ebeff3;border-color:#ebeff3}.fw-btn--text{background-color:transparent;background-image:none;border:1px solid transparent;color:#264966}.fw-btn--text:focus:not([disabled]),.fw-btn--text:hover:not([disabled]){background-color:#ebeff3;border-color:#ebeff3}.fw-btn--block{width:100%}.fw-btn--mini{padding:2px 2px;font-size:10px;line-height:10px;min-width:16px;height:16px}.fw-btn--small{padding:5px 8px;font-size:12px;line-height:12px;min-width:70px;height:24px}.fw-btn--icon{min-width:32px;width:32px;padding:0}";

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
     * Disables the button on the interface. If the attribute’s value is undefined, the value is set to false.
     */
    this.disabled = false;
    /**
     * Sets the button to a full-width block. If the attribute’s value is undefined, the value is set to false.
     */
    this.expand = false;
    /**
     * Size of the button.
     */
    this.size = 'normal';
    /**
     *  Accepts the id of the fw-modal component to open it on click
     */
    this.modalTriggerId = '';
  }
  onFocus() {
    this.fwFocus.emit();
  }
  onBlur() {
    this.fwBlur.emit();
  }
  handleClick(event) {
    if (this.modalTriggerId !== '') {
      const modal = document.getElementById(this.modalTriggerId);
      modal.visible = true;
    }
    else if (this.type === 'submit') {
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
    this.fwClick.emit();
  }
  render() {
    return (h(Host, { onClick: (e) => this.disabled ? undefined : this.handleClick(e), onFocus: () => this.onFocus(), onBlur: () => this.onBlur() }, h("button", { type: this.type, class: `
            fw-btn fw-btn--${this.color.toLowerCase()}
            fw-btn--${this.size.toLowerCase()}
            ${this.expand ? 'fw-btn--block' : ''}
            `, disabled: this.disabled }, h("slot", null)), h("fw-label", { color: 'blue', value: 'atomic component' })));
  }
  get host() { return getElement(this); }
};
Button.style = button1Css;

export { Button as fw_button1 };
