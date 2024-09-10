import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var translations = {
  about: 'körülbelül',
  over: 'több mint',
  almost: 'majdnem',
  lessthan: 'kevesebb mint'
};
var withoutSuffixes = {
  xseconds: ' másodperc',
  halfaminute: 'fél perc',
  xminutes: ' perc',
  xhours: ' óra',
  xdays: ' nap',
  xweeks: ' hét',
  xmonths: ' hónap',
  xyears: ' év'
};
var withSuffixes = {
  xseconds: {
    '-1': ' másodperccel ezelőtt',
    '1': ' másodperc múlva',
    '0': ' másodperce'
  },
  halfaminute: {
    '-1': 'fél perccel ezelőtt',
    '1': 'fél perc múlva',
    '0': 'fél perce'
  },
  xminutes: {
    '-1': ' perccel ezelőtt',
    '1': ' perc múlva',
    '0': ' perce'
  },
  xhours: {
    '-1': ' órával ezelőtt',
    '1': ' óra múlva',
    '0': ' órája'
  },
  xdays: {
    '-1': ' nappal ezelőtt',
    '1': ' nap múlva',
    '0': ' napja'
  },
  xweeks: {
    '-1': ' héttel ezelőtt',
    '1': ' hét múlva',
    '0': ' hete'
  },
  xmonths: {
    '-1': ' hónappal ezelőtt',
    '1': ' hónap múlva',
    '0': ' hónapja'
  },
  xyears: {
    '-1': ' évvel ezelőtt',
    '1': ' év múlva',
    '0': ' éve'
  }
};

function translate(number, addSuffix, key, comparison) {
  var translated = addSuffix ? withSuffixes[key][comparison] : withoutSuffixes[key];

  if (key === 'halfaminute') {
    return translated;
  }

  return number + translated;
}

function formatDistance(token, count, options) {
  options = options || {};
  var adverb = token.match(/about|over|almost|lessthan/i);
  var unit = token.replace(adverb, '');
  var result;
  result = translate(count, options.addSuffix, unit.toLowerCase(), options.comparison);

  if (adverb) {
    result = translations[adverb[0].toLowerCase()] + ' ' + result;
  }

  return result;
}

