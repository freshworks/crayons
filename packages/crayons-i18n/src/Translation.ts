import { Build as BUILD, ComponentInterface } from '@stencil/core';

import { createStore } from '@stencil/store';

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
function getLang(): string {
  const locale = getLangAttr() || getBrowserLang();
  return locale;
}

export class TranslationController {
  state: any;
  onChange: any;
  requests = new Map<string, Promise<any>>();

  constructor() {
    const { state, onChange } = createStore({
      lang: '',
      globalI18n: null,
      customTranslations: {},
    });
    this.state = state;
    this.onChange = onChange;

    this.onChange('lang', async (lang: string) => {
      console.log('new locale ', lang);
      await this.fetchTranslations(true, lang);
      console.log('setting strings change of lang ', this.state.globalI18n);
    });

    console.log('Initalising state *** ', { state: this.state });

    if ('MutationObserver' in window) {
      const mo = new MutationObserver(async (data) => {
        if (data[0].attributeName === 'lang') {
          const lang = document.documentElement.getAttribute('lang');
          if (lang !== data[0].oldValue) {
            this.state.lang = lang;
          }
        }
      });

      mo.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['lang'],
        attributeOldValue: true,
      });
    }
  }

  async fetchTranslations(forceUpdate?: boolean, lang?: string): Promise<any> {
    const locale = lang || getLang();

    let req = this.requests.get('translation_' + locale);
    // eslint-disable-next-line no-constant-condition
    if (forceUpdate || !req) {
      req = this.fetchDefaultTranslations(locale).then((defaultI18nStrings) => {
        const customI18nStrings =
          (this.state.customTranslations as any)?.[locale] || {};
        console.log({ locale, defaultI18nStrings, customI18nStrings });
        const finalI18nStrings = {
          ...defaultI18nStrings,
          ...customI18nStrings,
        };
        this.state.globalI18n = finalI18nStrings;
        return finalI18nStrings;
      });
      this.requests.set('translation_' + locale, req);
    }
    return req;
  }

  setLang(lang: string): void {
    this.state.lang = lang;
  }

  fetchDefaultTranslations(locale: string): Promise<any> {
    let req = this.requests.get(locale);
    if (!req) {
      console.log('get default translations for pull from config', locale);
      req = import(`../i18n/${locale}.js`)
        .then((result) => result.default)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.error(
            `Error loading locale: ${locale} from pre-defined set`,
            err
          );
          return {};
        });
      this.requests.set(locale, req);
    }

    return req;
  }

  setTranslations(json: i18nConfig): void {
    this.state.customTranslations = json;
    console.log('setting custom translations ', json);
  }

  /** Decorator to handle i18n support */
  i18n({ defaultValue = '' } = {}): any {
    return (proto: ComponentInterface, propName: string) => {
      (BUILD as any).cmpWillLoad = true;

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;

      const { componentWillLoad } = proto;

      proto.componentWillLoad = async function () {
        console.log(propName);
        if (!that.state.globalI18n) {
          await that.fetchTranslations(false, getLang());
        }

        let isDefaultValueUsed = false;
        if (!this[propName]) {
          this[propName] =
            that.state.globalI18n[defaultValue.toLowerCase()] || defaultValue;
          isDefaultValueUsed = true;
        }

        that.onChange('globalI18n', async () => {
          if (isDefaultValueUsed) {
            this[propName] =
              (that.state.globalI18n[defaultValue.toLowerCase()] as any) ||
              defaultValue;
          }
        });

        return componentWillLoad && componentWillLoad.call(this);
      };
    };
  }
}
