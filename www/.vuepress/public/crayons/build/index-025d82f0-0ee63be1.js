import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';
import { i as isSameUTCWeek } from './index-d2a6c100-cfe03ed2.js';
import './_rollupPluginBabelHelpers-ef57da83-15e75548.js';

function declension(scheme, count) {
  // scheme for count=1 exists
  if (scheme.one !== undefined && count === 1) {
    return scheme.one;
  }

  var rem10 = count % 10;
  var rem100 = count % 100; // 1, 21, 31, ...

  if (rem10 === 1 && rem100 !== 11) {
    return scheme.singularNominative.replace('{{count}}', count); // 2, 3, 4, 22, 23, 24, 32 ...
  } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 > 20)) {
    return scheme.singularGenitive.replace('{{count}}', count); // 5, 6, 7, 8, 9, 10, 11, ...
  } else {
    return scheme.pluralGenitive.replace('{{count}}', count);
  }
}

function buildLocalizeTokenFn(scheme) {
  return function (count, options) {
    if (options.addSuffix) {
      if (options.comparison > 0) {
        if (scheme.future) {
          return declension(scheme.future, count);
        } else {
          return 'за ' + declension(scheme.regular, count);
        }
      } else {
        if (scheme.past) {
          return declension(scheme.past, count);
        } else {
          return declension(scheme.regular, count) + ' тому';
        }
      }
    } else {
      return declension(scheme.regular, count);
    }
  };
}

