import {
  Component,
  Element,
  Prop,
  State,
  h,
  Method,
  Event,
  EventEmitter,
} from '@stencil/core';
import { parse, format, addMinutes } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { renderHiddenField, hasSlot } from '../../utils';
import FieldControl from '../../function-components/field-control';

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
  @State() hasHintTextSlot = false;
  @State() hasWarningTextSlot = false;
  @State() hasErrorTextSlot = false;

  /**
   * Format in which time values are populated in the list box. If the value is hh:mm p, the time values are in the 12-hour format. If the value is hh:mm, the time values are in the 24-hr format.
   */
  @Prop() format: 'hh:mm a' | 'HH:mm' = 'hh:mm a';

  /**
   * Set true to disable the element
   */
  @Prop() disabled = false;

  /**
   * Represent the intervals and can be a number or array of numbers representing the minute values in an hour
   */
  @State() isMeridianFormat?: boolean = this.format === 'hh:mm a';

  /**
   * Time output value
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
   * Lower time-limit for the values displayed in the list. If this attribute's value is in the hh:mm format, it is assumed to be hh:mm AM.
   */
  @Prop() minTime?: string = this.isMeridianFormat ? '12:00 AM' : '00:00';

  /**
   * Upper time-limit for the values displayed in the list. If this attribute's value is in the hh:mm format, it is assumed to be hh:mm AM.
   */
  @Prop() maxTime?: string = this.isMeridianFormat ? '11:30 PM' : '23:30';

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

  /**
   * Boolean representing whethere it is default end time
   */
  @State() isDefaultEndTime = ['11:30 PM', '23:30'].includes(this.maxTime);

  private nativeInput;

  private getTimeOptionsMeta = (nonMeridianFormat) => {
    const preferredFormat = this.format;
    const timeIntervalArgs = {
      interval: this.interval,
      startTime: format(
        parse(this.minTime, preferredFormat, new Date()),
        nonMeridianFormat,
        {
          locale: enUS,
        }
      ),
      endTime: format(
        parse(this.maxTime, preferredFormat, new Date()),
        nonMeridianFormat,
        {
          locale: enUS,
        }
      ),
    };
    return timeIntervalArgs;
  };

  private setTimeValues = () => {
    const meridianFormat = 'hh:mm a';
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
        meridianFormat: format(currentTimeInMs, meridianFormat, {
          locale: enUS,
        }),
        nonMeridianFormat: format(currentTimeInMs, nonMeridianFormat, {
          locale: enUS,
        }),
      });
      currentTimeInMs = addMinutes(currentTimeInMs, interval).valueOf();
    }
  };

  private currentTimeLabel(time: any) {
    return this.isMeridianFormat ? time.meridianFormat : time.nonMeridianFormat;
  }

  private currentTimeValue(time: any) {
    return time.nonMeridianFormat;
  }

  private setTimeValue(e: any) {
    const { value } = e.detail;
    this.value = value;
    if (this.value)
      this.fwChange.emit({
        event: e,
        name: this.name,
        value: this.value,
      });
  }

  private setEndTime() {
    if (this.isDefaultEndTime) {
      this.maxTime = this.isMeridianFormat ? `11:59 PM` : `23:59`;
    }
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

  onBlur = (e: Event): void => {
    this.fwBlur.emit({
      event: e,
      name: this.name,
    });
  };

  onFocus = (): void => {
    this.fwFocus.emit();
  };

  componentWillLoad() {
    if (this.interval !== 30) {
      this.setEndTime();
    }
    this.setTimeValues();

    this.handleSlotChange();
  }

  handleSlotChange() {
    this.hasHintTextSlot = hasSlot(this.host, 'hint-text');
    this.hasWarningTextSlot = hasSlot(this.host, 'warning-text');
    this.hasErrorTextSlot = hasSlot(this.host, 'error-text');
  }
  disconnectedCallback() {
    this.host.shadowRoot.removeEventListener(
      'slotchange',
      this.handleSlotChange
    );
  }

  render() {
    const { host, name, value } = this;

    renderHiddenField(host, name, value);

    return (
      <FieldControl
        inputId={this.name}
        label={this.label}
        labelId={`${this.label}-${this.name}`}
        state={this.state}
        hintTextId={`hint-${this.name}`}
        hintText={this.hintText}
        hasHintTextSlot={this.hasHintTextSlot}
        errorTextId={`error-${this.name}`}
        errorText={this.errorText}
        hasErrorTextSlot={this.hasErrorTextSlot}
        warningTextId={`warning-${this.name}`}
        warningText={this.warningText}
        hasWarningTextSlot={this.hasWarningTextSlot}
        required={this.required}
      >
        <fw-select
          name={this.name}
          disabled={this.disabled}
          value={this.value}
          required={this.required}
          onFwChange={(e) => this.setTimeValue(e)}
          onFwBlur={this.onBlur}
          ref={(el) => (this.nativeInput = el)}
          state={this.state}
          placeholder={this.placeholder}
        >
          {this.timeValues.map((time) => (
            <fw-select-option value={this.currentTimeValue(time)}>
              {this.currentTimeLabel(time)}
            </fw-select-option>
          ))}
        </fw-select>
      </FieldControl>
    );
  }
}
