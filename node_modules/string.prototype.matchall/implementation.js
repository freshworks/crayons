'use strict';

var ES = require('es-abstract');
var hasSymbols = require('has-symbols')();

var regexMatchAll = require('./regexp-matchall');

module.exports = function matchAll(regexp) {
	var O = ES.RequireObjectCoercible(this);

	if (typeof regexp !== 'undefined' && regexp !== null) {
		var matcher;
		if (hasSymbols && typeof Symbol.matchAll === 'symbol') {
			matcher = ES.GetMethod(regexp, Symbol.matchAll);
		} else if (ES.IsRegExp(regexp)) {
			// fallback for pre-Symbol.matchAll environments
			matcher = regexMatchAll;
		}
		if (typeof matcher !== 'undefined') {
			return ES.Call(matcher, regexp, [O]);
		}
	}

	var S = ES.ToString(O);
	// var rx = ES.RegExpCreate(regexp, 'g');
	var rx = new RegExp(regexp, 'g');
	if (hasSymbols && typeof Symbol.matchAll === 'symbol') {
		return ES.Invoke(rx, Symbol.matchAll, [S]);
	}
	// fallback for pre-Symbol.matchAll environments
	return ES.Call(regexMatchAll, rx, [S]);
};
