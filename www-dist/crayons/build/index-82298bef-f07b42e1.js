import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'llai na eiliad',
    other: 'llai na {{count}} eiliad'
  },
  xSeconds: {
    one: '1 eiliad',
    other: '{{count}} eiliad'
  },
  halfAMinute: 'hanner munud',
  lessThanXMinutes: {
    one: 'llai na munud',
    two: 'llai na 2 funud',
    other: 'llai na {{count}} munud'
  },
  xMinutes: {
    one: '1 munud',
    two: '2 funud',
    other: '{{count}} munud'
  },
  aboutXHours: {
    one: 'tua 1 awr',
    other: 'tua {{count}} awr'
  },
  xHours: {
    one: '1 awr',
    other: '{{count}} awr'
  },
  xDays: {
    one: '1 diwrnod',
    two: '2 ddiwrnod',
    other: '{{count}} diwrnod'
  },
  aboutXWeeks: {
    one: 'tua 1 wythnos',
    two: 'tua pythefnos',
    other: 'tua {{count}} wythnos'
  },
  xWeeks: {
    one: '1 wythnos',
    two: 'pythefnos',
    other: '{{count}} wythnos'
  },
  aboutXMonths: {
    one: 'tua 1 mis',
    two: 'tua 2 fis',
    other: 'tua {{count}} mis'
  },
  xMonths: {
    one: '1 mis',
    two: '2 fis',
    other: '{{count}} mis'
  },
  aboutXYears: {
    one: 'tua 1 flwyddyn',
    two: 'tua 2 flynedd',
    other: 'tua {{count}} mlynedd'
  },
  xYears: {
    one: '1 flwyddyn',
    two: '2 flynedd',
    other: '{{count}} mlynedd'
  },
  overXYears: {
    one: 'dros 1 flwyddyn',
    two: 'dros 2 flynedd',
    other: 'dros {{count}} mlynedd'
  },
  almostXYears: {
    one: 'bron 1 flwyddyn',
    two: 'bron 2 flynedd',
    other: 'bron {{count}} mlynedd'
  }
};
function formatDistance(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (count === 1) {
    result = formatDistanceLocale[token].one;
  } else if (count === 2 && !!formatDistanceLocale[token].two) {
    result = formatDistanceLocale[token].two;
  } else {
    result = formatDistanceLocale[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'mewn ' + result;
    } else {
      return result + ' yn ôl';
    }
  }

  return result;
}

var dateFormats = {
  full: 'EEEE, d MMMM yyyy',
  "long": 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  "short": 'dd/MM/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  "long": 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  "short": 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'am' {{time}}",
  "long": "{{date}} 'am' {{time}}",
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
  lastWeek: "eeee 'diwethaf am' p",
  yesterday: "'ddoe am' p",
  today: "'heddiw am' p",
  tomorrow: "'yfory am' p",
  nextWeek: "eeee 'am' p",
  other: 'P'
};
function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

