const base = '$base.';

export function convertTokenToString(tokens) {
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

function getValue(value) {
  if (value.startsWith(base)) {
    let baseValue = value
      .replace(base, '')
      .split('.')
      .reduce((p, c) => {
        return p + '-' + c;
      }, '--fw');
    return `var(${baseValue})`;
  }
  return value;
}
