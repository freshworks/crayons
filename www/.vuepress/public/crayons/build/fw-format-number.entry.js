import { r as registerInstance } from './index-44c267ce.js';

let FormatNumber = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** Number to format. */
    this.value = 0;
    /** Formatting style */
    this.type = 'decimal';
    /** Turns on/off grouping separators. */
    this.useGrouping = true;
    /** Currency display formatting. */
    this.currencyDisplay = 'symbol';
    /** In many locales, accounting format means to wrap the number with parentheses instead of appending a minus sign.
     * You can enable the above by setting the currencySign option to `accounting`.
     * The default value is `standard`
     */
    this.currencySign = 'standard';
    /** The minimum number of integer digits to use. Possible values are 1 - 21.
     * Default is 1
     */
    this.minimumIntegerDigits = 1;
    /** The minimum number of significant digits to use. Possible values are 1 - 21.
     * Default is 1
     */
    this.minimumSignificantDigits = 1;
    /** The maximum number of significant digits to use,. Possible values are 1 - 21.
     * Default is 21
     */
    this.maximumSignificantDigits = 21;
  }
  render() {
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
};

export { FormatNumber as fw_format_number };