var eraValues = {
  narrow: ['C', 'O'],
  abbreviated: ['CC', 'OC'],
  wide: ['Cyn Crist', 'Ar ôl Crist']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Ch1', 'Ch2', 'Ch3', 'Ch4'],
  wide: ['Chwarter 1af', '2ail chwarter', '3ydd chwarter', '4ydd chwarter']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues = {
  narrow: ['I', 'Ch', 'Ma', 'E', 'Mi', 'Me', 'G', 'A', 'Md', 'H', 'T', 'Rh'],
  abbreviated: ['Ion', 'Chwe', 'Maw', 'Ebr', 'Mai', 'Meh', 'Gor', 'Aws', 'Med', 'Hyd', 'Tach', 'Rhag'],
  wide: ['Ionawr', 'Chwefror', 'Mawrth', 'Ebrill', 'Mai', 'Mehefin', 'Gorffennaf', 'Awst', 'Medi', 'Hydref', 'Tachwedd', 'Rhagfyr']
};
var dayValues = {
  narrow: ['S', 'Ll', 'M', 'M', 'I', 'G', 'S'],
  "short": ['Su', 'Ll', 'Ma', 'Me', 'Ia', 'Gw', 'Sa'],
  abbreviated: ['Sul', 'Llun', 'Maw', 'Mer', 'Iau', 'Gwe', 'Sad'],
  wide: ['dydd Sul', 'dydd Llun', 'dydd Mawrth', 'dydd Mercher', 'dydd Iau', 'dydd Gwener', 'dydd Sadwrn']
};
var dayPeriodValues = {
  narrow: {
    am: 'b',
    pm: 'h',
    midnight: 'hn',
    noon: 'hd',
    morning: 'bore',
    afternoon: 'prynhawn',
    evening: "gyda'r nos",
    night: 'nos'
  },
  abbreviated: {
    am: 'yb',
    pm: 'yh',
    midnight: 'hanner nos',
    noon: 'hanner dydd',
    morning: 'bore',
    afternoon: 'prynhawn',
    evening: "gyda'r nos",
    night: 'nos'
  },
  wide: {
    am: 'y.b.',
    pm: 'y.h.',
    midnight: 'hanner nos',
    noon: 'hanner dydd',
    morning: 'bore',
    afternoon: 'prynhawn',
    evening: "gyda'r nos",
    night: 'nos'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'b',
    pm: 'h',
    midnight: 'hn',
    noon: 'hd',
    morning: 'yn y bore',
    afternoon: 'yn y prynhawn',
    evening: "gyda'r nos",
    night: 'yn y nos'
  },
  abbreviated: {
    am: 'yb',
    pm: 'yh',
    midnight: 'hanner nos',
    noon: 'hanner dydd',
    morning: 'yn y bore',
    afternoon: 'yn y prynhawn',
    evening: "gyda'r nos",
    night: 'yn y nos'
  },
  wide: {
    am: 'y.b.',
    pm: 'y.h.',
    midnight: 'hanner nos',
    noon: 'hanner dydd',
    morning: 'yn y bore',
    afternoon: 'yn y prynhawn',
    evening: "gyda'r nos",
    night: 'yn y nos'
  }
};

function ordinalNumber(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);

  if (number < 20) {
    switch (number) {
      case 0:
        return number + 'fed';

      case 1:
        return number + 'af';

      case 2:
        return number + 'ail';

      case 3:
      case 4:
        return number + 'ydd';

      case 5:
      case 6:
        return number + 'ed';

      case 7:
      case 8:
      case 9:
      case 10:
      case 12:
      case 15:
      case 18:
        return number + 'fed';

      case 11:
      case 13:
      case 14:
      case 16:
      case 17:
      case 19:
        return number + 'eg';
    }
  } else if (number >= 50 && number <= 60 || number === 80 || number >= 100) {
    return number + 'fed';
  }

  return number + 'ain';
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

var matchOrdinalNumberPattern = /^(\d+)(af|ail|ydd|ed|fed|eg|ain)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(c|o)/i,
  abbreviated: /^(c\.?\s?c\.?|o\.?\s?c\.?)/i,
  wide: /^(cyn christ|ar ôl crist|ar ol crist)/i
};
var parseEraPatterns = {
  wide: [/^c/i, /^(ar ôl crist|ar ol crist)/i],
  any: [/^c/i, /^o/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^ch[1234]/i,
  wide: /^(chwarter 1af)|([234](ail|ydd)? chwarter)/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^(i|ch|m|e|g|a|h|t|rh)/i,
  abbreviated: /^(ion|chwe|maw|ebr|mai|meh|gor|aws|med|hyd|tach|rhag)/i,
  wide: /^(ionawr|chwefror|mawrth|ebrill|mai|mehefin|gorffennaf|awst|medi|hydref|tachwedd|rhagfyr)/i
};
var parseMonthPatterns = {
  narrow: [/^i/i, /^ch/i, /^m/i, /^e/i, /^m/i, /^m/i, /^g/i, /^a/i, /^m/i, /^h/i, /^t/i, /^rh/i],
  any: [/^io/i, /^ch/i, /^maw/i, /^e/i, /^mai/i, /^meh/i, /^g/i, /^a/i, /^med/i, /^h/i, /^t/i, /^rh/i]
};
var matchDayPatterns = {
  narrow: /^(s|ll|m|i|g)/i,
  "short": /^(su|ll|ma|me|ia|gw|sa)/i,
  abbreviated: /^(sul|llun|maw|mer|iau|gwe|sad)/i,
  wide: /^dydd (sul|llun|mawrth|mercher|iau|gwener|sadwrn)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^ll/i, /^m/i, /^m/i, /^i/i, /^g/i, /^s/i],
  wide: [/^dydd su/i, /^dydd ll/i, /^dydd ma/i, /^dydd me/i, /^dydd i/i, /^dydd g/i, /^dydd sa/i],
  any: [/^su/i, /^ll/i, /^ma/i, /^me/i, /^i/i, /^g/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(b|h|hn|hd|(yn y|y|yr|gyda'r) (bore|prynhawn|nos|hwyr))/i,
  any: /^(y\.?\s?[bh]\.?|hanner nos|hanner dydd|(yn y|y|yr|gyda'r) (bore|prynhawn|nos|hwyr))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^b|(y\.?\s?b\.?)/i,
    pm: /^h|(y\.?\s?h\.?)|(yr hwyr)/i,
    midnight: /^hn|hanner nos/i,
    noon: /^hd|hanner dydd/i,
    morning: /bore/i,
    afternoon: /prynhawn/i,
    evening: /^gyda'r nos$/i,
    night: /blah/i
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
 * @summary Welsh locale.
 * @language Welsh
 * @iso-639-2 cym
 * @author Elwyn Malethan [@elmomalmo]{@link https://github.com/elmomalmo}
 */

var locale = {
  code: 'cy',
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
