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
  tag: 'fw-toast',
  styleUrl: 'toast.scss',
  shadow: true,
})
export class Toast {
  @Element() controllerEl: HTMLElement;
  /**
   * visibility state of toast
   */
  @State() isOpen = true;

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
  @Prop({ mutable: true }) type:
    | 'success'
    | 'error'
    | 'warning'
    | 'inprogress' = 'warning';

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
   * Remove toast element from the parent on closing toast message
   */
  @Event() private removeToastChild: EventEmitter<any>;

  // @Method()
  // async trigger(configs: any) {
  //   if (this.isOpen || this.timerId) {
  //     await this.closeToast();
  //   }
  //   Object.keys(configs).forEach((key) => {
  //     this[key] = configs[key];
  //   });
  //   this.fadeOut = false;
  //   this.isOpen = true;
  //   this.isTimedOut = false;

  //   this.timerId = setTimeout(async () => {
  //     if (!this.sticky) {
  //       if (!this.pauseOnHover || (this.pauseOnHover && !this.isMouseHovered)) {
  //         await this.closeToast();
  //       }
  //       this.isTimedOut = true;
  //     }
  //   }, this.timeout);
  // }

  async componentWillLoad() {
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

  async mouseHover(value = false) {
    this.isMouseHovered = value;
    if (this.isTimedOut && !this.isMouseHovered) {
      await this.closeToast();
    }
  }

  closingAnimation() {
    this.fadeOut = true;
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        this.isOpen = false;
        this.removeToastChild.emit(this.controllerEl);
        resolve();
      }, 500)
    );
  }

  async closeToast() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    await this.closingAnimation();
  }

  render() {
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
