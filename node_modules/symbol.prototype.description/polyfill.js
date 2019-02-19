'use strict';

var hasSymbols = require('has-symbols')();

var implementation = require('./implementation');
var gOPD = Object.getOwnPropertyDescriptor;

module.exports = function descriptionPolyfill() {
	if (!hasSymbols || typeof gOPD !== 'function') {
		return null;
	}
	var desc = gOPD(Symbol.prototype, 'description');
	if (!desc || typeof desc.get !== 'function') {
		return implementation;
	}
	if (typeof desc.get.call(Symbol()) !== 'undefined' || desc.get.call(Symbol()) !== '' || desc.get.call(Symbol('a')) !== 'a') {
		return implementation;
	}
	return desc.get;
};
