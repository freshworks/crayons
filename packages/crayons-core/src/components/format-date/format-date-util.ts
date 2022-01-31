export interface dateOptions {
  weekday?: 'narrow' | 'short' | 'long';

  /** The format for displaying the year. */
  year?: 'numeric' | '2-digit';

  /** The format for displaying the month. */
  month?: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';

  /** The format for displaying the day. */
  day?: 'numeric' | '2-digit';

  /** The format for displaying the hour. */
  hour?: 'numeric' | '2-digit';

  /** The format for displaying the minute. */
  minute?: 'numeric' | '2-digit';

  /** The format for displaying the second. */
  second?: 'numeric' | '2-digit';

  /** When set, 24 hour time will always be used. */
  hour12?: boolean;

  /** The format for displaying the time. */
  timeZoneName?: 'short' | 'long';

  /** The time zone to express the time in. */
  timeZone?: string;
}

export function formatDate(
  {
    date,
    locale,
    options,
  }: {
    date: string | Date | number;
    locale: string | [];
    options: dateOptions;
  } = {
    date: new Date(),
    locale: [],
    options: {},
  }
): string {
  const dt = new Date(date);
  // Check for an invalid date
  if (isNaN(dt.getMilliseconds())) {
    return undefined;
  }

  return new Intl.DateTimeFormat(locale || [], {
    weekday: options.weekday,
    year: options.year,
    month: options.month,
    day: options.day,
    hour: options.hour,
    minute: options.minute,
    second: options.second,
    timeZoneName: options.timeZoneName,
    timeZone: options.timeZone,
    hour12: options.hour12,
  }).format(dt);
}
