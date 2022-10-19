#!/usr/bin/env node

/*
 This Script will move the readme files from 
 site/core/components/button/readme.md to site/components/button.md
 This Script also creates the sidebar dynamically
*/

const fsPromises = require('fs/promises');
const path = require('path');
const wwwRoot = path.resolve(__dirname, '..');

const fetchTargets = async function () {
  const targets = [];
  const rootEntries = await fsPromises.readdir(wwwRoot);
  console.log(rootEntries);

  for (let entry of rootEntries) {
    try {
      await fsPromises.readdir(path.resolve(wwwRoot, entry, 'components'));

      // Skip directories which have names that start with '.' - e.g. .vuepress
      if (!/^\./.test(entry)) {
        targets.push(entry);
      }
    } catch (e) {
      /*
        ENOTDIR/ENOENT errors are expected since this is being done to filter
        out directories without a component sub-directory. Errors other than
        these need to be thrown.
      */
      if (e.code != 'ENOTDIR' && e.code != 'ENOENT') {
        throw e;
      }
    }
  }

  return targets;
};

const processTargets = async function (targets) {
  const components = [];
  const outputRoot = path.resolve(wwwRoot, 'components'); // site/components
  await fsPromises.rmdir(outputRoot, { recursive: true }); // clean-up prior builds before starting
  await fsPromises.mkdir(outputRoot);

  for (let target of targets) {
    const entries = await fsPromises.readdir(
      path.resolve(wwwRoot, target, 'components') //site/core/components
    );
    const packageRoot = path.resolve(wwwRoot, target); //site/core

    // Move each component readme from inside <package-name>/components to
    // the components directory. E.g. core/components/button/readme.md becomes components/button.md
    for (const entry of entries) {
      console.log(entry);
      await fsPromises.rename(
        path.resolve(packageRoot, 'components', entry, 'readme.md'), // site/core/components/button/readme.md
        path.resolve(outputRoot, `${entry}.md`) // site/components/button.md
      );

      // Write the update path to the components array, which will be written to
      // JSON for generating the sidebar configuration in Vuepress.
      components.push(`${entry}`);
    }

    await fsPromises.copyFile(
      path.resolve(wwwRoot, 'introduction.md'), // site/introduction.md
      path.resolve(outputRoot, `introduction.md`) // site/components/introduction.md
    );

    // Clean-up the now-empty <package-name>/components directory so that
    // it doesn't get copied to the new directory structure.
    await fsPromises.rmdir(path.resolve(packageRoot), {
      recursive: true,
    });
  }
  return components;
};

const processJson = async function (targets) {
  const components = [];
  //const metadata;
  const outputFile = path.resolve(wwwRoot, 'components.json'); // site/components.json
  //await fsPromises.unlink(outputFile); // clean-up prior builds before starting

  for (let target of targets) {
    const jsonContent = await fsPromises.readFile(
      path.resolve(wwwRoot, `components-${target}.json`).toString() //site/components-core.json
    );

    const parsedContent = JSON.parse(jsonContent);

    components.push(...parsedContent?.components);
    await fsPromises.unlink(
      path.resolve(wwwRoot, `components-${target}.json`).toString() //delete site/components-core.json
    );
    await fsPromises.unlink(
      path.resolve(wwwRoot, `components-${target}.d.ts`).toString() //delete site/components-core.d.ts
    );
  }

  await fsPromises.writeFile(outputFile, JSON.stringify(components));
};

const run = async function () {
  const targets = await fetchTargets();
  console.log(targets);
  const components = await processTargets(targets);

  await processJson(targets);

  await createSideBarFile(components);
  return;
};

console.log('Re-organizing of readme.md files in the site directory started.');
run().then(() => {
  console.log(
    'Re-organizing of readme.md files in the site directory completed.'
  );
});

async function createSideBarFile(components) {
  console.log('components ', components);
  let componentsLink = components.map((c) => {
    let name = c
      .split('-')
      .map((n) => n[0].toUpperCase() + n.substring(1))
      .join(' ');

    return `- [${name}](/components/${c})`;
  });

  let mdFile = `- Getting Started

  - [Overview](/)
- Components

  - [Introduction](/components/introduction)
`;

  componentsLink.forEach((c) => {
    mdFile += '  ' + c + '\n';
  });

  await fsPromises.writeFile(path.resolve(wwwRoot, '_sidebar.md'), mdFile);
}
