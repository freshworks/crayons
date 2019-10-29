import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';

import { findCheckedOption, watchForOptions } from '../../utils/utils';

@Component({
  tag: 'fw-radio-group',
})
export class RadioGroup {

  private mutationO?: MutationObserver;

  @Element() el!: HTMLElement;

  /**
   * If `true`, the radios can be deselected.
   */
  @Prop() allowEmpty = false;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name = '';

  /**
   * the value of the radio group.
   */
  @Prop({ mutable: true }) value?: any | null;

  @Watch('value')
  async valueChanged(value: any | undefined) {
    await this.updateRadios();
    this.fwChange.emit({ value });
  }

  /**
   * Emitted when the value has changed.
   */
  @Event() fwChange!: EventEmitter;

  async connectedCallback() {

    const el = this.el;

    if (this.value === undefined) {
      const radio = findCheckedOption(el, 'fw-radio') as HTMLFwRadioElement | undefined;
      if (radio !== undefined) {
        await radio.componentOnReady();
        if (this.value === undefined) {
          this.value = radio.value;
        }
      }
    }

    this.mutationO = watchForOptions<HTMLFwRadioElement>(el, 'fw-radio', async newOption => {
      if (newOption !== undefined) {
        newOption.componentOnReady().then(() => {
          this.value = newOption.value;
        }).catch();
      } else {
        await this.updateRadios();
      }
    });
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
    const radios = await this.getRadios();
    const { value } = this;

    let hasChecked = false;

    // Walk the DOM in reverse order, since the last selected one wins!
    for (const radio of radios) {
      if (!hasChecked && radio.value === value) {
        // correct value for this radio
        // but this radio isn't checked yet
        // and we haven't found a checked yet
        hasChecked = true;
        radio.checked = true;
      } else {
        // this radio doesn't have the correct value
        // or the radio group has been already checked
        radio.checked = false;
      }
    }

    // Reset value if
    if (!hasChecked) {
      this.value = undefined;
    }
  }

  private getRadios() {
    return Promise.all(
      Array
        .from(this.el.querySelectorAll('fw-radio'))
        .map(r => r.componentOnReady())
    );
  }

  private onSelect = (ev: Event) => {
    const selectedRadio = ev.target as HTMLFwRadioElement | null;
    if (selectedRadio) {
      this.value = selectedRadio.value;
    }
  }

  private onDeselect = async (ev: Event) => {
    const selectedRadio = ev.target as HTMLFwRadioElement | null;
    if (this.allowEmpty && selectedRadio.value === this.value) {
      this.value = undefined;
    }
    await this.updateRadios();
  }

  render() {
    return (
      <Host
        role="radiogroup"
        onFwSelect={this.onSelect}
        onFwDeselect={this.onDeselect}
      >
      </Host>
    );
  }
}
