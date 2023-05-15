import { r as registerInstance, h as createEvent, i as h, j as getElement } from './index-44c267ce.js';
import { i as isFocusable } from './index-9d2a65d7.js';
import { i as i18n } from './Translation-aed16280.js';

const modalCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.modal-overlay{height:100vh;width:100vw;position:fixed;top:0;right:0;bottom:0;inset-inline-start:0;display:none;z-index:990;background-color:rgba(18, 52, 77, 0.5);-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-transition:all 0.3s linear;transition:all 0.3s linear}.modal{position:relative;display:-ms-flexbox;display:flex;max-height:70vh;background:#fff;-webkit-box-shadow:0px 2px 18px rgba(18, 52, 77, 0.2);box-shadow:0px 2px 18px rgba(18, 52, 77, 0.2);border-radius:4px;z-index:999;-webkit-animation:\"modal-entry\" 0.5s 1;animation:\"modal-entry\" 0.5s 1;overflow-wrap:anywhere;word-break:break-word;white-space:normal}.modal .modal-container{position:relative;width:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.modal .modal-container .content{padding:0px 32px 32px;overflow:visible;-webkit-box-sizing:border-box;box-sizing:border-box}.modal .close-btn{background-color:transparent;background-image:none;border:1px solid transparent;color:#264966;padding:4px 6px;min-width:16px;height:24px;position:absolute;top:8px;right:8px;-webkit-transition:all 0.3s;transition:all 0.3s;z-index:1}.modal .close-btn:hover,.modal .close-btn:focus{background-color:#ebeff3;border-radius:4px;border-color:#ebeff3;cursor:pointer}.standard{width:512px}.small{width:424px}.large{width:800px}.modal-overlay.slider{-ms-flex-pack:end;justify-content:flex-end}.modal-overlay.slider .modal{height:100vh;max-height:100vh;border-radius:0px;width:600px;-webkit-animation:\"modal-entry-right\" 0.5s 1;animation:\"modal-entry-right\" 0.5s 1}.modal-overlay.slider .modal .close-btn{height:24px;width:24px;-webkit-box-sizing:border-box;box-sizing:border-box;top:0px;right:600px;background-color:#12344d;border-start-start-radius:2px;border-start-end-radius:0px;border-end-end-radius:0px;border-end-start-radius:2px;padding:0px;margin:0px;line-height:24px;text-align:center}.modal-overlay.slider .modal .close-btn:hover,.modal-overlay.slider .modal .close-btn:focus,.modal-overlay.slider .modal .close-btn:focus-visible{background-color:#12344d;border-start-start-radius:2px;border-start-end-radius:0px;border-end-end-radius:0px;border-end-start-radius:2px;border-color:#12344d;outline:0px}.modal-overlay.slider .modal .close-btn:focus,.modal-overlay.slider .modal .close-btn:focus-visible{border:1px solid #2c5cc5;-webkit-box-shadow:#2c5cc5 0px 0px 0px 1px;box-shadow:#2c5cc5 0px 0px 0px 1px}.modal-overlay.slider .modal .close-btn fw-icon{height:12px;width:12px}.modal-overlay.slider .modal.small,.modal-overlay.slider .modal.standard,.modal-overlay.slider .modal.large{width:600px}.visible{display:-ms-flexbox;display:flex}@-webkit-keyframes modal-entry{0%{-webkit-transform:translateY(-10px);transform:translateY(-10px)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes modal-entry{0%{-webkit-transform:translateY(-10px);transform:translateY(-10px)}100%{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes modal-entry-right{0%{-webkit-transform:translateX(calc(100% - 520px));transform:translateX(calc(100% - 520px))}100%{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes modal-entry-right{0%{-webkit-transform:translateX(calc(100% - 520px));transform:translateX(calc(100% - 520px))}100%{-webkit-transform:translateX(0);transform:translateX(0)}}";

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
     * Property to add or remove the top right close icon button
     */
    this.hasCloseIconButton = true;
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
    this.submitText = '';
    /**
     * The text for the cancel button
     */
    this.cancelText = '';
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
     * Convert modal to slider
     */
    this.slider = false;
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
    /**
     * private
     * styleVariation styles that vary in normal and slider variations
     */
    this.styleVariation = {
      closeColor: {
        modal: '#475867',
        slider: '#FFFFFF',
      },
      closeSize: {
        modal: 10,
        slider: 12,
      },
      closeName: {
        modal: 'cross',
        slider: 'cross-big',
      },
    };
  }
  /**
   * lifecycle event, called once just after the component is first connected to the DOM
   */
  componentWillLoad() {
    if (!this.modalTitle) {
      this.modalTitle = this.el.querySelector('fw-modal-title');
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
    if (this.hideFooter && this.modalFooter) {
      this.modalFooter.style.display = 'none';
    }
    if (!this.modalContent && (this.modalTitle || this.modalFooter)) {
      /**
       * Error that occurs when fw-modal-header or fw-modal-footer is used without
       * fw-modal-content component. If this not handled, the content that goes inside
       * fw-modal-content would have fw-modal-header or fw-modal-footer.
       * This would lead to unexpected results such as header or footer having padding and scroll.
       */
      throw new Error('Composition Error: fw-modal component must have fw-modal-content component when \
         either fw-modal-header or fw-modal-footer components are used for modal composition');
    }
  }
  visibilityChange(open) {
    if (!open) {
      document.body.style.overflow = 'auto';
      this.removeAccesibilityEvents();
      this.fwClose.emit();
    }
    else {
      document.body.style.overflow = 'hidden';
      this.addAccesibilityEvents();
      this.fwOpen.emit();
    }
  }
  footerVisibilityChange(hideFooter) {
    if (this.modalFooter) {
      if (hideFooter) {
        this.modalFooter.style.display = 'none';
      }
      else {
        this.modalFooter.style.display = 'block';
      }
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
            e.keyCode === 9 &&
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
    return (h("fw-modal-title", { icon: this.icon, titleText: this.titleText, description: this.description }));
  }
  /**
   * renders the slot content in the modal.
   * @returns {JSX.Element}
   */
  renderContent() {
    return (h("fw-modal-content", null, h("slot", null)));
  }
  /**
   * renders the default footer in the modal
   * @returns {JSX.Element}
   */
  renderFooter() {
    return (h("fw-modal-footer", { submitText: this.submitText, cancelText: this.cancelText, submitDisabled: this.submitDisabled, submitColor: this.submitColor, submit: this.submit.bind(this), close: this.close.bind(this), style: { display: this.hideFooter ? 'none' : 'block' } }));
  }
  /**
   * renders either default modal content based on attributes or renders the modal child components like
   * modal-title, modal-content and modal-footer components.
   * @returns {JSX.Element}
   */
  render() {
    const variation = this.styleVariation;
    return (h("div", { class: {
        'modal-overlay': true,
        'visible': this.isOpen,
        'slider': this.slider,
      } }, h("div", { class: { modal: true, [this.size]: true }, "aria-modal": 'true' }, this.hasCloseIconButton && (h("button", { class: 'close-btn', onClick: () => this.close() }, h("fw-icon", { name: this.slider
        ? variation.closeName.slider
        : variation.closeName.modal, library: 'system', color: this.slider
        ? variation.closeColor.slider
        : variation.closeColor.modal, size: this.slider
        ? variation.closeSize.slider
        : variation.closeSize.modal }))), h("div", { class: 'modal-container' }, this.modalTitle ? '' : this.titleText ? this.renderTitle() : '', this.modalContent ? h("slot", null) : this.renderContent(), this.modalFooter ? '' : this.renderFooter()))));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "isOpen": ["visibilityChange"],
    "hideFooter": ["footerVisibilityChange"]
  }; }
};
__decorate([
  i18n({ keyName: 'modal.ok' })
], Modal.prototype, "submitText", void 0);
__decorate([
  i18n({ keyName: 'modal.cancel' })
], Modal.prototype, "cancelText", void 0);
Modal.style = modalCss;

export { Modal as fw_modal };
