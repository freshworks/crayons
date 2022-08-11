import { r as registerInstance, h as createEvent, i as h, j as getElement } from './index-44c267ce.js';
import { l as buildFormatLongFn, m as buildLocalizeFn, n as buildMatchPatternFn, o as buildMatchFn, r as requiredArgs, q as startOfUTCWeek, t as toDate, u as formatDistance$1g, v as formatRelative$1g, w as localize$1g, x as match$1f, f as format, p as parse, y as locale$1p, z as addMinutes } from './index-0ccdf715.js';
import { r as renderHiddenField } from './index-a4741a9c.js';

var formatDistanceLocale$1d = {
  lessThanXSeconds: {
    one: "minder as 'n sekonde",
    other: 'minder as {{count}} sekondes'
  },
  xSeconds: {
    one: '1 sekonde',
    other: '{{count}} sekondes'
  },
  halfAMinute: "'n halwe minuut",
  lessThanXMinutes: {
    one: "minder as 'n minuut",
    other: 'minder as {{count}} minute'
  },
  xMinutes: {
    one: "'n minuut",
    other: '{{count}} minute'
  },
  aboutXHours: {
    one: 'ongeveer 1 uur',
    other: 'ongeveer {{count}} ure'
  },
  xHours: {
    one: '1 uur',
    other: '{{count}} ure'
  },
  xDays: {
    one: '1 dag',
    other: '{{count}} dae'
  },
  aboutXWeeks: {
    one: 'ongeveer 1 week',
    other: 'ongeveer {{count}} weke'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weke'
  },
  aboutXMonths: {
    one: 'ongeveer 1 maand',
    other: 'ongeveer {{count}} maande'
  },
  xMonths: {
    one: '1 maand',
    other: '{{count}} maande'
  },
  aboutXYears: {
    one: 'ongeveer 1 jaar',
    other: 'ongeveer {{count}} jaar'
  },
  xYears: {
    one: '1 jaar',
    other: '{{count}} jaar'
  },
  overXYears: {
    one: 'meer as 1 jaar',
    other: 'meer as {{count}} jaar'
  },
  almostXYears: {
    one: 'byna 1 jaar',
    other: 'byna {{count}} jaar'
  }
};

var formatDistance$1f = function (token, count) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var usageGroup = formatDistanceLocale$1d[token];
  var result;

  if (typeof usageGroup === 'string') {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else {
    result = usageGroup.other.replace('{{count}}', String(count));
  }

  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'oor ' + result;
    } else {
      return result + ' gelede';
    }
  }

  return result;
};

var dateFormats$1m = {
  full: 'EEEE, d MMMM yyyy',
  long: 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  short: 'yyyy/MM/dd'
};
var timeFormats$1m = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$1m = {
  full: "{{date}} 'om' {{time}}",
  long: "{{date}} 'om' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$1m = {
  date: buildFormatLongFn({
    formats: dateFormats$1m,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1m,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1m,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$1f = {
  lastWeek: "'verlede' eeee 'om' p",
  yesterday: "'gister om' p",
  today: "'vandag om' p",
  tomorrow: "'môre om' p",
  nextWeek: "eeee 'om' p",
  other: 'P'
};

var formatRelative$1f = function (token) {
  return formatRelativeLocale$1f[token];
};

var eraValues$1f = {
  narrow: ['vC', 'nC'],
  abbreviated: ['vC', 'nC'],
  wide: ['voor Christus', 'na Christus']
};
var quarterValues$1f = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['K1', 'K2', 'K3', 'K4'],
  wide: ['1ste kwartaal', '2de kwartaal', '3de kwartaal', '4de kwartaal']
};
var monthValues$1f = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
  wide: ['Januarie', 'Februarie', 'Maart', 'April', 'Mei', 'Junie', 'Julie', 'Augustus', 'September', 'Oktober', 'November', 'Desember']
};
var dayValues$1f = {
  narrow: ['S', 'M', 'D', 'W', 'D', 'V', 'S'],
  short: ['So', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Sa'],
  abbreviated: ['Son', 'Maa', 'Din', 'Woe', 'Don', 'Vry', 'Sat'],
  wide: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag']
};
var dayPeriodValues$1e = {
  narrow: {
    am: 'vm',
    pm: 'nm',
    midnight: 'middernag',
    noon: 'middaguur',
    morning: 'oggend',
    afternoon: 'middag',
    evening: 'laat middag',
    night: 'aand'
  },
  abbreviated: {
    am: 'vm',
    pm: 'nm',
    midnight: 'middernag',
    noon: 'middaguur',
    morning: 'oggend',
    afternoon: 'middag',
    evening: 'laat middag',
    night: 'aand'
  },
  wide: {
    am: 'vm',
    pm: 'nm',
    midnight: 'middernag',
    noon: 'middaguur',
    morning: 'oggend',
    afternoon: 'middag',
    evening: 'laat middag',
    night: 'aand'
  }
};
var formattingDayPeriodValues$$ = {
  narrow: {
    am: 'vm',
    pm: 'nm',
    midnight: 'middernag',
    noon: 'uur die middag',
    morning: 'uur die oggend',
    afternoon: 'uur die middag',
    evening: 'uur die aand',
    night: 'uur die aand'
  },
  abbreviated: {
    am: 'vm',
    pm: 'nm',
    midnight: 'middernag',
    noon: 'uur die middag',
    morning: 'uur die oggend',
    afternoon: 'uur die middag',
    evening: 'uur die aand',
    night: 'uur die aand'
  },
  wide: {
    am: 'vm',
    pm: 'nm',
    midnight: 'middernag',
    noon: 'uur die middag',
    morning: 'uur die oggend',
    afternoon: 'uur die middag',
    evening: 'uur die aand',
    night: 'uur die aand'
  }
};

var ordinalNumber$1f = function (dirtyNumber) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;

  if (rem100 < 20) {
    switch (rem100) {
      case 1:
      case 8:
        return number + 'ste';

      default:
        return number + 'de';
    }
  }

  return number + 'ste';
};

var localize$1f = {
  ordinalNumber: ordinalNumber$1f,
  era: buildLocalizeFn({
    values: eraValues$1f,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$1f,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$1f,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$1f,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$1e,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$$,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$1e = /^(\d+)(ste|de)?/i;
var parseOrdinalNumberPattern$1e = /\d+/i;
var matchEraPatterns$1e = {
  narrow: /^([vn]\.? ?C\.?)/,
  abbreviated: /^([vn]\. ?C\.?)/,
  wide: /^((voor|na) Christus)/
};
var parseEraPatterns$1e = {
  any: [/^v/, /^n/]
};
var matchQuarterPatterns$1e = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^[1234](st|d)e kwartaal/i
};
var parseQuarterPatterns$1e = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$1e = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(Jan|Feb|Mrt|Apr|Mei|Jun|Jul|Aug|Sep|Okt|Nov|Dec)\.?/i,
  wide: /^(Januarie|Februarie|Maart|April|Mei|Junie|Julie|Augustus|September|Oktober|November|Desember)/i
};
var parseMonthPatterns$1e = {
  narrow: [/^J/i, /^F/i, /^M/i, /^A/i, /^M/i, /^J/i, /^J/i, /^A/i, /^S/i, /^O/i, /^N/i, /^D/i],
  any: [/^Jan/i, /^Feb/i, /^Mrt/i, /^Apr/i, /^Mei/i, /^Jun/i, /^Jul/i, /^Aug/i, /^Sep/i, /^Okt/i, /^Nov/i, /^Dec/i]
};
var matchDayPatterns$1e = {
  narrow: /^[smdwv]/i,
  short: /^(So|Ma|Di|Wo|Do|Vr|Sa)/i,
  abbreviated: /^(Son|Maa|Din|Woe|Don|Vry|Sat)/i,
  wide: /^(Sondag|Maandag|Dinsdag|Woensdag|Donderdag|Vrydag|Saterdag)/i
};
var parseDayPatterns$1e = {
  narrow: [/^S/i, /^M/i, /^D/i, /^W/i, /^D/i, /^V/i, /^S/i],
  any: [/^So/i, /^Ma/i, /^Di/i, /^Wo/i, /^Do/i, /^Vr/i, /^Sa/i]
};
var matchDayPeriodPatterns$1e = {
  any: /^(vm|nm|middernag|(?:uur )?die (oggend|middag|aand))/i
};
var parseDayPeriodPatterns$1e = {
  any: {
    am: /^vm/i,
    pm: /^nm/i,
    midnight: /^middernag/i,
    noon: /^middaguur/i,
    morning: /oggend/i,
    afternoon: /middag/i,
    evening: /laat middag/i,
    night: /aand/i
  }
};
var match$1e = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$1e,
    parsePattern: parseOrdinalNumberPattern$1e,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$1e,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$1e,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$1e,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$1e,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return Number(index) + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$1e,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$1e,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$1e,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$1e,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$1e,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$1e,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Afrikaans locale.
 * @language Afrikaans
 * @iso-639-2 afr
 * @author Marnus Weststrate [@marnusw]{@link https://github.com/marnusw}
 */

var locale$1o = {
  code: 'af',
  formatDistance: formatDistance$1f,
  formatLong: formatLong$1m,
  formatRelative: formatRelative$1f,
  localize: localize$1f,
  match: match$1e,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$1c = {
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

var formatDistance$1e = function (token, count, options) {
  var usageGroup = formatDistanceLocale$1c[token];
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

var dateFormats$1l = {
  full: 'EEEE، do MMMM y',
  long: 'do MMMM y',
  medium: 'd MMM y',
  short: 'dd/MM/yyyy'
};
var timeFormats$1l = {
  full: 'HH:mm:ss',
  long: 'HH:mm:ss',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$1l = {
  full: "{{date}} 'عند الساعة' {{time}}",
  long: "{{date}} 'عند الساعة' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$1l = {
  date: buildFormatLongFn({
    formats: dateFormats$1l,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1l,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1l,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$1e = {
  lastWeek: "eeee 'الماضي عند الساعة' p",
  yesterday: "'الأمس عند الساعة' p",
  today: "'اليوم عند الساعة' p",
  tomorrow: "'غدا عند الساعة' p",
  nextWeek: "eeee 'القادم عند الساعة' p",
  other: 'P'
};

var formatRelative$1e = function (token) {
  return formatRelativeLocale$1e[token];
};

var eraValues$1e = {
  narrow: ['ق', 'ب'],
  abbreviated: ['ق.م.', 'ب.م.'],
  wide: ['قبل الميلاد', 'بعد الميلاد']
};
var quarterValues$1e = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['ر1', 'ر2', 'ر3', 'ر4'],
  wide: ['الربع الأول', 'الربع الثاني', 'الربع الثالث', 'الربع الرابع']
};
var monthValues$1e = {
  narrow: ['ي', 'ف', 'م', 'أ', 'م', 'ي', 'ي', 'أ', 'س', 'أ', 'ن', 'د'],
  abbreviated: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  wide: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
};
var dayValues$1e = {
  narrow: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  short: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  abbreviated: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  wide: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
};
var dayPeriodValues$1d = {
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
var formattingDayPeriodValues$_ = {
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

var ordinalNumber$1e = function (num) {
  return String(num);
};

var localize$1e = {
  ordinalNumber: ordinalNumber$1e,
  era: buildLocalizeFn({
    values: eraValues$1e,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$1e,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$1e,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$1e,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$1d,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$_,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$1d = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern$1d = /\d+/i;
var matchEraPatterns$1d = {
  narrow: /[قب]/,
  abbreviated: /[قب]\.م\./,
  wide: /(قبل|بعد) الميلاد/
};
var parseEraPatterns$1d = {
  any: [/قبل/, /بعد/]
};
var matchQuarterPatterns$1d = {
  narrow: /^[1234]/i,
  abbreviated: /ر[1234]/,
  wide: /الربع (الأول|الثاني|الثالث|الرابع)/
};
var parseQuarterPatterns$1d = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$1d = {
  narrow: /^[أيفمسند]/,
  abbreviated: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/,
  wide: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/
};
var parseMonthPatterns$1d = {
  narrow: [/^ي/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ي/i, /^ي/i, /^أ/i, /^س/i, /^أ/i, /^ن/i, /^د/i],
  any: [/^يناير/i, /^فبراير/i, /^مارس/i, /^أبريل/i, /^مايو/i, /^يونيو/i, /^يوليو/i, /^أغسطس/i, /^سبتمبر/i, /^أكتوبر/i, /^نوفمبر/i, /^ديسمبر/i]
};
var matchDayPatterns$1d = {
  narrow: /^[حنثرخجس]/i,
  short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
};
var parseDayPatterns$1d = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
  wide: [/^الأحد/i, /^الاثنين/i, /^الثلاثاء/i, /^الأربعاء/i, /^الخميس/i, /^الجمعة/i, /^السبت/i],
  any: [/^أح/i, /^اث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
};
var matchDayPeriodPatterns$1d = {
  narrow: /^(ص|م|منتصف الليل|الظهر|بعد الظهر|في الصباح|في المساء|في الليل)/,
  any: /^(ص|م|منتصف الليل|الظهر|بعد الظهر|في الصباح|في المساء|في الليل)/
};
var parseDayPeriodPatterns$1d = {
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
var match$1d = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$1d,
    parsePattern: parseOrdinalNumberPattern$1d,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$1d,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$1d,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$1d,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$1d,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$1d,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$1d,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$1d,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$1d,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$1d,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$1d,
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
var locale$1n = {
  code: 'ar',
  formatDistance: formatDistance$1e,
  formatLong: formatLong$1l,
  formatRelative: formatRelative$1e,
  localize: localize$1e,
  match: match$1d,
  options: {
    weekStartsOn: 6
    /* Saturday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$1b = {
  lessThanXSeconds: {
    one: 'أقل من ثانية واحدة',
    two: 'أقل من ثانتين',
    threeToTen: 'أقل من {{count}} ثواني',
    other: 'أقل من {{count}} ثانية'
  },
  xSeconds: {
    one: 'ثانية واحدة',
    two: 'ثانتين',
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
    two: 'دقيقتين',
    threeToTen: '{{count}} دقائق',
    other: '{{count}} دقيقة'
  },
  aboutXHours: {
    one: 'ساعة واحدة تقريباً',
    two: 'ساعتين تقريباً',
    threeToTen: '{{count}} ساعات تقريباً',
    other: '{{count}} ساعة تقريباً'
  },
  xHours: {
    one: 'ساعة واحدة',
    two: 'ساعتين',
    threeToTen: '{{count}} ساعات',
    other: '{{count}} ساعة'
  },
  xDays: {
    one: 'يوم واحد',
    two: 'يومين',
    threeToTen: '{{count}} أيام',
    other: '{{count}} يوم'
  },
  aboutXWeeks: {
    one: 'أسبوع واحد تقريباً',
    two: 'أسبوعين تقريباً',
    threeToTen: '{{count}} أسابيع تقريباً',
    other: '{{count}} أسبوع تقريباً'
  },
  xWeeks: {
    one: 'أسبوع واحد',
    two: 'أسبوعين',
    threeToTen: '{{count}} أسابيع',
    other: '{{count}} أسبوع'
  },
  aboutXMonths: {
    one: 'شهر واحد تقريباً',
    two: 'شهرين تقريباً',
    threeToTen: '{{count}} أشهر تقريباً',
    other: '{{count}} شهر تقريباً'
  },
  xMonths: {
    one: 'شهر واحد',
    two: 'شهرين',
    threeToTen: '{{count}} أشهر',
    other: '{{count}} شهر'
  },
  aboutXYears: {
    one: 'عام واحد تقريباً',
    two: 'عامين تقريباً',
    threeToTen: '{{count}} أعوام تقريباً',
    other: '{{count}} عام تقريباً'
  },
  xYears: {
    one: 'عام واحد',
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
    one: 'عام واحد تقريباً',
    two: 'عامين تقريباً',
    threeToTen: '{{count}} أعوام تقريباً',
    other: '{{count}} عام تقريباً'
  }
};

var formatDistance$1d = function (token, count, options) {
  options = options || {};
  var usageGroup = formatDistanceLocale$1b[token];
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

  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'في خلال ' + result;
    } else {
      return 'منذ ' + result;
    }
  }

  return result;
};

var dateFormats$1k = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats$1k = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$1k = {
  full: "{{date}} 'عند' {{time}}",
  long: "{{date}} 'عند' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$1k = {
  date: buildFormatLongFn({
    formats: dateFormats$1k,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1k,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1k,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$1d = {
  lastWeek: "'أخر' eeee 'عند' p",
  yesterday: "'أمس عند' p",
  today: "'اليوم عند' p",
  tomorrow: "'غداً عند' p",
  nextWeek: "eeee 'عند' p",
  other: 'P'
};

var formatRelative$1d = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$1d[token];
};

var eraValues$1d = {
  narrow: ['ق', 'ب'],
  abbreviated: ['ق.م.', 'ب.م.'],
  wide: ['قبل الميلاد', 'بعد الميلاد']
};
var quarterValues$1d = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['ر1', 'ر2', 'ر3', 'ر4'],
  wide: ['الربع الأول', 'الربع الثاني', 'الربع الثالث', 'الربع الرابع']
};
var monthValues$1d = {
  narrow: ['ج', 'ف', 'م', 'أ', 'م', 'ج', 'ج', 'أ', 'س', 'أ', 'ن', 'د'],
  abbreviated: ['جانـ', 'فيفـ', 'مارس', 'أفريل', 'مايـ', 'جوانـ', 'جويـ', 'أوت', 'سبتـ', 'أكتـ', 'نوفـ', 'ديسـ'],
  wide: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
};
var dayValues$1d = {
  narrow: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  short: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  abbreviated: ['أحد', 'اثنـ', 'ثلا', 'أربـ', 'خميـ', 'جمعة', 'سبت'],
  wide: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
};
var dayPeriodValues$1c = {
  narrow: {
    am: 'ص',
    pm: 'م',
    midnight: 'ن',
    noon: 'ظ',
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءاً',
    night: 'ليلاً'
  },
  abbreviated: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهر',
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءاً',
    night: 'ليلاً'
  },
  wide: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهر',
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءاً',
    night: 'ليلاً'
  }
};
var formattingDayPeriodValues$Z = {
  narrow: {
    am: 'ص',
    pm: 'م',
    midnight: 'ن',
    noon: 'ظ',
    morning: 'في الصباح',
    afternoon: 'بعد الظـهر',
    evening: 'في المساء',
    night: 'في الليل'
  },
  abbreviated: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهر',
    morning: 'في الصباح',
    afternoon: 'بعد الظهر',
    evening: 'في المساء',
    night: 'في الليل'
  },
  wide: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهر',
    morning: 'صباحاً',
    afternoon: 'بعد الظـهر',
    evening: 'في المساء',
    night: 'في الليل'
  }
};

var ordinalNumber$1d = function (dirtyNumber) {
  return String(dirtyNumber);
};

var localize$1d = {
  ordinalNumber: ordinalNumber$1d,
  era: buildLocalizeFn({
    values: eraValues$1d,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$1d,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$1d,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$1d,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$1c,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$Z,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$1c = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern$1c = /\d+/i;
var matchEraPatterns$1c = {
  narrow: /^(ق|ب)/i,
  abbreviated: /^(ق\.?\s?م\.?|ق\.?\s?م\.?\s?|a\.?\s?d\.?|c\.?\s?)/i,
  wide: /^(قبل الميلاد|قبل الميلاد|بعد الميلاد|بعد الميلاد)/i
};
var parseEraPatterns$1c = {
  any: [/^قبل/i, /^بعد/i]
};
var matchQuarterPatterns$1c = {
  narrow: /^[1234]/i,
  abbreviated: /^ر[1234]/i,
  wide: /^الربع [1234]/i
};
var parseQuarterPatterns$1c = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$1c = {
  narrow: /^[جفمأسند]/i,
  abbreviated: /^(جان|فيف|مار|أفر|ماي|جوا|جوي|أوت|سبت|أكت|نوف|ديس)/i,
  wide: /^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/i
};
var parseMonthPatterns$1c = {
  narrow: [/^ج/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ج/i, /^ج/i, /^أ/i, /^س/i, /^أ/i, /^ن/i, /^د/i],
  any: [/^جان/i, /^فيف/i, /^مار/i, /^أفر/i, /^ماي/i, /^جوا/i, /^جوي/i, /^أوت/i, /^سبت/i, /^أكت/i, /^نوف/i, /^ديس/i]
};
var matchDayPatterns$1c = {
  narrow: /^[حنثرخجس]/i,
  short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|اثن|ثلا|أرب|خمي|جمعة|سبت)/i,
  wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
};
var parseDayPatterns$1c = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
  wide: [/^الأحد/i, /^الاثنين/i, /^الثلاثاء/i, /^الأربعاء/i, /^الخميس/i, /^الجمعة/i, /^السبت/i],
  any: [/^أح/i, /^اث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
};
var matchDayPeriodPatterns$1c = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns$1c = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match$1c = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$1c,
    parsePattern: parseOrdinalNumberPattern$1c,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$1c,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$1c,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$1c,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$1c,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return Number(index) + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$1c,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$1c,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$1c,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$1c,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$1c,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$1c,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Arabic locale (Algerian Arabic).
 * @language Algerian Arabic
 * @iso-639-2 ara
 * @author Badreddine Boumaza [@badre429]{@link https://github.com/badre429}
 * @author Ahmed ElShahat [@elshahat]{@link https://github.com/elshahat}
 */
var locale$1m = {
  code: 'ar-DZ',
  formatDistance: formatDistance$1d,
  formatLong: formatLong$1k,
  formatRelative: formatRelative$1d,
  localize: localize$1d,
  match: match$1c,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$1a = {
  lessThanXSeconds: {
    one: 'أقل من ثانية',
    two: 'أقل من ثانيتين',
    threeToTen: 'أقل من {{count}} ثواني',
    other: 'أقل من {{count}} ثانية'
  },
  xSeconds: {
    one: 'ثانية',
    two: 'ثانيتين',
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
    one: 'حوالي ساعة',
    two: 'حوالي ساعتين',
    threeToTen: 'حوالي {{count}} ساعات',
    other: 'حوالي {{count}} ساعة'
  },
  xHours: {
    one: 'ساعة',
    two: 'ساعتين',
    threeToTen: '{{count}} ساعات',
    other: '{{count}} ساعة'
  },
  xDays: {
    one: 'يوم',
    two: 'يومين',
    threeToTen: '{{count}} أيام',
    other: '{{count}} يوم'
  },
  aboutXWeeks: {
    one: 'حوالي أسبوع',
    two: 'حوالي أسبوعين',
    threeToTen: 'حوالي {{count}} أسابيع',
    other: 'حوالي {{count}} أسبوع'
  },
  xWeeks: {
    one: 'أسبوع',
    two: 'أسبوعين',
    threeToTen: '{{count}} أسابيع',
    other: '{{count}} أسبوع'
  },
  aboutXMonths: {
    one: 'حوالي شهر',
    two: 'حوالي شهرين',
    threeToTen: 'حوالي {{count}} أشهر',
    other: 'حوالي {{count}} شهر'
  },
  xMonths: {
    one: 'شهر',
    two: 'شهرين',
    threeToTen: '{{count}} أشهر',
    other: '{{count}} شهر'
  },
  aboutXYears: {
    one: 'حوالي سنة',
    two: 'حوالي سنتين',
    threeToTen: 'حوالي {{count}} سنين',
    other: 'حوالي {{count}} سنة'
  },
  xYears: {
    one: 'عام',
    two: 'عامين',
    threeToTen: '{{count}} أعوام',
    other: '{{count}} عام'
  },
  overXYears: {
    one: 'أكثر من سنة',
    two: 'أكثر من سنتين',
    threeToTen: 'أكثر من {{count}} سنين',
    other: 'أكثر من {{count}} سنة'
  },
  almostXYears: {
    one: 'عام تقريبًا',
    two: 'عامين تقريبًا',
    threeToTen: '{{count}} أعوام تقريبًا',
    other: '{{count}} عام تقريبًا'
  }
};

var formatDistance$1c = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$1a[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else if (count === 2) {
    result = tokenValue.two;
  } else if (count <= 10) {
    result = tokenValue.threeToTen.replace('{{count}}', String(count));
  } else {
    result = tokenValue.other.replace('{{count}}', String(count));
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "\u0641\u064A \u062E\u0644\u0627\u0644 ".concat(result);
    } else {
      return "\u0645\u0646\u0630 ".concat(result);
    }
  }

  return result;
};

var dateFormats$1j = {
  full: 'EEEE، do MMMM y',
  long: 'do MMMM y',
  medium: 'dd/MMM/y',
  short: 'd/MM/y'
};
var timeFormats$1j = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$1j = {
  full: "{{date}} 'الساعة' {{time}}",
  long: "{{date}} 'الساعة' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$1j = {
  date: buildFormatLongFn({
    formats: dateFormats$1j,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1j,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1j,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$1c = {
  lastWeek: "eeee 'اللي جاي الساعة' p",
  yesterday: "'إمبارح الساعة' p",
  today: "'النهاردة الساعة' p",
  tomorrow: "'بكرة الساعة' p",
  nextWeek: "eeee 'الساعة' p",
  other: 'P'
};

var formatRelative$1c = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$1c[token];
};

var eraValues$1c = {
  narrow: ['ق', 'ب'],
  abbreviated: ['ق.م', 'ب.م'],
  wide: ['قبل الميلاد', 'بعد الميلاد']
};
var quarterValues$1c = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['ر1', 'ر2', 'ر3', 'ر4'],
  wide: ['الربع الأول', 'الربع الثاني', 'الربع الثالث', 'الربع الرابع']
};
var monthValues$1c = {
  narrow: ['ي', 'ف', 'م', 'أ', 'م', 'ي', 'ي', 'أ', 'س', 'أ', 'ن', 'د'],
  abbreviated: ['ينا', 'فبر', 'مارس', 'أبريل', 'مايو', 'يونـ', 'يولـ', 'أغسـ', 'سبتـ', 'أكتـ', 'نوفـ', 'ديسـ'],
  wide: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
};
var dayValues$1c = {
  narrow: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  short: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  abbreviated: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  wide: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
};
var dayPeriodValues$1b = {
  narrow: {
    am: 'ص',
    pm: 'م',
    midnight: 'ن',
    noon: 'ظ',
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءً',
    night: 'ليلاً'
  },
  abbreviated: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهراً',
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءً',
    night: 'ليلاً'
  },
  wide: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهراً',
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءً',
    night: 'ليلاً'
  }
};
var formattingDayPeriodValues$Y = {
  narrow: {
    am: 'ص',
    pm: 'م',
    midnight: 'ن',
    noon: 'ظ',
    morning: 'في الصباح',
    afternoon: 'بعد الظهر',
    evening: 'في المساء',
    night: 'في الليل'
  },
  abbreviated: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهراً',
    morning: 'في الصباح',
    afternoon: 'بعد الظهر',
    evening: 'في المساء',
    night: 'في الليل'
  },
  wide: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    morning: 'في الصباح',
    noon: 'ظهراً',
    afternoon: 'بعد الظهر',
    evening: 'في المساء',
    night: 'في الليل'
  }
};

var ordinalNumber$1c = function (dirtyNumber, _options) {
  return String(dirtyNumber);
};

var localize$1c = {
  ordinalNumber: ordinalNumber$1c,
  era: buildLocalizeFn({
    values: eraValues$1c,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$1c,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$1c,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$1c,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$1b,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$Y,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$1b = /^(\d+)/;
var parseOrdinalNumberPattern$1b = /\d+/i;
var matchEraPatterns$1b = {
  narrow: /^(ق|ب)/g,
  abbreviated: /^(ق.م|ب.م)/g,
  wide: /^(قبل الميلاد|بعد الميلاد)/g
};
var parseEraPatterns$1b = {
  any: [/^ق/g, /^ب/g]
};
var matchQuarterPatterns$1b = {
  narrow: /^[1234]/,
  abbreviated: /^ر[1234]/,
  wide: /^الربع (الأول|الثاني|الثالث|الرابع)/
};
var parseQuarterPatterns$1b = {
  wide: [/الربع الأول/, /الربع الثاني/, /الربع الثالث/, /الربع الرابع/],
  any: [/1/, /2/, /3/, /4/]
};
var matchMonthPatterns$1b = {
  narrow: /^(ي|ف|م|أ|س|ن|د)/,
  abbreviated: /^(ينا|فبر|مارس|أبريل|مايو|يونـ|يولـ|أغسـ|سبتـ|أكتـ|نوفـ|ديسـ)/,
  wide: /^(يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/
};
var parseMonthPatterns$1b = {
  narrow: [/^ي/, /^ف/, /^م/, /^أ/, /^م/, /^ي/, /^ي/, /^أ/, /^س/, /^أ/, /^ن/, /^د/],
  any: [/^ينا/, /^فبر/, /^مارس/, /^أبريل/, /^مايو/, /^يون/, /^يول/, /^أغس/, /^سبت/, /^أكت/, /^نوف/, /^ديس/]
};
var matchDayPatterns$1b = {
  narrow: /^(ح|ن|ث|ر|خ|ج|س)/,
  short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/,
  abbreviated: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/,
  wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/
};
var parseDayPatterns$1b = {
  narrow: [/^ح/, /^ن/, /^ث/, /^ر/, /^خ/, /^ج/, /^س/],
  any: [/أحد/, /اثنين/, /ثلاثاء/, /أربعاء/, /خميس/, /جمعة/, /سبت/]
};
var matchDayPeriodPatterns$1b = {
  narrow: /^(ص|م|ن|ظ|في الصباح|بعد الظهر|في المساء|في الليل)/,
  abbreviated: /^(ص|م|نصف الليل|ظهراً|في الصباح|بعد الظهر|في المساء|في الليل)/,
  wide: /^(ص|م|نصف الليل|في الصباح|ظهراً|بعد الظهر|في المساء|في الليل)/,
  any: /^(ص|م|صباح|ظهر|مساء|ليل)/
};
var parseDayPeriodPatterns$1b = {
  any: {
    am: /^ص/,
    pm: /^م/,
    midnight: /^ن/,
    noon: /^ظ/,
    morning: /^ص/,
    afternoon: /^بعد/,
    evening: /^م/,
    night: /^ل/
  }
};
var match$1b = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$1b,
    parsePattern: parseOrdinalNumberPattern$1b,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$1b,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$1b,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$1b,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$1b,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$1b,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$1b,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$1b,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$1b,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$1b,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$1b,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Arabic locale (Egypt).
 * @language Arabic
 * @iso-639-2 ara
 * @author AbdAllah AbdElFattah [@AbdAllahAbdElFattah13]{@link https://github.com/AbdAllahAbdElFattah13}
 */
var locale$1l = {
  code: 'ar-EG',
  formatDistance: formatDistance$1c,
  formatLong: formatLong$1j,
  formatRelative: formatRelative$1c,
  localize: localize$1c,
  match: match$1b,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$19 = {
  lessThanXSeconds: {
    one: 'أقل من ثانية واحدة',
    two: 'أقل من ثانتين',
    threeToTen: 'أقل من {{count}} ثواني',
    other: 'أقل من {{count}} ثانية'
  },
  xSeconds: {
    one: 'ثانية واحدة',
    two: 'ثانتين',
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
    two: 'دقيقتين',
    threeToTen: '{{count}} دقائق',
    other: '{{count}} دقيقة'
  },
  aboutXHours: {
    one: 'ساعة واحدة تقريباً',
    two: 'ساعتين تقريباً',
    threeToTen: '{{count}} ساعات تقريباً',
    other: '{{count}} ساعة تقريباً'
  },
  xHours: {
    one: 'ساعة واحدة',
    two: 'ساعتين',
    threeToTen: '{{count}} ساعات',
    other: '{{count}} ساعة'
  },
  xDays: {
    one: 'يوم واحد',
    two: 'يومين',
    threeToTen: '{{count}} أيام',
    other: '{{count}} يوم'
  },
  aboutXWeeks: {
    one: 'أسبوع واحد تقريباً',
    two: 'أسبوعين تقريباً',
    threeToTen: '{{count}} أسابيع تقريباً',
    other: '{{count}} أسبوع تقريباً'
  },
  xWeeks: {
    one: 'أسبوع واحد',
    two: 'أسبوعين',
    threeToTen: '{{count}} أسابيع',
    other: '{{count}} أسبوع'
  },
  aboutXMonths: {
    one: 'شهر واحد تقريباً',
    two: 'شهرين تقريباً',
    threeToTen: '{{count}} أشهر تقريباً',
    other: '{{count}} شهر تقريباً'
  },
  xMonths: {
    one: 'شهر واحد',
    two: 'شهرين',
    threeToTen: '{{count}} أشهر',
    other: '{{count}} شهر'
  },
  aboutXYears: {
    one: 'عام واحد تقريباً',
    two: 'عامين تقريباً',
    threeToTen: '{{count}} أعوام تقريباً',
    other: '{{count}} عام تقريباً'
  },
  xYears: {
    one: 'عام واحد',
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
    one: 'عام واحد تقريباً',
    two: 'عامين تقريباً',
    threeToTen: '{{count}} أعوام تقريباً',
    other: '{{count}} عام تقريباً'
  }
};

var formatDistance$1b = function (token, count, options) {
  options = options || {};
  var usageGroup = formatDistanceLocale$19[token];
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

  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'في خلال ' + result;
    } else {
      return 'منذ ' + result;
    }
  }

  return result;
};

var dateFormats$1i = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats$1i = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$1i = {
  full: "{{date}} 'عند' {{time}}",
  long: "{{date}} 'عند' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$1i = {
  date: buildFormatLongFn({
    formats: dateFormats$1i,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1i,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1i,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$1b = {
  lastWeek: "'أخر' eeee 'عند' p",
  yesterday: "'أمس عند' p",
  today: "'اليوم عند' p",
  tomorrow: "'غداً عند' p",
  nextWeek: "eeee 'عند' p",
  other: 'P'
};

var formatRelative$1b = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$1b[token];
};

var eraValues$1b = {
  narrow: ['ق', 'ب'],
  abbreviated: ['ق.م.', 'ب.م.'],
  wide: ['قبل الميلاد', 'بعد الميلاد']
};
var quarterValues$1b = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['ر1', 'ر2', 'ر3', 'ر4'],
  wide: ['الربع الأول', 'الربع الثاني', 'الربع الثالث', 'الربع الرابع']
};
var monthValues$1b = {
  narrow: ['ي', 'ف', 'م', 'أ', 'م', 'ي', 'ي', 'غ', 'ش', 'أ', 'ن', 'د'],
  abbreviated: ['ينا', 'فبر', 'مارس', 'أبريل', 'ماي', 'يونـ', 'يولـ', 'غشت', 'شتنـ', 'أكتـ', 'نونـ', 'دجنـ'],
  wide: ['يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو', 'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر']
};
var dayValues$1b = {
  narrow: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  short: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  abbreviated: ['أحد', 'اثنـ', 'ثلا', 'أربـ', 'خميـ', 'جمعة', 'سبت'],
  wide: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
};
var dayPeriodValues$1a = {
  narrow: {
    am: 'ص',
    pm: 'م',
    midnight: 'ن',
    noon: 'ظ',
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءاً',
    night: 'ليلاً'
  },
  abbreviated: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهر',
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءاً',
    night: 'ليلاً'
  },
  wide: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهر',
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءاً',
    night: 'ليلاً'
  }
};
var formattingDayPeriodValues$X = {
  narrow: {
    am: 'ص',
    pm: 'م',
    midnight: 'ن',
    noon: 'ظ',
    morning: 'في الصباح',
    afternoon: 'بعد الظـهر',
    evening: 'في المساء',
    night: 'في الليل'
  },
  abbreviated: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهر',
    morning: 'في الصباح',
    afternoon: 'بعد الظهر',
    evening: 'في المساء',
    night: 'في الليل'
  },
  wide: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهر',
    morning: 'صباحاً',
    afternoon: 'بعد الظـهر',
    evening: 'في المساء',
    night: 'في الليل'
  }
};

var ordinalNumber$1b = function (dirtyNumber) {
  return String(dirtyNumber);
};

var localize$1b = {
  ordinalNumber: ordinalNumber$1b,
  era: buildLocalizeFn({
    values: eraValues$1b,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$1b,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$1b,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$1b,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$1a,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$X,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$1a = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern$1a = /\d+/i;
var matchEraPatterns$1a = {
  narrow: /^(ق|ب)/i,
  abbreviated: /^(ق\.?\s?م\.?|ق\.?\s?م\.?\s?|a\.?\s?d\.?|c\.?\s?)/i,
  wide: /^(قبل الميلاد|قبل الميلاد|بعد الميلاد|بعد الميلاد)/i
};
var parseEraPatterns$1a = {
  any: [/^قبل/i, /^بعد/i]
};
var matchQuarterPatterns$1a = {
  narrow: /^[1234]/i,
  abbreviated: /^ر[1234]/i,
  wide: /^الربع [1234]/i
};
var parseQuarterPatterns$1a = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$1a = {
  narrow: /^[يفمأمسند]/i,
  abbreviated: /^(ين|ف|مار|أب|ماي|يون|يول|غش|شت|أك|ن|د)/i,
  wide: /^(ين|ف|مار|أب|ماي|يون|يول|غش|شت|أك|ن|د)/i
};
var parseMonthPatterns$1a = {
  narrow: [/^ي/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ي/i, /^ي/i, /^غ/i, /^ش/i, /^أ/i, /^ن/i, /^د/i],
  any: [/^ين/i, /^فب/i, /^مار/i, /^أب/i, /^ماي/i, /^يون/i, /^يول/i, /^غشت/i, /^ش/i, /^أك/i, /^ن/i, /^د/i]
};
var matchDayPatterns$1a = {
  narrow: /^[حنثرخجس]/i,
  short: /^(أحد|إثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|إثن|ثلا|أرب|خمي|جمعة|سبت)/i,
  wide: /^(الأحد|الإثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
};
var parseDayPatterns$1a = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
  wide: [/^الأحد/i, /^الإثنين/i, /^الثلاثاء/i, /^الأربعاء/i, /^الخميس/i, /^الجمعة/i, /^السبت/i],
  any: [/^أح/i, /^إث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
};
var matchDayPeriodPatterns$1a = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns$1a = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match$1a = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$1a,
    parsePattern: parseOrdinalNumberPattern$1a,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$1a,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$1a,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$1a,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$1a,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return Number(index) + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$1a,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$1a,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$1a,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$1a,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$1a,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$1a,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Arabic locale (Moroccan Arabic).
 * @language Moroccan Arabic
 * @iso-639-2 ara
 * @author Achraf Rrami [@rramiachraf]{@link https://github.com/rramiachraf}
 */
var locale$1k = {
  code: 'ar-MA',
  formatDistance: formatDistance$1b,
  formatLong: formatLong$1i,
  formatRelative: formatRelative$1b,
  localize: localize$1b,
  match: match$1a,
  options: {
    // Monday is 1
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$18 = {
  lessThanXSeconds: {
    one: 'أقل من ثانية واحدة',
    two: 'أقل من ثانتين',
    threeToTen: 'أقل من {{count}} ثواني',
    other: 'أقل من {{count}} ثانية'
  },
  xSeconds: {
    one: 'ثانية واحدة',
    two: 'ثانتين',
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
    two: 'دقيقتين',
    threeToTen: '{{count}} دقائق',
    other: '{{count}} دقيقة'
  },
  aboutXHours: {
    one: 'ساعة واحدة تقريباً',
    two: 'ساعتين تقريباً',
    threeToTen: '{{count}} ساعات تقريباً',
    other: '{{count}} ساعة تقريباً'
  },
  xHours: {
    one: 'ساعة واحدة',
    two: 'ساعتين',
    threeToTen: '{{count}} ساعات',
    other: '{{count}} ساعة'
  },
  xDays: {
    one: 'يوم واحد',
    two: 'يومين',
    threeToTen: '{{count}} أيام',
    other: '{{count}} يوم'
  },
  aboutXWeeks: {
    one: 'أسبوع واحد تقريباً',
    two: 'أسبوعين تقريباً',
    threeToTen: '{{count}} أسابيع تقريباً',
    other: '{{count}} أسبوع تقريباً'
  },
  xWeeks: {
    one: 'أسبوع واحد',
    two: 'أسبوعين',
    threeToTen: '{{count}} أسابيع',
    other: '{{count}} أسبوع'
  },
  aboutXMonths: {
    one: 'شهر واحد تقريباً',
    two: 'شهرين تقريباً',
    threeToTen: '{{count}} أشهر تقريباً',
    other: '{{count}} شهر تقريباً'
  },
  xMonths: {
    one: 'شهر واحد',
    two: 'شهرين',
    threeToTen: '{{count}} أشهر',
    other: '{{count}} شهر'
  },
  aboutXYears: {
    one: 'عام واحد تقريباً',
    two: 'عامين تقريباً',
    threeToTen: '{{count}} أعوام تقريباً',
    other: '{{count}} عام تقريباً'
  },
  xYears: {
    one: 'عام واحد',
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
    one: 'عام واحد تقريباً',
    two: 'عامين تقريباً',
    threeToTen: '{{count}} أعوام تقريباً',
    other: '{{count}} عام تقريباً'
  }
};

var formatDistance$1a = function (token, count, options) {
  options = options || {};
  var usageGroup = formatDistanceLocale$18[token];
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

  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'في خلال ' + result;
    } else {
      return 'منذ ' + result;
    }
  }

  return result;
};

var dateFormats$1h = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats$1h = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$1h = {
  full: "{{date}} 'عند' {{time}}",
  long: "{{date}} 'عند' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$1h = {
  date: buildFormatLongFn({
    formats: dateFormats$1h,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1h,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1h,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$1a = {
  lastWeek: "'أخر' eeee 'عند' p",
  yesterday: "'أمس عند' p",
  today: "'اليوم عند' p",
  tomorrow: "'غداً عند' p",
  nextWeek: "eeee 'عند' p",
  other: 'P'
};

var formatRelative$1a = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$1a[token];
};

var eraValues$1a = {
  narrow: ['ق', 'ب'],
  abbreviated: ['ق.م.', 'ب.م.'],
  wide: ['قبل الميلاد', 'بعد الميلاد']
};
var quarterValues$1a = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['ر1', 'ر2', 'ر3', 'ر4'],
  wide: ['الربع الأول', 'الربع الثاني', 'الربع الثالث', 'الربع الرابع']
};
var monthValues$1a = {
  narrow: ['ي', 'ف', 'م', 'أ', 'م', 'ي', 'ي', 'أ', 'س', 'أ', 'ن', 'د'],
  abbreviated: ['ينا', 'فبر', 'مارس', 'أبريل', 'مايو', 'يونـ', 'يولـ', 'أغسـ', 'سبتـ', 'أكتـ', 'نوفـ', 'ديسـ'],
  wide: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
};
var dayValues$1a = {
  narrow: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  short: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  abbreviated: ['أحد', 'اثنـ', 'ثلا', 'أربـ', 'خميـ', 'جمعة', 'سبت'],
  wide: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
};
var dayPeriodValues$19 = {
  narrow: {
    am: 'ص',
    pm: 'م',
    midnight: 'ن',
    noon: 'ظ',
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءاً',
    night: 'ليلاً'
  },
  abbreviated: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهر',
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءاً',
    night: 'ليلاً'
  },
  wide: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهر',
    morning: 'صباحاً',
    afternoon: 'بعد الظهر',
    evening: 'مساءاً',
    night: 'ليلاً'
  }
};
var formattingDayPeriodValues$W = {
  narrow: {
    am: 'ص',
    pm: 'م',
    midnight: 'ن',
    noon: 'ظ',
    morning: 'في الصباح',
    afternoon: 'بعد الظـهر',
    evening: 'في المساء',
    night: 'في الليل'
  },
  abbreviated: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهر',
    morning: 'في الصباح',
    afternoon: 'بعد الظهر',
    evening: 'في المساء',
    night: 'في الليل'
  },
  wide: {
    am: 'ص',
    pm: 'م',
    midnight: 'نصف الليل',
    noon: 'ظهر',
    morning: 'صباحاً',
    afternoon: 'بعد الظـهر',
    evening: 'في المساء',
    night: 'في الليل'
  }
};

var ordinalNumber$1a = function (dirtyNumber) {
  return String(dirtyNumber);
};

var localize$1a = {
  ordinalNumber: ordinalNumber$1a,
  era: buildLocalizeFn({
    values: eraValues$1a,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$1a,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$1a,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$1a,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$19,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$W,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$19 = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern$19 = /\d+/i;
var matchEraPatterns$19 = {
  narrow: /^(ق|ب)/i,
  abbreviated: /^(ق\.?\s?م\.?|ق\.?\s?م\.?\s?|a\.?\s?d\.?|c\.?\s?)/i,
  wide: /^(قبل الميلاد|قبل الميلاد|بعد الميلاد|بعد الميلاد)/i
};
var parseEraPatterns$19 = {
  any: [/^قبل/i, /^بعد/i]
};
var matchQuarterPatterns$19 = {
  narrow: /^[1234]/i,
  abbreviated: /^ر[1234]/i,
  wide: /^الربع [1234]/i
};
var parseQuarterPatterns$19 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$19 = {
  narrow: /^[يفمأمسند]/i,
  abbreviated: /^(ين|ف|مار|أب|ماي|يون|يول|أغ|س|أك|ن|د)/i,
  wide: /^(ين|ف|مار|أب|ماي|يون|يول|أغ|س|أك|ن|د)/i
};
var parseMonthPatterns$19 = {
  narrow: [/^ي/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ي/i, /^ي/i, /^أ/i, /^س/i, /^أ/i, /^ن/i, /^د/i],
  any: [/^ين/i, /^ف/i, /^مار/i, /^أب/i, /^ماي/i, /^يون/i, /^يول/i, /^أغ/i, /^س/i, /^أك/i, /^ن/i, /^د/i]
};
var matchDayPatterns$19 = {
  narrow: /^[حنثرخجس]/i,
  short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|اثن|ثلا|أرب|خمي|جمعة|سبت)/i,
  wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
};
var parseDayPatterns$19 = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
  wide: [/^الأحد/i, /^الاثنين/i, /^الثلاثاء/i, /^الأربعاء/i, /^الخميس/i, /^الجمعة/i, /^السبت/i],
  any: [/^أح/i, /^اث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
};
var matchDayPeriodPatterns$19 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns$19 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match$19 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$19,
    parsePattern: parseOrdinalNumberPattern$19,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$19,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$19,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$19,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$19,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$19,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$19,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$19,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$19,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$19,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$19,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Arabic locale (Sauid Arabic).
 * @language Arabic
 * @iso-639-2 ara
 * @author Dhaifallah Alwadani [@dalwadani]{@link https://github.com/dalwadani}
 */

var locale$1j = {
  code: 'ar-SA',
  formatDistance: formatDistance$1a,
  formatLong: formatLong$1h,
  formatRelative: formatRelative$1a,
  localize: localize$1a,
  match: match$19,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$17 = {
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

var formatDistance$19 = function (token, count, options) {
  var usageGroup = formatDistanceLocale$17[token];
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

var dateFormats$1g = {
  full: 'EEEE، do MMMM y',
  long: 'do MMMM y',
  medium: 'd MMM y',
  short: 'dd/MM/yyyy'
};
var timeFormats$1g = {
  full: 'HH:mm:ss',
  long: 'HH:mm:ss',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$1g = {
  full: "{{date}} 'مع' {{time}}",
  long: "{{date}} 'مع' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$1g = {
  date: buildFormatLongFn({
    formats: dateFormats$1g,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1g,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1g,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$19 = {
  lastWeek: "eeee 'إلي فات مع' p",
  yesterday: "'البارح مع' p",
  today: "'اليوم مع' p",
  tomorrow: "'غدوة مع' p",
  nextWeek: "eeee 'الجمعة الجاية مع' p 'نهار'",
  other: 'P'
};

var formatRelative$19 = function (token) {
  return formatRelativeLocale$19[token];
};

var eraValues$19 = {
  narrow: ['ق', 'ب'],
  abbreviated: ['ق.م.', 'ب.م.'],
  wide: ['قبل الميلاد', 'بعد الميلاد']
};
var quarterValues$19 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['ر1', 'ر2', 'ر3', 'ر4'],
  wide: ['الربع الأول', 'الربع الثاني', 'الربع الثالث', 'الربع الرابع']
};
var monthValues$19 = {
  narrow: ['د', 'ن', 'أ', 'س', 'أ', 'ج', 'ج', 'م', 'أ', 'م', 'ف', 'ج'],
  abbreviated: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
  wide: ['جانفي', 'فيفري', 'مارس', 'أفريل', 'ماي', 'جوان', 'جويلية', 'أوت', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
};
var dayValues$19 = {
  narrow: ['ح', 'ن', 'ث', 'ر', 'خ', 'ج', 'س'],
  short: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  abbreviated: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  wide: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت']
};
var dayPeriodValues$18 = {
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
var formattingDayPeriodValues$V = {
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

var ordinalNumber$19 = function (num) {
  return String(num);
};

var localize$19 = {
  ordinalNumber: ordinalNumber$19,
  era: buildLocalizeFn({
    values: eraValues$19,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$19,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$19,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$19,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$18,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$V,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$18 = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern$18 = /\d+/i;
var matchEraPatterns$18 = {
  narrow: /[قب]/,
  abbreviated: /[قب]\.م\./,
  wide: /(قبل|بعد) الميلاد/
};
var parseEraPatterns$18 = {
  any: [/قبل/, /بعد/]
};
var matchQuarterPatterns$18 = {
  narrow: /^[1234]/i,
  abbreviated: /ر[1234]/,
  wide: /الربع (الأول|الثاني|الثالث|الرابع)/
};
var parseQuarterPatterns$18 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$18 = {
  narrow: /^[جفمأسند]/,
  abbreviated: /^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/,
  wide: /^(جانفي|فيفري|مارس|أفريل|ماي|جوان|جويلية|أوت|سبتمبر|أكتوبر|نوفمبر|ديسمبر)/
};
var parseMonthPatterns$18 = {
  narrow: [/^ج/i, /^ف/i, /^م/i, /^أ/i, /^م/i, /^ج/i, /^ج/i, /^أ/i, /^س/i, /^أ/i, /^ن/i, /^د/i],
  any: [/^جانفي/i, /^فيفري/i, /^مارس/i, /^أفريل/i, /^ماي/i, /^جوان/i, /^جويلية/i, /^أوت/i, /^سبتمبر/i, /^أكتوبر/i, /^نوفمبر/i, /^ديسمبر/i]
};
var matchDayPatterns$18 = {
  narrow: /^[حنثرخجس]/i,
  short: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  abbreviated: /^(أحد|اثنين|ثلاثاء|أربعاء|خميس|جمعة|سبت)/i,
  wide: /^(الأحد|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت)/i
};
var parseDayPatterns$18 = {
  narrow: [/^ح/i, /^ن/i, /^ث/i, /^ر/i, /^خ/i, /^ج/i, /^س/i],
  wide: [/^الأحد/i, /^الاثنين/i, /^الثلاثاء/i, /^الأربعاء/i, /^الخميس/i, /^الجمعة/i, /^السبت/i],
  any: [/^أح/i, /^اث/i, /^ث/i, /^أر/i, /^خ/i, /^ج/i, /^س/i]
};
var matchDayPeriodPatterns$18 = {
  narrow: /^(ص|ع|ن ل|ل|(في|مع) (صباح|قايلة|عشية|ليل))/,
  any: /^([صع]|نص الليل|قايلة|(في|مع) (صباح|قايلة|عشية|ليل))/
};
var parseDayPeriodPatterns$18 = {
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
var match$18 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$18,
    parsePattern: parseOrdinalNumberPattern$18,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$18,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$18,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$18,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$18,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$18,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$18,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$18,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$18,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$18,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$18,
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
var locale$1i = {
  code: 'ar-TN',
  formatDistance: formatDistance$19,
  formatLong: formatLong$1g,
  formatRelative: formatRelative$19,
  localize: localize$19,
  match: match$18,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$16 = {
  lessThanXSeconds: {
    one: 'bir saniyədən az',
    other: '{{count}} bir saniyədən az'
  },
  xSeconds: {
    one: '1 saniyə',
    other: '{{count}} saniyə'
  },
  halfAMinute: 'yarım dəqiqə',
  lessThanXMinutes: {
    one: 'bir dəqiqədən az',
    other: '{{count}} bir dəqiqədən az'
  },
  xMinutes: {
    one: 'bir dəqiqə',
    other: '{{count}} dəqiqə'
  },
  aboutXHours: {
    one: 'təxminən 1 saat',
    other: 'təxminən {{count}} saat'
  },
  xHours: {
    one: '1 saat',
    other: '{{count}} saat'
  },
  xDays: {
    one: '1 gün',
    other: '{{count}} gün'
  },
  aboutXWeeks: {
    one: 'təxminən 1 həftə',
    other: 'təxminən {{count}} həftə'
  },
  xWeeks: {
    one: '1 həftə',
    other: '{{count}} həftə'
  },
  aboutXMonths: {
    one: 'təxminən 1 ay',
    other: 'təxminən {{count}} ay'
  },
  xMonths: {
    one: '1 ay',
    other: '{{count}} ay'
  },
  aboutXYears: {
    one: 'təxminən 1 il',
    other: 'təxminən {{count}} il'
  },
  xYears: {
    one: '1 il',
    other: '{{count}} il'
  },
  overXYears: {
    one: '1 ildən çox',
    other: '{{count}} ildən çox'
  },
  almostXYears: {
    one: 'demək olar ki 1 il',
    other: 'demək olar ki {{count}} il'
  }
};

var formatDistance$18 = function (token, count, options) {
  options = options || {};
  var usageGroup = formatDistanceLocale$16[token];
  var result;

  if (typeof usageGroup === 'string') {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else {
    result = usageGroup.other.replace('{{count}}', String(count));
  }

  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + ' əvvəl';
    } else {
      return result + ' sonra';
    }
  }

  return result;
};

var dateFormats$1f = {
  full: "EEEE, do MMMM y 'il'",
  long: "do MMMM y 'il'",
  medium: "d MMM y 'il'",
  short: 'dd.MM.yyyy'
};
var timeFormats$1f = {
  full: 'H:mm:ss zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$1f = {
  full: "{{date}} {{time}} - 'də'",
  long: "{{date}} {{time}} - 'də'",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$1f = {
  date: buildFormatLongFn({
    formats: dateFormats$1f,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1f,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1f,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$18 = {
  lastWeek: "'sonuncu' eeee p -'də'",
  yesterday: "'dünən' p -'də'",
  today: "'bugün' p -'də'",
  tomorrow: "'sabah' p -'də'",
  nextWeek: "eeee p -'də'",
  other: 'P'
};

var formatRelative$18 = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$18[token];
};

var eraValues$18 = {
  narrow: ['e.ə', 'b.e'],
  abbreviated: ['e.ə', 'b.e'],
  wide: ['eramızdan əvvəl', 'bizim era']
};
var quarterValues$18 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['K1', 'K2', 'K3', 'K4'],
  wide: ['1ci kvartal', '2ci kvartal', '3cü kvartal', '4cü kvartal']
};
var monthValues$18 = {
  narrow: ['Y', 'F', 'M', 'A', 'M', 'İ', 'İ', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyun', 'İyul', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'],
  wide: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr']
};
var dayValues$18 = {
  narrow: ['B.', 'B.e', 'Ç.a', 'Ç.', 'C.a', 'C.', 'Ş.'],
  short: ['B.', 'B.e', 'Ç.a', 'Ç.', 'C.a', 'C.', 'Ş.'],
  abbreviated: ['Baz', 'Baz.e', 'Çər.a', 'Çər', 'Cüm.a', 'Cüm', 'Şə'],
  wide: ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə']
};
var dayPeriodValues$17 = {
  narrow: {
    am: 'am',
    pm: 'pm',
    midnight: 'gecəyarı',
    noon: 'gün',
    morning: 'səhər',
    afternoon: 'gündüz',
    evening: 'axşam',
    night: 'gecə'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'gecəyarı',
    noon: 'gün',
    morning: 'səhər',
    afternoon: 'gündüz',
    evening: 'axşam',
    night: 'gecə'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'gecəyarı',
    noon: 'gün',
    morning: 'səhər',
    afternoon: 'gündüz',
    evening: 'axşam',
    night: 'gecə'
  }
};
var formattingDayPeriodValues$U = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'gecəyarı',
    noon: 'gün',
    morning: 'səhər',
    afternoon: 'gündüz',
    evening: 'axşam',
    night: 'gecə'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'gecəyarı',
    noon: 'gün',
    morning: 'səhər',
    afternoon: 'gündüz',
    evening: 'axşam',
    night: 'gecə'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'gecəyarı',
    noon: 'gün',
    morning: 'səhər',
    afternoon: 'gündüz',
    evening: 'axşam',
    night: 'gecə'
  }
};
var suffixes$1 = {
  1: '-inci',
  5: '-inci',
  8: '-inci',
  70: '-inci',
  80: '-inci',
  2: '-nci',
  7: '-nci',
  20: '-nci',
  50: '-nci',
  3: '-üncü',
  4: '-üncü',
  100: '-üncü',
  6: '-ncı',
  9: '-uncu',
  10: '-uncu',
  30: '-uncu',
  60: '-ıncı',
  90: '-ıncı'
};

var getSuffix = function (number) {
  if (number === 0) {
    // special case for zero
    return number + '-ıncı';
  }

  var a = number % 10;
  var b = number % 100 - a;
  var c = number >= 100 ? 100 : null;

  if (suffixes$1[a]) {
    return suffixes$1[a];
  } else if (suffixes$1[b]) {
    return suffixes$1[b];
  } else if (c !== null) {
    return suffixes$1[c];
  }

  return '';
};

var ordinalNumber$18 = function (dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  var suffix = getSuffix(number);
  return number + suffix;
};

var localize$18 = {
  ordinalNumber: ordinalNumber$18,
  era: buildLocalizeFn({
    values: eraValues$18,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$18,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$18,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$18,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$17,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$U,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$17 = /^(\d+)(-?(ci|inci|nci|uncu|üncü|ncı))?/i;
var parseOrdinalNumberPattern$17 = /\d+/i;
var matchEraPatterns$17 = {
  narrow: /^(b|a)$/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)$/i,
  wide: /^(bizim eradan əvvəl|bizim era)$/i
};
var parseEraPatterns$17 = {
  any: [/^b$/i, /^(a|c)$/i]
};
var matchQuarterPatterns$17 = {
  narrow: /^[1234]$/i,
  abbreviated: /^K[1234]$/i,
  wide: /^[1234](ci)? kvartal$/i
};
var parseQuarterPatterns$17 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$17 = {
  narrow: /^[(?-i)yfmaisond]$/i,
  abbreviated: /^(Yan|Fev|Mar|Apr|May|İyun|İyul|Avq|Sen|Okt|Noy|Dek)$/i,
  wide: /^(Yanvar|Fevral|Mart|Aprel|May|İyun|İyul|Avgust|Sentyabr|Oktyabr|Noyabr|Dekabr)$/i
};
var parseMonthPatterns$17 = {
  narrow: [/^[(?-i)y]$/i, /^[(?-i)f]$/i, /^[(?-i)m]$/i, /^[(?-i)a]$/i, /^[(?-i)m]$/i, /^[(?-i)i]$/i, /^[(?-i)i]$/i, /^[(?-i)a]$/i, /^[(?-i)s]$/i, /^[(?-i)o]$/i, /^[(?-i)n]$/i, /^[(?-i)d]$/i],
  abbreviated: [/^Yan$/i, /^Fev$/i, /^Mar$/i, /^Apr$/i, /^May$/i, /^İyun$/i, /^İyul$/i, /^Avg$/i, /^Sen$/i, /^Okt$/i, /^Noy$/i, /^Dek$/i],
  wide: [/^Yanvar$/i, /^Fevral$/i, /^Mart$/i, /^Aprel$/i, /^May$/i, /^İyun$/i, /^İyul$/i, /^Avgust$/i, /^Sentyabr$/i, /^Oktyabr$/i, /^Noyabr$/i, /^Dekabr$/i]
};
var matchDayPatterns$17 = {
  narrow: /^(B\.|B\.e|Ç\.a|Ç\.|C\.a|C\.|Ş\.)$/i,
  short: /^(B\.|B\.e|Ç\.a|Ç\.|C\.a|C\.|Ş\.)$/i,
  abbreviated: /^(Baz\.e|Çər|Çər\.a|Cüm|Cüm\.a|Şə)$/i,
  wide: /^(Bazar|Bazar ertəsi|Çərşənbə axşamı|Çərşənbə|Cümə axşamı|Cümə|Şənbə)$/i
};
var parseDayPatterns$17 = {
  narrow: [/^B\.$/i, /^B\.e$/i, /^Ç\.a$/i, /^Ç\.$/i, /^C\.a$/i, /^C\.$/i, /^Ş\.$/i],
  abbreviated: [/^Baz$/i, /^Baz\.e$/i, /^Çər\.a$/i, /^Çər$/i, /^Cüm\.a$/i, /^Cüm$/i, /^Şə$/i],
  wide: [/^Bazar$/i, /^Bazar ertəsi$/i, /^Çərşənbə axşamı$/i, /^Çərşənbə$/i, /^Cümə axşamı$/i, /^Cümə$/i, /^Şənbə$/i],
  any: [/^B\.$/i, /^B\.e$/i, /^Ç\.a$/i, /^Ç\.$/i, /^C\.a$/i, /^C\.$/i, /^Ş\.$/i]
};
var matchDayPeriodPatterns$17 = {
  narrow: /^(a|p|gecəyarı|gün|səhər|gündüz|axşam|gecə)$/i,
  any: /^(am|pm|a\.m\.|p\.m\.|AM|PM|gecəyarı|gün|səhər|gündüz|axşam|gecə)$/i
};
var parseDayPeriodPatterns$17 = {
  any: {
    am: /^a$/i,
    pm: /^p$/i,
    midnight: /^gecəyarı$/i,
    noon: /^gün$/i,
    morning: /səhər$/i,
    afternoon: /gündüz$/i,
    evening: /axşam$/i,
    night: /gecə$/i
  }
};
var match$17 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$17,
    parsePattern: parseOrdinalNumberPattern$17,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$17,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$17,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$17,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$17,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return Number(index) + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$17,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$17,
    defaultParseWidth: 'narrow'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$17,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$17,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$17,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$17,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Azerbaijani locale.
 * @language Azerbaijani
 * @iso-639-2 aze
 */

var locale$1h = {
  code: 'az',
  formatDistance: formatDistance$18,
  formatLong: formatLong$1f,
  formatRelative: formatRelative$18,
  localize: localize$18,
  match: match$17,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};

function declension$5(scheme, count) {
  // scheme for count=1 exists
  if (scheme.one !== undefined && count === 1) {
    return scheme.one;
  }

  var rem10 = count % 10;
  var rem100 = count % 100; // 1, 21, 31, ...

  if (rem10 === 1 && rem100 !== 11) {
    return scheme.singularNominative.replace('{{count}}', String(count)); // 2, 3, 4, 22, 23, 24, 32 ...
  } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 > 20)) {
    return scheme.singularGenitive.replace('{{count}}', String(count)); // 5, 6, 7, 8, 9, 10, 11, ...
  } else {
    return scheme.pluralGenitive.replace('{{count}}', String(count));
  }
}

function buildLocalizeTokenFn$4(scheme) {
  return function (count, options) {
    if (options && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        if (scheme.future) {
          return declension$5(scheme.future, count);
        } else {
          return 'праз ' + declension$5(scheme.regular, count);
        }
      } else {
        if (scheme.past) {
          return declension$5(scheme.past, count);
        } else {
          return declension$5(scheme.regular, count) + ' таму';
        }
      }
    } else {
      return declension$5(scheme.regular, count);
    }
  };
}

var halfAMinute = function (_, options) {
  if (options && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'праз паўхвіліны';
    } else {
      return 'паўхвіліны таму';
    }
  }

  return 'паўхвіліны';
};

var formatDistanceLocale$15 = {
  lessThanXSeconds: buildLocalizeTokenFn$4({
    regular: {
      one: 'менш за секунду',
      singularNominative: 'менш за {{count}} секунду',
      singularGenitive: 'менш за {{count}} секунды',
      pluralGenitive: 'менш за {{count}} секунд'
    },
    future: {
      one: 'менш, чым праз секунду',
      singularNominative: 'менш, чым праз {{count}} секунду',
      singularGenitive: 'менш, чым праз {{count}} секунды',
      pluralGenitive: 'менш, чым праз {{count}} секунд'
    }
  }),
  xSeconds: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: '{{count}} секунда',
      singularGenitive: '{{count}} секунды',
      pluralGenitive: '{{count}} секунд'
    },
    past: {
      singularNominative: '{{count}} секунду таму',
      singularGenitive: '{{count}} секунды таму',
      pluralGenitive: '{{count}} секунд таму'
    },
    future: {
      singularNominative: 'праз {{count}} секунду',
      singularGenitive: 'праз {{count}} секунды',
      pluralGenitive: 'праз {{count}} секунд'
    }
  }),
  halfAMinute: halfAMinute,
  lessThanXMinutes: buildLocalizeTokenFn$4({
    regular: {
      one: 'менш за хвіліну',
      singularNominative: 'менш за {{count}} хвіліну',
      singularGenitive: 'менш за {{count}} хвіліны',
      pluralGenitive: 'менш за {{count}} хвілін'
    },
    future: {
      one: 'менш, чым праз хвіліну',
      singularNominative: 'менш, чым праз {{count}} хвіліну',
      singularGenitive: 'менш, чым праз {{count}} хвіліны',
      pluralGenitive: 'менш, чым праз {{count}} хвілін'
    }
  }),
  xMinutes: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: '{{count}} хвіліна',
      singularGenitive: '{{count}} хвіліны',
      pluralGenitive: '{{count}} хвілін'
    },
    past: {
      singularNominative: '{{count}} хвіліну таму',
      singularGenitive: '{{count}} хвіліны таму',
      pluralGenitive: '{{count}} хвілін таму'
    },
    future: {
      singularNominative: 'праз {{count}} хвіліну',
      singularGenitive: 'праз {{count}} хвіліны',
      pluralGenitive: 'праз {{count}} хвілін'
    }
  }),
  aboutXHours: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: 'каля {{count}} гадзіны',
      singularGenitive: 'каля {{count}} гадзін',
      pluralGenitive: 'каля {{count}} гадзін'
    },
    future: {
      singularNominative: 'прыблізна праз {{count}} гадзіну',
      singularGenitive: 'прыблізна праз {{count}} гадзіны',
      pluralGenitive: 'прыблізна праз {{count}} гадзін'
    }
  }),
  xHours: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: '{{count}} гадзіна',
      singularGenitive: '{{count}} гадзіны',
      pluralGenitive: '{{count}} гадзін'
    },
    past: {
      singularNominative: '{{count}} гадзіну таму',
      singularGenitive: '{{count}} гадзіны таму',
      pluralGenitive: '{{count}} гадзін таму'
    },
    future: {
      singularNominative: 'праз {{count}} гадзіну',
      singularGenitive: 'праз {{count}} гадзіны',
      pluralGenitive: 'праз {{count}} гадзін'
    }
  }),
  xDays: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: '{{count}} дзень',
      singularGenitive: '{{count}} дні',
      pluralGenitive: '{{count}} дзён'
    }
  }),
  aboutXWeeks: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: 'каля {{count}} месяца',
      // TODO
      singularGenitive: 'каля {{count}} месяцаў',
      // TODO
      pluralGenitive: 'каля {{count}} месяцаў' // TODO

    },
    future: {
      singularNominative: 'прыблізна праз {{count}} месяц',
      // TODO
      singularGenitive: 'прыблізна праз {{count}} месяцы',
      // TODO
      pluralGenitive: 'прыблізна праз {{count}} месяцаў' // TODO

    }
  }),
  xWeeks: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: '{{count}} месяц',
      singularGenitive: '{{count}} месяцы',
      pluralGenitive: '{{count}} месяцаў'
    }
  }),
  aboutXMonths: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: 'каля {{count}} месяца',
      singularGenitive: 'каля {{count}} месяцаў',
      pluralGenitive: 'каля {{count}} месяцаў'
    },
    future: {
      singularNominative: 'прыблізна праз {{count}} месяц',
      singularGenitive: 'прыблізна праз {{count}} месяцы',
      pluralGenitive: 'прыблізна праз {{count}} месяцаў'
    }
  }),
  xMonths: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: '{{count}} месяц',
      singularGenitive: '{{count}} месяцы',
      pluralGenitive: '{{count}} месяцаў'
    }
  }),
  aboutXYears: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: 'каля {{count}} года',
      singularGenitive: 'каля {{count}} гадоў',
      pluralGenitive: 'каля {{count}} гадоў'
    },
    future: {
      singularNominative: 'прыблізна праз {{count}} год',
      singularGenitive: 'прыблізна праз {{count}} гады',
      pluralGenitive: 'прыблізна праз {{count}} гадоў'
    }
  }),
  xYears: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: '{{count}} год',
      singularGenitive: '{{count}} гады',
      pluralGenitive: '{{count}} гадоў'
    }
  }),
  overXYears: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: 'больш за {{count}} год',
      singularGenitive: 'больш за {{count}} гады',
      pluralGenitive: 'больш за {{count}} гадоў'
    },
    future: {
      singularNominative: 'больш, чым праз {{count}} год',
      singularGenitive: 'больш, чым праз {{count}} гады',
      pluralGenitive: 'больш, чым праз {{count}} гадоў'
    }
  }),
  almostXYears: buildLocalizeTokenFn$4({
    regular: {
      singularNominative: 'амаль {{count}} год',
      singularGenitive: 'амаль {{count}} гады',
      pluralGenitive: 'амаль {{count}} гадоў'
    },
    future: {
      singularNominative: 'амаль праз {{count}} год',
      singularGenitive: 'амаль праз {{count}} гады',
      pluralGenitive: 'амаль праз {{count}} гадоў'
    }
  })
};

var formatDistance$17 = function (token, count, options) {
  options = options || {};
  return formatDistanceLocale$15[token](count, options);
};

var dateFormats$1e = {
  full: "EEEE, d MMMM y 'г.'",
  long: "d MMMM y 'г.'",
  medium: "d MMM y 'г.'",
  short: 'dd.MM.y'
};
var timeFormats$1e = {
  full: 'H:mm:ss zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$1e = {
  any: '{{date}}, {{time}}'
};
var formatLong$1e = {
  date: buildFormatLongFn({
    formats: dateFormats$1e,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1e,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1e,
    defaultWidth: 'any'
  })
};

// See issue: https://github.com/date-fns/date-fns/issues/376

function isSameUTCWeek(dirtyDateLeft, dirtyDateRight, options) {
  requiredArgs(2, arguments);
  var dateLeftStartOfWeek = startOfUTCWeek(dirtyDateLeft, options);
  var dateRightStartOfWeek = startOfUTCWeek(dirtyDateRight, options);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}

var accusativeWeekdays$6 = ['нядзелю', 'панядзелак', 'аўторак', 'сераду', 'чацвер', 'пятніцу', 'суботу'];

function lastWeek$7(day) {
  var weekday = accusativeWeekdays$6[day];

  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у мінулую " + weekday + " а' p";

    case 1:
    case 2:
    case 4:
      return "'у мінулы " + weekday + " а' p";
  }
}

function thisWeek$7(day) {
  var weekday = accusativeWeekdays$6[day];
  return "'у " + weekday + " а' p";
}

function nextWeek$7(day) {
  var weekday = accusativeWeekdays$6[day];

  switch (day) {
    case 0:
    case 3:
    case 5:
    case 6:
      return "'у наступную " + weekday + " а' p";

    case 1:
    case 2:
    case 4:
      return "'у наступны " + weekday + " а' p";
  }
}

var lastWeekFormat = function (dirtyDate, baseDate, options) {
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();

  if (isSameUTCWeek(date, baseDate, options)) {
    return thisWeek$7(day);
  } else {
    return lastWeek$7(day);
  }
};

var nextWeekFormat = function (dirtyDate, baseDate, options) {
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();

  if (isSameUTCWeek(date, baseDate, options)) {
    return thisWeek$7(day);
  } else {
    return nextWeek$7(day);
  }
};

var formatRelativeLocale$17 = {
  lastWeek: lastWeekFormat,
  yesterday: "'учора а' p",
  today: "'сёння а' p",
  tomorrow: "'заўтра а' p",
  nextWeek: nextWeekFormat,
  other: 'P'
};

var formatRelative$17 = function (token, date, baseDate, options) {
  var format = formatRelativeLocale$17[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
};

var eraValues$17 = {
  narrow: ['да н.э.', 'н.э.'],
  abbreviated: ['да н. э.', 'н. э.'],
  wide: ['да нашай эры', 'нашай эры']
};
var quarterValues$17 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1-ы кв.', '2-і кв.', '3-і кв.', '4-ы кв.'],
  wide: ['1-ы квартал', '2-і квартал', '3-і квартал', '4-ы квартал']
};
var monthValues$17 = {
  narrow: ['С', 'Л', 'С', 'К', 'М', 'Ч', 'Л', 'Ж', 'В', 'К', 'Л', 'С'],
  abbreviated: ['студз.', 'лют.', 'сак.', 'крас.', 'май', 'чэрв.', 'ліп.', 'жн.', 'вер.', 'кастр.', 'ліст.', 'снеж.'],
  wide: ['студзень', 'люты', 'сакавік', 'красавік', 'май', 'чэрвень', 'ліпень', 'жнівень', 'верасень', 'кастрычнік', 'лістапад', 'снежань']
};
var formattingMonthValues$h = {
  narrow: ['С', 'Л', 'С', 'К', 'М', 'Ч', 'Л', 'Ж', 'В', 'К', 'Л', 'С'],
  abbreviated: ['студз.', 'лют.', 'сак.', 'крас.', 'мая', 'чэрв.', 'ліп.', 'жн.', 'вер.', 'кастр.', 'ліст.', 'снеж.'],
  wide: ['студзеня', 'лютага', 'сакавіка', 'красавіка', 'мая', 'чэрвеня', 'ліпеня', 'жніўня', 'верасня', 'кастрычніка', 'лістапада', 'снежня']
};
var dayValues$17 = {
  narrow: ['Н', 'П', 'А', 'С', 'Ч', 'П', 'С'],
  short: ['нд', 'пн', 'аў', 'ср', 'чц', 'пт', 'сб'],
  abbreviated: ['нядз', 'пан', 'аўт', 'сер', 'чац', 'пят', 'суб'],
  wide: ['нядзеля', 'панядзелак', 'аўторак', 'серада', 'чацвер', 'пятніца', 'субота']
};
var dayPeriodValues$16 = {
  narrow: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'поўн.',
    noon: 'поўд.',
    morning: 'ран.',
    afternoon: 'дзень',
    evening: 'веч.',
    night: 'ноч'
  },
  abbreviated: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'поўн.',
    noon: 'поўд.',
    morning: 'ран.',
    afternoon: 'дзень',
    evening: 'веч.',
    night: 'ноч'
  },
  wide: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'поўнач',
    noon: 'поўдзень',
    morning: 'раніца',
    afternoon: 'дзень',
    evening: 'вечар',
    night: 'ноч'
  }
};
var formattingDayPeriodValues$T = {
  narrow: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'поўн.',
    noon: 'поўд.',
    morning: 'ран.',
    afternoon: 'дня',
    evening: 'веч.',
    night: 'ночы'
  },
  abbreviated: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'поўн.',
    noon: 'поўд.',
    morning: 'ран.',
    afternoon: 'дня',
    evening: 'веч.',
    night: 'ночы'
  },
  wide: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'поўнач',
    noon: 'поўдзень',
    morning: 'раніцы',
    afternoon: 'дня',
    evening: 'вечара',
    night: 'ночы'
  }
};

var ordinalNumber$17 = function (dirtyNumber, dirtyOptions) {
  var options = dirtyOptions || {};
  var unit = String(options.unit);
  var number = Number(dirtyNumber);
  var suffix;
  /** Though it's an incorrect ordinal form of a date we use it here for consistency with other similar locales (ru, uk)
   *  For date-month combinations should be used `d` formatter.
   *  Correct:   `d MMMM` (4 верасня)
   *  Incorrect: `do MMMM` (4-га верасня)
   *
   *  But following the consistency leads to mistakes for literal uses of `do` formatter (ordinal day of month).
   *  So for phrase "5th day of month" (`do дзень месяца`)
   *  library will produce:            `5-га дзень месяца`
   *  but correct spelling should be:  `5-ы дзень месяца`
   *
   *  So I guess there should be a stand-alone and a formatting version of "day of month" formatters
   */

  if (unit === 'date') {
    suffix = '-га';
  } else if (unit === 'hour' || unit === 'minute' || unit === 'second') {
    suffix = '-я';
  } else {
    suffix = (number % 10 === 2 || number % 10 === 3) && number % 100 !== 12 && number % 100 !== 13 ? '-і' : '-ы';
  }

  return number + suffix;
};

var localize$17 = {
  ordinalNumber: ordinalNumber$17,
  era: buildLocalizeFn({
    values: eraValues$17,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$17,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$17,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$h,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$17,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$16,
    defaultWidth: 'any',
    formattingValues: formattingDayPeriodValues$T,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$16 = /^(\d+)(-?(е|я|га|і|ы|ае|ая|яя|шы|гі|ці|ты|мы))?/i;
var parseOrdinalNumberPattern$16 = /\d+/i;
var matchEraPatterns$16 = {
  narrow: /^((да )?н\.?\s?э\.?)/i,
  abbreviated: /^((да )?н\.?\s?э\.?)/i,
  wide: /^(да нашай эры|нашай эры|наша эра)/i
};
var parseEraPatterns$16 = {
  any: [/^д/i, /^н/i]
};
var matchQuarterPatterns$16 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[ыі]?)? кв.?/i,
  wide: /^[1234](-?[ыі]?)? квартал/i
};
var parseQuarterPatterns$16 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$16 = {
  narrow: /^[слкмчжв]/i,
  abbreviated: /^(студз|лют|сак|крас|ма[йя]|чэрв|ліп|жн|вер|кастр|ліст|снеж)\.?/i,
  wide: /^(студзен[ья]|лют(ы|ага)|сакавіка?|красавіка?|ма[йя]|чэрвен[ья]|ліпен[ья]|жні(вень|ўня)|верас(ень|ня)|кастрычніка?|лістапада?|снеж(ань|ня))/i
};
var parseMonthPatterns$16 = {
  narrow: [/^с/i, /^л/i, /^с/i, /^к/i, /^м/i, /^ч/i, /^л/i, /^ж/i, /^в/i, /^к/i, /^л/i, /^с/i],
  any: [/^ст/i, /^лю/i, /^са/i, /^кр/i, /^ма/i, /^ч/i, /^ліп/i, /^ж/i, /^в/i, /^ка/i, /^ліс/i, /^сн/i]
};
var matchDayPatterns$16 = {
  narrow: /^[нпасч]/i,
  short: /^(нд|ня|пн|па|аў|ат|ср|се|чц|ча|пт|пя|сб|су)\.?/i,
  abbreviated: /^(нядз?|ндз|пнд|пан|аўт|срд|сер|чцв|чац|птн|пят|суб).?/i,
  wide: /^(нядзел[яі]|панядзел(ак|ка)|аўтор(ак|ка)|серад[аы]|чацв(ер|ярга)|пятніц[аы]|субот[аы])/i
};
var parseDayPatterns$16 = {
  narrow: [/^н/i, /^п/i, /^а/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^н/i, /^п[ан]/i, /^а/i, /^с[ер]/i, /^ч/i, /^п[ят]/i, /^с[уб]/i]
};
var matchDayPeriodPatterns$16 = {
  narrow: /^([дп]п|поўн\.?|поўд\.?|ран\.?|дзень|дня|веч\.?|ночы?)/i,
  abbreviated: /^([дп]п|поўн\.?|поўд\.?|ран\.?|дзень|дня|веч\.?|ночы?)/i,
  wide: /^([дп]п|поўнач|поўдзень|раніц[аы]|дзень|дня|вечара?|ночы?)/i
};
var parseDayPeriodPatterns$16 = {
  any: {
    am: /^дп/i,
    pm: /^пп/i,
    midnight: /^поўн/i,
    noon: /^поўд/i,
    morning: /^р/i,
    afternoon: /^д[зн]/i,
    evening: /^в/i,
    night: /^н/i
  }
};
var match$16 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$16,
    parsePattern: parseOrdinalNumberPattern$16,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$16,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$16,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$16,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$16,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return Number(index) + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$16,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$16,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$16,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$16,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$16,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPeriodPatterns$16,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Belarusian locale.
 * @language Belarusian
 * @iso-639-2 bel
 * @author Kiryl Anokhin [@alyrik]{@link https://github.com/alyrik}
 * @author Martin Wind [@arvigeus]{@link https://github.com/mawi12345}
 */

var locale$1g = {
  code: 'be',
  formatDistance: formatDistance$17,
  formatLong: formatLong$1e,
  formatRelative: formatRelative$17,
  localize: localize$17,
  match: match$16,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$14 = {
  lessThanXSeconds: {
    one: 'по-малко от секунда',
    other: 'по-малко от {{count}} секунди'
  },
  xSeconds: {
    one: '1 секунда',
    other: '{{count}} секунди'
  },
  halfAMinute: 'половин минута',
  lessThanXMinutes: {
    one: 'по-малко от минута',
    other: 'по-малко от {{count}} минути'
  },
  xMinutes: {
    one: '1 минута',
    other: '{{count}} минути'
  },
  aboutXHours: {
    one: 'около час',
    other: 'около {{count}} часа'
  },
  xHours: {
    one: '1 час',
    other: '{{count}} часа'
  },
  xDays: {
    one: '1 ден',
    other: '{{count}} дни'
  },
  aboutXWeeks: {
    one: 'около седмица',
    other: 'около {{count}} седмици'
  },
  xWeeks: {
    one: '1 седмица',
    other: '{{count}} седмици'
  },
  aboutXMonths: {
    one: 'около месец',
    other: 'около {{count}} месеца'
  },
  xMonths: {
    one: '1 месец',
    other: '{{count}} месеца'
  },
  aboutXYears: {
    one: 'около година',
    other: 'около {{count}} години'
  },
  xYears: {
    one: '1 година',
    other: '{{count}} години'
  },
  overXYears: {
    one: 'над година',
    other: 'над {{count}} години'
  },
  almostXYears: {
    one: 'почти година',
    other: 'почти {{count}} години'
  }
};

var formatDistance$16 = function (token, count) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var usageGroup = formatDistanceLocale$14[token];
  var result;

  if (typeof usageGroup === 'string') {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else {
    result = usageGroup.other.replace('{{count}}', String(count));
  }

  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'след ' + result;
    } else {
      return 'преди ' + result;
    }
  }

  return result;
};

var dateFormats$1d = {
  full: 'EEEE, dd MMMM yyyy',
  long: 'dd MMMM yyyy',
  medium: 'dd MMM yyyy',
  short: 'dd/MM/yyyy'
};
var timeFormats$1d = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$1d = {
  any: '{{date}} {{time}}'
};
var formatLong$1d = {
  date: buildFormatLongFn({
    formats: dateFormats$1d,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1d,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1d,
    defaultWidth: 'any'
  })
};

// Adapted from the `ru` translation
var weekdays$3 = ['неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък', 'петък', 'събота'];

function lastWeek$6(day) {
  var weekday = weekdays$3[day];

  switch (day) {
    case 0:
    case 3:
    case 6:
      return "'миналата " + weekday + " в' p";

    case 1:
    case 2:
    case 4:
    case 5:
      return "'миналия " + weekday + " в' p";
  }
}

function thisWeek$6(day) {
  var weekday = weekdays$3[day];

  if (day === 2
  /* Tue */
  ) {
      return "'във " + weekday + " в' p";
    } else {
    return "'в " + weekday + " в' p";
  }
}

function nextWeek$6(day) {
  var weekday = weekdays$3[day];

  switch (day) {
    case 0:
    case 3:
    case 6:
      return "'следващата " + weekday + " в' p";

    case 1:
    case 2:
    case 4:
    case 5:
      return "'следващия " + weekday + " в' p";
  }
}

var lastWeekFormatToken = function (dirtyDate, baseDate, options) {
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();

  if (isSameUTCWeek(date, baseDate, options)) {
    return thisWeek$6(day);
  } else {
    return lastWeek$6(day);
  }
};

var nextWeekFormatToken = function (dirtyDate, baseDate, options) {
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();

  if (isSameUTCWeek(date, baseDate, options)) {
    return thisWeek$6(day);
  } else {
    return nextWeek$6(day);
  }
};

var formatRelativeLocale$16 = {
  lastWeek: lastWeekFormatToken,
  yesterday: "'вчера в' p",
  today: "'днес в' p",
  tomorrow: "'утре в' p",
  nextWeek: nextWeekFormatToken,
  other: 'P'
};

var formatRelative$16 = function (token, date, baseDate, options) {
  var format = formatRelativeLocale$16[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
};

var eraValues$16 = {
  narrow: ['пр.н.е.', 'н.е.'],
  abbreviated: ['преди н. е.', 'н. е.'],
  wide: ['преди новата ера', 'новата ера']
};
var quarterValues$16 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1-во тримес.', '2-ро тримес.', '3-то тримес.', '4-то тримес.'],
  wide: ['1-во тримесечие', '2-ро тримесечие', '3-то тримесечие', '4-то тримесечие']
};
var monthValues$16 = {
  abbreviated: ['яну', 'фев', 'мар', 'апр', 'май', 'юни', 'юли', 'авг', 'сеп', 'окт', 'ное', 'дек'],
  wide: ['януари', 'февруари', 'март', 'април', 'май', 'юни', 'юли', 'август', 'септември', 'октомври', 'ноември', 'декември']
};
var dayValues$16 = {
  narrow: ['Н', 'П', 'В', 'С', 'Ч', 'П', 'С'],
  short: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  abbreviated: ['нед', 'пон', 'вто', 'сря', 'чет', 'пет', 'съб'],
  wide: ['неделя', 'понеделник', 'вторник', 'сряда', 'четвъртък', 'петък', 'събота']
};
var dayPeriodValues$15 = {
  wide: {
    am: 'преди обяд',
    pm: 'след обяд',
    midnight: 'в полунощ',
    noon: 'на обяд',
    morning: 'сутринта',
    afternoon: 'следобед',
    evening: 'вечерта',
    night: 'през нощта'
  }
};

function isFeminine(unit) {
  return unit === 'year' || unit === 'week' || unit === 'minute' || unit === 'second';
}

function isNeuter(unit) {
  return unit === 'quarter';
}

function numberWithSuffix(number, unit, masculine, feminine, neuter) {
  var suffix = isNeuter(unit) ? neuter : isFeminine(unit) ? feminine : masculine;
  return number + '-' + suffix;
}

var ordinalNumber$16 = function (dirtyNumber) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var unit = String(options.unit);
  var number = Number(dirtyNumber);

  if (number === 0) {
    return numberWithSuffix(0, unit, 'ев', 'ева', 'ево');
  } else if (number % 1000 === 0) {
    return numberWithSuffix(number, unit, 'ен', 'на', 'но');
  } else if (number % 100 === 0) {
    return numberWithSuffix(number, unit, 'тен', 'тна', 'тно');
  }

  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return numberWithSuffix(number, unit, 'ви', 'ва', 'во');

      case 2:
        return numberWithSuffix(number, unit, 'ри', 'ра', 'ро');

      case 7:
      case 8:
        return numberWithSuffix(number, unit, 'ми', 'ма', 'мо');
    }
  }

  return numberWithSuffix(number, unit, 'ти', 'та', 'то');
};

var localize$16 = {
  ordinalNumber: ordinalNumber$16,
  era: buildLocalizeFn({
    values: eraValues$16,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$16,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$16,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$16,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$15,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$15 = /^(\d+)(-?[врмт][аи]|-?т?(ен|на)|-?(ев|ева))?/i;
var parseOrdinalNumberPattern$15 = /\d+/i;
var matchEraPatterns$15 = {
  narrow: /^((пр)?н\.?\s?е\.?)/i,
  abbreviated: /^((пр)?н\.?\s?е\.?)/i,
  wide: /^(преди новата ера|новата ера|нова ера)/i
};
var parseEraPatterns$15 = {
  any: [/^п/i, /^н/i]
};
var matchQuarterPatterns$15 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[врт]?o?)? тримес.?/i,
  wide: /^[1234](-?[врт]?о?)? тримесечие/i
};
var parseQuarterPatterns$15 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchDayPatterns$15 = {
  narrow: /^[нпвсч]/i,
  short: /^(нд|пн|вт|ср|чт|пт|сб)/i,
  abbreviated: /^(нед|пон|вто|сря|чет|пет|съб)/i,
  wide: /^(неделя|понеделник|вторник|сряда|четвъртък|петък|събота)/i
};
var parseDayPatterns$15 = {
  narrow: [/^н/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^н[ед]/i, /^п[он]/i, /^вт/i, /^ср/i, /^ч[ет]/i, /^п[ет]/i, /^с[ъб]/i]
};
var matchMonthPatterns$15 = {
  abbreviated: /^(яну|фев|мар|апр|май|юни|юли|авг|сеп|окт|ное|дек)/i,
  wide: /^(януари|февруари|март|април|май|юни|юли|август|септември|октомври|ноември|декември)/i
};
var parseMonthPatterns$15 = {
  any: [/^я/i, /^ф/i, /^мар/i, /^ап/i, /^май/i, /^юн/i, /^юл/i, /^ав/i, /^се/i, /^окт/i, /^но/i, /^де/i]
};
var matchDayPeriodPatterns$15 = {
  any: /^(преди о|след о|в по|на о|през|веч|сут|следо)/i
};
var parseDayPeriodPatterns$15 = {
  any: {
    am: /^преди о/i,
    pm: /^след о/i,
    midnight: /^в пол/i,
    noon: /^на об/i,
    morning: /^сут/i,
    afternoon: /^следо/i,
    evening: /^веч/i,
    night: /^през н/i
  }
};
var match$15 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$15,
    parsePattern: parseOrdinalNumberPattern$15,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$15,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$15,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$15,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$15,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return Number(index) + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$15,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$15,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$15,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$15,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$15,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$15,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Bulgarian locale.
 * @language Bulgarian
 * @iso-639-2 bul
 * @author Nikolay Stoynov [@arvigeus]{@link https://github.com/arvigeus}
 * @author Tsvetan Ovedenski [@fintara]{@link https://github.com/fintara}
 */

var locale$1f = {
  code: 'bg',
  formatDistance: formatDistance$16,
  formatLong: formatLong$1d,
  formatRelative: formatRelative$16,
  localize: localize$16,
  match: match$15,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var numberValues$1 = {
  locale: {
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
    '0': '০'
  },
  number: {
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9',
    '০': '0'
  }
};
var eraValues$15 = {
  narrow: ['খ্রিঃপূঃ', 'খ্রিঃ'],
  abbreviated: ['খ্রিঃপূর্ব', 'খ্রিঃ'],
  wide: ['খ্রিস্টপূর্ব', 'খ্রিস্টাব্দ']
};
var quarterValues$15 = {
  narrow: ['১', '২', '৩', '৪'],
  abbreviated: ['১ত্রৈ', '২ত্রৈ', '৩ত্রৈ', '৪ত্রৈ'],
  wide: ['১ম ত্রৈমাসিক', '২য় ত্রৈমাসিক', '৩য় ত্রৈমাসিক', '৪র্থ ত্রৈমাসিক']
};
var monthValues$15 = {
  narrow: ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্ট', 'অক্টো', 'নভে', 'ডিসে'],
  abbreviated: ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্ট', 'অক্টো', 'নভে', 'ডিসে'],
  wide: ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর']
};
var dayValues$15 = {
  narrow: ['র', 'সো', 'ম', 'বু', 'বৃ', 'শু', 'শ'],
  short: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'],
  abbreviated: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'],
  wide: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার ', 'শুক্রবার', 'শনিবার']
};
var dayPeriodValues$14 = {
  narrow: {
    am: 'পূ',
    pm: 'অপ',
    midnight: 'মধ্যরাত',
    noon: 'মধ্যাহ্ন',
    morning: 'সকাল',
    afternoon: 'বিকাল',
    evening: 'সন্ধ্যা',
    night: 'রাত'
  },
  abbreviated: {
    am: 'পূর্বাহ্ন',
    pm: 'অপরাহ্ন',
    midnight: 'মধ্যরাত',
    noon: 'মধ্যাহ্ন',
    morning: 'সকাল',
    afternoon: 'বিকাল',
    evening: 'সন্ধ্যা',
    night: 'রাত'
  },
  wide: {
    am: 'পূর্বাহ্ন',
    pm: 'অপরাহ্ন',
    midnight: 'মধ্যরাত',
    noon: 'মধ্যাহ্ন',
    morning: 'সকাল',
    afternoon: 'বিকাল',
    evening: 'সন্ধ্যা',
    night: 'রাত'
  }
};
var formattingDayPeriodValues$S = {
  narrow: {
    am: 'পূ',
    pm: 'অপ',
    midnight: 'মধ্যরাত',
    noon: 'মধ্যাহ্ন',
    morning: 'সকাল',
    afternoon: 'বিকাল',
    evening: 'সন্ধ্যা',
    night: 'রাত'
  },
  abbreviated: {
    am: 'পূর্বাহ্ন',
    pm: 'অপরাহ্ন',
    midnight: 'মধ্যরাত',
    noon: 'মধ্যাহ্ন',
    morning: 'সকাল',
    afternoon: 'বিকাল',
    evening: 'সন্ধ্যা',
    night: 'রাত'
  },
  wide: {
    am: 'পূর্বাহ্ন',
    pm: 'অপরাহ্ন',
    midnight: 'মধ্যরাত',
    noon: 'মধ্যাহ্ন',
    morning: 'সকাল',
    afternoon: 'বিকাল',
    evening: 'সন্ধ্যা',
    night: 'রাত'
  }
};

function dateOrdinalNumber(number, localeNumber) {
  if (number > 18 && number <= 31) {
    return localeNumber + 'শে';
  } else {
    switch (number) {
      case 1:
        return localeNumber + 'লা';

      case 2:
      case 3:
        return localeNumber + 'রা';

      case 4:
        return localeNumber + 'ঠা';

      default:
        return localeNumber + 'ই';
    }
  }
}

var ordinalNumber$15 = function (dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber);
  var localeNumber = numberToLocale$1(number);
  var unit = dirtyOptions === null || dirtyOptions === void 0 ? void 0 : dirtyOptions.unit;

  if (unit === 'date') {
    return dateOrdinalNumber(number, localeNumber);
  }

  if (number > 10 || number === 0) return localeNumber + 'তম';
  var rem10 = number % 10;

  switch (rem10) {
    case 2:
    case 3:
      return localeNumber + 'য়';

    case 4:
      return localeNumber + 'র্থ';

    case 6:
      return localeNumber + 'ষ্ঠ';

    default:
      return localeNumber + 'ম';
  }
}; // function localeToNumber(locale: string): number {
//   const enNumber = locale.toString().replace(/[১২৩৪৫৬৭৮৯০]/g, function (match) {
//     return numberValues.number[match as keyof typeof numberValues.number]
//   })
//   return Number(enNumber)
// }


function numberToLocale$1(enNumber) {
  return enNumber.toString().replace(/\d/g, function (match) {
    return numberValues$1.locale[match];
  });
}
var localize$15 = {
  ordinalNumber: ordinalNumber$15,
  era: buildLocalizeFn({
    values: eraValues$15,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$15,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$15,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$15,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$14,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$S,
    defaultFormattingWidth: 'wide'
  })
};

var formatDistanceLocale$13 = {
  lessThanXSeconds: {
    one: 'প্রায় ১ সেকেন্ড',
    other: 'প্রায় {{count}} সেকেন্ড'
  },
  xSeconds: {
    one: '১ সেকেন্ড',
    other: '{{count}} সেকেন্ড'
  },
  halfAMinute: 'আধ মিনিট',
  lessThanXMinutes: {
    one: 'প্রায় ১ মিনিট',
    other: 'প্রায় {{count}} মিনিট'
  },
  xMinutes: {
    one: '১ মিনিট',
    other: '{{count}} মিনিট'
  },
  aboutXHours: {
    one: 'প্রায় ১ ঘন্টা',
    other: 'প্রায় {{count}} ঘন্টা'
  },
  xHours: {
    one: '১ ঘন্টা',
    other: '{{count}} ঘন্টা'
  },
  xDays: {
    one: '১ দিন',
    other: '{{count}} দিন'
  },
  aboutXWeeks: {
    one: 'প্রায় ১ সপ্তাহ',
    other: 'প্রায় {{count}} সপ্তাহ'
  },
  xWeeks: {
    one: '১ সপ্তাহ',
    other: '{{count}} সপ্তাহ'
  },
  aboutXMonths: {
    one: 'প্রায় ১ মাস',
    other: 'প্রায় {{count}} মাস'
  },
  xMonths: {
    one: '১ মাস',
    other: '{{count}} মাস'
  },
  aboutXYears: {
    one: 'প্রায় ১ বছর',
    other: 'প্রায় {{count}} বছর'
  },
  xYears: {
    one: '১ বছর',
    other: '{{count}} বছর'
  },
  overXYears: {
    one: '১ বছরের বেশি',
    other: '{{count}} বছরের বেশি'
  },
  almostXYears: {
    one: 'প্রায় ১ বছর',
    other: 'প্রায় {{count}} বছর'
  }
};

var formatDistance$15 = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$13[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', numberToLocale$1(count));
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + ' এর মধ্যে';
    } else {
      return result + ' আগে';
    }
  }

  return result;
};

var dateFormats$1c = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats$1c = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$1c = {
  full: "{{date}} {{time}} 'সময়'",
  long: "{{date}} {{time}} 'সময়'",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$1c = {
  date: buildFormatLongFn({
    formats: dateFormats$1c,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1c,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1c,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$15 = {
  lastWeek: "'গত' eeee 'সময়' p",
  yesterday: "'গতকাল' 'সময়' p",
  today: "'আজ' 'সময়' p",
  tomorrow: "'আগামীকাল' 'সময়' p",
  nextWeek: "eeee 'সময়' p",
  other: 'P'
};

var formatRelative$15 = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$15[token];
};

var matchOrdinalNumberPattern$14 = /^(\d+)(ম|য়|র্থ|ষ্ঠ|শে|ই|তম)?/i;
var parseOrdinalNumberPattern$14 = /\d+/i;
var matchEraPatterns$14 = {
  narrow: /^(খ্রিঃপূঃ|খ্রিঃ)/i,
  abbreviated: /^(খ্রিঃপূর্ব|খ্রিঃ)/i,
  wide: /^(খ্রিস্টপূর্ব|খ্রিস্টাব্দ)/i
};
var parseEraPatterns$14 = {
  narrow: [/^খ্রিঃপূঃ/i, /^খ্রিঃ/i],
  abbreviated: [/^খ্রিঃপূর্ব/i, /^খ্রিঃ/i],
  wide: [/^খ্রিস্টপূর্ব/i, /^খ্রিস্টাব্দ/i]
};
var matchQuarterPatterns$14 = {
  narrow: /^[১২৩৪]/i,
  abbreviated: /^[১২৩৪]ত্রৈ/i,
  wide: /^[১২৩৪](ম|য়|র্থ)? ত্রৈমাসিক/i
};
var parseQuarterPatterns$14 = {
  any: [/১/i, /২/i, /৩/i, /৪/i]
};
var matchMonthPatterns$14 = {
  narrow: /^(জানু|ফেব্রু|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্ট|অক্টো|নভে|ডিসে)/i,
  abbreviated: /^(জানু|ফেব্রু|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্ট|অক্টো|নভে|ডিসে)/i,
  wide: /^(জানুয়ারি|ফেব্রুয়ারি|মার্চ|এপ্রিল|মে|জুন|জুলাই|আগস্ট|সেপ্টেম্বর|অক্টোবর|নভেম্বর|ডিসেম্বর)/i
};
var parseMonthPatterns$14 = {
  any: [/^জানু/i, /^ফেব্রু/i, /^মার্চ/i, /^এপ্রিল/i, /^মে/i, /^জুন/i, /^জুলাই/i, /^আগস্ট/i, /^সেপ্ট/i, /^অক্টো/i, /^নভে/i, /^ডিসে/i]
};
var matchDayPatterns$14 = {
  narrow: /^(র|সো|ম|বু|বৃ|শু|শ)+/i,
  short: /^(রবি|সোম|মঙ্গল|বুধ|বৃহ|শুক্র|শনি)+/i,
  abbreviated: /^(রবি|সোম|মঙ্গল|বুধ|বৃহ|শুক্র|শনি)+/i,
  wide: /^(রবিবার|সোমবার|মঙ্গলবার|বুধবার|বৃহস্পতিবার |শুক্রবার|শনিবার)+/i
};
var parseDayPatterns$14 = {
  narrow: [/^র/i, /^সো/i, /^ম/i, /^বু/i, /^বৃ/i, /^শু/i, /^শ/i],
  short: [/^রবি/i, /^সোম/i, /^মঙ্গল/i, /^বুধ/i, /^বৃহ/i, /^শুক্র/i, /^শনি/i],
  abbreviated: [/^রবি/i, /^সোম/i, /^মঙ্গল/i, /^বুধ/i, /^বৃহ/i, /^শুক্র/i, /^শনি/i],
  wide: [/^রবিবার/i, /^সোমবার/i, /^মঙ্গলবার/i, /^বুধবার/i, /^বৃহস্পতিবার /i, /^শুক্রবার/i, /^শনিবার/i]
};
var matchDayPeriodPatterns$14 = {
  narrow: /^(পূ|অপ|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i,
  abbreviated: /^(পূর্বাহ্ন|অপরাহ্ন|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i,
  wide: /^(পূর্বাহ্ন|অপরাহ্ন|মধ্যরাত|মধ্যাহ্ন|সকাল|বিকাল|সন্ধ্যা|রাত)/i
};
var parseDayPeriodPatterns$14 = {
  any: {
    am: /^পূ/i,
    pm: /^অপ/i,
    midnight: /^মধ্যরাত/i,
    noon: /^মধ্যাহ্ন/i,
    morning: /সকাল/i,
    afternoon: /বিকাল/i,
    evening: /সন্ধ্যা/i,
    night: /রাত/i
  }
};
var match$14 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$14,
    parsePattern: parseOrdinalNumberPattern$14,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$14,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$14,
    defaultParseWidth: 'wide'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$14,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$14,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$14,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$14,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$14,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$14,
    defaultParseWidth: 'wide'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$14,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPeriodPatterns$14,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Bengali locale.
 * @language Bengali
 * @iso-639-2 ben
 * @author Touhidur Rahman [@touhidrahman]{@link https://github.com/touhidrahman}
 * @author Farhad Yasir [@nutboltu]{@link https://github.com/nutboltu}
 */

var locale$1e = {
  code: 'bn',
  formatDistance: formatDistance$15,
  formatLong: formatLong$1c,
  formatRelative: formatRelative$15,
  localize: localize$15,
  match: match$14,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$12 = {
  lessThanXSeconds: {
    one: {
      standalone: 'manje od 1 sekunde',
      withPrepositionAgo: 'manje od 1 sekunde',
      withPrepositionIn: 'manje od 1 sekundu'
    },
    dual: 'manje od {{count}} sekunde',
    other: 'manje od {{count}} sekundi'
  },
  xSeconds: {
    one: {
      standalone: '1 sekunda',
      withPrepositionAgo: '1 sekunde',
      withPrepositionIn: '1 sekundu'
    },
    dual: '{{count}} sekunde',
    other: '{{count}} sekundi'
  },
  halfAMinute: 'pola minute',
  lessThanXMinutes: {
    one: {
      standalone: 'manje od 1 minute',
      withPrepositionAgo: 'manje od 1 minute',
      withPrepositionIn: 'manje od 1 minutu'
    },
    dual: 'manje od {{count}} minute',
    other: 'manje od {{count}} minuta'
  },
  xMinutes: {
    one: {
      standalone: '1 minuta',
      withPrepositionAgo: '1 minute',
      withPrepositionIn: '1 minutu'
    },
    dual: '{{count}} minute',
    other: '{{count}} minuta'
  },
  aboutXHours: {
    one: {
      standalone: 'oko 1 sat',
      withPrepositionAgo: 'oko 1 sat',
      withPrepositionIn: 'oko 1 sat'
    },
    dual: 'oko {{count}} sata',
    other: 'oko {{count}} sati'
  },
  xHours: {
    one: {
      standalone: '1 sat',
      withPrepositionAgo: '1 sat',
      withPrepositionIn: '1 sat'
    },
    dual: '{{count}} sata',
    other: '{{count}} sati'
  },
  xDays: {
    one: {
      standalone: '1 dan',
      withPrepositionAgo: '1 dan',
      withPrepositionIn: '1 dan'
    },
    dual: '{{count}} dana',
    other: '{{count}} dana'
  },
  aboutXWeeks: {
    one: {
      standalone: 'oko 1 sedmicu',
      withPrepositionAgo: 'oko 1 sedmicu',
      withPrepositionIn: 'oko 1 sedmicu'
    },
    dual: 'oko {{count}} sedmice',
    other: 'oko {{count}} sedmice'
  },
  xWeeks: {
    one: {
      standalone: '1 sedmicu',
      withPrepositionAgo: '1 sedmicu',
      withPrepositionIn: '1 sedmicu'
    },
    dual: '{{count}} sedmice',
    other: '{{count}} sedmice'
  },
  aboutXMonths: {
    one: {
      standalone: 'oko 1 mjesec',
      withPrepositionAgo: 'oko 1 mjesec',
      withPrepositionIn: 'oko 1 mjesec'
    },
    dual: 'oko {{count}} mjeseca',
    other: 'oko {{count}} mjeseci'
  },
  xMonths: {
    one: {
      standalone: '1 mjesec',
      withPrepositionAgo: '1 mjesec',
      withPrepositionIn: '1 mjesec'
    },
    dual: '{{count}} mjeseca',
    other: '{{count}} mjeseci'
  },
  aboutXYears: {
    one: {
      standalone: 'oko 1 godinu',
      withPrepositionAgo: 'oko 1 godinu',
      withPrepositionIn: 'oko 1 godinu'
    },
    dual: 'oko {{count}} godine',
    other: 'oko {{count}} godina'
  },
  xYears: {
    one: {
      standalone: '1 godina',
      withPrepositionAgo: '1 godine',
      withPrepositionIn: '1 godinu'
    },
    dual: '{{count}} godine',
    other: '{{count}} godina'
  },
  overXYears: {
    one: {
      standalone: 'preko 1 godinu',
      withPrepositionAgo: 'preko 1 godinu',
      withPrepositionIn: 'preko 1 godinu'
    },
    dual: 'preko {{count}} godine',
    other: 'preko {{count}} godina'
  },
  almostXYears: {
    one: {
      standalone: 'gotovo 1 godinu',
      withPrepositionAgo: 'gotovo 1 godinu',
      withPrepositionIn: 'gotovo 1 godinu'
    },
    dual: 'gotovo {{count}} godine',
    other: 'gotovo {{count}} godina'
  }
};

var formatDistance$14 = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$12[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        result = tokenValue.one.withPrepositionIn;
      } else {
        result = tokenValue.one.withPrepositionAgo;
      }
    } else {
      result = tokenValue.one.standalone;
    }
  } else if (count % 10 > 1 && count % 10 < 5 && // if last digit is between 2 and 4
  String(count).substr(-2, 1) !== '1' // unless the 2nd to last digit is "1"
  ) {
      result = tokenValue.dual.replace('{{count}}', String(count));
    } else {
    result = tokenValue.other.replace('{{count}}', String(count));
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'za ' + result;
    } else {
      return 'prije ' + result;
    }
  }

  return result;
};

var dateFormats$1b = {
  full: 'EEEE, d. MMMM yyyy.',
  long: 'd. MMMM yyyy.',
  medium: 'd. MMM yy.',
  short: 'dd. MM. yy.'
};
var timeFormats$1b = {
  full: 'HH:mm:ss (zzzz)',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$1b = {
  full: "{{date}} 'u' {{time}}",
  long: "{{date}} 'u' {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$1b = {
  date: buildFormatLongFn({
    formats: dateFormats$1b,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1b,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1b,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$14 = {
  lastWeek: function (date) {
    switch (date.getUTCDay()) {
      case 0:
        return "'prošle nedjelje u' p";

      case 3:
        return "'prošle srijede u' p";

      case 6:
        return "'prošle subote u' p";

      default:
        return "'prošli' EEEE 'u' p";
    }
  },
  yesterday: "'juče u' p",
  today: "'danas u' p",
  tomorrow: "'sutra u' p",
  nextWeek: function (date) {
    switch (date.getUTCDay()) {
      case 0:
        return "'sljedeće nedjelje u' p";

      case 3:
        return "'sljedeću srijedu u' p";

      case 6:
        return "'sljedeću subotu u' p";

      default:
        return "'sljedeći' EEEE 'u' p";
    }
  },
  other: 'P'
};

var formatRelative$14 = function (token, date, _baseDate, _options) {
  var format = formatRelativeLocale$14[token];

  if (typeof format === 'function') {
    return format(date);
  }

  return format;
};

var eraValues$14 = {
  narrow: ['pr.n.e.', 'AD'],
  abbreviated: ['pr. Hr.', 'po. Hr.'],
  wide: ['Prije Hrista', 'Poslije Hrista']
};
var quarterValues$14 = {
  narrow: ['1.', '2.', '3.', '4.'],
  abbreviated: ['1. kv.', '2. kv.', '3. kv.', '4. kv.'],
  wide: ['1. kvartal', '2. kvartal', '3. kvartal', '4. kvartal']
};
var monthValues$14 = {
  narrow: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
  abbreviated: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
  wide: ['januar', 'februar', 'mart', 'april', 'maj', 'juni', 'juli', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar']
};
var formattingMonthValues$g = {
  narrow: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
  abbreviated: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
  wide: ['januar', 'februar', 'mart', 'april', 'maj', 'juni', 'juli', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar']
};
var dayValues$14 = {
  narrow: ['N', 'P', 'U', 'S', 'Č', 'P', 'S'],
  short: ['ned', 'pon', 'uto', 'sre', 'čet', 'pet', 'sub'],
  abbreviated: ['ned', 'pon', 'uto', 'sre', 'čet', 'pet', 'sub'],
  wide: ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota']
};
var dayPeriodValues$13 = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutru',
    afternoon: 'popodne',
    evening: 'uveče',
    night: 'noću'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutru',
    afternoon: 'popodne',
    evening: 'uveče',
    night: 'noću'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutru',
    afternoon: 'poslije podne',
    evening: 'uveče',
    night: 'noću'
  }
};
var formattingDayPeriodValues$R = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutru',
    afternoon: 'popodne',
    evening: 'uveče',
    night: 'noću'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutru',
    afternoon: 'popodne',
    evening: 'uveče',
    night: 'noću'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutru',
    afternoon: 'poslije podne',
    evening: 'uveče',
    night: 'noću'
  }
};

var ordinalNumber$14 = function (dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return String(number) + '.';
};

var localize$14 = {
  ordinalNumber: ordinalNumber$14,
  era: buildLocalizeFn({
    values: eraValues$14,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$14,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$14,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$g,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$14,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$13,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$R,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$13 = /^(\d+)\./i;
var parseOrdinalNumberPattern$13 = /\d+/i;
var matchEraPatterns$13 = {
  narrow: /^(pr\.n\.e\.|AD)/i,
  abbreviated: /^(pr\.\s?Hr\.|po\.\s?Hr\.)/i,
  wide: /^(Prije Hrista|prije nove ere|Poslije Hrista|nova era)/i
};
var parseEraPatterns$13 = {
  any: [/^pr/i, /^(po|nova)/i]
};
var matchQuarterPatterns$13 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\.\s?kv\.?/i,
  wide: /^[1234]\. kvartal/i
};
var parseQuarterPatterns$13 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$13 = {
  narrow: /^(10|11|12|[123456789])\./i,
  abbreviated: /^(jan|feb|mar|apr|maj|jun|jul|avg|sep|okt|nov|dec)/i,
  wide: /^((januar|januara)|(februar|februara)|(mart|marta)|(april|aprila)|(maj|maja)|(juni|juna)|(juli|jula)|(avgust|avgusta)|(septembar|septembra)|(oktobar|oktobra)|(novembar|novembra)|(decembar|decembra))/i
};
var parseMonthPatterns$13 = {
  narrow: [/^1/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^7/i, /^8/i, /^9/i, /^10/i, /^11/i, /^12/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^avg/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$13 = {
  narrow: /^[npusčc]/i,
  short: /^(ned|pon|uto|sre|(čet|cet)|pet|sub)/i,
  abbreviated: /^(ned|pon|uto|sre|(čet|cet)|pet|sub)/i,
  wide: /^(nedjelja|ponedjeljak|utorak|srijeda|(četvrtak|cetvrtak)|petak|subota)/i
};
var parseDayPatterns$13 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns$13 = {
  any: /^(am|pm|ponoc|ponoć|(po)?podne|uvece|uveče|noću|poslije podne|ujutru)/i
};
var parseDayPeriodPatterns$13 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^pono/i,
    noon: /^pod/i,
    morning: /jutro/i,
    afternoon: /(poslije\s|po)+podne/i,
    evening: /(uvece|uveče)/i,
    night: /(nocu|noću)/i
  }
};
var match$13 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$13,
    parsePattern: parseOrdinalNumberPattern$13,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$13,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$13,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$13,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$13,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$13,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$13,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$13,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$13,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$13,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$13,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Bosnian locale.
 * @language Bosnian
 * @iso-639-2 bos
 * @author Branislav Lazić [@branislavlazic]{@link https://github.com/branislavlazic}
 */

var locale$1d = {
  code: 'bs',
  formatDistance: formatDistance$14,
  formatLong: formatLong$1b,
  formatRelative: formatRelative$14,
  localize: localize$14,
  match: match$13,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

/**
 * Davant de les xifres que es diuen amb vocal inicial, 1 i 11, s'apostrofen els articles el i la i la preposició de igual que si estiguessin escrits amb lletres.
 *    l'1 de juliol ('l'u')
 *    l'11 de novembre ('l'onze')
 *    l'11a clàusula del contracte ('l'onzena')
 *    la contractació d'11 jugadors ('d'onze')
 *    l'aval d'11.000 socis ('d'onze mil')
 *
 * Reference: https://aplicacions.llengua.gencat.cat/llc/AppJava/index.html?input_cercar=apostrofaci%25F3+davant+xifres&action=Principal&method=detall_completa&numPagina=1&idHit=11236&database=FITXES_PUB&tipusFont=Fitxes%20de%20l%27Optimot&idFont=11236&titol=apostrofaci%F3%20davant%20de%20xifres%20%2F%20apostrofaci%F3%20davant%20de%201%20i%2011&numeroResultat=1&clickLink=detall&tipusCerca=cerca.normes
 */
var formatDistanceLocale$11 = {
  lessThanXSeconds: {
    one: "menys d'un segon",
    eleven: "menys d'onze segons",
    other: 'menys de {{count}} segons'
  },
  xSeconds: {
    one: '1 segon',
    other: '{{count}} segons'
  },
  halfAMinute: 'mig minut',
  lessThanXMinutes: {
    one: "menys d'un minut",
    eleven: "menys d'onze minuts",
    other: 'menys de {{count}} minuts'
  },
  xMinutes: {
    one: '1 minut',
    other: '{{count}} minuts'
  },
  aboutXHours: {
    one: 'aproximadament una hora',
    other: 'aproximadament {{count}} hores'
  },
  xHours: {
    one: '1 hora',
    other: '{{count}} hores'
  },
  xDays: {
    one: '1 dia',
    other: '{{count}} dies'
  },
  aboutXWeeks: {
    one: 'aproximadament una setmana',
    other: 'aproximadament {{count}} setmanes'
  },
  xWeeks: {
    one: '1 setmana',
    other: '{{count}} setmanes'
  },
  aboutXMonths: {
    one: 'aproximadament un mes',
    other: 'aproximadament {{count}} mesos'
  },
  xMonths: {
    one: '1 mes',
    other: '{{count}} mesos'
  },
  aboutXYears: {
    one: 'aproximadament un any',
    other: 'aproximadament {{count}} anys'
  },
  xYears: {
    one: '1 any',
    other: '{{count}} anys'
  },
  overXYears: {
    one: "més d'un any",
    eleven: "més d'onze anys",
    other: 'més de {{count}} anys'
  },
  almostXYears: {
    one: 'gairebé un any',
    other: 'gairebé {{count}} anys'
  }
};
function formatDistance$13(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$11[token] === 'string') {
    result = formatDistanceLocale$11[token];
  } else if (count === 1) {
    result = formatDistanceLocale$11[token].one;
  } else if (count === 11 && formatDistanceLocale$11[token].eleven) {
    result = formatDistanceLocale$11[token].eleven;
  } else {
    result = formatDistanceLocale$11[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'en ' + result;
    } else {
      return 'fa ' + result;
    }
  }

  return result;
}

var dateFormats$1a = {
  full: "EEEE, d 'de' MMMM y",
  long: "d 'de' MMMM y",
  medium: 'd MMM y',
  short: 'dd/MM/y'
};
var timeFormats$1a = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$1a = {
  full: "{{date}} 'a les' {{time}}",
  long: "{{date}} 'a les' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$1a = {
  date: buildFormatLongFn({
    formats: dateFormats$1a,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1a,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1a,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$13 = {
  lastWeek: "'el' eeee 'passat a la' LT",
  yesterday: "'ahir a la' p",
  today: "'avui a la' p",
  tomorrow: "'demà a la' p",
  nextWeek: "eeee 'a la' p",
  other: 'P'
};
var formatRelativeLocalePlural$3 = {
  lastWeek: "'el' eeee 'passat a les' p",
  yesterday: "'ahir a les' p",
  today: "'avui a les' p",
  tomorrow: "'demà a les' p",
  nextWeek: "eeee 'a les' p",
  other: 'P'
};
function formatRelative$13(token, date, _baseDate, _options) {
  if (date.getUTCHours() !== 1) {
    return formatRelativeLocalePlural$3[token];
  }

  return formatRelativeLocale$13[token];
}

/**
 * General information
 * Reference: https://aplicacions.llengua.gencat.cat
 * Reference: https://www.uoc.edu/portal/ca/servei-linguistic/convencions/abreviacions/simbols/simbols-habituals.html
 */

/**
 * Abans de Crist: https://aplicacions.llengua.gencat.cat/llc/AppJava/index.html?input_cercar=abans+de+crist&action=Principal&method=detall_completa&numPagina=1&idHit=6876&database=FITXES_PUB&tipusFont=Fitxes%20de%20l%27Optimot&idFont=6876&titol=abans%20de%20Crist%20(abreviatura)%20/%20abans%20de%20Crist%20(sigla)&numeroResultat=1&clickLink=detall&tipusCerca=cerca.fitxes
 * Desprest de Crist: https://aplicacions.llengua.gencat.cat/llc/AppJava/index.html?input_cercar=despr%E9s+de+crist&action=Principal&method=detall_completa&numPagina=1&idHit=6879&database=FITXES_PUB&tipusFont=Fitxes%20de%20l%27Optimot&idFont=6879&titol=despr%E9s%20de%20Crist%20(sigla)%20/%20despr%E9s%20de%20Crist%20(abreviatura)&numeroResultat=1&clickLink=detall&tipusCerca=cerca.fitxes
 */

var eraValues$13 = {
  narrow: ['aC', 'dC'],
  abbreviated: ['a. de C.', 'd. de C.'],
  wide: ['abans de Crist', 'després de Crist']
};
var quarterValues$13 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['T1', 'T2', 'T3', 'T4'],
  wide: ['1r trimestre', '2n trimestre', '3r trimestre', '4t trimestre']
};
/**
 * Dins d'un text convé fer servir la forma sencera dels mesos, ja que sempre és més clar el mot sencer que l'abreviatura, encara que aquesta sigui força coneguda.
 * Cal reservar, doncs, les abreviatures per a les llistes o classificacions, els gràfics, les taules o quadres estadístics, els textos publicitaris, etc.
 *
 * Reference: https://aplicacions.llengua.gencat.cat/llc/AppJava/index.html?input_cercar=abreviacions+mesos&action=Principal&method=detall_completa&numPagina=1&idHit=8402&database=FITXES_PUB&tipusFont=Fitxes%20de%20l%27Optimot&idFont=8402&titol=abreviatures%20dels%20mesos%20de%20l%27any&numeroResultat=5&clickLink=detall&tipusCerca=cerca.fitxes
 */

var monthValues$13 = {
  narrow: ['GN', 'FB', 'MÇ', 'AB', 'MG', 'JN', 'JL', 'AG', 'ST', 'OC', 'NV', 'DS'],

  /**
   * Les abreviatures dels mesos de l'any es formen seguint una de les normes generals de formació d'abreviatures.
   * S'escriu la primera síl·laba i les consonants de la síl·laba següent anteriors a la primera vocal.
   * Els mesos de març, maig i juny no s'abreugen perquè són paraules d'una sola síl·laba.
   */
  abbreviated: ['gen.', 'febr.', 'març', 'abr.', 'maig', 'juny', 'jul.', 'ag.', 'set.', 'oct.', 'nov.', 'des.'],
  wide: ['gener', 'febrer', 'març', 'abril', 'maig', 'juny', 'juliol', 'agost', 'setembre', 'octubre', 'novembre', 'desembre']
};
/**
 * Les abreviatures dels dies de la setmana comencen totes amb la lletra d.
 * Tot seguit porten la consonant següent a la i, excepte en el cas de dimarts, dimecres i diumenge, en què aquesta consonant és la m i, per tant, hi podria haver confusió.
 * Per evitar-ho, s'ha substituït la m per una t (en el cas de dimarts), una c (en el cas de dimecres) i una g (en el cas de diumenge), respectivament.
 *
 * Seguint la norma general d'ús de les abreviatures, les dels dies de la setmana sempre porten punt final.
 * Igualment, van amb la primera lletra en majúscula quan la paraula sencera també hi aniria.
 * En canvi, van amb la primera lletra en minúscula quan la inicial de la paraula sencera també hi aniria.
 *
 * Reference: https://aplicacions.llengua.gencat.cat/llc/AppJava/index.html?input_cercar=abreviatures+dies&action=Principal&method=detall_completa&numPagina=1&idHit=8387&database=FITXES_PUB&tipusFont=Fitxes%20de%20l%27Optimot&idFont=8387&titol=abreviatures%20dels%20dies%20de%20la%20setmana&numeroResultat=1&clickLink=detall&tipusCerca=cerca.tot
 */

var dayValues$13 = {
  narrow: ['dg.', 'dl.', 'dt.', 'dm.', 'dj.', 'dv.', 'ds.'],
  short: ['dg.', 'dl.', 'dt.', 'dm.', 'dj.', 'dv.', 'ds.'],
  abbreviated: ['dg.', 'dl.', 'dt.', 'dm.', 'dj.', 'dv.', 'ds.'],
  wide: ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte']
};
/**
 * Reference: https://aplicacions.llengua.gencat.cat/llc/AppJava/index.html?action=Principal&method=detall&input_cercar=parts+del+dia&numPagina=1&database=FITXES_PUB&idFont=12801&idHit=12801&tipusFont=Fitxes+de+l%27Optimot&numeroResultat=1&databases_avansada=&categories_avansada=&clickLink=detall&titol=Nom+de+les+parts+del+dia&tematica=&tipusCerca=cerca.fitxes
 */

var dayPeriodValues$12 = {
  narrow: {
    am: 'am',
    pm: 'pm',
    midnight: 'mitjanit',
    noon: 'migdia',
    morning: 'matí',
    afternoon: 'tarda',
    evening: 'vespre',
    night: 'nit'
  },
  abbreviated: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'mitjanit',
    noon: 'migdia',
    morning: 'matí',
    afternoon: 'tarda',
    evening: 'vespre',
    night: 'nit'
  },
  wide: {
    am: 'ante meridiem',
    pm: 'post meridiem',
    midnight: 'mitjanit',
    noon: 'migdia',
    morning: 'matí',
    afternoon: 'tarda',
    evening: 'vespre',
    night: 'nit'
  }
};
var formattingDayPeriodValues$Q = {
  narrow: {
    am: 'am',
    pm: 'pm',
    midnight: 'de la mitjanit',
    noon: 'del migdia',
    morning: 'del matí',
    afternoon: 'de la tarda',
    evening: 'del vespre',
    night: 'de la nit'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'de la mitjanit',
    noon: 'del migdia',
    morning: 'del matí',
    afternoon: 'de la tarda',
    evening: 'del vespre',
    night: 'de la nit'
  },
  wide: {
    am: 'ante meridiem',
    pm: 'post meridiem',
    midnight: 'de la mitjanit',
    noon: 'del migdia',
    morning: 'del matí',
    afternoon: 'de la tarda',
    evening: 'del vespre',
    night: 'de la nit'
  }
};
/**
 * Quan van en singular, els nombres ordinals es representen, en forma d’abreviatura, amb la xifra seguida de l’última lletra del mot desplegat.
 * És optatiu posar punt després de la lletra.
 *
 * Reference: https://aplicacions.llengua.gencat.cat/llc/AppJava/pdf/abrevia.pdf#page=18
 *
 * @param {Number} dirtyNumber
 * @param {Object} [_dirtyOptions]
 */

function ordinalNumber$13(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'r';

      case 2:
        return number + 'n';

      case 3:
        return number + 'r';

      case 4:
        return number + 't';
    }
  }

  return number + 'è';
}

var localize$13 = {
  ordinalNumber: ordinalNumber$13,
  era: buildLocalizeFn({
    values: eraValues$13,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$13,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$13,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$13,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$12,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$Q,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$12 = /^(\d+)(è|r|n|r|t)?/i;
var parseOrdinalNumberPattern$12 = /\d+/i;
var matchEraPatterns$12 = {
  narrow: /^(aC|dC)/i,
  abbreviated: /^(a. de C.|d. de C.)/i,
  wide: /^(abans de Crist|despr[eé]s de Crist)/i
};
var parseEraPatterns$12 = {
  narrow: [/^aC/i, /^dC/i],
  abbreviated: [/^(a. de C.)/i, /^(d. de C.)/i],
  wide: [/^(abans de Crist)/i, /^(despr[eé]s de Crist)/i]
};
var matchQuarterPatterns$12 = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](è|r|n|r|t)? trimestre/i
};
var parseQuarterPatterns$12 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$12 = {
  narrow: /^(GN|FB|MÇ|AB|MG|JN|JL|AG|ST|OC|NV|DS)/i,
  abbreviated: /^(gen.|febr.|març|abr.|maig|juny|jul.|ag.|set.|oct.|nov.|des.)/i,
  wide: /^(gener|febrer|març|abril|maig|juny|juliol|agost|setembre|octubre|novembre|desembre)/i
};
var parseMonthPatterns$12 = {
  narrow: [/^GN/i, /^FB/i, /^MÇ/i, /^AB/i, /^MG/i, /^JN/i, /^JL/i, /^AG/i, /^ST/i, /^OC/i, /^NV/i, /^DS/i],
  abbreviated: [/^gen./i, /^febr./i, /^març/i, /^abr./i, /^maig/i, /^juny/i, /^jul./i, /^ag./i, /^set./i, /^oct./i, /^nov./i, /^des./i],
  wide: [/^gener/i, /^febrer/i, /^març/i, /^abril/i, /^maig/i, /^juny/i, /^juliol/i, /^agost/i, /^setembre/i, /^octubre/i, /^novembre/i, /^desembre/i]
};
var matchDayPatterns$12 = {
  narrow: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  short: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  abbreviated: /^(dg\.|dl\.|dt\.|dm\.|dj\.|dv\.|ds\.)/i,
  wide: /^(diumenge|dilluns|dimarts|dimecres|dijous|divendres|dissabte)/i
};
var parseDayPatterns$12 = {
  narrow: [/^dg./i, /^dl./i, /^dt./i, /^dm./i, /^dj./i, /^dv./i, /^ds./i],
  abbreviated: [/^dg./i, /^dl./i, /^dt./i, /^dm./i, /^dj./i, /^dv./i, /^ds./i],
  wide: [/^diumenge/i, /^dilluns/i, /^dimarts/i, /^dimecres/i, /^dijous/i, /^divendres/i, /^disssabte/i]
};
var matchDayPeriodPatterns$12 = {
  narrow: /^(a|p|mn|md|(del|de la) (matí|tarda|vespre|nit))/i,
  abbreviated: /^([ap]\.?\s?m\.?|mitjanit|migdia|(del|de la) (matí|tarda|vespre|nit))/i,
  wide: /^(ante meridiem|post meridiem|mitjanit|migdia|(del|de la) (matí|tarda|vespre|nit))/i
};
var parseDayPeriodPatterns$12 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mitjanit/i,
    noon: /^migdia/i,
    morning: /matí/i,
    afternoon: /tarda/i,
    evening: /vespre/i,
    night: /nit/i
  }
};
var match$12 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$12,
    parsePattern: parseOrdinalNumberPattern$12,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$12,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$12,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$12,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$12,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$12,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$12,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$12,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$12,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$12,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$12,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Catalan locale.
 * @language Catalan
 * @iso-639-2 cat
 * @author Guillermo Grau [@guigrpa]{@link https://github.com/guigrpa}
 * @author Alex Vizcaino [@avizcaino]{@link https://github.com/avizcaino}
 */

var locale$1c = {
  code: 'ca',
  formatDistance: formatDistance$13,
  formatLong: formatLong$1a,
  formatRelative: formatRelative$13,
  localize: localize$13,
  match: match$12,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};
 // throw new Error('ca locale is currently unavailable. Please check the progress of converting this locale to v2.0.0 in this issue on Github: TBA')

var formatDistanceLocale$10 = {
  lessThanXSeconds: {
    one: {
      regular: 'méně než sekunda',
      past: 'před méně než sekundou',
      future: 'za méně než sekundu'
    },
    few: {
      regular: 'méně než {{count}} sekundy',
      past: 'před méně než {{count}} sekundami',
      future: 'za méně než {{count}} sekundy'
    },
    many: {
      regular: 'méně než {{count}} sekund',
      past: 'před méně než {{count}} sekundami',
      future: 'za méně než {{count}} sekund'
    }
  },
  xSeconds: {
    one: {
      regular: 'sekunda',
      past: 'před sekundou',
      future: 'za sekundu'
    },
    few: {
      regular: '{{count}} sekundy',
      past: 'před {{count}} sekundami',
      future: 'za {{count}} sekundy'
    },
    many: {
      regular: '{{count}} sekund',
      past: 'před {{count}} sekundami',
      future: 'za {{count}} sekund'
    }
  },
  halfAMinute: {
    other: {
      regular: 'půl minuty',
      past: 'před půl minutou',
      future: 'za půl minuty'
    }
  },
  lessThanXMinutes: {
    one: {
      regular: 'méně než minuta',
      past: 'před méně než minutou',
      future: 'za méně než minutu'
    },
    few: {
      regular: 'méně než {{count}} minuty',
      past: 'před méně než {{count}} minutami',
      future: 'za méně než {{count}} minuty'
    },
    many: {
      regular: 'méně než {{count}} minut',
      past: 'před méně než {{count}} minutami',
      future: 'za méně než {{count}} minut'
    }
  },
  xMinutes: {
    one: {
      regular: 'minuta',
      past: 'před minutou',
      future: 'za minutu'
    },
    few: {
      regular: '{{count}} minuty',
      past: 'před {{count}} minutami',
      future: 'za {{count}} minuty'
    },
    many: {
      regular: '{{count}} minut',
      past: 'před {{count}} minutami',
      future: 'za {{count}} minut'
    }
  },
  aboutXHours: {
    one: {
      regular: 'přibližně hodina',
      past: 'přibližně před hodinou',
      future: 'přibližně za hodinu'
    },
    few: {
      regular: 'přibližně {{count}} hodiny',
      past: 'přibližně před {{count}} hodinami',
      future: 'přibližně za {{count}} hodiny'
    },
    many: {
      regular: 'přibližně {{count}} hodin',
      past: 'přibližně před {{count}} hodinami',
      future: 'přibližně za {{count}} hodin'
    }
  },
  xHours: {
    one: {
      regular: 'hodina',
      past: 'před hodinou',
      future: 'za hodinu'
    },
    few: {
      regular: '{{count}} hodiny',
      past: 'před {{count}} hodinami',
      future: 'za {{count}} hodiny'
    },
    many: {
      regular: '{{count}} hodin',
      past: 'před {{count}} hodinami',
      future: 'za {{count}} hodin'
    }
  },
  xDays: {
    one: {
      regular: 'den',
      past: 'před dnem',
      future: 'za den'
    },
    few: {
      regular: '{{count}} dny',
      past: 'před {{count}} dny',
      future: 'za {{count}} dny'
    },
    many: {
      regular: '{{count}} dní',
      past: 'před {{count}} dny',
      future: 'za {{count}} dní'
    }
  },
  aboutXWeeks: {
    one: {
      regular: 'přibližně týden',
      past: 'přibližně před týdnem',
      future: 'přibližně za týden'
    },
    few: {
      regular: 'přibližně {{count}} týdny',
      past: 'přibližně před {{count}} týdny',
      future: 'přibližně za {{count}} týdny'
    },
    many: {
      regular: 'přibližně {{count}} týdnů',
      past: 'přibližně před {{count}} týdny',
      future: 'přibližně za {{count}} týdnů'
    }
  },
  xWeeks: {
    one: {
      regular: 'týden',
      past: 'před týdnem',
      future: 'za týden'
    },
    few: {
      regular: '{{count}} týdny',
      past: 'před {{count}} týdny',
      future: 'za {{count}} týdny'
    },
    many: {
      regular: '{{count}} týdnů',
      past: 'před {{count}} týdny',
      future: 'za {{count}} týdnů'
    }
  },
  aboutXMonths: {
    one: {
      regular: 'přibližně měsíc',
      past: 'přibližně před měsícem',
      future: 'přibližně za měsíc'
    },
    few: {
      regular: 'přibližně {{count}} měsíce',
      past: 'přibližně před {{count}} měsíci',
      future: 'přibližně za {{count}} měsíce'
    },
    many: {
      regular: 'přibližně {{count}} měsíců',
      past: 'přibližně před {{count}} měsíci',
      future: 'přibližně za {{count}} měsíců'
    }
  },
  xMonths: {
    one: {
      regular: 'měsíc',
      past: 'před měsícem',
      future: 'za měsíc'
    },
    few: {
      regular: '{{count}} měsíce',
      past: 'před {{count}} měsíci',
      future: 'za {{count}} měsíce'
    },
    many: {
      regular: '{{count}} měsíců',
      past: 'před {{count}} měsíci',
      future: 'za {{count}} měsíců'
    }
  },
  aboutXYears: {
    one: {
      regular: 'přibližně rok',
      past: 'přibližně před rokem',
      future: 'přibližně za rok'
    },
    few: {
      regular: 'přibližně {{count}} roky',
      past: 'přibližně před {{count}} roky',
      future: 'přibližně za {{count}} roky'
    },
    many: {
      regular: 'přibližně {{count}} roků',
      past: 'přibližně před {{count}} roky',
      future: 'přibližně za {{count}} roků'
    }
  },
  xYears: {
    one: {
      regular: 'rok',
      past: 'před rokem',
      future: 'za rok'
    },
    few: {
      regular: '{{count}} roky',
      past: 'před {{count}} roky',
      future: 'za {{count}} roky'
    },
    many: {
      regular: '{{count}} roků',
      past: 'před {{count}} roky',
      future: 'za {{count}} roků'
    }
  },
  overXYears: {
    one: {
      regular: 'více než rok',
      past: 'před více než rokem',
      future: 'za více než rok'
    },
    few: {
      regular: 'více než {{count}} roky',
      past: 'před více než {{count}} roky',
      future: 'za více než {{count}} roky'
    },
    many: {
      regular: 'více než {{count}} roků',
      past: 'před více než {{count}} roky',
      future: 'za více než {{count}} roků'
    }
  },
  almostXYears: {
    one: {
      regular: 'skoro rok',
      past: 'skoro před rokem',
      future: 'skoro za rok'
    },
    few: {
      regular: 'skoro {{count}} roky',
      past: 'skoro před {{count}} roky',
      future: 'skoro za {{count}} roky'
    },
    many: {
      regular: 'skoro {{count}} roků',
      past: 'skoro před {{count}} roky',
      future: 'skoro za {{count}} roků'
    }
  }
};
function formatDistance$12(token, count, options) {
  options = options || {};
  var scheme = formatDistanceLocale$10[token]; // cs pluralization

  var pluralToken;

  if (typeof scheme.other === 'object') {
    pluralToken = 'other';
  } else if (count === 1) {
    pluralToken = 'one';
  } else if (count > 1 && count < 5) {
    pluralToken = 'few';
  } else {
    pluralToken = 'many';
  } // times


  var suffixExist = options.addSuffix === true;
  var comparison = options.comparison;
  var timeToken;

  if (suffixExist && comparison === -1) {
    timeToken = 'past';
  } else if (suffixExist && comparison === 1) {
    timeToken = 'future';
  } else {
    timeToken = 'regular';
  }

  return scheme[pluralToken][timeToken].replace('{{count}}', count);
}

var dateFormats$19 = {
  full: 'EEEE, d. MMMM yyyy',
  long: 'd. MMMM yyyy',
  medium: 'd. M. yyyy',
  short: 'dd.MM.yyyy'
};
var timeFormats$19 = {
  full: 'H:mm:ss zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$19 = {
  full: "{{date}} 'v' {{time}}",
  long: "{{date}} 'v' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$19 = {
  date: buildFormatLongFn({
    formats: dateFormats$19,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$19,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$19,
    defaultWidth: 'full'
  })
};

var accusativeWeekdays$5 = ['neděli', 'pondělí', 'úterý', 'středu', 'čtvrtek', 'pátek', 'sobotu'];
var formatRelativeLocale$12 = {
  lastWeek: "'poslední' eeee 've' p",
  yesterday: "'včera v' p",
  today: "'dnes v' p",
  tomorrow: "'zítra v' p",
  nextWeek: function (date, _baseDate, _options) {
    var day = date.getUTCDay();
    return "'v " + accusativeWeekdays$5[day] + " o' p";
  },
  other: 'P'
};
function formatRelative$12(token, date, baseDate, options) {
  var format = formatRelativeLocale$12[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
}

var eraValues$12 = {
  narrow: ['př. n. l.', 'n. l.'],
  abbreviated: ['př. n. l.', 'n. l.'],
  wide: ['před naším letopočtem', 'našeho letopočtu']
};
var quarterValues$12 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1. čtvrtletí', '2. čtvrtletí', '3. čtvrtletí', '4. čtvrtletí'],
  wide: ['1. čtvrtletí', '2. čtvrtletí', '3. čtvrtletí', '4. čtvrtletí']
};
var monthValues$12 = {
  narrow: ['L', 'Ú', 'B', 'D', 'K', 'Č', 'Č', 'S', 'Z', 'Ř', 'L', 'P'],
  abbreviated: ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
  wide: ['leden', 'únor', 'březen', 'duben', 'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec']
};
var formattingMonthValues$f = {
  narrow: ['L', 'Ú', 'B', 'D', 'K', 'Č', 'Č', 'S', 'Z', 'Ř', 'L', 'P'],
  abbreviated: ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'],
  wide: ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince']
};
var dayValues$12 = {
  narrow: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
  short: ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'],
  abbreviated: ['ned', 'pon', 'úte', 'stř', 'čtv', 'pát', 'sob'],
  wide: ['neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota']
};
var dayPeriodValues$11 = {
  narrow: {
    am: 'dop.',
    pm: 'odp.',
    midnight: 'půlnoc',
    noon: 'poledne',
    morning: 'ráno',
    afternoon: 'odpoledne',
    evening: 'večer',
    night: 'noc'
  },
  abbreviated: {
    am: 'dop.',
    pm: 'odp.',
    midnight: 'půlnoc',
    noon: 'poledne',
    morning: 'ráno',
    afternoon: 'odpoledne',
    evening: 'večer',
    night: 'noc'
  },
  wide: {
    am: 'dopoledne',
    pm: 'odpoledne',
    midnight: 'půlnoc',
    noon: 'poledne',
    morning: 'ráno',
    afternoon: 'odpoledne',
    evening: 'večer',
    night: 'noc'
  }
};
var formattingDayPeriodValues$P = {
  narrow: {
    am: 'dop.',
    pm: 'odp.',
    midnight: 'půlnoc',
    noon: 'poledne',
    morning: 'ráno',
    afternoon: 'odpoledne',
    evening: 'večer',
    night: 'noc'
  },
  abbreviated: {
    am: 'dop.',
    pm: 'odp.',
    midnight: 'půlnoc',
    noon: 'poledne',
    morning: 'ráno',
    afternoon: 'odpoledne',
    evening: 'večer',
    night: 'noc'
  },
  wide: {
    am: 'dopoledne',
    pm: 'odpoledne',
    midnight: 'půlnoc',
    noon: 'poledne',
    morning: 'ráno',
    afternoon: 'odpoledne',
    evening: 'večer',
    night: 'noc'
  }
};

function ordinalNumber$12(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + '.';
}

var localize$12 = {
  ordinalNumber: ordinalNumber$12,
  era: buildLocalizeFn({
    values: eraValues$12,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$12,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$12,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$f,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$12,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$11,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$P,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$11 = /^(\d+)\.?/i;
var parseOrdinalNumberPattern$11 = /\d+/i;
var matchEraPatterns$11 = {
  narrow: /^(p[řr]ed Kr\.|pred n\. l\.|po Kr\.|n\. l\.)/i,
  abbreviated: /^(pe[řr]ed Kr\.|pe[řr]ed n\. l\.|po Kr\.|n\. l\.)/i,
  wide: /^(p[řr]ed Kristem|pred na[šs][íi]m letopo[čc]tem|po Kristu|na[šs]eho letopo[čc]tu)/i
};
var parseEraPatterns$11 = {
  any: [/^p[řr]/i, /^(po|n)/i]
};
var matchQuarterPatterns$11 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\. [čc]tvrtlet[íi]/i,
  wide: /^[1234]\. [čc]tvrtlet[íi]/i
};
var parseQuarterPatterns$11 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$11 = {
  narrow: /^[lúubdkčcszřrlp]/i,
  abbreviated: /^(led|[úu]no|b[řr]e|dub|kv[ěe]|[čc]vn|[čc]vc|srp|z[áa][řr]|[řr][íi]j|lis|pro)/i,
  wide: /^(leden|ledna|[úu]nora?|b[řr]ezen|b[řr]ezna|duben|dubna|kv[ěe]ten|kv[ěe]tna|[čc]erven(ec|ce)?|[čc]ervna|srpen|srpna|z[áa][řr][íi]|[řr][íi]jen|[řr][íi]jna|listopad(a|u)?|prosinec|prosince)/i
};
var parseMonthPatterns$11 = {
  narrow: [/^l/i, /^[úu]/i, /^b/i, /^d/i, /^k/i, /^[čc]/i, /^[čc]/i, /^s/i, /^z/i, /^[řr]/i, /^l/i, /^p/i],
  any: [/^led/i, /^[úu]n/i, /^b[řr]e/i, /^dub/i, /^kv[ěe]/i, /^[čc]vn|[čc]erven(?!\w)|[čc]ervna/i, /^[čc]vc|[čc]erven(ec|ce)/i, /^srp/i, /^z[áa][řr]/i, /^[řr][íi]j/i, /^lis/i, /^pro/i]
};
var matchDayPatterns$11 = {
  narrow: /^[npuúsčps]/i,
  short: /^(ne|po|[úu]t|st|[čc]t|p[áa]|so)/i,
  abbreviated: /^(ne|po|[úu]t|st|[čc]t|p[áa]|so)/i,
  wide: /^(ned[ěe]le|pond[ěe]l[íi]|[úu]ter[ýy]|st[řr]eda|[čc]tvrtek|p[áa]tek|sobota)/i
};
var parseDayPatterns$11 = {
  narrow: [/^n/i, /^p/i, /^[úu]/i, /^s/i, /^[čc]/i, /^p/i, /^s/i],
  any: [/^ne/i, /^po/i, /^ut/i, /^st/i, /^[čc]t/i, /^p/i, /^so/i]
};
var matchDayPeriodPatterns$11 = {
  any: /^dopoledne|dop\.?|odpoledne|odp\.?|půlnoc|poledne|r[áa]no|odpoledne|ve[čc]er|(v )?noci/i
};
var parseDayPeriodPatterns$11 = {
  any: {
    am: /^dop/i,
    pm: /^odp/i,
    midnight: /^p[ůu]lnoc/i,
    noon: /^poledne/i,
    morning: /r[áa]no/i,
    afternoon: /odpoledne/i,
    evening: /ve[čc]er/i,
    night: /noc/i
  }
};
var match$11 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$11,
    parsePattern: parseOrdinalNumberPattern$11,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$11,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$11,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$11,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$11,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$11,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$11,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$11,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$11,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$11,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$11,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Czech locale.
 * @language Czech
 * @iso-639-2 ces
 * @author David Rus [@davidrus]{@link https://github.com/davidrus}
 * @author Pavel Hrách [@SilenY]{@link https://github.com/SilenY}
 * @author Jozef Bíroš [@JozefBiros]{@link https://github.com/JozefBiros}
 */

var locale$1b = {
  code: 'cs',
  formatDistance: formatDistance$12,
  formatLong: formatLong$19,
  formatRelative: formatRelative$12,
  localize: localize$12,
  match: match$11,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$$ = {
  lessThanXSeconds: {
    one: 'llai na eiliad',
    other: 'llai na {{count}} eiliad'
  },
  xSeconds: {
    one: '1 eiliad',
    other: '{{count}} eiliad'
  },
  halfAMinute: 'hanner munud',
  lessThanXMinutes: {
    one: 'llai na munud',
    two: 'llai na 2 funud',
    other: 'llai na {{count}} munud'
  },
  xMinutes: {
    one: '1 munud',
    two: '2 funud',
    other: '{{count}} munud'
  },
  aboutXHours: {
    one: 'tua 1 awr',
    other: 'tua {{count}} awr'
  },
  xHours: {
    one: '1 awr',
    other: '{{count}} awr'
  },
  xDays: {
    one: '1 diwrnod',
    two: '2 ddiwrnod',
    other: '{{count}} diwrnod'
  },
  aboutXWeeks: {
    one: 'tua 1 wythnos',
    two: 'tua pythefnos',
    other: 'tua {{count}} wythnos'
  },
  xWeeks: {
    one: '1 wythnos',
    two: 'pythefnos',
    other: '{{count}} wythnos'
  },
  aboutXMonths: {
    one: 'tua 1 mis',
    two: 'tua 2 fis',
    other: 'tua {{count}} mis'
  },
  xMonths: {
    one: '1 mis',
    two: '2 fis',
    other: '{{count}} mis'
  },
  aboutXYears: {
    one: 'tua 1 flwyddyn',
    two: 'tua 2 flynedd',
    other: 'tua {{count}} mlynedd'
  },
  xYears: {
    one: '1 flwyddyn',
    two: '2 flynedd',
    other: '{{count}} mlynedd'
  },
  overXYears: {
    one: 'dros 1 flwyddyn',
    two: 'dros 2 flynedd',
    other: 'dros {{count}} mlynedd'
  },
  almostXYears: {
    one: 'bron 1 flwyddyn',
    two: 'bron 2 flynedd',
    other: 'bron {{count}} mlynedd'
  }
};
function formatDistance$11(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$$[token] === 'string') {
    result = formatDistanceLocale$$[token];
  } else if (count === 1) {
    result = formatDistanceLocale$$[token].one;
  } else if (count === 2 && !!formatDistanceLocale$$[token].two) {
    result = formatDistanceLocale$$[token].two;
  } else {
    result = formatDistanceLocale$$[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'mewn ' + result;
    } else {
      return result + ' yn ôl';
    }
  }

  return result;
}

var dateFormats$18 = {
  full: 'EEEE, d MMMM yyyy',
  long: 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  short: 'dd/MM/yyyy'
};
var timeFormats$18 = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$18 = {
  full: "{{date}} 'am' {{time}}",
  long: "{{date}} 'am' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$18 = {
  date: buildFormatLongFn({
    formats: dateFormats$18,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$18,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$18,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$11 = {
  lastWeek: "eeee 'diwethaf am' p",
  yesterday: "'ddoe am' p",
  today: "'heddiw am' p",
  tomorrow: "'yfory am' p",
  nextWeek: "eeee 'am' p",
  other: 'P'
};
function formatRelative$11(token, _date, _baseDate, _options) {
  return formatRelativeLocale$11[token];
}

var eraValues$11 = {
  narrow: ['C', 'O'],
  abbreviated: ['CC', 'OC'],
  wide: ['Cyn Crist', 'Ar ôl Crist']
};
var quarterValues$11 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Ch1', 'Ch2', 'Ch3', 'Ch4'],
  wide: ['Chwarter 1af', '2ail chwarter', '3ydd chwarter', '4ydd chwarter']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$11 = {
  narrow: ['I', 'Ch', 'Ma', 'E', 'Mi', 'Me', 'G', 'A', 'Md', 'H', 'T', 'Rh'],
  abbreviated: ['Ion', 'Chwe', 'Maw', 'Ebr', 'Mai', 'Meh', 'Gor', 'Aws', 'Med', 'Hyd', 'Tach', 'Rhag'],
  wide: ['Ionawr', 'Chwefror', 'Mawrth', 'Ebrill', 'Mai', 'Mehefin', 'Gorffennaf', 'Awst', 'Medi', 'Hydref', 'Tachwedd', 'Rhagfyr']
};
var dayValues$11 = {
  narrow: ['S', 'Ll', 'M', 'M', 'I', 'G', 'S'],
  short: ['Su', 'Ll', 'Ma', 'Me', 'Ia', 'Gw', 'Sa'],
  abbreviated: ['Sul', 'Llun', 'Maw', 'Mer', 'Iau', 'Gwe', 'Sad'],
  wide: ['dydd Sul', 'dydd Llun', 'dydd Mawrth', 'dydd Mercher', 'dydd Iau', 'dydd Gwener', 'dydd Sadwrn']
};
var dayPeriodValues$10 = {
  narrow: {
    am: 'b',
    pm: 'h',
    midnight: 'hn',
    noon: 'hd',
    morning: 'bore',
    afternoon: 'prynhawn',
    evening: "gyda'r nos",
    night: 'nos'
  },
  abbreviated: {
    am: 'yb',
    pm: 'yh',
    midnight: 'hanner nos',
    noon: 'hanner dydd',
    morning: 'bore',
    afternoon: 'prynhawn',
    evening: "gyda'r nos",
    night: 'nos'
  },
  wide: {
    am: 'y.b.',
    pm: 'y.h.',
    midnight: 'hanner nos',
    noon: 'hanner dydd',
    morning: 'bore',
    afternoon: 'prynhawn',
    evening: "gyda'r nos",
    night: 'nos'
  }
};
var formattingDayPeriodValues$O = {
  narrow: {
    am: 'b',
    pm: 'h',
    midnight: 'hn',
    noon: 'hd',
    morning: 'yn y bore',
    afternoon: 'yn y prynhawn',
    evening: "gyda'r nos",
    night: 'yn y nos'
  },
  abbreviated: {
    am: 'yb',
    pm: 'yh',
    midnight: 'hanner nos',
    noon: 'hanner dydd',
    morning: 'yn y bore',
    afternoon: 'yn y prynhawn',
    evening: "gyda'r nos",
    night: 'yn y nos'
  },
  wide: {
    am: 'y.b.',
    pm: 'y.h.',
    midnight: 'hanner nos',
    noon: 'hanner dydd',
    morning: 'yn y bore',
    afternoon: 'yn y prynhawn',
    evening: "gyda'r nos",
    night: 'yn y nos'
  }
};

function ordinalNumber$11(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);

  if (number < 20) {
    switch (number) {
      case 0:
        return number + 'fed';

      case 1:
        return number + 'af';

      case 2:
        return number + 'ail';

      case 3:
      case 4:
        return number + 'ydd';

      case 5:
      case 6:
        return number + 'ed';

      case 7:
      case 8:
      case 9:
      case 10:
      case 12:
      case 15:
      case 18:
        return number + 'fed';

      case 11:
      case 13:
      case 14:
      case 16:
      case 17:
      case 19:
        return number + 'eg';
    }
  } else if (number >= 50 && number <= 60 || number === 80 || number >= 100) {
    return number + 'fed';
  }

  return number + 'ain';
}

var localize$11 = {
  ordinalNumber: ordinalNumber$11,
  era: buildLocalizeFn({
    values: eraValues$11,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$11,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$11,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$11,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$10,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$O,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$10 = /^(\d+)(af|ail|ydd|ed|fed|eg|ain)?/i;
var parseOrdinalNumberPattern$10 = /\d+/i;
var matchEraPatterns$10 = {
  narrow: /^(c|o)/i,
  abbreviated: /^(c\.?\s?c\.?|o\.?\s?c\.?)/i,
  wide: /^(cyn christ|ar ôl crist|ar ol crist)/i
};
var parseEraPatterns$10 = {
  wide: [/^c/i, /^(ar ôl crist|ar ol crist)/i],
  any: [/^c/i, /^o/i]
};
var matchQuarterPatterns$10 = {
  narrow: /^[1234]/i,
  abbreviated: /^ch[1234]/i,
  wide: /^(chwarter 1af)|([234](ail|ydd)? chwarter)/i
};
var parseQuarterPatterns$10 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$10 = {
  narrow: /^(i|ch|m|e|g|a|h|t|rh)/i,
  abbreviated: /^(ion|chwe|maw|ebr|mai|meh|gor|aws|med|hyd|tach|rhag)/i,
  wide: /^(ionawr|chwefror|mawrth|ebrill|mai|mehefin|gorffennaf|awst|medi|hydref|tachwedd|rhagfyr)/i
};
var parseMonthPatterns$10 = {
  narrow: [/^i/i, /^ch/i, /^m/i, /^e/i, /^m/i, /^m/i, /^g/i, /^a/i, /^m/i, /^h/i, /^t/i, /^rh/i],
  any: [/^io/i, /^ch/i, /^maw/i, /^e/i, /^mai/i, /^meh/i, /^g/i, /^a/i, /^med/i, /^h/i, /^t/i, /^rh/i]
};
var matchDayPatterns$10 = {
  narrow: /^(s|ll|m|i|g)/i,
  short: /^(su|ll|ma|me|ia|gw|sa)/i,
  abbreviated: /^(sul|llun|maw|mer|iau|gwe|sad)/i,
  wide: /^dydd (sul|llun|mawrth|mercher|iau|gwener|sadwrn)/i
};
var parseDayPatterns$10 = {
  narrow: [/^s/i, /^ll/i, /^m/i, /^m/i, /^i/i, /^g/i, /^s/i],
  wide: [/^dydd su/i, /^dydd ll/i, /^dydd ma/i, /^dydd me/i, /^dydd i/i, /^dydd g/i, /^dydd sa/i],
  any: [/^su/i, /^ll/i, /^ma/i, /^me/i, /^i/i, /^g/i, /^sa/i]
};
var matchDayPeriodPatterns$10 = {
  narrow: /^(b|h|hn|hd|(yn y|y|yr|gyda'r) (bore|prynhawn|nos|hwyr))/i,
  any: /^(y\.?\s?[bh]\.?|hanner nos|hanner dydd|(yn y|y|yr|gyda'r) (bore|prynhawn|nos|hwyr))/i
};
var parseDayPeriodPatterns$10 = {
  any: {
    am: /^b|(y\.?\s?b\.?)/i,
    pm: /^h|(y\.?\s?h\.?)|(yr hwyr)/i,
    midnight: /^hn|hanner nos/i,
    noon: /^hd|hanner dydd/i,
    morning: /bore/i,
    afternoon: /prynhawn/i,
    evening: /^gyda'r nos$/i,
    night: /blah/i
  }
};
var match$10 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$10,
    parsePattern: parseOrdinalNumberPattern$10,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$10,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$10,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$10,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$10,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$10,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$10,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$10,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$10,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$10,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$10,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Welsh locale.
 * @language Welsh
 * @iso-639-2 cym
 * @author Elwyn Malethan [@elmomalmo]{@link https://github.com/elmomalmo}
 */

var locale$1a = {
  code: 'cy',
  formatDistance: formatDistance$11,
  formatLong: formatLong$18,
  formatRelative: formatRelative$11,
  localize: localize$11,
  match: match$10,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$_ = {
  lessThanXSeconds: {
    one: 'mindre end ét sekund',
    other: 'mindre end {{count}} sekunder'
  },
  xSeconds: {
    one: '1 sekund',
    other: '{{count}} sekunder'
  },
  halfAMinute: 'ét halvt minut',
  lessThanXMinutes: {
    one: 'mindre end ét minut',
    other: 'mindre end {{count}} minutter'
  },
  xMinutes: {
    one: '1 minut',
    other: '{{count}} minutter'
  },
  aboutXHours: {
    one: 'cirka 1 time',
    other: 'cirka {{count}} timer'
  },
  xHours: {
    one: '1 time',
    other: '{{count}} timer'
  },
  xDays: {
    one: '1 dag',
    other: '{{count}} dage'
  },
  aboutXWeeks: {
    one: 'cirka 1 uge',
    other: 'cirka {{count}} uger'
  },
  xWeeks: {
    one: '1 uge',
    other: '{{count}} uger'
  },
  aboutXMonths: {
    one: 'cirka 1 måned',
    other: 'cirka {{count}} måneder'
  },
  xMonths: {
    one: '1 måned',
    other: '{{count}} måneder'
  },
  aboutXYears: {
    one: 'cirka 1 år',
    other: 'cirka {{count}} år'
  },
  xYears: {
    one: '1 år',
    other: '{{count}} år'
  },
  overXYears: {
    one: 'over 1 år',
    other: 'over {{count}} år'
  },
  almostXYears: {
    one: 'næsten 1 år',
    other: 'næsten {{count}} år'
  }
};
function formatDistance$10(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$_[token] === 'string') {
    result = formatDistanceLocale$_[token];
  } else if (count === 1) {
    result = formatDistanceLocale$_[token].one;
  } else {
    result = formatDistanceLocale$_[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'om ' + result;
    } else {
      return result + ' siden';
    }
  }

  return result;
}

var dateFormats$17 = {
  full: "EEEE 'den' d. MMMM y",
  long: 'd. MMMM y',
  medium: 'd. MMM y',
  short: 'dd/MM/y'
};
var timeFormats$17 = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$17 = {
  full: "{{date}} 'kl'. {{time}}",
  long: "{{date}} 'kl'. {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$17 = {
  date: buildFormatLongFn({
    formats: dateFormats$17,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$17,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$17,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$10 = {
  lastWeek: "'sidste' eeee 'kl.' p",
  yesterday: "'i går kl.' p",
  today: "'i dag kl.' p",
  tomorrow: "'i morgen kl.' p",
  nextWeek: "'på' eeee 'kl.' p",
  other: 'P'
};
function formatRelative$10(token, _date, _baseDate, _options) {
  return formatRelativeLocale$10[token];
}

var eraValues$10 = {
  narrow: ['fvt', 'vt'],
  abbreviated: ['f.v.t.', 'v.t.'],
  wide: ['før vesterlandsk tidsregning', 'vesterlandsk tidsregning']
};
var quarterValues$10 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1. kvt.', '2. kvt.', '3. kvt.', '4. kvt.'],
  wide: ['1. kvartal', '2. kvartal', '3. kvartal', '4. kvartal']
};
var monthValues$10 = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
  wide: ['januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december']
}; // Note that 'Days - abbreviated - Formatting' has periods at the end.
// https://www.unicode.org/cldr/charts/32/summary/da.html#1760
// This makes grammatical sense in danish, as most abbreviations have periods.

var dayValues$10 = {
  narrow: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
  short: ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
  abbreviated: ['søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.'],
  wide: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']
};
var dayPeriodValues$$ = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'midnat',
    noon: 'middag',
    morning: 'morgen',
    afternoon: 'eftermiddag',
    evening: 'aften',
    night: 'nat'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnat',
    noon: 'middag',
    morning: 'morgen',
    afternoon: 'eftermiddag',
    evening: 'aften',
    night: 'nat'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnat',
    noon: 'middag',
    morning: 'morgen',
    afternoon: 'eftermiddag',
    evening: 'aften',
    night: 'nat'
  }
};
var formattingDayPeriodValues$N = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'midnat',
    noon: 'middag',
    morning: 'om morgenen',
    afternoon: 'om eftermiddagen',
    evening: 'om aftenen',
    night: 'om natten'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnat',
    noon: 'middag',
    morning: 'om morgenen',
    afternoon: 'om eftermiddagen',
    evening: 'om aftenen',
    night: 'om natten'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnat',
    noon: 'middag',
    morning: 'om morgenen',
    afternoon: 'om eftermiddagen',
    evening: 'om aftenen',
    night: 'om natten'
  }
};

function ordinalNumber$10(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + '.';
}

var localize$10 = {
  ordinalNumber: ordinalNumber$10,
  era: buildLocalizeFn({
    values: eraValues$10,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$10,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$10,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$10,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$$,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$N,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$$ = /^(\d+)(\.)?/i;
var parseOrdinalNumberPattern$$ = /\d+/i;
var matchEraPatterns$$ = {
  narrow: /^(fKr|fvt|eKr|vt)/i,
  abbreviated: /^(f\.Kr\.?|f\.v\.t\.?|e\.Kr\.?|v\.t\.)/i,
  wide: /^(f.Kr.|før vesterlandsk tidsregning|e.Kr.|vesterlandsk tidsregning)/i
};
var parseEraPatterns$$ = {
  any: [/^f/i, /^(v|e)/i]
};
var matchQuarterPatterns$$ = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]. kvt\./i,
  wide: /^[1234]\.? kvartal/i
};
var parseQuarterPatterns$$ = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$$ = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mar.|apr.|maj|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,
  wide: /^(januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december)/i
};
var parseMonthPatterns$$ = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$$ = {
  narrow: /^[smtofl]/i,
  short: /^(søn.|man.|tir.|ons.|tor.|fre.|lør.)/i,
  abbreviated: /^(søn|man|tir|ons|tor|fre|lør)/i,
  wide: /^(søndag|mandag|tirsdag|onsdag|torsdag|fredag|lørdag)/i
};
var parseDayPatterns$$ = {
  narrow: [/^s/i, /^m/i, /^t/i, /^o/i, /^t/i, /^f/i, /^l/i],
  any: [/^s/i, /^m/i, /^ti/i, /^o/i, /^to/i, /^f/i, /^l/i]
};
var matchDayPeriodPatterns$$ = {
  narrow: /^(a|p|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i,
  any: /^([ap]\.?\s?m\.?|midnat|middag|(om) (morgenen|eftermiddagen|aftenen|natten))/i
};
var parseDayPeriodPatterns$$ = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /midnat/i,
    noon: /middag/i,
    morning: /morgen/i,
    afternoon: /eftermiddag/i,
    evening: /aften/i,
    night: /nat/i
  }
};
var match$$ = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$$,
    parsePattern: parseOrdinalNumberPattern$$,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$$,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$$,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$$,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$$,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$$,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$$,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$$,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$$,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$$,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$$,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Danish locale.
 * @language Danish
 * @iso-639-2 dan
 * @author Mathias Wøbbe [@MathiasKandelborg]{@link https://github.com/MathiasKandelborg}
 * @author Anders B. Hansen [@Andersbiha]{@link https://github.com/Andersbiha}
 * @author [@kgram]{@link https://github.com/kgram}
 * @author [@stefanbugge]{@link https://github.com/stefanbugge}
 */

var locale$19 = {
  code: 'da',
  formatDistance: formatDistance$10,
  formatLong: formatLong$17,
  formatRelative: formatRelative$10,
  localize: localize$10,
  match: match$$,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$Z = {
  lessThanXSeconds: {
    standalone: {
      one: 'weniger als 1 Sekunde',
      other: 'weniger als {{count}} Sekunden'
    },
    withPreposition: {
      one: 'weniger als 1 Sekunde',
      other: 'weniger als {{count}} Sekunden'
    }
  },
  xSeconds: {
    standalone: {
      one: '1 Sekunde',
      other: '{{count}} Sekunden'
    },
    withPreposition: {
      one: '1 Sekunde',
      other: '{{count}} Sekunden'
    }
  },
  halfAMinute: {
    standalone: 'halbe Minute',
    withPreposition: 'halben Minute'
  },
  lessThanXMinutes: {
    standalone: {
      one: 'weniger als 1 Minute',
      other: 'weniger als {{count}} Minuten'
    },
    withPreposition: {
      one: 'weniger als 1 Minute',
      other: 'weniger als {{count}} Minuten'
    }
  },
  xMinutes: {
    standalone: {
      one: '1 Minute',
      other: '{{count}} Minuten'
    },
    withPreposition: {
      one: '1 Minute',
      other: '{{count}} Minuten'
    }
  },
  aboutXHours: {
    standalone: {
      one: 'etwa 1 Stunde',
      other: 'etwa {{count}} Stunden'
    },
    withPreposition: {
      one: 'etwa 1 Stunde',
      other: 'etwa {{count}} Stunden'
    }
  },
  xHours: {
    standalone: {
      one: '1 Stunde',
      other: '{{count}} Stunden'
    },
    withPreposition: {
      one: '1 Stunde',
      other: '{{count}} Stunden'
    }
  },
  xDays: {
    standalone: {
      one: '1 Tag',
      other: '{{count}} Tage'
    },
    withPreposition: {
      one: '1 Tag',
      other: '{{count}} Tagen'
    }
  },
  aboutXWeeks: {
    standalone: {
      one: 'etwa 1 Woche',
      other: 'etwa {{count}} Wochen'
    },
    withPreposition: {
      one: 'etwa 1 Woche',
      other: 'etwa {{count}} Wochen'
    }
  },
  xWeeks: {
    standalone: {
      one: '1 Woche',
      other: '{{count}} Wochen'
    },
    withPreposition: {
      one: '1 Woche',
      other: '{{count}} Wochen'
    }
  },
  aboutXMonths: {
    standalone: {
      one: 'etwa 1 Monat',
      other: 'etwa {{count}} Monate'
    },
    withPreposition: {
      one: 'etwa 1 Monat',
      other: 'etwa {{count}} Monaten'
    }
  },
  xMonths: {
    standalone: {
      one: '1 Monat',
      other: '{{count}} Monate'
    },
    withPreposition: {
      one: '1 Monat',
      other: '{{count}} Monaten'
    }
  },
  aboutXYears: {
    standalone: {
      one: 'etwa 1 Jahr',
      other: 'etwa {{count}} Jahre'
    },
    withPreposition: {
      one: 'etwa 1 Jahr',
      other: 'etwa {{count}} Jahren'
    }
  },
  xYears: {
    standalone: {
      one: '1 Jahr',
      other: '{{count}} Jahre'
    },
    withPreposition: {
      one: '1 Jahr',
      other: '{{count}} Jahren'
    }
  },
  overXYears: {
    standalone: {
      one: 'mehr als 1 Jahr',
      other: 'mehr als {{count}} Jahre'
    },
    withPreposition: {
      one: 'mehr als 1 Jahr',
      other: 'mehr als {{count}} Jahren'
    }
  },
  almostXYears: {
    standalone: {
      one: 'fast 1 Jahr',
      other: 'fast {{count}} Jahre'
    },
    withPreposition: {
      one: 'fast 1 Jahr',
      other: 'fast {{count}} Jahren'
    }
  }
};

var formatDistance$$ = function (token, count, options) {
  var result;
  var tokenValue = options !== null && options !== void 0 && options.addSuffix ? formatDistanceLocale$Z[token].withPreposition : formatDistanceLocale$Z[token].standalone;

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', String(count));
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'in ' + result;
    } else {
      return 'vor ' + result;
    }
  }

  return result;
};

// DIN 5008: https://de.wikipedia.org/wiki/Datumsformat#DIN_5008
var dateFormats$16 = {
  full: 'EEEE, do MMMM y',
  // Montag, 7. Januar 2018
  long: 'do MMMM y',
  // 7. Januar 2018
  medium: 'do MMM y',
  // 7. Jan. 2018
  short: 'dd.MM.y' // 07.01.2018

};
var timeFormats$16 = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$16 = {
  full: "{{date}} 'um' {{time}}",
  long: "{{date}} 'um' {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$16 = {
  date: buildFormatLongFn({
    formats: dateFormats$16,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$16,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$16,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$$ = {
  lastWeek: "'letzten' eeee 'um' p",
  yesterday: "'gestern um' p",
  today: "'heute um' p",
  tomorrow: "'morgen um' p",
  nextWeek: "eeee 'um' p",
  other: 'P'
};

var formatRelative$$ = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$$[token];
};

var eraValues$$ = {
  narrow: ['v.Chr.', 'n.Chr.'],
  abbreviated: ['v.Chr.', 'n.Chr.'],
  wide: ['vor Christus', 'nach Christus']
};
var quarterValues$$ = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1. Quartal', '2. Quartal', '3. Quartal', '4. Quartal']
}; // Note: in German, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$$ = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  wide: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
}; // https://st.unicode.org/cldr-apps/v#/de/Gregorian/

var formattingMonthValues$e = {
  narrow: monthValues$$.narrow,
  abbreviated: ['Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'],
  wide: monthValues$$.wide
};
var dayValues$$ = {
  narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
  short: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  abbreviated: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
  wide: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
}; // https://www.unicode.org/cldr/charts/32/summary/de.html#1881

var dayPeriodValues$_ = {
  narrow: {
    am: 'vm.',
    pm: 'nm.',
    midnight: 'Mitternacht',
    noon: 'Mittag',
    morning: 'Morgen',
    afternoon: 'Nachm.',
    evening: 'Abend',
    night: 'Nacht'
  },
  abbreviated: {
    am: 'vorm.',
    pm: 'nachm.',
    midnight: 'Mitternacht',
    noon: 'Mittag',
    morning: 'Morgen',
    afternoon: 'Nachmittag',
    evening: 'Abend',
    night: 'Nacht'
  },
  wide: {
    am: 'vormittags',
    pm: 'nachmittags',
    midnight: 'Mitternacht',
    noon: 'Mittag',
    morning: 'Morgen',
    afternoon: 'Nachmittag',
    evening: 'Abend',
    night: 'Nacht'
  }
};
var formattingDayPeriodValues$M = {
  narrow: {
    am: 'vm.',
    pm: 'nm.',
    midnight: 'Mitternacht',
    noon: 'Mittag',
    morning: 'morgens',
    afternoon: 'nachm.',
    evening: 'abends',
    night: 'nachts'
  },
  abbreviated: {
    am: 'vorm.',
    pm: 'nachm.',
    midnight: 'Mitternacht',
    noon: 'Mittag',
    morning: 'morgens',
    afternoon: 'nachmittags',
    evening: 'abends',
    night: 'nachts'
  },
  wide: {
    am: 'vormittags',
    pm: 'nachmittags',
    midnight: 'Mitternacht',
    noon: 'Mittag',
    morning: 'morgens',
    afternoon: 'nachmittags',
    evening: 'abends',
    night: 'nachts'
  }
};

var ordinalNumber$$ = function (dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + '.';
};

var localize$$ = {
  ordinalNumber: ordinalNumber$$,
  era: buildLocalizeFn({
    values: eraValues$$,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$$,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$$,
    formattingValues: formattingMonthValues$e,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$$,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$_,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$M,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$_ = /^(\d+)(\.)?/i;
var parseOrdinalNumberPattern$_ = /\d+/i;
var matchEraPatterns$_ = {
  narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  wide: /^(vor Christus|vor unserer Zeitrechnung|nach Christus|unserer Zeitrechnung)/i
};
var parseEraPatterns$_ = {
  any: [/^v/i, /^n/i]
};
var matchQuarterPatterns$_ = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? Quartal/i
};
var parseQuarterPatterns$_ = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$_ = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(j[aä]n|feb|mär[z]?|apr|mai|jun[i]?|jul[i]?|aug|sep|okt|nov|dez)\.?/i,
  wide: /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)/i
};
var parseMonthPatterns$_ = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^j[aä]/i, /^f/i, /^mär/i, /^ap/i, /^mai/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$_ = {
  narrow: /^[smdmf]/i,
  short: /^(so|mo|di|mi|do|fr|sa)/i,
  abbreviated: /^(son?|mon?|die?|mit?|don?|fre?|sam?)\.?/i,
  wide: /^(sonntag|montag|dienstag|mittwoch|donnerstag|freitag|samstag)/i
};
var parseDayPatterns$_ = {
  any: [/^so/i, /^mo/i, /^di/i, /^mi/i, /^do/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns$_ = {
  narrow: /^(vm\.?|nm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  abbreviated: /^(vorm\.?|nachm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  wide: /^(vormittags|nachmittags|Mitternacht|Mittag|morgens|nachmittags|abends|nachts)/i
};
var parseDayPeriodPatterns$_ = {
  any: {
    am: /^v/i,
    pm: /^n/i,
    midnight: /^Mitte/i,
    noon: /^Mitta/i,
    morning: /morgens/i,
    afternoon: /nachmittags/i,
    // will never be matched. Afternoon is matched by `pm`
    evening: /abends/i,
    night: /nachts/i // will never be matched. Night is matched by `pm`

  }
};
var match$_ = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$_,
    parsePattern: parseOrdinalNumberPattern$_,
    valueCallback: function (value) {
      return parseInt(value);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$_,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$_,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$_,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$_,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$_,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$_,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$_,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$_,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$_,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPeriodPatterns$_,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary German locale.
 * @language German
 * @iso-639-2 deu
 * @author Thomas Eilmsteiner [@DeMuu]{@link https://github.com/DeMuu}
 * @author Asia [@asia-t]{@link https://github.com/asia-t}
 * @author Van Vuong Ngo [@vanvuongngo]{@link https://github.com/vanvuongngo}
 * @author RomanErnst [@pex]{@link https://github.com/pex}
 * @author Philipp Keck [@Philipp91]{@link https://github.com/Philipp91}
 */
var locale$18 = {
  code: 'de',
  formatDistance: formatDistance$$,
  formatLong: formatLong$16,
  formatRelative: formatRelative$$,
  localize: localize$$,
  match: match$_,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var eraValues$_ = {
  narrow: ['v.Chr.', 'n.Chr.'],
  abbreviated: ['v.Chr.', 'n.Chr.'],
  wide: ['vor Christus', 'nach Christus']
};
var quarterValues$_ = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1. Quartal', '2. Quartal', '3. Quartal', '4. Quartal']
}; // Note: in German, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$_ = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jän', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  wide: ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
}; // https://st.unicode.org/cldr-apps/v#/de_AT/Gregorian/

var formattingMonthValues$d = {
  narrow: monthValues$_.narrow,
  abbreviated: ['Jän.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sep.', 'Okt.', 'Nov.', 'Dez.'],
  wide: monthValues$_.wide
};
var dayValues$_ = {
  narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
  short: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
  abbreviated: ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'],
  wide: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
}; // https://www.unicode.org/cldr/charts/32/summary/de.html#1881

var dayPeriodValues$Z = {
  narrow: {
    am: 'vm.',
    pm: 'nm.',
    midnight: 'Mitternacht',
    noon: 'Mittag',
    morning: 'Morgen',
    afternoon: 'Nachm.',
    evening: 'Abend',
    night: 'Nacht'
  },
  abbreviated: {
    am: 'vorm.',
    pm: 'nachm.',
    midnight: 'Mitternacht',
    noon: 'Mittag',
    morning: 'Morgen',
    afternoon: 'Nachmittag',
    evening: 'Abend',
    night: 'Nacht'
  },
  wide: {
    am: 'vormittags',
    pm: 'nachmittags',
    midnight: 'Mitternacht',
    noon: 'Mittag',
    morning: 'Morgen',
    afternoon: 'Nachmittag',
    evening: 'Abend',
    night: 'Nacht'
  }
};
var formattingDayPeriodValues$L = {
  narrow: {
    am: 'vm.',
    pm: 'nm.',
    midnight: 'Mitternacht',
    noon: 'Mittag',
    morning: 'morgens',
    afternoon: 'nachm.',
    evening: 'abends',
    night: 'nachts'
  },
  abbreviated: {
    am: 'vorm.',
    pm: 'nachm.',
    midnight: 'Mitternacht',
    noon: 'Mittag',
    morning: 'morgens',
    afternoon: 'nachmittags',
    evening: 'abends',
    night: 'nachts'
  },
  wide: {
    am: 'vormittags',
    pm: 'nachmittags',
    midnight: 'Mitternacht',
    noon: 'Mittag',
    morning: 'morgens',
    afternoon: 'nachmittags',
    evening: 'abends',
    night: 'nachts'
  }
};

var ordinalNumber$_ = function (dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  return number + '.';
};

var localize$_ = {
  ordinalNumber: ordinalNumber$_,
  era: buildLocalizeFn({
    values: eraValues$_,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$_,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$_,
    formattingValues: formattingMonthValues$d,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$_,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$Z,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$L,
    defaultFormattingWidth: 'wide'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary German locale (Austria).
 * @language German
 * @iso-639-2 deu
 * @author Christoph Tobias Stenglein [@cstenglein]{@link https://github.com/cstenglein}
 */

var locale$17 = {
  code: 'de-AT',
  formatDistance: formatDistance$$,
  formatLong: formatLong$16,
  formatRelative: formatRelative$$,
  localize: localize$_,
  match: match$_,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$Y = {
  lessThanXSeconds: {
    one: 'λιγότερο από ένα δευτερόλεπτο',
    other: 'λιγότερο από {{count}} δευτερόλεπτα'
  },
  xSeconds: {
    one: '1 δευτερόλεπτο',
    other: '{{count}} δευτερόλεπτα'
  },
  halfAMinute: 'μισό λεπτό',
  lessThanXMinutes: {
    one: 'λιγότερο από ένα λεπτό',
    other: 'λιγότερο από {{count}} λεπτά'
  },
  xMinutes: {
    one: '1 λεπτό',
    other: '{{count}} λεπτά'
  },
  aboutXHours: {
    one: 'περίπου 1 ώρα',
    other: 'περίπου {{count}} ώρες'
  },
  xHours: {
    one: '1 ώρα',
    other: '{{count}} ώρες'
  },
  xDays: {
    one: '1 ημέρα',
    other: '{{count}} ημέρες'
  },
  aboutXWeeks: {
    one: 'περίπου 1 εβδομάδα',
    other: 'περίπου {{count}} εβδομάδες'
  },
  xWeeks: {
    one: '1 εβδομάδα',
    other: '{{count}} εβδομάδες'
  },
  aboutXMonths: {
    one: 'περίπου 1 μήνας',
    other: 'περίπου {{count}} μήνες'
  },
  xMonths: {
    one: '1 μήνας',
    other: '{{count}} μήνες'
  },
  aboutXYears: {
    one: 'περίπου 1 χρόνο',
    other: 'περίπου {{count}} χρόνια'
  },
  xYears: {
    one: '1 χρόνο',
    other: '{{count}} χρόνια'
  },
  overXYears: {
    one: 'πάνω από 1 χρόνο',
    other: 'πάνω από {{count}} χρόνια'
  },
  almostXYears: {
    one: 'περίπου 1 χρόνο',
    other: 'περίπου {{count}} χρόνια'
  }
};
function formatDistance$_(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$Y[token] === 'string') {
    result = formatDistanceLocale$Y[token];
  } else if (count === 1) {
    result = formatDistanceLocale$Y[token].one;
  } else {
    result = formatDistanceLocale$Y[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'σε ' + result;
    } else {
      return result + ' πριν';
    }
  }

  return result;
}

var dateFormats$15 = {
  full: 'EEEE, d MMMM y',
  long: 'd MMMM y',
  medium: 'd MMM y',
  short: 'd/M/yy'
};
var timeFormats$15 = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$15 = {
  full: '{{date}} - {{time}}',
  long: '{{date}} - {{time}}',
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$15 = {
  date: buildFormatLongFn({
    formats: dateFormats$15,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$15,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$15,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$_ = {
  lastWeek: function (date) {
    switch (date.getUTCDay()) {
      case 6:
        //Σάββατο
        return "'το προηγούμενο' eeee 'στις' p";

      default:
        return "'την προηγούμενη' eeee 'στις' p";
    }
  },
  yesterday: "'χθες στις' p",
  today: "'σήμερα στις' p",
  tomorrow: "'αύριο στις' p",
  nextWeek: "eeee 'στις' p",
  other: 'P'
};
function formatRelative$_(token, date, baseDate, options) {
  var format = formatRelativeLocale$_[token];
  if (typeof format === 'function') return format(date, baseDate, options);
  return format;
}

var eraValues$Z = {
  narrow: ['πΧ', 'μΧ'],
  abbreviated: ['π.Χ.', 'μ.Χ.'],
  wide: ['προ Χριστού', 'μετά Χριστόν']
};
var quarterValues$Z = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Τ1', 'Τ2', 'Τ3', 'Τ4'],
  wide: ['1ο τρίμηνο', '2ο τρίμηνο', '3ο τρίμηνο', '4ο τρίμηνο']
};
var monthValues$Z = {
  narrow: ['Ι', 'Φ', 'Μ', 'Α', 'Μ', 'Ι', 'Ι', 'Α', 'Σ', 'Ο', 'Ν', 'Δ'],
  abbreviated: ['Ιαν', 'Φεβ', 'Μάρ', 'Απρ', 'Μάι', 'Ιούν', 'Ιούλ', 'Αύγ', 'Σεπ', 'Οκτ', 'Νοέ', 'Δεκ'],
  wide: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος']
};
var formattingMonthValues$c = {
  narrow: ['Ι', 'Φ', 'Μ', 'Α', 'Μ', 'Ι', 'Ι', 'Α', 'Σ', 'Ο', 'Ν', 'Δ'],
  abbreviated: ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαΐ', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'],
  wide: ['Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου']
};
var dayValues$Z = {
  narrow: ['Κ', 'Δ', 'T', 'Τ', 'Π', 'Π', 'Σ'],
  short: ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πέ', 'Πα', 'Σά'],
  abbreviated: ['Κυρ', 'Δευ', 'Τρί', 'Τετ', 'Πέμ', 'Παρ', 'Σάβ'],
  wide: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο']
};
var dayPeriodValues$Y = {
  narrow: {
    am: 'πμ',
    pm: 'μμ',
    midnight: 'μεσάνυχτα',
    noon: 'μεσημέρι',
    morning: 'πρωί',
    afternoon: 'απόγευμα',
    evening: 'βράδυ',
    night: 'νύχτα'
  },
  abbreviated: {
    am: 'π.μ.',
    pm: 'μ.μ.',
    midnight: 'μεσάνυχτα',
    noon: 'μεσημέρι',
    morning: 'πρωί',
    afternoon: 'απόγευμα',
    evening: 'βράδυ',
    night: 'νύχτα'
  },
  wide: {
    am: 'π.μ.',
    pm: 'μ.μ.',
    midnight: 'μεσάνυχτα',
    noon: 'μεσημέρι',
    morning: 'πρωί',
    afternoon: 'απόγευμα',
    evening: 'βράδυ',
    night: 'νύχτα'
  }
};

function ordinalNumber$Z(dirtyNumber, dirtyOptions) {
  var options = dirtyOptions || {};
  var unit = String(options.unit);
  var suffix;

  if (unit === 'year' || unit === 'month') {
    suffix = 'ος';
  } else if (unit === 'week' || unit === 'dayOfYear' || unit === 'day' || unit === 'hour' || unit === 'date') {
    suffix = 'η';
  } else {
    suffix = 'ο';
  }

  return dirtyNumber + suffix;
}

var localize$Z = {
  ordinalNumber: ordinalNumber$Z,
  era: buildLocalizeFn({
    values: eraValues$Z,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$Z,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$Z,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$c,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$Z,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$Y,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$Z = /^(\d+)(ος|η|ο)?/i;
var parseOrdinalNumberPattern$Z = /\d+/i;
var matchEraPatterns$Z = {
  narrow: /^(πΧ|μΧ)/i,
  abbreviated: /^(π\.?\s?χ\.?|π\.?\s?κ\.?\s?χ\.?|μ\.?\s?χ\.?|κ\.?\s?χ\.?)/i,
  wide: /^(προ Χριστο(ύ|υ)|πριν απ(ό|ο) την Κοιν(ή|η) Χρονολογ(ί|ι)α|μετ(ά|α) Χριστ(ό|ο)ν|Κοιν(ή|η) Χρονολογ(ί|ι)α)/i
};
var parseEraPatterns$Z = {
  any: [/^π/i, /^(μ|κ)/i]
};
var matchQuarterPatterns$Z = {
  narrow: /^[1234]/i,
  abbreviated: /^τ[1234]/i,
  wide: /^[1234]ο? τρ(ί|ι)μηνο/i
};
var parseQuarterPatterns$Z = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$Z = {
  narrow: /^[ιφμαμιιασονδ]/i,
  abbreviated: /^(ιαν|φεβ|μ[άα]ρ|απρ|μ[άα][ιΐ]|ιο[ύυ]ν|ιο[ύυ]λ|α[ύυ]γ|σεπ|οκτ|νο[έε]|δεκ)/i,
  wide: /^(μ[άα][ιΐ]|α[ύυ]γο[υύ]στ)(ος|ου)|(ιανου[άα]ρ|φεβρου[άα]ρ|μ[άα]ρτ|απρ[ίι]λ|ιο[ύυ]ν|ιο[ύυ]λ|σεπτ[έε]μβρ|οκτ[ώω]βρ|νο[έε]μβρ|δεκ[έε]μβρ)(ιος|ίου)/i
};
var parseMonthPatterns$Z = {
  narrow: [/^ι/i, /^φ/i, /^μ/i, /^α/i, /^μ/i, /^ι/i, /^ι/i, /^α/i, /^σ/i, /^ο/i, /^ν/i, /^δ/i],
  any: [/^ια/i, /^φ/i, /^μ[άα]ρ/i, /^απ/i, /^μ[άα][ιΐ]/i, /^ιο[ύυ]ν/i, /^ιο[ύυ]λ/i, /^α[ύυ]/i, /^σ/i, /^ο/i, /^ν/i, /^δ/i]
};
var matchDayPatterns$Z = {
  narrow: /^[κδτπσ]/i,
  short: /^(κυ|δε|τρ|τε|π[εέ]|π[αά]|σ[αά])/i,
  abbreviated: /^(κυρ|δευ|τρι|τετ|πεμ|παρ|σαβ)/i,
  wide: /^(κυριακ(ή|η)|δευτ(έ|ε)ρα|τρ(ί|ι)τη|τετ(ά|α)ρτη|π(έ|ε)μπτη|παρασκευ(ή|η)|σ(ά|α)ββατο)/i
};
var parseDayPatterns$Z = {
  narrow: [/^κ/i, /^δ/i, /^τ/i, /^τ/i, /^π/i, /^π/i, /^σ/i],
  any: [/^κ/i, /^δ/i, /^τρ/i, /^τε/i, /^π[εέ]/i, /^π[αά]/i, /^σ/i]
};
var matchDayPeriodPatterns$Z = {
  narrow: /^(πμ|μμ|μεσ(ά|α)νυχτα|μεσημ(έ|ε)ρι|πρω(ί|ι)|απ(ό|ο)γευμα|βρ(ά|α)δυ|ν(ύ|υ)χτα)/i,
  any: /^([πμ]\.?\s?μ\.?|μεσ(ά|α)νυχτα|μεσημ(έ|ε)ρι|πρω(ί|ι)|απ(ό|ο)γευμα|βρ(ά|α)δυ|ν(ύ|υ)χτα)/i
};
var parseDayPeriodPatterns$Z = {
  any: {
    am: /^πμ|π\.\s?μ\./i,
    pm: /^μμ|μ\.\s?μ\./i,
    midnight: /^μεσάν/i,
    noon: /^μεσημ(έ|ε)/i,
    morning: /πρω(ί|ι)/i,
    afternoon: /απ(ό|ο)γευμα/i,
    evening: /βρ(ά|α)δυ/i,
    night: /ν(ύ|υ)χτα/i
  }
};
var match$Z = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$Z,
    parsePattern: parseOrdinalNumberPattern$Z,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$Z,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$Z,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$Z,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$Z,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$Z,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$Z,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$Z,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$Z,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$Z,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$Z,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Greek locale.
 * @language Greek
 * @iso-639-2 ell
 * @author Fanis Katsimpas [@fanixk]{@link https://github.com/fanixk}
 * @author Theodoros Orfanidis [@teoulas]{@link https://github.com/teoulas}
 */

var locale$16 = {
  code: 'el',
  formatDistance: formatDistance$_,
  formatLong: formatLong$15,
  formatRelative: formatRelative$_,
  localize: localize$Z,
  match: match$Z,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var dateFormats$14 = {
  full: 'EEEE, d MMMM yyyy',
  long: 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  short: 'dd/MM/yyyy'
};
var timeFormats$14 = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$14 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$14 = {
  date: buildFormatLongFn({
    formats: dateFormats$14,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$14,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$14,
    defaultWidth: 'full'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (Australia).
 * @language English
 * @iso-639-2 eng
 * @author Julien Malige [@JulienMalige]{@link https://github.com/JulienMalige}
 */
var locale$15 = {
  code: 'en-AU',
  formatDistance: formatDistance$1g,
  formatLong: formatLong$14,
  formatRelative: formatRelative$1g,
  localize: localize$1g,
  match: match$1f,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$X = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: 'a second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: 'a minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about an hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: 'an hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: 'a day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about a week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: 'a week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about a month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: 'a month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about a year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: 'a year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over a year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost a year',
    other: 'almost {{count}} years'
  }
};

var formatDistance$Z = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$X[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }

  return result;
};

var dateFormats$13 = {
  full: 'EEEE, MMMM do, yyyy',
  long: 'MMMM do, yyyy',
  medium: 'MMM d, yyyy',
  short: 'yyyy-MM-dd'
};
var timeFormats$13 = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$13 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$13 = {
  date: buildFormatLongFn({
    formats: dateFormats$13,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$13,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$13,
    defaultWidth: 'full'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (Canada).
 * @language English
 * @iso-639-2 eng
 * @author Mark Owsiak [@markowsiak]{@link https://github.com/markowsiak}
 * @author Marco Imperatore [@mimperatore]{@link https://github.com/mimperatore}
 */

var locale$14 = {
  code: 'en-CA',
  formatDistance: formatDistance$Z,
  formatLong: formatLong$13,
  formatRelative: formatRelative$1g,
  localize: localize$1g,
  match: match$1f,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var dateFormats$12 = {
  full: 'EEEE, d MMMM yyyy',
  long: 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  short: 'dd/MM/yyyy'
};
var timeFormats$12 = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$12 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$12 = {
  date: buildFormatLongFn({
    formats: dateFormats$12,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$12,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$12,
    defaultWidth: 'full'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United Kingdom).
 * @language English
 * @iso-639-2 eng
 * @author Alex [@glintik]{@link https://github.com/glintik}
 */

var locale$13 = {
  code: 'en-GB',
  formatDistance: formatDistance$1g,
  formatLong: formatLong$12,
  formatRelative: formatRelative$1g,
  localize: localize$1g,
  match: match$1f,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (Ireland).
 * @language English
 * @iso-639-2 eng
 * @author Tetiana [@tan75]{@link https://github.com/tan75}
 */

var locale$12 = {
  code: 'en-IE',
  formatDistance: formatDistance$1g,
  formatLong: formatLong$12,
  formatRelative: formatRelative$1g,
  localize: localize$1g,
  match: match$1f,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var dateFormats$11 = {
  full: 'EEEE, d MMMM yyyy',
  long: 'd MMMM, yyyy',
  medium: 'd MMM, yyyy',
  short: 'dd/MM/yyyy'
};
var timeFormats$11 = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$11 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$11 = {
  date: buildFormatLongFn({
    formats: dateFormats$11,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$11,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$11,
    defaultWidth: 'full'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (India).
 * @language English
 * @iso-639-2 eng
 * @author Galeel Bhasha Satthar [@gbhasha]{@link https://github.com/gbhasha}
 */

var locale$11 = {
  code: 'en-IN',
  formatDistance: formatDistance$1g,
  formatLong: formatLong$11,
  formatRelative: formatRelative$1g,
  localize: localize$1g,
  match: match$1f,
  options: {
    weekStartsOn: 1,
    // Monday is the first day of the week.
    firstWeekContainsDate: 4 // The week that contains Jan 4th is the first week of the year.

  }
};

var dateFormats$10 = {
  full: 'EEEE, d MMMM yyyy',
  long: 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  short: 'dd/MM/yyyy'
};
var timeFormats$10 = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$10 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$10 = {
  date: buildFormatLongFn({
    formats: dateFormats$10,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$10,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$10,
    defaultWidth: 'full'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (New Zealand).
 * @language English
 * @iso-639-2 eng
 * @author Murray Lucas [@muntact]{@link https://github.com/muntact}
 */

var locale$10 = {
  code: 'en-NZ',
  formatDistance: formatDistance$1g,
  formatLong: formatLong$10,
  formatRelative: formatRelative$1g,
  localize: localize$1g,
  match: match$1f,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var dateFormats$$ = {
  full: 'EEEE, d MMMM yyyy',
  long: 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  short: 'dd/MM/yyyy'
};
var timeFormats$$ = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$$ = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$$ = {
  date: buildFormatLongFn({
    formats: dateFormats$$,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$$,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$$,
    defaultWidth: 'full'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (South Africa).
 * @language English
 * @iso-639-2 eng
 * @author Shaila Kavrakova [@shaykav]{@link https://github.com/shaykav}
 */

var locale$$ = {
  code: 'en-ZA',
  formatDistance: formatDistance$1g,
  formatLong: formatLong$$,
  formatRelative: formatRelative$1g,
  localize: localize$1g,
  match: match$1f,
  options: {
    weekStartsOn: 0,
    // Sunday is the first day of the week.
    firstWeekContainsDate: 1 // The week that contains Jan 1st is the first week of the year.

  }
};

var formatDistanceLocale$W = {
  lessThanXSeconds: {
    one: 'malpli ol sekundo',
    other: 'malpli ol {{count}} sekundoj'
  },
  xSeconds: {
    one: '1 sekundo',
    other: '{{count}} sekundoj'
  },
  halfAMinute: 'duonminuto',
  lessThanXMinutes: {
    one: 'malpli ol minuto',
    other: 'malpli ol {{count}} minutoj'
  },
  xMinutes: {
    one: '1 minuto',
    other: '{{count}} minutoj'
  },
  aboutXHours: {
    one: 'proksimume 1 horo',
    other: 'proksimume {{count}} horoj'
  },
  xHours: {
    one: '1 horo',
    other: '{{count}} horoj'
  },
  xDays: {
    one: '1 tago',
    other: '{{count}} tagoj'
  },
  aboutXMonths: {
    one: 'proksimume 1 monato',
    other: 'proksimume {{count}} monatoj'
  },
  xWeeks: {
    one: '1 semajno',
    other: '{{count}} semajnoj'
  },
  aboutXWeeks: {
    one: 'proksimume 1 semajno',
    other: 'proksimume {{count}} semajnoj'
  },
  xMonths: {
    one: '1 monato',
    other: '{{count}} monatoj'
  },
  aboutXYears: {
    one: 'proksimume 1 jaro',
    other: 'proksimume {{count}} jaroj'
  },
  xYears: {
    one: '1 jaro',
    other: '{{count}} jaroj'
  },
  overXYears: {
    one: 'pli ol 1 jaro',
    other: 'pli ol {{count}} jaroj'
  },
  almostXYears: {
    one: 'preskaŭ 1 jaro',
    other: 'preskaŭ {{count}} jaroj'
  }
};

var formatDistance$Y = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$W[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', String(count));
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options !== null && options !== void 0 && options.comparison && options.comparison > 0) {
      return 'post ' + result;
    } else {
      return 'antaŭ ' + result;
    }
  }

  return result;
};

var dateFormats$_ = {
  full: "EEEE, do 'de' MMMM y",
  long: 'y-MMMM-dd',
  medium: 'y-MMM-dd',
  short: 'yyyy-MM-dd'
};
var timeFormats$_ = {
  full: "Ho 'horo kaj' m:ss zzzz",
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$_ = {
  any: '{{date}} {{time}}'
};
var formatLong$_ = {
  date: buildFormatLongFn({
    formats: dateFormats$_,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$_,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$_,
    defaultWidth: 'any'
  })
};

var formatRelativeLocale$Z = {
  lastWeek: "'pasinta' eeee 'je' p",
  yesterday: "'hieraŭ je' p",
  today: "'hodiaŭ je' p",
  tomorrow: "'morgaŭ je' p",
  nextWeek: "eeee 'je' p",
  other: 'P'
};

var formatRelative$Z = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$Z[token];
};

var eraValues$Y = {
  narrow: ['aK', 'pK'],
  abbreviated: ['a.K.E.', 'p.K.E.'],
  wide: ['antaŭ Komuna Erao', 'Komuna Erao']
};
var quarterValues$Y = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['K1', 'K2', 'K3', 'K4'],
  wide: ['1-a kvaronjaro', '2-a kvaronjaro', '3-a kvaronjaro', '4-a kvaronjaro']
};
var monthValues$Y = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aŭg', 'sep', 'okt', 'nov', 'dec'],
  wide: ['januaro', 'februaro', 'marto', 'aprilo', 'majo', 'junio', 'julio', 'aŭgusto', 'septembro', 'oktobro', 'novembro', 'decembro']
};
var dayValues$Y = {
  narrow: ['D', 'L', 'M', 'M', 'Ĵ', 'V', 'S'],
  short: ['di', 'lu', 'ma', 'me', 'ĵa', 've', 'sa'],
  abbreviated: ['dim', 'lun', 'mar', 'mer', 'ĵaŭ', 'ven', 'sab'],
  wide: ['dimanĉo', 'lundo', 'mardo', 'merkredo', 'ĵaŭdo', 'vendredo', 'sabato']
};
var dayPeriodValues$X = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'noktomezo',
    noon: 'tagmezo',
    morning: 'matene',
    afternoon: 'posttagmeze',
    evening: 'vespere',
    night: 'nokte'
  },
  abbreviated: {
    am: 'a.t.m.',
    pm: 'p.t.m.',
    midnight: 'noktomezo',
    noon: 'tagmezo',
    morning: 'matene',
    afternoon: 'posttagmeze',
    evening: 'vespere',
    night: 'nokte'
  },
  wide: {
    am: 'antaŭtagmeze',
    pm: 'posttagmeze',
    midnight: 'noktomezo',
    noon: 'tagmezo',
    morning: 'matene',
    afternoon: 'posttagmeze',
    evening: 'vespere',
    night: 'nokte'
  }
};

var ordinalNumber$Y = function (dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + '-a';
};

var localize$Y = {
  ordinalNumber: ordinalNumber$Y,
  era: buildLocalizeFn({
    values: eraValues$Y,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$Y,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$Y,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$Y,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$X,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$Y = /^(\d+)(-?a)?/i;
var parseOrdinalNumberPattern$Y = /\d+/i;
var matchEraPatterns$Y = {
  narrow: /^([ap]k)/i,
  abbreviated: /^([ap]\.?\s?k\.?\s?e\.?)/i,
  wide: /^((antaǔ |post )?komuna erao)/i
};
var parseEraPatterns$Y = {
  any: [/^a/i, /^[kp]/i]
};
var matchQuarterPatterns$Y = {
  narrow: /^[1234]/i,
  abbreviated: /^k[1234]/i,
  wide: /^[1234](-?a)? kvaronjaro/i
};
var parseQuarterPatterns$Y = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$Y = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|maj|jun|jul|a(ŭ|ux|uh|u)g|sep|okt|nov|dec)/i,
  wide: /^(januaro|februaro|marto|aprilo|majo|junio|julio|a(ŭ|ux|uh|u)gusto|septembro|oktobro|novembro|decembro)/i
};
var parseMonthPatterns$Y = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^a(u|ŭ)/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$Y = {
  narrow: /^[dlmĵjvs]/i,
  short: /^(di|lu|ma|me|(ĵ|jx|jh|j)a|ve|sa)/i,
  abbreviated: /^(dim|lun|mar|mer|(ĵ|jx|jh|j)a(ŭ|ux|uh|u)|ven|sab)/i,
  wide: /^(diman(ĉ|cx|ch|c)o|lundo|mardo|merkredo|(ĵ|jx|jh|j)a(ŭ|ux|uh|u)do|vendredo|sabato)/i
};
var parseDayPatterns$Y = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^(j|ĵ)/i, /^v/i, /^s/i],
  any: [/^d/i, /^l/i, /^ma/i, /^me/i, /^(j|ĵ)/i, /^v/i, /^s/i]
};
var matchDayPeriodPatterns$Y = {
  narrow: /^([ap]|(posttagmez|noktomez|tagmez|maten|vesper|nokt)[eo])/i,
  abbreviated: /^([ap][.\s]?t[.\s]?m[.\s]?|(posttagmez|noktomez|tagmez|maten|vesper|nokt)[eo])/i,
  wide: /^(anta(ŭ|ux)tagmez|posttagmez|noktomez|tagmez|maten|vesper|nokt)[eo]/i
};
var parseDayPeriodPatterns$Y = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^noktom/i,
    noon: /^t/i,
    morning: /^m/i,
    afternoon: /^posttagmeze/i,
    evening: /^v/i,
    night: /^n/i
  }
};
var match$Y = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$Y,
    parsePattern: parseOrdinalNumberPattern$Y,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$Y,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$Y,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$Y,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$Y,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$Y,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$Y,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$Y,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$Y,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$Y,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPeriodPatterns$Y,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Esperanto locale.
 * @language Esperanto
 * @iso-639-2 epo
 * @author date-fns
 */
var locale$_ = {
  code: 'eo',
  formatDistance: formatDistance$Y,
  formatLong: formatLong$_,
  formatRelative: formatRelative$Z,
  localize: localize$Y,
  match: match$Y,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$V = {
  lessThanXSeconds: {
    one: 'menos de un segundo',
    other: 'menos de {{count}} segundos'
  },
  xSeconds: {
    one: '1 segundo',
    other: '{{count}} segundos'
  },
  halfAMinute: 'medio minuto',
  lessThanXMinutes: {
    one: 'menos de un minuto',
    other: 'menos de {{count}} minutos'
  },
  xMinutes: {
    one: '1 minuto',
    other: '{{count}} minutos'
  },
  aboutXHours: {
    one: 'alrededor de 1 hora',
    other: 'alrededor de {{count}} horas'
  },
  xHours: {
    one: '1 hora',
    other: '{{count}} horas'
  },
  xDays: {
    one: '1 día',
    other: '{{count}} días'
  },
  aboutXWeeks: {
    one: 'alrededor de 1 semana',
    other: 'alrededor de {{count}} semanas'
  },
  xWeeks: {
    one: '1 semana',
    other: '{{count}} semanas'
  },
  aboutXMonths: {
    one: 'alrededor de 1 mes',
    other: 'alrededor de {{count}} meses'
  },
  xMonths: {
    one: '1 mes',
    other: '{{count}} meses'
  },
  aboutXYears: {
    one: 'alrededor de 1 año',
    other: 'alrededor de {{count}} años'
  },
  xYears: {
    one: '1 año',
    other: '{{count}} años'
  },
  overXYears: {
    one: 'más de 1 año',
    other: 'más de {{count}} años'
  },
  almostXYears: {
    one: 'casi 1 año',
    other: 'casi {{count}} años'
  }
};

var formatDistance$X = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$V[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'en ' + result;
    } else {
      return 'hace ' + result;
    }
  }

  return result;
};

var dateFormats$Z = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: 'd MMM y',
  short: 'dd/MM/y'
};
var timeFormats$Z = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$Z = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$Z = {
  date: buildFormatLongFn({
    formats: dateFormats$Z,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$Z,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$Z,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$Y = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: 'P'
};
var formatRelativeLocalePlural$2 = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: 'P'
};

var formatRelative$Y = function (token, date, _baseDate, _options) {
  if (date.getUTCHours() !== 1) {
    return formatRelativeLocalePlural$2[token];
  } else {
    return formatRelativeLocale$Y[token];
  }
};

var eraValues$X = {
  narrow: ['AC', 'DC'],
  abbreviated: ['AC', 'DC'],
  wide: ['antes de cristo', 'después de cristo']
};
var quarterValues$X = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['T1', 'T2', 'T3', 'T4'],
  wide: ['1º trimestre', '2º trimestre', '3º trimestre', '4º trimestre']
};
var monthValues$X = {
  narrow: ['e', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
  abbreviated: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  wide: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
};
var dayValues$X = {
  narrow: ['d', 'l', 'm', 'm', 'j', 'v', 's'],
  short: ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sá'],
  abbreviated: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  wide: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
};
var dayPeriodValues$W = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mn',
    noon: 'md',
    morning: 'mañana',
    afternoon: 'tarde',
    evening: 'tarde',
    night: 'noche'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'medianoche',
    noon: 'mediodia',
    morning: 'mañana',
    afternoon: 'tarde',
    evening: 'tarde',
    night: 'noche'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'medianoche',
    noon: 'mediodia',
    morning: 'mañana',
    afternoon: 'tarde',
    evening: 'tarde',
    night: 'noche'
  }
};
var formattingDayPeriodValues$K = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mn',
    noon: 'md',
    morning: 'de la mañana',
    afternoon: 'de la tarde',
    evening: 'de la tarde',
    night: 'de la noche'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'medianoche',
    noon: 'mediodia',
    morning: 'de la mañana',
    afternoon: 'de la tarde',
    evening: 'de la tarde',
    night: 'de la noche'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'medianoche',
    noon: 'mediodia',
    morning: 'de la mañana',
    afternoon: 'de la tarde',
    evening: 'de la tarde',
    night: 'de la noche'
  }
};

var ordinalNumber$X = function (dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + 'º';
};

var localize$X = {
  ordinalNumber: ordinalNumber$X,
  era: buildLocalizeFn({
    values: eraValues$X,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$X,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$X,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$X,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$W,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$K,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$X = /^(\d+)(º)?/i;
var parseOrdinalNumberPattern$X = /\d+/i;
var matchEraPatterns$X = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
};
var parseEraPatterns$X = {
  any: [/^ac/i, /^dc/i],
  wide: [/^(antes de cristo|antes de la era com[uú]n)/i, /^(despu[eé]s de cristo|era com[uú]n)/i]
};
var matchQuarterPatterns$X = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
var parseQuarterPatterns$X = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$X = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
};
var parseMonthPatterns$X = {
  narrow: [/^e/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^en/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i]
};
var matchDayPatterns$X = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
};
var parseDayPatterns$X = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
};
var matchDayPeriodPatterns$X = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
};
var parseDayPeriodPatterns$X = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn/i,
    noon: /^md/i,
    morning: /mañana/i,
    afternoon: /tarde/i,
    evening: /tarde/i,
    night: /noche/i
  }
};
var match$X = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$X,
    parsePattern: parseOrdinalNumberPattern$X,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$X,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$X,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$X,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$X,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$X,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$X,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$X,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$X,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$X,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$X,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Spanish locale.
 * @language Spanish
 * @iso-639-2 spa
 * @author Juan Angosto [@juanangosto]{@link https://github.com/juanangosto}
 * @author Guillermo Grau [@guigrpa]{@link https://github.com/guigrpa}
 * @author Fernando Agüero [@fjaguero]{@link https://github.com/fjaguero}
 * @author Gastón Haro [@harogaston]{@link https://github.com/harogaston}
 * @author Yago Carballo [@YagoCarballo]{@link https://github.com/YagoCarballo}
 */
var locale$Z = {
  code: 'es',
  formatDistance: formatDistance$X,
  formatLong: formatLong$Z,
  formatRelative: formatRelative$Y,
  localize: localize$X,
  match: match$X,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$U = {
  lessThanXSeconds: {
    standalone: {
      one: 'vähem kui üks sekund',
      other: 'vähem kui {{count}} sekundit'
    },
    withPreposition: {
      one: 'vähem kui ühe sekundi',
      other: 'vähem kui {{count}} sekundi'
    }
  },
  xSeconds: {
    standalone: {
      one: 'üks sekund',
      other: '{{count}} sekundit'
    },
    withPreposition: {
      one: 'ühe sekundi',
      other: '{{count}} sekundi'
    }
  },
  halfAMinute: {
    standalone: 'pool minutit',
    withPreposition: 'poole minuti'
  },
  lessThanXMinutes: {
    standalone: {
      one: 'vähem kui üks minut',
      other: 'vähem kui {{count}} minutit'
    },
    withPreposition: {
      one: 'vähem kui ühe minuti',
      other: 'vähem kui {{count}} minuti'
    }
  },
  xMinutes: {
    standalone: {
      one: 'üks minut',
      other: '{{count}} minutit'
    },
    withPreposition: {
      one: 'ühe minuti',
      other: '{{count}} minuti'
    }
  },
  aboutXHours: {
    standalone: {
      one: 'umbes üks tund',
      other: 'umbes {{count}} tundi'
    },
    withPreposition: {
      one: 'umbes ühe tunni',
      other: 'umbes {{count}} tunni'
    }
  },
  xHours: {
    standalone: {
      one: 'üks tund',
      other: '{{count}} tundi'
    },
    withPreposition: {
      one: 'ühe tunni',
      other: '{{count}} tunni'
    }
  },
  xDays: {
    standalone: {
      one: 'üks päev',
      other: '{{count}} päeva'
    },
    withPreposition: {
      one: 'ühe päeva',
      other: '{{count}} päeva'
    }
  },
  aboutXWeeks: {
    standalone: {
      one: 'umbes üks nädal',
      other: 'umbes {{count}} nädalat'
    },
    withPreposition: {
      one: 'umbes ühe nädala',
      other: 'umbes {{count}} nädala'
    }
  },
  xWeeks: {
    standalone: {
      one: 'üks nädal',
      other: '{{count}} nädalat'
    },
    withPreposition: {
      one: 'ühe nädala',
      other: '{{count}} nädala'
    }
  },
  aboutXMonths: {
    standalone: {
      one: 'umbes üks kuu',
      other: 'umbes {{count}} kuud'
    },
    withPreposition: {
      one: 'umbes ühe kuu',
      other: 'umbes {{count}} kuu'
    }
  },
  xMonths: {
    standalone: {
      one: 'üks kuu',
      other: '{{count}} kuud'
    },
    withPreposition: {
      one: 'ühe kuu',
      other: '{{count}} kuu'
    }
  },
  aboutXYears: {
    standalone: {
      one: 'umbes üks aasta',
      other: 'umbes {{count}} aastat'
    },
    withPreposition: {
      one: 'umbes ühe aasta',
      other: 'umbes {{count}} aasta'
    }
  },
  xYears: {
    standalone: {
      one: 'üks aasta',
      other: '{{count}} aastat'
    },
    withPreposition: {
      one: 'ühe aasta',
      other: '{{count}} aasta'
    }
  },
  overXYears: {
    standalone: {
      one: 'rohkem kui üks aasta',
      other: 'rohkem kui {{count}} aastat'
    },
    withPreposition: {
      one: 'rohkem kui ühe aasta',
      other: 'rohkem kui {{count}} aasta'
    }
  },
  almostXYears: {
    standalone: {
      one: 'peaaegu üks aasta',
      other: 'peaaegu {{count}} aastat'
    },
    withPreposition: {
      one: 'peaaegu ühe aasta',
      other: 'peaaegu {{count}} aasta'
    }
  }
};
function formatDistance$W(token, count, options) {
  options = options || {};
  var usageGroup = options.addSuffix ? formatDistanceLocale$U[token].withPreposition : formatDistanceLocale$U[token].standalone;
  var result;

  if (typeof usageGroup === 'string') {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else {
    result = usageGroup.other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return result + ' pärast';
    } else {
      return result + ' eest';
    }
  }

  return result;
}

var dateFormats$Y = {
  full: 'EEEE, d. MMMM y',
  long: 'd. MMMM y',
  medium: 'd. MMM y',
  short: 'dd.MM.y'
};
var timeFormats$Y = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$Y = {
  full: "{{date}} 'kell' {{time}}",
  long: "{{date}} 'kell' {{time}}",
  medium: '{{date}}. {{time}}',
  short: '{{date}}. {{time}}'
};
var formatLong$Y = {
  date: buildFormatLongFn({
    formats: dateFormats$Y,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$Y,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$Y,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$X = {
  lastWeek: "'eelmine' eeee 'kell' p",
  yesterday: "'eile kell' p",
  today: "'täna kell' p",
  tomorrow: "'homme kell' p",
  nextWeek: "'järgmine' eeee 'kell' p",
  other: 'P'
};
function formatRelative$X(token, _date, _baseDate, _options) {
  return formatRelativeLocale$X[token];
}

var eraValues$W = {
  narrow: ['e.m.a', 'm.a.j'],
  abbreviated: ['e.m.a', 'm.a.j'],
  wide: ['enne meie ajaarvamist', 'meie ajaarvamise järgi']
};
var quarterValues$W = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['K1', 'K2', 'K3', 'K4'],
  wide: ['1. kvartal', '2. kvartal', '3. kvartal', '4. kvartal']
};
var monthValues$W = {
  narrow: ['J', 'V', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['jaan', 'veebr', 'märts', 'apr', 'mai', 'juuni', 'juuli', 'aug', 'sept', 'okt', 'nov', 'dets'],
  wide: ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember']
};
var dayValues$W = {
  narrow: ['P', 'E', 'T', 'K', 'N', 'R', 'L'],
  short: ['P', 'E', 'T', 'K', 'N', 'R', 'L'],
  abbreviated: ['pühap.', 'esmasp.', 'teisip.', 'kolmap.', 'neljap.', 'reede.', 'laup.'],
  wide: ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev']
};
var dayPeriodValues$V = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'kesköö',
    noon: 'keskpäev',
    morning: 'hommik',
    afternoon: 'pärastlõuna',
    evening: 'õhtu',
    night: 'öö'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'kesköö',
    noon: 'keskpäev',
    morning: 'hommik',
    afternoon: 'pärastlõuna',
    evening: 'õhtu',
    night: 'öö'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'kesköö',
    noon: 'keskpäev',
    morning: 'hommik',
    afternoon: 'pärastlõuna',
    evening: 'õhtu',
    night: 'öö'
  }
};
var formattingDayPeriodValues$J = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'keskööl',
    noon: 'keskpäeval',
    morning: 'hommikul',
    afternoon: 'pärastlõunal',
    evening: 'õhtul',
    night: 'öösel'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'keskööl',
    noon: 'keskpäeval',
    morning: 'hommikul',
    afternoon: 'pärastlõunal',
    evening: 'õhtul',
    night: 'öösel'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'keskööl',
    noon: 'keskpäeval',
    morning: 'hommikul',
    afternoon: 'pärastlõunal',
    evening: 'õhtul',
    night: 'öösel'
  }
};

function ordinalNumber$W(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + '.';
}

var localize$W = {
  ordinalNumber: ordinalNumber$W,
  era: buildLocalizeFn({
    values: eraValues$W,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$W,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$W,
    formattingValues: monthValues$W,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$W,
    formattingValues: dayValues$W,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$V,
    formattingValues: formattingDayPeriodValues$J,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$W = /^\d+\./i;
var parseOrdinalNumberPattern$W = /\d+/i;
var matchEraPatterns$W = {
  narrow: /^(e\.m\.a|m\.a\.j|eKr|pKr)/i,
  abbreviated: /^(e\.m\.a|m\.a\.j|eKr|pKr)/i,
  wide: /^(enne meie ajaarvamist|meie ajaarvamise järgi|enne Kristust|pärast Kristust)/i
};
var parseEraPatterns$W = {
  any: [/^e/i, /^(m|p)/i]
};
var matchQuarterPatterns$W = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^[1234](\.)? kvartal/i
};
var parseQuarterPatterns$W = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$W = {
  narrow: /^[jvmasond]/i,
  abbreviated: /^(jaan|veebr|märts|apr|mai|juuni|juuli|aug|sept|okt|nov|dets)/i,
  wide: /^(jaanuar|veebruar|märts|aprill|mai|juuni|juuli|august|september|oktoober|november|detsember)/i
};
var parseMonthPatterns$W = {
  narrow: [/^j/i, /^v/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^v/i, /^mär/i, /^ap/i, /^mai/i, /^juun/i, /^juul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$W = {
  narrow: /^[petknrl]/i,
  short: /^[petknrl]/i,
  abbreviated: /^(püh?|esm?|tei?|kolm?|nel?|ree?|laup?)\.?/i,
  wide: /^(pühapäev|esmaspäev|teisipäev|kolmapäev|neljapäev|reede|laupäev)/i
};
var parseDayPatterns$W = {
  any: [/^p/i, /^e/i, /^t/i, /^k/i, /^n/i, /^r/i, /^l/i]
};
var matchDayPeriodPatterns$W = {
  any: /^(am|pm|keskööl?|keskpäev(al)?|hommik(ul)?|pärastlõunal?|õhtul?|öö(sel)?)/i
};
var parseDayPeriodPatterns$W = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^keskö/i,
    noon: /^keskp/i,
    morning: /hommik/i,
    afternoon: /pärastlõuna/i,
    evening: /õhtu/i,
    night: /öö/i
  }
};
var match$W = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$W,
    parsePattern: parseOrdinalNumberPattern$W,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$W,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$W,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$W,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$W,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$W,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$W,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$W,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$W,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$W,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$W,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Estonian locale.
 * @language Estonian
 * @iso-639-2 est
 * @author Priit Hansen [@HansenPriit]{@link https://github.com/priithansen}
 */

var locale$Y = {
  code: 'et',
  formatDistance: formatDistance$W,
  formatLong: formatLong$Y,
  formatRelative: formatRelative$X,
  localize: localize$W,
  match: match$W,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$T = {
  lessThanXSeconds: {
    one: 'segundo bat baino gutxiago',
    other: '{{count}} segundo baino gutxiago'
  },
  xSeconds: {
    one: '1 segundo',
    other: '{{count}} segundo'
  },
  halfAMinute: 'minutu erdi',
  lessThanXMinutes: {
    one: 'minutu bat baino gutxiago',
    other: '{{count}} minutu baino gutxiago'
  },
  xMinutes: {
    one: '1 minutu',
    other: '{{count}} minutu'
  },
  aboutXHours: {
    one: '1 ordu gutxi gorabehera',
    other: '{{count}} ordu gutxi gorabehera'
  },
  xHours: {
    one: '1 ordu',
    other: '{{count}} ordu'
  },
  xDays: {
    one: '1 egun',
    other: '{{count}} egun'
  },
  aboutXWeeks: {
    one: 'aste 1 inguru',
    other: '{{count}} aste inguru'
  },
  xWeeks: {
    one: '1 aste',
    other: '{{count}} astean'
  },
  aboutXMonths: {
    one: '1 hilabete gutxi gorabehera',
    other: '{{count}} hilabete gutxi gorabehera'
  },
  xMonths: {
    one: '1 hilabete',
    other: '{{count}} hilabete'
  },
  aboutXYears: {
    one: '1 urte gutxi gorabehera',
    other: '{{count}} urte gutxi gorabehera'
  },
  xYears: {
    one: '1 urte',
    other: '{{count}} urte'
  },
  overXYears: {
    one: '1 urte baino gehiago',
    other: '{{count}} urte baino gehiago'
  },
  almostXYears: {
    one: 'ia 1 urte',
    other: 'ia {{count}} urte'
  }
};
function formatDistance$V(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$T[token] === 'string') {
    result = formatDistanceLocale$T[token];
  } else if (count === 1) {
    result = formatDistanceLocale$T[token].one;
  } else {
    result = formatDistanceLocale$T[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'en ' + result;
    } else {
      return 'duela ' + result;
    }
  }

  return result;
}

var dateFormats$X = {
  full: "EEEE, y'ko' MMMM'ren' d'a' y'ren'",
  long: "y'ko' MMMM'ren' d'a'",
  medium: 'y MMM d',
  short: 'yy/MM/dd'
};
var timeFormats$X = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$X = {
  full: "{{date}} 'tan' {{time}}",
  long: "{{date}} 'tan' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$X = {
  date: buildFormatLongFn({
    formats: dateFormats$X,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$X,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$X,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$W = {
  lastWeek: "'joan den' eeee, LT",
  yesterday: "'atzo,' p",
  today: "'gaur,' p",
  tomorrow: "'bihar,' p",
  nextWeek: 'eeee, p',
  other: 'P'
};
var formatRelativeLocalePlural$1 = {
  lastWeek: "'joan den' eeee, p",
  yesterday: "'atzo,' p",
  today: "'gaur,' p",
  tomorrow: "'bihar,' p",
  nextWeek: 'eeee, p',
  other: 'P'
};
function formatRelative$W(token, date, _baseDate, _options) {
  if (date.getUTCHours() !== 1) {
    return formatRelativeLocalePlural$1[token];
  }

  return formatRelativeLocale$W[token];
}

var eraValues$V = {
  narrow: ['k.a.', 'k.o.'],
  abbreviated: ['k.a.', 'k.o.'],
  wide: ['kristo aurretik', 'kristo ondoren']
};
var quarterValues$V = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1H', '2H', '3H', '4H'],
  wide: ['1. hiruhilekoa', '2. hiruhilekoa', '3. hiruhilekoa', '4. hiruhilekoa']
};
var monthValues$V = {
  narrow: ['u', 'o', 'm', 'a', 'm', 'e', 'u', 'a', 'i', 'u', 'a', 'a'],
  abbreviated: ['urt', 'ots', 'mar', 'api', 'mai', 'eka', 'uzt', 'abu', 'ira', 'urr', 'aza', 'abe'],
  wide: ['urtarrila', 'otsaila', 'martxoa', 'apirila', 'maiatza', 'ekaina', 'uztaila', 'abuztua', 'iraila', 'urria', 'azaroa', 'abendua']
};
var dayValues$V = {
  narrow: ['i', 'a', 'a', 'a', 'o', 'o', 'l'],
  short: ['ig', 'al', 'as', 'az', 'og', 'or', 'lr'],
  abbreviated: ['iga', 'ast', 'ast', 'ast', 'ost', 'ost', 'lar'],
  wide: ['igandea', 'astelehena', 'asteartea', 'asteazkena', 'osteguna', 'ostirala', 'larunbata']
};
var dayPeriodValues$U = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'ge',
    noon: 'eg',
    morning: 'goiza',
    afternoon: 'arratsaldea',
    evening: 'arratsaldea',
    night: 'gaua'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'gauerdia',
    noon: 'eguerdia',
    morning: 'goiza',
    afternoon: 'arratsaldea',
    evening: 'arratsaldea',
    night: 'gaua'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'gauerdia',
    noon: 'eguerdia',
    morning: 'goiza',
    afternoon: 'arratsaldea',
    evening: 'arratsaldea',
    night: 'gaua'
  }
};
var formattingDayPeriodValues$I = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'ge',
    noon: 'eg',
    morning: 'goizean',
    afternoon: 'arratsaldean',
    evening: 'arratsaldean',
    night: 'gauean'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'gauerdia',
    noon: 'eguerdia',
    morning: 'goizean',
    afternoon: 'arratsaldean',
    evening: 'arratsaldean',
    night: 'gauean'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'gauerdia',
    noon: 'eguerdia',
    morning: 'goizean',
    afternoon: 'arratsaldean',
    evening: 'arratsaldean',
    night: 'gauean'
  }
};

function ordinalNumber$V(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + '.';
}

var localize$V = {
  ordinalNumber: ordinalNumber$V,
  era: buildLocalizeFn({
    values: eraValues$V,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$V,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$V,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$V,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$U,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$I,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$V = /^(\d+)(.)?/i;
var parseOrdinalNumberPattern$V = /\d+/i;
var matchEraPatterns$V = {
  narrow: /^(k.a.|k.o.)/i,
  abbreviated: /^(k.a.|k.o.)/i,
  wide: /^(kristo aurretik|kristo ondoren)/i
};
var parseEraPatterns$V = {
  narrow: [/^k.a./i, /^k.o./i],
  abbreviated: [/^(k.a.)/i, /^(k.o.)/i],
  wide: [/^(kristo aurretik)/i, /^(kristo ondoren)/i]
};
var matchQuarterPatterns$V = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]H/i,
  wide: /^[1234](.)? hiruhilekoa/i
};
var parseQuarterPatterns$V = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$V = {
  narrow: /^[uomaei]/i,
  abbreviated: /^(urt|ots|mar|api|mai|eka|uzt|abu|ira|urr|aza|abe)/i,
  wide: /^(urtarrila|otsaila|martxoa|apirila|maiatza|ekaina|uztaila|abuztua|iraila|urria|azaroa|abendua)/i
};
var parseMonthPatterns$V = {
  narrow: [/^u/i, /^o/i, /^m/i, /^a/i, /^m/i, /^e/i, /^u/i, /^a/i, /^i/i, /^u/i, /^a/i, /^a/i],
  any: [/^urt/i, /^ots/i, /^mar/i, /^api/i, /^mai/i, /^eka/i, /^uzt/i, /^abu/i, /^ira/i, /^urr/i, /^aza/i, /^abe/i]
};
var matchDayPatterns$V = {
  narrow: /^[iaol]/i,
  short: /^(ig|al|as|az|og|or|lr)/i,
  abbreviated: /^(iga|ast|ast|ast|ost|ost|lar)/i,
  wide: /^(igandea|astelehena|asteartea|asteazkena|osteguna|ostirala|larunbata)/i
};
var parseDayPatterns$V = {
  narrow: [/^i/i, /^a/i, /^a/i, /^a/i, /^o/i, /^o/i, /^l/i],
  short: [/^ig/i, /^al/i, /^as/i, /^az/i, /^og/i, /^or/i, /^lr/i],
  abbreviated: [/^iga/i, /^ast/i, /^ast/i, /^ast/i, /^ost/i, /^ost/i, /^lar/i],
  wide: [/^igandea/i, /^astelehena/i, /^asteartea/i, /^asteazkena/i, /^osteguna/i, /^ostirala/i, /^larunbata/i]
};
var matchDayPeriodPatterns$V = {
  narrow: /^(a|p|ge|eg|((goiza|goizean)|arratsaldea|(gaua|gauean)))/i,
  any: /^([ap]\.?\s?m\.?|gauerdia|eguerdia|((goiza|goizean)|arratsaldea|(gaua|gauean)))/i
};
var parseDayPeriodPatterns$V = {
  narrow: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^ge/i,
    noon: /^eg/i,
    morning: /goiz/i,
    afternoon: /arratsaldea/i,
    evening: /arratsaldea/i,
    night: /gau/i
  },
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^gauerdia/i,
    noon: /^eguerdia/i,
    morning: /goiz/i,
    afternoon: /arratsaldea/i,
    evening: /arratsaldea/i,
    night: /gau/i
  }
};
var match$V = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$V,
    parsePattern: parseOrdinalNumberPattern$V,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$V,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$V,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$V,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$V,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$V,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$V,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$V,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$V,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$V,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$V,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Basque locale.
 * @language Basque
 * @iso-639-2 eus
 * @author Jacob Söderblom [@JacobSoderblom]{@link https://github.com/JacobSoderblom}
 */

var locale$X = {
  code: 'eu',
  formatDistance: formatDistance$V,
  formatLong: formatLong$X,
  formatRelative: formatRelative$W,
  localize: localize$V,
  match: match$V,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$S = {
  lessThanXSeconds: {
    one: 'کمتر از یک ثانیه',
    other: 'کمتر از {{count}} ثانیه'
  },
  xSeconds: {
    one: '1 ثانیه',
    other: '{{count}} ثانیه'
  },
  halfAMinute: 'نیم دقیقه',
  lessThanXMinutes: {
    one: 'کمتر از یک دقیقه',
    other: 'کمتر از {{count}} دقیقه'
  },
  xMinutes: {
    one: '1 دقیقه',
    other: '{{count}} دقیقه'
  },
  aboutXHours: {
    one: 'حدود 1 ساعت',
    other: 'حدود {{count}} ساعت'
  },
  xHours: {
    one: '1 ساعت',
    other: '{{count}} ساعت'
  },
  xDays: {
    one: '1 روز',
    other: '{{count}} روز'
  },
  aboutXWeeks: {
    one: 'حدود 1 هفته',
    other: 'حدود {{count}} هفته'
  },
  xWeeks: {
    one: '1 هفته',
    other: '{{count}} هفته'
  },
  aboutXMonths: {
    one: 'حدود 1 ماه',
    other: 'حدود {{count}} ماه'
  },
  xMonths: {
    one: '1 ماه',
    other: '{{count}} ماه'
  },
  aboutXYears: {
    one: 'حدود 1 سال',
    other: 'حدود {{count}} سال'
  },
  xYears: {
    one: '1 سال',
    other: '{{count}} سال'
  },
  overXYears: {
    one: 'بیشتر از 1 سال',
    other: 'بیشتر از {{count}} سال'
  },
  almostXYears: {
    one: 'نزدیک 1 سال',
    other: 'نزدیک {{count}} سال'
  }
};
function formatDistance$U(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$S[token] === 'string') {
    result = formatDistanceLocale$S[token];
  } else if (count === 1) {
    result = formatDistanceLocale$S[token].one;
  } else {
    result = formatDistanceLocale$S[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'در ' + result;
    } else {
      return result + ' قبل';
    }
  }

  return result;
}

var dateFormats$W = {
  full: 'EEEE do MMMM y',
  long: 'do MMMM y',
  medium: 'd MMM y',
  short: 'yyyy/MM/dd'
};
var timeFormats$W = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$W = {
  full: "{{date}} 'در' {{time}}",
  long: "{{date}} 'در' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$W = {
  date: buildFormatLongFn({
    formats: dateFormats$W,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$W,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$W,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$V = {
  lastWeek: "eeee 'گذشته در' p",
  yesterday: "'دیروز در' p",
  today: "'امروز در' p",
  tomorrow: "'فردا در' p",
  nextWeek: "eeee 'در' p",
  other: 'P'
};
function formatRelative$V(token, _date, _baseDate, _options) {
  return formatRelativeLocale$V[token];
}

var eraValues$U = {
  narrow: ['ق', 'ب'],
  abbreviated: ['ق.م.', 'ب.م.'],
  wide: ['قبل از میلاد', 'بعد از میلاد']
};
var quarterValues$U = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['س‌م1', 'س‌م2', 'س‌م3', 'س‌م4'],
  wide: ['سه‌ماهه 1', 'سه‌ماهه 2', 'سه‌ماهه 3', 'سه‌ماهه 4']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$U = {
  narrow: ['ژ', 'ف', 'م', 'آ', 'م', 'ج', 'ج', 'آ', 'س', 'ا', 'ن', 'د'],
  abbreviated: ['ژانـ', 'فور', 'مارس', 'آپر', 'می', 'جون', 'جولـ', 'آگو', 'سپتـ', 'اکتـ', 'نوامـ', 'دسامـ'],
  wide: ['ژانویه', 'فوریه', 'مارس', 'آپریل', 'می', 'جون', 'جولای', 'آگوست', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر']
};
var dayValues$U = {
  narrow: ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  short: ['1ش', '2ش', '3ش', '4ش', '5ش', 'ج', 'ش'],
  abbreviated: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'],
  wide: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه']
};
var dayPeriodValues$T = {
  narrow: {
    am: 'ق',
    pm: 'ب',
    midnight: 'ن',
    noon: 'ظ',
    morning: 'ص',
    afternoon: 'ب.ظ.',
    evening: 'ع',
    night: 'ش'
  },
  abbreviated: {
    am: 'ق.ظ.',
    pm: 'ب.ظ.',
    midnight: 'نیمه‌شب',
    noon: 'ظهر',
    morning: 'صبح',
    afternoon: 'بعدازظهر',
    evening: 'عصر',
    night: 'شب'
  },
  wide: {
    am: 'قبل‌ازظهر',
    pm: 'بعدازظهر',
    midnight: 'نیمه‌شب',
    noon: 'ظهر',
    morning: 'صبح',
    afternoon: 'بعدازظهر',
    evening: 'عصر',
    night: 'شب'
  }
};
var formattingDayPeriodValues$H = {
  narrow: {
    am: 'ق',
    pm: 'ب',
    midnight: 'ن',
    noon: 'ظ',
    morning: 'ص',
    afternoon: 'ب.ظ.',
    evening: 'ع',
    night: 'ش'
  },
  abbreviated: {
    am: 'ق.ظ.',
    pm: 'ب.ظ.',
    midnight: 'نیمه‌شب',
    noon: 'ظهر',
    morning: 'صبح',
    afternoon: 'بعدازظهر',
    evening: 'عصر',
    night: 'شب'
  },
  wide: {
    am: 'قبل‌ازظهر',
    pm: 'بعدازظهر',
    midnight: 'نیمه‌شب',
    noon: 'ظهر',
    morning: 'صبح',
    afternoon: 'بعدازظهر',
    evening: 'عصر',
    night: 'شب'
  }
};

function ordinalNumber$U(dirtyNumber) {
  return String(dirtyNumber);
}

var localize$U = {
  ordinalNumber: ordinalNumber$U,
  era: buildLocalizeFn({
    values: eraValues$U,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$U,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$U,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$U,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$T,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$H,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$U = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern$U = /\d+/i;
var matchEraPatterns$U = {
  narrow: /^(ق|ب)/i,
  abbreviated: /^(ق\.?\s?م\.?|ق\.?\s?د\.?\s?م\.?|م\.?\s?|د\.?\s?م\.?)/i,
  wide: /^(قبل از میلاد|قبل از دوران مشترک|میلادی|دوران مشترک|بعد از میلاد)/i
};
var parseEraPatterns$U = {
  any: [/^قبل/i, /^بعد/i]
};
var matchQuarterPatterns$U = {
  narrow: /^[1234]/i,
  abbreviated: /^س‌م[1234]/i,
  wide: /^سه‌ماهه [1234]/i
};
var parseQuarterPatterns$U = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$U = {
  narrow: /^[جژفمآاماسند]/i,
  abbreviated: /^(جنو|ژانـ|ژانویه|فوریه|فور|مارس|آوریل|آپر|مه|می|ژوئن|جون|جول|جولـ|ژوئیه|اوت|آگو|سپتمبر|سپتامبر|اکتبر|اکتوبر|نوامبر|نوامـ|دسامبر|دسامـ|دسم)/i,
  wide: /^(ژانویه|جنوری|فبروری|فوریه|مارچ|مارس|آپریل|اپریل|ایپریل|آوریل|مه|می|ژوئن|جون|جولای|ژوئیه|آگست|اگست|آگوست|اوت|سپتمبر|سپتامبر|اکتبر|اکتوبر|نوامبر|نومبر|دسامبر|دسمبر)/i
};
var parseMonthPatterns$U = {
  narrow: [/^(ژ|ج)/i, /^ف/i, /^م/i, /^(آ|ا)/i, /^م/i, /^(ژ|ج)/i, /^(ج|ژ)/i, /^(آ|ا)/i, /^س/i, /^ا/i, /^ن/i, /^د/i],
  any: [/^ژا/i, /^ف/i, /^ما/i, /^آپ/i, /^(می|مه)/i, /^(ژوئن|جون)/i, /^(ژوئی|جول)/i, /^(اوت|آگ)/i, /^س/i, /^(اوک|اک)/i, /^ن/i, /^د/i]
};
var matchDayPatterns$U = {
  narrow: /^[شیدسچپج]/i,
  short: /^(ش|ج|1ش|2ش|3ش|4ش|5ش)/i,
  abbreviated: /^(یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنج‌شنبه|جمعه|شنبه)/i,
  wide: /^(یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنج‌شنبه|جمعه|شنبه)/i
};
var parseDayPatterns$U = {
  narrow: [/^ی/i, /^دو/i, /^س/i, /^چ/i, /^پ/i, /^ج/i, /^ش/i],
  any: [/^(ی|1ش|یکشنبه)/i, /^(د|2ش|دوشنبه)/i, /^(س|3ش|سه‌شنبه)/i, /^(چ|4ش|چهارشنبه)/i, /^(پ|5ش|پنجشنبه)/i, /^(ج|جمعه)/i, /^(ش|شنبه)/i]
};
var matchDayPeriodPatterns$U = {
  narrow: /^(ب|ق|ن|ظ|ص|ب.ظ.|ع|ش)/i,
  abbreviated: /^(ق.ظ.|ب.ظ.|نیمه‌شب|ظهر|صبح|بعدازظهر|عصر|شب)/i,
  wide: /^(قبل‌ازظهر|نیمه‌شب|ظهر|صبح|بعدازظهر|عصر|شب)/i
};
var parseDayPeriodPatterns$U = {
  any: {
    am: /^(ق|ق.ظ.|قبل‌ازظهر)/i,
    pm: /^(ب|ب.ظ.|بعدازظهر)/i,
    midnight: /^(‌نیمه‌شب|ن)/i,
    noon: /^(ظ|ظهر)/i,
    morning: /(ص|صبح)/i,
    afternoon: /(ب|ب.ظ.|بعدازظهر)/i,
    evening: /(ع|عصر)/i,
    night: /(ش|شب)/i
  }
};
var match$U = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$U,
    parsePattern: parseOrdinalNumberPattern$U,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$U,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$U,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$U,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$U,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$U,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$U,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$U,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$U,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$U,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$U,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Persian/Farsi locale (Iran).
 * @language Persian
 * @iso-639-2 ira
 * @author Morteza Ziyae [@mort3za]{@link https://github.com/mort3za}
 */

var locale$W = {
  code: 'fa-IR',
  formatDistance: formatDistance$U,
  formatLong: formatLong$W,
  formatRelative: formatRelative$V,
  localize: localize$U,
  match: match$U,
  options: {
    weekStartsOn: 6
    /* Saturday */
    ,
    firstWeekContainsDate: 1
  }
};

function futureSeconds(text) {
  return text.replace(/sekuntia?/, 'sekunnin');
}

function futureMinutes(text) {
  return text.replace(/minuuttia?/, 'minuutin');
}

function futureHours(text) {
  return text.replace(/tuntia?/, 'tunnin');
}

function futureDays(text) {
  return text.replace(/päivää?/, 'päivän');
}

function futureWeeks(text) {
  return text.replace(/(viikko|viikkoa)/, 'viikon');
}

function futureMonths(text) {
  return text.replace(/(kuukausi|kuukautta)/, 'kuukauden');
}

function futureYears(text) {
  return text.replace(/(vuosi|vuotta)/, 'vuoden');
}

var formatDistanceLocale$R = {
  lessThanXSeconds: {
    one: 'alle sekunti',
    other: 'alle {{count}} sekuntia',
    futureTense: futureSeconds
  },
  xSeconds: {
    one: 'sekunti',
    other: '{{count}} sekuntia',
    futureTense: futureSeconds
  },
  halfAMinute: {
    one: 'puoli minuuttia',
    other: 'puoli minuuttia',
    futureTense: function (_text) {
      return 'puolen minuutin';
    }
  },
  lessThanXMinutes: {
    one: 'alle minuutti',
    other: 'alle {{count}} minuuttia',
    futureTense: futureMinutes
  },
  xMinutes: {
    one: 'minuutti',
    other: '{{count}} minuuttia',
    futureTense: futureMinutes
  },
  aboutXHours: {
    one: 'noin tunti',
    other: 'noin {{count}} tuntia',
    futureTense: futureHours
  },
  xHours: {
    one: 'tunti',
    other: '{{count}} tuntia',
    futureTense: futureHours
  },
  xDays: {
    one: 'päivä',
    other: '{{count}} päivää',
    futureTense: futureDays
  },
  aboutXWeeks: {
    one: 'noin viikko',
    other: 'noin {{count}} viikkoa',
    futureTense: futureWeeks
  },
  xWeeks: {
    one: 'viikko',
    other: '{{count}} viikkoa',
    futureTense: futureWeeks
  },
  aboutXMonths: {
    one: 'noin kuukausi',
    other: 'noin {{count}} kuukautta',
    futureTense: futureMonths
  },
  xMonths: {
    one: 'kuukausi',
    other: '{{count}} kuukautta',
    futureTense: futureMonths
  },
  aboutXYears: {
    one: 'noin vuosi',
    other: 'noin {{count}} vuotta',
    futureTense: futureYears
  },
  xYears: {
    one: 'vuosi',
    other: '{{count}} vuotta',
    futureTense: futureYears
  },
  overXYears: {
    one: 'yli vuosi',
    other: 'yli {{count}} vuotta',
    futureTense: futureYears
  },
  almostXYears: {
    one: 'lähes vuosi',
    other: 'lähes {{count}} vuotta',
    futureTense: futureYears
  }
};
function formatDistance$T(token, count, options) {
  options = options || {};
  var distance = formatDistanceLocale$R[token];
  var result = count === 1 ? distance.one : distance.other.replace('{{count}}', count);

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return distance.futureTense(result) + ' kuluttua';
    } else {
      return result + ' sitten';
    }
  }

  return result;
}

var dateFormats$V = {
  full: 'eeee d. MMMM y',
  long: 'd. MMMM y',
  medium: 'd. MMM y',
  short: 'd.M.y'
};
var timeFormats$V = {
  full: 'HH.mm.ss zzzz',
  long: 'HH.mm.ss z',
  medium: 'HH.mm.ss',
  short: 'HH.mm'
};
var dateTimeFormats$V = {
  full: "{{date}} 'klo' {{time}}",
  long: "{{date}} 'klo' {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$V = {
  date: buildFormatLongFn({
    formats: dateFormats$V,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$V,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$V,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$U = {
  lastWeek: "'viime' eeee 'klo' p",
  yesterday: "'eilen klo' p",
  today: "'tänään klo' p",
  tomorrow: "'huomenna klo' p",
  nextWeek: "'ensi' eeee 'klo' p",
  other: 'P'
};
function formatRelative$U(token, _date, _baseDate, _options) {
  return formatRelativeLocale$U[token];
}

var eraValues$T = {
  narrow: ['eaa.', 'jaa.'],
  abbreviated: ['eaa.', 'jaa.'],
  wide: ['ennen ajanlaskun alkua', 'jälkeen ajanlaskun alun']
};
var quarterValues$T = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1. kvartaali', '2. kvartaali', '3. kvartaali', '4. kvartaali']
};
var monthValues$T = {
  narrow: ['T', 'H', 'M', 'H', 'T', 'K', 'H', 'E', 'S', 'L', 'M', 'J'],
  abbreviated: ['tammi', 'helmi', 'maalis', 'huhti', 'touko', 'kesä', 'heinä', 'elo', 'syys', 'loka', 'marras', 'joulu'],
  wide: ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu']
};
var formattingMonthValues$b = {
  narrow: monthValues$T.narrow,
  abbreviated: monthValues$T.abbreviated,
  wide: monthValues$T.wide.map(function (name) {
    return name + 'ta';
  })
};
var dayValues$T = {
  narrow: ['S', 'M', 'T', 'K', 'T', 'P', 'L'],
  short: ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
  abbreviated: ['sunn.', 'maan.', 'tiis.', 'kesk.', 'torst.', 'perj.', 'la'],
  wide: ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai']
};
var formattingDayValues$3 = {
  narrow: dayValues$T.narrow,
  short: dayValues$T.short,
  abbreviated: dayValues$T.abbreviated,
  wide: dayValues$T.wide.map(function (name) {
    return name + 'na';
  })
};
var dayPeriodValues$S = {
  narrow: {
    am: 'ap',
    pm: 'ip',
    midnight: 'keskiyö',
    noon: 'keskipäivä',
    morning: 'ap',
    afternoon: 'ip',
    evening: 'illalla',
    night: 'yöllä'
  },
  abbreviated: {
    am: 'ap',
    pm: 'ip',
    midnight: 'keskiyö',
    noon: 'keskipäivä',
    morning: 'ap',
    afternoon: 'ip',
    evening: 'illalla',
    night: 'yöllä'
  },
  wide: {
    am: 'ap',
    pm: 'ip',
    midnight: 'keskiyöllä',
    noon: 'keskipäivällä',
    morning: 'aamupäivällä',
    afternoon: 'iltapäivällä',
    evening: 'illalla',
    night: 'yöllä'
  }
};

function ordinalNumber$T(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + '.';
}

var localize$T = {
  ordinalNumber: ordinalNumber$T,
  era: buildLocalizeFn({
    values: eraValues$T,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$T,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$T,
    formattingValues: formattingMonthValues$b,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$T,
    formattingValues: formattingDayValues$3,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$S,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$T = /^(\d+)(\.)/i;
var parseOrdinalNumberPattern$T = /\d+/i;
var matchEraPatterns$T = {
  narrow: /^(e|j)/i,
  abbreviated: /^(eaa.|jaa.)/i,
  wide: /^(ennen ajanlaskun alkua|jälkeen ajanlaskun alun)/i
};
var parseEraPatterns$T = {
  any: [/^e/i, /^j/i]
};
var matchQuarterPatterns$T = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]\.? kvartaali/i
};
var parseQuarterPatterns$T = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$T = {
  narrow: /^[thmkeslj]/i,
  abbreviated: /^(tammi|helmi|maalis|huhti|touko|kesä|heinä|elo|syys|loka|marras|joulu)/i,
  wide: /^(tammikuu|helmikuu|maaliskuu|huhtikuu|toukokuu|kesäkuu|heinäkuu|elokuu|syyskuu|lokakuu|marraskuu|joulukuu)(ta)?/i
};
var parseMonthPatterns$T = {
  narrow: [/^t/i, /^h/i, /^m/i, /^h/i, /^t/i, /^k/i, /^h/i, /^e/i, /^s/i, /^l/i, /^m/i, /^j/i],
  any: [/^ta/i, /^hel/i, /^maa/i, /^hu/i, /^to/i, /^k/i, /^hei/i, /^e/i, /^s/i, /^l/i, /^mar/i, /^j/i]
};
var matchDayPatterns$T = {
  narrow: /^[smtkpl]/i,
  short: /^(su|ma|ti|ke|to|pe|la)/i,
  abbreviated: /^(sunn.|maan.|tiis.|kesk.|torst.|perj.|la)/i,
  wide: /^(sunnuntai|maanantai|tiistai|keskiviikko|torstai|perjantai|lauantai)(na)?/i
};
var parseDayPatterns$T = {
  narrow: [/^s/i, /^m/i, /^t/i, /^k/i, /^t/i, /^p/i, /^l/i],
  any: [/^s/i, /^m/i, /^ti/i, /^k/i, /^to/i, /^p/i, /^l/i]
};
var matchDayPeriodPatterns$T = {
  narrow: /^(ap|ip|keskiyö|keskipäivä|aamupäivällä|iltapäivällä|illalla|yöllä)/i,
  any: /^(ap|ip|keskiyöllä|keskipäivällä|aamupäivällä|iltapäivällä|illalla|yöllä)/i
};
var parseDayPeriodPatterns$T = {
  any: {
    am: /^ap/i,
    pm: /^ip/i,
    midnight: /^keskiyö/i,
    noon: /^keskipäivä/i,
    morning: /aamupäivällä/i,
    afternoon: /iltapäivällä/i,
    evening: /illalla/i,
    night: /yöllä/i
  }
};
var match$T = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$T,
    parsePattern: parseOrdinalNumberPattern$T,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$T,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$T,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$T,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$T,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$T,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$T,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$T,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$T,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$T,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$T,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Finnish locale.
 * @language Finnish
 * @iso-639-2 fin
 * @author Pyry-Samuli Lahti [@Pyppe]{@link https://github.com/Pyppe}
 * @author Edo Rivai [@mikolajgrzyb]{@link https://github.com/mikolajgrzyb}
 * @author Samu Juvonen [@sjuvonen]{@link https://github.com/sjuvonen}
 */

var locale$V = {
  code: 'fi',
  formatDistance: formatDistance$T,
  formatLong: formatLong$V,
  formatRelative: formatRelative$U,
  localize: localize$T,
  match: match$T,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$Q = {
  lessThanXSeconds: {
    one: 'moins d’une seconde',
    other: 'moins de {{count}} secondes'
  },
  xSeconds: {
    one: '1 seconde',
    other: '{{count}} secondes'
  },
  halfAMinute: '30 secondes',
  lessThanXMinutes: {
    one: 'moins d’une minute',
    other: 'moins de {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'environ 1 heure',
    other: 'environ {{count}} heures'
  },
  xHours: {
    one: '1 heure',
    other: '{{count}} heures'
  },
  xDays: {
    one: '1 jour',
    other: '{{count}} jours'
  },
  aboutXWeeks: {
    one: 'environ 1 semaine',
    other: 'environ {{count}} semaines'
  },
  xWeeks: {
    one: '1 semaine',
    other: '{{count}} semaines'
  },
  aboutXMonths: {
    one: 'environ 1 mois',
    other: 'environ {{count}} mois'
  },
  xMonths: {
    one: '1 mois',
    other: '{{count}} mois'
  },
  aboutXYears: {
    one: 'environ 1 an',
    other: 'environ {{count}} ans'
  },
  xYears: {
    one: '1 an',
    other: '{{count}} ans'
  },
  overXYears: {
    one: 'plus d’un an',
    other: 'plus de {{count}} ans'
  },
  almostXYears: {
    one: 'presqu’un an',
    other: 'presque {{count}} ans'
  }
};

var formatDistance$S = function (token, count, options) {
  var result;
  var form = formatDistanceLocale$Q[token];

  if (typeof form === 'string') {
    result = form;
  } else if (count === 1) {
    result = form.one;
  } else {
    result = form.other.replace('{{count}}', String(count));
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'dans ' + result;
    } else {
      return 'il y a ' + result;
    }
  }

  return result;
};

var dateFormats$U = {
  full: 'EEEE d MMMM y',
  long: 'd MMMM y',
  medium: 'd MMM y',
  short: 'dd/MM/y'
};
var timeFormats$U = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$U = {
  full: "{{date}} 'à' {{time}}",
  long: "{{date}} 'à' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$U = {
  date: buildFormatLongFn({
    formats: dateFormats$U,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$U,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$U,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$T = {
  lastWeek: "eeee 'dernier à' p",
  yesterday: "'hier à' p",
  today: "'aujourd’hui à' p",
  tomorrow: "'demain à' p'",
  nextWeek: "eeee 'prochain à' p",
  other: 'P'
};

var formatRelative$T = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$T[token];
};

var eraValues$S = {
  narrow: ['av. J.-C', 'ap. J.-C'],
  abbreviated: ['av. J.-C', 'ap. J.-C'],
  wide: ['avant Jésus-Christ', 'après Jésus-Christ']
};
var quarterValues$S = {
  narrow: ['T1', 'T2', 'T3', 'T4'],
  abbreviated: ['1er trim.', '2ème trim.', '3ème trim.', '4ème trim.'],
  wide: ['1er trimestre', '2ème trimestre', '3ème trimestre', '4ème trimestre']
};
var monthValues$S = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
  wide: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
};
var dayValues$S = {
  narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  short: ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
  abbreviated: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
  wide: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
};
var dayPeriodValues$R = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'minuit',
    noon: 'midi',
    morning: 'mat.',
    afternoon: 'ap.m.',
    evening: 'soir',
    night: 'mat.'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'minuit',
    noon: 'midi',
    morning: 'matin',
    afternoon: 'après-midi',
    evening: 'soir',
    night: 'matin'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'minuit',
    noon: 'midi',
    morning: 'du matin',
    afternoon: 'de l’après-midi',
    evening: 'du soir',
    night: 'du matin'
  }
};

var ordinalNumber$S = function (dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var unit = options === null || options === void 0 ? void 0 : options.unit;
  if (number === 0) return '0';
  var feminineUnits = ['year', 'week', 'hour', 'minute', 'second'];
  var suffix;

  if (number === 1) {
    suffix = unit && feminineUnits.includes(unit) ? 'ère' : 'er';
  } else {
    suffix = 'ème';
  }

  return number + suffix;
};

var localize$S = {
  ordinalNumber: ordinalNumber$S,
  era: buildLocalizeFn({
    values: eraValues$S,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$S,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$S,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$S,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$R,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$S = /^(\d+)(ième|ère|ème|er|e)?/i;
var parseOrdinalNumberPattern$S = /\d+/i;
var matchEraPatterns$S = {
  narrow: /^(av\.J\.C|ap\.J\.C|ap\.J\.-C)/i,
  abbreviated: /^(av\.J\.-C|av\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,
  wide: /^(avant Jésus-Christ|après Jésus-Christ)/i
};
var parseEraPatterns$S = {
  any: [/^av/i, /^ap/i]
};
var matchQuarterPatterns$S = {
  narrow: /^T?[1234]/i,
  abbreviated: /^[1234](er|ème|e)? trim\.?/i,
  wide: /^[1234](er|ème|e)? trimestre/i
};
var parseQuarterPatterns$S = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$S = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(janv|févr|mars|avr|mai|juin|juill|juil|août|sept|oct|nov|déc)\.?/i,
  wide: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i
};
var parseMonthPatterns$S = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^av/i, /^ma/i, /^juin/i, /^juil/i, /^ao/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$S = {
  narrow: /^[lmjvsd]/i,
  short: /^(di|lu|ma|me|je|ve|sa)/i,
  abbreviated: /^(dim|lun|mar|mer|jeu|ven|sam)\.?/i,
  wide: /^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)/i
};
var parseDayPatterns$S = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^di/i, /^lu/i, /^ma/i, /^me/i, /^je/i, /^ve/i, /^sa/i]
};
var matchDayPeriodPatterns$S = {
  narrow: /^(a|p|minuit|midi|mat\.?|ap\.?m\.?|soir|nuit)/i,
  any: /^([ap]\.?\s?m\.?|du matin|de l'après[-\s]midi|du soir|de la nuit)/i
};
var parseDayPeriodPatterns$S = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^min/i,
    noon: /^mid/i,
    morning: /mat/i,
    afternoon: /ap/i,
    evening: /soir/i,
    night: /nuit/i
  }
};
var match$S = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$S,
    parsePattern: parseOrdinalNumberPattern$S,
    valueCallback: function (value) {
      return parseInt(value);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$S,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$S,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$S,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$S,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$S,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$S,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$S,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$S,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$S,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$S,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary French locale.
 * @language French
 * @iso-639-2 fra
 * @author Jean Dupouy [@izeau]{@link https://github.com/izeau}
 * @author François B [@fbonzon]{@link https://github.com/fbonzon}
 */

var locale$U = {
  code: 'fr',
  formatDistance: formatDistance$S,
  formatLong: formatLong$U,
  formatRelative: formatRelative$T,
  localize: localize$S,
  match: match$S,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var dateFormats$T = {
  full: 'EEEE d MMMM y',
  long: 'd MMMM y',
  medium: 'd MMM y',
  short: 'yy-MM-dd'
};
var timeFormats$T = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$T = {
  full: "{{date}} 'à' {{time}}",
  long: "{{date}} 'à' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$T = {
  date: buildFormatLongFn({
    formats: dateFormats$T,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$T,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$T,
    defaultWidth: 'full'
  })
};

// Same as fr
/**
 * @type {Locale}
 * @category Locales
 * @summary French locale (Canada).
 * @language French
 * @iso-639-2 fra
 * @author Jean Dupouy [@izeau]{@link https://github.com/izeau}
 * @author François B [@fbonzon]{@link https://github.com/fbonzon}
 * @author Gabriele Petrioli [@gpetrioli]{@link https://github.com/gpetrioli}
 */

var locale$T = {
  code: 'fr-CA',
  formatDistance: formatDistance$S,
  formatLong: formatLong$T,
  formatRelative: formatRelative$T,
  localize: localize$S,
  match: match$S,
  // Unique for fr-CA
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var dateFormats$S = {
  full: 'EEEE d MMMM y',
  long: 'd MMMM y',
  medium: 'd MMM y',
  short: 'dd.MM.y'
};
var timeFormats$S = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$S = {
  full: "{{date}} 'à' {{time}}",
  long: "{{date}} 'à' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$S = {
  date: buildFormatLongFn({
    formats: dateFormats$S,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$S,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$S,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$S = {
  lastWeek: "eeee 'la semaine dernière à' p",
  yesterday: "'hier à' p",
  today: "'aujourd’hui à' p",
  tomorrow: "'demain à' p'",
  nextWeek: "eeee 'la semaine prochaine à' p",
  other: 'P'
};

var formatRelative$S = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$S[token];
};

// Same as fr
/**
 * @type {Locale}
 * @category Locales
 * @summary French locale (Switzerland).
 * @language French
 * @iso-639-2 fra
 * @author Jean Dupouy [@izeau]{@link https://github.com/izeau}
 * @author François B [@fbonzon]{@link https://github.com/fbonzon}
 * @author Van Vuong Ngo [@vanvuongngo]{@link https://github.com/vanvuongngo}
 * @author Alex Hoeing [@dcbn]{@link https://github.com/dcbn}
 */

var locale$S = {
  code: 'fr-CH',
  formatDistance: formatDistance$S,
  formatLong: formatLong$S,
  formatRelative: formatRelative$S,
  localize: localize$S,
  match: match$S,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$P = {
  lessThanXSeconds: {
    one: 'minder as 1 sekonde',
    other: 'minder as {{count}} sekonden'
  },
  xSeconds: {
    one: '1 sekonde',
    other: '{{count}} sekonden'
  },
  halfAMinute: 'oardel minút',
  lessThanXMinutes: {
    one: 'minder as 1 minút',
    other: 'minder as {{count}} minuten'
  },
  xMinutes: {
    one: '1 minút',
    other: '{{count}} minuten'
  },
  aboutXHours: {
    one: 'sawat 1 oere',
    other: 'sawat {{count}} oere'
  },
  xHours: {
    one: '1 oere',
    other: '{{count}} oere'
  },
  xDays: {
    one: '1 dei',
    other: '{{count}} dagen'
  },
  aboutXWeeks: {
    one: 'sawat 1 wike',
    other: 'sawat {{count}} wiken'
  },
  xWeeks: {
    one: '1 wike',
    other: '{{count}} wiken'
  },
  aboutXMonths: {
    one: 'sawat 1 moanne',
    other: 'sawat {{count}} moannen'
  },
  xMonths: {
    one: '1 moanne',
    other: '{{count}} moannen'
  },
  aboutXYears: {
    one: 'sawat 1 jier',
    other: 'sawat {{count}} jier'
  },
  xYears: {
    one: '1 jier',
    other: '{{count}} jier'
  },
  overXYears: {
    one: 'mear as 1 jier',
    other: 'mear as {{count}}s jier'
  },
  almostXYears: {
    one: 'hast 1 jier',
    other: 'hast {{count}} jier'
  }
};
function formatDistance$R(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$P[token] === 'string') {
    result = formatDistanceLocale$P[token];
  } else if (count === 1) {
    result = formatDistanceLocale$P[token].one;
  } else {
    result = formatDistanceLocale$P[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'oer ' + result;
    } else {
      return result + ' lyn';
    }
  }

  return result;
}

var dateFormats$R = {
  full: 'EEEE d MMMM y',
  long: 'd MMMM y',
  medium: 'd MMM y',
  short: 'dd-MM-y'
};
var timeFormats$R = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$R = {
  full: "{{date}} 'om' {{time}}",
  long: "{{date}} 'om' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$R = {
  date: buildFormatLongFn({
    formats: dateFormats$R,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$R,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$R,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$R = {
  lastWeek: "'ôfrûne' eeee 'om' p",
  yesterday: "'juster om' p",
  today: "'hjoed om' p",
  tomorrow: "'moarn om' p",
  nextWeek: "eeee 'om' p",
  other: 'P'
};
function formatRelative$R(token, _date, _baseDate, _options) {
  return formatRelativeLocale$R[token];
}

var eraValues$R = {
  narrow: ['f.K.', 'n.K.'],
  abbreviated: ['f.Kr.', 'n.Kr.'],
  wide: ['foar Kristus', 'nei Kristus']
};
var quarterValues$R = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['K1', 'K2', 'K3', 'K4'],
  wide: ['1e fearnsjier', '2e fearnsjier', '3e fearnsjier', '4e fearnsjier']
};
var monthValues$R = {
  narrow: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
  abbreviated: ['jan.', 'feb.', 'mrt.', 'apr.', 'mai.', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'des.'],
  wide: ['jannewaris', 'febrewaris', 'maart', 'april', 'maaie', 'juny', 'july', 'augustus', 'septimber', 'oktober', 'novimber', 'desimber']
};
var dayValues$R = {
  narrow: ['s', 'm', 't', 'w', 't', 'f', 's'],
  short: ['si', 'mo', 'ti', 'wo', 'to', 'fr', 'so'],
  abbreviated: ['snein', 'moa', 'tii', 'woa', 'ton', 'fre', 'sneon'],
  wide: ['snein', 'moandei', 'tiisdei', 'woansdei', 'tongersdei', 'freed', 'sneon']
};
var dayPeriodValues$Q = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'middernacht',
    noon: 'middei',
    morning: 'moarns',
    afternoon: 'middeis',
    evening: 'jûns',
    night: 'nachts'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'middernacht',
    noon: 'middei',
    morning: 'moarns',
    afternoon: 'middeis',
    evening: 'jûns',
    night: 'nachts'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'middernacht',
    noon: 'middei',
    morning: 'moarns',
    afternoon: 'middeis',
    evening: 'jûns',
    night: 'nachts'
  }
};

function ordinalNumber$R(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + 'e';
}

var localize$R = {
  ordinalNumber: ordinalNumber$R,
  era: buildLocalizeFn({
    values: eraValues$R,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$R,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$R,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$R,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$Q,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$R = /^(\d+)e?/i;
var parseOrdinalNumberPattern$R = /\d+/i;
var matchEraPatterns$R = {
  narrow: /^([fn]\.? ?K\.?)/,
  abbreviated: /^([fn]\. ?Kr\.?)/,
  wide: /^((foar|nei) Kristus)/
};
var parseEraPatterns$R = {
  any: [/^f/, /^n/]
};
var matchQuarterPatterns$R = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^[1234]e fearnsjier/i
};
var parseQuarterPatterns$R = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$R = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mrt.|apr.|mai.|jun.|jul.|aug.|sep.|okt.|nov.|des.)/i,
  wide: /^(jannewaris|febrewaris|maart|april|maaie|juny|july|augustus|septimber|oktober|novimber|desimber)/i
};
var parseMonthPatterns$R = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^jan/i, /^feb/i, /^m(r|a)/i, /^apr/i, /^mai/i, /^jun/i, /^jul/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^des/i]
};
var matchDayPatterns$R = {
  narrow: /^[smtwf]/i,
  short: /^(si|mo|ti|wo|to|fr|so)/i,
  abbreviated: /^(snein|moa|tii|woa|ton|fre|sneon)/i,
  wide: /^(snein|moandei|tiisdei|woansdei|tongersdei|freed|sneon)/i
};
var parseDayPatterns$R = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^sn/i, /^mo/i, /^ti/i, /^wo/i, /^to/i, /^fr/i, /^sn/i]
};
var matchDayPeriodPatterns$R = {
  any: /^(am|pm|middernacht|middeis|moarns|middei|jûns|nachts)/i
};
var parseDayPeriodPatterns$R = {
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /^middernacht/i,
    noon: /^middei/i,
    morning: /moarns/i,
    afternoon: /^middeis/i,
    evening: /jûns/i,
    night: /nachts/i
  }
};
var match$R = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$R,
    parsePattern: parseOrdinalNumberPattern$R,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$R,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$R,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$R,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$R,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$R,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$R,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$R,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$R,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$R,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$R,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Western Frisian locale (Netherlands).
 * @language West Frisian
 * @iso-639-2 fry
 * @author Damon Asberg [@damon02]{@link https://github.com/damon02}
 */

var locale$R = {
  code: 'fy',
  formatDistance: formatDistance$R,
  formatLong: formatLong$R,
  formatRelative: formatRelative$R,
  localize: localize$R,
  match: match$R,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$O = {
  lessThanXSeconds: {
    one: 'nas lugha na diog',
    other: 'nas lugha na {{count}} diogan'
  },
  xSeconds: {
    one: '1 diog',
    two: '2 dhiog',
    twenty: '20 diog',
    other: '{{count}} diogan'
  },
  halfAMinute: 'leth mhionaid',
  lessThanXMinutes: {
    one: 'nas lugha na mionaid',
    other: 'nas lugha na {{count}} mionaidean'
  },
  xMinutes: {
    one: '1 mionaid',
    two: '2 mhionaid',
    twenty: '20 mionaid',
    other: '{{count}} mionaidean'
  },
  aboutXHours: {
    one: 'mu uair de thìde',
    other: 'mu {{count}} uairean de thìde'
  },
  xHours: {
    one: '1 uair de thìde',
    two: '2 uair de thìde',
    twenty: '20 uair de thìde',
    other: '{{count}} uairean de thìde'
  },
  xDays: {
    one: '1 là',
    other: '{{count}} là'
  },
  aboutXWeeks: {
    one: 'mu 1 seachdain',
    other: 'mu {{count}} seachdainean'
  },
  xWeeks: {
    one: '1 seachdain',
    other: '{{count}} seachdainean'
  },
  aboutXMonths: {
    one: 'mu mhìos',
    other: 'mu {{count}} mìosan'
  },
  xMonths: {
    one: '1 mìos',
    other: '{{count}} mìosan'
  },
  aboutXYears: {
    one: 'mu bhliadhna',
    other: 'mu {{count}} bliadhnaichean'
  },
  xYears: {
    one: '1 bhliadhna',
    other: '{{count}} bliadhna'
  },
  overXYears: {
    one: 'còrr is bliadhna',
    other: 'còrr is {{count}} bliadhnaichean'
  },
  almostXYears: {
    one: 'cha mhòr bliadhna',
    other: 'cha mhòr {{count}} bliadhnaichean'
  }
};
function formatDistance$Q(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$O[token] === 'string') {
    result = formatDistanceLocale$O[token];
  } else if (count === 1) {
    result = formatDistanceLocale$O[token].one;
  } else if (count === 2 && !!formatDistanceLocale$O[token].two) {
    result = formatDistanceLocale$O[token].two;
  } else if (count === 9 && !!formatDistanceLocale$O[token].nine) {
    result = formatDistanceLocale$O[token].nine;
  } else if (count === 20 && !!formatDistanceLocale$O[token].twenty) {
    result = formatDistanceLocale$O[token].twenty;
  } else if (count === 30 && !!formatDistanceLocale$O[token].thirty) {
    result = formatDistanceLocale$O[token].thirty;
  } else {
    result = formatDistanceLocale$O[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'ann an ' + result;
    } else {
      return 'o chionn ' + result;
    }
  }

  return result;
}

var dateFormats$Q = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats$Q = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$Q = {
  full: "{{date}} 'aig' {{time}}",
  long: "{{date}} 'aig' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$Q = {
  date: buildFormatLongFn({
    formats: dateFormats$Q,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$Q,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$Q,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$Q = {
  lastWeek: "'mu dheireadh' eeee 'aig' p",
  //FIX
  yesterday: "'an-dè aig' p",
  today: "'an-diugh aig' p",
  tomorrow: "'a-màireach aig' p",
  nextWeek: "eeee 'aig' p",
  other: 'P'
};
function formatRelative$Q(token, _date, _baseDate, _options) {
  return formatRelativeLocale$Q[token];
}

var eraValues$Q = {
  narrow: ['R', 'A'],
  abbreviated: ['RC', 'AD'],
  wide: ['ro Chrìosta', 'anno domini']
};
var quarterValues$Q = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['C1', 'C2', 'C3', 'C4'],
  wide: ["a' chiad chairteal", 'an dàrna cairteal', 'an treas cairteal', 'an ceathramh cairteal']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$Q = {
  narrow: ['F', 'G', 'M', 'G', 'C', 'Ò', 'I', 'L', 'S', 'D', 'S', 'D'],
  abbreviated: ['Faoi', 'Gear', 'Màrt', 'Gibl', 'Cèit', 'Ògmh', 'Iuch', 'Lùn', 'Sult', 'Dàmh', 'Samh', 'Dùbh'],
  wide: ['Am Faoilleach', 'An Gearran', 'Am Màrt', 'An Giblean', 'An Cèitean', 'An t-Ògmhios', 'An t-Iuchar', 'An Lùnastal', 'An t-Sultain', 'An Dàmhair', 'An t-Samhain', 'An Dùbhlachd']
};
var dayValues$Q = {
  narrow: ['D', 'L', 'M', 'C', 'A', 'H', 'S'],
  short: ['Dò', 'Lu', 'Mà', 'Ci', 'Ar', 'Ha', 'Sa'],
  abbreviated: ['Did', 'Dil', 'Dim', 'Dic', 'Dia', 'Dih', 'Dis'],
  wide: ['Didòmhnaich', 'Diluain', 'Dimàirt', 'Diciadain', 'Diardaoin', 'Dihaoine', 'Disathairne']
};
var dayPeriodValues$P = {
  narrow: {
    am: 'm',
    pm: 'f',
    midnight: 'm.o.',
    noon: 'm.l.',
    morning: 'madainn',
    afternoon: 'feasgar',
    evening: 'feasgar',
    night: 'oidhche'
  },
  abbreviated: {
    am: 'M.',
    pm: 'F.',
    midnight: 'meadhan oidhche',
    noon: 'meadhan là',
    morning: 'madainn',
    afternoon: 'feasgar',
    evening: 'feasgar',
    night: 'oidhche'
  },
  wide: {
    am: 'm.',
    pm: 'f.',
    midnight: 'meadhan oidhche',
    noon: 'meadhan là',
    morning: 'madainn',
    afternoon: 'feasgar',
    evening: 'feasgar',
    night: 'oidhche'
  }
};
var formattingDayPeriodValues$G = {
  narrow: {
    am: 'm',
    pm: 'f',
    midnight: 'm.o.',
    noon: 'm.l.',
    morning: 'sa mhadainn',
    afternoon: 'feasgar',
    evening: 'feasgar',
    night: 'air an oidhche'
  },
  abbreviated: {
    am: 'M.',
    pm: 'F.',
    midnight: 'meadhan oidhche',
    noon: 'meadhan là',
    morning: 'sa mhadainn',
    afternoon: 'feasgar',
    evening: 'feasgar',
    night: 'air an oidhche'
  },
  wide: {
    am: 'm.',
    pm: 'f.',
    midnight: 'meadhan oidhche',
    noon: 'meadhan là',
    morning: 'sa mhadainn',
    afternoon: 'feasgar',
    evening: 'feasgar',
    night: 'air an oidhche'
  }
};

function ordinalNumber$Q(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'd';

      case 2:
        return number + 'na';
    }
  }

  if (rem100 === 12) {
    return number + 'na';
  }

  return number + 'mh';
}

var localize$Q = {
  ordinalNumber: ordinalNumber$Q,
  era: buildLocalizeFn({
    values: eraValues$Q,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$Q,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$Q,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$Q,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$P,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$G,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$Q = /^(\d+)(d|na|tr|mh)?/i;
var parseOrdinalNumberPattern$Q = /\d+/i;
var matchEraPatterns$Q = {
  narrow: /^(r|a)/i,
  abbreviated: /^(r\.?\s?c\.?|r\.?\s?a\.?\s?c\.?|a\.?\s?d\.?|a\.?\s?c\.?)/i,
  wide: /^(ro Chrìosta|ron aois choitchinn|anno domini|aois choitcheann)/i
};
var parseEraPatterns$Q = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns$Q = {
  narrow: /^[1234]/i,
  abbreviated: /^c[1234]/i,
  wide: /^[1234](cd|na|tr|mh)? cairteal/i
};
var parseQuarterPatterns$Q = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$Q = {
  narrow: /^[fgmcòilsd]/i,
  abbreviated: /^(faoi|gear|màrt|gibl|cèit|ògmh|iuch|lùn|sult|dàmh|samh|dùbh)/i,
  wide: /^(am faoilleach|an gearran|am màrt|an giblean|an cèitean|an t-Ògmhios|an t-Iuchar|an lùnastal|an t-Sultain|an dàmhair|an t-Samhain|an dùbhlachd)/i
};
var parseMonthPatterns$Q = {
  narrow: [/^f/i, /^g/i, /^m/i, /^g/i, /^c/i, /^ò/i, /^i/i, /^l/i, /^s/i, /^d/i, /^s/i, /^d/i],
  any: [/^fa/i, /^ge/i, /^mà/i, /^gi/i, /^c/i, /^ò/i, /^i/i, /^l/i, /^su/i, /^d/i, /^sa/i, /^d/i]
};
var matchDayPatterns$Q = {
  narrow: /^[dlmcahs]/i,
  short: /^(dò|lu|mà|ci|ar|ha|sa)/i,
  abbreviated: /^(did|dil|dim|dic|dia|dih|dis)/i,
  wide: /^(didòmhnaich|diluain|dimàirt|diciadain|diardaoin|dihaoine|disathairne)/i
};
var parseDayPatterns$Q = {
  narrow: [/^d/i, /^l/i, /^m/i, /^c/i, /^a/i, /^h/i, /^s/i],
  any: [/^d/i, /^l/i, /^m/i, /^c/i, /^a/i, /^h/i, /^s/i]
};
var matchDayPeriodPatterns$Q = {
  narrow: /^(a|p|mi|n|(san|aig) (madainn|feasgar|feasgar|oidhche))/i,
  any: /^([ap]\.?\s?m\.?|meadhan oidhche|meadhan là|(san|aig) (madainn|feasgar|feasgar|oidhche))/i
};
var parseDayPeriodPatterns$Q = {
  any: {
    am: /^m/i,
    pm: /^f/i,
    midnight: /^meadhan oidhche/i,
    noon: /^meadhan là/i,
    morning: /sa mhadainn/i,
    afternoon: /feasgar/i,
    evening: /feasgar/i,
    night: /air an oidhche/i
  }
};
var match$Q = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$Q,
    parsePattern: parseOrdinalNumberPattern$Q,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$Q,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$Q,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$Q,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$Q,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$Q,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$Q,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$Q,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$Q,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$Q,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$Q,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Scottish Gaelic.
 * @language Scottish Gaelic
 * @iso-639-2 gla
 * @author Lee Driscoll [@leedriscoll]{@link https://github.com/leedriscoll}
 */

var locale$Q = {
  code: 'gd',
  formatDistance: formatDistance$Q,
  formatLong: formatLong$Q,
  formatRelative: formatRelative$Q,
  localize: localize$Q,
  match: match$Q,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$N = {
  lessThanXSeconds: {
    one: 'menos dun segundo',
    other: 'menos de {{count}} segundos'
  },
  xSeconds: {
    one: '1 segundo',
    other: '{{count}} segundos'
  },
  halfAMinute: 'medio minuto',
  lessThanXMinutes: {
    one: 'menos dun minuto',
    other: 'menos de {{count}} minutos'
  },
  xMinutes: {
    one: '1 minuto',
    other: '{{count}} minutos'
  },
  aboutXHours: {
    one: 'arredor dunha hora',
    other: 'arredor de {{count}} horas'
  },
  xHours: {
    one: '1 hora',
    other: '{{count}} horas'
  },
  xDays: {
    one: '1 día',
    other: '{{count}} días'
  },
  aboutXWeeks: {
    one: 'arredor dunha semana',
    other: 'arredor de {{count}} semanas'
  },
  xWeeks: {
    one: '1 semana',
    other: '{{count}} semanas'
  },
  aboutXMonths: {
    one: 'arredor de 1 mes',
    other: 'arredor de {{count}} meses'
  },
  xMonths: {
    one: '1 mes',
    other: '{{count}} meses'
  },
  aboutXYears: {
    one: 'arredor dun ano',
    other: 'arredor de {{count}} anos'
  },
  xYears: {
    one: '1 ano',
    other: '{{count}} anos'
  },
  overXYears: {
    one: 'máis dun ano',
    other: 'máis de {{count}} anos'
  },
  almostXYears: {
    one: 'case un ano',
    other: 'case {{count}} anos'
  }
};
function formatDistance$P(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$N[token] === 'string') {
    result = formatDistanceLocale$N[token];
  } else if (count === 1) {
    result = formatDistanceLocale$N[token].one;
  } else {
    result = formatDistanceLocale$N[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'en ' + result;
    } else {
      return 'hai ' + result;
    }
  }

  return result;
}

var dateFormats$P = {
  full: "EEEE, d 'de' MMMM y",
  long: "d 'de' MMMM y",
  medium: 'd MMM y',
  short: 'dd/MM/y'
};
var timeFormats$P = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$P = {
  full: "{{date}} 'ás' {{time}}",
  long: "{{date}} 'ás' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$P = {
  date: buildFormatLongFn({
    formats: dateFormats$P,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$P,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$P,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$P = {
  lastWeek: "'o' eeee 'pasado á' LT",
  yesterday: "'onte á' p",
  today: "'hoxe á' p",
  tomorrow: "'mañá á' p",
  nextWeek: "eeee 'á' p",
  other: 'P'
};
var formatRelativeLocalePlural = {
  lastWeek: "'o' eeee 'pasado ás' p",
  yesterday: "'onte ás' p",
  today: "'hoxe ás' p",
  tomorrow: "'mañá ás' p",
  nextWeek: "eeee 'ás' p",
  other: 'P'
};
function formatRelative$P(token, date, _baseDate, _options) {
  if (date.getUTCHours() !== 1) {
    return formatRelativeLocalePlural[token];
  }

  return formatRelativeLocale$P[token];
}

var eraValues$P = {
  narrow: ['AC', 'DC'],
  abbreviated: ['AC', 'DC'],
  wide: ['antes de cristo', 'despois de cristo']
};
var quarterValues$P = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['T1', 'T2', 'T3', 'T4'],
  wide: ['1º trimestre', '2º trimestre', '3º trimestre', '4º trimestre']
};
var monthValues$P = {
  narrow: ['e', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
  abbreviated: ['xan', 'feb', 'mar', 'abr', 'mai', 'xun', 'xul', 'ago', 'set', 'out', 'nov', 'dec'],
  wide: ['xaneiro', 'febreiro', 'marzo', 'abril', 'maio', 'xuño', 'xullo', 'agosto', 'setembro', 'outubro', 'novembro', 'decembro']
};
var dayValues$P = {
  narrow: ['d', 'l', 'm', 'm', 'j', 'v', 's'],
  short: ['do', 'lu', 'ma', 'me', 'xo', 've', 'sa'],
  abbreviated: ['dom', 'lun', 'mar', 'mer', 'xov', 'ven', 'sab'],
  wide: ['domingo', 'luns', 'martes', 'mércores', 'xoves', 'venres', 'sábado']
};
var dayPeriodValues$O = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mn',
    noon: 'md',
    morning: 'mañá',
    afternoon: 'tarde',
    evening: 'tarde',
    night: 'noite'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'medianoite',
    noon: 'mediodía',
    morning: 'mañá',
    afternoon: 'tarde',
    evening: 'tardiña',
    night: 'noite'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'medianoite',
    noon: 'mediodía',
    morning: 'mañá',
    afternoon: 'tarde',
    evening: 'tardiña',
    night: 'noite'
  }
};
var formattingDayPeriodValues$F = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mn',
    noon: 'md',
    morning: 'da mañá',
    afternoon: 'da tarde',
    evening: 'da tardiña',
    night: 'da noite'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'medianoite',
    noon: 'mediodía',
    morning: 'da mañá',
    afternoon: 'da tarde',
    evening: 'da tardiña',
    night: 'da noite'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'medianoite',
    noon: 'mediodía',
    morning: 'da mañá',
    afternoon: 'da tarde',
    evening: 'da tardiña',
    night: 'da noite'
  }
};

function ordinalNumber$P(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + 'º';
}

var localize$P = {
  ordinalNumber: ordinalNumber$P,
  era: buildLocalizeFn({
    values: eraValues$P,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$P,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$P,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$P,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$O,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$F,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$P = /^(\d+)(º)?/i;
var parseOrdinalNumberPattern$P = /\d+/i;
var matchEraPatterns$P = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes da era com[uú]n|despois de cristo|era com[uú]n)/i
};
var parseEraPatterns$P = {
  any: [/^ac/i, /^dc/i],
  wide: [/^(antes de cristo|antes da era com[uú]n)/i, /^(despois de cristo|era com[uú]n)/i]
};
var matchQuarterPatterns$P = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
var parseQuarterPatterns$P = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$P = {
  narrow: /^[xfmasond]/i,
  abbreviated: /^(xan|feb|mar|abr|mai|xun|xul|ago|set|out|nov|dec)/i,
  wide: /^(xaneiro|febreiro|marzo|abril|maio|xuño|xullo|agosto|setembro|outubro|novembro|decembro)/i
};
var parseMonthPatterns$P = {
  narrow: [/^x/i, /^f/i, /^m/i, /^a/i, /^m/i, /^x/i, /^x/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^xan/i, /^feb/i, /^mar/i, /^abr/i, /^mai/i, /^xun/i, /^xul/i, /^ago/i, /^set/i, /^out/i, /^nov/i, /^dec/i]
};
var matchDayPatterns$P = {
  narrow: /^[dlmxvs]/i,
  short: /^(do|lu|ma|me|xo|ve|sa)/i,
  abbreviated: /^(dom|lun|mar|mer|xov|ven|sab)/i,
  wide: /^(domingo|luns|martes|m[eé]rcores|xoves|venres|s[áa]bado)/i
};
var parseDayPatterns$P = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^x/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^me/i, /^xo/i, /^ve/i, /^sa/i]
};
var matchDayPeriodPatterns$P = {
  narrow: /^(a|p|mn|md|(da|[aá]s) (mañ[aá]|tarde|noite))/i,
  any: /^([ap]\.?\s?m\.?|medianoite|mediod[ií]a|(da|[aá]s) (mañ[aá]|tarde|noite))/i
};
var parseDayPeriodPatterns$P = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn/i,
    noon: /^md/i,
    morning: /mañ[aá]/i,
    afternoon: /tarde/i,
    evening: /tardiña/i,
    night: /noite/i
  }
};
var match$P = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$P,
    parsePattern: parseOrdinalNumberPattern$P,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$P,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$P,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$P,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$P,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$P,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$P,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$P,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$P,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$P,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$P,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Galician locale.
 * @language Galician
 * @iso-639-2 glg
 * @author Alberto Doval - Cocodin Technology[@cocodinTech]{@link https://github.com/cocodinTech}
 * @author Fidel Pita [@fidelpita]{@link https://github.com/fidelpita}
 */

var locale$P = {
  code: 'gl',
  formatDistance: formatDistance$P,
  formatLong: formatLong$P,
  formatRelative: formatRelative$P,
  localize: localize$P,
  match: match$P,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

// Source: https://www.unicode.org/cldr/charts/32/summary/gu.html
var formatDistanceLocale$M = {
  lessThanXSeconds: {
    one: 'હમણાં',
    // CLDR #1461
    other: '​આશરે {{count}} સેકંડ'
  },
  xSeconds: {
    one: '1 સેકંડ',
    other: '{{count}} સેકંડ'
  },
  halfAMinute: 'અડધી મિનિટ',
  lessThanXMinutes: {
    one: 'આ મિનિટ',
    // CLDR #1448
    other: '​આશરે {{count}} મિનિટ'
  },
  xMinutes: {
    one: '1 મિનિટ',
    other: '{{count}} મિનિટ'
  },
  aboutXHours: {
    one: '​આશરે 1 કલાક',
    other: '​આશરે {{count}} કલાક'
  },
  xHours: {
    one: '1 કલાક',
    other: '{{count}} કલાક'
  },
  xDays: {
    one: '1 દિવસ',
    other: '{{count}} દિવસ'
  },
  aboutXWeeks: {
    one: 'આશરે 1 અઠવાડિયું',
    other: 'આશરે {{count}} અઠવાડિયા'
  },
  xWeeks: {
    one: '1 અઠવાડિયું',
    other: '{{count}} અઠવાડિયા'
  },
  aboutXMonths: {
    one: 'આશરે 1 મહિનો',
    other: 'આશરે {{count}} મહિના'
  },
  xMonths: {
    one: '1 મહિનો',
    other: '{{count}} મહિના'
  },
  aboutXYears: {
    one: 'આશરે 1 વર્ષ',
    other: 'આશરે {{count}} વર્ષ'
  },
  xYears: {
    one: '1 વર્ષ',
    other: '{{count}} વર્ષ'
  },
  overXYears: {
    one: '1 વર્ષથી વધુ',
    other: '{{count}} વર્ષથી વધુ'
  },
  almostXYears: {
    one: 'લગભગ 1 વર્ષ',
    other: 'લગભગ {{count}} વર્ષ'
  }
};
function formatDistance$O(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$M[token] === 'string') {
    result = formatDistanceLocale$M[token];
  } else if (count === 1) {
    result = formatDistanceLocale$M[token].one;
  } else {
    result = formatDistanceLocale$M[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return result + 'માં';
    } else {
      return result + ' પહેલાં';
    }
  }

  return result;
}

var dateFormats$O = {
  full: 'EEEE, d MMMM, y',
  // CLDR #1825
  long: 'd MMMM, y',
  // CLDR #1826
  medium: 'd MMM, y',
  // CLDR #1827
  short: 'd/M/yy' // CLDR #1828

};
var timeFormats$O = {
  full: 'hh:mm:ss a zzzz',
  // CLDR #1829
  long: 'hh:mm:ss a z',
  // CLDR #1830
  medium: 'hh:mm:ss a',
  // CLDR #1831
  short: 'hh:mm a' // CLDR #1832

};
var dateTimeFormats$O = {
  full: '{{date}} {{time}}',
  // CLDR #1833
  long: '{{date}} {{time}}',
  // CLDR #1834
  medium: '{{date}} {{time}}',
  // CLDR #1835
  short: '{{date}} {{time}}' // CLDR #1836

};
var formatLong$O = {
  date: buildFormatLongFn({
    formats: dateFormats$O,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$O,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$O,
    defaultWidth: 'full'
  })
};

// Source: https://www.unicode.org/cldr/charts/32/summary/gu.html
var formatRelativeLocale$O = {
  lastWeek: "'પાછલા' eeee p",
  // CLDR #1384
  yesterday: "'ગઈકાલે' p",
  // CLDR #1409
  today: "'આજે' p",
  // CLDR #1410
  tomorrow: "'આવતીકાલે' p",
  // CLDR #1411
  nextWeek: 'eeee p',
  // CLDR #1386
  other: 'P'
};
function formatRelative$O(token, _date, _baseDate, _options) {
  return formatRelativeLocale$O[token];
}

// #1621 - #1630

var eraValues$O = {
  narrow: ['ઈસપૂ', 'ઈસ'],
  abbreviated: ['ઈ.સ.પૂર્વે', 'ઈ.સ.'],
  wide: ['ઈસવીસન પૂર્વે', 'ઈસવીસન']
}; // https://www.unicode.org/cldr/charts/32/summary/gu.html
// #1631 - #1654

var quarterValues$O = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1લો ત્રિમાસ', '2જો ત્રિમાસ', '3જો ત્રિમાસ', '4થો ત્રિમાસ']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
// https://www.unicode.org/cldr/charts/32/summary/gu.html
// #1655 - #1726

var monthValues$O = {
  narrow: ['જા', 'ફે', 'મા', 'એ', 'મે', 'જૂ', 'જુ', 'ઓ', 'સ', 'ઓ', 'ન', 'ડિ'],
  abbreviated: ['જાન્યુ', 'ફેબ્રુ', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન', 'જુલાઈ', 'ઑગસ્ટ', 'સપ્ટે', 'ઓક્ટો', 'નવે', 'ડિસે'],
  wide: ['જાન્યુઆરી', 'ફેબ્રુઆરી', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન', 'જુલાઇ', 'ઓગસ્ટ', 'સપ્ટેમ્બર', 'ઓક્ટોબર', 'નવેમ્બર', 'ડિસેમ્બર']
}; // https://www.unicode.org/cldr/charts/32/summary/gu.html
// #1727 - #1768

var dayValues$O = {
  narrow: ['ર', 'સો', 'મં', 'બુ', 'ગુ', 'શુ', 'શ'],
  short: ['ર', 'સો', 'મં', 'બુ', 'ગુ', 'શુ', 'શ'],
  abbreviated: ['રવિ', 'સોમ', 'મંગળ', 'બુધ', 'ગુરુ', 'શુક્ર', 'શનિ'],
  wide: ['રવિવાર'
  /* Sunday */
  , 'સોમવાર'
  /* Monday */
  , 'મંગળવાર'
  /* Tuesday */
  , 'બુધવાર'
  /* Wednesday */
  , 'ગુરુવાર'
  /* Thursday */
  , 'શુક્રવાર'
  /* Friday */
  , 'શનિવાર'
  /* Saturday */
  ]
}; // https://www.unicode.org/cldr/charts/32/summary/gu.html
// #1783 - #1824

var dayPeriodValues$N = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'મ.રાત્રિ',
    noon: 'બ.',
    morning: 'સવારે',
    afternoon: 'બપોરે',
    evening: 'સાંજે',
    night: 'રાત્રે'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: '​મધ્યરાત્રિ',
    noon: 'બપોરે',
    morning: 'સવારે',
    afternoon: 'બપોરે',
    evening: 'સાંજે',
    night: 'રાત્રે'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: '​મધ્યરાત્રિ',
    noon: 'બપોરે',
    morning: 'સવારે',
    afternoon: 'બપોરે',
    evening: 'સાંજે',
    night: 'રાત્રે'
  }
};
var formattingDayPeriodValues$E = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'મ.રાત્રિ',
    noon: 'બપોરે',
    morning: 'સવારે',
    afternoon: 'બપોરે',
    evening: 'સાંજે',
    night: 'રાત્રે'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'મધ્યરાત્રિ',
    noon: 'બપોરે',
    morning: 'સવારે',
    afternoon: 'બપોરે',
    evening: 'સાંજે',
    night: 'રાત્રે'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: '​મધ્યરાત્રિ',
    noon: 'બપોરે',
    morning: 'સવારે',
    afternoon: 'બપોરે',
    evening: 'સાંજે',
    night: 'રાત્રે'
  }
};

function ordinalNumber$O(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  return number;
}

var localize$O = {
  ordinalNumber: ordinalNumber$O,
  era: buildLocalizeFn({
    values: eraValues$O,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$O,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$O,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$O,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$N,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$E,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$O = /^(\d+)(લ|જ|થ|ઠ્ઠ|મ)?/i;
var parseOrdinalNumberPattern$O = /\d+/i;
var matchEraPatterns$O = {
  narrow: /^(ઈસપૂ|ઈસ)/i,
  abbreviated: /^(ઈ\.સ\.પૂર્વે|ઈ\.સ\.)/i,
  wide: /^(ઈસવીસન\sપૂર્વે|ઈસવીસન)/i
};
var parseEraPatterns$O = {
  any: [/^(ઈસપૂ|ઈસ)/i, /^(ઈ\.સ\.પૂર્વે|ઈ\.સ\.)/i, /^(ઈસવીસન\sપૂર્વે|ઈસવીસન)/i]
};
var matchQuarterPatterns$O = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](લો|જો|થો)? ત્રિમાસ/i
};
var parseQuarterPatterns$O = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$O = {
  // eslint-disable-next-line no-misleading-character-class
  narrow: /^[જાફેમાએમેજૂજુઓસઓનડિ]/i,
  abbreviated: /^(જાન્યુ|ફેબ્રુ|માર્ચ|એપ્રિલ|મે|જૂન|જુલાઈ|ઑગસ્ટ|સપ્ટે|ઓક્ટો|નવે|ડિસે)/i,
  wide: /^(જાન્યુઆરી|ફેબ્રુઆરી|માર્ચ|એપ્રિલ|મે|જૂન|જુલાઇ|ઓગસ્ટ|સપ્ટેમ્બર|ઓક્ટોબર|નવેમ્બર|ડિસેમ્બર)/i
};
var parseMonthPatterns$O = {
  narrow: [/^જા/i, /^ફે/i, /^મા/i, /^એ/i, /^મે/i, /^જૂ/i, /^જુ/i, /^ઑગ/i, /^સ/i, /^ઓક્ટો/i, /^ન/i, /^ડિ/i],
  any: [/^જા/i, /^ફે/i, /^મા/i, /^એ/i, /^મે/i, /^જૂ/i, /^જુ/i, /^ઑગ/i, /^સ/i, /^ઓક્ટો/i, /^ન/i, /^ડિ/i]
};
var matchDayPatterns$O = {
  narrow: /^(ર|સો|મં|બુ|ગુ|શુ|શ)/i,
  short: /^(ર|સો|મં|બુ|ગુ|શુ|શ)/i,
  abbreviated: /^(રવિ|સોમ|મંગળ|બુધ|ગુરુ|શુક્ર|શનિ)/i,
  wide: /^(રવિવાર|સોમવાર|મંગળવાર|બુધવાર|ગુરુવાર|શુક્રવાર|શનિવાર)/i
};
var parseDayPatterns$O = {
  narrow: [/^ર/i, /^સો/i, /^મં/i, /^બુ/i, /^ગુ/i, /^શુ/i, /^શ/i],
  any: [/^ર/i, /^સો/i, /^મં/i, /^બુ/i, /^ગુ/i, /^શુ/i, /^શ/i]
};
var matchDayPeriodPatterns$O = {
  narrow: /^(a|p|મ\.?|સ|બ|સાં|રા)/i,
  any: /^(a|p|મ\.?|સ|બ|સાં|રા)/i
};
var parseDayPeriodPatterns$O = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^મ\.?/i,
    noon: /^બ/i,
    morning: /સ/i,
    afternoon: /બ/i,
    evening: /સાં/i,
    night: /રા/i
  }
};
var match$O = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$O,
    parsePattern: parseOrdinalNumberPattern$O,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$O,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$O,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$O,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$O,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$O,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$O,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$O,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$O,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$O,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$O,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Gujarati locale (India).
 * @language Gujarati
 * @iso-639-2 guj
 * @author Manaday Mavani [@ManadayM]{@link https://github.com/manadaym}
 */

var locale$O = {
  code: 'gu',
  formatDistance: formatDistance$O,
  formatLong: formatLong$O,
  formatRelative: formatRelative$O,
  localize: localize$O,
  match: match$O,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$L = {
  lessThanXSeconds: {
    one: 'פחות משנייה',
    two: 'פחות משתי שניות',
    other: 'פחות מ־{{count}} שניות'
  },
  xSeconds: {
    one: 'שנייה',
    two: 'שתי שניות',
    other: '{{count}} שניות'
  },
  halfAMinute: 'חצי דקה',
  lessThanXMinutes: {
    one: 'פחות מדקה',
    two: 'פחות משתי דקות',
    other: 'פחות מ־{{count}} דקות'
  },
  xMinutes: {
    one: 'דקה',
    two: 'שתי דקות',
    other: '{{count}} דקות'
  },
  aboutXHours: {
    one: 'כשעה',
    two: 'כשעתיים',
    other: 'כ־{{count}} שעות'
  },
  xHours: {
    one: 'שעה',
    two: 'שעתיים',
    other: '{{count}} שעות'
  },
  xDays: {
    one: 'יום',
    two: 'יומיים',
    other: '{{count}} ימים'
  },
  aboutXWeeks: {
    one: 'כשבוע',
    two: 'כשבועיים',
    other: 'כ־{{count}} שבועות'
  },
  xWeeks: {
    one: 'שבוע',
    two: 'שבועיים',
    other: '{{count}} שבועות'
  },
  aboutXMonths: {
    one: 'כחודש',
    two: 'כחודשיים',
    other: 'כ־{{count}} חודשים'
  },
  xMonths: {
    one: 'חודש',
    two: 'חודשיים',
    other: '{{count}} חודשים'
  },
  aboutXYears: {
    one: 'כשנה',
    two: 'כשנתיים',
    other: 'כ־{{count}} שנים'
  },
  xYears: {
    one: 'שנה',
    two: 'שנתיים',
    other: '{{count}} שנים'
  },
  overXYears: {
    one: 'יותר משנה',
    two: 'יותר משנתיים',
    other: 'יותר מ־{{count}} שנים'
  },
  almostXYears: {
    one: 'כמעט שנה',
    two: 'כמעט שנתיים',
    other: 'כמעט {{count}} שנים'
  }
};
function formatDistance$N(token, count, options) {
  options = options || {}; // Return word instead of `in one day` or `one day ago`

  if (token === 'xDays' && options.addSuffix && count <= 2) {
    var past = {
      1: 'אתמול',
      2: 'שלשום'
    };
    var future = {
      1: 'מחר',
      2: 'מחרתיים'
    };
    return options.comparison > 0 ? future[count] : past[count];
  }

  var result;

  if (typeof formatDistanceLocale$L[token] === 'string') {
    result = formatDistanceLocale$L[token];
  } else if (count === 1) {
    result = formatDistanceLocale$L[token].one;
  } else if (count === 2) {
    result = formatDistanceLocale$L[token].two;
  } else {
    result = formatDistanceLocale$L[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'בעוד ' + result;
    } else {
      return 'לפני ' + result;
    }
  }

  return result;
}

var dateFormats$N = {
  full: 'EEEE, d בMMMM y',
  long: 'd בMMMM y',
  medium: 'd בMMM y',
  short: 'd.M.y'
};
var timeFormats$N = {
  full: 'H:mm:ss zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$N = {
  full: "{{date}} 'בשעה' {{time}}",
  long: "{{date}} 'בשעה' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$N = {
  date: buildFormatLongFn({
    formats: dateFormats$N,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$N,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$N,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$N = {
  lastWeek: "eeee 'שעבר בשעה' p",
  yesterday: "'אתמול בשעה' p",
  today: "'היום בשעה' p",
  tomorrow: "'מחר בשעה' p",
  nextWeek: "eeee 'בשעה' p",
  other: 'P'
};
function formatRelative$N(token, _date, _baseDate, _options) {
  return formatRelativeLocale$N[token];
}

var eraValues$N = {
  narrow: ['לפנה״ס', 'לספירה'],
  abbreviated: ['לפנה״ס', 'לספירה'],
  wide: ['לפני הספירה', 'לספירה']
};
var quarterValues$N = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['רבעון 1', 'רבעון 2', 'רבעון 3', 'רבעון 4']
};
var monthValues$N = {
  narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  abbreviated: ['ינו׳', 'פבר׳', 'מרץ', 'אפר׳', 'מאי', 'יוני', 'יולי', 'אוג׳', 'ספט׳', 'אוק׳', 'נוב׳', 'דצמ׳'],
  wide: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר']
};
var dayValues$N = {
  narrow: ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
  short: ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
  abbreviated: ['יום א׳', 'יום ב׳', 'יום ג׳', 'יום ד׳', 'יום ה׳', 'יום ו׳', 'שבת'],
  wide: ['יום ראשון', 'יום שני', 'יום שלישי', 'יום רביעי', 'יום חמישי', 'יום שישי', 'יום שבת']
};
var dayPeriodValues$M = {
  narrow: {
    am: 'לפנה״צ',
    pm: 'אחה״צ',
    midnight: 'חצות',
    noon: 'צהריים',
    morning: 'בוקר',
    afternoon: 'אחר הצהריים',
    evening: 'ערב',
    night: 'לילה'
  },
  abbreviated: {
    am: 'לפנה״צ',
    pm: 'אחה״צ',
    midnight: 'חצות',
    noon: 'צהריים',
    morning: 'בוקר',
    afternoon: 'אחר הצהריים',
    evening: 'ערב',
    night: 'לילה'
  },
  wide: {
    am: 'לפנה״צ',
    pm: 'אחה״צ',
    midnight: 'חצות',
    noon: 'צהריים',
    morning: 'בוקר',
    afternoon: 'אחר הצהריים',
    evening: 'ערב',
    night: 'לילה'
  }
};
var formattingDayPeriodValues$D = {
  narrow: {
    am: 'לפנה״צ',
    pm: 'אחה״צ',
    midnight: 'חצות',
    noon: 'צהריים',
    morning: 'בבוקר',
    afternoon: 'בצהריים',
    evening: 'בערב',
    night: 'בלילה'
  },
  abbreviated: {
    am: 'לפנה״צ',
    pm: 'אחה״צ',
    midnight: 'חצות',
    noon: 'צהריים',
    morning: 'בבוקר',
    afternoon: 'אחר הצהריים',
    evening: 'בערב',
    night: 'בלילה'
  },
  wide: {
    am: 'לפנה״צ',
    pm: 'אחה״צ',
    midnight: 'חצות',
    noon: 'צהריים',
    morning: 'בבוקר',
    afternoon: 'אחר הצהריים',
    evening: 'בערב',
    night: 'בלילה'
  }
};

function ordinalNumber$N(dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber); // We only show words till 10

  if (number <= 0 || number > 10) return number;
  var options = dirtyOptions || {};
  var unit = String(options.unit);
  var isFemale = ['year', 'hour', 'minute', 'second'].indexOf(unit) >= 0;
  var male = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שביעי', 'שמיני', 'תשיעי', 'עשירי'];
  var female = ['ראשונה', 'שנייה', 'שלישית', 'רביעית', 'חמישית', 'שישית', 'שביעית', 'שמינית', 'תשיעית', 'עשירית'];
  var index = number - 1;
  return isFemale ? female[index] : male[index];
}

var localize$N = {
  ordinalNumber: ordinalNumber$N,
  era: buildLocalizeFn({
    values: eraValues$N,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$N,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$N,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$N,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$M,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$D,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$N = /^(\d+|(ראשון|שני|שלישי|רביעי|חמישי|שישי|שביעי|שמיני|תשיעי|עשירי|ראשונה|שנייה|שלישית|רביעית|חמישית|שישית|שביעית|שמינית|תשיעית|עשירית))/i;
var parseOrdinalNumberPattern$N = /^(\d+|רא|שנ|של|רב|ח|שי|שב|שמ|ת|ע)/i;
var matchEraPatterns$N = {
  narrow: /^ל(ספירה|פנה״ס)/i,
  abbreviated: /^ל(ספירה|פנה״ס)/i,
  wide: /^ל(פני ה)?ספירה/i
};
var parseEraPatterns$N = {
  any: [/^לפ/i, /^לס/i]
};
var matchQuarterPatterns$N = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^רבעון [1234]/i
};
var parseQuarterPatterns$N = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$N = {
  narrow: /^\d+/i,
  abbreviated: /^(ינו|פבר|מרץ|אפר|מאי|יוני|יולי|אוג|ספט|אוק|נוב|דצמ)׳?/i,
  wide: /^(ינואר|פברואר|מרץ|אפריל|מאי|יוני|יולי|אוגוסט|ספטמבר|אוקטובר|נובמבר|דצמבר)/i
};
var parseMonthPatterns$N = {
  narrow: [/^1$/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^7/i, /^8/i, /^9/i, /^10/i, /^11/i, /^12/i],
  any: [/^ינ/i, /^פ/i, /^מר/i, /^אפ/i, /^מא/i, /^יונ/i, /^יול/i, /^אוג/i, /^ס/i, /^אוק/i, /^נ/i, /^ד/i]
};
var matchDayPatterns$N = {
  narrow: /^[אבגדהוש]׳/i,
  short: /^[אבגדהוש]׳/i,
  abbreviated: /^(שבת|יום (א|ב|ג|ד|ה|ו)׳)/i,
  wide: /^יום (ראשון|שני|שלישי|רביעי|חמישי|שישי|שבת)/i
};
var parseDayPatterns$N = {
  abbreviated: [/א׳$/i, /ב׳$/i, /ג׳$/i, /ד׳$/i, /ה׳$/i, /ו׳$/i, /^ש/i],
  wide: [/ן$/i, /ני$/i, /לישי$/i, /עי$/i, /מישי$/i, /שישי$/i, /ת$/i],
  any: [/^א/i, /^ב/i, /^ג/i, /^ד/i, /^ה/i, /^ו/i, /^ש/i]
};
var matchDayPeriodPatterns$N = {
  any: /^(אחר ה|ב)?(חצות|צהריים|בוקר|ערב|לילה|אחה״צ|לפנה״צ)/i
};
var parseDayPeriodPatterns$N = {
  any: {
    am: /^לפ/i,
    pm: /^אחה/i,
    midnight: /^ח/i,
    noon: /^צ/i,
    morning: /בוקר/i,
    afternoon: /בצ|אחר/i,
    evening: /ערב/i,
    night: /לילה/i
  }
};
var ordinalName = ['רא', 'שנ', 'של', 'רב', 'ח', 'שי', 'שב', 'שמ', 'ת', 'ע'];
var match$N = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$N,
    parsePattern: parseOrdinalNumberPattern$N,
    valueCallback: function (value) {
      var number = parseInt(value, 10);
      return isNaN(number) ? ordinalName.indexOf(value) + 1 : number;
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$N,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$N,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$N,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$N,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$N,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$N,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$N,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$N,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$N,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$N,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Hebrew locale.
 * @language Hebrew
 * @iso-639-2 heb
 * @author Nir Lahad [@nirlah]{@link https://github.com/nirlah}
 */

var locale$N = {
  code: 'he',
  formatDistance: formatDistance$N,
  formatLong: formatLong$N,
  formatRelative: formatRelative$N,
  localize: localize$N,
  match: match$N,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

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

var eraValues$M = {
  narrow: ['ईसा-पूर्व', 'ईस्वी'],
  abbreviated: ['ईसा-पूर्व', 'ईस्वी'],
  wide: ['ईसा-पूर्व', 'ईसवी सन']
}; // CLDR #1593 - #1616

var quarterValues$M = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['ति1', 'ति2', 'ति3', 'ति4'],
  wide: ['पहली तिमाही', 'दूसरी तिमाही', 'तीसरी तिमाही', 'चौथी तिमाही']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
// https://www.unicode.org/cldr/charts/32/summary/hi.html
// CLDR #1617 - #1688

var monthValues$M = {
  narrow: ['ज', 'फ़', 'मा', 'अ', 'मई', 'जू', 'जु', 'अग', 'सि', 'अक्टू', 'न', 'दि'],
  abbreviated: ['जन', 'फ़र', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्टू', 'नव', 'दिस'],
  wide: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर']
}; // CLDR #1689 - #1744

var dayValues$M = {
  narrow: ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'],
  short: ['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'],
  abbreviated: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
  wide: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार']
};
var dayPeriodValues$L = {
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
var formattingDayPeriodValues$C = {
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

var ordinalNumber$M = function (dirtyNumber, _options) {
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
var localize$M = {
  ordinalNumber: ordinalNumber$M,
  era: buildLocalizeFn({
    values: eraValues$M,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$M,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$M,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$M,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$L,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$C,
    defaultFormattingWidth: 'wide'
  })
};

var formatDistanceLocale$K = {
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

var formatDistance$M = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$K[token];

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

var dateFormats$M = {
  full: 'EEEE, do MMMM, y',
  // CLDR #1787
  long: 'do MMMM, y',
  // CLDR #1788
  medium: 'd MMM, y',
  // CLDR #1789
  short: 'dd/MM/yyyy' // CLDR #1790

};
var timeFormats$M = {
  full: 'h:mm:ss a zzzz',
  // CLDR #1791
  long: 'h:mm:ss a z',
  // CLDR #1792
  medium: 'h:mm:ss a',
  // CLDR #1793
  short: 'h:mm a' // CLDR #1794

};
var dateTimeFormats$M = {
  full: "{{date}} 'को' {{time}}",
  // CLDR #1795
  long: "{{date}} 'को' {{time}}",
  // CLDR #1796
  medium: '{{date}}, {{time}}',
  // CLDR #1797
  short: '{{date}}, {{time}}' // CLDR #1798

};
var formatLong$M = {
  date: buildFormatLongFn({
    formats: dateFormats$M,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$M,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$M,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$M = {
  lastWeek: "'पिछले' eeee p",
  yesterday: "'कल' p",
  today: "'आज' p",
  tomorrow: "'कल' p",
  nextWeek: "eeee 'को' p",
  other: 'P'
};

var formatRelative$M = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$M[token];
};

var matchOrdinalNumberPattern$M = /^[०१२३४५६७८९]+/i;
var parseOrdinalNumberPattern$M = /^[०१२३४५६७८९]+/i;
var matchEraPatterns$M = {
  narrow: /^(ईसा-पूर्व|ईस्वी)/i,
  abbreviated: /^(ईसा\.?\s?पूर्व\.?|ईसा\.?)/i,
  wide: /^(ईसा-पूर्व|ईसवी पूर्व|ईसवी सन|ईसवी)/i
};
var parseEraPatterns$M = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns$M = {
  narrow: /^[1234]/i,
  abbreviated: /^ति[1234]/i,
  wide: /^[1234](पहली|दूसरी|तीसरी|चौथी)? तिमाही/i
};
var parseQuarterPatterns$M = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$M = {
  // eslint-disable-next-line no-misleading-character-class
  narrow: /^[जफ़माअप्मईजूनजुअगसिअक्तनदि]/i,
  abbreviated: /^(जन|फ़र|मार्च|अप्|मई|जून|जुल|अग|सित|अक्तू|नव|दिस)/i,
  wide: /^(जनवरी|फ़रवरी|मार्च|अप्रैल|मई|जून|जुलाई|अगस्त|सितंबर|अक्तूबर|नवंबर|दिसंबर)/i
};
var parseMonthPatterns$M = {
  narrow: [/^ज/i, /^फ़/i, /^मा/i, /^अप्/i, /^मई/i, /^जू/i, /^जु/i, /^अग/i, /^सि/i, /^अक्तू/i, /^न/i, /^दि/i],
  any: [/^जन/i, /^फ़/i, /^मा/i, /^अप्/i, /^मई/i, /^जू/i, /^जु/i, /^अग/i, /^सि/i, /^अक्तू/i, /^नव/i, /^दिस/i]
};
var matchDayPatterns$M = {
  // eslint-disable-next-line no-misleading-character-class
  narrow: /^[रविसोममंगलबुधगुरुशुक्रशनि]/i,
  short: /^(रवि|सोम|मंगल|बुध|गुरु|शुक्र|शनि)/i,
  abbreviated: /^(रवि|सोम|मंगल|बुध|गुरु|शुक्र|शनि)/i,
  wide: /^(रविवार|सोमवार|मंगलवार|बुधवार|गुरुवार|शुक्रवार|शनिवार)/i
};
var parseDayPatterns$M = {
  narrow: [/^रवि/i, /^सोम/i, /^मंगल/i, /^बुध/i, /^गुरु/i, /^शुक्र/i, /^शनि/i],
  any: [/^रवि/i, /^सोम/i, /^मंगल/i, /^बुध/i, /^गुरु/i, /^शुक्र/i, /^शनि/i]
};
var matchDayPeriodPatterns$M = {
  narrow: /^(पू|अ|म|द.\?|सु|दो|शा|रा)/i,
  any: /^(पूर्वाह्न|अपराह्न|म|द.\?|सु|दो|शा|रा)/i
};
var parseDayPeriodPatterns$M = {
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
var match$M = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$M,
    parsePattern: parseOrdinalNumberPattern$M,
    valueCallback: localeToNumber
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$M,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$M,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$M,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$M,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$M,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$M,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$M,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$M,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$M,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$M,
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

var locale$M = {
  code: 'hi',
  formatDistance: formatDistance$M,
  formatLong: formatLong$M,
  formatRelative: formatRelative$M,
  localize: localize$M,
  match: match$M,
  options: {
    weekStartsOn: 0
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$J = {
  lessThanXSeconds: {
    one: {
      standalone: 'manje od 1 sekunde',
      withPrepositionAgo: 'manje od 1 sekunde',
      withPrepositionIn: 'manje od 1 sekundu'
    },
    dual: 'manje od {{count}} sekunde',
    other: 'manje od {{count}} sekundi'
  },
  xSeconds: {
    one: {
      standalone: '1 sekunda',
      withPrepositionAgo: '1 sekunde',
      withPrepositionIn: '1 sekundu'
    },
    dual: '{{count}} sekunde',
    other: '{{count}} sekundi'
  },
  halfAMinute: 'pola minute',
  lessThanXMinutes: {
    one: {
      standalone: 'manje od 1 minute',
      withPrepositionAgo: 'manje od 1 minute',
      withPrepositionIn: 'manje od 1 minutu'
    },
    dual: 'manje od {{count}} minute',
    other: 'manje od {{count}} minuta'
  },
  xMinutes: {
    one: {
      standalone: '1 minuta',
      withPrepositionAgo: '1 minute',
      withPrepositionIn: '1 minutu'
    },
    dual: '{{count}} minute',
    other: '{{count}} minuta'
  },
  aboutXHours: {
    one: {
      standalone: 'oko 1 sat',
      withPrepositionAgo: 'oko 1 sat',
      withPrepositionIn: 'oko 1 sat'
    },
    dual: 'oko {{count}} sata',
    other: 'oko {{count}} sati'
  },
  xHours: {
    one: {
      standalone: '1 sat',
      withPrepositionAgo: '1 sat',
      withPrepositionIn: '1 sat'
    },
    dual: '{{count}} sata',
    other: '{{count}} sati'
  },
  xDays: {
    one: {
      standalone: '1 dan',
      withPrepositionAgo: '1 dan',
      withPrepositionIn: '1 dan'
    },
    dual: '{{count}} dana',
    other: '{{count}} dana'
  },
  aboutXWeeks: {
    one: {
      standalone: 'oko 1 tjedan',
      withPrepositionAgo: 'oko 1 tjedan',
      withPrepositionIn: 'oko 1 tjedan'
    },
    dual: 'oko {{count}} tjedna',
    other: 'oko {{count}} tjedana'
  },
  xWeeks: {
    one: {
      standalone: '1 tjedan',
      withPrepositionAgo: '1 tjedan',
      withPrepositionIn: '1 tjedan'
    },
    dual: '{{count}} tjedna',
    other: '{{count}} tjedana'
  },
  aboutXMonths: {
    one: {
      standalone: 'oko 1 mjesec',
      withPrepositionAgo: 'oko 1 mjesec',
      withPrepositionIn: 'oko 1 mjesec'
    },
    dual: 'oko {{count}} mjeseca',
    other: 'oko {{count}} mjeseci'
  },
  xMonths: {
    one: {
      standalone: '1 mjesec',
      withPrepositionAgo: '1 mjesec',
      withPrepositionIn: '1 mjesec'
    },
    dual: '{{count}} mjeseca',
    other: '{{count}} mjeseci'
  },
  aboutXYears: {
    one: {
      standalone: 'oko 1 godinu',
      withPrepositionAgo: 'oko 1 godinu',
      withPrepositionIn: 'oko 1 godinu'
    },
    dual: 'oko {{count}} godine',
    other: 'oko {{count}} godina'
  },
  xYears: {
    one: {
      standalone: '1 godina',
      withPrepositionAgo: '1 godine',
      withPrepositionIn: '1 godinu'
    },
    dual: '{{count}} godine',
    other: '{{count}} godina'
  },
  overXYears: {
    one: {
      standalone: 'preko 1 godinu',
      withPrepositionAgo: 'preko 1 godinu',
      withPrepositionIn: 'preko 1 godinu'
    },
    dual: 'preko {{count}} godine',
    other: 'preko {{count}} godina'
  },
  almostXYears: {
    one: {
      standalone: 'gotovo 1 godinu',
      withPrepositionAgo: 'gotovo 1 godinu',
      withPrepositionIn: 'gotovo 1 godinu'
    },
    dual: 'gotovo {{count}} godine',
    other: 'gotovo {{count}} godina'
  }
};
function formatDistance$L(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$J[token] === 'string') {
    result = formatDistanceLocale$J[token];
  } else if (count === 1) {
    if (options.addSuffix) {
      if (options.comparison > 0) {
        result = formatDistanceLocale$J[token].one.withPrepositionIn;
      } else {
        result = formatDistanceLocale$J[token].one.withPrepositionAgo;
      }
    } else {
      result = formatDistanceLocale$J[token].one.standalone;
    }
  } else if (count % 10 > 1 && count % 10 < 5 && // if last digit is between 2 and 4
  String(count).substr(-2, 1) !== '1' // unless the 2nd to last digit is "1"
  ) {
      result = formatDistanceLocale$J[token].dual.replace('{{count}}', count);
    } else {
    result = formatDistanceLocale$J[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'za ' + result;
    } else {
      return 'prije ' + result;
    }
  }

  return result;
}

var dateFormats$L = {
  full: 'EEEE, d. MMMM y.',
  long: 'd. MMMM y.',
  medium: 'd. MMM y.',
  short: 'dd. MM. y.'
};
var timeFormats$L = {
  full: 'HH:mm:ss (zzzz)',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$L = {
  full: "{{date}} 'u' {{time}}",
  long: "{{date}} 'u' {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$L = {
  date: buildFormatLongFn({
    formats: dateFormats$L,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$L,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$L,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$L = {
  lastWeek: function (date) {
    var day = date.getUTCDay();

    switch (day) {
      case 0:
        return "'prošlu nedjelju u' p";

      case 3:
        return "'prošlu srijedu u' p";

      case 6:
        return "'prošlu subotu u' p";

      default:
        return "'prošli' EEEE 'u' p";
    }
  },
  yesterday: "'jučer u' p",
  today: "'danas u' p",
  tomorrow: "'sutra u' p",
  nextWeek: function (date) {
    var day = date.getUTCDay();

    switch (day) {
      case 0:
        return "'iduću nedjelju u' p";

      case 3:
        return "'iduću srijedu u' p";

      case 6:
        return "'iduću subotu u' p";

      default:
        return "'prošli' EEEE 'u' p";
    }
  },
  other: 'P'
};
function formatRelative$L(token, date, _baseDate, _options) {
  var format = formatRelativeLocale$L[token];

  if (typeof format === 'function') {
    return format(date);
  }

  return format;
}

function ordinalNumber$L(dirtyNumber) {
  var number = Number(dirtyNumber);
  return String(number).concat('.');
}

var eraValues$L = {
  narrow: ['pr.n.e.', 'AD'],
  abbreviated: ['pr. Kr.', 'po. Kr.'],
  wide: ['Prije Krista', 'Poslije Krista']
};
var monthValues$L = {
  narrow: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
  abbreviated: ['sij', 'velj', 'ožu', 'tra', 'svi', 'lip', 'srp', 'kol', 'ruj', 'lis', 'stu', 'pro'],
  wide: ['siječanj', 'veljača', 'ožujak', 'travanj', 'svibanj', 'lipanj', 'srpanj', 'kolovoz', 'rujan', 'listopad', 'studeni', 'prosinac']
};
var formattingMonthValues$a = {
  narrow: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
  abbreviated: ['sij', 'velj', 'ožu', 'tra', 'svi', 'lip', 'srp', 'kol', 'ruj', 'lis', 'stu', 'pro'],
  wide: ['siječnja', 'veljače', 'ožujka', 'travnja', 'svibnja', 'lipnja', 'srpnja', 'kolovoza', 'rujna', 'listopada', 'studenog', 'prosinca']
};
var quarterValues$L = {
  narrow: ['1.', '2.', '3.', '4.'],
  abbreviated: ['1. kv.', '2. kv.', '3. kv.', '4. kv.'],
  wide: ['1. kvartal', '2. kvartal', '3. kvartal', '4. kvartal']
};
var dayValues$L = {
  narrow: ['N', 'P', 'U', 'S', 'Č', 'P', 'S'],
  short: ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'],
  abbreviated: ['ned', 'pon', 'uto', 'sri', 'čet', 'pet', 'sub'],
  wide: ['nedjelja', 'ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota']
};
var formattingDayPeriodValues$B = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutro',
    afternoon: 'popodne',
    evening: 'navečer',
    night: 'noću'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutro',
    afternoon: 'popodne',
    evening: 'navečer',
    night: 'noću'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutro',
    afternoon: 'poslije podne',
    evening: 'navečer',
    night: 'noću'
  }
};
var dayPeriodValues$K = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutro',
    afternoon: 'popodne',
    evening: 'navečer',
    night: 'noću'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutro',
    afternoon: 'popodne',
    evening: 'navečer',
    night: 'noću'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutro',
    afternoon: 'poslije podne',
    evening: 'navečer',
    night: 'noću'
  }
};
var localize$L = {
  ordinalNumber: ordinalNumber$L,
  era: buildLocalizeFn({
    values: eraValues$L,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$L,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$L,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$a,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$L,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$K,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$B,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$L = /^(\d+)\./i;
var parseOrdinalNumberPattern$L = /\d+/i;
var matchEraPatterns$L = {
  narrow: /^(pr\.n\.e\.|AD)/i,
  abbreviated: /^(pr\.\s?Kr\.|po\.\s?Kr\.)/i,
  wide: /^(Prije Krista|prije nove ere|Poslije Krista|nova era)/i
};
var parseEraPatterns$L = {
  any: [/^pr/i, /^(po|nova)/i]
};
var matchQuarterPatterns$L = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\.\s?kv\.?/i,
  wide: /^[1234]\. kvartal/i
};
var parseQuarterPatterns$L = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$L = {
  narrow: /^(10|11|12|[123456789])\./i,
  abbreviated: /^(sij|velj|(ožu|ozu)|tra|svi|lip|srp|kol|ruj|lis|stu|pro)/i,
  wide: /^((siječanj|siječnja|sijecanj|sijecnja)|(veljača|veljače|veljaca|veljace)|(ožujak|ožujka|ozujak|ozujka)|(travanj|travnja)|(svibanj|svibnja)|(lipanj|lipnja)|(srpanj|srpnja)|(kolovoz|kolovoza)|(rujan|rujna)|(listopad|listopada)|(studeni|studenog)|(prosinac|prosinca))/i
};
var parseMonthPatterns$L = {
  narrow: [/(10|11|12|[123456789])/i],
  abbreviated: [/^sij/i, /^velj/i, /^(ožu|ozu)/i, /^tra/i, /^svi/i, /^lip/i, /^srp/i, /^kol/i, /^ruj/i, /^lis/i, /^stu/i, /^pro/i],
  wide: [/^sij/i, /^velj/i, /^(ožu|ozu)/i, /^tra/i, /^svi/i, /^lip/i, /^srp/i, /^kol/i, /^ruj/i, /^lis/i, /^stu/i, /^pro/i]
};
var matchDayPatterns$L = {
  narrow: /^[npusčc]/i,
  short: /^(ned|pon|uto|sri|(čet|cet)|pet|sub)/i,
  abbreviated: /^(ned|pon|uto|sri|(čet|cet)|pet|sub)/i,
  wide: /^(nedjelja|ponedjeljak|utorak|srijeda|(četvrtak|cetvrtak)|petak|subota)/i
};
var parseDayPatterns$L = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns$L = {
  any: /^(am|pm|ponoc|ponoć|(po)?podne|navecer|navečer|noću|poslije podne|ujutro)/i
};
var parseDayPeriodPatterns$L = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^pono/i,
    noon: /^pod/i,
    morning: /jutro/i,
    afternoon: /(poslije\s|po)+podne/i,
    evening: /(navece|naveče)/i,
    night: /(nocu|noću)/i
  }
};
var match$L = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$L,
    parsePattern: parseOrdinalNumberPattern$L,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$L,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$L,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$L,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$L,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$L,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$L,
    defaultParseWidth: 'wide'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$L,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$L,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$L,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$L,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Croatian locale.
 * @language Croatian
 * @iso-639-2 hrv
 * @author Matija Marohnić [@silvenon]{@link https://github.com/silvenon}
 * @author Manico [@manico]{@link https://github.com/manico}
 * @author Ivan Jeržabek [@jerzabek]{@link https://github.com/jerzabek}
 */

var locale$L = {
  code: 'hr',
  formatDistance: formatDistance$L,
  formatLong: formatLong$L,
  formatRelative: formatRelative$L,
  localize: localize$L,
  match: match$L,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$I = {
  lessThanXSeconds: {
    one: 'mwens pase yon segond',
    other: 'mwens pase {{count}} segond'
  },
  xSeconds: {
    one: '1 segond',
    other: '{{count}} segond'
  },
  halfAMinute: '30 segond',
  lessThanXMinutes: {
    one: 'mwens pase yon minit',
    other: 'mwens pase {{count}} minit'
  },
  xMinutes: {
    one: '1 minit',
    other: '{{count}} minit'
  },
  aboutXHours: {
    one: 'anviwon inè',
    other: 'anviwon {{count}} è'
  },
  xHours: {
    one: '1 lè',
    other: '{{count}} lè'
  },
  xDays: {
    one: '1 jou',
    other: '{{count}} jou'
  },
  aboutXWeeks: {
    one: 'anviwon 1 semèn',
    other: 'anviwon {{count}} semèn'
  },
  xWeeks: {
    one: '1 semèn',
    other: '{{count}} semèn'
  },
  aboutXMonths: {
    one: 'anviwon 1 mwa',
    other: 'anviwon {{count}} mwa'
  },
  xMonths: {
    one: '1 mwa',
    other: '{{count}} mwa'
  },
  aboutXYears: {
    one: 'anviwon 1 an',
    other: 'anviwon {{count}} an'
  },
  xYears: {
    one: '1 an',
    other: '{{count}} an'
  },
  overXYears: {
    one: 'plis pase 1 an',
    other: 'plis pase {{count}} an'
  },
  almostXYears: {
    one: 'prèske 1 an',
    other: 'prèske {{count}} an'
  }
};
function formatDistance$K(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$I[token] === 'string') {
    result = formatDistanceLocale$I[token];
  } else if (count === 1) {
    result = formatDistanceLocale$I[token].one;
  } else {
    result = formatDistanceLocale$I[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'nan ' + result;
    } else {
      return 'sa fè ' + result;
    }
  }

  return result;
}

var dateFormats$K = {
  full: 'EEEE d MMMM y',
  long: 'd MMMM y',
  medium: 'd MMM y',
  short: 'dd/MM/y'
};
var timeFormats$K = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$K = {
  full: "{{date}} 'nan lè' {{time}}",
  long: "{{date}} 'nan lè' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$K = {
  date: buildFormatLongFn({
    formats: dateFormats$K,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$K,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$K,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$K = {
  lastWeek: "eeee 'pase nan lè' p",
  yesterday: "'yè nan lè' p",
  today: "'jodi a' p",
  tomorrow: "'demen nan lè' p'",
  nextWeek: "eeee 'pwochen nan lè' p",
  other: 'P'
};
function formatRelative$K(token, _date, _baseDate, _options) {
  return formatRelativeLocale$K[token];
}

var eraValues$K = {
  narrow: ['av. J.-K', 'ap. J.-K'],
  abbreviated: ['av. J.-K', 'ap. J.-K'],
  wide: ['anvan Jezi Kris', 'apre Jezi Kris']
};
var quarterValues$K = {
  narrow: ['T1', 'T2', 'T3', 'T4'],
  abbreviated: ['1ye trim.', '2yèm trim.', '3yèm trim.', '4yèm trim.'],
  wide: ['1ye trimès', '2yèm trimès', '3yèm trimès', '4yèm trimès']
};
var monthValues$K = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'O', 'S', 'O', 'N', 'D'],
  abbreviated: ['janv.', 'fevr.', 'mas', 'avr.', 'me', 'jen', 'jiyè', 'out', 'sept.', 'okt.', 'nov.', 'des.'],
  wide: ['janvye', 'fevrye', 'mas', 'avril', 'me', 'jen', 'jiyè', 'out', 'septanm', 'oktòb', 'novanm', 'desanm']
};
var dayValues$K = {
  narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
  short: ['di', 'le', 'ma', 'mè', 'je', 'va', 'sa'],
  abbreviated: ['dim.', 'len.', 'mad.', 'mèk.', 'jed.', 'van.', 'sam.'],
  wide: ['dimanch', 'lendi', 'madi', 'mèkredi', 'jedi', 'vandredi', 'samdi']
};
var dayPeriodValues$J = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'minwit',
    noon: 'midi',
    morning: 'mat.',
    afternoon: 'ap.m.',
    evening: 'swa',
    night: 'mat.'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'minwit',
    noon: 'midi',
    morning: 'maten',
    afternoon: 'aprèmidi',
    evening: 'swa',
    night: 'maten'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'minwit',
    noon: 'midi',
    morning: 'nan maten',
    afternoon: 'nan aprèmidi',
    evening: 'nan aswè',
    night: 'nan maten'
  }
};

function ordinalNumber$K(dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber);
  var options = dirtyOptions || {};
  var unit = String(options.unit);
  var suffix;

  if (number === 0) {
    return number;
  }

  if (unit === 'year' || unit === 'hour' || unit === 'week') {
    if (number === 1) {
      suffix = 'ye';
    } else {
      suffix = 'yèm';
    }
  } else {
    if (number === 1) {
      suffix = 'ye';
    } else {
      suffix = 'yèm';
    }
  }

  return number + suffix;
}

var localize$K = {
  ordinalNumber: ordinalNumber$K,
  era: buildLocalizeFn({
    values: eraValues$K,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$K,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$K,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$K,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$J,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$K = /^(\d+)(ye|yèm)?/i;
var parseOrdinalNumberPattern$K = /\d+/i;
var matchEraPatterns$K = {
  narrow: /^(av\.J\.K|ap\.J\.K|ap\.J\.-K)/i,
  abbreviated: /^(av\.J\.-K|av\.J-K|apr\.J\.-K|apr\.J-K|ap\.J-K)/i,
  wide: /^(avan Jezi Kris|apre Jezi Kris)/i
};
var parseEraPatterns$K = {
  any: [/^av/i, /^ap/i]
};
var matchQuarterPatterns$K = {
  narrow: /^[1234]/i,
  abbreviated: /^t[1234]/i,
  wide: /^[1234](ye|yèm)? trimès/i
};
var parseQuarterPatterns$K = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$K = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(janv|fevr|mas|avr|me|jen|jiyè|out|sept|okt|nov|des)\.?/i,
  wide: /^(janvye|fevrye|mas|avril|me|jen|jiyè|out|septanm|oktòb|novanm|desanm)/i
};
var parseMonthPatterns$K = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^o/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^ma/i, /^av/i, /^me/i, /^je/i, /^ji/i, /^ou/i, /^s/i, /^ok/i, /^n/i, /^d/i]
};
var matchDayPatterns$K = {
  narrow: /^[lmjvsd]/i,
  short: /^(di|le|ma|me|je|va|sa)/i,
  abbreviated: /^(dim|len|mad|mèk|jed|van|sam)\.?/i,
  wide: /^(dimanch|lendi|madi|mèkredi|jedi|vandredi|samdi)/i
};
var parseDayPatterns$K = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^di/i, /^le/i, /^ma/i, /^mè/i, /^je/i, /^va/i, /^sa/i]
};
var matchDayPeriodPatterns$K = {
  narrow: /^(a|p|minwit|midi|mat\.?|ap\.?m\.?|swa)/i,
  any: /^([ap]\.?\s?m\.?|nan maten|nan aprèmidi|nan aswè)/i
};
var parseDayPeriodPatterns$K = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^min/i,
    noon: /^mid/i,
    morning: /mat/i,
    afternoon: /ap/i,
    evening: /sw/i,
    night: /nwit/i
  }
};
var match$K = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$K,
    parsePattern: parseOrdinalNumberPattern$K,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$K,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$K,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$K,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$K,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$K,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$K,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$K,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$K,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$K,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$K,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Haitian Creole locale.
 * @language Haitian Creole
 * @iso-639-2 hat
 * @author Rubens Mariuzzo [@rmariuzzo]{@link https://github.com/rmariuzzo}
 * @author Watson Marcelain [@watsongm24]{@link https://github.com/watsongm24}
 */

var locale$K = {
  code: 'ht',
  formatDistance: formatDistance$K,
  formatLong: formatLong$K,
  formatRelative: formatRelative$K,
  localize: localize$K,
  match: match$K,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var translations$1 = {
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

function translate$1(number, addSuffix, key, comparison) {
  var translated = addSuffix ? withSuffixes[key][comparison] : withoutSuffixes[key];

  if (key === 'halfaminute') {
    return translated;
  }

  return number + translated;
}

function formatDistance$J(token, count, options) {
  options = options || {};
  var adverb = token.match(/about|over|almost|lessthan/i);
  var unit = token.replace(adverb, '');
  var result;
  result = translate$1(count, options.addSuffix, unit.toLowerCase(), options.comparison);

  if (adverb) {
    result = translations$1[adverb[0].toLowerCase()] + ' ' + result;
  }

  return result;
}

var dateFormats$J = {
  full: 'y. MMMM d., EEEE',
  long: 'y. MMMM d.',
  medium: 'y. MMM d.',
  short: 'y. MM. dd.'
};
var timeFormats$J = {
  full: 'H:mm:ss zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$J = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$J = {
  date: buildFormatLongFn({
    formats: dateFormats$J,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$J,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$J,
    defaultWidth: 'full'
  })
};

var accusativeWeekdays$4 = ['vasárnap', 'hétfőn', 'kedden', 'szerdán', 'csütörtökön', 'pénteken', 'szombaton'];

function week(isFuture) {
  return function (date, _baseDate, _options) {
    var day = date.getUTCDay();
    return (isFuture ? '' : "'múlt' ") + "'" + accusativeWeekdays$4[day] + "'" + " p'-kor'";
  };
}

var formatRelativeLocale$J = {
  lastWeek: week(false),
  yesterday: "'tegnap' p'-kor'",
  today: "'ma' p'-kor'",
  tomorrow: "'holnap' p'-kor'",
  nextWeek: week(true),
  other: 'P'
};
function formatRelative$J(token, date, baseDate, options) {
  var format = formatRelativeLocale$J[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
}

var eraValues$J = {
  narrow: ['ie.', 'isz.'],
  abbreviated: ['i. e.', 'i. sz.'],
  wide: ['Krisztus előtt', 'időszámításunk szerint']
};
var quarterValues$J = {
  narrow: ['1.', '2.', '3.', '4.'],
  abbreviated: ['1. n.év', '2. n.év', '3. n.év', '4. n.év'],
  wide: ['1. negyedév', '2. negyedév', '3. negyedév', '4. negyedév']
};
var formattingQuarterValues$3 = {
  narrow: ['I.', 'II.', 'III.', 'IV.'],
  abbreviated: ['I. n.év', 'II. n.év', 'III. n.év', 'IV. n.év'],
  wide: ['I. negyedév', 'II. negyedév', 'III. negyedév', 'IV. negyedév']
};
var monthValues$J = {
  narrow: ['J', 'F', 'M', 'Á', 'M', 'J', 'J', 'A', 'Sz', 'O', 'N', 'D'],
  abbreviated: ['jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.'],
  wide: ['január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december']
};
var dayValues$J = {
  narrow: ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz'],
  short: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
  abbreviated: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
  wide: ['vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat']
};
var dayPeriodValues$I = {
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

function ordinalNumber$J(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  return number + '.';
}

var localize$J = {
  ordinalNumber: ordinalNumber$J,
  era: buildLocalizeFn({
    values: eraValues$J,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$J,
    defaultWidth: 'wide',
    formattingValues: formattingQuarterValues$3,
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$J,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$J,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$I,
    defaultWidth: 'wide',
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$J = /^(\d+)\.?/i;
var parseOrdinalNumberPattern$J = /\d+/i;
var matchEraPatterns$J = {
  narrow: /^(ie\.|isz\.)/i,
  abbreviated: /^(i\.\s?e\.?|b?\s?c\s?e|i\.\s?sz\.?)/i,
  wide: /^(Krisztus előtt|időszámításunk előtt|időszámításunk szerint|i\. sz\.)/i
};
var parseEraPatterns$J = {
  narrow: [/ie/i, /isz/i],
  abbreviated: [/^(i\.?\s?e\.?|b\s?ce)/i, /^(i\.?\s?sz\.?|c\s?e)/i],
  any: [/előtt/i, /(szerint|i. sz.)/i]
};
var matchQuarterPatterns$J = {
  narrow: /^[1234]\.?/i,
  abbreviated: /^[1234]?\.?\s?n\.év/i,
  wide: /^([1234]|I|II|III|IV)?\.?\s?negyedév/i
};
var parseQuarterPatterns$J = {
  any: [/1|I$/i, /2|II$/i, /3|III/i, /4|IV/i]
};
var matchMonthPatterns$J = {
  narrow: /^[jfmaásond]|sz/i,
  abbreviated: /^(jan\.?|febr\.?|márc\.?|ápr\.?|máj\.?|jún\.?|júl\.?|aug\.?|szept\.?|okt\.?|nov\.?|dec\.?)/i,
  wide: /^(január|február|március|április|május|június|július|augusztus|szeptember|október|november|december)/i
};
var parseMonthPatterns$J = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a|á/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s|sz/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^már/i, /^áp/i, /^máj/i, /^jún/i, /^júl/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$J = {
  narrow: /^([vhkpc]|sz|cs|sz)/i,
  short: /^([vhkp]|sze|cs|szo)/i,
  abbreviated: /^([vhkp]|sze|cs|szo)/i,
  wide: /^(vasárnap|hétfő|kedd|szerda|csütörtök|péntek|szombat)/i
};
var parseDayPatterns$J = {
  narrow: [/^v/i, /^h/i, /^k/i, /^sz/i, /^c/i, /^p/i, /^sz/i],
  any: [/^v/i, /^h/i, /^k/i, /^sze/i, /^c/i, /^p/i, /^szo/i]
};
var matchDayPeriodPatterns$J = {
  any: /^((de|du)\.?|éjfél|délután|dél|reggel|este|éjjel)/i
};
var parseDayPeriodPatterns$J = {
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
var match$J = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$J,
    parsePattern: parseOrdinalNumberPattern$J,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$J,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$J,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$J,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$J,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$J,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$J,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$J,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$J,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$J,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$J,
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

var locale$J = {
  code: 'hu',
  formatDistance: formatDistance$J,
  formatLong: formatLong$J,
  formatRelative: formatRelative$J,
  localize: localize$J,
  match: match$J,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$H = {
  lessThanXSeconds: {
    one: 'ավելի քիչ քան 1 վայրկյան',
    other: 'ավելի քիչ քան {{count}} վայրկյան'
  },
  xSeconds: {
    one: '1 վայրկյան',
    other: '{{count}} վայրկյան'
  },
  halfAMinute: 'կես րոպե',
  lessThanXMinutes: {
    one: 'ավելի քիչ քան 1 րոպե',
    other: 'ավելի քիչ քան {{count}} րոպե'
  },
  xMinutes: {
    one: '1 րոպե',
    other: '{{count}} րոպե'
  },
  aboutXHours: {
    one: 'մոտ 1 ժամ',
    other: 'մոտ {{count}} ժամ'
  },
  xHours: {
    one: '1 ժամ',
    other: '{{count}} ժամ'
  },
  xDays: {
    one: '1 օր',
    other: '{{count}} օր'
  },
  aboutXWeeks: {
    one: 'մոտ 1 շաբաթ',
    other: 'մոտ {{count}} շաբաթ'
  },
  xWeeks: {
    one: '1 շաբաթ',
    other: '{{count}} շաբաթ'
  },
  aboutXMonths: {
    one: 'մոտ 1 ամիս',
    other: 'մոտ {{count}} ամիս'
  },
  xMonths: {
    one: '1 ամիս',
    other: '{{count}} ամիս'
  },
  aboutXYears: {
    one: 'մոտ 1 տարի',
    other: 'մոտ {{count}} տարի'
  },
  xYears: {
    one: '1 տարի',
    other: '{{count}} տարի'
  },
  overXYears: {
    one: 'ավելի քան 1 տարի',
    other: 'ավելի քան {{count}} տարի'
  },
  almostXYears: {
    one: 'համարյա 1 տարի',
    other: 'համարյա {{count}} տարի'
  }
};
function formatDistance$I(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$H[token] === 'string') {
    result = formatDistanceLocale$H[token];
  } else if (count === 1) {
    result = formatDistanceLocale$H[token].one;
  } else {
    result = formatDistanceLocale$H[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return result + ' հետո';
    } else {
      return result + ' առաջ';
    }
  }

  return result;
}

var dateFormats$I = {
  full: 'd MMMM, y, EEEE',
  long: 'd MMMM, y',
  medium: 'd MMM, y',
  short: 'dd.MM.yyyy'
};
var timeFormats$I = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$I = {
  full: "{{date}} 'ժ․'{{time}}",
  long: "{{date}} 'ժ․'{{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$I = {
  date: buildFormatLongFn({
    formats: dateFormats$I,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$I,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$I,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$I = {
  lastWeek: "'նախորդ' eeee p'֊ին'",
  yesterday: "'երեկ' p'֊ին'",
  today: "'այսօր' p'֊ին'",
  tomorrow: "'վաղը' p'֊ին'",
  nextWeek: "'հաջորդ' eeee p'֊ին'",
  other: 'P'
};
function formatRelative$I(token, _date, _baseDate, _options) {
  return formatRelativeLocale$I[token];
}

var eraValues$I = {
  narrow: ['Ք', 'Մ'],
  abbreviated: ['ՔԱ', 'ՄԹ'],
  wide: ['Քրիստոսից առաջ', 'Մեր թվարկության']
};
var quarterValues$I = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Ք1', 'Ք2', 'Ք3', 'Ք4'],
  wide: ['1֊ին քառորդ', '2֊րդ քառորդ', '3֊րդ քառորդ', '4֊րդ քառորդ']
};
var monthValues$I = {
  narrow: ['Հ', 'Փ', 'Մ', 'Ա', 'Մ', 'Հ', 'Հ', 'Օ', 'Ս', 'Հ', 'Ն', 'Դ'],
  abbreviated: ['հուն', 'փետ', 'մար', 'ապր', 'մայ', 'հուն', 'հուլ', 'օգս', 'սեպ', 'հոկ', 'նոյ', 'դեկ'],
  wide: ['հունվար', 'փետրվար', 'մարտ', 'ապրիլ', 'մայիս', 'հունիս', 'հուլիս', 'օգոստոս', 'սեպտեմբեր', 'հոկտեմբեր', 'նոյեմբեր', 'դեկտեմբեր']
};
var dayValues$I = {
  narrow: ['Կ', 'Ե', 'Ե', 'Չ', 'Հ', 'Ո', 'Շ'],
  short: ['կր', 'եր', 'եք', 'չք', 'հգ', 'ուր', 'շբ'],
  abbreviated: ['կիր', 'երկ', 'երք', 'չոր', 'հնգ', 'ուրբ', 'շաբ'],
  wide: ['կիրակի', 'երկուշաբթի', 'երեքշաբթի', 'չորեքշաբթի', 'հինգշաբթի', 'ուրբաթ', 'շաբաթ']
};
var dayPeriodValues$H = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'կեսգշ',
    noon: 'կեսօր',
    morning: 'առավոտ',
    afternoon: 'ցերեկ',
    evening: 'երեկո',
    night: 'գիշեր'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'կեսգիշեր',
    noon: 'կեսօր',
    morning: 'առավոտ',
    afternoon: 'ցերեկ',
    evening: 'երեկո',
    night: 'գիշեր'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'կեսգիշեր',
    noon: 'կեսօր',
    morning: 'առավոտ',
    afternoon: 'ցերեկ',
    evening: 'երեկո',
    night: 'գիշեր'
  }
};
var formattingDayPeriodValues$A = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'կեսգշ',
    noon: 'կեսօր',
    morning: 'առավոտը',
    afternoon: 'ցերեկը',
    evening: 'երեկոյան',
    night: 'գիշերը'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'կեսգիշերին',
    noon: 'կեսօրին',
    morning: 'առավոտը',
    afternoon: 'ցերեկը',
    evening: 'երեկոյան',
    night: 'գիշերը'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'կեսգիշերին',
    noon: 'կեսօրին',
    morning: 'առավոտը',
    afternoon: 'ցերեկը',
    evening: 'երեկոյան',
    night: 'գիշերը'
  }
};

function ordinalNumber$I(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var rem100 = number % 100;

  if (rem100 < 10) {
    if (rem100 % 10 === 1) {
      return number + '֊ին';
    }
  }

  return number + '֊րդ';
}

var localize$I = {
  ordinalNumber: ordinalNumber$I,
  era: buildLocalizeFn({
    values: eraValues$I,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$I,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$I,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$I,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$H,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$A,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$I = /^(\d+)((-|֊)?(ին|րդ))?/i;
var parseOrdinalNumberPattern$I = /\d+/i;
var matchEraPatterns$I = {
  narrow: /^(Ք|Մ)/i,
  abbreviated: /^(Ք\.?\s?Ա\.?|Մ\.?\s?Թ\.?\s?Ա\.?|Մ\.?\s?Թ\.?|Ք\.?\s?Հ\.?)/i,
  wide: /^(քրիստոսից առաջ|մեր թվարկությունից առաջ|մեր թվարկության|քրիստոսից հետո)/i
};
var parseEraPatterns$I = {
  any: [/^(ք|մ)/i]
};
var matchQuarterPatterns$I = {
  narrow: /^[1234]/i,
  abbreviated: /^ք[1234]/i,
  wide: /^[1234]((-|֊)?(ին|րդ)) քառորդ/i
};
var parseQuarterPatterns$I = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$I = {
  narrow: /^[հփմաօսնդ]/i,
  abbreviated: /^(հուն|փետ|մար|ապր|մայ|հուն|հուլ|օգս|սեպ|հոկ|նոյ|դեկ)/i,
  wide: /^(հունվար|փետրվար|մարտ|ապրիլ|մայիս|հունիս|հուլիս|օգոստոս|սեպտեմբեր|հոկտեմբեր|նոյեմբեր|դեկտեմբեր)/i
};
var parseMonthPatterns$I = {
  narrow: [/^հ/i, /^փ/i, /^մ/i, /^ա/i, /^մ/i, /^հ/i, /^հ/i, /^օ/i, /^ս/i, /^հ/i, /^ն/i, /^դ/i],
  any: [/^հու/i, /^փ/i, /^մար/i, /^ա/i, /^մայ/i, /^հուն/i, /^հուլ/i, /^օ/i, /^ս/i, /^հոկ/i, /^ն/i, /^դ/i]
};
var matchDayPatterns$I = {
  narrow: /^[եչհոշկ]/i,
  short: /^(կր|եր|եք|չք|հգ|ուր|շբ)/i,
  abbreviated: /^(կիր|երկ|երք|չոր|հնգ|ուրբ|շաբ)/i,
  wide: /^(կիրակի|երկուշաբթի|երեքշաբթի|չորեքշաբթի|հինգշաբթի|ուրբաթ|շաբաթ)/i
};
var parseDayPatterns$I = {
  narrow: [/^կ/i, /^ե/i, /^ե/i, /^չ/i, /^հ/i, /^(ո|Ո)/, /^շ/i],
  short: [/^կ/i, /^եր/i, /^եք/i, /^չ/i, /^հ/i, /^(ո|Ո)/, /^շ/i],
  abbreviated: [/^կ/i, /^երկ/i, /^երք/i, /^չ/i, /^հ/i, /^(ո|Ո)/, /^շ/i],
  wide: [/^կ/i, /^երկ/i, /^երե/i, /^չ/i, /^հ/i, /^(ո|Ո)/, /^շ/i]
};
var matchDayPeriodPatterns$I = {
  narrow: /^([ap]|կեսգշ|կեսօր|(առավոտը?|ցերեկը?|երեկո(յան)?|գիշերը?))/i,
  any: /^([ap]\.?\s?m\.?|կեսգիշեր(ին)?|կեսօր(ին)?|(առավոտը?|ցերեկը?|երեկո(յան)?|գիշերը?))/i
};
var parseDayPeriodPatterns$I = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /կեսգիշեր/i,
    noon: /կեսօր/i,
    morning: /առավոտ/i,
    afternoon: /ցերեկ/i,
    evening: /երեկո/i,
    night: /գիշեր/i
  }
};
var match$I = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$I,
    parsePattern: parseOrdinalNumberPattern$I,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$I,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$I,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$I,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$I,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$I,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$I,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$I,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$I,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$I,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$I,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Armenian locale
 * @language Armenian
 * @iso-639-2 arm
 * @author Alex Igityan [@alexigityan]{@link https://github.com/alexigityan}
 */

var locale$I = {
  code: 'hy',
  formatDistance: formatDistance$I,
  formatLong: formatLong$I,
  formatRelative: formatRelative$I,
  localize: localize$I,
  match: match$I,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$G = {
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

var formatDistance$H = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$G[token];

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

var dateFormats$H = {
  full: 'EEEE, d MMMM yyyy',
  long: 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  short: 'd/M/yyyy'
};
var timeFormats$H = {
  full: 'HH.mm.ss',
  long: 'HH.mm.ss',
  medium: 'HH.mm',
  short: 'HH.mm'
};
var dateTimeFormats$H = {
  full: "{{date}} 'pukul' {{time}}",
  long: "{{date}} 'pukul' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$H = {
  date: buildFormatLongFn({
    formats: dateFormats$H,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$H,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$H,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$H = {
  lastWeek: "eeee 'lalu pukul' p",
  yesterday: "'Kemarin pukul' p",
  today: "'Hari ini pukul' p",
  tomorrow: "'Besok pukul' p",
  nextWeek: "eeee 'pukul' p",
  other: 'P'
};

var formatRelative$H = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$H[token];
};

// https://www.unicode.org/cldr/charts/32/summary/id.html

var eraValues$H = {
  narrow: ['SM', 'M'],
  abbreviated: ['SM', 'M'],
  wide: ['Sebelum Masehi', 'Masehi']
};
var quarterValues$H = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['K1', 'K2', 'K3', 'K4'],
  wide: ['Kuartal ke-1', 'Kuartal ke-2', 'Kuartal ke-3', 'Kuartal ke-4']
}; // Note: in Indonesian, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$H = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
  wide: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
};
var dayValues$H = {
  narrow: ['M', 'S', 'S', 'R', 'K', 'J', 'S'],
  short: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  abbreviated: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  wide: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
};
var dayPeriodValues$G = {
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
var formattingDayPeriodValues$z = {
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

var ordinalNumber$H = function (dirtyNumber, _options) {
  var number = Number(dirtyNumber); // Can't use "pertama", "kedua" because can't be parsed

  return 'ke-' + number;
};

var localize$H = {
  ordinalNumber: ordinalNumber$H,
  era: buildLocalizeFn({
    values: eraValues$H,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$H,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$H,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$H,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$G,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$z,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$H = /^ke-(\d+)?/i;
var parseOrdinalNumberPattern$H = /\d+/i;
var matchEraPatterns$H = {
  narrow: /^(sm|m)/i,
  abbreviated: /^(s\.?\s?m\.?|s\.?\s?e\.?\s?u\.?|m\.?|e\.?\s?u\.?)/i,
  wide: /^(sebelum masehi|sebelum era umum|masehi|era umum)/i
};
var parseEraPatterns$H = {
  any: [/^s/i, /^(m|e)/i]
};
var matchQuarterPatterns$H = {
  narrow: /^[1234]/i,
  abbreviated: /^K-?\s[1234]/i,
  wide: /^Kuartal ke-?\s?[1234]/i
};
var parseQuarterPatterns$H = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$H = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|mei|jun|jul|agt|sep|okt|nov|des)/i,
  wide: /^(januari|februari|maret|april|mei|juni|juli|agustus|september|oktober|november|desember)/i
};
var parseMonthPatterns$H = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^ma/i, /^ap/i, /^me/i, /^jun/i, /^jul/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$H = {
  narrow: /^[srkjm]/i,
  short: /^(min|sen|sel|rab|kam|jum|sab)/i,
  abbreviated: /^(min|sen|sel|rab|kam|jum|sab)/i,
  wide: /^(minggu|senin|selasa|rabu|kamis|jumat|sabtu)/i
};
var parseDayPatterns$H = {
  narrow: [/^m/i, /^s/i, /^s/i, /^r/i, /^k/i, /^j/i, /^s/i],
  any: [/^m/i, /^sen/i, /^sel/i, /^r/i, /^k/i, /^j/i, /^sa/i]
};
var matchDayPeriodPatterns$H = {
  narrow: /^(a|p|tengah m|tengah h|(di(\swaktu)?) (pagi|siang|sore|malam))/i,
  any: /^([ap]\.?\s?m\.?|tengah malam|tengah hari|(di(\swaktu)?) (pagi|siang|sore|malam))/i
};
var parseDayPeriodPatterns$H = {
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
var match$H = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$H,
    parsePattern: parseOrdinalNumberPattern$H,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$H,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$H,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$H,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$H,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$H,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$H,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$H,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$H,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$H,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$H,
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

var locale$H = {
  code: 'id',
  formatDistance: formatDistance$H,
  formatLong: formatLong$H,
  formatRelative: formatRelative$H,
  localize: localize$H,
  match: match$H,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$F = {
  lessThanXSeconds: {
    one: 'minna en 1 sekúnda',
    other: 'minna en {{count}} sekúndur'
  },
  xSeconds: {
    one: '1 sekúnda',
    other: '{{count}} sekúndur'
  },
  halfAMinute: 'hálf mínúta',
  lessThanXMinutes: {
    one: 'minna en 1 mínúta',
    other: 'minna en {{count}} mínútur'
  },
  xMinutes: {
    one: '1 mínúta',
    other: '{{count}} mínútur'
  },
  aboutXHours: {
    one: 'u.þ.b. 1 klukkustund',
    other: 'u.þ.b. {{count}} klukkustundir'
  },
  xHours: {
    one: '1 klukkustund',
    other: '{{count}} klukkustundir'
  },
  xDays: {
    one: '1 dagur',
    other: '{{count}} dagar'
  },
  aboutXWeeks: {
    one: 'um viku',
    other: 'um {{count}} vikur'
  },
  xWeeks: {
    one: '1 viku',
    other: '{{count}} vikur'
  },
  aboutXMonths: {
    one: 'u.þ.b. 1 mánuður',
    other: 'u.þ.b. {{count}} mánuðir'
  },
  xMonths: {
    one: '1 mánuður',
    other: '{{count}} mánuðir'
  },
  aboutXYears: {
    one: 'u.þ.b. 1 ár',
    other: 'u.þ.b. {{count}} ár'
  },
  xYears: {
    one: '1 ár',
    other: '{{count}} ár'
  },
  overXYears: {
    one: 'meira en 1 ár',
    other: 'meira en {{count}} ár'
  },
  almostXYears: {
    one: 'næstum 1 ár',
    other: 'næstum {{count}} ár'
  }
};

var formatDistance$G = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$F[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'í ' + result;
    } else {
      return result + ' síðan';
    }
  }

  return result;
};

var dateFormats$G = {
  full: 'EEEE, do MMMM y',
  long: 'do MMMM y',
  medium: 'do MMM y',
  short: 'd.MM.y'
};
var timeFormats$G = {
  full: "'kl'. HH:mm:ss zzzz",
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$G = {
  full: "{{date}} 'kl.' {{time}}",
  long: "{{date}} 'kl.' {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$G = {
  date: buildFormatLongFn({
    formats: dateFormats$G,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$G,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$G,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$G = {
  lastWeek: "'síðasta' dddd 'kl.' p",
  yesterday: "'í gær kl.' p",
  today: "'í dag kl.' p",
  tomorrow: "'á morgun kl.' p",
  nextWeek: "dddd 'kl.' p",
  other: 'P'
};

var formatRelative$G = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$G[token];
};

var eraValues$G = {
  narrow: ['f.Kr.', 'e.Kr.'],
  abbreviated: ['f.Kr.', 'e.Kr.'],
  wide: ['fyrir Krist', 'eftir Krist']
};
var quarterValues$G = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1F', '2F', '3F', '4F'],
  wide: ['1. fjórðungur', '2. fjórðungur', '3. fjórðungur', '4. fjórðungur']
};
var monthValues$G = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'Á', 'S', 'Ó', 'N', 'D'],
  abbreviated: ['jan.', 'feb.', 'mars', 'apríl', 'maí', 'júní', 'júlí', 'ágúst', 'sept.', 'okt.', 'nóv.', 'des.'],
  wide: ['janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní', 'júlí', 'ágúst', 'september', 'október', 'nóvember', 'desember']
};
var dayValues$G = {
  narrow: ['S', 'M', 'Þ', 'M', 'F', 'F', 'L'],
  short: ['Su', 'Má', 'Þr', 'Mi', 'Fi', 'Fö', 'La'],
  abbreviated: ['sun.', 'mán.', 'þri.', 'mið.', 'fim.', 'fös.', 'lau'],
  wide: ['sunnudagur', 'mánudagur', 'þriðjudagur', 'miðvikudagur', 'fimmtudagur', 'föstudagur', 'laugardagur']
};
var dayPeriodValues$F = {
  narrow: {
    am: 'f',
    pm: 'e',
    midnight: 'miðnætti',
    noon: 'hádegi',
    morning: 'morgunn',
    afternoon: 'síðdegi',
    evening: 'kvöld',
    night: 'nótt'
  },
  abbreviated: {
    am: 'f.h.',
    pm: 'e.h.',
    midnight: 'miðnætti',
    noon: 'hádegi',
    morning: 'morgunn',
    afternoon: 'síðdegi',
    evening: 'kvöld',
    night: 'nótt'
  },
  wide: {
    am: 'fyrir hádegi',
    pm: 'eftir hádegi',
    midnight: 'miðnætti',
    noon: 'hádegi',
    morning: 'morgunn',
    afternoon: 'síðdegi',
    evening: 'kvöld',
    night: 'nótt'
  }
};
var formattingDayPeriodValues$y = {
  narrow: {
    am: 'f',
    pm: 'e',
    midnight: 'á miðnætti',
    noon: 'á hádegi',
    morning: 'að morgni',
    afternoon: 'síðdegis',
    evening: 'um kvöld',
    night: 'um nótt'
  },
  abbreviated: {
    am: 'f.h.',
    pm: 'e.h.',
    midnight: 'á miðnætti',
    noon: 'á hádegi',
    morning: 'að morgni',
    afternoon: 'síðdegis',
    evening: 'um kvöld',
    night: 'um nótt'
  },
  wide: {
    am: 'fyrir hádegi',
    pm: 'eftir hádegi',
    midnight: 'á miðnætti',
    noon: 'á hádegi',
    morning: 'að morgni',
    afternoon: 'síðdegis',
    evening: 'um kvöld',
    night: 'um nótt'
  }
};

var ordinalNumber$G = function (dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + '.';
};

var localize$G = {
  ordinalNumber: ordinalNumber$G,
  era: buildLocalizeFn({
    values: eraValues$G,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$G,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$G,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$G,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$F,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$y,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$G = /^(\d+)(\.)?/i;
var parseOrdinalNumberPattern$G = /\d+(\.)?/i;
var matchEraPatterns$G = {
  narrow: /^(f\.Kr\.|e\.Kr\.)/i,
  abbreviated: /^(f\.Kr\.|e\.Kr\.)/i,
  wide: /^(fyrir Krist|eftir Krist)/i
};
var parseEraPatterns$G = {
  any: [/^(f\.Kr\.)/i, /^(e\.Kr\.)/i]
};
var matchQuarterPatterns$G = {
  narrow: /^[1234]\.?/i,
  abbreviated: /^q[1234]\.?/i,
  wide: /^[1234]\.? fjórðungur/i
};
var parseQuarterPatterns$G = {
  any: [/1\.?/i, /2\.?/i, /3\.?/i, /4\.?/i]
};
var matchMonthPatterns$G = {
  narrow: /^[jfmásónd]/i,
  abbreviated: /^(jan\.|feb\.|mars\.|apríl\.|maí|júní|júlí|águst|sep\.|oct\.|nov\.|dec\.)/i,
  wide: /^(januar|febrúar|mars|apríl|maí|júní|júlí|águst|september|október|nóvember|desember)/i
};
var parseMonthPatterns$G = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^á/i, /^s/i, /^ó/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maí/i, /^jún/i, /^júl/i, /^áu/i, /^s/i, /^ó/i, /^n/i, /^d/i]
};
var matchDayPatterns$G = {
  narrow: /^[smtwf]/i,
  short: /^(su|má|þr|mi|fi|fö|la)/i,
  abbreviated: /^(sun|mán|þri|mið|fim|fös|lau)\.?/i,
  wide: /^(sunnudagur|mánudagur|þriðjudagur|miðvikudagur|fimmtudagur|föstudagur|laugardagur)/i
};
var parseDayPatterns$G = {
  narrow: [/^s/i, /^m/i, /^þ/i, /^m/i, /^f/i, /^f/i, /^l/i],
  any: [/^su/i, /^má/i, /^þr/i, /^mi/i, /^fi/i, /^fö/i, /^la/i]
};
var matchDayPeriodPatterns$G = {
  narrow: /^(f|e|síðdegis|(á|að|um) (morgni|kvöld|nótt|miðnætti))/i,
  any: /^(fyrir hádegi|eftir hádegi|[ef]\.?h\.?|síðdegis|morgunn|(á|að|um) (morgni|kvöld|nótt|miðnætti))/i
};
var parseDayPeriodPatterns$G = {
  any: {
    am: /^f/i,
    pm: /^e/i,
    midnight: /^mi/i,
    noon: /^há/i,
    morning: /morgunn/i,
    afternoon: /síðdegi/i,
    evening: /kvöld/i,
    night: /nótt/i
  }
};
var match$G = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$G,
    parsePattern: parseOrdinalNumberPattern$G,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$G,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$G,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$G,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$G,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$G,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$G,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$G,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$G,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$G,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$G,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Icelandic locale.
 * @language Icelandic
 * @iso-639-2 isl
 * @author Derek Blank [@derekblank]{@link https://github.com/derekblank}
 * @author Arnór Ýmir [@lamayg]{@link https://github.com/lamayg}
 */

var locale$G = {
  code: 'is',
  formatDistance: formatDistance$G,
  formatLong: formatLong$G,
  formatRelative: formatRelative$G,
  localize: localize$G,
  match: match$G,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$E = {
  lessThanXSeconds: {
    one: 'meno di un secondo',
    other: 'meno di {{count}} secondi'
  },
  xSeconds: {
    one: 'un secondo',
    other: '{{count}} secondi'
  },
  halfAMinute: 'alcuni secondi',
  lessThanXMinutes: {
    one: 'meno di un minuto',
    other: 'meno di {{count}} minuti'
  },
  xMinutes: {
    one: 'un minuto',
    other: '{{count}} minuti'
  },
  aboutXHours: {
    one: "circa un'ora",
    other: 'circa {{count}} ore'
  },
  xHours: {
    one: "un'ora",
    other: '{{count}} ore'
  },
  xDays: {
    one: 'un giorno',
    other: '{{count}} giorni'
  },
  aboutXWeeks: {
    one: 'circa una settimana',
    other: 'circa {{count}} settimane'
  },
  xWeeks: {
    one: 'una settimana',
    other: '{{count}} settimane'
  },
  aboutXMonths: {
    one: 'circa un mese',
    other: 'circa {{count}} mesi'
  },
  xMonths: {
    one: 'un mese',
    other: '{{count}} mesi'
  },
  aboutXYears: {
    one: 'circa un anno',
    other: 'circa {{count}} anni'
  },
  xYears: {
    one: 'un anno',
    other: '{{count}} anni'
  },
  overXYears: {
    one: 'più di un anno',
    other: 'più di {{count}} anni'
  },
  almostXYears: {
    one: 'quasi un anno',
    other: 'quasi {{count}} anni'
  }
};

var formatDistance$F = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$E[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'tra ' + result;
    } else {
      return result + ' fa';
    }
  }

  return result;
};

var dateFormats$F = {
  full: 'EEEE d MMMM y',
  long: 'd MMMM y',
  medium: 'd MMM y',
  short: 'dd/MM/y'
};
var timeFormats$F = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$F = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$F = {
  date: buildFormatLongFn({
    formats: dateFormats$F,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$F,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$F,
    defaultWidth: 'full'
  })
};

var weekdays$2 = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

function lastWeek$5(day) {
  switch (day) {
    case 0:
      return "'domenica scorsa alle' p";

    default:
      return "'" + weekdays$2[day] + " scorso alle' p";
  }
}

function thisWeek$5(day) {
  return "'" + weekdays$2[day] + " alle' p";
}

function nextWeek$5(day) {
  switch (day) {
    case 0:
      return "'domenica prossima alle' p";

    default:
      return "'" + weekdays$2[day] + " prossimo alle' p";
  }
}

var formatRelativeLocale$F = {
  lastWeek: function (date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek$5(day);
    } else {
      return lastWeek$5(day);
    }
  },
  yesterday: "'ieri alle' p",
  today: "'oggi alle' p",
  tomorrow: "'domani alle' p",
  nextWeek: function (date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek$5(day);
    } else {
      return nextWeek$5(day);
    }
  },
  other: 'P'
};

var formatRelative$F = function (token, date, baseDate, options) {
  var format = formatRelativeLocale$F[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
};

var eraValues$F = {
  narrow: ['aC', 'dC'],
  abbreviated: ['a.C.', 'd.C.'],
  wide: ['avanti Cristo', 'dopo Cristo']
};
var quarterValues$F = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['T1', 'T2', 'T3', 'T4'],
  wide: ['1º trimestre', '2º trimestre', '3º trimestre', '4º trimestre']
};
var monthValues$F = {
  narrow: ['G', 'F', 'M', 'A', 'M', 'G', 'L', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic'],
  wide: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']
};
var dayValues$F = {
  narrow: ['D', 'L', 'M', 'M', 'G', 'V', 'S'],
  short: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
  abbreviated: ['dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab'],
  wide: ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato']
};
var dayPeriodValues$E = {
  narrow: {
    am: 'm.',
    pm: 'p.',
    midnight: 'mezzanotte',
    noon: 'mezzogiorno',
    morning: 'mattina',
    afternoon: 'pomeriggio',
    evening: 'sera',
    night: 'notte'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'mezzanotte',
    noon: 'mezzogiorno',
    morning: 'mattina',
    afternoon: 'pomeriggio',
    evening: 'sera',
    night: 'notte'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'mezzanotte',
    noon: 'mezzogiorno',
    morning: 'mattina',
    afternoon: 'pomeriggio',
    evening: 'sera',
    night: 'notte'
  }
};
var formattingDayPeriodValues$x = {
  narrow: {
    am: 'm.',
    pm: 'p.',
    midnight: 'mezzanotte',
    noon: 'mezzogiorno',
    morning: 'di mattina',
    afternoon: 'del pomeriggio',
    evening: 'di sera',
    night: 'di notte'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'mezzanotte',
    noon: 'mezzogiorno',
    morning: 'di mattina',
    afternoon: 'del pomeriggio',
    evening: 'di sera',
    night: 'di notte'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'mezzanotte',
    noon: 'mezzogiorno',
    morning: 'di mattina',
    afternoon: 'del pomeriggio',
    evening: 'di sera',
    night: 'di notte'
  }
};

var ordinalNumber$F = function (dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + 'º';
};

var localize$F = {
  ordinalNumber: ordinalNumber$F,
  era: buildLocalizeFn({
    values: eraValues$F,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$F,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$F,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$F,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$E,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$x,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$F = /^(\d+)(º)?/i;
var parseOrdinalNumberPattern$F = /\d+/i;
var matchEraPatterns$F = {
  narrow: /^(aC|dC)/i,
  abbreviated: /^(a\.?\s?C\.?|a\.?\s?e\.?\s?v\.?|d\.?\s?C\.?|e\.?\s?v\.?)/i,
  wide: /^(avanti Cristo|avanti Era Volgare|dopo Cristo|Era Volgare)/i
};
var parseEraPatterns$F = {
  any: [/^a/i, /^(d|e)/i]
};
var matchQuarterPatterns$F = {
  narrow: /^[1234]/i,
  abbreviated: /^t[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
var parseQuarterPatterns$F = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$F = {
  narrow: /^[gfmalsond]/i,
  abbreviated: /^(gen|feb|mar|apr|mag|giu|lug|ago|set|ott|nov|dic)/i,
  wide: /^(gennaio|febbraio|marzo|aprile|maggio|giugno|luglio|agosto|settembre|ottobre|novembre|dicembre)/i
};
var parseMonthPatterns$F = {
  narrow: [/^g/i, /^f/i, /^m/i, /^a/i, /^m/i, /^g/i, /^l/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ge/i, /^f/i, /^mar/i, /^ap/i, /^mag/i, /^gi/i, /^l/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$F = {
  narrow: /^[dlmgvs]/i,
  short: /^(do|lu|ma|me|gi|ve|sa)/i,
  abbreviated: /^(dom|lun|mar|mer|gio|ven|sab)/i,
  wide: /^(domenica|luned[i|ì]|marted[i|ì]|mercoled[i|ì]|gioved[i|ì]|venerd[i|ì]|sabato)/i
};
var parseDayPatterns$F = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^g/i, /^v/i, /^s/i],
  any: [/^d/i, /^l/i, /^ma/i, /^me/i, /^g/i, /^v/i, /^s/i]
};
var matchDayPeriodPatterns$F = {
  narrow: /^(a|m\.|p|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i,
  any: /^([ap]\.?\s?m\.?|mezzanotte|mezzogiorno|(di|del) (mattina|pomeriggio|sera|notte))/i
};
var parseDayPeriodPatterns$F = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mezza/i,
    noon: /^mezzo/i,
    morning: /mattina/i,
    afternoon: /pomeriggio/i,
    evening: /sera/i,
    night: /notte/i
  }
};
var match$F = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$F,
    parsePattern: parseOrdinalNumberPattern$F,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$F,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$F,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$F,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$F,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$F,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$F,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$F,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$F,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$F,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$F,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Italian locale.
 * @language Italian
 * @iso-639-2 ita
 * @author Alberto Restifo [@albertorestifo]{@link https://github.com/albertorestifo}
 * @author Giovanni Polimeni [@giofilo]{@link https://github.com/giofilo}
 * @author Vincenzo Carrese [@vin-car]{@link https://github.com/vin-car}
 */

var locale$F = {
  code: 'it',
  formatDistance: formatDistance$F,
  formatLong: formatLong$F,
  formatRelative: formatRelative$F,
  localize: localize$F,
  match: match$F,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$D = {
  lessThanXSeconds: {
    one: '1秒未満',
    other: '{{count}}秒未満',
    oneWithSuffix: '約1秒',
    otherWithSuffix: '約{{count}}秒'
  },
  xSeconds: {
    one: '1秒',
    other: '{{count}}秒'
  },
  halfAMinute: '30秒',
  lessThanXMinutes: {
    one: '1分未満',
    other: '{{count}}分未満',
    oneWithSuffix: '約1分',
    otherWithSuffix: '約{{count}}分'
  },
  xMinutes: {
    one: '1分',
    other: '{{count}}分'
  },
  aboutXHours: {
    one: '約1時間',
    other: '約{{count}}時間'
  },
  xHours: {
    one: '1時間',
    other: '{{count}}時間'
  },
  xDays: {
    one: '1日',
    other: '{{count}}日'
  },
  aboutXWeeks: {
    one: '約1週間',
    other: '約{{count}}週間'
  },
  xWeeks: {
    one: '1週間',
    other: '{{count}}週間'
  },
  aboutXMonths: {
    one: '約1か月',
    other: '約{{count}}か月'
  },
  xMonths: {
    one: '1か月',
    other: '{{count}}か月'
  },
  aboutXYears: {
    one: '約1年',
    other: '約{{count}}年'
  },
  xYears: {
    one: '1年',
    other: '{{count}}年'
  },
  overXYears: {
    one: '1年以上',
    other: '{{count}}年以上'
  },
  almostXYears: {
    one: '1年近く',
    other: '{{count}}年近く'
  }
};

var formatDistance$E = function (token, count, options) {
  options = options || {};
  var result;
  var tokenValue = formatDistanceLocale$D[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    if (options.addSuffix && tokenValue.oneWithSuffix) {
      result = tokenValue.oneWithSuffix;
    } else {
      result = tokenValue.one;
    }
  } else {
    if (options.addSuffix && tokenValue.otherWithSuffix) {
      result = tokenValue.otherWithSuffix.replace('{{count}}', String(count));
    } else {
      result = tokenValue.other.replace('{{count}}', String(count));
    }
  }

  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + '後';
    } else {
      return result + '前';
    }
  }

  return result;
};

var dateFormats$E = {
  full: 'y年M月d日EEEE',
  long: 'y年M月d日',
  medium: 'y/MM/dd',
  short: 'y/MM/dd'
};
var timeFormats$E = {
  full: 'H時mm分ss秒 zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$E = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$E = {
  date: buildFormatLongFn({
    formats: dateFormats$E,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$E,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$E,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$E = {
  lastWeek: '先週のeeeeのp',
  yesterday: '昨日のp',
  today: '今日のp',
  tomorrow: '明日のp',
  nextWeek: '翌週のeeeeのp',
  other: 'P'
};

var formatRelative$E = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$E[token];
};

var eraValues$E = {
  narrow: ['BC', 'AC'],
  abbreviated: ['紀元前', '西暦'],
  wide: ['紀元前', '西暦']
};
var quarterValues$E = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['第1四半期', '第2四半期', '第3四半期', '第4四半期']
};
var monthValues$E = {
  narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  abbreviated: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  wide: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
};
var dayValues$E = {
  narrow: ['日', '月', '火', '水', '木', '金', '土'],
  short: ['日', '月', '火', '水', '木', '金', '土'],
  abbreviated: ['日', '月', '火', '水', '木', '金', '土'],
  wide: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日']
};
var dayPeriodValues$D = {
  narrow: {
    am: '午前',
    pm: '午後',
    midnight: '深夜',
    noon: '正午',
    morning: '朝',
    afternoon: '午後',
    evening: '夜',
    night: '深夜'
  },
  abbreviated: {
    am: '午前',
    pm: '午後',
    midnight: '深夜',
    noon: '正午',
    morning: '朝',
    afternoon: '午後',
    evening: '夜',
    night: '深夜'
  },
  wide: {
    am: '午前',
    pm: '午後',
    midnight: '深夜',
    noon: '正午',
    morning: '朝',
    afternoon: '午後',
    evening: '夜',
    night: '深夜'
  }
};
var formattingDayPeriodValues$w = {
  narrow: {
    am: '午前',
    pm: '午後',
    midnight: '深夜',
    noon: '正午',
    morning: '朝',
    afternoon: '午後',
    evening: '夜',
    night: '深夜'
  },
  abbreviated: {
    am: '午前',
    pm: '午後',
    midnight: '深夜',
    noon: '正午',
    morning: '朝',
    afternoon: '午後',
    evening: '夜',
    night: '深夜'
  },
  wide: {
    am: '午前',
    pm: '午後',
    midnight: '深夜',
    noon: '正午',
    morning: '朝',
    afternoon: '午後',
    evening: '夜',
    night: '深夜'
  }
};

var ordinalNumber$E = function (dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   const options = dirtyOptions || {}
  //   const unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var options = dirtyOptions || {};
  var unit = String(options.unit);

  switch (unit) {
    case 'year':
      return "".concat(number, "\u5E74");

    case 'quarter':
      return "\u7B2C".concat(number, "\u56DB\u534A\u671F");

    case 'month':
      return "".concat(number, "\u6708");

    case 'week':
      return "\u7B2C".concat(number, "\u9031");

    case 'date':
      return "".concat(number, "\u65E5");

    case 'hour':
      return "".concat(number, "\u6642");

    case 'minute':
      return "".concat(number, "\u5206");

    case 'second':
      return "".concat(number, "\u79D2");

    default:
      return "".concat(number);
  }
};

var localize$E = {
  ordinalNumber: ordinalNumber$E,
  era: buildLocalizeFn({
    values: eraValues$E,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$E,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$E,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$E,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$D,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$w,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$E = /^第?\d+(年|四半期|月|週|日|時|分|秒)?/i;
var parseOrdinalNumberPattern$E = /\d+/i;
var matchEraPatterns$E = {
  narrow: /^(B\.?C\.?|A\.?D\.?)/i,
  abbreviated: /^(紀元[前後]|西暦)/i,
  wide: /^(紀元[前後]|西暦)/i
};
var parseEraPatterns$E = {
  narrow: [/^B/i, /^A/i],
  any: [/^(紀元前)/i, /^(西暦|紀元後)/i]
};
var matchQuarterPatterns$E = {
  narrow: /^[1234]/i,
  abbreviated: /^Q[1234]/i,
  wide: /^第[1234一二三四１２３４]四半期/i
};
var parseQuarterPatterns$E = {
  any: [/(1|一|１)/i, /(2|二|２)/i, /(3|三|３)/i, /(4|四|４)/i]
};
var matchMonthPatterns$E = {
  narrow: /^([123456789]|1[012])/,
  abbreviated: /^([123456789]|1[012])月/i,
  wide: /^([123456789]|1[012])月/i
};
var parseMonthPatterns$E = {
  any: [/^1\D/, /^2/, /^3/, /^4/, /^5/, /^6/, /^7/, /^8/, /^9/, /^10/, /^11/, /^12/]
};
var matchDayPatterns$E = {
  narrow: /^[日月火水木金土]/,
  short: /^[日月火水木金土]/,
  abbreviated: /^[日月火水木金土]/,
  wide: /^[日月火水木金土]曜日/
};
var parseDayPatterns$E = {
  any: [/^日/, /^月/, /^火/, /^水/, /^木/, /^金/, /^土/]
};
var matchDayPeriodPatterns$E = {
  any: /^(AM|PM|午前|午後|正午|深夜|真夜中|夜|朝)/i
};
var parseDayPeriodPatterns$E = {
  any: {
    am: /^(A|午前)/i,
    pm: /^(P|午後)/i,
    midnight: /^深夜|真夜中/i,
    noon: /^正午/i,
    morning: /^朝/i,
    afternoon: /^午後/i,
    evening: /^夜/i,
    night: /^深夜/i
  }
};
var match$E = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$E,
    parsePattern: parseOrdinalNumberPattern$E,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$E,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$E,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$E,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$E,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$E,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$E,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$E,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$E,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$E,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$E,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Japanese locale.
 * @language Japanese
 * @iso-639-2 jpn
 * @author Thomas Eilmsteiner [@DeMuu]{@link https://github.com/DeMuu}
 * @author Yamagishi Kazutoshi [@ykzts]{@link https://github.com/ykzts}
 * @author Luca Ban [@mesqueeb]{@link https://github.com/mesqueeb}
 * @author Terrence Lam [@skyuplam]{@link https://github.com/skyuplam}
 * @author Taiki IKeda [@so99ynoodles]{@link https://github.com/so99ynoodles}
 */
var locale$E = {
  code: 'ja',
  formatDistance: formatDistance$E,
  formatLong: formatLong$E,
  formatRelative: formatRelative$E,
  localize: localize$E,
  match: match$E,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$C = {
  lessThanXSeconds: {
    one: '1びょうみまん',
    other: '{{count}}びょうみまん',
    oneWithSuffix: 'やく1びょう',
    otherWithSuffix: 'やく{{count}}びょう'
  },
  xSeconds: {
    one: '1びょう',
    other: '{{count}}びょう'
  },
  halfAMinute: '30びょう',
  lessThanXMinutes: {
    one: '1ぷんみまん',
    other: '{{count}}ふんみまん',
    oneWithSuffix: 'やく1ぷん',
    otherWithSuffix: 'やく{{count}}ふん'
  },
  xMinutes: {
    one: '1ぷん',
    other: '{{count}}ふん'
  },
  aboutXHours: {
    one: 'やく1じかん',
    other: 'やく{{count}}じかん'
  },
  xHours: {
    one: '1じかん',
    other: '{{count}}じかん'
  },
  xDays: {
    one: '1にち',
    other: '{{count}}にち'
  },
  aboutXWeeks: {
    one: 'やく1しゅうかん',
    other: 'やく{{count}}しゅうかん'
  },
  xWeeks: {
    one: '1しゅうかん',
    other: '{{count}}しゅうかん'
  },
  aboutXMonths: {
    one: 'やく1かげつ',
    other: 'やく{{count}}かげつ'
  },
  xMonths: {
    one: '1かげつ',
    other: '{{count}}かげつ'
  },
  aboutXYears: {
    one: 'やく1ねん',
    other: 'やく{{count}}ねん'
  },
  xYears: {
    one: '1ねん',
    other: '{{count}}ねん'
  },
  overXYears: {
    one: '1ねんいじょう',
    other: '{{count}}ねんいじょう'
  },
  almostXYears: {
    one: '1ねんちかく',
    other: '{{count}}ねんちかく'
  }
};

var formatDistance$D = function (token, count, options) {
  options = options || {};
  var result;
  var tokenValue = formatDistanceLocale$C[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    if (options.addSuffix && tokenValue.oneWithSuffix) {
      result = tokenValue.oneWithSuffix;
    } else {
      result = tokenValue.one;
    }
  } else {
    if (options.addSuffix && tokenValue.otherWithSuffix) {
      result = tokenValue.otherWithSuffix.replace('{{count}}', String(count));
    } else {
      result = tokenValue.other.replace('{{count}}', String(count));
    }
  }

  if (options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + 'あと';
    } else {
      return result + 'まえ';
    }
  }

  return result;
};

var dateFormats$D = {
  full: 'yねんMがつdにちEEEE',
  long: 'yねんMがつdにち',
  medium: 'y/MM/dd',
  short: 'y/MM/dd'
};
var timeFormats$D = {
  full: 'Hじmmふんssびょう zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$D = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$D = {
  date: buildFormatLongFn({
    formats: dateFormats$D,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$D,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$D,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$D = {
  lastWeek: 'せんしゅうのeeeeのp',
  yesterday: 'きのうのp',
  today: 'きょうのp',
  tomorrow: 'あしたのp',
  nextWeek: 'よくしゅうのeeeeのp',
  other: 'P'
};

var formatRelative$D = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$D[token];
};

var eraValues$D = {
  narrow: ['BC', 'AC'],
  abbreviated: ['きげんぜん', 'せいれき'],
  wide: ['きげんぜん', 'せいれき']
};
var quarterValues$D = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['だい1しはんき', 'だい2しはんき', 'だい3しはんき', 'だい4しはんき']
};
var monthValues$D = {
  narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  abbreviated: ['1がつ', '2がつ', '3がつ', '4がつ', '5がつ', '6がつ', '7がつ', '8がつ', '9がつ', '10がつ', '11がつ', '12がつ'],
  wide: ['1がつ', '2がつ', '3がつ', '4がつ', '5がつ', '6がつ', '7がつ', '8がつ', '9がつ', '10がつ', '11がつ', '12がつ']
};
var dayValues$D = {
  narrow: ['にち', 'げつ', 'か', 'すい', 'もく', 'きん', 'ど'],
  short: ['にち', 'げつ', 'か', 'すい', 'もく', 'きん', 'ど'],
  abbreviated: ['にち', 'げつ', 'か', 'すい', 'もく', 'きん', 'ど'],
  wide: ['にちようび', 'げつようび', 'かようび', 'すいようび', 'もくようび', 'きんようび', 'どようび']
};
var dayPeriodValues$C = {
  narrow: {
    am: 'ごぜん',
    pm: 'ごご',
    midnight: 'しんや',
    noon: 'しょうご',
    morning: 'あさ',
    afternoon: 'ごご',
    evening: 'よる',
    night: 'しんや'
  },
  abbreviated: {
    am: 'ごぜん',
    pm: 'ごご',
    midnight: 'しんや',
    noon: 'しょうご',
    morning: 'あさ',
    afternoon: 'ごご',
    evening: 'よる',
    night: 'しんや'
  },
  wide: {
    am: 'ごぜん',
    pm: 'ごご',
    midnight: 'しんや',
    noon: 'しょうご',
    morning: 'あさ',
    afternoon: 'ごご',
    evening: 'よる',
    night: 'しんや'
  }
};
var formattingDayPeriodValues$v = {
  narrow: {
    am: 'ごぜん',
    pm: 'ごご',
    midnight: 'しんや',
    noon: 'しょうご',
    morning: 'あさ',
    afternoon: 'ごご',
    evening: 'よる',
    night: 'しんや'
  },
  abbreviated: {
    am: 'ごぜん',
    pm: 'ごご',
    midnight: 'しんや',
    noon: 'しょうご',
    morning: 'あさ',
    afternoon: 'ごご',
    evening: 'よる',
    night: 'しんや'
  },
  wide: {
    am: 'ごぜん',
    pm: 'ごご',
    midnight: 'しんや',
    noon: 'しょうご',
    morning: 'あさ',
    afternoon: 'ごご',
    evening: 'よる',
    night: 'しんや'
  }
};

var ordinalNumber$D = function (dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   const options = dirtyOptions || {}
  //   const unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var options = dirtyOptions || {};
  var unit = String(options.unit);

  switch (unit) {
    case 'year':
      return "".concat(number, "\u306D\u3093");

    case 'quarter':
      return "\u3060\u3044".concat(number, "\u3057\u306F\u3093\u304D");

    case 'month':
      return "".concat(number, "\u304C\u3064");

    case 'week':
      return "\u3060\u3044".concat(number, "\u3057\u3085\u3046");

    case 'date':
      return "".concat(number, "\u306B\u3061");

    case 'hour':
      return "".concat(number, "\u3058");

    case 'minute':
      return "".concat(number, "\u3075\u3093");

    case 'second':
      return "".concat(number, "\u3073\u3087\u3046");

    default:
      return "".concat(number);
  }
};

var localize$D = {
  ordinalNumber: ordinalNumber$D,
  era: buildLocalizeFn({
    values: eraValues$D,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$D,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$D,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$D,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$C,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$v,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$D = /^だ?い?\d+(ねん|しはんき|がつ|しゅう|にち|じ|ふん|びょう)?/i;
var parseOrdinalNumberPattern$D = /\d+/i;
var matchEraPatterns$D = {
  narrow: /^(B\.?C\.?|A\.?D\.?)/i,
  abbreviated: /^(きげん[前後]|せいれき)/i,
  wide: /^(きげん[前後]|せいれき)/i
};
var parseEraPatterns$D = {
  narrow: [/^B/i, /^A/i],
  any: [/^(きげんぜん)/i, /^(せいれき|きげんご)/i]
};
var matchQuarterPatterns$D = {
  narrow: /^[1234]/i,
  abbreviated: /^Q[1234]/i,
  wide: /^だい[1234一二三四１２３４]しはんき/i
};
var parseQuarterPatterns$D = {
  any: [/(1|一|１)/i, /(2|二|２)/i, /(3|三|３)/i, /(4|四|４)/i]
};
var matchMonthPatterns$D = {
  narrow: /^([123456789]|1[012])/,
  abbreviated: /^([123456789]|1[012])がつ/i,
  wide: /^([123456789]|1[012])がつ/i
};
var parseMonthPatterns$D = {
  any: [/^1\D/, /^2/, /^3/, /^4/, /^5/, /^6/, /^7/, /^8/, /^9/, /^10/, /^11/, /^12/]
};
var matchDayPatterns$D = {
  narrow: /^(にち|げつ|か|すい|もく|きん|ど)/,
  short: /^(にち|げつ|か|すい|もく|きん|ど)/,
  abbreviated: /^(にち|げつ|か|すい|もく|きん|ど)/,
  wide: /^(にち|げつ|か|すい|もく|きん|ど)ようび/
};
var parseDayPatterns$D = {
  any: [/^にち/, /^げつ/, /^か/, /^すい/, /^もく/, /^きん/, /^ど/]
};
var matchDayPeriodPatterns$D = {
  any: /^(AM|PM|ごぜん|ごご|しょうご|しんや|まよなか|よる|あさ)/i
};
var parseDayPeriodPatterns$D = {
  any: {
    am: /^(A|ごぜん)/i,
    pm: /^(P|ごご)/i,
    midnight: /^しんや|まよなか/i,
    noon: /^しょうご/i,
    morning: /^あさ/i,
    afternoon: /^ごご/i,
    evening: /^よる/i,
    night: /^しんや/i
  }
};
var match$D = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$D,
    parsePattern: parseOrdinalNumberPattern$D,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$D,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$D,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$D,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$D,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$D,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$D,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$D,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$D,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$D,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$D,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Japanese (Hiragana) locale.
 * @language Japanese (Hiragana)
 * @iso-639-2 jpn
 * @author Eri Hiramatsu [@Eritutteo]{@link https://github.com/Eritutteo}
 */

var locale$D = {
  code: 'ja-Hira',
  formatDistance: formatDistance$D,
  formatLong: formatLong$D,
  formatRelative: formatRelative$D,
  localize: localize$D,
  match: match$D,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$B = {
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
function formatDistance$C(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$B[token] === 'string') {
    result = formatDistanceLocale$B[token];
  } else if (options.addSuffix && options.comparison > 0) {
    result = formatDistanceLocale$B[token].future.replace('{{count}}', count);
  } else if (options.addSuffix && options.comparison <= 0) {
    result = formatDistanceLocale$B[token].past.replace('{{count}}', count);
  } else {
    result = formatDistanceLocale$B[token].present.replace('{{count}}', count);
  }

  return result;
}

var dateFormats$C = {
  full: 'EEEE, do MMMM, y',
  long: 'do, MMMM, y',
  medium: 'd, MMM, y',
  short: 'dd/MM/yyyy'
};
var timeFormats$C = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$C = {
  full: "{{date}} {{time}}'-ზე'",
  long: "{{date}} {{time}}'-ზე'",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$C = {
  date: buildFormatLongFn({
    formats: dateFormats$C,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$C,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$C,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$C = {
  lastWeek: "'წინა' eeee p'-ზე'",
  yesterday: "'გუშინ' p'-ზე'",
  today: "'დღეს' p'-ზე'",
  tomorrow: "'ხვალ' p'-ზე'",
  nextWeek: "'შემდეგი' eeee p'-ზე'",
  other: 'P'
};
function formatRelative$C(token, _date, _baseDate, _options) {
  return formatRelativeLocale$C[token];
}

var eraValues$C = {
  narrow: ['ჩ.წ-მდე', 'ჩ.წ'],
  abbreviated: ['ჩვ.წ-მდე', 'ჩვ.წ'],
  wide: ['ჩვენს წელთაღრიცხვამდე', 'ჩვენი წელთაღრიცხვით']
};
var quarterValues$C = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1-ლი კვ', '2-ე კვ', '3-ე კვ', '4-ე კვ'],
  wide: ['1-ლი კვარტალი', '2-ე კვარტალი', '3-ე კვარტალი', '4-ე კვარტალი']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$C = {
  narrow: ['ია', 'თე', 'მა', 'აპ', 'მს', 'ვნ', 'ვლ', 'აგ', 'სე', 'ოქ', 'ნო', 'დე'],
  abbreviated: ['იან', 'თებ', 'მარ', 'აპრ', 'მაი', 'ივნ', 'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
  wide: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი']
};
var dayValues$C = {
  narrow: ['კვ', 'ორ', 'სა', 'ოთ', 'ხუ', 'პა', 'შა'],
  short: ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
  abbreviated: ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
  wide: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი']
};
var dayPeriodValues$B = {
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
var formattingDayPeriodValues$u = {
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

function ordinalNumber$C(dirtyNumber, _dirtyOptions) {
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

var localize$C = {
  ordinalNumber: ordinalNumber$C,
  era: buildLocalizeFn({
    values: eraValues$C,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$C,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$C,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$C,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$B,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$u,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$C = /^(\d+)(-ლი|-ე)?/i;
var parseOrdinalNumberPattern$C = /\d+/i;
var matchEraPatterns$C = {
  narrow: /^(ჩვ?\.წ)/i,
  abbreviated: /^(ჩვ?\.წ)/i,
  wide: /^(ჩვენს წელთაღრიცხვამდე|ქრისტეშობამდე|ჩვენი წელთაღრიცხვით|ქრისტეშობიდან)/i
};
var parseEraPatterns$C = {
  any: [/^(ჩვენს წელთაღრიცხვამდე|ქრისტეშობამდე)/i, /^(ჩვენი წელთაღრიცხვით|ქრისტეშობიდან)/i]
};
var matchQuarterPatterns$C = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]-(ლი|ე)? კვ/i,
  wide: /^[1234]-(ლი|ე)? კვარტალი/i
};
var parseQuarterPatterns$C = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$C = {
  any: /^(ია|თე|მა|აპ|მს|ვნ|ვლ|აგ|სე|ოქ|ნო|დე)/i
};
var parseMonthPatterns$C = {
  any: [/^ია/i, /^თ/i, /^მარ/i, /^აპ/i, /^მაი/i, /^ი?ვნ/i, /^ი?ვლ/i, /^აგ/i, /^ს/i, /^ო/i, /^ნ/i, /^დ/i]
};
var matchDayPatterns$C = {
  narrow: /^(კვ|ორ|სა|ოთ|ხუ|პა|შა)/i,
  short: /^(კვი|ორშ|სამ|ოთხ|ხუთ|პარ|შაბ)/i,
  long: /^(კვირა|ორშაბათი|სამშაბათი|ოთხშაბათი|ხუთშაბათი|პარასკევი|შაბათი)/i
};
var parseDayPatterns$C = {
  any: [/^კვ/i, /^ორ/i, /^სა/i, /^ოთ/i, /^ხუ/i, /^პა/i, /^შა/i]
};
var matchDayPeriodPatterns$C = {
  any: /^([ap]\.?\s?m\.?|შუაღ|დილ)/i
};
var parseDayPeriodPatterns$C = {
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
var match$C = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$C,
    parsePattern: parseOrdinalNumberPattern$C,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$C,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$C,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$C,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$C,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$C,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$C,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$C,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$C,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$C,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$C,
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

var locale$C = {
  code: 'ka',
  formatDistance: formatDistance$C,
  formatLong: formatLong$C,
  formatRelative: formatRelative$C,
  localize: localize$C,
  match: match$C,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

function declension$4(scheme, count) {
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

function buildLocalizeTokenFn$3(scheme) {
  return function (count, options) {
    if (options.addSuffix) {
      if (options.comparison > 0) {
        if (scheme.future) {
          return declension$4(scheme.future, count);
        } else {
          return declension$4(scheme.regular, count) + ' кейін';
        }
      } else {
        if (scheme.past) {
          return declension$4(scheme.past, count);
        } else {
          return declension$4(scheme.regular, count) + ' бұрын';
        }
      }
    } else {
      return declension$4(scheme.regular, count);
    }
  };
}

var formatDistanceLocale$A = {
  lessThanXSeconds: buildLocalizeTokenFn$3({
    regular: {
      one: '1 секундтан аз',
      singularNominative: '{{count}} секундтан аз',
      singularGenitive: '{{count}} секундтан аз',
      pluralGenitive: '{{count}} секундтан аз'
    },
    future: {
      one: 'бір секундтан кейін',
      singularNominative: '{{count}} секундтан кейін',
      singularGenitive: '{{count}} секундтан кейін',
      pluralGenitive: '{{count}} секундтан кейін'
    }
  }),
  xSeconds: buildLocalizeTokenFn$3({
    regular: {
      singularNominative: '{{count}} секунд',
      singularGenitive: '{{count}} секунд',
      pluralGenitive: '{{count}} секунд'
    },
    past: {
      singularNominative: '{{count}} секунд бұрын',
      singularGenitive: '{{count}} секунд бұрын',
      pluralGenitive: '{{count}} секунд бұрын'
    },
    future: {
      singularNominative: '{{count}} секундтан кейін',
      singularGenitive: '{{count}} секундтан кейін',
      pluralGenitive: '{{count}} секундтан кейін'
    }
  }),
  halfAMinute: function (_, options) {
    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'жарты минут ішінде';
      } else {
        return 'жарты минут бұрын';
      }
    }

    return 'жарты минут';
  },
  lessThanXMinutes: buildLocalizeTokenFn$3({
    regular: {
      one: '1 минуттан аз',
      singularNominative: '{{count}} минуттан аз',
      singularGenitive: '{{count}} минуттан аз',
      pluralGenitive: '{{count}} минуттан аз'
    },
    future: {
      one: 'минуттан кем ',
      singularNominative: '{{count}} минуттан кем',
      singularGenitive: '{{count}} минуттан кем',
      pluralGenitive: '{{count}} минуттан кем'
    }
  }),
  xMinutes: buildLocalizeTokenFn$3({
    regular: {
      singularNominative: '{{count}} минут',
      singularGenitive: '{{count}} минут',
      pluralGenitive: '{{count}} минут'
    },
    past: {
      singularNominative: '{{count}} минут бұрын',
      singularGenitive: '{{count}} минут бұрын',
      pluralGenitive: '{{count}} минут бұрын'
    },
    future: {
      singularNominative: '{{count}} минуттан кейін',
      singularGenitive: '{{count}} минуттан кейін',
      pluralGenitive: '{{count}} минуттан кейін'
    }
  }),
  aboutXHours: buildLocalizeTokenFn$3({
    regular: {
      singularNominative: 'шамамен {{count}} сағат',
      singularGenitive: 'шамамен {{count}} сағат',
      pluralGenitive: 'шамамен {{count}} сағат'
    },
    future: {
      singularNominative: 'шамамен {{count}} сағаттан кейін',
      singularGenitive: 'шамамен {{count}} сағаттан кейін',
      pluralGenitive: 'шамамен {{count}} сағаттан кейін'
    }
  }),
  xHours: buildLocalizeTokenFn$3({
    regular: {
      singularNominative: '{{count}} сағат',
      singularGenitive: '{{count}} сағат',
      pluralGenitive: '{{count}} сағат'
    }
  }),
  xDays: buildLocalizeTokenFn$3({
    regular: {
      singularNominative: '{{count}} күн',
      singularGenitive: '{{count}} күн',
      pluralGenitive: '{{count}} күн'
    },
    future: {
      singularNominative: '{{count}} күннен кейін',
      singularGenitive: '{{count}} күннен кейін',
      pluralGenitive: '{{count}} күннен кейін'
    }
  }),
  aboutXWeeks: {
    one: 'шамамен 1 апта',
    other: 'шамамен {{count}} апта'
  },
  xWeeks: {
    one: '1 апта',
    other: '{{count}} апта'
  },
  aboutXMonths: buildLocalizeTokenFn$3({
    regular: {
      singularNominative: 'шамамен {{count}} ай',
      singularGenitive: 'шамамен {{count}} ай',
      pluralGenitive: 'шамамен {{count}} ай'
    },
    future: {
      singularNominative: 'шамамен {{count}} айдан кейін',
      singularGenitive: 'шамамен {{count}} айдан кейін',
      pluralGenitive: 'шамамен {{count}} айдан кейін'
    }
  }),
  xMonths: buildLocalizeTokenFn$3({
    regular: {
      singularNominative: '{{count}} ай',
      singularGenitive: '{{count}} ай',
      pluralGenitive: '{{count}} ай'
    }
  }),
  aboutXYears: buildLocalizeTokenFn$3({
    regular: {
      singularNominative: 'шамамен {{count}} жыл',
      singularGenitive: 'шамамен {{count}} жыл',
      pluralGenitive: 'шамамен {{count}} жыл'
    },
    future: {
      singularNominative: 'шамамен {{count}} жылдан кейін',
      singularGenitive: 'шамамен {{count}} жылдан кейін',
      pluralGenitive: 'шамамен {{count}} жылдан кейін'
    }
  }),
  xYears: buildLocalizeTokenFn$3({
    regular: {
      singularNominative: '{{count}} жыл',
      singularGenitive: '{{count}} жыл',
      pluralGenitive: '{{count}} жыл'
    },
    future: {
      singularNominative: '{{count}} жылдан кейін',
      singularGenitive: '{{count}} жылдан кейін',
      pluralGenitive: '{{count}} жылдан кейін'
    }
  }),
  overXYears: buildLocalizeTokenFn$3({
    regular: {
      singularNominative: '{{count}} жылдан астам',
      singularGenitive: '{{count}} жылдан астам',
      pluralGenitive: '{{count}} жылдан астам'
    },
    future: {
      singularNominative: '{{count}} жылдан астам',
      singularGenitive: '{{count}} жылдан астам',
      pluralGenitive: '{{count}} жылдан астам'
    }
  }),
  almostXYears: buildLocalizeTokenFn$3({
    regular: {
      singularNominative: '{{count}} жылға жақын',
      singularGenitive: '{{count}} жылға жақын',
      pluralGenitive: '{{count}} жылға жақын'
    },
    future: {
      singularNominative: '{{count}} жылдан кейін',
      singularGenitive: '{{count}} жылдан кейін',
      pluralGenitive: '{{count}} жылдан кейін'
    }
  })
};
function formatDistance$B(token, count, options) {
  options = options || {};
  return formatDistanceLocale$A[token](count, options);
}

var dateFormats$B = {
  full: "EEEE, do MMMM y 'ж.'",
  long: "do MMMM y 'ж.'",
  medium: "d MMM y 'ж.'",
  short: 'dd.MM.yyyy'
};
var timeFormats$B = {
  full: 'H:mm:ss zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$B = {
  any: '{{date}}, {{time}}'
};
var formatLong$B = {
  date: buildFormatLongFn({
    formats: dateFormats$B,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$B,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$B,
    defaultWidth: 'any'
  })
};

var accusativeWeekdays$3 = ['жексенбіде', 'дүйсенбіде', 'сейсенбіде', 'сәрсенбіде', 'бейсенбіде', 'жұмада', 'сенбіде'];

function lastWeek$4(day) {
  var weekday = accusativeWeekdays$3[day];
  return "'өткен " + weekday + " сағат' p'-де'";
}

function thisWeek$4(day) {
  var weekday = accusativeWeekdays$3[day];
  return "'" + weekday + " сағат' p'-де'";
}

function nextWeek$4(day) {
  var weekday = accusativeWeekdays$3[day];
  return "'келесі " + weekday + " сағат' p'-де'";
}

var formatRelativeLocale$B = {
  lastWeek: function (date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek$4(day);
    } else {
      return lastWeek$4(day);
    }
  },
  yesterday: "'кеше сағат' p'-де'",
  today: "'бүгін сағат' p'-де'",
  tomorrow: "'ертең сағат' p'-де'",
  nextWeek: function (date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek$4(day);
    } else {
      return nextWeek$4(day);
    }
  },
  other: 'P'
};
function formatRelative$B(token, date, baseDate, options) {
  var format = formatRelativeLocale$B[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
}

var eraValues$B = {
  narrow: ['б.з.д.', 'б.з.'],
  abbreviated: ['б.з.д.', 'б.з.'],
  wide: ['біздің заманымызға дейін', 'біздің заманымыз']
};
var quarterValues$B = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1-ші тоқ.', '2-ші тоқ.', '3-ші тоқ.', '4-ші тоқ.'],
  wide: ['1-ші тоқсан', '2-ші тоқсан', '3-ші тоқсан', '4-ші тоқсан']
};
var monthValues$B = {
  narrow: ['Қ', 'А', 'Н', 'С', 'М', 'М', 'Ш', 'Т', 'Қ', 'Қ', 'Қ', 'Ж'],
  abbreviated: ['қаң', 'ақп', 'нау', 'сәу', 'мам', 'мау', 'шіл', 'там', 'қыр', 'қаз', 'қар', 'жел'],
  wide: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан']
};
var formattingMonthValues$9 = {
  narrow: ['Қ', 'А', 'Н', 'С', 'М', 'М', 'Ш', 'Т', 'Қ', 'Қ', 'Қ', 'Ж'],
  abbreviated: ['қаң', 'ақп', 'нау', 'сәу', 'мам', 'мау', 'шіл', 'там', 'қыр', 'қаз', 'қар', 'жел'],
  wide: ['қаңтар', 'ақпан', 'наурыз', 'сәуір', 'мамыр', 'маусым', 'шілде', 'тамыз', 'қыркүйек', 'қазан', 'қараша', 'желтоқсан']
};
var dayValues$B = {
  narrow: ['Ж', 'Д', 'С', 'С', 'Б', 'Ж', 'С'],
  short: ['жс', 'дс', 'сс', 'ср', 'бс', 'жм', 'сб'],
  abbreviated: ['жс', 'дс', 'сс', 'ср', 'бс', 'жм', 'сб'],
  wide: ['жексенбі', 'дүйсенбі', 'сейсенбі', 'сәрсенбі', 'бейсенбі', 'жұма', 'сенбі']
};
var dayPeriodValues$A = {
  narrow: {
    am: 'ТД',
    pm: 'ТК',
    midnight: 'түн ортасы',
    noon: 'түс',
    morning: 'таң',
    afternoon: 'күндіз',
    evening: 'кеш',
    night: 'түн'
  },
  wide: {
    am: 'ТД',
    pm: 'ТК',
    midnight: 'түн ортасы',
    noon: 'түс',
    morning: 'таң',
    afternoon: 'күндіз',
    evening: 'кеш',
    night: 'түн'
  }
};
var formattingDayPeriodValues$t = {
  narrow: {
    am: 'ТД',
    pm: 'ТК',
    midnight: 'түн ортасында',
    noon: 'түс',
    morning: 'таң',
    afternoon: 'күн',
    evening: 'кеш',
    night: 'түн'
  },
  wide: {
    am: 'ТД',
    pm: 'ТК',
    midnight: 'түн ортасында',
    noon: 'түсте',
    morning: 'таңертең',
    afternoon: 'күндіз',
    evening: 'кеште',
    night: 'түнде'
  }
};
var suffixes = {
  0: '-ші',
  1: '-ші',
  2: '-ші',
  3: '-ші',
  4: '-ші',
  5: '-ші',
  6: '-шы',
  7: '-ші',
  8: '-ші',
  9: '-шы',
  10: '-шы',
  20: '-шы',
  30: '-шы',
  40: '-шы',
  50: '-ші',
  60: '-шы',
  70: '-ші',
  80: '-ші',
  90: '-шы',
  100: '-ші'
};

function ordinalNumber$B(dirtyNumber) {
  var number = Number(dirtyNumber);
  var a = number % 10;
  var b = number >= 100 ? 100 : null;
  return number + (suffixes[number] || suffixes[a] || suffixes[b]);
}

var localize$B = {
  ordinalNumber: ordinalNumber$B,
  era: buildLocalizeFn({
    values: eraValues$B,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$B,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$B,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$9,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$B,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$A,
    defaultWidth: 'any',
    formattingValues: formattingDayPeriodValues$t,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$B = /^(\d+)(-?(ші|шы))?/i;
var parseOrdinalNumberPattern$B = /\d+/i;
var matchEraPatterns$B = {
  narrow: /^((б )?з\.?\s?д\.?)/i,
  abbreviated: /^((б )?з\.?\s?д\.?)/i,
  wide: /^(біздің заманымызға дейін|біздің заманымыз|біздің заманымыздан)/i
};
var parseEraPatterns$B = {
  any: [/^б/i, /^з/i]
};
var matchQuarterPatterns$B = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?ші)? тоқ.?/i,
  wide: /^[1234](-?ші)? тоқсан/i
};
var parseQuarterPatterns$B = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$B = {
  narrow: /^(қ|а|н|с|м|мау|ш|т|қыр|қаз|қар|ж)/i,
  abbreviated: /^(қаң|ақп|нау|сәу|мам|мау|шіл|там|қыр|қаз|қар|жел)/i,
  wide: /^(қаңтар|ақпан|наурыз|сәуір|мамыр|маусым|шілде|тамыз|қыркүйек|қазан|қараша|желтоқсан)/i
};
var parseMonthPatterns$B = {
  narrow: [/^қ/i, /^а/i, /^н/i, /^с/i, /^м/i, /^м/i, /^ш/i, /^т/i, /^қ/i, /^қ/i, /^қ/i, /^ж/i],
  abbreviated: [/^қаң/i, /^ақп/i, /^нау/i, /^сәу/i, /^мам/i, /^мау/i, /^шіл/i, /^там/i, /^қыр/i, /^қаз/i, /^қар/i, /^жел/i],
  any: [/^қ/i, /^а/i, /^н/i, /^с/i, /^м/i, /^м/i, /^ш/i, /^т/i, /^қ/i, /^қ/i, /^қ/i, /^ж/i]
};
var matchDayPatterns$B = {
  narrow: /^(ж|д|с|с|б|ж|с)/i,
  short: /^(жс|дс|сс|ср|бс|жм|сб)/i,
  wide: /^(жексенбі|дүйсенбі|сейсенбі|сәрсенбі|бейсенбі|жұма|сенбі)/i
};
var parseDayPatterns$B = {
  narrow: [/^ж/i, /^д/i, /^с/i, /^с/i, /^б/i, /^ж/i, /^с/i],
  short: [/^жс/i, /^дс/i, /^сс/i, /^ср/i, /^бс/i, /^жм/i, /^сб/i],
  any: [/^ж[ек]/i, /^д[үй]/i, /^сe[й]/i, /^сә[р]/i, /^б[ей]/i, /^ж[ұм]/i, /^се[н]/i]
};
var matchDayPeriodPatterns$B = {
  narrow: /^Т\.?\s?[ДК]\.?|түн ортасында|((түсте|таңертең|таңда|таңертең|таңмен|таң|күндіз|күн|кеште|кеш|түнде|түн)\.?)/i,
  wide: /^Т\.?\s?[ДК]\.?|түн ортасында|((түсте|таңертең|таңда|таңертең|таңмен|таң|күндіз|күн|кеште|кеш|түнде|түн)\.?)/i,
  any: /^Т\.?\s?[ДК]\.?|түн ортасында|((түсте|таңертең|таңда|таңертең|таңмен|таң|күндіз|күн|кеште|кеш|түнде|түн)\.?)/i
};
var parseDayPeriodPatterns$B = {
  any: {
    am: /^ТД/i,
    pm: /^ТК/i,
    midnight: /^түн орта/i,
    noon: /^күндіз/i,
    morning: /таң/i,
    afternoon: /түс/i,
    evening: /кеш/i,
    night: /түн/i
  }
};
var match$B = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$B,
    parsePattern: parseOrdinalNumberPattern$B,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$B,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$B,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$B,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$B,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$B,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$B,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$B,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$B,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$B,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPeriodPatterns$B,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Kazakh locale.
 * @language Kazakh
 * @iso-639-2 kaz
 * @author Nikita Bayev [@drugoi]{@link https://github.com/drugoi}
 */

var locale$B = {
  code: 'kk',
  formatDistance: formatDistance$B,
  formatLong: formatLong$B,
  formatRelative: formatRelative$B,
  localize: localize$B,
  match: match$B,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$z = {
  lessThanXSeconds: 'តិចជាង {{count}} វិនាទី',
  xSeconds: '{{count}} វិនាទី',
  halfAMinute: 'កន្លះនាទី',
  lessThanXMinutes: 'តិចជាង {{count}} នាទី',
  xMinutes: '{{count}} នាទី',
  aboutXHours: 'ប្រហែល {{count}} ម៉ោង',
  xHours: '{{count}} ម៉ោង',
  xDays: '{{count}} ថ្ងៃ',
  aboutXWeeks: 'ប្រហែល {{count}} សប្តាហ៍',
  xWeeks: '{{count}} សប្តាហ៍',
  aboutXMonths: 'ប្រហែល {{count}} ខែ',
  xMonths: '{{count}} ខែ',
  aboutXYears: 'ប្រហែល {{count}} ឆ្នាំ',
  xYears: '{{count}} ឆ្នាំ',
  overXYears: 'ជាង {{count}} ឆ្នាំ',
  almostXYears: 'ជិត {{count}} ឆ្នាំ'
};

var formatDistance$A = function (token, count, options) {
  var tokenValue = formatDistanceLocale$z[token];
  var result = tokenValue;

  if (typeof count === 'number') {
    result = result.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'ក្នុងរយៈពេល ' + result;
    } else {
      return result + 'មុន';
    }
  }

  return result;
};

var dateFormats$A = {
  full: 'EEEE do MMMM y',
  long: 'do MMMM y',
  medium: 'd MMM y',
  short: 'dd/MM/yyyy'
};
var timeFormats$A = {
  full: 'h:mm:ss a',
  long: 'h:mm:ss a',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$A = {
  full: "{{date}} 'ម៉ោង' {{time}}",
  long: "{{date}} 'ម៉ោង' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$A = {
  date: buildFormatLongFn({
    formats: dateFormats$A,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$A,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$A,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$A = {
  lastWeek: "'ថ្ងៃ'eeee'ស​ប្តា​ហ៍​មុនម៉ោង' p",
  yesterday: "'ម្សិលមិញនៅម៉ោង' p",
  today: "'ថ្ងៃនេះម៉ោង' p",
  tomorrow: "'ថ្ងៃស្អែកម៉ោង' p",
  nextWeek: "'ថ្ងៃ'eeee'ស​ប្តា​ហ៍​ក្រោយម៉ោង' p",
  other: 'P'
};

var formatRelative$A = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$A[token];
};

var eraValues$A = {
  narrow: ['ម.គស', 'គស'],
  abbreviated: ['មុនគ.ស', 'គ.ស'],
  wide: ['មុនគ្រិស្តសករាជ', 'នៃគ្រិស្តសករាជ']
};
var quarterValues$A = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['ត្រីមាសទី 1', 'ត្រីមាសទី 2', 'ត្រីមាសទី 3', 'ត្រីមាសទី 4']
};
var monthValues$A = {
  narrow: ['ម.ក', 'ក.ម', 'មិ', 'ម.ស', 'ឧ.ស', 'ម.ថ', 'ក.ដ', 'សី', 'កញ', 'តុ', 'វិ', 'ធ'],
  abbreviated: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'],
  wide: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ']
};
var dayValues$A = {
  narrow: ['អា', 'ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស'],
  short: ['អា', 'ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស'],
  abbreviated: ['អា', 'ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស'],
  wide: ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍']
};
var dayPeriodValues$z = {
  narrow: {
    am: 'ព្រឹក',
    pm: 'ល្ងាច',
    midnight: '​ពេលកណ្ដាលអធ្រាត្រ',
    noon: 'ពេលថ្ងៃត្រង់',
    morning: 'ពេលព្រឹក',
    afternoon: 'ពេលរសៀល',
    evening: 'ពេលល្ងាច',
    night: 'ពេលយប់'
  },
  abbreviated: {
    am: 'ព្រឹក',
    pm: 'ល្ងាច',
    midnight: '​ពេលកណ្ដាលអធ្រាត្រ',
    noon: 'ពេលថ្ងៃត្រង់',
    morning: 'ពេលព្រឹក',
    afternoon: 'ពេលរសៀល',
    evening: 'ពេលល្ងាច',
    night: 'ពេលយប់'
  },
  wide: {
    am: 'ព្រឹក',
    pm: 'ល្ងាច',
    midnight: '​ពេលកណ្ដាលអធ្រាត្រ',
    noon: 'ពេលថ្ងៃត្រង់',
    morning: 'ពេលព្រឹក',
    afternoon: 'ពេលរសៀល',
    evening: 'ពេលល្ងាច',
    night: 'ពេលយប់'
  }
};
var formattingDayPeriodValues$s = {
  narrow: {
    am: 'ព្រឹក',
    pm: 'ល្ងាច',
    midnight: '​ពេលកណ្ដាលអធ្រាត្រ',
    noon: 'ពេលថ្ងៃត្រង់',
    morning: 'ពេលព្រឹក',
    afternoon: 'ពេលរសៀល',
    evening: 'ពេលល្ងាច',
    night: 'ពេលយប់'
  },
  abbreviated: {
    am: 'ព្រឹក',
    pm: 'ល្ងាច',
    midnight: '​ពេលកណ្ដាលអធ្រាត្រ',
    noon: 'ពេលថ្ងៃត្រង់',
    morning: 'ពេលព្រឹក',
    afternoon: 'ពេលរសៀល',
    evening: 'ពេលល្ងាច',
    night: 'ពេលយប់'
  },
  wide: {
    am: 'ព្រឹក',
    pm: 'ល្ងាច',
    midnight: '​ពេលកណ្ដាលអធ្រាត្រ',
    noon: 'ពេលថ្ងៃត្រង់',
    morning: 'ពេលព្រឹក',
    afternoon: 'ពេលរសៀល',
    evening: 'ពេលល្ងាច',
    night: 'ពេលយប់'
  }
};

var ordinalNumber$A = function (dirtyNumber, _) {
  var number = Number(dirtyNumber);
  return number.toString();
};

var localize$A = {
  ordinalNumber: ordinalNumber$A,
  era: buildLocalizeFn({
    values: eraValues$A,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$A,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$A,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$A,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$z,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$s,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$A = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern$A = /\d+/i;
var matchEraPatterns$A = {
  narrow: /^(ម\.)?គស/i,
  abbreviated: /^(មុន)?គ\.ស/i,
  wide: /^(មុន|នៃ)គ្រិស្តសករាជ/i
};
var parseEraPatterns$A = {
  any: [/^(ម|មុន)គ\.?ស/i, /^(នៃ)?គ\.?ស/i]
};
var matchQuarterPatterns$A = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^(ត្រីមាស)(ទី)?\s?[1234]/i
};
var parseQuarterPatterns$A = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$A = {
  narrow: /^(ម\.ក|ក\.ម|មិ|ម\.ស|ឧ\.ស|ម\.ថ|ក\.ដ|សី|កញ|តុ|វិ|ធ)/i,
  abbreviated: /^(មករា|កុម្ភៈ|មីនា|មេសា|ឧសភា|មិថុនា|កក្កដា|សីហា|កញ្ញា|តុលា|វិច្ឆិកា|ធ្នូ)/i,
  wide: /^(មករា|កុម្ភៈ|មីនា|មេសា|ឧសភា|មិថុនា|កក្កដា|សីហា|កញ្ញា|តុលា|វិច្ឆិកា|ធ្នូ)/i
};
var parseMonthPatterns$A = {
  narrow: [/^ម\.ក/i, /^ក\.ម/i, /^មិ/i, /^ម\.ស/i, /^ឧ\.ស/i, /^ម\.ថ/i, /^ក\.ដ/i, /^សី/i, /^កញ/i, /^តុ/i, /^វិ/i, /^ធ/i],
  any: [/^មក/i, /^កុ/i, /^មីន/i, /^មេ/i, /^ឧស/i, /^មិថ/i, /^កក/i, /^សី/i, /^កញ/i, /^តុ/i, /^វិច/i, /^ធ/i]
};
var matchDayPatterns$A = {
  narrow: /^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,
  short: /^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,
  abbreviated: /^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,
  wide: /^(អាទិត្យ|ចន្ទ|អង្គារ|ពុធ|ព្រហស្បតិ៍|សុក្រ|សៅរ៍)/i
};
var parseDayPatterns$A = {
  narrow: [/^អា/i, /^ច/i, /^អ/i, /^ព/i, /^ព្រ/i, /^សុ/i, /^ស/i],
  any: [/^អា/i, /^ច/i, /^អ/i, /^ព/i, /^ព្រ/i, /^សុ/i, /^សៅ/i]
};
var matchDayPeriodPatterns$A = {
  narrow: /^(ព្រឹក|ល្ងាច|ពេលព្រឹក|ពេលថ្ងៃត្រង់|ពេលល្ងាច|ពេលរសៀល|ពេលយប់|ពេលកណ្ដាលអធ្រាត្រ)/i,
  any: /^(ព្រឹក|ល្ងាច|ពេលព្រឹក|ពេលថ្ងៃត្រង់|ពេលល្ងាច|ពេលរសៀល|ពេលយប់|ពេលកណ្ដាលអធ្រាត្រ)/i
};
var parseDayPeriodPatterns$A = {
  any: {
    am: /^ព្រឹក/i,
    pm: /^ល្ងាច/i,
    midnight: /^ពេលកណ្ដាលអធ្រាត្រ/i,
    noon: /^ពេលថ្ងៃត្រង់/i,
    morning: /ពេលព្រឹក/i,
    afternoon: /ពេលរសៀល/i,
    evening: /ពេលល្ងាច/i,
    night: /ពេលយប់/i
  }
};
var match$A = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$A,
    parsePattern: parseOrdinalNumberPattern$A,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$A,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$A,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$A,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$A,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$A,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$A,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$A,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$A,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$A,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$A,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Khmer locale (Cambodian).
 * @language Khmer
 * @iso-639-2 khm
 * @author Seanghay Yath [@seanghay]{@link https://github.com/seanghay}
 */

var locale$A = {
  code: 'km',
  formatDistance: formatDistance$A,
  formatLong: formatLong$A,
  formatRelative: formatRelative$A,
  localize: localize$A,
  match: match$A,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$y = {
  lessThanXSeconds: {
    one: {
      default: '1 ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ',
      future: '1 ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ',
      past: '1 ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ'
    },
    other: {
      default: '{{count}} ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ',
      future: '{{count}} ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ',
      past: '{{count}} ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ'
    }
  },
  xSeconds: {
    one: {
      default: '1 ಸೆಕೆಂಡ್',
      future: '1 ಸೆಕೆಂಡ್‌ನಲ್ಲಿ',
      past: '1 ಸೆಕೆಂಡ್ ಹಿಂದೆ'
    },
    other: {
      default: '{{count}} ಸೆಕೆಂಡುಗಳು',
      future: '{{count}} ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ',
      past: '{{count}} ಸೆಕೆಂಡ್ ಹಿಂದೆ'
    }
  },
  halfAMinute: {
    other: {
      default: 'ಅರ್ಧ ನಿಮಿಷ',
      future: 'ಅರ್ಧ ನಿಮಿಷದಲ್ಲಿ',
      past: 'ಅರ್ಧ ನಿಮಿಷದ ಹಿಂದೆ'
    }
  },
  lessThanXMinutes: {
    one: {
      default: '1 ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ',
      future: '1 ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ',
      past: '1 ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ'
    },
    other: {
      default: '{{count}} ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ',
      future: '{{count}} ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ',
      past: '{{count}} ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ'
    }
  },
  xMinutes: {
    one: {
      default: '1 ನಿಮಿಷ',
      future: '1 ನಿಮಿಷದಲ್ಲಿ',
      past: '1 ನಿಮಿಷದ ಹಿಂದೆ'
    },
    other: {
      default: '{{count}} ನಿಮಿಷಗಳು',
      future: '{{count}} ನಿಮಿಷಗಳಲ್ಲಿ',
      past: '{{count}} ನಿಮಿಷಗಳ ಹಿಂದೆ'
    }
  },
  aboutXHours: {
    one: {
      default: 'ಸುಮಾರು 1 ಗಂಟೆ',
      future: 'ಸುಮಾರು 1 ಗಂಟೆಯಲ್ಲಿ',
      past: 'ಸುಮಾರು 1 ಗಂಟೆ ಹಿಂದೆ'
    },
    other: {
      default: 'ಸುಮಾರು {{count}} ಗಂಟೆಗಳು',
      future: 'ಸುಮಾರು {{count}} ಗಂಟೆಗಳಲ್ಲಿ',
      past: 'ಸುಮಾರು {{count}} ಗಂಟೆಗಳ ಹಿಂದೆ'
    }
  },
  xHours: {
    one: {
      default: '1 ಗಂಟೆ',
      future: '1 ಗಂಟೆಯಲ್ಲಿ',
      past: '1 ಗಂಟೆ ಹಿಂದೆ'
    },
    other: {
      default: '{{count}} ಗಂಟೆಗಳು',
      future: '{{count}} ಗಂಟೆಗಳಲ್ಲಿ',
      past: '{{count}} ಗಂಟೆಗಳ ಹಿಂದೆ'
    }
  },
  xDays: {
    one: {
      default: '1 ದಿನ',
      future: '1 ದಿನದಲ್ಲಿ',
      past: '1 ದಿನದ ಹಿಂದೆ'
    },
    other: {
      default: '{{count}} ದಿನಗಳು',
      future: '{{count}} ದಿನಗಳಲ್ಲಿ',
      past: '{{count}} ದಿನಗಳ ಹಿಂದೆ'
    }
  },
  aboutXMonths: {
    one: {
      default: 'ಸುಮಾರು 1 ತಿಂಗಳು',
      future: 'ಸುಮಾರು 1 ತಿಂಗಳಲ್ಲಿ',
      past: 'ಸುಮಾರು 1 ತಿಂಗಳ ಹಿಂದೆ'
    },
    other: {
      default: 'ಸುಮಾರು {{count}} ತಿಂಗಳು',
      future: 'ಸುಮಾರು {{count}} ತಿಂಗಳುಗಳಲ್ಲಿ',
      past: 'ಸುಮಾರು {{count}} ತಿಂಗಳುಗಳ ಹಿಂದೆ'
    }
  },
  xMonths: {
    one: {
      default: '1 ತಿಂಗಳು',
      future: '1 ತಿಂಗಳಲ್ಲಿ',
      past: '1 ತಿಂಗಳ ಹಿಂದೆ'
    },
    other: {
      default: '{{count}} ತಿಂಗಳು',
      future: '{{count}} ತಿಂಗಳುಗಳಲ್ಲಿ',
      past: '{{count}} ತಿಂಗಳುಗಳ ಹಿಂದೆ'
    }
  },
  aboutXYears: {
    one: {
      default: 'ಸುಮಾರು 1 ವರ್ಷ',
      future: 'ಸುಮಾರು 1 ವರ್ಷದಲ್ಲಿ',
      past: 'ಸುಮಾರು 1 ವರ್ಷದ ಹಿಂದೆ'
    },
    other: {
      default: 'ಸುಮಾರು {{count}} ವರ್ಷಗಳು',
      future: 'ಸುಮಾರು {{count}} ವರ್ಷಗಳಲ್ಲಿ',
      past: 'ಸುಮಾರು {{count}} ವರ್ಷಗಳ ಹಿಂದೆ'
    }
  },
  xYears: {
    one: {
      default: '1 ವರ್ಷ',
      future: '1 ವರ್ಷದಲ್ಲಿ',
      past: '1 ವರ್ಷದ ಹಿಂದೆ'
    },
    other: {
      default: '{{count}} ವರ್ಷಗಳು',
      future: '{{count}} ವರ್ಷಗಳಲ್ಲಿ',
      past: '{{count}} ವರ್ಷಗಳ ಹಿಂದೆ'
    }
  },
  overXYears: {
    one: {
      default: '1 ವರ್ಷದ ಮೇಲೆ',
      future: '1 ವರ್ಷದ ಮೇಲೆ',
      past: '1 ವರ್ಷದ ಮೇಲೆ'
    },
    other: {
      default: '{{count}} ವರ್ಷಗಳ ಮೇಲೆ',
      future: '{{count}} ವರ್ಷಗಳ ಮೇಲೆ',
      past: '{{count}} ವರ್ಷಗಳ ಮೇಲೆ'
    }
  },
  almostXYears: {
    one: {
      default: 'ಬಹುತೇಕ 1 ವರ್ಷದಲ್ಲಿ',
      future: 'ಬಹುತೇಕ 1 ವರ್ಷದಲ್ಲಿ',
      past: 'ಬಹುತೇಕ 1 ವರ್ಷದಲ್ಲಿ'
    },
    other: {
      default: 'ಬಹುತೇಕ {{count}} ವರ್ಷಗಳಲ್ಲಿ',
      future: 'ಬಹುತೇಕ {{count}} ವರ್ಷಗಳಲ್ಲಿ',
      past: 'ಬಹುತೇಕ {{count}} ವರ್ಷಗಳಲ್ಲಿ'
    }
  }
};

function getResultByTense(parentToken, options) {
  if (options.addSuffix) {
    if (options.comparison > 0) {
      return parentToken.future;
    } else {
      return parentToken.past;
    }
  }

  return parentToken.default;
}

function formatDistance$z(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$y[token] === 'string') {
    result = formatDistanceLocale$y[token];
  } else if (count === 1) {
    result = getResultByTense(formatDistanceLocale$y[token].one, options);
  } else {
    result = getResultByTense(formatDistanceLocale$y[token].other, options);
  }

  return result.replace('{{count}}', count);
}

// Reference: https://www.unicode.org/cldr/charts/32/summary/kn.html
var dateFormats$z = {
  full: 'EEEE, MMMM d, y',
  // CLDR 1816
  long: 'MMMM d, y',
  // CLDR 1817
  medium: 'MMM d, y',
  // CLDR 1818
  short: 'd/M/yy' // CLDR 1819

};
var timeFormats$z = {
  full: 'hh:mm:ss a zzzz',
  // CLDR 1820
  long: 'hh:mm:ss a z',
  // CLDR 1821
  medium: 'hh:mm:ss a',
  // CLDR 1822
  short: 'hh:mm a' // CLDR 1823

};
var dateTimeFormats$z = {
  full: '{{date}} {{time}}',
  // CLDR 1824
  long: '{{date}} {{time}}',
  // CLDR 1825
  medium: '{{date}} {{time}}',
  // CLDR 1826
  short: '{{date}} {{time}}' // CLDR 1827

};
var formatLong$z = {
  date: buildFormatLongFn({
    formats: dateFormats$z,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$z,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$z,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$z = {
  lastWeek: "'ಕಳೆದ' eeee p 'ಕ್ಕೆ'",
  yesterday: "'ನಿನ್ನೆ' p 'ಕ್ಕೆ'",
  today: "'ಇಂದು' p 'ಕ್ಕೆ'",
  tomorrow: "'ನಾಳೆ' p 'ಕ್ಕೆ'",
  nextWeek: "eeee p 'ಕ್ಕೆ'",
  other: 'P'
};
function formatRelative$z(token, _date, _baseDate, _options) {
  return formatRelativeLocale$z[token];
}

// Reference: https://www.unicode.org/cldr/charts/32/summary/kn.html
var eraValues$z = {
  narrow: ['ಕ್ರಿ.ಪೂ', 'ಕ್ರಿ.ಶ'],
  abbreviated: ['ಕ್ರಿ.ಪೂ', 'ಕ್ರಿ.ಶ'],
  // CLDR #1618, #1620
  wide: ['ಕ್ರಿಸ್ತ ಪೂರ್ವ', 'ಕ್ರಿಸ್ತ ಶಕ'] // CLDR #1614, #1616

};
var quarterValues$z = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['ತ್ರೈ 1', 'ತ್ರೈ 2', 'ತ್ರೈ 3', 'ತ್ರೈ 4'],
  // CLDR #1630 - #1638
  wide: ['1ನೇ ತ್ರೈಮಾಸಿಕ', '2ನೇ ತ್ರೈಮಾಸಿಕ', '3ನೇ ತ್ರೈಮಾಸಿಕ', '4ನೇ ತ್ರೈಮಾಸಿಕ'] // CLDR #1622 - #1629

}; // CLDR #1646 - #1717

var monthValues$z = {
  narrow: ['ಜ', 'ಫೆ', 'ಮಾ', 'ಏ', 'ಮೇ', 'ಜೂ', 'ಜು', 'ಆ', 'ಸೆ', 'ಅ', 'ನ', 'ಡಿ'],
  abbreviated: ['ಜನ', 'ಫೆಬ್ರ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿ', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗ', 'ಸೆಪ್ಟೆಂ', 'ಅಕ್ಟೋ', 'ನವೆಂ', 'ಡಿಸೆಂ'],
  wide: ['ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್', 'ಡಿಸೆಂಬರ್']
}; // CLDR #1718 - #1773

var dayValues$z = {
  narrow: ['ಭಾ', 'ಸೋ', 'ಮಂ', 'ಬು', 'ಗು', 'ಶು', 'ಶ'],
  short: ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'],
  abbreviated: ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'],
  wide: ['ಭಾನುವಾರ', 'ಸೋಮವಾರ', 'ಮಂಗಳವಾರ', 'ಬುಧವಾರ', 'ಗುರುವಾರ', 'ಶುಕ್ರವಾರ', 'ಶನಿವಾರ']
}; // CLDR #1774 - #1815

var dayPeriodValues$y = {
  narrow: {
    am: 'ಪೂರ್ವಾಹ್ನ',
    pm: 'ಅಪರಾಹ್ನ',
    midnight: 'ಮಧ್ಯರಾತ್ರಿ',
    noon: 'ಮಧ್ಯಾಹ್ನ',
    morning: 'ಬೆಳಗ್ಗೆ',
    afternoon: 'ಮಧ್ಯಾಹ್ನ',
    evening: 'ಸಂಜೆ',
    night: 'ರಾತ್ರಿ'
  },
  abbreviated: {
    am: 'ಪೂರ್ವಾಹ್ನ',
    pm: 'ಅಪರಾಹ್ನ',
    midnight: 'ಮಧ್ಯರಾತ್ರಿ',
    noon: 'ಮಧ್ಯಾನ್ಹ',
    morning: 'ಬೆಳಗ್ಗೆ',
    afternoon: 'ಮಧ್ಯಾನ್ಹ',
    evening: 'ಸಂಜೆ',
    night: 'ರಾತ್ರಿ'
  },
  wide: {
    am: 'ಪೂರ್ವಾಹ್ನ',
    pm: 'ಅಪರಾಹ್ನ',
    midnight: 'ಮಧ್ಯರಾತ್ರಿ',
    noon: 'ಮಧ್ಯಾನ್ಹ',
    morning: 'ಬೆಳಗ್ಗೆ',
    afternoon: 'ಮಧ್ಯಾನ್ಹ',
    evening: 'ಸಂಜೆ',
    night: 'ರಾತ್ರಿ'
  }
};
var formattingDayPeriodValues$r = {
  narrow: {
    am: 'ಪೂ',
    pm: 'ಅ',
    midnight: 'ಮಧ್ಯರಾತ್ರಿ',
    noon: 'ಮಧ್ಯಾನ್ಹ',
    morning: 'ಬೆಳಗ್ಗೆ',
    afternoon: 'ಮಧ್ಯಾನ್ಹ',
    evening: 'ಸಂಜೆ',
    night: 'ರಾತ್ರಿ'
  },
  abbreviated: {
    am: 'ಪೂರ್ವಾಹ್ನ',
    pm: 'ಅಪರಾಹ್ನ',
    midnight: 'ಮಧ್ಯ ರಾತ್ರಿ',
    noon: 'ಮಧ್ಯಾನ್ಹ',
    morning: 'ಬೆಳಗ್ಗೆ',
    afternoon: 'ಮಧ್ಯಾನ್ಹ',
    evening: 'ಸಂಜೆ',
    night: 'ರಾತ್ರಿ'
  },
  wide: {
    am: 'ಪೂರ್ವಾಹ್ನ',
    pm: 'ಅಪರಾಹ್ನ',
    midnight: 'ಮಧ್ಯ ರಾತ್ರಿ',
    noon: 'ಮಧ್ಯಾನ್ಹ',
    morning: 'ಬೆಳಗ್ಗೆ',
    afternoon: 'ಮಧ್ಯಾನ್ಹ',
    evening: 'ಸಂಜೆ',
    night: 'ರಾತ್ರಿ'
  }
};

function ordinalNumber$z(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  return number + 'ನೇ';
}

var localize$z = {
  ordinalNumber: ordinalNumber$z,
  era: buildLocalizeFn({
    values: eraValues$z,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$z,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$z,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$z,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$y,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$r,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$z = /^(\d+)(ನೇ|ನೆ)?/i;
var parseOrdinalNumberPattern$z = /\d+/i;
var matchEraPatterns$z = {
  narrow: /^(ಕ್ರಿ.ಪೂ|ಕ್ರಿ.ಶ)/i,
  abbreviated: /^(ಕ್ರಿ\.?\s?ಪೂ\.?|ಕ್ರಿ\.?\s?ಶ\.?|ಪ್ರ\.?\s?ಶ\.?)/i,
  wide: /^(ಕ್ರಿಸ್ತ ಪೂರ್ವ|ಕ್ರಿಸ್ತ ಶಕ|ಪ್ರಸಕ್ತ ಶಕ)/i
};
var parseEraPatterns$z = {
  any: [/^ಪೂ/i, /^(ಶ|ಪ್ರ)/i]
};
var matchQuarterPatterns$z = {
  narrow: /^[1234]/i,
  abbreviated: /^ತ್ರೈ[1234]|ತ್ರೈ [1234]| [1234]ತ್ರೈ/i,
  wide: /^[1234](ನೇ)? ತ್ರೈಮಾಸಿಕ/i
};
var parseQuarterPatterns$z = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$z = {
  narrow: /^(ಜೂ|ಜು|ಜ|ಫೆ|ಮಾ|ಏ|ಮೇ|ಆ|ಸೆ|ಅ|ನ|ಡಿ)/i,
  abbreviated: /^(ಜನ|ಫೆಬ್ರ|ಮಾರ್ಚ್|ಏಪ್ರಿ|ಮೇ|ಜೂನ್|ಜುಲೈ|ಆಗ|ಸೆಪ್ಟೆಂ|ಅಕ್ಟೋ|ನವೆಂ|ಡಿಸೆಂ)/i,
  wide: /^(ಜನವರಿ|ಫೆಬ್ರವರಿ|ಮಾರ್ಚ್|ಏಪ್ರಿಲ್|ಮೇ|ಜೂನ್|ಜುಲೈ|ಆಗಸ್ಟ್|ಸೆಪ್ಟೆಂಬರ್|ಅಕ್ಟೋಬರ್|ನವೆಂಬರ್|ಡಿಸೆಂಬರ್)/i
};
var parseMonthPatterns$z = {
  narrow: [/^ಜ$/i, /^ಫೆ/i, /^ಮಾ/i, /^ಏ/i, /^ಮೇ/i, /^ಜೂ/i, /^ಜು$/i, /^ಆ/i, /^ಸೆ/i, /^ಅ/i, /^ನ/i, /^ಡಿ/i],
  any: [/^ಜನ/i, /^ಫೆ/i, /^ಮಾ/i, /^ಏ/i, /^ಮೇ/i, /^ಜೂನ್/i, /^ಜುಲೈ/i, /^ಆ/i, /^ಸೆ/i, /^ಅ/i, /^ನ/i, /^ಡಿ/i]
};
var matchDayPatterns$z = {
  narrow: /^(ಭಾ|ಸೋ|ಮ|ಬು|ಗು|ಶು|ಶ)/i,
  short: /^(ಭಾನು|ಸೋಮ|ಮಂಗಳ|ಬುಧ|ಗುರು|ಶುಕ್ರ|ಶನಿ)/i,
  abbreviated: /^(ಭಾನು|ಸೋಮ|ಮಂಗಳ|ಬುಧ|ಗುರು|ಶುಕ್ರ|ಶನಿ)/i,
  wide: /^(ಭಾನುವಾರ|ಸೋಮವಾರ|ಮಂಗಳವಾರ|ಬುಧವಾರ|ಗುರುವಾರ|ಶುಕ್ರವಾರ|ಶನಿವಾರ)/i
};
var parseDayPatterns$z = {
  narrow: [/^ಭಾ/i, /^ಸೋ/i, /^ಮ/i, /^ಬು/i, /^ಗು/i, /^ಶು/i, /^ಶ/i],
  any: [/^ಭಾ/i, /^ಸೋ/i, /^ಮ/i, /^ಬು/i, /^ಗು/i, /^ಶು/i, /^ಶ/i]
};
var matchDayPeriodPatterns$z = {
  narrow: /^(ಪೂ|ಅ|ಮಧ್ಯರಾತ್ರಿ|ಮಧ್ಯಾನ್ಹ|ಬೆಳಗ್ಗೆ|ಸಂಜೆ|ರಾತ್ರಿ)/i,
  any: /^(ಪೂರ್ವಾಹ್ನ|ಅಪರಾಹ್ನ|ಮಧ್ಯರಾತ್ರಿ|ಮಧ್ಯಾನ್ಹ|ಬೆಳಗ್ಗೆ|ಸಂಜೆ|ರಾತ್ರಿ)/i
};
var parseDayPeriodPatterns$z = {
  any: {
    am: /^ಪೂ/i,
    pm: /^ಅ/i,
    midnight: /ಮಧ್ಯರಾತ್ರಿ/i,
    noon: /ಮಧ್ಯಾನ್ಹ/i,
    morning: /ಬೆಳಗ್ಗೆ/i,
    afternoon: /ಮಧ್ಯಾನ್ಹ/i,
    evening: /ಸಂಜೆ/i,
    night: /ರಾತ್ರಿ/i
  }
};
var match$z = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$z,
    parsePattern: parseOrdinalNumberPattern$z,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$z,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$z,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$z,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$z,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$z,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$z,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$z,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$z,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$z,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$z,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Kannada locale (India).
 * @language Kannada
 * @iso-639-2 kan
 * @author Manjunatha Gouli [@developergouli]{@link https://github.com/developergouli}
 */

var locale$z = {
  code: 'kn',
  formatDistance: formatDistance$z,
  formatLong: formatLong$z,
  formatRelative: formatRelative$z,
  localize: localize$z,
  match: match$z,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$x = {
  lessThanXSeconds: {
    one: '1초 미만',
    other: '{{count}}초 미만'
  },
  xSeconds: {
    one: '1초',
    other: '{{count}}초'
  },
  halfAMinute: '30초',
  lessThanXMinutes: {
    one: '1분 미만',
    other: '{{count}}분 미만'
  },
  xMinutes: {
    one: '1분',
    other: '{{count}}분'
  },
  aboutXHours: {
    one: '약 1시간',
    other: '약 {{count}}시간'
  },
  xHours: {
    one: '1시간',
    other: '{{count}}시간'
  },
  xDays: {
    one: '1일',
    other: '{{count}}일'
  },
  aboutXWeeks: {
    one: '약 1주',
    other: '약 {{count}}주'
  },
  xWeeks: {
    one: '1주',
    other: '{{count}}주'
  },
  aboutXMonths: {
    one: '약 1개월',
    other: '약 {{count}}개월'
  },
  xMonths: {
    one: '1개월',
    other: '{{count}}개월'
  },
  aboutXYears: {
    one: '약 1년',
    other: '약 {{count}}년'
  },
  xYears: {
    one: '1년',
    other: '{{count}}년'
  },
  overXYears: {
    one: '1년 이상',
    other: '{{count}}년 이상'
  },
  almostXYears: {
    one: '거의 1년',
    other: '거의 {{count}}년'
  }
};

var formatDistance$y = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$x[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + ' 후';
    } else {
      return result + ' 전';
    }
  }

  return result;
};

var dateFormats$y = {
  full: 'y년 M월 d일 EEEE',
  long: 'y년 M월 d일',
  medium: 'y.MM.dd',
  short: 'y.MM.dd'
};
var timeFormats$y = {
  full: 'a H시 mm분 ss초 zzzz',
  long: 'a H:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$y = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$y = {
  date: buildFormatLongFn({
    formats: dateFormats$y,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$y,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$y,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$y = {
  lastWeek: "'지난' eeee p",
  yesterday: "'어제' p",
  today: "'오늘' p",
  tomorrow: "'내일' p",
  nextWeek: "'다음' eeee p",
  other: 'P'
};

var formatRelative$y = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$y[token];
};

var eraValues$y = {
  narrow: ['BC', 'AD'],
  abbreviated: ['BC', 'AD'],
  wide: ['기원전', '서기']
};
var quarterValues$y = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1분기', '2분기', '3분기', '4분기']
};
var monthValues$y = {
  narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  abbreviated: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  wide: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
};
var dayValues$y = {
  narrow: ['일', '월', '화', '수', '목', '금', '토'],
  short: ['일', '월', '화', '수', '목', '금', '토'],
  abbreviated: ['일', '월', '화', '수', '목', '금', '토'],
  wide: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
};
var dayPeriodValues$x = {
  narrow: {
    am: '오전',
    pm: '오후',
    midnight: '자정',
    noon: '정오',
    morning: '아침',
    afternoon: '오후',
    evening: '저녁',
    night: '밤'
  },
  abbreviated: {
    am: '오전',
    pm: '오후',
    midnight: '자정',
    noon: '정오',
    morning: '아침',
    afternoon: '오후',
    evening: '저녁',
    night: '밤'
  },
  wide: {
    am: '오전',
    pm: '오후',
    midnight: '자정',
    noon: '정오',
    morning: '아침',
    afternoon: '오후',
    evening: '저녁',
    night: '밤'
  }
};
var formattingDayPeriodValues$q = {
  narrow: {
    am: '오전',
    pm: '오후',
    midnight: '자정',
    noon: '정오',
    morning: '아침',
    afternoon: '오후',
    evening: '저녁',
    night: '밤'
  },
  abbreviated: {
    am: '오전',
    pm: '오후',
    midnight: '자정',
    noon: '정오',
    morning: '아침',
    afternoon: '오후',
    evening: '저녁',
    night: '밤'
  },
  wide: {
    am: '오전',
    pm: '오후',
    midnight: '자정',
    noon: '정오',
    morning: '아침',
    afternoon: '오후',
    evening: '저녁',
    night: '밤'
  }
};

var ordinalNumber$y = function (dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber);
  var options = dirtyOptions || {};
  var unit = String(options.unit);

  switch (unit) {
    case 'minute':
    case 'second':
      return String(number);

    case 'date':
      return number + '일';

    default:
      return number + '번째';
  }
};

var localize$y = {
  ordinalNumber: ordinalNumber$y,
  era: buildLocalizeFn({
    values: eraValues$y,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$y,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$y,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$y,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$x,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$q,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$y = /^(\d+)(일|번째)?/i;
var parseOrdinalNumberPattern$y = /\d+/i;
var matchEraPatterns$y = {
  narrow: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(기원전|서기)/i
};
var parseEraPatterns$y = {
  any: [/^(bc|기원전)/i, /^(ad|서기)/i]
};
var matchQuarterPatterns$y = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]사?분기/i
};
var parseQuarterPatterns$y = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$y = {
  narrow: /^(1[012]|[123456789])/,
  abbreviated: /^(1[012]|[123456789])월/i,
  wide: /^(1[012]|[123456789])월/i
};
var parseMonthPatterns$y = {
  any: [/^1월?$/, /^2/, /^3/, /^4/, /^5/, /^6/, /^7/, /^8/, /^9/, /^10/, /^11/, /^12/]
};
var matchDayPatterns$y = {
  narrow: /^[일월화수목금토]/,
  short: /^[일월화수목금토]/,
  abbreviated: /^[일월화수목금토]/,
  wide: /^[일월화수목금토]요일/
};
var parseDayPatterns$y = {
  any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/]
};
var matchDayPeriodPatterns$y = {
  any: /^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i
};
var parseDayPeriodPatterns$y = {
  any: {
    am: /^(am|오전)/i,
    pm: /^(pm|오후)/i,
    midnight: /^자정/i,
    noon: /^정오/i,
    morning: /^아침/i,
    afternoon: /^오후/i,
    evening: /^저녁/i,
    night: /^밤/i
  }
};
var match$y = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$y,
    parsePattern: parseOrdinalNumberPattern$y,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$y,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$y,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$y,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$y,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$y,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$y,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$y,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$y,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$y,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$y,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Korean locale.
 * @language Korean
 * @iso-639-2 kor
 * @author Hong Chulju [@angdev]{@link https://github.com/angdev}
 * @author Lee Seoyoen [@iamssen]{@link https://github.com/iamssen}
 * @author Taiki IKeda [@so99ynoodles]{@link https://github.com/so99ynoodles}
 */

var locale$y = {
  code: 'ko',
  formatDistance: formatDistance$y,
  formatLong: formatLong$y,
  formatRelative: formatRelative$y,
  localize: localize$y,
  match: match$y,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$w = {
  lessThanXSeconds: {
    standalone: {
      one: 'manner wéi eng Sekonn',
      other: 'manner wéi {{count}} Sekonnen'
    },
    withPreposition: {
      one: 'manner wéi enger Sekonn',
      other: 'manner wéi {{count}} Sekonnen'
    }
  },
  xSeconds: {
    standalone: {
      one: 'eng Sekonn',
      other: '{{count}} Sekonnen'
    },
    withPreposition: {
      one: 'enger Sekonn',
      other: '{{count}} Sekonnen'
    }
  },
  halfAMinute: {
    standalone: 'eng hallef Minutt',
    withPreposition: 'enger hallwer Minutt'
  },
  lessThanXMinutes: {
    standalone: {
      one: 'manner wéi eng Minutt',
      other: 'manner wéi {{count}} Minutten'
    },
    withPreposition: {
      one: 'manner wéi enger Minutt',
      other: 'manner wéi {{count}} Minutten'
    }
  },
  xMinutes: {
    standalone: {
      one: 'eng Minutt',
      other: '{{count}} Minutten'
    },
    withPreposition: {
      one: 'enger Minutt',
      other: '{{count}} Minutten'
    }
  },
  aboutXHours: {
    standalone: {
      one: 'ongeféier eng Stonn',
      other: 'ongeféier {{count}} Stonnen'
    },
    withPreposition: {
      one: 'ongeféier enger Stonn',
      other: 'ongeféier {{count}} Stonnen'
    }
  },
  xHours: {
    standalone: {
      one: 'eng Stonn',
      other: '{{count}} Stonnen'
    },
    withPreposition: {
      one: 'enger Stonn',
      other: '{{count}} Stonnen'
    }
  },
  xDays: {
    standalone: {
      one: 'een Dag',
      other: '{{count}} Deeg'
    },
    withPreposition: {
      one: 'engem Dag',
      other: '{{count}} Deeg'
    }
  },
  aboutXWeeks: {
    standalone: {
      one: 'ongeféier eng Woch',
      other: 'ongeféier {{count}} Wochen'
    },
    withPreposition: {
      one: 'ongeféier enger Woche',
      other: 'ongeféier {{count}} Wochen'
    }
  },
  xWeeks: {
    standalone: {
      one: 'eng Woch',
      other: '{{count}} Wochen'
    },
    withPreposition: {
      one: 'enger Woch',
      other: '{{count}} Wochen'
    }
  },
  aboutXMonths: {
    standalone: {
      one: 'ongeféier ee Mount',
      other: 'ongeféier {{count}} Méint'
    },
    withPreposition: {
      one: 'ongeféier engem Mount',
      other: 'ongeféier {{count}} Méint'
    }
  },
  xMonths: {
    standalone: {
      one: 'ee Mount',
      other: '{{count}} Méint'
    },
    withPreposition: {
      one: 'engem Mount',
      other: '{{count}} Méint'
    }
  },
  aboutXYears: {
    standalone: {
      one: 'ongeféier ee Joer',
      other: 'ongeféier {{count}} Joer'
    },
    withPreposition: {
      one: 'ongeféier engem Joer',
      other: 'ongeféier {{count}} Joer'
    }
  },
  xYears: {
    standalone: {
      one: 'ee Joer',
      other: '{{count}} Joer'
    },
    withPreposition: {
      one: 'engem Joer',
      other: '{{count}} Joer'
    }
  },
  overXYears: {
    standalone: {
      one: 'méi wéi ee Joer',
      other: 'méi wéi {{count}} Joer'
    },
    withPreposition: {
      one: 'méi wéi engem Joer',
      other: 'méi wéi {{count}} Joer'
    }
  },
  almostXYears: {
    standalone: {
      one: 'bal ee Joer',
      other: 'bal {{count}} Joer'
    },
    withPreposition: {
      one: 'bal engem Joer',
      other: 'bal {{count}} Joer'
    }
  }
};
var EXCEPTION_CONSONANTS = ['d', 'h', 'n', 't', 'z'];
var VOWELS = ['a,', 'e', 'i', 'o', 'u'];
var DIGITS_SPOKEN_N_NEEDED = [0, 1, 2, 3, 8, 9];
var FIRST_TWO_DIGITS_SPOKEN_NO_N_NEEDED = [40, 50, 60, 70]; // Eifeler Regel

function isFinalNNeeded(nextWords) {
  var firstLetter = nextWords.charAt(0).toLowerCase();

  if (VOWELS.indexOf(firstLetter) != -1 || EXCEPTION_CONSONANTS.indexOf(firstLetter) != -1) {
    return true;
  } // Numbers would need to converted into words for checking.
  // Therefore, I have listed the digits that require a preceeding n with a few exceptions.


  var firstWord = nextWords.split(' ')[0];
  var number = parseInt(firstWord);

  if (!isNaN(number) && DIGITS_SPOKEN_N_NEEDED.indexOf(number % 10) != -1 && FIRST_TWO_DIGITS_SPOKEN_NO_N_NEEDED.indexOf(parseInt(firstWord.substring(0, 2))) == -1) {
    return true;
  } // Omit other checks as they are not expected here.


  return false;
}

function formatDistance$x(token, count, options) {
  options = options || {};
  var usageGroup = options.addSuffix ? formatDistanceLocale$w[token].withPreposition : formatDistanceLocale$w[token].standalone;
  var result;

  if (typeof usageGroup === 'string') {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else {
    result = usageGroup.other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'a' + (isFinalNNeeded(result) ? 'n' : '') + ' ' + result;
    } else {
      return 'viru' + (isFinalNNeeded(result) ? 'n' : '') + ' ' + result;
    }
  }

  return result;
}

var dateFormats$x = {
  full: 'EEEE, do MMMM y',
  // Méindeg, 7. Januar 2018
  long: 'do MMMM y',
  // 7. Januar 2018
  medium: 'do MMM y',
  // 7. Jan 2018
  short: 'dd.MM.yy' // 07.01.18

};
var timeFormats$x = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$x = {
  full: "{{date}} 'um' {{time}}",
  long: "{{date}} 'um' {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$x = {
  date: buildFormatLongFn({
    formats: dateFormats$x,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$x,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$x,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$x = {
  lastWeek: function (date) {
    var day = date.getUTCDay();
    var result = "'läschte";

    if (day === 2 || day === 4) {
      // Eifeler Regel: Add an n before the consonant d; Here "Dënschdeg" "and Donneschde".
      result += 'n';
    }

    result += "' eeee 'um' p";
    return result;
  },
  yesterday: "'gëschter um' p",
  today: "'haut um' p",
  tomorrow: "'moien um' p",
  nextWeek: "eeee 'um' p",
  other: 'P'
};
function formatRelative$x(token, date, _baseDate, _options) {
  var format = formatRelativeLocale$x[token];

  if (typeof format === 'function') {
    return format(date);
  }

  return format;
}

var eraValues$x = {
  narrow: ['v.Chr.', 'n.Chr.'],
  abbreviated: ['v.Chr.', 'n.Chr.'],
  wide: ['viru Christus', 'no Christus']
};
var quarterValues$x = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1. Quartal', '2. Quartal', '3. Quartal', '4. Quartal']
};
var monthValues$x = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mäe', 'Abr', 'Mee', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  wide: ['Januar', 'Februar', 'Mäerz', 'Abrëll', 'Mee', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
};
var dayValues$x = {
  narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
  short: ['So', 'Mé', 'Dë', 'Më', 'Do', 'Fr', 'Sa'],
  abbreviated: ['So.', 'Mé.', 'Dë.', 'Më.', 'Do.', 'Fr.', 'Sa.'],
  wide: ['Sonndeg', 'Méindeg', 'Dënschdeg', 'Mëttwoch', 'Donneschdeg', 'Freideg', 'Samschdeg']
};
var dayPeriodValues$w = {
  narrow: {
    am: 'mo.',
    pm: 'nomë.',
    midnight: 'Mëtternuecht',
    noon: 'Mëtteg',
    morning: 'Moien',
    afternoon: 'Nomëtteg',
    evening: 'Owend',
    night: 'Nuecht'
  },
  abbreviated: {
    am: 'moies',
    pm: 'nomëttes',
    midnight: 'Mëtternuecht',
    noon: 'Mëtteg',
    morning: 'Moien',
    afternoon: 'Nomëtteg',
    evening: 'Owend',
    night: 'Nuecht'
  },
  wide: {
    am: 'moies',
    pm: 'nomëttes',
    midnight: 'Mëtternuecht',
    noon: 'Mëtteg',
    morning: 'Moien',
    afternoon: 'Nomëtteg',
    evening: 'Owend',
    night: 'Nuecht'
  }
};
var formattingDayPeriodValues$p = {
  narrow: {
    am: 'mo.',
    pm: 'nom.',
    midnight: 'Mëtternuecht',
    noon: 'mëttes',
    morning: 'moies',
    afternoon: 'nomëttes',
    evening: 'owes',
    night: 'nuets'
  },
  abbreviated: {
    am: 'moies',
    pm: 'nomëttes',
    midnight: 'Mëtternuecht',
    noon: 'mëttes',
    morning: 'moies',
    afternoon: 'nomëttes',
    evening: 'owes',
    night: 'nuets'
  },
  wide: {
    am: 'moies',
    pm: 'nomëttes',
    midnight: 'Mëtternuecht',
    noon: 'mëttes',
    morning: 'moies',
    afternoon: 'nomëttes',
    evening: 'owes',
    night: 'nuets'
  }
};

function ordinalNumber$x(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  return number + '.';
}

var localize$x = {
  ordinalNumber: ordinalNumber$x,
  era: buildLocalizeFn({
    values: eraValues$x,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$x,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$x,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$x,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$w,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$p,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$x = /^(\d+)(\.)?/i;
var parseOrdinalNumberPattern$x = /\d+/i;
var matchEraPatterns$x = {
  narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  wide: /^(viru Christus|virun eiser Zäitrechnung|no Christus|eiser Zäitrechnung)/i
};
var parseEraPatterns$x = {
  any: [/^v/i, /^n/i]
};
var matchQuarterPatterns$x = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? Quartal/i
};
var parseQuarterPatterns$x = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$x = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mäe|abr|mee|jun|jul|aug|sep|okt|nov|dez)/i,
  wide: /^(januar|februar|mäerz|abrëll|mee|juni|juli|august|september|oktober|november|dezember)/i
};
var parseMonthPatterns$x = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mä/i, /^ab/i, /^me/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$x = {
  narrow: /^[smdf]/i,
  short: /^(so|mé|dë|më|do|fr|sa)/i,
  abbreviated: /^(son?|méi?|dën?|mët?|don?|fre?|sam?)\.?/i,
  wide: /^(sonndeg|méindeg|dënschdeg|mëttwoch|donneschdeg|freideg|samschdeg)/i
};
var parseDayPatterns$x = {
  any: [/^so/i, /^mé/i, /^dë/i, /^më/i, /^do/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns$x = {
  narrow: /^(mo\.?|nomë\.?|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i,
  abbreviated: /^(moi\.?|nomët\.?|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i,
  wide: /^(moies|nomëttes|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i
};
var parseDayPeriodPatterns$x = {
  any: {
    am: /^m/i,
    pm: /^n/i,
    midnight: /^Mëtter/i,
    noon: /^mëttes/i,
    morning: /moies/i,
    afternoon: /nomëttes/i,
    // will never be matched. Afternoon is matched by `pm`
    evening: /owes/i,
    night: /nuets/i // will never be matched. Night is matched by `pm`

  }
};
var match$x = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$x,
    parsePattern: parseOrdinalNumberPattern$x,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$x,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$x,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$x,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$x,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$x,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$x,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$x,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$x,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$x,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPeriodPatterns$x,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Luxembourgish locale.
 * @language Luxembourgish
 * @iso-639-2 ltz
 * @author Daniel Waxweiler [@dwaxweiler]{@link https://github.com/dwaxweiler}
 */

var locale$x = {
  code: 'lb',
  formatDistance: formatDistance$x,
  formatLong: formatLong$x,
  formatRelative: formatRelative$x,
  localize: localize$x,
  match: match$x,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$v = {
  lessThanXSeconds: {
    one: translateSeconds,
    other: translate
  },
  xSeconds: {
    one: translateSeconds,
    other: translate
  },
  halfAMinute: 'pusė minutės',
  lessThanXMinutes: {
    one: translateSingular,
    other: translate
  },
  xMinutes: {
    one: translateSingular,
    other: translate
  },
  aboutXHours: {
    one: translateSingular,
    other: translate
  },
  xHours: {
    one: translateSingular,
    other: translate
  },
  xDays: {
    one: translateSingular,
    other: translate
  },
  aboutWeeks: {
    one: translateSingular,
    other: translate
  },
  xWeeks: {
    one: translateSingular,
    other: translate
  },
  aboutXMonths: {
    one: translateSingular,
    other: translate
  },
  xMonths: {
    one: translateSingular,
    other: translate
  },
  aboutXYears: {
    one: translateSingular,
    other: translate
  },
  xYears: {
    one: translateSingular,
    other: translate
  },
  overXYears: {
    one: translateSingular,
    other: translate
  },
  almostXYears: {
    one: translateSingular,
    other: translate
  }
};
var translations = {
  xseconds_other: 'sekundė_sekundžių_sekundes',
  xminutes_one: 'minutė_minutės_minutę',
  xminutes_other: 'minutės_minučių_minutes',
  xhours_one: 'valanda_valandos_valandą',
  xhours_other: 'valandos_valandų_valandas',
  xdays_one: 'diena_dienos_dieną',
  xdays_other: 'dienos_dienų_dienas',
  xweeks_one: 'savaitė_savaitės_savaitę',
  xweeks_other: 'savaitės_savaičių_savaites',
  xmonths_one: 'mėnuo_mėnesio_mėnesį',
  xmonths_other: 'mėnesiai_mėnesių_mėnesius',
  xyears_one: 'metai_metų_metus',
  xyears_other: 'metai_metų_metus',
  about: 'apie',
  over: 'daugiau nei',
  almost: 'beveik',
  lessthan: 'mažiau nei'
};

function translateSeconds(number, addSuffix, key, isFuture) {
  if (!addSuffix) {
    return 'kelios sekundės';
  } else {
    return isFuture ? 'kelių sekundžių' : 'kelias sekundes';
  }
}

function translateSingular(number, addSuffix, key, isFuture) {
  return !addSuffix ? forms(key)[0] : isFuture ? forms(key)[1] : forms(key)[2];
}

function special(number) {
  return number % 10 === 0 || number > 10 && number < 20;
}

function forms(key) {
  return translations[key].split('_');
}

function translate(number, addSuffix, key, isFuture) {
  var result = number + ' ';

  if (number === 1) {
    return result + translateSingular(number, addSuffix, key[0], isFuture);
  } else if (!addSuffix) {
    return result + (special(number) ? forms(key)[1] : forms(key)[0]);
  } else {
    if (isFuture) {
      return result + forms(key)[1];
    } else {
      return result + (special(number) ? forms(key)[1] : forms(key)[2]);
    }
  }
}

function formatDistance$w(token, count, options) {
  options = options || {};
  var adverb = token.match(/about|over|almost|lessthan/i);
  var unit = token.replace(adverb, '');
  var result;

  if (typeof formatDistanceLocale$v[token] === 'string') {
    result = formatDistanceLocale$v[token];
  } else if (count === 1) {
    result = formatDistanceLocale$v[token].one(count, options.addSuffix, unit.toLowerCase() + '_one');
  } else {
    result = formatDistanceLocale$v[token].other(count, options.addSuffix, unit.toLowerCase() + '_other');
  }

  if (adverb) {
    result = translations[adverb[0].toLowerCase()] + ' ' + result;
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'po ' + result;
    } else {
      return 'prieš ' + result;
    }
  }

  return result;
}

var dateFormats$w = {
  full: "y 'm'. MMMM d 'd'., EEEE",
  long: "y 'm'. MMMM d 'd'.",
  medium: 'y-MM-dd',
  short: 'y-MM-dd'
};
var timeFormats$w = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$w = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$w = {
  date: buildFormatLongFn({
    formats: dateFormats$w,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$w,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$w,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$w = {
  lastWeek: "'Praėjusį' eeee p",
  yesterday: "'Vakar' p",
  today: "'Šiandien' p",
  tomorrow: "'Rytoj' p",
  nextWeek: 'eeee p',
  other: 'P'
};
function formatRelative$w(token, _date, _baseDate, _options) {
  return formatRelativeLocale$w[token];
}

var eraValues$w = {
  narrow: ['pr. Kr.', 'po Kr.'],
  abbreviated: ['pr. Kr.', 'po Kr.'],
  wide: ['prieš Kristų', 'po Kristaus']
};
var quarterValues$w = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['I ketv.', 'II ketv.', 'III ketv.', 'IV ketv.'],
  wide: ['I ketvirtis', 'II ketvirtis', 'III ketvirtis', 'IV ketvirtis']
};
var formattingQuarterValues$2 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['I k.', 'II k.', 'III k.', 'IV k.'],
  wide: ['I ketvirtis', 'II ketvirtis', 'III ketvirtis', 'IV ketvirtis']
};
var monthValues$w = {
  narrow: ['S', 'V', 'K', 'B', 'G', 'B', 'L', 'R', 'R', 'S', 'L', 'G'],
  abbreviated: ['saus.', 'vas.', 'kov.', 'bal.', 'geg.', 'birž.', 'liep.', 'rugp.', 'rugs.', 'spal.', 'lapkr.', 'gruod.'],
  wide: ['sausis', 'vasaris', 'kovas', 'balandis', 'gegužė', 'birželis', 'liepa', 'rugpjūtis', 'rugsėjis', 'spalis', 'lapkritis', 'gruodis']
};
var formattingMonthValues$8 = {
  narrow: ['S', 'V', 'K', 'B', 'G', 'B', 'L', 'R', 'R', 'S', 'L', 'G'],
  abbreviated: ['saus.', 'vas.', 'kov.', 'bal.', 'geg.', 'birž.', 'liep.', 'rugp.', 'rugs.', 'spal.', 'lapkr.', 'gruod.'],
  wide: ['sausio', 'vasario', 'kovo', 'balandžio', 'gegužės', 'birželio', 'liepos', 'rugpjūčio', 'rugsėjo', 'spalio', 'lapkričio', 'gruodžio']
};
var dayValues$w = {
  narrow: ['S', 'P', 'A', 'T', 'K', 'P', 'Š'],
  short: ['Sk', 'Pr', 'An', 'Tr', 'Kt', 'Pn', 'Št'],
  abbreviated: ['sk', 'pr', 'an', 'tr', 'kt', 'pn', 'št'],
  wide: ['sekmadienis', 'pirmadienis', 'antradienis', 'trečiadienis', 'ketvirtadienis', 'penktadienis', 'šeštadienis']
};
var formattingDayValues$2 = {
  narrow: ['S', 'P', 'A', 'T', 'K', 'P', 'Š'],
  short: ['Sk', 'Pr', 'An', 'Tr', 'Kt', 'Pn', 'Št'],
  abbreviated: ['sk', 'pr', 'an', 'tr', 'kt', 'pn', 'št'],
  wide: ['sekmadienį', 'pirmadienį', 'antradienį', 'trečiadienį', 'ketvirtadienį', 'penktadienį', 'šeštadienį']
};
var dayPeriodValues$v = {
  narrow: {
    am: 'pr. p.',
    pm: 'pop.',
    midnight: 'vidurnaktis',
    noon: 'vidurdienis',
    morning: 'rytas',
    afternoon: 'diena',
    evening: 'vakaras',
    night: 'naktis'
  },
  abbreviated: {
    am: 'priešpiet',
    pm: 'popiet',
    midnight: 'vidurnaktis',
    noon: 'vidurdienis',
    morning: 'rytas',
    afternoon: 'diena',
    evening: 'vakaras',
    night: 'naktis'
  },
  wide: {
    am: 'priešpiet',
    pm: 'popiet',
    midnight: 'vidurnaktis',
    noon: 'vidurdienis',
    morning: 'rytas',
    afternoon: 'diena',
    evening: 'vakaras',
    night: 'naktis'
  }
};
var formattingDayPeriodValues$o = {
  narrow: {
    am: 'pr. p.',
    pm: 'pop.',
    midnight: 'vidurnaktis',
    noon: 'perpiet',
    morning: 'rytas',
    afternoon: 'popietė',
    evening: 'vakaras',
    night: 'naktis'
  },
  abbreviated: {
    am: 'priešpiet',
    pm: 'popiet',
    midnight: 'vidurnaktis',
    noon: 'perpiet',
    morning: 'rytas',
    afternoon: 'popietė',
    evening: 'vakaras',
    night: 'naktis'
  },
  wide: {
    am: 'priešpiet',
    pm: 'popiet',
    midnight: 'vidurnaktis',
    noon: 'perpiet',
    morning: 'rytas',
    afternoon: 'popietė',
    evening: 'vakaras',
    night: 'naktis'
  }
};

function ordinalNumber$w(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  return number + '-oji';
}

var localize$w = {
  ordinalNumber: ordinalNumber$w,
  era: buildLocalizeFn({
    values: eraValues$w,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$w,
    defaultWidth: 'wide',
    formattingValues: formattingQuarterValues$2,
    defaultFormattingWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$w,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$8,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$w,
    defaultWidth: 'wide',
    formattingValues: formattingDayValues$2,
    defaultFormattingWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$v,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$o,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$w = /^(\d+)(-oji)?/i;
var parseOrdinalNumberPattern$w = /\d+/i;
var matchEraPatterns$w = {
  narrow: /^p(r|o)\.?\s?(kr\.?|me)/i,
  abbreviated: /^(pr\.\s?(kr\.|m\.\s?e\.)|po\s?kr\.|mūsų eroje)/i,
  wide: /^(prieš Kristų|prieš mūsų erą|po Kristaus|mūsų eroje)/i
};
var parseEraPatterns$w = {
  wide: [/prieš/i, /(po|mūsų)/i],
  any: [/^pr/i, /^(po|m)/i]
};
var matchQuarterPatterns$w = {
  narrow: /^([1234])/i,
  abbreviated: /^(I|II|III|IV)\s?ketv?\.?/i,
  wide: /^(I|II|III|IV)\s?ketvirtis/i
};
var parseQuarterPatterns$w = {
  narrow: [/1/i, /2/i, /3/i, /4/i],
  any: [/I$/i, /II$/i, /III/i, /IV/i]
};
var matchMonthPatterns$w = {
  narrow: /^[svkbglr]/i,
  abbreviated: /^(saus\.|vas\.|kov\.|bal\.|geg\.|birž\.|liep\.|rugp\.|rugs\.|spal\.|lapkr\.|gruod\.)/i,
  wide: /^(sausi(s|o)|vasari(s|o)|kov(a|o)s|balandž?i(s|o)|gegužės?|birželi(s|o)|liep(a|os)|rugpjū(t|č)i(s|o)|rugsėj(is|o)|spali(s|o)|lapkri(t|č)i(s|o)|gruodž?i(s|o))/i
};
var parseMonthPatterns$w = {
  narrow: [/^s/i, /^v/i, /^k/i, /^b/i, /^g/i, /^b/i, /^l/i, /^r/i, /^r/i, /^s/i, /^l/i, /^g/i],
  any: [/^saus/i, /^vas/i, /^kov/i, /^bal/i, /^geg/i, /^birž/i, /^liep/i, /^rugp/i, /^rugs/i, /^spal/i, /^lapkr/i, /^gruod/i]
};
var matchDayPatterns$w = {
  narrow: /^[spatkš]/i,
  short: /^(sk|pr|an|tr|kt|pn|št)/i,
  abbreviated: /^(sk|pr|an|tr|kt|pn|št)/i,
  wide: /^(sekmadien(is|į)|pirmadien(is|į)|antradien(is|į)|trečiadien(is|į)|ketvirtadien(is|į)|penktadien(is|į)|šeštadien(is|į))/i
};
var parseDayPatterns$w = {
  narrow: [/^s/i, /^p/i, /^a/i, /^t/i, /^k/i, /^p/i, /^š/i],
  wide: [/^se/i, /^pi/i, /^an/i, /^tr/i, /^ke/i, /^pe/i, /^še/i],
  any: [/^sk/i, /^pr/i, /^an/i, /^tr/i, /^kt/i, /^pn/i, /^št/i]
};
var matchDayPeriodPatterns$w = {
  narrow: /^(pr.\s?p.|pop.|vidurnaktis|(vidurdienis|perpiet)|rytas|(diena|popietė)|vakaras|naktis)/i,
  any: /^(priešpiet|popiet$|vidurnaktis|(vidurdienis|perpiet)|rytas|(diena|popietė)|vakaras|naktis)/i
};
var parseDayPeriodPatterns$w = {
  narrow: {
    am: /^pr/i,
    pm: /^pop./i,
    midnight: /^vidurnaktis/i,
    noon: /^(vidurdienis|perp)/i,
    morning: /rytas/i,
    afternoon: /(die|popietė)/i,
    evening: /vakaras/i,
    night: /naktis/i
  },
  any: {
    am: /^pr/i,
    pm: /^popiet$/i,
    midnight: /^vidurnaktis/i,
    noon: /^(vidurdienis|perp)/i,
    morning: /rytas/i,
    afternoon: /(die|popietė)/i,
    evening: /vakaras/i,
    night: /naktis/i
  }
};
var match$w = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$w,
    parsePattern: parseOrdinalNumberPattern$w,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$w,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$w,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$w,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$w,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$w,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$w,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$w,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$w,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$w,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$w,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 *
 * @summary Lithuanian locale.
 * @language Lithuanian
 *
 * @iso-639-2 lit
 *
 * @author Pavlo Shpak [@pshpak]{@link https://github.com/pshpak}
 * @author Eduardo Pardo [@eduardopsll]{@link https://github.com/eduardopsll}
 */

var locale$w = {
  code: 'lt',
  formatDistance: formatDistance$w,
  formatLong: formatLong$w,
  formatRelative: formatRelative$w,
  localize: localize$w,
  match: match$w,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

function buildLocalizeTokenFn$2(schema) {
  return function (count, options) {
    if (count === 1) {
      if (options.addSuffix) {
        return schema.one[0].replace('{{time}}', schema.one[2]);
      } else {
        return schema.one[0].replace('{{time}}', schema.one[1]);
      }
    } else {
      var rem = count % 10 === 1 && count % 100 !== 11;

      if (options.addSuffix) {
        return schema.other[0].replace('{{time}}', rem ? schema.other[3] : schema.other[4]).replace('{{count}}', count);
      } else {
        return schema.other[0].replace('{{time}}', rem ? schema.other[1] : schema.other[2]).replace('{{count}}', count);
      }
    }
  };
}

var formatDistanceLocale$u = {
  lessThanXSeconds: buildLocalizeTokenFn$2({
    one: ['mazāk par {{time}}', 'sekundi', 'sekundi'],
    other: ['mazāk nekā {{count}} {{time}}', 'sekunde', 'sekundes', 'sekundes', 'sekundēm']
  }),
  xSeconds: buildLocalizeTokenFn$2({
    one: ['1 {{time}}', 'sekunde', 'sekundes'],
    other: ['{{count}} {{time}}', 'sekunde', 'sekundes', 'sekundes', 'sekundēm']
  }),
  halfAMinute: function (count, options) {
    if (options.addSuffix) {
      return 'pusminūtes';
    } else {
      return 'pusminūte';
    }
  },
  lessThanXMinutes: buildLocalizeTokenFn$2({
    one: ['mazāk par {{time}}', 'minūti', 'minūti'],
    other: ['mazāk nekā {{count}} {{time}}', 'minūte', 'minūtes', 'minūtes', 'minūtēm']
  }),
  xMinutes: buildLocalizeTokenFn$2({
    one: ['1 {{time}}', 'minūte', 'minūtes'],
    other: ['{{count}} {{time}}', 'minūte', 'minūtes', 'minūtes', 'minūtēm']
  }),
  aboutXHours: buildLocalizeTokenFn$2({
    one: ['apmēram 1 {{time}}', 'stunda', 'stundas'],
    other: ['apmēram {{count}} {{time}}', 'stunda', 'stundas', 'stundas', 'stundām']
  }),
  xHours: buildLocalizeTokenFn$2({
    one: ['1 {{time}}', 'stunda', 'stundas'],
    other: ['{{count}} {{time}}', 'stunda', 'stundas', 'stundas', 'stundām']
  }),
  xDays: buildLocalizeTokenFn$2({
    one: ['1 {{time}}', 'diena', 'dienas'],
    other: ['{{count}} {{time}}', 'diena', 'dienas', 'dienas', 'dienām']
  }),
  aboutXWeeks: buildLocalizeTokenFn$2({
    one: ['apmēram 1 {{time}}', 'nedēļa', 'nedēļas'],
    other: ['apmēram {{count}} {{time}}', 'nedēļa', 'nedēļu', 'nedēļas', 'nedēļām']
  }),
  xWeeks: buildLocalizeTokenFn$2({
    one: ['1 {{time}}', 'nedēļa', 'nedēļas'],
    other: ['{{count}} {{time}}', // TODO
    'nedēļa', 'nedēļu', 'nedēļas', 'nedēļām']
  }),
  aboutXMonths: buildLocalizeTokenFn$2({
    one: ['apmēram 1 {{time}}', 'mēnesis', 'mēneša'],
    other: ['apmēram {{count}} {{time}}', 'mēnesis', 'mēneši', 'mēneša', 'mēnešiem']
  }),
  xMonths: buildLocalizeTokenFn$2({
    one: ['1 {{time}}', 'mēnesis', 'mēneša'],
    other: ['{{count}} {{time}}', 'mēnesis', 'mēneši', 'mēneša', 'mēnešiem']
  }),
  aboutXYears: buildLocalizeTokenFn$2({
    one: ['apmēram 1 {{time}}', 'gads', 'gada'],
    other: ['apmēram {{count}} {{time}}', 'gads', 'gadi', 'gada', 'gadiem']
  }),
  xYears: buildLocalizeTokenFn$2({
    one: ['1 {{time}}', 'gads', 'gada'],
    other: ['{{count}} {{time}}', 'gads', 'gadi', 'gada', 'gadiem']
  }),
  overXYears: buildLocalizeTokenFn$2({
    one: ['ilgāk par 1 {{time}}', 'gadu', 'gadu'],
    other: ['vairāk nekā {{count}} {{time}}', 'gads', 'gadi', 'gada', 'gadiem']
  }),
  almostXYears: buildLocalizeTokenFn$2({
    one: ['gandrīz 1 {{time}}', 'gads', 'gada'],
    other: ['vairāk nekā {{count}} {{time}}', 'gads', 'gadi', 'gada', 'gadiem']
  })
};
function formatDistance$v(token, count, options) {
  options = options || {};
  var result = formatDistanceLocale$u[token](count, options);

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'pēc ' + result;
    } else {
      return 'pirms ' + result;
    }
  }

  return result;
}

var dateFormats$v = {
  full: "EEEE, y. 'gada' d. MMMM",
  long: "y. 'gada' d. MMMM",
  medium: 'dd.MM.y.',
  short: 'dd.MM.y.'
};
var timeFormats$v = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$v = {
  full: "{{date}} 'plkst.' {{time}}",
  long: "{{date}} 'plkst.' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$v = {
  date: buildFormatLongFn({
    formats: dateFormats$v,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$v,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$v,
    defaultWidth: 'full'
  })
};

var weekdays$1 = ['svētdienā', 'pirmdienā', 'otrdienā', 'trešdienā', 'ceturtdienā', 'piektdienā', 'sestdienā'];
var formatRelativeLocale$v = {
  lastWeek: function (date, baseDate, options) {
    if (isSameUTCWeek(date, baseDate, options)) {
      return "eeee 'plkst.' p";
    }

    var weekday = weekdays$1[date.getUTCDay()];
    return "'Pagājušā " + weekday + " plkst.' p";
  },
  yesterday: "'Vakar plkst.' p",
  today: "'Šodien plkst.' p",
  tomorrow: "'Rīt plkst.' p",
  nextWeek: function (date, baseDate, options) {
    if (isSameUTCWeek(date, baseDate, options)) {
      return "eeee 'plkst.' p";
    }

    var weekday = weekdays$1[date.getUTCDay()];
    return "'Nākamajā " + weekday + " plkst.' p";
  },
  other: 'P'
};
function formatRelative$v(token, date, baseDate, options) {
  var format = formatRelativeLocale$v[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
}

var eraValues$v = {
  narrow: ['p.m.ē', 'm.ē'],
  abbreviated: ['p. m. ē.', 'm. ē.'],
  wide: ['pirms mūsu ēras', 'mūsu ērā']
};
var quarterValues$v = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1. cet.', '2. cet.', '3. cet.', '4. cet.'],
  wide: ['pirmais ceturksnis', 'otrais ceturksnis', 'trešais ceturksnis', 'ceturtais ceturksnis']
};
var formattingQuarterValues$1 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1. cet.', '2. cet.', '3. cet.', '4. cet.'],
  wide: ['pirmajā ceturksnī', 'otrajā ceturksnī', 'trešajā ceturksnī', 'ceturtajā ceturksnī']
};
var monthValues$v = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['janv.', 'febr.', 'marts', 'apr.', 'maijs', 'jūn.', 'jūl.', 'aug.', 'sept.', 'okt.', 'nov.', 'dec.'],
  wide: ['janvāris', 'februāris', 'marts', 'aprīlis', 'maijs', 'jūnijs', 'jūlijs', 'augusts', 'septembris', 'oktobris', 'novembris', 'decembris']
};
var formattingMonthValues$7 = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['janv.', 'febr.', 'martā', 'apr.', 'maijs', 'jūn.', 'jūl.', 'aug.', 'sept.', 'okt.', 'nov.', 'dec.'],
  wide: ['janvārī', 'februārī', 'martā', 'aprīlī', 'maijā', 'jūnijā', 'jūlijā', 'augustā', 'septembrī', 'oktobrī', 'novembrī', 'decembrī']
};
var dayValues$v = {
  narrow: ['S', 'P', 'O', 'T', 'C', 'P', 'S'],
  short: ['Sv', 'P', 'O', 'T', 'C', 'Pk', 'S'],
  abbreviated: ['svētd.', 'pirmd.', 'otrd.', 'trešd.', 'ceturtd.', 'piektd.', 'sestd.'],
  wide: ['svētdiena', 'pirmdiena', 'otrdiena', 'trešdiena', 'ceturtdiena', 'piektdiena', 'sestdiena']
};
var formattingDayValues$1 = {
  narrow: ['S', 'P', 'O', 'T', 'C', 'P', 'S'],
  short: ['Sv', 'P', 'O', 'T', 'C', 'Pk', 'S'],
  abbreviated: ['svētd.', 'pirmd.', 'otrd.', 'trešd.', 'ceturtd.', 'piektd.', 'sestd.'],
  wide: ['svētdienā', 'pirmdienā', 'otrdienā', 'trešdienā', 'ceturtdienā', 'piektdienā', 'sestdienā']
};
var dayPeriodValues$u = {
  narrow: {
    am: 'am',
    pm: 'pm',
    midnight: 'pusn.',
    noon: 'pusd.',
    morning: 'rīts',
    afternoon: 'diena',
    evening: 'vakars',
    night: 'nakts'
  },
  abbreviated: {
    am: 'am',
    pm: 'pm',
    midnight: 'pusn.',
    noon: 'pusd.',
    morning: 'rīts',
    afternoon: 'pēcpusd.',
    evening: 'vakars',
    night: 'nakts'
  },
  wide: {
    am: 'am',
    pm: 'pm',
    midnight: 'pusnakts',
    noon: 'pusdienlaiks',
    morning: 'rīts',
    afternoon: 'pēcpusdiena',
    evening: 'vakars',
    night: 'nakts'
  }
};
var formattingDayPeriodValues$n = {
  narrow: {
    am: 'am',
    pm: 'pm',
    midnight: 'pusn.',
    noon: 'pusd.',
    morning: 'rītā',
    afternoon: 'dienā',
    evening: 'vakarā',
    night: 'naktī'
  },
  abbreviated: {
    am: 'am',
    pm: 'pm',
    midnight: 'pusn.',
    noon: 'pusd.',
    morning: 'rītā',
    afternoon: 'pēcpusd.',
    evening: 'vakarā',
    night: 'naktī'
  },
  wide: {
    am: 'am',
    pm: 'pm',
    midnight: 'pusnaktī',
    noon: 'pusdienlaikā',
    morning: 'rītā',
    afternoon: 'pēcpusdienā',
    evening: 'vakarā',
    night: 'naktī'
  }
};

function ordinalNumber$v(number, _options) {
  return number + '.';
}

var localize$v = {
  ordinalNumber: ordinalNumber$v,
  era: buildLocalizeFn({
    values: eraValues$v,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$v,
    defaultWidth: 'wide',
    formattingValues: formattingQuarterValues$1,
    defaultFormattingWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$v,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$7,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$v,
    defaultWidth: 'wide',
    formattingValues: formattingDayValues$1,
    defaultFormattingWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$u,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$n,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$v = /^(\d+)\./i;
var parseOrdinalNumberPattern$v = /\d+/i;
var matchEraPatterns$v = {
  narrow: /^(p\.m\.ē|m\.ē)/i,
  abbreviated: /^(p\. m\. ē\.|m\. ē\.)/i,
  wide: /^(pirms mūsu ēras|mūsu ērā)/i
};
var parseEraPatterns$v = {
  any: [/^p/i, /^m/i]
};
var matchQuarterPatterns$v = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](\. cet\.)/i,
  wide: /^(pirma(is|jā)|otra(is|jā)|treša(is|jā)|ceturta(is|jā)) ceturksn(is|ī)/i
};
var parseQuarterPatterns$v = {
  narrow: [/^1/i, /^2/i, /^3/i, /^4/i],
  abbreviated: [/^1/i, /^2/i, /^3/i, /^4/i],
  wide: [/^p/i, /^o/i, /^t/i, /^c/i]
};
var matchMonthPatterns$v = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(janv\.|febr\.|marts|apr\.|maijs|jūn\.|jūl\.|aug\.|sept\.|okt\.|nov\.|dec\.)/i,
  wide: /^(janvār(is|ī)|februār(is|ī)|mart[sā]|aprīl(is|ī)|maij[sā]|jūnij[sā]|jūlij[sā]|august[sā]|septembr(is|ī)|oktobr(is|ī)|novembr(is|ī)|decembr(is|ī))/i
};
var parseMonthPatterns$v = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^mai/i, /^jūn/i, /^jūl/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$v = {
  narrow: /^[spotc]/i,
  short: /^(sv|pi|o|t|c|pk|s)/i,
  abbreviated: /^(svētd\.|pirmd\.|otrd.\|trešd\.|ceturtd\.|piektd\.|sestd\.)/i,
  wide: /^(svētdien(a|ā)|pirmdien(a|ā)|otrdien(a|ā)|trešdien(a|ā)|ceturtdien(a|ā)|piektdien(a|ā)|sestdien(a|ā))/i
};
var parseDayPatterns$v = {
  narrow: [/^s/i, /^p/i, /^o/i, /^t/i, /^c/i, /^p/i, /^s/i],
  any: [/^sv/i, /^pi/i, /^o/i, /^t/i, /^c/i, /^p/i, /^se/i]
};
var matchDayPeriodPatterns$v = {
  narrow: /^(am|pm|pusn\.|pusd\.|rīt(s|ā)|dien(a|ā)|vakar(s|ā)|nakt(s|ī))/,
  abbreviated: /^(am|pm|pusn\.|pusd\.|rīt(s|ā)|pēcpusd\.|vakar(s|ā)|nakt(s|ī))/,
  wide: /^(am|pm|pusnakt(s|ī)|pusdienlaik(s|ā)|rīt(s|ā)|pēcpusdien(a|ā)|vakar(s|ā)|nakt(s|ī))/i
};
var parseDayPeriodPatterns$v = {
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /^pusn/i,
    noon: /^pusd/i,
    morning: /^r/i,
    afternoon: /^(d|pēc)/i,
    evening: /^v/i,
    night: /^n/i
  }
};
var match$v = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$v,
    parsePattern: parseOrdinalNumberPattern$v,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$v,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$v,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$v,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$v,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$v,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$v,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$v,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$v,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$v,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$v,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Latvian locale (Latvia).
 * @language Latvian
 * @iso-639-2 lav
 * @author Rūdolfs Puķītis [@prudolfs]{@link https://github.com/prudolfs}
 */

var locale$v = {
  code: 'lv',
  formatDistance: formatDistance$v,
  formatLong: formatLong$v,
  formatRelative: formatRelative$v,
  localize: localize$v,
  match: match$v,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$t = {
  lessThanXSeconds: {
    one: 'помалку од секунда',
    other: 'помалку од {{count}} секунди'
  },
  xSeconds: {
    one: '1 секунда',
    other: '{{count}} секунди'
  },
  halfAMinute: 'половина минута',
  lessThanXMinutes: {
    one: 'помалку од минута',
    other: 'помалку од {{count}} минути'
  },
  xMinutes: {
    one: '1 минута',
    other: '{{count}} минути'
  },
  aboutXHours: {
    one: 'околу 1 час',
    other: 'околу {{count}} часа'
  },
  xHours: {
    one: '1 час',
    other: '{{count}} часа'
  },
  xDays: {
    one: '1 ден',
    other: '{{count}} дена'
  },
  aboutXWeeks: {
    one: 'околу 1 недела',
    other: 'околу {{count}} месеци'
  },
  xWeeks: {
    one: '1 недела',
    other: '{{count}} недели'
  },
  aboutXMonths: {
    one: 'околу 1 месец',
    other: 'околу {{count}} недели'
  },
  xMonths: {
    one: '1 месец',
    other: '{{count}} месеци'
  },
  aboutXYears: {
    one: 'околу 1 година',
    other: 'околу {{count}} години'
  },
  xYears: {
    one: '1 година',
    other: '{{count}} години'
  },
  overXYears: {
    one: 'повеќе од 1 година',
    other: 'повеќе од {{count}} години'
  },
  almostXYears: {
    one: 'безмалку 1 година',
    other: 'безмалку {{count}} години'
  }
};
function formatDistance$u(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$t[token] === 'string') {
    result = formatDistanceLocale$t[token];
  } else if (count === 1) {
    result = formatDistanceLocale$t[token].one;
  } else {
    result = formatDistanceLocale$t[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'за ' + result;
    } else {
      return 'пред ' + result;
    }
  }

  return result;
}

var dateFormats$u = {
  full: 'EEEE, dd MMMM yyyy',
  long: 'dd MMMM yyyy',
  medium: 'dd MMM yyyy',
  short: 'dd/MM/yyyy'
};
var timeFormats$u = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$u = {
  any: '{{date}} {{time}}'
};
var formatLong$u = {
  date: buildFormatLongFn({
    formats: dateFormats$u,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$u,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$u,
    defaultWidth: 'any'
  })
};

var weekdays = ['недела', 'понеделник', 'вторник', 'среда', 'четврток', 'петок', 'сабота'];

function lastWeek$3(day) {
  var weekday = weekdays[day];

  switch (day) {
    case 0:
    case 3:
    case 6:
      return "'минатата " + weekday + " во' p";

    case 1:
    case 2:
    case 4:
    case 5:
      return "'минатиот " + weekday + " во' p";
  }
}

function thisWeek$3(day) {
  var weekday = weekdays[day];

  switch (day) {
    case 0:
    case 3:
    case 6:
      return "'ова " + weekday + " вo' p";

    case 1:
    case 2:
    case 4:
    case 5:
      return "'овој " + weekday + " вo' p";
  }
}

function nextWeek$3(day) {
  var weekday = weekdays[day];

  switch (day) {
    case 0:
    case 3:
    case 6:
      return "'следната " + weekday + " вo' p";

    case 1:
    case 2:
    case 4:
    case 5:
      return "'следниот " + weekday + " вo' p";
  }
}

var formatRelativeLocale$u = {
  lastWeek: function (date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek$3(day);
    } else {
      return lastWeek$3(day);
    }
  },
  yesterday: "'вчера во' p",
  today: "'денес во' p",
  tomorrow: "'утре во' p",
  nextWeek: function (date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek$3(day);
    } else {
      return nextWeek$3(day);
    }
  },
  other: 'P'
};
function formatRelative$u(token, date, baseDate, options) {
  var format = formatRelativeLocale$u[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
}

var eraValues$u = {
  narrow: ['пр.н.е.', 'н.е.'],
  abbreviated: ['пред н. е.', 'н. е.'],
  wide: ['пред нашата ера', 'нашата ера']
};
var quarterValues$u = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1-ви кв.', '2-ри кв.', '3-ти кв.', '4-ти кв.'],
  wide: ['1-ви квартал', '2-ри квартал', '3-ти квартал', '4-ти квартал']
};
var monthValues$u = {
  abbreviated: ['јан', 'фев', 'мар', 'апр', 'мај', 'јун', 'јул', 'авг', 'септ', 'окт', 'ноем', 'дек'],
  wide: ['јануари', 'февруари', 'март', 'април', 'мај', 'јуни', 'јули', 'август', 'септември', 'октомври', 'ноември', 'декември']
};
var dayValues$u = {
  narrow: ['Н', 'П', 'В', 'С', 'Ч', 'П', 'С'],
  short: ['не', 'по', 'вт', 'ср', 'че', 'пе', 'са'],
  abbreviated: ['нед', 'пон', 'вто', 'сре', 'чет', 'пет', 'саб'],
  wide: ['недела', 'понеделник', 'вторник', 'среда', 'четврток', 'петок', 'сабота']
};
var dayPeriodValues$t = {
  wide: {
    am: 'претпладне',
    pm: 'попладне',
    midnight: 'полноќ',
    noon: 'напладне',
    morning: 'наутро',
    afternoon: 'попладне',
    evening: 'навечер',
    night: 'ноќе'
  }
};

function ordinalNumber$u(dirtyNumber) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + '-ви';

      case 2:
        return number + '-ри';

      case 7:
      case 8:
        return number + '-ми';
    }
  }

  return number + '-ти';
}

var localize$u = {
  ordinalNumber: ordinalNumber$u,
  era: buildLocalizeFn({
    values: eraValues$u,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$u,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$u,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$u,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$t,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$u = /^(\d+)(-?[врмт][и])?/i;
var parseOrdinalNumberPattern$u = /\d+/i;
var matchEraPatterns$u = {
  narrow: /^((пр)?н\.?\s?е\.?)/i,
  abbreviated: /^((пр)?н\.?\s?е\.?)/i,
  wide: /^(пред нашата ера|нашата ера)/i
};
var parseEraPatterns$u = {
  any: [/^п/i, /^н/i]
};
var matchQuarterPatterns$u = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[врт]?и?)? кв.?/i,
  wide: /^[1234](-?[врт]?и?)? квартал/i
};
var parseQuarterPatterns$u = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchDayPatterns$u = {
  narrow: /^[нпвсч]/i,
  short: /^(не|по|вт|ср|че|пе|са)/i,
  abbreviated: /^(нед|пон|вто|сре|чет|пет|саб)/i,
  wide: /^(недела|понеделник|вторник|среда|четврток|петок|сабота)/i
};
var parseDayPatterns$u = {
  narrow: [/^н/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^н[ед]/i, /^п[он]/i, /^вт/i, /^ср/i, /^ч[ет]/i, /^п[ет]/i, /^с[аб]/i]
};
var matchMonthPatterns$u = {
  abbreviated: /^(јан|фев|мар|апр|мај|јун|јул|авг|сеп|окт|ноем|дек)/i,
  wide: /^(јануари|февруари|март|април|мај|јуни|јули|август|септември|октомври|ноември|декември)/i
};
var parseMonthPatterns$u = {
  any: [/^ја/i, /^Ф/i, /^мар/i, /^ап/i, /^мај/i, /^јун/i, /^јул/i, /^ав/i, /^се/i, /^окт/i, /^но/i, /^де/i]
};
var matchDayPeriodPatterns$u = {
  any: /^(претп|попл|полноќ|утро|пладне|вечер|ноќ)/i
};
var parseDayPeriodPatterns$u = {
  any: {
    am: /претпладне/i,
    pm: /попладне/i,
    midnight: /полноќ/i,
    noon: /напладне/i,
    morning: /наутро/i,
    afternoon: /попладне/i,
    evening: /навечер/i,
    night: /ноќе/i
  }
};
var match$u = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$u,
    parsePattern: parseOrdinalNumberPattern$u,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$u,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$u,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$u,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$u,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$u,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$u,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$u,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$u,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$u,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$u,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Macedonian locale.
 * @language Macedonian
 * @iso-639-2 mkd
 * @author Petar Vlahu [@vlahupetar]{@link https://github.com/vlahupetar}
 * @author Altrim Beqiri [@altrim]{@link https://github.com/altrim}
 */

var locale$u = {
  code: 'mk',
  formatDistance: formatDistance$u,
  formatLong: formatLong$u,
  formatRelative: formatRelative$u,
  localize: localize$u,
  match: match$u,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$s = {
  lessThanXSeconds: {
    one: 'секунд хүрэхгүй',
    other: '{{count}} секунд хүрэхгүй'
  },
  xSeconds: {
    one: '1 секунд',
    other: '{{count}} секунд'
  },
  halfAMinute: 'хагас минут',
  lessThanXMinutes: {
    one: 'минут хүрэхгүй',
    other: '{{count}} минут хүрэхгүй'
  },
  xMinutes: {
    one: '1 минут',
    other: '{{count}} минут'
  },
  aboutXHours: {
    one: 'ойролцоогоор 1 цаг',
    other: 'ойролцоогоор {{count}} цаг'
  },
  xHours: {
    one: '1 цаг',
    other: '{{count}} цаг'
  },
  xDays: {
    one: '1 өдөр',
    other: '{{count}} өдөр'
  },
  aboutXWeeks: {
    one: 'ойролцоогоор 1 долоо хоног',
    other: 'ойролцоогоор {{count}} долоо хоног'
  },
  xWeeks: {
    one: '1 долоо хоног',
    other: '{{count}} долоо хоног'
  },
  aboutXMonths: {
    one: 'ойролцоогоор 1 сар',
    other: 'ойролцоогоор {{count}} сар'
  },
  xMonths: {
    one: '1 сар',
    other: '{{count}} сар'
  },
  aboutXYears: {
    one: 'ойролцоогоор 1 жил',
    other: 'ойролцоогоор {{count}} жил'
  },
  xYears: {
    one: '1 жил',
    other: '{{count}} жил'
  },
  overXYears: {
    one: '1 жил гаран',
    other: '{{count}} жил гаран'
  },
  almostXYears: {
    one: 'бараг 1 жил',
    other: 'бараг {{count}} жил'
  }
};
function formatDistance$t(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$s[token] === 'string') {
    result = formatDistanceLocale$s[token];
  } else if (count === 1) {
    result = formatDistanceLocale$s[token].one;
  } else {
    result = formatDistanceLocale$s[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    /**
     * Append genitive case
     */
    var words = result.split(' ');
    var lastword = words.pop();
    result = words.join(' ');

    switch (lastword) {
      case 'секунд':
        result += ' секундийн';
        break;

      case 'минут':
        result += ' минутын';
        break;

      case 'цаг':
        result += ' цагийн';
        break;

      case 'өдөр':
        result += ' өдрийн';
        break;

      case 'сар':
        result += ' сарын';
        break;

      case 'жил':
        result += ' жилийн';
        break;

      case 'хоног':
        result += ' хоногийн';
        break;

      case 'гаран':
        result += ' гараны';
        break;

      case 'хүрэхгүй':
        result += ' хүрэхгүй хугацааны';
        break;

      default:
        result += lastword + '-н';
    }

    if (options.comparison > 0) {
      return result + ' дараа';
    } else {
      return result + ' өмнө';
    }
  }

  return result;
}

var dateFormats$t = {
  full: "y 'оны' MMMM'ын' d, EEEE 'гараг'",
  long: "y 'оны' MMMM'ын' d",
  medium: "y 'оны' MMM'ын' d",
  short: 'y.MM.dd'
};
var timeFormats$t = {
  full: 'H:mm:ss zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$t = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$t = {
  date: buildFormatLongFn({
    formats: dateFormats$t,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$t,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$t,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$t = {
  lastWeek: "'өнгөрсөн' eeee 'гарагийн' p 'цагт'",
  yesterday: "'өчигдөр' p 'цагт'",
  today: "'өнөөдөр' p 'цагт'",
  tomorrow: "'маргааш' p 'цагт'",
  nextWeek: "'ирэх' eeee 'гарагийн' p 'цагт'",
  other: 'P'
};
function formatRelative$t(token, _date, _baseDate, _options) {
  return formatRelativeLocale$t[token];
}

var eraValues$t = {
  narrow: ['НТӨ', 'НТ'],
  abbreviated: ['НТӨ', 'НТ'],
  wide: ['нийтийн тооллын өмнөх', 'нийтийн тооллын']
};
var quarterValues$t = {
  narrow: ['I', 'II', 'III', 'IV'],
  abbreviated: ['I улирал', 'II улирал', 'III улирал', 'IV улирал'],
  wide: ['1-р улирал', '2-р улирал', '3-р улирал', '4-р улирал']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$t = {
  narrow: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
  abbreviated: ['1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар', '7-р сар', '8-р сар', '9-р сар', '10-р сар', '11-р сар', '12-р сар'],
  wide: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долоодугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арваннэгдүгээр сар', 'Арван хоёрдугаар сар']
};
var formattingMonthValues$6 = {
  narrow: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
  abbreviated: ['1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар', '7-р сар', '8-р сар', '9-р сар', '10-р сар', '11-р сар', '12-р сар'],
  wide: ['нэгдүгээр сар', 'хоёрдугаар сар', 'гуравдугаар сар', 'дөрөвдүгээр сар', 'тавдугаар сар', 'зургаадугаар сар', 'долоодугаар сар', 'наймдугаар сар', 'есдүгээр сар', 'аравдугаар сар', 'арваннэгдүгээр сар', 'арван хоёрдугаар сар']
};
var dayValues$t = {
  narrow: ['Н', 'Д', 'М', 'Л', 'П', 'Б', 'Б'],
  short: ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'],
  abbreviated: ['Ням', 'Дав', 'Мяг', 'Лха', 'Пүр', 'Баа', 'Бям'],
  wide: ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба']
};
var formattingDayValues = {
  narrow: ['Н', 'Д', 'М', 'Л', 'П', 'Б', 'Б'],
  short: ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'],
  abbreviated: ['Ням', 'Дав', 'Мяг', 'Лха', 'Пүр', 'Баа', 'Бям'],
  wide: ['ням', 'даваа', 'мягмар', 'лхагва', 'пүрэв', 'баасан', 'бямба']
};
var dayPeriodValues$s = {
  narrow: {
    am: 'ү.ө.',
    pm: 'ү.х.',
    midnight: 'шөнө дунд',
    noon: 'үд дунд',
    morning: 'өглөө',
    afternoon: 'өдөр',
    evening: 'орой',
    night: 'шөнө'
  },
  abbreviated: {
    am: 'ү.ө.',
    pm: 'ү.х.',
    midnight: 'шөнө дунд',
    noon: 'үд дунд',
    morning: 'өглөө',
    afternoon: 'өдөр',
    evening: 'орой',
    night: 'шөнө'
  },
  wide: {
    am: 'ү.ө.',
    pm: 'ү.х.',
    midnight: 'шөнө дунд',
    noon: 'үд дунд',
    morning: 'өглөө',
    afternoon: 'өдөр',
    evening: 'орой',
    night: 'шөнө'
  }
};

function ordinalNumber$t(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  return number;
}

var localize$t = {
  ordinalNumber: ordinalNumber$t,
  era: buildLocalizeFn({
    values: eraValues$t,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$t,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$t,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$6,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$t,
    defaultWidth: 'wide',
    formattingValues: formattingDayValues,
    defaultFormattingWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$s,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$t = /\d+/i;
var parseOrdinalNumberPattern$t = /\d+/i;
var matchEraPatterns$t = {
  narrow: /^(нтө|нт)/i,
  abbreviated: /^(нтө|нт)/i,
  wide: /^(нийтийн тооллын өмнө|нийтийн тооллын)/i
};
var parseEraPatterns$t = {
  any: [/^(нтө|нийтийн тооллын өмнө)/i, /^(нт|нийтийн тооллын)/i]
};
var matchQuarterPatterns$t = {
  narrow: /^(iv|iii|ii|i)/i,
  abbreviated: /^(iv|iii|ii|i) улирал/i,
  wide: /^[1-4]-р улирал/i
};
var parseQuarterPatterns$t = {
  any: [/^(i(\s|$)|1)/i, /^(ii(\s|$)|2)/i, /^(iii(\s|$)|3)/i, /^(iv(\s|$)|4)/i]
};
var matchMonthPatterns$t = {
  narrow: /^(xii|xi|x|ix|viii|vii|vi|v|iv|iii|ii|i)/i,
  abbreviated: /^(1-р сар|2-р сар|3-р сар|4-р сар|5-р сар|6-р сар|7-р сар|8-р сар|9-р сар|10-р сар|11-р сар|12-р сар)/i,
  wide: /^(нэгдүгээр сар|хоёрдугаар сар|гуравдугаар сар|дөрөвдүгээр сар|тавдугаар сар|зургаадугаар сар|долоодугаар сар|наймдугаар сар|есдүгээр сар|аравдугаар сар|арван нэгдүгээр сар|арван хоёрдугаар сар)/i
};
var parseMonthPatterns$t = {
  narrow: [/^i$/i, /^ii$/i, /^iii$/i, /^iv$/i, /^v$/i, /^vi$/i, /^vii$/i, /^viii$/i, /^ix$/i, /^x$/i, /^xi$/i, /^xii$/i],
  any: [/^(1|нэгдүгээр)/i, /^(2|хоёрдугаар)/i, /^(3|гуравдугаар)/i, /^(4|дөрөвдүгээр)/i, /^(5|тавдугаар)/i, /^(6|зургаадугаар)/i, /^(7|долоодугаар)/i, /^(8|наймдугаар)/i, /^(9|есдүгээр)/i, /^(10|аравдугаар)/i, /^(11|арван нэгдүгээр)/i, /^(12|арван хоёрдугаар)/i]
};
var matchDayPatterns$t = {
  narrow: /^[ндмлпбб]/i,
  short: /^(ня|да|мя|лх|пү|ба|бя)/i,
  abbreviated: /^(ням|дав|мяг|лха|пүр|баа|бям)/i,
  wide: /^(ням|даваа|мягмар|лхагва|пүрэв|баасан|бямба)/i
};
var parseDayPatterns$t = {
  narrow: [/^н/i, /^д/i, /^м/i, /^л/i, /^п/i, /^б/i, /^б/i],
  any: [/^ня/i, /^да/i, /^мя/i, /^лх/i, /^пү/i, /^ба/i, /^бя/i]
};
var matchDayPeriodPatterns$t = {
  narrow: /^(ү\.ө\.|ү\.х\.|шөнө дунд|үд дунд|өглөө|өдөр|орой|шөнө)/i,
  any: /^(ү\.ө\.|ү\.х\.|шөнө дунд|үд дунд|өглөө|өдөр|орой|шөнө)/i
};
var parseDayPeriodPatterns$t = {
  any: {
    am: /^ү\.ө\./i,
    pm: /^ү\.х\./i,
    midnight: /^шөнө дунд/i,
    noon: /^үд дунд/i,
    morning: /өглөө/i,
    afternoon: /өдөр/i,
    evening: /орой/i,
    night: /шөнө/i
  }
};
var match$t = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$t,
    parsePattern: parseOrdinalNumberPattern$t,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$t,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$t,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$t,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$t,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$t,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$t,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$t,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$t,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$t,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$t,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Mongolian locale.
 * @language Mongolian
 * @iso-639-2 mon
 * @author Bilguun Ochirbat [@bilguun0203]{@link https://github.com/bilguun0203}
 */

var locale$t = {
  code: 'mn',
  formatDistance: formatDistance$t,
  formatLong: formatLong$t,
  formatRelative: formatRelative$t,
  localize: localize$t,
  match: match$t,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$r = {
  lessThanXSeconds: {
    one: 'kurang dari 1 saat',
    other: 'kurang dari {{count}} saat'
  },
  xSeconds: {
    one: '1 saat',
    other: '{{count}} saat'
  },
  halfAMinute: 'setengah minit',
  lessThanXMinutes: {
    one: 'kurang dari 1 minit',
    other: 'kurang dari {{count}} minit'
  },
  xMinutes: {
    one: '1 minit',
    other: '{{count}} minit'
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
function formatDistance$s(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$r[token] === 'string') {
    result = formatDistanceLocale$r[token];
  } else if (count === 1) {
    result = formatDistanceLocale$r[token].one;
  } else {
    result = formatDistanceLocale$r[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'dalam masa ' + result;
    } else {
      return result + ' yang lalu';
    }
  }

  return result;
}

var dateFormats$s = {
  full: 'EEEE, d MMMM yyyy',
  long: 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  short: 'd/M/yyyy'
};
var timeFormats$s = {
  full: 'HH.mm.ss',
  long: 'HH.mm.ss',
  medium: 'HH.mm',
  short: 'HH.mm'
};
var dateTimeFormats$s = {
  full: "{{date}} 'pukul' {{time}}",
  long: "{{date}} 'pukul' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$s = {
  date: buildFormatLongFn({
    formats: dateFormats$s,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$s,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$s,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$s = {
  lastWeek: "eeee 'lepas pada jam' p",
  yesterday: "'Semalam pada jam' p",
  today: "'Hari ini pada jam' p",
  tomorrow: "'Esok pada jam' p",
  nextWeek: "eeee 'pada jam' p",
  other: 'P'
};
function formatRelative$s(token, _date, _baseDate, _options) {
  return formatRelativeLocale$s[token];
}

// https://www.unicode.org/cldr/charts/32/summary/ms.html

var eraValues$s = {
  narrow: ['SM', 'M'],
  abbreviated: ['SM', 'M'],
  wide: ['Sebelum Masihi', 'Masihi']
};
var quarterValues$s = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['S1', 'S2', 'S3', 'S4'],
  wide: ['Suku pertama', 'Suku kedua', 'Suku ketiga', 'Suku keempat']
}; // Note: in Malay, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$s = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'O', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'],
  wide: ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember']
};
var dayValues$s = {
  narrow: ['A', 'I', 'S', 'R', 'K', 'J', 'S'],
  short: ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
  abbreviated: ['Ahd', 'Isn', 'Sel', 'Rab', 'Kha', 'Jum', 'Sab'],
  wide: ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu']
};
var dayPeriodValues$r = {
  narrow: {
    am: 'am',
    pm: 'pm',
    midnight: 'tgh malam',
    noon: 'tgh hari',
    morning: 'pagi',
    afternoon: 'tengah hari',
    evening: 'petang',
    night: 'malam'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tengah malam',
    noon: 'tengah hari',
    morning: 'pagi',
    afternoon: 'tengah hari',
    evening: 'petang',
    night: 'malam'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'tengah malam',
    noon: 'tengah hari',
    morning: 'pagi',
    afternoon: 'tengah hari',
    evening: 'petang',
    night: 'malam'
  }
};
var formattingDayPeriodValues$m = {
  narrow: {
    am: 'am',
    pm: 'pm',
    midnight: 'tengah malam',
    noon: 'tengah hari',
    morning: 'pagi',
    afternoon: 'tengah hari',
    evening: 'petang',
    night: 'malam'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tengah malam',
    noon: 'tengah hari',
    morning: 'pagi',
    afternoon: 'tengah hari',
    evening: 'petang',
    night: 'malam'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'tengah malam',
    noon: 'tengah hari',
    morning: 'pagi',
    afternoon: 'tengah hari',
    evening: 'petang',
    night: 'malam'
  }
};

function ordinalNumber$s(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber); // Can't use "pertama", "kedua" because can't be parsed

  switch (number) {
    default:
      return 'ke-' + number;
  }
}

var localize$s = {
  ordinalNumber: ordinalNumber$s,
  era: buildLocalizeFn({
    values: eraValues$s,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$s,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$s,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$s,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$r,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$m,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$s = /^ke-(\d+)?/i;
var parseOrdinalNumberPattern$s = /petama|\d+/i;
var matchEraPatterns$s = {
  narrow: /^(sm|m)/i,
  abbreviated: /^(s\.?\s?m\.?|m\.?)/i,
  wide: /^(sebelum masihi|masihi)/i
};
var parseEraPatterns$s = {
  any: [/^s/i, /^(m)/i]
};
var matchQuarterPatterns$s = {
  narrow: /^[1234]/i,
  abbreviated: /^S[1234]/i,
  wide: /Suku (pertama|kedua|ketiga|keempat)/i
};
var parseQuarterPatterns$s = {
  any: [/pertama|1/i, /kedua|2/i, /ketiga|3/i, /keempat|4/i]
};
var matchMonthPatterns$s = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mac|apr|mei|jun|jul|ogo|sep|okt|nov|dis)/i,
  wide: /^(januari|februari|mac|april|mei|jun|julai|ogos|september|oktober|november|disember)/i
};
var parseMonthPatterns$s = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^o/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^ma/i, /^ap/i, /^me/i, /^jun/i, /^jul/i, /^og/i, /^s/i, /^ok/i, /^n/i, /^d/i]
};
var matchDayPatterns$s = {
  narrow: /^[aisrkj]/i,
  short: /^(ahd|isn|sel|rab|kha|jum|sab)/i,
  abbreviated: /^(ahd|isn|sel|rab|kha|jum|sab)/i,
  wide: /^(ahad|isnin|selasa|rabu|khamis|jumaat|sabtu)/i
};
var parseDayPatterns$s = {
  narrow: [/^a/i, /^i/i, /^s/i, /^r/i, /^k/i, /^j/i, /^s/i],
  any: [/^a/i, /^i/i, /^se/i, /^r/i, /^k/i, /^j/i, /^sa/i]
};
var matchDayPeriodPatterns$s = {
  narrow: /^(am|pm|tengah malam|tengah hari|pagi|petang|malam)/i,
  any: /^([ap]\.?\s?m\.?|tengah malam|tengah hari|pagi|petang|malam)/i
};
var parseDayPeriodPatterns$s = {
  any: {
    am: /^a/i,
    pm: /^pm/i,
    midnight: /^tengah m/i,
    noon: /^tengah h/i,
    morning: /pa/i,
    afternoon: /tengah h/i,
    evening: /pe/i,
    night: /m/i
  }
};
var match$s = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$s,
    parsePattern: parseOrdinalNumberPattern$s,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$s,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$s,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$s,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$s,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$s,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$s,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$s,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$s,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$s,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$s,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Malay locale.
 * @language Malay
 * @iso-639-2 msa
 * @author Ruban Selvarajah [@Zyten]{@link https://github.com/Zyten}
 */

var locale$s = {
  code: 'ms',
  formatDistance: formatDistance$s,
  formatLong: formatLong$s,
  formatRelative: formatRelative$s,
  localize: localize$s,
  match: match$s,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$q = {
  lessThanXSeconds: {
    one: 'inqas minn sekonda',
    other: 'inqas minn {{count}} sekondi'
  },
  xSeconds: {
    one: 'sekonda',
    other: '{{count}} sekondi'
  },
  halfAMinute: 'nofs minuta',
  lessThanXMinutes: {
    one: 'inqas minn minuta',
    other: 'inqas minn {{count}} minuti'
  },
  xMinutes: {
    one: 'minuta',
    other: '{{count}} minuti'
  },
  aboutXHours: {
    one: 'madwar siegħa',
    other: 'madwar {{count}} siegħat'
  },
  xHours: {
    one: 'siegħa',
    other: '{{count}} siegħat'
  },
  xDays: {
    one: 'ġurnata',
    other: '{{count}} ġranet'
  },
  aboutXWeeks: {
    one: 'madwar ġimgħa',
    other: 'madwar {{count}} ġimgħat'
  },
  xWeeks: {
    one: 'ġimgħa',
    other: '{{count}} ġimgħat'
  },
  aboutXMonths: {
    one: 'madwar xahar',
    other: 'madwar {{count}} xhur'
  },
  xMonths: {
    one: 'xahar',
    other: '{{count}} xhur'
  },
  aboutXYears: {
    one: 'madwar sena',
    two: 'madwar sentejn',
    other: 'madwar {{count}} snin'
  },
  xYears: {
    one: 'sena',
    two: 'sentejn',
    other: '{{count}} snin'
  },
  overXYears: {
    one: 'aktar minn sena',
    two: 'aktar minn sentejn',
    other: 'aktar minn {{count}} snin'
  },
  almostXYears: {
    one: 'kważi sena',
    two: 'kważi sentejn',
    other: 'kważi {{count}} snin'
  }
};
function formatDistance$r(token, count, options) {
  options = options || {};
  var adverb = token.match(/years/i);
  var result;

  if (typeof formatDistanceLocale$q[token] === 'string') {
    result = formatDistanceLocale$q[token];
  } else if (count === 1) {
    result = formatDistanceLocale$q[token].one;
  } else if (count === 2 && adverb) {
    result = formatDistanceLocale$q[token].two;
  } else {
    result = formatDistanceLocale$q[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "f'" + result;
    } else {
      return result + ' ilu';
    }
  }

  return result;
}

var dateFormats$r = {
  full: 'EEEE, d MMMM yyyy',
  long: 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  short: 'dd/MM/yyyy'
};
var timeFormats$r = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$r = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$r = {
  date: buildFormatLongFn({
    formats: dateFormats$r,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$r,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$r,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$r = {
  lastWeek: "eeee 'li għadda' 'fil-'p",
  yesterday: "'Il-bieraħ fil-'p",
  today: "'Illum fil-'p",
  tomorrow: "'Għada fil-'p",
  nextWeek: "eeee 'fil-'p",
  other: 'P'
};
function formatRelative$r(token, _date, _baseDate, _options) {
  return formatRelativeLocale$r[token];
}

var eraValues$r = {
  narrow: ['Q', 'W'],
  abbreviated: ['QK', 'WK'],
  wide: ['qabel Kristu', 'wara Kristu']
};
var quarterValues$r = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['K1', 'K2', 'K3', 'K4'],
  wide: ['1. kwart', '2. kwart', '3. kwart', '4. kwart']
};
var monthValues$r = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'Ġ', 'L', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Fra', 'Mar', 'Apr', 'Mej', 'Ġun', 'Lul', 'Aww', 'Set', 'Ott', 'Nov', 'Diċ'],
  wide: ['Jannar', 'Frar', 'Marzu', 'April', 'Mejju', 'Ġunju', 'Lulju', 'Awwissu', 'Settembru', 'Ottubru', 'Novembru', 'Diċembru']
};
var dayValues$r = {
  narrow: ['Ħ', 'T', 'T', 'E', 'Ħ', 'Ġ', 'S'],
  short: ['Ħa', 'Tn', 'Tl', 'Er', 'Ħa', 'Ġi', 'Si'],
  abbreviated: ['Ħad', 'Tne', 'Tli', 'Erb', 'Ħam', 'Ġim', 'Sib'],
  wide: ['Il-Ħadd', 'It-Tnejn', 'It-Tlieta', 'L-Erbgħa', 'Il-Ħamis', 'Il-Ġimgħa', 'Is-Sibt']
};
var dayPeriodValues$q = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'nofsillejl',
    noon: 'nofsinhar',
    morning: 'għodwa',
    afternoon: 'wara nofsinhar',
    evening: 'filgħaxija',
    night: 'lejl'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'nofsillejl',
    noon: 'nofsinhar',
    morning: 'għodwa',
    afternoon: 'wara nofsinhar',
    evening: 'filgħaxija',
    night: 'lejl'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'nofsillejl',
    noon: 'nofsinhar',
    morning: 'għodwa',
    afternoon: 'wara nofsinhar',
    evening: 'filgħaxija',
    night: 'lejl'
  }
};
var formattingDayPeriodValues$l = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: "f'nofsillejl",
    noon: "f'nofsinhar",
    morning: 'filgħodu',
    afternoon: 'wara nofsinhar',
    evening: 'filgħaxija',
    night: 'billejl'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: "f'nofsillejl",
    noon: "f'nofsinhar",
    morning: 'filgħodu',
    afternoon: 'wara nofsinhar',
    evening: 'filgħaxija',
    night: 'billejl'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: "f'nofsillejl",
    noon: "f'nofsinhar",
    morning: 'filgħodu',
    afternoon: 'wara nofsinhar',
    evening: 'filgħaxija',
    night: 'billejl'
  }
};

function ordinalNumber$r(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + 'º';
}

var localize$r = {
  ordinalNumber: ordinalNumber$r,
  era: buildLocalizeFn({
    values: eraValues$r,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$r,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$r,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$r,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$q,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$l,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$r = /^(\d+)(º)?/i;
var parseOrdinalNumberPattern$r = /\d+/i;
var matchEraPatterns$r = {
  narrow: /^(q|w)/i,
  abbreviated: /^(q\.?\s?k\.?|b\.?\s?c\.?\s?e\.?|w\.?\s?k\.?)/i,
  wide: /^(qabel kristu|before common era|wara kristu|common era)/i
};
var parseEraPatterns$r = {
  any: [/^(q|b)/i, /^(w|c)/i]
};
var matchQuarterPatterns$r = {
  narrow: /^[1234]/i,
  abbreviated: /^k[1234]/i,
  wide: /^[1234](\.)? kwart/i
};
var parseQuarterPatterns$r = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$r = {
  narrow: /^[jfmaglsond]/i,
  abbreviated: /^(jan|fra|mar|apr|mej|ġun|lul|aww|set|ott|nov|diċ)/i,
  wide: /^(jannar|frar|marzu|april|mejju|ġunju|lulju|awwissu|settembru|ottubru|novembru|diċembru)/i
};
var parseMonthPatterns$r = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^ġ/i, /^l/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^mej/i, /^ġ/i, /^l/i, /^aw/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$r = {
  narrow: /^[ħteġs]/i,
  short: /^(ħa|tn|tl|er|ħa|ġi|si)/i,
  abbreviated: /^(ħad|tne|tli|erb|ħam|ġim|sib)/i,
  wide: /^(il-ħadd|it-tnejn|it-tlieta|l-erbgħa|il-ħamis|il-ġimgħa|is-sibt)/i
};
var parseDayPatterns$r = {
  narrow: [/^ħ/i, /^t/i, /^t/i, /^e/i, /^ħ/i, /^ġ/i, /^s/i],
  any: [/^(il-)?ħad/i, /^(it-)?tn/i, /^(it-)?tl/i, /^(l-)?er/i, /^(il-)?ham/i, /^(il-)?ġi/i, /^(is-)?si/i]
};
var matchDayPeriodPatterns$r = {
  narrow: /^(a|p|f'nofsillejl|f'nofsinhar|(ta') (għodwa|wara nofsinhar|filgħaxija|lejl))/i,
  any: /^([ap]\.?\s?m\.?|f'nofsillejl|f'nofsinhar|(ta') (għodwa|wara nofsinhar|filgħaxija|lejl))/i
};
var parseDayPeriodPatterns$r = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^f'nofsillejl/i,
    noon: /^f'nofsinhar/i,
    morning: /għodwa/i,
    afternoon: /wara(\s.*)nofsinhar/i,
    evening: /filgħaxija/i,
    night: /lejl/i
  }
};
var match$r = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$r,
    parsePattern: parseOrdinalNumberPattern$r,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$r,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$r,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$r,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$r,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$r,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$r,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$r,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$r,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$r,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$r,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Maltese locale.
 * @language Maltese
 * @iso-639-2 mlt
 * @author Andras Matzon [@amatzon](@link https://github.com/amatzon)
 * @author Bryan Borg [@bryanMt](@link https://github.com/bryanMt)
 */

var locale$r = {
  code: 'mt',
  formatDistance: formatDistance$r,
  formatLong: formatLong$r,
  formatRelative: formatRelative$r,
  localize: localize$r,
  match: match$r,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$p = {
  lessThanXSeconds: {
    singular: 'mindre enn ett sekund',
    plural: 'mindre enn {{count}} sekunder'
  },
  xSeconds: {
    singular: 'ett sekund',
    plural: '{{count}} sekunder'
  },
  halfAMinute: 'et halvt minutt',
  lessThanXMinutes: {
    singular: 'mindre enn ett minutt',
    plural: 'mindre enn {{count}} minutter'
  },
  xMinutes: {
    singular: 'ett minutt',
    plural: '{{count}} minutter'
  },
  aboutXHours: {
    singular: 'omtrent en time',
    plural: 'omtrent {{count}} timer'
  },
  xHours: {
    singular: 'en time',
    plural: '{{count}} timer'
  },
  xDays: {
    singular: 'en dag',
    plural: '{{count}} dager'
  },
  aboutXWeeks: {
    singular: 'omtrent en uke',
    plural: 'omtrent {{count}} uker'
  },
  xWeeks: {
    singular: 'en uke',
    plural: '{{count}} uker'
  },
  aboutXMonths: {
    singular: 'omtrent en måned',
    plural: 'omtrent {{count}} måneder'
  },
  xMonths: {
    singular: 'en måned',
    plural: '{{count}} måneder'
  },
  aboutXYears: {
    singular: 'omtrent ett år',
    plural: 'omtrent {{count}} år'
  },
  xYears: {
    singular: 'ett år',
    plural: '{{count}} år'
  },
  overXYears: {
    singular: 'over ett år',
    plural: 'over {{count}} år'
  },
  almostXYears: {
    singular: 'nesten ett år',
    plural: 'nesten {{count}} år'
  }
};
function formatDistance$q(token, count, options) {
  options = options || {};
  var translation = formatDistanceLocale$p[token];
  var result;

  if (typeof translation === 'string') {
    result = translation;
  } else if (count === 0 || count > 1) {
    result = translation.plural.replace('{{count}}', count);
  } else {
    result = translation.singular;
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'om ' + result;
    } else {
      return result + ' siden';
    }
  }

  return result;
}

var dateFormats$q = {
  full: 'EEEE d. MMMM y',
  long: 'd. MMMM y',
  medium: 'd. MMM y',
  short: 'dd.MM.y'
};
var timeFormats$q = {
  full: "'kl'. HH:mm:ss zzzz",
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$q = {
  full: "{{date}} 'kl.' {{time}}",
  long: "{{date}} 'kl.' {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$q = {
  date: buildFormatLongFn({
    formats: dateFormats$q,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$q,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$q,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$q = {
  lastWeek: "'forrige' eeee 'kl.' p",
  yesterday: "'i går kl.' p",
  today: "'i dag kl.' p",
  tomorrow: "'i morgen kl.' p",
  nextWeek: "EEEE 'kl.' p",
  other: 'P'
};
function formatRelative$q(token, _date, _baseDate, _options) {
  return formatRelativeLocale$q[token];
}

var eraValues$q = {
  narrow: ['f.Kr.', 'e.Kr.'],
  abbreviated: ['f.Kr.', 'e.Kr.'],
  wide: ['før Kristus', 'etter Kristus']
};
var quarterValues$q = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1. kvartal', '2. kvartal', '3. kvartal', '4. kvartal']
};
var monthValues$q = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['jan.', 'feb.', 'mars', 'apr.', 'mai', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'des.'],
  wide: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']
};
var dayValues$q = {
  narrow: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
  short: ['sø', 'ma', 'ti', 'on', 'to', 'fr', 'lø'],
  abbreviated: ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'],
  wide: ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag']
};
var dayPeriodValues$p = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'midnatt',
    noon: 'middag',
    morning: 'på morg.',
    afternoon: 'på etterm.',
    evening: 'på kvelden',
    night: 'på natten'
  },
  abbreviated: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnatt',
    noon: 'middag',
    morning: 'på morg.',
    afternoon: 'på etterm.',
    evening: 'på kvelden',
    night: 'på natten'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnatt',
    noon: 'middag',
    morning: 'på morgenen',
    afternoon: 'på ettermiddagen',
    evening: 'på kvelden',
    night: 'på natten'
  }
};

function ordinalNumber$q(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + '.';
}

var localize$q = {
  ordinalNumber: ordinalNumber$q,
  era: buildLocalizeFn({
    values: eraValues$q,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$q,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$q,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$q,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$p,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$q = /^(\d+)\.?/i;
var parseOrdinalNumberPattern$q = /\d+/i;
var matchEraPatterns$q = {
  narrow: /^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,
  abbreviated: /^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,
  wide: /^(før Kristus|før vår tid|etter Kristus|vår tid)/i
};
var parseEraPatterns$q = {
  any: [/^f/i, /^e/i]
};
var matchQuarterPatterns$q = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? kvartal/i
};
var parseQuarterPatterns$q = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$q = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mars?|apr|mai|juni?|juli?|aug|sep|okt|nov|des)\.?/i,
  wide: /^(januar|februar|mars|april|mai|juni|juli|august|september|oktober|november|desember)/i
};
var parseMonthPatterns$q = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^mai/i, /^jun/i, /^jul/i, /^aug/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$q = {
  narrow: /^[smtofl]/i,
  short: /^(sø|ma|ti|on|to|fr|lø)/i,
  abbreviated: /^(søn|man|tir|ons|tor|fre|lør)/i,
  wide: /^(søndag|mandag|tirsdag|onsdag|torsdag|fredag|lørdag)/i
};
var parseDayPatterns$q = {
  any: [/^s/i, /^m/i, /^ti/i, /^o/i, /^to/i, /^f/i, /^l/i]
};
var matchDayPeriodPatterns$q = {
  narrow: /^(midnatt|middag|(på) (morgenen|ettermiddagen|kvelden|natten)|[ap])/i,
  any: /^([ap]\.?\s?m\.?|midnatt|middag|(på) (morgenen|ettermiddagen|kvelden|natten))/i
};
var parseDayPeriodPatterns$q = {
  any: {
    am: /^a(\.?\s?m\.?)?$/i,
    pm: /^p(\.?\s?m\.?)?$/i,
    midnight: /^midn/i,
    noon: /^midd/i,
    morning: /morgen/i,
    afternoon: /ettermiddag/i,
    evening: /kveld/i,
    night: /natt/i
  }
};
var match$q = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$q,
    parsePattern: parseOrdinalNumberPattern$q,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$q,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$q,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$q,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$q,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$q,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$q,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$q,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$q,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$q,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$q,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Norwegian Bokmål locale.
 * @language Norwegian Bokmål
 * @iso-639-2 nob
 * @author Hans-Kristian Koren [@Hanse]{@link https://github.com/Hanse}
 * @author Mikolaj Grzyb [@mikolajgrzyb]{@link https://github.com/mikolajgrzyb}
 * @author Dag Stuan [@dagstuan]{@link https://github.com/dagstuan}
 */

var locale$q = {
  code: 'nb',
  formatDistance: formatDistance$q,
  formatLong: formatLong$q,
  formatRelative: formatRelative$q,
  localize: localize$q,
  match: match$q,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$o = {
  lessThanXSeconds: {
    one: 'minder dan een seconde',
    other: 'minder dan {{count}} seconden'
  },
  xSeconds: {
    one: '1 seconde',
    other: '{{count}} seconden'
  },
  halfAMinute: 'een halve minuut',
  lessThanXMinutes: {
    one: 'minder dan een minuut',
    other: 'minder dan {{count}} minuten'
  },
  xMinutes: {
    one: 'een minuut',
    other: '{{count}} minuten'
  },
  aboutXHours: {
    one: 'ongeveer 1 uur',
    other: 'ongeveer {{count}} uur'
  },
  xHours: {
    one: '1 uur',
    other: '{{count}} uur'
  },
  xDays: {
    one: '1 dag',
    other: '{{count}} dagen'
  },
  aboutXWeeks: {
    one: 'ongeveer 1 week',
    other: 'ongeveer {{count}} weken'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weken'
  },
  aboutXMonths: {
    one: 'ongeveer 1 maand',
    other: 'ongeveer {{count}} maanden'
  },
  xMonths: {
    one: '1 maand',
    other: '{{count}} maanden'
  },
  aboutXYears: {
    one: 'ongeveer 1 jaar',
    other: 'ongeveer {{count}} jaar'
  },
  xYears: {
    one: '1 jaar',
    other: '{{count}} jaar'
  },
  overXYears: {
    one: 'meer dan 1 jaar',
    other: 'meer dan {{count}} jaar'
  },
  almostXYears: {
    one: 'bijna 1 jaar',
    other: 'bijna {{count}} jaar'
  }
};
function formatDistance$p(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$o[token] === 'string') {
    result = formatDistanceLocale$o[token];
  } else if (count === 1) {
    result = formatDistanceLocale$o[token].one;
  } else {
    result = formatDistanceLocale$o[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'over ' + result;
    } else {
      return result + ' geleden';
    }
  }

  return result;
}

var dateFormats$p = {
  full: 'EEEE d MMMM y',
  long: 'd MMMM y',
  medium: 'd MMM y',
  short: 'dd-MM-y'
};
var timeFormats$p = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$p = {
  full: "{{date}} 'om' {{time}}",
  long: "{{date}} 'om' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$p = {
  date: buildFormatLongFn({
    formats: dateFormats$p,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$p,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$p,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$p = {
  lastWeek: "'afgelopen' eeee 'om' p",
  yesterday: "'gisteren om' p",
  today: "'vandaag om' p",
  tomorrow: "'morgen om' p",
  nextWeek: "eeee 'om' p",
  other: 'P'
};
function formatRelative$p(token, _date, _baseDate, _options) {
  return formatRelativeLocale$p[token];
}

var eraValues$p = {
  narrow: ['v.C.', 'n.C.'],
  abbreviated: ['v.Chr.', 'n.Chr.'],
  wide: ['voor Christus', 'na Christus']
};
var quarterValues$p = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['K1', 'K2', 'K3', 'K4'],
  wide: ['1e kwartaal', '2e kwartaal', '3e kwartaal', '4e kwartaal']
};
var monthValues$p = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
  wide: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
};
var dayValues$p = {
  narrow: ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'],
  short: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  abbreviated: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'],
  wide: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag']
};
var dayPeriodValues$o = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'middernacht',
    noon: 'het middaguur',
    morning: "'s ochtends",
    afternoon: "'s middags",
    evening: "'s avonds",
    night: "'s nachts"
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'middernacht',
    noon: 'het middaguur',
    morning: "'s ochtends",
    afternoon: "'s middags",
    evening: "'s avonds",
    night: "'s nachts"
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'middernacht',
    noon: 'het middaguur',
    morning: "'s ochtends",
    afternoon: "'s middags",
    evening: "'s avonds",
    night: "'s nachts"
  }
};

function ordinalNumber$p(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + 'e';
}

var localize$p = {
  ordinalNumber: ordinalNumber$p,
  era: buildLocalizeFn({
    values: eraValues$p,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$p,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$p,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$p,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$o,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$p = /^(\d+)e?/i;
var parseOrdinalNumberPattern$p = /\d+/i;
var matchEraPatterns$p = {
  narrow: /^([vn]\.? ?C\.?)/,
  abbreviated: /^([vn]\. ?Chr\.?)/,
  wide: /^((voor|na) Christus)/
};
var parseEraPatterns$p = {
  any: [/^v/, /^n/]
};
var matchQuarterPatterns$p = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^[1234]e kwartaal/i
};
var parseQuarterPatterns$p = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$p = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mrt.|apr.|mei|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,
  wide: /^(januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)/i
};
var parseMonthPatterns$p = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^jan/i, /^feb/i, /^m(r|a)/i, /^apr/i, /^mei/i, /^jun/i, /^jul/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i]
};
var matchDayPatterns$p = {
  narrow: /^[zmdwv]/i,
  short: /^(zo|ma|di|wo|do|vr|za)/i,
  abbreviated: /^(zon|maa|din|woe|don|vri|zat)/i,
  wide: /^(zondag|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag)/i
};
var parseDayPatterns$p = {
  narrow: [/^z/i, /^m/i, /^d/i, /^w/i, /^d/i, /^v/i, /^z/i],
  any: [/^zo/i, /^ma/i, /^di/i, /^wo/i, /^do/i, /^vr/i, /^za/i]
};
var matchDayPeriodPatterns$p = {
  any: /^(am|pm|middernacht|het middaguur|'s (ochtends|middags|avonds|nachts))/i
};
var parseDayPeriodPatterns$p = {
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /^middernacht/i,
    noon: /^het middaguur/i,
    morning: /ochtend/i,
    afternoon: /middag/i,
    evening: /avond/i,
    night: /nacht/i
  }
};
var match$p = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$p,
    parsePattern: parseOrdinalNumberPattern$p,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$p,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$p,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$p,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$p,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$p,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$p,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$p,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$p,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$p,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$p,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Dutch locale.
 * @language Dutch
 * @iso-639-2 nld
 * @author Jorik Tangelder [@jtangelder]{@link https://github.com/jtangelder}
 * @author Ruben Stolk [@rubenstolk]{@link https://github.com/rubenstolk}
 * @author Lode Vanhove [@bitcrumb]{@link https://github.com/bitcrumb}
 * @author Edo Rivai [@edorivai]{@link https://github.com/edorivai}
 * @author Niels Keurentjes [@curry684]{@link https://github.com/curry684}
 * @author Stefan Vermaas [@stefanvermaas]{@link https://github.com/stefanvermaas}
 */

var locale$p = {
  code: 'nl',
  formatDistance: formatDistance$p,
  formatLong: formatLong$p,
  formatRelative: formatRelative$p,
  localize: localize$p,
  match: match$p,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$n = {
  lessThanXSeconds: {
    one: 'minder dan een seconde',
    other: 'minder dan {{count}} seconden'
  },
  xSeconds: {
    one: '1 seconde',
    other: '{{count}} seconden'
  },
  halfAMinute: 'een halve minuut',
  lessThanXMinutes: {
    one: 'minder dan een minuut',
    other: 'minder dan {{count}} minuten'
  },
  xMinutes: {
    one: 'een minuut',
    other: '{{count}} minuten'
  },
  aboutXHours: {
    one: 'ongeveer 1 uur',
    other: 'ongeveer {{count}} uur'
  },
  xHours: {
    one: '1 uur',
    other: '{{count}} uur'
  },
  xDays: {
    one: '1 dag',
    other: '{{count}} dagen'
  },
  aboutXWeeks: {
    one: 'ongeveer 1 week',
    other: 'ongeveer {{count}} weken'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weken'
  },
  aboutXMonths: {
    one: 'ongeveer 1 maand',
    other: 'ongeveer {{count}} maanden'
  },
  xMonths: {
    one: '1 maand',
    other: '{{count}} maanden'
  },
  aboutXYears: {
    one: 'ongeveer 1 jaar',
    other: 'ongeveer {{count}} jaar'
  },
  xYears: {
    one: '1 jaar',
    other: '{{count}} jaar'
  },
  overXYears: {
    one: 'meer dan 1 jaar',
    other: 'meer dan {{count}} jaar'
  },
  almostXYears: {
    one: 'bijna 1 jaar',
    other: 'bijna {{count}} jaar'
  }
};
function formatDistance$o(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$n[token] === 'string') {
    result = formatDistanceLocale$n[token];
  } else if (count === 1) {
    result = formatDistanceLocale$n[token].one;
  } else {
    result = formatDistanceLocale$n[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'over ' + result;
    } else {
      return result + ' geleden';
    }
  }

  return result;
}

var dateFormats$o = {
  full: 'EEEE d MMMM y',
  long: 'd MMMM y',
  medium: 'd MMM y',
  short: 'dd.MM.y'
};
var timeFormats$o = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$o = {
  full: "{{date}} 'om' {{time}}",
  long: "{{date}} 'om' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$o = {
  date: buildFormatLongFn({
    formats: dateFormats$o,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$o,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$o,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$o = {
  lastWeek: "'vorige' eeee 'om' p",
  yesterday: "'gisteren om' p",
  today: "'vandaag om' p",
  tomorrow: "'morgen om' p",
  nextWeek: "eeee 'om' p",
  other: 'P'
};
function formatRelative$o(token, _date, _baseDate, _options) {
  return formatRelativeLocale$o[token];
}

var eraValues$o = {
  narrow: ['v.C.', 'n.C.'],
  abbreviated: ['v.Chr.', 'n.Chr.'],
  wide: ['voor Christus', 'na Christus']
};
var quarterValues$o = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['K1', 'K2', 'K3', 'K4'],
  wide: ['1e kwartaal', '2e kwartaal', '3e kwartaal', '4e kwartaal']
};
var monthValues$o = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
  wide: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december']
};
var dayValues$o = {
  narrow: ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'],
  short: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
  abbreviated: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'],
  wide: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag']
};
var dayPeriodValues$n = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'middernacht',
    noon: 'het middag',
    morning: "'s ochtends",
    afternoon: "'s namiddags",
    evening: "'s avonds",
    night: "'s nachts"
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'middernacht',
    noon: 'het middag',
    morning: "'s ochtends",
    afternoon: "'s namiddags",
    evening: "'s avonds",
    night: "'s nachts"
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'middernacht',
    noon: 'het middag',
    morning: "'s ochtends",
    afternoon: "'s namiddags",
    evening: "'s avonds",
    night: "'s nachts"
  }
};

function ordinalNumber$o(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + 'e';
}

var localize$o = {
  ordinalNumber: ordinalNumber$o,
  era: buildLocalizeFn({
    values: eraValues$o,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$o,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$o,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$o,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$n,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$o = /^(\d+)e?/i;
var parseOrdinalNumberPattern$o = /\d+/i;
var matchEraPatterns$o = {
  narrow: /^([vn]\.? ?C\.?)/,
  abbreviated: /^([vn]\. ?Chr\.?)/,
  wide: /^((voor|na) Christus)/
};
var parseEraPatterns$o = {
  any: [/^v/, /^n/]
};
var matchQuarterPatterns$o = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^[1234]e kwartaal/i
};
var parseQuarterPatterns$o = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$o = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan.|feb.|mrt.|apr.|mei|jun.|jul.|aug.|sep.|okt.|nov.|dec.)/i,
  wide: /^(januari|februari|maart|april|mei|juni|juli|augustus|september|oktober|november|december)/i
};
var parseMonthPatterns$o = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^jan/i, /^feb/i, /^m(r|a)/i, /^apr/i, /^mei/i, /^jun/i, /^jul/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i]
};
var matchDayPatterns$o = {
  narrow: /^[zmdwv]/i,
  short: /^(zo|ma|di|wo|do|vr|za)/i,
  abbreviated: /^(zon|maa|din|woe|don|vri|zat)/i,
  wide: /^(zondag|maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag)/i
};
var parseDayPatterns$o = {
  narrow: [/^z/i, /^m/i, /^d/i, /^w/i, /^d/i, /^v/i, /^z/i],
  any: [/^zo/i, /^ma/i, /^di/i, /^wo/i, /^do/i, /^vr/i, /^za/i]
};
var matchDayPeriodPatterns$o = {
  any: /^(am|pm|middernacht|het middaguur|'s (ochtends|middags|avonds|nachts))/i
};
var parseDayPeriodPatterns$o = {
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /^middernacht/i,
    noon: /^het middaguur/i,
    morning: /ochtend/i,
    afternoon: /middag/i,
    evening: /avond/i,
    night: /nacht/i
  }
};
var match$o = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$o,
    parsePattern: parseOrdinalNumberPattern$o,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$o,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$o,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$o,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$o,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$o,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$o,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$o,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$o,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$o,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$o,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Dutch locale.
 * @language Dutch
 * @iso-639-2 nld
 * @author Jorik Tangelder [@jtangelder]{@link https://github.com/jtangelder}
 * @author Ruben Stolk [@rubenstolk]{@link https://github.com/rubenstolk}
 * @author Lode Vanhove [@bitcrumb]{@link https://github.com/bitcrumb}
 * @author Alex Hoeing [@dcbn]{@link https://github.com/dcbn}
 */

var locale$o = {
  code: 'nl-BE',
  formatDistance: formatDistance$o,
  formatLong: formatLong$o,
  formatRelative: formatRelative$o,
  localize: localize$o,
  match: match$o,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$m = {
  lessThanXSeconds: {
    singular: 'mindre enn eitt sekund',
    plural: 'mindre enn {{count}} sekund'
  },
  xSeconds: {
    singular: 'eitt sekund',
    plural: '{{count}} sekund'
  },
  halfAMinute: 'eit halvt minutt',
  lessThanXMinutes: {
    singular: 'mindre enn eitt minutt',
    plural: 'mindre enn {{count}} minutt'
  },
  xMinutes: {
    singular: 'eitt minutt',
    plural: '{{count}} minutt'
  },
  aboutXHours: {
    singular: 'omtrent ein time',
    plural: 'omtrent {{count}} timar'
  },
  xHours: {
    singular: 'ein time',
    plural: '{{count}} timar'
  },
  xDays: {
    singular: 'ein dag',
    plural: '{{count}} dagar'
  },
  aboutXWeeks: {
    singular: 'omtrent ei veke',
    plural: 'omtrent {{count}} veker'
  },
  xWeeks: {
    singular: 'ei veke',
    plural: '{{count}} veker'
  },
  aboutXMonths: {
    singular: 'omtrent ein månad',
    plural: 'omtrent {{count}} månader'
  },
  xMonths: {
    singular: 'ein månad',
    plural: '{{count}} månader'
  },
  aboutXYears: {
    singular: 'omtrent eitt år',
    plural: 'omtrent {{count}} år'
  },
  xYears: {
    singular: 'eitt år',
    plural: '{{count}} år'
  },
  overXYears: {
    singular: 'over eitt år',
    plural: 'over {{count}} år'
  },
  almostXYears: {
    singular: 'nesten eitt år',
    plural: 'nesten {{count}} år'
  }
};
var wordMapping$1 = ['null', 'ein', 'to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve', 'tolv'];
function formatDistance$n(token, count, options) {
  options = options || {
    onlyNumeric: false
  };
  var translation = formatDistanceLocale$m[token];
  var result;

  if (typeof translation === 'string') {
    result = translation;
  } else if (count === 0 || count > 1) {
    if (options.onlyNumeric) {
      result = translation.plural.replace('{{count}}', count);
    } else {
      result = translation.plural.replace('{{count}}', count < 13 ? wordMapping$1[count] : count);
    }
  } else {
    result = translation.singular;
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'om ' + result;
    } else {
      return result + ' sidan';
    }
  }

  return result;
}

var dateFormats$n = {
  full: 'EEEE d. MMMM y',
  long: 'd. MMMM y',
  medium: 'd. MMM y',
  short: 'dd.MM.y'
};
var timeFormats$n = {
  full: "'kl'. HH:mm:ss zzzz",
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$n = {
  full: "{{date}} 'kl.' {{time}}",
  long: "{{date}} 'kl.' {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$n = {
  date: buildFormatLongFn({
    formats: dateFormats$n,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$n,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$n,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$n = {
  lastWeek: "'førre' eeee 'kl.' p",
  yesterday: "'i går kl.' p",
  today: "'i dag kl.' p",
  tomorrow: "'i morgon kl.' p",
  nextWeek: "EEEE 'kl.' p",
  other: 'P'
};
function formatRelative$n(token, _date, _baseDate, _options) {
  return formatRelativeLocale$n[token];
}

var eraValues$n = {
  narrow: ['f.Kr.', 'e.Kr.'],
  abbreviated: ['f.Kr.', 'e.Kr.'],
  wide: ['før Kristus', 'etter Kristus']
};
var quarterValues$n = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1. kvartal', '2. kvartal', '3. kvartal', '4. kvartal']
};
var monthValues$n = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['jan.', 'feb.', 'mars', 'apr.', 'mai', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'des.'],
  wide: ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember']
};
var dayValues$n = {
  narrow: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
  short: ['su', 'må', 'ty', 'on', 'to', 'fr', 'lau'],
  abbreviated: ['sun', 'mån', 'tys', 'ons', 'tor', 'fre', 'laur'],
  wide: ['sundag', 'måndag', 'tysdag', 'onsdag', 'torsdag', 'fredag', 'laurdag']
};
var dayPeriodValues$m = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'midnatt',
    noon: 'middag',
    morning: 'på morg.',
    afternoon: 'på etterm.',
    evening: 'på kvelden',
    night: 'på natta'
  },
  abbreviated: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnatt',
    noon: 'middag',
    morning: 'på morg.',
    afternoon: 'på etterm.',
    evening: 'på kvelden',
    night: 'på natta'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnatt',
    noon: 'middag',
    morning: 'på morgonen',
    afternoon: 'på ettermiddagen',
    evening: 'på kvelden',
    night: 'på natta'
  }
};

function ordinalNumber$n(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + '.';
}

var localize$n = {
  ordinalNumber: ordinalNumber$n,
  era: buildLocalizeFn({
    values: eraValues$n,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$n,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$n,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$n,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$m,
    defaultWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$n = /^(\d+)\.?/i;
var parseOrdinalNumberPattern$n = /\d+/i;
var matchEraPatterns$n = {
  narrow: /^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,
  abbreviated: /^(f\.? ?Kr\.?|fvt\.?|e\.? ?Kr\.?|evt\.?)/i,
  wide: /^(før Kristus|før vår tid|etter Kristus|vår tid)/i
};
var parseEraPatterns$n = {
  any: [/^f/i, /^e/i]
};
var matchQuarterPatterns$n = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? kvartal/i
};
var parseQuarterPatterns$n = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$n = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mars?|apr|mai|juni?|juli?|aug|sep|okt|nov|des)\.?/i,
  wide: /^(januar|februar|mars|april|mai|juni|juli|august|september|oktober|november|desember)/i
};
var parseMonthPatterns$n = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^mai/i, /^jun/i, /^jul/i, /^aug/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$n = {
  narrow: /^[smtofl]/i,
  short: /^(su|må|ty|on|to|fr|la)/i,
  abbreviated: /^(sun|mån|tys|ons|tor|fre|laur)/i,
  wide: /^(sundag|måndag|tysdag|onsdag|torsdag|fredag|laurdag)/i
};
var parseDayPatterns$n = {
  any: [/^s/i, /^m/i, /^ty/i, /^o/i, /^to/i, /^f/i, /^l/i]
};
var matchDayPeriodPatterns$n = {
  narrow: /^(midnatt|middag|(på) (morgonen|ettermiddagen|kvelden|natta)|[ap])/i,
  any: /^([ap]\.?\s?m\.?|midnatt|middag|(på) (morgonen|ettermiddagen|kvelden|natta))/i
};
var parseDayPeriodPatterns$n = {
  any: {
    am: /^a(\.?\s?m\.?)?$/i,
    pm: /^p(\.?\s?m\.?)?$/i,
    midnight: /^midn/i,
    noon: /^midd/i,
    morning: /morgon/i,
    afternoon: /ettermiddag/i,
    evening: /kveld/i,
    night: /natt/i
  }
};
var match$n = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$n,
    parsePattern: parseOrdinalNumberPattern$n,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$n,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$n,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$n,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$n,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$n,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$n,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$n,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$n,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$n,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$n,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Norwegian Nynorsk locale.
 * @language Norwegian Nynorsk
 * @iso-639-2 nno
 * @author Mats Byrkjeland [@draperunner]{@link https://github.com/draperunner}
 */

var locale$n = {
  code: 'nn',
  formatDistance: formatDistance$n,
  formatLong: formatLong$n,
  formatRelative: formatRelative$n,
  localize: localize$n,
  match: match$n,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

function declensionGroup$1(scheme, count) {
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

function declension$3(scheme, count, time) {
  time = time || 'regular';
  var group = declensionGroup$1(scheme, count);
  var finalText = group[time] || group;
  return finalText.replace('{{count}}', count);
}

var formatDistanceLocale$l = {
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
function formatDistance$m(token, count, options) {
  options = options || {};
  var scheme = formatDistanceLocale$l[token];

  if (!options.addSuffix) {
    return declension$3(scheme, count);
  }

  if (options.comparison > 0) {
    return 'za ' + declension$3(scheme, count, 'future');
  } else {
    return declension$3(scheme, count, 'past') + ' temu';
  }
}

var dateFormats$m = {
  full: 'EEEE, do MMMM y',
  long: 'do MMMM y',
  medium: 'do MMM y',
  short: 'dd.MM.y'
};
var timeFormats$m = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$m = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$m = {
  date: buildFormatLongFn({
    formats: dateFormats$m,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$m,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$m,
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

var formatRelativeLocale$m = {
  lastWeek: dayAndTimeWithAdjective,
  yesterday: "'wczoraj o' p",
  today: "'dzisiaj o' p",
  tomorrow: "'jutro o' p",
  nextWeek: dayAndTimeWithAdjective,
  other: 'P'
};
function formatRelative$m(token, date, baseDate, options) {
  var format = formatRelativeLocale$m[token];

  if (typeof format === 'function') {
    return format(token, date, baseDate, options);
  }

  return format;
}

function ordinalNumber$m(dirtyNumber) {
  var number = Number(dirtyNumber);
  return String(number);
}

var eraValues$m = {
  narrow: ['p.n.e.', 'n.e.'],
  abbreviated: ['p.n.e.', 'n.e.'],
  wide: ['przed naszą erą', 'naszej ery']
};
var quarterValues$m = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['I kw.', 'II kw.', 'III kw.', 'IV kw.'],
  wide: ['I kwartał', 'II kwartał', 'III kwartał', 'IV kwartał']
};
var monthValues$m = {
  narrow: ['S', 'L', 'M', 'K', 'M', 'C', 'L', 'S', 'W', 'P', 'L', 'G'],
  abbreviated: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
  wide: ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień']
};
var monthFormattingValues = {
  narrow: ['s', 'l', 'm', 'k', 'm', 'c', 'l', 's', 'w', 'p', 'l', 'g'],
  abbreviated: ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'],
  wide: ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']
};
var dayValues$m = {
  narrow: ['N', 'P', 'W', 'Ś', 'C', 'P', 'S'],
  short: ['nie', 'pon', 'wto', 'śro', 'czw', 'pią', 'sob'],
  abbreviated: ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
  wide: ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota']
};
var dayFormattingValues = {
  narrow: ['n', 'p', 'w', 'ś', 'c', 'p', 's'],
  short: ['nie', 'pon', 'wto', 'śro', 'czw', 'pią', 'sob'],
  abbreviated: ['niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.'],
  wide: ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota']
};
var dayPeriodValues$l = {
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
var localize$m = {
  ordinalNumber: ordinalNumber$m,
  era: buildLocalizeFn({
    values: eraValues$m,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$m,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$m,
    defaultWidth: 'wide',
    formattingValues: monthFormattingValues,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$m,
    defaultWidth: 'wide',
    formattingValues: dayFormattingValues,
    defaultFormattingWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$l,
    defaultWidth: 'wide',
    formattingValues: dayPeriodFormattingValues,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$m = /^(\d+)?/i;
var parseOrdinalNumberPattern$m = /\d+/i;
var matchEraPatterns$m = {
  narrow: /^(p\.?\s*n\.?\s*e\.?\s*|n\.?\s*e\.?\s*)/i,
  abbreviated: /^(p\.?\s*n\.?\s*e\.?\s*|n\.?\s*e\.?\s*)/i,
  wide: /^(przed\s*nasz(ą|a)\s*er(ą|a)|naszej\s*ery)/i
};
var parseEraPatterns$m = {
  any: [/^p/i, /^n/i]
};
var matchQuarterPatterns$m = {
  narrow: /^[1234]/i,
  abbreviated: /^(I|II|III|IV)\s*kw\.?/i,
  wide: /^(I|II|III|IV)\s*kwarta(ł|l)/i
};
var parseQuarterPatterns$m = {
  narrow: [/1/i, /2/i, /3/i, /4/i],
  any: [/^I kw/i, /^II kw/i, /^III kw/i, /^IV kw/i]
};
var matchMonthPatterns$m = {
  narrow: /^[slmkcwpg]/i,
  abbreviated: /^(sty|lut|mar|kwi|maj|cze|lip|sie|wrz|pa(ź|z)|lis|gru)/i,
  wide: /^(stycznia|stycze(ń|n)|lutego|luty|marca|marzec|kwietnia|kwiecie(ń|n)|maja|maj|czerwca|czerwiec|lipca|lipiec|sierpnia|sierpie(ń|n)|wrze(ś|s)nia|wrzesie(ń|n)|pa(ź|z)dziernika|pa(ź|z)dziernik|listopada|listopad|grudnia|grudzie(ń|n))/i
};
var parseMonthPatterns$m = {
  narrow: [/^s/i, /^l/i, /^m/i, /^k/i, /^m/i, /^c/i, /^l/i, /^s/i, /^w/i, /^p/i, /^l/i, /^g/i],
  any: [/^st/i, /^lu/i, /^mar/i, /^k/i, /^maj/i, /^c/i, /^lip/i, /^si/i, /^w/i, /^p/i, /^lis/i, /^g/i]
};
var matchDayPatterns$m = {
  narrow: /^[npwścs]/i,
  short: /^(nie|pon|wto|(ś|s)ro|czw|pi(ą|a)|sob)/i,
  abbreviated: /^(niedz|pon|wt|(ś|s)r|czw|pt|sob)\.?/i,
  wide: /^(niedziela|poniedzia(ł|l)ek|wtorek|(ś|s)roda|czwartek|pi(ą|a)tek|sobota)/i
};
var parseDayPatterns$m = {
  narrow: [/^n/i, /^p/i, /^w/i, /^ś/i, /^c/i, /^p/i, /^s/i],
  abbreviated: [/^n/i, /^po/i, /^w/i, /^(ś|s)r/i, /^c/i, /^pt/i, /^so/i],
  any: [/^n/i, /^po/i, /^w/i, /^(ś|s)r/i, /^c/i, /^pi/i, /^so/i]
};
var matchDayPeriodPatterns$m = {
  narrow: /^(^a$|^p$|pó(ł|l)n\.?|o\s*pó(ł|l)n\.?|po(ł|l)\.?|w\s*po(ł|l)\.?|po\s*po(ł|l)\.?|rano|wiecz\.?|noc|w\s*nocy)/i,
  any: /^(am|pm|pó(ł|l)noc|o\s*pó(ł|l)nocy|po(ł|l)udnie|w\s*po(ł|l)udnie|popo(ł|l)udnie|po\s*po(ł|l)udniu|rano|wieczór|wieczorem|noc|w\s*nocy)/i
};
var parseDayPeriodPatterns$m = {
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
var match$m = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$m,
    parsePattern: parseOrdinalNumberPattern$m,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$m,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$m,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$m,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$m,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$m,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$m,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$m,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$m,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$m,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$m,
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

var locale$m = {
  code: 'pl',
  formatDistance: formatDistance$m,
  formatLong: formatLong$m,
  formatRelative: formatRelative$m,
  localize: localize$m,
  match: match$m,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$k = {
  lessThanXSeconds: {
    one: 'menos de um segundo',
    other: 'menos de {{count}} segundos'
  },
  xSeconds: {
    one: '1 segundo',
    other: '{{count}} segundos'
  },
  halfAMinute: 'meio minuto',
  lessThanXMinutes: {
    one: 'menos de um minuto',
    other: 'menos de {{count}} minutos'
  },
  xMinutes: {
    one: '1 minuto',
    other: '{{count}} minutos'
  },
  aboutXHours: {
    one: 'aproximadamente 1 hora',
    other: 'aproximadamente {{count}} horas'
  },
  xHours: {
    one: '1 hora',
    other: '{{count}} horas'
  },
  xDays: {
    one: '1 dia',
    other: '{{count}} dias'
  },
  aboutXWeeks: {
    one: 'aproximadamente 1 semana',
    other: 'aproximadamente {{count}} semanas'
  },
  xWeeks: {
    one: '1 semana',
    other: '{{count}} semanas'
  },
  aboutXMonths: {
    one: 'aproximadamente 1 mês',
    other: 'aproximadamente {{count}} meses'
  },
  xMonths: {
    one: '1 mês',
    other: '{{count}} meses'
  },
  aboutXYears: {
    one: 'aproximadamente 1 ano',
    other: 'aproximadamente {{count}} anos'
  },
  xYears: {
    one: '1 ano',
    other: '{{count}} anos'
  },
  overXYears: {
    one: 'mais de 1 ano',
    other: 'mais de {{count}} anos'
  },
  almostXYears: {
    one: 'quase 1 ano',
    other: 'quase {{count}} anos'
  }
};
function formatDistance$l(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$k[token] === 'string') {
    result = formatDistanceLocale$k[token];
  } else if (count === 1) {
    result = formatDistanceLocale$k[token].one;
  } else {
    result = formatDistanceLocale$k[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'daqui a ' + result;
    } else {
      return 'há ' + result;
    }
  }

  return result;
}

var dateFormats$l = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d 'de' MMM 'de' y",
  short: 'dd/MM/y'
};
var timeFormats$l = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$l = {
  full: "{{date}} 'às' {{time}}",
  long: "{{date}} 'às' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$l = {
  date: buildFormatLongFn({
    formats: dateFormats$l,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$l,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$l,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$l = {
  lastWeek: "'na última' eeee 'às' p",
  yesterday: "'ontem às' p",
  today: "'hoje às' p",
  tomorrow: "'amanhã às' p",
  nextWeek: "eeee 'às' p",
  other: 'P'
};
function formatRelative$l(token, _date, _baseDate, _options) {
  return formatRelativeLocale$l[token];
}

function ordinalNumber$l(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number + 'º';
}

var eraValues$l = {
  narrow: ['aC', 'dC'],
  abbreviated: ['a.C.', 'd.C.'],
  wide: ['antes de Cristo', 'depois de Cristo']
};
var quarterValues$l = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['T1', 'T2', 'T3', 'T4'],
  wide: ['1º trimestre', '2º trimestre', '3º trimestre', '4º trimestre']
};
var monthValues$l = {
  narrow: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
  abbreviated: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  wide: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
};
var dayValues$l = {
  narrow: ['d', 's', 't', 'q', 'q', 's', 's'],
  short: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  abbreviated: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
  wide: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
};
var dayPeriodValues$k = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'meia-noite',
    noon: 'meio-dia',
    morning: 'manhã',
    afternoon: 'tarde',
    evening: 'noite',
    night: 'madrugada'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'meia-noite',
    noon: 'meio-dia',
    morning: 'manhã',
    afternoon: 'tarde',
    evening: 'noite',
    night: 'madrugada'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'meia-noite',
    noon: 'meio-dia',
    morning: 'manhã',
    afternoon: 'tarde',
    evening: 'noite',
    night: 'madrugada'
  }
};
var formattingDayPeriodValues$k = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'meia-noite',
    noon: 'meio-dia',
    morning: 'da manhã',
    afternoon: 'da tarde',
    evening: 'da noite',
    night: 'da madrugada'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'meia-noite',
    noon: 'meio-dia',
    morning: 'da manhã',
    afternoon: 'da tarde',
    evening: 'da noite',
    night: 'da madrugada'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'meia-noite',
    noon: 'meio-dia',
    morning: 'da manhã',
    afternoon: 'da tarde',
    evening: 'da noite',
    night: 'da madrugada'
  }
};
var localize$l = {
  ordinalNumber: ordinalNumber$l,
  era: buildLocalizeFn({
    values: eraValues$l,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$l,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$l,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$l,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$k,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$k,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$l = /^(\d+)(º|ª)?/i;
var parseOrdinalNumberPattern$l = /\d+/i;
var matchEraPatterns$l = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes da era comum|depois de cristo|era comum)/i
};
var parseEraPatterns$l = {
  any: [/^ac/i, /^dc/i],
  wide: [/^(antes de cristo|antes da era comum)/i, /^(depois de cristo|era comum)/i]
};
var matchQuarterPatterns$l = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º|ª)? trimestre/i
};
var parseQuarterPatterns$l = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$l = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
  wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
};
var parseMonthPatterns$l = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ab/i, /^mai/i, /^jun/i, /^jul/i, /^ag/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$l = {
  narrow: /^[dstq]/i,
  short: /^(dom|seg|ter|qua|qui|sex|s[áa]b)/i,
  abbreviated: /^(dom|seg|ter|qua|qui|sex|s[áa]b)/i,
  wide: /^(domingo|segunda-?\s?feira|terça-?\s?feira|quarta-?\s?feira|quinta-?\s?feira|sexta-?\s?feira|s[áa]bado)/i
};
var parseDayPatterns$l = {
  narrow: [/^d/i, /^s/i, /^t/i, /^q/i, /^q/i, /^s/i, /^s/i],
  any: [/^d/i, /^seg/i, /^t/i, /^qua/i, /^qui/i, /^sex/i, /^s[áa]/i]
};
var matchDayPeriodPatterns$l = {
  narrow: /^(a|p|meia-?\s?noite|meio-?\s?dia|(da) (manh[ãa]|tarde|noite|madrugada))/i,
  any: /^([ap]\.?\s?m\.?|meia-?\s?noite|meio-?\s?dia|(da) (manh[ãa]|tarde|noite|madrugada))/i
};
var parseDayPeriodPatterns$l = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^meia/i,
    noon: /^meio/i,
    morning: /manh[ãa]/i,
    afternoon: /tarde/i,
    evening: /noite/i,
    night: /madrugada/i
  }
};
var match$l = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$l,
    parsePattern: parseOrdinalNumberPattern$l,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$l,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$l,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$l,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$l,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$l,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$l,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$l,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$l,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$l,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$l,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Portuguese locale.
 * @language Portuguese
 * @iso-639-2 por
 * @author Dário Freire [@dfreire]{@link https://github.com/dfreire}
 * @author Adrián de la Rosa [@adrm]{@link https://github.com/adrm}
 */

var locale$l = {
  code: 'pt',
  formatDistance: formatDistance$l,
  formatLong: formatLong$l,
  formatRelative: formatRelative$l,
  localize: localize$l,
  match: match$l,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$j = {
  lessThanXSeconds: {
    one: 'menos de um segundo',
    other: 'menos de {{count}} segundos'
  },
  xSeconds: {
    one: '1 segundo',
    other: '{{count}} segundos'
  },
  halfAMinute: 'meio minuto',
  lessThanXMinutes: {
    one: 'menos de um minuto',
    other: 'menos de {{count}} minutos'
  },
  xMinutes: {
    one: '1 minuto',
    other: '{{count}} minutos'
  },
  aboutXHours: {
    one: 'cerca de 1 hora',
    other: 'cerca de {{count}} horas'
  },
  xHours: {
    one: '1 hora',
    other: '{{count}} horas'
  },
  xDays: {
    one: '1 dia',
    other: '{{count}} dias'
  },
  aboutXWeeks: {
    one: 'cerca de 1 semana',
    other: 'cerca de {{count}} semanas'
  },
  xWeeks: {
    one: '1 semana',
    other: '{{count}} semanas'
  },
  aboutXMonths: {
    one: 'cerca de 1 mês',
    other: 'cerca de {{count}} meses'
  },
  xMonths: {
    one: '1 mês',
    other: '{{count}} meses'
  },
  aboutXYears: {
    one: 'cerca de 1 ano',
    other: 'cerca de {{count}} anos'
  },
  xYears: {
    one: '1 ano',
    other: '{{count}} anos'
  },
  overXYears: {
    one: 'mais de 1 ano',
    other: 'mais de {{count}} anos'
  },
  almostXYears: {
    one: 'quase 1 ano',
    other: 'quase {{count}} anos'
  }
};
function formatDistance$k(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$j[token] === 'string') {
    result = formatDistanceLocale$j[token];
  } else if (count === 1) {
    result = formatDistanceLocale$j[token].one;
  } else {
    result = formatDistanceLocale$j[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'em ' + result;
    } else {
      return 'há ' + result;
    }
  }

  return result;
}

var dateFormats$k = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: 'd MMM y',
  short: 'dd/MM/yyyy'
};
var timeFormats$k = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$k = {
  full: "{{date}} 'às' {{time}}",
  long: "{{date}} 'às' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$k = {
  date: buildFormatLongFn({
    formats: dateFormats$k,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$k,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$k,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$k = {
  lastWeek: function (date, _baseDate, _options) {
    var weekday = date.getUTCDay();
    var last = weekday === 0 || weekday === 6 ? 'último' : 'última';
    return "'" + last + "' eeee 'às' p";
  },
  yesterday: "'ontem às' p",
  today: "'hoje às' p",
  tomorrow: "'amanhã às' p",
  nextWeek: "eeee 'às' p",
  other: 'P'
};
function formatRelative$k(token, date, baseDate, options) {
  var format = formatRelativeLocale$k[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
}

var eraValues$k = {
  narrow: ['AC', 'DC'],
  abbreviated: ['AC', 'DC'],
  wide: ['antes de cristo', 'depois de cristo']
};
var quarterValues$k = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['T1', 'T2', 'T3', 'T4'],
  wide: ['1º trimestre', '2º trimestre', '3º trimestre', '4º trimestre']
};
var monthValues$k = {
  narrow: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
  abbreviated: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
  wide: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
};
var dayValues$k = {
  narrow: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  short: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],
  abbreviated: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'],
  wide: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']
};
var dayPeriodValues$j = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mn',
    noon: 'md',
    morning: 'manhã',
    afternoon: 'tarde',
    evening: 'tarde',
    night: 'noite'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'meia-noite',
    noon: 'meio-dia',
    morning: 'manhã',
    afternoon: 'tarde',
    evening: 'tarde',
    night: 'noite'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'meia-noite',
    noon: 'meio-dia',
    morning: 'manhã',
    afternoon: 'tarde',
    evening: 'tarde',
    night: 'noite'
  }
};
var formattingDayPeriodValues$j = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mn',
    noon: 'md',
    morning: 'da manhã',
    afternoon: 'da tarde',
    evening: 'da tarde',
    night: 'da noite'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'meia-noite',
    noon: 'meio-dia',
    morning: 'da manhã',
    afternoon: 'da tarde',
    evening: 'da tarde',
    night: 'da noite'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'meia-noite',
    noon: 'meio-dia',
    morning: 'da manhã',
    afternoon: 'da tarde',
    evening: 'da tarde',
    night: 'da noite'
  }
};

function ordinalNumber$k(dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber);
  var options = dirtyOptions || {};
  var unit = String(options.unit);

  if (unit === 'week' || unit === 'isoWeek') {
    return number + 'ª';
  }

  return number + 'º';
}

var localize$k = {
  ordinalNumber: ordinalNumber$k,
  era: buildLocalizeFn({
    values: eraValues$k,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$k,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$k,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$k,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$j,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$j,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$k = /^(\d+)[ºªo]?/i;
var parseOrdinalNumberPattern$k = /\d+/i;
var matchEraPatterns$k = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|d\.?\s?c\.?)/i,
  wide: /^(antes de cristo|depois de cristo)/i
};
var parseEraPatterns$k = {
  any: [/^ac/i, /^dc/i],
  wide: [/^antes de cristo/i, /^depois de cristo/i]
};
var matchQuarterPatterns$k = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
var parseQuarterPatterns$k = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$k = {
  narrow: /^[jfmajsond]/i,
  abbreviated: /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)/i,
  wide: /^(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)/i
};
var parseMonthPatterns$k = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^fev/i, /^mar/i, /^abr/i, /^mai/i, /^jun/i, /^jul/i, /^ago/i, /^set/i, /^out/i, /^nov/i, /^dez/i]
};
var matchDayPatterns$k = {
  narrow: /^(dom|[23456]ª?|s[aá]b)/i,
  short: /^(dom|[23456]ª?|s[aá]b)/i,
  abbreviated: /^(dom|seg|ter|qua|qui|sex|s[aá]b)/i,
  wide: /^(domingo|(segunda|ter[cç]a|quarta|quinta|sexta)([- ]feira)?|s[aá]bado)/i
};
var parseDayPatterns$k = {
  short: [/^d/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^s[aá]/i],
  narrow: [/^d/i, /^2/i, /^3/i, /^4/i, /^5/i, /^6/i, /^s[aá]/i],
  any: [/^d/i, /^seg/i, /^t/i, /^qua/i, /^qui/i, /^sex/i, /^s[aá]b/i]
};
var matchDayPeriodPatterns$k = {
  narrow: /^(a|p|mn|md|(da) (manhã|tarde|noite))/i,
  any: /^([ap]\.?\s?m\.?|meia[-\s]noite|meio[-\s]dia|(da) (manhã|tarde|noite))/i
};
var parseDayPeriodPatterns$k = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn|^meia[-\s]noite/i,
    noon: /^md|^meio[-\s]dia/i,
    morning: /manhã/i,
    afternoon: /tarde/i,
    evening: /tarde/i,
    night: /noite/i
  }
};
var match$k = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$k,
    parsePattern: parseOrdinalNumberPattern$k,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$k,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$k,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$k,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$k,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$k,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$k,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$k,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$k,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$k,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$k,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Portuguese locale (Brazil).
 * @language Portuguese
 * @iso-639-2 por
 * @author Lucas Duailibe [@duailibe]{@link https://github.com/duailibe}
 * @author Yago Carballo [@yagocarballo]{@link https://github.com/YagoCarballo}
 */

var locale$k = {
  code: 'pt-BR',
  formatDistance: formatDistance$k,
  formatLong: formatLong$k,
  formatRelative: formatRelative$k,
  localize: localize$k,
  match: match$k,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$i = {
  lessThanXSeconds: {
    one: 'mai puțin de o secundă',
    other: 'mai puțin de {{count}} secunde'
  },
  xSeconds: {
    one: '1 secundă',
    other: '{{count}} secunde'
  },
  halfAMinute: 'jumătate de minut',
  lessThanXMinutes: {
    one: 'mai puțin de un minut',
    other: 'mai puțin de {{count}} minute'
  },
  xMinutes: {
    one: '1 minut',
    other: '{{count}} minute'
  },
  aboutXHours: {
    one: 'circa 1 oră',
    other: 'circa {{count}} ore'
  },
  xHours: {
    one: '1 oră',
    other: '{{count}} ore'
  },
  xDays: {
    one: '1 zi',
    other: '{{count}} zile'
  },
  aboutXWeeks: {
    one: 'circa o săptămână',
    other: 'circa {{count}} săptămâni'
  },
  xWeeks: {
    one: '1 săptămână',
    other: '{{count}} săptămâni'
  },
  aboutXMonths: {
    one: 'circa 1 lună',
    other: 'circa {{count}} luni'
  },
  xMonths: {
    one: '1 lună',
    other: '{{count}} luni'
  },
  aboutXYears: {
    one: 'circa 1 an',
    other: 'circa {{count}} ani'
  },
  xYears: {
    one: '1 an',
    other: '{{count}} ani'
  },
  overXYears: {
    one: 'peste 1 an',
    other: 'peste {{count}} ani'
  },
  almostXYears: {
    one: 'aproape 1 an',
    other: 'aproape {{count}} ani'
  }
};
function formatDistance$j(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$i[token] === 'string') {
    result = formatDistanceLocale$i[token];
  } else if (count === 1) {
    result = formatDistanceLocale$i[token].one;
  } else {
    result = formatDistanceLocale$i[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'în ' + result;
    } else {
      return result + ' în urmă';
    }
  }

  return result;
}

var dateFormats$j = {
  full: 'EEEE, d MMMM yyyy',
  long: 'd MMMM yyyy',
  medium: 'd MMM yyyy',
  short: 'dd.MM.yyyy'
};
var timeFormats$j = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$j = {
  full: "{{date}} 'la' {{time}}",
  long: "{{date}} 'la' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$j = {
  date: buildFormatLongFn({
    formats: dateFormats$j,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$j,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$j,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$j = {
  lastWeek: "eeee 'trecută la' p",
  yesterday: "'ieri la' p",
  today: "'astăzi la' p",
  tomorrow: "'mâine la' p",
  nextWeek: "eeee 'viitoare la' p",
  other: 'P'
};
function formatRelative$j(token, _date, _baseDate, _options) {
  return formatRelativeLocale$j[token];
}

var eraValues$j = {
  narrow: ['Î', 'D'],
  abbreviated: ['Î.d.C.', 'D.C.'],
  wide: ['Înainte de Cristos', 'După Cristos']
};
var quarterValues$j = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['T1', 'T2', 'T3', 'T4'],
  wide: ['primul trimestru', 'al doilea trimestru', 'al treilea trimestru', 'al patrulea trimestru']
};
var monthValues$j = {
  narrow: ['I', 'F', 'M', 'A', 'M', 'I', 'I', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'],
  wide: ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie']
};
var dayValues$j = {
  narrow: ['d', 'l', 'm', 'm', 'j', 'v', 's'],
  short: ['du', 'lu', 'ma', 'mi', 'jo', 'vi', 'sâ'],
  abbreviated: ['dum', 'lun', 'mar', 'mie', 'joi', 'vin', 'sâm'],
  wide: ['duminică', 'luni', 'marți', 'miercuri', 'joi', 'vineri', 'sâmbătă']
};
var dayPeriodValues$i = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mn',
    noon: 'ami',
    morning: 'dim',
    afternoon: 'da',
    evening: 's',
    night: 'n'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'miezul nopții',
    noon: 'amiază',
    morning: 'dimineață',
    afternoon: 'după-amiază',
    evening: 'seară',
    night: 'noapte'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'miezul nopții',
    noon: 'amiază',
    morning: 'dimineață',
    afternoon: 'după-amiază',
    evening: 'seară',
    night: 'noapte'
  }
};
var formattingDayPeriodValues$i = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mn',
    noon: 'amiază',
    morning: 'dimineață',
    afternoon: 'după-amiază',
    evening: 'seară',
    night: 'noapte'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'miezul nopții',
    noon: 'amiază',
    morning: 'dimineață',
    afternoon: 'după-amiază',
    evening: 'seară',
    night: 'noapte'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'miezul nopții',
    noon: 'amiază',
    morning: 'dimineață',
    afternoon: 'după-amiază',
    evening: 'seară',
    night: 'noapte'
  }
};

function ordinalNumber$j(dirtyNumber) {
  var number = Number(dirtyNumber);
  return String(number);
}

var localize$j = {
  ordinalNumber: ordinalNumber$j,
  era: buildLocalizeFn({
    values: eraValues$j,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$j,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$j,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$j,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$i,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$i,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$j = /^(\d+)?/i;
var parseOrdinalNumberPattern$j = /\d+/i;
var matchEraPatterns$j = {
  narrow: /^(Î|D)/i,
  abbreviated: /^(Î\.?\s?d\.?\s?C\.?|Î\.?\s?e\.?\s?n\.?|D\.?\s?C\.?|e\.?\s?n\.?)/i,
  wide: /^(Înainte de Cristos|Înaintea erei noastre|După Cristos|Era noastră)/i
};
var parseEraPatterns$j = {
  any: [/^ÎC/i, /^DC/i],
  wide: [/^(Înainte de Cristos|Înaintea erei noastre)/i, /^(După Cristos|Era noastră)/i]
};
var matchQuarterPatterns$j = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^trimestrul [1234]/i
};
var parseQuarterPatterns$j = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$j = {
  narrow: /^[ifmaasond]/i,
  abbreviated: /^(ian|feb|mar|apr|mai|iun|iul|aug|sep|oct|noi|dec)/i,
  wide: /^(ianuarie|februarie|martie|aprilie|mai|iunie|iulie|august|septembrie|octombrie|noiembrie|decembrie)/i
};
var parseMonthPatterns$j = {
  narrow: [/^i/i, /^f/i, /^m/i, /^a/i, /^m/i, /^i/i, /^i/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ia/i, /^f/i, /^mar/i, /^ap/i, /^mai/i, /^iun/i, /^iul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$j = {
  narrow: /^[dlmjvs]/i,
  short: /^(d|l|ma|mi|j|v|s)/i,
  abbreviated: /^(dum|lun|mar|mie|jo|vi|sâ)/i,
  wide: /^(duminica|luni|marţi|miercuri|joi|vineri|sâmbătă)/i
};
var parseDayPatterns$j = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^d/i, /^l/i, /^ma/i, /^mi/i, /^j/i, /^v/i, /^s/i]
};
var matchDayPeriodPatterns$j = {
  narrow: /^(a|p|mn|a|(dimineaţa|după-amiaza|seara|noaptea))/i,
  any: /^([ap]\.?\s?m\.?|miezul nopții|amiaza|(dimineaţa|după-amiaza|seara|noaptea))/i
};
var parseDayPeriodPatterns$j = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn/i,
    noon: /amiaza/i,
    morning: /dimineaţa/i,
    afternoon: /după-amiaza/i,
    evening: /seara/i,
    night: /noaptea/i
  }
};
var match$j = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$j,
    parsePattern: parseOrdinalNumberPattern$j,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$j,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$j,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$j,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$j,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$j,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$j,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$j,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$j,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$j,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$j,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Romanian locale.
 * @language Romanian
 * @iso-639-2 ron
 * @author Sergiu Munteanu [@jsergiu]{@link https://github.com/jsergiu}
 * @author Adrian Ocneanu [@aocneanu]{@link https://github.com/aocneanu}
 * @author Mihai Ocneanu [@gandesc]{@link https://github.com/gandesc}
 */

var locale$j = {
  code: 'ro',
  formatDistance: formatDistance$j,
  formatLong: formatLong$j,
  formatRelative: formatRelative$j,
  localize: localize$j,
  match: match$j,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

function declension$2(scheme, count) {
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

function buildLocalizeTokenFn$1(scheme) {
  return function (count, options) {
    if (options.addSuffix) {
      if (options.comparison > 0) {
        if (scheme.future) {
          return declension$2(scheme.future, count);
        } else {
          return 'через ' + declension$2(scheme.regular, count);
        }
      } else {
        if (scheme.past) {
          return declension$2(scheme.past, count);
        } else {
          return declension$2(scheme.regular, count) + ' назад';
        }
      }
    } else {
      return declension$2(scheme.regular, count);
    }
  };
}

var formatDistanceLocale$h = {
  lessThanXSeconds: buildLocalizeTokenFn$1({
    regular: {
      one: 'меньше секунды',
      singularNominative: 'меньше {{count}} секунды',
      singularGenitive: 'меньше {{count}} секунд',
      pluralGenitive: 'меньше {{count}} секунд'
    },
    future: {
      one: 'меньше, чем через секунду',
      singularNominative: 'меньше, чем через {{count}} секунду',
      singularGenitive: 'меньше, чем через {{count}} секунды',
      pluralGenitive: 'меньше, чем через {{count}} секунд'
    }
  }),
  xSeconds: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: '{{count}} секунда',
      singularGenitive: '{{count}} секунды',
      pluralGenitive: '{{count}} секунд'
    },
    past: {
      singularNominative: '{{count}} секунду назад',
      singularGenitive: '{{count}} секунды назад',
      pluralGenitive: '{{count}} секунд назад'
    },
    future: {
      singularNominative: 'через {{count}} секунду',
      singularGenitive: 'через {{count}} секунды',
      pluralGenitive: 'через {{count}} секунд'
    }
  }),
  halfAMinute: function (_, options) {
    if (options.addSuffix) {
      if (options.comparison > 0) {
        return 'через полминуты';
      } else {
        return 'полминуты назад';
      }
    }

    return 'полминуты';
  },
  lessThanXMinutes: buildLocalizeTokenFn$1({
    regular: {
      one: 'меньше минуты',
      singularNominative: 'меньше {{count}} минуты',
      singularGenitive: 'меньше {{count}} минут',
      pluralGenitive: 'меньше {{count}} минут'
    },
    future: {
      one: 'меньше, чем через минуту',
      singularNominative: 'меньше, чем через {{count}} минуту',
      singularGenitive: 'меньше, чем через {{count}} минуты',
      pluralGenitive: 'меньше, чем через {{count}} минут'
    }
  }),
  xMinutes: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: '{{count}} минута',
      singularGenitive: '{{count}} минуты',
      pluralGenitive: '{{count}} минут'
    },
    past: {
      singularNominative: '{{count}} минуту назад',
      singularGenitive: '{{count}} минуты назад',
      pluralGenitive: '{{count}} минут назад'
    },
    future: {
      singularNominative: 'через {{count}} минуту',
      singularGenitive: 'через {{count}} минуты',
      pluralGenitive: 'через {{count}} минут'
    }
  }),
  aboutXHours: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: 'около {{count}} часа',
      singularGenitive: 'около {{count}} часов',
      pluralGenitive: 'около {{count}} часов'
    },
    future: {
      singularNominative: 'приблизительно через {{count}} час',
      singularGenitive: 'приблизительно через {{count}} часа',
      pluralGenitive: 'приблизительно через {{count}} часов'
    }
  }),
  xHours: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: '{{count}} час',
      singularGenitive: '{{count}} часа',
      pluralGenitive: '{{count}} часов'
    }
  }),
  xDays: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: '{{count}} день',
      singularGenitive: '{{count}} дня',
      pluralGenitive: '{{count}} дней'
    }
  }),
  aboutXWeeks: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: 'около {{count}} недели',
      singularGenitive: 'около {{count}} недель',
      pluralGenitive: 'около {{count}} недель'
    },
    future: {
      singularNominative: 'приблизительно через {{count}} неделю',
      singularGenitive: 'приблизительно через {{count}} недели',
      pluralGenitive: 'приблизительно через {{count}} недель'
    }
  }),
  xWeeks: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: '{{count}} неделя',
      singularGenitive: '{{count}} недели',
      pluralGenitive: '{{count}} недель'
    }
  }),
  aboutXMonths: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: 'около {{count}} месяца',
      singularGenitive: 'около {{count}} месяцев',
      pluralGenitive: 'около {{count}} месяцев'
    },
    future: {
      singularNominative: 'приблизительно через {{count}} месяц',
      singularGenitive: 'приблизительно через {{count}} месяца',
      pluralGenitive: 'приблизительно через {{count}} месяцев'
    }
  }),
  xMonths: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: '{{count}} месяц',
      singularGenitive: '{{count}} месяца',
      pluralGenitive: '{{count}} месяцев'
    }
  }),
  aboutXYears: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: 'около {{count}} года',
      singularGenitive: 'около {{count}} лет',
      pluralGenitive: 'около {{count}} лет'
    },
    future: {
      singularNominative: 'приблизительно через {{count}} год',
      singularGenitive: 'приблизительно через {{count}} года',
      pluralGenitive: 'приблизительно через {{count}} лет'
    }
  }),
  xYears: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: '{{count}} год',
      singularGenitive: '{{count}} года',
      pluralGenitive: '{{count}} лет'
    }
  }),
  overXYears: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: 'больше {{count}} года',
      singularGenitive: 'больше {{count}} лет',
      pluralGenitive: 'больше {{count}} лет'
    },
    future: {
      singularNominative: 'больше, чем через {{count}} год',
      singularGenitive: 'больше, чем через {{count}} года',
      pluralGenitive: 'больше, чем через {{count}} лет'
    }
  }),
  almostXYears: buildLocalizeTokenFn$1({
    regular: {
      singularNominative: 'почти {{count}} год',
      singularGenitive: 'почти {{count}} года',
      pluralGenitive: 'почти {{count}} лет'
    },
    future: {
      singularNominative: 'почти через {{count}} год',
      singularGenitive: 'почти через {{count}} года',
      pluralGenitive: 'почти через {{count}} лет'
    }
  })
};
function formatDistance$i(token, count, options) {
  options = options || {};
  return formatDistanceLocale$h[token](count, options);
}

var dateFormats$i = {
  full: "EEEE, d MMMM y 'г.'",
  long: "d MMMM y 'г.'",
  medium: "d MMM y 'г.'",
  short: 'dd.MM.y'
};
var timeFormats$i = {
  full: 'H:mm:ss zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$i = {
  any: '{{date}}, {{time}}'
};
var formatLong$i = {
  date: buildFormatLongFn({
    formats: dateFormats$i,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$i,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$i,
    defaultWidth: 'any'
  })
};

var accusativeWeekdays$2 = ['воскресенье', 'понедельник', 'вторник', 'среду', 'четверг', 'пятницу', 'субботу'];

function lastWeek$2(day) {
  var weekday = accusativeWeekdays$2[day];

  switch (day) {
    case 0:
      return "'в прошлое " + weekday + " в' p";

    case 1:
    case 2:
    case 4:
      return "'в прошлый " + weekday + " в' p";

    case 3:
    case 5:
    case 6:
      return "'в прошлую " + weekday + " в' p";
  }
}

function thisWeek$2(day) {
  var weekday = accusativeWeekdays$2[day];

  if (day === 2
  /* Tue */
  ) {
      return "'во " + weekday + " в' p";
    } else {
    return "'в " + weekday + " в' p";
  }
}

function nextWeek$2(day) {
  var weekday = accusativeWeekdays$2[day];

  switch (day) {
    case 0:
      return "'в следующее " + weekday + " в' p";

    case 1:
    case 2:
    case 4:
      return "'в следующий " + weekday + " в' p";

    case 3:
    case 5:
    case 6:
      return "'в следующую " + weekday + " в' p";
  }
}

var formatRelativeLocale$i = {
  lastWeek: function (date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek$2(day);
    } else {
      return lastWeek$2(day);
    }
  },
  yesterday: "'вчера в' p",
  today: "'сегодня в' p",
  tomorrow: "'завтра в' p",
  nextWeek: function (date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek$2(day);
    } else {
      return nextWeek$2(day);
    }
  },
  other: 'P'
};
function formatRelative$i(token, date, baseDate, options) {
  var format = formatRelativeLocale$i[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
}

var eraValues$i = {
  narrow: ['до н.э.', 'н.э.'],
  abbreviated: ['до н. э.', 'н. э.'],
  wide: ['до нашей эры', 'нашей эры']
};
var quarterValues$i = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1-й кв.', '2-й кв.', '3-й кв.', '4-й кв.'],
  wide: ['1-й квартал', '2-й квартал', '3-й квартал', '4-й квартал']
};
var monthValues$i = {
  narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'],
  abbreviated: ['янв.', 'фев.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
  wide: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь']
};
var formattingMonthValues$5 = {
  narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'],
  abbreviated: ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'],
  wide: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
};
var dayValues$i = {
  narrow: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'],
  short: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  abbreviated: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'суб'],
  wide: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
};
var dayPeriodValues$h = {
  narrow: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'полн.',
    noon: 'полд.',
    morning: 'утро',
    afternoon: 'день',
    evening: 'веч.',
    night: 'ночь'
  },
  abbreviated: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'полн.',
    noon: 'полд.',
    morning: 'утро',
    afternoon: 'день',
    evening: 'веч.',
    night: 'ночь'
  },
  wide: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'полночь',
    noon: 'полдень',
    morning: 'утро',
    afternoon: 'день',
    evening: 'вечер',
    night: 'ночь'
  }
};
var formattingDayPeriodValues$h = {
  narrow: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'полн.',
    noon: 'полд.',
    morning: 'утра',
    afternoon: 'дня',
    evening: 'веч.',
    night: 'ночи'
  },
  abbreviated: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'полн.',
    noon: 'полд.',
    morning: 'утра',
    afternoon: 'дня',
    evening: 'веч.',
    night: 'ночи'
  },
  wide: {
    am: 'ДП',
    pm: 'ПП',
    midnight: 'полночь',
    noon: 'полдень',
    morning: 'утра',
    afternoon: 'дня',
    evening: 'вечера',
    night: 'ночи'
  }
};

function ordinalNumber$i(dirtyNumber, dirtyOptions) {
  var options = dirtyOptions || {};
  var unit = String(options.unit);
  var suffix;

  if (unit === 'date') {
    suffix = '-е';
  } else if (unit === 'week' || unit === 'minute' || unit === 'second') {
    suffix = '-я';
  } else {
    suffix = '-й';
  }

  return dirtyNumber + suffix;
}

var localize$i = {
  ordinalNumber: ordinalNumber$i,
  era: buildLocalizeFn({
    values: eraValues$i,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$i,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$i,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$5,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$i,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$h,
    defaultWidth: 'any',
    formattingValues: formattingDayPeriodValues$h,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$i = /^(\d+)(-?(е|я|й|ое|ье|ая|ья|ый|ой|ий|ый))?/i;
var parseOrdinalNumberPattern$i = /\d+/i;
var matchEraPatterns$i = {
  narrow: /^((до )?н\.?\s?э\.?)/i,
  abbreviated: /^((до )?н\.?\s?э\.?)/i,
  wide: /^(до нашей эры|нашей эры|наша эра)/i
};
var parseEraPatterns$i = {
  any: [/^д/i, /^н/i]
};
var matchQuarterPatterns$i = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[ыои]?й?)? кв.?/i,
  wide: /^[1234](-?[ыои]?й?)? квартал/i
};
var parseQuarterPatterns$i = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$i = {
  narrow: /^[яфмаисонд]/i,
  abbreviated: /^(янв|фев|март?|апр|ма[йя]|июн[ья]?|июл[ья]?|авг|сент?|окт|нояб?|дек)\.?/i,
  wide: /^(январ[ья]|феврал[ья]|марта?|апрел[ья]|ма[йя]|июн[ья]|июл[ья]|августа?|сентябр[ья]|октябр[ья]|октябр[ья]|ноябр[ья]|декабр[ья])/i
};
var parseMonthPatterns$i = {
  narrow: [/^я/i, /^ф/i, /^м/i, /^а/i, /^м/i, /^и/i, /^и/i, /^а/i, /^с/i, /^о/i, /^н/i, /^я/i],
  any: [/^я/i, /^ф/i, /^мар/i, /^ап/i, /^ма[йя]/i, /^июн/i, /^июл/i, /^ав/i, /^с/i, /^о/i, /^н/i, /^д/i]
};
var matchDayPatterns$i = {
  narrow: /^[впсч]/i,
  short: /^(вс|во|пн|по|вт|ср|чт|че|пт|пя|сб|су)\.?/i,
  abbreviated: /^(вск|вос|пнд|пон|втр|вто|срд|сре|чтв|чет|птн|пят|суб).?/i,
  wide: /^(воскресень[ея]|понедельника?|вторника?|сред[аы]|четверга?|пятниц[аы]|суббот[аы])/i
};
var parseDayPatterns$i = {
  narrow: [/^в/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^в[ос]/i, /^п[он]/i, /^в/i, /^ср/i, /^ч/i, /^п[ят]/i, /^с[уб]/i]
};
var matchDayPeriodPatterns$i = {
  narrow: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  abbreviated: /^([дп]п|полн\.?|полд\.?|утр[оа]|день|дня|веч\.?|ноч[ьи])/i,
  wide: /^([дп]п|полночь|полдень|утр[оа]|день|дня|вечера?|ноч[ьи])/i
};
var parseDayPeriodPatterns$i = {
  any: {
    am: /^дп/i,
    pm: /^пп/i,
    midnight: /^полн/i,
    noon: /^полд/i,
    morning: /^у/i,
    afternoon: /^д[ен]/i,
    evening: /^в/i,
    night: /^н/i
  }
};
var match$i = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$i,
    parsePattern: parseOrdinalNumberPattern$i,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$i,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$i,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$i,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$i,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$i,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$i,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$i,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$i,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$i,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPeriodPatterns$i,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Russian locale.
 * @language Russian
 * @iso-639-2 rus
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */

var locale$i = {
  code: 'ru',
  formatDistance: formatDistance$i,
  formatLong: formatLong$i,
  formatRelative: formatRelative$i,
  localize: localize$i,
  match: match$i,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

function declensionGroup(scheme, count) {
  if (count === 1 && scheme.one) {
    return scheme.one;
  }

  if (count >= 2 && count <= 4 && scheme.twoFour) {
    return scheme.twoFour;
  } // if count === null || count === 0 || count >= 5


  return scheme.other;
}

function declension$1(scheme, count, time) {
  var group = declensionGroup(scheme, count);
  var finalText = group[time];
  return finalText.replace('{{count}}', String(count));
}

function extractPreposition(token) {
  var result = ['lessThan', 'about', 'over', 'almost'].filter(function (preposition) {
    return !!token.match(new RegExp('^' + preposition));
  });
  return result[0];
}

function prefixPreposition(preposition) {
  var translation = '';

  if (preposition === 'almost') {
    translation = 'takmer';
  }

  if (preposition === 'about') {
    translation = 'približne';
  }

  return translation.length > 0 ? translation + ' ' : '';
}

function suffixPreposition(preposition) {
  var translation = '';

  if (preposition === 'lessThan') {
    translation = 'menej než';
  }

  if (preposition === 'over') {
    translation = 'viac než';
  }

  return translation.length > 0 ? translation + ' ' : '';
}

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

var formatDistanceLocale$g = {
  xSeconds: {
    one: {
      present: 'sekunda',
      past: 'sekundou',
      future: 'sekundu'
    },
    twoFour: {
      present: '{{count}} sekundy',
      past: '{{count}} sekundami',
      future: '{{count}} sekundy'
    },
    other: {
      present: '{{count}} sekúnd',
      past: '{{count}} sekundami',
      future: '{{count}} sekúnd'
    }
  },
  halfAMinute: {
    other: {
      present: 'pol minúty',
      past: 'pol minútou',
      future: 'pol minúty'
    }
  },
  xMinutes: {
    one: {
      present: 'minúta',
      past: 'minútou',
      future: 'minútu'
    },
    twoFour: {
      present: '{{count}} minúty',
      past: '{{count}} minútami',
      future: '{{count}} minúty'
    },
    other: {
      present: '{{count}} minút',
      past: '{{count}} minútami',
      future: '{{count}} minút'
    }
  },
  xHours: {
    one: {
      present: 'hodina',
      past: 'hodinou',
      future: 'hodinu'
    },
    twoFour: {
      present: '{{count}} hodiny',
      past: '{{count}} hodinami',
      future: '{{count}} hodiny'
    },
    other: {
      present: '{{count}} hodín',
      past: '{{count}} hodinami',
      future: '{{count}} hodín'
    }
  },
  xDays: {
    one: {
      present: 'deň',
      past: 'dňom',
      future: 'deň'
    },
    twoFour: {
      present: '{{count}} dni',
      past: '{{count}} dňami',
      future: '{{count}} dni'
    },
    other: {
      present: '{{count}} dní',
      past: '{{count}} dňami',
      future: '{{count}} dní'
    }
  },
  xWeeks: {
    one: {
      present: 'týždeň',
      past: 'týždňom',
      future: 'týždeň'
    },
    twoFour: {
      present: '{{count}} týždne',
      past: '{{count}} týždňami',
      future: '{{count}} týždne'
    },
    other: {
      present: '{{count}} týždňov',
      past: '{{count}} týždňami',
      future: '{{count}} týždňov'
    }
  },
  xMonths: {
    one: {
      present: 'mesiac',
      past: 'mesiacom',
      future: 'mesiac'
    },
    twoFour: {
      present: '{{count}} mesiace',
      past: '{{count}} mesiacmi',
      future: '{{count}} mesiace'
    },
    other: {
      present: '{{count}} mesiacov',
      past: '{{count}} mesiacmi',
      future: '{{count}} mesiacov'
    }
  },
  xYears: {
    one: {
      present: 'rok',
      past: 'rokom',
      future: 'rok'
    },
    twoFour: {
      present: '{{count}} roky',
      past: '{{count}} rokmi',
      future: '{{count}} roky'
    },
    other: {
      present: '{{count}} rokov',
      past: '{{count}} rokmi',
      future: '{{count}} rokov'
    }
  }
};

var formatDistance$h = function (token, count, options) {
  var preposition = extractPreposition(token) || '';
  var key = lowercaseFirstLetter(token.substring(preposition.length));
  var scheme = formatDistanceLocale$g[key];

  if (!(options !== null && options !== void 0 && options.addSuffix)) {
    return prefixPreposition(preposition) + suffixPreposition(preposition) + declension$1(scheme, count, 'present');
  }

  if (options.comparison && options.comparison > 0) {
    return prefixPreposition(preposition) + 'o ' + suffixPreposition(preposition) + declension$1(scheme, count, 'future');
  } else {
    return prefixPreposition(preposition) + 'pred ' + suffixPreposition(preposition) + declension$1(scheme, count, 'past');
  }
};

var dateFormats$h = {
  full: 'EEEE d. MMMM y',
  long: 'd. MMMM y',
  medium: 'd. M. y',
  short: 'd. M. y'
}; // https://www.unicode.org/cldr/charts/32/summary/sk.html?hide#2149

var timeFormats$h = {
  full: 'H:mm:ss zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
}; // https://www.unicode.org/cldr/charts/32/summary/sk.html?hide#1994

var dateTimeFormats$h = {
  full: '{{date}}, {{time}}',
  long: '{{date}}, {{time}}',
  medium: '{{date}}, {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$h = {
  date: buildFormatLongFn({
    formats: dateFormats$h,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$h,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$h,
    defaultWidth: 'full'
  })
};

// https://www.unicode.org/cldr/charts/32/summary/sk.html?hide#1308
var accusativeWeekdays$1 = ['nedeľu', 'pondelok', 'utorok', 'stredu', 'štvrtok', 'piatok', 'sobotu'];

function lastWeek$1(day) {
  var weekday = accusativeWeekdays$1[day];

  switch (day) {
    case 0:
    /* Sun */

    case 3:
    /* Wed */

    case 6
    /* Sat */
    :
      return "'minulú " + weekday + " o' p";

    default:
      return "'minulý' eeee 'o' p";
  }
}

function thisWeek$1(day) {
  var weekday = accusativeWeekdays$1[day];

  if (day === 4
  /* Thu */
  ) {
      return "'vo' eeee 'o' p";
    } else {
    return "'v " + weekday + " o' p";
  }
}

function nextWeek$1(day) {
  var weekday = accusativeWeekdays$1[day];

  switch (day) {
    case 0:
    /* Sun */

    case 4:
    /* Wed */

    case 6
    /* Sat */
    :
      return "'budúcu " + weekday + " o' p";

    default:
      return "'budúci' eeee 'o' p";
  }
}

var formatRelativeLocale$h = {
  lastWeek: function (date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek$1(day);
    } else {
      return lastWeek$1(day);
    }
  },
  yesterday: "'včera o' p",
  today: "'dnes o' p",
  tomorrow: "'zajtra o' p",
  nextWeek: function (date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek$1(day);
    } else {
      return nextWeek$1(day);
    }
  },
  other: 'P'
};

var formatRelative$h = function (token, date, baseDate, options) {
  var format = formatRelativeLocale$h[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
};

var eraValues$h = {
  narrow: ['pred Kr.', 'po Kr.'],
  abbreviated: ['pred Kr.', 'po Kr.'],
  wide: ['pred Kristom', 'po Kristovi']
}; // https://www.unicode.org/cldr/charts/32/summary/sk.html#1780

var quarterValues$h = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1. štvrťrok', '2. štvrťrok', '3. štvrťrok', '4. štvrťrok']
}; // https://www.unicode.org/cldr/charts/32/summary/sk.html#1804

var monthValues$h = {
  narrow: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
  abbreviated: ['jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec'],
  wide: ['január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december']
};
var formattingMonthValues$4 = {
  narrow: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
  abbreviated: ['jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec'],
  wide: ['januára', 'februára', 'marca', 'apríla', 'mája', 'júna', 'júla', 'augusta', 'septembra', 'októbra', 'novembra', 'decembra']
}; // https://www.unicode.org/cldr/charts/32/summary/sk.html#1876

var dayValues$h = {
  narrow: ['n', 'p', 'u', 's', 'š', 'p', 's'],
  short: ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so'],
  abbreviated: ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so'],
  wide: ['nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota']
}; // https://www.unicode.org/cldr/charts/32/summary/sk.html#1932

var dayPeriodValues$g = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'poln.',
    noon: 'pol.',
    morning: 'ráno',
    afternoon: 'pop.',
    evening: 'več.',
    night: 'noc'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'poln.',
    noon: 'pol.',
    morning: 'ráno',
    afternoon: 'popol.',
    evening: 'večer',
    night: 'noc'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'polnoc',
    noon: 'poludnie',
    morning: 'ráno',
    afternoon: 'popoludnie',
    evening: 'večer',
    night: 'noc'
  }
};
var formattingDayPeriodValues$g = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'o poln.',
    noon: 'nap.',
    morning: 'ráno',
    afternoon: 'pop.',
    evening: 'več.',
    night: 'v n.'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'o poln.',
    noon: 'napol.',
    morning: 'ráno',
    afternoon: 'popol.',
    evening: 'večer',
    night: 'v noci'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'o polnoci',
    noon: 'napoludnie',
    morning: 'ráno',
    afternoon: 'popoludní',
    evening: 'večer',
    night: 'v noci'
  }
};

var ordinalNumber$h = function (dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + '.';
};

var localize$h = {
  ordinalNumber: ordinalNumber$h,
  era: buildLocalizeFn({
    values: eraValues$h,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$h,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$h,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$4,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$h,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$g,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$g,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$h = /^(\d+)\.?/i;
var parseOrdinalNumberPattern$h = /\d+/i;
var matchEraPatterns$h = {
  narrow: /^(pred Kr\.|pred n\. l\.|po Kr\.|n\. l\.)/i,
  abbreviated: /^(pred Kr\.|pred n\. l\.|po Kr\.|n\. l\.)/i,
  wide: /^(pred Kristom|pred na[šs][íi]m letopo[čc]tom|po Kristovi|n[áa][šs]ho letopo[čc]tu)/i
};
var parseEraPatterns$h = {
  any: [/^pr/i, /^(po|n)/i]
};
var matchQuarterPatterns$h = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]\. [šs]tvr[ťt]rok/i
};
var parseQuarterPatterns$h = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$h = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|m[áa]j|j[úu]n|j[úu]l|aug|sep|okt|nov|dec)/i,
  wide: /^(janu[áa]ra?|febru[áa]ra?|(marec|marca)|apr[íi]la?|m[áa]ja?|j[úu]na?|j[úu]la?|augusta?|(september|septembra)|(okt[óo]ber|okt[óo]bra)|(november|novembra)|(december|decembra))/i
};
var parseMonthPatterns$h = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^m[áa]j/i, /^j[úu]n/i, /^j[úu]l/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$h = {
  narrow: /^[npusšp]/i,
  short: /^(ne|po|ut|st|št|pi|so)/i,
  abbreviated: /^(ne|po|ut|st|št|pi|so)/i,
  wide: /^(nede[ľl]a|pondelok|utorok|streda|[šs]tvrtok|piatok|sobota])/i
};
var parseDayPatterns$h = {
  narrow: [/^n/i, /^p/i, /^u/i, /^s/i, /^š/i, /^p/i, /^s/i],
  any: [/^n/i, /^po/i, /^u/i, /^st/i, /^(št|stv)/i, /^pi/i, /^so/i]
};
var matchDayPeriodPatterns$h = {
  narrow: /^(am|pm|(o )?poln\.?|(nap\.?|pol\.?)|r[áa]no|pop\.?|ve[čc]\.?|(v n\.?|noc))/i,
  abbreviated: /^(am|pm|(o )?poln\.?|(napol\.?|pol\.?)|r[áa]no|pop\.?|ve[čc]er|(v )?noci?)/i,
  any: /^(am|pm|(o )?polnoci?|(na)?poludnie|r[áa]no|popoludn(ie|í|i)|ve[čc]er|(v )?noci?)/i
};
var parseDayPeriodPatterns$h = {
  any: {
    am: /^am/i,
    pm: /^pm/i,
    midnight: /poln/i,
    noon: /^(nap|(na)?pol(\.|u))/i,
    morning: /^r[áa]no/i,
    afternoon: /^pop/i,
    evening: /^ve[čc]/i,
    night: /^(noc|v n\.)/i
  }
};
var match$h = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$h,
    parsePattern: parseOrdinalNumberPattern$h,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$h,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$h,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$h,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$h,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$h,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$h,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$h,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$h,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$h,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$h,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Slovak locale.
 * @language Slovak
 * @iso-639-2 slk
 * @author Marek Suscak [@mareksuscak]{@link https://github.com/mareksuscak}
 */

var locale$h = {
  code: 'sk',
  formatDistance: formatDistance$h,
  formatLong: formatLong$h,
  formatRelative: formatRelative$h,
  localize: localize$h,
  match: match$h,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var distanceInWordsLocale = {
  lessThanXSeconds: {
    one: 'manj kot {{count}} sekunda',
    two: 'manj kot {{count}} sekundi',
    few: 'manj kot {{count}} sekunde',
    other: 'manj kot {{count}} sekund'
  },
  xSeconds: {
    one: '{{count}} sekunda',
    two: '{{count}} sekundi',
    few: '{{count}} sekunde',
    other: '{{count}} sekund'
  },
  halfAMinute: 'pol minute',
  lessThanXMinutes: {
    one: 'manj kot {{count}} minuta',
    two: 'manj kot {{count}} minuti',
    few: 'manj kot {{count}} minute',
    other: 'manj kot {{count}} minut'
  },
  xMinutes: {
    one: '{{count}} minuta',
    two: '{{count}} minuti',
    few: '{{count}} minute',
    other: '{{count}} minut'
  },
  aboutXHours: {
    one: 'približno {{count}} ura',
    two: 'približno {{count}} uri',
    few: 'približno {{count}} ure',
    other: 'približno {{count}} ur'
  },
  xHours: {
    one: '{{count}} ura',
    two: '{{count}} uri',
    few: '{{count}} ure',
    other: '{{count}} ur'
  },
  xDays: {
    one: '{{count}} dan',
    two: '{{count}} dni',
    few: '{{count}} dni',
    other: '{{count}} dni'
  },
  aboutXWeeks: {
    one: 'približno {{count}} teden',
    two: 'približno {{count}} tedna',
    few: 'približno {{count}} tedne',
    other: 'približno {{count}} tednov'
  },
  xWeeks: {
    one: '{{count}} teden',
    two: '{{count}} tedna',
    few: '{{count}} tedne',
    other: '{{count}} tednov'
  },
  aboutXMonths: {
    one: 'približno {{count}} mesec',
    two: 'približno {{count}} meseca',
    few: 'približno {{count}} mesece',
    other: 'približno {{count}} mesecev'
  },
  xMonths: {
    one: '{{count}} mesec',
    two: '{{count}} meseca',
    few: '{{count}} meseci',
    other: '{{count}} mesecev'
  },
  aboutXYears: {
    one: 'približno {{count}} leto',
    two: 'približno {{count}} leti',
    few: 'približno {{count}} leta',
    other: 'približno {{count}} let'
  },
  xYears: {
    one: '{{count}} leto',
    two: '{{count}} leti',
    few: '{{count}} leta',
    other: '{{count}} let'
  },
  overXYears: {
    one: 'več kot {{count}} leto',
    two: 'več kot {{count}} leti',
    few: 'več kot {{count}} leta',
    other: 'več kot {{count}} let'
  },
  almostXYears: {
    one: 'skoraj {{count}} leto',
    two: 'skoraj {{count}} leti',
    few: 'skoraj {{count}} leta',
    other: 'skoraj {{count}} let'
  }
};
var distanceInWordsLocalePast = {
  lessThanXSeconds: {
    one: 'manj kot {{count}} sekundo',
    two: 'manj kot {{count}} sekundama',
    few: 'manj kot {{count}} sekundami',
    other: 'manj kot {{count}} sekundami'
  },
  xSeconds: {
    one: '{{count}} sekundo',
    two: '{{count}} sekundama',
    few: '{{count}} sekundami',
    other: '{{count}} sekundami'
  },
  halfAMinute: 'pol minute',
  lessThanXMinutes: {
    one: 'manj kot {{count}} minuto',
    two: 'manj kot {{count}} minutama',
    few: 'manj kot {{count}} minutami',
    other: 'manj kot {{count}} minutami'
  },
  xMinutes: {
    one: '{{count}} minuto',
    two: '{{count}} minutama',
    few: '{{count}} minutami',
    other: '{{count}} minutami'
  },
  aboutXHours: {
    one: 'približno {{count}} uro',
    two: 'približno {{count}} urama',
    few: 'približno {{count}} urami',
    other: 'približno {{count}} urami'
  },
  xHours: {
    one: '{{count}} uro',
    two: '{{count}} urama',
    few: '{{count}} urami',
    other: '{{count}} urami'
  },
  xDays: {
    one: '{{count}} dnem',
    two: '{{count}} dnevoma',
    few: '{{count}} dnevi',
    other: '{{count}} dnevi'
  },
  aboutXMonths: {
    one: 'približno {{count}} mesecem',
    two: 'približno {{count}} mesecema',
    few: 'približno {{count}} meseci',
    other: 'približno {{count}} meseci'
  },
  xMonths: {
    one: '{{count}} mesecem',
    two: '{{count}} mesecema',
    few: '{{count}} meseci',
    other: '{{count}} meseci'
  },
  aboutXYears: {
    one: 'približno {{count}} letom',
    two: 'približno {{count}} letoma',
    few: 'približno {{count}} leti',
    other: 'približno {{count}} leti'
  },
  xYears: {
    one: '{{count}} letom',
    two: '{{count}} letoma',
    few: '{{count}} leti',
    other: '{{count}} leti'
  },
  overXYears: {
    one: 'več kot {{count}} letom',
    two: 'več kot {{count}} letoma',
    few: 'več kot {{count}} leti',
    other: 'več kot {{count}} leti'
  },
  almostXYears: {
    one: 'skoraj {{count}} letom',
    two: 'skoraj {{count}} letoma',
    few: 'skoraj {{count}} leti',
    other: 'skoraj {{count}} leti'
  }
};
var distanceInWordsLocaleFuture = {
  lessThanXSeconds: {
    one: 'manj kot {{count}} sekundo',
    two: 'manj kot {{count}} sekundi',
    few: 'manj kot {{count}} sekunde',
    other: 'manj kot {{count}} sekund'
  },
  xSeconds: {
    one: '{{count}} sekundo',
    two: '{{count}} sekundi',
    few: '{{count}} sekunde',
    other: '{{count}} sekund'
  },
  halfAMinute: 'pol minute',
  lessThanXMinutes: {
    one: 'manj kot {{count}} minuto',
    two: 'manj kot {{count}} minuti',
    few: 'manj kot {{count}} minute',
    other: 'manj kot {{count}} minut'
  },
  xMinutes: {
    one: '{{count}} minuto',
    two: '{{count}} minuti',
    few: '{{count}} minute',
    other: '{{count}} minut'
  },
  aboutXHours: {
    one: 'približno {{count}} uro',
    two: 'približno {{count}} uri',
    few: 'približno {{count}} ure',
    other: 'približno {{count}} ur'
  },
  xHours: {
    one: '{{count}} uro',
    two: '{{count}} uri',
    few: '{{count}} ure',
    other: '{{count}} ur'
  },
  xDays: {
    one: '{{count}} dan',
    two: '{{count}} dni',
    few: '{{count}} dni',
    other: '{{count}} dni'
  },
  aboutXMonths: {
    one: 'približno {{count}} mesec',
    two: 'približno {{count}} meseca',
    few: 'približno {{count}} mesece',
    other: 'približno {{count}} mesecev'
  },
  xMonths: {
    one: '{{count}} mesec',
    two: '{{count}} meseca',
    few: '{{count}} mesece',
    other: '{{count}} mesecev'
  },
  aboutXYears: {
    one: 'približno {{count}} leto',
    two: 'približno {{count}} leti',
    few: 'približno {{count}} leta',
    other: 'približno {{count}} let'
  },
  xYears: {
    one: '{{count}} leto',
    two: '{{count}} leti',
    few: '{{count}} leta',
    other: '{{count}} let'
  },
  overXYears: {
    one: 'več kot {{count}} leto',
    two: 'več kot {{count}} leti',
    few: 'več kot {{count}} leta',
    other: 'več kot {{count}} let'
  },
  almostXYears: {
    one: 'skoraj {{count}} leto',
    two: 'skoraj {{count}} leti',
    few: 'skoraj {{count}} leta',
    other: 'skoraj {{count}} let'
  }
};

function getFormFromCount(count) {
  switch (count % 100) {
    case 1:
      return 'one';

    case 2:
      return 'two';

    case 3:
    case 4:
      return 'few';

    default:
      return 'other';
  }
}

function formatDistance$g(token, count, options) {
  options = options || {};
  var localeObject = distanceInWordsLocale;
  var result = '';

  if (options.addSuffix) {
    if (options.comparison > 0) {
      localeObject = distanceInWordsLocaleFuture;
      result += 'čez ';
    } else {
      localeObject = distanceInWordsLocalePast;
      result += 'pred ';
    }
  }

  if (typeof localeObject[token] === 'string') {
    result += localeObject[token];
  } else {
    var form = getFormFromCount(count);
    result += localeObject[token][form].replace('{{count}}', count);
  }

  return result;
}

var dateFormats$g = {
  full: 'EEEE, dd. MMMM y',
  long: 'dd. MMMM y',
  medium: 'd. MMM y',
  short: 'd. MM. yy'
};
var timeFormats$g = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$g = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$g = {
  date: buildFormatLongFn({
    formats: dateFormats$g,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$g,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$g,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$g = {
  lastWeek: function (date) {
    var day = date.getUTCDay();

    switch (day) {
      case 0:
        return "'prejšnjo nedeljo ob' p";

      case 3:
        return "'prejšnjo sredo ob' p";

      case 6:
        return "'prejšnjo soboto ob' p";

      default:
        return "'prejšnji' EEEE 'ob' p";
    }
  },
  yesterday: "'včeraj ob' p",
  today: "'danes ob' p",
  tomorrow: "'jutri ob' p",
  nextWeek: function (date) {
    var day = date.getUTCDay();

    switch (day) {
      case 0:
        return "'naslednjo nedeljo ob' p";

      case 3:
        return "'naslednjo sredo ob' p";

      case 6:
        return "'naslednjo soboto ob' p";

      default:
        return "'naslednji' EEEE 'ob' p";
    }
  },
  other: 'P'
};
function formatRelative$g(token, date, _baseDate, _options) {
  var format = formatRelativeLocale$g[token];

  if (typeof format === 'function') {
    return format(date);
  }

  return format;
}

function ordinalNumber$g(dirtyNumber) {
  var number = Number(dirtyNumber);
  return String(number).concat('.');
}

var eraValues$g = {
  narrow: ['pr. n. št.', 'po n. št.'],
  abbreviated: ['pr. n. št.', 'po n. št.'],
  wide: ['pred našim štetjem', 'po našem štetju']
};
var monthValues$g = {
  narrow: ['j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'],
  abbreviated: ['jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'avg.', 'sep.', 'okt.', 'nov.', 'dec.'],
  wide: ['januar', 'februar', 'marec', 'april', 'maj', 'junij', 'julij', 'avgust', 'september', 'oktober', 'november', 'december']
};
var quarterValues$g = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1. čet.', '2. čet.', '3. čet.', '4. čet.'],
  wide: ['1. četrtletje', '2. četrtletje', '3. četrtletje', '4. četrtletje']
};
var dayValues$g = {
  narrow: ['n', 'p', 't', 's', 'č', 'p', 's'],
  short: ['ned.', 'pon.', 'tor.', 'sre.', 'čet.', 'pet.', 'sob.'],
  abbreviated: ['ned.', 'pon.', 'tor.', 'sre.', 'čet.', 'pet.', 'sob.'],
  wide: ['nedelja', 'ponedeljek', 'torek', 'sreda', 'četrtek', 'petek', 'sobota']
};
var dayPeriodValuesStandalone = {
  narrow: {
    am: 'd',
    pm: 'p',
    midnight: '24.00',
    noon: '12.00',
    morning: 'j',
    afternoon: 'p',
    evening: 'v',
    night: 'n'
  },
  abbreviated: {
    am: 'dop.',
    pm: 'pop.',
    midnight: 'poln.',
    noon: 'pold.',
    morning: 'jut.',
    afternoon: 'pop.',
    evening: 'več.',
    night: 'noč'
  },
  wide: {
    am: 'dop.',
    pm: 'pop.',
    midnight: 'polnoč',
    noon: 'poldne',
    morning: 'jutro',
    afternoon: 'popoldne',
    evening: 'večer',
    night: 'noč'
  }
};
var dayPeriodValuesFormatting = {
  narrow: {
    am: 'd',
    pm: 'p',
    midnight: '24.00',
    noon: '12.00',
    morning: 'zj',
    afternoon: 'p',
    evening: 'zv',
    night: 'po'
  },
  abbreviated: {
    am: 'dop.',
    pm: 'pop.',
    midnight: 'opoln.',
    noon: 'opold.',
    morning: 'zjut.',
    afternoon: 'pop.',
    evening: 'zveč.',
    night: 'ponoči'
  },
  wide: {
    am: 'dop.',
    pm: 'pop.',
    midnight: 'opolnoči',
    noon: 'opoldne',
    morning: 'zjutraj',
    afternoon: 'popoldan',
    evening: 'zvečer',
    night: 'ponoči'
  }
};
var localize$g = {
  ordinalNumber: ordinalNumber$g,
  era: buildLocalizeFn({
    values: eraValues$g,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$g,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$g,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$g,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValuesStandalone,
    defaultWidth: 'wide',
    formattingValues: dayPeriodValuesFormatting,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$g = /^(\d+)\./i;
var parseOrdinalNumberPattern$g = /\d+/i;
var matchEraPatterns$g = {
  abbreviated: /^(pr\. n\. št\.|po n\. št\.)/i,
  wide: /^(pred Kristusom|pred na[sš]im [sš]tetjem|po Kristusu|po na[sš]em [sš]tetju|na[sš]ega [sš]tetja)/i
};
var parseEraPatterns$g = {
  any: [/^pr/i, /^(po|na[sš]em)/i]
};
var matchQuarterPatterns$g = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\.\s?[čc]et\.?/i,
  wide: /^[1234]\. [čc]etrtletje/i
};
var parseQuarterPatterns$g = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$g = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan\.|feb\.|mar\.|apr\.|maj|jun\.|jul\.|avg\.|sep\.|okt\.|nov\.|dec\.)/i,
  wide: /^(januar|februar|marec|april|maj|junij|julij|avgust|september|oktober|november|december)/i
};
var parseMonthPatterns$g = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  abbreviated: [/^ja/i, /^fe/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^av/i, /^s/i, /^o/i, /^n/i, /^d/i],
  wide: [/^ja/i, /^fe/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^av/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$g = {
  narrow: /^[nptsčc]/i,
  short: /^(ned\.|pon\.|tor\.|sre\.|[cč]et\.|pet\.|sob\.)/i,
  abbreviated: /^(ned\.|pon\.|tor\.|sre\.|[cč]et\.|pet\.|sob\.)/i,
  wide: /^(nedelja|ponedeljek|torek|sreda|[cč]etrtek|petek|sobota)/i
};
var parseDayPatterns$g = {
  narrow: [/^n/i, /^p/i, /^t/i, /^s/i, /^[cč]/i, /^p/i, /^s/i],
  any: [/^n/i, /^po/i, /^t/i, /^sr/i, /^[cč]/i, /^pe/i, /^so/i]
};
var matchDayPeriodPatterns$g = {
  narrow: /^(d|po?|z?v|n|z?j|24\.00|12\.00)/i,
  any: /^(dop\.|pop\.|o?poln(\.|o[cč]i?)|o?pold(\.|ne)|z?ve[cč](\.|er)|(po)?no[cč]i?|popold(ne|an)|jut(\.|ro)|zjut(\.|raj))/i
};
var parseDayPeriodPatterns$g = {
  narrow: {
    am: /^d/i,
    pm: /^p/i,
    midnight: /^24/i,
    noon: /^12/i,
    morning: /^(z?j)/i,
    afternoon: /^p/i,
    evening: /^(z?v)/i,
    night: /^(n|po)/i
  },
  any: {
    am: /^dop\./i,
    pm: /^pop\./i,
    midnight: /^o?poln/i,
    noon: /^o?pold/i,
    morning: /j/i,
    afternoon: /^pop\./i,
    evening: /^z?ve/i,
    night: /(po)?no/i
  }
};
var match$g = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$g,
    parsePattern: parseOrdinalNumberPattern$g,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$g,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$g,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$g,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$g,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$g,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$g,
    defaultParseWidth: 'wide'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$g,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$g,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$g,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$g,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Slovenian locale.
 * @language Slovenian
 * @iso-639-2 slv
 * @author Adam Stradovnik [@Neoglyph]{@link https://github.com/Neoglyph}
 * @author Mato Žgajner [@mzgajner]{@link https://github.com/mzgajner}
 */

var locale$g = {
  code: 'sl',
  formatDistance: formatDistance$g,
  formatLong: formatLong$g,
  formatRelative: formatRelative$g,
  localize: localize$g,
  match: match$g,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$f = {
  lessThanXSeconds: {
    one: 'më pak se një sekondë',
    other: 'më pak se {{count}} sekonda'
  },
  xSeconds: {
    one: '1 sekondë',
    other: '{{count}} sekonda'
  },
  halfAMinute: 'gjysëm minuti',
  lessThanXMinutes: {
    one: 'më pak se një minute',
    other: 'më pak se {{count}} minuta'
  },
  xMinutes: {
    one: '1 minutë',
    other: '{{count}} minuta'
  },
  aboutXHours: {
    one: 'rreth 1 orë',
    other: 'rreth {{count}} orë'
  },
  xHours: {
    one: '1 orë',
    other: '{{count}} orë'
  },
  xDays: {
    one: '1 ditë',
    other: '{{count}} ditë'
  },
  aboutXWeeks: {
    one: 'rreth 1 javë',
    other: 'rreth {{count}} javë'
  },
  xWeeks: {
    one: '1 javë',
    other: '{{count}} javë'
  },
  aboutXMonths: {
    one: 'rreth 1 muaj',
    other: 'rreth {{count}} muaj'
  },
  xMonths: {
    one: '1 muaj',
    other: '{{count}} muaj'
  },
  aboutXYears: {
    one: 'rreth 1 vit',
    other: 'rreth {{count}} vite'
  },
  xYears: {
    one: '1 vit',
    other: '{{count}} vite'
  },
  overXYears: {
    one: 'mbi 1 vit',
    other: 'mbi {{count}} vite'
  },
  almostXYears: {
    one: 'pothuajse 1 vit',
    other: 'pothuajse {{count}} vite'
  }
};
function formatDistance$f(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$f[token] === 'string') {
    result = formatDistanceLocale$f[token];
  } else if (count === 1) {
    result = formatDistanceLocale$f[token].one;
  } else {
    result = formatDistanceLocale$f[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'në ' + result;
    } else {
      return result + ' më parë';
    }
  }

  return result;
}

var dateFormats$f = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats$f = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$f = {
  full: "{{date}} 'në' {{time}}",
  long: "{{date}} 'në' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$f = {
  date: buildFormatLongFn({
    formats: dateFormats$f,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$f,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$f,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$f = {
  lastWeek: "'të' eeee 'e shkuar në' p",
  yesterday: "'dje në' p",
  today: "'sot në' p",
  tomorrow: "'nesër në' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};
function formatRelative$f(token, _date, _baseDate, _options) {
  return formatRelativeLocale$f[token];
}

var eraValues$f = {
  narrow: ['P', 'M'],
  abbreviated: ['PK', 'MK'],
  wide: ['Para Krishtit', 'Mbas Krishtit']
};
var quarterValues$f = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['4-mujori I', '4-mujori II', '4-mujori III', '4-mujori IV']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$f = {
  narrow: ['J', 'S', 'M', 'P', 'M', 'Q', 'K', 'G', 'S', 'T', 'N', 'D'],
  abbreviated: ['Jan', 'Shk', 'Mar', 'Pri', 'Maj', 'Qer', 'Kor', 'Gus', 'Sht', 'Tet', 'Nën', 'Dhj'],
  wide: ['Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor', 'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor']
};
var dayValues$f = {
  narrow: ['D', 'H', 'M', 'M', 'E', 'P', 'S'],
  short: ['Di', 'Hë', 'Ma', 'Më', 'En', 'Pr', 'Sh'],
  abbreviated: ['Die', 'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht'],
  wide: ['Dielë', 'Hënë', 'Martë', 'Mërkurë', 'Enjte', 'Premte', 'Shtunë']
};
var dayPeriodValues$f = {
  narrow: {
    am: 'p',
    pm: 'm',
    midnight: 'm',
    noon: 'd',
    morning: 'mëngjes',
    afternoon: 'dite',
    evening: 'mbrëmje',
    night: 'natë'
  },
  abbreviated: {
    am: 'PD',
    pm: 'MD',
    midnight: 'mesnëtë',
    noon: 'drek',
    morning: 'mëngjes',
    afternoon: 'mbasdite',
    evening: 'mbrëmje',
    night: 'natë'
  },
  wide: {
    am: 'p.d.',
    pm: 'm.d.',
    midnight: 'mesnëtë',
    noon: 'drek',
    morning: 'mëngjes',
    afternoon: 'mbasdite',
    evening: 'mbrëmje',
    night: 'natë'
  }
};
var formattingDayPeriodValues$f = {
  narrow: {
    am: 'p',
    pm: 'm',
    midnight: 'm',
    noon: 'd',
    morning: 'në mëngjes',
    afternoon: 'në mbasdite',
    evening: 'në mbrëmje',
    night: 'në mesnatë'
  },
  abbreviated: {
    am: 'PD',
    pm: 'MD',
    midnight: 'mesnatë',
    noon: 'drek',
    morning: 'në mëngjes',
    afternoon: 'në mbasdite',
    evening: 'në mbrëmje',
    night: 'në mesnatë'
  },
  wide: {
    am: 'p.d.',
    pm: 'm.d.',
    midnight: 'mesnatë',
    noon: 'drek',
    morning: 'në mëngjes',
    afternoon: 'në mbasdite',
    evening: 'në mbrëmje',
    night: 'në mesnatë'
  }
};

function ordinalNumber$f(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var options = _dirtyOptions || {};
  var unit = String(options.unit);
  if (unit === 'hour') return number;
  if (number === 1) return number + '-rë';
  if (number === 4) return number + 't';
  return number + '-të';
}

var localize$f = {
  ordinalNumber: ordinalNumber$f,
  era: buildLocalizeFn({
    values: eraValues$f,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$f,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$f,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$f,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$f,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$f,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$f = /^(\d+)(-rë|-të|t|)?/i;
var parseOrdinalNumberPattern$f = /\d+/i;
var matchEraPatterns$f = {
  narrow: /^(p|m)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(para krishtit|mbas krishtit)/i
};
var parseEraPatterns$f = {
  any: [/^b/i, /^(p|m)/i]
};
var matchQuarterPatterns$f = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]-mujori (i{1,3}|iv)/i
};
var parseQuarterPatterns$f = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$f = {
  narrow: /^[jsmpqkftnd]/i,
  abbreviated: /^(jan|shk|mar|pri|maj|qer|kor|gus|sht|tet|nën|dhj)/i,
  wide: /^(janar|shkurt|mars|prill|maj|qershor|korrik|gusht|shtator|tetor|nëntor|dhjetor)/i
};
var parseMonthPatterns$f = {
  narrow: [/^j/i, /^s/i, /^m/i, /^p/i, /^m/i, /^q/i, /^k/i, /^g/i, /^s/i, /^t/i, /^n/i, /^d/i],
  any: [/^ja/i, /^shk/i, /^mar/i, /^pri/i, /^maj/i, /^qer/i, /^kor/i, /^gu/i, /^sht/i, /^tet/i, /^n/i, /^d/i]
};
var matchDayPatterns$f = {
  narrow: /^[dhmeps]/i,
  short: /^(di|hë|ma|më|en|pr|sh)/i,
  abbreviated: /^(die|hën|mar|mër|enj|pre|sht)/i,
  wide: /^(dielë|hënë|martë|mërkurë|enjte|premte|shtunë)/i
};
var parseDayPatterns$f = {
  narrow: [/^d/i, /^h/i, /^m/i, /^m/i, /^e/i, /^p/i, /^s/i],
  any: [/^d/i, /^h/i, /^ma/i, /^më/i, /^e/i, /^p/i, /^s/i]
};
var matchDayPeriodPatterns$f = {
  narrow: /^(p|m|me|në (mëngjes|mbasdite|mbrëmje|mesnatë))/i,
  any: /^([pm]\.?\s?d\.?|drek|në (mëngjes|mbasdite|mbrëmje|mesnatë))/i
};
var parseDayPeriodPatterns$f = {
  any: {
    am: /^p/i,
    pm: /^m/i,
    midnight: /^me/i,
    noon: /^dr/i,
    morning: /mëngjes/i,
    afternoon: /mbasdite/i,
    evening: /mbrëmje/i,
    night: /natë/i
  }
};
var match$f = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$f,
    parsePattern: parseOrdinalNumberPattern$f,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$f,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$f,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$f,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$f,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$f,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$f,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$f,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$f,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$f,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$f,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Albanian locale.
 * @language Shqip
 * @iso-639-2 sqi
 * @author Ardit Dine [@arditdine]{@link https://github.com/arditdine}
 */

var locale$f = {
  code: 'sq',
  formatDistance: formatDistance$f,
  formatLong: formatLong$f,
  formatRelative: formatRelative$f,
  localize: localize$f,
  match: match$f,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$e = {
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
function formatDistance$e(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$e[token] === 'string') {
    result = formatDistanceLocale$e[token];
  } else if (count === 1) {
    if (options.addSuffix) {
      if (options.comparison > 0) {
        result = formatDistanceLocale$e[token].one.withPrepositionIn;
      } else {
        result = formatDistanceLocale$e[token].one.withPrepositionAgo;
      }
    } else {
      result = formatDistanceLocale$e[token].one.standalone;
    }
  } else if (count % 10 > 1 && count % 10 < 5 && // if last digit is between 2 and 4
  String(count).substr(-2, 1) !== '1' // unless the 2nd to last digit is "1"
  ) {
      result = formatDistanceLocale$e[token].dual.replace('{{count}}', count);
    } else {
    result = formatDistanceLocale$e[token].other.replace('{{count}}', count);
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

var dateFormats$e = {
  full: 'EEEE, d. MMMM yyyy.',
  long: 'd. MMMM yyyy.',
  medium: 'd. MMM yy.',
  short: 'dd. MM. yy.'
};
var timeFormats$e = {
  full: 'HH:mm:ss (zzzz)',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$e = {
  full: "{{date}} 'у' {{time}}",
  long: "{{date}} 'у' {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$e = {
  date: buildFormatLongFn({
    formats: dateFormats$e,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$e,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$e,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$e = {
  lastWeek: function (date) {
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
  nextWeek: function (date) {
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
function formatRelative$e(token, date, _baseDate, _options) {
  var format = formatRelativeLocale$e[token];

  if (typeof format === 'function') {
    return format(date);
  }

  return format;
}

function ordinalNumber$e(dirtyNumber) {
  var number = Number(dirtyNumber);
  return String(number).concat('.');
}

var eraValues$e = {
  narrow: ['пр.н.е.', 'АД'],
  abbreviated: ['пр. Хр.', 'по. Хр.'],
  wide: ['Пре Христа', 'После Христа']
};
var monthValues$e = {
  narrow: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
  abbreviated: ['јан', 'феб', 'мар', 'апр', 'мај', 'јун', 'јул', 'авг', 'сеп', 'окт', 'нов', 'дец'],
  wide: ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар']
};
var formattingMonthValues$3 = {
  narrow: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
  abbreviated: ['јан', 'феб', 'мар', 'апр', 'мај', 'јун', 'јул', 'авг', 'сеп', 'окт', 'нов', 'дец'],
  wide: ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар']
};
var quarterValues$e = {
  narrow: ['1.', '2.', '3.', '4.'],
  abbreviated: ['1. кв.', '2. кв.', '3. кв.', '4. кв.'],
  wide: ['1. квартал', '2. квартал', '3. квартал', '4. квартал']
};
var dayValues$e = {
  narrow: ['Н', 'П', 'У', 'С', 'Ч', 'П', 'С'],
  short: ['нед', 'пон', 'уто', 'сре', 'чет', 'пет', 'суб'],
  abbreviated: ['нед', 'пон', 'уто', 'сре', 'чет', 'пет', 'суб'],
  wide: ['недеља', 'понедељак', 'уторак', 'среда', 'четвртак', 'петак', 'субота']
};
var formattingDayPeriodValues$e = {
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
var dayPeriodValues$e = {
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
var localize$e = {
  ordinalNumber: ordinalNumber$e,
  era: buildLocalizeFn({
    values: eraValues$e,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$e,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$e,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$3,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$e,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$e,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$e,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$e = /^(\d+)\./i;
var parseOrdinalNumberPattern$e = /\d+/i;
var matchEraPatterns$e = {
  narrow: /^(пр\.н\.е\.|АД)/i,
  abbreviated: /^(пр\.\s?Хр\.|по\.\s?Хр\.)/i,
  wide: /^(Пре Христа|пре нове ере|После Христа|нова ера)/i
};
var parseEraPatterns$e = {
  any: [/^пр/i, /^(по|нова)/i]
};
var matchQuarterPatterns$e = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\.\s?кв\.?/i,
  wide: /^[1234]\. квартал/i
};
var parseQuarterPatterns$e = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$e = {
  narrow: /^(10|11|12|[123456789])\./i,
  abbreviated: /^(јан|феб|мар|апр|мај|јун|јул|авг|сеп|окт|нов|дец)/i,
  wide: /^((јануар|јануара)|(фебруар|фебруара)|(март|марта)|(април|априла)|(мја|маја)|(јун|јуна)|(јул|јула)|(август|августа)|(септембар|септембра)|(октобар|октобра)|(новембар|новембра)|(децембар|децембра))/i
};
var parseMonthPatterns$e = {
  narrow: [/(10|11|12|[123456789])/i],
  any: [/^ја/i, /^ф/i, /^мар/i, /^ап/i, /^мај/i, /^јун/i, /^јул/i, /^авг/i, /^с/i, /^о/i, /^н/i, /^д/i]
};
var matchDayPatterns$e = {
  narrow: /^[пусчн]/i,
  short: /^(нед|пон|уто|сре|чет|пет|суб)/i,
  abbreviated: /^(нед|пон|уто|сре|чет|пет|суб)/i,
  wide: /^(недеља|понедељак|уторак|среда|четвртак|петак|субота)/i
};
var parseDayPatterns$e = {
  narrow: [/^п/i, /^у/i, /^с/i, /^ч/i, /^н/i],
  any: [/^нед/i, /^пон/i, /^уто/i, /^сре/i, /^чет/i, /^пет/i, /^суб/i]
};
var matchDayPeriodPatterns$e = {
  any: /^(ам|пм|поноћ|(по)?подне|увече|ноћу|после подне|ујутру)/i
};
var parseDayPeriodPatterns$e = {
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
var match$e = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$e,
    parsePattern: parseOrdinalNumberPattern$e,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$e,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$e,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$e,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$e,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$e,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$e,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$e,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$e,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$e,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$e,
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

var locale$e = {
  code: 'sr',
  formatDistance: formatDistance$e,
  formatLong: formatLong$e,
  formatRelative: formatRelative$e,
  localize: localize$e,
  match: match$e,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$d = {
  lessThanXSeconds: {
    one: {
      standalone: 'manje od 1 sekunde',
      withPrepositionAgo: 'manje od 1 sekunde',
      withPrepositionIn: 'manje od 1 sekundu'
    },
    dual: 'manje od {{count}} sekunde',
    other: 'manje od {{count}} sekundi'
  },
  xSeconds: {
    one: {
      standalone: '1 sekunda',
      withPrepositionAgo: '1 sekunde',
      withPrepositionIn: '1 sekundu'
    },
    dual: '{{count}} sekunde',
    other: '{{count}} sekundi'
  },
  halfAMinute: 'pola minute',
  lessThanXMinutes: {
    one: {
      standalone: 'manje od 1 minute',
      withPrepositionAgo: 'manje od 1 minute',
      withPrepositionIn: 'manje od 1 minutu'
    },
    dual: 'manje od {{count}} minute',
    other: 'manje od {{count}} minuta'
  },
  xMinutes: {
    one: {
      standalone: '1 minuta',
      withPrepositionAgo: '1 minute',
      withPrepositionIn: '1 minutu'
    },
    dual: '{{count}} minute',
    other: '{{count}} minuta'
  },
  aboutXHours: {
    one: {
      standalone: 'oko 1 sat',
      withPrepositionAgo: 'oko 1 sat',
      withPrepositionIn: 'oko 1 sat'
    },
    dual: 'oko {{count}} sata',
    other: 'oko {{count}} sati'
  },
  xHours: {
    one: {
      standalone: '1 sat',
      withPrepositionAgo: '1 sat',
      withPrepositionIn: '1 sat'
    },
    dual: '{{count}} sata',
    other: '{{count}} sati'
  },
  xDays: {
    one: {
      standalone: '1 dan',
      withPrepositionAgo: '1 dan',
      withPrepositionIn: '1 dan'
    },
    dual: '{{count}} dana',
    other: '{{count}} dana'
  },
  aboutXWeeks: {
    one: {
      standalone: 'oko 1 nedelju',
      withPrepositionAgo: 'oko 1 nedelju',
      withPrepositionIn: 'oko 1 nedelju'
    },
    dual: 'oko {{count}} nedelje',
    other: 'oko {{count}} nedelje'
  },
  xWeeks: {
    one: {
      standalone: '1 nedelju',
      withPrepositionAgo: '1 nedelju',
      withPrepositionIn: '1 nedelju'
    },
    dual: '{{count}} nedelje',
    other: '{{count}} nedelje'
  },
  aboutXMonths: {
    one: {
      standalone: 'oko 1 mesec',
      withPrepositionAgo: 'oko 1 mesec',
      withPrepositionIn: 'oko 1 mesec'
    },
    dual: 'oko {{count}} meseca',
    other: 'oko {{count}} meseci'
  },
  xMonths: {
    one: {
      standalone: '1 mesec',
      withPrepositionAgo: '1 mesec',
      withPrepositionIn: '1 mesec'
    },
    dual: '{{count}} meseca',
    other: '{{count}} meseci'
  },
  aboutXYears: {
    one: {
      standalone: 'oko 1 godinu',
      withPrepositionAgo: 'oko 1 godinu',
      withPrepositionIn: 'oko 1 godinu'
    },
    dual: 'oko {{count}} godine',
    other: 'oko {{count}} godina'
  },
  xYears: {
    one: {
      standalone: '1 godina',
      withPrepositionAgo: '1 godine',
      withPrepositionIn: '1 godinu'
    },
    dual: '{{count}} godine',
    other: '{{count}} godina'
  },
  overXYears: {
    one: {
      standalone: 'preko 1 godinu',
      withPrepositionAgo: 'preko 1 godinu',
      withPrepositionIn: 'preko 1 godinu'
    },
    dual: 'preko {{count}} godine',
    other: 'preko {{count}} godina'
  },
  almostXYears: {
    one: {
      standalone: 'gotovo 1 godinu',
      withPrepositionAgo: 'gotovo 1 godinu',
      withPrepositionIn: 'gotovo 1 godinu'
    },
    dual: 'gotovo {{count}} godine',
    other: 'gotovo {{count}} godina'
  }
};
function formatDistance$d(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$d[token] === 'string') {
    result = formatDistanceLocale$d[token];
  } else if (count === 1) {
    if (options.addSuffix) {
      if (options.comparison > 0) {
        result = formatDistanceLocale$d[token].one.withPrepositionIn;
      } else {
        result = formatDistanceLocale$d[token].one.withPrepositionAgo;
      }
    } else {
      result = formatDistanceLocale$d[token].one.standalone;
    }
  } else if (count % 10 > 1 && count % 10 < 5 && // if last digit is between 2 and 4
  String(count).substr(-2, 1) !== '1' // unless the 2nd to last digit is "1"
  ) {
      result = formatDistanceLocale$d[token].dual.replace('{{count}}', count);
    } else {
    result = formatDistanceLocale$d[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'za ' + result;
    } else {
      return 'pre ' + result;
    }
  }

  return result;
}

var dateFormats$d = {
  full: 'EEEE, d. MMMM yyyy.',
  long: 'd. MMMM yyyy.',
  medium: 'd. MMM yy.',
  short: 'dd. MM. yy.'
};
var timeFormats$d = {
  full: 'HH:mm:ss (zzzz)',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$d = {
  full: "{{date}} 'u' {{time}}",
  long: "{{date}} 'u' {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$d = {
  date: buildFormatLongFn({
    formats: dateFormats$d,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$d,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$d,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$d = {
  lastWeek: function (date) {
    var day = date.getUTCDay();

    switch (day) {
      case 0:
        return "'prošle nedelje u' p";

      case 3:
        return "'prošle srede u' p";

      case 6:
        return "'prošle subote u' p";

      default:
        return "'prošli' EEEE 'u' p";
    }
  },
  yesterday: "'juče u' p",
  today: "'danas u' p",
  tomorrow: "'sutra u' p",
  nextWeek: function (date) {
    var day = date.getUTCDay();

    switch (day) {
      case 0:
        return "'sledeće nedelje u' p";

      case 3:
        return "'sledeću sredu u' p";

      case 6:
        return "'sledeću subotu u' p";

      default:
        return "'sledeći' EEEE 'u' p";
    }
  },
  other: 'P'
};
function formatRelative$d(token, date, _baseDate, _options) {
  var format = formatRelativeLocale$d[token];

  if (typeof format === 'function') {
    return format(date);
  }

  return format;
}

function ordinalNumber$d(dirtyNumber) {
  var number = Number(dirtyNumber);
  return String(number).concat('.');
}

var eraValues$d = {
  narrow: ['pr.n.e.', 'AD'],
  abbreviated: ['pr. Hr.', 'po. Hr.'],
  wide: ['Pre Hrista', 'Posle Hrista']
};
var monthValues$d = {
  narrow: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
  abbreviated: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
  wide: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar']
};
var formattingMonthValues$2 = {
  narrow: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
  abbreviated: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
  wide: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar']
};
var quarterValues$d = {
  narrow: ['1.', '2.', '3.', '4.'],
  abbreviated: ['1. kv.', '2. kv.', '3. kv.', '4. kv.'],
  wide: ['1. kvartal', '2. kvartal', '3. kvartal', '4. kvartal']
};
var dayValues$d = {
  narrow: ['N', 'P', 'U', 'S', 'Č', 'P', 'S'],
  short: ['ned', 'pon', 'uto', 'sre', 'čet', 'pet', 'sub'],
  abbreviated: ['ned', 'pon', 'uto', 'sre', 'čet', 'pet', 'sub'],
  wide: ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota']
};
var formattingDayPeriodValues$d = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutru',
    afternoon: 'popodne',
    evening: 'uveče',
    night: 'noću'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutru',
    afternoon: 'popodne',
    evening: 'uveče',
    night: 'noću'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutru',
    afternoon: 'posle podne',
    evening: 'uveče',
    night: 'noću'
  }
};
var dayPeriodValues$d = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutru',
    afternoon: 'popodne',
    evening: 'uveče',
    night: 'noću'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutru',
    afternoon: 'popodne',
    evening: 'uveče',
    night: 'noću'
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'ponoć',
    noon: 'podne',
    morning: 'ujutru',
    afternoon: 'posle podne',
    evening: 'uveče',
    night: 'noću'
  }
};
var localize$d = {
  ordinalNumber: ordinalNumber$d,
  era: buildLocalizeFn({
    values: eraValues$d,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$d,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$d,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$2,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$d,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$d,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$d,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$d = /^(\d+)\./i;
var parseOrdinalNumberPattern$d = /\d+/i;
var matchEraPatterns$d = {
  narrow: /^(pr\.n\.e\.|AD)/i,
  abbreviated: /^(pr\.\s?Hr\.|po\.\s?Hr\.)/i,
  wide: /^(Pre Hrista|pre nove ere|Posle Hrista|nova era)/i
};
var parseEraPatterns$d = {
  any: [/^pr/i, /^(po|nova)/i]
};
var matchQuarterPatterns$d = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]\.\s?kv\.?/i,
  wide: /^[1234]\. kvartal/i
};
var parseQuarterPatterns$d = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$d = {
  narrow: /^(10|11|12|[123456789])\./i,
  abbreviated: /^(jan|feb|mar|apr|maj|jun|jul|avg|sep|okt|nov|dec)/i,
  wide: /^((januar|januara)|(februar|februara)|(mart|marta)|(april|aprila)|(maj|maja)|(jun|juna)|(jul|jula)|(avgust|avgusta)|(septembar|septembra)|(oktobar|oktobra)|(novembar|novembra)|(decembar|decembra))/i
};
var parseMonthPatterns$d = {
  narrow: [/(10|11|12|[123456789])/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^avg/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$d = {
  narrow: /^[npusčc]/i,
  short: /^(ned|pon|uto|sre|(čet|cet)|pet|sub)/i,
  abbreviated: /^(ned|pon|uto|sre|(čet|cet)|pet|sub)/i,
  wide: /^(nedelja|ponedeljak|utorak|sreda|(četvrtak|cetvrtak)|petak|subota)/i
};
var parseDayPatterns$d = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns$d = {
  any: /^(am|pm|ponoc|ponoć|(po)?podne|uvece|uveče|noću|posle podne|ujutru)/i
};
var parseDayPeriodPatterns$d = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^pono/i,
    noon: /^pod/i,
    morning: /jutro/i,
    afternoon: /(posle\s|po)+podne/i,
    evening: /(uvece|uveče)/i,
    night: /(nocu|noću)/i
  }
};
var match$d = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$d,
    parsePattern: parseOrdinalNumberPattern$d,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$d,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$d,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$d,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$d,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$d,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$d,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$d,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$d,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$d,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$d,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Serbian latin locale.
 * @language Serbian
 * @iso-639-2 srp
 * @author Igor Radivojević [@rogyvoje]{@link https://github.com/rogyvoje}
 */

var locale$d = {
  code: 'sr-Latn',
  formatDistance: formatDistance$d,
  formatLong: formatLong$d,
  formatRelative: formatRelative$d,
  localize: localize$d,
  match: match$d,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$c = {
  lessThanXSeconds: {
    singular: 'mindre än en sekund',
    plural: 'mindre än {{count}} sekunder'
  },
  xSeconds: {
    singular: 'en sekund',
    plural: '{{count}} sekunder'
  },
  halfAMinute: 'en halv minut',
  lessThanXMinutes: {
    singular: 'mindre än en minut',
    plural: 'mindre än {{count}} minuter'
  },
  xMinutes: {
    singular: 'en minut',
    plural: '{{count}} minuter'
  },
  aboutXHours: {
    singular: 'ungefär en timme',
    plural: 'ungefär {{count}} timmar'
  },
  xHours: {
    singular: 'en timme',
    plural: '{{count}} timmar'
  },
  xDays: {
    singular: 'en dag',
    plural: '{{count}} dagar'
  },
  aboutXWeeks: {
    singular: 'ungefär en vecka',
    plural: 'ungefär {{count}} vecka'
  },
  xWeeks: {
    singular: 'en vecka',
    plural: '{{count}} vecka'
  },
  aboutXMonths: {
    singular: 'ungefär en månad',
    plural: 'ungefär {{count}} månader'
  },
  xMonths: {
    singular: 'en månad',
    plural: '{{count}} månader'
  },
  aboutXYears: {
    singular: 'ungefär ett år',
    plural: 'ungefär {{count}} år'
  },
  xYears: {
    singular: 'ett år',
    plural: '{{count}} år'
  },
  overXYears: {
    singular: 'över ett år',
    plural: 'över {{count}} år'
  },
  almostXYears: {
    singular: 'nästan ett år',
    plural: 'nästan {{count}} år'
  }
};
var wordMapping = ['noll', 'en', 'två', 'tre', 'fyra', 'fem', 'sex', 'sju', 'åtta', 'nio', 'tio', 'elva', 'tolv'];
function formatDistance$c(token, count, options) {
  options = options || {
    onlyNumeric: false
  };
  var translation = formatDistanceLocale$c[token];
  var result;

  if (typeof translation === 'string') {
    result = translation;
  } else if (count === 0 || count > 1) {
    if (options.onlyNumeric) {
      result = translation.plural.replace('{{count}}', count);
    } else {
      result = translation.plural.replace('{{count}}', count < 13 ? wordMapping[count] : count);
    }
  } else {
    result = translation.singular;
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'om ' + result;
    } else {
      return result + ' sedan';
    }
  }

  return result;
}

var dateFormats$c = {
  full: 'EEEE d MMMM y',
  long: 'd MMMM y',
  medium: 'd MMM y',
  short: 'y-MM-dd'
};
var timeFormats$c = {
  full: "'kl'. HH:mm:ss zzzz",
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$c = {
  full: "{{date}} 'kl.' {{time}}",
  long: "{{date}} 'kl.' {{time}}",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$c = {
  date: buildFormatLongFn({
    formats: dateFormats$c,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$c,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$c,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$c = {
  lastWeek: "'i' EEEE's kl.' p",
  yesterday: "'igår kl.' p",
  today: "'idag kl.' p",
  tomorrow: "'imorgon kl.' p",
  nextWeek: "EEEE 'kl.' p",
  other: 'P'
};
function formatRelative$c(token, _date, _baseDate, _options) {
  return formatRelativeLocale$c[token];
}

var eraValues$c = {
  narrow: ['f.Kr.', 'e.Kr.'],
  abbreviated: ['f.Kr.', 'e.Kr.'],
  wide: ['före Kristus', 'efter Kristus']
};
var quarterValues$c = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1:a kvartalet', '2:a kvartalet', '3:e kvartalet', '4:e kvartalet']
};
var monthValues$c = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['jan.', 'feb.', 'mars', 'apr.', 'maj', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.'],
  wide: ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']
};
var dayValues$c = {
  narrow: ['S', 'M', 'T', 'O', 'T', 'F', 'L'],
  short: ['sö', 'må', 'ti', 'on', 'to', 'fr', 'lö'],
  abbreviated: ['sön', 'mån', 'tis', 'ons', 'tors', 'fre', 'lör'],
  wide: ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag']
}; // https://www.unicode.org/cldr/charts/32/summary/sv.html#1888

var dayPeriodValues$c = {
  narrow: {
    am: 'fm',
    pm: 'em',
    midnight: 'midnatt',
    noon: 'middag',
    morning: 'morg.',
    afternoon: 'efterm.',
    evening: 'kväll',
    night: 'natt'
  },
  abbreviated: {
    am: 'f.m.',
    pm: 'e.m.',
    midnight: 'midnatt',
    noon: 'middag',
    morning: 'morgon',
    afternoon: 'efterm.',
    evening: 'kväll',
    night: 'natt'
  },
  wide: {
    am: 'förmiddag',
    pm: 'eftermiddag',
    midnight: 'midnatt',
    noon: 'middag',
    morning: 'morgon',
    afternoon: 'eftermiddag',
    evening: 'kväll',
    night: 'natt'
  }
};
var formattingDayPeriodValues$c = {
  narrow: {
    am: 'fm',
    pm: 'em',
    midnight: 'midnatt',
    noon: 'middag',
    morning: 'på morg.',
    afternoon: 'på efterm.',
    evening: 'på kvällen',
    night: 'på natten'
  },
  abbreviated: {
    am: 'fm',
    pm: 'em',
    midnight: 'midnatt',
    noon: 'middag',
    morning: 'på morg.',
    afternoon: 'på efterm.',
    evening: 'på kvällen',
    night: 'på natten'
  },
  wide: {
    am: 'fm',
    pm: 'em',
    midnight: 'midnatt',
    noon: 'middag',
    morning: 'på morgonen',
    afternoon: 'på eftermiddagen',
    evening: 'på kvällen',
    night: 'på natten'
  }
};

function ordinalNumber$c(dirtyNumber) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
      case 2:
        return number + ':a';
    }
  }

  return number + ':e';
}

var localize$c = {
  ordinalNumber: ordinalNumber$c,
  era: buildLocalizeFn({
    values: eraValues$c,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$c,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$c,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$c,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$c,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$c,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$c = /^(\d+)(:a|:e)?/i;
var parseOrdinalNumberPattern$c = /\d+/i;
var matchEraPatterns$c = {
  narrow: /^(f\.? ?Kr\.?|f\.? ?v\.? ?t\.?|e\.? ?Kr\.?|v\.? ?t\.?)/i,
  abbreviated: /^(f\.? ?Kr\.?|f\.? ?v\.? ?t\.?|e\.? ?Kr\.?|v\.? ?t\.?)/i,
  wide: /^(före Kristus|före vår tid|efter Kristus|vår tid)/i
};
var parseEraPatterns$c = {
  any: [/^f/i, /^[ev]/i]
};
var matchQuarterPatterns$c = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](:a|:e)? kvartalet/i
};
var parseQuarterPatterns$c = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$c = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|maj|jun|jul|aug|sep|okt|nov|dec)\.?/i,
  wide: /^(januari|februari|mars|april|maj|juni|juli|augusti|september|oktober|november|december)/i
};
var parseMonthPatterns$c = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^maj/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$c = {
  narrow: /^[smtofl]/i,
  short: /^(sö|må|ti|on|to|fr|lö)/i,
  abbreviated: /^(sön|mån|tis|ons|tors|fre|lör)/i,
  wide: /^(söndag|måndag|tisdag|onsdag|torsdag|fredag|lördag)/i
};
var parseDayPatterns$c = {
  any: [/^s/i, /^m/i, /^ti/i, /^o/i, /^to/i, /^f/i, /^l/i]
};
var matchDayPeriodPatterns$c = {
  any: /^([fe]\.?\s?m\.?|midn(att)?|midd(ag)?|(på) (morgonen|eftermiddagen|kvällen|natten))/i
};
var parseDayPeriodPatterns$c = {
  any: {
    am: /^f/i,
    pm: /^e/i,
    midnight: /^midn/i,
    noon: /^midd/i,
    morning: /morgon/i,
    afternoon: /eftermiddag/i,
    evening: /kväll/i,
    night: /natt/i
  }
};
var match$c = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$c,
    parsePattern: parseOrdinalNumberPattern$c,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$c,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$c,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$c,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$c,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$c,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$c,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$c,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$c,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$c,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$c,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Swedish locale.
 * @language Swedish
 * @iso-639-2 swe
 * @author Johannes Ulén [@ejulen]{@link https://github.com/ejulen}
 * @author Alexander Nanberg [@alexandernanberg]{@link https://github.com/alexandernanberg}
 * @author Henrik Andersson [@limelights]{@link https://github.com/limelights}
 */

var locale$c = {
  code: 'sv',
  formatDistance: formatDistance$c,
  formatLong: formatLong$c,
  formatRelative: formatRelative$c,
  localize: localize$c,
  match: match$c,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$b = {
  lessThanXSeconds: {
    one: {
      default: 'ஒரு வினாடிக்கு குறைவாக',
      in: 'ஒரு வினாடிக்குள்',
      ago: 'ஒரு வினாடிக்கு முன்பு'
    },
    other: {
      default: '{{count}} வினாடிகளுக்கு குறைவாக',
      in: '{{count}} வினாடிகளுக்குள்',
      ago: '{{count}} வினாடிகளுக்கு முன்பு'
    }
  },
  xSeconds: {
    one: {
      default: '1 வினாடி',
      in: '1 வினாடியில்',
      ago: '1 வினாடி முன்பு'
    },
    other: {
      default: '{{count}} விநாடிகள்',
      in: '{{count}} வினாடிகளில்',
      ago: '{{count}} விநாடிகளுக்கு முன்பு'
    }
  },
  halfAMinute: {
    default: 'அரை நிமிடம்',
    in: 'அரை நிமிடத்தில்',
    ago: 'அரை நிமிடம் முன்பு'
  },
  lessThanXMinutes: {
    one: {
      default: 'ஒரு நிமிடத்திற்கும் குறைவாக',
      in: 'ஒரு நிமிடத்திற்குள்',
      ago: 'ஒரு நிமிடத்திற்கு முன்பு'
    },
    other: {
      default: '{{count}} நிமிடங்களுக்கும் குறைவாக',
      in: '{{count}} நிமிடங்களுக்குள்',
      ago: '{{count}} நிமிடங்களுக்கு முன்பு'
    }
  },
  xMinutes: {
    one: {
      default: '1 நிமிடம்',
      in: '1 நிமிடத்தில்',
      ago: '1 நிமிடம் முன்பு'
    },
    other: {
      default: '{{count}} நிமிடங்கள்',
      in: '{{count}} நிமிடங்களில்',
      ago: '{{count}} நிமிடங்களுக்கு முன்பு'
    }
  },
  aboutXHours: {
    one: {
      default: 'சுமார் 1 மணி நேரம்',
      in: 'சுமார் 1 மணி நேரத்தில்',
      ago: 'சுமார் 1 மணி நேரத்திற்கு முன்பு'
    },
    other: {
      default: 'சுமார் {{count}} மணி நேரம்',
      in: 'சுமார் {{count}} மணி நேரத்திற்கு முன்பு',
      ago: 'சுமார் {{count}} மணி நேரத்தில்'
    }
  },
  xHours: {
    one: {
      default: '1 மணி நேரம்',
      in: '1 மணி நேரத்தில்',
      ago: '1 மணி நேரத்திற்கு முன்பு'
    },
    other: {
      default: '{{count}} மணி நேரம்',
      in: '{{count}} மணி நேரத்தில்',
      ago: '{{count}} மணி நேரத்திற்கு முன்பு'
    }
  },
  xDays: {
    one: {
      default: '1 நாள்',
      in: '1 நாளில்',
      ago: '1 நாள் முன்பு'
    },
    other: {
      default: '{{count}} நாட்கள்',
      in: '{{count}} நாட்களில்',
      ago: '{{count}} நாட்களுக்கு முன்பு'
    }
  },
  aboutXWeeks: {
    one: {
      default: 'சுமார் 1 வாரம்',
      in: 'சுமார் 1 வாரத்தில்',
      ago: 'சுமார் 1 வாரம் முன்பு'
    },
    other: {
      default: 'சுமார் {{count}} வாரங்கள்',
      in: 'சுமார் {{count}} வாரங்களில்',
      ago: 'சுமார் {{count}} வாரங்களுக்கு முன்பு'
    }
  },
  xWeeks: {
    one: {
      default: '1 வாரம்',
      in: '1 வாரத்தில்',
      ago: '1 வாரம் முன்பு'
    },
    other: {
      default: '{{count}} வாரங்கள்',
      in: '{{count}} வாரங்களில்',
      ago: '{{count}} வாரங்களுக்கு முன்பு'
    }
  },
  aboutXMonths: {
    one: {
      default: 'சுமார் 1 மாதம்',
      in: 'சுமார் 1 மாதத்தில்',
      ago: 'சுமார் 1 மாதத்திற்கு முன்பு'
    },
    other: {
      default: 'சுமார் {{count}} மாதங்கள்',
      in: 'சுமார் {{count}} மாதங்களில்',
      ago: 'சுமார் {{count}} மாதங்களுக்கு முன்பு'
    }
  },
  xMonths: {
    one: {
      default: '1 மாதம்',
      in: '1 மாதத்தில்',
      ago: '1 மாதம் முன்பு'
    },
    other: {
      default: '{{count}} மாதங்கள்',
      in: '{{count}} மாதங்களில்',
      ago: '{{count}} மாதங்களுக்கு முன்பு'
    }
  },
  aboutXYears: {
    one: {
      default: 'சுமார் 1 வருடம்',
      in: 'சுமார் 1 ஆண்டில்',
      ago: 'சுமார் 1 வருடம் முன்பு'
    },
    other: {
      default: 'சுமார் {{count}} ஆண்டுகள்',
      in: 'சுமார் {{count}} ஆண்டுகளில்',
      ago: 'சுமார் {{count}} ஆண்டுகளுக்கு முன்பு'
    }
  },
  xYears: {
    one: {
      default: '1 வருடம்',
      in: '1 ஆண்டில்',
      ago: '1 வருடம் முன்பு'
    },
    other: {
      default: '{{count}} ஆண்டுகள்',
      in: '{{count}} ஆண்டுகளில்',
      ago: '{{count}} ஆண்டுகளுக்கு முன்பு'
    }
  },
  overXYears: {
    one: {
      default: '1 வருடத்திற்கு மேல்',
      in: '1 வருடத்திற்கும் மேலாக',
      ago: '1 வருடம் முன்பு'
    },
    other: {
      default: '{{count}} ஆண்டுகளுக்கும் மேலாக',
      in: '{{count}} ஆண்டுகளில்',
      ago: '{{count}} ஆண்டுகளுக்கு முன்பு'
    }
  },
  almostXYears: {
    one: {
      default: 'கிட்டத்தட்ட 1 வருடம்',
      in: 'கிட்டத்தட்ட 1 ஆண்டில்',
      ago: 'கிட்டத்தட்ட 1 வருடம் முன்பு'
    },
    other: {
      default: 'கிட்டத்தட்ட {{count}} ஆண்டுகள்',
      in: 'கிட்டத்தட்ட {{count}} ஆண்டுகளில்',
      ago: 'கிட்டத்தட்ட {{count}} ஆண்டுகளுக்கு முன்பு'
    }
  }
};

function getFormatDistanceLocaleWithSuffix(resultObj, options) {
  if (options.addSuffix) {
    if (options.comparison > 0) {
      return resultObj.in;
    } else {
      return resultObj.ago;
    }
  }

  return resultObj.default;
}

function formatDistance$b(token, count) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var result;

  if (formatDistanceLocale$b[token].default) {
    result = getFormatDistanceLocaleWithSuffix(formatDistanceLocale$b[token], options);
  } else if (count === 1) {
    result = getFormatDistanceLocaleWithSuffix(formatDistanceLocale$b[token].one, options);
  } else {
    result = getFormatDistanceLocaleWithSuffix(formatDistanceLocale$b[token].other, options);
  }

  return result.replace('{{count}}', count);
}

// Ref: https://www.unicode.org/cldr/charts/32/summary/ta.html

var dateFormats$b = {
  full: 'EEEE, d MMMM, y',
  long: 'd MMMM, y',
  medium: 'd MMM, y',
  short: 'd/M/yy'
}; // CLDR #1850 - #1853

var timeFormats$b = {
  full: 'a h:mm:ss zzzz',
  long: 'a h:mm:ss z',
  medium: 'a h:mm:ss',
  short: 'a h:mm'
};
var dateTimeFormats$b = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$b = {
  date: buildFormatLongFn({
    formats: dateFormats$b,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$b,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$b,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$b = {
  lastWeek: "'கடந்த' eeee p 'மணிக்கு'",
  yesterday: "'நேற்று ' p 'மணிக்கு'",
  today: "'இன்று ' p 'மணிக்கு'",
  tomorrow: "'நாளை ' p 'மணிக்கு'",
  nextWeek: "eeee p 'மணிக்கு'",
  other: 'P'
};
function formatRelative$b(token, _date, _baseDate, _options) {
  return formatRelativeLocale$b[token];
}

// Ref: https://www.unicode.org/cldr/charts/32/summary/ta.html
var eraValues$b = {
  narrow: ['கி.மு.', 'கி.பி.'],
  abbreviated: ['கி.மு.', 'கி.பி.'],
  // CLDR #1624, #1626
  wide: ['கிறிஸ்துவுக்கு முன்', 'அன்னோ டோமினி'] // CLDR #1620, #1622

};
var quarterValues$b = {
  // CLDR #1644 - #1647
  narrow: ['1', '2', '3', '4'],
  // CLDR #1636 - #1639
  abbreviated: ['காலா.1', 'காலா.2', 'காலா.3', 'காலா.4'],
  // CLDR #1628 - #1631
  wide: ['ஒன்றாம் காலாண்டு', 'இரண்டாம் காலாண்டு', 'மூன்றாம் காலாண்டு', 'நான்காம் காலாண்டு']
};
var monthValues$b = {
  // CLDR #700 - #711
  narrow: ['ஜ', 'பி', 'மா', 'ஏ', 'மே', 'ஜூ', 'ஜூ', 'ஆ', 'செ', 'அ', 'ந', 'டி'],
  // CLDR #1676 - #1687
  abbreviated: ['ஜன.', 'பிப்.', 'மார்.', 'ஏப்.', 'மே', 'ஜூன்', 'ஜூலை', 'ஆக.', 'செப்.', 'அக்.', 'நவ.', 'டிச.'],
  // CLDR #1652 - #1663
  wide: ['ஜனவரி', // January
  'பிப்ரவரி', // February
  'மார்ச்', // March
  'ஏப்ரல்', // April
  'மே', // May
  'ஜூன்', // June
  'ஜூலை', // July
  'ஆகஸ்ட்', // August
  'செப்டம்பர்', // September
  'அக்டோபர்', // October
  'நவம்பர்', // November
  'டிசம்பர்' // December
  ]
};
var dayValues$b = {
  // CLDR #1766 - #1772
  narrow: ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச'],
  // CLDR #1752 - #1758
  short: ['ஞா', 'தி', 'செ', 'பு', 'வி', 'வெ', 'ச'],
  // CLDR #1738 - #1744
  abbreviated: ['ஞாயி.', 'திங்.', 'செவ்.', 'புத.', 'வியா.', 'வெள்.', 'சனி'],
  // CLDR #1724 - #1730
  wide: ['ஞாயிறு', // Sunday
  'திங்கள்', // Monday
  'செவ்வாய்', // Tuesday
  'புதன்', // Wednesday
  'வியாழன்', // Thursday
  'வெள்ளி', // Friday
  'சனி' // Saturday
  ]
}; // CLDR #1780 - #1845

var dayPeriodValues$b = {
  narrow: {
    am: 'மு.ப',
    pm: 'பி.ப',
    midnight: 'நள்.',
    noon: 'நண்.',
    morning: 'கா.',
    afternoon: 'மதி.',
    evening: 'மா.',
    night: 'இர.'
  },
  abbreviated: {
    am: 'முற்பகல்',
    pm: 'பிற்பகல்',
    midnight: 'நள்ளிரவு',
    noon: 'நண்பகல்',
    morning: 'காலை',
    afternoon: 'மதியம்',
    evening: 'மாலை',
    night: 'இரவு'
  },
  wide: {
    am: 'முற்பகல்',
    pm: 'பிற்பகல்',
    midnight: 'நள்ளிரவு',
    noon: 'நண்பகல்',
    morning: 'காலை',
    afternoon: 'மதியம்',
    evening: 'மாலை',
    night: 'இரவு'
  }
}; // CLDR #1780 - #1845

var formattingDayPeriodValues$b = {
  narrow: {
    am: 'மு.ப',
    pm: 'பி.ப',
    midnight: 'நள்.',
    noon: 'நண்.',
    morning: 'கா.',
    afternoon: 'மதி.',
    evening: 'மா.',
    night: 'இர.'
  },
  abbreviated: {
    am: 'முற்பகல்',
    pm: 'பிற்பகல்',
    midnight: 'நள்ளிரவு',
    noon: 'நண்பகல்',
    morning: 'காலை',
    afternoon: 'மதியம்',
    evening: 'மாலை',
    night: 'இரவு'
  },
  wide: {
    am: 'முற்பகல்',
    pm: 'பிற்பகல்',
    midnight: 'நள்ளிரவு',
    noon: 'நண்பகல்',
    morning: 'காலை',
    afternoon: 'மதியம்',
    evening: 'மாலை',
    night: 'இரவு'
  }
};

function ordinalNumber$b(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'
  // var rem100 = number % 100
  // if (rem100 > 20 || rem100 < 10) {
  //   switch (rem100 % 10) {
  //     case 1:
  //       return number + 'st'
  //     case 2:
  //       return number + 'nd'
  //     case 3:
  //       return number + 'rd'
  //   }
  // }
  // return number + 'th'

  return number;
}

var localize$b = {
  ordinalNumber: ordinalNumber$b,
  era: buildLocalizeFn({
    values: eraValues$b,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$b,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$b,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$b,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$b,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$b,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$b = /^(\d+)(வது)?/i;
var parseOrdinalNumberPattern$b = /\d+/i;
var matchEraPatterns$b = {
  narrow: /^(கி.மு.|கி.பி.)/i,
  abbreviated: /^(கி\.?\s?மு\.?|கி\.?\s?பி\.?)/,
  wide: /^(கிறிஸ்துவுக்கு\sமுன்|அன்னோ\sடோமினி)/i
};
var parseEraPatterns$b = {
  any: [/கி\.?\s?மு\.?/, /கி\.?\s?பி\.?/]
};
var matchQuarterPatterns$b = {
  narrow: /^[1234]/i,
  abbreviated: /^காலா.[1234]/i,
  wide: /^(ஒன்றாம்|இரண்டாம்|மூன்றாம்|நான்காம்) காலாண்டு/i
};
var parseQuarterPatterns$b = {
  narrow: [/1/i, /2/i, /3/i, /4/i],
  any: [/(1|காலா.1|ஒன்றாம்)/i, /(2|காலா.2|இரண்டாம்)/i, /(3|காலா.3|மூன்றாம்)/i, /(4|காலா.4|நான்காம்)/i]
};
var matchMonthPatterns$b = {
  narrow: /^(ஜ|பி|மா|ஏ|மே|ஜூ|ஆ|செ|அ|ந|டி)$/i,
  abbreviated: /^(ஜன.|பிப்.|மார்.|ஏப்.|மே|ஜூன்|ஜூலை|ஆக.|செப்.|அக்.|நவ.|டிச.)/i,
  wide: /^(ஜனவரி|பிப்ரவரி|மார்ச்|ஏப்ரல்|மே|ஜூன்|ஜூலை|ஆகஸ்ட்|செப்டம்பர்|அக்டோபர்|நவம்பர்|டிசம்பர்)/i
};
var parseMonthPatterns$b = {
  narrow: [/^ஜ$/i, /^பி/i, /^மா/i, /^ஏ/i, /^மே/i, /^ஜூ/i, /^ஜூ/i, /^ஆ/i, /^செ/i, /^அ/i, /^ந/i, /^டி/i],
  any: [/^ஜன/i, /^பி/i, /^மா/i, /^ஏ/i, /^மே/i, /^ஜூன்/i, /^ஜூலை/i, /^ஆ/i, /^செ/i, /^அ/i, /^ந/i, /^டி/i]
};
var matchDayPatterns$b = {
  narrow: /^(ஞா|தி|செ|பு|வி|வெ|ச)/i,
  short: /^(ஞா|தி|செ|பு|வி|வெ|ச)/i,
  abbreviated: /^(ஞாயி.|திங்.|செவ்.|புத.|வியா.|வெள்.|சனி)/i,
  wide: /^(ஞாயிறு|திங்கள்|செவ்வாய்|புதன்|வியாழன்|வெள்ளி|சனி)/i
};
var parseDayPatterns$b = {
  narrow: [/^ஞா/i, /^தி/i, /^செ/i, /^பு/i, /^வி/i, /^வெ/i, /^ச/i],
  any: [/^ஞா/i, /^தி/i, /^செ/i, /^பு/i, /^வி/i, /^வெ/i, /^ச/i]
};
var matchDayPeriodPatterns$b = {
  narrow: /^(மு.ப|பி.ப|நள்|நண்|காலை|மதியம்|மாலை|இரவு)/i,
  any: /^(மு.ப|பி.ப|முற்பகல்|பிற்பகல்|நள்ளிரவு|நண்பகல்|காலை|மதியம்|மாலை|இரவு)/i
};
var parseDayPeriodPatterns$b = {
  any: {
    am: /^மு/i,
    pm: /^பி/i,
    midnight: /^நள்/i,
    noon: /^நண்/i,
    morning: /காலை/i,
    afternoon: /மதியம்/i,
    evening: /மாலை/i,
    night: /இரவு/i
  }
};
var match$b = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$b,
    parsePattern: parseOrdinalNumberPattern$b,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$b,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$b,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$b,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$b,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$b,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$b,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$b,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$b,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$b,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$b,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Tamil locale (India).
 * @language Tamil
 * @iso-639-2 tam
 * @author Sibiraj [@sibiraj-s]{@link https://github.com/sibiraj-s}
 */

var locale$b = {
  code: 'ta',
  formatDistance: formatDistance$b,
  formatLong: formatLong$b,
  formatRelative: formatRelative$b,
  localize: localize$b,
  match: match$b,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

// Source: https://www.unicode.org/cldr/charts/32/summary/te.html
var formatDistanceLocale$a = {
  lessThanXSeconds: {
    standalone: {
      one: 'సెకను కన్నా తక్కువ',
      other: '{{count}} సెకన్ల కన్నా తక్కువ'
    },
    withPreposition: {
      one: 'సెకను',
      other: '{{count}} సెకన్ల'
    }
  },
  xSeconds: {
    standalone: {
      one: 'ఒక సెకను',
      // CLDR #1314
      other: '{{count}} సెకన్ల'
    },
    withPreposition: {
      one: 'ఒక సెకను',
      other: '{{count}} సెకన్ల'
    }
  },
  halfAMinute: {
    standalone: 'అర నిమిషం',
    withPreposition: 'అర నిమిషం'
  },
  lessThanXMinutes: {
    standalone: {
      one: 'ఒక నిమిషం కన్నా తక్కువ',
      other: '{{count}} నిమిషాల కన్నా తక్కువ'
    },
    withPreposition: {
      one: 'ఒక నిమిషం',
      other: '{{count}} నిమిషాల'
    }
  },
  xMinutes: {
    standalone: {
      one: 'ఒక నిమిషం',
      // CLDR #1311
      other: '{{count}} నిమిషాలు'
    },
    withPreposition: {
      one: 'ఒక నిమిషం',
      // CLDR #1311
      other: '{{count}} నిమిషాల'
    }
  },
  aboutXHours: {
    standalone: {
      one: 'సుమారు ఒక గంట',
      other: 'సుమారు {{count}} గంటలు'
    },
    withPreposition: {
      one: 'సుమారు ఒక గంట',
      other: 'సుమారు {{count}} గంటల'
    }
  },
  xHours: {
    standalone: {
      one: 'ఒక గంట',
      // CLDR #1308
      other: '{{count}} గంటలు'
    },
    withPreposition: {
      one: 'ఒక గంట',
      other: '{{count}} గంటల'
    }
  },
  xDays: {
    standalone: {
      one: 'ఒక రోజు',
      // CLDR #1292
      other: '{{count}} రోజులు'
    },
    withPreposition: {
      one: 'ఒక రోజు',
      other: '{{count}} రోజుల'
    }
  },
  aboutXWeeks: {
    standalone: {
      one: 'సుమారు ఒక వారం',
      other: 'సుమారు {{count}} వారాలు'
    },
    withPreposition: {
      one: 'సుమారు ఒక వారం',
      other: 'సుమారు {{count}} వారాలల'
    }
  },
  xWeeks: {
    standalone: {
      one: 'ఒక వారం',
      other: '{{count}} వారాలు'
    },
    withPreposition: {
      one: 'ఒక వారం',
      other: '{{count}} వారాలల'
    }
  },
  aboutXMonths: {
    standalone: {
      one: 'సుమారు ఒక నెల',
      other: 'సుమారు {{count}} నెలలు'
    },
    withPreposition: {
      one: 'సుమారు ఒక నెల',
      other: 'సుమారు {{count}} నెలల'
    }
  },
  xMonths: {
    standalone: {
      one: 'ఒక నెల',
      // CLDR #1281
      other: '{{count}} నెలలు'
    },
    withPreposition: {
      one: 'ఒక నెల',
      other: '{{count}} నెలల'
    }
  },
  aboutXYears: {
    standalone: {
      one: 'సుమారు ఒక సంవత్సరం',
      other: 'సుమారు {{count}} సంవత్సరాలు'
    },
    withPreposition: {
      one: 'సుమారు ఒక సంవత్సరం',
      other: 'సుమారు {{count}} సంవత్సరాల'
    }
  },
  xYears: {
    standalone: {
      one: 'ఒక సంవత్సరం',
      // CLDR #1275
      other: '{{count}} సంవత్సరాలు'
    },
    withPreposition: {
      one: 'ఒక సంవత్సరం',
      other: '{{count}} సంవత్సరాల'
    }
  },
  overXYears: {
    standalone: {
      one: 'ఒక సంవత్సరం పైగా',
      other: '{{count}} సంవత్సరాలకు పైగా'
    },
    withPreposition: {
      one: 'ఒక సంవత్సరం',
      other: '{{count}} సంవత్సరాల'
    }
  },
  almostXYears: {
    standalone: {
      one: 'దాదాపు ఒక సంవత్సరం',
      other: 'దాదాపు {{count}} సంవత్సరాలు'
    },
    withPreposition: {
      one: 'దాదాపు ఒక సంవత్సరం',
      other: 'దాదాపు {{count}} సంవత్సరాల'
    }
  }
};
function formatDistance$a(token, count, options) {
  options = options || {};
  var usageGroup = options.addSuffix ? formatDistanceLocale$a[token].withPreposition : formatDistanceLocale$a[token].standalone;
  var result;

  if (typeof usageGroup === 'string') {
    result = usageGroup;
  } else if (count === 1) {
    result = usageGroup.one;
  } else {
    result = usageGroup.other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return result + 'లో';
    } else {
      return result + ' క్రితం';
    }
  }

  return result;
}

// CLDR #1807 - #1811

var dateFormats$a = {
  full: 'd, MMMM y, EEEE',
  long: 'd MMMM, y',
  medium: 'd MMM, y',
  short: 'dd-MM-yy'
}; // CLDR #1807 - #1811

var timeFormats$a = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
}; // CLDR #1815 - #1818

var dateTimeFormats$a = {
  full: "{{date}} {{time}}'కి'",
  long: "{{date}} {{time}}'కి'",
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$a = {
  date: buildFormatLongFn({
    formats: dateFormats$a,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$a,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$a,
    defaultWidth: 'full'
  })
};

// Source: https://www.unicode.org/cldr/charts/32/summary/te.html
var formatRelativeLocale$a = {
  lastWeek: "'గత' eeee p",
  // CLDR #1384
  yesterday: "'నిన్న' p",
  // CLDR #1393
  today: "'ఈ రోజు' p",
  // CLDR #1394
  tomorrow: "'రేపు' p",
  // CLDR #1395
  nextWeek: "'తదుపరి' eeee p",
  // CLDR #1386
  other: 'P'
};
function formatRelative$a(token, _date, _baseDate, _options) {
  return formatRelativeLocale$a[token];
}

// Source: https://dsal.uchicago.edu/dictionaries/brown/
// CLDR #1605 - #1608

var eraValues$a = {
  narrow: ['క్రీ.పూ.', 'క్రీ.శ.'],
  abbreviated: ['క్రీ.పూ.', 'క్రీ.శ.'],
  wide: ['క్రీస్తు పూర్వం', 'క్రీస్తుశకం']
}; // CLDR #1613 - #1628

var quarterValues$a = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['త్రై1', 'త్రై2', 'త్రై3', 'త్రై4'],
  wide: ['1వ త్రైమాసికం', '2వ త్రైమాసికం', '3వ త్రైమాసికం', '4వ త్రైమాసికం']
}; // CLDR #1637 - #1708

var monthValues$a = {
  narrow: ['జ', 'ఫి', 'మా', 'ఏ', 'మే', 'జూ', 'జు', 'ఆ', 'సె', 'అ', 'న', 'డి'],
  abbreviated: ['జన', 'ఫిబ్ర', 'మార్చి', 'ఏప్రి', 'మే', 'జూన్', 'జులై', 'ఆగ', 'సెప్టెం', 'అక్టో', 'నవం', 'డిసెం'],
  wide: ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జులై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్']
}; // CLDR #1709 - #1764

var dayValues$a = {
  narrow: ['ఆ', 'సో', 'మ', 'బు', 'గు', 'శు', 'శ'],
  short: ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'],
  abbreviated: ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'],
  wide: ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం']
}; // CLDR #1767 - #1806

var dayPeriodValues$a = {
  narrow: {
    am: 'పూర్వాహ్నం',
    pm: 'అపరాహ్నం',
    midnight: 'అర్ధరాత్రి',
    noon: 'మిట్టమధ్యాహ్నం',
    morning: 'ఉదయం',
    afternoon: 'మధ్యాహ్నం',
    evening: 'సాయంత్రం',
    night: 'రాత్రి'
  },
  abbreviated: {
    am: 'పూర్వాహ్నం',
    pm: 'అపరాహ్నం',
    midnight: 'అర్ధరాత్రి',
    noon: 'మిట్టమధ్యాహ్నం',
    morning: 'ఉదయం',
    afternoon: 'మధ్యాహ్నం',
    evening: 'సాయంత్రం',
    night: 'రాత్రి'
  },
  wide: {
    am: 'పూర్వాహ్నం',
    pm: 'అపరాహ్నం',
    midnight: 'అర్ధరాత్రి',
    noon: 'మిట్టమధ్యాహ్నం',
    morning: 'ఉదయం',
    afternoon: 'మధ్యాహ్నం',
    evening: 'సాయంత్రం',
    night: 'రాత్రి'
  }
};
var formattingDayPeriodValues$a = {
  narrow: {
    am: 'పూర్వాహ్నం',
    pm: 'అపరాహ్నం',
    midnight: 'అర్ధరాత్రి',
    noon: 'మిట్టమధ్యాహ్నం',
    morning: 'ఉదయం',
    afternoon: 'మధ్యాహ్నం',
    evening: 'సాయంత్రం',
    night: 'రాత్రి'
  },
  abbreviated: {
    am: 'పూర్వాహ్నం',
    pm: 'అపరాహ్నం',
    midnight: 'అర్ధరాత్రి',
    noon: 'మిట్టమధ్యాహ్నం',
    morning: 'ఉదయం',
    afternoon: 'మధ్యాహ్నం',
    evening: 'సాయంత్రం',
    night: 'రాత్రి'
  },
  wide: {
    am: 'పూర్వాహ్నం',
    pm: 'అపరాహ్నం',
    midnight: 'అర్ధరాత్రి',
    noon: 'మిట్టమధ్యాహ్నం',
    morning: 'ఉదయం',
    afternoon: 'మధ్యాహ్నం',
    evening: 'సాయంత్రం',
    night: 'రాత్రి'
  }
};

function ordinalNumber$a(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  return number + 'వ';
}

var localize$a = {
  ordinalNumber: ordinalNumber$a,
  era: buildLocalizeFn({
    values: eraValues$a,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$a,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$a,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$a,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$a,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$a,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$a = /^(\d+)(వ)?/i;
var parseOrdinalNumberPattern$a = /\d+/i;
var matchEraPatterns$a = {
  narrow: /^(క్రీ\.పూ\.|క్రీ\.శ\.)/i,
  abbreviated: /^(క్రీ\.?\s?పూ\.?|ప్ర\.?\s?శ\.?\s?పూ\.?|క్రీ\.?\s?శ\.?|సా\.?\s?శ\.?)/i,
  wide: /^(క్రీస్తు పూర్వం|ప్రస్తుత శకానికి పూర్వం|క్రీస్తు శకం|ప్రస్తుత శకం)/i
};
var parseEraPatterns$a = {
  any: [/^(పూ|శ)/i, /^సా/i]
};
var matchQuarterPatterns$a = {
  narrow: /^[1234]/i,
  abbreviated: /^త్రై[1234]/i,
  wide: /^[1234](వ)? త్రైమాసికం/i
};
var parseQuarterPatterns$a = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$a = {
  narrow: /^(జూ|జు|జ|ఫి|మా|ఏ|మే|ఆ|సె|అ|న|డి)/i,
  abbreviated: /^(జన|ఫిబ్ర|మార్చి|ఏప్రి|మే|జూన్|జులై|ఆగ|సెప్|అక్టో|నవ|డిసె)/i,
  wide: /^(జనవరి|ఫిబ్రవరి|మార్చి|ఏప్రిల్|మే|జూన్|జులై|ఆగస్టు|సెప్టెంబర్|అక్టోబర్|నవంబర్|డిసెంబర్)/i
};
var parseMonthPatterns$a = {
  narrow: [/^జ/i, /^ఫి/i, /^మా/i, /^ఏ/i, /^మే/i, /^జూ/i, /^జు/i, /^ఆ/i, /^సె/i, /^అ/i, /^న/i, /^డి/i],
  any: [/^జన/i, /^ఫి/i, /^మా/i, /^ఏ/i, /^మే/i, /^జూన్/i, /^జులై/i, /^ఆగ/i, /^సె/i, /^అ/i, /^న/i, /^డి/i]
};
var matchDayPatterns$a = {
  narrow: /^(ఆ|సో|మ|బు|గు|శు|శ)/i,
  short: /^(ఆది|సోమ|మం|బుధ|గురు|శుక్ర|శని)/i,
  abbreviated: /^(ఆది|సోమ|మం|బుధ|గురు|శుక్ర|శని)/i,
  wide: /^(ఆదివారం|సోమవారం|మంగళవారం|బుధవారం|గురువారం|శుక్రవారం|శనివారం)/i
};
var parseDayPatterns$a = {
  narrow: [/^ఆ/i, /^సో/i, /^మ/i, /^బు/i, /^గు/i, /^శు/i, /^శ/i],
  any: [/^ఆది/i, /^సోమ/i, /^మం/i, /^బుధ/i, /^గురు/i, /^శుక్ర/i, /^శని/i]
};
var matchDayPeriodPatterns$a = {
  narrow: /^(పూర్వాహ్నం|అపరాహ్నం|అర్ధరాత్రి|మిట్టమధ్యాహ్నం|ఉదయం|మధ్యాహ్నం|సాయంత్రం|రాత్రి)/i,
  any: /^(పూర్వాహ్నం|అపరాహ్నం|అర్ధరాత్రి|మిట్టమధ్యాహ్నం|ఉదయం|మధ్యాహ్నం|సాయంత్రం|రాత్రి)/i
};
var parseDayPeriodPatterns$a = {
  any: {
    am: /^పూర్వాహ్నం/i,
    pm: /^అపరాహ్నం/i,
    midnight: /^అర్ధ/i,
    noon: /^మిట్ట/i,
    morning: /ఉదయం/i,
    afternoon: /మధ్యాహ్నం/i,
    evening: /సాయంత్రం/i,
    night: /రాత్రి/i
  }
};
var match$a = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$a,
    parsePattern: parseOrdinalNumberPattern$a,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$a,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$a,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$a,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$a,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$a,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$a,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$a,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$a,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$a,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$a,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Telugu locale
 * @language Telugu
 * @iso-639-2 tel
 * @author Kranthi Lakum [@kranthilakum]{@link https://github.com/kranthilakum}
 */

var locale$a = {
  code: 'te',
  formatDistance: formatDistance$a,
  formatLong: formatLong$a,
  formatRelative: formatRelative$a,
  localize: localize$a,
  match: match$a,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$9 = {
  lessThanXSeconds: {
    one: 'น้อยกว่า 1 วินาที',
    other: 'น้อยกว่า {{count}} วินาที'
  },
  xSeconds: {
    one: '1 วินาที',
    other: '{{count}} วินาที'
  },
  halfAMinute: 'ครึ่งนาที',
  lessThanXMinutes: {
    one: 'น้อยกว่า 1 นาที',
    other: 'น้อยกว่า {{count}} นาที'
  },
  xMinutes: {
    one: '1 นาที',
    other: '{{count}} นาที'
  },
  aboutXHours: {
    one: 'ประมาณ 1 ชั่วโมง',
    other: 'ประมาณ {{count}} ชั่วโมง'
  },
  xHours: {
    one: '1 ชั่วโมง',
    other: '{{count}} ชั่วโมง'
  },
  xDays: {
    one: '1 วัน',
    other: '{{count}} วัน'
  },
  aboutXWeeks: {
    one: 'ประมาณ 1 สัปดาห์',
    other: 'ประมาณ {{count}} สัปดาห์'
  },
  xWeeks: {
    one: '1 สัปดาห์',
    other: '{{count}} สัปดาห์'
  },
  aboutXMonths: {
    one: 'ประมาณ 1 เดือน',
    other: 'ประมาณ {{count}} เดือน'
  },
  xMonths: {
    one: '1 เดือน',
    other: '{{count}} เดือน'
  },
  aboutXYears: {
    one: 'ประมาณ 1 ปี',
    other: 'ประมาณ {{count}} ปี'
  },
  xYears: {
    one: '1 ปี',
    other: '{{count}} ปี'
  },
  overXYears: {
    one: 'มากกว่า 1 ปี',
    other: 'มากกว่า {{count}} ปี'
  },
  almostXYears: {
    one: 'เกือบ 1 ปี',
    other: 'เกือบ {{count}} ปี'
  }
};
function formatDistance$9(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$9[token] === 'string') {
    result = formatDistanceLocale$9[token];
  } else if (count === 1) {
    result = formatDistanceLocale$9[token].one;
  } else {
    result = formatDistanceLocale$9[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      if (token === 'halfAMinute') {
        return 'ใน' + result;
      } else {
        return 'ใน ' + result;
      }
    } else {
      return result + 'ที่ผ่านมา';
    }
  }

  return result;
}

var dateFormats$9 = {
  full: 'วันEEEEที่ do MMMM y',
  long: 'do MMMM y',
  medium: 'd MMM y',
  short: 'dd/MM/yyyy'
};
var timeFormats$9 = {
  full: 'H:mm:ss น. zzzz',
  long: 'H:mm:ss น. z',
  medium: 'H:mm:ss น.',
  short: 'H:mm น.'
};
var dateTimeFormats$9 = {
  full: "{{date}} 'เวลา' {{time}}",
  long: "{{date}} 'เวลา' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$9 = {
  date: buildFormatLongFn({
    formats: dateFormats$9,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$9,
    defaultWidth: 'medium'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$9,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$9 = {
  lastWeek: "eeee'ที่แล้วเวลา' p",
  yesterday: "'เมื่อวานนี้เวลา' p",
  today: "'วันนี้เวลา' p",
  tomorrow: "'พรุ่งนี้เวลา' p",
  nextWeek: "eeee 'เวลา' p",
  other: 'P'
};
function formatRelative$9(token, _date, _baseDate, _options) {
  return formatRelativeLocale$9[token];
}

var eraValues$9 = {
  narrow: ['B', 'คศ'],
  abbreviated: ['BC', 'ค.ศ.'],
  wide: ['ปีก่อนคริสตกาล', 'คริสต์ศักราช']
};
var quarterValues$9 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['ไตรมาสแรก', 'ไตรมาสที่สอง', 'ไตรมาสที่สาม', 'ไตรมาสที่สี่']
};
var dayValues$9 = {
  narrow: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
  short: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
  abbreviated: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
  wide: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
};
var monthValues$9 = {
  narrow: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
  abbreviated: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
  wide: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
};
var dayPeriodValues$9 = {
  narrow: {
    am: 'ก่อนเที่ยง',
    pm: 'หลังเที่ยง',
    midnight: 'เที่ยงคืน',
    noon: 'เที่ยง',
    morning: 'เช้า',
    afternoon: 'บ่าย',
    evening: 'เย็น',
    night: 'กลางคืน'
  },
  abbreviated: {
    am: 'ก่อนเที่ยง',
    pm: 'หลังเที่ยง',
    midnight: 'เที่ยงคืน',
    noon: 'เที่ยง',
    morning: 'เช้า',
    afternoon: 'บ่าย',
    evening: 'เย็น',
    night: 'กลางคืน'
  },
  wide: {
    am: 'ก่อนเที่ยง',
    pm: 'หลังเที่ยง',
    midnight: 'เที่ยงคืน',
    noon: 'เที่ยง',
    morning: 'เช้า',
    afternoon: 'บ่าย',
    evening: 'เย็น',
    night: 'กลางคืน'
  }
};
var formattingDayPeriodValues$9 = {
  narrow: {
    am: 'ก่อนเที่ยง',
    pm: 'หลังเที่ยง',
    midnight: 'เที่ยงคืน',
    noon: 'เที่ยง',
    morning: 'ตอนเช้า',
    afternoon: 'ตอนกลางวัน',
    evening: 'ตอนเย็น',
    night: 'ตอนกลางคืน'
  },
  abbreviated: {
    am: 'ก่อนเที่ยง',
    pm: 'หลังเที่ยง',
    midnight: 'เที่ยงคืน',
    noon: 'เที่ยง',
    morning: 'ตอนเช้า',
    afternoon: 'ตอนกลางวัน',
    evening: 'ตอนเย็น',
    night: 'ตอนกลางคืน'
  },
  wide: {
    am: 'ก่อนเที่ยง',
    pm: 'หลังเที่ยง',
    midnight: 'เที่ยงคืน',
    noon: 'เที่ยง',
    morning: 'ตอนเช้า',
    afternoon: 'ตอนกลางวัน',
    evening: 'ตอนเย็น',
    night: 'ตอนกลางคืน'
  }
};

function ordinalNumber$9(dirtyNumber) {
  var number = Number(dirtyNumber);
  return number;
}

var localize$9 = {
  ordinalNumber: ordinalNumber$9,
  era: buildLocalizeFn({
    values: eraValues$9,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$9,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$9,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$9,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$9,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$9,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$9 = /^\d+/i;
var parseOrdinalNumberPattern$9 = /\d+/i;
var matchEraPatterns$9 = {
  narrow: /^([bB]|[aA]|คศ)/i,
  abbreviated: /^([bB]\.?\s?[cC]\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?|ค\.?ศ\.?)/i,
  wide: /^(ก่อนคริสตกาล|คริสต์ศักราช|คริสตกาล)/i
};
var parseEraPatterns$9 = {
  any: [/^[bB]/i, /^(^[aA]|ค\.?ศ\.?|คริสตกาล|คริสต์ศักราช|)/i]
};
var matchQuarterPatterns$9 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^ไตรมาส(ที่)? ?[1234]/i
};
var parseQuarterPatterns$9 = {
  any: [/(1|แรก|หนึ่ง)/i, /(2|สอง)/i, /(3|สาม)/i, /(4|สี่)/i]
};
var matchMonthPatterns$9 = {
  narrow: /^(ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?)/i,
  abbreviated: /^(ม\.?ค\.?|ก\.?พ\.?|มี\.?ค\.?|เม\.?ย\.?|พ\.?ค\.?|มิ\.?ย\.?|ก\.?ค\.?|ส\.?ค\.?|ก\.?ย\.?|ต\.?ค\.?|พ\.?ย\.?|ธ\.?ค\.?')/i,
  wide: /^(มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม)/i
};
var parseMonthPatterns$9 = {
  wide: [/^มก/i, /^กุม/i, /^มี/i, /^เม/i, /^พฤษ/i, /^มิ/i, /^กรก/i, /^ส/i, /^กัน/i, /^ต/i, /^พฤศ/i, /^ธ/i],
  any: [/^ม\.?ค\.?/i, /^ก\.?พ\.?/i, /^มี\.?ค\.?/i, /^เม\.?ย\.?/i, /^พ\.?ค\.?/i, /^มิ\.?ย\.?/i, /^ก\.?ค\.?/i, /^ส\.?ค\.?/i, /^ก\.?ย\.?/i, /^ต\.?ค\.?/i, /^พ\.?ย\.?/i, /^ธ\.?ค\.?/i]
};
var matchDayPatterns$9 = {
  narrow: /^(อา\.?|จ\.?|อ\.?|พฤ\.?|พ\.?|ศ\.?|ส\.?)/i,
  short: /^(อา\.?|จ\.?|อ\.?|พฤ\.?|พ\.?|ศ\.?|ส\.?)/i,
  abbreviated: /^(อา\.?|จ\.?|อ\.?|พฤ\.?|พ\.?|ศ\.?|ส\.?)/i,
  wide: /^(อาทิตย์|จันทร์|อังคาร|พุธ|พฤหัสบดี|ศุกร์|เสาร์)/i
};
var parseDayPatterns$9 = {
  wide: [/^อา/i, /^จั/i, /^อั/i, /^พุธ/i, /^พฤ/i, /^ศ/i, /^เส/i],
  any: [/^อา/i, /^จ/i, /^อ/i, /^พ(?!ฤ)/i, /^พฤ/i, /^ศ/i, /^ส/i]
};
var matchDayPeriodPatterns$9 = {
  any: /^(ก่อนเที่ยง|หลังเที่ยง|เที่ยงคืน|เที่ยง|(ตอน.*?)?.*(เที่ยง|เช้า|บ่าย|เย็น|กลางคืน))/i
};
var parseDayPeriodPatterns$9 = {
  any: {
    am: /^ก่อนเที่ยง/i,
    pm: /^หลังเที่ยง/i,
    midnight: /^เที่ยงคืน/i,
    noon: /^เที่ยง/i,
    morning: /เช้า/i,
    afternoon: /บ่าย/i,
    evening: /เย็น/i,
    night: /กลางคืน/i
  }
};
var match$9 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$9,
    parsePattern: parseOrdinalNumberPattern$9,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$9,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$9,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$9,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$9,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$9,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$9,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$9,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$9,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$9,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$9,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Thai locale.
 * @language Thai
 * @iso-639-2 tha
 * @author Athiwat Hirunworawongkun [@athivvat]{@link https://github.com/athivvat}
 * @author [@hawkup]{@link https://github.com/hawkup}
 * @author  Jirawat I. [@nodtem66]{@link https://github.com/nodtem66}
 */

var locale$9 = {
  code: 'th',
  formatDistance: formatDistance$9,
  formatLong: formatLong$9,
  formatRelative: formatRelative$9,
  localize: localize$9,
  match: match$9,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$8 = {
  lessThanXSeconds: {
    one: 'bir saniyeden az',
    other: '{{count}} saniyeden az'
  },
  xSeconds: {
    one: '1 saniye',
    other: '{{count}} saniye'
  },
  halfAMinute: 'yarım dakika',
  lessThanXMinutes: {
    one: 'bir dakikadan az',
    other: '{{count}} dakikadan az'
  },
  xMinutes: {
    one: '1 dakika',
    other: '{{count}} dakika'
  },
  aboutXHours: {
    one: 'yaklaşık 1 saat',
    other: 'yaklaşık {{count}} saat'
  },
  xHours: {
    one: '1 saat',
    other: '{{count}} saat'
  },
  xDays: {
    one: '1 gün',
    other: '{{count}} gün'
  },
  aboutXWeeks: {
    one: 'yaklaşık 1 hafta',
    other: 'yaklaşık {{count}} hafta'
  },
  xWeeks: {
    one: '1 hafta',
    other: '{{count}} hafta'
  },
  aboutXMonths: {
    one: 'yaklaşık 1 ay',
    other: 'yaklaşık {{count}} ay'
  },
  xMonths: {
    one: '1 ay',
    other: '{{count}} ay'
  },
  aboutXYears: {
    one: 'yaklaşık 1 yıl',
    other: 'yaklaşık {{count}} yıl'
  },
  xYears: {
    one: '1 yıl',
    other: '{{count}} yıl'
  },
  overXYears: {
    one: '1 yıldan fazla',
    other: '{{count}} yıldan fazla'
  },
  almostXYears: {
    one: 'neredeyse 1 yıl',
    other: 'neredeyse {{count}} yıl'
  }
};

var formatDistance$8 = function (token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$8[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }

  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + ' sonra';
    } else {
      return result + ' önce';
    }
  }

  return result;
};

var dateFormats$8 = {
  full: 'd MMMM y EEEE',
  long: 'd MMMM y',
  medium: 'd MMM y',
  short: 'dd.MM.yyyy'
};
var timeFormats$8 = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$8 = {
  full: "{{date}} 'saat' {{time}}",
  long: "{{date}} 'saat' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$8 = {
  date: buildFormatLongFn({
    formats: dateFormats$8,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$8,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$8,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$8 = {
  lastWeek: "'geçen hafta' eeee 'saat' p",
  yesterday: "'dün saat' p",
  today: "'bugün saat' p",
  tomorrow: "'yarın saat' p",
  nextWeek: "eeee 'saat' p",
  other: 'P'
};

var formatRelative$8 = function (token, _date, _baseDate, _options) {
  return formatRelativeLocale$8[token];
};

var eraValues$8 = {
  narrow: ['MÖ', 'MS'],
  abbreviated: ['MÖ', 'MS'],
  wide: ['Milattan Önce', 'Milattan Sonra']
};
var quarterValues$8 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1Ç', '2Ç', '3Ç', '4Ç'],
  wide: ['İlk çeyrek', 'İkinci Çeyrek', 'Üçüncü çeyrek', 'Son çeyrek']
};
var monthValues$8 = {
  narrow: ['O', 'Ş', 'M', 'N', 'M', 'H', 'T', 'A', 'E', 'E', 'K', 'A'],
  abbreviated: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  wide: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
};
var dayValues$8 = {
  narrow: ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],
  short: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
  abbreviated: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'],
  wide: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']
};
var dayPeriodValues$8 = {
  narrow: {
    am: 'öö',
    pm: 'ös',
    midnight: 'gy',
    noon: 'ö',
    morning: 'sa',
    afternoon: 'ös',
    evening: 'ak',
    night: 'ge'
  },
  abbreviated: {
    am: 'ÖÖ',
    pm: 'ÖS',
    midnight: 'gece yarısı',
    noon: 'öğle',
    morning: 'sabah',
    afternoon: 'öğleden sonra',
    evening: 'akşam',
    night: 'gece'
  },
  wide: {
    am: 'Ö.Ö.',
    pm: 'Ö.S.',
    midnight: 'gece yarısı',
    noon: 'öğle',
    morning: 'sabah',
    afternoon: 'öğleden sonra',
    evening: 'akşam',
    night: 'gece'
  }
};
var formattingDayPeriodValues$8 = {
  narrow: {
    am: 'öö',
    pm: 'ös',
    midnight: 'gy',
    noon: 'ö',
    morning: 'sa',
    afternoon: 'ös',
    evening: 'ak',
    night: 'ge'
  },
  abbreviated: {
    am: 'ÖÖ',
    pm: 'ÖS',
    midnight: 'gece yarısı',
    noon: 'öğlen',
    morning: 'sabahleyin',
    afternoon: 'öğleden sonra',
    evening: 'akşamleyin',
    night: 'geceleyin'
  },
  wide: {
    am: 'ö.ö.',
    pm: 'ö.s.',
    midnight: 'gece yarısı',
    noon: 'öğlen',
    morning: 'sabahleyin',
    afternoon: 'öğleden sonra',
    evening: 'akşamleyin',
    night: 'geceleyin'
  }
};

var ordinalNumber$8 = function (dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + '.';
};

var localize$8 = {
  ordinalNumber: ordinalNumber$8,
  era: buildLocalizeFn({
    values: eraValues$8,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$8,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$8,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$8,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$8,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$8,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$8 = /^(\d+)(\.)?/i;
var parseOrdinalNumberPattern$8 = /\d+/i;
var matchEraPatterns$8 = {
  narrow: /^(mö|ms)/i,
  abbreviated: /^(mö|ms)/i,
  wide: /^(milattan önce|milattan sonra)/i
};
var parseEraPatterns$8 = {
  any: [/(^mö|^milattan önce)/i, /(^ms|^milattan sonra)/i]
};
var matchQuarterPatterns$8 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]ç/i,
  wide: /^((i|İ)lk|(i|İ)kinci|üçüncü|son) çeyrek/i
};
var parseQuarterPatterns$8 = {
  any: [/1/i, /2/i, /3/i, /4/i],
  abbreviated: [/1ç/i, /2ç/i, /3ç/i, /4ç/i],
  wide: [/^(i|İ)lk çeyrek/i, /(i|İ)kinci çeyrek/i, /üçüncü çeyrek/i, /son çeyrek/i]
};
var matchMonthPatterns$8 = {
  narrow: /^[oşmnhtaek]/i,
  abbreviated: /^(oca|şub|mar|nis|may|haz|tem|ağu|eyl|eki|kas|ara)/i,
  wide: /^(ocak|şubat|mart|nisan|mayıs|haziran|temmuz|ağustos|eylül|ekim|kasım|aralık)/i
};
var parseMonthPatterns$8 = {
  narrow: [/^o/i, /^ş/i, /^m/i, /^n/i, /^m/i, /^h/i, /^t/i, /^a/i, /^e/i, /^e/i, /^k/i, /^a/i],
  any: [/^o/i, /^ş/i, /^mar/i, /^n/i, /^may/i, /^h/i, /^t/i, /^ağ/i, /^ey/i, /^ek/i, /^k/i, /^ar/i]
};
var matchDayPatterns$8 = {
  narrow: /^[psçc]/i,
  short: /^(pz|pt|sa|ça|pe|cu|ct)/i,
  abbreviated: /^(paz|pzt|sal|çar|per|cum|cts)/i,
  wide: /^(pazar|pazartesi|salı|çarşamba|perşembe|cuma|cumartesi)/i
};
var parseDayPatterns$8 = {
  narrow: [/^p/i, /^p/i, /^s/i, /^ç/i, /^p/i, /^c/i, /^c/i],
  any: [/^pz/i, /^pt/i, /^sa/i, /^ça/i, /^pe/i, /^cu/i, /^ct/i],
  wide: [/^pazar/i, /^pazartesi/i, /^salı/i, /^çarşamba/i, /^perşembe/i, /^cuma/i, /cumartesi/i]
};
var matchDayPeriodPatterns$8 = {
  narrow: /^(öö|ös|gy|ö|sa|ös|ak|ge)/i,
  any: /^(ö\.?\s?[ös]\.?|öğleden sonra|gece yarısı|öğle|(sabah|öğ|akşam|gece)(leyin))/i
};
var parseDayPeriodPatterns$8 = {
  any: {
    am: /^ö\.?ö\.?/i,
    pm: /^ö\.?s\.?/i,
    midnight: /^(gy|gece yarısı)/i,
    noon: /^öğ/i,
    morning: /^sa/i,
    afternoon: /^öğleden sonra/i,
    evening: /^ak/i,
    night: /^ge/i
  }
};
var match$8 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$8,
    parsePattern: parseOrdinalNumberPattern$8,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$8,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$8,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$8,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$8,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$8,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$8,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$8,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$8,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$8,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$8,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Turkish locale.
 * @language Turkish
 * @iso-639-2 tur
 * @author Alpcan Aydın [@alpcanaydin]{@link https://github.com/alpcanaydin}
 * @author Berkay Sargın [@berkaey]{@link https://github.com/berkaey}
 * @author Fatih Bulut [@bulutfatih]{@link https://github.com/bulutfatih}
 * @author Ismail Demirbilek [@dbtek]{@link https://github.com/dbtek}
 * @author İsmail Kayar [@ikayar]{@link https://github.com/ikayar}
 *
 *
 */

var locale$8 = {
  code: 'tr',
  formatDistance: formatDistance$8,
  formatLong: formatLong$8,
  formatRelative: formatRelative$8,
  localize: localize$8,
  match: match$8,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$7 = {
  lessThanXSeconds: {
    one: 'بىر سىكۇنت ئىچىدە',
    other: 'سىكۇنت ئىچىدە {{count}}'
  },
  xSeconds: {
    one: 'بىر سىكۇنت',
    other: 'سىكۇنت {{count}}'
  },
  halfAMinute: 'يىرىم مىنۇت',
  lessThanXMinutes: {
    one: 'بىر مىنۇت ئىچىدە',
    other: 'مىنۇت ئىچىدە {{count}}'
  },
  xMinutes: {
    one: 'بىر مىنۇت',
    other: 'مىنۇت {{count}}'
  },
  aboutXHours: {
    one: 'تەخمىنەن بىر سائەت',
    other: 'سائەت {{count}} تەخمىنەن'
  },
  xHours: {
    one: 'بىر سائەت',
    other: 'سائەت {{count}}'
  },
  xDays: {
    one: 'بىر كۈن',
    other: 'كۈن {{count}}'
  },
  aboutXWeeks: {
    one: 'تەخمىنەن بىرھەپتە',
    other: 'ھەپتە {{count}} تەخمىنەن'
  },
  xWeeks: {
    one: 'بىرھەپتە',
    other: 'ھەپتە {{count}}'
  },
  aboutXMonths: {
    one: 'تەخمىنەن بىر ئاي',
    other: 'ئاي {{count}} تەخمىنەن'
  },
  xMonths: {
    one: 'بىر ئاي',
    other: 'ئاي {{count}}'
  },
  aboutXYears: {
    one: 'تەخمىنەن بىر يىل',
    other: 'يىل {{count}} تەخمىنەن'
  },
  xYears: {
    one: 'بىر يىل',
    other: 'يىل {{count}}'
  },
  overXYears: {
    one: 'بىر يىلدىن ئارتۇق',
    other: 'يىلدىن ئارتۇق {{count}}'
  },
  almostXYears: {
    one: 'ئاساسەن بىر يىل',
    other: 'يىل {{count}} ئاساسەن'
  }
};
function formatDistance$7(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$7[token] === 'string') {
    result = formatDistanceLocale$7[token];
  } else if (count === 1) {
    result = formatDistanceLocale$7[token].one;
  } else {
    result = formatDistanceLocale$7[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return result;
    } else {
      return result + ' بولدى';
    }
  }

  return result;
}

var dateFormats$7 = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats$7 = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats$7 = {
  full: "{{date}} 'دە' {{time}}",
  long: "{{date}} 'دە' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$7 = {
  date: buildFormatLongFn({
    formats: dateFormats$7,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$7,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$7,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$7 = {
  lastWeek: "'ئ‍ۆتكەن' eeee 'دە' p",
  yesterday: "'تۈنۈگۈن دە' p",
  today: "'بۈگۈن دە' p",
  tomorrow: "'ئەتە دە' p",
  nextWeek: "eeee 'دە' p",
  other: 'P'
};
function formatRelative$7(token, _date, _baseDate, _options) {
  return formatRelativeLocale$7[token];
}

var eraValues$7 = {
  narrow: ['ب', 'ك'],
  abbreviated: ['ب', 'ك'],
  wide: ['مىيلادىدىن بۇرۇن', 'مىيلادىدىن كىيىن']
};
var quarterValues$7 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1', '2', '3', '4'],
  wide: ['بىرىنجى چارەك', 'ئىككىنجى چارەك', 'ئۈچىنجى چارەك', 'تۆتىنجى چارەك']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$7 = {
  narrow: ['ي', 'ف', 'م', 'ا', 'م', 'ى', 'ى', 'ا', 'س', 'ۆ', 'ن', 'د'],
  abbreviated: ['يانۋار', 'فېۋىرال', 'مارت', 'ئاپرىل', 'ماي', 'ئىيۇن', 'ئىيول', 'ئاۋغۇست', 'سىنتەبىر', 'ئۆكتەبىر', 'نويابىر', 'دىكابىر'],
  wide: ['يانۋار', 'فېۋىرال', 'مارت', 'ئاپرىل', 'ماي', 'ئىيۇن', 'ئىيول', 'ئاۋغۇست', 'سىنتەبىر', 'ئۆكتەبىر', 'نويابىر', 'دىكابىر']
};
var dayValues$7 = {
  narrow: ['ي', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  short: ['ي', 'د', 'س', 'چ', 'پ', 'ج', 'ش'],
  abbreviated: ['يەكشەنبە', 'دۈشەنبە', 'سەيشەنبە', 'چارشەنبە', 'پەيشەنبە', 'جۈمە', 'شەنبە'],
  wide: ['يەكشەنبە', 'دۈشەنبە', 'سەيشەنبە', 'چارشەنبە', 'پەيشەنبە', 'جۈمە', 'شەنبە']
};
var dayPeriodValues$7 = {
  narrow: {
    am: 'ئە',
    pm: 'چ',
    midnight: 'ك',
    noon: 'چ',
    morning: 'ئەتىگەن',
    afternoon: 'چۈشتىن كىيىن',
    evening: 'ئاخشىم',
    night: 'كىچە'
  },
  abbreviated: {
    am: 'ئە',
    pm: 'چ',
    midnight: 'ك',
    noon: 'چ',
    morning: 'ئەتىگەن',
    afternoon: 'چۈشتىن كىيىن',
    evening: 'ئاخشىم',
    night: 'كىچە'
  },
  wide: {
    am: 'ئە',
    pm: 'چ',
    midnight: 'ك',
    noon: 'چ',
    morning: 'ئەتىگەن',
    afternoon: 'چۈشتىن كىيىن',
    evening: 'ئاخشىم',
    night: 'كىچە'
  }
};
var formattingDayPeriodValues$7 = {
  narrow: {
    am: 'ئە',
    pm: 'چ',
    midnight: 'ك',
    noon: 'چ',
    morning: 'ئەتىگەندە',
    afternoon: 'چۈشتىن كىيىن',
    evening: 'ئاخشامدا',
    night: 'كىچىدە'
  },
  abbreviated: {
    am: 'ئە',
    pm: 'چ',
    midnight: 'ك',
    noon: 'چ',
    morning: 'ئەتىگەندە',
    afternoon: 'چۈشتىن كىيىن',
    evening: 'ئاخشامدا',
    night: 'كىچىدە'
  },
  wide: {
    am: 'ئە',
    pm: 'چ',
    midnight: 'ك',
    noon: 'چ',
    morning: 'ئەتىگەندە',
    afternoon: 'چۈشتىن كىيىن',
    evening: 'ئاخشامدا',
    night: 'كىچىدە'
  }
};

function ordinalNumber$7(dirtyNumber, _dirtyOptions) {
  return String(dirtyNumber);
}

var localize$7 = {
  ordinalNumber: ordinalNumber$7,
  era: buildLocalizeFn({
    values: eraValues$7,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$7,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$7,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$7,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$7,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$7,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$7 = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern$7 = /\d+/i;
var matchEraPatterns$7 = {
  narrow: /^(ب|ك)/i,
  wide: /^(مىيلادىدىن بۇرۇن|مىيلادىدىن كىيىن)/i
};
var parseEraPatterns$7 = {
  any: [/^بۇرۇن/i, /^كىيىن/i]
};
var matchQuarterPatterns$7 = {
  narrow: /^[1234]/i,
  abbreviated: /^چ[1234]/i,
  wide: /^چارەك [1234]/i
};
var parseQuarterPatterns$7 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$7 = {
  // eslint-disable-next-line no-misleading-character-class
  narrow: /^[يفمئامئ‍ئاسۆند]/i,
  abbreviated: /^(يانۋار|فېۋىرال|مارت|ئاپرىل|ماي|ئىيۇن|ئىيول|ئاۋغۇست|سىنتەبىر|ئۆكتەبىر|نويابىر|دىكابىر)/i,
  wide: /^(يانۋار|فېۋىرال|مارت|ئاپرىل|ماي|ئىيۇن|ئىيول|ئاۋغۇست|سىنتەبىر|ئۆكتەبىر|نويابىر|دىكابىر)/i
};
var parseMonthPatterns$7 = {
  narrow: [/^ي/i, /^ف/i, /^م/i, /^ا/i, /^م/i, /^ى‍/i, /^ى‍/i, /^ا‍/i, /^س/i, /^ۆ/i, /^ن/i, /^د/i],
  any: [/^يان/i, /^فېۋ/i, /^مار/i, /^ئاپ/i, /^ماي/i, /^ئىيۇن/i, /^ئىيول/i, /^ئاۋ/i, /^سىن/i, /^ئۆك/i, /^نوي/i, /^دىك/i]
};
var matchDayPatterns$7 = {
  narrow: /^[دسچپجشي]/i,
  short: /^(يە|دۈ|سە|چا|پە|جۈ|شە)/i,
  abbreviated: /^(يە|دۈ|سە|چا|پە|جۈ|شە)/i,
  wide: /^(يەكشەنبە|دۈشەنبە|سەيشەنبە|چارشەنبە|پەيشەنبە|جۈمە|شەنبە)/i
};
var parseDayPatterns$7 = {
  narrow: [/^ي/i, /^د/i, /^س/i, /^چ/i, /^پ/i, /^ج/i, /^ش/i],
  any: [/^ي/i, /^د/i, /^س/i, /^چ/i, /^پ/i, /^ج/i, /^ش/i]
};
var matchDayPeriodPatterns$7 = {
  narrow: /^(ئە|چ|ك|چ|(دە|ئەتىگەن) ( ئە‍|چۈشتىن كىيىن|ئاخشىم|كىچە))/i,
  any: /^(ئە|چ|ك|چ|(دە|ئەتىگەن) ( ئە‍|چۈشتىن كىيىن|ئاخشىم|كىچە))/i
};
var parseDayPeriodPatterns$7 = {
  any: {
    am: /^ئە/i,
    pm: /^چ/i,
    midnight: /^ك/i,
    noon: /^چ/i,
    morning: /ئەتىگەن/i,
    afternoon: /چۈشتىن كىيىن/i,
    evening: /ئاخشىم/i,
    night: /كىچە/i
  }
};
var match$7 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$7,
    parsePattern: parseOrdinalNumberPattern$7,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$7,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$7,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$7,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$7,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$7,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$7,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$7,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$7,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$7,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$7,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Uighur locale
 * @language Uighur
 * @iso-639-2 uig
 * @author Abduwaly M. [@abduwaly]{@link https://github.com/abduwaly}
 */

var locale$7 = {
  code: 'ug',
  formatDistance: formatDistance$7,
  formatLong: formatLong$7,
  formatRelative: formatRelative$7,
  localize: localize$7,
  match: match$7,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

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

var formatDistanceLocale$6 = {
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
  halfAMinute: function (_, options) {
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
function formatDistance$6(token, count, options) {
  options = options || {};
  return formatDistanceLocale$6[token](count, options);
}

var dateFormats$6 = {
  full: "EEEE, do MMMM y 'р.'",
  long: "do MMMM y 'р.'",
  medium: "d MMM y 'р.'",
  short: 'dd.MM.y'
};
var timeFormats$6 = {
  full: 'H:mm:ss zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$6 = {
  full: "{{date}} 'о' {{time}}",
  long: "{{date}} 'о' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong$6 = {
  date: buildFormatLongFn({
    formats: dateFormats$6,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$6,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$6,
    defaultWidth: 'full'
  })
};

var accusativeWeekdays = ['неділю', 'понеділок', 'вівторок', 'середу', 'четвер', 'п’ятницю', 'суботу'];

function lastWeek(day) {
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

function nextWeek(day) {
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

var formatRelativeLocale$6 = {
  lastWeek: function (date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek(day);
    } else {
      return lastWeek(day);
    }
  },
  yesterday: "'вчора о' p",
  today: "'сьогодні о' p",
  tomorrow: "'завтра о' p",
  nextWeek: function (date, baseDate, options) {
    var day = date.getUTCDay();

    if (isSameUTCWeek(date, baseDate, options)) {
      return thisWeek(day);
    } else {
      return nextWeek(day);
    }
  },
  other: 'P'
};
function formatRelative$6(token, date, baseDate, options) {
  var format = formatRelativeLocale$6[token];

  if (typeof format === 'function') {
    return format(date, baseDate, options);
  }

  return format;
}

var eraValues$6 = {
  narrow: ['до н.е.', 'н.е.'],
  abbreviated: ['до н. е.', 'н. е.'],
  wide: ['до нашої ери', 'нашої ери']
};
var quarterValues$6 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1-й кв.', '2-й кв.', '3-й кв.', '4-й кв.'],
  wide: ['1-й квартал', '2-й квартал', '3-й квартал', '4-й квартал']
};
var monthValues$6 = {
  // ДСТУ 3582:2013
  narrow: ['С', 'Л', 'Б', 'К', 'Т', 'Ч', 'Л', 'С', 'В', 'Ж', 'Л', 'Г'],
  abbreviated: ['січ.', 'лют.', 'берез.', 'квіт.', 'трав.', 'черв.', 'лип.', 'серп.', 'верес.', 'жовт.', 'листоп.', 'груд.'],
  wide: ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень']
};
var formattingMonthValues$1 = {
  narrow: ['С', 'Л', 'Б', 'К', 'Т', 'Ч', 'Л', 'С', 'В', 'Ж', 'Л', 'Г'],
  abbreviated: ['січ.', 'лют.', 'берез.', 'квіт.', 'трав.', 'черв.', 'лип.', 'серп.', 'верес.', 'жовт.', 'листоп.', 'груд.'],
  wide: ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня']
};
var dayValues$6 = {
  narrow: ['Н', 'П', 'В', 'С', 'Ч', 'П', 'С'],
  short: ['нд', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  abbreviated: ['нед', 'пон', 'вів', 'сер', 'чтв', 'птн', 'суб'],
  wide: ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', 'п’ятниця', 'субота']
};
var dayPeriodValues$6 = {
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
var formattingDayPeriodValues$6 = {
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

function ordinalNumber$6(dirtyNumber, dirtyOptions) {
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

var localize$6 = {
  ordinalNumber: ordinalNumber$6,
  era: buildLocalizeFn({
    values: eraValues$6,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$6,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$6,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues$1,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$6,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$6,
    defaultWidth: 'any',
    formattingValues: formattingDayPeriodValues$6,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$6 = /^(\d+)(-?(е|й|є|а|я))?/i;
var parseOrdinalNumberPattern$6 = /\d+/i;
var matchEraPatterns$6 = {
  narrow: /^((до )?н\.?\s?е\.?)/i,
  abbreviated: /^((до )?н\.?\s?е\.?)/i,
  wide: /^(до нашої ери|нашої ери|наша ера)/i
};
var parseEraPatterns$6 = {
  any: [/^д/i, /^н/i]
};
var matchQuarterPatterns$6 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234](-?[иі]?й?)? кв.?/i,
  wide: /^[1234](-?[иі]?й?)? квартал/i
};
var parseQuarterPatterns$6 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$6 = {
  narrow: /^[слбктчвжг]/i,
  abbreviated: /^(січ|лют|бер|берез|кві|трав?|чер|лип|сер|вер|жов|лис(топ)?|груд)\.?/i,
  wide: /^(січень|січня|лютий|лютого|березень|березня|квітень|квітня|травень|травня|липень|липня|серпень|серпня|вересень|вересня|жовтень|жовтня|листопада?|грудень|грудня)/i
};
var parseMonthPatterns$6 = {
  narrow: [/^с/i, /^л/i, /^б/i, /^к/i, /^т/i, /^ч/i, /^л/i, /^с/i, /^в/i, /^ж/i, /^л/i, /^г/i],
  any: [/^сі/i, /^лю/i, /^б/i, /^к/i, /^т/i, /^ч/i, /^лип/i, /^се/i, /^в/i, /^ж/i, /^лис/i, /^г/i]
};
var matchDayPatterns$6 = {
  narrow: /^[нпвсч]/i,
  short: /^(нд|пн|вт|ср|чт|пт|сб)\.?/i,
  abbreviated: /^(нед|пон|вів|сер|че?тв|птн?|суб)\.?/i,
  wide: /^(неділ[яі]|понеділ[ок][ка]|вівтор[ок][ка]|серед[аи]|четвер(га)?|п\W*?ятниц[яі]|субот[аи])/i
};
var parseDayPatterns$6 = {
  narrow: [/^н/i, /^п/i, /^в/i, /^с/i, /^ч/i, /^п/i, /^с/i],
  any: [/^н/i, /^п[он]/i, /^в/i, /^с[ер]/i, /^ч/i, /^п\W*?[ят]/i, /^с[уб]/i]
};
var matchDayPeriodPatterns$6 = {
  narrow: /^([дп]п|півн\.?|пол\.?|ранок|ранку|день|дня|веч\.?|ніч|ночі)/i,
  abbreviated: /^([дп]п|півн\.?|пол\.?|ранок|ранку|день|дня|веч\.?|ніч|ночі)/i,
  wide: /^([дп]п|північ|полудень|ранок|ранку|день|дня|вечір|вечора|ніч|ночі)/i
};
var parseDayPeriodPatterns$6 = {
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
var match$6 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$6,
    parsePattern: parseOrdinalNumberPattern$6,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$6,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$6,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$6,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$6,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$6,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$6,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$6,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$6,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$6,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPeriodPatterns$6,
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

var locale$6 = {
  code: 'uk',
  formatDistance: formatDistance$6,
  formatLong: formatLong$6,
  formatRelative: formatRelative$6,
  localize: localize$6,
  match: match$6,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$5 = {
  lessThanXSeconds: {
    one: 'sekunddan kam',
    other: '{{count}} sekunddan kam'
  },
  xSeconds: {
    one: '1 sekund',
    other: '{{count}} sekund'
  },
  halfAMinute: 'yarim minut',
  lessThanXMinutes: {
    one: 'bir minutdan kam',
    other: '{{count}} minutdan kam'
  },
  xMinutes: {
    one: '1 minut',
    other: '{{count}} minut'
  },
  aboutXHours: {
    one: 'tahminan 1 soat',
    other: 'tahminan {{count}} soat'
  },
  xHours: {
    one: '1 soat',
    other: '{{count}} soat'
  },
  xDays: {
    one: '1 kun',
    other: '{{count}} kun'
  },
  aboutXWeeks: {
    one: 'tahminan 1 hafta',
    other: 'tahminan {{count}} hafta'
  },
  xWeeks: {
    one: '1 hafta',
    other: '{{count}} hafta'
  },
  aboutXMonths: {
    one: 'tahminan 1 oy',
    other: 'tahminan {{count}} oy'
  },
  xMonths: {
    one: '1 oy',
    other: '{{count}} oy'
  },
  aboutXYears: {
    one: 'tahminan 1 yil',
    other: 'tahminan {{count}} yil'
  },
  xYears: {
    one: '1 yil',
    other: '{{count}} yil'
  },
  overXYears: {
    one: "1 yildan ko'p",
    other: "{{count}} yildan ko'p"
  },
  almostXYears: {
    one: 'deyarli 1 yil',
    other: 'deyarli {{count}} yil'
  }
};
function formatDistance$5(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$5[token] === 'string') {
    result = formatDistanceLocale$5[token];
  } else if (count === 1) {
    result = formatDistanceLocale$5[token].one;
  } else {
    result = formatDistanceLocale$5[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return result + ' dan keyin';
    } else {
      return result + ' oldin';
    }
  }

  return result;
}

var dateFormats$5 = {
  full: 'EEEE, do MMMM, y',
  long: 'do MMMM, y',
  medium: 'd MMM, y',
  short: 'dd/MM/yyyy'
};
var timeFormats$5 = {
  full: 'h:mm:ss zzzz',
  long: 'h:mm:ss z',
  medium: 'h:mm:ss',
  short: 'h:mm'
};
var dateTimeFormats$5 = {
  any: '{{date}}, {{time}}'
};
var formatLong$5 = {
  date: buildFormatLongFn({
    formats: dateFormats$5,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$5,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$5,
    defaultWidth: 'any'
  })
};

var formatRelativeLocale$5 = {
  lastWeek: "'oldingi' eeee p 'da'",
  yesterday: "'kecha' p 'da'",
  today: "'bugun' p 'da'",
  tomorrow: "'ertaga' p 'da'",
  nextWeek: "eeee p 'da'",
  other: 'P'
};
function formatRelative$5(token, _date, _baseDate, _options) {
  return formatRelativeLocale$5[token];
}

var eraValues$5 = {
  narrow: ['M.A', 'M.'],
  abbreviated: ['M.A', 'M.'],
  wide: ['Miloddan Avvalgi', 'Milodiy']
};
var quarterValues$5 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['CH.1', 'CH.2', 'CH.3', 'CH.4'],
  wide: ['1-chi chorak', '2-chi chorak', '3-chi chorak', '4-chi chorak']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$5 = {
  narrow: ['Y', 'F', 'M', 'A', 'M', 'I', 'I', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
  wide: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr']
};
var dayValues$5 = {
  narrow: ['Y', 'D', 'S', 'CH', 'P', 'J', 'SH'],
  short: ['Ya', 'Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha'],
  abbreviated: ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'],
  wide: ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
};
var dayPeriodValues$5 = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'y.t',
    noon: 'p.',
    morning: 'ertalab',
    afternoon: 'tushdan keyin',
    evening: 'kechqurun',
    night: 'tun'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'yarim tun',
    noon: 'peshin',
    morning: 'ertalab',
    afternoon: 'tushdan keyin',
    evening: 'kechqurun',
    night: 'tun'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'yarim tun',
    noon: 'peshin',
    morning: 'ertalab',
    afternoon: 'tushdan keyin',
    evening: 'kechqurun',
    night: 'tun'
  }
};
var formattingDayPeriodValues$5 = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'y.t',
    noon: 'p.',
    morning: 'ertalab',
    afternoon: 'tushdan keyin',
    evening: 'kechqurun',
    night: 'tun'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'yarim tun',
    noon: 'peshin',
    morning: 'ertalab',
    afternoon: 'tushdan keyin',
    evening: 'kechqurun',
    night: 'tun'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'yarim tun',
    noon: 'peshin',
    morning: 'ertalab',
    afternoon: 'tushdan keyin',
    evening: 'kechqurun',
    night: 'tun'
  }
};

function ordinalNumber$5(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  return number;
}

var localize$5 = {
  ordinalNumber: ordinalNumber$5,
  era: buildLocalizeFn({
    values: eraValues$5,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$5,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$5,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$5,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$5,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$5,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$5 = /^(\d+)(chi)?/i;
var parseOrdinalNumberPattern$5 = /\d+/i;
var matchEraPatterns$5 = {
  narrow: /^(m\.a|m\.)/i,
  abbreviated: /^(m\.a\.?\s?m\.?)/i,
  wide: /^(miloddan avval|miloddan keyin)/i
};
var parseEraPatterns$5 = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns$5 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](chi)? chorak/i
};
var parseQuarterPatterns$5 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$5 = {
  narrow: /^[yfmasond]/i,
  abbreviated: /^(yan|fev|mar|apr|may|iyun|iyul|avg|sen|okt|noy|dek)/i,
  wide: /^(yanvar|fevral|mart|aprel|may|iyun|iyul|avgust|sentabr|oktabr|noyabr|dekabr)/i
};
var parseMonthPatterns$5 = {
  narrow: [/^y/i, /^f/i, /^m/i, /^a/i, /^m/i, /^i/i, /^i/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ya/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^iyun/i, /^iyul/i, /^av/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$5 = {
  narrow: /^[ydschj]/i,
  short: /^(ya|du|se|cho|pa|ju|sha)/i,
  abbreviated: /^(yak|dush|sesh|chor|pay|jum|shan)/i,
  wide: /^(yakshanba|dushanba|seshanba|chorshanba|payshanba|juma|shanba)/i
};
var parseDayPatterns$5 = {
  narrow: [/^y/i, /^d/i, /^s/i, /^ch/i, /^p/i, /^j/i, /^sh/i],
  any: [/^ya/i, /^d/i, /^se/i, /^ch/i, /^p/i, /^j/i, /^sh/i]
};
var matchDayPeriodPatterns$5 = {
  narrow: /^(a|p|y\.t|p| (ertalab|tushdan keyin|kechqurun|tun))/i,
  any: /^([ap]\.?\s?m\.?|yarim tun|peshin| (ertalab|tushdan keyin|kechqurun|tun))/i
};
var parseDayPeriodPatterns$5 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^y\.t/i,
    noon: /^pe/i,
    morning: /ertalab/i,
    afternoon: /tushdan keyin/i,
    evening: /kechqurun/i,
    night: /tun/i
  }
};
var match$5 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$5,
    parsePattern: parseOrdinalNumberPattern$5,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$5,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$5,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$5,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$5,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$5,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$5,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$5,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$5,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$5,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$5,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Uzbek locale.
 * @language Uzbek
 * @iso-639-2 uzb
 * @author Mukhammadali [@mukhammadali]{@link https://github.com/Mukhammadali}
 */

var locale$5 = {
  code: 'uz',
  formatDistance: formatDistance$5,
  formatLong: formatLong$5,
  formatRelative: formatRelative$5,
  localize: localize$5,
  match: match$5,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$4 = {
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
function formatDistance$4(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$4[token] === 'string') {
    result = formatDistanceLocale$4[token];
  } else if (count === 1) {
    result = formatDistanceLocale$4[token].one;
  } else {
    result = formatDistanceLocale$4[token].other.replace('{{count}}', count);
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

var dateFormats$4 = {
  full: 'EEEE, do MMMM, y',
  long: 'do MMMM, y',
  medium: 'd MMM, y',
  short: 'dd/MM/yyyy'
};
var timeFormats$4 = {
  full: 'H:mm:ss zzzz',
  long: 'H:mm:ss z',
  medium: 'H:mm:ss',
  short: 'H:mm'
};
var dateTimeFormats$4 = {
  any: '{{date}}, {{time}}'
};
var formatLong$4 = {
  date: buildFormatLongFn({
    formats: dateFormats$4,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$4,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$4,
    defaultWidth: 'any'
  })
};

var formatRelativeLocale$4 = {
  lastWeek: "'ўтган' eeee p 'да'",
  yesterday: "'кеча' p 'да'",
  today: "'бугун' p 'да'",
  tomorrow: "'эртага' p 'да'",
  nextWeek: "eeee p 'да'",
  other: 'P'
};
function formatRelative$4(token, _date, _baseDate, _options) {
  return formatRelativeLocale$4[token];
}

var eraValues$4 = {
  narrow: ['М.А', 'М'],
  abbreviated: ['М.А', 'М'],
  wide: ['Милоддан Аввалги', 'Милодий']
};
var quarterValues$4 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['1-чор.', '2-чор.', '3-чор.', '4-чор.'],
  wide: ['1-чорак', '2-чорак', '3-чорак', '4-чорак']
};
var monthValues$4 = {
  narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'],
  abbreviated: ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],
  wide: ['январ', 'феврал', 'март', 'апрел', 'май', 'июн', 'июл', 'август', 'сентабр', 'октабр', 'ноябр', 'декабр']
};
var dayValues$4 = {
  narrow: ['Я', 'Д', 'С', 'Ч', 'П', 'Ж', 'Ш'],
  short: ['як', 'ду', 'се', 'чо', 'па', 'жу', 'ша'],
  abbreviated: ['якш', 'душ', 'сеш', 'чор', 'пай', 'жум', 'шан'],
  wide: ['якшанба', 'душанба', 'сешанба', 'чоршанба', 'пайшанба', 'жума', 'шанба']
};
var dayPeriodValues$4 = {
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
var formattingDayPeriodValues$4 = {
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

function ordinalNumber$4(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  return number;
}

var localize$4 = {
  ordinalNumber: ordinalNumber$4,
  era: buildLocalizeFn({
    values: eraValues$4,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$4,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$4,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$4,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$4,
    defaultWidth: 'any',
    formattingValues: formattingDayPeriodValues$4,
    defaultFormattingWidth: 'any'
  })
};

var matchOrdinalNumberPattern$4 = /^(\d+)(чи)?/i;
var parseOrdinalNumberPattern$4 = /\d+/i;
var matchEraPatterns$4 = {
  narrow: /^(м\.а|м\.)/i,
  abbreviated: /^(м\.а|м\.)/i,
  wide: /^(милоддан аввал|милоддан кейин)/i
};
var parseEraPatterns$4 = {
  any: [/^м/i, /^а/i]
};
var matchQuarterPatterns$4 = {
  narrow: /^[1234]/i,
  abbreviated: /^[1234]-чор./i,
  wide: /^[1234]-чорак/i
};
var parseQuarterPatterns$4 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$4 = {
  narrow: /^[яфмамииасонд]/i,
  abbreviated: /^(янв|фев|мар|апр|май|июн|июл|авг|сен|окт|ноя|дек)/i,
  wide: /^(январ|феврал|март|апрел|май|июн|июл|август|сентабр|октабр|ноябр|декабр)/i
};
var parseMonthPatterns$4 = {
  narrow: [/^я/i, /^ф/i, /^м/i, /^а/i, /^м/i, /^и/i, /^и/i, /^а/i, /^с/i, /^о/i, /^н/i, /^д/i],
  any: [/^я/i, /^ф/i, /^мар/i, /^ап/i, /^май/i, /^июн/i, /^июл/i, /^ав/i, /^с/i, /^о/i, /^н/i, /^д/i]
};
var matchDayPatterns$4 = {
  narrow: /^[ядсчпжш]/i,
  short: /^(як|ду|се|чо|па|жу|ша)/i,
  abbreviated: /^(якш|душ|сеш|чор|пай|жум|шан)/i,
  wide: /^(якшанба|душанба|сешанба|чоршанба|пайшанба|жума|шанба)/i
};
var parseDayPatterns$4 = {
  narrow: [/^я/i, /^д/i, /^с/i, /^ч/i, /^п/i, /^ж/i, /^ш/i],
  any: [/^як/i, /^ду/i, /^се/i, /^чор/i, /^пай/i, /^жу/i, /^шан/i]
};
var matchDayPeriodPatterns$4 = {
  any: /^(п\.о\.|п\.к\.|ярим тун|пешиндан кейин|(эрталаб|пешиндан кейин|кечаси|тун))/i
};
var parseDayPeriodPatterns$4 = {
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
var match$4 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$4,
    parsePattern: parseOrdinalNumberPattern$4,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$4,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$4,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$4,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$4,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$4,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$4,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$4,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$4,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$4,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$4,
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

var locale$4 = {
  code: 'uz-Cyrl',
  formatDistance: formatDistance$4,
  formatLong: formatLong$4,
  formatRelative: formatRelative$4,
  localize: localize$4,
  match: match$4,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale$3 = {
  lessThanXSeconds: {
    one: 'dưới 1 giây',
    other: 'dưới {{count}} giây'
  },
  xSeconds: {
    one: '1 giây',
    other: '{{count}} giây'
  },
  halfAMinute: 'nửa phút',
  lessThanXMinutes: {
    one: 'dưới 1 phút',
    other: 'dưới {{count}} phút'
  },
  xMinutes: {
    one: '1 phút',
    other: '{{count}} phút'
  },
  aboutXHours: {
    one: 'khoảng 1 giờ',
    other: 'khoảng {{count}} giờ'
  },
  xHours: {
    one: '1 giờ',
    other: '{{count}} giờ'
  },
  xDays: {
    one: '1 ngày',
    other: '{{count}} ngày'
  },
  aboutXWeeks: {
    one: 'khoảng 1 tuần',
    other: 'khoảng {{count}} tuần'
  },
  xWeeks: {
    one: '1 tuần',
    other: '{{count}} tuần'
  },
  aboutXMonths: {
    one: 'khoảng 1 tháng',
    other: 'khoảng {{count}} tháng'
  },
  xMonths: {
    one: '1 tháng',
    other: '{{count}} tháng'
  },
  aboutXYears: {
    one: 'khoảng 1 năm',
    other: 'khoảng {{count}} năm'
  },
  xYears: {
    one: '1 năm',
    other: '{{count}} năm'
  },
  overXYears: {
    one: 'hơn 1 năm',
    other: 'hơn {{count}} năm'
  },
  almostXYears: {
    one: 'gần 1 năm',
    other: 'gần {{count}} năm'
  }
};
function formatDistance$3(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$3[token] === 'string') {
    result = formatDistanceLocale$3[token];
  } else if (count === 1) {
    result = formatDistanceLocale$3[token].one;
  } else {
    result = formatDistanceLocale$3[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return result + ' nữa';
    } else {
      return result + ' trước';
    }
  }

  return result;
}

var dateFormats$3 = {
  // thứ Sáu, ngày 25 tháng 08 năm 2017
  full: "EEEE, 'ngày' d MMMM 'năm' y",
  // ngày 25 tháng 08 năm 2017
  long: "'ngày' d MMMM 'năm' y",
  // 25 thg 08 năm 2017
  medium: "d MMM 'năm' y",
  // 25/08/2017
  short: 'dd/MM/y'
};
var timeFormats$3 = {
  full: 'HH:mm:ss zzzz',
  long: 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  short: 'HH:mm'
};
var dateTimeFormats$3 = {
  // thứ Sáu, ngày 25 tháng 08 năm 2017 23:25:59
  full: '{{date}} {{time}}',
  // ngày 25 tháng 08 năm 2017 23:25
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$3 = {
  date: buildFormatLongFn({
    formats: dateFormats$3,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$3,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$3,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$3 = {
  lastWeek: "eeee 'tuần trước vào lúc' p",
  yesterday: "'hôm qua vào lúc' p",
  today: "'hôm nay vào lúc' p",
  tomorrow: "'ngày mai vào lúc' p",
  nextWeek: "eeee 'tới vào lúc' p",
  other: 'P'
};
function formatRelative$3(token, _date, _baseDate, _options) {
  return formatRelativeLocale$3[token];
}

// Capitalization reference: http://hcmup.edu.vn/index.php?option=com_content&view=article&id=4106%3Avit-hoa-trong-vn-bn-hanh-chinh&catid=2345%3Atham-kho&Itemid=4103&lang=vi&site=134

var eraValues$3 = {
  narrow: ['TCN', 'SCN'],
  abbreviated: ['trước CN', 'sau CN'],
  wide: ['trước Công Nguyên', 'sau Công Nguyên']
};
var quarterValues$3 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4']
};
var formattingQuarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  // I notice many news outlet use this "quý II/2018"
  wide: ['quý I', 'quý II', 'quý III', 'quý IV']
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.

var monthValues$3 = {
  narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
  abbreviated: ['Thg 1', 'Thg 2', 'Thg 3', 'Thg 4', 'Thg 5', 'Thg 6', 'Thg 7', 'Thg 8', 'Thg 9', 'Thg 10', 'Thg 11', 'Thg 12'],
  wide: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai']
}; // In Vietnamese date formatting, month number less than 10 expected to have leading zero

var formattingMonthValues = {
  narrow: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
  abbreviated: ['thg 1', 'thg 2', 'thg 3', 'thg 4', 'thg 5', 'thg 6', 'thg 7', 'thg 8', 'thg 9', 'thg 10', 'thg 11', 'thg 12'],
  wide: ['tháng 01', 'tháng 02', 'tháng 03', 'tháng 04', 'tháng 05', 'tháng 06', 'tháng 07', 'tháng 08', 'tháng 09', 'tháng 10', 'tháng 11', 'tháng 12']
};
var dayValues$3 = {
  narrow: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  short: ['CN', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7'],
  abbreviated: ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  wide: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
}; // Vietnamese are used to AM/PM borrowing from English, hence `narrow` and
// `abbreviated` are just like English but I'm leaving the `wide`
// format being localized with abbreviations found in some systems (SÁng / CHiều);
// however, personally, I don't think `Chiều` sounds appropriate for `PM`

var dayPeriodValues$3 = {
  // narrow date period is extremely rare in Vietnamese
  // I used abbreviated form for noon, morning and afternoon
  // which are regconizable by Vietnamese, others cannot be any shorter
  narrow: {
    am: 'am',
    pm: 'pm',
    midnight: 'nửa đêm',
    noon: 'tr',
    morning: 'sg',
    afternoon: 'ch',
    evening: 'tối',
    night: 'đêm'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'nửa đêm',
    noon: 'trưa',
    morning: 'sáng',
    afternoon: 'chiều',
    evening: 'tối',
    night: 'đêm'
  },
  wide: {
    am: 'SA',
    pm: 'CH',
    midnight: 'nửa đêm',
    noon: 'trưa',
    morning: 'sáng',
    afternoon: 'chiều',
    evening: 'tối',
    night: 'đêm'
  }
};
var formattingDayPeriodValues$3 = {
  narrow: {
    am: 'am',
    pm: 'pm',
    midnight: 'nửa đêm',
    noon: 'tr',
    morning: 'sg',
    afternoon: 'ch',
    evening: 'tối',
    night: 'đêm'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'nửa đêm',
    noon: 'trưa',
    morning: 'sáng',
    afternoon: 'chiều',
    evening: 'tối',
    night: 'đêm'
  },
  wide: {
    am: 'SA',
    pm: 'CH',
    midnight: 'nửa đêm',
    noon: 'giữa trưa',
    morning: 'vào buổi sáng',
    afternoon: 'vào buổi chiều',
    evening: 'vào buổi tối',
    night: 'vào ban đêm'
  }
}; // If ordinal numbers depend on context, for example,
// if they are different for different grammatical genders,
// use `options.unit`:
//
//   var options = dirtyOptions || {}
//   var unit = String(options.unit)
//
// where `unit` can be 'month', 'quarter', 'week', 'isoWeek', 'dayOfYear',
// 'dayOfMonth' or 'dayOfWeek'

function ordinalNumber$3(dirtyNumber, dirtyOptions) {
  var options = dirtyOptions || {};
  var unit = String(options.unit);
  var number = parseInt(dirtyNumber, 10);

  if (unit === 'quarter') {
    // many news outlets use "quý I"...
    switch (number) {
      case 1:
        return 'I';

      case 2:
        return 'II';

      case 3:
        return 'III';

      case 4:
        return 'IV';
    }
  } else if (unit === 'day') {
    // day of week in Vietnamese has ordinal number meaning,
    // so we should use them, else it'll sound weird
    switch (number) {
      case 1:
        return 'thứ 2';
      // meaning 2nd day but it's the first day of the week :D

      case 2:
        return 'thứ 3';
      // meaning 3rd day

      case 3:
        return 'thứ 4';
      // meaning 4th day and so on

      case 4:
        return 'thứ 5';

      case 5:
        return 'thứ 6';

      case 6:
        return 'thứ 7';

      case 7:
        return 'chủ nhật';
      // meaning Sunday, there's no 8th day :D
    }
  } else if (unit === 'week') {
    if (number === 1) {
      return 'thứ nhất';
    } else {
      return 'thứ ' + number;
    }
  } else if (unit === 'dayOfYear') {
    if (number === 1) {
      return 'đầu tiên';
    } else {
      return 'thứ ' + number;
    }
  } // there are no different forms of ordinal numbers in Vietnamese


  return number;
}

var localize$3 = {
  ordinalNumber: ordinalNumber$3,
  era: buildLocalizeFn({
    values: eraValues$3,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$3,
    defaultWidth: 'wide',
    formattingValues: formattingQuarterValues,
    defaultFormattingWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$3,
    defaultWidth: 'wide',
    formattingValues: formattingMonthValues,
    defaultFormattingWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$3,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$3,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$3,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$3 = /^(\d+)/i;
var parseOrdinalNumberPattern$3 = /\d+/i;
var matchEraPatterns$3 = {
  narrow: /^(tcn|scn)/i,
  abbreviated: /^(trước CN|sau CN)/i,
  wide: /^(trước Công Nguyên|sau Công Nguyên)/i
};
var parseEraPatterns$3 = {
  any: [/^t/i, /^s/i]
};
var matchQuarterPatterns$3 = {
  narrow: /^([1234]|i{1,3}v?)/i,
  abbreviated: /^q([1234]|i{1,3}v?)/i,
  wide: /^quý ([1234]|i{1,3}v?)/i
};
var parseQuarterPatterns$3 = {
  any: [/(1|i)$/i, /(2|ii)$/i, /(3|iii)$/i, /(4|iv)$/i]
};
var matchMonthPatterns$3 = {
  // month number may contain leading 0, 'thg' prefix may have space, underscore or empty before number
  // note the order of '1' since it is a sub-string of '10', so must be lower priority
  narrow: /^(0?[2-9]|10|11|12|0?1)/i,
  // note the order of 'thg 1' since it is sub-string of 'thg 10', so must be lower priority
  abbreviated: /^thg[ _]?(0?[1-9](?!\d)|10|11|12)/i,
  // note the order of 'Mười' since it is sub-string of Mười Một, so must be lower priority
  wide: /^tháng ?(Một|Hai|Ba|Tư|Năm|Sáu|Bảy|Tám|Chín|Mười|Mười ?Một|Mười ?Hai|0?[1-9](?!\d)|10|11|12)/i
};
var parseMonthPatterns$3 = {
  narrow: [/0?1$/i, /0?2/i, /3/, /4/, /5/, /6/, /7/, /8/, /9/, /10/, /11/, /12/],
  abbreviated: [/^thg[ _]?0?1(?!\d)/i, /^thg[ _]?0?2/i, /^thg[ _]?0?3/i, /^thg[ _]?0?4/i, /^thg[ _]?0?5/i, /^thg[ _]?0?6/i, /^thg[ _]?0?7/i, /^thg[ _]?0?8/i, /^thg[ _]?0?9/i, /^thg[ _]?10/i, /^thg[ _]?11/i, /^thg[ _]?12/i],
  wide: [/^tháng ?(Một|0?1(?!\d))/i, /^tháng ?(Hai|0?2)/i, /^tháng ?(Ba|0?3)/i, /^tháng ?(Tư|0?4)/i, /^tháng ?(Năm|0?5)/i, /^tháng ?(Sáu|0?6)/i, /^tháng ?(Bảy|0?7)/i, /^tháng ?(Tám|0?8)/i, /^tháng ?(Chín|0?9)/i, /^tháng ?(Mười|10)/i, /^tháng ?(Mười ?Một|11)/i, /^tháng ?(Mười ?Hai|12)/i]
};
var matchDayPatterns$3 = {
  narrow: /^(CN|T2|T3|T4|T5|T6|T7)/i,
  short: /^(CN|Th ?2|Th ?3|Th ?4|Th ?5|Th ?6|Th ?7)/i,
  abbreviated: /^(CN|Th ?2|Th ?3|Th ?4|Th ?5|Th ?6|Th ?7)/i,
  wide: /^(Chủ ?Nhật|Chúa ?Nhật|thứ ?Hai|thứ ?Ba|thứ ?Tư|thứ ?Năm|thứ ?Sáu|thứ ?Bảy)/i
};
var parseDayPatterns$3 = {
  narrow: [/CN/i, /2/i, /3/i, /4/i, /5/i, /6/i, /7/i],
  short: [/CN/i, /2/i, /3/i, /4/i, /5/i, /6/i, /7/i],
  abbreviated: [/CN/i, /2/i, /3/i, /4/i, /5/i, /6/i, /7/i],
  wide: [/(Chủ|Chúa) ?Nhật/i, /Hai/i, /Ba/i, /Tư/i, /Năm/i, /Sáu/i, /Bảy/i]
};
var matchDayPeriodPatterns$3 = {
  narrow: /^(a|p|nửa đêm|trưa|(giờ) (sáng|chiều|tối|đêm))/i,
  abbreviated: /^(am|pm|nửa đêm|trưa|(giờ) (sáng|chiều|tối|đêm))/i,
  wide: /^(ch[^i]*|sa|nửa đêm|trưa|(giờ) (sáng|chiều|tối|đêm))/i
};
var parseDayPeriodPatterns$3 = {
  any: {
    am: /^(a|sa)/i,
    pm: /^(p|ch[^i]*)/i,
    midnight: /nửa đêm/i,
    noon: /trưa/i,
    morning: /sáng/i,
    afternoon: /chiều/i,
    evening: /tối/i,
    night: /^đêm/i
  }
};
var match$3 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$3,
    parsePattern: parseOrdinalNumberPattern$3,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$3,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$3,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$3,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$3,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$3,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$3,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$3,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$3,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$3,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$3,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Vietnamese locale (Vietnam).
 * @language Vietnamese
 * @iso-639-2 vie
 * @author Thanh Tran [@trongthanh]{@link https://github.com/trongthanh}
 * @author Leroy Hopson [@lihop]{@link https://github.com/lihop}
 */

var locale$3 = {
  code: 'vi',
  formatDistance: formatDistance$3,
  formatLong: formatLong$3,
  formatRelative: formatRelative$3,
  localize: localize$3,
  match: match$3,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 1
    /* First week of new year contains Jan 1st  */

  }
};

var formatDistanceLocale$2 = {
  lessThanXSeconds: {
    one: '不到 1 秒',
    other: '不到 {{count}} 秒'
  },
  xSeconds: {
    one: '1 秒',
    other: '{{count}} 秒'
  },
  halfAMinute: '半分钟',
  lessThanXMinutes: {
    one: '不到 1 分钟',
    other: '不到 {{count}} 分钟'
  },
  xMinutes: {
    one: '1 分钟',
    other: '{{count}} 分钟'
  },
  xHours: {
    one: '1 小时',
    other: '{{count}} 小时'
  },
  aboutXHours: {
    one: '大约 1 小时',
    other: '大约 {{count}} 小时'
  },
  xDays: {
    one: '1 天',
    other: '{{count}} 天'
  },
  aboutXWeeks: {
    one: '大约 1 个星期',
    other: '大约 {{count}} 个星期'
  },
  xWeeks: {
    one: '1 个星期',
    other: '{{count}} 个星期'
  },
  aboutXMonths: {
    one: '大约 1 个月',
    other: '大约 {{count}} 个月'
  },
  xMonths: {
    one: '1 个月',
    other: '{{count}} 个月'
  },
  aboutXYears: {
    one: '大约 1 年',
    other: '大约 {{count}} 年'
  },
  xYears: {
    one: '1 年',
    other: '{{count}} 年'
  },
  overXYears: {
    one: '超过 1 年',
    other: '超过 {{count}} 年'
  },
  almostXYears: {
    one: '将近 1 年',
    other: '将近 {{count}} 年'
  }
};
function formatDistance$2(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$2[token] === 'string') {
    result = formatDistanceLocale$2[token];
  } else if (count === 1) {
    result = formatDistanceLocale$2[token].one;
  } else {
    result = formatDistanceLocale$2[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return result + '内';
    } else {
      return result + '前';
    }
  }

  return result;
}

var dateFormats$2 = {
  full: "y'年'M'月'd'日' EEEE",
  long: "y'年'M'月'd'日'",
  medium: 'yyyy-MM-dd',
  short: 'yy-MM-dd'
};
var timeFormats$2 = {
  full: 'zzzz a h:mm:ss',
  long: 'z a h:mm:ss',
  medium: 'a h:mm:ss',
  short: 'a h:mm'
};
var dateTimeFormats$2 = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$2 = {
  date: buildFormatLongFn({
    formats: dateFormats$2,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$2,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$2,
    defaultWidth: 'full'
  })
};

function checkWeek(_date, _baseDate, _options, baseFormat) {
  if (isSameUTCWeek(_date, _baseDate, _options)) {
    return baseFormat; // in same week
  } else if (_date.getTime() > _baseDate.getTime()) {
    return "'下个'" + baseFormat; // in next week
  }

  return "'上个'" + baseFormat; // in last week
}

var formatRelativeLocale$2 = {
  lastWeek: checkWeek,
  // days before yesterday, maybe in this week or last week
  yesterday: "'昨天' p",
  today: "'今天' p",
  tomorrow: "'明天' p",
  nextWeek: checkWeek,
  // days after tomorrow, maybe in this week or next week
  other: 'PP p'
};
function formatRelative$2(token, _date, _baseDate, _options) {
  var format = formatRelativeLocale$2[token];

  if (typeof format === 'function') {
    return format(_date, _baseDate, _options, 'eeee p');
  }

  return format;
}

var eraValues$2 = {
  narrow: ['前', '公元'],
  abbreviated: ['前', '公元'],
  wide: ['公元前', '公元']
};
var quarterValues$2 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['第一季', '第二季', '第三季', '第四季'],
  wide: ['第一季度', '第二季度', '第三季度', '第四季度']
};
var monthValues$2 = {
  narrow: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
  abbreviated: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  wide: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
};
var dayValues$2 = {
  narrow: ['日', '一', '二', '三', '四', '五', '六'],
  short: ['日', '一', '二', '三', '四', '五', '六'],
  abbreviated: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  wide: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
};
var dayPeriodValues$2 = {
  narrow: {
    am: '上',
    pm: '下',
    midnight: '凌晨',
    noon: '午',
    morning: '早',
    afternoon: '下午',
    evening: '晚',
    night: '夜'
  },
  abbreviated: {
    am: '上午',
    pm: '下午',
    midnight: '凌晨',
    noon: '中午',
    morning: '早晨',
    afternoon: '中午',
    evening: '晚上',
    night: '夜间'
  },
  wide: {
    am: '上午',
    pm: '下午',
    midnight: '凌晨',
    noon: '中午',
    morning: '早晨',
    afternoon: '中午',
    evening: '晚上',
    night: '夜间'
  }
};
var formattingDayPeriodValues$2 = {
  narrow: {
    am: '上',
    pm: '下',
    midnight: '凌晨',
    noon: '午',
    morning: '早',
    afternoon: '下午',
    evening: '晚',
    night: '夜'
  },
  abbreviated: {
    am: '上午',
    pm: '下午',
    midnight: '凌晨',
    noon: '中午',
    morning: '早晨',
    afternoon: '中午',
    evening: '晚上',
    night: '夜间'
  },
  wide: {
    am: '上午',
    pm: '下午',
    midnight: '凌晨',
    noon: '中午',
    morning: '早晨',
    afternoon: '中午',
    evening: '晚上',
    night: '夜间'
  }
};

function ordinalNumber$2(dirtyNumber, dirtyOptions) {
  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'
  var number = Number(dirtyNumber);
  var options = dirtyOptions || {};
  var unit = String(options.unit);

  switch (unit) {
    case 'date':
      return number.toString() + '日';

    case 'hour':
      return number.toString() + '时';

    case 'minute':
      return number.toString() + '分';

    case 'second':
      return number.toString() + '秒';

    default:
      return '第 ' + number.toString();
  }
}

var localize$2 = {
  ordinalNumber: ordinalNumber$2,
  era: buildLocalizeFn({
    values: eraValues$2,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$2,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$2,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$2,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$2,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$2,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$2 = /^(第\s*)?\d+(日|时|分|秒)?/i;
var parseOrdinalNumberPattern$2 = /\d+/i;
var matchEraPatterns$2 = {
  narrow: /^(前)/i,
  abbreviated: /^(前)/i,
  wide: /^(公元前|公元)/i
};
var parseEraPatterns$2 = {
  any: [/^(前)/i, /^(公元)/i]
};
var matchQuarterPatterns$2 = {
  narrow: /^[1234]/i,
  abbreviated: /^第[一二三四]刻/i,
  wide: /^第[一二三四]刻钟/i
};
var parseQuarterPatterns$2 = {
  any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
var matchMonthPatterns$2 = {
  narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
  abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
  wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
};
var parseMonthPatterns$2 = {
  narrow: [/^一/i, /^二/i, /^三/i, /^四/i, /^五/i, /^六/i, /^七/i, /^八/i, /^九/i, /^十(?!(一|二))/i, /^十一/i, /^十二/i],
  any: [/^一|1/i, /^二|2/i, /^三|3/i, /^四|4/i, /^五|5/i, /^六|6/i, /^七|7/i, /^八|8/i, /^九|9/i, /^十(?!(一|二))|10/i, /^十一|11/i, /^十二|12/i]
};
var matchDayPatterns$2 = {
  narrow: /^[一二三四五六日]/i,
  short: /^[一二三四五六日]/i,
  abbreviated: /^周[一二三四五六日]/i,
  wide: /^星期[一二三四五六日]/i
};
var parseDayPatterns$2 = {
  any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
var matchDayPeriodPatterns$2 = {
  any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨|)/i
};
var parseDayPeriodPatterns$2 = {
  any: {
    am: /^上午?/i,
    pm: /^下午?/i,
    midnight: /^午夜/i,
    noon: /^[中正]午/i,
    morning: /^早上/i,
    afternoon: /^下午/i,
    evening: /^晚上?/i,
    night: /^凌晨/i
  }
};
var match$2 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$2,
    parsePattern: parseOrdinalNumberPattern$2,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$2,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$2,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$2,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$2,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$2,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$2,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$2,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$2,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$2,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$2,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Chinese Simplified locale.
 * @language Chinese Simplified
 * @iso-639-2 zho
 * @author Changyu Geng [@KingMario]{@link https://github.com/KingMario}
 * @author Song Shuoyun [@fnlctrl]{@link https://github.com/fnlctrl}
 * @author sabrinaM [@sabrinamiao]{@link https://github.com/sabrinamiao}
 * @author Carney Wu [@cubicwork]{@link https://github.com/cubicwork}
 * @author Terrence Lam [@skyuplam]{@link https://github.com/skyuplam}
 */

var locale$2 = {
  code: 'zh-CN',
  formatDistance: formatDistance$2,
  formatLong: formatLong$2,
  formatRelative: formatRelative$2,
  localize: localize$2,
  match: match$2,
  options: {
    weekStartsOn: 1
    /* Monday */
    ,
    firstWeekContainsDate: 4
  }
};

var formatDistanceLocale$1 = {
  lessThanXSeconds: {
    one: '少於 1 秒',
    other: '少於 {{count}} 秒'
  },
  xSeconds: {
    one: '1 秒',
    other: '{{count}} 秒'
  },
  halfAMinute: '半分鐘',
  lessThanXMinutes: {
    one: '少於 1 分鐘',
    other: '少於 {{count}} 分鐘'
  },
  xMinutes: {
    one: '1 分鐘',
    other: '{{count}} 分鐘'
  },
  xHours: {
    one: '1 小時',
    other: '{{count}} 小時'
  },
  aboutXHours: {
    one: '大約 1 小時',
    other: '大約 {{count}} 小時'
  },
  xDays: {
    one: '1 天',
    other: '{{count}} 天'
  },
  aboutXWeeks: {
    one: '大約 1 個星期',
    other: '大約 {{count}} 個星期'
  },
  xWeeks: {
    one: '1 個星期',
    other: '{{count}} 個星期'
  },
  aboutXMonths: {
    one: '大約 1 個月',
    other: '大約 {{count}} 個月'
  },
  xMonths: {
    one: '1 個月',
    other: '{{count}} 個月'
  },
  aboutXYears: {
    one: '大約 1 年',
    other: '大約 {{count}} 年'
  },
  xYears: {
    one: '1 年',
    other: '{{count}} 年'
  },
  overXYears: {
    one: '超過 1 年',
    other: '超過 {{count}} 年'
  },
  almostXYears: {
    one: '將近 1 年',
    other: '將近 {{count}} 年'
  }
};
function formatDistance$1(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale$1[token] === 'string') {
    result = formatDistanceLocale$1[token];
  } else if (count === 1) {
    result = formatDistanceLocale$1[token].one;
  } else {
    result = formatDistanceLocale$1[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return result + '內';
    } else {
      return result + '前';
    }
  }

  return result;
}

var dateFormats$1 = {
  full: "y'年'M'月'd'日' EEEE",
  long: "y'年'M'月'd'日'",
  medium: 'yyyy-MM-dd',
  short: 'yy-MM-dd'
};
var timeFormats$1 = {
  full: 'zzzz a h:mm:ss',
  long: 'z a h:mm:ss',
  medium: 'a h:mm:ss',
  short: 'a h:mm'
};
var dateTimeFormats$1 = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
};
var formatLong$1 = {
  date: buildFormatLongFn({
    formats: dateFormats$1,
    defaultWidth: 'full'
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1,
    defaultWidth: 'full'
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1,
    defaultWidth: 'full'
  })
};

var formatRelativeLocale$1 = {
  lastWeek: "'上個'eeee p",
  yesterday: "'昨天' p",
  today: "'今天' p",
  tomorrow: "'明天' p",
  nextWeek: "'下個'eeee p",
  other: 'P'
};
function formatRelative$1(token, _date, _baseDate, _options) {
  return formatRelativeLocale$1[token];
}

var eraValues$1 = {
  narrow: ['前', '公元'],
  abbreviated: ['前', '公元'],
  wide: ['公元前', '公元']
};
var quarterValues$1 = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['第一季', '第二季', '第三季', '第四季'],
  wide: ['第一季度', '第二季度', '第三季度', '第四季度']
};
var monthValues$1 = {
  narrow: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
  abbreviated: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  wide: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
};
var dayValues$1 = {
  narrow: ['日', '一', '二', '三', '四', '五', '六'],
  short: ['日', '一', '二', '三', '四', '五', '六'],
  abbreviated: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
  wide: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
};
var dayPeriodValues$1 = {
  narrow: {
    am: '上',
    pm: '下',
    midnight: '午夜',
    noon: '晌',
    morning: '早',
    afternoon: '午',
    evening: '晚',
    night: '夜'
  },
  abbreviated: {
    am: '上午',
    pm: '下午',
    midnight: '午夜',
    noon: '中午',
    morning: '上午',
    afternoon: '下午',
    evening: '晚上',
    night: '夜晚'
  },
  wide: {
    am: '上午',
    pm: '下午',
    midnight: '午夜',
    noon: '中午',
    morning: '上午',
    afternoon: '下午',
    evening: '晚上',
    night: '夜晚'
  }
};
var formattingDayPeriodValues$1 = {
  narrow: {
    am: '上',
    pm: '下',
    midnight: '午夜',
    noon: '晌',
    morning: '早',
    afternoon: '午',
    evening: '晚',
    night: '夜'
  },
  abbreviated: {
    am: '上午',
    pm: '下午',
    midnight: '午夜',
    noon: '中午',
    morning: '上午',
    afternoon: '下午',
    evening: '晚上',
    night: '夜晚'
  },
  wide: {
    am: '上午',
    pm: '下午',
    midnight: '午夜',
    noon: '中午',
    morning: '上午',
    afternoon: '下午',
    evening: '晚上',
    night: '夜晚'
  }
};

function ordinalNumber$1(dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var options = dirtyOptions || {};
  var unit = String(options.unit);

  switch (unit) {
    case 'date':
      return number.toString() + '日';

    case 'hour':
      return number.toString() + '時';

    case 'minute':
      return number.toString() + '分';

    case 'second':
      return number.toString() + '秒';

    default:
      return '第 ' + number.toString();
  }
}

var localize$1 = {
  ordinalNumber: ordinalNumber$1,
  era: buildLocalizeFn({
    values: eraValues$1,
    defaultWidth: 'wide'
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$1,
    defaultWidth: 'wide',
    argumentCallback: function (quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$1,
    defaultWidth: 'wide'
  }),
  day: buildLocalizeFn({
    values: dayValues$1,
    defaultWidth: 'wide'
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$1,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues$1,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern$1 = /^(第\s*)?\d+(日|時|分|秒)?/i;
var parseOrdinalNumberPattern$1 = /\d+/i;
var matchEraPatterns$1 = {
  narrow: /^(前)/i,
  abbreviated: /^(前)/i,
  wide: /^(公元前|公元)/i
};
var parseEraPatterns$1 = {
  any: [/^(前)/i, /^(公元)/i]
};
var matchQuarterPatterns$1 = {
  narrow: /^[1234]/i,
  abbreviated: /^第[一二三四]季/i,
  wide: /^第[一二三四]季度/i
};
var parseQuarterPatterns$1 = {
  any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
var matchMonthPatterns$1 = {
  narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
  abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
  wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
};
var parseMonthPatterns$1 = {
  narrow: [/^一/i, /^二/i, /^三/i, /^四/i, /^五/i, /^六/i, /^七/i, /^八/i, /^九/i, /^十(?!(一|二))/i, /^十一/i, /^十二/i],
  any: [/^一|1/i, /^二|2/i, /^三|3/i, /^四|4/i, /^五|5/i, /^六|6/i, /^七|7/i, /^八|8/i, /^九|9/i, /^十(?!(一|二))|10/i, /^十一|11/i, /^十二|12/i]
};
var matchDayPatterns$1 = {
  narrow: /^[一二三四五六日]/i,
  short: /^[一二三四五六日]/i,
  abbreviated: /^週[一二三四五六日]/i,
  wide: /^星期[一二三四五六日]/i
};
var parseDayPatterns$1 = {
  any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
var matchDayPeriodPatterns$1 = {
  any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨)/i
};
var parseDayPeriodPatterns$1 = {
  any: {
    am: /^上午?/i,
    pm: /^下午?/i,
    midnight: /^午夜/i,
    noon: /^[中正]午/i,
    morning: /^早上/i,
    afternoon: /^下午/i,
    evening: /^晚上?/i,
    night: /^凌晨/i
  }
};
var match$1 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$1,
    parsePattern: parseOrdinalNumberPattern$1,
    valueCallback: function (value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$1,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns$1,
    defaultParseWidth: 'any'
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$1,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns$1,
    defaultParseWidth: 'any',
    valueCallback: function (index) {
      return index + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$1,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns$1,
    defaultParseWidth: 'any'
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$1,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns$1,
    defaultParseWidth: 'any'
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$1,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns$1,
    defaultParseWidth: 'any'
  })
};

/**
 * @type {Locale}
 * @category Locales
 * @summary Chinese Traditional locale.
 * @language Chinese Traditional
 * @iso-639-2 zho
 * @author Gary Ip [@gaplo]{@link https://github.com/gaplo}
 */

var locale$1 = {
  code: 'zh-HK',
  formatDistance: formatDistance$1,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: '少於 1 秒',
    other: '少於 {{count}} 秒'
  },
  xSeconds: {
    one: '1 秒',
    other: '{{count}} 秒'
  },
  halfAMinute: '半分鐘',
  lessThanXMinutes: {
    one: '少於 1 分鐘',
    other: '少於 {{count}} 分鐘'
  },
  xMinutes: {
    one: '1 分鐘',
    other: '{{count}} 分鐘'
  },
  xHours: {
    one: '1 小時',
    other: '{{count}} 小時'
  },
  aboutXHours: {
    one: '大約 1 小時',
    other: '大約 {{count}} 小時'
  },
  xDays: {
    one: '1 天',
    other: '{{count}} 天'
  },
  aboutXWeeks: {
    one: '大約 1 個星期',
    other: '大約 {{count}} 個星期'
  },
  xWeeks: {
    one: '1 個星期',
    other: '{{count}} 個星期'
  },
  aboutXMonths: {
    one: '大約 1 個月',
    other: '大約 {{count}} 個月'
  },
  xMonths: {
    one: '1 個月',
    other: '{{count}} 個月'
  },
  aboutXYears: {
    one: '大約 1 年',
    other: '大約 {{count}} 年'
  },
  xYears: {
    one: '1 年',
    other: '{{count}} 年'
  },
  overXYears: {
    one: '超過 1 年',
    other: '超過 {{count}} 年'
  },
  almostXYears: {
    one: '將近 1 年',
    other: '將近 {{count}} 年'
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
      return result + '內';
    } else {
      return result + '前';
    }
  }

  return result;
}

var dateFormats = {
  full: "y'年'M'月'd'日' EEEE",
  long: "y'年'M'月'd'日'",
  medium: 'yyyy-MM-dd',
  short: 'yy-MM-dd'
};
var timeFormats = {
  full: 'zzzz a h:mm:ss',
  long: 'z a h:mm:ss',
  medium: 'a h:mm:ss',
  short: 'a h:mm'
};
var dateTimeFormats = {
  full: '{{date}} {{time}}',
  long: '{{date}} {{time}}',
  medium: '{{date}} {{time}}',
  short: '{{date}} {{time}}'
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
  lastWeek: "'上個'eeee p",
  yesterday: "'昨天' p",
  today: "'今天' p",
  tomorrow: "'明天' p",
  nextWeek: "'下個'eeee p",
  other: 'P'
};
function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

var eraValues = {
  narrow: ['前', '公元'],
  abbreviated: ['前', '公元'],
  wide: ['公元前', '公元']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['第一刻', '第二刻', '第三刻', '第四刻'],
  wide: ['第一刻鐘', '第二刻鐘', '第三刻鐘', '第四刻鐘']
};
var monthValues = {
  narrow: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
  abbreviated: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  wide: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
};
var dayValues = {
  narrow: ['日', '一', '二', '三', '四', '五', '六'],
  short: ['日', '一', '二', '三', '四', '五', '六'],
  abbreviated: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
  wide: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
};
var dayPeriodValues = {
  narrow: {
    am: '上',
    pm: '下',
    midnight: '凌晨',
    noon: '午',
    morning: '早',
    afternoon: '下午',
    evening: '晚',
    night: '夜'
  },
  abbreviated: {
    am: '上午',
    pm: '下午',
    midnight: '凌晨',
    noon: '中午',
    morning: '早晨',
    afternoon: '中午',
    evening: '晚上',
    night: '夜間'
  },
  wide: {
    am: '上午',
    pm: '下午',
    midnight: '凌晨',
    noon: '中午',
    morning: '早晨',
    afternoon: '中午',
    evening: '晚上',
    night: '夜間'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: '上',
    pm: '下',
    midnight: '凌晨',
    noon: '午',
    morning: '早',
    afternoon: '下午',
    evening: '晚',
    night: '夜'
  },
  abbreviated: {
    am: '上午',
    pm: '下午',
    midnight: '凌晨',
    noon: '中午',
    morning: '早晨',
    afternoon: '中午',
    evening: '晚上',
    night: '夜間'
  },
  wide: {
    am: '上午',
    pm: '下午',
    midnight: '凌晨',
    noon: '中午',
    morning: '早晨',
    afternoon: '中午',
    evening: '晚上',
    night: '夜間'
  }
};

function ordinalNumber(dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'

  var options = dirtyOptions || {};
  var unit = String(options.unit);

  switch (unit) {
    case 'date':
      return number.toString() + '日';

    case 'hour':
      return number.toString() + '時';

    case 'minute':
      return number.toString() + '分';

    case 'second':
      return number.toString() + '秒';

    default:
      return '第 ' + number.toString();
  }
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
    argumentCallback: function (quarter) {
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

var matchOrdinalNumberPattern = /^(第\s*)?\d+(日|時|分|秒)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(前)/i,
  abbreviated: /^(前)/i,
  wide: /^(公元前|公元)/i
};
var parseEraPatterns = {
  any: [/^(前)/i, /^(公元)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^第[一二三四]刻/i,
  wide: /^第[一二三四]刻鐘/i
};
var parseQuarterPatterns = {
  any: [/(1|一)/i, /(2|二)/i, /(3|三)/i, /(4|四)/i]
};
var matchMonthPatterns = {
  narrow: /^(一|二|三|四|五|六|七|八|九|十[二一])/i,
  abbreviated: /^(一|二|三|四|五|六|七|八|九|十[二一]|\d|1[12])月/i,
  wide: /^(一|二|三|四|五|六|七|八|九|十[二一])月/i
};
var parseMonthPatterns = {
  narrow: [/^一/i, /^二/i, /^三/i, /^四/i, /^五/i, /^六/i, /^七/i, /^八/i, /^九/i, /^十(?!(一|二))/i, /^十一/i, /^十二/i],
  any: [/^一|1/i, /^二|2/i, /^三|3/i, /^四|4/i, /^五|5/i, /^六|6/i, /^七|7/i, /^八|8/i, /^九|9/i, /^十(?!(一|二))|10/i, /^十一|11/i, /^十二|12/i]
};
var matchDayPatterns = {
  narrow: /^[一二三四五六日]/i,
  short: /^[一二三四五六日]/i,
  abbreviated: /^週[一二三四五六日]/i,
  wide: /^星期[一二三四五六日]/i
};
var parseDayPatterns = {
  any: [/日/i, /一/i, /二/i, /三/i, /四/i, /五/i, /六/i]
};
var matchDayPeriodPatterns = {
  any: /^(上午?|下午?|午夜|[中正]午|早上?|下午|晚上?|凌晨)/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^上午?/i,
    pm: /^下午?/i,
    midnight: /^午夜/i,
    noon: /^[中正]午/i,
    morning: /^早上/i,
    afternoon: /^下午/i,
    evening: /^晚上?/i,
    night: /^凌晨/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function (value) {
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
    valueCallback: function (index) {
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
 * @summary Chinese Traditional locale.
 * @language Chinese Traditional
 * @iso-639-2 zho
 * @author tonypai [@tpai]{@link https://github.com/tpai}
 * @author Jack Hsu [@jackhsu978]{@link https://github.com/jackhsu978}
 * @author Terrence Lam [@skyuplam]{@link https://github.com/skyuplam}
 */

var locale = {
  code: 'zh-TW',
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

// This file is generated automatically by `scripts/build/indices.js`. Please, don't change it.

const timepickerCss = ":host{font-family:var(--fw-font-family, -apple-system, blinkmacsystemfont, \"Segoe UI\", roboto, oxygen, ubuntu, cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-box-sizing:border-box;box-sizing:border-box}.timepicker{display:block}";

let Timepicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fwChange = createEvent(this, "fwChange", 7);
    this.fwBlur = createEvent(this, "fwBlur", 7);
    this.fwFocus = createEvent(this, "fwFocus", 7);
    /**
     * State for all the time values
     */
    this.timeValues = [];
    /**
     * Format in which time values are populated in the list box. If the value is hh:mm p, the time values are in the 12-hour format. If the value is hh:mm, the time values are in the 24-hr format.
     */
    this.format = 'hh:mm a';
    /**
     * Set true to disable the element
     */
    this.disabled = false;
    /**
     * Represent the intervals and can be a number or array of numbers representing the minute values in an hour
     */
    this.isMeridianFormat = this.format === 'hh:mm a';
    /**
     * Name of the component, saved as part of form data.
     */
    this.name = '';
    /**
     * Time interval between the values displayed in the list, specified in minutes.
     */
    this.interval = 30;
    /**
     * Lower time-limit for the values displayed in the list. If this attribute's value is in the hh:mm format, it is assumed to be hh:mm AM.
     */
    this.minTime = this.isMeridianFormat ? '12:00 AM' : '00:00';
    /**
     * Upper time-limit for the values displayed in the list. If this attribute's value is in the hh:mm format, it is assumed to be hh:mm AM.
     */
    this.maxTime = this.isMeridianFormat ? '11:30 PM' : '23:30';
    /**
     * Specifies the input box as a mandatory field and displays an asterisk next to the label. If the attribute's value is undefined, the value is set to false.
     */
    this.required = false;
    /**
     * Theme based on which the input of the timepicker is styled.
     */
    this.state = 'normal';
    /**
     * Hint text displayed below the text box.
     */
    this.hintText = '';
    /**
     * Warning text displayed below the text box.
     */
    this.warningText = '';
    /**
     * Error text displayed below the text box.
     */
    this.errorText = '';
    /**
     * Label displayed on the interface, for the component.
     */
    this.label = '';
    /**
     * Placement of the options list with respect to timepicker.
     */
    this.optionsPlacement = 'bottom';
    /**
     * Whether the arrow/caret should be shown in the timepicker.
     */
    this.caret = true;
    /**
     * Boolean representing whethere it is default end time
     */
    this.isDefaultEndTime = ['11:30 PM', '23:30'].includes(this.maxTime);
    this.getTimeOptionsMeta = (nonMeridianFormat) => {
      const preferredFormat = this.format;
      const timeIntervalArgs = {
        interval: this.interval,
        startTime: format(parse(this.minTime, preferredFormat, new Date()), nonMeridianFormat, {
          locale: locale$1p,
        }),
        endTime: format(parse(this.maxTime, preferredFormat, new Date()), nonMeridianFormat, {
          locale: locale$1p,
        }),
      };
      return timeIntervalArgs;
    };
    this.setTimeValues = () => {
      const meridianFormat = 'hh:mm a';
      const nonMeridianFormat = 'HH:mm';
      const { interval, startTime, endTime } = this.getTimeOptionsMeta(nonMeridianFormat);
      parse(startTime, nonMeridianFormat, new Date()).valueOf();
      let currentTimeInMs = parse(startTime, nonMeridianFormat, new Date()).valueOf();
      const endTimeInMs = parse(endTime, nonMeridianFormat, new Date()).valueOf();
      while (currentTimeInMs <= endTimeInMs) {
        this.timeValues.push({
          meridianFormat: format(currentTimeInMs, meridianFormat, {
            locale: locale$1p,
          }),
          nonMeridianFormat: format(currentTimeInMs, nonMeridianFormat, {
            locale: locale$1p,
          }),
        });
        currentTimeInMs = addMinutes(currentTimeInMs, interval).valueOf();
      }
    };
    this.onBlur = (e) => {
      this.fwBlur.emit({
        event: e,
        name: this.name,
      });
    };
    this.onFocus = () => {
      this.fwFocus.emit();
    };
  }
  currentTimeLabel(time) {
    return this.isMeridianFormat ? time.meridianFormat : time.nonMeridianFormat;
  }
  currentTimeValue(time) {
    return time.nonMeridianFormat;
  }
  setTimeValue(e) {
    const { value } = e.detail;
    if (value)
      this.fwChange.emit({
        event: e,
        name: this.name,
        value: value,
      });
  }
  setEndTime() {
    if (this.isDefaultEndTime) {
      this.maxTime = this.isMeridianFormat ? `11:59 PM` : `23:59`;
    }
  }
  /**
   * Sets focus on a specific `fw-timepicker`.
   */
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }
  componentWillLoad() {
    if (this.interval !== 30) {
      this.setEndTime();
    }
    this.setTimeValues();
  }
  render() {
    const { host, name, value } = this;
    renderHiddenField(host, name, value);
    return (h("div", { class: 'timepicker' }, h("fw-select", { name: this.name, label: this.label, hintText: this.hintText, errorText: this.errorText, warningText: this.warningText, disabled: this.disabled, value: this.value, required: this.required, onFwChange: (e) => this.setTimeValue(e), onFwBlur: this.onBlur, ref: (el) => (this.nativeInput = el), state: this.state, placeholder: this.placeholder, search: false, optionsPlacement: this.optionsPlacement, caret: this.caret }, this.timeValues.map((time) => (h("fw-select-option", { value: this.currentTimeValue(time) }, this.currentTimeLabel(time)))))));
  }
  get host() { return getElement(this); }
};
Timepicker.style = timepickerCss;

export { Timepicker as fw_timepicker };
