import {
  Component,
  Element,
  Event,
  EventEmitter,
  Method,
  Prop,
  State,
  h,
} from '@stencil/core';

import { renderHiddenField, hasSlot } from '../../utils';

import FieldControl from '../../function-components/field-control';

@Component({
  tag: 'fw-textarea',
  styleUrl: 'textarea.scss',
  shadow: true,
})
export class Textarea {
  @Element() host: HTMLElement;

  private nativeInput?: HTMLTextAreaElement;

  @State() hasFocus = false;
  @State() hasHintTextSlot = false;
  @State() hasWarningTextSlot = false;
  @State() hasErrorTextSlot = false;
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
   * Specifies the way in which the text area can be resized
   */
  @Prop() resize: 'none' | 'both' | 'horizontal' | 'vertical' = 'both';
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
   * Hint text displayed below the text box.
   */
  @Prop() hintText = '';
  /**
   * Warning text displayed below the text box.
   */
  @Prop() warningText = '';
  /**
   * Error text displayed below the text box.
   */
  @Prop() errorText = '';

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

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
    this.fwInput.emit({
      event: ev,
      name: this.name,
      value: this.getValue(),
    });
  };

  private onFocus = () => {
    this.hasFocus = true;
    this.fwFocus.emit();
  };

  private onBlur = (ev: Event) => {
    this.hasFocus = false;
    this.fwBlur.emit({
      event: ev,
      name: this.name,
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

  componentWillLoad() {
    this.handleSlotChange();
  }

  handleSlotChange() {
    this.hasHintTextSlot = hasSlot(this.host, 'hint-text');
    this.hasWarningTextSlot = hasSlot(this.host, 'warning-text');
    this.hasErrorTextSlot = hasSlot(this.host, 'error-text');
  }
  disconnectedCallback() {
    this.host.shadowRoot.removeEventListener(
      'slotchange',
      this.handleSlotChange
    );
  }

  getAriaDescribedBy(): string {
    if (this.state === 'normal') return `hint-${this.name}`;
    else if (this.state === 'error') return `error-${this.name}`;
    else if (this.state === 'warning') return `warning-${this.name}`;
    return null;
  }

  render() {
    const { host, name, value } = this;
    const styleResizeTextArea = { resize: this.resize };

    renderHiddenField(host, name, value);

    return (
      <FieldControl
        inputId={this.name}
        label={this.label}
        labelId={`${this.label}-${this.name}`}
        state={this.state}
        hintTextId={`hint-${this.name}`}
        hintText={this.hintText}
        hasHintTextSlot={this.hasHintTextSlot}
        errorTextId={`error-${this.name}`}
        errorText={this.errorText}
        hasErrorTextSlot={this.hasErrorTextSlot}
        warningTextId={`warning-${this.name}`}
        warningText={this.warningText}
        hasWarningTextSlot={this.hasWarningTextSlot}
        required={this.required}
      >
        <div
          aria-disabled={this.disabled}
          class={{
            'has-value': this.hasValue(),
            'has-focus': this.hasFocus,
          }}
        >
          <div class='textarea-container'>
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
                style={styleResizeTextArea}
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
                aria-invalid={this.state === 'error'}
                aria-describedby={this.getAriaDescribedBy()}
              />
            </div>
          </div>
        </div>
      </FieldControl>
    );
  }
}
