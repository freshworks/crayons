import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'fw-modal-title',
  styleUrl: 'modal-title.scss',
  shadow: true,
})
export class ModalTitle {
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
   * Set to true if we want to render slot instead of default footer
   */
  @Prop() custom = false;

  // eslint-disable-next-line  @typescript-eslint/no-empty-function
  @Prop() close: any = () => {};

  /**
   * renders Icon in Modal header.
   * @returns {JSX.Element}
   */
  renderIcon(): JSX.Element {
    return <fw-icon class='icon' name={this.icon} size={16}></fw-icon>;
  }

  /**
   * renders slot content when custom attribute is passed, else displays the default
   * icon, title and description with close button in the header.
   * @returns {JSX.Element}
   */
  render(): JSX.Element {
    return this.custom ? (
      <slot></slot>
    ) : (
      <div class='modal-header-container'>
        <div class='modal-header'>
          {this.icon !== '' ? this.renderIcon() : ''}
          <div>
            {this.titleText}
            <div class='description'>{this.description}</div>
          </div>
        </div>
        <button class='close-btn' onClick={() => this.close()}>
          <fw-icon name='cross-big' />
        </button>
      </div>
    );
  }
}
