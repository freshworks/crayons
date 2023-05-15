import { b as buildFormatLongFn, a as buildLocalizeFn, c as buildMatchPatternFn, d as buildMatchFn } from './index-dc611d24-9b65abdc.js';

// Source: https://www.unicode.org/cldr/charts/32/summary/te.html
var formatDistanceLocale = {
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
      return result + 'లో';
    } else {
      return result + ' క్రితం';
    }
  }

  return result;
}

// CLDR #1807 - #1811

var dateFormats = {
  full: 'd, MMMM y, EEEE',
  "long": 'd MMMM, y',
  medium: 'd MMM, y',
  "short": 'dd-MM-yy'
}; // CLDR #1807 - #1811

var timeFormats = {
  full: 'h:mm:ss a zzzz',
  "long": 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  "short": 'h:mm a'
}; // CLDR #1815 - #1818

var dateTimeFormats = {
  full: "{{date}} {{time}}'కి'",
  "long": "{{date}} {{time}}'కి'",
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

// Source: https://www.unicode.org/cldr/charts/32/summary/te.html
var formatRelativeLocale = {
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
function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
}

// Source: https://dsal.uchicago.edu/dictionaries/brown/
// CLDR #1605 - #1608

var eraValues = {
  narrow: ['క్రీ.పూ.', 'క్రీ.శ.'],
  abbreviated: ['క్రీ.పూ.', 'క్రీ.శ.'],
  wide: ['క్రీస్తు పూర్వం', 'క్రీస్తుశకం']
}; // CLDR #1613 - #1628

var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['త్రై1', 'త్రై2', 'త్రై3', 'త్రై4'],
  wide: ['1వ త్రైమాసికం', '2వ త్రైమాసికం', '3వ త్రైమాసికం', '4వ త్రైమాసికం']
}; // CLDR #1637 - #1708

var monthValues = {
  narrow: ['జ', 'ఫి', 'మా', 'ఏ', 'మే', 'జూ', 'జు', 'ఆ', 'సె', 'అ', 'న', 'డి'],
  abbreviated: ['జన', 'ఫిబ్ర', 'మార్చి', 'ఏప్రి', 'మే', 'జూన్', 'జులై', 'ఆగ', 'సెప్టెం', 'అక్టో', 'నవం', 'డిసెం'],
  wide: ['జనవరి', 'ఫిబ్రవరి', 'మార్చి', 'ఏప్రిల్', 'మే', 'జూన్', 'జులై', 'ఆగస్టు', 'సెప్టెంబర్', 'అక్టోబర్', 'నవంబర్', 'డిసెంబర్']
}; // CLDR #1709 - #1764

var dayValues = {
  narrow: ['ఆ', 'సో', 'మ', 'బు', 'గు', 'శు', 'శ'],
  "short": ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'],
  abbreviated: ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'],
  wide: ['ఆదివారం', 'సోమవారం', 'మంగళవారం', 'బుధవారం', 'గురువారం', 'శుక్రవారం', 'శనివారం']
}; // CLDR #1767 - #1806

var dayPeriodValues = {
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
var formattingDayPeriodValues = {
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

function ordinalNumber(dirtyNumber, _dirtyOptions) {
  var number = Number(dirtyNumber);
  return number + 'వ';
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

var matchOrdinalNumberPattern = /^(\d+)(వ)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(క్రీ\.పూ\.|క్రీ\.శ\.)/i,
  abbreviated: /^(క్రీ\.?\s?పూ\.?|ప్ర\.?\s?శ\.?\s?పూ\.?|క్రీ\.?\s?శ\.?|సా\.?\s?శ\.?)/i,
  wide: /^(క్రీస్తు పూర్వం|ప్రస్తుత శకానికి పూర్వం|క్రీస్తు శకం|ప్రస్తుత శకం)/i
};
var parseEraPatterns = {
  any: [/^(పూ|శ)/i, /^సా/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^త్రై[1234]/i,
  wide: /^[1234](వ)? త్రైమాసికం/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^(జూ|జు|జ|ఫి|మా|ఏ|మే|ఆ|సె|అ|న|డి)/i,
  abbreviated: /^(జన|ఫిబ్ర|మార్చి|ఏప్రి|మే|జూన్|జులై|ఆగ|సెప్|అక్టో|నవ|డిసె)/i,
  wide: /^(జనవరి|ఫిబ్రవరి|మార్చి|ఏప్రిల్|మే|జూన్|జులై|ఆగస్టు|సెప్టెంబర్|అక్టోబర్|నవంబర్|డిసెంబర్)/i
};
var parseMonthPatterns = {
  narrow: [/^జ/i, /^ఫి/i, /^మా/i, /^ఏ/i, /^మే/i, /^జూ/i, /^జు/i, /^ఆ/i, /^సె/i, /^అ/i, /^న/i, /^డి/i],
  any: [/^జన/i, /^ఫి/i, /^మా/i, /^ఏ/i, /^మే/i, /^జూన్/i, /^జులై/i, /^ఆగ/i, /^సె/i, /^అ/i, /^న/i, /^డి/i]
};
var matchDayPatterns = {
  narrow: /^(ఆ|సో|మ|బు|గు|శు|శ)/i,
  "short": /^(ఆది|సోమ|మం|బుధ|గురు|శుక్ర|శని)/i,
  abbreviated: /^(ఆది|సోమ|మం|బుధ|గురు|శుక్ర|శని)/i,
  wide: /^(ఆదివారం|సోమవారం|మంగళవారం|బుధవారం|గురువారం|శుక్రవారం|శనివారం)/i
};
var parseDayPatterns = {
  narrow: [/^ఆ/i, /^సో/i, /^మ/i, /^బు/i, /^గు/i, /^శు/i, /^శ/i],
  any: [/^ఆది/i, /^సోమ/i, /^మం/i, /^బుధ/i, /^గురు/i, /^శుక్ర/i, /^శని/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(పూర్వాహ్నం|అపరాహ్నం|అర్ధరాత్రి|మిట్టమధ్యాహ్నం|ఉదయం|మధ్యాహ్నం|సాయంత్రం|రాత్రి)/i,
  any: /^(పూర్వాహ్నం|అపరాహ్నం|అర్ధరాత్రి|మిట్టమధ్యాహ్నం|ఉదయం|మధ్యాహ్నం|సాయంత్రం|రాత్రి)/i
};
var parseDayPeriodPatterns = {
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
 * @summary Telugu locale
 * @language Telugu
 * @iso-639-2 tel
 * @author Kranthi Lakum [@kranthilakum]{@link https://github.com/kranthilakum}
 */

var locale = {
  code: 'te',
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
