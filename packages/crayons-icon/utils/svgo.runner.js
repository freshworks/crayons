/* eslint-disable no-undef */
const fs_extra = require('fs-extra');
const path = require('path');
const svgo = require('svgo');
const log = require('./log');

module.exports = build;
async function build(rootDir, srcDir, distDir, loadConfigPlugins) {
  try {
    const srcSvgDir = path.join(rootDir, srcDir);
    const distSvgDir = path.join(rootDir, distDir);
    let alert = {};
    alert = {
      type: 'info',
      name: 'Optimizing SVGs In-Progress...',
      msg: `Target Path: ${srcSvgDir}`,
    };
    log(alert);

    await fs_extra.emptyDir(distSvgDir);
    const srcSvgData = await getSvgs(srcSvgDir, distSvgDir);
    await optimizeSvgs(srcSvgData, loadConfigPlugins);

    alert = {
      type: 'success',
      name: 'DONE',
      msg: `Optimized SVGs moved to ${distSvgDir}`,
    };
    log(alert);
  } catch (e) {
    let alert = {};
    alert = {
      type: 'error',
      name: 'SVGO RunLog : (fn)build',
      msg: `Error :  ${e}`,
    };
    log(alert);
    process.exit(1);
  }
}
async function optimizeSvgs(srcSvgData, loadConfigPlugins) {
  let pluginOptions = [];
  loadConfigPlugins.plugins.forEach(function (data) {
    for (key in data) {
      if (data[key]) pluginOptions = [...pluginOptions, data];
    }
  });
  const optimizePass = new svgo({
    plugins: [...pluginOptions],
  });

  await Promise.all(
    srcSvgData.map(async (svgData) => {
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
  svgData.optimizedSvgContent = optimizedCode;
  await fs_extra.writeFile(svgData.distSvgFilePath, optimizedSvg.data);
}

async function getSvgs(srcSvgDir, distSvgDir) {
  const svgFiles = (await fs_extra.readdir(srcSvgDir)).filter((fileName) => {
    return !fileName.startsWith('.') && fileName.endsWith('.svg');
  });
  const svgData = await Promise.all(
    svgFiles.map(async (fileName) => {
      if (fileName.toLowerCase() !== fileName) {
        throw new Error(`svg filename "${fileName}" must be all lowercase`);
      }
      const srcFilePath = path.join(srcSvgDir, fileName);
      const distSvgFilePath = path.join(distSvgDir, fileName);
      const dotSplit = fileName.split('.');
      if (dotSplit.length > 2) {
        throw new Error(
          `svg filename "${fileName}" cannot contain more than one period`
        );
      }
      const iconName = dotSplit[0];
      const exportName = camelize(iconName);
      const title = toTitleCase(
        fileName.replace('.svg', '').replace(/-/g, ' ')
      );
      return {
        fileName,
        title,
        srcFilePath,
        distSvgFilePath,
        srcSvgContent: await fs_extra.readFile(srcFilePath, 'utf8'),
        iconName,
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
  let words = text.split(/[-_]/g);
  return words[0].toLowerCase() + words.slice(1).map(upFirst).join('');
}
function upFirst(word) {
  return word[0].toUpperCase() + word.toLowerCase().slice(1);
}
function toTitleCase(str) {
  const s = str.trim().toLowerCase().split(' ');
  for (var i = 0; i < s.length; i++) {
    s[i] = s[i].charAt(0).toUpperCase() + s[i].slice(1);
  }
  return s.join(' ');
}
