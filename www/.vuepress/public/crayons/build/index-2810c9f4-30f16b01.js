import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'أقل من ثانية',
    two: 'أقل من زوز ثواني',
    threeToTen: 'أقل من {{count}} ثواني',
    other: 'أقل من {{count}} ثانية'
  },
  xSeconds: {
    one: 'ثانية',
    two: 'زوز ثواني',
    threeToTen: '{{count}} ثواني',
    other: '{{count}} ثانية'
  },
  halfAMinute: 'نص دقيقة',
  lessThanXMinutes: {
    one: 'أقل من دقيقة',
    two: 'أقل من دقيقتين',
    threeToTen: 'أقل من {{count}} دقايق',
    other: 'أقل من {{count}} دقيقة'
  },
  xMinutes: {
    one: 'دقيقة',
    two: 'دقيقتين',
    threeToTen: '{{count}} دقايق',
    other: '{{count}} دقيقة'
  },
  aboutXHours: {
    one: 'ساعة تقريب',
    two: 'ساعتين تقريب',
    threeToTen: '{{count}} سوايع تقريب',
    other: '{{count}} ساعة تقريب'
  },
  xHours: {
    one: 'ساعة',
    two: 'ساعتين',
    threeToTen: '{{count}} سوايع',
    other: '{{count}} ساعة'
  },
  xDays: {
    one: 'نهار',
    two: 'نهارين',
    threeToTen: '{{count}} أيام',
    other: '{{count}} يوم'
  },
  aboutXWeeks: {
    one: 'جمعة تقريب',
    two: 'جمعتين تقريب',
    threeToTen: '{{count}} جماع تقريب',
    other: '{{count}} جمعة تقريب'
  },
  xWeeks: {
    one: 'جمعة',
    two: 'جمعتين',
    threeToTen: '{{count}} جماع',
    other: '{{count}} جمعة'
  },
  aboutXMonths: {
    one: 'شهر تقريب',
    two: 'شهرين تقريب',
    threeToTen: '{{count}} أشهرة تقريب',
    other: '{{count}} شهر تقريب'
  },
  xMonths: {
    one: 'شهر',
    two: 'شهرين',
    threeToTen: '{{count}} أشهرة',
    other: '{{count}} شهر'
  },
  aboutXYears: {
    one: 'عام تقريب',
    two: 'عامين تقريب',
    threeToTen: '{{count}} أعوام تقريب',
    other: '{{count}} عام تقريب'
  },
  xYears: {
    one: 'عام',
    two: 'عامين',
    threeToTen: '{{count}} أعوام',
    other: '{{count}} عام'
  },
  overXYears: {
    one: 'أكثر من عام',
    two: 'أكثر من عامين',
    threeToTen: 'أكثر من {{count}} أعوام',
    other: 'أكثر من {{count}} عام'
  },
  almostXYears: {
    one: 'عام تقريب',
    two: 'عامين تقريب',
    threeToTen: '{{count}} أعوام تقريب',
    other: '{{count}} عام تقريب'
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
      return 'في ' + result;
    } else {
      return 'عندو ' + result;
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
  full: "{{date}} 'مع' {{time}}",
  "long": "{{date}} 'مع' {{time}}",
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
  lastWeek: "eeee 'إلي فات مع' p",
  yesterday: "'البارح مع' p",
  today: "'اليوم مع' p",
  tomorrow: "'غدوة مع' p",
  nextWeek: "eeee 'الجمعة الجاية مع' p 'نهار'",
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
  narrow: ['د', 'ن', 'أ', 'س', 'أ', 'ج', 'ج', 'م', 'أ', 'م', 'ف', 'ج'],
  abbreviated: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  wide: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
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
    pm: 'ع',
    morning: 'الصباح',
    noon: 'القايلة',
    afternoon: 'بعد القايلة',
    evening: 'العشية',
    night: 'الليل',
    midnight: 'نص الليل'
  },
  abbreviated: {
    am: 'ص',
    pm: 'ع',
    morning: 'الصباح',
    noon: 'القايلة',
    afternoon: 'بعد القايلة',
    evening: 'العشية',
    night: 'الليل',
    midnight: 'نص الليل'
  },
  wide: {
    am: 'ص',
    pm: 'ع',
    morning: 'الصباح',
    noon: 'القايلة',
    afternoon: 'بعد القايلة',
    evening: 'العشية',
    night: 'الليل',
    midnight: 'نص الليل'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'ص',
    pm: 'ع',
    morning: 'في الصباح',
    noon: 'في القايلة',
    afternoon: 'بعد القايلة',
    evening: 'في العشية',
    night: 'في الليل',
    midnight: 'نص الليل'
  },
  abbreviated: {
    am: 'ص',
    pm: 'ع',
    morning: 'في الصباح',
    noon: 'في القايلة',
    afternoon: 'بعد القايلة',
    evening: 'في العشية',
    night: 'في الليل',
    midnight: 'نص الليل'
  },
  wide: {
    am: 'ص',
    pm: 'ع',
    morning: 'في الصباح',
    noon: 'في القايلة',
    afternoon: 'بعد القايلة',
    evening: 'في العشية',
    night: 'في الليل',
    midnight: 'نص الليل'
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
  narrow: /^[جفمأسند]/,
  abbreviated: /^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/,
  wide: /^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/
};
var parseMonthPatterns = {
  narrow: [/^ج/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ج/i, /^ج/i, /^أ/i, /^س/i, /^أ/i, /^ن/i, /^د/i],
  any: [/^جانفي/i, /^فيفري/i, /^مارس/i, /^أفريل/i, /^ماي/i, /^جوان/i, /^جويلية/i, /^أوت/i, /^سبتمبر/i, /^أكتوبر/i, /^نوفمبر/i, /^ديسمبر/i]
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
  narrow: /^(ص|ع|ن ل|ل|(في|مع) (صباح|قايلة|عشية|ليل))/,
  any: /^([صع]|نص الليل|قايلة|(في|مع) (صباح|قايلة|عشية|ليل))/
};
var parseDayPeriodPatterns = {
  any: {
    am: /^ص/,
    pm: /^ع/,
    midnight: /نص الليل/,
    noon: /قايلة/,
    afternoon: /بعد القايلة/,
    morning: /صباح/,
    evening: /عشية/,
    night: /ليل/
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
 * @summary Arabic locale (Tunisian Arabic).
 * @language Arabic
 * @iso-639-2 ara
 * @author Koussay Haj Kacem [@essana3]{@link https://github.com/essana3}
 */

var locale = {
  code: 'ar-TN',
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
