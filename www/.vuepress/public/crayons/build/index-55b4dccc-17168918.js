import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'أقل من ثانية',
    two: 'أقل من ثانيتين',
    threeToTen: 'أقل من {{count}} ثواني',
    other: 'أقل من {{count}} ثانية'
  },
  xSeconds: {
    one: 'ثانية واحدة',
    two: 'ثانيتان',
    threeToTen: '{{count}} ثواني',
    other: '{{count}} ثانية'
  },
  halfAMinute: 'نصف دقيقة',
  lessThanXMinutes: {
    one: 'أقل من دقيقة',
    two: 'أقل من دقيقتين',
    threeToTen: 'أقل من {{count}} دقائق',
    other: 'أقل من {{count}} دقيقة'
  },
  xMinutes: {
    one: 'دقيقة واحدة',
    two: 'دقيقتان',
    threeToTen: '{{count}} دقائق',
    other: '{{count}} دقيقة'
  },
  aboutXHours: {
    one: 'ساعة واحدة تقريباً',
    two: 'ساعتين تقريبا',
    threeToTen: '{{count}} ساعات تقريباً',
    other: '{{count}} ساعة تقريباً'
  },
  xHours: {
    one: 'ساعة واحدة',
    two: 'ساعتان',
    threeToTen: '{{count}} ساعات',
    other: '{{count}} ساعة'
  },
  xDays: {
    one: 'يوم واحد',
    two: 'يومان',
    threeToTen: '{{count}} أيام',
    other: '{{count}} يوم'
  },
  aboutXWeeks: {
    one: 'أسبوع واحد تقريبا',
    two: 'أسبوعين تقريبا',
    threeToTen: '{{count}} أسابيع تقريبا',
    other: '{{count}} أسبوعا تقريبا'
  },
  xWeeks: {
    one: 'أسبوع واحد',
    two: 'أسبوعان',
    threeToTen: '{{count}} أسابيع',
    other: '{{count}} أسبوعا'
  },
  aboutXMonths: {
    one: 'شهر واحد تقريباً',
    two: 'شهرين تقريبا',
    threeToTen: '{{count}} أشهر تقريبا',
    other: '{{count}} شهرا تقريباً'
  },
  xMonths: {
    one: 'شهر واحد',
    two: 'شهران',
    threeToTen: '{{count}} أشهر',
    other: '{{count}} شهرا'
  },
  aboutXYears: {
    one: 'سنة واحدة تقريباً',
    two: 'سنتين تقريبا',
    threeToTen: '{{count}} سنوات تقريباً',
    other: '{{count}} سنة تقريباً'
  },
  xYears: {
    one: 'سنة واحد',
    two: 'سنتان',
    threeToTen: '{{count}} سنوات',
    other: '{{count}} سنة'
  },
  overXYears: {
    one: 'أكثر من سنة',
    two: 'أكثر من سنتين',
    threeToTen: 'أكثر من {{count}} سنوات',
    other: 'أكثر من {{count}} سنة'
  },
  almostXYears: {
    one: 'ما يقارب سنة واحدة',
    two: 'ما يقارب سنتين',
    threeToTen: 'ما يقارب {{count}} سنوات',
    other: 'ما يقارب {{count}} سنة'
  }
};

var formatDistance = function formatDistance(token, count, options) {
  var usageGroup = formatDistanceLocale[token];
  var result;

  if (typeof usageGroup === 'string') {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else if (count === 2) {
    result = usageGroup.two;
  } else if (count <= 10) {
    result = usageGroup.threeToTen.replace('{{count}}', String(count));
  } else {
    result = usageGroup.other.replace('{{count}}', String(count));
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'خلال ' + result;
    } else {
      return 'منذ ' + result;
    }
  }

  return result;
};

var dateFormats = {
  full: 'EEEE، do MMMM y',
  "long": 'do MMMM y',
  medium: 'd MMM y',
  "short": 'dd/MM/yyyy'
};
var timeFormats = {
  full: 'HH:mm:ss',
  "long": 'HH:mm:ss',
  medium: 'HH:mm:ss',
  "short": 'HH:mm'
};
var dateTimeFormats = {
  full: "{{date}} 'عند الساعة' {{time}}",
  "long": "{{date}} 'عند الساعة' {{time}}",
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
  lastWeek: "eeee 'الماضي عند الساعة' p",
  yesterday: "'الأمس عند الساعة' p",
  today: "'اليوم عند الساعة' p",
  tomorrow: "'غدا عند الساعة' p",
  nextWeek: "eeee 'القادم عند الساعة' p",
  other: 'P'
};

var formatRelative = function formatRelative(token) {
  return formatRelativeLocale[token];
};

