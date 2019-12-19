import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
@Component({
  tag: 'fw-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {

  /**
   *  The native button type:
   *  values: `button`, `reset`, `submit`
   */
  @Prop() type: 'button' | 'reset' | 'submit' = 'button';

  /**
   * The theme of the button,
   * Values are : `primary`, `secondary`, `danger`
   */
  @Prop() color: 'primary' | 'secondary' | 'danger' | 'link' | 'text' = 'primary';

  /**
   * Sets the button as disabled when set to true.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Sets the button size to block when set to true.
   */
  @Prop() expand = false;

  /**
   * The size of the button,
   * Values are : `normal`, `mini`
   */
  @Prop() size: 'normal' | 'mini' | 'small' = 'normal';

  /**
   * Emitted when the button is clicked.
   */
  @Event() fwClick!: EventEmitter<void>;

  /**
   * Emitted when the checkbox has focus.
   */
  @Event() fwFocus!: EventEmitter<void>;

  /**
   * Emitted when the checbox loses focus.
   */
  @Event() fwBlur!: EventEmitter<void>;

  private onFocus() {
    this.fwFocus.emit();
  }

  private onBlur() {
    this.fwBlur.emit();
  }

  private handleClick() {
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
