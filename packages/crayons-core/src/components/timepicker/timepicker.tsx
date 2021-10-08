import { Component, Element, Prop, State, h } from '@stencil/core';
import moment from 'moment-mini';

import { renderHiddenField } from '../../utils';

@Component({
  tag: 'fw-timepicker',
  shadow: true,
})
export class Timepicker {
  @Element() host: HTMLElement;

  /**
   * State for all the time value\s
   */
  @State() timeValues: any[] = [];

  /**
   * Format in which time values are populated in the list box. If the value is hh:mm p, the time values are in the 12-hour format. If the value is hh:mm, the time values are in the 24-hr format.
   */
  @Prop() format: 'hh:mm A' | 'HH:mm' = 'hh:mm A';

  /**
   * Set true to disable the element
   */
  @Prop() disabled = false;

  /**
   * Represent the intervals and can be a number or array of numbers representing the minute values in an hour
   */
  @State() isMeridianFormat?: boolean = this.format === 'hh:mm A';

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
   * Lower time-limit for the values displayed in the list. If this attribute’s value is in the hh:mm format, it is assumed to be hh:mm AM.
   */
  @Prop() minTime?: string = this.isMeridianFormat ? '12:00 AM' : '00:00';

  /**
   * Upper time-limit for the values displayed in the list. If this attribute’s value is in the hh:mm format, it is assumed to be hh:mm AM.
   */
  @Prop() maxTime?: string = this.isMeridianFormat ? '11:30 PM' : '23:30';
  /**
   * Boolean representing whethere it is default end time
   */
  @State() isDefaultEndTime = ['11:30 PM', '23:30'].includes(this.maxTime);

  private getTimeOptionsMeta = (nonMeridianFormat) => {
    const preferredFormat = this.format;
    const timeIntervalArgs = {
      interval: this.interval,
      startTime: moment(this.minTime, preferredFormat).format(
        nonMeridianFormat
      ),
      endTime: moment(this.maxTime, preferredFormat).format(nonMeridianFormat),
    };
    return timeIntervalArgs;
  };

  private setTimeValues = () => {
    const meridianFormat = 'hh:mm A';
    const nonMeridianFormat = 'HH:mm';
    const { interval, startTime, endTime } =
      this.getTimeOptionsMeta(nonMeridianFormat);
    let currentTimeInMs = moment(startTime, nonMeridianFormat).valueOf();
    const endTimeInMs = moment(endTime, nonMeridianFormat).valueOf();

    while (currentTimeInMs <= endTimeInMs) {
      this.timeValues.push({
        meridianFormat: moment(currentTimeInMs).format(meridianFormat),
        nonMeridianFormat: moment(currentTimeInMs).format(nonMeridianFormat),
      });
      currentTimeInMs = moment(currentTimeInMs)
        .add(interval, 'minutes')
        .valueOf();
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
  }

  private setEndTime() {
    if (this.isDefaultEndTime) {
      this.maxTime = this.isMeridianFormat ? `11:59 PM` : `23:59`;
    }
  }

  componentWillLoad() {
    if (this.interval !== 30) {
      this.setEndTime();
    }
    this.setTimeValues();
  }

  render() {
    const { host, name, value } = this;

    renderHiddenField(host, name, value);

    return (
      <fw-select
        disabled={this.disabled}
        value={this.value}
        onFwChange={(e) => this.setTimeValue(e)}
      >
        {this.timeValues.map((time) => (
          <fw-select-option value={this.currentTimeValue(time)}>
            {this.currentTimeLabel(time)}
          </fw-select-option>
        ))}
      </fw-select>
    );
  }
}
