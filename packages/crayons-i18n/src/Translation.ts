import { Build as BUILD, ComponentInterface } from '@stencil/core';

import { createStore } from '@stencil/store';

interface i18nConfig {
  [key: string]: {
    [key: string]: Record<string, unknown> | string;
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
function getNavigatorLang() {
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
function getBrowserLang(): string {
  const locale = getLangAttr() || getNavigatorLang();
  return locale || 'en';
}

function getVal(path: string, obj: any = {}) {
  if (!path) return '';
  return path?.split('.').reduce((r, val) => {
    return r ? r[val] : undefined;
  }, obj);
}

function interpolate(text: string, values: any) {
  return Object.entries(values).reduce(
    (text, [key, value]) =>
      text.replace(
        new RegExp(`{{[  ]*${key}[  ]*}}`, `gm`),
        String(extract(value))
      ),
    text
  );
}
function extract(obj: any) {
  return typeof obj === 'function' ? obj() : obj;
}

function get(key: string, values: any, obj: any) {
  const translatedText = getVal(key, obj) || '';

  // Interpolate the values and return the translation
  return values ? interpolate(translatedText, values) : translatedText;
}

export class TranslationController {
  state: any;
  onChange: any;
  requests = new Map<string, Promise<any>>();

  constructor() {
    const { state, onChange } = createStore({
      lang: '',
      globalStrings: null,
      customTranslations: {},
      dateLangModule: '',
    });
    this.state = state;
    this.onChange = onChange;

    this.onChange('lang', async (lang: string) => {
      console.log('Detected Lang Change. New Lang: ', lang);
      this.fetchTranslations(lang);
      this.setDateLangModule(await this.fetchDateLangModule(lang));
    });

    this.onChange('customTranslations', async (customTranslations: string) => {
      const lang = this.state.lang || getBrowserLang();
      if (!this.state.globalStrings) {
        await this.fetchTranslations(lang);
      }

      const customLangStrings = (customTranslations as any)?.[lang] || {};
      const finalLangStrings = {
        ...this.state.globalStrings,
        ...customLangStrings,
      };
      this.state.globalStrings = finalLangStrings;
    });

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

    this.fetchTranslations();
  }

  /**
   * set lang manually
   * @param lang
   */
  setLang(lang: string): void {
    this.state.lang = lang;
  }

  /**
   *
   * @returns the selected lang
   */
  getLang(): string {
    return this.state.lang;
  }

  /**
   * set date lang module
   * @param langModule
   */
  setDateLangModule(langModule: any): void {
    this.state.dateLangModule = langModule;
  }

  /**
   * @returns the selected date lang module
   */
  getDateLangModule(): any {
    return this.state.dateLangModule;
  }

  async fetchTranslations(lang?: string): Promise<any> {
    const locale = lang || getBrowserLang();

    return this.fetchDefaultTranslations(locale).then((defaultLangStrings) => {
      const customLangStrings =
        (this.state.customTranslations as any)?.[locale] || {};
      const finalLangStrings = {
        ...defaultLangStrings,
        ...customLangStrings,
      };
      this.state.globalStrings = finalLangStrings;
      return finalLangStrings;
    });
  }

  fetchDefaultTranslations(lang: string): Promise<any> {
    let req = this.requests.get(lang);
    if (!req) {
      req = import(`../i18n/${lang}.js`)
        .then((result) => result.default)
        .then((data) => {
          return data;
        })
        .catch(async () => {
          console.warn(
            `Error loading config for lang: ${lang} from pre-defined set. defaulting to en-US translation`
          );
          // fallback to en default strings in case of exception
          return await this.fetchDefaultTranslations('en');
        });
      this.requests.set(lang, req);
    }

    return req;
  }

  async fetchDateLangModule(lang: string): Promise<any> {
    let req = this.requests.get('date_' + lang);
    if (!req) {
      req = import(`../../../node_modules/date-fns/esm/locale/${lang}/index.js`)
        .then((result) => result.default)
        .then((data) => {
          return data;
        })
        .catch(async (err) => {
          console.warn(
            `Error loading date lang module for : ${lang} from date-fns set`,
            err
          );
          // fallback to en default strings in case of exception
          return await this.fetchDateLangModule('en-US');
        });
      this.requests.set('date_' + lang, req);
    }

    return req;
  }

  /**
   * set custom translations. ex: {
    en: {
      datepicker: {
        cancel: 'Cancel',
        update: 'Update',
      },
      dropdown: {
        add: 'Add',
        cancel: 'Cancel',
      },
      modal: {
        cancel: 'Cancel',
        ok: 'OK',
      },
      search: {
        search: 'Search',
        no_items_found: 'No items found',
        no_data_available: 'No data available',
      },
    },
    de: {
      datepicker: {
        cancel: 'Stornieren',
        update: 'Aktualisierung',
      },
      modal: {
        ok: 'OK',
        cancel: 'Stornieren',
      },
      dropdown: {
        add: 'Addieren',
        cancel: 'Stornieren',
      },
      search: {
        search: 'Suche',
        no_items_found: 'Keine Elemente gefunden',
        no_data_available: 'Keine Daten vorhanden',
      },
    },
  };
   * it will override existing translations if the key is already present.
   * @param json
   */
  setTranslations(json: i18nConfig): void {
    this.state.customTranslations = json;
  }

  t(keyName = '', values: any): string {
    return get(keyName, values, this.state.globalStrings) || '';
  }

  /** Decorator to handle i18n support */
  i18n({ defaultValue = '', keyName = '' } = {}): any {
    return (proto: ComponentInterface, propName: string) => {
      (BUILD as any).cmpWillLoad = true;

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;

      const { componentWillLoad } = proto;

      proto.componentWillLoad = async function () {
        if (!that.state.globalStrings) {
          await that.fetchTranslations(that.state.lang || getBrowserLang());
        }

        let isDefaultValueUsed = true;
        if (!this[propName]) {
          this[propName] =
            get(keyName, null, that.state.globalStrings) || defaultValue;
          isDefaultValueUsed = false;
        }

        that.onChange('globalStrings', async () => {
          if (!isDefaultValueUsed) {
            this[propName] =
              get(keyName, null, that.state.globalStrings) || defaultValue;
          }
        });

        return componentWillLoad && componentWillLoad.call(this);
      };
    };
  }
}
