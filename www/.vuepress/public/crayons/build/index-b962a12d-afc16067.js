import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: {
      "default": '1 ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ',
      future: '1 ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ',
      past: '1 ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ'
    },
    other: {
      "default": '{{count}} ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ',
      future: '{{count}} ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ',
      past: '{{count}} ಸೆಕೆಂಡ್‌ಗಿಂತ ಕಡಿಮೆ'
    }
  },
  xSeconds: {
    one: {
      "default": '1 ಸೆಕೆಂಡ್',
      future: '1 ಸೆಕೆಂಡ್‌ನಲ್ಲಿ',
      past: '1 ಸೆಕೆಂಡ್ ಹಿಂದೆ'
    },
    other: {
      "default": '{{count}} ಸೆಕೆಂಡುಗಳು',
      future: '{{count}} ಸೆಕೆಂಡ್‌ಗಳಲ್ಲಿ',
      past: '{{count}} ಸೆಕೆಂಡ್ ಹಿಂದೆ'
    }
  },
  halfAMinute: {
    other: {
      "default": 'ಅರ್ಧ ನಿಮಿಷ',
      future: 'ಅರ್ಧ ನಿಮಿಷದಲ್ಲಿ',
      past: 'ಅರ್ಧ ನಿಮಿಷದ ಹಿಂದೆ'
    }
  },
  lessThanXMinutes: {
    one: {
      "default": '1 ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ',
      future: '1 ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ',
      past: '1 ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ'
    },
    other: {
      "default": '{{count}} ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ',
      future: '{{count}} ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ',
      past: '{{count}} ನಿಮಿಷಕ್ಕಿಂತ ಕಡಿಮೆ'
    }
  },
  xMinutes: {
    one: {
      "default": '1 ನಿಮಿಷ',
      future: '1 ನಿಮಿಷದಲ್ಲಿ',
      past: '1 ನಿಮಿಷದ ಹಿಂದೆ'
    },
    other: {
      "default": '{{count}} ನಿಮಿಷಗಳು',
      future: '{{count}} ನಿಮಿಷಗಳಲ್ಲಿ',
      past: '{{count}} ನಿಮಿಷಗಳ ಹಿಂದೆ'
    }
  },
  aboutXHours: {
    one: {
      "default": 'ಸುಮಾರು 1 ಗಂಟೆ',
      future: 'ಸುಮಾರು 1 ಗಂಟೆಯಲ್ಲಿ',
      past: 'ಸುಮಾರು 1 ಗಂಟೆ ಹಿಂದೆ'
    },
    other: {
      "default": 'ಸುಮಾರು {{count}} ಗಂಟೆಗಳು',
      future: 'ಸುಮಾರು {{count}} ಗಂಟೆಗಳಲ್ಲಿ',
      past: 'ಸುಮಾರು {{count}} ಗಂಟೆಗಳ ಹಿಂದೆ'
    }
  },
  xHours: {
    one: {
      "default": '1 ಗಂಟೆ',
      future: '1 ಗಂಟೆಯಲ್ಲಿ',
      past: '1 ಗಂಟೆ ಹಿಂದೆ'
    },
    other: {
      "default": '{{count}} ಗಂಟೆಗಳು',
      future: '{{count}} ಗಂಟೆಗಳಲ್ಲಿ',
      past: '{{count}} ಗಂಟೆಗಳ ಹಿಂದೆ'
    }
  },
  xDays: {
    one: {
      "default": '1 ದಿನ',
      future: '1 ದಿನದಲ್ಲಿ',
      past: '1 ದಿನದ ಹಿಂದೆ'
    },
    other: {
      "default": '{{count}} ದಿನಗಳು',
      future: '{{count}} ದಿನಗಳಲ್ಲಿ',
      past: '{{count}} ದಿನಗಳ ಹಿಂದೆ'
    }
  },
  aboutXMonths: {
    one: {
      "default": 'ಸುಮಾರು 1 ತಿಂಗಳು',
      future: 'ಸುಮಾರು 1 ತಿಂಗಳಲ್ಲಿ',
      past: 'ಸುಮಾರು 1 ತಿಂಗಳ ಹಿಂದೆ'
    },
    other: {
      "default": 'ಸುಮಾರು {{count}} ತಿಂಗಳು',
      future: 'ಸುಮಾರು {{count}} ತಿಂಗಳುಗಳಲ್ಲಿ',
      past: 'ಸುಮಾರು {{count}} ತಿಂಗಳುಗಳ ಹಿಂದೆ'
    }
  },
  xMonths: {
    one: {
      "default": '1 ತಿಂಗಳು',
      future: '1 ತಿಂಗಳಲ್ಲಿ',
      past: '1 ತಿಂಗಳ ಹಿಂದೆ'
    },
    other: {
      "default": '{{count}} ತಿಂಗಳು',
      future: '{{count}} ತಿಂಗಳುಗಳಲ್ಲಿ',
      past: '{{count}} ತಿಂಗಳುಗಳ ಹಿಂದೆ'
    }
  },
  aboutXYears: {
    one: {
      "default": 'ಸುಮಾರು 1 ವರ್ಷ',
      future: 'ಸುಮಾರು 1 ವರ್ಷದಲ್ಲಿ',
      past: 'ಸುಮಾರು 1 ವರ್ಷದ ಹಿಂದೆ'
    },
    other: {
      "default": 'ಸುಮಾರು {{count}} ವರ್ಷಗಳು',
      future: 'ಸುಮಾರು {{count}} ವರ್ಷಗಳಲ್ಲಿ',
      past: 'ಸುಮಾರು {{count}} ವರ್ಷಗಳ ಹಿಂದೆ'
    }
  },
  xYears: {
    one: {
      "default": '1 ವರ್ಷ',
      future: '1 ವರ್ಷದಲ್ಲಿ',
      past: '1 ವರ್ಷದ ಹಿಂದೆ'
    },
    other: {
      "default": '{{count}} ವರ್ಷಗಳು',
      future: '{{count}} ವರ್ಷಗಳಲ್ಲಿ',
      past: '{{count}} ವರ್ಷಗಳ ಹಿಂದೆ'
    }
  },
  overXYears: {
    one: {
      "default": '1 ವರ್ಷದ ಮೇಲೆ',
      future: '1 ವರ್ಷದ ಮೇಲೆ',
      past: '1 ವರ್ಷದ ಮೇಲೆ'
    },
    other: {
      "default": '{{count}} ವರ್ಷಗಳ ಮೇಲೆ',
      future: '{{count}} ವರ್ಷಗಳ ಮೇಲೆ',
      past: '{{count}} ವರ್ಷಗಳ ಮೇಲೆ'
    }
  },
  almostXYears: {
    one: {
      "default": 'ಬಹುತೇಕ 1 ವರ್ಷದಲ್ಲಿ',
      future: 'ಬಹುತೇಕ 1 ವರ್ಷದಲ್ಲಿ',
      past: 'ಬಹುತೇಕ 1 ವರ್ಷದಲ್ಲಿ'
    },
    other: {
      "default": 'ಬಹುತೇಕ {{count}} ವರ್ಷಗಳಲ್ಲಿ',
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

  return parentToken["default"];
}

function formatDistance(token, count, options) {
  options = options || {};
  var result;

  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (count === 1) {
    result = getResultByTense(formatDistanceLocale[token].one, options);
  } else {
    result = getResultByTense(formatDistanceLocale[token].other, options);
  }

  return result.replace('{{count}}', count);
}

// Reference: https://www.unicode.org/cldr/charts/32/summary/kn.html
var dateFormats = {
  full: 'EEEE, MMMM d, y',
  // CLDR 1816
  "long": 'MMMM d, y',
  // CLDR 1817
  medium: 'MMM d, y',
  // CLDR 1818
  "short": 'd/M/yy' // CLDR 1819

};
var timeFormats = {
  full: 'hh:mm:ss a zzzz',
  // CLDR 1820
  "long": 'hh:mm:ss a z',
  // CLDR 1821
  medium: 'hh:mm:ss a',
  // CLDR 1822
  "short": 'hh:mm a' // CLDR 1823

};
var dateTimeFormats = {
  full: '{{date}} {{time}}',
  // CLDR 1824
  "long": '{{date}} {{time}}',
  // CLDR 1825
  medium: '{{date}} {{time}}',
  // CLDR 1826
  "short": '{{date}} {{time}}' // CLDR 1827

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
  lastWeek: "'ಕಳೆದ' eeee p 'ಕ್ಕೆ'",
  yesterday: "'ನಿನ್ನೆ' p 'ಕ್ಕೆ'",
  today: "'ಇಂದು' p 'ಕ್ಕೆ'",
  tomorrow: "'ನಾಳೆ' p 'ಕ್ಕೆ'",
  nextWeek: "eeee p 'ಕ್ಕೆ'",
  other: 'P'
};
function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

// Reference: https://www.unicode.org/cldr/charts/32/summary/kn.html
var eraValues = {
  narrow: ['ಕ್ರಿ.ಪೂ', 'ಕ್ರಿ.ಶ'],
  abbreviated: ['ಕ್ರಿ.ಪೂ', 'ಕ್ರಿ.ಶ'],
  // CLDR #1618, #1620
  wide: ['ಕ್ರಿಸ್ತ ಪೂರ್ವ', 'ಕ್ರಿಸ್ತ ಶಕ'] // CLDR #1614, #1616

};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['ತ್ರೈ 1', 'ತ್ರೈ 2', 'ತ್ರೈ 3', 'ತ್ರೈ 4'],
  // CLDR #1630 - #1638
  wide: ['1ನೇ ತ್ರೈಮಾಸಿಕ', '2ನೇ ತ್ರೈಮಾಸಿಕ', '3ನೇ ತ್ರೈಮಾಸಿಕ', '4ನೇ ತ್ರೈಮಾಸಿಕ'] // CLDR #1622 - #1629

}; // CLDR #1646 - #1717

