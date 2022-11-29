#!/usr/bin/env node

/** This script is used to generate readme files for all @freshworks/crayons versions using the template to populate the integrity attribute */

const fs = require('fs');
const path = require('path');
const { render } = require('mustache');
const filename = process.argv.splice(2)[0];

try {
  const versions = JSON.parse(fs.readFileSync(filename));
  const template = fs
    .readFileSync(path.join(__dirname, 'template.md'))
    .toString();

  const wwwRoot = path.resolve(__dirname, '..');

  fs.rmdirSync(path.resolve(wwwRoot, 'versions'), {
    recursive: true,
  });

  versions.forEach((versionObj) => {
    const output = render(template, {
      ['esm']: versionObj['esm'],
      ['es5']: versionObj['es5'],
      ['css']: versionObj['css'],
      key: versionObj['key'],
    });

    const filePath = path.join(
      wwwRoot,
      'versions',
      `${versionObj['key']}/readme.md`
    );
    const dirName = path.dirname(filePath);

    try {
      fs.accessSync(dirName);
    } catch (err) {
      fs.mkdirSync(dirName, { recursive: true });
    }

    fs.writeFileSync(filePath, output);
  });
  console.log('Readme files for versions created');
} catch (err) {
  console.log('Error creating readme files for all versions ', err);
}
