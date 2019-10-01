import { Component, Prop, h, Watch, Host, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'fw-checkbox',
  styleUrl: 'checkbox.scss',
  shadow: true
})
export class Checkbox {
  /**
   * Property to maintain checked state
   */
  @Prop() checked: boolean = false;
  /**
   * Disables the checkbox
   */
  @Prop() disabled: boolean = false;
  /**
   * Label for checkbox
   */
  @Prop() label: string;
  /**
   * Value of the checkbox for within a <form>
   */
  @Prop() value = '';


  /**
   * Emitted when the checkbox value has changed.
   */
  @Event() fwChange!: EventEmitter;

  /**
   * Emitted when the checkbox has focus.
   */
  @Event() fwFocus!: EventEmitter<void>;

  /**
   * Emitted when the checbox loses focus.
   */
  @Event() fwBlur!: EventEmitter<void>;

  
  private checkbox!: HTMLInputElement;


  componentDidLoad() {
    this.checkbox.checked = this.checked;
    this.checkbox.disabled = this.disabled;
  }

  @Watch('checked')
  checkChanged( isChecked:boolean ) {
    this.checkbox.checked = isChecked;
    this.fwChange.emit({
      value: this.value,
      checked: isChecked,
    })
  }

  @Watch('disabled')
  disabledChanged( isDisabled:boolean ) {
    this.checkbox.disabled = isDisabled;
  }

  private onFocus() {
    this.fwFocus.emit();
  }

  private onBlur() {
    this.fwBlur.emit();
  }

  private toggle(){
    if(!this.disabled) {
      this.checked = !this.checked;
    }
  }

  render() {
    return (
      <Host
        class="checkbox-container"
        onClick={() => this.toggle()}
        role="checkbox"
        tabIndex="0"
        aria-disabled={this.disabled ? 'true' : null}
        aria-checked={`${this.checked}`}
        onFocus={() => this.onFocus()}
        onBlur={() => this.onBlur()}
        >
          <input type="checkbox"
            ref={(el) => this.checkbox = el as HTMLInputElement}>
          </input>
          <label>
            <span class="text"><slot/></span>
            <br/>
            {
              this.label
              ?<span class="label-field">{this.label}</span>
              :''
            }
          </label>
      </Host>
    );
  }
}
