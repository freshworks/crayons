import { Component, Listen, State, Prop, h, Method } from '@stencil/core';
import { TranslationController } from '../../../global/Translation';
@Component({
  tag: 'fw-select-condition',
  styles: ':host {display: block}',
  shadow: true,
})
export class SelectCondition {
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
    this.value = e.detail?.meta?.selectedOptions;
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
  async refresh(): Promise<any> {
    this.value = undefined;
    this.setError(false);
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

  requiredValidation() {
    this.valueExists(this.value)
      ? this.setError(false)
      : this.setError(
          true,
          TranslationController.t('filters.validation.required')
        );
  }

  valueExists(value) {
    return !(
      typeof value === 'undefined' ||
      value === '' ||
      value?.length === 0
    );
  }

  componentWillLoad() {}

  render() {
    return (
      <fw-select
        state={this.state}
        hintText={this.hintText}
        errorText={this.errorText}
        selectedOptions={this.value}
        {...this.controlProps}
      ></fw-select>
    );
  }
}
