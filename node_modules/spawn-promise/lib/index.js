var co = require('co');
var childProcess = require('child_process');

var exitCodes = {
	1: 'Uncaught Fatal Exception',
	3: 'Internal JavaScript Parse Error',
	4: 'Internal JavaScript Evaluation Failure',
	5: 'Fatal Error',
	6: 'Non-function Internal Exception Handler',
	7: 'Internal Exception Handler Run-Time Failure',
	9: 'Invalid Argument',
	10: 'Internal JavaScript Run-Time Failure',
	12: 'Invalid Debug Argument'
};
var isEmpty = object => Object.keys(object).length === 0;
/**
 * Spawn a child process and receive output via a Promise interface.
 *
 * @params {String} command
 * 	Command to spawn.
 * @params {String[]} args
 *  Array of arguments to run command with.
 * @params {String} input
 * 	Input to pass command via stdin.
 *
 * @returns {Promise}
 * 	Resolved with buffer of stdout
 * 	Rejected with error
 */
var spawn = co.wrap(function * (command, args, input) {
	var child = childProcess.spawn(command, args);

	// TODO handle sig events? (sigint, etc.)

	// Capture errors
	var errors = {};
	var stderrOutput = {}
	child.on('error', error => errors.spawn = error);
	child.stdin.on('error', error => errors.stdin = error);
	child.stdout.on('error', error => errors.stdout = error);
	child.stderr.setEncoding('utf8');
	child.stderr.on('error', error => errors.stderr = error);
	child.stderr.on('data', data => {
		if (!stderrOutput.process) stderrOutput.process = '';
		stderrOutput.process += data;
	});

	// Capture output
	var buffers = [];
	child.stdout.on('data', data => buffers.push(data));

	// Run
	var exitCode = yield new Promise(resolve => {
		child.on('close', (code, signal) => resolve(code));
		child.stdin.end(input);
	});
	if (exitCode !== 0) {
		errors.exit = `Command failed: ${exitCode}: ${exitCodes[exitCode]}`;
		errors.process = stderrOutput.process;
	}

	// Return
	if (!isEmpty(errors)) throw new Error(JSON.stringify(errors));
	return Buffer.concat(buffers);
});

module.exports = spawn;
