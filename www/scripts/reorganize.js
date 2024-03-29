#!/usr/bin/env node

/*
  This script is written to re-organize the readme.md files generated by the
  crayons packages into a unified directory structure for the purposes of a
  clean URL structure in the website that Vuepress will generate.

  The crayons builds will result in readme.md files generated in the following
  structure within the 'www' directory

  repo-root
  |_ www
     |_ core
     |  |_ components
     |     |_ button
     |        |_ readme.md
     |     |_ toggle
     |        |_ readme.md
     |_ data-table
     |  |_ components
     |     |_ readme.md
     |...

  This script will turn the above file structure into the following file structure

  repo-root
  |_ www
     |_ components
        |_ core
        |  |_ button
        |     |_ readme.md
        |  |_ toggle
        |     |_ readme.md
        |_ data-table
        |  |_ readme.md
        |...
*/

const fsPromises = require('fs/promises');
const path = require('path');
const wwwRoot = path.resolve(__dirname, '..');

const fetchTargets = async function () {
  const targets = [];
  const rootEntries = await fsPromises.readdir(wwwRoot);

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
      if (e.code !== 'ENOTDIR' && e.code !== 'ENOENT') {
        throw e;
      }
    }
  }

  return targets;
};

const processTargets = async function (targets) {
  const components = [];
  const outputRoot = path.resolve(wwwRoot, 'components');
  await fsPromises.rmdir(outputRoot, { recursive: true }); // clean-up prior builds before starting
  await fsPromises.mkdir(outputRoot);

  // the json file which contains meta data of all readme files
  const docPath = path.resolve(
    __dirname,
    '../../packages/crayons-core/dist/docs.json'
  );
  const docFile = JSON.parse(await fsPromises.readFile(docPath));

  for (let target of targets) {
    const entries = await fsPromises.readdir(
      path.resolve(wwwRoot, target, 'components')
    );
    const packageRoot = path.resolve(wwwRoot, target);

    // Move each component directory from inside <package-name>/components to
    // the <package-name> directory. E.g. core/components/button becomes core/button
    for (const entry of entries) {
      // components that has the decorator `@parent`
      const parentTag = docFile.components.find((item) => {
        return (
          item.docsTags[0]?.text &&
          item.tag === 'fw-' + entry &&
          item.docsTags[0]?.name === 'parent'
        );
      });

      // if a component has a parent tag, modify the file path
      // eg: core/accordian-body becomes core/accordian/accordian-body
      const fileEntry = parentTag
        ? parentTag.docsTags[0].text + '/' + entry
        : entry;

      // create parent folder when a component has a parent tag
      parentTag &&
        (await fsPromises.mkdir(
          path.resolve(packageRoot, parentTag.docsTags[0].text, entry),
          { recursive: true }
        ));

      await fsPromises.rename(
        path.resolve(packageRoot, 'components', entry),
        path.resolve(packageRoot, fileEntry)
      );

      // Write the update path to the components array, which will be written to
      // JSON for generating the sidebar configuration in Vuepress.
      components.push(`components/${target}/${fileEntry}/`);
    }

    // Clean-up the now-empty <package-name>/components directory so that
    // it doesn't get copied to the new directory structure.
    await fsPromises.rmdir(path.resolve(packageRoot, 'components'), {
      recursive: true,
    });

    // Move the entire <package-name> directory into the new 'components' directory
    // e.g. www/core/* becomes /www/components/core/*
    await fsPromises.rename(packageRoot, path.resolve(outputRoot, target));
  }

  return components;
};

const run = async function () {
  const targets = await fetchTargets();
  const components = JSON.stringify(await processTargets(targets));
  await fsPromises.writeFile(
    path.resolve(wwwRoot, 'components.json'),
    components
  );
};

console.log('Re-organizing of readme.md files in the www directory started.');
run().then(() => {
  console.log(
    'Re-organizing of readme.md files in the www directory completed.'
  );
});
