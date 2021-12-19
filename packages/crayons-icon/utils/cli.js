const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
  cli: {
    type: `boolean`,
    default: true,
    alias: `c`,
    desc: `@freshworks/crayons-icon as a CLI Tool`,
  },
  config: {
    type: `string`,
    default: 'default',
    alias: `x`,
    desc: `Apply your custom xxx.svgo.yml plugin config`,
  },
  quiet: {
    type: `boolean`,
    default: false,
    alias: `q`,
    desc: `On/Off printing CLI Terminal logs.`,
  },
  destYml: {
    type: `string`,
    default: './',
    alias: `d`,
    desc: `Outputs the default fw.crayons.icon.svgo.yml at specified path.`,
  },
  source: {
    type: `string`,
    default: './icons',
    alias: `i`,
    desc: `Source folder of svg files`,
  },
  destination: {
    type: `string`,
    default: './dist/icons',
    alias: `o`,
    desc: `Output folder for optimized svg files`,
  },
};

const commands = {
  help: { desc: `-- H E L P  T O P I C S --` },
  svgoYML: {
    desc: `Dumps the default system svgo.yml file to your root dir. Pass --destYml <target> to output it to desired path. Use this YML Config for passing custom Optimization.`,
  },
};

const helpText = meowHelp({
  name: `Freshworks Crayons-Icon CLI Tool uses an ultra tuned SVGO Config for SVG Optimization. To override use --config or -x followed by path to your SVGO.YML file. You can also extract the default 'fw.crayons.svgo.yml' at your command root ( to custom-modify ) by giving command svgoYML. See Help. `,
  flags,
  commands,
});

const options = {
  inferType: true,
  description: false,
  hardRejection: false,
  flags,
};

module.exports = meow(helpText, options);
