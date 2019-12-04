import { Component, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';

@Component({
  tag: 'fw-textarea',
  styleUrl: 'textarea.scss',
  shadow: true
})
export class Textarea {
  private nativeInput?: HTMLTextAreaElement;

  @State() hasFocus = false;
  /**
   * The type of control to display. The default type is text.
   */
  @Prop() label = '';
  /**
   * The value of the input.
   */
  @Prop({ mutable: true }) value?: string | null = '';
  /**
   * Number of columns
   */
  @Prop() cols?: number;
  /**
   * Number of rows
   */
  @Prop() rows?: number;
  /**
   * Max length of value
   */
  @Prop() maxlength?: number;
  /**
   * Min length of value
   */
  @Prop() minlength?: number;
  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name = '';
  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder?: string | null;
  /**
   * The state of the control. Color changes accordingly
   */
  @Prop() state: 'normal' | 'warning' | 'error' = 'normal';
  /**
   * How the text in the textarea is to be wrapped
   */
  @Prop() wrap: 'soft' | 'hard' = 'soft';
  /**
   * This text will be displayed below the input box indicating the state/hint
   */
  @Prop() stateText = '';
  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop() readonly = false;
  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false;
  /**
   * Indicates that this control is disabled
   */
  @Prop() disabled = false;

  @Event() fwChange: EventEmitter;

  @Event() fwFocus: EventEmitter<void>;

  @Event() fwBlur: EventEmitter<void>;

  @Event() fwInput: EventEmitter<KeyboardEvent>;

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

  private getValue(): string {
    return this.value || '';
  }

  private hasValue(): boolean {
    return this.getValue().length > 0;
  }

  /**
   * Sets focus on the specified `fw-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  render() {
    const value = '';
    return (
      <Host
        aria-disabled={this.disabled}
        class={{
          'has-value': this.hasValue(),
          'has-focus': this.hasFocus,
        }}
      >
        <div class="textarea-container">
          {this.label !== '' ? <label class={{
            'required': this.required,
          }}>{this.label}</label> : ''}
          <div class={{
            'textarea-container-inner': true,
            [this.state]: true,
          }}>
            <textarea
              ref={input => this.nativeInput = input}
              disabled={this.disabled}
              name={this.name}
              placeholder={this.placeholder || ''}
              minLength={this.minlength}
              maxLength={this.maxlength}
              readOnly={this.readonly}
              required={this.required}
              value={value}
              onInput={e => this.onInput(e)}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              rows={this.rows}
              cols={this.cols}
              wrap={this.wrap}
            />
          </div>
          {this.stateText !== '' ?
            <span class="help-block">{this.stateText}</span> : ''}
        </div>
      </Host>
    );
  }
}
