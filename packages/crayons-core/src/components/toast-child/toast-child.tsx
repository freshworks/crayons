import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  h,
} from '@stencil/core';
import { handleKeyDown } from '../../utils';

@Component({
  tag: 'fw-toast-child',
  styleUrl: 'toast-child.scss',
  shadow: true,
})
export class ToastChild {
  @Element() controllerEl: HTMLElement;
  /**
   * visibility state of toast
   */
  @State() isOpen = false;

  /**
   * To indicate mouse hover on toast
   */
  @State() isMouseHovered: boolean;

  /**
   * To indicate toast close timeout
   */
  @State() isTimedOut = false;

  /**
   * stored setTimeOut id to close it
   */
  @State() timerId: any;

  /**
   * To add close animation class to toast
   */
  @State() fadeOut = false;

  /**
   * State icon size
   */
  @State() iconSize = 14;

  /**
   * Type of the toast - success,failure, warning, inprogress
   */
  @Prop() type: 'success' | 'error' | 'warning' | 'inprogress' = 'warning';

  /**
   * Time duration of the toast visibility
   */
  @Prop() timeout = 4000;

  /**
   * The content to be diaplyed in toast
   */
  @Prop() content: string;

  /**
   *  The Content of the action link
   */
  @Prop() actionLinkText = '';

  /**
   *  won't close automatically
   */
  @Prop() sticky = false;

  /**
   *  Pause the toast from hiding on mouse hover
   */
  @Prop() pauseOnHover: boolean;

  /**
   * Triggered when the action link clicked.
   */
  @Event() fwLinkClick: EventEmitter;

  /**
   * Triggered on closing the toast message.
   * This event gets used by the parent container to remove the toast message from itself
   */
  @Event() fwRemoveToast: EventEmitter;

  async componentWillLoad(): Promise<void> {
    this.fadeOut = false;
    this.isOpen = true;
    this.isTimedOut = false;

    this.timerId = setTimeout(async () => {
      if (!this.sticky) {
        if (!this.pauseOnHover || (this.pauseOnHover && !this.isMouseHovered)) {
          await this.closeToast();
        }
        this.isTimedOut = true;
      }
    }, this.timeout);
  }

  async mouseHover(value = false): Promise<void> {
    this.isMouseHovered = value;
    if (this.isTimedOut && !this.isMouseHovered) {
      await this.closeToast();
    }
  }

  closingAnimation(): Promise<void> {
    this.fadeOut = true;
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        this.isOpen = false;
        this.fwRemoveToast.emit(this.controllerEl);
        resolve();
      }, 500)
    );
  }

  async closeToast(): Promise<void> {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    await this.closingAnimation();
  }

  render(): JSX.Element {
    return (
      <Host
        class={`${this.isOpen ? 'is-open' : ''} ${
          this.fadeOut ? 'fade-out' : ''
        }`}
        onmouseover={() => this.mouseHover(true)}
        onmouseout={() => this.mouseHover(false)}
      >
        <div
          class={`toast ${this.type}`}
          aria-hidden={this.isOpen ? 'false' : 'true'}
        >
          {this.type === 'inprogress' ? (
            <fw-spinner class='icon'></fw-spinner>
          ) : (
            <fw-icon class='icon' size={this.iconSize} name={this.type} />
          )}
          <span class='content'>{this.content}</span>
          <fw-icon
            size={7}
            color='#000'
            name='cross'
            class='cross'
            onClick={() => this.closeToast()}
          ></fw-icon>
          {this.actionLinkText.length > 0 ? (
            <div
              class='action-link'
              role='button'
              tabindex='0'
              onClick={() => this.fwLinkClick.emit()}
              onKeyDown={handleKeyDown(() => this.fwLinkClick.emit())}
            >
              {this.actionLinkText}
            </div>
          ) : (
            ''
          )}
        </div>
      </Host>
    );
  }
}