var formatDistanceLocale = {
  lessThanXSeconds: buildLocalizeTokenFn({
    regular: {
      one: 'менше секунди',
      singularNominative: 'менше {{count}} секунди',
      singularGenitive: 'менше {{count}} секунд',
      pluralGenitive: 'менше {{count}} секунд'
    },
    future: {
      one: 'менше, ніж за секунду',
      singularNominative: 'менше, ніж за {{count}} секунду',
      singularGenitive: 'менше, ніж за {{count}} секунди',
      pluralGenitive: 'менше, ніж за {{count}} секунд'
    }
  }),
  xSeconds: buildLocalizeTokenFn({
    regular: {
      singularNominative: '{{count}} секунда',
      singularGenitive: '{{count}} секунди',
      pluralGenitive: '{{count}} секунд'
    },
    past: {
      singularNominative: '{{count}} секунду тому',
      singularGenitive: '{{count}} секунди тому',
      pluralGenitive: '{{count}} секунд тому'
    },
    future: {
      singularNominative: 'за {{count}} секунду',
      singularGenitive: 'за {{count}} секунди',
      pluralGenitive: 'за {{count}} секунд'
    }
  }),
  halfAMinute: function halfAMinute(_, options) {
    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'за півхвилини';
      } else {
        return 'півхвилини тому';
      }
    }

    return 'півхвилини';
  },
  lessThanXMinutes: buildLocalizeTokenFn({
    regular: {
      one: 'менше хвилини',
      singularNominative: 'менше {{count}} хвилини',
      singularGenitive: 'менше {{count}} хвилин',
      pluralGenitive: 'менше {{count}} хвилин'
    },
    future: {
      one: 'менше, ніж за хвилину',
      singularNominative: 'менше, ніж за {{count}} хвилину',
      singularGenitive: 'менше, ніж за {{count}} хвилини',
      pluralGenitive: 'менше, ніж за {{count}} хвилин'
    }
  }),
  xMinutes: buildLocalizeTokenFn({
    regular: {
      singularNominative: '{{count}} хвилина',
      singularGenitive: '{{count}} хвилини',
      pluralGenitive: '{{count}} хвилин'
    },
    past: {
      singularNominative: '{{count}} хвилину тому',
      singularGenitive: '{{count}} хвилини тому',
      pluralGenitive: '{{count}} хвилин тому'
    },
    future: {
      singularNominative: 'за {{count}} хвилину',
      singularGenitive: 'за {{count}} хвилини',
      pluralGenitive: 'за {{count}} хвилин'
    }
  }),
  aboutXHours: buildLocalizeTokenFn({
    regular: {
      singularNominative: 'близько {{count}} години',
      singularGenitive: 'близько {{count}} годин',
      pluralGenitive: 'близько {{count}} годин'
    },
    future: {
      singularNominative: 'приблизно за {{count}} годину',
      singularGenitive: 'приблизно за {{count}} години',
      pluralGenitive: 'приблизно за {{count}} годин'
    }
  }),
  xHours: buildLocalizeTokenFn({
    regular: {
      singularNominative: '{{count}} годину',
      singularGenitive: '{{count}} години',
      pluralGenitive: '{{count}} годин'
    }
  }),
  xDays: buildLocalizeTokenFn({
    regular: {
      singularNominative: '{{count}} день',
      singularGenitive: '{{count}} дня',
      pluralGenitive: '{{count}} днів'
    }
  }),
  aboutXWeeks: buildLocalizeTokenFn({
    regular: {
      singularNominative: 'близько {{count}} тижня',
      singularGenitive: 'близько {{count}} тижнів',
      pluralGenitive: 'близько {{count}} тижнів'
    },
    future: {
      singularNominative: 'приблизно за {{count}} тиждень',
      singularGenitive: 'приблизно за {{count}} тижні',
      pluralGenitive: 'приблизно за {{count}} тижні'
    }
  }),
  xWeeks: buildLocalizeTokenFn({
    regular: {
      singularNominative: '{{count}} тиждень',
      singularGenitive: '{{count}} тижня',
      pluralGenitive: '{{count}} тижні'
    }
  }),
  aboutXMonths: buildLocalizeTokenFn({
    regular: {
      singularNominative: 'близько {{count}} місяця',
      singularGenitive: 'близько {{count}} місяців',
      pluralGenitive: 'близько {{count}} місяців'
    },
    future: {
      singularNominative: 'приблизно за {{count}} місяць',
      singularGenitive: 'приблизно за {{count}} місяця',
      pluralGenitive: 'приблизно за {{count}} місяців'
    }
  }),
  xMonths: buildLocalizeTokenFn({
    regular: {
      singularNominative: '{{count}} місяць',
      singularGenitive: '{{count}} місяця',
      pluralGenitive: '{{count}} місяців'
    }
  }),
  aboutXYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: 'близько {{count}} року',
      singularGenitive: 'близько {{count}} років',
      pluralGenitive: 'близько {{count}} років'
    },
    future: {
      singularNominative: 'приблизно за {{count}} рік',
      singularGenitive: 'приблизно за {{count}} роки',
      pluralGenitive: 'приблизно за {{count}} років'
    }
  }),
  xYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: '{{count}} рік',
      singularGenitive: '{{count}} роки',
      pluralGenitive: '{{count}} років'
    }
  }),
  overXYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: 'більше {{count}} року',
      singularGenitive: 'більше {{count}} років',
      pluralGenitive: 'більше {{count}} років'
    },
    future: {
      singularNominative: 'більше, ніж за {{count}} рік',
      singularGenitive: 'більше, ніж за {{count}} роки',
      pluralGenitive: 'більше, ніж за {{count}} років'
    }
  }),
  almostXYears: buildLocalizeTokenFn({
    regular: {
      singularNominative: 'майже {{count}} рік',
      singularGenitive: 'майже {{count}} роки',
      pluralGenitive: 'майже {{count}} років'
    },
    future: {
      singularNominative: 'майже за {{count}} рік',
      singularGenitive: 'майже за {{count}} роки',
      pluralGenitive: 'майже за {{count}} років'
    }
  })
};
function formatDistance(token, count, options) {
  options = options || {};
  return formatDistanceLocale[token](count, options);
}

