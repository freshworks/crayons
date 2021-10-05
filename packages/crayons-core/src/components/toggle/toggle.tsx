import {
  Component,
  Event,
  Element,
  EventEmitter,
  Prop,
  Watch,
  h,
  Host,
} from '@stencil/core';
@Component({
  tag: 'fw-toggle',
  styleUrl: 'toggle.scss',
  shadow: true,
})
export class Toggle {
  @Element() host!: HTMLElement;
  /**
   * Sets the selected state as the default state. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() active = false;
  /**
   * @deprecated use active instead.
   * Sets the selected state as the default state. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ mutable: true }) checked = false;
  /**
   * Size of the input control.
   */
  @Prop() size: 'small' | 'medium' | 'large' = 'medium';
  /**
   * Name of the component, saved as part of the form data.
   */
  @Prop() name = '';
  /**
   * Specifies whether to disable the control on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() disabled = false;
  /**
   * Specifies whether to show the check and cancel icons on toggle button. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() showicon = false;
  /**
   * Label for the component, that can be used by screen readers.
   */
  @Prop() label = '';
  /**
   * Triggered when the input control is selected or deselected.
   */
  @Event() fwChange: EventEmitter;

  connectedCallback() {
    if (this.showicon) {
      if (this.active) {
        this.host.style.setProperty('--bg-img', 'var(--checkIcon)');
      } else {
        this.host.style.setProperty('--bg-img', 'var(--cancelIcon)');
      }
    }
  }

  handleKeyDown(ev: KeyboardEvent) {
    if (ev.code === 'Space' || ev.code === 'Enter') {
      ev.preventDefault();
      this.toggle();
    }
  }

  @Watch('active')
  watchHandler(newValue: boolean) {
    if (this.showicon) {
      if (this.active) {
        this.host.style.setProperty('--bg-img', 'var(--checkIcon)');
      } else {
        this.host.style.setProperty('--bg-img', 'var(--cancelIcon)');
      }
    }
    this.fwChange.emit({ active: newValue });
  }

  private toggle = (): void => {
    if (!this.disabled) {
      this.active = !this.active;
    }
  };

  render() {
    return (
      <Host
        onClick={() => this.toggle()}
        onKeyDown={(ev) => this.handleKeyDown(ev)}
        tabindex='0'
        role='switch'
        aria-disabled={this.disabled ? 'true' : 'false'}
        aria-checked={`${this.active}`}
        aria-label={`${this.label}`}
      >
        <div
          class={{
            'toggle-switch': true,
            [this.size]: true,
          }}
        >
          <input
            name={this.name}
            type='checkbox'
            disabled={this.disabled}
            checked={this.active}
            class='checkboxClass'
          />
          <span
            class={{
              slider: true,
              [this.size]: true,
            }}
          ></span>
        </div>
      </Host>
    );
  }
}
