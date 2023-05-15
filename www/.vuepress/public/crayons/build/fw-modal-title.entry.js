import { r as registerInstance, i as h, j as getElement } from './index-44c267ce.js';
import { a as hasSlot } from './index-9d2a65d7.js';

const modalTitleCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.modal-header-container{padding:32px 32px 0;position:relative;background:#fff;border-start-start-radius:4px;border-start-end-radius:4px;border-end-end-radius:0px;border-end-start-radius:0px;-webkit-transition:all 0.1s linear;transition:all 0.1s linear;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex:none;flex:none}.modal-header-container .modal-header{width:100%;height:auto;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;font-size:18px;font-weight:600;line-height:24px;color:#12344d}.modal-header-container .modal-header .modal-header-body{width:100%;height:auto;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:0px}.modal-header-container .modal-header .modal-header-body .modal-title{width:100%;height:auto;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;gap:10px;color:#12344d}.modal-header-container .modal-header .modal-header-body .modal-title .modal-title-icon{width:auto;height:24px;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.modal-header-container .modal-header .modal-header-body .modal-title .title-label{font-size:18px;font-weight:600;line-height:24px}.modal-header-container .modal-header .modal-header-body .description{font-size:14px;font-weight:400;color:#475867;line-height:20px;padding:6px 0px}";

let ModalTitle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * The icon to be displayed with the title
     */
    this.icon = '';
    /**
     * Set to true if we want to render slot instead of default footer
     */
    this.custom = null;
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
   * renders Icon in Modal header.
   * @returns {JSX.Element}
   */
  renderIcon() {
    return (h("span", { class: 'modal-title-icon' }, h("fw-icon", { name: this.icon, size: 16 })));
  }
  /**
   * renders slot content when custom attribute is passed, else displays the default
   * icon, title and description with close button in the header.
   * @returns {JSX.Element}
   */
  render() {
    return (h("div", { class: 'modal-header-container' }, h("div", { class: 'modal-header' }, this.custom ? (h("slot", null)) : (h("div", { class: 'modal-header-body' }, h("div", { class: 'modal-title' }, this.icon !== '' ? this.renderIcon() : null, h("label", { class: 'title-label' }, this.titleText)), this.description && (h("label", { class: 'description' }, this.description)))))));
  }
  get el() { return getElement(this); }
};
ModalTitle.style = modalTitleCss;

export { ModalTitle as fw_modal_title };
