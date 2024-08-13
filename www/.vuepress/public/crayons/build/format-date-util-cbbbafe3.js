function formatDate({ date, locale, options, } = {
  date: new Date(),
  locale: [],
  options: {},
}) {
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

export { formatDate as f };
