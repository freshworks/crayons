import { Component, Listen, State, Prop, h, Method } from '@stencil/core';
import { TranslationController } from '../../../global/Translation';

@Component({
  tag: 'fw-date-condition',
  styles: ':host {display: block}',
  shadow: true,
})
export class DateCondition {
  private datepicker;
  @State() state: 'error' | 'normal' | 'warning' = 'normal';

  @State() hintText = '';

  @State() errorText = '';

  /**
   * The value of the input
   */
  @Prop({ reflect: true, mutable: true }) value;
  /**
   * Whether the component have any error.
   */
  @Prop({ reflect: true, mutable: true }) error = false;
  /**
   * Whether to show the error.
   */
  @Prop({ reflect: true }) showError = true;

  /**
   * The props to be passed to the crayons component.
   */
  @Prop({ reflect: true, mutable: true }) controlProps = {};

  @Listen('fwBlur')
  onInputBlur() {
    this.requiredValidation();
  }

  @Listen('fwChange')
  onSelectionChange(e) {
    this.value = e.detail.value;
  }

  @Method()
  async isValid(): Promise<any> {
    if (this.error) {
      return !this.error;
    }
    this.requiredValidation();
    return !this.error;
  }

  @Method()
  async setError(error, errorText?): Promise<any> {
    this.error = error;
    if (error) {
      this.state = 'error';
      this.showError && (this.errorText = errorText);
    } else {
      this.state = 'normal';
      this.hintText = '';
    }
  }

  @Method()
  async refresh(): Promise<any> {
    this.datepicker.clearValue();
    this.setError(false);
  }

  requiredValidation() {
    if (this.controlProps['mode'] === 'range') {
      this.valueRangeExists(this.value)
        ? this.setError(false)
        : this.setError(
            true,
            TranslationController.t('filters.validation.required')
          );
    } else {
      this.valueExists(this.value)
        ? this.setError(false)
        : this.setError(
            true,
            TranslationController.t('filters.validation.required')
          );
    }
  }

  valueExists(value) {
    return !(typeof value === 'undefined' || value === '');
  }

  valueRangeExists(value) {
    return (
      value &&
      this.valueExists(value['fromDate']) &&
      this.valueExists(value['toDate'])
    );
  }

  componentWillLoad() {
    if (this.controlProps['mode'] === 'range') {
      this.value = {
        fromDate: this.controlProps['fromDate'],
        toDate: this.controlProps['toDate'],
      };
    } else {
      this.value = this.controlProps['value'];
    }
  }

  render() {
    return (
      <fw-datepicker
        ref={(datepicker) => (this.datepicker = datepicker)}
        state={this.state}
        hintText={this.hintText}
        errorText={this.errorText}
        {...this.controlProps}
        readonly
      ></fw-datepicker>
    );
  }
}
