import { Component, Event, EventEmitter, Host, Method, Prop, State, Watch, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'fw-toast',
  styleUrl: 'toast.scss',
  assetsDirs: ['toast-assets'],
  shadow: true,
})
export class Toast {

  @State() open = false;

  @State() iconName: string;

  @State() isMouseHover: boolean;

  @State() svgHTML = '';

  @State() isTimeOut = false;

  @State() timerId: any;

  @State() fadeOut = false;

  /**
   * Type of the toast - success,failure, warning, inprogress
   */
  @Prop() type: 'success' | 'error' | 'warning' | 'inprogress' = 'warning';

  /**
   * Time duration of the toast visibility
   */
  @Prop() timeout = 2000;

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
   *  Pause the toast from hiding on mouse hover
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
    if (this.open || this.timerId) {
      await this.closeToast();
    }
    Object.keys(configs).forEach(key => {
      this[key] = configs[key];
    });
    this.fadeOut = false;
    this.open = true;
    this.isTimeOut = false;

    this.timerId = setTimeout(async () => {
      if (!this.sticky) {
        if (!this.pauseOnHover || this.pauseOnHover && !this.isMouseHover) {
          await this.closeToast();
        }
        this.isTimeOut = true;
      }
    }, this.timeout);
  }

  async mouseHover(value = false) {
    this.isMouseHover = value;
    if (this.isTimeOut && !this.isMouseHover) {
      await this.closeToast();
    }
  }

  closingAnimation() {
    this.fadeOut = true;
    return new Promise(resolve => setTimeout(() => { this.open = false; resolve(); }, 500));
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
        class={`toast ${this.position} ${this.type} ${this.open ? 'is-open' : ''} ${this.fadeOut ? 'fade-out' : ''}`}
        aria-hidden={this.open ? 'false' : 'true'}
        onmouseover={() => this.mouseHover(true)}
        onmouseout={() => this.mouseHover(false)}
        >
        {/* <div class={`toast ${this.position} ${this.type}`}> */}
        <div>
          { this.type === 'inprogress' ? (
            <fw-spinner class="icon"></fw-spinner>
          ) : (
            <span
            class="icon"
            innerHTML={this.svgHTML}
            ></span>
          )}
          <span class="content">{this.content}</span>
          <fw-icon size={7} name="cross" class="cross" onClick={() => this.closeToast()}></fw-icon>
          { this.actionLinkText.length > 0 ? (
            <div class="action-link" onClick={() => this.fwLinkClick.emit()}>{this.actionLinkText}</div>
          ) : '' }
        </div>
      </Host>
    );
  }
}
