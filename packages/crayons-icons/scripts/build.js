/* eslint-disable no-undef */
const fs_extra = require('fs-extra');
const path = require('path');
const svgo = require('svgo');

module.exports = build;

async function build(rootDir, srcDir, distDir) {
  try {
    //const srcDir = path.join(rootDir, 'src');
    const srcSvgDir = path.join(rootDir, srcDir);
    //const distDir = path.join(rootDir, 'dist');
    const distSvgDir = path.join(rootDir, distDir);

    console.log({ srcSvgDir, distSvgDir });
    //await Promise.all([fs_extra.emptyDir(distDir)]);
    await fs_extra.emptyDir(distSvgDir);
    const srcSvgData = await getSvgs(srcSvgDir, distSvgDir);
    await optimizeSvgs(srcSvgData);
    console.log('Done');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
async function optimizeSvgs(srcSvgData) {
  // https://github.com/svg/svgo
  const optimizePass = new svgo({
    plugins: [
      {
        removeStyleElement: true,
      },
      {
        removeScriptElement: true,
      },
      {
        removeDimensions: true,
      },
      {
        removeXMLNS: true,
      },
    ],
  });

  await Promise.all(
    srcSvgData.map(async svgData => {
      return optimizeSvg(optimizePass, svgData);
    })
  );
}
async function optimizeSvg(optimizePass, svgData) {
  const srcSvgContent = await fs_extra.readFile(svgData.srcFilePath, 'utf8');
  const optimizedSvg = await optimizePass.optimize(srcSvgContent, {
    path: svgData.srcFilePath,
  });
  const optimizedCode = optimizedSvg.data;

  // .replace(
  //   /<svg (.*?)>/,
  //   `<svg xmlns="http://www.w3.org/2000/svg" class="fwicon" viewBox="0 0 512 512"><title>${svgData.title}</title>`
  // );

  svgData.optimizedSvgContent = optimizedCode;

  console.log(svgData.distSvgFilePath);
  await fs_extra.writeFile(svgData.distSvgFilePath, optimizedSvg.data);
}

async function getSvgs(srcSvgDir, distSvgDir) {
  const svgFiles = (await fs_extra.readdir(srcSvgDir)).filter(fileName => {
    return !fileName.startsWith('.') && fileName.endsWith('.svg');
  });
  const svgData = await Promise.all(
    svgFiles.map(async fileName => {
      // fileName: airplane-outline.svg
      if (fileName.toLowerCase() !== fileName) {
        throw new Error(`svg filename "${fileName}" must be all lowercase`);
      }
      // srcFilePath: /src/icons/airplane-outline.svg
      const srcFilePath = path.join(srcSvgDir, fileName);
      // distSvgFilePath: /dist/icons/airplane-outline.svg
      const distSvgFilePath = path.join(distSvgDir, fileName);
      const dotSplit = fileName.split('.');
      if (dotSplit.length > 2) {
        throw new Error(
          `svg filename "${fileName}" cannot contain more than one period`
        );
      }
      // iconName: airplane-outline
      const iconName = dotSplit[0];
      // if (reservedKeywords.has(iconName)) {
      //   throw new Error(
      //     `svg icon name "${iconName}" is a reserved JavaScript keyword`
      //   );
      // }
      // fileNameMjs: airplane-outline.mjs
      const fileNameMjs = iconName + '.mjs';
      // fileNameCjs: airplane-outline.mjs
      const fileNameCjs = iconName + '.js';
      // exportName: airplaneOutline
      const exportName = camelize(iconName);
      const title = toTitleCase(
        fileName
          .replace('.svg', '')
          .replace('-outline', '')
          .replace('-sharp', '')
          .replace(/-/g, ' ')
      );
      return {
        fileName,
        title,
        srcFilePath,
        distSvgFilePath,
        srcSvgContent: await fs_extra.readFile(srcFilePath, 'utf8'),
        iconName,
        fileNameMjs,
        fileNameCjs,
        exportName,
      };
    })
  );
  return svgData.sort((a, b) => {
    if (a.exportName < b.exportName) return -1;
    if (a.exportName > b.exportName) return 1;
    return 0;
  });
}
function camelize(text) {
  let words = text.split(/[-_]/g); // ok one simple regexp.
  return (
    words[0].toLowerCase() +
    words
      .slice(1)
      .map(upFirst)
      .join('')
  );
}
function upFirst(word) {
  return word[0].toUpperCase() + word.toLowerCase().slice(1);
}
function toTitleCase(str) {
  const s = str
    .trim()
    .toLowerCase()
    .split(' ');
  for (var i = 0; i < s.length; i++) {
    s[i] = s[i].charAt(0).toUpperCase() + s[i].slice(1);
  }
  return s.join(' ');
}

/*
svgtots generator
exports.generateSvgConstant = (variableName, filenameWithoutEnding, data) => {
    return `export const ${variableName} = \`${data}\``;
};
*/
