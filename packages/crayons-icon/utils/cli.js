const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	source: {
		type: `string`,
		default: './icons',
		alias: `src`,
		desc: `Source folder of svg files`
	},
	destination: {
		type: `string`,
		default: './dist/icons',
		alias: `dest`,
		desc: `Output folder for svg files`
	},
	config: {
		type: `string`,
		default: 'default',
		alias: `x`,
		desc: `Load your .yml config`
	}
};

const commands = {
	help: { desc: `-- H E L P  T O P I C S --` }
};

const helpText = meowHelp({
	name: `Freshworks Crayons-Icon as NodeJS-CLI Tool to optimize SVGs and generate JS Imports for icons.`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
