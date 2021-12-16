#!/usr/bin/env node

/**
 * @freshworks/crayons-icon
 * Crayons-Icon as NodeJS-CLI Tool to optimize SVGs and generate JS Imports for icons.
 *
 * @author Freshworks <https://freshworks.in>
 */

const init = require('../utils/init');
const cli = require('../utils/cli');
const log = require('../utils/log');
const path = require('path');
const build = require('../utils/svgo.runner');
const defPluginOptions = require('../utils/default.svgo.config.js');
const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;
const yaml = require('js-yaml');
const fs = require('fs');
const JSON2YAML = require('json-to-pretty-yaml');
 
(async () => {
	init({ clear });
	input.includes(`help`) ? cli.showHelp(0) : '';
	console.log('cli-command :', input, '--params :', flags);

	const dump_yml = (defPluginOptions,cli) => {
		let dir = (!cli)? './dist':flags.destYml;
		fs.promises.mkdir(dir, { recursive: true }).catch(console.error);
		const data = JSON2YAML.stringify(defPluginOptions);
		fs.writeFileSync(path.join(dir, 'fw-crayons.icon.svgo.yml'), data);
		console.log('fw-crayons.icon.svgo.yml generated at',dir);
	}
	
	try {
		if(input.length>0 && !input.includes(`svgoYML`) && !input.includes(`help`))
		  throw new Error('Invalid Command');
		let pluginOptions;
		if(flags.config === 'default') {
			pluginOptions = JSON.parse(defPluginOptions());
			if(!flags.cli)
			  dump_yml(pluginOptions,flags.cli);
		}else{
			const ymlFile = fs.readFileSync(flags.config, 'utf8');
		    pluginOptions = yaml.load(ymlFile);
		}
		console.log('Applied -pluginOptions :',pluginOptions);

		input.includes(`svgoYML`)
			? dump_yml(pluginOptions,flags.cli)
			: build(
					path.join('./'),
					flags.source,
					flags.destination,
					pluginOptions
			  );
	} catch (e) {
		console.log('Invalid Command or Options. Kindly see help topics by passing help command.',e);
	}
	debug && log(flags);
})();
