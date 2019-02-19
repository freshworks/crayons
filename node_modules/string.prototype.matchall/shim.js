'use strict';

var define = require('define-properties');
var hasSymbols = require('has-symbols')();
var getPolyfill = require('./polyfill');
var regexMatchAll = require('./regexp-matchall');

var defineP = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

module.exports = function shimMatchAll() {
	var polyfill = getPolyfill();
	define(
		String.prototype,
		{ matchAll: polyfill },
		{ matchAll: function () { return String.prototype.matchAll !== polyfill; } }
	);
	if (hasSymbols) {
		// eslint-disable-next-line no-restricted-properties
		var symbol = Symbol.matchAll || (Symbol['for'] ? Symbol['for']('Symbol.matchAll') : Symbol('Symbol.matchAll'));
		define(
			Symbol,
			{ matchAll: symbol },
			{ matchAll: function () { return Symbol.matchAll !== symbol; } }
		);

		if (defineP && gOPD) {
			var desc = gOPD(Symbol, symbol);
			if (!desc || desc.configurable) {
				defineP(Symbol, symbol, {
					configurable: false,
					enumerable: false,
					value: symbol,
					writable: false
				});
			}
		}

		var func = {};
		func[symbol] = RegExp.prototype[symbol] || regexMatchAll;
		var predicate = {};
		predicate[symbol] = function () { return RegExp.prototype[symbol] !== regexMatchAll; };
		define(RegExp.prototype, func, predicate);
	}
	return polyfill;
};
