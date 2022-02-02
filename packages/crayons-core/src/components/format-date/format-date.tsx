import { Component, Prop } from '@stencil/core';
import { formatDate } from './format-date-util';

@Component({
  tag: 'fw-format-date',
  shadow: true,
})
export class FormatDate {
  /** The date/time to format. If not set, the current date and time will be used. */
  @Prop() date: Date | string | number = new Date();

  /** The locale to use when formatting the date/time. */
  @Prop() locale: string;

  /** The format for displaying the weekday. */
  @Prop() weekday: 'narrow' | 'short' | 'long';

  /** The format for displaying the year. */
  @Prop() year: 'numeric' | '2-digit';

  /** The format for displaying the month. */
  @Prop() month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';

  /** The format for displaying the day. */
  @Prop() day: 'numeric' | '2-digit';

  /** The format for displaying the hour. */
  @Prop() hour: 'numeric' | '2-digit';

  /** The format for displaying the minute. */
  @Prop() minute: 'numeric' | '2-digit';

  /** The format for displaying the second. */
  @Prop() second: 'numeric' | '2-digit';

  /** When set, 24 hour time will always be used. */
  @Prop() hourFormat: 'auto' | '12' | '24' = 'auto';

  /** The format for displaying the time. */
  @Prop() timeZoneName: 'short' | 'long';

  /** The time zone to express the time in. */
  @Prop() timeZone: string;

  render(): string {
    const date = new Date(this.date);
    const hour12 =
      this.hourFormat === 'auto' ? undefined : this.hourFormat === '12';

    // Check if the given date is invalid.
    if (isNaN(date.getMilliseconds())) {
      console.error(`Invalid date ${this.date}`);
      return;
    }
    {
      return formatDate({
        date: date,
        locale: this.locale,
        options: {
          weekday: this.weekday,
          year: this.year,
          month: this.month,
          day: this.day,
          hour: this.hour,
          minute: this.minute,
          second: this.second,
          timeZoneName: this.timeZoneName,
          timeZone: this.timeZone,
          hour12: hour12,
        },
      });
    }
  }
}
