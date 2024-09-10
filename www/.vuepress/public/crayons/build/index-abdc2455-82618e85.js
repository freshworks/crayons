import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';
import { i as isSameUTCWeek } from './index-d2a6c100-cfe03ed2.js';
import './_rollupPluginBabelHelpers-ef57da83-15e75548.js';

function declensionGroup(scheme, count) {
  if (count === 1) {
    return scheme.one;
  }

  var rem100 = count % 100; // ends with 11-20

  if (rem100 <= 20 && rem100 > 10) {
    return scheme.other;
  }

  var rem10 = rem100 % 10; // ends with 2, 3, 4

  if (rem10 >= 2 && rem10 <= 4) {
    return scheme.twoFour;
  }

  return scheme.other;
}

function declension(scheme, count, time) {
  time = time || 'regular';
  var group = declensionGroup(scheme, count);
  var finalText = group[time] || group;
  return finalText.replace('{{count}}', count);
}

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: {
      regular: 'mniej niż sekunda',
      past: 'mniej niż sekundę',
      future: 'mniej niż sekundę'
    },
    twoFour: 'mniej niż {{count}} sekundy',
    other: 'mniej niż {{count}} sekund'
  },
  xSeconds: {
    one: {
      regular: 'sekunda',
      past: 'sekundę',
      future: 'sekundę'
    },
    twoFour: '{{count}} sekundy',
    other: '{{count}} sekund'
  },
  halfAMinute: {
    one: 'pół minuty',
    twoFour: 'pół minuty',
    other: 'pół minuty'
  },
  lessThanXMinutes: {
    one: {
      regular: 'mniej niż minuta',
      past: 'mniej niż minutę',
      future: 'mniej niż minutę'
    },
    twoFour: 'mniej niż {{count}} minuty',
    other: 'mniej niż {{count}} minut'
  },
  xMinutes: {
    one: {
      regular: 'minuta',
      past: 'minutę',
      future: 'minutę'
    },
    twoFour: '{{count}} minuty',
    other: '{{count}} minut'
  },
  aboutXHours: {
    one: {
      regular: 'około godziny',
      past: 'około godziny',
      future: 'około godzinę'
    },
    twoFour: 'około {{count}} godziny',
    other: 'około {{count}} godzin'
  },
  xHours: {
    one: {
      regular: 'godzina',
      past: 'godzinę',
      future: 'godzinę'
    },
    twoFour: '{{count}} godziny',
    other: '{{count}} godzin'
  },
  xDays: {
    one: {
      regular: 'dzień',
      past: 'dzień',
      future: '1 dzień'
    },
    twoFour: '{{count}} dni',
    other: '{{count}} dni'
  },
  aboutXWeeks: {
    one: 'około tygodnia',
    twoFour: 'około {{count}} tygodni',
    other: 'około {{count}} tygodni'
  },
  xWeeks: {
    one: 'tydzień',
    twoFour: '{{count}} tygodnie',
    other: '{{count}} tygodni'
  },
  aboutXMonths: {
    one: 'około miesiąc',
    twoFour: 'około {{count}} miesiące',
    other: 'około {{count}} miesięcy'
  },
  xMonths: {
    one: 'miesiąc',
    twoFour: '{{count}} miesiące',
    other: '{{count}} miesięcy'
  },
  aboutXYears: {
    one: 'około rok',
    twoFour: 'około {{count}} lata',
    other: 'około {{count}} lat'
  },
  xYears: {
    one: 'rok',
    twoFour: '{{count}} lata',
    other: '{{count}} lat'
  },
  overXYears: {
    one: 'ponad rok',
    twoFour: 'ponad {{count}} lata',
    other: 'ponad {{count}} lat'
  },
  almostXYears: {
    one: 'prawie rok',
    twoFour: 'prawie {{count}} lata',
    other: 'prawie {{count}} lat'
  }
};
function formatDistance(token, count, options) {
  options = options || {};
  var scheme = formatDistanceLocale[token];

  if (!options.addSuffix) {
    return declension(scheme, count);
  }

  if (options.comparison > 0) {
    return 'za ' + declension(scheme, count, 'future');
  } else {
    return declension(scheme, count, 'past') + ' temu';
  }
}

