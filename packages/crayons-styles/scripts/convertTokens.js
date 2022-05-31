import fs from 'fs';
import path from 'path';
import { convertTokenToString } from '../src/utils.js';

const tokenOutDir = './tokens/';
const cssOutDir = './dist/styles/';
const tokensDir = './design-tokens/';

function readFiles(rootPath) {
  let combinedTokens = {};
  const files = fs.readdirSync(rootPath);
  for (const file of files) {
    const filePath = path.join(rootPath, file);
    const themeName = filePath.split('/')[1];
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      const data = fs.readFileSync(filePath, { encoding: 'utf8' });
      combinedTokens[themeName] = {
        ...combinedTokens[themeName],
        ...JSON.parse(data),
      };
    } else {
      combinedTokens = {
        ...combinedTokens,
        ...readFiles(filePath),
      };
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
    const tokenPath = path.join(tokenOutDir, `${key}.json`);
    const cssPath = path.join(cssOutDir, `${key}.min.css`);
    writeFile(cssPath, `:root {${convertTokenToString(value)}}`);
    writeFile(tokenPath, JSON.stringify(value));
  }
}

createTokens();
