import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: '1 сониядан кам',
    other: '{{count}} сониядан кам'
  },
  xSeconds: {
    one: '1 сония',
    other: '{{count}} сония'
  },
  halfAMinute: 'ярим дақиқа',
  lessThanXMinutes: {
    one: '1 дақиқадан кам',
    other: '{{count}} дақиқадан кам'
  },
  xMinutes: {
    one: '1 дақиқа',
    other: '{{count}} дақиқа'
  },
  aboutXHours: {
    one: 'тахминан 1 соат',
    other: 'тахминан {{count}} соат'
  },
  xHours: {
    one: '1 соат',
    other: '{{count}} соат'
  },
  xDays: {
    one: '1 кун',
    other: '{{count}} кун'
  },
  aboutXWeeks: {
    one: 'тахминан 1 хафта',
    other: 'тахминан {{count}} хафта'
  },
  xWeeks: {
    one: '1 хафта',
    other: '{{count}} хафта'
  },
  aboutXMonths: {
    one: 'тахминан 1 ой',
    other: 'тахминан {{count}} ой'
  },
  xMonths: {
    one: '1 ой',
    other: '{{count}} ой'
  },
  aboutXYears: {
    one: 'тахминан 1 йил',
    other: 'тахминан {{count}} йил'
  },
  xYears: {
    one: '1 йил',
    other: '{{count}} йил'
  },
  overXYears: {
    one: '1 йилдан кўп',
    other: '{{count}} йилдан кўп'
  },
  almostXYears: {
    one: 'деярли 1 йил',
    other: 'деярли {{count}} йил'
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
      return result + 'дан кейин';
    } else {
      return result + ' олдин';
    }
  }

  return result;
}

var dateFormats = {
  full: 'EEEE, do MMMM, y',
  "long": 'do MMMM, y',
  medium: 'd MMM, y',
  "short": 'dd/MM/yyyy'
};
var timeFormats = {
  full: 'H:mm:ss zzzz',
  "long": 'H:mm:ss z',
  medium: 'H:mm:ss',
  "short": 'H:mm'
};
var dateTimeFormats = {
  any: '{{date}}, {{time}}'
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
    defaultWidth: 'any'
  })
};

var formatRelativeLocale = {
  lastWeek: "'ўтган' eeee p 'да'",
  yesterday: "'кеча' p 'да'",
  today: "'бугун' p 'да'",
  tomorrow: "'эртага' p 'да'",
  nextWeek: "eeee p 'да'",
  other: 'P'
};
function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

var eraValues = {
  narrow: ['М.А', 'М'],
  abbreviated: ['М.А', 'М'],
  wide: ['Милоддан Аввалги', 'Милодий']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1-чор.', '2-чор.', '3-чор.', '4-чор.'],
  wide: ['1-чорак', '2-чорак', '3-чорак', '4-чорак']
};
var monthValues = {
  narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'],
  abbreviated: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  wide: ['январ', 'феврал', 'март', 'апрел', 'май', 'июн', 'июл', 'август', 'сентабр', 'октабр', 'ноябр', 'декабр']
};
var dayValues = {
  narrow: ['Я', 'Д', 'С', 'Ч', 'П', 'Ж', 'Ш'],
  "short": ['як', 'ду', 'се', 'чо', 'па', 'жу', 'ша'],
  abbreviated: ['якш', 'душ', 'сеш', 'чор', 'пай', 'жум', 'шан'],
  wide: ['якшанба', 'душанба', 'сешанба', 'чоршанба', 'пайшанба', 'жума', 'шанба']
};
var dayPeriodValues = {
  any: {
    am: 'П.О.',
    pm: 'П.К.',
    midnight: 'ярим тун',
    noon: 'пешин',
    morning: 'эрталаб',
    afternoon: 'пешиндан кейин',
    evening: 'кечаси',
    night: 'тун'
  }
};
var formattingDayPeriodValues = {
  any: {
    am: 'П.О.',
    pm: 'П.К.',
    midnight: 'ярим тун',
    noon: 'пешин',
    morning: 'эрталаб',
    afternoon: 'пешиндан кейин',
    evening: 'кечаси',
    night: 'тун'
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
    defaultWidth: 'any',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'any'
  })
};

var matchOrdinalNumberPattern = /^(\d+)(чи)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(м\.а|м\.)/i,
  abbreviated: /^(м\.а|м\.)/i,
  wide: /^(милоддан аввал|милоддан кейин)/i
};
var parseEraPatterns = {
  any: [/^м/i, /^а/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]-чор./i,
  wide: /^[1234]-чорак/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[яфмамииасонд]/i,
  abbreviated: /^(янв|фев|мар|апр|май|июн|июл|авг|сен|окт|ноя|дек)/i,
  wide: /^(январ|феврал|март|апрел|май|июн|июл|август|сентабр|октабр|ноябр|декабр)/i
};
var parseMonthPatterns = {
  narrow: [/^я/i, /^ф/i, /^м/i, /^а/i, /^м/i, /^и/i, /^и/i, /^а/i, /^с/i, /^о/i, /^н/i, /^д/i],
  any: [/^я/i, /^ф/i, /^мар/i, /^ап/i, /^май/i, /^июн/i, /^июл/i, /^ав/i, /^с/i, /^о/i, /^н/i, /^д/i]
};
var matchDayPatterns = {
  narrow: /^[ядсчпжш]/i,
  "short": /^(як|ду|се|чо|па|жу|ша)/i,
  abbreviated: /^(якш|душ|сеш|чор|пай|жум|шан)/i,
  wide: /^(якшанба|душанба|сешанба|чоршанба|пайшанба|жума|шанба)/i
};
var parseDayPatterns = {
  narrow: [/^я/i, /^д/i, /^с/i, /^ч/i, /^п/i, /^ж/i, /^ш/i],
  any: [/^як/i, /^ду/i, /^се/i, /^чор/i, /^пай/i, /^жу/i, /^шан/i]
};
var matchDayPeriodPatterns = {
  any: /^(п\.о\.|п\.к\.|ярим тун|пешиндан кейин|(эрталаб|пешиндан кейин|кечаси|тун))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^п\.о\./i,
    pm: /^п\.к\./i,
    midnight: /^ярим тун/i,
    noon: /^пешиндан кейин/i,
    morning: /эрталаб/i,
    afternoon: /пешиндан кейин/i,
    evening: /кечаси/i,
    night: /тун/i
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
 * @summary Uzbek Cyrillic locale.
 * @language Uzbek
 * @iso-639-2 uzb
 * @author Kamronbek Shodmonov [@kamronbek28]{@link https://github.com/kamronbek28}
 */

var locale = {
  code: 'uz-Cyrl',
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
