import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

// Source: https://www.unicode.org/cldr/charts/32/summary/gu.html
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'હમણાં',
    // CLDR #1461
    other: '​આશરે {{count}} સેકંડ'
  },
  xSeconds: {
    one: '1 સેકંડ',
    other: '{{count}} સેકંડ'
  },
  halfAMinute: 'અડધી મિનિટ',
  lessThanXMinutes: {
    one: 'આ મિનિટ',
    // CLDR #1448
    other: '​આશરે {{count}} મિનિટ'
  },
  xMinutes: {
    one: '1 મિનિટ',
    other: '{{count}} મિનિટ'
  },
  aboutXHours: {
    one: '​આશરે 1 કલાક',
    other: '​આશરે {{count}} કલાક'
  },
  xHours: {
    one: '1 કલાક',
    other: '{{count}} કલાક'
  },
  xDays: {
    one: '1 દિવસ',
    other: '{{count}} દિવસ'
  },
  aboutXWeeks: {
    one: 'આશરે 1 અઠવાડિયું',
    other: 'આશરે {{count}} અઠવાડિયા'
  },
  xWeeks: {
    one: '1 અઠવાડિયું',
    other: '{{count}} અઠવાડિયા'
  },
  aboutXMonths: {
    one: 'આશરે 1 મહિનો',
    other: 'આશરે {{count}} મહિના'
  },
  xMonths: {
    one: '1 મહિનો',
    other: '{{count}} મહિના'
  },
  aboutXYears: {
    one: 'આશરે 1 વર્ષ',
    other: 'આશરે {{count}} વર્ષ'
  },
  xYears: {
    one: '1 વર્ષ',
    other: '{{count}} વર્ષ'
  },
  overXYears: {
    one: '1 વર્ષથી વધુ',
    other: '{{count}} વર્ષથી વધુ'
  },
  almostXYears: {
    one: 'લગભગ 1 વર્ષ',
    other: 'લગભગ {{count}} વર્ષ'
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
      return result + 'માં';
    } else {
      return result + ' પહેલાં';
    }
  }

  return result;
}

