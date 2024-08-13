import { a as buildLocalizeFn, b as buildFormatLongFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var numberValues = {
  locale: {
    '1': '१',
    '2': '२',
    '3': '३',
    '4': '४',
    '5': '५',
    '6': '६',
    '7': '७',
    '8': '८',
    '9': '९',
    '0': '०'
  },
  number: {
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
    '०': '0'
  }
}; // CLDR #1585 - #1592

var eraValues = {
  narrow: ['ईसा-पूर्व', 'ईस्वी'],
  abbreviated: ['ईसा-पूर्व', 'ईस्वी'],
  wide: ['ईसा-पूर्व', 'ईसवी सन']
}; // CLDR #1593 - #1616

var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['ति1', 'ति2', 'ति3', 'ति4'],
  wide: ['पहली तिमाही', 'दूसरी तिमाही', 'तीसरी तिमाही', 'चौथी तिमाही']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
// https://www.unicode.org/cldr/charts/32/summary/hi.html
// CLDR #1617 - #1688

var monthValues = {
  narrow: ['ज', 'फ़', 'मा', 'अ', 'मई', 'जू', 'जु', 'अग', 'सि', 'अक्टू', 'न', 'दि'],
  abbreviated: ['जन', 'फ़र', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्टू', 'नव', 'दिस'],
  wide: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']
}; // CLDR #1689 - #1744

var dayValues = {
  narrow: ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'],
  "short": ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'],
  abbreviated: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
  wide: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार']
};
var dayPeriodValues = {
  narrow: {
    am: 'पूर्वाह्न',
    pm: 'अपराह्न',
    midnight: 'मध्यरात्रि',
    noon: 'दोपहर',
    morning: 'सुबह',
    afternoon: 'दोपहर',
    evening: 'शाम',
    night: 'रात'
  },
  abbreviated: {
    am: 'पूर्वाह्न',
    pm: 'अपराह्न',
    midnight: 'मध्यरात्रि',
    noon: 'दोपहर',
    morning: 'सुबह',
    afternoon: 'दोपहर',
    evening: 'शाम',
    night: 'रात'
  },
  wide: {
    am: 'पूर्वाह्न',
    pm: 'अपराह्न',
    midnight: 'मध्यरात्रि',
    noon: 'दोपहर',
    morning: 'सुबह',
    afternoon: 'दोपहर',
    evening: 'शाम',
    night: 'रात'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'पूर्वाह्न',
    pm: 'अपराह्न',
    midnight: 'मध्यरात्रि',
    noon: 'दोपहर',
    morning: 'सुबह',
    afternoon: 'दोपहर',
    evening: 'शाम',
    night: 'रात'
  },
  abbreviated: {
    am: 'पूर्वाह्न',
    pm: 'अपराह्न',
    midnight: 'मध्यरात्रि',
    noon: 'दोपहर',
    morning: 'सुबह',
    afternoon: 'दोपहर',
    evening: 'शाम',
    night: 'रात'
  },
  wide: {
    am: 'पूर्वाह्न',
    pm: 'अपराह्न',
    midnight: 'मध्यरात्रि',
    noon: 'दोपहर',
    morning: 'सुबह',
    afternoon: 'दोपहर',
    evening: 'शाम',
    night: 'रात'
  }
};

var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return numberToLocale(number);
};

function localeToNumber(locale) {
  var enNumber = locale.toString().replace(/[१२३४५६७८९०]/g, function (match) {
    return numberValues.number[match];
  });
  return Number(enNumber);
}
function numberToLocale(enNumber) {
  return enNumber.toString().replace(/\d/g, function (match) {
    return numberValues.locale[match];
  });
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
      return quarter - 1;
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

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: '१ सेकंड से कम',
    // CLDR #1310
    other: '{{count}} सेकंड से कम'
  },
  xSeconds: {
    one: '१ सेकंड',
    other: '{{count}} सेकंड'
  },
  halfAMinute: 'आधा मिनट',
  lessThanXMinutes: {
    one: '१ मिनट से कम',
    other: '{{count}} मिनट से कम'
  },
  xMinutes: {
    one: '१ मिनट',
    // CLDR #1307
    other: '{{count}} मिनट'
  },
  aboutXHours: {
    one: 'लगभग १ घंटा',
    other: 'लगभग {{count}} घंटे'
  },
  xHours: {
    one: '१ घंटा',
    // CLDR #1304
    other: '{{count}} घंटे' // CLDR #4467

  },
  xDays: {
    one: '१ दिन',
    // CLDR #1286
    other: '{{count}} दिन'
  },
  aboutXWeeks: {
    one: 'लगभग १ सप्ताह',
    other: 'लगभग {{count}} सप्ताह'
  },
  xWeeks: {
    one: '१ सप्ताह',
    other: '{{count}} सप्ताह'
  },
  aboutXMonths: {
    one: 'लगभग १ महीना',
    other: 'लगभग {{count}} महीने'
  },
  xMonths: {
    one: '१ महीना',
    other: '{{count}} महीने'
  },
  aboutXYears: {
    one: 'लगभग १ वर्ष',
    other: 'लगभग {{count}} वर्ष' // CLDR #4823

  },
  xYears: {
    one: '१ वर्ष',
    other: '{{count}} वर्ष'
  },
  overXYears: {
    one: '१ वर्ष से अधिक',
    other: '{{count}} वर्ष से अधिक'
  },
  almostXYears: {
    one: 'लगभग १ वर्ष',
    other: 'लगभग {{count}} वर्ष'
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
    result = tokenValue.other.replace('{{count}}', numberToLocale(count));
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + 'मे ';
    } else {
      return result + ' पहले';
    }
  }

  return result;
};

