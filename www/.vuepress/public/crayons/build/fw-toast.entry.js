import { r as registerInstance, i as h, k as Host } from './index-44c267ce.js';
import { c as createToastStack, a as createToastNotification } from './toast-util-1470a081.js';
import './index-9d2a65d7.js';

let Toast = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     *  position of the toast notification in screen
     */
    this.position = 'top-center';
    /**
     * Time duration of the toast visibility
     */
    this.timeout = 4000;
    /**
     * Type of the toast - success,failure, warning, inprogress
     */
    this.type = 'warning';
    /**
     *  The Content of the action link
     */
    this.actionLinkText = '';
    /**
     *  won't close automatically
     */
    this.sticky = false;
  }
  componentWillLoad() {
    this.toastContainer = createToastStack(this);
  }
  async trigger(opts) {
    createToastNotification(opts, this.toastContainer, this);
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
};

export { Toast as fw_toast };
