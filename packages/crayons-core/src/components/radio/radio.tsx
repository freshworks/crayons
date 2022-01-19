import {
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  Watch,
  h,
} from '@stencil/core';
import EventStore from '../../utils/event-store';

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
   * Description to be displayed for the checkbox.
   */
  @Prop() description = '';
  /**
   * @deprecated Use `description` instead.
   * Label displayed on the interface, for the check box.
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
   * id for the form using this component. This prop is set from the `fw-form`
   */
  @Prop() formId = '';

  /**
   * Theme based on which the radio button is styled.
   */
  @Prop() state: 'normal' | 'error' = 'normal';
  /**

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
      if (isChecked) {
        this.fwSelect.emit({
          value: this.value,
          checked: true,
        });
      } else {
        this.fwDeselect.emit({
          value: this.value,
          checked: false,
        });
      }
    }
    this.radio.checked = isChecked;
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
    this.formId &&
      EventStore.publish(`${this.formId}::handleChange`, {
        field: this.name,
        value: this.checked ? this.value : undefined,
      });
  }

  render() {
    return (
      <Host
        onClick={() => this.toggle()}
        role='radio'
        tabIndex='-1'
        aria-labelledby='label'
        aria-describedby={this.description}
        aria-disabled={this.disabled ? 'true' : 'false'}
        aria-checked={this.checked ? 'true' : 'false'}
        onFocus={() => this.onFocus()}
        onBlur={() => this.onBlur()}
      >
        <div class='radio-container'>
          <input
            type='radio'
            ref={(el) => (this.radio = el)}
            name={this.name}
          ></input>
          <label class={{ error: this.state === 'error' }}>
            <span id='label'>
              <slot />
            </span>
            {this.description !== '' || this.label !== '' ? (
              <div id='description'>
                {this.description ? this.description : this.label}
              </div>
            ) : (
              ''
            )}
          </label>
        </div>
      </Host>
    );
  }
}
