import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

import { handleKeyDown, renderHiddenField } from '../../utils';

@Component({
  tag: 'fw-input',
  styleUrl: 'input.scss',
  shadow: true,
})
export class Input {
  @Element() host!: HTMLElement;
  private nativeInput?: HTMLInputElement;

  @State() hasFocus = false;
  /**
   * Label displayed on the interface, for the component.
   */
  @Prop() label = '';
  /**
   * Default value displayed in the input box.
   */
  @Prop({ mutable: true }) value?: string | null = '';
  /**
   * Type of value accepted as the input value. If a user enters a value other than the specified type, the input box is not populated.
   */
  @Prop() type: 'text' | 'number' | 'email' | 'url' = 'text';
  /**
   * Specifies whether the browser can display suggestions to autocomplete the text value.
   */
  @Prop() autocomplete: 'on' | 'off' = 'off';
  /**
   * Displays a right-justified clear icon in the text box. Clicking the icon clears the input text. If the attribute’s value is undefined, the value is set to false. For a read-only input box, the clear icon is not displayed unless a default value is specified for the input box.
   */
  @Prop() clearInput = false;
  /**
   * Maximum number of characters a user can enter in the text box.
   */
  @Prop() maxlength?: number;
  /**
   * Minimum number of characters a user must enter in the text box for the value to be valid.
   */
  @Prop() minlength?: number;
  /**
   * Specifies a maximum value that can be entered for the number/decimal input.
   */
  @Prop() max?: number;
  /**
   * Specifies a minimum value that can be entered for the number/decimal input.
   */
  @Prop() min?: number;
  /**
   * The step attribute is used when the type is `number`. It specifies the interval between legal numbers in a number/decimal input element.
   * Works with the min and max attributes to limit the increments at which a value can be set.
   * Possible values are `any` or a positive floating point number.
   * Default value is `any`
   */
  @Prop() step = 'any';
  /**
   * Name of the component, saved as part of form data.
   */
  @Prop() name = '';
  /**
   * Text displayed in the text box before a user enters a value.
   */
  @Prop() placeholder?: string | null;
  /**
   * Theme based on which the text box is styled.
   */
  @Prop() state: 'normal' | 'warning' | 'error' = 'normal';
  /**
   * Descriptive or instructional text displayed below the text box.
   */
  @Prop() stateText = '';
  /**
   * If true, the user cannot enter a value in the input box. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() readonly = false;
  /**
   * Specifies the input box as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() required = false;
  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() disabled = false;

  /**
   * Identifier of the icon that is displayed in the left side of the text box. The attribute’s value must be a valid svg file in the repo of icons (assets/icons).
   */
  @Prop() iconLeft: string = undefined;

  /**
   * Identifier of the icon that is displayed in the right side of the text box. The attribute’s value must be a valid svg file in the repo of icons (assets/icons).
   */
  @Prop() iconRight: string = undefined;

  /**
   * Triggered when the value in the input box is modified.
   */
  @Event() fwChange: EventEmitter;

  /**
   * Triggered when the input box comes into focus.
   */
  @Event() fwFocus: EventEmitter<void>;

  /**
   * Triggered when the input box loses focus.
   */
  @Event() fwBlur: EventEmitter;

  /**
   * Triggered when a value is entered in the input box.
   */
  @Event() fwInput: EventEmitter;

  /**
   * Triggered when clear icon is clicked.
   */
  @Event() fwInputClear: EventEmitter;
  // /**
  //  * Triggered when a value is entered in the input box. It can used with `fw-form`.
  //  */
  // @Event() fwFormInput: EventEmitter;
  // /**
  //  * Triggered when the input box loses focus. It can used with `fw-form`.
  //  */
  // @Event() fwFormBlur: EventEmitter;
  // /**
  //  * Triggered when the input box comes into focus. It can used with `fw-form`.
  //  */
  // @Event() fwFormFocus: EventEmitter;

