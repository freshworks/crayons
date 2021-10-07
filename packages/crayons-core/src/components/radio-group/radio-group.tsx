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
} from '../../utils/utils';

@Component({
  tag: 'fw-radio-group',
})
export class RadioGroup {
  private mutationO?: MutationObserver;

  @Element() host!: HTMLElement;

  private selectedIndex = 0;
  private radiosPromise;

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
  async handleKeyup(event: KeyboardEvent) {
    const radios = await this.radiosPromise;
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
  }

  async connectedCallback() {
    const el = this.host;

    /**
     * Make sure we start radio's componentOnReady promise as soon as possible in the component
     * lifecycle and maintain a reference to the returned promise so that it can be reused.
     * We are not using await explictly here as the radio group rendering might get
     * affected if any of the radio's componentonReady is resolved later than expected.
     */
    this.radiosPromise = Promise.all(
      Array.from(this.host.querySelectorAll('fw-radio')).map((r) =>
        r.componentOnReady()
      )
    );

    Object.assign(this.host.style, {
      display: 'flex',
      flexDirection: this.orientation,
    });

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
    await this.updateRadios();
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
    const radios = await this.radiosPromise;
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

  render() {
    const { host, name, value } = this;

    renderHiddenField(host, name, value);

    return (
      <Host
        role='radiogroup'
        aria-label={this.label}
        onFwSelect={this.onSelect}
        onFwDeselect={this.onDeselect}
      ></Host>
    );
  }
}
