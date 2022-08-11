import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
  lessThanXSeconds: {
    past: '{{count}} წამზე ნაკლები ხნის წინ',
    present: '{{count}} წამზე ნაკლები',
    future: '{{count}} წამზე ნაკლებში'
  },
  xSeconds: {
    past: '{{count}} წამის წინ',
    present: '{{count}} წამი',
    future: '{{count}} წამში'
  },
  halfAMinute: {
    past: 'ნახევარი წუთის წინ',
    present: 'ნახევარი წუთი',
    future: 'ნახევარი წუთში'
  },
  lessThanXMinutes: {
    past: '{{count}} წუთზე ნაკლები ხნის წინ',
    present: '{{count}} წუთზე ნაკლები',
    future: '{{count}} წუთზე ნაკლებში'
  },
  xMinutes: {
    past: '{{count}} წუთის წინ',
    present: '{{count}} წუთი',
    future: '{{count}} წუთში'
  },
  aboutXHours: {
    past: 'დაახლოებით {{count}} საათის წინ',
    present: 'დაახლოებით {{count}} საათი',
    future: 'დაახლოებით {{count}} საათში'
  },
  xHours: {
    past: '{{count}} საათის წინ',
    present: '{{count}} საათი',
    future: '{{count}} საათში'
  },
  xDays: {
    past: '{{count}} დღის წინ',
    present: '{{count}} დღე',
    future: '{{count}} დღეში'
  },
  aboutXWeeks: {
    past: 'დაახლოებით {{count}} კვირას წინ',
    present: 'დაახლოებით {{count}} კვირა',
    future: 'დაახლოებით {{count}} კვირაში'
  },
  xWeeks: {
    past: '{{count}} კვირას კვირა',
    present: '{{count}} კვირა',
    future: '{{count}} კვირაში'
  },
  aboutXMonths: {
    past: 'დაახლოებით {{count}} თვის წინ',
    present: 'დაახლოებით {{count}} თვე',
    future: 'დაახლოებით {{count}} თვეში'
  },
  xMonths: {
    past: '{{count}} თვის წინ',
    present: '{{count}} თვე',
    future: '{{count}} თვეში'
  },
  aboutXYears: {
    past: 'დაახლოებით {{count}} წლის წინ',
    present: 'დაახლოებით {{count}} წელი',
    future: 'დაახლოებით {{count}} წელში'
  },
  xYears: {
    past: '{{count}} წლის წინ',
    present: '{{count}} წელი',
    future: '{{count}} წელში'
  },
  overXYears: {
    past: '{{count}} წელზე მეტი ხნის წინ',
    present: '{{count}} წელზე მეტი',
    future: '{{count}} წელზე მეტი ხნის შემდეგ'
  },
  almostXYears: {
    past: 'თითქმის {{count}} წლის წინ',
    present: 'თითქმის {{count}} წელი',
    future: 'თითქმის {{count}} წელში'
  }
};
function formatDistance(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (options.addSuffix && options.comparison > 0) {
    result = formatDistanceLocale[token].future.replace('{{count}}', count);
  } else if (options.addSuffix && options.comparison <= 0) {
    result = formatDistanceLocale[token].past.replace('{{count}}', count);
  } else {
    result = formatDistanceLocale[token].present.replace('{{count}}', count);
  }

  return result;
}

var dateFormats = {
  full: 'EEEE, do MMMM, y',
  "long": 'do, MMMM, y',
  medium: 'd, MMM, y',
  "short": 'dd/MM/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  "long": 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  "short": 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} {{time}}'-ზე'",
  "long": "{{date}} {{time}}'-ზე'",
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
  lastWeek: "'წინა' eeee p'-ზე'",
  yesterday: "'გუშინ' p'-ზე'",
  today: "'დღეს' p'-ზე'",
  tomorrow: "'ხვალ' p'-ზე'",
  nextWeek: "'შემდეგი' eeee p'-ზე'",
  other: 'P'
};
function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

