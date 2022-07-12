import {
  Component,
  Prop,
  h,
  State,
  Element,
  Event,
  EventEmitter,
  Watch,
  Method,
} from '@stencil/core';
import { renderHiddenField } from '../../utils';

import countries from './countries.json';

import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

import { CountryCode } from 'libphonenumber-js/types';

@Component({
  tag: 'fw-country-phone',
  styleUrl: 'country-phone.scss',
  shadow: true,
})
export class CountryPhone {
  @Element() host!: HTMLElement;

  /**
   * Phone input
   */
  @State() phoneNumber: string;

  /**
   * Helps to stop unwanted rendering when value is updated from inside the component
   */
  @State() private isValueUpdatedFromInside = false;

  /**
   * Country 2l code use to extract country details when provided with phonecode and phone number
   */
  @State() countryCode: CountryCode;

  /**
   * Country Name
   */
  @State() countryName: string;

  /**
   * Disable phone number input when invalid phone number or empty string is provided
   */
  @State() disablePhoneInput = true;

  /**
   * Country phone code
   */
  @State() phoneCode: string;

  /**
   * Name of the component, saved as part of form data.
   */
  @Prop() name = '';
  /**
   * Displays a right-justified clear icon in the text box. Clicking the icon clears the input text. If the attribute’s value is undefined, the value is set to false. For a read-only input box, the clear icon is not displayed unless a default value is specified for the input box.
   */
  @Prop() clearInput = false;

  /**
   * Adjust country code select dropdown width
   */
  @Prop() countryWidth?: string | null = '200';
  /**
   * Hide Country Name in the Country Select
   */
  @Prop() hideCountryName = false;
  /**
   * Hide Country Flag in the Country Select
   */
  @Prop() hideCountryFlag = false;

  /**
   * Text displayed in the text box before a user enters a value.
   */
  @Prop() selectPlaceholder?: string | null;

  /**
   * Text displayed in the text box before a user enters a value.
   */
  @Prop() inputPlaceholder?: string | null;

  /**
   *  * Label displayed on the interface, for the input component.
   */
  @Prop() inputLabel?: string | null;

  /**
   *  * Label displayed on the interface, for the input component.
   */
  @Prop() selectLabel?: string | null;

  /**
   * If true, the user cannot enter a value in the input box. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() readonly = false;

  /**
   * Specifies the input box as a mandatory field and displays an asterisk next to the label. If the attribute’s value is undefined, the value is set to false.
   */
  @Prop() required = false;

  /**
   * Disables the component on the interface. If the attribute’s value is undefined, the value is set to false.
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
   *
   * Theme based on which the text box is styled.
   */
  @Prop() state: 'normal' | 'warning' | 'error' = 'normal';

  /**
   * Default value displayed in the input box & select dropdown after extracting valid phone number
   */
  @Prop({ reflect: true, mutable: true }) value?: string | null = '';

  // Events
  /**
   * Triggered when phone element is input.
   */
  @Event() fwInput: EventEmitter;

  /**
   * Triggered when phone element is blur.
   */
  @Event() fwBlur: EventEmitter;

  /**
   * Triggered when clear icon is clicked.
   */
  @Event() fwInputClear: EventEmitter;

  /**
   * Triggered when input is focused.
   */
  @Event() fwFocus: EventEmitter;

  @Method()
  async isValidPhoneNumber(value: string, countryCode: CountryCode) {
    return isValidPhoneNumber(value, countryCode as CountryCode);
  }
  @Method()
  async parsePhoneNumber(...args) {
    return parsePhoneNumber.apply(this, args);
  }

  componentWillLoad() {
    this.setPhoneNumberDetails(this.value);
  }

  private getSingleFormat(code = '', number = '') {
    return '+' + code + number;
  }

  @Watch('value')
  watchPhoneDetails(newValue, oldValue) {
    if (
      !this.isValueUpdatedFromInside &&
      newValue &&
      oldValue &&
      newValue !== oldValue
    ) {
      this.setPhoneNumberDetails(newValue);
    }
    // Donot break value since its updated from inside, otherwise will endup infinite loop
    if (this.isValueUpdatedFromInside) {
      this.isValueUpdatedFromInside = false;
    }
  }

  updateValue() {
    let val = '';
    if (this.phoneCode) {
      val = `+${this.phoneCode}`;
    }

    if (this.phoneNumber) {
      val += `${this.phoneNumber}`;
    }
    this.value = val;
    this.isValueUpdatedFromInside = true;
  }

