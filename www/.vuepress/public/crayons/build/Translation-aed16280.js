import { g as getRenderingRef, f as forceUpdate, e as Build } from './index-44c267ce.js';

const appendToMap = (map, propName, value) => {
    const items = map.get(propName);
    if (!items) {
        map.set(propName, [value]);
    }
    else if (!items.includes(value)) {
        items.push(value);
    }
};
const debounce = (fn, ms) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            timeoutId = 0;
            fn(...args);
        }, ms);
    };
};

/**
 * Check if a possible element isConnected.
 * The property might not be there, so we check for it.
 *
 * We want it to return true if isConnected is not a property,
 * otherwise we would remove these elements and would not update.
 *
 * Better leak in Edge than to be useless.
 */
const isConnected = (maybeElement) => !('isConnected' in maybeElement) || maybeElement.isConnected;
const cleanupElements = debounce((map) => {
    for (let key of map.keys()) {
        map.set(key, map.get(key).filter(isConnected));
    }
}, 2000);
const stencilSubscription = () => {
    if (typeof getRenderingRef !== 'function') {
        // If we are not in a stencil project, we do nothing.
        // This function is not really exported by @stencil/core.
        return {};
    }
    const elmsToUpdate = new Map();
    return {
        dispose: () => elmsToUpdate.clear(),
        get: (propName) => {
            const elm = getRenderingRef();
            if (elm) {
                appendToMap(elmsToUpdate, propName, elm);
            }
        },
        set: (propName) => {
            const elements = elmsToUpdate.get(propName);
            if (elements) {
                elmsToUpdate.set(propName, elements.filter(forceUpdate));
            }
            cleanupElements(elmsToUpdate);
        },
        reset: () => {
            elmsToUpdate.forEach((elms) => elms.forEach(forceUpdate));
            cleanupElements(elmsToUpdate);
        },
    };
};

const createObservableMap = (defaultState, shouldUpdate = (a, b) => a !== b) => {
    let states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
    const handlers = {
        dispose: [],
        get: [],
        set: [],
        reset: [],
    };
    const reset = () => {
        states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
        handlers.reset.forEach((cb) => cb());
    };
    const dispose = () => {
        // Call first dispose as resetting the state would
        // cause less updates ;)
        handlers.dispose.forEach((cb) => cb());
        reset();
    };
    const get = (propName) => {
        handlers.get.forEach((cb) => cb(propName));
        return states.get(propName);
    };
    const set = (propName, value) => {
        const oldValue = states.get(propName);
        if (shouldUpdate(value, oldValue, propName)) {
            states.set(propName, value);
            handlers.set.forEach((cb) => cb(propName, value, oldValue));
        }
    };
    const state = (typeof Proxy === 'undefined'
        ? {}
        : new Proxy(defaultState, {
            get(_, propName) {
                return get(propName);
            },
            ownKeys(_) {
                return Array.from(states.keys());
            },
            getOwnPropertyDescriptor() {
                return {
                    enumerable: true,
                    configurable: true,
                };
            },
            has(_, propName) {
                return states.has(propName);
            },
            set(_, propName, value) {
                set(propName, value);
                return true;
            },
        }));
    const on = (eventName, callback) => {
        handlers[eventName].push(callback);
        return () => {
            removeFromArray(handlers[eventName], callback);
        };
    };
    const onChange = (propName, cb) => {
        const unSet = on('set', (key, newValue) => {
            if (key === propName) {
                cb(newValue);
            }
        });
        const unReset = on('reset', () => cb(defaultState[propName]));
        return () => {
            unSet();
            unReset();
        };
    };
    const use = (...subscriptions) => {
        const unsubs = subscriptions.reduce((unsubs, subscription) => {
            if (subscription.set) {
                unsubs.push(on('set', subscription.set));
            }
            if (subscription.get) {
                unsubs.push(on('get', subscription.get));
            }
            if (subscription.reset) {
                unsubs.push(on('reset', subscription.reset));
            }
            if (subscription.dispose) {
                unsubs.push(on('dispose', subscription.dispose));
            }
            return unsubs;
        }, []);
        return () => unsubs.forEach((unsub) => unsub());
    };
    const forceUpdate = (key) => {
        const oldValue = states.get(key);
        handlers.set.forEach((cb) => cb(key, oldValue, oldValue));
    };
    return {
        state,
        get,
        set,
        on,
        onChange,
        use,
        dispose,
        reset,
        forceUpdate,
    };
};
const removeFromArray = (array, item) => {
    const index = array.indexOf(item);
    if (index >= 0) {
        array[index] = array[array.length - 1];
        array.length--;
    }
};

