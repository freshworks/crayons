import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'inqas minn sekonda',
    other: 'inqas minn {{count}} sekondi'
  },
  xSeconds: {
    one: 'sekonda',
    other: '{{count}} sekondi'
  },
  halfAMinute: 'nofs minuta',
  lessThanXMinutes: {
    one: 'inqas minn minuta',
    other: 'inqas minn {{count}} minuti'
  },
  xMinutes: {
    one: 'minuta',
    other: '{{count}} minuti'
  },
  aboutXHours: {
    one: 'madwar siegħa',
    other: 'madwar {{count}} siegħat'
  },
  xHours: {
    one: 'siegħa',
    other: '{{count}} siegħat'
  },
  xDays: {
    one: 'ġurnata',
    other: '{{count}} ġranet'
  },
  aboutXWeeks: {
    one: 'madwar ġimgħa',
    other: 'madwar {{count}} ġimgħat'
  },
  xWeeks: {
    one: 'ġimgħa',
    other: '{{count}} ġimgħat'
  },
  aboutXMonths: {
    one: 'madwar xahar',
    other: 'madwar {{count}} xhur'
  },
  xMonths: {
    one: 'xahar',
    other: '{{count}} xhur'
  },
  aboutXYears: {
    one: 'madwar sena',
    two: 'madwar sentejn',
    other: 'madwar {{count}} snin'
  },
  xYears: {
    one: 'sena',
    two: 'sentejn',
    other: '{{count}} snin'
  },
  overXYears: {
    one: 'aktar minn sena',
    two: 'aktar minn sentejn',
    other: 'aktar minn {{count}} snin'
  },
  almostXYears: {
    one: 'kważi sena',
    two: 'kważi sentejn',
    other: 'kważi {{count}} snin'
  }
};
function formatDistance(token, count, options) {
  options = options || {};
  var adverb = token.match(/years/i);
  var result;

  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (count === 1) {
    result = formatDistanceLocale[token].one;
  } else if (count === 2 && adverb) {
    result = formatDistanceLocale[token].two;
  } else {
    result = formatDistanceLocale[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "f'" + result;
    } else {
      return result + ' ilu';
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
  full: 'HH:mm:ss zzzz',
  "long": 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  "short": 'HH:mm'
};
var dateTimeFormats = {
  full: '{{date}} {{time}}',
  "long": '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  "short": '{{date}} {{time}}'
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
  lastWeek: "eeee 'li għadda' 'fil-'p",
  yesterday: "'Il-bieraħ fil-'p",
  today: "'Illum fil-'p",
  tomorrow: "'Għada fil-'p",
  nextWeek: "eeee 'fil-'p",
  other: 'P'
};
function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

var eraValues = {
  narrow: ['Q', 'W'],
  abbreviated: ['QK', 'WK'],
  wide: ['qabel Kristu', 'wara Kristu']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['K1', 'K2', 'K3', 'K4'],
  wide: ['1. kwart', '2. kwart', '3. kwart', '4. kwart']
};
var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'Ġ', 'L', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Fra', 'Mar', 'Apr', 'Mej', 'Ġun', 'Lul', 'Aww', 'Set', 'Ott', 'Nov', 'Diċ'],
  wide: ['Jannar', 'Frar', 'Marzu', 'April', 'Mejju', 'Ġunju', 'Lulju', 'Awwissu', 'Settembru', 'Ottubru', 'Novembru', 'Diċembru']
};
var dayValues = {
  narrow: ['Ħ', 'T', 'T', 'E', 'Ħ', 'Ġ', 'S'],
  "short": ['Ħa', 'Tn', 'Tl', 'Er', 'Ħa', 'Ġi', 'Si'],
  abbreviated: ['Ħad', 'Tne', 'Tli', 'Erb', 'Ħam', 'Ġim', 'Sib'],
  wide: ['Il-Ħadd', 'It-Tnejn', 'It-Tlieta', 'L-Erbgħa', 'Il-Ħamis', 'Il-Ġimgħa', 'Is-Sibt']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'nofsillejl',
    noon: 'nofsinhar',
    morning: 'għodwa',
    afternoon: 'wara nofsinhar',
    evening: 'filgħaxija',
    night: 'lejl'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'nofsillejl',
    noon: 'nofsinhar',
    morning: 'għodwa',
    afternoon: 'wara nofsinhar',
    evening: 'filgħaxija',
    night: 'lejl'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'nofsillejl',
    noon: 'nofsinhar',
    morning: 'għodwa',
    afternoon: 'wara nofsinhar',
    evening: 'filgħaxija',
    night: 'lejl'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: "f'nofsillejl",
    noon: "f'nofsinhar",
    morning: 'filgħodu',
    afternoon: 'wara nofsinhar',
    evening: 'filgħaxija',
    night: 'billejl'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: "f'nofsillejl",
    noon: "f'nofsinhar",
    morning: 'filgħodu',
    afternoon: 'wara nofsinhar',
    evening: 'filgħaxija',
    night: 'billejl'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: "f'nofsillejl",
    noon: "f'nofsinhar",
    morning: 'filgħodu',
    afternoon: 'wara nofsinhar',
    evening: 'filgħaxija',
    night: 'billejl'
  }
};