var dateFormats = {
  full: "EEEE, do MMMM y 'р.'",
  "long": "do MMMM y 'р.'",
  medium: "d MMM y 'р.'",
  "short": 'dd.MM.y'
};
var timeFormats = {
  full: 'H:mm:ss zzzz',
  "long": 'H:mm:ss z',
  medium: 'H:mm:ss',
  "short": 'H:mm'
};
var dateTimeFormats = {
  full: "{{date}} 'о' {{time}}",
  "long": "{{date}} 'о' {{time}}",
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

var accusativeWeekdays = ['неділю', 'понеділок', 'вівторок', 'середу', 'четвер', 'п’ятницю', 'суботу'];

function _lastWeek(day) {
  var weekday = accusativeWeekdays[day];

  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у минулу " + weekday + " о' p";

    case 1:
    case 2:
    case 4:
      return "'у минулий " + weekday + " о' p";
  }
}

function thisWeek(day) {
  var weekday = accusativeWeekdays[day];
  return "'у " + weekday + " о' p";
}

function _nextWeek(day) {
  var weekday = accusativeWeekdays[day];

  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у наступну " + weekday + " о' p";

    case 1:
    case 2:
    case 4:
      return "'у наступний " + weekday + " о' p";
  }
}

var formatRelativeLocale = {
  lastWeek: function lastWeek(date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek(day);
    } else {
      return _lastWeek(day);
    }
  },
  yesterday: "'вчора о' p",
  today: "'сьогодні о' p",
  tomorrow: "'завтра о' p",
  nextWeek: function nextWeek(date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek(day);
    } else {
      return _nextWeek(day);
    }
  },
  other: 'P'
};
function formatRelative(token, date, baseDate, options) {
  var format = formatRelativeLocale[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
}

var eraValues = {
  narrow: ['до н.е.', 'н.е.'],
  abbreviated: ['до н. е.', 'н. е.'],
  wide: ['до нашої ери', 'нашої ери']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1-й кв.', '2-й кв.', '3-й кв.', '4-й кв.'],
  wide: ['1-й квартал', '2-й квартал', '3-й квартал', '4-й квартал']
};
var monthValues = {
  // ДСТУ 3582:2013
  narrow: ['С', 'Л', 'Б', 'К', 'Т', 'Ч', 'Л', 'С', 'В', 'Ж', 'Л', 'Г'],
  abbreviated: ['січ.', 'лют.', 'берез.', 'квіт.', 'трав.', 'черв.', 'лип.', 'серп.', 'верес.', 'жовт.', 'листоп.', 'груд.'],
  wide: ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень']
};
var formattingMonthValues = {
  narrow: ['С', 'Л', 'Б', 'К', 'Т', 'Ч', 'Л', 'С', 'В', 'Ж', 'Л', 'Г'],
  abbreviated: ['січ.', 'лют.', 'берез.', 'квіт.', 'трав.', 'черв.', 'лип.', 'серп.', 'верес.', 'жовт.', 'листоп.', 'груд.'],
  wide: ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня']
};
var dayValues = {
  narrow: ['Н', 'П', 'В', 'С', 'Ч', 'П', 'С'],
  "short": ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  abbreviated: ['нед', 'пон', 'вів', 'сер', 'чтв', 'птн', 'суб'],
  wide: ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п’ятниця', 'субота']
};
var dayPeriodValues = {
  narrow: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'півн.',
    noon: 'пол.',
    morning: 'ранок',
    afternoon: 'день',
    evening: 'веч.',
    night: 'ніч'
  },
  abbreviated: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'півн.',
    noon: 'пол.',
    morning: 'ранок',
    afternoon: 'день',
    evening: 'веч.',
    night: 'ніч'
  },
  wide: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'північ',
    noon: 'полудень',
    morning: 'ранок',
    afternoon: 'день',
    evening: 'вечір',
    night: 'ніч'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'півн.',
    noon: 'пол.',
    morning: 'ранку',
    afternoon: 'дня',
    evening: 'веч.',
    night: 'ночі'
  },
  abbreviated: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'півн.',
    noon: 'пол.',
    morning: 'ранку',
    afternoon: 'дня',
    evening: 'веч.',
    night: 'ночі'
  },
  wide: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'північ',
    noon: 'полудень',
    morning: 'ранку',
    afternoon: 'дня',
    evening: 'веч.',
    night: 'ночі'
  }
};