const createStore = (defaultState, shouldUpdate) => {
    const map = createObservableMap(defaultState, shouldUpdate);
    map.use(stencilSubscription());
    return map;
};

const supportedDateLanguages = [
    'af',
    'ar',
    'ar-DZ',
    'ar-EG',
    'ar-MA',
    'ar-SA',
    'ar-TN',
    'az',
    'be',
    'bg',
    'bn',
    'bs',
    'ca',
    'cs',
    'cy',
    'da',
    'de',
    'de-AT',
    'el',
    'en-AU',
    'en-CA',
    'en-GB',
    'en-IE',
    'en-IN',
    'en-NZ',
    'en-US',
    'en-ZA',
    'eo',
    'es',
    'et',
    'eu',
    'fa-IR',
    'fi',
    'fr',
    'fr-CA',
    'fr-CH',
    'fy',
    'gd',
    'gl',
    'gu',
    'he',
    'hi',
    'hr',
    'ht',
    'hu',
    'hy',
    'id',
    'is',
    'it',
    'ja',
    'ja-Hira',
    'ka',
    'kk',
    'km',
    'kn',
    'ko',
    'lb',
    'lt',
    'lv',
    'mk',
    'mn',
    'ms',
    'mt',
    'nb',
    'nl',
    'nl-BE',
    'nn',
    'pl',
    'pt',
    'pt-BR',
    'ro',
    'ru',
    'sk',
    'sl',
    'sq',
    'sr',
    'sr-Latn',
    'sv',
    'ta',
    'te',
    'th',
    'tr',
    'ug',
    'uk',
    'uz',
    'uz-Cyrl',
    'vi',
    'zh-CN',
    'zh-HK',
    'zh-TW',
];
const langCodeMapping = {
    ar: 'ar-AR',
    bg: 'bg-BG',
    bs: 'bs-BA',
    ca: 'ca-ES',
    cs: 'cs-CZ',
    da: 'da-DK',
    de: 'de-DE',
    el: 'el-GR',
    en: 'en-US',
    es: 'es-ES',
    et: 'et-EE',
    fi: 'fi-FI',
    fil: 'fil-PH',
    fr: 'fr-FR',
    he: 'he-IL',
    hr: 'hr-HR',
    hu: 'hu-HU',
    id: 'id-ID',
    is: 'is-IS',
    it: 'it-IT',
    ja: 'ja-JP',
    ko: 'ko-KR',
    lt: 'lt-LT',
    lv: 'lv-LV',
    nl: 'nl-NL',
    no: 'no-NO',
    pl: 'pl-PL',
    pt: 'pt-PT',
    ro: 'ro-RO',
    ru: 'ru-RU',
    sk: 'sk-SK',
    sl: 'sl-SI',
    sr: 'sr-SP',
    sc: 'sv-SE',
    th: 'th-TH',
    tr: 'tr-TR',
    uk: 'uk-UA',
    vi: 'vi-VN',
    zh: 'zh-CN',
};

