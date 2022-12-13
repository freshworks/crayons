#!/usr/bin/env node

/** This script is used to generate readme files for all @freshworks/crayons versions using the template to populate the integrity attribute */

const fs = require('fs');
const path = require('path');
const { render } = require('mustache');

try {
  const versions = JSON.parse(fs.readFileSync(process.env.VERSION_FILE));
  const template = fs
    .readFileSync(path.join(__dirname, 'template.md'))
    .toString();

  const versionTemplate = fs
    .readFileSync(path.join(__dirname, 'version-template.md'))
    .toString();

  const wwwRoot = path.resolve(__dirname, '..');

  fs.rmdirSync(path.resolve(wwwRoot, 'versions'), {
    recursive: true,
  });
  const versionMap = {};
  const versionGroup = [];

  versions.forEach((versionObj) => {
    const subFolder = `v${versionObj['key'].split('.')[0]}.x`;

    if (!versionMap[subFolder]) versionMap[subFolder] = [];
    versionMap[subFolder].push({
      label: versionObj['key'],
      href: `/versions/${subFolder}/${versionObj['key']}/`,
    });

    const output = render(template, {
      ['esm']: versionObj['esm'],
      ['es5']: versionObj['es5'],
      ['css']: versionObj['css'],
      key: versionObj['key'],
    });

    const filePath = path.join(
      wwwRoot,
      'versions',
      subFolder,
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

  Object.keys(versionMap)
    .reverse()
    .forEach((key) => {
      versionGroup.push({
        group: key,
        versions: versionMap[key].reverse(),
      });
    });

  const versionIndexFile = render(versionTemplate, {
    ['versions']: versionGroup,
  });

  fs.writeFileSync(path.join(wwwRoot, `versions/readme.md`), versionIndexFile);

  console.log('Readme files for versions created');
} catch (err) {
  console.log('Error creating readme files for all versions ', err);
}
