import { Build as BUILD } from '@stencil/core';
import { createStore } from '@stencil/store';
/**
 * Attempts to find the closest tag with a lang attribute.
 * @param element The element to find a lang attribute for.
 */
function getLangAttr(element = document.body) {
    const closestElement = element.closest('[lang]');
    if (!closestElement)
        return undefined;
    let lang = closestElement.lang;
    if (!lang)
        return undefined;
    if (lang.indexOf('-') !== -1) {
        lang = lang.split('-')[0];
    }
    if (lang.indexOf('_') !== -1) {
        lang = lang.split('_')[0];
    }
    return lang;
}
function getNavigatorLang() {
    if (typeof window === 'undefined' ||
        typeof window.navigator === 'undefined') {
        return undefined;
    }
    let browserLang = window.navigator.languages && window.navigator.languages.length > 0
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
function getBrowserLang() {
    const locale = getLangAttr() || getNavigatorLang();
    return locale;
}
function getVal(path, obj) {
    return path === null || path === void 0 ? void 0 : path.split('.').reduce((r, val) => {
        return r ? r[val] : undefined;
    }, obj);
}
export class TranslationController {
    constructor() {
        this.requests = new Map();
        const { state, onChange } = createStore({
            lang: '',
            globalI18n: null,
            customTranslations: {},
            dateLangModule: '',
        });
        this.state = state;
        this.onChange = onChange;
        this.onChange('lang', async (lang) => {
            this.fetchTranslations(lang);
            this.setDateLangModule(await this.fetchDateLangModule(lang));
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
    }
    /**
     * set lang manually
     * @param lang
     */
    setLang(lang) {
        this.state.lang = lang;
    }
    /**
     *
     * @returns the selected lang
     */
    getLang() {
        return this.state.lang;
    }
    /**
     * set date lang module
     * @param langModule
     */
    setDateLangModule(langModule) {
        this.state.dateLangModule = langModule;
    }
    /**
     * @returns the selected date lang module
     */
    getDateLangModule() {
        return this.state.dateLangModule;
    }
    async fetchTranslations(lang) {
        const locale = lang || getBrowserLang();
        return this.fetchDefaultTranslations(locale).then((defaultI18nStrings) => {
            var _a;
            const customI18nStrings = ((_a = this.state.customTranslations) === null || _a === void 0 ? void 0 : _a[locale]) || {};
            const finalI18nStrings = {
                ...defaultI18nStrings,
                ...customI18nStrings,
            };
            this.state.globalI18n = finalI18nStrings;
            return finalI18nStrings;
        });
    }
    fetchDefaultTranslations(lang) {
        let req = this.requests.get(lang);
        if (!req) {
            req = import(`../i18n/${lang}.js`)
                .then((result) => result.default)
                .then((data) => {
                return data;
            })
                .catch(async () => {
                console.warn(`Error loading config for lang: ${lang} from pre-defined set. defaulting to en-US translation`);
                // fallback to en default strings in case of exception
                return await this.fetchDefaultTranslations('en');
            });
            this.requests.set(lang, req);
        }
        return req;
    }
    async fetchDateLangModule(lang) {
        let req = this.requests.get('date_' + lang);
        if (!req) {
            //`https://cdn.jsdelivr.net/npm/date-fns/esm/locale/${lang}/index.js`
            req = import(
            /*webpackIgnore:true*/
            `https://cdn.jsdelivr.net/npm/date-fns/esm/locale/${lang}/index.js`)
                .then((result) => result.default)
                .then((data) => {
                return data;
            })
                .catch(async (err) => {
                console.warn(`Error loading date lang module for : ${lang} from date-fns set`, err);
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
        common: {
          add: 'Add',
          cancel: 'Cancel',
          update: 'Update',
        },
      },
      de: {
        common: {
          add: 'Addieren',
          cancel: 'Stornieren',
          update: 'Aktualisierung',
        },
      },
    };
     * it will override existing translations if the key is already present.
     * @param json
     */
    setTranslations(json) {
        this.state.customTranslations = json;
    }
    /** Decorator to handle i18n support */
    i18n({ defaultValue = '', keyName = '' } = {}) {
        return (proto, propName) => {
            BUILD.cmpWillLoad = true;
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const that = this;
            const { componentWillLoad } = proto;
            proto.componentWillLoad = async function () {
                if (!that.state.globalI18n) {
                    await that.fetchTranslations(that.state.lang || getBrowserLang());
                }
                let isDefaultValueUsed = false;
                if (!this[propName]) {
                    this[propName] =
                        getVal(keyName.toLowerCase(), that.state.globalI18n) ||
                            defaultValue;
                    isDefaultValueUsed = true;
                }
                that.onChange('globalI18n', async () => {
                    if (isDefaultValueUsed) {
                        this[propName] =
                            getVal(keyName.toLowerCase(), that.state.globalI18n) ||
                                defaultValue;
                    }
                });
                return componentWillLoad && componentWillLoad.call(this);
            };
        };
    }
}
