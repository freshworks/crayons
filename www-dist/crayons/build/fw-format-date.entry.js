import { r as registerInstance } from './index-44c267ce.js';
import { f as formatDate } from './format-date-util-cbbbafe3.js';

let FormatDate = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    /** The date/time to format. If not set, the current date and time will be used. */
    this.date = new Date();
    /** When set, 24 hour time will always be used. */
    this.hourFormat = 'auto';
  }
  render() {
    const date = new Date(this.date);
    const hour12 = this.hourFormat === 'auto' ? undefined : this.hourFormat === '12';
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
};

export { FormatDate as fw_format_date };
