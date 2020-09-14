import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
@Component({
  tag: 'fw-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {

  /**
   *  Button type based on which actions are performed when the button is clicked.
   */
  @Prop() type: 'button' | 'reset' | 'submit' = 'button';

  /**
   * Identifier of  the theme based on which the button is styled.
   */
  @Prop() color: 'primary' | 'secondary' | 'danger' | 'link' | 'text' = 'primary';

  /**
   * Disables the button on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Sets the button to a full-width block. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() expand = false;

  /**
   * Size of the button.
   */
  @Prop() size: 'normal' | 'mini' | 'small' = 'normal';

  /**
   *  Accepts the id of the fw-modal component to open it on click
   */
  @Prop() modalTriggerId = '';

  /**
   *  Accepts the id of the fw-toast component to open it on click
   */
  @Prop() ToastTriggerId = '';

  /**
   * Triggered when the button is clicked.
   */
  @Event() fwClick!: EventEmitter<void>;

  /**
   * Triggered when the button comes into focus.
   */
  @Event() fwFocus!: EventEmitter<void>;

  /**
   * Triggered when the button loses focus.
   */
  @Event() fwBlur!: EventEmitter<void>;

  private onFocus() {
    this.fwFocus.emit();
  }

  private onBlur() {
    this.fwBlur.emit();
  }

  private handleClick() {
    if (this.modalTriggerId !== '') {
      const modal: any = document.getElementById(this.modalTriggerId);
      modal.visible = true;
    } else if (this.ToastTriggerId !== '') {
      document.getElementById(this.ToastTriggerId).trigger({});
    }
    this.fwClick.emit();
  }

  render() {
    return (
    <Host
      onClick={() => this.handleClick()}
      onFocus={() => this.onFocus()}
      onBlur={() => this.onBlur()}>
        <button
          type = {this.type}
          class={`
            fw-btn fw-btn--${this.color.toLowerCase()}
            fw-btn--${this.size.toLowerCase()}
            ${this.expand ? 'fw-btn--block' : ''}
            `}
          disabled = {this.disabled}>
          <slot/>
        </button>
    </Host>);
  }
}