function __variableDynamicImportRuntime1__(path) {
  switch (path) {
    case '../../../node_modules/date-fns/esm/locale/af/index.js': return __sc_import_crayons('./index-c1f35b55-f7abe43c.js');
    case '../../../node_modules/date-fns/esm/locale/ar/index.js': return __sc_import_crayons('./index-55b4dccc-17168918.js');
    case '../../../node_modules/date-fns/esm/locale/ar-DZ/index.js': return __sc_import_crayons('./index-2b546b5c-979e0a6b.js');
    case '../../../node_modules/date-fns/esm/locale/ar-EG/index.js': return __sc_import_crayons('./index-b8f63777-5febd789.js');
    case '../../../node_modules/date-fns/esm/locale/ar-MA/index.js': return __sc_import_crayons('./index-d1eda047-d01f698e.js');
    case '../../../node_modules/date-fns/esm/locale/ar-SA/index.js': return __sc_import_crayons('./index-730163d8-ba81fac2.js');
    case '../../../node_modules/date-fns/esm/locale/ar-TN/index.js': return __sc_import_crayons('./index-2810c9f4-30f16b01.js');
    case '../../../node_modules/date-fns/esm/locale/az/index.js': return __sc_import_crayons('./index-8e5c84a4-11533f17.js');
    case '../../../node_modules/date-fns/esm/locale/be/index.js': return __sc_import_crayons('./index-837330e9-96acd89c.js');
    case '../../../node_modules/date-fns/esm/locale/bg/index.js': return __sc_import_crayons('./index-983c1802-1ed1172a.js');
    case '../../../node_modules/date-fns/esm/locale/bn/index.js': return __sc_import_crayons('./index-33de7831-c50366cb.js');
    case '../../../node_modules/date-fns/esm/locale/bs/index.js': return __sc_import_crayons('./index-8ac3e95f-d71d4dba.js');
    case '../../../node_modules/date-fns/esm/locale/ca/index.js': return __sc_import_crayons('./index-684e1555-0ab1c4f9.js');
    case '../../../node_modules/date-fns/esm/locale/cs/index.js': return __sc_import_crayons('./index-41702bdf-98366a3a.js');
    case '../../../node_modules/date-fns/esm/locale/cy/index.js': return __sc_import_crayons('./index-82298bef-f07b42e1.js');
    case '../../../node_modules/date-fns/esm/locale/da/index.js': return __sc_import_crayons('./index-ec58303b-35cffe9e.js');
    case '../../../node_modules/date-fns/esm/locale/de/index.js': return __sc_import_crayons('./index-331d1c4c-cc759da7.js');
    case '../../../node_modules/date-fns/esm/locale/de-AT/index.js': return __sc_import_crayons('./index-768e86c6-ae85d6f5.js');
    case '../../../node_modules/date-fns/esm/locale/el/index.js': return __sc_import_crayons('./index-26117e04-41b9f8b8.js');
    case '../../../node_modules/date-fns/esm/locale/en-AU/index.js': return __sc_import_crayons('./index-95cffb6f-792587ca.js');
    case '../../../node_modules/date-fns/esm/locale/en-CA/index.js': return __sc_import_crayons('./index-48b60b02-cc0a78a4.js');
    case '../../../node_modules/date-fns/esm/locale/en-GB/index.js': return __sc_import_crayons('./index-4416cefa-172ce16f.js');
    case '../../../node_modules/date-fns/esm/locale/en-IE/index.js': return __sc_import_crayons('./index-e78efbb7-d1301caa.js');
    case '../../../node_modules/date-fns/esm/locale/en-IN/index.js': return __sc_import_crayons('./index-05337dad-6bb4a13f.js');
    case '../../../node_modules/date-fns/esm/locale/en-NZ/index.js': return __sc_import_crayons('./index-b05280c7-573a3c2d.js');
    case '../../../node_modules/date-fns/esm/locale/en-US/index.js': return __sc_import_crayons('./index-0a3e36e3-96ef0da3.js');
    case '../../../node_modules/date-fns/esm/locale/en-ZA/index.js': return __sc_import_crayons('./index-be4c1942-5e5f5815.js');
    case '../../../node_modules/date-fns/esm/locale/eo/index.js': return __sc_import_crayons('./index-c7c62dd3-bcacc77c.js');
    case '../../../node_modules/date-fns/esm/locale/es/index.js': return __sc_import_crayons('./index-aa9aadba-c2c06e35.js');
    case '../../../node_modules/date-fns/esm/locale/et/index.js': return __sc_import_crayons('./index-e6eb9903-fdd932b5.js');
    case '../../../node_modules/date-fns/esm/locale/eu/index.js': return __sc_import_crayons('./index-ea6d2b12-1f4d7a59.js');
    case '../../../node_modules/date-fns/esm/locale/fa-IR/index.js': return __sc_import_crayons('./index-ec985de9-c7873b11.js');
    case '../../../node_modules/date-fns/esm/locale/fi/index.js': return __sc_import_crayons('./index-34d75a8c-9c1a2c11.js');
    case '../../../node_modules/date-fns/esm/locale/fr/index.js': return __sc_import_crayons('./index-b7e908df-578b6404.js');
    case '../../../node_modules/date-fns/esm/locale/fr-CA/index.js': return __sc_import_crayons('./index-52c4641b-75337239.js');
    case '../../../node_modules/date-fns/esm/locale/fr-CH/index.js': return __sc_import_crayons('./index-d70b8f49-8e6a709b.js');
    case '../../../node_modules/date-fns/esm/locale/fy/index.js': return __sc_import_crayons('./index-b9061eb7-a43b4888.js');
    case '../../../node_modules/date-fns/esm/locale/gd/index.js': return __sc_import_crayons('./index-e472e5cb-7337561a.js');
    case '../../../node_modules/date-fns/esm/locale/gl/index.js': return __sc_import_crayons('./index-554ccad4-5222bc1d.js');
    case '../../../node_modules/date-fns/esm/locale/gu/index.js': return __sc_import_crayons('./index-717b67e6-3bfbcb08.js');
    case '../../../node_modules/date-fns/esm/locale/he/index.js': return __sc_import_crayons('./index-852fb809-d3c176e4.js');
    case '../../../node_modules/date-fns/esm/locale/hi/index.js': return __sc_import_crayons('./index-bf058ee4-53651cf7.js');
    case '../../../node_modules/date-fns/esm/locale/hr/index.js': return __sc_import_crayons('./index-51b559f3-54707c0d.js');
    case '../../../node_modules/date-fns/esm/locale/ht/index.js': return __sc_import_crayons('./index-e9979144-4dc887d9.js');
    case '../../../node_modules/date-fns/esm/locale/hu/index.js': return __sc_import_crayons('./index-d487bab9-394ff228.js');
    case '../../../node_modules/date-fns/esm/locale/hy/index.js': return __sc_import_crayons('./index-8a4815d7-e870919e.js');
    case '../../../node_modules/date-fns/esm/locale/id/index.js': return __sc_import_crayons('./index-6b66290c-8f37ae9a.js');
    case '../../../node_modules/date-fns/esm/locale/is/index.js': return __sc_import_crayons('./index-28e752fb-684e1e09.js');
    case '../../../node_modules/date-fns/esm/locale/it/index.js': return __sc_import_crayons('./index-ada3684d-c3e76360.js');
    case '../../../node_modules/date-fns/esm/locale/ja/index.js': return __sc_import_crayons('./index-33a3a969-2169cb3b.js');
    case '../../../node_modules/date-fns/esm/locale/ja-Hira/index.js': return __sc_import_crayons('./index-7b81f999-6182d9a6.js');
    case '../../../node_modules/date-fns/esm/locale/ka/index.js': return __sc_import_crayons('./index-b46441aa-bae6c30d.js');
    case '../../../node_modules/date-fns/esm/locale/kk/index.js': return __sc_import_crayons('./index-6b6ba7ab-bdb37d0f.js');
    case '../../../node_modules/date-fns/esm/locale/km/index.js': return __sc_import_crayons('./index-d6302b4f-62fed5e9.js');
    case '../../../node_modules/date-fns/esm/locale/kn/index.js': return __sc_import_crayons('./index-b962a12d-afc16067.js');
    case '../../../node_modules/date-fns/esm/locale/ko/index.js': return __sc_import_crayons('./index-58dc4b63-174cc953.js');
    case '../../../node_modules/date-fns/esm/locale/lb/index.js': return __sc_import_crayons('./index-a2248962-e9ba8a5f.js');
    case '../../../node_modules/date-fns/esm/locale/lt/index.js': return __sc_import_crayons('./index-42b1d084-6ed0dcd6.js');
    case '../../../node_modules/date-fns/esm/locale/lv/index.js': return __sc_import_crayons('./index-95cc22c6-a976645a.js');
    case '../../../node_modules/date-fns/esm/locale/mk/index.js': return __sc_import_crayons('./index-a2b2dfee-39fae2cb.js');
    case '../../../node_modules/date-fns/esm/locale/mn/index.js': return __sc_import_crayons('./index-c0d846a9-f88de93d.js');
    case '../../../node_modules/date-fns/esm/locale/ms/index.js': return __sc_import_crayons('./index-a1168380-d01420b5.js');
    case '../../../node_modules/date-fns/esm/locale/mt/index.js': return __sc_import_crayons('./index-84921e63-63b4d444.js');
    case '../../../node_modules/date-fns/esm/locale/nb/index.js': return __sc_import_crayons('./index-d0b6c3fb-5599cc24.js');
    case '../../../node_modules/date-fns/esm/locale/nl/index.js': return __sc_import_crayons('./index-5bb6c3b1-7d6fc080.js');
    case '../../../node_modules/date-fns/esm/locale/nl-BE/index.js': return __sc_import_crayons('./index-f57a6136-85336bde.js');
    case '../../../node_modules/date-fns/esm/locale/nn/index.js': return __sc_import_crayons('./index-9f4cc23d-cbef24d8.js');
    case '../../../node_modules/date-fns/esm/locale/pl/index.js': return __sc_import_crayons('./index-abdc2455-82618e85.js');
    case '../../../node_modules/date-fns/esm/locale/pt/index.js': return __sc_import_crayons('./index-29f5075b-717d2c5a.js');
    case '../../../node_modules/date-fns/esm/locale/pt-BR/index.js': return __sc_import_crayons('./index-903bcef3-8a5bf288.js');
    case '../../../node_modules/date-fns/esm/locale/ro/index.js': return __sc_import_crayons('./index-d1f23fd1-7ac34106.js');
    case '../../../node_modules/date-fns/esm/locale/ru/index.js': return __sc_import_crayons('./index-98d2f6f7-f1bb61e0.js');
    case '../../../node_modules/date-fns/esm/locale/sk/index.js': return __sc_import_crayons('./index-128fc42c-a919b3fa.js');
    case '../../../node_modules/date-fns/esm/locale/sl/index.js': return __sc_import_crayons('./index-006f5f4f-806fd79f.js');
    case '../../../node_modules/date-fns/esm/locale/sq/index.js': return __sc_import_crayons('./index-193e6e0b-7dfdb95e.js');
    case '../../../node_modules/date-fns/esm/locale/sr/index.js': return __sc_import_crayons('./index-e6931836-c7c9a596.js');
    case '../../../node_modules/date-fns/esm/locale/sr-Latn/index.js': return __sc_import_crayons('./index-2bd8df02-90d9ce3e.js');
    case '../../../node_modules/date-fns/esm/locale/sv/index.js': return __sc_import_crayons('./index-de819536-6bd593c1.js');
    case '../../../node_modules/date-fns/esm/locale/ta/index.js': return __sc_import_crayons('./index-c678bacb-c068fc01.js');
    case '../../../node_modules/date-fns/esm/locale/te/index.js': return __sc_import_crayons('./index-4d7fe58b-01c39c7a.js');
    case '../../../node_modules/date-fns/esm/locale/th/index.js': return __sc_import_crayons('./index-50b0b946-12537590.js');
    case '../../../node_modules/date-fns/esm/locale/tr/index.js': return __sc_import_crayons('./index-ee196718-1e08daa2.js');
    case '../../../node_modules/date-fns/esm/locale/ug/index.js': return __sc_import_crayons('./index-83cf4990-7cecd40c.js');
    case '../../../node_modules/date-fns/esm/locale/uk/index.js': return __sc_import_crayons('./index-025d82f0-0ee63be1.js');
    case '../../../node_modules/date-fns/esm/locale/uz/index.js': return __sc_import_crayons('./index-6d382fb4-1161f8ce.js');
    case '../../../node_modules/date-fns/esm/locale/uz-Cyrl/index.js': return __sc_import_crayons('./index-6cc1dcbc-7a65512c.js');
    case '../../../node_modules/date-fns/esm/locale/vi/index.js': return __sc_import_crayons('./index-87d9e489-4464667b.js');
    case '../../../node_modules/date-fns/esm/locale/zh-CN/index.js': return __sc_import_crayons('./index-e98c8c7d-cec7aee2.js');
    case '../../../node_modules/date-fns/esm/locale/zh-HK/index.js': return __sc_import_crayons('./index-6b112f79-43da7a19.js');
    case '../../../node_modules/date-fns/esm/locale/zh-TW/index.js': return __sc_import_crayons('./index-63b92600-7243d759.js');
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }

function __variableDynamicImportRuntime0__(path) {
  switch (path) {
    case '../i18n/en-US.json': return __sc_import_crayons('./en-US-5f487237-158819a8.js');
    default: return new Promise(function(resolve, reject) {
      (typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout)(
        reject.bind(null, new Error("Unknown variable dynamic import: " + path))
      );
    })
   }
 }
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
    return locale || 'en';
}
function getVal(path, obj = {}) {
    if (!path)
        return '';
    return path === null || path === void 0 ? void 0 : path.split('.').reduce((r, val) => {
        return r ? r[val] : undefined;
    }, obj);
}
function interpolate(text, values) {
    return Object.entries(values).reduce((text, [key, value]) => text.replace(new RegExp(`{{[  ]*${key}[  ]*}}`, `gm`), String(extract(value))), text);
}
function extract(obj) {
    return typeof obj === 'function' ? obj() : obj;
}
function get({ key, values, obj, lang, context, }) {
    var _a;
    const translatedText = (_a = getVal(key, obj)) !== null && _a !== void 0 ? _a : key; // return the key if the value for key is not found
    // Interpolate the values and return the translation
    return values ? interpolate(translatedText, values) : translatedText;
}
class TranslationController$1 {
    constructor() {
        this.requests = new Map();
        const { state, onChange } = createStore({
            lang: '',
            globalStrings: null,
            customTranslations: {},
        });
        this.state = state;
        this.onChange = onChange;
        //this.pluralize = pluralize;
        this.langCodeMapping = langCodeMapping;
        this.onChange('lang', async (lang) => {
            this.fetchTranslations(lang);
            await this.fetchDateLangModule(lang);
        });
        this.onChange('customTranslations', async (customTranslations) => {
            var _a;
            const lang = this.state.lang || getBrowserLang();
            if (!this.state.globalStrings) {
                await this.fetchTranslations(lang);
            }
            const customLangStrings = ((_a = customTranslations) === null || _a === void 0 ? void 0 : _a[lang]) || {};
            const finalLangStrings = Object.assign(Object.assign({}, this.state.globalStrings), customLangStrings);
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
        this.initialize();
    }
    async initialize() {
        await Promise.all([
            this.fetchTranslations(),
            this.fetchDateLangModule(),
        ]).catch((err) => console.error(`Error occurred in intialising i18n lib ${err.message}`));
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
     * @returns the selected date lang module
     */
    async getDateLangModule(lang) {
        return await this.fetchDateLangModule(lang || this.state.lang);
    }
    async fetchTranslations(lang) {
        const locale = lang || getBrowserLang();
        const userLocale = locale.includes('-')
            ? locale
            : langCodeMapping[`${locale}`] || 'en-US';
        this.state.lang = locale;
        return this.fetchDefaultTranslations(userLocale).then((defaultLangStrings) => {
            var _a;
            const customLangStrings = ((_a = this.state.customTranslations) === null || _a === void 0 ? void 0 : _a[locale]) || {};
            const finalLangStrings = Object.assign(Object.assign({}, defaultLangStrings), customLangStrings);
            this.state.globalStrings = finalLangStrings;
            return finalLangStrings;
        });
    }
    fetchDefaultTranslations(lang) {
        let req = this.requests.get(lang);
        if (!req) {
            req = __variableDynamicImportRuntime0__(`../i18n/${lang}.json`)
                .then((result) => result.default)
                .then((data) => {
                return data;
            })
                .catch(async () => {
                console.warn(`Error loading config for lang: ${lang} from pre-defined set. defaulting to en-US translation`);
                // fallback to en default strings in case of exception
                return await this.fetchDefaultTranslations('en-US');
            });
            this.requests.set(lang, req);
        }
        return req;
    }
    async fetchDateLangModule(lang) {
        const locale = lang || getBrowserLang();
        let req = this.requests.get('date_' + locale);
        if (!req) {
            let lng = locale;
            const langIndex = supportedDateLanguages.indexOf(lng);
            if (langIndex >= 0) {
                lng = supportedDateLanguages[langIndex];
            }
            else {
                lng = lng.includes('-') ? lng.split('-')[0] : lng;
            }
            if (lng === 'en')
                lng = 'en-US';
            req = __variableDynamicImportRuntime1__(`../../../node_modules/date-fns/esm/locale/${lng}/index.js`)
                .then((result) => result.default)
                .then((data) => {
                return data;
            })
                .catch(async (err) => {
                console.warn(`Error loading date lang module for : ${lng} from date-fns set`, err);
                // fallback to en default strings in case of exception
                const langModule = await this.fetchDateLangModule('en-US').catch((err) => {
                    console.error(' Error in fetching default date lang module ', err.message);
                    return {};
                });
                return langModule;
            });
            this.requests.set('date_' + locale, req);
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
    setTranslations(json) {
        this.state.customTranslations = json;
    }
    t(key = '', values, context) {
        var _a;
        return ((_a = get({
            key,
            values,
            obj: this.state.globalStrings,
            lang: this.state.lang,
            context,
        })) !== null && _a !== void 0 ? _a : key);
    }
    /** Decorator to handle i18n support */
    i18n({ keyName = '' } = {}) {
        return (proto, propName) => {
            Build.cmpWillLoad = true;
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const that = this;
            const { componentWillLoad } = proto;
            proto.componentWillLoad = async function () {
                if (!that.state.globalStrings) {
                    await that.fetchTranslations(that.state.lang || getBrowserLang());
                }
                // if (!i18next?.services?.pluralResolver) {
                //   await i18next.init();
                // }
                let isDefaultValueUsed = true;
                if (!this[propName]) {
                    this[propName] = get({
                        key: keyName,
                        values: null,
                        obj: that.state.globalStrings,
                        lang: that.state.lang,
                        context: null,
                    });
                    isDefaultValueUsed = false;
                }
                that.onChange('globalStrings', async () => {
                    if (!isDefaultValueUsed) {
                        this[propName] = get({
                            key: keyName,
                            values: null,
                            obj: that.state.globalStrings,
                            lang: that.state.lang,
                            context: null,
                        });
                    }
                });
                return componentWillLoad && componentWillLoad.call(this);
            };
        };
    }
}

const TranslationController = new TranslationController$1();
const i18n = TranslationController.i18n.bind(TranslationController);

export { TranslationController as T, i18n as i };
