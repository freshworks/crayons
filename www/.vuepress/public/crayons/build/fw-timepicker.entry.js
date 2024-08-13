import { r as registerInstance, h as createEvent, i as h, j as getElement } from './index-44c267ce.js';
import { f as format, p as parse, m as addMinutes, h as isMatch, l as startOfDay, n as endOfDay } from './index-2532703a.js';
import { T as TranslationController } from './Translation-ce9b2559.js';
import { r as renderHiddenField } from './index-9b8d850f.js';

const timepickerCss = ":host{font-family:var(--fw-font-family, -apple-system, BlinkMacSystemFont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}:host{display:block}";

let Timepicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    /**
     * State for all the time values
     */
    this.timeValues = [];
    /**
     * Set true to disable the element
     */
    this.disabled = false;
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    /**
     * Time interval between the values displayed in the list, specified in minutes.
     */
    this.interval = 30;
    /**
     * Specifies the input box as a mandatory field and displays an asterisk next to the label. If the attribute's value is undefined, the value is set to false.
     */
    this.required = false;
    /**
     * Theme based on which the input of the timepicker is styled.
     */
    this.state = 'normal';
    /**
     * Hint text displayed below the text box.
     */
    this.hintText = '';
    /**
     * Warning text displayed below the text box.
     */
    this.warningText = '';
    /**
     * Error text displayed below the text box.
     */
    this.errorText = '';
    /**
     * Label displayed on the interface, for the component.
     */
    this.label = '';
    /**
     * Placement of the options list with respect to timepicker.
     */
    this.optionsPlacement = 'bottom';
    /**
     * Whether the arrow/caret should be shown in the timepicker.
     */
    this.caret = true;
    /**
     * Whether the dropdown should be same width as that of the input.
     */
    this.sameWidth = true;
    /**
     * Whether clicking on the already selected option disables it.
     */
    this.allowDeselect = true;
    /**
     * If true, the user cannot type in the text input
     */
    this.readonly = false;
    this.getTimeOptionsMeta = (nonMeridianFormat) => {
      const preferredFormat = this.format;
      const timeIntervalArgs = {
        interval: this.interval,
        startTime: format(parse(this.minTime, preferredFormat, new Date()), nonMeridianFormat, {
          locale: this.langModule,
        }),
        endTime: format(parse(this.maxTime, preferredFormat, new Date()), nonMeridianFormat, {
          locale: this.langModule,
        }),
      };
      return timeIntervalArgs;
    };
    this.setTimeValues = () => {
      const nonMeridianFormat = 'HH:mm';
      const { interval, startTime, endTime } = this.getTimeOptionsMeta(nonMeridianFormat);
      let currentTimeInMs = parse(startTime, nonMeridianFormat, new Date()).valueOf();
      const endTimeInMs = parse(endTime, nonMeridianFormat, new Date()).valueOf();
      while (currentTimeInMs <= endTimeInMs) {
        this.timeValues.push({
          displayFormat: format(currentTimeInMs, this.format, {
            locale: this.langModule,
          }),
          value: format(currentTimeInMs, nonMeridianFormat, {
            locale: this.langModule,
          }),
        });
        currentTimeInMs = addMinutes(currentTimeInMs, interval).valueOf();
      }
    };
    this.onBlur = (e) => {
      this.fwBlur.emit({
        event: e,
        name: this.name,
      });
    };
    this.onFocus = () => {
      this.fwFocus.emit();
    };
  }
  currentTimeLabel(time) {
    return time.displayFormat;
  }
  currentTimeValue(time) {
    return time.value;
  }
  setTimeValue(e) {
    const { value } = e.detail;
    if (value)
      this.fwChange.emit({
        event: e,
        name: this.name,
        value: value,
      });
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
  }
  /**
   * Sets focus on a specific `fw-timepicker`.
   */
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }
  async handleLocaleChange(newLocale) {
    var _a, _b;
    this.langModule = await TranslationController.getDateLangModule(newLocale);
    this.format =
      this.format || ((_b = (_a = this.langModule) === null || _a === void 0 ? void 0 : _a.formatLong) === null || _b === void 0 ? void 0 : _b.time({ width: 'short' }));
    this.minTime = isMatch(this.minTime, this.format)
      ? this.minTime
      : format(startOfDay(new Date()), this.format);
    this.maxTime = isMatch(this.maxTime, this.format)
      ? this.maxTime
      : format(endOfDay(new Date()), this.format);
  }
  async componentWillLoad() {
    await this.handleLocaleChange(this.locale);
    this.setTimeValues();
  }
  render() {
    const { host, name, value } = this;
    renderHiddenField(host, name, value);
    return (h("fw-select", { name: this.name, label: this.label, hintText: this.hintText, errorText: this.errorText, warningText: this.warningText, disabled: this.disabled, value: this.value, required: this.required, onFwChange: (e) => this.setTimeValue(e), onFwBlur: this.onBlur, ref: (el) => (this.nativeInput = el), state: this.state, placeholder: this.placeholder, search: false, optionsPlacement: this.optionsPlacement, caret: this.caret, sameWidth: this.sameWidth, allowDeselect: this.allowDeselect, readonly: this.readonly }, this.timeValues.map((time) => (h("fw-select-option", { value: this.currentTimeValue(time) }, this.currentTimeLabel(time))))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "locale": ["handleLocaleChange"]
  }; }
};
Timepicker.style = timepickerCss;

export { Timepicker as fw_timepicker };
