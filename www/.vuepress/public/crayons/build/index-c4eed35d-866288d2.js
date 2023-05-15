import { b as buildFormatLongFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
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

var formatDistance = function formatDistance(token, count, options) {
  var result;
  var tokenValue = options !== null && options !== void 0 && options.addSuffix ? formatDistanceLocale[token].withPreposition : formatDistanceLocale[token].standalone;

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

var dateFormats = {
  full: 'EEEE, do MMMM y',
  // Montag, 7. Januar 2018
  "long": 'do MMMM y',
  // 7. Januar 2018
  medium: 'do MMM y',
  // 7. Jan. 2018
  "short": 'dd.MM.y' // 07.01.2018

};
var timeFormats = {
  full: 'HH:mm:ss zzzz',
  "long": 'HH:mm:ss z',
  medium: 'HH:mm:ss',
  "short": 'HH:mm'
};
var dateTimeFormats = {
  full: "{{date}} 'um' {{time}}",
  "long": "{{date}} 'um' {{time}}",
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
  lastWeek: "'letzten' eeee 'um' p",
  yesterday: "'gestern um' p",
  today: "'heute um' p",
  tomorrow: "'morgen um' p",
  nextWeek: "eeee 'um' p",
  other: 'P'
};

var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};

var matchOrdinalNumberPattern = /^(\d+)(\.)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  wide: /^(vor Christus|vor unserer Zeitrechnung|nach Christus|unserer Zeitrechnung)/i
};
var parseEraPatterns = {
  any: [/^v/i, /^n/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](\.)? Quartal/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(j[aä]n|feb|mär[z]?|apr|mai|jun[i]?|jul[i]?|aug|sep|okt|nov|dez)\.?/i,
  wide: /^(januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^j[aä]/i, /^f/i, /^mär/i, /^ap/i, /^mai/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smdmf]/i,
  "short": /^(so|mo|di|mi|do|fr|sa)/i,
  abbreviated: /^(son?|mon?|die?|mit?|don?|fre?|sam?)\.?/i,
  wide: /^(sonntag|montag|dienstag|mittwoch|donnerstag|freitag|samstag)/i
};
var parseDayPatterns = {
  any: [/^so/i, /^mo/i, /^di/i, /^mi/i, /^do/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(vm\.?|nm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  abbreviated: /^(vorm\.?|nachm\.?|Mitternacht|Mittag|morgens|nachm\.?|abends|nachts)/i,
  wide: /^(vormittags|nachmittags|Mitternacht|Mittag|morgens|nachmittags|abends|nachts)/i
};
var parseDayPeriodPatterns = {
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
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value);
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

export { formatLong as a, formatRelative as b, formatDistance as f, match as m };
