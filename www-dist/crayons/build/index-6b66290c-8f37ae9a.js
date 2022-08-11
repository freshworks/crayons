import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'kurang dari 1 detik',
    other: 'kurang dari {{count}} detik'
  },
  xSeconds: {
    one: '1 detik',
    other: '{{count}} detik'
  },
  halfAMinute: 'setengah menit',
  lessThanXMinutes: {
    one: 'kurang dari 1 menit',
    other: 'kurang dari {{count}} menit'
  },
  xMinutes: {
    one: '1 menit',
    other: '{{count}} menit'
  },
  aboutXHours: {
    one: 'sekitar 1 jam',
    other: 'sekitar {{count}} jam'
  },
  xHours: {
    one: '1 jam',
    other: '{{count}} jam'
  },
  xDays: {
    one: '1 hari',
    other: '{{count}} hari'
  },
  aboutXWeeks: {
    one: 'sekitar 1 minggu',
    other: 'sekitar {{count}} minggu'
  },
  xWeeks: {
    one: '1 minggu',
    other: '{{count}} minggu'
  },
  aboutXMonths: {
    one: 'sekitar 1 bulan',
    other: 'sekitar {{count}} bulan'
  },
  xMonths: {
    one: '1 bulan',
    other: '{{count}} bulan'
  },
  aboutXYears: {
    one: 'sekitar 1 tahun',
    other: 'sekitar {{count}} tahun'
  },
  xYears: {
    one: '1 tahun',
    other: '{{count}} tahun'
  },
  overXYears: {
    one: 'lebih dari 1 tahun',
    other: 'lebih dari {{count}} tahun'
  },
  almostXYears: {
    one: 'hampir 1 tahun',
    other: 'hampir {{count}} tahun'
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
    result = tokenValue.other.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'dalam waktu ' + result;
    } else {
      return result + ' yang lalu';
    }
  }

  return result;
};

var dateFormats = {
  full: 'EEEE, d MMMM yyyy',
  "long": 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  "short": 'd/M/yyyy'
};
var timeFormats = {
  full: 'HH.mm.ss',
  "long": 'HH.mm.ss',
  medium: 'HH.mm',
  "short": 'HH.mm'
};
var dateTimeFormats = {
  full: "{{date}} 'pukul' {{time}}",
  "long": "{{date}} 'pukul' {{time}}",
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
  lastWeek: "eeee 'lalu pukul' p",
  yesterday: "'Kemarin pukul' p",
  today: "'Hari ini pukul' p",
  tomorrow: "'Besok pukul' p",
  nextWeek: "eeee 'pukul' p",
  other: 'P'
};

var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};

// https://www.unicode.org/cldr/charts/32/summary/id.html

var eraValues = {
  narrow: ['SM', 'M'],
  abbreviated: ['SM', 'M'],
  wide: ['Sebelum Masehi', 'Masehi']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['K1', 'K2', 'K3', 'K4'],
  wide: ['Kuartal ke-1', 'Kuartal ke-2', 'Kuartal ke-3', 'Kuartal ke-4']
}; // Note: in Indonesian, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
  wide: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
};
var dayValues = {
  narrow: ['M', 'S', 'S', 'R', 'K', 'J', 'S'],
  "short": ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  abbreviated: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  wide: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
};
var dayPeriodValues = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tengah malam',
    noon: 'tengah hari',
    morning: 'pagi',
    afternoon: 'siang',
    evening: 'sore',
    night: 'malam'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tengah malam',
    noon: 'tengah hari',
    morning: 'pagi',
    afternoon: 'siang',
    evening: 'sore',
    night: 'malam'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tengah malam',
    noon: 'tengah hari',
    morning: 'pagi',
    afternoon: 'siang',
    evening: 'sore',
    night: 'malam'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tengah malam',
    noon: 'tengah hari',
    morning: 'pagi',
    afternoon: 'siang',
    evening: 'sore',
    night: 'malam'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tengah malam',
    noon: 'tengah hari',
    morning: 'pagi',
    afternoon: 'siang',
    evening: 'sore',
    night: 'malam'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tengah malam',
    noon: 'tengah hari',
    morning: 'pagi',
    afternoon: 'siang',
    evening: 'sore',
    night: 'malam'
  }
};

var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
  var number = Number(dirtyNumber); // Can't use "pertama", "kedua" because can't be parsed

  return 'ke-' + number;
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

var matchOrdinalNumberPattern = /^ke-(\d+)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(sm|m)/i,
  abbreviated: /^(s\.?\s?m\.?|s\.?\s?e\.?\s?u\.?|m\.?|e\.?\s?u\.?)/i,
  wide: /^(sebelum masehi|sebelum era umum|masehi|era umum)/i
};
var parseEraPatterns = {
  any: [/^s/i, /^(m|e)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^K-?\s[1234]/i,
  wide: /^Kuartal ke-?\s?[1234]/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|mei|jun|jul|agt|sep|okt|nov|des)/i,
  wide: /^(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^ma/i, /^ap/i, /^me/i, /^jun/i, /^jul/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[srkjm]/i,
  "short": /^(min|sen|sel|rab|kam|jum|sab)/i,
  abbreviated: /^(min|sen|sel|rab|kam|jum|sab)/i,
  wide: /^(minggu|senin|selasa|rabu|kamis|jumat|sabtu)/i
};
var parseDayPatterns = {
  narrow: [/^m/i, /^s/i, /^s/i, /^r/i, /^k/i, /^j/i, /^s/i],
  any: [/^m/i, /^sen/i, /^sel/i, /^r/i, /^k/i, /^j/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|tengah m|tengah h|(di(\swaktu)?) (pagi|siang|sore|malam))/i,
  any: /^([ap]\.?\s?m\.?|tengah malam|tengah hari|(di(\swaktu)?) (pagi|siang|sore|malam))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^pm/i,
    midnight: /^tengah m/i,
    noon: /^tengah h/i,
    morning: /pagi/i,
    afternoon: /siang/i,
    evening: /sore/i,
    night: /malam/i
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
 * @summary Indonesian locale.
 * @language Indonesian
 * @iso-639-2 ind
 * @author Rahmat Budiharso [@rbudiharso]{@link https://github.com/rbudiharso}
 * @author Benget Nata [@bentinata]{@link https://github.com/bentinata}
 * @author Budi Irawan [@deerawan]{@link https://github.com/deerawan}
 * @author Try Ajitiono [@imballinst]{@link https://github.com/imballinst}
 */

var locale = {
  code: 'id',
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
