import { Component, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'fw-radio',
  styleUrl: 'radio.scss',
  shadow: true,
})
export class Radio {
  /**
   * Property to maintain checked state
   */
  @Prop({ mutable: true }) checked = false;
  /**
   * Disables the radio button
   */
  @Prop({ mutable: true }) disabled = false;
  /**
   * Label for radio button
   */
  @Prop() label = '';
  /**
   * Value of the radio button for within a <form>
   */
  @Prop() value = '';
  /**
   * Value of the name for within a <form>
   */
  @Prop() name = '';

  /**
   * Emitted when the radio button value has changed.
   */
  @Event() fwSelect!: EventEmitter;
  /**
   * Emitted when the radio button value has changed.
   */
  @Event() fwDeselect!: EventEmitter;

  /**
   * Emitted when the radio button has focus.
   */
  @Event() fwFocus!: EventEmitter<void>;

  /**
   * Emitted when the checbox loses focus.
   */
  @Event() fwBlur!: EventEmitter<void>;

  private radio!: HTMLInputElement;

  componentDidLoad() {
    this.radio.checked = this.checked;
    this.radio.disabled = this.disabled;
  }

  @Watch('checked')
  checkChanged(isChecked: boolean) {
    if (!this.disabled) {
      this.radio.checked = isChecked;
      if (isChecked) {
        this.fwSelect.emit({
          value: this.value,
          checked: true,
        });
      } else {
        this.fwDeselect.emit();
      }
    }
  }

  @Watch('disabled')
  disabledChanged(isDisabled: boolean) {
    this.radio.disabled = isDisabled;
  }

  private onFocus() {
    this.fwFocus.emit();
  }

  private onBlur() {
    this.fwBlur.emit();
  }

  private toggle() {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  }

  render() {
    return (
      <Host
        class="radio-container"
        onClick={() => this.toggle()}
        role="radio"
        tabIndex="0"
        aria-disabled={this.disabled ? 'true' : 'false'}
        aria-checked={`${this.checked}`}
        onFocus={() => this.onFocus()}
        onBlur={() => this.onBlur()}
        >
          <input type="radio"
            ref={el => this.radio = el}>
          </input>
          <label>
            <span class="text"><slot/></span>
            <br/>
            {
              this.label !== ''
              ? <span class="label-field">{this.label}</span>
              : ''
            }
          </label>
      </Host>
    );
  }
}
