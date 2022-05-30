import crayons from '../dist/design-tokens/crayons.json';
const base = '$base.';

function getValue(value) {
  if (value.startsWith(base)) {
    const baseValue = value
      .replace(base, '')
      .split('.')
      .reduce((p, c) => {
        return p + '-' + c;
      }, '--fw');
    return `var(${baseValue})`;
  }
  return value;
}

function convertTokenToString(tokens) {
  let cssString = '';
  for (const [, value] of Object.entries(tokens)) {
    if ('var' in value) {
      cssString = cssString + `${value['var']} : ${getValue(value['value'])};`;
    } else {
      cssString = cssString + convertTokenToString(value);
    }
  }
  return cssString;
}

function setStyle(tokens) {
  const cssString = convertTokenToString(tokens);
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(`:root {${cssString}}`);
  document.adoptedStyleSheets = [sheet];
}

export function setTheme(theme) {
  if (theme === 'crayons') {
    setStyle(crayons);
  }
  import(`../dist/design-tokens/${theme}.json`)
    .then((tokens) => {
      setStyle(tokens);
    })
    .catch(() => {
      console.warn(
        `Error setting the theme: ${theme} from pre-defined set. defaulting to crayons theme`
      );
      setTheme('crayons');
    });
}
