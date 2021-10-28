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
import { isFocusable } from '../../utils';

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
   * Hide footer for the modal
   */
  @Prop() hideFooter = false;

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
   * @returns promise that resolves to true
   */
  @Method()
  async close() {
    this.closeModal();
    return true;
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
   * Adds accesibility related events to the component.
   * Major actions would be to focus-lock inside modal and to focus on close button when opening the component.
   */
  addAccesibilityEvents() {
    if (!this.accessibilityAdded) {
      /**
       * Focus trapping inside Modal. Below function gets all focusable elements from the modal.
       * These include elements inside shadow dom too.
       */
      const getFocuableChildren = (node: HTMLElement) => {
        let focusableElements = [];
        const getAllNodes = (element: any, root = true) => {
          root && (focusableElements = []);
          element = element.shadowRoot ? element.shadowRoot : element;
          element.querySelectorAll('*').forEach((el: any) => {
            if (isFocusable(el)) {
              focusableElements.push(el);
            } else if (el.nodeName === 'SLOT') {
              el.assignedElements({ flatten: true }).forEach(
                (assignedEl: HTMLElement) => getAllNodes(assignedEl, false)
              );
            } else if (el.shadowRoot) {
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
        this.lastFocusElement.addEventListener('keydown', (e: any) => {
          !e.shiftKey &&
            e.keyCode === 9 &&
            this.focusElement(this.firstFocusElement);
        });
        this.firstFocusElement.addEventListener('keydown', (e: any) => {
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
   * To apply focus to HTML elements after timeout to avoid focus changing issue.
   * When adding focus to an element inside shadow dom, the focus seems to change. The timeout
   * helps fix this issue.
   * @param element element to focus on
   */
  focusElement(element: HTMLElement) {
    setTimeout(() => element.focus(), 1);
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
        <div class={{ modal: true, [this.size]: true }} aria-modal='true'>
          {this.modalTitle ? '' : this.renderTitle()}
          {this.modalContent ? <slot></slot> : this.renderContent()}
          {this.hideFooter ? '' : this.modalFooter ? '' : this.renderFooter()}
        </div>
      </div>
    );
  }
}