function ordinalNumber(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + 'º';
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

var matchOrdinalNumberPattern = /^(\d+)(º)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(q|w)/i,
  abbreviated: /^(q\.?\s?k\.?|b\.?\s?c\.?\s?e\.?|w\.?\s?k\.?)/i,
  wide: /^(qabel kristu|before common era|wara kristu|common era)/i
};
var parseEraPatterns = {
  any: [/^(q|b)/i, /^(w|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^k[1234]/i,
  wide: /^[1234](\.)? kwart/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmaglsond]/i,
  abbreviated: /^(jan|fra|mar|apr|mej|ġun|lul|aww|set|ott|nov|diċ)/i,
  wide: /^(jannar|frar|marzu|april|mejju|ġunju|lulju|awwissu|settembru|ottubru|novembru|diċembru)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^ġ/i, /^l/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^mej/i, /^ġ/i, /^l/i, /^aw/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[ħteġs]/i,
  "short": /^(ħa|tn|tl|er|ħa|ġi|si)/i,
  abbreviated: /^(ħad|tne|tli|erb|ħam|ġim|sib)/i,
  wide: /^(il-ħadd|it-tnejn|it-tlieta|l-erbgħa|il-ħamis|il-ġimgħa|is-sibt)/i
};
var parseDayPatterns = {
  narrow: [/^ħ/i, /^t/i, /^t/i, /^e/i, /^ħ/i, /^ġ/i, /^s/i],
  any: [/^(il-)?ħad/i, /^(it-)?tn/i, /^(it-)?tl/i, /^(l-)?er/i, /^(il-)?ham/i, /^(il-)?ġi/i, /^(is-)?si/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|f'nofsillejl|f'nofsinhar|(ta') (għodwa|wara nofsinhar|filgħaxija|lejl))/i,
  any: /^([ap]\.?\s?m\.?|f'nofsillejl|f'nofsinhar|(ta') (għodwa|wara nofsinhar|filgħaxija|lejl))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^f'nofsillejl/i,
    noon: /^f'nofsinhar/i,
    morning: /għodwa/i,
    afternoon: /wara(\s.*)nofsinhar/i,
    evening: /filgħaxija/i,
    night: /lejl/i
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
 * @summary Maltese locale.
 * @language Maltese
 * @iso-639-2 mlt
 * @author Andras Matzon [@amatzon](@link https://github.com/amatzon)
 * @author Bryan Borg [@bryanMt](@link https://github.com/bryanMt)
 */

var locale = {
  code: 'mt',
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

export default locale;
