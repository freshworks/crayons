import crayons from '../tokens/crayons.json';
import { convertTokenToString } from './utils';

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
  import(`../tokens/${theme}.json`)
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
