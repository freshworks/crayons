const alert = require('cli-alerts');

module.exports = info => {
	alert({
		type: `warning`,
		name: `DEBUG LOG`,
		msg: `${info}`
	});

	console.log(info);
	console.log();
};
