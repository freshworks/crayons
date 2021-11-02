const path = require('path');
const fs = require('fs');

/**
 * svgToJS Concatenates SVG-files into Javascript
 * @param {Object} config
 * @param {String} config.input Required. Folder with SVG-files
 * @param {String} [config.esm] Optional. Specify filename to write JSX ES module, exposing React components with `export`
 * @returns {Object}
 */
function svgToJS(config) {
  const files = fs.readdirSync(config.input);
  const icons = [];

  for (const file of files) {
    if (file.slice(-4) !== '.svg') continue;
    const code = fs.readFileSync(path.join(config.input, file), 'utf-8');

    const name = file.slice(0, -4);
    const camelCase = name.replace(/-+./g, (m) => m.slice(-1).toUpperCase());
    const titleCase = camelCase.replace(/./, (m) => m.toUpperCase());

    icons.push({
      code,
      camelCase,
      titleCase,
      svg: code,
    });
  }

  const result = {
    esm: icons
      .map(({ svg, titleCase }) => `export const ${titleCase} = '${svg}'`)
      .join('\n'),
    dts: icons
      .map(({ titleCase }) => `export declare const ${titleCase}: string`)
      .join('\n'),
  };

  // Save files if filename is specified in config
  fs.writeFileSync(config['esm'], result['esm']);
  fs.writeFileSync(config['dts'], result['dts']);

  return result;
}

svgToJS({
  input: path.join(__dirname, '..', 'dist/icons'),
  esm: path.join(__dirname, '..', '/dist/index.js'),
  dts: path.join(__dirname, '..', '/dist/index.d.ts'),
});
