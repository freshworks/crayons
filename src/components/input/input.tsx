import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';

import { renderHiddenField } from '../../utils/utils';

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
  @Prop() type: 'text' | 'number' = 'text';
  /**
   * Specifies whether the browser can display suggestions to autocomplete the text value.
   */
  @Prop() autocomplete: 'on' | 'off' = 'off';
  /**
   * Specifies whether the browser can auto focus the input field
   */
  @Prop() autofocus = false;
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
  @Event() fwBlur: EventEmitter<void>;

  /**
   * Triggered when a value is entered in the input box.
   */
  @Event() fwInput: EventEmitter<KeyboardEvent>;

  /**
   * Triggered when clear icon is clicked.
   */
  @Event() fwInputClear: EventEmitter;

  @Watch('value')
  watchHandler(newValue: string) {
    this.fwChange.emit({ value: newValue });
  }

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
    this.fwInput.emit(ev as KeyboardEvent);
  }

  private onFocus = () => {
    this.hasFocus = true;
    this.fwFocus.emit();
  }

  private onBlur = () => {
    this.hasFocus = false;
    this.fwBlur.emit();
  }

  private showClearButton() {
    return this.clearInput && !this.readonly && !this.disabled && this.value.length > 0;
  }

  private clearTextInput = (ev?: Event) => {
    if (!this.readonly && !this.disabled && ev) {
      this.value = '';

      if (this.nativeInput) {
        this.nativeInput.value = '';
      }
      this.fwInputClear.emit();
    }
  }

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
        <div class="input-container">
        {this.label !== '' ? <label class={{
          'required': this.required,
        }}>{this.label}</label> : ''}
        <div class={{
          'input-container-inner': true,
          [this.state]: true,
          'left-icon': this.iconLeft !== undefined,
          'right-icon': this.iconRight !== undefined,
        }}>
          <input
            ref={input => this.nativeInput = input}
            autoComplete={this.autocomplete}
            autoFocus={this.autofocus}
            disabled={this.disabled}
            name={this.name}
            placeholder={this.placeholder || ''}
            minLength={this.minlength}
            maxLength={this.maxlength}
            readOnly={this.readonly}
            required={this.required}
            type={this.type}
            value={this.value}
            onInput={e => this.onInput(e)}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          {
            this.iconLeft !== undefined ? <fw-icon class="icon left" name={this.iconLeft}></fw-icon> : ''
          }
          {
            this.iconRight !== undefined ? <fw-icon class="icon right" name={this.iconRight}></fw-icon> : ''
          }
          {
            this.showClearButton() ?
            <div class="clear-button" onClick={e => this.clearTextInput(e)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="clear-button-img"><path d="M17.992 16l8.796-8.796a1.409 1.409 0 0 0-1.992-1.992L16 14.008 7.204 5.212a1.409 1.409 0 0 0-1.992 1.992L14.008 16l-8.796 8.796a1.409 1.409 0 0 0 1.992 1.992L16 17.992l8.796 8.796a1.409 1.409 0 0 0 1.992-1.992L17.992 16z"></path></svg>
            </div> : ''
          }
        </div>
        {this.stateText !== '' ?
          <span class="help-block">{this.stateText}</span> : ''}
          </div>
      </Host>
    );
  }
}
