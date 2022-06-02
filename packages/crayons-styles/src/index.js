import crayons from '../tokens/crayons.js';

function setStyle(tokens) {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(tokens);
  document.adoptedStyleSheets = [sheet];
}

export function setTheme(theme) {
  if (theme === 'crayons') {
    setStyle(crayons);
    return;
  }
  import(`../tokens/${theme}.js`)
    .then((tokens) => {
      setStyle(tokens);
    })
    .catch(() => {
      console.warn(
        `Error setting the theme: ${theme} from pre-defined set. defaulting to crayons theme`
      );
      setStyle(crayons);
    });
}
