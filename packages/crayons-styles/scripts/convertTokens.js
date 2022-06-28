import fs from 'fs';
import path from 'path';
import { convertTokenToString } from '../src/utils.js';

const tokenOutDir = './tokens/';
const cssOutDir = './css/';
const tokensDir = './design-tokens/';
const globalFileName = 'crayons.json';

function readFiles(rootPath) {
  let combinedTokens = {};
  const globalData = fs.readFileSync(path.join(rootPath, globalFileName), {
    encoding: 'utf8',
  });
  const files = fs.readdirSync(rootPath);
  for (const file of files) {
    const filePath = path.join(rootPath, file);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      const themeName = path.parse(file).name;
      if (themeName !== 'crayons') {
        const data = fs.readFileSync(filePath, { encoding: 'utf8' });
        combinedTokens[themeName] = {
          ...{
            base: JSON.parse(globalData),
          },
          ...JSON.parse(data),
        };
      } else {
        combinedTokens[themeName] = {
          base: JSON.parse(globalData),
        };
      }
    }
  }
  return combinedTokens;
}

function writeFile(outPath, content) {
  const dirName = path.dirname(outPath);
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
  fs.writeFile(outPath, content, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`created the file ${outPath}`);
  });
}

function createTokens() {
  const tokens = readFiles(tokensDir);
  for (const [key, value] of Object.entries(tokens)) {
    const cssString = Object.keys(value).reduce((cssString, selector) => {
      const parsedSelector = selector.trim().toLowerCase();
      const classSelector = key !== 'crayons' ? `[data-theme="${key}"]` : '';
      const cssSelector =
        parsedSelector === 'base'
          ? classSelector || ':root'
          : `${classSelector} fw-${parsedSelector}`;
      return (cssString += `${cssSelector}{${convertTokenToString(
        value[selector]
      )}}`);
    }, '');

    const cssPath = path.join(cssOutDir, `${key}-theme.min.css`);
    const tokenPath = path.join(tokenOutDir, `${key}.js`);
    writeFile(cssPath, cssString);
    writeFile(tokenPath, `const ${key}= '${cssString}'; export default ${key}`);
  }
}

createTokens();
