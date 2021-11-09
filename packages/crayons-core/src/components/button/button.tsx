import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';
import { throttle } from '../../utils';
@Component({
  tag: 'fw-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {
  @Element() host: HTMLElement;

  private handleClickWithThrottle;

  /**
   *  Button type based on which actions are performed when the button is clicked.
   */
  @Prop() type: 'button' | 'reset' | 'submit' = 'button';

  /**
   * Identifier of  the theme based on which the button is styled.
   */
  @Prop() color: 'primary' | 'secondary' | 'danger' | 'link' | 'text' =
    'primary';

  /**
   * Disables the button on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Sets the button to a full-width block. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() expand = false;

  /**
   * Loading state for the button, If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() loading = false;

  /**
   * Size of the button.
   */
  @Prop() size: 'normal' | 'mini' | 'small' | 'icon' = 'normal';

  /**
   *  Accepts the id of the fw-modal component to open it on click
   */
  @Prop() modalTriggerId = '';

  /**
   * Sets the delay for throttle in milliseconds. Defaults to 200 milliseconds.
   */
  @Prop() throttleDelay = 200;

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

  connectedCallback() {
    this.handleClickWithThrottle = throttle(
      this.handleClick,
      this,
      this.throttleDelay
    );
  }

  private handleClick(event: Event) {
    if (this.modalTriggerId !== '') {
      this.modalTrigger();
    } else if (this.type === 'submit') {
      this.fakeSubmit(event);
    }

    this.fwClick.emit();
  }

  private async modalTrigger() {
    const modal: any = document.getElementById(this.modalTriggerId);
    modal.open();
  }

  private async fakeSubmit(event: Event) {
    const form = this.host.closest('form');
    if (form) {
      event.preventDefault();
      const fakeSubmit = document.createElement('button');
      fakeSubmit.type = 'submit';
      fakeSubmit.style.display = 'none';
      form.appendChild(fakeSubmit);
      fakeSubmit.click();
      fakeSubmit.remove();
    }
  }

  render() {
    return (
      <Host
        onClick={(e: Event) =>
          this.disabled ? undefined : this.handleClickWithThrottle(e)
        }
        onFocus={() => this.onFocus()}
        onBlur={() => this.onBlur()}
        aria-disabled={this.disabled}
        role='button'
      >
        <button
          type={this.type}
          class={`
            fw-btn fw-btn--${this.color.toLowerCase()}
            fw-btn--${this.size.toLowerCase()}
            ${this.expand ? 'fw-btn--block' : ''}
            ${this.loading ? 'fw-btn--loading' : ''}
            `}
          disabled={this.disabled}
        >
          <span class='fw-btn--label'>
            <slot />
          </span>
          <fw-spinner class='fw-btn--loader'></fw-spinner>
        </button>
      </Host>
    );
  }
}
