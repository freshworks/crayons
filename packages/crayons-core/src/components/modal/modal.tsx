import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

@Component({
  tag: 'fw-modal',
  styleUrl: 'modal.scss',
  shadow: true,
})
export class Modal {
  /**
   * To get access to the host element
   */
  @Element() el: HTMLFwModalElement;

  /**
   * Modal title element
   */
  @State() modalTitle: HTMLFwModalTitleElement;

  /**
   * Modal footer element
   */
  @State() modalFooter: HTMLFwModalFooterElement;

  /**
   * Modal content element
   */
  @State() modalContent: HTMLFwModalContentElement;

  /**
   * Modal content element
   */
  @State() firstFocusElement: HTMLElement = null;

  /**
   * Modal content element
   */
  @State() lastFocusElement: HTMLElement = null;

  /**
   * The title text to be displayed on the modal
   */
  @Prop() titleText: string;

  /**
   * The description text to be displayed on the modal
   */
  @Prop() description: string;

  /**
   * The icon to be displayed with the title
   */
  @Prop() icon = '';

  /**
   * Size of the modal
   */
  @Prop() size: 'standard' | 'small' | 'large' = 'standard';

  /**
   * The text for the submit button
   */
  @Prop() submitText = 'OK';

  /**
   * The text for the cancel button
   */
  @Prop() cancelText = 'Cancel';

  /**
   * Default state of submit button
   */
  @Prop() submitDisabled = false;

  /**
   * The color of submit button
   */
  @Prop() submitColor: 'primary' | 'secondary' | 'danger' | 'link' | 'text' =
    'primary';

  /**
   * Toggle the visibility of the modal
   */
  @Prop({ mutable: true, reflect: true }) isOpen = false;

  /**
   * Triggered when the default action button is clicked.
   */
  @Event({ eventName: 'fwSubmit' }) fwSubmit!: EventEmitter<void>;

  /**
   * Triggered when modal is opened.
   */
  @Event({ eventName: 'fwOpen' }) fwOpen!: EventEmitter<void>;

  /**
   * Triggered when modal is closed.
   */
  @Event({ eventName: 'fwClose' }) fwClose!: EventEmitter<void>;

  /**
   * private
   * flag to add events to elements only on initial modal load
   */
  accessibilityAdded = false;

  /**
   * private
   * escape key handler
   */
  escapeHandler = null;

  /**
   * lifecycle event that gets triggered before every render
   */
  componentWillRender() {
    if (!this.modalTitle) {
      this.modalTitle = this.el.querySelector('fw-modal-title');
      if (this.modalTitle) {
        this.modalTitle.close = this.closeModal.bind(this);
      }
    }
    if (!this.modalFooter) {
      this.modalFooter = this.el.querySelector('fw-modal-footer');
      if (this.modalFooter) {
        this.modalFooter.submit = this.submitModal.bind(this);
        this.modalFooter.close = this.closeModal.bind(this);
      }
    }
    if (!this.modalContent) {
      this.modalContent = this.el.querySelector('fw-modal-content');
    }
  }

  @Watch('isOpen')
  visibilityChange(open: boolean) {
    if (!open) {
      this.removeAccesibilityEvents();
      this.fwClose.emit();
    } else {
      this.addAccesibilityEvents();
      this.fwOpen.emit();
    }
  }

  /**
   * Method available from the component to perform close action on the modal
   * @returns promise which resolves to true on closing
   */
  @Method()
  async close() {
    this.closeModal();
    return Promise.resolve(true);
  }

  /**
   * private closeModal
   */
  closeModal() {
    this.isOpen = false;
  }

  /**
   * private submitModal
   */
  submitModal() {
    this.fwSubmit.emit();
  }

