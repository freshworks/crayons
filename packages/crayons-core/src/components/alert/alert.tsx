import {
  Component,
  Prop,
  h,
  Host,
  Watch,
  Element,
  Method,
  EventEmitter,
  Event,
} from '@stencil/core';

const iconMap = {
  error: 'alert',
  warning: 'info',
  info: 'info',
  success: 'success',
};

const iconColorMap = {
  error: '#e43538',
  warning: '#c7502f',
  info: '#264966',
  success: '#00795b',
};

@Component({
  tag: 'fw-alert',
  styleUrl: 'alert.scss',
  shadow: true,
})
export class Alert {
  @Element() host!: HTMLElement;

  private autoHideTimeout;

  /**
   * Makes the alert closable.
   */
  @Prop() closable = false;

  /**
   * The type of alert to be displayed. Defaults to info.
   */
  @Prop() type: 'success' | 'warning' | 'info' | 'error' = 'info';

  /**
   * The duration in milliseconds for which alert will be shown.
   */
  @Prop() duration = Infinity;

  /**
   * Indicates whether the alert is open or not.
   */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * Triggered when alert is shown.
   */
  @Event() fwShow!: EventEmitter;

  /**
   * Triggered when alert is hidden.
   */
  @Event() fwHide!: EventEmitter;

  startAutoHide() {
    clearTimeout(this.autoHideTimeout);
    if (this.open && this.duration < Infinity) {
      this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
    }
  }

  @Watch('open')
  handleOpen() {
    if (this.open) {
      this.host.style.display = 'flex';

      this.fwShow.emit();

      if (this.duration < Infinity) {
        this.startAutoHide();
      }
    } else {
      clearTimeout(this.autoHideTimeout);

      this.host.style.display = 'none';

      this.fwHide.emit();
    }
  }

  @Watch('duration')
  handleDurationChange() {
    this.startAutoHide();
  }

  @Method()
  async show() {
    if (this.open) {
      return;
    }
    this.open = true;
  }

  @Method()
  async hide() {
    if (!this.open) {
      return;
    }
    this.open = false;
  }

  connectedCallback() {
    this.host.style.display = this.open ? 'flex' : 'none';
  }

  handleKeyUp(e) {
    if (e.code === 'Enter') {
      e.preventDefault();
      this.hide();
    }
  }

  handleClose() {
    this.hide();
  }

  render() {
    return (
      <Host role='alert' aria-hidden={this.open ? 'false' : 'true'}>
        <div class={'alert ' + 'alert--' + this.type}>
          <span class='alert__icon'>
            <fw-icon
              name={iconMap[this.type]}
              color={iconColorMap[this.type]}
            ></fw-icon>
          </span>
          <span class='alert__message'>
            <slot />
          </span>
          {this.closable && (
            <span
              class='alert__close'
              role='button'
              tabindex='0'
              onKeyUp={(e) => this.handleKeyUp(e)}
              onClick={() => this.handleClose()}
            >
              <fw-icon name='cross' color='#12344d' size={8}></fw-icon>
            </span>
          )}
        </div>
      </Host>
    );
  }
}
