import {
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  Watch,
  h
} from '@stencil/core';

@Component({
  tag: 'fw-radio',
  styleUrl: 'radio.scss',
  shadow: true,
})
export class Radio {
  /**
   * Sets the state to selected. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ mutable: true, reflect: true }) checked = false;
  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ mutable: true, reflect: true }) disabled = false;
  /**
   * Label displayed on the interface for the component.
   */
  @Prop() label = '';
  /**
   * Identifier corresponding to the component, that is saved when the form data is saved.
   */
  @Prop() value = '';
  /**
   * Name of the component, saved as part of form data.
   */
  @Prop() name = '';

  /**
   * Triggered when the radio button in focus is selected.
   */
  @Event() fwSelect!: EventEmitter;
  /**
   * Triggered when the radio button in focus is cleared.
   */
  @Event() fwDeselect!: EventEmitter;

  /**
   * Triggered when the radio button comes into focus.
   */
  @Event() fwFocus!: EventEmitter<void>;

  /**
   * Triggered when the radio button loses focus.
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
        <input type="radio" ref={el => (this.radio = el)}></input>
        <label>
          <span class="text">
            <slot />
          </span>
          <br />
          {this.label !== '' ? (
            <span class="label-field">{this.label}</span>
          ) : (
            ''
          )}
        </label>
      </Host>
    );
  }
}
