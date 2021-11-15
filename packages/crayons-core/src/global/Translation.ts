import { setupConfig } from './config';
import { AppConfigService } from './config-service';

interface i18nConfig {
  [key: string]: {
    [key: string]: string;
  };
}

/**
 * Attempts to find the closest tag with a lang attribute.
 * @param element The element to find a lang attribute for.
 */
function getLangAttr(element = document.body) {
  const closestElement = element.closest('[lang]') as HTMLElement;
  if (!closestElement) return undefined;

  let lang = closestElement.lang;
  if (!lang) return undefined;

  if (lang.indexOf('-') !== -1) {
    lang = lang.split('-')[0];
  }
  if (lang.indexOf('_') !== -1) {
    lang = lang.split('_')[0];
  }
  return lang;
}
function getBrowserLang() {
  if (
    typeof window === 'undefined' ||
    typeof window.navigator === 'undefined'
  ) {
    return undefined;
  }
  let browserLang =
    window.navigator.languages && window.navigator.languages.length > 0
      ? window.navigator.languages[0]
      : null;
  browserLang = browserLang || window.navigator.language;
  if (typeof browserLang === 'undefined') {
    return 'en';
  }
  if (browserLang.indexOf('-') !== -1) {
    browserLang = browserLang.split('-')[0];
  }
  if (browserLang.indexOf('_') !== -1) {
    browserLang = browserLang.split('_')[0];
  }
  return browserLang;
}

export async function fetchDefaultTranslations(): Promise<any> {
  const locale = getLangAttr() || getBrowserLang();
  let i18nResult = {};

  try {
    const existingTranslations = JSON.parse(
      sessionStorage.getItem(`i18n.${locale}`)
    );

    if (existingTranslations && Object.keys(existingTranslations).length > 0) {
      i18nResult = { ...existingTranslations };
    } else {
      try {
        const result = await import(`../i18n/${locale}.js`);
        if (result) {
          const data = await result.default;
          sessionStorage.setItem(`i18n.${locale}`, JSON.stringify(data));
          i18nResult = { ...data };
        }
      } catch (exception) {
        console.error(
          `Error loading locale: ${locale} from pre-defined set`,
          exception
        );
        i18nResult = {};
      }
    }
  } catch (error) {
    console.error(
      `Error while reading locale: ${locale} from sessionStorage`,
      error
    );
    i18nResult = {};
  }
  console.log('setting global configs');
  setupConfig({
    locale: locale,
  });
  setupConfig({
    i18n: i18nResult,
  });
  return i18nResult;
}

export function setTranslations(json: i18nConfig): void {
  setupConfig({
    customi18n: json,
  });
  console.log('setting config ', json);
}

export async function fetchTranslations() {
  await fetchDefaultTranslations();
  const defaulti18n = AppConfigService.getInstance().get('i18n');
  console.log({ defaulti18n });
  const locale = AppConfigService.getInstance().get('locale');
  console.log({ locale });

  const customi18n =
    AppConfigService.getInstance().get('customi18n')?.[locale] || {};
  console.log({ customi18n });
  return {
    ...defaulti18n,
    ...customi18n,
  };
}
