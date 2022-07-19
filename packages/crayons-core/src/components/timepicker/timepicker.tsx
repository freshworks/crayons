import {
  Component,
  Element,
  Prop,
  State,
  h,
  Method,
  Event,
  Watch,
  EventEmitter,
} from '@stencil/core';
import {
  parse,
  format,
  addMinutes,
  isMatch,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { TranslationController } from '../../global/Translation';

import { renderHiddenField } from '../../utils';
import { PopoverPlacementType } from '../../utils/types';

@Component({
  tag: 'fw-timepicker',
  styleUrl: 'timepicker.scss',
  shadow: true,
})
export class Timepicker {
  @Element() host: HTMLElement;

  /**
   * State for all the time values
   */
  @State() timeValues: any[] = [];
  @State() langModule: any;

  /**
   * Format in which time values are populated in the list box. If the value is hh:mm p, the time values are in the 12-hour format. If the value is hh:mm, the time values are in the 24-hr format.
   * The default value will be set based on the locale time format.
   */
  @Prop({ mutable: true }) format: string;

  /**
   * Set true to disable the element
   */
  @Prop() disabled = false;

  /**
   * The Time value. NOTE: The format of the value should match the format or locale attribute otherwise the value won't be selected in the dropdown.
   */
  @Prop({ mutable: true }) value?: string;

  /**
   * Name of the component, saved as part of form data.
   */
  @Prop() name = '';

  /**
   * Time interval between the values displayed in the list, specified in minutes.
   */
  @Prop() interval = 30;
  /**
   * Lower time-limit for the values displayed in the list. The default value will be set based on the locale time format.
   */
  @Prop({ mutable: true }) minTime?: string;

  /**
   * Upper time-limit for the values displayed in the list. The default value will be set based on the locale time format.
   */
  @Prop({ mutable: true }) maxTime?: string;

  /**
   * Specifies the input box as a mandatory field and displays an asterisk next to the label. If the attribute's value is undefined, the value is set to false.
   */
  @Prop() required = false;
  /**
   * Theme based on which the input of the timepicker is styled.
   */
  @Prop() state: 'normal' | 'warning' | 'error' = 'normal';

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
   * Label displayed on the interface, for the component.
   */
  @Prop() label = '';

  /**
   * Text displayed in the select before an option is selected.
   */
  @Prop() placeholder?: string | null;
  /**
   * Placement of the options list with respect to timepicker.
   */
  @Prop({ reflect: true }) optionsPlacement: PopoverPlacementType = 'bottom';
  /**
   * Whether the arrow/caret should be shown in the timepicker.
   */
  @Prop() caret = true;
  /**
   *   Locale for which timePicker needs to be shown. Defaults to browser's current locale.
   */
  @Prop({ mutable: true }) locale: string;

  /**
   * Triggered when a value is selected or deselected from the list box options.
   */
  @Event() fwChange: EventEmitter;

  /**
   * Triggered when the list box loses focus.
   */
  @Event() fwBlur: EventEmitter;

  /**
   * Triggered when the list box comes into focus.
   */
  @Event() fwFocus: EventEmitter;

  private nativeInput;

  private getTimeOptionsMeta = (nonMeridianFormat) => {
    const preferredFormat = this.format;
    const timeIntervalArgs = {
      interval: this.interval,
      startTime: format(
        parse(this.minTime, preferredFormat, new Date()),
        nonMeridianFormat,
        {
          locale: this.langModule,
        }
      ),
      endTime: format(
        parse(this.maxTime, preferredFormat, new Date()),
        nonMeridianFormat,
        {
          locale: this.langModule,
        }
      ),
    };
    return timeIntervalArgs;
  };

  private setTimeValues = () => {
    const nonMeridianFormat = 'HH:mm';
    const { interval, startTime, endTime } =
      this.getTimeOptionsMeta(nonMeridianFormat);
    parse(startTime, nonMeridianFormat, new Date()).valueOf();
    let currentTimeInMs = parse(
      startTime,
      nonMeridianFormat,
      new Date()
    ).valueOf();
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

  private currentTimeLabel(time: any) {
    return time.displayFormat;
  }

  private currentTimeValue(time: any) {
    return time.value;
  }

  private setTimeValue(e: any) {
    const { value } = e.detail;
    if (value)
      this.fwChange.emit({
        event: e,
        name: this.name,
        value: value,
      });
  }

  /**
   * Sets focus on a specific `fw-timepicker`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  @Watch('locale')
  async handleLocaleChange(newLocale) {
    this.langModule = await TranslationController.getDateLangModule(newLocale);
    this.format =
      this.format || this.langModule?.formatLong?.time({ width: 'short' });
    this.minTime = isMatch(this.minTime, this.format)
      ? this.minTime
      : format(startOfDay(new Date()), this.format);
    this.maxTime = isMatch(this.maxTime, this.format)
      ? this.maxTime
      : format(endOfDay(new Date()), this.format);
  }

  onBlur = (e: Event): void => {
    this.fwBlur.emit({
      event: e,
      name: this.name,
    });
  };

  onFocus = (): void => {
    this.fwFocus.emit();
  };

  async componentWillLoad() {
    await this.handleLocaleChange(this.locale);
    this.setTimeValues();
  }

  render() {
    const { host, name, value } = this;

    renderHiddenField(host, name, value);

    return (
      <div class='timepicker'>
        <fw-select
          name={this.name}
          label={this.label}
          hintText={this.hintText}
          errorText={this.errorText}
          warningText={this.warningText}
          disabled={this.disabled}
          value={this.value}
          required={this.required}
          onFwChange={(e) => this.setTimeValue(e)}
          onFwBlur={this.onBlur}
          ref={(el) => (this.nativeInput = el)}
          state={this.state}
          placeholder={this.placeholder}
          search={false}
          optionsPlacement={this.optionsPlacement}
          caret={this.caret}
        >
          {this.timeValues.map((time) => (
            <fw-select-option value={this.currentTimeValue(time)}>
              {this.currentTimeLabel(time)}
            </fw-select-option>
          ))}
        </fw-select>
      </div>
    );
  }
}
