import {
  Component,
  Element,
  Host,
  Prop,
  Watch,
  Method,
  h,
  Listen,
  Event,
  EventEmitter,
  State,
} from '@stencil/core';

import {
  findCheckedOption,
  renderHiddenField,
  watchForOptions,
  hasSlot,
} from '../../utils';
@Component({
  tag: 'fw-radio-group',
  styleUrl: 'radio-group.scss',
})
export class RadioGroup {
  private mutationO?: MutationObserver;

  @Element() host!: HTMLElement;

  private selectedIndex = 0;
  private radios;

  /**
   * If true, a radio group can be saved without selecting any option. If an option is selected, the selection can be cleared. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() allowEmpty = false;
  /**
   * Label for the component
   */
  @Prop() label = '';
  /**
   * Name of the component, saved as part of form data.
   */
  @Prop() name = '';
  /**
   * Indicates the direction of the radio buttons alignment, defaults to vertical alignment.
   */
  @Prop() orientation: 'row' | 'column' = 'column';
  /**
   * Default option that is selected when the radio group is displayed on the interface. Must be a valid value corresponding to the fw-radio components used in the Radio Group.
   */
  @Prop({ mutable: true }) value?: any | null;

  /**
   * Specifies the input radio group as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() required = false;

  /**
   * Hint text displayed below the radio group.
   */
  @Prop() hintText = '';
  /**
   * Warning text displayed below the radio group.
   */
  @Prop() warningText = '';
  /**
   * Error text displayed below the radio group.
   */
  @Prop() errorText = '';
  /**
   * Theme based on which the radio group is styled.
   */
  @Prop() state: 'normal' | 'warning' | 'error' = 'normal';

  @State() hasHintTextSlot = false;
  @State() hasWarningTextSlot = false;
  @State() hasErrorTextSlot = false;

  @Watch('value')
  async valueChanged() {
    await this.updateRadios();
  }

  /**
   * Triggered when an option in the Radio Group is selected or deselected.
   */
  @Event() fwChange!: EventEmitter;

  @Listen('keydown')
  handleKeydown(ev: KeyboardEvent) {
    if (
      ev.code === 'ArrowDown' ||
      ev.code === 'ArrowRight' ||
      ev.code === 'ArrowLeft' ||
      ev.code === 'ArrowUp' ||
      ev.code === 'Space'
    ) {
      ev.preventDefault();
    }
  }

  @Listen('keyup')
  handleKeyup(event: KeyboardEvent) {
    const radios = this.radios;
    const supportedKeyStrokes = [
      'ArrowDown',
      'ArrowRight',
      'ArrowUp',
      'ArrowLeft',
      'Space',
    ];
    const previousSelected = this.selectedIndex;
    switch (event.code) {
      case 'ArrowDown':
      case 'ArrowRight':
        radios[previousSelected].setAttribute('tabindex', '-1');
        radios[previousSelected].checked = false;

        // set currently selectedIndex using roving tabindex technique
        this.selectedIndex = ++this.selectedIndex % radios.length;
        radios[this.selectedIndex].setAttribute('tabindex', '0');
        radios[this.selectedIndex].checked = true;
        radios[this.selectedIndex].focus();
        this.value = radios[this.selectedIndex].value;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        radios[previousSelected].setAttribute('tabindex', '-1');
        radios[previousSelected].checked = false;

        // set currently selectedIndex using roving tabindex technique
        this.selectedIndex =
          this.selectedIndex === 0 ? radios.length - 1 : --this.selectedIndex;
        radios[this.selectedIndex].setAttribute('tabindex', '0');
        radios[this.selectedIndex].checked = true;
        radios[this.selectedIndex].focus();
        this.value = radios[this.selectedIndex].value;
        break;
      case 'Space':
        /**
         * This case is executed only when none of the radios are checked
         * and we first tab into the radio group.
         */
        radios[0].checked = true;
        radios[0].focus();
        this.value = radios[0].value;
        break;
      default:
        break;
    }

    if (supportedKeyStrokes.includes(event.code)) {
      this.fwChange.emit({
        event,
        name: this.name,
        value: this.value,
      });
    }
  }

  async connectedCallback() {
    const el = this.host;
    this.radios = Array.from(this.host.querySelectorAll('fw-radio')).filter(
      (radio) => !radio.disabled
    );

    if (this.value === undefined) {
      const radio = findCheckedOption(el, 'fw-radio') as
        | HTMLFwRadioElement
        | undefined;
      if (radio !== undefined) {
        await radio.componentOnReady();
        if (this.value === undefined) {
          this.value = radio.value;
        }
      }
    }

    this.mutationO = watchForOptions<HTMLFwRadioElement>(
      el,
      'fw-radio',
      async (newOption) => {
        if (newOption !== undefined) {
          newOption
            .componentOnReady()
            .then(() => {
              this.value = newOption.value;
            })
            .catch();
        } else {
          await this.updateRadios();
        }
      }
    );
  }

