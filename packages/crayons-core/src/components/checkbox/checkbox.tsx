import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';

import { renderHiddenField } from '../../utils/utils';

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
  @Event() fwBlur!: EventEmitter<void>;

  private checkbox!: HTMLInputElement;

  componentDidLoad() {
    this.checkbox.checked = this.checked;
    this.checkbox.disabled = this.disabled;
  }

  @Watch('checked')
  checkChanged(isChecked: boolean) {
    if (!this.disabled) {
      this.fwChange.emit({
        value: this.value,
        checked: isChecked,
      });
    }
    this.checkbox.checked = isChecked;
  }

  @Watch('disabled')
  disabledChanged(isDisabled: boolean) {
    this.checkbox.disabled = isDisabled;
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

    const { host, name, value } = this;

    if (this.checked) {
      renderHiddenField(host, name, value);
    }

    return (
      <Host
        class="checkbox-container"
        onClick={() => this.toggle()}
        role="checkbox"
        tabIndex="0"
        aria-disabled={this.disabled ? 'true' : 'false'}
        aria-checked={`${this.checked}`}
        onFocus={() => this.onFocus()}
        onBlur={() => this.onBlur()}
        >
          <input type="checkbox"
            ref={el => this.checkbox = el}>
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
