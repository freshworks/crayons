'use strict';

var ES = require('es-abstract/es2017');

var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || (Math.pow(2, 53) - 1);

// eslint-disable-next-line max-params
var FlattenIntoArray = function FlattenIntoArray(target, source, sourceLen, start, depth) {
	var targetIndex = start;
	var sourceIndex = 0;

	var mapperFunction;
	if (arguments.length > 5) {
		mapperFunction = arguments[5];
	}

	while (sourceIndex < sourceLen) {
		var P = ES.ToString(sourceIndex);
		var exists = ES.HasProperty(source, P);
		if (exists) {
			var element = ES.Get(source, P);
			if (typeof mapperFunction !== 'undefined') {
				if (arguments.length <= 6) {
					throw new TypeError('Assertion failed: thisArg is required when mapperFunction is provided');
				}
				element = ES.Call(mapperFunction, arguments[6], [element, sourceIndex, source]);
			}
			var shouldFlatten = false;
			if (depth > 0) {
				shouldFlatten = ES.IsArray(element);
			}
			if (shouldFlatten) {
				var elementLen = ES.ToLength(ES.Get(element, 'length'));
				targetIndex = FlattenIntoArray(target, element, elementLen, targetIndex, depth - 1);
			} else {
				if (targetIndex >= MAX_SAFE_INTEGER) {
					throw new TypeError('index too large');
				}
				ES.CreateDataPropertyOrThrow(target, ES.ToString(targetIndex), element);
				targetIndex += 1;
			}
		}
		sourceIndex += 1;
	}

	return targetIndex;
};

module.exports = function flatMap(callbackfn) {
	var O = ES.ToObject(this);
	var sourceLen = ES.ToLength(ES.Get(O, 'length'));

	if (!ES.IsCallable(callbackfn)) {
		throw new TypeError('callback must be a function');
	}

	var T;
	if (arguments.length > 1) {
		T = arguments[1];
	}

	var A = ES.ArraySpeciesCreate(O, 0);
	FlattenIntoArray(A, O, sourceLen, 0, 1, callbackfn, T);
	return A;
};
