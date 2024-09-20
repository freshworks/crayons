import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: {
      standalone: 'мање од 1 секунде',
      withPrepositionAgo: 'мање од 1 секунде',
      withPrepositionIn: 'мање од 1 секунду'
    },
    dual: 'мање од {{count}} секунде',
    other: 'мање од {{count}} секунди'
  },
  xSeconds: {
    one: {
      standalone: '1 секунда',
      withPrepositionAgo: '1 секунде',
      withPrepositionIn: '1 секунду'
    },
    dual: '{{count}} секунде',
    other: '{{count}} секунди'
  },
  halfAMinute: 'пола минуте',
  lessThanXMinutes: {
    one: {
      standalone: 'мање од 1 минуте',
      withPrepositionAgo: 'мање од 1 минуте',
      withPrepositionIn: 'мање од 1 минуту'
    },
    dual: 'мање од {{count}} минуте',
    other: 'мање од {{count}} минута'
  },
  xMinutes: {
    one: {
      standalone: '1 минута',
      withPrepositionAgo: '1 минуте',
      withPrepositionIn: '1 минуту'
    },
    dual: '{{count}} минуте',
    other: '{{count}} минута'
  },
  aboutXHours: {
    one: {
      standalone: 'око 1 сат',
      withPrepositionAgo: 'око 1 сат',
      withPrepositionIn: 'око 1 сат'
    },
    dual: 'око {{count}} сата',
    other: 'око {{count}} сати'
  },
  xHours: {
    one: {
      standalone: '1 сат',
      withPrepositionAgo: '1 сат',
      withPrepositionIn: '1 сат'
    },
    dual: '{{count}} сата',
    other: '{{count}} сати'
  },
  xDays: {
    one: {
      standalone: '1 дан',
      withPrepositionAgo: '1 дан',
      withPrepositionIn: '1 дан'
    },
    dual: '{{count}} дана',
    other: '{{count}} дана'
  },
  aboutXWeeks: {
    one: {
      standalone: 'око 1 недељу',
      withPrepositionAgo: 'око 1 недељу',
      withPrepositionIn: 'око 1 недељу'
    },
    dual: 'око {{count}} недеље',
    other: 'око {{count}} недеље'
  },
  xWeeks: {
    one: {
      standalone: '1 недељу',
      withPrepositionAgo: '1 недељу',
      withPrepositionIn: '1 недељу'
    },
    dual: '{{count}} недеље',
    other: '{{count}} недеље'
  },
  aboutXMonths: {
    one: {
      standalone: 'око 1 месец',
      withPrepositionAgo: 'око 1 месец',
      withPrepositionIn: 'око 1 месец'
    },
    dual: 'око {{count}} месеца',
    other: 'око {{count}} месеци'
  },
  xMonths: {
    one: {
      standalone: '1 месец',
      withPrepositionAgo: '1 месец',
      withPrepositionIn: '1 месец'
    },
    dual: '{{count}} месеца',
    other: '{{count}} месеци'
  },
  aboutXYears: {
    one: {
      standalone: 'око 1 годину',
      withPrepositionAgo: 'око 1 годину',
      withPrepositionIn: 'око 1 годину'
    },
    dual: 'око {{count}} године',
    other: 'око {{count}} година'
  },
  xYears: {
    one: {
      standalone: '1 година',
      withPrepositionAgo: '1 године',
      withPrepositionIn: '1 годину'
    },
    dual: '{{count}} године',
    other: '{{count}} година'
  },
  overXYears: {
    one: {
      standalone: 'преко 1 годину',
      withPrepositionAgo: 'преко 1 годину',
      withPrepositionIn: 'преко 1 годину'
    },
    dual: 'преко {{count}} године',
    other: 'преко {{count}} година'
  },
  almostXYears: {
    one: {
      standalone: 'готово 1 годину',
      withPrepositionAgo: 'готово 1 годину',
      withPrepositionIn: 'готово 1 годину'
    },
    dual: 'готово {{count}} године',
    other: 'готово {{count}} година'
  }
};
function formatDistance(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (count === 1) {
    if (options.addSuffix) {
      if (options.comparison > 0) {
        result = formatDistanceLocale[token].one.withPrepositionIn;
      } else {
        result = formatDistanceLocale[token].one.withPrepositionAgo;
      }
    } else {
      result = formatDistanceLocale[token].one.standalone;
    }
  } else if (count % 10 > 1 && count % 10 < 5 && // if last digit is between 2 and 4
  String(count).substr(-2, 1) !== '1' // unless the 2nd to last digit is "1"
  ) {
    result = formatDistanceLocale[token].dual.replace('{{count}}', count);
  } else {
    result = formatDistanceLocale[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'за ' + result;
    } else {
      return 'пре ' + result;
    }
  }

  return result;
}

var dateFormats = {
  full: 'EEEE, d. MMMM yyyy.',
  "long": 'd. MMMM yyyy.',
  medium: 'd. MMM yy.',
  "short": 'dd. MM. yy.'
};
var timeFormats = {
  full: 'HH:mm:ss (zzzz)',
  "long": 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  "short": 'HH:mm'
};
var dateTimeFormats = {
  full: "{{date}} 'у' {{time}}",
  "long": "{{date}} 'у' {{time}}",
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
  lastWeek: function lastWeek(date) {
    var day = date.getUTCDay();

    switch (day) {
      case 0:
        return "'прошле недеље у' p";

      case 3:
        return "'прошле среде у' p";

      case 6:
        return "'прошле суботе у' p";

      default:
        return "'прошли' EEEE 'у' p";
    }
  },
  yesterday: "'јуче у' p",
  today: "'данас у' p",
  tomorrow: "'сутра у' p",
  nextWeek: function nextWeek(date) {
    var day = date.getUTCDay();

    switch (day) {
      case 0:
        return "'следеће недеље у' p";

      case 3:
        return "'следећу среду у' p";

      case 6:
        return "'следећу суботу у' p";

      default:
        return "'следећи' EEEE 'у' p";
    }
  },
  other: 'P'
};
function formatRelative(token, date, _baseDate, _options) {
  var format = formatRelativeLocale[token];

  if (typeof format === 'function') {
    return format(date);
  }

  return format;
}

