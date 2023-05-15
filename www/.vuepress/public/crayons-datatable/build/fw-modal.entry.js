import { r as registerInstance, f as createEvent, h, g as getElement } from './index-4996832f.js';
import { i as isFocusable } from './index-268121b7.js';

const modalCss = ":host{font-family:-apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{font-family:-apple-system, blinkmacsystemfont, Segoe UI, roboto, oxygen, ubuntu, cantarell, Open Sans, Helvetica Neue, sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.modal-container{height:100vh;width:100vw;position:fixed;top:0;right:0;bottom:0;left:0;display:none;z-index:990;background-color:rgba(18, 52, 77, 0.5);-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-transition:all 0.3s linear;transition:all 0.3s linear}.modal{position:relative;max-height:70vh;background:#fff;border-radius:4px;display:-ms-flexbox;display:flex;z-index:999;-ms-flex-direction:column;flex-direction:column;-webkit-animation:\"modal-entry\" 0.5s 1;animation:\"modal-entry\" 0.5s 1}.modal .content{padding:0 32px 32px;height:100%;width:auto;overflow:auto}.standard{width:512px}.small{width:424px}.large{width:800px}.visible{display:-ms-flexbox;display:flex}@-webkit-keyframes modal-entry{0%{-webkit-transform:translateY(-10px);transform:translateY(-10px)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes modal-entry{0%{-webkit-transform:translateY(-10px);transform:translateY(-10px)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}";

