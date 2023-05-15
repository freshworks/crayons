import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
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

var formatDistance = function formatDistance(token, count, options) {
  var tokenValue = formatDistanceLocale[token];
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

var dateFormats = {
  full: 'EEEE do MMMM y',
  "long": 'do MMMM y',
  medium: 'd MMM y',
  "short": 'dd/MM/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a',
  "long": 'h:mm:ss a',
  medium: 'h:mm:ss a',
  "short": 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'ម៉ោង' {{time}}",
  "long": "{{date}} 'ម៉ោង' {{time}}",
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
  lastWeek: "'ថ្ងៃ'eeee'ស​ប្តា​ហ៍​មុនម៉ោង' p",
  yesterday: "'ម្សិលមិញនៅម៉ោង' p",
  today: "'ថ្ងៃនេះម៉ោង' p",
  tomorrow: "'ថ្ងៃស្អែកម៉ោង' p",
  nextWeek: "'ថ្ងៃ'eeee'ស​ប្តា​ហ៍​ក្រោយម៉ោង' p",
  other: 'P'
};

var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};

var eraValues = {
  narrow: ['ម.គស', 'គស'],
  abbreviated: ['មុនគ.ស', 'គ.ស'],
  wide: ['មុនគ្រិស្តសករាជ', 'នៃគ្រិស្តសករាជ']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['ត្រីមាសទី 1', 'ត្រីមាសទី 2', 'ត្រីមាសទី 3', 'ត្រីមាសទី 4']
};
var monthValues = {
  narrow: ['ម.ក', 'ក.ម', 'មិ', 'ម.ស', 'ឧ.ស', 'ម.ថ', 'ក.ដ', 'សី', 'កញ', 'តុ', 'វិ', 'ធ'],
  abbreviated: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'],
  wide: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ']
};
var dayValues = {
  narrow: ['អា', 'ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស'],
  "short": ['អា', 'ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស'],
  abbreviated: ['អា', 'ច', 'អ', 'ព', 'ព្រ', 'សុ', 'ស'],
  wide: ['អាទិត្យ', 'ចន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍']
};
var dayPeriodValues = {
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
var formattingDayPeriodValues = {
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

var ordinalNumber = function ordinalNumber(dirtyNumber, _) {
  var number = Number(dirtyNumber);
  return number.toString();
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
  narrow: /^(ម\.)?គស/i,
  abbreviated: /^(មុន)?គ\.ស/i,
  wide: /^(មុន|នៃ)គ្រិស្តសករាជ/i
};
var parseEraPatterns = {
  any: [/^(ម|មុន)គ\.?ស/i, /^(នៃ)?គ\.?ស/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^(ត្រីមាស)(ទី)?\s?[1234]/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^(ម\.ក|ក\.ម|មិ|ម\.ស|ឧ\.ស|ម\.ថ|ក\.ដ|សី|កញ|តុ|វិ|ធ)/i,
  abbreviated: /^(មករា|កុម្ភៈ|មីនា|មេសា|ឧសភា|មិថុនា|កក្កដា|សីហា|កញ្ញា|តុលា|វិច្ឆិកា|ធ្នូ)/i,
  wide: /^(មករា|កុម្ភៈ|មីនា|មេសា|ឧសភា|មិថុនា|កក្កដា|សីហា|កញ្ញា|តុលា|វិច្ឆិកា|ធ្នូ)/i
};
var parseMonthPatterns = {
  narrow: [/^ម\.ក/i, /^ក\.ម/i, /^មិ/i, /^ម\.ស/i, /^ឧ\.ស/i, /^ម\.ថ/i, /^ក\.ដ/i, /^សី/i, /^កញ/i, /^តុ/i, /^វិ/i, /^ធ/i],
  any: [/^មក/i, /^កុ/i, /^មីន/i, /^មេ/i, /^ឧស/i, /^មិថ/i, /^កក/i, /^សី/i, /^កញ/i, /^តុ/i, /^វិច/i, /^ធ/i]
};
var matchDayPatterns = {
  narrow: /^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,
  "short": /^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,
  abbreviated: /^(អា|ច|អ|ព|ព្រ|សុ|ស)/i,
  wide: /^(អាទិត្យ|ចន្ទ|អង្គារ|ពុធ|ព្រហស្បតិ៍|សុក្រ|សៅរ៍)/i
};
var parseDayPatterns = {
  narrow: [/^អា/i, /^ច/i, /^អ/i, /^ព/i, /^ព្រ/i, /^សុ/i, /^ស/i],
  any: [/^អា/i, /^ច/i, /^អ/i, /^ព/i, /^ព្រ/i, /^សុ/i, /^សៅ/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(ព្រឹក|ល្ងាច|ពេលព្រឹក|ពេលថ្ងៃត្រង់|ពេលល្ងាច|ពេលរសៀល|ពេលយប់|ពេលកណ្ដាលអធ្រាត្រ)/i,
  any: /^(ព្រឹក|ល្ងាច|ពេលព្រឹក|ពេលថ្ងៃត្រង់|ពេលល្ងាច|ពេលរសៀល|ពេលយប់|ពេលកណ្ដាលអធ្រាត្រ)/i
};
var parseDayPeriodPatterns = {
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
 * @summary Khmer locale (Cambodian).
 * @language Khmer
 * @iso-639-2 khm
 * @author Seanghay Yath [@seanghay]{@link https://github.com/seanghay}
 */

var locale = {
  code: 'km',
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0
    /* Sunday */
    ,
    firstWeekContainsDate: 1
  }
};

export default locale;
