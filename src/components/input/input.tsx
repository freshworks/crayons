import { Component, Prop, Host, Event, EventEmitter, Watch, h, State, Method } from '@stencil/core';

@Component({
  tag: 'fw-input',
  styleUrl: 'input.scss',
  shadow: true
})
export class Input {
  private nativeInput?: HTMLInputElement;

  @State() hasFocus = false;
  /**
  * Indicates whether the value of the control can be automatically completed by the browser.
  */
  @Prop() autocomplete: 'on' | 'off' = 'off';
  /**
 * If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input.
 */
  @Prop() clearInput = false;
  /**
* If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input.
*/
  @Prop() pattern = '';
  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
   */
  @Prop() maxlength?: number;
  /**
   * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
   */
  @Prop() minlength?: number;
  /**
   * Hint
   */
  @Prop() stateText = '';
  /**
   * Disabled
   */
  @Prop() disabled = false
  /**
 * The name of the control, which is submitted with the form data.
 */
  @Prop() name: string = "";
  /**
 * Instructional text that shows before the input has a value.
 */
  @Prop() placeholder?: string | null;
  /**
  * If `true`, the user cannot modify the value.
  */
  @Prop() readonly = false;
  /**
 * If `true`, the user must fill in a value before submitting a form.
 */
  @Prop() required = false;
  /**
   * The type of control to display. The default type is text.
   */
  @Prop() type = 'text';
  /**
  * The type of control to display. The default type is text.
  */
  @Prop() label = '';
  /**
  * The type of control to display. The default type is text.
  */
  @Prop() state: 'normal' | 'warning' | 'error' = 'normal';
  /**
 * The value of the input.
 */
  @Prop({ mutable: true }) value?: string | null = '';

  @Watch('value')
  watchHandler(newValue: string, oldValue: string) {
    this.fwChange.emit({ value: newValue });
  }

  @Event() fwChange: EventEmitter;

  @Event() fwFocus: EventEmitter<void>;

  @Event() fwBlur: EventEmitter<void>;

  @Event() fwInput: EventEmitter<KeyboardEvent>;


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

  /**
 * Sets focus on the specified `ion-input`. Use this method instead of the global
 * `input.focus()`.
 */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  /**
   * Returns the native `<input>` element used under the hood.
   */
  @Method()
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput!);
  }

  render() {
    const value = '';
    return (
      <Host
        class={{
        }}
      >
        {this.label ? <label class={{
          'required': this.required,
        }}>{this.label}</label> : ''}
        <div class={{
          'input-container': true,
          [this.state]: true
        }}>
          <input
            ref={input => this.nativeInput = input}
            autoComplete={this.autocomplete}
            disabled={this.disabled}
            name={this.name}
            placeholder={this.placeholder || ''}
            minLength={this.minlength}
            maxLength={this.maxlength}
            readOnly={this.readonly}
            required={this.required}
            type={this.type}
            value={value}
            onInput={(e) => this.onInput(e)}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
          {this.clearInput && this.value.length > 0 ?
            <div class="clear-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="app-icon--hover app-icon--smallsecondary"><path d="M17.992 16l8.796-8.796a1.409 1.409 0 0 0-1.992-1.992L16 14.008 7.204 5.212a1.409 1.409 0 0 0-1.992 1.992L14.008 16l-8.796 8.796a1.409 1.409 0 0 0 1.992 1.992L16 17.992l8.796 8.796a1.409 1.409 0 0 0 1.992-1.992L17.992 16z"></path></svg>
            </div> : ''}
        </div>
        {this.stateText ?
          <span class='help-block'>{this.stateText}</span> : ''}
      </Host>
    );
  }
}

