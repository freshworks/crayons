'use strict';
/* eslint-disable no-undef */
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const fs_extra_1 = __importDefault(require('fs-extra'));
const path_1 = require('path');
const svgo_1 = __importDefault(require('svgo'));
async function build(rootDir) {
  try {
    //   const pkgJsonPath = path_1.join(rootDir, 'package.json');
    const srcDir = path_1.join(rootDir);
    const srcSvgDir = path_1.join(srcDir, 'icons');
    const distDir = path_1.join(rootDir, 'dist');
    const distIoniconsDir = path_1.join(distDir, 'icons');
    const distSvgDir = path_1.join(distDir, 'icons');
    await Promise.all([fs_extra_1.default.emptyDir(distDir)]);
    await fs_extra_1.default.emptyDir(distSvgDir),
      await fs_extra_1.default.emptyDir(distIoniconsDir);
    // const pkgData = await fs_extra_1.default.readJson(pkgJsonPath);
    //  const version = pkgData.version;
    const srcSvgData = await getSvgs(srcSvgDir, distSvgDir, distIoniconsDir);
    await optimizeSvgs(srcSvgData);
    //  await Promise.all([createDataJson(version, srcDir, distDir, srcSvgData)]);
    // const svgSymbolsContent = await createSvgSymbols(
    //   version,
    //   distDir,
    //   srcSvgData
    // );
    // await createCheatsheet(
    //   version,
    //   rootDir,
    //   distDir,
    //   svgSymbolsContent,
    //   srcSvgData
    // );
    // await copyToTesting(rootDir, distDir, srcSvgData);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
async function optimizeSvgs(srcSvgData) {
  // https://github.com/svg/svgo
  const optimizePass = new svgo_1.default({});
  const webComponentPass = new svgo_1.default({
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
    ],
  });
  const sourcePass = new svgo_1.default({
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
    ],
  });
  const validatePass = new svgo_1.default({
    plugins: [],
  });
  await Promise.all(
    srcSvgData.map(async svgData => {
      return optimizeSvg(
        optimizePass,
        webComponentPass,
        sourcePass,
        validatePass,
        svgData
      );
    })
  );
}
async function optimizeSvg(
  optimizePass,
  webComponentPass,
  sourcePass,
  validatePass,
  svgData
) {
  const srcSvgContent = await fs_extra_1.default.readFile(
    svgData.srcFilePath,
    'utf8'
  );
  const optimizedSvg = await optimizePass.optimize(srcSvgContent, {
    path: svgData.srcFilePath,
  });
  const optimizedCode = optimizedSvg.data;

  // .replace(
  //   /<svg (.*?)>/,
  //   `<svg xmlns="http://www.w3.org/2000/svg" class="fwicon" viewBox="0 0 512 512"><title>${svgData.title}</title>`
  // );
  const webComponentSvg = await webComponentPass.optimize(optimizedCode, {
    path: svgData.srcFilePath,
  });
  const sourceSvg = await sourcePass.optimize(optimizedCode, {
    path: svgData.srcFilePath,
  });
  svgData.optimizedSvgContent = webComponentSvg.data;
  try {
    await validatePass.optimize(svgData.optimizedSvgContent, {
      path: svgData.srcFilePath,
    });
  } catch (e) {
    console.error(`${e.message}: ${svgData.srcFilePath}`);
  }
  console.log(svgData.optimizedFilePath, svgData.distSvgFilePath);
  await fs_extra_1.default.writeFile(
    svgData.optimizedFilePath,
    svgData.optimizedSvgContent
  );
  await fs_extra_1.default.writeFile(svgData.distSvgFilePath, sourceSvg.data);
}

