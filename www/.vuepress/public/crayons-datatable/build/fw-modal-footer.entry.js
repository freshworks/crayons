import { r as registerInstance, h, g as getElement } from './index-4996832f.js';
import { a as hasSlot } from './index-268121b7.js';

const modalFooterCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.modal-footer-container{padding:12px 16px;-webkit-box-sizing:border-box;box-sizing:border-box;height:56px;background-color:#f3f5f7;border-radius:0 0 4px 4px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:end;justify-content:flex-end;-ms-flex:none;flex:none}.modal-footer-container fw-button{margin-left:12px}";

let ModalFooter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * The text for the submit button
     */
    this.submitText = 'OK';
    /**
     * The text for the cancel button
     */
    this.cancelText = 'Cancel';
    /**
     * Default state of submit button
     */
    this.submitDisabled = false;
    /**
     * The color of submit button
     */
    this.submitColor = 'primary';
    /**
     * Set to true if we want to render slot instead of default footer
     */
    this.custom = null;
    /**
     * Function to call on submit of modal
     */
    // eslint-disable-next-line  @typescript-eslint/no-empty-function
    this.submit = () => { };
    /**
     * Function to call on close of modal
     */
    // eslint-disable-next-line  @typescript-eslint/no-empty-function
    this.close = () => { };
  }
  /**
   * lifecycle event, called once just after the component is first connected to the DOM
   */
  componentWillLoad() {
    if (this.custom === null) {
      this.custom = hasSlot(this.el);
    }
  }
  /**
   * render slot when custom attribute is passed, else renders the default footer with submit and cancel buttons
   * @returns {JSX.Element}
   */
  render() {
    return (h("div", { class: 'modal-footer-container' }, h("div", { class: 'modal-footer' }, this.custom ? (h("slot", null)) : (h("span", null, h("fw-button", { color: 'secondary', onClick: () => this.close() }, this.cancelText), h("fw-button", { color: this.submitColor, disabled: this.submitDisabled, onClick: () => this.submit() }, this.submitText))))));
  }
  get el() { return getElement(this); }
};
ModalFooter.style = modalFooterCss;

export { ModalFooter as fw_modal_footer };
