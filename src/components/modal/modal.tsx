import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-modal',
  styleUrl: 'modal.scss',
  shadow: true,
})
export class Modal {
  /**
   * The title text to be displayed on the modal
   */
  @Prop() titleText: string;

  /**
   * The title text to be displayed on the modal
   */
  @Prop() description: string;

  /**
   * The icon to be displayed with the title
   */
  @Prop() icon = '';

  /**
   * The text for the success button
   */
  @Prop() successText = 'OK';

  /**
   * The text for the cancel button
   */
  @Prop() cancelText = 'Cancel';

  /**
   * Size of the modal
   */
  @Prop() size: 'standard' | 'small' | 'large' = 'standard';

  /**
   * Enable custom footer
   */
  @Prop() customFooter = false;

  /**
   * Toggle the visibility of the modal
   */
  @Prop({ mutable: true, reflect: true }) visible = false;

  closeModal() {
    this.visible = false;
  }

  renderIcon() {
    return <fw-icon class="icon" name={this.icon} size={16}></fw-icon>;
  }

  renderFooter() {
    return this.customFooter
      ? <slot name="footer"/>
      : (
      <span>
        <fw-button color="secondary" onClick={() => this.closeModal()}>{this.cancelText}</fw-button>
        <fw-button color="primary">{this.successText}</fw-button>
      </span>
      );
  }

  render() {
    return (
      <div class={{ 'modal-container' : true, 'visible' : this.visible }}>
        <div class={{ 'modal' : true, [this.size] : true }}>
          <div class="modal-header-container">
            <div class="modal-header">
              { this.icon !== '' ? this.renderIcon() : '' }
              <div>
                { this.titleText }
                <div class="description">{this.description}</div>
              </div>
            </div>
            <button class="close-btn" onClick={() => this.closeModal()}>
              <fw-icon name="cross-big"/>
            </button>
          </div>
          <div class="content">
            <slot></slot>
          </div>
          <div class="modal-footer-container">
            <div class="modal-footer">{this.renderFooter()}</div>
          </div>
        </div>
      </div>
    );
  }
}
