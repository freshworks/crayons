import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
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

function formatDistance(token, count, options) {
  options = options || {};
  var usageGroup = options.addSuffix ? formatDistanceLocale[token].withPreposition : formatDistanceLocale[token].standalone;
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

var dateFormats = {
  full: 'EEEE, do MMMM y',
  // Méindeg, 7. Januar 2018
  "long": 'do MMMM y',
  // 7. Januar 2018
  medium: 'do MMM y',
  // 7. Jan 2018
  "short": 'dd.MM.yy' // 07.01.18

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
  lastWeek: function lastWeek(date) {
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
function formatRelative(token, date, _baseDate, _options) {
  var format = formatRelativeLocale[token];

  if (typeof format === 'function') {
    return format(date);
  }

  return format;
}

var eraValues = {
  narrow: ['v.Chr.', 'n.Chr.'],
  abbreviated: ['v.Chr.', 'n.Chr.'],
  wide: ['viru Christus', 'no Christus']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1. Quartal', '2. Quartal', '3. Quartal', '4. Quartal']
};
var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mäe', 'Abr', 'Mee', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  wide: ['Januar', 'Februar', 'Mäerz', 'Abrëll', 'Mee', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
};
var dayValues = {
  narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
  "short": ['So', 'Mé', 'Dë', 'Më', 'Do', 'Fr', 'Sa'],
  abbreviated: ['So.', 'Mé.', 'Dë.', 'Më.', 'Do.', 'Fr.', 'Sa.'],
  wide: ['Sonndeg', 'Méindeg', 'Dënschdeg', 'Mëttwoch', 'Donneschdeg', 'Freideg', 'Samschdeg']
};
var dayPeriodValues = {
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
var formattingDayPeriodValues = {
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
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};

var matchOrdinalNumberPattern = /^(\d+)(\.)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  abbreviated: /^(v\.? ?Chr\.?|n\.? ?Chr\.?)/i,
  wide: /^(viru Christus|virun eiser Zäitrechnung|no Christus|eiser Zäitrechnung)/i
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
  abbreviated: /^(jan|feb|mäe|abr|mee|jun|jul|aug|sep|okt|nov|dez)/i,
  wide: /^(januar|februar|mäerz|abrëll|mee|juni|juli|august|september|oktober|november|dezember)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mä/i, /^ab/i, /^me/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smdf]/i,
  "short": /^(so|mé|dë|më|do|fr|sa)/i,
  abbreviated: /^(son?|méi?|dën?|mët?|don?|fre?|sam?)\.?/i,
  wide: /^(sonndeg|méindeg|dënschdeg|mëttwoch|donneschdeg|freideg|samschdeg)/i
};
var parseDayPatterns = {
  any: [/^so/i, /^mé/i, /^dë/i, /^më/i, /^do/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(mo\.?|nomë\.?|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i,
  abbreviated: /^(moi\.?|nomët\.?|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i,
  wide: /^(moies|nomëttes|Mëtternuecht|mëttes|moies|nomëttes|owes|nuets)/i
};
var parseDayPeriodPatterns = {
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
 * @summary Luxembourgish locale.
 * @language Luxembourgish
 * @iso-639-2 ltz
 * @author Daniel Waxweiler [@dwaxweiler]{@link https://github.com/dwaxweiler}
 */

var locale = {
  code: 'lb',
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