let Modal = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwSubmit = createEvent(this, "fwSubmit", 7);
    this.fwOpen = createEvent(this, "fwOpen", 7);
    this.fwClose = createEvent(this, "fwClose", 7);
    /**
     * Modal content element
     */
    this.firstFocusElement = null;
    /**
     * Modal content element
     */
    this.lastFocusElement = null;
    /**
     * The icon to be displayed with the title
     */
    this.icon = '';
    /**
     * Size of the modal
     */
    this.size = 'standard';
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
     * Hide footer for the modal
     */
    this.hideFooter = false;
    /**
     * Toggle the visibility of the modal
     */
    this.isOpen = false;
    /**
     * private
     * flag to add events to elements only on initial modal load
     */
    this.accessibilityAdded = false;
    /**
     * private
     * escape key handler
     */
    this.escapeHandler = null;
  }
  /**
   * lifecycle event, called once just after the component is first connected to the DOM
   */
  componentWillLoad() {
    if (!this.modalTitle) {
      this.modalTitle = this.el.querySelector('fw-modal-title');
      if (this.modalTitle) {
        this.modalTitle.close = this.close.bind(this);
      }
    }
    if (!this.modalFooter) {
      this.modalFooter = this.el.querySelector('fw-modal-footer');
      if (this.modalFooter) {
        this.modalFooter.submit = this.submit.bind(this);
        this.modalFooter.close = this.close.bind(this);
      }
    }
    if (!this.modalContent) {
      this.modalContent = this.el.querySelector('fw-modal-content');
    }
  }
  visibilityChange(open) {
    if (!open) {
      this.removeAccesibilityEvents();
      this.fwClose.emit();
    }
    else {
      this.addAccesibilityEvents();
      this.fwOpen.emit();
    }
  }
  /**
   * Method available from the component to perform close action on the modal
   * @returns promise that resolves to true
   */
  async close() {
    this.isOpen = false;
    return true;
  }
  /**
   * Method available from the component to perform open action on the modal
   * @returns promise that resolves to true
   */
  async open() {
    this.isOpen = true;
    return true;
  }
  /**
   * private submit
   */
  submit() {
    this.fwSubmit.emit();
  }
  /**
   * Adds accesibility related events to the component.
   * Major actions would be to focus-lock inside modal and to focus on close button when opening the component.
   */
  addAccesibilityEvents() {
    if (!this.accessibilityAdded) {
      /**
       * Focus trapping inside Modal. Below function gets all focusable elements from the modal.
       * These include elements inside shadow dom too.
       */
      const getFocuableChildren = (node) => {
        let focusableElements = [];
        const getAllNodes = (element, root = true) => {
          root && (focusableElements = []);
          element = element.shadowRoot ? element.shadowRoot : element;
          element.querySelectorAll('*').forEach((el) => {
            if (isFocusable(el)) {
              focusableElements.push(el);
            }
            else if (el.nodeName === 'SLOT') {
              el.assignedElements({ flatten: true }).forEach((assignedEl) => getAllNodes(assignedEl, false));
            }
            else if (el.shadowRoot) {
              getAllNodes(el, false);
            }
          });
        };
        getAllNodes(node);
        return focusableElements;
      };
      const focusableElements = getFocuableChildren(this.el);
      if (focusableElements.length) {
        this.firstFocusElement = focusableElements[0];
        this.lastFocusElement = focusableElements[focusableElements.length - 1];
        this.lastFocusElement.addEventListener('keydown', (e) => {
          !e.shiftKey &&
            e.keyCode === 9 &&
            this.focusElement(this.firstFocusElement);
        });
        this.firstFocusElement.addEventListener('keydown', (e) => {
          e.shiftKey &&
            e.keyCode == 9 &&
            this.focusElement(this.lastFocusElement);
        });
      }
      if (this.firstFocusElement) {
        const modalContainer = this.el.shadowRoot.querySelector('.modal');
        modalContainer &&
          modalContainer.addEventListener('animationend', () => {
            this.isOpen && this.focusElement(this.firstFocusElement);
          });
      }
      this.accessibilityAdded = true;
    }
    this.escapeHandler = ((e) => {
      if (e.keyCode === 27) {
        this.isOpen = false;
      }
    }).bind(this);
    document.addEventListener('keydown', this.escapeHandler);
  }
  /**
   * Removes accesibility related events bound to the document.
   */
  removeAccesibilityEvents() {
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.escapeHandler = null;
    }
  }
  /**
   * To apply focus to HTML elements after timeout to avoid focus changing issue.
   * When adding focus to an element inside shadow dom, the focus seems to change. The timeout
   * helps fix this issue.
   * @param element element to focus on
   */
  focusElement(element) {
    setTimeout(() => element.focus(), 1);
  }
  /**
   * Renders Icon in Modal header.
   * @returns {JSX.Element}
   */
  renderIcon() {
    return h("fw-icon", { class: 'icon', name: this.icon, size: 16 });
  }
  /**
   * Renders title text and description in modal header.
   * @returns {JSX.Element}
   */
  renderTitle() {
    return (h("fw-modal-title", { icon: this.icon, titleText: this.titleText, description: this.description, close: this.close.bind(this) }));
  }
  /**
   * renders the slot content in the modal.
   * @returns {JSX.Element}
   */
  renderContent() {
    return (h("div", { class: 'content' }, h("slot", null)));
  }
  /**
   * renders the default footer in the modal
   * @returns {JSX.Element}
   */
  renderFooter() {
    return (h("fw-modal-footer", { submitText: this.submitText, cancelText: this.cancelText, submitDisabled: this.submitDisabled, submitColor: this.submitColor, submit: this.submit.bind(this), close: this.close.bind(this) }));
  }
  /**
   * renders either default modal content based on attributes or renders the modal child components like
   * modal-title, modal-content and modal-footer components.
   * @returns {JSX.Element}
   */
  render() {
    return (h("div", { class: { 'modal-container': true, 'visible': this.isOpen } }, h("div", { class: { modal: true, [this.size]: true }, "aria-modal": 'true' }, this.modalTitle ? '' : this.renderTitle(), this.modalContent ? h("slot", null) : this.renderContent(), this.hideFooter ? '' : this.modalFooter ? '' : this.renderFooter())));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "isOpen": ["visibilityChange"]
  }; }
};
Modal.style = modalCss;

export { Modal as fw_modal };
