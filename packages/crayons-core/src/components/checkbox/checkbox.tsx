import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  Watch,
  h,
  Listen,
  Method,
} from '@stencil/core';

import { renderHiddenField } from '../../utils';
@Component({
  tag: 'fw-checkbox',
  styleUrl: 'checkbox.scss',
  shadow: true,
})
export class Checkbox {
  @Element() host!: HTMLElement;
  /**
   * Sets the state of the check box to selected. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop({ mutable: true, reflect: true }) checked = false;
  /**
   * Disables the check box on the interface. If the attribute’s value is undefined, the value is set to false.
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
   * Name of the component, saved as part of form data.
   */
  @Prop() name = '';
  /**
   * Identifier corresponding to the component, that is saved when the form data is saved.
   */
  @Prop() value = '';
  /**
   * Specifies the input box as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() required = false;

  /**
   * id for the form using this component. This prop is set from the `fw-form`
   */
  @Prop() formId = '';

  /**
   * Theme based on which the checkbox is styled.
   */
  @Prop() state: 'normal' | 'error' = 'normal';
  /**

  /**
   * Triggered when the check box’s value is modified.
   */
  @Event() fwChange!: EventEmitter;

  /**
   * Triggered when the check box comes into focus.
   */
  @Event() fwFocus!: EventEmitter<void>;

  /**
   * Triggered when the check box loses focus.
   */
  @Event() fwBlur!: EventEmitter;

  private checkbox!: HTMLInputElement;

  componentDidLoad() {
    this.checkbox.checked = this.checked;
    this.checkbox.disabled = this.disabled;
  }

  @Watch('checked')
  checkChanged(isChecked: boolean) {
    this.checkbox.checked = isChecked;
  }

  /**
   * Sets focus on a `fw-checkbox`.
   */
  @Method()
  async setFocus() {
    this.host?.focus();
  }

  @Watch('disabled')
  disabledChanged(isDisabled: boolean) {
    this.checkbox.disabled = isDisabled;
  }

  @Listen('keydown')
  handleKeydown(ev: KeyboardEvent) {
    if (ev.code === 'Space') {
      ev.preventDefault();
    }
  }

  @Listen('keyup')
  handleKeyup(ev: KeyboardEvent) {
    if (ev.code === 'Space') {
      this.toggle();
    }
  }

  private onFocus = () => {
    this.fwFocus.emit();
  };

  private onBlur = (e: Event) => {
    this.fwBlur.emit({
      event: e,
      value: this.value,
      name: this.name,
      checked: this.checkbox.checked,
    });
  };

  private toggle = () => {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.fwChange.emit({
        value: this.value,
        name: this.name,
        checked: this.checked,
      });
    }
  };

  render() {
    const { host, name, value } = this;

    if (this.checked) {
      renderHiddenField(host, name, value);
    }

    return (
      <Host
        role='checkbox'
        tabIndex='0'
        aria-disabled={this.disabled ? 'true' : 'false'}
        aria-checked={this.checked ? 'true' : 'false'}
        aria-labelledby='label'
        aria-describedby={`description hint-${this.name} error-${this.name}`}
        onClick={this.toggle}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        aria-invalid={this.state === 'error'}
      >
        <div class={{ 'checkbox-container': true, 'disabled': this.disabled }}>
          <input
            type='checkbox'
            ref={(el) => (this.checkbox = el)}
            required={this.required}
            name={this.name}
            id={this.name}
          ></input>
          <label class={{ error: this.state === 'error' }}>
            <span
              id='label'
              class={{
                'with-description': this.description !== '',
                'required': this.required,
              }}
            >
              <slot />
            </span>
            {this.description !== '' || this.label !== '' ? (
              <div id='description'>
                {this.description ? this.description : this.label}
              </div>
            ) : (
              ''
            )}
            {this.checked && (
              <span class='after'>
                <fw-icon
                  name='check'
                  color={this.disabled ? '#92A2B1' : '#ffffff'}
                  size={8}
                ></fw-icon>
              </span>
            )}
          </label>
        </div>
      </Host>
    );
  }
}
