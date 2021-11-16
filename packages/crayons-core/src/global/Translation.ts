import { Build as BUILD, ComponentInterface } from '@stencil/core';

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
    defaultI18nStrings: i18nResult,
  });
  return i18nResult;
}

export function setTranslations(json: i18nConfig): void {
  setupConfig({
    customI18nStrings: json,
  });
  console.log('custom setting config ', json);
}

export async function fetchTranslations(): Promise<any> {
  try {
    await fetchDefaultTranslations();
    const defaultI18nStrings =
      AppConfigService.getInstance().get('defaultI18nStrings');
    console.log({ defaultI18nStrings });
    const locale = AppConfigService.getInstance().get('locale');
    console.log({ locale });

    const customI18nStrings =
      AppConfigService.getInstance().get('customI18nStrings')?.[locale] || {};
    console.log({ customI18nStrings });
    const finalI18nStrings = {
      ...defaultI18nStrings,
      ...customI18nStrings,
    };

    return {
      t(key) {
        if (key) return finalI18nStrings[key.toLowerCase()] || key;
        return '';
      },
    };
  } catch (err) {
    console.error(`Error fetching translations. Return the passed string`, err);
    return {
      t(key) {
        if (key) return key;
        return '';
      },
    };
  }
}

/** Decorator to handle i18n support */
export function i18n({ defaultValue = '' } = {}): any {
  return (proto: ComponentInterface, propName: string) => {
    (BUILD as any).cmpWillLoad = true;

    const { componentWillLoad } = proto;

    proto.componentWillLoad = async function () {
      console.log('on will load getting called');
      const strings = await fetchTranslations();
      console.log({ strings });
      if (!this[propName]) {
        this[propName] = strings.t(defaultValue);
      }
      return componentWillLoad && componentWillLoad.call(this);
    };
  };
}

export const initTranslation = () => fetchDefaultTranslations();
