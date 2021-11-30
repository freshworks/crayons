import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'fw-format-date',
  shadow: true,
})
export class FormatDate {
  /** The date/time to format.
   * Default is current date/time
   */
  @Prop() date: Date | string = new Date();

  /** Locale for formatting date/time */
  @Prop() locale: string;

  /** The format for displaying the second. */
  @Prop() second: 'numeric' | '2-digit';

  /** The format for displaying the minute. */
  @Prop() minute: 'numeric' | '2-digit';

  /** The format for displaying the hour. */
  @Prop() hour: 'numeric' | '2-digit';

  /** The format for displaying the day. */
  @Prop() day: 'numeric' | '2-digit';

  /** The format for displaying the month. */
  @Prop() month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';

  /** The format for displaying the year. */
  @Prop() year: 'numeric' | '2-digit';

  /** The format for displaying the time zone. */
  @Prop() timeZoneName: 'short' | 'long';

  /** The time zone to use. */
  @Prop() timeZone: string;

  /** Determines whether to show 12 hour or 24 hour format */
  @Prop() hourFormat: 'auto' | '12' | '24' = 'auto';

  /** The format for displaying the weekday. */
  @Prop() weekday: 'narrow' | 'short' | 'long';

  /** The format for displaying the era. */
  @Prop() era: 'narrow' | 'short' | 'long';

  render(): string {
    const date = new Date(this.date);
    const isHour12 =
      this.hourFormat === 'auto' ? undefined : this.hourFormat === '12';

    // Check if the given date is invalid.
    if (isNaN(date.getMilliseconds())) {
      console.error(`Invalid date ${this.date}`);
      return;
    }

    return new Intl.DateTimeFormat(this.locale, {
      second: this.second,
      minute: this.minute,
      hour: this.hour,
      day: this.day,
      month: this.month,
      year: this.year,
      weekday: this.weekday,
      era: this.era,
      hour12: isHour12,
      timeZoneName: this.timeZoneName,
      timeZone: this.timeZone,
    }).format(date);
  }
}