var monthValues = {
  narrow: ['ಜ', 'ಫೆ', 'ಮಾ', 'ಏ', 'ಮೇ', 'ಜೂ', 'ಜು', 'ಆ', 'ಸೆ', 'ಅ', 'ನ', 'ಡಿ'],
  abbreviated: ['ಜನ', 'ಫೆಬ್ರ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿ', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗ', 'ಸೆಪ್ಟೆಂ', 'ಅಕ್ಟೋ', 'ನವೆಂ', 'ಡಿಸೆಂ'],
  wide: ['ಜನವರಿ', 'ಫೆಬ್ರವರಿ', 'ಮಾರ್ಚ್', 'ಏಪ್ರಿಲ್', 'ಮೇ', 'ಜೂನ್', 'ಜುಲೈ', 'ಆಗಸ್ಟ್', 'ಸೆಪ್ಟೆಂಬರ್', 'ಅಕ್ಟೋಬರ್', 'ನವೆಂಬರ್', 'ಡಿಸೆಂಬರ್']
}; // CLDR #1718 - #1773

var dayValues = {
  narrow: ['ಭಾ', 'ಸೋ', 'ಮಂ', 'ಬು', 'ಗು', 'ಶು', 'ಶ'],
  "short": ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'],
  abbreviated: ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'],
  wide: ['ಭಾನುವಾರ', 'ಸೋಮವಾರ', 'ಮಂಗಳವಾರ', 'ಬುಧವಾರ', 'ಗುರುವಾರ', 'ಶುಕ್ರವಾರ', 'ಶನಿವಾರ']
}; // CLDR #1774 - #1815

var dayPeriodValues = {
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
var formattingDayPeriodValues = {
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

function ordinalNumber(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  return number + 'ನೇ';
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

var matchOrdinalNumberPattern = /^(\d+)(ನೇ|ನೆ)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(ಕ್ರಿ.ಪೂ|ಕ್ರಿ.ಶ)/i,
  abbreviated: /^(ಕ್ರಿ\.?\s?ಪೂ\.?|ಕ್ರಿ\.?\s?ಶ\.?|ಪ್ರ\.?\s?ಶ\.?)/i,
  wide: /^(ಕ್ರಿಸ್ತ ಪೂರ್ವ|ಕ್ರಿಸ್ತ ಶಕ|ಪ್ರಸಕ್ತ ಶಕ)/i
};
var parseEraPatterns = {
  any: [/^ಪೂ/i, /^(ಶ|ಪ್ರ)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^ತ್ರೈ[1234]|ತ್ರೈ [1234]| [1234]ತ್ರೈ/i,
  wide: /^[1234](ನೇ)? ತ್ರೈಮಾಸಿಕ/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^(ಜೂ|ಜು|ಜ|ಫೆ|ಮಾ|ಏ|ಮೇ|ಆ|ಸೆ|ಅ|ನ|ಡಿ)/i,
  abbreviated: /^(ಜನ|ಫೆಬ್ರ|ಮಾರ್ಚ್|ಏಪ್ರಿ|ಮೇ|ಜೂನ್|ಜುಲೈ|ಆಗ|ಸೆಪ್ಟೆಂ|ಅಕ್ಟೋ|ನವೆಂ|ಡಿಸೆಂ)/i,
  wide: /^(ಜನವರಿ|ಫೆಬ್ರವರಿ|ಮಾರ್ಚ್|ಏಪ್ರಿಲ್|ಮೇ|ಜೂನ್|ಜುಲೈ|ಆಗಸ್ಟ್|ಸೆಪ್ಟೆಂಬರ್|ಅಕ್ಟೋಬರ್|ನವೆಂಬರ್|ಡಿಸೆಂಬರ್)/i
};
var parseMonthPatterns = {
  narrow: [/^ಜ$/i, /^ಫೆ/i, /^ಮಾ/i, /^ಏ/i, /^ಮೇ/i, /^ಜೂ/i, /^ಜು$/i, /^ಆ/i, /^ಸೆ/i, /^ಅ/i, /^ನ/i, /^ಡಿ/i],
  any: [/^ಜನ/i, /^ಫೆ/i, /^ಮಾ/i, /^ಏ/i, /^ಮೇ/i, /^ಜೂನ್/i, /^ಜುಲೈ/i, /^ಆ/i, /^ಸೆ/i, /^ಅ/i, /^ನ/i, /^ಡಿ/i]
};
var matchDayPatterns = {
  narrow: /^(ಭಾ|ಸೋ|ಮ|ಬು|ಗು|ಶು|ಶ)/i,
  "short": /^(ಭಾನು|ಸೋಮ|ಮಂಗಳ|ಬುಧ|ಗುರು|ಶುಕ್ರ|ಶನಿ)/i,
  abbreviated: /^(ಭಾನು|ಸೋಮ|ಮಂಗಳ|ಬುಧ|ಗುರು|ಶುಕ್ರ|ಶನಿ)/i,
  wide: /^(ಭಾನುವಾರ|ಸೋಮವಾರ|ಮಂಗಳವಾರ|ಬುಧವಾರ|ಗುರುವಾರ|ಶುಕ್ರವಾರ|ಶನಿವಾರ)/i
};
var parseDayPatterns = {
  narrow: [/^ಭಾ/i, /^ಸೋ/i, /^ಮ/i, /^ಬು/i, /^ಗು/i, /^ಶು/i, /^ಶ/i],
  any: [/^ಭಾ/i, /^ಸೋ/i, /^ಮ/i, /^ಬು/i, /^ಗು/i, /^ಶು/i, /^ಶ/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(ಪೂ|ಅ|ಮಧ್ಯರಾತ್ರಿ|ಮಧ್ಯಾನ್ಹ|ಬೆಳಗ್ಗೆ|ಸಂಜೆ|ರಾತ್ರಿ)/i,
  any: /^(ಪೂರ್ವಾಹ್ನ|ಅಪರಾಹ್ನ|ಮಧ್ಯರಾತ್ರಿ|ಮಧ್ಯಾನ್ಹ|ಬೆಳಗ್ಗೆ|ಸಂಜೆ|ರಾತ್ರಿ)/i
};
var parseDayPeriodPatterns = {
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
 * @summary Kannada locale (India).
 * @language Kannada
 * @iso-639-2 kan
 * @author Manjunatha Gouli [@developergouli]{@link https://github.com/developergouli}
 */

var locale = {
  code: 'kn',
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
