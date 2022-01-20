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

import { renderHiddenField } from '../../utils';
import EventStore from '../../utils/event-store';

@Component({
  tag: 'fw-textarea',
  styleUrl: 'textarea.scss',
  shadow: true,
})
export class Textarea {
  @Element() host: HTMLElement;

  private nativeInput?: HTMLTextAreaElement;

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
   * Width of the input box, specified as number of columns.
   */
  @Prop() cols?: number;
  /**
   * Height of the input box, specified as number of rows.
   */
  @Prop() rows?: number;
  /**
   * Maximum number of characters a user can enter in the input box.
   */
  @Prop() maxlength?: number;
  /**
   * Minimum number of characters a user must enter in the input box for the value to be valid.
   */
  @Prop() minlength?: number;
  /**
   * Name of the component, saved as part of form data.
   */
  @Prop() name = '';
  /**
   * Text displayed in the input box before a user enters a value.
   */
  @Prop() placeholder?: string | null;
  /**
   * Theme based on which the input box is styled.
   */
  @Prop() state: 'normal' | 'warning' | 'error' = 'normal';
  /**
   * Type of text wrapping used by the input box. If the value is hard, the text in the textarea is wrapped (contains line breaks) when the form data is saved. If the value is soft, the text in the textarea is saved as a single line, when the form data is saved.
   */
  @Prop() wrap: 'soft' | 'hard' = 'soft';
  /**
   * Descriptive or instructional text displayed below the input box.
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
   * Disables the text area on the interface. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() disabled = false;

  /**
   * id for the form using this component. This prop is set from the `fw-form`
   */
  @Prop() formId = '';

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
    this.formId &&
      EventStore.publish(`${this.formId}::handleInput`, {
        field: this.name,
        value: this.nativeInput.value,
      });
  };

  private onFocus = () => {
    this.hasFocus = true;
    this.fwFocus.emit();
  };

  private onBlur = () => {
    this.hasFocus = false;
    this.fwBlur.emit({ value: this.getValue() });
    this.formId &&
      EventStore.publish(`${this.formId}::handleBlur`, {
        field: this.name,
        value: this.nativeInput.value,
      });
  };

  private getValue(): string {
    return this.value || '';
  }

  private hasValue(): boolean {
    return this.getValue().length > 0;
  }

  /**
   * Sets focus on a specific `fw-textarea`. Use this method instead of the global `input.focus()`.
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
        <div class='textarea-container'>
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
              'textarea-container-inner': true,
              [this.state]: true,
            }}
          >
            <textarea
              class={{
                responsive: this.cols === undefined,
              }}
              ref={(input) => (this.nativeInput = input)}
              disabled={this.disabled}
              name={this.name}
              placeholder={this.placeholder || ''}
              minLength={this.minlength}
              maxLength={this.maxlength}
              readOnly={this.readonly}
              required={this.required}
              value={this.value}
              onInput={this.onInput}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              rows={this.rows}
              cols={this.cols}
              wrap={this.wrap}
              id={this.name}
            />
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
