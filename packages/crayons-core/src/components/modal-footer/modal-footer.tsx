import { Component, Element, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-modal-footer',
  styleUrl: 'modal-footer.scss',
  shadow: true,
})
export class ModalFooter {
  @Element() el: HTMLElement;

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
   * Set to true if we want to render slot instead of default footer
   */
  @Prop() custom = false;

  /**
   * Function to call on submit of modal
   */
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  @Prop() submit: any = () => {};

  /**
   * Function to call on close of modal
   */
  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  @Prop() close: any = () => {};

  /**
   * render slot when custom attribute is passed, else renders the default footer with submit and cancel buttons
   * @returns {JSX.Element}
   */
  render(): JSX.Element {
    return this.custom ? (
      <slot></slot>
    ) : (
      <div class='modal-footer-container'>
        <div class='modal-footer'>
          <span>
            <fw-button color='secondary' onClick={() => this.close()}>
              {this.cancelText}
            </fw-button>
            <fw-button
              color={this.submitColor}
              disabled={this.submitDisabled}
              onClick={() => this.submit()}
            >
              {this.submitText}
            </fw-button>
          </span>
        </div>
      </div>
    );
  }
}