function ordinalNumber(dirtyNumber, dirtyOptions) {
  var options = dirtyOptions || {};
  var unit = String(options.unit);
  var suffix;

  if (unit === 'date') {
    if (dirtyNumber === 3 || dirtyNumber === 23) {
      suffix = '-є';
    } else {
      suffix = '-е';
    }
  } else if (unit === 'minute' || unit === 'second' || unit === 'hour') {
    suffix = '-а';
  } else {
    suffix = '-й';
  }

  return dirtyNumber + suffix;
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
    defaultWidth: 'any',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern = /^(\d+)(-?(е|й|є|а|я))?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^((до )?н\.?\s?е\.?)/i,
  abbreviated: /^((до )?н\.?\s?е\.?)/i,
  wide: /^(до нашої ери|нашої ери|наша ера)/i
};
var parseEraPatterns = {
  any: [/^д/i, /^н/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[иі]?й?)? кв.?/i,
  wide: /^[1234](-?[иі]?й?)? квартал/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[слбктчвжг]/i,
  abbreviated: /^(січ|лют|бер|берез|кві|трав?|чер|лип|сер|вер|жов|лис(топ)?|груд)\.?/i,
  wide: /^(січень|січня|лютий|лютого|березень|березня|квітень|квітня|травень|травня|липень|липня|серпень|серпня|вересень|вересня|жовтень|жовтня|листопада?|грудень|грудня)/i
};
var parseMonthPatterns = {
  narrow: [/^с/i, /^л/i, /^б/i, /^к/i, /^т/i, /^ч/i, /^л/i, /^с/i, /^в/i, /^ж/i, /^л/i, /^г/i],
  any: [/^сі/i, /^лю/i, /^б/i, /^к/i, /^т/i, /^ч/i, /^лип/i, /^се/i, /^в/i, /^ж/i, /^лис/i, /^г/i]
};
var matchDayPatterns = {
  narrow: /^[нпвсч]/i,
  "short": /^(нд|пн|вт|ср|чт|пт|сб)\.?/i,
  abbreviated: /^(нед|пон|вів|сер|че?тв|птн?|суб)\.?/i,
  wide: /^(неділ[яі]|понеділ[ок][ка]|вівтор[ок][ка]|серед[аи]|четвер(га)?|п\W*?ятниц[яі]|субот[аи])/i
};
var parseDayPatterns = {
  narrow: [/^н/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^н/i, /^п[он]/i, /^в/i, /^с[ер]/i, /^ч/i, /^п\W*?[ят]/i, /^с[уб]/i]
};
var matchDayPeriodPatterns = {
  narrow: /^([дп]п|півн\.?|пол\.?|ранок|ранку|день|дня|веч\.?|ніч|ночі)/i,
  abbreviated: /^([дп]п|півн\.?|пол\.?|ранок|ранку|день|дня|веч\.?|ніч|ночі)/i,
  wide: /^([дп]п|північ|полудень|ранок|ранку|день|дня|вечір|вечора|ніч|ночі)/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^дп/i,
    pm: /^пп/i,
    midnight: /^півн/i,
    noon: /^пол/i,
    morning: /^р/i,
    afternoon: /^д[ен]/i,
    evening: /^в/i,
    night: /^н/i
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
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Ukrainian locale.
 * @language Ukrainian
 * @iso-639-2 ukr
 * @author Andrii Korzh [@korzhyk]{@link https://github.com/korzhyk}
 * @author Andriy Shcherbyak [@shcherbyakdev]{@link https://github.com/shcherbyakdev}
 */

var locale = {
  code: 'uk',
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