  componentDidLoad() {
    const fieldControl = this.host.querySelector('.field-input') as HTMLElement;

    if (fieldControl) {
      fieldControl.style.display = 'flex';
      fieldControl.style.flexDirection = this.orientation;
    }
    const slottedElements = this.host.querySelectorAll('fw-radio');
    slottedElements.forEach((radio, index) => {
      if (this.orientation === 'column') {
        radio.classList.add('fw-radio-group__radio');
        radio.classList.toggle(
          'fw-radio-group__radio--last',
          index === slottedElements.length - 1
        );
      }
    });
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
    if (this.mutationO) {
      this.mutationO.disconnect();
      this.mutationO = undefined;
    }
    this.host.shadowRoot?.removeEventListener(
      'slotchange',
      this.handleSlotChange
    );
  }

  private async updateRadios() {
    /**
     * Make sure we get all radios first
     * so values are up to date prior
     * to caching the radio group value
     */
    const radios = await this.radios;
    const { value } = this;

    let hasChecked = false;

    for (const [index, radio] of radios.entries()) {
      if (!hasChecked && radio.value === value) {
        // correct value for this radio
        // but this radio isn't checked yet
        // and we haven't found a checked yet
        hasChecked = true;
        radio.checked = true;
        radio.setAttribute('tabindex', '0');
        this.selectedIndex = index;
      } else {
        // this radio doesn't have the correct value
        // or the radio group has been already checked
        radio.setAttribute('tabindex', '-1');
        radio.checked = false;
      }
    }

    // Reset value if
    if (!hasChecked) {
      radios.length !== 0 && radios[0].setAttribute('tabindex', '0');
      this.selectedIndex = 0;
      this.value = undefined;
    }
  }

  private onSelect = (ev: Event) => {
    const selectedRadio = ev.target as HTMLFwRadioElement | null;
    if (selectedRadio) {
      this.value = selectedRadio.value;
    }
  };

  private onDeselect = async (ev: Event) => {
    const selectedRadio = ev.target as HTMLFwRadioElement | null;
    if (this.allowEmpty && selectedRadio.value === this.value) {
      this.value = undefined;
    }
    await this.updateRadios();
  };

  /**
   * Sets focus on a specific `fw-radio`.
   */
  @Method()
  async setFocus() {
    const radios = this.radios;
    radios[0]?.setFocus?.();
  }

  render() {
    const { host, name, value } = this;

    const hasLabel = !!this.label;
    const hasHintText = this.hintText ? true : this.hasHintTextSlot;
    const hasErrorText = this.errorText ? true : this.hasErrorTextSlot;
    const hasWarningText = this.warningText ? true : this.hasWarningTextSlot;

    const showHintText = this.state === 'normal' ? true : false;
    const showErrorText = this.state === 'error' ? true : false;
    const showWarningText = this.state === 'warning' ? true : false;

    const labelId = `${this.label}-${this.name}`;
    const inputId = this.name;
    const hintTextId = `hint-${this.name}`;
    const warningTextId = `warning-${this.name}`;
    const errorTextId = `error-${this.name}`;

    renderHiddenField(host, name, value);

    return (
      <Host
        role='radiogroup'
        aria-label={this.label || this.name}
        onFwSelect={this.onSelect}
        onFwDeselect={this.onDeselect}
        id={this.label || this.name}
      >
        <div
          class={{
            'field-control': true,
          }}
        >
          {hasLabel && (
            <label
              id={labelId}
              class={{
                'field-control-label': true,
                'required': this.required,
              }}
              htmlFor={inputId}
              aria-hidden={hasLabel ? 'false' : 'true'}
            >
              {this.label}
            </label>
          )}
          <div class='field-input'>
            <slot></slot>
          </div>

          {showHintText && hasHintText && (
            <div
              id={hintTextId}
              class='field-control-hint-text'
              aria-hidden={hasHintText ? 'false' : 'true'}
            >
              <slot name='hint-text'>{this.hintText}</slot>
            </div>
          )}

          {showErrorText && hasErrorText && (
            <div
              id={errorTextId}
              class='field-control-error-text'
              aria-hidden={hasErrorText ? 'false' : 'true'}
            >
              <slot name='error-text'>{this.errorText}</slot>
            </div>
          )}

          {showWarningText && hasWarningText && (
            <div
              id={warningTextId}
              class='field-control-warning-text'
              aria-hidden={hasWarningText ? 'false' : 'true'}
            >
              <slot name='warning-text'>{this.warningText}</slot>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