var dateFormats = {
  full: 'EEEE, do MMMM, y',
  // CLDR #1787
  "long": 'do MMMM, y',
  // CLDR #1788
  medium: 'd MMM, y',
  // CLDR #1789
  "short": 'dd/MM/yyyy' // CLDR #1790

};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  // CLDR #1791
  "long": 'h:mm:ss a z',
  // CLDR #1792
  medium: 'h:mm:ss a',
  // CLDR #1793
  "short": 'h:mm a' // CLDR #1794

};
var dateTimeFormats = {
  full: "{{date}} 'को' {{time}}",
  // CLDR #1795
  "long": "{{date}} 'को' {{time}}",
  // CLDR #1796
  medium: '{{date}}, {{time}}',
  // CLDR #1797
  "short": '{{date}}, {{time}}' // CLDR #1798

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
  lastWeek: "'पिछले' eeee p",
  yesterday: "'कल' p",
  today: "'आज' p",
  tomorrow: "'कल' p",
  nextWeek: "eeee 'को' p",
  other: 'P'
};

var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};

var matchOrdinalNumberPattern = /^[०१२३४५६७८९]+/i;
var parseOrdinalNumberPattern = /^[०१२३४५६७८९]+/i;
var matchEraPatterns = {
  narrow: /^(ईसा-पूर्व|ईस्वी)/i,
  abbreviated: /^(ईसा\.?\s?पूर्व\.?|ईसा\.?)/i,
  wide: /^(ईसा-पूर्व|ईसवी पूर्व|ईसवी सन|ईसवी)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^ति[1234]/i,
  wide: /^[1234](पहली|दूसरी|तीसरी|चौथी)? तिमाही/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  // eslint-disable-next-line no-misleading-character-class
  narrow: /^[जफ़माअप्मईजूनजुअगसिअक्तनदि]/i,
  abbreviated: /^(जन|फ़र|मार्च|अप्|मई|जून|जुल|अग|सित|अक्तू|नव|दिस)/i,
  wide: /^(जनवरी|फ़रवरी|मार्च|अप्रैल|मई|जून|जुलाई|अगस्त|सितंबर|अक्तूबर|नवंबर|दिसंबर)/i
};
var parseMonthPatterns = {
  narrow: [/^ज/i, /^फ़/i, /^मा/i, /^अप्/i, /^मई/i, /^जू/i, /^जु/i, /^अग/i, /^सि/i, /^अक्तू/i, /^न/i, /^दि/i],
  any: [/^जन/i, /^फ़/i, /^मा/i, /^अप्/i, /^मई/i, /^जू/i, /^जु/i, /^अग/i, /^सि/i, /^अक्तू/i, /^नव/i, /^दिस/i]
};
var matchDayPatterns = {
  // eslint-disable-next-line no-misleading-character-class
  narrow: /^[रविसोममंगलबुधगुरुशुक्रशनि]/i,
  "short": /^(रवि|सोम|मंगल|बुध|गुरु|शुक्र|शनि)/i,
  abbreviated: /^(रवि|सोम|मंगल|बुध|गुरु|शुक्र|शनि)/i,
  wide: /^(रविवार|सोमवार|मंगलवार|बुधवार|गुरुवार|शुक्रवार|शनिवार)/i
};
var parseDayPatterns = {
  narrow: [/^रवि/i, /^सोम/i, /^मंगल/i, /^बुध/i, /^गुरु/i, /^शुक्र/i, /^शनि/i],
  any: [/^रवि/i, /^सोम/i, /^मंगल/i, /^बुध/i, /^गुरु/i, /^शुक्र/i, /^शनि/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(पू|अ|म|द.\?|सु|दो|शा|रा)/i,
  any: /^(पूर्वाह्न|अपराह्न|म|द.\?|सु|दो|शा|रा)/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^पूर्वाह्न/i,
    pm: /^अपराह्न/i,
    midnight: /^मध्य/i,
    noon: /^दो/i,
    morning: /सु/i,
    afternoon: /दो/i,
    evening: /शा/i,
    night: /रा/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: localeToNumber
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
 * @summary Hindi locale (India).
 * @language Hindi
 * @iso-639-2 hin
 * @author Mukesh Mandiwal [@mukeshmandiwal]{@link https://github.com/mukeshmandiwal}
 */

var locale = {
  code: 'hi',
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

export default locale;
