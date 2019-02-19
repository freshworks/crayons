var spawn = require('../lib');
var expect = require('chai')
	.use(require('chai-as-promised'))
	.expect;

describe('#spawn', function () {
	it('resolve with stdout', function () {
		return expect(spawn('grep', ['h'], 'hello'))
			.to.eventually.deep.equal(new Buffer('hello\n'));
	});
	it('reject with exit code', function () {
		return expect(spawn('exit 1'))
			.to.be.rejected;
	});
	it('reject with error object', function () {
		return expect(spawn('grep', ['--s']))
			.to.be.rejected;
	});
});
