import { r as registerInstance, h, g as getElement } from './index-4996832f.js';
import { a as hasSlot } from './index-268121b7.js';

const modalTitleCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.modal-header-container{padding:32px 32px 12px;position:relative;background:#fff;border-radius:4px 4px 0 0;-webkit-transition:all 0.1s linear;transition:all 0.1s linear;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex:none;flex:none}.modal-header-container .modal-header{font-size:18px;font-weight:600;margin:0;line-height:1.1;display:-ms-flexbox;display:flex}.modal-header-container .modal-header .description{font-size:12px;font-weight:300;color:#475867;line-height:1.6}.modal-header-container .icon{margin-right:8px}.modal-header-container .close-btn{background-color:transparent;background-image:none;border:1px solid transparent;color:#264966;padding:4px 6px;min-width:16px;height:24px;position:absolute;top:8px;right:8px;-webkit-transition:all 0.3s;transition:all 0.3s}.modal-header-container .close-btn:hover,.modal-header-container .close-btn:focus{background-color:#ebeff3;border-radius:4px;border-color:#ebeff3;cursor:pointer}";

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
   * renders Icon in Modal header.
   * @returns {JSX.Element}
   */
  renderIcon() {
    return h("fw-icon", { class: 'icon', name: this.icon, size: 16 });
  }
  /**
   * renders slot content when custom attribute is passed, else displays the default
   * icon, title and description with close button in the header.
   * @returns {JSX.Element}
   */
  render() {
    return (h("div", { class: 'modal-header-container' }, h("div", { class: 'modal-header' }, this.custom ? (h("slot", null)) : (h("div", null, this.icon !== '' ? this.renderIcon() : '', h("div", null, this.titleText, h("div", { class: 'description' }, this.description))))), h("button", { class: 'close-btn', onClick: () => this.close() }, h("fw-icon", { name: 'cross-big' }))));
  }
  get el() { return getElement(this); }
};
ModalTitle.style = modalTitleCss;

export { ModalTitle as fw_modal_title };
