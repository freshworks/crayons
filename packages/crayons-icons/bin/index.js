#! /usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');
const build = require('../scripts/build');

const options = yargs
  .usage(
    chalk.bold.green(
      'Usage: crayons-icons-optimize -r <<rootDir>> -s <<srcDir>> -d <<destDir>>'
    )
  )
  .option('r', {
    alias: 'rootDir',
    describe: 'root directory for icons',
    type: 'string',
    demandOption: true,
    default: '',
  })
  .option('s', {
    alias: 'srcDir',
    describe:
      'Source directory for icons inside the root dir. Provide full directory path if root dir is not specified',
    type: 'string',
    demandOption: true,
  })
  .option('d', {
    alias: 'distDir',
    desc: 'Destination directory for optimized icons. Provide full directory path if root dir is not specified',
    type: 'string',
    demandOption: true,
  }).argv;

const { rootDir, srcDir, distDir } = options;
console.log({ rootDir, srcDir, distDir });
build(rootDir, srcDir, distDir);
