import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
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
  @Prop() type = 'button';

  /**
   * The theme of the button,
   * Values are : `primary`, `secondary`, `danger`
   */
  @Prop() color = 'primary';

  /**
   * Sets the button as disabled when set to true.
   */
  @Prop() disabled = false;

  /**
   * Sets the button size to block when set to true.
   */
  @Prop() expand = false;

  /**
   * The size of the button,
   * Values are : `normal`, `mini`
   */
  @Prop() size = 'normal';

  /**
   * Emitted when the button is clicked.
   */
  @Event() fwClick!: EventEmitter<void>;

  render() {
    return <button
            type = {this.type}
            onClick={() => this.fwClick.emit()}
            class={`
              btn btn--${this.color.toLowerCase()}
              btn--${this.size.toLowerCase()}
              ${this.expand ? 'btn--block' : ''}
              `}
            disabled = {this.disabled}>
              <slot/>
          </button>;
  }
}
