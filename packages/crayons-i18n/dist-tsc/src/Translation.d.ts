interface i18nConfig {
    [key: string]: {
        [key: string]: Record<string, unknown> | string;
    };
}
export declare class TranslationController {
    state: any;
    onChange: any;
    requests: Map<string, Promise<any>>;
    constructor();
    /**
     * set lang manually
     * @param lang
     */
    setLang(lang: string): void;
    /**
     *
     * @returns the selected lang
     */
    getLang(): string;
    /**
     * set date lang module
     * @param langModule
     */
    setDateLangModule(langModule: any): void;
    /**
     * @returns the selected date lang module
     */
    getDateLangModule(): any;
    fetchTranslations(lang?: string): Promise<any>;
    fetchDefaultTranslations(lang: string): Promise<any>;
    fetchDateLangModule(lang: string): Promise<any>;
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
    setTranslations(json: i18nConfig): void;
    /** Decorator to handle i18n support */
    i18n({ defaultValue, keyName }?: {
        defaultValue?: string;
        keyName?: string;
    }): any;
}
export {};
