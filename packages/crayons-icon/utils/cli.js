const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	source: {
		type: `string`,
		default: './icons',
		alias: `i`,
		desc: `Source folder of svg files`
	},
	destination: {
		type: `string`,
		default: './dist/icons',
		alias: `o`,
		desc: `Output folder for svg files`
	},
	config: {
		type: `string`,
		default: 'default',
		alias: `x`,
		desc: `Load .yml config`
	},
	destYml: {
		type: `string`,
		default: './',
		alias: `d`,
		desc: `Outputs the fw.crayons.icon.svgo.yml at specified path.`
	},
	cli: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `For CLI Usage`
	},
};

const commands = {
	help: { desc: `-- H E L P  T O P I C S --` },
	svgoYML: { desc: `Dumps out the svgo.yml file to your root dir. Pass --dest <target> to output it to desired path. Use this YML Config for passing custom Optimization.`}
};

const helpText = meowHelp({
	name: `Freshworks Crayons-Icon CLI Tool uses an ultra trimmed Config for SVG Optimization. To override use -config or --x followed by path to your SVGO.YML file. You can extract the fw.crayons.svgo.yml at your command root to custom-modify by giving command svgoYML. See Help. `,
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
