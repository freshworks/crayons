import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'nas lugha na diog',
    other: 'nas lugha na {{count}} diogan'
  },
  xSeconds: {
    one: '1 diog',
    two: '2 dhiog',
    twenty: '20 diog',
    other: '{{count}} diogan'
  },
  halfAMinute: 'leth mhionaid',
  lessThanXMinutes: {
    one: 'nas lugha na mionaid',
    other: 'nas lugha na {{count}} mionaidean'
  },
  xMinutes: {
    one: '1 mionaid',
    two: '2 mhionaid',
    twenty: '20 mionaid',
    other: '{{count}} mionaidean'
  },
  aboutXHours: {
    one: 'mu uair de thìde',
    other: 'mu {{count}} uairean de thìde'
  },
  xHours: {
    one: '1 uair de thìde',
    two: '2 uair de thìde',
    twenty: '20 uair de thìde',
    other: '{{count}} uairean de thìde'
  },
  xDays: {
    one: '1 là',
    other: '{{count}} là'
  },
  aboutXWeeks: {
    one: 'mu 1 seachdain',
    other: 'mu {{count}} seachdainean'
  },
  xWeeks: {
    one: '1 seachdain',
    other: '{{count}} seachdainean'
  },
  aboutXMonths: {
    one: 'mu mhìos',
    other: 'mu {{count}} mìosan'
  },
  xMonths: {
    one: '1 mìos',
    other: '{{count}} mìosan'
  },
  aboutXYears: {
    one: 'mu bhliadhna',
    other: 'mu {{count}} bliadhnaichean'
  },
  xYears: {
    one: '1 bhliadhna',
    other: '{{count}} bliadhna'
  },
  overXYears: {
    one: 'còrr is bliadhna',
    other: 'còrr is {{count}} bliadhnaichean'
  },
  almostXYears: {
    one: 'cha mhòr bliadhna',
    other: 'cha mhòr {{count}} bliadhnaichean'
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
  } else if (count === 9 && !!formatDistanceLocale[token].nine) {
    result = formatDistanceLocale[token].nine;
  } else if (count === 20 && !!formatDistanceLocale[token].twenty) {
    result = formatDistanceLocale[token].twenty;
  } else if (count === 30 && !!formatDistanceLocale[token].thirty) {
    result = formatDistanceLocale[token].thirty;
  } else {
    result = formatDistanceLocale[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'ann an ' + result;
    } else {
      return 'o chionn ' + result;
    }
  }

  return result;
}

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  "long": 'MMMM do, y',
  medium: 'MMM d, y',
  "short": 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  "long": 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  "short": 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'aig' {{time}}",
  "long": "{{date}} 'aig' {{time}}",
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
  lastWeek: "'mu dheireadh' eeee 'aig' p",
  //FIX
  yesterday: "'an-dè aig' p",
  today: "'an-diugh aig' p",
  tomorrow: "'a-màireach aig' p",
  nextWeek: "eeee 'aig' p",
  other: 'P'
};
function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

