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
} from '@stencil/core';

import {
  findCheckedOption,
  renderHiddenField,
  watchForOptions,
} from '../../utils';
import PubSub from '../../utils/pub-sub';

@Component({
  tag: 'fw-radio-group',
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
   * Label for the component, that can be used by screen readers.
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
   * id for the form using this component. This prop is set from the `fw-form`
   */
  @Prop() formId = '';

  @Watch('value')
  async valueChanged(value: any | undefined) {
    await this.updateRadios();
    this.fwChange.emit({ value });
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

    this.formId &&
      PubSub.publish(`${this.formId}::handleChange`, {
        field: this.name,
        value: this.value,
      });
  }

  async connectedCallback() {
    const el = this.host;
    this.radios = Array.from(this.host.querySelectorAll('fw-radio')).filter(
      (radio) => !radio.disabled
    );
    this.host.style.display = 'flex';
    this.host.style.flexDirection = this.orientation;

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
    const slottedElements = this.host.querySelectorAll('fw-radio');
    slottedElements.forEach((radio, index) => {
      radio.classList.add('fw-radio-group__radio');
      radio.classList.toggle(
        'fw-radio-group__radio--last',
        index === slottedElements.length - 1
      );
    });
  }

  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect();
      this.mutationO = undefined;
    }
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

  private onBlur = () => {
    this.formId &&
      PubSub.publish(`${this.formId}::handleBlur`, {
        field: this.name,
        value: this.value,
      });
  };

  render() {
    const { host, name, value } = this;

    renderHiddenField(host, name, value);

    return (
      <Host
        role='radiogroup'
        aria-label={this.label}
        onFwSelect={this.onSelect}
        onFwDeselect={this.onDeselect}
        onFwBlur={this.onBlur}
        id={this.label}
      ></Host>
    );
  }
}
