import { r as registerInstance, f as createEvent, h, e as Host, g as getElement } from './index-4996832f.js';
import { f as findCheckedOption, w as watchForOptions, r as renderHiddenField } from './index-268121b7.js';

let RadioGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.selectedIndex = 0;
    /**
     * If true, a radio group can be saved without selecting any option. If an option is selected, the selection can be cleared. If the attribute’s value is undefined, the value is set to false.
     */
    this.allowEmpty = false;
    /**
     * Label for the component, that can be used by screen readers.
     */
    this.label = '';
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    /**
     * Indicates the direction of the radio buttons alignment, defaults to vertical alignment.
     */
    this.orientation = 'column';
    this.onSelect = (ev) => {
      const selectedRadio = ev.target;
      if (selectedRadio) {
        this.value = selectedRadio.value;
      }
    };
    this.onDeselect = async (ev) => {
      const selectedRadio = ev.target;
      if (this.allowEmpty && selectedRadio.value === this.value) {
        this.value = undefined;
      }
      await this.updateRadios();
    };
  }
  async valueChanged(value) {
    await this.updateRadios();
    this.fwChange.emit({ value });
  }
  handleKeydown(ev) {
    if (ev.code === 'ArrowDown' ||
      ev.code === 'ArrowRight' ||
      ev.code === 'ArrowLeft' ||
      ev.code === 'ArrowUp' ||
      ev.code === 'Space') {
      ev.preventDefault();
    }
  }
  handleKeyup(event) {
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
  }
  async connectedCallback() {
    const el = this.host;
    this.radios = Array.from(this.host.querySelectorAll('fw-radio')).filter((radio) => !radio.disabled);
    this.host.style.display = 'flex';
    this.host.style.flexDirection = this.orientation;
    if (this.value === undefined) {
      const radio = findCheckedOption(el, 'fw-radio');
      if (radio !== undefined) {
        await radio.componentOnReady();
        if (this.value === undefined) {
          this.value = radio.value;
        }
      }
    }
    this.mutationO = watchForOptions(el, 'fw-radio', async (newOption) => {
      if (newOption !== undefined) {
        newOption
          .componentOnReady()
          .then(() => {
          this.value = newOption.value;
        })
          .catch();
      }
      else {
        await this.updateRadios();
      }
    });
  }
  disconnectedCallback() {
    if (this.mutationO) {
      this.mutationO.disconnect();
      this.mutationO = undefined;
    }
  }
  async updateRadios() {
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
      }
      else {
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
  render() {
    const { host, name, value } = this;
    renderHiddenField(host, name, value);
    return (h(Host, { role: 'radiogroup', "aria-label": this.label, onFwSelect: this.onSelect, onFwDeselect: this.onDeselect }));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "value": ["valueChanged"]
  }; }
};

export { RadioGroup as fw_radio_group };
