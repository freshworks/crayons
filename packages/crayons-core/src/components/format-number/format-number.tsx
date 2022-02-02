import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'fw-format-number',
  shadow: true,
})
export class FormatNumber {
  /** Number to format. */
  @Prop() value = 0;

  /** `Locale` used for formatting the number */
  @Prop() locale: string;

  /** Formatting style */
  @Prop() type: 'currency' | 'decimal' | 'percent' = 'decimal';

  /** Turns on/off grouping separators. */
  @Prop() useGrouping = true;

  /** The currency to use in currency formatting.
   * Possible values are the `ISO 4217` currency codes, such as `USD` for the US dollar, `EUR` for the euro.
   * If the style is "currency", the currency property must be provided. */
  @Prop() currency: string;

  /** Currency display formatting. */
  @Prop() currencyDisplay: 'symbol' | 'narrowSymbol' | 'code' | 'name' =
    'symbol';

  /** In many locales, accounting format means to wrap the number with parentheses instead of appending a minus sign.
   * You can enable the above by setting the currencySign option to `accounting`.
   * The default value is `standard`
   */
  @Prop() currencySign: 'accounting' | 'standard' = 'standard';

  /** The minimum number of integer digits to use. Possible values are 1 - 21.
   * Default is 1
   */
  @Prop()
  minimumIntegerDigits = 1;

  /** The minimum number of fraction digits to use. Possible values are 0 - 20. */
  @Prop()
  minimumFractionDigits: number;

  /** The maximum number of fraction digits to use. Possible values are 0 - 20. */
  @Prop()
  maximumFractionDigits: number;

  /** The minimum number of significant digits to use. Possible values are 1 - 21.
   * Default is 1
   */
  @Prop()
  minimumSignificantDigits = 1;

  /** The maximum number of significant digits to use,. Possible values are 1 - 21.
   * Default is 21
   */
  @Prop()
  maximumSignificantDigits = 21;

  render(): string {
    if (isNaN(this.value)) {
      return '';
    }

    return new Intl.NumberFormat(this.locale, {
      style: this.type,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      currencySign: this.currencySign,
      useGrouping: this.useGrouping,
      minimumIntegerDigits: this.minimumIntegerDigits,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumSignificantDigits: this.minimumSignificantDigits,
      maximumSignificantDigits: this.maximumSignificantDigits,
    }).format(this.value);
  }
}
