import { r as registerInstance, h, e as Host } from './index-4996832f.js';
import { c as createToastStack, a as createToastNotification } from './toast-util-96968d8c.js';

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
