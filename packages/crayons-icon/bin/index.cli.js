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

(async () => {
	init({ clear });
	input.includes(`help`) ? cli.showHelp(0) : '';
	console.log('cli input', input, 'params', flags);
	try {
		
		let pluginOptions = [];
		if(flags.config === 'default') {
			pluginOptions = [...defPluginOptions()];
		}else{
			const ymlFile = fs.readFileSync(flags.config, 'utf8');
		    const doc = yaml.load(ymlFile);
			pluginOptions = [...doc.plugins];
		}
		console.log('defaultConfig',pluginOptions);
		input.includes(`defaultConfig`)
			? console.log(
					'System File :svgo.yml | Leaf-Note: You may filter copy the content under plugins section and set to true, create your custom .yml file and feed that to cli. \n',
					defPluginOptions()
			  )
			: build(
					path.join('./'),
					flags.source,
					flags.destination,
					pluginOptions
			  );
	} catch (e) {
		console.log(e);
	}
	debug && log(flags);
})();
