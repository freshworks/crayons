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

  @Prop() handleBlur = (_e, _o) => {};
  @Prop() handleChange = (_e, _o) => {};
  @Prop() handleFocus = (_e, _o) => {};

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
    this.handleChange(null, { value: this.checkbox.checked });
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

  private onFocus = (e) => {
    this.fwFocus.emit();
    this.handleFocus(e, { value: this.checkbox.checked });
  };

  private onBlur = (e) => {
    this.fwBlur.emit();
    this.handleBlur(e, { value: this.checkbox.checked });
  };

  private toggle = () => {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
  };

  /** Return native element */
  @Method()
  async nativeRef() {
    return this.checkbox;
  }

  render() {
    const { host, name, value } = this;

    //if (this.checked) {
    renderHiddenField(host, name, value);
    //}

    return (
      <Host
        role='checkbox'
        tabIndex='0'
        aria-disabled={this.disabled ? 'true' : 'false'}
        aria-checked={this.checked ? 'true' : 'false'}
        aria-labelledby='label'
        aria-describedby={this.description}
        onClick={this.toggle}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <div class='checkbox-container'>
          <input
            type='checkbox'
            ref={(el) => (this.checkbox = el)}
            required={this.required}
            name={this.name}
          ></input>
          <label>
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
