import {
  Component,
  Listen,
  State,
  Prop,
  Event,
  EventEmitter,
  h,
  Method,
} from '@stencil/core';
import { TranslationController } from '../../../global/Translation';

@Component({
  tag: 'fw-input-range-condition',
  styleUrl: 'input-range-condition.scss',
  shadow: true,
})
export class InputRangeCondition {
  private fromElement: any;
  private toElement: any;

  @State() fromValue;
  @State() toValue;
  /**
   * The value of the input
   */
  @Prop({ reflect: true, mutable: true }) value;
  /**
   * Whether the component have any error.
   */
  @Prop({ reflect: true, mutable: true }) error = false;
  /**
   * The props to be passed to the crayons component.
   */
  @Prop({ reflect: true, mutable: true }) controlProps = {};
  /**
   * Triggered when the value in the input box is modified.
   */
  @Event() fwInput: EventEmitter;

  @Listen('fwBlur')
  onInputBlur() {
    this.valueExists(this.fromValue) &&
      this.valueExists(this.toValue) &&
      this.minMaxValidation();
  }

  @Listen('fwInput')
  onInputChange(e) {
    const { tagName, name } = e.composedPath()[0];
    if (tagName === 'FW-INPUT') {
      const inputValue = e.detail.value;
      const parsedValue = this.valueExists(inputValue)
        ? parseInt(inputValue)
        : '';
      if (name === 'from') {
        this.fromValue = parsedValue;
      } else {
        this.toValue = parsedValue;
      }
      this.value = { from: this.fromValue, to: this.toValue };
      this.fwInput.emit({ value: this.value });
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
    }
  }

  @Method()
  async isValid(): Promise<any> {
    if (this.error) {
      return !this.error;
    }
    this.requiredValidation();
    !this.error && this.minMaxValidation();
    return !this.error;
  }

  requiredValidation() {
    this.fromElement.isValid();
    this.toElement.isValid();
    this.error = !(
      this.valueExists(this.fromValue) && this.valueExists(this.toValue)
    );
  }

  minMaxValidation() {
    if (this.fromValue >= this.toValue || this.toValue < this.fromValue) {
      this.error = true;
      this.toElement.setError(
        true,
        TranslationController.t('filters.validation.minMax', {
          fromValue: this.fromValue,
        })
      );
    } else {
      this.error = false;
      this.toElement.setError(false);
    }
  }

  valueExists(value) {
    return !(typeof value === 'undefined' || value === '');
  }

  componentWillLoad() {
    this.fromValue = this.value?.from;
    this.toValue = this.value?.to;
  }

  render() {
    return (
      <div class='range-container'>
        <fw-input-condition
          controlProps={{
            ...this.controlProps,
            type: 'number',
            name: 'from',
            placeholder: TranslationController.t(
              'filters.placeholder.startRange'
            ),
          }}
          ref={(fromElement) => {
            this.fromElement = fromElement;
          }}
          value={this.fromValue}
        ></fw-input-condition>
        <span class='range-text'>
          {' '}
          {TranslationController.t('filters.placeholder.and')}{' '}
        </span>
        <fw-input-condition
          controlProps={{
            ...this.controlProps,
            type: 'number',
            name: 'to',
            placeholder: TranslationController.t(
              'filters.placeholder.endRange'
            ),
          }}
          ref={(toElement) => {
            this.toElement = toElement;
          }}
          value={this.toValue}
        ></fw-input-condition>
      </div>
    );
  }
}