var dateFormats = {
  full: 'EEEE, do MMMM y',
  "long": 'do MMMM y',
  medium: 'do MMM y',
  "short": 'dd.MM.y'
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

var adjectivesLastWeek = {
  masculine: 'ostatni',
  feminine: 'ostatnia'
};
var adjectivesThisWeek = {
  masculine: 'ten',
  feminine: 'ta'
};
var adjectivesNextWeek = {
  masculine: 'następny',
  feminine: 'następna'
};
var dayGrammaticalGender = {
  0: 'feminine',
  1: 'masculine',
  2: 'masculine',
  3: 'feminine',
  4: 'masculine',
  5: 'masculine',
  6: 'feminine'
};

function getAdjectives(token, date, baseDate, options) {
  if (isSameUTCWeek(date, baseDate, options)) {
    return adjectivesThisWeek;
  } else if (token === 'lastWeek') {
    return adjectivesLastWeek;
  } else if (token === 'nextWeek') {
    return adjectivesNextWeek;
  } else {
    throw new Error("Cannot determine adjectives for token ".concat(token));
  }
}

function getAdjective(token, date, baseDate, options) {
  var day = date.getUTCDay();
  var adjectives = getAdjectives(token, date, baseDate, options);
  var grammaticalGender = dayGrammaticalGender[day];
  return adjectives[grammaticalGender];
}

function dayAndTimeWithAdjective(token, date, baseDate, options) {
  var adjective = getAdjective(token, date, baseDate, options);
  return "'".concat(adjective, "' eeee 'o' p");
}

var formatRelativeLocale = {
  lastWeek: dayAndTimeWithAdjective,
  yesterday: "'wczoraj o' p",
  today: "'dzisiaj o' p",
  tomorrow: "'jutro o' p",
  nextWeek: dayAndTimeWithAdjective,
  other: 'P'
};
function formatRelative(token, date, baseDate, options) {
  var format = formatRelativeLocale[token];

  if (typeof format === 'function') {
    return format(token, date, baseDate, options);
  }

  return format;
}

function ordinalNumber(dirtyNumber) {
  var number = Number(dirtyNumber);
  return String(number);
}

var eraValues = {
  narrow: ['p.n.e.', 'n.e.'],
  abbreviated: ['p.n.e.', 'n.e.'],
  wide: ['przed naszą erą', 'naszej ery']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['I kw.', 'II kw.', 'III kw.', 'IV kw.'],
  wide: ['I kwartał', 'II kwartał', 'III kwartał', 'IV kwartał']
};
var monthValues = {
  narrow: ['S', 'L', 'M', 'K', 'M', 'C', 'L', 'S', 'W', 'P', 'L', 'G'],
  abbreviated: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
  wide: ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień']
};
var monthFormattingValues = {
  narrow: ['s', 'l', 'm', 'k', 'm', 'c', 'l', 's', 'w', 'p', 'l', 'g'],
  abbreviated: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
  wide: ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']
};
var dayValues = {
  narrow: ['N', 'P', 'W', 'Ś', 'C', 'P', 'S'],
  "short": ['nie', 'pon', 'wto', 'śro', 'czw', 'pią', 'sob'],
  abbreviated: ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
  wide: ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota']
};
var dayFormattingValues = {
  narrow: ['n', 'p', 'w', 'ś', 'c', 'p', 's'],
  "short": ['nie', 'pon', 'wto', 'śro', 'czw', 'pią', 'sob'],
  abbreviated: ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
  wide: ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'półn.',
    noon: 'poł',
    morning: 'rano',
    afternoon: 'popoł.',
    evening: 'wiecz.',
    night: 'noc'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'północ',
    noon: 'południe',
    morning: 'rano',
    afternoon: 'popołudnie',
    evening: 'wieczór',
    night: 'noc'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'północ',
    noon: 'południe',
    morning: 'rano',
    afternoon: 'popołudnie',
    evening: 'wieczór',
    night: 'noc'
  }
};
var dayPeriodFormattingValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'o półn.',
    noon: 'w poł.',
    morning: 'rano',
    afternoon: 'po poł.',
    evening: 'wiecz.',
    night: 'w nocy'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'o północy',
    noon: 'w południe',
    morning: 'rano',
    afternoon: 'po południu',
    evening: 'wieczorem',
    night: 'w nocy'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'o północy',
    noon: 'w południe',
    morning: 'rano',
    afternoon: 'po południu',
    evening: 'wieczorem',
    night: 'w nocy'
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
    formattingValues: monthFormattingValues,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: 'wide',
    formattingValues: dayFormattingValues,
    defaultFormattingWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: dayPeriodFormattingValues,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern = /^(\d+)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(p\.?\s*n\.?\s*e\.?\s*|n\.?\s*e\.?\s*)/i,
  abbreviated: /^(p\.?\s*n\.?\s*e\.?\s*|n\.?\s*e\.?\s*)/i,
  wide: /^(przed\s*nasz(ą|a)\s*er(ą|a)|naszej\s*ery)/i
};
var parseEraPatterns = {
  any: [/^p/i, /^n/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^(I|II|III|IV)\s*kw\.?/i,
  wide: /^(I|II|III|IV)\s*kwarta(ł|l)/i
};
var parseQuarterPatterns = {
  narrow: [/1/i, /2/i, /3/i, /4/i],
  any: [/^I kw/i, /^II kw/i, /^III kw/i, /^IV kw/i]
};
var matchMonthPatterns = {
  narrow: /^[slmkcwpg]/i,
  abbreviated: /^(sty|lut|mar|kwi|maj|cze|lip|sie|wrz|pa(ź|z)|lis|gru)/i,
  wide: /^(stycznia|stycze(ń|n)|lutego|luty|marca|marzec|kwietnia|kwiecie(ń|n)|maja|maj|czerwca|czerwiec|lipca|lipiec|sierpnia|sierpie(ń|n)|wrze(ś|s)nia|wrzesie(ń|n)|pa(ź|z)dziernika|pa(ź|z)dziernik|listopada|listopad|grudnia|grudzie(ń|n))/i
};
var parseMonthPatterns = {
  narrow: [/^s/i, /^l/i, /^m/i, /^k/i, /^m/i, /^c/i, /^l/i, /^s/i, /^w/i, /^p/i, /^l/i, /^g/i],
  any: [/^st/i, /^lu/i, /^mar/i, /^k/i, /^maj/i, /^c/i, /^lip/i, /^si/i, /^w/i, /^p/i, /^lis/i, /^g/i]
};
var matchDayPatterns = {
  narrow: /^[npwścs]/i,
  "short": /^(nie|pon|wto|(ś|s)ro|czw|pi(ą|a)|sob)/i,
  abbreviated: /^(niedz|pon|wt|(ś|s)r|czw|pt|sob)\.?/i,
  wide: /^(niedziela|poniedzia(ł|l)ek|wtorek|(ś|s)roda|czwartek|pi(ą|a)tek|sobota)/i
};
var parseDayPatterns = {
  narrow: [/^n/i, /^p/i, /^w/i, /^ś/i, /^c/i, /^p/i, /^s/i],
  abbreviated: [/^n/i, /^po/i, /^w/i, /^(ś|s)r/i, /^c/i, /^pt/i, /^so/i],
  any: [/^n/i, /^po/i, /^w/i, /^(ś|s)r/i, /^c/i, /^pi/i, /^so/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(^a$|^p$|pó(ł|l)n\.?|o\s*pó(ł|l)n\.?|po(ł|l)\.?|w\s*po(ł|l)\.?|po\s*po(ł|l)\.?|rano|wiecz\.?|noc|w\s*nocy)/i,
  any: /^(am|pm|pó(ł|l)noc|o\s*pó(ł|l)nocy|po(ł|l)udnie|w\s*po(ł|l)udnie|popo(ł|l)udnie|po\s*po(ł|l)udniu|rano|wieczór|wieczorem|noc|w\s*nocy)/i
};
var parseDayPeriodPatterns = {
  narrow: {
    am: /^a$/i,
    pm: /^p$/i,
    midnight: /pó(ł|l)n/i,
    noon: /po(ł|l)/i,
    morning: /rano/i,
    afternoon: /po\s*po(ł|l)/i,
    evening: /wiecz/i,
    night: /noc/i
  },
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /pó(ł|l)n/i,
    noon: /po(ł|l)/i,
    morning: /rano/i,
    afternoon: /po\s*po(ł|l)/i,
    evening: /wiecz/i,
    night: /noc/i
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
 * @summary Polish locale.
 * @language Polish
 * @iso-639-2 pol
 * @author Mateusz Derks [@ertrzyiks]{@link https://github.com/ertrzyiks}
 * @author Just RAG [@justrag]{@link https://github.com/justrag}
 * @author Mikolaj Grzyb [@mikolajgrzyb]{@link https://github.com/mikolajgrzyb}
 * @author Mateusz Tokarski [@mutisz]{@link https://github.com/mutisz}
 */

var locale = {
  code: 'pl',
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
