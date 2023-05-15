import { r as registerInstance, h } from './index-4996832f.js';

const modalContentCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.content{padding:0 32px 32px;height:100%;width:auto;overflow:auto}";

let ModalContent = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  /**
   * render the slot content directly
   * @returns {JSX.Element}
   */
  render() {
    return (h("div", { class: 'content' }, h("slot", null)));
  }
};
ModalContent.style = modalContentCss;

export { ModalContent as fw_modal_content };