var dateFormats = {
  full: 'y. MMMM d., EEEE',
  "long": 'y. MMMM d.',
  medium: 'y. MMM d.',
  "short": 'y. MM. dd.'
};
var timeFormats = {
  full: 'H:mm:ss zzzz',
  "long": 'H:mm:ss z',
  medium: 'H:mm:ss',
  "short": 'H:mm'
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

var accusativeWeekdays = ['vasárnap', 'hétfőn', 'kedden', 'szerdán', 'csütörtökön', 'pénteken', 'szombaton'];

function week(isFuture) {
  return function (date, _baseDate, _options) {
    var day = date.getUTCDay();
    return (isFuture ? '' : "'múlt' ") + "'" + accusativeWeekdays[day] + "'" + " p'-kor'";
  };
}

var formatRelativeLocale = {
  lastWeek: week(false),
  yesterday: "'tegnap' p'-kor'",
  today: "'ma' p'-kor'",
  tomorrow: "'holnap' p'-kor'",
  nextWeek: week(true),
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
  narrow: ['ie.', 'isz.'],
  abbreviated: ['i. e.', 'i. sz.'],
  wide: ['Krisztus előtt', 'időszámításunk szerint']
};
var quarterValues = {
  narrow: ['1.', '2.', '3.', '4.'],
  abbreviated: ['1. n.év', '2. n.év', '3. n.év', '4. n.év'],
  wide: ['1. negyedév', '2. negyedév', '3. negyedév', '4. negyedév']
};
var formattingQuarterValues = {
  narrow: ['I.', 'II.', 'III.', 'IV.'],
  abbreviated: ['I. n.év', 'II. n.év', 'III. n.év', 'IV. n.év'],
  wide: ['I. negyedév', 'II. negyedév', 'III. negyedév', 'IV. negyedév']
};
var monthValues = {
  narrow: ['J', 'F', 'M', 'Á', 'M', 'J', 'J', 'A', 'Sz', 'O', 'N', 'D'],
  abbreviated: ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'],
  wide: ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december']
};
var dayValues = {
  narrow: ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz'],
  "short": ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
  abbreviated: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
  wide: ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat']
};
var dayPeriodValues = {
  narrow: {
    am: 'de.',
    pm: 'du.',
    midnight: 'éjfél',
    noon: 'dél',
    morning: 'reggel',
    afternoon: 'du.',
    evening: 'este',
    night: 'éjjel'
  },
  abbreviated: {
    am: 'de.',
    pm: 'du.',
    midnight: 'éjfél',
    noon: 'dél',
    morning: 'reggel',
    afternoon: 'du.',
    evening: 'este',
    night: 'éjjel'
  },
  wide: {
    am: 'de.',
    pm: 'du.',
    midnight: 'éjfél',
    noon: 'dél',
    morning: 'reggel',
    afternoon: 'délután',
    evening: 'este',
    night: 'éjjel'
  }
};

function ordinalNumber(dirtyNumber, _dirtyOptions) {
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
    formattingValues: formattingQuarterValues,
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
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern = /^(\d+)\.?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(ie\.|isz\.)/i,
  abbreviated: /^(i\.\s?e\.?|b?\s?c\s?e|i\.\s?sz\.?)/i,
  wide: /^(Krisztus előtt|időszámításunk előtt|időszámításunk szerint|i\. sz\.)/i
};
var parseEraPatterns = {
  narrow: [/ie/i, /isz/i],
  abbreviated: [/^(i\.?\s?e\.?|b\s?ce)/i, /^(i\.?\s?sz\.?|c\s?e)/i],
  any: [/előtt/i, /(szerint|i. sz.)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]\.?/i,
  abbreviated: /^[1234]?\.?\s?n\.év/i,
  wide: /^([1234]|I|II|III|IV)?\.?\s?negyedév/i
};
var parseQuarterPatterns = {
  any: [/1|I$/i, /2|II$/i, /3|III/i, /4|IV/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmaásond]|sz/i,
  abbreviated: /^(jan\.?|febr\.?|márc\.?|ápr\.?|máj\.?|jún\.?|júl\.?|aug\.?|szept\.?|okt\.?|nov\.?|dec\.?)/i,
  wide: /^(január|február|március|április|május|június|július|augusztus|szeptember|október|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a|á/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s|sz/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^már/i, /^áp/i, /^máj/i, /^jún/i, /^júl/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^([vhkpc]|sz|cs|sz)/i,
  "short": /^([vhkp]|sze|cs|szo)/i,
  abbreviated: /^([vhkp]|sze|cs|szo)/i,
  wide: /^(vasárnap|hétfő|kedd|szerda|csütörtök|péntek|szombat)/i
};
var parseDayPatterns = {
  narrow: [/^v/i, /^h/i, /^k/i, /^sz/i, /^c/i, /^p/i, /^sz/i],
  any: [/^v/i, /^h/i, /^k/i, /^sze/i, /^c/i, /^p/i, /^szo/i]
};
var matchDayPeriodPatterns = {
  any: /^((de|du)\.?|éjfél|délután|dél|reggel|este|éjjel)/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^de\.?/i,
    pm: /^du\.?/i,
    midnight: /^éjf/i,
    noon: /^dé/i,
    morning: /reg/i,
    afternoon: /^délu\.?/i,
    evening: /es/i,
    night: /éjj/i
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
 *
 * @summary Hungarian locale.
 * @language Hungarian
 *
 * @iso-639-2 hun
 *
 * @author Pavlo Shpak [@pshpak]{@link https://github.com/pshpak}
 * @author Eduardo Pardo [@eduardopsll]{@link https://github.com/eduardopsll}
 * @author Zoltan Szepesi [@twodcube]{@link https://github.com/twodcube}
 */

var locale = {
  code: 'hu',
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