function ordinalNumber(dirtyNumber) {
  var number = Number(dirtyNumber);
  return String(number).concat('.');
}

var eraValues = {
  narrow: ['пр.н.е.', 'АД'],
  abbreviated: ['пр. Хр.', 'по. Хр.'],
  wide: ['Пре Христа', 'После Христа']
};
var monthValues = {
  narrow: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
  abbreviated: ['јан', 'феб', 'мар', 'апр', 'мај', 'јун', 'јул', 'авг', 'сеп', 'окт', 'нов', 'дец'],
  wide: ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар']
};
var formattingMonthValues = {
  narrow: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
  abbreviated: ['јан', 'феб', 'мар', 'апр', 'мај', 'јун', 'јул', 'авг', 'сеп', 'окт', 'нов', 'дец'],
  wide: ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар']
};
var quarterValues = {
  narrow: ['1.', '2.', '3.', '4.'],
  abbreviated: ['1. кв.', '2. кв.', '3. кв.', '4. кв.'],
  wide: ['1. квартал', '2. квартал', '3. квартал', '4. квартал']
};
var dayValues = {
  narrow: ['Н', 'П', 'У', 'С', 'Ч', 'П', 'С'],
  "short": ['нед', 'пон', 'уто', 'сре', 'чет', 'пет', 'суб'],
  abbreviated: ['нед', 'пон', 'уто', 'сре', 'чет', 'пет', 'суб'],
  wide: ['недеља', 'понедељак', 'уторак', 'среда', 'четвртак', 'петак', 'субота']
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'АМ',
    pm: 'ПМ',
    midnight: 'поноћ',
    noon: 'подне',
    morning: 'ујутру',
    afternoon: 'поподне',
    evening: 'увече',
    night: 'ноћу'
  },
  abbreviated: {
    am: 'АМ',
    pm: 'ПМ',
    midnight: 'поноћ',
    noon: 'подне',
    morning: 'ујутру',
    afternoon: 'поподне',
    evening: 'увече',
    night: 'ноћу'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'поноћ',
    noon: 'подне',
    morning: 'ујутру',
    afternoon: 'после подне',
    evening: 'увече',
    night: 'ноћу'
  }
};
var dayPeriodValues = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'поноћ',
    noon: 'подне',
    morning: 'ујутру',
    afternoon: 'поподне',
    evening: 'увече',
    night: 'ноћу'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'поноћ',
    noon: 'подне',
    morning: 'ујутру',
    afternoon: 'поподне',
    evening: 'увече',
    night: 'ноћу'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'поноћ',
    noon: 'подне',
    morning: 'ујутру',
    afternoon: 'после подне',
    evening: 'увече',
    night: 'ноћу'
  }
};
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
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues,
    defaultFormattingWidth: 'wide'
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

var matchOrdinalNumberPattern = /^(\d+)\./i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(пр\.н\.е\.|АД)/i,
  abbreviated: /^(пр\.\s?Хр\.|по\.\s?Хр\.)/i,
  wide: /^(Пре Христа|пре нове ере|После Христа|нова ера)/i
};
var parseEraPatterns = {
  any: [/^пр/i, /^(по|нова)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\.\s?кв\.?/i,
  wide: /^[1234]\. квартал/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^(10|11|12|[123456789])\./i,
  abbreviated: /^(јан|феб|мар|апр|мај|јун|јул|авг|сеп|окт|нов|дец)/i,
  wide: /^((јануар|јануара)|(фебруар|фебруара)|(март|марта)|(април|априла)|(мја|маја)|(јун|јуна)|(јул|јула)|(август|августа)|(септембар|септембра)|(октобар|октобра)|(новембар|новембра)|(децембар|децембра))/i
};
var parseMonthPatterns = {
  narrow: [/(10|11|12|[123456789])/i],
  any: [/^ја/i, /^ф/i, /^мар/i, /^ап/i, /^мај/i, /^јун/i, /^јул/i, /^авг/i, /^с/i, /^о/i, /^н/i, /^д/i]
};
var matchDayPatterns = {
  narrow: /^[пусчн]/i,
  "short": /^(нед|пон|уто|сре|чет|пет|суб)/i,
  abbreviated: /^(нед|пон|уто|сре|чет|пет|суб)/i,
  wide: /^(недеља|понедељак|уторак|среда|четвртак|петак|субота)/i
};
var parseDayPatterns = {
  narrow: [/^п/i, /^у/i, /^с/i, /^ч/i, /^н/i],
  any: [/^нед/i, /^пон/i, /^уто/i, /^сре/i, /^чет/i, /^пет/i, /^суб/i]
};
var matchDayPeriodPatterns = {
  any: /^(ам|пм|поноћ|(по)?подне|увече|ноћу|после подне|ујутру)/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^поно/i,
    noon: /^под/i,
    morning: /ујутру/i,
    afternoon: /(после\s|по)+подне/i,
    evening: /(увече)/i,
    night: /(ноћу)/i
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
 * @summary Serbian cyrillic locale.
 * @language Serbian
 * @iso-639-2 srp
 * @author Igor Radivojević [@rogyvoje]{@link https://github.com/rogyvoje}
 */

var locale = {
  code: 'sr',
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
