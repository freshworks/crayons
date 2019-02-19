'use strict';

var hasSymbols = require('has-symbols')();
var symToStr = hasSymbols ? Function.call.bind(Symbol.prototype.toString) : null;
var getInferredName = require('./helpers/getInferredName');

module.exports = function description() {
	var str = symToStr(this); // will throw if not a Symbol

	if (getInferredName) {
		var name = getInferredName(this);
		if (name === '') { return; }
		return name.slice(1, -1); // name.slice('['.length, -']'.length);
	}

	var desc = str.slice(7, -1); // str.slice('Symbol('.length, -')'.length);
	if (desc) {
		return desc;
	}
};
