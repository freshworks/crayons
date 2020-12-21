import { Component, Event, EventEmitter, Host, Method, Prop, State, Watch, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'fw-toast',
  styleUrl: 'toast.scss',
  assetsDirs: ['toast-assets'],
  shadow: true,
})
export class Toast {

  /**
   * visibility state of toast
   */
  @State() isOpen = false;

  /**
   * To indicate mouse hover on toast
   */
  @State() isMouseHovered: boolean;

  /**
   * Icon svg html content
   */
  @State() svgHTML = '';

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
   *  position of the toast notification in screen
   */
  @Prop() position: 'top-center' | 'top-left' | 'top-right' = 'top-center';

  /**
   * Triggered when the action link clicked.
   */
  @Event() fwLinkClick: EventEmitter;

  private async getSVGHTML(iconName: string) {
    const response = await fetch(getAssetPath(`toast-assets/icons/${iconName}.svg`));
    const data = await response.text();
    return data;
  }

  @Watch('type')
  private setSVGState(iconName: string) {
    if (this.type === 'inprogress') {
      return;
    }
    this.getSVGHTML(iconName).then(res => {
      this.svgHTML = res;
    }).catch();
  }

  componentWillLoad() {
    this.setSVGState(this.type);
  }

  @Method()
  async trigger(configs: object) {
    if (this.isOpen || this.timerId) {
      await this.closeToast();
    }
    Object.keys(configs).forEach(key => {
      this[key] = configs[key];
    });
    this.fadeOut = false;
    this.isOpen = true;
    this.isTimedOut = false;

    this.timerId = setTimeout(async () => {
      if (!this.sticky) {
        if (!this.pauseOnHover || this.pauseOnHover && !this.isMouseHovered) {
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
    return new Promise(resolve => setTimeout(() => { this.isOpen = false; resolve(); }, 500));
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
        class={`toast ${this.position} ${this.type} ${this.isOpen ? 'is-open' : ''} ${this.fadeOut ? 'fade-out' : ''}`}
        aria-hidden={this.isOpen ? 'false' : 'true'}
        onmouseover={() => this.mouseHover(true)}
        onmouseout={() => this.mouseHover(false)}
        >
        <div>
          { this.type === 'inprogress' ? (
            <fw-spinner class="icon"></fw-spinner>
          ) : (
            <fw-icon
              class="icon"
              size={this.iconSize}
              name={this.type}
            />
          )}
          <span class="content">{this.content}</span>
          <fw-icon size={7} color="#000" name="cross" class="cross" onClick={() => this.closeToast()}></fw-icon>
          { this.actionLinkText.length > 0 ? (
            <div class="action-link" onClick={() => this.fwLinkClick.emit()}>{this.actionLinkText}</div>
          ) : '' }
        </div>
      </Host>
    );
  }
}