  /**
   * Helps determine if an element can be focused or not.
   * @param element element that we must determine if it is focusable or not.
   * @returns {Boolean} true if focusable else false.
   */
  isFocusable(element) {
    if (element.tabIndex < 0) {
      return false;
    }
    if (element.disabled) {
      return false;
    }
    switch (element.nodeName) {
      case 'A':
        return !!element.href && element.rel != 'ignore';
      case 'INPUT':
        return element.type != 'hidden';
      case 'BUTTON':
      case 'SELECT':
      case 'TEXTAREA':
        return true;
      default:
        return false;
    }
  }

  /**
   * Adds accesibility related events to the component.
   * Major actions would be to focus-lock inside modal and to focus on close button when opening the component.
   */
  addAccesibilityEvents() {
    if (!this.accessibilityAdded) {
      /**
       * Focus trapping inside Modal
       */
      const getFocuableChildren = (node: HTMLElement) => {
        let focusableElements = [];
        const getAllNodes = (element: any, root = true) => {
          if (root) {
            focusableElements = [];
          }
          element = element.shadowRoot ? element.shadowRoot : element;
          element.querySelectorAll('*').forEach((el: any) => {
            if (el.nodeName === 'SLOT') {
              el.assignedElements({ flatten: true }).forEach(
                (assignedEl: HTMLElement) => {
                  getAllNodes(assignedEl, false);
                }
              );
            }
            if (this.isFocusable(el)) {
              focusableElements.push(el);
            } else if (el.shadowRoot) {
              getAllNodes(el, false);
            }
          });
        };
        getAllNodes(node);
        return focusableElements;
      };
      const focusableElements = getFocuableChildren(this.el);
      console.log(focusableElements);
      if (focusableElements.length) {
        this.firstFocusElement = focusableElements[0];
        this.lastFocusElement = focusableElements[focusableElements.length - 1];
        this.lastFocusElement.addEventListener('keydown', (e: any) => {
          if (e.keyCode === 9) {
            this.firstFocusElement.focus();
          }
        });
        this.firstFocusElement.addEventListener('keydown', (e: any) => {
          if (e.shiftKey && e.keyCode == 9) {
            this.lastFocusElement.focus();
          }
        });
      }
      this.accessibilityAdded = true;
    }
    if (this.firstFocusElement) {
      this.firstFocusElement.focus();
    }
    this.escapeHandler = ((e: any) => {
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
   * Renders Icon in Modal header.
   * @returns {JSX.Element}
   */
  renderIcon(): JSX.Element {
    return <fw-icon class='icon' name={this.icon} size={16}></fw-icon>;
  }

  /**
   * Renders title text and description in modal header.
   * @returns {JSX.Element}
   */
  renderTitle(): JSX.Element {
    return (
      <fw-modal-title
        icon={this.icon}
        titleText={this.titleText}
        description={this.description}
        close={this.closeModal.bind(this)}
      ></fw-modal-title>
    );
  }

  /**
   * renders the slot content in the modal.
   * @returns {JSX.Element}
   */
  renderContent(): JSX.Element {
    return (
      <div class='content'>
        <slot></slot>
      </div>
    );
  }

  /**
   * renders the default footer in the modal
   * @returns {JSX.Element}
   */
  renderFooter(): JSX.Element {
    return (
      <fw-modal-footer
        submitText={this.submitText}
        cancelText={this.cancelText}
        submitDisabled={this.submitDisabled}
        submitColor={this.submitColor}
        submit={this.submitModal.bind(this)}
        close={this.closeModal.bind(this)}
      ></fw-modal-footer>
    );
  }

  /**
   * renders either default modal content based on attributes or renders the modal child components like
   * modal-title, modal-content and modal-footer components.
   * @returns {JSX.Element}
   */
  render(): JSX.Element {
    return (
      <div class={{ 'modal-container': true, 'visible': this.isOpen }}>
        <div class={{ modal: true, [this.size]: true }}>
          {this.modalTitle ? '' : this.renderTitle()}
          {this.modalContent ? <slot></slot> : this.renderContent()}
          {this.modalFooter ? '' : this.renderFooter()}
        </div>
      </div>
    );
  }
}