// async function copyToTesting(rootDir, distDir, srcSvgData) {
//   const testDir = path_1.join(rootDir, 'www');
//   const testBuildDir = path_1.join(testDir, 'build');
//   const testSvgDir = path_1.join(testBuildDir, 'svg');
//   await fs_extra_1.default.ensureDir(testSvgDir);
//   await Promise.all(
//     srcSvgData.map(async svgData => {
//       const testSvgFilePath = path_1.join(testSvgDir, svgData.fileName);
//       await fs_extra_1.default.writeFile(
//         testSvgFilePath,
//         svgData.optimizedSvgContent
//       );
//     })
//   );
//   const distCheatsheetFilePath = path_1.join(distDir, 'cheatsheet.html');
//   const testCheatsheetFilePath = path_1.join(testDir, 'cheatsheet.html');
//   await fs_extra_1.default.copyFile(
//     distCheatsheetFilePath,
//     testCheatsheetFilePath
//   );
// }
// async function createSvgSymbols(version, distDir, srcSvgData) {
//   srcSvgData = srcSvgData.sort((a, b) => {
//     if (a.iconName < b.iconName) return -1;
//     if (a.iconName > b.iconName) return 1;
//     return 0;
//   });
//   const symbolsSvgFilePath = path_1.join(distDir, 'ionicons.symbols.svg');
//   const lines = [
//     `<svg data-ionicons="${version}" style="display:none">`,
//     `<style>`,
//     `.ionicon {`,
//     `  fill: currentColor;`,
//     `  stroke: currentColor;`,
//     `}`,
//     `.ionicon-fill-none {`,
//     `  fill: none;`,
//     `}`,
//     `.ionicon-stroke-width {`,
//     `  stroke-width: 32px;`,
//     `}`,
//     `</style>`,
//   ];
//   srcSvgData.forEach(svgData => {
//     const svg = svgData.optimizedSvgContent
//       .replace(
//         `<svg xmlns="http://www.w3.org/2000/svg"`,
//         `<symbol id="${svgData.iconName}"`
//       )
//       .replace(`</svg>`, `</symbol>`);
//     lines.push(svg);
//   });
//   lines.push(`</svg>`, ``);
//   const content = lines.join('\n');
//   await fs_extra_1.default.writeFile(symbolsSvgFilePath, content);
//   return content;
// }
// async function createCheatsheet(
//   version,
//   rootDir,
//   distDir,
//   svgSymbolsContent,
//   srcSvgData
// ) {
//   const CheatsheetTmpFilePath = path_1.join(
//     rootDir,
//     'scripts',
//     'cheatsheet-template.html'
//   );
//   const distCheatsheetFilePath = path_1.join(distDir, 'cheatsheet.html');
//   const c = srcSvgData.map(
//     svgData =>
//       `<a href="./svg/${svgData.fileName}"><svg><use href="#${svgData.iconName}" xlink:href="#${svgData.iconName}"/></svg></a>`
//   );
//   c.push(svgSymbolsContent);
//   const html = (
//     await fs_extra_1.default.readFile(CheatsheetTmpFilePath, 'utf8')
//   )
//     .replace(/{{version}}/g, version)
//     .replace(/{{count}}/g, srcSvgData.length.toString())
//     .replace(/{{content}}/g, c.join('\n'));
//   await fs_extra_1.default.writeFile(distCheatsheetFilePath, html);
// }
async function getSvgs(srcSvgDir, distSvgDir, distIoniconsDir) {
  const optimizedSvgDir = path_1.join(distIoniconsDir);
  await fs_extra_1.default.emptyDir(optimizedSvgDir);
  const svgFiles = (await fs_extra_1.default.readdir(srcSvgDir)).filter(
    fileName => {
      return !fileName.startsWith('.') && fileName.endsWith('.svg');
    }
  );
  const svgData = await Promise.all(
    svgFiles.map(async fileName => {
      // fileName: airplane-outline.svg
      if (fileName.toLowerCase() !== fileName) {
        throw new Error(`svg filename "${fileName}" must be all lowercase`);
      }
      // srcFilePath: /src/svg/airplane-outline.svg
      const srcFilePath = path_1.join(srcSvgDir, fileName);
      // srcFilePath: /src/svg/airplane-outline.svg
      const distSvgFilePath = path_1.join(distSvgDir, fileName);
      // optimizedFilePath: /dist/ionicons/svg/airplane-outline.svg
      const optimizedFilePath = path_1.join(optimizedSvgDir, fileName);
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
        srcSvgContent: await fs_extra_1.default.readFile(srcFilePath, 'utf8'),
        optimizedFilePath,
        optimizedSvgContent: null,
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
// async function createIconPackage(version, iconDir, srcSvgData) {
//   const iconPkgJsonFilePath = path_1.join(iconDir, 'package.json');
//   await Promise.all([
//     createEsmIcons(version, iconDir, srcSvgData),
//     createCjsIcons(version, iconDir, srcSvgData),
//     createDtsIcons(version, iconDir, srcSvgData),
//   ]);
//   const iconPkgJson = {
//     name: 'ionicons/icons',
//     version,
//     module: 'index.mjs',
//     main: 'index.js',
//     typings: 'index.d.ts',
//     private: true,
//   };
//   const jsonStr = JSON.stringify(iconPkgJson, null, 2) + '\n';
//   await fs_extra_1.default.writeFile(iconPkgJsonFilePath, jsonStr);
// }

// async function createEsmIcons(version, iconDir, srcSvgData) {
//   const iconEsmFilePath = path_1.join(iconDir, 'index.mjs');
//   const o = [`/* Ionicons v${version}, ES Modules */`, ``];
//   srcSvgData.forEach(svgData => {
//     o.push(`export const ${svgData.exportName} = ${getDataUrl(svgData)}`);
//   });
//   await fs_extra_1.default.writeFile(iconEsmFilePath, o.join('\n') + '\n');
// }
// async function createCjsIcons(version, iconDir, srcSvgData) {
//   const iconCjsFilePath = path_1.join(iconDir, 'index.js');
//   const o = [`/* Ionicons v${version}, CommonJS */`, ``];
//   srcSvgData.forEach(svgData => {
//     o.push(`exports.${svgData.exportName} = ${getDataUrl(svgData)}`);
//   });
//   await fs_extra_1.default.writeFile(iconCjsFilePath, o.join('\n') + '\n');
// }
// async function createDtsIcons(version, iconDir, srcSvgData) {
//   const iconDtsFilePath = path_1.join(iconDir, 'index.d.ts');
//   const o = [`/* Ionicons v${version}, Types */`, ``];
//   srcSvgData.forEach(svgData => {
//     o.push(`export declare var ${svgData.exportName}: string;`);
//   });
//   await fs_extra_1.default.writeFile(iconDtsFilePath, o.join('\n') + '\n');
// }
// function getDataUrl(svgData) {
//   let svg = svgData.optimizedSvgContent;
//   if (svg.includes(`'`)) {
//     throw new Error(`oh no! no single quotes allowed! ${svgData.fileName}`);
//   }
//   if (svg.includes(`\n`) || svg.includes(`\r`)) {
//     throw new Error(`oh no! no new lines allowed! ${svgData.fileName}`);
//   }
//   svg = svg.replace(/"/g, "'");
//   return `"data:image/svg+xml;utf8,${svg}"`;
// // }
// async function createDataJson(version, srcDir, distDir, srcSvgData) {
//   const srcDataJsonPath = path_1.join(srcDir, 'data.json');
//   const distDataJsonPath = path_1.join(distDir, 'ionicons.json');
//   let data;
//   try {
//     data = await fs_extra_1.default.readJson(srcDataJsonPath);
//   } catch (e) {
//     data = {};
//   }
//   data.icons = data.icons || [];
//   // add new icons
//   srcSvgData.forEach(svgData => {
//     if (!data.icons.some(i => i.name === svgData.iconName)) {
//       data.icons.push({
//         name: svgData.iconName,
//       });
//     }
//   });
//   // remove dead icons
//   data.icons = data.icons.filter(dataIcon => {
//     return srcSvgData.some(svgData => dataIcon.name === svgData.iconName);
//   });
//   // sort
//   data.icons = data.icons.sort((a, b) => {
//     if (a.name < b.name) return -1;
//     if (a.name > b.name) return 1;
//     return 0;
//   });
//   data.icons.forEach(icon => {
//     icon.tags = icon.tags || icon.name.split('-');
//     icon.tags = icon.tags.sort();
//   });
//   const srcJsonStr = JSON.stringify(data, null, 2) + '\n';
//   await fs_extra_1.default.writeFile(srcDataJsonPath, srcJsonStr);
//   const distJsonData = {
//     name: 'ionicons',
//     version,
//     icons: data.icons,
//   };
//   const distJsonStr = JSON.stringify(distJsonData, null, 2) + '\n';
//   await fs_extra_1.default.writeFile(distDataJsonPath, distJsonStr);
// }
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
// https://mathiasbynens.be/notes/reserved-keywords
// const reservedKeywords = new Set([
//   'do',
//   'if',
//   'in',
//   'for',
//   'let',
//   'new',
//   'try',
//   'var',
//   'case',
//   'else',
//   'enum',
//   'eval',
//   'null',
//   'this',
//   'true',
//   'void',
//   'with',
//   'await',
//   'break',
//   'catch',
//   'class',
//   'const',
//   'false',
//   'super',
//   'throw',
//   'while',
//   'yield',
//   'delete',
//   'export',
//   'import',
//   'public',
//   'return',
//   'static',
//   'switch',
//   'typeof',
//   'default',
//   'extends',
//   'finally',
//   'package',
//   'private',
//   'continue',
//   'debugger',
//   'function',
//   'arguments',
//   'interface',
//   'protected',
//   'implements',
//   'instanceof',
//   'constructor',
// ]);
// let's do this
build(path_1.join(__dirname, '..'));
