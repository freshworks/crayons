import {
  Component,
  Event,
  Element,
  EventEmitter,
  Prop,
  Watch,
  h,
  Host,
  Listen,
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
  @Prop() showIcon = false;
  /**
   * Label for the component, that can be used by screen readers.
   */
  @Prop() label = '';
  /**
   * Name of the icon to be shown when toggle is checked. Defaults to check icon.
   */
  @Prop() checkIcon = 'check';
  /**
   * Name of the icon to be shown when toggle is unchecked. Defaults to cross icon.
   */
  @Prop() uncheckIcon = 'cross';
  /**
   * Triggered when the input control is selected or deselected.
   */
  @Event() fwChange: EventEmitter;

  connectedCallback() {
    this.displayIcon();
  }

  private displayIcon = (): void => {
    if (this.showIcon) {
      this.host.style.setProperty(
        '--bg-img',
        `var(--${this.checked ? 'check' : 'cancel'}Icon)`
      );
    }
  };

  @Listen('keyup')
  handleKeyUp(ev: KeyboardEvent) {
    if (ev.code === 'Space' || ev.code === 'Enter') {
      this.toggle();
    }
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.code === 'Space' || ev.code === 'Enter') {
      ev.preventDefault();
    }
  }

  @Watch('checked')
  watchHandler(newValue: boolean) {
    this.displayIcon();
    this.fwChange.emit({ checked: newValue });
  }

  private toggle = (): void => {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  };

  render() {
    return (
      <Host
        onClick={() => this.toggle()}
        tabindex='0'
        role='switch'
        aria-disabled={this.disabled ? 'true' : 'false'}
        aria-checked={this.checked ? 'true' : 'false'}
        aria-label={this.label}
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
            checked={this.checked}
            class='checkboxClass'
          />
          <span
            class={{
              slider: true,
              [this.size]: true,
            }}
          >
            <span class='before'>
              <fw-icon
                name={this.checked ? this.checkIcon : this.uncheckIcon}
              ></fw-icon>
            </span>
          </span>
        </div>
      </Host>
    );
  }
}