  @Watch('value')
  watchHandler(newValue: string) {
    this.fwChange.emit({ value: newValue });
  }

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    // handle number and decimal input type
    if (this.type === 'number') {
      this.value = this.handleMinAndMaxCheck(input.value);
    } else {
      this.value = input.value || '';
    }
    if (this.nativeInput) {
      this.nativeInput.value = this.value;
    }
    this.fwInput.emit({
      event: ev as KeyboardEvent,
      field: this.name,
      value: this.getValue(),
    });
    // this.fwFormInput.emit({
    //   field: this.name,
    //   value: this.nativeInput.value,
    // });
  };
  private handleMinAndMaxCheck(value) {
    const { min = -Infinity, max = Infinity } = this;
    value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    return value;
  }

  private onFocus = () => {
    this.hasFocus = true;
    this.fwFocus.emit();
    // this.fwFormFocus.emit({
    //   field: this.name,
    //   value: this.nativeInput.value,
    // });
  };

  private onBlur = (ev) => {
    this.hasFocus = false;
    this.fwBlur.emit({
      event: ev as KeyboardEvent,
      field: this.name,
      value: this.getValue(),
    });
    // this.fwFormBlur.emit({
    //   field: this.name,
    //   value: this.nativeInput.value,
    // });
  };

  private showClearButton() {
    return (
      this.clearInput &&
      !this.readonly &&
      !this.disabled &&
      this.value.length > 0
    );
  }

  private clearTextInput = (ev?: Event) => {
    if (!this.readonly && !this.disabled && ev) {
      this.value = '';

      if (this.nativeInput) {
        this.nativeInput.value = '';
      }
      this.fwInputClear.emit();
    }
  };

  private getValue(): string {
    return this.value || '';
  }

  private hasValue(): boolean {
    return this.getValue().length > 0;
  }

  /**
   * Sets focus on a specific `fw-input`. Use this method instead of the global `input.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  render() {
    const { host, name, value } = this;

    renderHiddenField(host, name, value);

    return (
      <Host
        aria-disabled={this.disabled}
        class={{
          'has-value': this.hasValue(),
          'has-focus': this.hasFocus,
        }}
      >
        <div class='input-container'>
          {this.label !== '' ? (
            <label
              class={{
                required: this.required,
              }}
            >
              {this.label}
            </label>
          ) : (
            ''
          )}
          <div
            class={{
              'input-container-inner': true,
              [this.state]: true,
              'left-icon': this.iconLeft !== undefined,
              'right-icon': this.iconRight !== undefined,
              'has-value': this.showClearButton(),
            }}
          >
            <input
              ref={(input) => {
                this.nativeInput = input;
              }}
              id={this.name}
              autoComplete={this.autocomplete}
              disabled={this.disabled}
              name={this.name}
              placeholder={this.placeholder || ''}
              minLength={this.minlength}
              maxLength={this.maxlength}
              min={this.min}
              max={this.max}
              readOnly={this.readonly}
              required={this.required}
              step={this.step}
              type={this.type}
              value={this.value}
              onInput={this.onInput}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
            />
            {this.iconLeft !== undefined ? (
              <fw-icon class='icon left' name={this.iconLeft}></fw-icon>
            ) : (
              ''
            )}
            {this.iconRight !== undefined ? (
              <fw-icon class='icon right' name={this.iconRight}></fw-icon>
            ) : (
              ''
            )}
            {this.showClearButton() ? (
              <div
                class='clear-button'
                role='button'
                tabindex='0'
                onClick={(e) => this.clearTextInput(e)}
                onKeyDown={handleKeyDown(this.clearTextInput)}
              >
                <fw-icon
                  class='clear-img'
                  name='cross'
                  library='system'
                ></fw-icon>
              </div>
            ) : (
              ''
            )}
          </div>
          {this.stateText !== '' ? (
            <span class='help-block'>{this.stateText}</span>
          ) : (
            ''
          )}
        </div>
      </Host>
    );
  }
}