var eraValues = {
  narrow: ['R', 'A'],
  abbreviated: ['RC', 'AD'],
  wide: ['ro Chrìosta', 'anno domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['C1', 'C2', 'C3', 'C4'],
  wide: ["a' chiad chairteal", 'an dàrna cairteal', 'an treas cairteal', 'an ceathramh cairteal']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues = {
  narrow: ['F', 'G', 'M', 'G', 'C', 'Ò', 'I', 'L', 'S', 'D', 'S', 'D'],
  abbreviated: ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'],
  wide: ['Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd']
};
var dayValues = {
  narrow: ['D', 'L', 'M', 'C', 'A', 'H', 'S'],
  "short": ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'],
  abbreviated: ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'],
  wide: ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne']
};
var dayPeriodValues = {
  narrow: {
    am: 'm',
    pm: 'f',
    midnight: 'm.o.',
    noon: 'm.l.',
    morning: 'madainn',
    afternoon: 'feasgar',
    evening: 'feasgar',
    night: 'oidhche'
  },
  abbreviated: {
    am: 'M.',
    pm: 'F.',
    midnight: 'meadhan oidhche',
    noon: 'meadhan là',
    morning: 'madainn',
    afternoon: 'feasgar',
    evening: 'feasgar',
    night: 'oidhche'
  },
  wide: {
    am: 'm.',
    pm: 'f.',
    midnight: 'meadhan oidhche',
    noon: 'meadhan là',
    morning: 'madainn',
    afternoon: 'feasgar',
    evening: 'feasgar',
    night: 'oidhche'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'm',
    pm: 'f',
    midnight: 'm.o.',
    noon: 'm.l.',
    morning: 'sa mhadainn',
    afternoon: 'feasgar',
    evening: 'feasgar',
    night: 'air an oidhche'
  },
  abbreviated: {
    am: 'M.',
    pm: 'F.',
    midnight: 'meadhan oidhche',
    noon: 'meadhan là',
    morning: 'sa mhadainn',
    afternoon: 'feasgar',
    evening: 'feasgar',
    night: 'air an oidhche'
  },
  wide: {
    am: 'm.',
    pm: 'f.',
    midnight: 'meadhan oidhche',
    noon: 'meadhan là',
    morning: 'sa mhadainn',
    afternoon: 'feasgar',
    evening: 'feasgar',
    night: 'air an oidhche'
  }
};

function ordinalNumber(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'd';

      case 2:
        return number + 'na';
    }
  }

  if (rem100 === 12) {
    return number + 'na';
  }

  return number + 'mh';
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

var matchOrdinalNumberPattern = /^(\d+)(d|na|tr|mh)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(r|a)/i,
  abbreviated: /^(r\.?\s?c\.?|r\.?\s?a\.?\s?c\.?|a\.?\s?d\.?|a\.?\s?c\.?)/i,
  wide: /^(ro Chrìosta|ron aois choitchinn|anno domini|aois choitcheann)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^c[1234]/i,
  wide: /^[1234](cd|na|tr|mh)? cairteal/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[fgmcòilsd]/i,
  abbreviated: /^(faoi|gear|màrt|gibl|cèit|ògmh|iuch|lùn|sult|dàmh|samh|dùbh)/i,
  wide: /^(am faoilleach|an gearran|am màrt|an giblean|an cèitean|an t-Ògmhios|an t-Iuchar|an lùnastal|an t-Sultain|an dàmhair|an t-Samhain|an dùbhlachd)/i
};
var parseMonthPatterns = {
  narrow: [/^f/i, /^g/i, /^m/i, /^g/i, /^c/i, /^ò/i, /^i/i, /^l/i, /^s/i, /^d/i, /^s/i, /^d/i],
  any: [/^fa/i, /^ge/i, /^mà/i, /^gi/i, /^c/i, /^ò/i, /^i/i, /^l/i, /^su/i, /^d/i, /^sa/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[dlmcahs]/i,
  "short": /^(dò|lu|mà|ci|ar|ha|sa)/i,
  abbreviated: /^(did|dil|dim|dic|dia|dih|dis)/i,
  wide: /^(didòmhnaich|diluain|dimàirt|diciadain|diardaoin|dihaoine|disathairne)/i
};
var parseDayPatterns = {
  narrow: [/^d/i, /^l/i, /^m/i, /^c/i, /^a/i, /^h/i, /^s/i],
  any: [/^d/i, /^l/i, /^m/i, /^c/i, /^a/i, /^h/i, /^s/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(san|aig) (madainn|feasgar|feasgar|oidhche))/i,
  any: /^([ap]\.?\s?m\.?|meadhan oidhche|meadhan là|(san|aig) (madainn|feasgar|feasgar|oidhche))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^m/i,
    pm: /^f/i,
    midnight: /^meadhan oidhche/i,
    noon: /^meadhan là/i,
    morning: /sa mhadainn/i,
    afternoon: /feasgar/i,
    evening: /feasgar/i,
    night: /air an oidhche/i
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
 * @summary Scottish Gaelic.
 * @language Scottish Gaelic
 * @iso-639-2 gla
 * @author Lee Driscoll [@leedriscoll]{@link https://github.com/leedriscoll}
 */

var locale = {
  code: 'gd',
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
