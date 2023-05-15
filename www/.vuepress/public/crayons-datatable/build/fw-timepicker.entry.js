import { r as registerInstance, h, g as getElement } from './index-4996832f.js';
import { m as moment_min } from './moment.min-732e0e96.js';
import { r as renderHiddenField } from './index-268121b7.js';

let Timepicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /**
     * State for all the time value\s
     */
    this.timeValues = [];
    /**
     * Format in which time values are populated in the list box. If the value is hh:mm p, the time values are in the 12-hour format. If the value is hh:mm, the time values are in the 24-hr format.
     */
    this.format = 'hh:mm A';
    /**
     * Set true to disable the element
     */
    this.disabled = false;
    /**
     * Represent the intervals and can be a number or array of numbers representing the minute values in an hour
     */
    this.isMeridianFormat = this.format === 'hh:mm A';
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    /**
     * Time interval between the values displayed in the list, specified in minutes.
     */
    this.interval = 30;
    /**
     * Lower time-limit for the values displayed in the list. If this attribute’s value is in the hh:mm format, it is assumed to be hh:mm AM.
     */
    this.minTime = this.isMeridianFormat ? '12:00 AM' : '00:00';
    /**
     * Upper time-limit for the values displayed in the list. If this attribute’s value is in the hh:mm format, it is assumed to be hh:mm AM.
     */
    this.maxTime = this.isMeridianFormat ? '11:30 PM' : '23:30';
    /**
     * Boolean representing whethere it is default end time
     */
    this.isDefaultEndTime = ['11:30 PM', '23:30'].includes(this.maxTime);
    this.getTimeOptionsMeta = (nonMeridianFormat) => {
      const preferredFormat = this.format;
      const timeIntervalArgs = {
        interval: this.interval,
        startTime: moment_min(this.minTime, preferredFormat).format(nonMeridianFormat),
        endTime: moment_min(this.maxTime, preferredFormat).format(nonMeridianFormat),
      };
      return timeIntervalArgs;
    };
    this.setTimeValues = () => {
      const meridianFormat = 'hh:mm A';
      const nonMeridianFormat = 'HH:mm';
      const { interval, startTime, endTime } = this.getTimeOptionsMeta(nonMeridianFormat);
      let currentTimeInMs = moment_min(startTime, nonMeridianFormat).valueOf();
      const endTimeInMs = moment_min(endTime, nonMeridianFormat).valueOf();
      while (currentTimeInMs <= endTimeInMs) {
        this.timeValues.push({
          meridianFormat: moment_min(currentTimeInMs).format(meridianFormat),
          nonMeridianFormat: moment_min(currentTimeInMs).format(nonMeridianFormat),
        });
        currentTimeInMs = moment_min(currentTimeInMs)
          .add(interval, 'minutes')
          .valueOf();
      }
    };
  }
  currentTimeLabel(time) {
    return this.isMeridianFormat ? time.meridianFormat : time.nonMeridianFormat;
  }
  currentTimeValue(time) {
    return time.nonMeridianFormat;
  }
  setTimeValue(e) {
    const { value } = e.detail;
    this.value = value;
  }
  setEndTime() {
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
    return (h("fw-select", { disabled: this.disabled, value: this.value, onFwChange: (e) => this.setTimeValue(e) }, this.timeValues.map((time) => (h("fw-select-option", { value: this.currentTimeValue(time) }, this.currentTimeLabel(time))))));
  }
  get host() { return getElement(this); }
};

export { Timepicker as fw_timepicker };