var eraValues = {
  narrow: ['ق', 'ب'],
  abbreviated: ['ق.م.', 'ب.م.'],
  wide: ['قبل الميلاد', 'بعد الميلاد']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['ر1', 'ر2', 'ر3', 'ر4'],
  wide: ['الربع الأول', 'الربع الثاني', 'الربع الثالث', 'الربع الرابع']
};
var monthValues = {
  narrow: ['ي', 'ف', 'م', 'أ', 'م', 'ي', 'ي', 'أ', 'س', 'أ', 'ن', 'د'],
  abbreviated: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  wide: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
};
var dayValues = {
  narrow: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  "short": ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  abbreviated: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  wide: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
};
var dayPeriodValues = {
  narrow: {
    am: 'ص',
    pm: 'م',
    morning: 'الصباح',
    noon: 'الظهر',
    afternoon: 'بعد الظهر',
    evening: 'المساء',
    night: 'الليل',
    midnight: 'منتصف الليل'
  },
  abbreviated: {
    am: 'ص',
    pm: 'م',
    morning: 'الصباح',
    noon: 'الظهر',
    afternoon: 'بعد الظهر',
    evening: 'المساء',
    night: 'الليل',
    midnight: 'منتصف الليل'
  },
  wide: {
    am: 'ص',
    pm: 'م',
    morning: 'الصباح',
    noon: 'الظهر',
    afternoon: 'بعد الظهر',
    evening: 'المساء',
    night: 'الليل',
    midnight: 'منتصف الليل'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'ص',
    pm: 'م',
    morning: 'في الصباح',
    noon: 'الظهر',
    afternoon: 'بعد الظهر',
    evening: 'في المساء',
    night: 'في الليل',
    midnight: 'منتصف الليل'
  },
  abbreviated: {
    am: 'ص',
    pm: 'م',
    morning: 'في الصباح',
    noon: 'الظهر',
    afternoon: 'بعد الظهر',
    evening: 'في المساء',
    night: 'في الليل',
    midnight: 'منتصف الليل'
  },
  wide: {
    am: 'ص',
    pm: 'م',
    morning: 'في الصباح',
    noon: 'الظهر',
    afternoon: 'بعد الظهر',
    evening: 'في المساء',
    night: 'في الليل',
    midnight: 'منتصف الليل'
  }
};

var ordinalNumber = function ordinalNumber(num) {
  return String(num);
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

var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /[قب]/,
  abbreviated: /[قب]\.م\./,
  wide: /(قبل|بعد) الميلاد/
};
var parseEraPatterns = {
  any: [/قبل/, /بعد/]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /ر[1234]/,
  wide: /الربع (الأول|الثاني|الثالث|الرابع)/
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[أيفمسند]/,
  abbreviated: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/,
  wide: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/
};
var parseMonthPatterns = {
  narrow: [/^ي/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ي/i, /^ي/i, /^أ/i, /^س/i, /^أ/i, /^ن/i, /^د/i],
  any: [/^يناير/i, /^فبراير/i, /^مارس/i, /^أبريل/i, /^مايو/i, /^يونيو/i, /^يوليو/i, /^أغسطس/i, /^سبتمبر/i, /^أكتوبر/i, /^نوفمبر/i, /^ديسمبر/i]
};
var matchDayPatterns = {
  narrow: /^[حنثرخجس]/i,
  "short": /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
};
var parseDayPatterns = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
  wide: [/^الأحد/i, /^الاثنين/i, /^الثلاثاء/i, /^الأربعاء/i, /^الخميس/i, /^الجمعة/i, /^السبت/i],
  any: [/^أح/i, /^اث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(ص|م|منتصف الليل|الظهر|بعد الظهر|في الصباح|في المساء|في الليل)/,
  any: /^(ص|م|منتصف الليل|الظهر|بعد الظهر|في الصباح|في المساء|في الليل)/
};
var parseDayPeriodPatterns = {
  any: {
    am: /^ص/,
    pm: /^م/,
    midnight: /منتصف الليل/,
    noon: /الظهر/,
    afternoon: /بعد الظهر/,
    morning: /في الصباح/,
    evening: /في المساء/,
    night: /في الليل/
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
 * @summary Arabic locale (Modern Standard Arabic - Al-fussha).
 * @language Modern Standard Arabic
 * @iso-639-2 ara
 * @author Abdallah Hassan [@AbdallahAHO]{@link https://github.com/AbdallahAHO}
 * @author Koussay Haj Kacem [@essana3]{@link https://github.com/essana3}
 */

var locale = {
  code: 'ar',
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 6
    /* Saturday */
    ,
    firstWeekContainsDate: 1
  }
};

export default locale;