var eraValues = {
  narrow: ['ჩ.წ-მდე', 'ჩ.წ'],
  abbreviated: ['ჩვ.წ-მდე', 'ჩვ.წ'],
  wide: ['ჩვენს წელთაღრიცხვამდე', 'ჩვენი წელთაღრიცხვით']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1-ლი კვ', '2-ე კვ', '3-ე კვ', '4-ე კვ'],
  wide: ['1-ლი კვარტალი', '2-ე კვარტალი', '3-ე კვარტალი', '4-ე კვარტალი']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues = {
  narrow: ['ია', 'თე', 'მა', 'აპ', 'მს', 'ვნ', 'ვლ', 'აგ', 'სე', 'ოქ', 'ნო', 'დე'],
  abbreviated: ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
  wide: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი']
};
var dayValues = {
  narrow: ['კვ', 'ორ', 'სა', 'ოთ', 'ხუ', 'პა', 'შა'],
  "short": ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
  abbreviated: ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
  wide: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'შუაღამე',
    noon: 'შუადღე',
    morning: 'დილა',
    afternoon: 'საღამო',
    evening: 'საღამო',
    night: 'ღამე'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'შუაღამე',
    noon: 'შუადღე',
    morning: 'დილა',
    afternoon: 'საღამო',
    evening: 'საღამო',
    night: 'ღამე'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'შუაღამე',
    noon: 'შუადღე',
    morning: 'დილა',
    afternoon: 'საღამო',
    evening: 'საღამო',
    night: 'ღამე'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'შუაღამით',
    noon: 'შუადღისას',
    morning: 'დილით',
    afternoon: 'ნაშუადღევს',
    evening: 'საღამოს',
    night: 'ღამით'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'შუაღამით',
    noon: 'შუადღისას',
    morning: 'დილით',
    afternoon: 'ნაშუადღევს',
    evening: 'საღამოს',
    night: 'ღამით'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'შუაღამით',
    noon: 'შუადღისას',
    morning: 'დილით',
    afternoon: 'ნაშუადღევს',
    evening: 'საღამოს',
    night: 'ღამით'
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

  if (number === 1) {
    return number + '-ლი';
  }

  return number + '-ე';
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

var matchOrdinalNumberPattern = /^(\d+)(-ლი|-ე)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(ჩვ?\.წ)/i,
  abbreviated: /^(ჩვ?\.წ)/i,
  wide: /^(ჩვენს წელთაღრიცხვამდე|ქრისტეშობამდე|ჩვენი წელთაღრიცხვით|ქრისტეშობიდან)/i
};
var parseEraPatterns = {
  any: [/^(ჩვენს წელთაღრიცხვამდე|ქრისტეშობამდე)/i, /^(ჩვენი წელთაღრიცხვით|ქრისტეშობიდან)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]-(ლი|ე)? კვ/i,
  wide: /^[1234]-(ლი|ე)? კვარტალი/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  any: /^(ია|თე|მა|აპ|მს|ვნ|ვლ|აგ|სე|ოქ|ნო|დე)/i
};
var parseMonthPatterns = {
  any: [/^ია/i, /^თ/i, /^მარ/i, /^აპ/i, /^მაი/i, /^ი?ვნ/i, /^ი?ვლ/i, /^აგ/i, /^ს/i, /^ო/i, /^ნ/i, /^დ/i]
};
var matchDayPatterns = {
  narrow: /^(კვ|ორ|სა|ოთ|ხუ|პა|შა)/i,
  "short": /^(კვი|ორშ|სამ|ოთხ|ხუთ|პარ|შაბ)/i,
  "long": /^(კვირა|ორშაბათი|სამშაბათი|ოთხშაბათი|ხუთშაბათი|პარასკევი|შაბათი)/i
};
var parseDayPatterns = {
  any: [/^კვ/i, /^ორ/i, /^სა/i, /^ოთ/i, /^ხუ/i, /^პა/i, /^შა/i]
};
var matchDayPeriodPatterns = {
  any: /^([ap]\.?\s?m\.?|შუაღ|დილ)/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^შუაღ/i,
    noon: /^შუადღ/i,
    morning: /^დილ/i,
    afternoon: /ნაშუადღევს/i,
    evening: /საღამო/i,
    night: /ღამ/i
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
 * @summary Georgian locale.
 * @language Georgian
 * @iso-639-2 geo
 * @author Lado Lomidze [@Landish]{@link https://github.com/Landish}
 * @author Nick Shvelidze [@shvelo]{@link https://github.com/shvelo}
 */

var locale = {
  code: 'ka',
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
