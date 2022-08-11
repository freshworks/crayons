import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'segundo bat baino gutxiago',
    other: '{{count}} segundo baino gutxiago'
  },
  xSeconds: {
    one: '1 segundo',
    other: '{{count}} segundo'
  },
  halfAMinute: 'minutu erdi',
  lessThanXMinutes: {
    one: 'minutu bat baino gutxiago',
    other: '{{count}} minutu baino gutxiago'
  },
  xMinutes: {
    one: '1 minutu',
    other: '{{count}} minutu'
  },
  aboutXHours: {
    one: '1 ordu gutxi gorabehera',
    other: '{{count}} ordu gutxi gorabehera'
  },
  xHours: {
    one: '1 ordu',
    other: '{{count}} ordu'
  },
  xDays: {
    one: '1 egun',
    other: '{{count}} egun'
  },
  aboutXWeeks: {
    one: 'aste 1 inguru',
    other: '{{count}} aste inguru'
  },
  xWeeks: {
    one: '1 aste',
    other: '{{count}} astean'
  },
  aboutXMonths: {
    one: '1 hilabete gutxi gorabehera',
    other: '{{count}} hilabete gutxi gorabehera'
  },
  xMonths: {
    one: '1 hilabete',
    other: '{{count}} hilabete'
  },
  aboutXYears: {
    one: '1 urte gutxi gorabehera',
    other: '{{count}} urte gutxi gorabehera'
  },
  xYears: {
    one: '1 urte',
    other: '{{count}} urte'
  },
  overXYears: {
    one: '1 urte baino gehiago',
    other: '{{count}} urte baino gehiago'
  },
  almostXYears: {
    one: 'ia 1 urte',
    other: 'ia {{count}} urte'
  }
};
function formatDistance(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (count === 1) {
    result = formatDistanceLocale[token].one;
  } else {
    result = formatDistanceLocale[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'en ' + result;
    } else {
      return 'duela ' + result;
    }
  }

  return result;
}

var dateFormats = {
  full: "EEEE, y'ko' MMMM'ren' d'a' y'ren'",
  "long": "y'ko' MMMM'ren' d'a'",
  medium: 'y MMM d',
  "short": 'yy/MM/dd'
};
var timeFormats = {
  full: 'HH:mm:ss zzzz',
  "long": 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  "short": 'HH:mm'
};
var dateTimeFormats = {
  full: "{{date}} 'tan' {{time}}",
  "long": "{{date}} 'tan' {{time}}",
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

var formatRelativeLocale = {
  lastWeek: "'joan den' eeee, LT",
  yesterday: "'atzo,' p",
  today: "'gaur,' p",
  tomorrow: "'bihar,' p",
  nextWeek: 'eeee, p',
  other: 'P'
};
var formatRelativeLocalePlural = {
  lastWeek: "'joan den' eeee, p",
  yesterday: "'atzo,' p",
  today: "'gaur,' p",
  tomorrow: "'bihar,' p",
  nextWeek: 'eeee, p',
  other: 'P'
};
function formatRelative(token, date, _baseDate, _options) {
  if (date.getUTCHours() !== 1) {
    return formatRelativeLocalePlural[token];
  }

  return formatRelativeLocale[token];
}

var eraValues = {
  narrow: ['k.a.', 'k.o.'],
  abbreviated: ['k.a.', 'k.o.'],
  wide: ['kristo aurretik', 'kristo ondoren']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1H', '2H', '3H', '4H'],
  wide: ['1. hiruhilekoa', '2. hiruhilekoa', '3. hiruhilekoa', '4. hiruhilekoa']
};
var monthValues = {
  narrow: ['u', 'o', 'm', 'a', 'm', 'e', 'u', 'a', 'i', 'u', 'a', 'a'],
  abbreviated: ['urt', 'ots', 'mar', 'api', 'mai', 'eka', 'uzt', 'abu', 'ira', 'urr', 'aza', 'abe'],
  wide: ['urtarrila', 'otsaila', 'martxoa', 'apirila', 'maiatza', 'ekaina', 'uztaila', 'abuztua', 'iraila', 'urria', 'azaroa', 'abendua']
};
var dayValues = {
  narrow: ['i', 'a', 'a', 'a', 'o', 'o', 'l'],
  "short": ['ig', 'al', 'as', 'az', 'og', 'or', 'lr'],
  abbreviated: ['iga', 'ast', 'ast', 'ast', 'ost', 'ost', 'lar'],
  wide: ['igandea', 'astelehena', 'asteartea', 'asteazkena', 'osteguna', 'ostirala', 'larunbata']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'ge',
    noon: 'eg',
    morning: 'goiza',
    afternoon: 'arratsaldea',
    evening: 'arratsaldea',
    night: 'gaua'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'gauerdia',
    noon: 'eguerdia',
    morning: 'goiza',
    afternoon: 'arratsaldea',
    evening: 'arratsaldea',
    night: 'gaua'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'gauerdia',
    noon: 'eguerdia',
    morning: 'goiza',
    afternoon: 'arratsaldea',
    evening: 'arratsaldea',
    night: 'gaua'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'ge',
    noon: 'eg',
    morning: 'goizean',
    afternoon: 'arratsaldean',
    evening: 'arratsaldean',
    night: 'gauean'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'gauerdia',
    noon: 'eguerdia',
    morning: 'goizean',
    afternoon: 'arratsaldean',
    evening: 'arratsaldean',
    night: 'gauean'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'gauerdia',
    noon: 'eguerdia',
    morning: 'goizean',
    afternoon: 'arratsaldean',
    evening: 'arratsaldean',
    night: 'gauean'
  }
};