  setPhoneNumberDetails(input: string) {
    if (input) {
      try {
        let userInput;
        if (input.includes('+')) {
          userInput = input;
        } else {
          userInput = '+' + input;
        }
        const details = parsePhoneNumber(userInput);
        this.countryCode = details.country;
        this.phoneCode = details.countryCallingCode;
        this.phoneNumber = details.nationalNumber;
        this.countryName = this.getCountryName(details.country);
        this.disablePhoneInput = false;
      } catch (_) {
        if (!this.isValueUpdatedFromInside) {
          this.phoneNumber = input.includes('+')
            ? input.replace('+', '')
            : input;
        }
      }
    }
  }

  getMeta = (isValid: boolean) => {
    return {
      meta: {
        isValid,
        countryCode: this.countryCode,
        countryName: this.countryName,
        phoneCode: this.phoneCode,
      },
    };
  };

  private onInputBlur = (event: Event) => {
    event.stopPropagation();
    const value = (event.target as HTMLInputElement).value;
    this.phoneNumber = value;
    const isValid = isValidPhoneNumber(value, this.countryCode as CountryCode);
    this.updateValue();
    this.fwBlur.emit({
      event,
      name: this.name,
      value: this.getSingleFormat(this.phoneCode, value),
      ...this.getMeta(isValid),
    });
  };

  private onInput = (event: Event) => {
    event.stopPropagation();
    const value = (event.target as HTMLInputElement).value;
    this.phoneNumber = value;
    const isValid = isValidPhoneNumber(value, this.countryCode as CountryCode);

    this.updateValue();

    this.fwInput.emit({
      event,
      name: this.name,
      value: this.getSingleFormat(this.phoneCode, value),
      ...this.getMeta(isValid),
    });
  };

  private onInputClear = (event: Event) => {
    event.stopPropagation();
    const value = (event.target as HTMLInputElement).value;
    this.updateValue();
    this.fwInputClear.emit({
      event,
      name: this.name,
      value: this.getSingleFormat(this.phoneCode, value),
      ...this.getMeta(false),
    });
  };

  private onInputFocus = (event: Event) => {
    event.stopPropagation();
    const value = (event.target as HTMLInputElement).value;
    this.updateValue();
    this.fwFocus.emit({
      event,
      name: this.name,
      value: this.getSingleFormat(this.phoneCode, value),
      ...this.getMeta(false),
    });
  };

  private getCountryDetails = (value: string) =>
    countries.filter((r) => r.code2l === value);

  private getCountryName = (inputCountryCode: string) => {
    const currentCountry = this.getCountryDetails(inputCountryCode);
    return (
      currentCountry &&
      currentCountry.length > 0 &&
      currentCountry[0]?.country_name
    );
  };

  private onSelectChange = (event: Event) => {
    event.stopPropagation();
    const value = (event.target as HTMLInputElement).value;
    this.countryCode = value as CountryCode;

    const currentCountry = this.getCountryDetails(value);
    this.phoneCode = currentCountry[0].phone;
    this.countryName = currentCountry[0].country_name;
    this.phoneNumber = '';
    this.isValueUpdatedFromInside = true;
    this.updateValue();
  };

  render() {
    /**
     * @todo : Add new features
     * 1. give option to include countries
     * 2. give option to exclude countries
     * */

    const { host, name, value } = this;
    renderHiddenField(host, name, value);

    return (
      <div class='country-container'>
        <div
          class='country-select-container'
          style={{ flex: `0 0 ${this.countryWidth}px` }}
        >
          <fw-select
            id='fw-country-phone-select'
            label={this.selectLabel}
            readonly={this.readonly}
            required={this.required}
            value={this.countryCode}
            placeholder={this.selectPlaceholder || ''}
            onFwChange={this.onSelectChange}
            sameWidth={false}
            disabled={this.disabled}
          >
            {countries.map((item) => {
              return (
                <fw-select-option
                  value={item.code2l}
                  key={item.country_name}
                  data-phone={item.phone}
                >
                  <span>
                    <span class='desc'>
                      {!this.hideCountryFlag && (
                        <span class='flag'>{item.emoji}</span>
                      )}
                      {'  '}+{item.phone}{' '}
                    </span>
                    {!this.hideCountryName && (
                      <span class='countryName'>- {item.country_name}</span>
                    )}
                  </span>
                </fw-select-option>
              );
            })}
          </fw-select>
        </div>
        <div class='country-input-container'>
          <fw-input
            id='fw-country-phone-input'
            label={this.inputLabel}
            hint-text={this.hintText}
            warning-text={this.warningText}
            error-text={this.errorText}
            state={this.state}
            placeholder={this.inputPlaceholder || ''}
            readonly={this.readonly}
            required={this.required}
            clearInput={this.clearInput}
            value={this.phoneNumber}
            onFwInput={this.onInput}
            onFwInputClear={this.onInputClear}
            onFwFocus={this.onInputFocus}
            disabled={this.disabled}
            onFwBlur={this.onInputBlur}
            name={this.name}
          ></fw-input>
        </div>
      </div>
    );
  }
}
