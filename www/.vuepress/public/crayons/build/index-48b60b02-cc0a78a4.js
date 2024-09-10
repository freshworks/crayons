import { f as formatRelative, l as localize, m as match } from './index-3a85bc08-78fc322b.js';
import { b as buildFormatLongFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: 'a second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: 'a minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about an hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: 'an hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: 'a day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about a week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: 'a week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about a month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: 'a month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about a year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: 'a year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over a year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost a year',
    other: 'almost {{count}} years'
  }
};

var formatDistance = function formatDistance(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }

  return result;
};

var dateFormats = {
  full: 'EEEE, MMMM do, yyyy',
  "long": 'MMMM do, yyyy',
  medium: 'MMM d, yyyy',
  "short": 'yyyy-MM-dd'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  "long": 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  "short": 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  "long": "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  "short": '{{date}}, {{time}}'
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (Canada).
 * @language English
 * @iso-639-2 eng
 * @author Mark Owsiak [@markowsiak]{@link https://github.com/markowsiak}
 * @author Marco Imperatore [@mimperatore]{@link https://github.com/mimperatore}
 */

var locale = {
  code: 'en-CA',
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

export default locale;
