'use strict';

/* global Symbol */

// var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

module.exports = function (fromEntries, t) {
	var a = {};
	var b = {};
	var c = {};
	var entries = [['a', a], ['b', b], ['c', c]];
	var obj = { a: a, b: b, c: c };

	t.deepEqual(fromEntries(entries), obj, 'entries -> obj');
};