var dateFormats = {
  full: 'EEEE, d MMMM, y',
  // CLDR #1825
  "long": 'd MMMM, y',
  // CLDR #1826
  medium: 'd MMM, y',
  // CLDR #1827
  "short": 'd/M/yy' // CLDR #1828

};
var timeFormats = {
  full: 'hh:mm:ss a zzzz',
  // CLDR #1829
  "long": 'hh:mm:ss a z',
  // CLDR #1830
  medium: 'hh:mm:ss a',
  // CLDR #1831
  "short": 'hh:mm a' // CLDR #1832

};
var dateTimeFormats = {
  full: '{{date}} {{time}}',
  // CLDR #1833
  "long": '{{date}} {{time}}',
  // CLDR #1834
  medium: '{{date}} {{time}}',
  // CLDR #1835
  "short": '{{date}} {{time}}' // CLDR #1836

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

// Source: https://www.unicode.org/cldr/charts/32/summary/gu.html
var formatRelativeLocale = {
  lastWeek: "'પાછલા' eeee p",
  // CLDR #1384
  yesterday: "'ગઈકાલે' p",
  // CLDR #1409
  today: "'આજે' p",
  // CLDR #1410
  tomorrow: "'આવતીકાલે' p",
  // CLDR #1411
  nextWeek: 'eeee p',
  // CLDR #1386
  other: 'P'
};
function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

// #1621 - #1630

var eraValues = {
  narrow: ['ઈસપૂ', 'ઈસ'],
  abbreviated: ['ઈ.સ.પૂર્વે', 'ઈ.સ.'],
  wide: ['ઈસવીસન પૂર્વે', 'ઈસવીસન']
}; // https://www.unicode.org/cldr/charts/32/summary/gu.html
// #1631 - #1654

var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1લો ત્રિમાસ', '2જો ત્રિમાસ', '3જો ત્રિમાસ', '4થો ત્રિમાસ']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
// https://www.unicode.org/cldr/charts/32/summary/gu.html
// #1655 - #1726

var monthValues = {
  narrow: ['જા', 'ફે', 'મા', 'એ', 'મે', 'જૂ', 'જુ', 'ઓ', 'સ', 'ઓ', 'ન', 'ડિ'],
  abbreviated: ['જાન્યુ', 'ફેબ્રુ', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન', 'જુલાઈ', 'ઑગસ્ટ', 'સપ્ટે', 'ઓક્ટો', 'નવે', 'ડિસે'],
  wide: ['જાન્યુઆરી', 'ફેબ્રુઆરી', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન', 'જુલાઇ', 'ઓગસ્ટ', 'સપ્ટેમ્બર', 'ઓક્ટોબર', 'નવેમ્બર', 'ડિસેમ્બર']
}; // https://www.unicode.org/cldr/charts/32/summary/gu.html
// #1727 - #1768

var dayValues = {
  narrow: ['ર', 'સો', 'મં', 'બુ', 'ગુ', 'શુ', 'શ'],
  "short": ['ર', 'સો', 'મં', 'બુ', 'ગુ', 'શુ', 'શ'],
  abbreviated: ['રવિ', 'સોમ', 'મંગળ', 'બુધ', 'ગુરુ', 'શુક્ર', 'શનિ'],
  wide: ['રવિવાર'
  /* Sunday */
  , 'સોમવાર'
  /* Monday */
  , 'મંગળવાર'
  /* Tuesday */
  , 'બુધવાર'
  /* Wednesday */
  , 'ગુરુવાર'
  /* Thursday */
  , 'શુક્રવાર'
  /* Friday */
  , 'શનિવાર'
  /* Saturday */
  ]
}; // https://www.unicode.org/cldr/charts/32/summary/gu.html
// #1783 - #1824

var dayPeriodValues = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'મ.રાત્રિ',
    noon: 'બ.',
    morning: 'સવારે',
    afternoon: 'બપોરે',
    evening: 'સાંજે',
    night: 'રાત્રે'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: '​મધ્યરાત્રિ',
    noon: 'બપોરે',
    morning: 'સવારે',
    afternoon: 'બપોરે',
    evening: 'સાંજે',
    night: 'રાત્રે'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: '​મધ્યરાત્રિ',
    noon: 'બપોરે',
    morning: 'સવારે',
    afternoon: 'બપોરે',
    evening: 'સાંજે',
    night: 'રાત્રે'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'મ.રાત્રિ',
    noon: 'બપોરે',
    morning: 'સવારે',
    afternoon: 'બપોરે',
    evening: 'સાંજે',
    night: 'રાત્રે'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'મધ્યરાત્રિ',
    noon: 'બપોરે',
    morning: 'સવારે',
    afternoon: 'બપોરે',
    evening: 'સાંજે',
    night: 'રાત્રે'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: '​મધ્યરાત્રિ',
    noon: 'બપોરે',
    morning: 'સવારે',
    afternoon: 'બપોરે',
    evening: 'સાંજે',
    night: 'રાત્રે'
  }
};

function ordinalNumber(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  return number;
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

var matchOrdinalNumberPattern = /^(\d+)(લ|જ|થ|ઠ્ઠ|મ)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(ઈસપૂ|ઈસ)/i,
  abbreviated: /^(ઈ\.સ\.પૂર્વે|ઈ\.સ\.)/i,
  wide: /^(ઈસવીસન\sપૂર્વે|ઈસવીસન)/i
};
var parseEraPatterns = {
  any: [/^(ઈસપૂ|ઈસ)/i, /^(ઈ\.સ\.પૂર્વે|ઈ\.સ\.)/i, /^(ઈસવીસન\sપૂર્વે|ઈસવીસન)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](લો|જો|થો)? ત્રિમાસ/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  // eslint-disable-next-line no-misleading-character-class
  narrow: /^[જાફેમાએમેજૂજુઓસઓનડિ]/i,
  abbreviated: /^(જાન્યુ|ફેબ્રુ|માર્ચ|એપ્રિલ|મે|જૂન|જુલાઈ|ઑગસ્ટ|સપ્ટે|ઓક્ટો|નવે|ડિસે)/i,
  wide: /^(જાન્યુઆરી|ફેબ્રુઆરી|માર્ચ|એપ્રિલ|મે|જૂન|જુલાઇ|ઓગસ્ટ|સપ્ટેમ્બર|ઓક્ટોબર|નવેમ્બર|ડિસેમ્બર)/i
};
var parseMonthPatterns = {
  narrow: [/^જા/i, /^ફે/i, /^મા/i, /^એ/i, /^મે/i, /^જૂ/i, /^જુ/i, /^ઑગ/i, /^સ/i, /^ઓક્ટો/i, /^ન/i, /^ડિ/i],
  any: [/^જા/i, /^ફે/i, /^મા/i, /^એ/i, /^મે/i, /^જૂ/i, /^જુ/i, /^ઑગ/i, /^સ/i, /^ઓક્ટો/i, /^ન/i, /^ડિ/i]
};
var matchDayPatterns = {
  narrow: /^(ર|સો|મં|બુ|ગુ|શુ|શ)/i,
  "short": /^(ર|સો|મં|બુ|ગુ|શુ|શ)/i,
  abbreviated: /^(રવિ|સોમ|મંગળ|બુધ|ગુરુ|શુક્ર|શનિ)/i,
  wide: /^(રવિવાર|સોમવાર|મંગળવાર|બુધવાર|ગુરુવાર|શુક્રવાર|શનિવાર)/i
};
var parseDayPatterns = {
  narrow: [/^ર/i, /^સો/i, /^મં/i, /^બુ/i, /^ગુ/i, /^શુ/i, /^શ/i],
  any: [/^ર/i, /^સો/i, /^મં/i, /^બુ/i, /^ગુ/i, /^શુ/i, /^શ/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|મ\.?|સ|બ|સાં|રા)/i,
  any: /^(a|p|મ\.?|સ|બ|સાં|રા)/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^મ\.?/i,
    noon: /^બ/i,
    morning: /સ/i,
    afternoon: /બ/i,
    evening: /સાં/i,
    night: /રા/i
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
 * @summary Gujarati locale (India).
 * @language Gujarati
 * @iso-639-2 guj
 * @author Manaday Mavani [@ManadayM]{@link https://github.com/manadaym}
 */

var locale = {
  code: 'gu',
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