function ordinalNumber(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + '.';
}

var localize = {
  ordinalNumber: ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function argumentCallback(quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern = /^(\d+)(.)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(k.a.|k.o.)/i,
  abbreviated: /^(k.a.|k.o.)/i,
  wide: /^(kristo aurretik|kristo ondoren)/i
};
var parseEraPatterns = {
  narrow: [/^k.a./i, /^k.o./i],
  abbreviated: [/^(k.a.)/i, /^(k.o.)/i],
  wide: [/^(kristo aurretik)/i, /^(kristo ondoren)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]H/i,
  wide: /^[1234](.)? hiruhilekoa/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[uomaei]/i,
  abbreviated: /^(urt|ots|mar|api|mai|eka|uzt|abu|ira|urr|aza|abe)/i,
  wide: /^(urtarrila|otsaila|martxoa|apirila|maiatza|ekaina|uztaila|abuztua|iraila|urria|azaroa|abendua)/i
};
var parseMonthPatterns = {
  narrow: [/^u/i, /^o/i, /^m/i, /^a/i, /^m/i, /^e/i, /^u/i, /^a/i, /^i/i, /^u/i, /^a/i, /^a/i],
  any: [/^urt/i, /^ots/i, /^mar/i, /^api/i, /^mai/i, /^eka/i, /^uzt/i, /^abu/i, /^ira/i, /^urr/i, /^aza/i, /^abe/i]
};
var matchDayPatterns = {
  narrow: /^[iaol]/i,
  "short": /^(ig|al|as|az|og|or|lr)/i,
  abbreviated: /^(iga|ast|ast|ast|ost|ost|lar)/i,
  wide: /^(igandea|astelehena|asteartea|asteazkena|osteguna|ostirala|larunbata)/i
};
var parseDayPatterns = {
  narrow: [/^i/i, /^a/i, /^a/i, /^a/i, /^o/i, /^o/i, /^l/i],
  "short": [/^ig/i, /^al/i, /^as/i, /^az/i, /^og/i, /^or/i, /^lr/i],
  abbreviated: [/^iga/i, /^ast/i, /^ast/i, /^ast/i, /^ost/i, /^ost/i, /^lar/i],
  wide: [/^igandea/i, /^astelehena/i, /^asteartea/i, /^asteazkena/i, /^osteguna/i, /^ostirala/i, /^larunbata/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|ge|eg|((goiza|goizean)|arratsaldea|(gaua|gauean)))/i,
  any: /^([ap]\.?\s?m\.?|gauerdia|eguerdia|((goiza|goizean)|arratsaldea|(gaua|gauean)))/i
};
var parseDayPeriodPatterns = {
  narrow: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^ge/i,
    noon: /^eg/i,
    morning: /goiz/i,
    afternoon: /arratsaldea/i,
    evening: /arratsaldea/i,
    night: /gau/i
  },
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^gauerdia/i,
    noon: /^eguerdia/i,
    morning: /goiz/i,
    afternoon: /arratsaldea/i,
    evening: /arratsaldea/i,
    night: /gau/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function valueCallback(index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Basque locale.
 * @language Basque
 * @iso-639-2 eus
 * @author Jacob Söderblom [@JacobSoderblom]{@link https://github.com/JacobSoderblom}
 */

var locale = {
  code: 'eu',
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

export default locale;
